<?php

namespace App\Repositories;

use App\Contracts\RepositoryInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

abstract class BaseRepository implements RepositoryInterface
{
    protected Model $model;
    protected array $with = [];
    protected string $orderByColumn = 'created_at';
    protected string $orderByDirection = 'desc';

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function all(array $columns = ['*']): Collection
    {
        return $this->applyQueryOptions()
            ->get($columns);
    }

    public function find(int $id, array $columns = ['*']): ?Model
    {
        return $this->applyQueryOptions()
            ->find($id, $columns);
    }

    public function findBy(string $field, mixed $value, array $columns = ['*']): ?Model
    {
        return $this->applyQueryOptions()
            ->where($field, $value)
            ->first($columns);
    }

    public function create(array $data): Model
    {
        return $this->model->create($data);
    }

    public function update(int $id, array $data): bool
    {
        $record = $this->find($id);
        if (!$record) {
            return false;
        }
        return $record->update($data);
    }

    public function delete(int $id): bool
    {
        $record = $this->find($id);
        if (!$record) {
            return false;
        }
        return $record->delete();
    }

    public function paginate(int $perPage = 15, array $columns = ['*']): LengthAwarePaginator
    {
        return $this->applyQueryOptions()
            ->paginate($perPage, $columns);
    }

    public function findWhere(array $criteria, array $columns = ['*']): Collection
    {
        $query = $this->applyQueryOptions();
        
        foreach ($criteria as $field => $value) {
            if (is_array($value)) {
                $query->whereIn($field, $value);
            } else {
                $query->where($field, $value);
            }
        }
        
        return $query->get($columns);
    }

    public function with(array $relations): self
    {
        $this->with = $relations;
        return $this;
    }

    public function orderBy(string $column, string $direction = 'asc'): self
    {
        $this->orderByColumn = $column;
        $this->orderByDirection = $direction;
        return $this;
    }

    protected function applyQueryOptions()
    {
        $query = $this->model->newQuery();

        if (!empty($this->with)) {
            $query->with($this->with);
        }

        if ($this->orderByColumn) {
            $query->orderBy($this->orderByColumn, $this->orderByDirection);
        }

        return $query;
    }

    protected function resetQueryOptions(): void
    {
        $this->with = [];
        $this->orderByColumn = 'created_at';
        $this->orderByDirection = 'desc';
    }
}
