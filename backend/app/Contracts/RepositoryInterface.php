<?php

namespace App\Contracts;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

interface RepositoryInterface
{
    /**
     * Get all records
     */
    public function all(array $columns = ['*']): Collection;

    /**
     * Find record by ID
     */
    public function find(int $id, array $columns = ['*']): ?Model;

    /**
     * Find record by specific field
     */
    public function findBy(string $field, mixed $value, array $columns = ['*']): ?Model;

    /**
     * Create new record
     */
    public function create(array $data): Model;

    /**
     * Update record
     */
    public function update(int $id, array $data): bool;

    /**
     * Delete record
     */
    public function delete(int $id): bool;

    /**
     * Get paginated records
     */
    public function paginate(int $perPage = 15, array $columns = ['*']): LengthAwarePaginator;

    /**
     * Find records by multiple criteria
     */
    public function findWhere(array $criteria, array $columns = ['*']): Collection;

    /**
     * Get records with relationships
     */
    public function with(array $relations): self;

    /**
     * Order records
     */
    public function orderBy(string $column, string $direction = 'asc'): self;
}
