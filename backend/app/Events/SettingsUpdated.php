<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SettingsUpdated implements ShouldBroadcast
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
        return 'settings.updated';
    }

    public function broadcastWith(): array
    {
        return [
            'settings' => [
                'theme' => $this->settings->theme,
                'language' => $this->settings->language,
                'timezone' => $this->settings->timezone,
                'notifications' => $this->settings->notification_preferences,
                'privacy' => $this->settings->privacy_settings,
                'display' => $this->settings->display_preferences,
            ],
            'message' => 'Settings updated successfully',
            'timestamp' => now()->toIso8601String(),
        ];
    }
}
