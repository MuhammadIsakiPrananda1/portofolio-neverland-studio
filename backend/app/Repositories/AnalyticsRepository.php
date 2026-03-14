<?php

namespace App\Repositories;

use App\Models\Analytics;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class AnalyticsRepository extends BaseRepository
{
    public function __construct(Analytics $model)
    {
        parent::__construct($model);
    }

    public function trackVisit(array $data): void
    {
        $this->create([
            'visitor_ip' => $data['ip'] ?? request()->ip(),
            'user_agent' => $data['user_agent'] ?? request()->userAgent(),
            'page_url' => $data['page_url'] ?? request()->fullUrl(),
            'referrer' => $data['referrer'] ?? request()->header('referer'),
            'device_type' => $data['device_type'] ?? $this->detectDeviceType(),
            'browser' => $data['browser'] ?? $this->detectBrowser(),
            'os' => $data['os'] ?? $this->detectOS(),
            'country' => $data['country'] ?? null,
            'city' => $data['city'] ?? null,
            'visited_at' => now(),
        ]);
    }

    public function getVisitorsCount(int $days = 30): int
    {
        return $this->model
            ->where('visited_at', '>=', Carbon::now()->subDays($days))
            ->distinct('visitor_ip')
            ->count('visitor_ip');
    }

    public function getPageViews(int $days = 30): int
    {
        return $this->model
            ->where('visited_at', '>=', Carbon::now()->subDays($days))
            ->count();
    }

    public function getTopPages(int $limit = 10): Collection
    {
        return $this->model
            ->selectRaw('page_url, count(*) as views')
            ->where('visited_at', '>=', Carbon::now()->subDays(30))
            ->groupBy('page_url')
            ->orderByDesc('views')
            ->limit($limit)
            ->get();
    }

    public function getVisitorsByDate(int $days = 30): Collection
    {
        return $this->model
            ->selectRaw('DATE(visited_at) as date, COUNT(DISTINCT visitor_ip) as visitors')
            ->where('visited_at', '>=', Carbon::now()->subDays($days))
            ->groupBy('date')
            ->orderBy('date')
            ->get();
    }

    public function getDeviceStats(): Collection
    {
        return $this->model
            ->selectRaw('device_type, COUNT(*) as count')
            ->where('visited_at', '>=', Carbon::now()->subDays(30))
            ->groupBy('device_type')
            ->get();
    }

    private function detectDeviceType(): string
    {
        $userAgent = request()->userAgent();
        if (preg_match('/mobile|android|iphone|ipad|tablet/i', $userAgent)) {
            return 'mobile';
        }
        return 'desktop';
    }

    private function detectBrowser(): ?string
    {
        $userAgent = request()->userAgent();
        if (preg_match('/chrome/i', $userAgent)) return 'Chrome';
        if (preg_match('/firefox/i', $userAgent)) return 'Firefox';
        if (preg_match('/safari/i', $userAgent)) return 'Safari';
        if (preg_match('/edge/i', $userAgent)) return 'Edge';
        return 'Other';
    }

    private function detectOS(): ?string
    {
        $userAgent = request()->userAgent();
        if (preg_match('/windows/i', $userAgent)) return 'Windows';
        if (preg_match('/mac/i', $userAgent)) return 'MacOS';
        if (preg_match('/linux/i', $userAgent)) return 'Linux';
        if (preg_match('/android/i', $userAgent)) return 'Android';
        if (preg_match('/iphone|ipad/i', $userAgent)) return 'iOS';
        return 'Other';
    }
}
