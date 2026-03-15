<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'industry' => $this->industry,
            'challenge' => $this->challenge,
            'solution' => $this->solution,
            'results' => $this->results,
            'technologies' => $this->technologies,
            'image' => $this->image,
            'gallery' => $this->gallery,
            'category' => $this->category,
            'client_name' => $this->client_name,
            'start_date' => $this->start_date?->toDateString(),
            'end_date' => $this->end_date?->toDateString(),
            'status' => $this->status,
            'views' => $this->views,
            'featured' => $this->featured,
            'created_at' => $this->created_at->toISOString(),
            'updated_at' => $this->updated_at->toISOString(),
        ];
    }
}
