<?php

namespace App\Services;

use App\Repositories\AnalyticsRepository;
use App\Events\AnalyticsUpdated;
use Illuminate\Support\Collection;

class AnalyticsService
{
    public function __construct(
        private AnalyticsRepository $repository
    ) {}

    public function trackVisit(array $data = []): void
    {
        $this->repository->trackVisit($data);
        
        // Update dashboard stats
        updateDashboardStats('page_views');
        
        // Broadcast real-time analytics update
        $this->broadcastAnalyticsUpdate();
    }

    public function getOverview(): array
    {
        return [
            'total_visitors' => $this->repository->getVisitorsCount(30),
            'total_page_views' => $this->repository->getPageViews(30),
            'visitors_today' => $this->repository->getVisitorsCount(1),
            'page_views_today' => $this->repository->getPageViews(1),
            'top_pages' => $this->repository->getTopPages(10),
            'device_stats' => $this->repository->getDeviceStats(),
            'visitors_by_date' => $this->repository->getVisitorsByDate(30),
        ];
    }

    public function getVisitorsByDate(int $days = 30): Collection
    {
        return $this->repository->getVisitorsByDate($days);
    }

    public function getTopPages(int $limit = 10): Collection
    {
        return $this->repository->getTopPages($limit);
    }

    public function getDeviceStats(): Collection
    {
        return $this->repository->getDeviceStats();
    }

    private function broadcastAnalyticsUpdate(): void
    {
        $overview = $this->getOverview();
        broadcast(new AnalyticsUpdated($overview))->toOthers();
    }
}
