<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Analytics extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'type',
        'path',
        'trackable_id',
        'trackable_type',
        'ip_address',
        'user_agent',
        'referer',
        'metadata',
        'created_at',
    ];

    protected $casts = [
        'metadata' => 'array',
        'created_at' => 'datetime',
    ];

    public function trackable()
    {
        return $this->morphTo();
    }

    public static function track($type, $trackable = null, array $metadata = [])
    {
        return static::create([
            'type' => $type,
            'path' => request()->path(),
            'trackable_id' => $trackable?->id,
            'trackable_type' => $trackable ? get_class($trackable) : null,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
            'referer' => request()->header('referer'),
            'metadata' => $metadata,
            'created_at' => now(),
        ]);
    }
}
