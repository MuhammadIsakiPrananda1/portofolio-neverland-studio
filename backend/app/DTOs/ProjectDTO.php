<?php

namespace App\DTOs;

class ProjectDTO
{
    public function __construct(
        public readonly ?int $id,
        public readonly string $title,
        public readonly string $description,
        public readonly ?string $longDescription,
        public readonly string $category,
        public readonly ?string $clientName,
        public readonly ?string $projectUrl,
        public readonly ?string $githubUrl,
        public readonly array $technologies,
        public readonly array $images,
        public readonly ?string $thumbnail,
        public readonly string $status,
        public readonly bool $isFeatured,
        public readonly ?string $startDate,
        public readonly ?string $endDate,
        public readonly ?string $publishedAt,
    ) {}

    public static function fromRequest(array $data): self
    {
        return new self(
            id: $data['id'] ?? null,
            title: $data['title'],
            description: $data['description'],
            longDescription: $data['long_description'] ?? null,
            category: $data['category'],
            clientName: $data['client_name'] ?? null,
            projectUrl: $data['project_url'] ?? null,
            githubUrl: $data['github_url'] ?? null,
            technologies: $data['technologies'] ?? [],
            images: $data['images'] ?? [],
            thumbnail: $data['thumbnail'] ?? null,
            status: $data['status'] ?? 'draft',
            isFeatured: $data['is_featured'] ?? false,
            startDate: $data['start_date'] ?? null,
            endDate: $data['end_date'] ?? null,
            publishedAt: $data['published_at'] ?? null,
        );
    }

    public function toArray(): array
    {
        return [
            'title' => $this->title,
            'description' => $this->description,
            'long_description' => $this->longDescription,
            'category' => $this->category,
            'client_name' => $this->clientName,
            'project_url' => $this->projectUrl,
            'github_url' => $this->githubUrl,
            'technologies' => $this->technologies,
            'images' => $this->images,
            'thumbnail' => $this->thumbnail,
            'status' => $this->status,
            'is_featured' => $this->isFeatured,
            'start_date' => $this->startDate,
            'end_date' => $this->endDate,
            'published_at' => $this->publishedAt,
        ];
    }
}
