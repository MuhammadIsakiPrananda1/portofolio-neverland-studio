<?php

namespace App\Services;

use App\DTOs\ProjectDTO;
use App\Repositories\ProjectRepository;
use App\Events\ProjectCreated;
use App\Events\ProjectUpdated;
use App\Events\ProjectDeleted;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class ProjectService
{
    public function __construct(
        private ProjectRepository $repository
    ) {}

    public function getAll(array $filters = []): Collection
    {
        $query = $this->repository;

        if (isset($filters['category'])) {
            return $query->getByCategory($filters['category']);
        }

        if (isset($filters['featured']) && $filters['featured']) {
            return $query->getFeatured($filters['limit'] ?? 6);
        }

        if (isset($filters['search'])) {
            return $query->search($filters['search']);
        }

        return $query->with(['media'])->getPublished();
    }

    public function getPaginated(int $perPage = 15): LengthAwarePaginator
    {
        return $this->repository
            ->with(['media'])
            ->paginate($perPage);
    }

    public function findById(int $id): ?Model
    {
        return $this->repository
            ->with(['media', 'client'])
            ->find($id);
    }

    public function create(ProjectDTO $dto): Model
    {
        $project = $this->repository->create($dto->toArray());
        
        // Log activity
        logActivity("Created project: {$project->title}", 'created', [
            'project_id' => $project->id,
            'title' => $project->title,
        ], 'project');
        
        // Update dashboard stats
        updateDashboardStats('new_projects');
        
        // Broadcast real-time event
        broadcast(new ProjectCreated($project))->toOthers();
        
        return $project;
    }

    public function update(int $id, ProjectDTO $dto): bool
    {
        $updated = $this->repository->update($id, $dto->toArray());
        
        if ($updated) {
            $project = $this->repository->find($id);
            broadcast(new ProjectUpdated($project))->toOthers();
        }
        
        return $updated;
    }

    public function delete(int $id): bool
    {
        $project = $this->repository->find($id);
        $deleted = $this->repository->delete($id);
        
        if ($deleted) {
            broadcast(new ProjectDeleted($project))->toOthers();
        }
        
        return $deleted;
    }

    public function publish(int $id): bool
    {
        return $this->repository->update($id, [
            'status' => 'published',
            'published_at' => now(),
        ]);
    }

    public function unpublish(int $id): bool
    {
        return $this->repository->update($id, [
            'status' => 'draft',
            'published_at' => null,
        ]);
    }

    public function getFeatured(int $limit = 6): Collection
    {
        return $this->repository->getFeatured($limit);
    }

    public function getRecent(int $limit = 10): Collection
    {
        return $this->repository->getRecent($limit);
    }
}
