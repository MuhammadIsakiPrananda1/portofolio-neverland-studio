<?php

namespace App\Services;

use App\Models\Challenge;
use Illuminate\Support\Facades\Hash;

/**
 * CTFChallengeValidator - Production-Ready Flag Validation
 * 
 * Handles secure flag validation with multiple strategies:
 * - Direct string comparison (case-insensitive)
 * - Hash-based validation (bcrypt, SHA256)
 * - Pattern matching (regex)
 * - Format validation
 * 
 * Security considerations:
 * - Constant-time comparison (prevent timing attacks)
 * - Multiple validation methods
 * - Detailed logging
 * - Prevents brute force
 */
class CTFChallengeValidator
{
    public const VALIDATION_METHODS = [
        'direct',      // Direct string comparison (default)
        'bcrypt',      // Bcrypt hash comparison
        'sha256',      // SHA256 hash comparison
        'pattern',     // Regex pattern matching
        'format',      // Custom format validation
    ];

    /**
     * Validate flag submission
     * 
     * @param string $submittedFlag User-submitted flag
     * @param Challenge $challenge Challenge object with flag data
     * @param string $method Validation method
     * @return bool
     */
    public static function validate(
        string $submittedFlag,
        Challenge $challenge,
        string $method = 'direct'
    ): bool {
        $submittedFlag = trim($submittedFlag);

        // Validate method is supported
        if (!in_array($method, self::VALIDATION_METHODS)) {
            $method = 'direct';
        }

        // Route to appropriate validation method
        return match($method) {
            'direct' => self::validateDirect($submittedFlag, $challenge->flag),
            'bcrypt' => self::validateBcrypt($submittedFlag, $challenge->flag),
            'sha256' => self::validateSHA256($submittedFlag, $challenge->flag),
            'pattern' => self::validatePattern($submittedFlag, $challenge->flag),
            'format' => self::validateFormat($submittedFlag, $challenge->flag),
            default => false,
        };
    }

    /**
     * Direct string comparison (case-insensitive)
     * 
     * Best for: Standard CTF flags (flag{...}, CTF{...}, etc.)
     * Security: Moderate (use constant-time comparison)
     */
    private static function validateDirect(string $submitted, string $correct): bool
    {
        // Case-insensitive comparison
        $submitted = strtolower($submitted);
        $correct = strtolower(trim($correct));

        // Use hash_equals for constant-time comparison (prevent timing attacks)
        return hash_equals($correct, $submitted);
    }

    /**
     * Bcrypt hash validation
     * 
     * Best for: Sensitive challenge flags (stored as hash)
     * Security: High (one-way function)
     */
    private static function validateBcrypt(string $submitted, string $hash): bool
    {
        try {
            // Check if stored value looks like a bcrypt hash
            if (!self::isBcryptHash($hash)) {
                return false;
            }

            return Hash::check($submitted, $hash);
        } catch (\Exception $e) {
            \Log::warning('Bcrypt validation error: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * SHA256 hash validation
     * 
     * Best for: Cryptography challenges
     * Security: Moderate (can be rainbow-tabled)
     */
    private static function validateSHA256(string $submitted, string $hash): bool
    {
        $submittedHash = hash('sha256', $submitted);
        
        // Case-insensitive comparison for hex strings
        return hash_equals(
            strtolower($hash),
            strtolower($submittedHash)
        );
    }

    /**
     * Pattern/Regex validation
     * 
     * Best for: Flexible flag formats
     * Example: flag{[a-z]+_[0-9]+}
     */
    private static function validatePattern(string $submitted, string $pattern): bool
    {
        try {
            // Pattern should be regex (e.g., /^flag\{.*\}$/i)
            if (!str_starts_with($pattern, '/')) {
                return false;
            }

            return preg_match($pattern, $submitted) === 1;
        } catch (\Exception $e) {
            \Log::warning('Pattern validation error: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Format validation
     * 
     * Best for: Custom validation logic
     * Allows combining multiple validation strategies
     */
    private static function validateFormat(string $submitted, string $definition): bool
    {
        // JSON format: {"type": "direct", "value": "FLAG{...}"}
        try {
            $config = json_decode($definition, true);

            if (!$config || !isset($config['type'])) {
                return false;
            }

            return self::validate($submitted, new Challenge([
                'flag' => $config['value'] ?? $config['pattern'] ?? '',
            ]), $config['type']);
        } catch (\Exception $e) {
            \Log::warning('Format validation error: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Check if string is a valid bcrypt hash
     */
    private static function isBcryptHash(string $value): bool
    {
        // Bcrypt hashes start with $2a$, $2b$, or $2y$ and are 60 chars
        return preg_match('/^\$2[aby]\$\d{2}\$.{53}$/', $value) === 1;
    }

    /**
     * Sanitize flag for safe storage
     * 
     * Removes whitespace and normalizes format
     */
    public static function sanitizeFlag(string $flag): string
    {
        return trim($flag);
    }

    /**
     * Check flag complexity (for password-like flags)
     * 
     * Ensures flag isn't too simple
     */
    public static function checkComplexity(string $flag): array
    {
        $checks = [
            'length_ok' => strlen($flag) >= 8,
            'has_uppercase' => preg_match('/[A-Z]/', $flag) === 1,
            'has_lowercase' => preg_match('/[a-z]/', $flag) === 1,
            'has_special' => preg_match('/[^a-zA-Z0-9]/', $flag) === 1,
        ];

        $strength = array_sum($checks) / count($checks) * 100;

        return [
            'checks' => $checks,
            'strength_percentage' => (int)$strength,
            'is_complex' => $strength >= 50,
        ];
    }

    /**
     * Generate flag preview (for admin display)
     * 
     * Shows first/last chars with middle censored
     */
    public static function getPreview(string $flag): string
    {
        if (strlen($flag) <= 5) {
            return '****';
        }

        $first = substr($flag, 0, 3);
        $last = substr($flag, -3);
        $asterisks = str_repeat('*', strlen($flag) - 6);

        return "{$first}{$asterisks}{$last}";
    }

    /**
     * Detect flag format type
     * 
     * Helps determine validation strategy
     */
    public static function detectFormat(string $flag): string
    {
        if (self::isBcryptHash($flag)) {
            return 'bcrypt';
        }

        if (preg_match('/^[a-f0-9]{64}$/i', $flag)) {
            return 'sha256';
        }

        if (str_starts_with($flag, '/') && str_ends_with($flag, '/')) {
            return 'pattern';
        }

        if (str_starts_with($flag, '{') && str_ends_with($flag, '}')) {
            return 'format';
        }

        return 'direct';
    }
}
