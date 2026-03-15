<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class DatabaseCleanup extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:cleanup {--days=30 : The number of days to retain data}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clean up old database records (logs, analytics, etc.) to improve performance';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $days = (int) $this->option('days');
        $date = Carbon::now()->subDays($days);
        $analyticsDate = Carbon::now()->subDays(max($days, 90)); // Keep analytics longer

        $this->info("Starting database cleanup...");

        // 1. Clean up old Activity Logs
        $deletedLogs = DB::table('activity_logs')->where('created_at', '<', $date)->delete();
        $this->info("Deleted {$deletedLogs} old activity logs.");

        // 2. Clean up old Analytics
        $deletedAnalytics = DB::table('analytics')->where('created_at', '<', $analyticsDate)->delete();
        $this->info("Deleted {$deletedAnalytics} old analytics records.");

        // 3. Clean up expired Sanctum tokens
        $this->call('sanctum:prune-expired', ['--hours' => $days * 24]);

        // 4. Clean up failed jobs (older than 7 days)
        $failedJobsDate = Carbon::now()->subDays(7);
        if (DB::getSchemaBuilder()->hasTable('failed_jobs')) {
            $deletedJobs = DB::table('failed_jobs')->where('failed_at', '<', $failedJobsDate)->delete();
            $this->info("Deleted {$deletedJobs} old failed jobs.");
        }

        // 5. Optimize Tables (MySQL/MariaDB)
        $this->info("Optimizing database tables...");
        $tables = DB::select('SHOW TABLES');
        $databaseName = DB::getDatabaseName();
        $key = 'Tables_in_' . $databaseName;
        
        foreach ($tables as $table) {
            $tableName = $table->$key ?? current((array)$table);
            DB::statement("OPTIMIZE TABLE `{$tableName}`");
        }
        $this->info("All tables optimized.");

        $this->info("Database cleanup completed successfully.");
    }
}
