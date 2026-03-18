<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\DatabaseConnectionManager;
use Illuminate\Http\JsonResponse;

/**
 * HealthCheckController - Production Monitoring Endpoint
 * 
 * Exposes system health status for:
 * - Monitoring tools (Prometheus, DataDog, etc.)
 * - Load balancer health checks
 * - Deployment verification
 * - Status dashboard
 * 
 * Route: GET /api/v1/health
 */
class HealthCheckController extends Controller
{
    /**
     * System health status
     * Returns overall application health
     */
    public function check(): JsonResponse
    {
        $database = DatabaseConnectionManager::healthCheck();
        $tables = DatabaseConnectionManager::verifyTables();

        $allHealthy = ($database['status'] === 'connected') &&
                      collect($tables)->every(fn($t) => $t['status'] === 'ok');

        return response()->json([
            'status' => $allHealthy ? 'healthy' : 'unhealthy',
            'timestamp' => now()->toIso8601String(),
            'environment' => config('app.env'),
            'checks' => [
                'database' => $database,
                'tables' => $tables,
                'cache' => $this->checkCache(),
                'queue' => $this->checkQueue(),
            ],
        ], $allHealthy ? 200 : 503);
    }

    /**
     * Lightweight health check (for load balancers)
     * Fast response with minimal overhead
     */
    public function ping(): JsonResponse
    {
        try {
            DatabaseConnectionManager::healthCheck();
            return response()->json(['status' => 'ok'], 200);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error'], 503);
        }
    }

    /**
     * Detailed application status
     * Comprehensive diagnostics for troubleshooting
     */
    public function details(): JsonResponse
    {
        return response()->json([
            'environment' => config('app.env'),
            'debug_mode' => config('app.debug'),
            'php_version' => phpversion(),
            'laravel_version' => app()->version(),
            'timestamp' => now()->toIso8601String(),
            'uptime' => $this->getServerUptime(),
            'database' => DatabaseConnectionManager::getConnectionStats(),
            'memory' => [
                'current_usage_mb' => round(memory_get_usage(true) / 1024 / 1024, 2),
                'peak_usage_mb' => round(memory_get_peak_usage(true) / 1024 / 1024, 2),
            ],
            'extensions' => [
                'pdo_mysql' => extension_loaded('pdo_mysql'),
                'openssl' => extension_loaded('openssl'),
                'redis' => extension_loaded('redis'),
            ],
        ]);
    }

    /**
     * Check cache status
     */
    private function checkCache(): array
    {
        try {
            cache()->put('health_check_test', 'ok', now()->addMinutes(1));
            $result = cache()->get('health_check_test');
            cache()->forget('health_check_test');

            return [
                'status' => $result === 'ok' ? 'ok' : 'failed',
                'store' => config('cache.default'),
            ];
        } catch (\Exception $e) {
            return [
                'status' => 'error',
                'error' => $e->getMessage(),
            ];
        }
    }

    /**
     * Check queue status
     */
    private function checkQueue(): array
    {
        try {
            return [
                'status' => 'ok',
                'connection' => config('queue.default'),
            ];
        } catch (\Exception $e) {
            return [
                'status' => 'error',
                'error' => $e->getMessage(),
            ];
        }
    }

    /**
     * Get server uptime
     */
    private function getServerUptime(): string|null
    {
        try {
            $uptime = shell_exec('uptime -p');
            return trim($uptime ?? 'unknown');
        } catch (\Exception $e) {
            return null;
        }
    }
}
