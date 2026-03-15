<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ProjectUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public $project
    ) {}

    public function broadcastOn(): Channel
    {
        return new Channel('projects');
    }

    public function broadcastAs(): string
    {
        return 'project.updated';
    }

    public function broadcastWith(): array
    {
        return [
            'id' => $this->project->id,
            'title' => $this->project->title,
            'category' => $this->project->category,
            'thumbnail' => $this->project->thumbnail,
            'status' => $this->project->status,
            'updated_at' => $this->project->updated_at,
            'message' => 'Project updated',
        ];
    }
}
