<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Security Headers Middleware
 * 
 * Adds essential security headers to all responses:
 * - Content Security Policy (CSP)
 * - X-Frame-Options (clickjacking protection)
 * - X-Content-Type-Options (MIME type sniffing)
 * - X-XSS-Protection (legacy XSS filter)
 * - Referrer-Policy (control referrer information)
 * - Strict-Transport-Security (force HTTPS)
 */
class SecurityHeaders
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Content Security Policy: Prevent XSS, clickjacking, etc.
        $response->header('Content-Security-Policy', implode('; ', [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net", // React needs unsafe-inline
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
            "img-src 'self' data: https:",
            "connect-src 'self' https:",
            "frame-src 'self'",
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self'",
            "upgrade-insecure-requests",
        ]));

        // Prevent clickjacking attacks
        $response->header('X-Frame-Options', 'SAMEORIGIN');

        // Prevent MIME type sniffing
        $response->header('X-Content-Type-Options', 'nosniff');

        // Legacy IE XSS filter
        $response->header('X-XSS-Protection', '1; mode=block');

        // Control referrer information
        $response->header('Referrer-Policy', 'strict-origin-when-cross-origin');

        // Force HTTPS (only in production)
        if (config('app.env') === 'production') {
            $response->header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
        }

        // Disable unnecessary HTTP methods
        if ($request->getMethod() === 'TRACE' || $request->getMethod() === 'TRACK') {
            return response('Not Allowed', 405);
        }

        return $response;
    }
}
