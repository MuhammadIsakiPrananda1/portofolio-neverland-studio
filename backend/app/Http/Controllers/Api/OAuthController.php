<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use GuzzleHttp\Client;

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
        $clientId = config('services.google.client_id');

        if (empty($clientId)) {
            return redirect($this->frontendUrl . '/auth/callback?error=google_not_configured');
        }

        $params = http_build_query([
            'client_id'     => $clientId,
            'redirect_uri'  => config('services.google.redirect'),
            'response_type' => 'code',
            'scope'         => 'openid email profile',
            'access_type'   => 'online',
            'state'         => Str::random(32),
        ]);

        return redirect('https://accounts.google.com/o/oauth2/v2/auth?' . $params);
    }

    public function handleGoogleCallback(Request $request)
    {
        if ($request->has('error')) {
            return redirect($this->frontendUrl . '/auth/callback?error=' . urlencode($request->error));
        }

        try {
            $http = new Client(['timeout' => 10]);

            // Exchange code for access token
            $tokenResponse = $http->post('https://oauth2.googleapis.com/token', [
                'form_params' => [
                    'code'          => $request->code,
                    'client_id'     => config('services.google.client_id'),
                    'client_secret' => config('services.google.client_secret'),
                    'redirect_uri'  => config('services.google.redirect'),
                    'grant_type'    => 'authorization_code',
                ],
            ]);

            $tokenData = json_decode($tokenResponse->getBody(), true);

            // Get user info
            $userResponse = $http->get('https://www.googleapis.com/oauth2/v3/userinfo', [
                'headers' => ['Authorization' => 'Bearer ' . $tokenData['access_token']],
            ]);

            $googleUser = json_decode($userResponse->getBody(), true);

            $token = $this->findOrCreateUser(
                $googleUser['email'],
                $googleUser['name'] ?? explode('@', $googleUser['email'])[0],
                'google'
            );

            return redirect($this->frontendUrl . '/auth/callback?token=' . $token . '&provider=google');

        } catch (\Throwable $e) {
            return redirect($this->frontendUrl . '/auth/callback?error=' . urlencode('Google login gagal: ' . $e->getMessage()));
        }
    }

    // ──────────────────────────────────────────────────────────────
    // GITHUB
    // ──────────────────────────────────────────────────────────────

    public function redirectToGithub()
    {
        $clientId = config('services.github.client_id');

        if (empty($clientId)) {
            return redirect($this->frontendUrl . '/auth/callback?error=github_not_configured');
        }

        $params = http_build_query([
            'client_id'    => $clientId,
            'redirect_uri' => config('services.github.redirect'),
            'scope'        => 'user:email',
            'state'        => Str::random(32),
        ]);

        return redirect('https://github.com/login/oauth/authorize?' . $params);
    }

    public function handleGithubCallback(Request $request)
    {
        if ($request->has('error')) {
            return redirect($this->frontendUrl . '/auth/callback?error=' . urlencode($request->error_description ?? $request->error));
        }

        try {
            $http = new Client(['timeout' => 10]);

            // Exchange code for access token
            $tokenResponse = $http->post('https://github.com/login/oauth/access_token', [
                'headers'     => ['Accept' => 'application/json'],
                'form_params' => [
                    'client_id'     => config('services.github.client_id'),
                    'client_secret' => config('services.github.client_secret'),
                    'code'          => $request->code,
                    'redirect_uri'  => config('services.github.redirect'),
                ],
            ]);

            $tokenData = json_decode($tokenResponse->getBody(), true);

            // Get user info
            $userResponse = $http->get('https://api.github.com/user', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $tokenData['access_token'],
                    'User-Agent'    => 'NeverlandStudio/1.0',
                ],
            ]);

            $githubUser = json_decode($userResponse->getBody(), true);

            // GitHub email can be null — fetch primary email separately
            $email = $githubUser['email'];
            if (empty($email)) {
                $emailsResponse = $http->get('https://api.github.com/user/emails', [
                    'headers' => [
                        'Authorization' => 'Bearer ' . $tokenData['access_token'],
                        'User-Agent'    => 'NeverlandStudio/1.0',
                    ],
                ]);
                $emails = json_decode($emailsResponse->getBody(), true);
                foreach ($emails as $e) {
                    if ($e['primary'] && $e['verified']) {
                        $email = $e['email'];
                        break;
                    }
                }
            }

            if (empty($email)) {
                return redirect($this->frontendUrl . '/auth/callback?error=' . urlencode('Tidak dapat mengambil email dari GitHub.'));
            }

            $token = $this->findOrCreateUser(
                $email,
                $githubUser['name'] ?? $githubUser['login'],
                'github'
            );

            return redirect($this->frontendUrl . '/auth/callback?token=' . $token . '&provider=github');

        } catch (\Throwable $e) {
            return redirect($this->frontendUrl . '/auth/callback?error=' . urlencode('GitHub login gagal: ' . $e->getMessage()));
        }
    }

    // ──────────────────────────────────────────────────────────────
    // SHARED HELPER
    // ──────────────────────────────────────────────────────────────

    private function findOrCreateUser(string $email, string $name, string $provider): string
    {
        $user = User::firstOrCreate(
            ['email' => $email],
            [
                'name'              => $name,
                'password'          => Hash::make(Str::random(32)),
                'email_verified_at' => now(),
            ]
        );

        // Issue new token (keep others for multi-device)
        $tokenResult = $user->createToken('auth_token_' . $provider);
        SessionController::enrichToken($tokenResult->accessToken, request());

        return $tokenResult->plainTextToken;
    }
}
