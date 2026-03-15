<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TestimonialResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'client_name' => $this->client_name,
            'client_role' => $this->client_role,
            'client_company' => $this->client_company,
            'content' => $this->content,
            'rating' => $this->rating,
            'client_image' => $this->client_image,
            'project' => new ProjectResource($this->whenLoaded('project')),
            'featured' => $this->featured,
            'status' => $this->status,
            'created_at' => $this->created_at->toISOString(),
            'updated_at' => $this->updated_at->toISOString(),
        ];
    }
}
