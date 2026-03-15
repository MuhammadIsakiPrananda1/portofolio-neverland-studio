<?php

namespace App\Repositories;

use App\Models\Contact;
use Illuminate\Database\Eloquent\Collection;

class MessageRepository extends BaseRepository
{
    public function __construct(Contact $model)
    {
        parent::__construct($model);
    }

    public function getUnread(): Collection
    {
        return $this->applyQueryOptions()
            ->where('is_read', false)
            ->get();
    }

    public function getRecent(int $limit = 10): Collection
    {
        return $this->applyQueryOptions()
            ->latest('created_at')
            ->limit($limit)
            ->get();
    }

    public function markAsRead(int $id): bool
    {
        return $this->update($id, ['is_read' => true, 'read_at' => now()]);
    }

    public function markAsUnread(int $id): bool
    {
        return $this->update($id, ['is_read' => false, 'read_at' => null]);
    }

    public function getByStatus(string $status): Collection
    {
        return $this->applyQueryOptions()
            ->where('status', $status)
            ->get();
    }
}
