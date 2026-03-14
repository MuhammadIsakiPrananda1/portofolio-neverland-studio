<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\DashboardService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __construct(
        private DashboardService $service
    ) {}

    /**
     * Get dashboard overview
     */
    public function index(): JsonResponse
    {
        try {
            $overview = $this->service->getOverview();
            $quickStats = $this->service->getQuickStats();
            $realtimeStats = $this->service->getRealTimeStats();

            return response()->json([
                'success' => true,
                'data' => [
                    'overview' => $overview,
                    'quick_stats' => $quickStats,
                    'realtime' => $realtimeStats,
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch dashboard data',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get real-time statistics
     */
    public function realtimeStats(): JsonResponse
    {
        try {
            $stats = $this->service->getRealTimeStats();

            return response()->json([
                'success' => true,
                'data' => $stats,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch real-time stats',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get visitor chart data
     */
    public function visitorChart(Request $request): JsonResponse
    {
        try {
            $days = $request->query('days', 7);
            $chart = $this->service->getVisitorChart($days);

            return response()->json([
                'success' => true,
                'data' => $chart,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch visitor chart',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get hourly visitors
     */
    public function hourlyVisitors(): JsonResponse
    {
        try {
            $data = $this->service->getHourlyVisitors();

            return response()->json([
                'success' => true,
                'data' => $data,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch hourly visitors',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get recent activity feed
     */
    public function activityFeed(Request $request): JsonResponse
    {
        try {
            $limit = $request->query('limit', 20);
            $activities = $this->service->getRecentActivity($limit);

            return response()->json([
                'success' => true,
                'data' => $activities,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch activity feed',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get top pages
     */
    public function topPages(Request $request): JsonResponse
    {
        try {
            $limit = $request->query('limit', 10);
            $days = $request->query('days', 7);
            $pages = $this->service->getTopPages($limit, $days);

            return response()->json([
                'success' => true,
                'data' => $pages,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch top pages',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get device statistics
     */
    public function deviceStats(Request $request): JsonResponse
    {
        try {
            $days = $request->query('days', 7);
            $stats = $this->service->getDeviceStats($days);

            return response()->json([
                'success' => true,
                'data' => $stats,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch device stats',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get browser statistics
     */
    public function browserStats(Request $request): JsonResponse
    {
        try {
            $days = $request->query('days', 7);
            $stats = $this->service->getBrowserStats($days);

            return response()->json([
                'success' => true,
                'data' => $stats,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch browser stats',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get quick stats summary
     */
    public function quickStats(): JsonResponse
    {
        try {
            $stats = $this->service->getQuickStats();

            return response()->json([
                'success' => true,
                'data' => $stats,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch quick stats',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Clear dashboard cache
     */
    public function clearCache(): JsonResponse
    {
        try {
            $this->service->clearCache();

            return response()->json([
                'success' => true,
                'message' => 'Dashboard cache cleared successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to clear cache',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get all contacts for dashboard
     */
    public function getContacts(Request $request): JsonResponse
    {
        try {
            $status = $request->query('status');
            $perPage = $request->query('per_page', 15);

            $contacts = \App\Models\Contact::query()
                ->when($status, function ($query, $status) {
                    return $query->where('status', $status);
                })
                ->latest()
                ->paginate($perPage);

            return response()->json([
                'success' => true,
                'data' => $contacts,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch contacts',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get all registered users
     */
    public function getUsers(Request $request): JsonResponse
    {
        try {
            $status = $request->query('status');
            $perPage = $request->query('per_page', 15);

            $users = \App\Models\User::query()
                ->when($status, function ($query, $status) {
                    return $query->where('status', $status);
                })
                ->with('roles')
                ->latest()
                ->paginate($perPage);

            return response()->json([
                'success' => true,
                'data' => $users,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch users',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get dashboard statistics
     */
    public function getStats(): JsonResponse
    {
        try {
            $newContacts = \App\Models\Contact::where('status', 'new')->count();
            $totalContacts = \App\Models\Contact::count();
            $totalUsers = \App\Models\User::count();
            $activeUsers = \App\Models\User::where('status', 'active')->count();

            return response()->json([
                'success' => true,
                'data' => [
                    'contacts' => [
                        'new' => $newContacts,
                        'total' => $totalContacts,
                    ],
                    'users' => [
                        'active' => $activeUsers,
                        'total' => $totalUsers,
                    ],
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch statistics',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
