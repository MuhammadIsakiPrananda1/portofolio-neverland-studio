<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ChallengeSolve extends Model
{
    use HasFactory;

    protected $table = 'challenge_solves';

    protected $fillable = [
        'user_id',
        'challenge_id',
        'points_awarded',
        'solved_at',
    ];

    protected $casts = [
        'solved_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that solved this challenge
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the challenge that was solved
     */
    public function challenge(): BelongsTo
    {
        return $this->belongsTo(Challenge::class);
    }

    /**
     * Get all challenges solved by a user
     */
    public static function getSolvedByUser($userId)
    {
        return self::where('user_id', $userId)
            ->pluck('challenge_id')
            ->toArray();
    }

    /**
     * Get all challenges solved by user with details
     */
    public static function getSolvedByUserWithDetails($userId, $limit = null)
    {
        $query = self::where('user_id', $userId)
            ->with('challenge')
            ->orderByDesc('solved_at');
        
        if ($limit) {
            $query->limit($limit);
        }
        
        return $query->get();
    }

    /**
     * Check if a user has solved a specific challenge
     */
    public static function isSolvedByUser($userId, $challengeId): bool
    {
        return self::where('user_id', $userId)
            ->where('challenge_id', $challengeId)
            ->exists();
    }

    /**
     * Mark a challenge as solved by a user
     */
    public static function markAsSolved($userId, $challengeId, $pointsAwarded = 0)
    {
        return self::firstOrCreate(
            [
                'user_id' => $userId,
                'challenge_id' => $challengeId,
            ],
            [
                'points_awarded' => $pointsAwarded,
                'solved_at' => now(),
            ]
        );
    }

    /**
     * Get total points for a user
     */
    public static function getTotalPointsByUser($userId): int
    {
        return (int) self::where('user_id', $userId)
            ->sum('points_awarded');
    }

    /**
     * Get solves by challenge
     */
    public static function getByChallengeId($challengeId)
    {
        return self::where('challenge_id', $challengeId)
            ->with('user')
            ->orderBy('solved_at')
            ->get();
    }

    /**
     * Get first solve (first blood)
     */
    public static function getFirstSolve($challengeId)
    {
        return self::where('challenge_id', $challengeId)
            ->with('user')
            ->orderBy('solved_at')
            ->first();
    }
}

