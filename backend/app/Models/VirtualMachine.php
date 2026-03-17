<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

/**
 * Virtual Machine Model
 * 
 * Represents a Docker-based Debian VM instance for each user
 * One user = One VM instance
 */
class VirtualMachine extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'container_id',
        'container_name',
        'vnc_port',
        'web_port',
        'status',
        'error_message',
        'cpu_cores',
        'memory_mb',
        'storage_gb',
        'vnc_password',
        'session_token',
        'started_at',
        'stopped_at',
        'last_activity_at',
    ];

    protected $casts = [
        'started_at'        => 'datetime',
        'stopped_at'        => 'datetime',
        'last_activity_at'  => 'datetime',
    ];

    /**
     * Relationship: VM belongs to User
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Generate unique session token for noVNC access
     */
    public static function generateSessionToken(): string
    {
        return Str::random(32);
    }

    /**
     * Check if VM is running
     */
    public function isRunning(): bool
    {
        return $this->status === 'running';
    }

    /**
     * Check if VM is stopped
     */
    public function isStopped(): bool
    {
        return $this->status === 'stopped';
    }

    /**
     * Update last activity timestamp
     * Used for tracking idle VMs for cleanup
     */
    public function updateActivity(): void
    {
        $this->update(['last_activity_at' => now()]);
    }

    /**
     * Get full noVNC URL for web access
     * Format: http://server:web_port/vnc.html?path=?token=xxx
     */
    public function getNoVncUrl(string $serverUrl): string
    {
        return "{$serverUrl}:{$this->web_port}/vnc.html?path=?token={$this->session_token}";
    }

    /**
     * Get VNC server connection string
     * Format: localhost:vnc_port
     */
    public function getVncConnectionString(): string
    {
        return "localhost:{$this->vnc_port}";
    }

    /**
     * Scope: Get user's primary VM (active VM)
     */
    public function scopeUserActive($query, int $userId)
    {
        return $query->where('user_id', $userId)
                     ->whereIn('status', ['running', 'starting'])
                     ->latest('started_at')
                     ->first();
    }

    /**
     * Scope: Get idle VMs (last activity > X hours ago)
     */
    public function scopeIdleVMs($query, int $hoursThreshold = 2)
    {
        $idleTime = now()->subHours($hoursThreshold);
        return $query->where('status', 'running')
                     ->where('last_activity_at', '<', $idleTime);
    }
}
