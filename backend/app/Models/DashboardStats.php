<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DashboardStats extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'visitors',
        'page_views',
        'new_messages',
        'new_projects',
        'new_users',
        'active_sessions',
        'hourly_visitors',
        'top_pages',
        'referrers',
    ];

    protected $casts = [
        'date' => 'date',
        'hourly_visitors' => 'array',
        'top_pages' => 'array',
        'referrers' => 'array',
    ];

    /**
     * Get today's stats
     */
    public static function today(): ?self
    {
        return self::whereDate('date', now()->toDateString())->first();
    }

    /**
     * Get or create today's stats
     */
    public static function todayOrCreate(): self
    {
        return self::firstOrCreate(
            ['date' => now()->toDateString()],
            [
                'visitors' => 0,
                'page_views' => 0,
                'new_messages' => 0,
                'new_projects' => 0,
                'new_users' => 0,
                'active_sessions' => 0,
            ]
        );
    }

    /**
     * Increment a stat
     */
    public function incrementStat(string $stat, int $amount = 1): void
    {
        $this->increment($stat, $amount);
    }
}
