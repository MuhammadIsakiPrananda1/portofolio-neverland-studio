<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Symfony\Component\HttpFoundation\Response;

/**
 * Advanced Rate Limiting Middleware
 * 
 * Implements tiered rate limiting:
 * - Login endpoints: 5 attempts/5 minutes per IP+email
 * - CTF submissions: 10 attempts/1 minute per user
 * - API endpoints: 100 requests/1 hour per IP
 * - Email operations: 3 attempts/10 minutes per IP
 */
class AdvancedRateLimiting
{
    protected $limiters = [
        // Endpoint: [limit, decay_minutes]
        'login'      => [5, 5],      // 5 attempts per 5 minutes
        'register'   => [3, 10],     // 3 attempts per 10 minutes
        'challenge'  => [10, 1],     // 10 submissions per 1 minute
        'reset'      => [3, 10],     // 3 password resets per 10 minutes
        'api'        => [100, 60],   // 100 API calls per hour
    ];

    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Detect endpoint type
        $limiterKey = $this->detectEndpoint($request);

        if (!$limiterKey || !isset($this->limiters[$limiterKey])) {
            return $next($request);
        }

        [$limit, $decay] = $this->limiters[$limiterKey];
        
        // Build throttle key based on endpoint type
        $throttleKey = match ($limiterKey) {
            'login', 'register' => "auth:{$limiterKey}:" . $request->ip() . ':' . ($request->input('email') ?? ''),
            'challenge' => "ctf:submit:" . auth()->id() . ':' . $request->route('challenge_id') ?? '',
            'reset' => "auth:reset:" . $request->ip(),
            default => "api:" . $request->ip(),
        };

        // Check rate limit
        if (RateLimiter::tooManyAttempts($throttleKey, $limit)) {
            $seconds = RateLimiter::availableIn($throttleKey);
            
            return response()->json([
                'status' => 'error',
                'message' => "Too many attempts. Please try again in {$seconds} seconds.",
                'retry_after' => $seconds,
            ], 429)->header('Retry-After', $seconds);
        }

        RateLimiter::hit($throttleKey, $decay * 60);

        return $next($request);
    }

    /**
     * Detect which rate limiter to apply
     */
    private function detectEndpoint(Request $request): ?string
    {
        $path = $request->path();

        if (str_contains($path, '/auth/login')) return 'login';
        if (str_contains($path, '/auth/register')) return 'register';
        if (str_contains($path, '/challenges') && $request->isMethod('post')) return 'challenge';
        if (str_contains($path, '/auth/forgot-password') || str_contains($path, '/auth/reset-password')) return 'reset';
        
        return 'api';
    }
}
