<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

use Illuminate\Support\Facades\RateLimiter;

class AuthController extends Controller
{
    /**
     * Register a new user
     */
    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'                  => ['required', 'string', 'max:255'],
            'email'                 => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password'              => ['required', 'string', 'min:8', 'confirmed'],
            'password_confirmation' => ['required', 'string'],
        ]);

        $user = User::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $tokenResult = $user->createToken('auth_token');
        SessionController::enrichToken($tokenResult->accessToken, $request);

        return response()->json([
            'user'    => $user,
            'token'   => base64_encode($tokenResult->plainTextToken), // Base64 encode to bypass WAF
            'message' => 'Registration successful',
        ], 201);
    }

    /**
     * Login user and issue token
     * 
     * Security features:
     * - Rate limiting per email+IP
     * - Account lockout after 5 failed attempts
     * - Login attempt logging
     * - Last login tracking
     * - 2FA support
     */
    public function login(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'email'    => ['required', 'string', 'email', 'max:255'],
                'password' => ['required', 'string', 'min:8'],
            ], [
                'email.required' => 'Email is required',
                'email.email' => 'Email must be valid',
                'password.required' => 'Password is required',
                'password.min' => 'Password must be at least 8 characters',
            ]);

            $email = strtolower(trim($validated['email']));
            $ipAddress = $request->ip();
            $throttleKey = "login:{$email}:{$ipAddress}";

            // Rate limiting: max 5 attempts per 5 minutes
            if (\Illuminate\Support\Facades\RateLimiter::tooManyAttempts($throttleKey, 5)) {
                $seconds = \Illuminate\Support\Facades\RateLimiter::availableIn($throttleKey);
                
                return response()->json([
                    'status' => 'error',
                    'message' => "Too many login attempts. Please try again in {$seconds} seconds.",
                    'retry_after' => $seconds,
                ], 429);
            }

            // Find user
            $user = User::where('email', $email)->first();

            if (!$user) {
                RateLimiter::hit($throttleKey, 5 * 60); // 5 minutes
                
                return response()->json([
                    'status' => 'error',
                    'message' => 'Email or password is incorrect.',
                ], 401);
            }

            // Check if account is suspended
            if ($user->isSuspended()) {
                \Log::warning('Login attempt on suspended account', [
                    'email' => $email,
                    'ip' => $ipAddress,
                ]);

                return response()->json([
                    'status' => 'error',
                    'message' => 'This account has been suspended.',
                ], 403);
            }

            // Check if account is locked
            if ($user->isAccountLocked()) {
                $remainingSeconds = $user->locked_until->diffInSeconds(now());

                return response()->json([
                    'status' => 'error',
                    'message' => "Account is locked due to multiple failed login attempts. Please try again in {$remainingSeconds} seconds.",
                    'retry_after' => $remainingSeconds,
                ], 423);
            }

            // Verify password
            if (!Hash::check($validated['password'], $user->password)) {
                $user->incrementFailedAttempts();

                RateLimiter::hit($throttleKey, 5 * 60);

                // Lock account if 5 failed attempts
                if ($user->failed_login_attempts >= 5) {
                    $user->lockAccount(15); // 15 minutes

                    \Log::warning('Account locked due to failed login attempts', [
                        'email' => $email,
                        'ip' => $ipAddress,
                        'attempts' => $user->failed_login_attempts,
                    ]);

                    return response()->json([
                        'status' => 'error',
                        'message' => 'Account locked due to multiple failed attempts. Please try again in 15 minutes.',
                        'retry_after' => 900,
                    ], 423);
                }

                return response()->json([
                    'status' => 'error',
                    'message' => 'Email or password is incorrect.',
                ], 401);
            }

            // Check if email is verified
            if (!$user->isEmailVerified()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Please verify your email before logging in.',
                ], 403);
            }

            // Reset failed attempts and unlock on successful login
            $user->resetFailedAttempts();
            $user->recordLogin($ipAddress);

            RateLimiter::clear($throttleKey);

            // Check if 2FA is enabled
            if ($user->hasTwoFactorEnabled()) {
                $tempToken = Str::random(40);
                cache()->put('2fa_login_' . $tempToken, $user->id, now()->addMinutes(5));

                \Log::info('2FA prompt shown', [
                    'email' => $email,
                    'ip' => $ipAddress,
                ]);

                return response()->json([
                    'status' => 'success',
                    'two_factor_required' => true,
                    'two_factor_token' => $tempToken,
                    'message' => 'Enter your 2FA code from your authenticator app.',
                ]);
            }

            // Generate authentication token
            $tokenResult = $user->createToken('auth_token');

            \Log::info('User login successful', [
                'email' => $email,
                'ip' => $ipAddress,
                'timestamp' => now(),
            ]);

            return response()->json([
                'status' => 'success',
                'user' => $user,
                'token' => base64_encode($tokenResult->plainTextToken), // Base64 for WAF compatibility
                'message' => 'Login successful',
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Login error: ' . $e->getMessage(), [
                'email' => $validated['email'] ?? null,
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred during login. Please try again.',
            ], 500);
        }
    }

    /**
     * Logout — revoke current token
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()?->currentAccessToken()?->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }

    /**
     * Get authenticated user
     */
    public function user(Request $request): JsonResponse
    {
        return response()->json($request->user());
    }

    /**
     * Send password reset link
     */
    public function forgotPassword(Request $request): JsonResponse
    {
        $request->validate(['email' => ['required', 'email']]);

        $status = Password::sendResetLink($request->only('email'));

        if ($status === Password::RESET_LINK_SENT) {
            return response()->json(['message' => 'Link reset password telah dikirim ke email Anda.']);
        }

        return response()->json(['message' => 'Tidak dapat mengirim link reset.'], 422);
    }

    /**
     * Reset password using token
     */
    public function resetPassword(Request $request): JsonResponse
    {
        $request->validate([
            'token'                 => ['required'],
            'email'                 => ['required', 'email'],
            'password'              => ['required', 'string', 'min:8', 'confirmed'],
            'password_confirmation' => ['required', 'string'],
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill(['password' => Hash::make($password)])->save();
                $user->tokens()->delete();
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return response()->json(['message' => 'Password berhasil direset.']);
        }

        return response()->json(['message' => 'Token reset tidak valid atau sudah kadaluarsa.'], 422);
    }

    /**
     * Update authenticated user profile
     */
    public function updateProfile(Request $request): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();

        $validated = $request->validate([
            'name'   => ['sometimes', 'string', 'max:255'],
            'phone'  => ['sometimes', 'nullable', 'string', 'max:20'],
            'avatar' => ['sometimes', 'nullable', 'string'],
        ]);

        $user->update($validated);

        return response()->json($user->fresh());
    }

    /**
     * Update authenticated user password
     */
    public function updatePassword(Request $request): JsonResponse
    {
        $request->validate([
            'current_password' => ['required', 'string'],
            'password'         => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        /** @var User $user */
        $user = $request->user();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'Password saat ini salah.'], 422);
        }

        $user->update(['password' => Hash::make($request->password)]);
        $user->tokens()->delete();

        return response()->json(['message' => 'Password berhasil diperbarui.']);
    }
}
