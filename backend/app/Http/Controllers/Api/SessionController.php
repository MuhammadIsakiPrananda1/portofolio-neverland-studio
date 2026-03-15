<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class SessionController extends Controller
{
    /**
     * Ambil semua sesi aktif milik user yang sedang login.
     */
    public function index(Request $request): JsonResponse
    {
        /** @var \App\Models\User $user */
        $user = $request->user();

        $currentTokenId = $user->currentAccessToken()->id;

        $sessions = $user->tokens()
            ->orderByDesc('last_used_at')
            ->get()
            ->map(function ($token) use ($currentTokenId, $request) {
                return [
                    'id'          => $token->id,
                    'device'      => $this->parseDevice($token->user_agent),
                    'browser'     => $this->parseBrowser($token->user_agent),
                    'os'          => $this->parseOS($token->user_agent),
                    'ip_address'  => $token->ip_address ?? 'Unknown',
                    'location'    => $token->location ?? 'Unknown',
                    'last_active' => $token->last_used_at?->diffForHumans() ?? 'Never',
                    'created_at'  => $token->created_at->diffForHumans(),
                    'current'     => $token->id === $currentTokenId,
                ];
            });

        return response()->json(['sessions' => $sessions]);
    }

    /**
     * Revoke sesi tertentu (tidak bisa revoke sesi aktif sendiri).
     */
    public function revoke(Request $request, int $id): JsonResponse
    {
        /** @var \App\Models\User $user */
        $user = $request->user();

        $currentTokenId = $user->currentAccessToken()->id;

        if ($id === $currentTokenId) {
            return response()->json(['message' => 'Tidak bisa merevoke sesi yang sedang aktif.'], 422);
        }

        $deleted = $user->tokens()->where('id', $id)->delete();

        if (!$deleted) {
            return response()->json(['message' => 'Sesi tidak ditemukan.'], 404);
        }

        return response()->json(['message' => 'Sesi berhasil direvoke.']);
    }

    /**
     * Revoke semua sesi kecuali yang sedang aktif.
     */
    public function revokeAll(Request $request): JsonResponse
    {
        /** @var \App\Models\User $user */
        $user = $request->user();

        $currentTokenId = $user->currentAccessToken()->id;

        $user->tokens()->where('id', '!=', $currentTokenId)->delete();

        return response()->json(['message' => 'Semua sesi lain berhasil direvoke.']);
    }

    // ──────────────────────────────────────────────────────────────────────────
    // HELPERS — User-Agent parsing (tanpa library eksternal)
    // ──────────────────────────────────────────────────────────────────────────

    private function parseDevice(?string $ua): string
    {
        if (!$ua) return 'Unknown Device';

        if (preg_match('/iPhone/i', $ua))                  return 'iPhone';
        if (preg_match('/iPad/i', $ua))                    return 'iPad';
        if (preg_match('/Android.*Mobile/i', $ua))         return 'Android Phone';
        if (preg_match('/Android/i', $ua))                 return 'Android Tablet';
        if (preg_match('/Macintosh/i', $ua))               return 'Mac';
        if (preg_match('/Windows NT/i', $ua))              return 'Windows PC';
        if (preg_match('/Linux/i', $ua))                   return 'Linux PC';
        if (preg_match('/CrOS/i', $ua))                    return 'Chromebook';

        return 'Unknown Device';
    }

    private function parseBrowser(?string $ua): string
    {
        if (!$ua) return 'Unknown Browser';

        if (preg_match('/Edg\//i', $ua))                   return 'Edge';
        if (preg_match('/OPR\//i', $ua))                   return 'Opera';
        if (preg_match('/Chrome\/(\d+)/i', $ua, $m))       return 'Chrome ' . $m[1];
        if (preg_match('/Firefox\/(\d+)/i', $ua, $m))      return 'Firefox ' . $m[1];
        if (preg_match('/Safari\/(\d+)/i', $ua, $m))       return 'Safari';
        if (preg_match('/MSIE|Trident/i', $ua))            return 'Internet Explorer';

        return 'Unknown Browser';
    }

    private function parseOS(?string $ua): string
    {
        if (!$ua) return 'Unknown OS';

        if (preg_match('/Windows NT 10/i', $ua))           return 'Windows 10/11';
        if (preg_match('/Windows NT 6\.3/i', $ua))         return 'Windows 8.1';
        if (preg_match('/Windows NT 6\.1/i', $ua))         return 'Windows 7';
        if (preg_match('/Windows/i', $ua))                 return 'Windows';
        if (preg_match('/Mac OS X ([\d_]+)/i', $ua, $m))   return 'macOS ' . str_replace('_', '.', $m[1]);
        if (preg_match('/Android ([\d.]+)/i', $ua, $m))    return 'Android ' . $m[1];
        if (preg_match('/iPhone OS ([\d_]+)/i', $ua, $m))  return 'iOS ' . str_replace('_', '.', $m[1]);
        if (preg_match('/CrOS/i', $ua))                    return 'Chrome OS';
        if (preg_match('/Linux/i', $ua))                   return 'Linux';

        return 'Unknown OS';
    }

    // ──────────────────────────────────────────────────────────────────────────
    // STATIC helper — dipanggil saat login/register/OAuth untuk simpan meta
    // ──────────────────────────────────────────────────────────────────────────

    public static function enrichToken(\Laravel\Sanctum\PersonalAccessToken $token, Request $request): void
    {
        $ip = $request->header('CF-Connecting-IP')   // Cloudflare real IP
            ?? $request->header('X-Forwarded-For')
            ?? $request->ip();

        // Ambil hanya IP pertama jika ada multiple
        $ip = trim(explode(',', $ip)[0]);

        $location = 'Unknown';
        try {
            // ip-api.com free tier: 45 req/menit, tidak perlu API key
            $response = Http::timeout(3)->get("http://ip-api.com/json/{$ip}?fields=country,regionName,city,status");
            if ($response->ok()) {
                $data = $response->json();
                if (($data['status'] ?? '') === 'success') {
                    $location = implode(', ', array_filter([
                        $data['city']       ?? null,
                        $data['regionName'] ?? null,
                        $data['country']    ?? null,
                    ]));
                }
            }
        } catch (\Throwable) {
            // Gagal fetch geolocation — tidak masalah
        }

        $token->forceFill([
            'ip_address' => $ip,
            'user_agent' => $request->userAgent(),
            'location'   => $location ?: 'Unknown',
        ])->save();
    }
}
