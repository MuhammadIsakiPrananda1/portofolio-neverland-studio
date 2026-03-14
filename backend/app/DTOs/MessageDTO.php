<?php

namespace App\DTOs;

class MessageDTO
{
    public function __construct(
        public readonly ?int $id,
        public readonly string $name,
        public readonly string $email,
        public readonly ?string $phone,
        public readonly ?string $company,
        public readonly string $subject,
        public readonly string $message,
        public readonly bool $isRead,
        public readonly ?string $status,
        public readonly ?string $ipAddress,
        public readonly ?string $userAgent,
    ) {}

    public static function fromRequest(array $data): self
    {
        return new self(
            id: $data['id'] ?? null,
            name: $data['name'],
            email: $data['email'],
            phone: $data['phone'] ?? null,
            company: $data['company'] ?? null,
            subject: $data['subject'],
            message: $data['message'],
            isRead: $data['is_read'] ?? false,
            status: $data['status'] ?? 'new',
            ipAddress: $data['ip_address'] ?? request()->ip(),
            userAgent: $data['user_agent'] ?? request()->userAgent(),
        );
    }

    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'company' => $this->company,
            'subject' => $this->subject,
            'message' => $this->message,
            'is_read' => $this->isRead,
            'status' => $this->status,
            'ip_address' => $this->ipAddress,
            'user_agent' => $this->userAgent,
        ];
    }
}
