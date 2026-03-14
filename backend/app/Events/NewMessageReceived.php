<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewMessageReceived implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public $message
    ) {}

    public function broadcastOn(): Channel
    {
        return new Channel('messages');
    }

    public function broadcastAs(): string
    {
        return 'message.new';
    }

    public function broadcastWith(): array
    {
        return [
            'id' => $this->message->id,
            'name' => $this->message->name,
            'email' => $this->message->email,
            'subject' => $this->message->subject,
            'message' => substr($this->message->message, 0, 100) . '...',
            'created_at' => $this->message->created_at,
            'notification' => 'You have a new message from ' . $this->message->name,
        ];
    }
}
