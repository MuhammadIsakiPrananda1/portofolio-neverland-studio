<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use PragmaRX\Google2FA\Google2FA;

class TwoFactorController extends Controller
{
    private Google2FA $google2fa;

    public function __construct()
    {
        $this->google2fa = new Google2FA();
    }

    /**
     * Generate a new 2FA secret + QR code URL.
     * Called when user clicks "Enable 2FA".
     * Secret is stored but NOT yet confirmed.
     */
    public function setup(Request $request): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();

        // Always generate fresh secret on setup
        $secret = $this->google2fa->generateSecretKey();

        $user->forceFill([
            'two_factor_secret'       => encrypt($secret),
            'two_factor_recovery_codes' => null,
            'two_factor_confirmed_at' => null,
        ])->save();

        $qrCodeUrl = $this->google2fa->getQRCodeUrl(
            config('app.name', 'Neverland Studio'),
            $user->email,
            $secret
        );

        return response()->json([
            'secret'      => $secret,
            'qr_code_url' => $qrCodeUrl,
        ]);
    }

    /**
     * Confirm 2FA setup by verifying the first TOTP code.
     * After this, 2FA is permanently enabled on the account.
     */
    public function confirm(Request $request): JsonResponse
    {
        $request->validate([
            'code' => ['required', 'string', 'digits:6'],
        ]);

        /** @var User $user */
        $user = $request->user();

        if (!$user->two_factor_secret) {
            return response()->json(['message' => 'Setup 2FA terlebih dahulu.'], 422);
        }

        $secret = decrypt($user->two_factor_secret);

        if (!$this->google2fa->verifyKey($secret, $request->code)) {
            return response()->json(['message' => 'Kode tidak valid. Periksa waktu perangkat kamu.'], 422);
        }

        // Generate recovery codes
        $recoveryCodes = $this->generateRecoveryCodes();

        $user->forceFill([
            'two_factor_recovery_codes' => encrypt(json_encode($recoveryCodes)),
            'two_factor_confirmed_at'   => now(),
        ])->save();

        return response()->json([
            'message'        => '2FA berhasil diaktifkan.',
            'recovery_codes' => $recoveryCodes,
        ]);
    }

    /**
     * Disable 2FA. Requires current TOTP code or a recovery code.
     */
    public function disable(Request $request): JsonResponse
    {
        $request->validate([
            'code' => ['required', 'string'],
        ]);

        /** @var User $user */
        $user = $request->user();

        if (!$user->hasTwoFactorEnabled()) {
            return response()->json(['message' => '2FA belum diaktifkan.'], 422);
        }

        $secret = decrypt($user->two_factor_secret);
        $valid  = $this->google2fa->verifyKey($secret, $request->code);

        if (!$valid) {
            $valid = $this->checkRecoveryCode($user, $request->code);
        }

        if (!$valid) {
            return response()->json(['message' => 'Kode tidak valid.'], 422);
        }

        $user->forceFill([
            'two_factor_secret'         => null,
            'two_factor_recovery_codes' => null,
            'two_factor_confirmed_at'   => null,
        ])->save();

        return response()->json(['message' => '2FA berhasil dinonaktifkan.']);
    }

    /**
     * Get 2FA status for the authenticated user.
     */
    public function status(Request $request): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();

        return response()->json([
            'enabled'       => $user->hasTwoFactorEnabled(),
            'confirmed_at'  => $user->two_factor_confirmed_at?->toISOString(),
        ]);
    }

    /**
     * Show recovery codes (only if 2FA is enabled).
     */
    public function recoveryCodes(Request $request): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();

        if (!$user->hasTwoFactorEnabled()) {
            return response()->json(['message' => '2FA belum diaktifkan.'], 422);
        }

        $codes = json_decode(decrypt($user->two_factor_recovery_codes), true);

        return response()->json(['recovery_codes' => $codes]);
    }

    /**
     * Regenerate recovery codes.
     */
    public function regenerateRecoveryCodes(Request $request): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();

        if (!$user->hasTwoFactorEnabled()) {
            return response()->json(['message' => '2FA belum diaktifkan.'], 422);
        }

        $recoveryCodes = $this->generateRecoveryCodes();

        $user->forceFill([
            'two_factor_recovery_codes' => encrypt(json_encode($recoveryCodes)),
        ])->save();

        return response()->json([
            'message'        => 'Recovery codes berhasil diperbarui.',
            'recovery_codes' => $recoveryCodes,
        ]);
    }

    // ──────────────────────────────────────────────────────────────────
    // LOGIN FLOW — verify 2FA code during login challenge
    // ──────────────────────────────────────────────────────────────────

    /**
     * Verify a 2FA code during login.
     * Accepts a temporary "2fa_token" stored in cache/session.
     */
    public function verifyLogin(Request $request): JsonResponse
    {
        $request->validate([
            'two_factor_token' => ['required', 'string'],
            'code'             => ['required', 'string'],
        ]);

        $cacheKey = '2fa_login_' . $request->two_factor_token;
        $userId   = cache()->get($cacheKey);

        if (!$userId) {
            return response()->json(['message' => 'Token login 2FA tidak valid atau sudah kadaluarsa.'], 422);
        }

        /** @var User $user */
        $user   = User::findOrFail($userId);
        $secret = decrypt($user->two_factor_secret);

        $valid = $this->google2fa->verifyKey($secret, $request->code);
        if (!$valid) {
            $valid = $this->checkRecoveryCode($user, $request->code);
        }

        if (!$valid) {
            return response()->json(['message' => 'Kode 2FA tidak valid.'], 422);
        }

        // Consume the temporary token
        cache()->forget($cacheKey);

        // Issue real auth token
        $tokenResult = $user->createToken('auth_token');
        SessionController::enrichToken($tokenResult->accessToken, $request);

        return response()->json([
            'user'    => $user,
            'token'   => $tokenResult->plainTextToken,
            'message' => 'Login berhasil.',
        ]);
    }

    // ──────────────────────────────────────────────────────────────────
    // PRIVATE HELPERS
    // ──────────────────────────────────────────────────────────────────

    private function generateRecoveryCodes(int $count = 8): array
    {
        return array_map(
            fn() => strtoupper(Str::random(5) . '-' . Str::random(5)),
            range(1, $count)
        );
    }

    private function checkRecoveryCode(User $user, string $code): bool
    {
        if (!$user->two_factor_recovery_codes) return false;

        $codes = json_decode(decrypt($user->two_factor_recovery_codes), true);
        $code  = strtoupper(trim($code));

        if (!in_array($code, $codes, true)) return false;

        // Burn the used recovery code (single-use)
        $remaining = array_filter($codes, fn($c) => $c !== $code);
        $user->forceFill([
            'two_factor_recovery_codes' => encrypt(json_encode(array_values($remaining))),
        ])->save();

        return true;
    }
}
