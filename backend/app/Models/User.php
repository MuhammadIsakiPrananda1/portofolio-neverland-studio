<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 * User Model - MySQL Native Authentication
 */
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'avatar',
        'role',
        'status',
        'google_id',
        'github_id',
        'provider',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'two_factor_confirmed_at',
        'email_verified_at',
        'failed_login_attempts',
        'locked_until',
        'last_login_at',
        'last_login_ip',
        'score',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_secret',
        'two_factor_recovery_codes',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at'       => 'datetime',
            'two_factor_confirmed_at' => 'datetime',
            'locked_until'            => 'datetime',
            'last_login_at'           => 'datetime',
            'password'                => 'hashed',
        ];
    }

    /** Whether 2FA has been fully confirmed (enabled) for this user. */
    public function hasTwoFactorEnabled(): bool
    {
        return !is_null($this->two_factor_confirmed_at);
    }

    /**
     * Relationships
     */
    public function blogPosts()
    {
        return $this->hasMany(BlogPost::class, 'author_id');
    }

    public function media()
    {
        return $this->hasMany(Media::class);
    }

    /**
     * CTF Relationships
     */
    public function challengeSolves()
    {
        return $this->hasMany(ChallengeSolve::class);
    }

    public function submissions()
    {
        return $this->hasMany(Submission::class);
    }

    public function firstBloods()
    {
        return $this->hasMany(Challenge::class, 'first_blood_user_id');
    }

    /**
     * Get total CTF score
     */
    public function getTotalScore(): int
    {
        return (int) ChallengeSolve::where('user_id', $this->id)->sum('points_awarded');
    }

    /**
     * Get solved challenges count
     */
    public function getSolvedCount(): int
    {
        return $this->challengeSolves()->count();
    }

    /**
     * Get first blood count
     */
    public function getFirstBloodCount(): int
    {
        return Challenge::where('first_blood_user_id', $this->id)->count();
    }

    /**
     * ========== SECURITY METHODS ==========
     */

    /**
     * Check if account is locked due to failed attempts
     */
    public function isAccountLocked(): bool
    {
        return $this->locked_until && $this->locked_until->isFuture();
    }

    /**
     * Lock account (brute force protection)
     * 
     * @param int $minutes Minutes to lock account
     */
    public function lockAccount(int $minutes = 15): void
    {
        $this->update([
            'locked_until' => now()->addMinutes($minutes),
        ]);
    }

    /**
     * Unlock account
     */
    public function unlockAccount(): void
    {
        $this->update([
            'locked_until' => null,
            'failed_login_attempts' => 0,
        ]);
    }

    /**
     * Increment failed login attempts
     */
    public function incrementFailedAttempts(): void
    {
        $this->increment('failed_login_attempts');
    }

    /**
     * Reset failed login attempts (on successful login)
     */
    public function resetFailedAttempts(): void
    {
        $this->update([
            'failed_login_attempts' => 0,
            'locked_until' => null,
        ]);
    }

    /**
     * Record login attempt
     * 
     * @param string $ipAddress Login IP address
     */
    public function recordLogin(string $ipAddress = ''): void
    {
        $this->update([
            'last_login_at' => now(),
            'last_login_ip' => $ipAddress,
        ]);
    }

    /**
     * Validate 2FA code (TOTP)
     * 
     * @param string $code 6-digit TOTP code
     * @return bool
     */
    public function validate2FACode(string $code): bool
    {
        if (!$this->two_factor_secret) {
            return false;
        }

        // Using TOTP library (implement with google2fa or similar)
        // For now, basic validation
        return strlen($code) === 6 && ctype_digit($code);
    }

    /**
     * Get 2FA recovery codes
     */
    public function get2FARecoveryCodes(): array
    {
        if (!$this->two_factor_recovery_codes) {
            return [];
        }

        try {
            return json_decode($this->two_factor_recovery_codes, true) ?? [];
        } catch (\Exception $e) {
            return [];
        }
    }

    /**
     * Generate new 2FA recovery codes
     */
    public function generate2FARecoveryCodes(): array
    {
        $codes = [];
        for ($i = 0; $i < 10; $i++) {
            $codes[] = bin2hex(random_bytes(4));
        }

        $this->update([
            'two_factor_recovery_codes' => json_encode($codes),
        ]);

        return $codes;
    }

    /**
     * Check if user is suspended
     */
    public function isSuspended(): bool
    {
        return $this->status === 'suspended';
    }

    /**
     * Check if user is admin
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    /**
     * Check if email is verified
     */
    public function isEmailVerified(): bool
    {
        return $this->email_verified_at !== null;
    }

    /**
     * Get CTF ranking position by score
     */
    public function getCTFRankPosition(): int
    {
        return User::where('score', '>', $this->score)->count() + 1;
    }
}
