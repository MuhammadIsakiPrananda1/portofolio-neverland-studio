<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Submission extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'challenge_id',
        'submitted_flag',
        'status',
        'ip_address',
        'user_agent',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user who made this submission
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the challenge for this submission
     */
    public function challenge(): BelongsTo
    {
        return $this->belongsTo(Challenge::class);
    }

    /**
     * Check if submission is correct
     */
    public function isCorrect(): bool
    {
        return $this->status === 'correct';
    }

    /**
     * Get wrong submissions count for user in last X minutes
     */
    public static function getRecentWrongSubmissions(int $userId, int $minutes = 10): int
    {
        return self::where('user_id', $userId)
            ->where('status', 'wrong')
            ->where('created_at', '>=', now()->subMinutes($minutes))
            ->count();
    }

    /**
     * Get submissions count for user in last X minutes (rate limiting)
     */
    public static function getSubmissionsInLastMinutes(int $userId, int $minutes = 1): int
    {
        return self::where('user_id', $userId)
            ->where('created_at', '>=', now()->subMinutes($minutes))
            ->count();
    }

    /**
     * Get submissions from IP in last X minutes
     */
    public static function getSubmissionsFromIp(string $ipAddress, int $minutes = 1): int
    {
        return self::where('ip_address', $ipAddress)
            ->where('created_at', '>=', now()->subMinutes($minutes))
            ->count();
    }
}
