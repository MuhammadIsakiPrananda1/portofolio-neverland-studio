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
}
