<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MediaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'file_name' => $this->file_name,
            'mime_type' => $this->mime_type,
            'path' => $this->path,
            'url' => $this->url,
            'size' => $this->size,
            'size_kb' => $this->size_in_kb,
            'size_mb' => $this->size_in_mb,
            'metadata' => $this->metadata,
            'user' => new UserResource($this->whenLoaded('user')),
            'created_at' => $this->created_at->toISOString(),
        ];
    }
}
