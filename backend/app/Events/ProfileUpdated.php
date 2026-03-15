<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ProfileUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public $settings
    ) {}

    public function broadcastOn(): Channel
    {
        return new PrivateChannel('user.' . $this->settings->user_id);
    }

    public function broadcastAs(): string
    {
        return 'profile.updated';
    }

    public function broadcastWith(): array
    {
        return [
            'profile' => [
                'avatar' => $this->settings->avatar,
                'phone' => $this->settings->phone,
                'company' => $this->settings->company,
                'position' => $this->settings->position,
                'bio' => $this->settings->bio,
                'website' => $this->settings->website,
                'location' => $this->settings->location,
                'social_media' => $this->settings->social_media,
            ],
            'message' => 'Profile updated successfully',
            'timestamp' => now()->toIso8601String(),
        ];
    }
}
