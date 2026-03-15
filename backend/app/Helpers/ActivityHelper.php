<?php

namespace App\Helpers;

use App\Services\DashboardService;

if (!function_exists('logActivity')) {
    /**
     * Log an activity
     */
    function logActivity(string $description, ?string $event = null, array $properties = [], ?string $logName = 'default'): void
    {
        $service = app(DashboardService::class);
        $service->logActivity([
            'description' => $description,
            'event' => $event,
            'properties' => $properties,
            'log_name' => $logName,
        ]);
    }
}

if (!function_exists('updateDashboardStats')) {
    /**
     * Update dashboard statistics
     */
    function updateDashboardStats(string $metric, int $amount = 1): void
    {
        $service = app(DashboardService::class);
        $service->updateStats($metric, $amount);
    }
}

if (!function_exists('broadcastDashboardUpdate')) {
    /**
     * Broadcast dashboard stats update
     */
    function broadcastDashboardUpdate(): void
    {
        $service = app(DashboardService::class);
        $service->broadcastStatsUpdate();
    }
}
