<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DashboardStatsUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public array $stats
    ) {}

    public function broadcastOn(): Channel
    {
        return new Channel('dashboard');
    }

    public function broadcastAs(): string
    {
        return 'stats.updated';
    }

    public function broadcastWith(): array
    {
        return [
            'stats' => $this->stats,
            'timestamp' => now()->toIso8601String(),
        ];
    }
}
