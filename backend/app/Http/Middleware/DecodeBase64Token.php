<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class DecodeBase64Token
{
    /**
     * Handle an incoming request.
     * Decodes Base64-encoded bearer tokens to bypass ModSecurity CRS rules
     * that block the pipe '|' character used by Laravel Sanctum.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $header = $request->header('Authorization', '');
        
        if (str_starts_with($header, 'Bearer ')) {
            $token = substr($header, 7);
            
            // If the token does not contain a pipe, it might be base64 encoded
            if (strpos($token, '|') === false) {
                // Decode assuming it's base64
                $decoded = base64_decode($token, true);
                
                // If valid base64 and the decoded string contains the Sanctum pipe '|', use it
                if ($decoded !== false && strpos($decoded, '|') !== false) {
                    $request->headers->set('Authorization', 'Bearer ' . $decoded);
                }
            }
        }

        return $next($request);
    }
}
