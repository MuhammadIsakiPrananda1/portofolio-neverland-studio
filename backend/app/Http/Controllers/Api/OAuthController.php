<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class OAuthController extends Controller
{
    private string $frontendUrl;

    public function __construct()
    {
        $this->frontendUrl = env('FRONTEND_URL', config('app.url', 'http://portofolio.neverlandstudio.my.id'));
    }

    // ──────────────────────────────────────────────────────────────
    // GOOGLE
    // ──────────────────────────────────────────────────────────────

    public function redirectToGoogle()
    {
        // Validate that Google OAuth is configured using config()
        if (!config('services.google.client_id') || !config('services.google.client_secret')) {
            return redirect($this->frontendUrl . '/auth/callback?error=' . urlencode('Google OAuth belum dikonfigurasi. Hubungi administrator.'));
        }
        
        try {
            return Socialite::driver('google')->stateless()->redirect();
        } catch (\Throwable $e) {
            \Log::error('Google OAuth redirect error: ' . $e->getMessage());
            return redirect($this->frontendUrl . '/auth/callback?error=' . urlencode('Gagal menginisiasi Google login. Coba lagi.'));
        }
    }

    public function handleGoogleCallback(Request $request)
    {
        if ($request->has('error')) {
            $error = $request->error_description ?? $request->error;
            \Log::warning('Google OAuth error: ' . $error);
            return redirect($this->frontendUrl . '/auth/callback?error=' . urlencode('Google login ditolak: ' . $error));
        }

        try {
            /** @var \Laravel\Socialite\Two\User $googleUser */
            $googleUser = Socialite::driver('google')->stateless()->user();

            $email = $googleUser->getEmail();
            if (empty($email)) {
                \Log::warning('Google OAuth: No email received');
                return redirect($this->frontendUrl . '/auth/callback?error=' . urlencode('Tidak dapat mengambil email dari Google.'));
            }

            $token = $this->findOrCreateUser(
                $email,
                $googleUser->getName() ?? explode('@', $email)[0],
                'google',
                $googleUser->getId(),
                $googleUser->getAvatar()
            );

            return redirect($this->frontendUrl . '/auth/callback?token=' . base64_encode($token) . '&provider=google');

        } catch (\Throwable $e) {
            \Log::error('Google OAuth callback error: ' . $e->getMessage());
            $errorMsg = 'Google login gagal. Coba lagi atau hubungi administrator.';
            if (str_contains($e->getMessage(), 'UnableToRetrieveAccessToken')) {
                $errorMsg = 'Google: Kode akses tidak valid. Coba login lagi.';
            } elseif (str_contains($e->getMessage(), 'invalid_client')) {
                $errorMsg = 'Google: Konfigurasi tidak valid. Hubungi administrator.';
            } elseif (str_contains($e->getMessage(), 'invalid_grant')) {
                $errorMsg = 'Google: Akses ditolak. Coba login lagi.';
            }
            return redirect($this->frontendUrl . '/auth/callback?error=' . urlencode($errorMsg));
        }
    }

    // ──────────────────────────────────────────────────────────────
    // GITHUB
    // ──────────────────────────────────────────────────────────────

    public function redirectToGithub()
    {
        // Validate that GitHub OAuth is configured using config()
        if (!config('services.github.client_id') || !config('services.github.client_secret')) {
            return redirect($this->frontendUrl . '/auth/callback?error=' . urlencode('GitHub OAuth belum dikonfigurasi. Hubungi administrator.'));
        }
        
        try {
            return Socialite::driver('github')->stateless()->redirect();
        } catch (\Throwable $e) {
            \Log::error('GitHub OAuth redirect error: ' . $e->getMessage());
            return redirect($this->frontendUrl . '/auth/callback?error=' . urlencode('Gagal menginisiasi GitHub login. Coba lagi.'));
        }
    }

    public function handleGithubCallback(Request $request)
    {
        if ($request->has('error')) {
            $error = $request->error_description ?? $request->error;
            \Log::warning('GitHub OAuth error: ' . $error);
            return redirect($this->frontendUrl . '/auth/callback?error=' . urlencode('GitHub login ditolak: ' . $error));
        }

        try {
            /** @var \Laravel\Socialite\Two\User $githubUser */
            $githubUser = Socialite::driver('github')->stateless()->user();
            
            $email = $githubUser->getEmail();
            if (empty($email)) {
                \Log::warning('GitHub OAuth: Attempting to fetch email from GitHub API');
                // Try to fetch email from GitHub API
                $response = $githubUser->getResponse();
                $client = new \GuzzleHttp\Client();
                try {
                    $emailResponse = $client->get('https://api.github.com/user/emails', [
                        'headers' => ['Authorization' => 'Bearer ' . $githubUser->token]
                    ]);
                    $emails = json_decode($emailResponse->getBody(), true);
                    $email = collect($emails)->firstWhere('primary')['email'] ?? ($emails[0]['email'] ?? null);
                } catch (\Exception $e) {
                    \Log::error('Failed to fetch GitHub email: ' . $e->getMessage());
                }

                if (empty($email)) {
                    return redirect($this->frontendUrl . '/auth/callback?error=' . urlencode('Tidak dapat mengambil email dari GitHub. Pastikan email Anda public di GitHub settings.'));
                }
            }

            $token = $this->findOrCreateUser(
                $email,
                $githubUser->getName() ?? $githubUser->getNickname() ?? 'GitHub User',
                'github',
                $githubUser->getId(),
                $githubUser->getAvatar()
            );

            return redirect($this->frontendUrl . '/auth/callback?token=' . base64_encode($token) . '&provider=github');

        } catch (\Throwable $e) {
            \Log::error('GitHub OAuth callback error: ' . $e->getMessage());
            $errorMsg = 'GitHub login gagal. Coba lagi atau hubungi administrator.';
            if (str_contains($e->getMessage(), 'UnableToRetrieveAccessToken')) {
                $errorMsg = 'GitHub: Kode akses tidak valid. Coba login lagi.';
            } elseif (str_contains($e->getMessage(), 'invalid_client')) {
                $errorMsg = 'GitHub: Konfigurasi tidak valid. Hubungi administrator.';
            }
            return redirect($this->frontendUrl . '/auth/callback?error=' . urlencode($errorMsg));
        }
    }

    // ──────────────────────────────────────────────────────────────
    // SHARED HELPER
    // ──────────────────────────────────────────────────────────────

    /**
     * Find or create user by email (ANTI-DUPLIKASI LOGIC)
     * 
     * RULE: 1 email = 1 akun, regardless of OAuth provider
     * 
     * Logic:
     * 1. Cari user berdasarkan email
     * 2. Jika ada: update provider ID bila belum ada
     * 3. Jika tidak ada: create user baru dengan provider OAuth
     */
    private function findOrCreateUser(string $email, string $name, string $provider, string $providerId, ?string $avatar = null): string
    {
        $providerField = $provider . '_id';  // google_id atau github_id

        // STEP 1: Cari user dengan email ini (paling penting untuk anti-duplikasi)
        $user = User::where('email', $email)->first();

        if ($user) {
            // USER SUDAH ADA → Update provider ID jika belum ada
            $updates = [];

            // Update provider_id (google_id atau github_id)
            if (empty($user->{$providerField})) {
                $updates[$providerField] = $providerId;
            }

            // Update avatar jika belum ada dan ada avatar baru
            if (empty($user->avatar) && !empty($avatar)) {
                $updates['avatar'] = $avatar;
            }

            // Update provider field ke provider terbaru yang login (untuk tracking)
            if (empty($user->provider)) {
                $updates['provider'] = $provider;
            }

            // Jika ada update, save
            if (!empty($updates)) {
                $user->update($updates);
                \Log::info("OAuth: Updated user {$user->id} with {$provider} ID");
            } else {
                \Log::info("OAuth: User {$user->id} already has {$provider} linked");
            }
        } else {
            // USER BELUM ADA → Create user baru dengan OAuth provider
            $user = User::create([
                'name'                => $name,
                'email'               => $email,
                'email_verified_at'   => now(),  // OAuth email sudah verified
                $providerField        => $providerId,  // google_id atau github_id
                'provider'            => $provider,     // Tracking provider
                'avatar'              => $avatar,
                // Password: jangan set untuk OAuth-only users, biarkan NULL
                // User bisa set password later via profile settings
            ]);

            \Log::info("OAuth: Created new user {$user->id} via {$provider}");
        }

        // STEP 2: Generate token untuk sesi ini
        $tokenResult = $user->createToken('auth_token_' . $provider);
        SessionController::enrichToken($tokenResult->accessToken, request());

        return $tokenResult->plainTextToken;
    }
}
