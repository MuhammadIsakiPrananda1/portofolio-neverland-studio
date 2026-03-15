<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewActivityLogged implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public $activity
    ) {}

    public function broadcastOn(): Channel
    {
        return new Channel('dashboard');
    }

    public function broadcastAs(): string
    {
        return 'activity.new';
    }

    public function broadcastWith(): array
    {
        return [
            'activity' => [
                'id' => $this->activity->id,
                'description' => $this->activity->description,
                'event' => $this->activity->event,
                'log_name' => $this->activity->log_name,
                'user' => $this->activity->causer ? [
                    'id' => $this->activity->causer->id,
                    'name' => $this->activity->causer->name,
                ] : null,
                'created_at' => $this->activity->created_at->diffForHumans(),
                'timestamp' => $this->activity->created_at->toIso8601String(),
            ],
            'message' => 'New activity logged',
        ];
    }
}
