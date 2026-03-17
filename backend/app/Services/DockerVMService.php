<?php

namespace App\Services;

use App\Models\VirtualMachine;
use Illuminate\Support\Facades\Log;
use Symfony\Component\Process\Process;

/**
 * Docker VM Manager Service
 * 
 * Handles Docker container operations for virtual machines:
 * - Create/Start/Stop containers
 * - Port allocation
 * - Resource management
 */
class DockerVMService
{
    private const VM_IMAGE = 'neverland-vm-debian:latest';
    private const VNC_PORT_START = 5901;
    private const WEB_PORT_START = 6080;
    private const NETWORK_NAME = 'neverland-lab';

    /**
     * Get Docker API socket path
     */
    private function getDockerSocket(): string
    {
        return '/var/run/docker.sock';
    }

    /**
     * Execute Docker command
     */
    private function executeDocker(array $command): string
    {
        array_unshift($command, 'docker');
        
        $process = new Process($command);
        $process->setTimeout(300);
        $process->run();

        if (!$process->isSuccessful()) {
            $error = $process->getErrorOutput() ?: $process->getOutput();
            Log::error('Docker command failed: ' . implode(' ', $command), [
                'error' => $error,
            ]);
            throw new \Exception('Docker operation failed: ' . $error);
        }

        return trim($process->getOutput());
    }

    /**
     * Get next available VNC port
     */
    private function getNextVncPort(): int
    {
        $usedPorts = VirtualMachine::where('status', '!=', 'stopped')
            ->pluck('vnc_port')
            ->toArray();

        $port = self::VNC_PORT_START;
        while (in_array($port, $usedPorts)) {
            $port++;
        }

        return $port;
    }

    /**
     * Get next available Web port
     */
    private function getNextWebPort(): int
    {
        $usedPorts = VirtualMachine::where('status', '!=', 'stopped')
            ->pluck('web_port')
            ->toArray();

        $port = self::WEB_PORT_START;
        while (in_array($port, $usedPorts)) {
            $port++;
        }

        return $port;
    }

    /**
     * Create Docker network if not exists
     */
    public function ensureNetwork(): void
    {
        try {
            // Check if network exists
            $this->executeDocker(['network', 'inspect', self::NETWORK_NAME]);
        } catch (\Exception $e) {
            if (str_contains($e->getMessage(), 'No such network')) {
                // Create network
                $this->executeDocker([
                    'network', 'create',
                    '--driver', 'bridge',
                    self::NETWORK_NAME,
                ]);
                Log::info("Created Docker network: " . self::NETWORK_NAME);
            } else {
                throw $e;
            }
        }
    }

    /**
     * Create and start VM container for user
     */
    public function createVM(VirtualMachine $vm): void
    {
        try {
            $this->ensureNetwork();

            $containerName = $vm->container_name;
            $vncPort = $vm->vnc_port;
            $webPort = $vm->web_port;

            Log::info("Creating VM container: $containerName (ports: VNC=$vncPort, Web=$webPort)");

            // Create and run container
            $containerId = $this->executeDocker([
                'run',
                '-d',  // Detached mode
                '--name', $containerName,
                '--network', self::NETWORK_NAME,
                '-p', "$vncPort:5901",
                '-p', "$webPort:6080",
                // Resource limits
                '--memory', "{$vm->memory_mb}m",
                '--cpus', (string)$vm->cpu_cores,
                // Health check
                '--health-interval=30s',
                '--health-timeout=10s',
                '--health-start-period=15s',
                '--health-retries=3',
                // Restart policy
                '--restart=unless-stopped',
                // Image
                self::VM_IMAGE,
            ]);

            Log::info("VM container created: $containerId");

            // Update VM record
            $vm->update([
                'container_id' => $containerId,
                'status' => 'starting',
                'session_token' => VirtualMachine::generateSessionToken(),
            ]);

        } catch (\Exception $e) {
            Log::error("Failed to create VM: " . $e->getMessage());
            $vm->update([
                'status' => 'error',
                'error_message' => $e->getMessage(),
            ]);
            throw $e;
        }
    }

    /**
     * Start existing VM container
     */
    public function startVM(VirtualMachine $vm): void
    {
        try {
            if ($vm->isRunning()) {
                Log::warning("VM {$vm->id} is already running");
                return;
            }

            if (!$vm->container_id) {
                throw new \Exception('Container ID not found');
            }

            Log::info("Starting VM container: {$vm->container_name}");

            $this->executeDocker(['start', $vm->container_id]);

            $vm->update([
                'status' => 'starting',
                'started_at' => now(),
                'error_message' => null,
                'session_token' => VirtualMachine::generateSessionToken(),
            ]);

            Log::info("VM {$vm->id} started successfully");

        } catch (\Exception $e) {
            Log::error("Failed to start VM: " . $e->getMessage());
            $vm->update([
                'status' => 'error',
                'error_message' => $e->getMessage(),
            ]);
            throw $e;
        }
    }

    /**
     * Stop VM container
     */
    public function stopVM(VirtualMachine $vm): void
    {
        try {
            if ($vm->isStopped()) {
                Log::warning("VM {$vm->id} is already stopped");
                return;
            }

            if (!$vm->container_id) {
                throw new \Exception('Container ID not found');
            }

            Log::info("Stopping VM container: {$vm->container_name}");

            $this->executeDocker(['stop', $vm->container_id]);

            $vm->update([
                'status' => 'stopped',
                'stopped_at' => now(),
                'error_message' => null,
            ]);

            Log::info("VM {$vm->id} stopped successfully");

        } catch (\Exception $e) {
            Log::error("Failed to stop VM: " . $e->getMessage());
            $vm->update([
                'status' => 'error',
                'error_message' => $e->getMessage(),
            ]);
            throw $e;
        }
    }

    /**
     * Delete VM container
     */
    public function deleteVM(VirtualMachine $vm): void
    {
        try {
            // Stop if running
            if ($vm->isRunning()) {
                $this->stopVM($vm);
            }

            if (!$vm->container_id) {
                Log::warning("VM {$vm->id} has no container_id, skipping stop");
                return;
            }

            Log::info("Deleting VM container: {$vm->container_name}");

            $this->executeDocker(['rm', '-f', $vm->container_id]);

            $vm->update([
                'container_id' => null,
                'status' => 'stopped',
            ]);

            Log::info("VM {$vm->id} deleted successfully");

        } catch (\Exception $e) {
            Log::error("Failed to delete VM: " . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Check VM status
     */
    public function checkStatus(VirtualMachine $vm): string
    {
        try {
            if (!$vm->container_id) {
                return 'stopped';
            }

            $status = $this->executeDocker(['inspect', '-f', '{{.State.Status}}', $vm->container_id]);
            
            // Map Docker states to our states
            return match (strtolower($status)) {
                'running' => 'running',
                'paused' => 'stopped',
                'exited' => 'stopped',
                'created' => 'starting',
                default => 'stopped',
            };

        } catch (\Exception $e) {
            Log::warning("Failed to check VM status: " . $e->getMessage());
            return 'error';
        }
    }

    /**
     * Get container logs
     */
    public function getContainerLogs(VirtualMachine $vm, int $lines = 50): string
    {
        try {
            if (!$vm->container_id) {
                return '';
            }

            return $this->executeDocker(['logs', '--tail', (string)$lines, $vm->container_id]);

        } catch (\Exception $e) {
            Log::warning("Failed to get container logs: " . $e->getMessage());
            return '';
        }
    }

    /**
     * Allocate new VM for user
     */
    public function allocateVM(int $userId, array $specs = []): VirtualMachine
    {
        $this->ensureNetwork();

        $vncPort = $this->getNextVncPort();
        $webPort = $this->getNextWebPort();

        $vm = VirtualMachine::create([
            'user_id' => $userId,
            'container_name' => "vm_user_{$userId}_" . now()->timestamp,
            'vnc_port' => $vncPort,
            'web_port' => $webPort,
            'cpu_cores' => $specs['cpu_cores'] ?? 1,
            'memory_mb' => $specs['memory_mb'] ?? 1024,
            'storage_gb' => $specs['storage_gb'] ?? 20,
            'status' => 'stopped',
            'session_token' => VirtualMachine::generateSessionToken(),
        ]);

        Log::info("Allocated VM {$vm->id} for user {$userId}");

        return $vm;
    }
}
