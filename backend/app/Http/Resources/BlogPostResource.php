<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogPostResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'excerpt' => $this->excerpt,
            'content' => $this->content,
            'author' => new UserResource($this->whenLoaded('author')),
            'category' => $this->category,
            'tags' => $this->tags,
            'featured_image' => $this->featured_image,
            'read_time' => $this->read_time,
            'views' => $this->views,
            'status' => $this->status,
            'published_at' => $this->published_at?->toISOString(),
            'featured' => $this->featured,
            'seo' => $this->seo,
            'created_at' => $this->created_at->toISOString(),
            'updated_at' => $this->updated_at->toISOString(),
        ];
    }
}
