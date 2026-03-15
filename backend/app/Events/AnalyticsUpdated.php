<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class AnalyticsUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public array $data
    ) {}

    public function broadcastOn(): Channel
    {
        return new Channel('analytics');
    }

    public function broadcastAs(): string
    {
        return 'analytics.updated';
    }

    public function broadcastWith(): array
    {
        return [
            'overview' => $this->data,
            'timestamp' => now()->toIso8601String(),
        ];
    }
}
