<?php

namespace App\Console\Commands;

use App\Models\VirtualMachine;
use App\Services\DockerVMService;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

/**
 * Command to clean up idle virtual machines
 * Stops and deletes VMs that haven't had activity for the max session duration
 *
 * Usage: php artisan vm:cleanup
 * Schedule: Every hour via kernel.php
 */
class CleanupIdleVMs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'vm:cleanup {--max-age=7200}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clean up Virtual Machines that have been idle for too long';

    /**
     * The Docker VM service instance
     *
     * @var DockerVMService
     */
    protected DockerVMService $dockerService;

    /**
     * Create a new command instance.
     *
     * @param DockerVMService $dockerService
     */
    public function __construct(DockerVMService $dockerService)
    {
        parent::__construct();
        $this->dockerService = $dockerService;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $maxAge = (int) $this->option('max-age'); // Default 2 hours (7200 seconds)

        $this->info("🧹 Cleaning up idle Virtual Machines (inactive > {$maxAge}s)...");

        // Find all running or starting VMs
        $idleVMs = VirtualMachine::query()
            ->whereIn('status', ['running', 'starting'])
            ->where('last_activity_at', '<', Carbon::now()->subSeconds($maxAge))
            ->get();

        if ($idleVMs->isEmpty()) {
            $this->info('✅ No idle VMs to clean up.');
            return Command::SUCCESS;
        }

        $deleted = 0;
        $errors = 0;

        foreach ($idleVMs as $vm) {
            try {
                $this->line("🗑️  Stopping VM #{$vm->id} ({$vm->container_name}) - Idle for {$maxAge}s...");

                // Stop the container
                if ($vm->container_id) {
                    try {
                        $this->dockerService->stopVM($vm->user_id);
                    } catch (\Exception $e) {
                        Log::warning("Failed to stop VM during cleanup: {$e->getMessage()}");
                    }

                    // Delete the container
                    try {
                        $this->dockerService->deleteVM($vm->user_id);
                    } catch (\Exception $e) {
                        Log::warning("Failed to delete VM container during cleanup: {$e->getMessage()}");
                    }
                }

                // Delete from database
                $vm->delete();
                $deleted++;

                $this->line("   ✓ VM deleted successfully");

                Log::info("Cleaned up idle VM #{$vm->id}", [
                    'user_id' => $vm->user_id,
                    'container_name' => $vm->container_name,
                    'idle_duration' => $maxAge,
                ]);
            } catch (\Exception $e) {
                $errors++;
                $this->error("   ✗ Error cleaning up VM: {$e->getMessage()}");
                Log::error("Error cleaning up VM #{$vm->id}: {$e->getMessage()}", [
                    'vm_id' => $vm->id,
                    'exception' => get_class($e),
                ]);
            }
        }

        $this->info("✅ Cleanup completed: {$deleted} VMs deleted, {$errors} errors");

        return Command::SUCCESS;
    }
}
