<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Exception;
use PDOException;

/**
 * DatabaseConnectionManager - Production-Ready Database Connection Handler
 * 
 * Responsibilities:
 * - Verify database connectivity
 * - Connection pooling and optimization
 * - Error handling and logging
 * - Connection health checks
 */
class DatabaseConnectionManager
{
    /**
     * Verify database connection is active and healthy
     * 
     * @return array
     */
    public static function healthCheck(): array
    {
        try {
            // Attempt a simple query
            DB::connection()->getPdo();
            
            // Get database info
            $database = DB::connection()->getDatabaseName();
            $database_user = config('database.connections.mysql.username');
            
            return [
                'status' => 'connected',
                'database' => $database,
                'user' => $database_user,
                'host' => config('database.connections.mysql.host'),
                'port' => config('database.connections.mysql.port'),
                'timestamp' => now(),
            ];
        } catch (PDOException $e) {
            Log::error('Database connection failed: ' . $e->getMessage());
            
            return [
                'status' => 'disconnected',
                'error' => 'Cannot connect to database server',
                'details' => env('APP_ENV') === 'development' ? $e->getMessage() : null,
            ];
        } catch (Exception $e) {
            Log::error('Database health check failed: ' . $e->getMessage());
            
            return [
                'status' => 'error',
                'error' => 'Unknown database error',
            ];
        }
    }

    /**
     * Verify critical tables exist
     * 
     * @return array
     */
    public static function verifyTables(): array
    {
        $requiredTables = [
            'users',
            'challenges',
            'challenge_solves',
            'submissions',
            'sessions',
            'cache',
        ];

        $results = [];

        foreach ($requiredTables as $table) {
            try {
                $exists = DB::connection()->getSchemaBuilder()->hasTable($table);
                $results[$table] = [
                    'exists' => $exists,
                    'status' => $exists ? 'ok' : 'missing',
                ];
            } catch (Exception $e) {
                $results[$table] = [
                    'exists' => false,
                    'status' => 'error',
                    'error' => $e->getMessage(),
                ];
            }
        }

        return $results;
    }

    /**
     * Get current connection statistics
     * 
     * @return array
     */
    public static function getConnectionStats(): array
    {
        try {
            $pdo = DB::connection()->getPdo();
            
            // Query database for statistics
            $queryCount = DB::selectOne("SELECT COUNT(*) as count FROM information_schema.tables WHERE table_schema = DATABASE()");
            
            return [
                'driver' => config('database.connections.mysql.driver'),
                'host' => config('database.connections.mysql.host'),
                'database' => DB::connection()->getDatabaseName(),
                'tables' => $queryCount->count ?? 0,
                'connected' => true,
                'timestamp' => now(),
            ];
        } catch (Exception $e) {
            return [
                'connected' => false,
                'error' => $e->getMessage(),
            ];
        }
    }

    /**
     * Reconnect to database (useful after connection timeout)
     * 
     * @return bool
     */
    public static function reconnect(): bool
    {
        try {
            DB::purge('mysql');
            DB::connection('mysql')->getPdo();
            Log::info('Database reconnection successful');
            return true;
        } catch (Exception $e) {
            Log::error('Database reconnection failed: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Set connection timeout (seconds)
     * 
     * @param int $seconds
     */
    public static function setTimeout(int $seconds): void
    {
        $options = [
            \PDO::ATTR_TIMEOUT => $seconds,
            \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
        ];
        
        config(['database.connections.mysql.options' => $options]);
    }

    /**
     * Log slow queries (for performance optimization)
     * Queries taking longer than threshold are logged
     * 
     * @param int $thresholdMs Threshold in milliseconds
     */
    public static function enableSlowQueryLogging(int $thresholdMs = 1000): void
    {
        DB::listen(function ($query) use ($thresholdMs) {
            $duration = $query->time;

            if ($duration > $thresholdMs) {
                Log::warning('Slow query detected', [
                    'query' => $query->sql,
                    'time_ms' => $duration,
                    'bindings' => $query->bindings,
                ]);
            }
        });
    }

    /**
     * Test connection with retry logic
     * 
     * @param int $maxAttempts
     * @param int $delaySeconds
     * @return bool
     */
    public static function testConnectionWithRetry(int $maxAttempts = 3, int $delaySeconds = 2): bool
    {
        for ($attempt = 1; $attempt <= $maxAttempts; $attempt++) {
            try {
                DB::connection()->getPdo();
                Log::info("Database connection successful (attempt {$attempt}/{$maxAttempts})");
                return true;
            } catch (Exception $e) {
                if ($attempt < $maxAttempts) {
                    Log::warning("Database connection failed (attempt {$attempt}/{$maxAttempts}), retrying in {$delaySeconds}s...");
                    sleep($delaySeconds);
                } else {
                    Log::error("Database connection failed after {$maxAttempts} attempts: " . $e->getMessage());
                }
            }
        }

        return false;
    }
}
