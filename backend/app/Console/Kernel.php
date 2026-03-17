<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // OPTIMIZATION: Cache cyber news feeds every 10 minutes
        // This pre-caches feeds so frontend doesn't need to wait for them
        $schedule->command('cache:cyber-news --feeds=6 --limit=10')
            ->everyTenMinutes()
            ->withoutOverlapping()
            ->onSuccess(function () {
                \Illuminate\Support\Facades\Log::info('✅ Cyber News feeds cached successfully');
            })
            ->onFailure(function () {
                \Illuminate\Support\Facades\Log::warning('⚠️ Cyber News caching failed');
            });

        // Cache secondary feeds every 30 minutes
        $schedule->command('cache:cyber-news --feeds=16 --limit=10')
            ->everyThirtyMinutes()
            ->withoutOverlapping()
            ->onSuccess(function () {
                \Illuminate\Support\Facades\Log::info('✅ Extended Cyber News feeds cached');
            });

        // VM CLEANUP: Remove idle virtual machines every hour
        // Keep the lab responsive by cleaning up stale VMs (max 2 hours per session)
        $schedule->command('vm:cleanup --max-age=7200')
            ->hourly()
            ->withoutOverlapping()
            ->onSuccess(function () {
                \Illuminate\Support\Facades\Log::info('✅ Idle VMs cleaned up successfully');
            })
            ->onFailure(function () {
                \Illuminate\Support\Facades\Log::warning('⚠️ VM cleanup failed');
            });
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
