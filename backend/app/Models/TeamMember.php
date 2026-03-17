<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class TeamMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'role',
        'bio',
        'image',
        'expertise',
        'social',
        'email',
        'order',
        'status',
    ];

    protected $casts = [
        'expertise' => 'array',
        'social'    => 'array',
        'order'     => 'integer',
    ];

    /**
     * Auto-generate slug from name before saving.
     */
    protected static function booted(): void
    {
        static::creating(function (TeamMember $member) {
            if (empty($member->slug)) {
                $member->slug = Str::slug($member->name);
            }
        });
    }

    /**
     * Scope: only active members.
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope: order by display order.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order')->orderBy('name');
    }
}
