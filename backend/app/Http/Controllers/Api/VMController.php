<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\VirtualMachine;
use App\Services\DockerVMService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Routing\Middleware\Authenticate;

/**
 * Virtual Machine API Controller
 * 
 * Endpoints for VM management:
 * - POST   /api/v1/vm/start        → Start user's VM
 * - POST   /api/v1/vm/stop         → Stop user's VM
 * - GET    /api/v1/vm/status       → Get VM status
 * - GET    /api/v1/vm/connect-url  → Get noVNC connection URL
 * - DELETE /api/v1/vm/delete       → Delete VM
 * - GET    /api/v1/vm/logs         → Get container logs
 */
class VMController extends Controller
{
    private DockerVMService $dockerService;

    public function __construct(DockerVMService $dockerService)
    {
        $this->dockerService = $dockerService;
    }

    /**
     * GET /api/v1/vm/status
     * Get current user's VM status
     */
    public function getStatus(Request $request): JsonResponse
    {
        try {
            $user = $request->user();
            $vm = VirtualMachine::where('user_id', $user->id)->latest()->first();

            if (!$vm) {
                return response()->json([
                    'status' => 'no-vm',
                    'message' => 'User has no VM instance',
                ]);
            }

            // Check actual Docker status
            $actualStatus = $this->dockerService->checkStatus($vm);
            if ($actualStatus !== $vm->status) {
                $vm->update(['status' => $actualStatus]);
            }

            return response()->json([
                'id' => $vm->id,
                'status' => $vm->status,
                'container_name' => $vm->container_name,
                'vnc_port' => $vm->vnc_port,
                'web_port' => $vm->web_port,
                'cpu_cores' => $vm->cpu_cores,
                'memory_mb' => $vm->memory_mb,
                'storage_gb' => $vm->storage_gb,
                'started_at' => $vm->started_at,
                'stopped_at' => $vm->stopped_at,
                'error_message' => $vm->error_message,
            ]);

        } catch (\Exception $e) {
            Log::error('VM status check failed: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to check VM status',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * POST /api/v1/vm/start
     * Start or create user's VM
     */
    public function start(Request $request): JsonResponse
    {
        try {
            $user = $request->user();

            // Check if user already has a running/starting VM
            $existingVM = VirtualMachine::where('user_id', $user->id)
                ->whereIn('status', ['running', 'starting'])
                ->latest()
                ->first();

            if ($existingVM) {
                return response()->json([
                    'message' => 'VM is already running',
                    'vm_id' => $existingVM->id,
                    'status' => $existingVM->status,
                ], 409);
            }

            // Check if user has a stopped VM
            $stoppedVM = VirtualMachine::where('user_id', $user->id)
                ->where('status', 'stopped')
                ->latest()
                ->first();

            if ($stoppedVM && $stoppedVM->container_id) {
                // Start existing VM
                Log::info("Restarting existing VM {$stoppedVM->id} for user {$user->id}");
                $this->dockerService->startVM($stoppedVM);
                $vm = $stoppedVM;
            } else {
                // Allocate and create new VM
                Log::info("Creating new VM for user {$user->id}");
                $vm = $this->dockerService->allocateVM($user->id);
                $this->dockerService->createVM($vm);
            }

            return response()->json([
                'message' => 'VM starting...',
                'vm_id' => $vm->id,
                'status' => $vm->status,
                'container_name' => $vm->container_name,
                'vnc_port' => $vm->vnc_port,
                'web_port' => $vm->web_port,
            ], 202);

        } catch (\Exception $e) {
            Log::error('VM start failed: ' . $e->getMessage(), [
                'user_id' => $request->user()?->id,
            ]);
            return response()->json([
                'error' => 'Failed to start VM',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * POST /api/v1/vm/stop
     * Stop user's VM
     */
    public function stop(Request $request): JsonResponse
    {
        try {
            $user = $request->user();
            $vm = VirtualMachine::where('user_id', $user->id)
                ->where('status', '!=', 'stopped')
                ->latest()
                ->first();

            if (!$vm) {
                return response()->json([
                    'message' => 'No running VM found',
                ], 404);
            }

            Log::info("Stopping VM {$vm->id} for user {$user->id}");
            $this->dockerService->stopVM($vm);

            return response()->json([
                'message' => 'VM stopped successfully',
                'vm_id' => $vm->id,
                'status' => $vm->status,
            ]);

        } catch (\Exception $e) {
            Log::error('VM stop failed: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to stop VM',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * GET /api/v1/vm/connect-url
     * Get noVNC connection URL for user's VM
     */
    public function getConnectUrl(Request $request): JsonResponse
    {
        try {
            $user = $request->user();
            $vm = VirtualMachine::where('user_id', $user->id)
                ->where('status', 'running')
                ->latest()
                ->first();

            if (!$vm) {
                return response()->json([
                    'error' => 'No running VM found',
                ], 404);
            }

            $serverUrl = config('app.url', 'http://localhost');
            $novncUrl = $vm->getNoVncUrl($serverUrl);

            // Update activity
            $vm->updateActivity();

            return response()->json([
                'novnc_url' => $novncUrl,
                'vnc_port' => $vm->vnc_port,
                'web_port' => $vm->web_port,
                'session_token' => $vm->session_token,
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to get connect URL: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to get connect URL',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * DELETE /api/v1/vm/delete
     * Delete user's VM completely
     */
    public function delete(Request $request): JsonResponse
    {
        try {
            $user = $request->user();
            $vm = VirtualMachine::where('user_id', $user->id)
                ->latest()
                ->first();

            if (!$vm) {
                return response()->json([
                    'message' => 'No VM found to delete',
                ], 404);
            }

            Log::info("Deleting VM {$vm->id} for user {$user->id}");
            
            $this->dockerService->deleteVM($vm);
            $vm->delete();

            return response()->json([
                'message' => 'VM deleted successfully',
            ]);

        } catch (\Exception $e) {
            Log::error('VM deletion failed: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to delete VM',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * GET /api/v1/vm/logs
     * Get container logs (debugging)
     */
    public function getLogs(Request $request): JsonResponse
    {
        try {
            $user = $request->user();
            $vm = VirtualMachine::where('user_id', $user->id)
                ->latest()
                ->first();

            if (!$vm) {
                return response()->json(['error' => 'No VM found'], 404);
            }

            $logs = $this->dockerService->getContainerLogs($vm);

            return response()->json([
                'container_name' => $vm->container_name,
                'logs' => $logs,
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to get logs: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to get logs',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * POST /api/v1/vm/update-activity
     * Update last activity (for tracking idle VMs)
     */
    public function updateActivity(Request $request): JsonResponse
    {
        try {
            $user = $request->user();
            $vm = VirtualMachine::where('user_id', $user->id)
                ->where('status', 'running')
                ->latest()
                ->first();

            if ($vm) {
                $vm->updateActivity();
            }

            return response()->json(['success' => true]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
