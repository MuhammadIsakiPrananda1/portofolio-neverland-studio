<?php

namespace App\Services;

use App\Models\ActivityLog;
use App\Models\DashboardStats;
use App\Models\Analytics;
use App\Models\Project;
use App\Models\Contact;
use App\Models\User;
use App\Events\DashboardStatsUpdated;
use App\Events\NewActivityLogged;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

class DashboardService
{
    /**
     * Get real-time dashboard overview
     */
    public function getOverview(): array
    {
        return Cache::remember('dashboard_overview', 60, function () {
            $today = now()->startOfDay();
            $thisWeek = now()->startOfWeek();
            $thisMonth = now()->startOfMonth();

            return [
                'total_projects' => Project::count(),
                'published_projects' => Project::where('status', 'published')->count(),
                'total_messages' => Contact::count(),
                'unread_messages' => Contact::where('is_read', false)->count(),
                'total_users' => User::count(),
                'active_users' => User::where('created_at', '>=', $thisMonth)->count(),
                
                // Today's stats
                'today' => [
                    'visitors' => Analytics::whereDate('visited_at', $today)->distinct('visitor_ip')->count(),
                    'page_views' => Analytics::whereDate('visited_at', $today)->count(),
                    'new_messages' => Contact::whereDate('created_at', $today)->count(),
                    'new_projects' => Project::whereDate('created_at', $today)->count(),
                ],
                
                // This week's stats
                'this_week' => [
                    'visitors' => Analytics::where('visited_at', '>=', $thisWeek)->distinct('visitor_ip')->count(),
                    'page_views' => Analytics::where('visited_at', '>=', $thisWeek)->count(),
                    'new_messages' => Contact::where('created_at', '>=', $thisWeek)->count(),
                    'new_projects' => Project::where('created_at', '>=', $thisWeek)->count(),
                ],
                
                // This month's stats
                'this_month' => [
                    'visitors' => Analytics::where('visited_at', '>=', $thisMonth)->distinct('visitor_ip')->count(),
                    'page_views' => Analytics::where('visited_at', '>=', $thisMonth)->count(),
                    'new_messages' => Contact::where('created_at', '>=', $thisMonth)->count(),
                    'new_projects' => Project::where('created_at', '>=', $thisMonth)->count(),
                ],
            ];
        });
    }

    /**
     * Get real-time statistics
     */
    public function getRealTimeStats(): array
    {
        $stats = DashboardStats::todayOrCreate();
        
        return [
            'current_visitors' => $this->getCurrentVisitors(),
            'today_visitors' => $stats->visitors,
            'today_page_views' => $stats->page_views,
            'today_messages' => $stats->new_messages,
            'today_projects' => $stats->new_projects,
            'active_sessions' => $stats->active_sessions,
            'timestamp' => now()->toIso8601String(),
        ];
    }

    /**
     * Get current active visitors (last 5 minutes)
     */
    public function getCurrentVisitors(): int
    {
        return Analytics::where('visited_at', '>=', now()->subMinutes(5))
            ->distinct('visitor_ip')
            ->count('visitor_ip');
    }

    /**
     * Get visitor chart data
     */
    public function getVisitorChart(int $days = 7): array
    {
        $data = Analytics::select(
                DB::raw('DATE(visited_at) as date'),
                DB::raw('COUNT(DISTINCT visitor_ip) as visitors'),
                DB::raw('COUNT(*) as page_views')
            )
            ->where('visited_at', '>=', now()->subDays($days))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return [
            'labels' => $data->pluck('date')->toArray(),
            'visitors' => $data->pluck('visitors')->toArray(),
            'page_views' => $data->pluck('page_views')->toArray(),
        ];
    }

    /**
     * Get hourly visitors for today
     */
    public function getHourlyVisitors(): array
    {
        $hourlyData = Analytics::select(
                DB::raw('HOUR(visited_at) as hour'),
                DB::raw('COUNT(DISTINCT visitor_ip) as visitors')
            )
            ->whereDate('visited_at', now()->toDateString())
            ->groupBy('hour')
            ->orderBy('hour')
            ->get()
            ->pluck('visitors', 'hour')
            ->toArray();

        // Fill missing hours with 0
        $result = [];
        for ($i = 0; $i < 24; $i++) {
            $result[$i] = $hourlyData[$i] ?? 0;
        }

        return [
            'labels' => array_keys($result),
            'data' => array_values($result),
        ];
    }

    /**
     * Get recent activity feed
     */
    public function getRecentActivity(int $limit = 20): Collection
    {
        return ActivityLog::with(['causer', 'user'])
            ->latest()
            ->limit($limit)
            ->get()
            ->map(function ($activity) {
                return [
                    'id' => $activity->id,
                    'description' => $activity->description,
                    'event' => $activity->event,
                    'log_name' => $activity->log_name,
                    'user' => $activity->causer ? [
                        'id' => $activity->causer->id,
                        'name' => $activity->causer->name,
                        'avatar' => $activity->causer->settings->avatar ?? null,
                    ] : null,
                    'properties' => $activity->formatted_properties,
                    'created_at' => $activity->created_at->diffForHumans(),
                    'timestamp' => $activity->created_at->toIso8601String(),
                ];
            });
    }

    /**
     * Get top pages
     */
    public function getTopPages(int $limit = 10, int $days = 7): Collection
    {
        return Analytics::select('page_url', DB::raw('COUNT(*) as views'))
            ->where('visited_at', '>=', now()->subDays($days))
            ->groupBy('page_url')
            ->orderByDesc('views')
            ->limit($limit)
            ->get();
    }

    /**
     * Get device statistics
     */
    public function getDeviceStats(int $days = 7): array
    {
        $stats = Analytics::select('device_type', DB::raw('COUNT(*) as count'))
            ->where('visited_at', '>=', now()->subDays($days))
            ->groupBy('device_type')
            ->get();

        $total = $stats->sum('count');

        return $stats->map(function ($item) use ($total) {
            return [
                'device' => $item->device_type,
                'count' => $item->count,
                'percentage' => $total > 0 ? round(($item->count / $total) * 100, 2) : 0,
            ];
        })->toArray();
    }

    /**
     * Get browser statistics
     */
    public function getBrowserStats(int $days = 7): array
    {
        $stats = Analytics::select('browser', DB::raw('COUNT(*) as count'))
            ->where('visited_at', '>=', now()->subDays($days))
            ->whereNotNull('browser')
            ->groupBy('browser')
            ->orderByDesc('count')
            ->limit(5)
            ->get();

        $total = $stats->sum('count');

        return $stats->map(function ($item) use ($total) {
            return [
                'browser' => $item->browser,
                'count' => $item->count,
                'percentage' => $total > 0 ? round(($item->count / $total) * 100, 2) : 0,
            ];
        })->toArray();
    }

    /**
     * Log activity
     */
    public function logActivity(array $data): ActivityLog
    {
        $activity = ActivityLog::create([
            'user_id' => $data['user_id'] ?? auth()->id(),
            'causer_id' => $data['causer_id'] ?? auth()->id(),
            'causer_type' => $data['causer_type'] ?? (auth()->check() ? User::class : null),
            'log_name' => $data['log_name'] ?? 'default',
            'description' => $data['description'],
            'subject_type' => $data['subject_type'] ?? null,
            'subject_id' => $data['subject_id'] ?? null,
            'event' => $data['event'] ?? null,
            'properties' => $data['properties'] ?? null,
            'ip_address' => $data['ip_address'] ?? request()->ip(),
            'user_agent' => $data['user_agent'] ?? request()->userAgent(),
        ]);

        // Broadcast new activity
        broadcast(new NewActivityLogged($activity))->toOthers();

        return $activity;
    }

    /**
     * Update dashboard stats
     */
    public function updateStats(string $metric, int $amount = 1): void
    {
        $stats = DashboardStats::todayOrCreate();
        $stats->incrementStat($metric, $amount);

        // Broadcast updated stats
        $this->broadcastStatsUpdate();
    }

    /**
     * Broadcast dashboard stats update
     */
    public function broadcastStatsUpdate(): void
    {
        $stats = $this->getRealTimeStats();
        broadcast(new DashboardStatsUpdated($stats))->toOthers();
    }

    /**
     * Get quick stats for widgets
     */
    public function getQuickStats(): array
    {
        return [
            'visitors' => [
                'today' => $this->getCurrentVisitors(),
                'total' => Analytics::whereDate('visited_at', now())->distinct('visitor_ip')->count(),
                'change' => $this->calculateChange('visitors'),
            ],
            'messages' => [
                'unread' => Contact::where('is_read', false)->count(),
                'today' => Contact::whereDate('created_at', now())->count(),
                'change' => $this->calculateChange('messages'),
            ],
            'projects' => [
                'published' => Project::where('status', 'published')->count(),
                'total' => Project::count(),
                'change' => $this->calculateChange('projects'),
            ],
            'revenue' => [
                'today' => 0, // Implement based on your business logic
                'month' => 0,
                'change' => 0,
            ],
        ];
    }

    /**
     * Calculate percentage change from yesterday
     */
    private function calculateChange(string $metric): float
    {
        $today = now()->startOfDay();
        $yesterday = now()->subDay()->startOfDay();

        switch ($metric) {
            case 'visitors':
                $todayCount = Analytics::whereDate('visited_at', $today)->distinct('visitor_ip')->count();
                $yesterdayCount = Analytics::whereDate('visited_at', $yesterday)->distinct('visitor_ip')->count();
                break;
            case 'messages':
                $todayCount = Contact::whereDate('created_at', $today)->count();
                $yesterdayCount = Contact::whereDate('created_at', $yesterday)->count();
                break;
            case 'projects':
                $todayCount = Project::whereDate('created_at', $today)->count();
                $yesterdayCount = Project::whereDate('created_at', $yesterday)->count();
                break;
            default:
                return 0;
        }

        if ($yesterdayCount == 0) {
            return $todayCount > 0 ? 100 : 0;
        }

        return round((($todayCount - $yesterdayCount) / $yesterdayCount) * 100, 2);
    }

    /**
     * Clear cache
     */
    public function clearCache(): void
    {
        Cache::forget('dashboard_overview');
    }
}
