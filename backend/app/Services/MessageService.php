<?php

namespace App\Services;

use App\DTOs\MessageDTO;
use App\Repositories\MessageRepository;
use App\Events\NewMessageReceived;
use App\Events\MessageRead;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class MessageService
{
    public function __construct(
        private MessageRepository $repository
    ) {}

    public function getAll(array $filters = []): Collection
    {
        if (isset($filters['unread']) && $filters['unread']) {
            return $this->repository->getUnread();
        }

        if (isset($filters['status'])) {
            return $this->repository->getByStatus($filters['status']);
        }

        return $this->repository->all();
    }

    public function getPaginated(int $perPage = 15): LengthAwarePaginator
    {
        return $this->repository
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    public function findById(int $id): ?Model
    {
        return $this->repository->find($id);
    }

    public function create(MessageDTO $dto): Model
    {
        $message = $this->repository->create($dto->toArray());
        
        // Log activity
        logActivity("New message from: {$message->name}", 'received', [
            'message_id' => $message->id,
            'email' => $message->email,
            'subject' => $message->subject,
        ], 'message');
        
        // Update dashboard stats
        updateDashboardStats('new_messages');
        
        // Broadcast real-time notification to admins
        broadcast(new NewMessageReceived($message))->toOthers();
        
        return $message;
    }

    public function markAsRead(int $id): bool
    {
        $updated = $this->repository->markAsRead($id);
        
        if ($updated) {
            $message = $this->repository->find($id);
            broadcast(new MessageRead($message))->toOthers();
        }
        
        return $updated;
    }

    public function markAsUnread(int $id): bool
    {
        return $this->repository->markAsUnread($id);
    }

    public function delete(int $id): bool
    {
        return $this->repository->delete($id);
    }

    public function getUnreadCount(): int
    {
        return $this->repository->getUnread()->count();
    }

    public function getRecent(int $limit = 10): Collection
    {
        return $this->repository->getRecent($limit);
    }

    public function updateStatus(int $id, string $status): bool
    {
        return $this->repository->update($id, ['status' => $status]);
    }
}
