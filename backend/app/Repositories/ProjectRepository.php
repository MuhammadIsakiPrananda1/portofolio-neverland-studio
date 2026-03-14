<?php

namespace App\Repositories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Collection;

class ProjectRepository extends BaseRepository
{
    public function __construct(Project $model)
    {
        parent::__construct($model);
    }

    public function getPublished(): Collection
    {
        return $this->applyQueryOptions()
            ->where('status', 'published')
            ->get();
    }

    public function getByCategory(string $category): Collection
    {
        return $this->applyQueryOptions()
            ->where('category', $category)
            ->where('status', 'published')
            ->get();
    }

    public function getFeatured(int $limit = 6): Collection
    {
        return $this->applyQueryOptions()
            ->where('is_featured', true)
            ->where('status', 'published')
            ->limit($limit)
            ->get();
    }

    public function getRecent(int $limit = 10): Collection
    {
        return $this->applyQueryOptions()
            ->where('status', 'published')
            ->latest('published_at')
            ->limit($limit)
            ->get();
    }

    public function search(string $query): Collection
    {
        return $this->applyQueryOptions()
            ->where(function($q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                  ->orWhere('description', 'like', "%{$query}%")
                  ->orWhere('technologies', 'like', "%{$query}%");
            })
            ->where('status', 'published')
            ->get();
    }
}
