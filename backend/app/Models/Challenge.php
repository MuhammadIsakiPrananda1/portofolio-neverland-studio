<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Challenge extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'flag',
        'category',
        'difficulty',
        'initial_points',
        'minimum_points',
        'decay',
        'first_blood_user_id',
        'first_blood_at',
        'is_active',
        'solve_count',
        'hints',
        'attachment_path',
    ];

    protected $casts = [
        'first_blood_at' => 'datetime',
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the first blood user
     */
    public function firstBloodUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'first_blood_user_id');
    }

    /**
     * Get all solves for this challenge
     */
    public function solves(): HasMany
    {
        return $this->hasMany(ChallengeSolve::class);
    }

    /**
     * Get all submissions for this challenge
     */
    public function submissions(): HasMany
    {
        return $this->hasMany(Submission::class);
    }

    /**
     * Calculate current points based on dynamic scoring
     */
    public function getCurrentPoints(): int
    {
        return max(
            $this->minimum_points,
            $this->initial_points - ($this->solve_count * $this->decay)
        );
    }

    /**
     * Get number of solves
     */
    public function getSolveCount(): int
    {
        return $this->solves()->count();
    }

    /**
     * Check if user has solved this challenge
     */
    public function isSolvedBy(int $userId): bool
    {
        return $this->solves()
            ->where('user_id', $userId)
            ->exists();
    }

    /**
     * Get challenges by category
     */
    public static function byCategory(string $category)
    {
        return self::where('category', $category)
            ->where('is_active', true)
            ->orderBy('difficulty')
            ->get();
    }

    /**
     * Get active challenges
     */
    public static function active()
    {
        return self::where('is_active', true)
            ->orderBy('category')
            ->orderBy('difficulty')
            ->get();
    }
}
