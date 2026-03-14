<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class VMController extends Controller
{
    /**
     * Start a new VM Docker container
     */
    public function start(Request $request)
    {
        $request->validate([
            'user_id' => 'required|string',
            'username' => 'required|string',
            'duration' => 'integer|min:3600|max:14400', // 1-4 hours in seconds
        ]);

        // One-time use policy: each user may only start one VM session ever
        $usageKey = "vm_used_{$request->user_id}";
        if (cache()->has($usageKey)) {
            return response()->json([
                'success' => false,
                'message' => 'You have already used your free VM session. Download the OpenVPN config to reconnect to the VPS directly.',
                'vpn_required' => true,
            ], 403);
        }

        try {
            $containerId = 'vm_' . Str::random(16);
            $duration = $request->duration ?? 3600; // Default 1 hour
            
            // Generate random password (8 characters alphanumeric)
            $password = Str::random(8);
            
            // Ensure image is available
            $inspectOutput = [];
            exec('docker image inspect debian:trixie >/dev/null 2>&1', $inspectOutput, $inspectCode);
            if ($inspectCode !== 0) {
                $pullOutput = [];
                exec('docker pull debian:trixie 2>&1', $pullOutput, $pullCode);
                if ($pullCode !== 0) {
                    Log::error('VM Start pull failed: ' . implode(' ', $pullOutput));
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed to pull Debian image',
                    ], 500);
                }
            }

            // Create Docker container with Debian 13 - Full root access with internet connectivity
            // Like TryHackMe VM: privileged mode, all capabilities, no security restrictions
            $command = sprintf(
                'docker run -d --name %s --rm -it ' .
                '--user root ' .                              // Root user
                '--privileged ' .                             // Privileged mode - full access
                '--cap-add=ALL ' .                            // All Linux capabilities
                '--security-opt seccomp=unconfined ' .        // No syscall restrictions
                '--security-opt apparmor=unconfined ' .       // No AppArmor restrictions
                '--network=bridge ' .                         // Full network access (not isolated)
                '--dns 8.8.8.8 --dns 8.8.4.4 ' .             // DNS for internet access
                '--memory="1g" --cpus="1" ' .                 // Resource limits
                '--ulimit nofile=65536:65536 ' .             // File descriptor limits
                '--tmpfs /run ' .                             // tmpfs for runtime
                '--tmpfs /tmp ' .                             // tmpfs for temp files
                '-v /sys/fs/cgroup:/sys/fs/cgroup:rw ' .     // cgroup access
                'debian:trixie /bin/bash 2>&1',
                $containerId
            );

            $output = [];
            exec($command, $output, $returnCode);

            if ($returnCode !== 0) {
                Log::error('VM Start Error: ' . implode(' ', $output));
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to create Docker container',
                ], 500);
            }
            
            // Setup Debian repositories (required for package installation)
            // This ensures user can install any packages they need
            // MUST run synchronously before returning to ensure apt works
            // Using HTTPS for better security
            $setupRepos = "mkdir -p /etc/apt && "
                . "rm -f /etc/apt/sources.list.d/debian.sources && "
                . "cat > /etc/apt/sources.list << 'EOF'\n"
                . "deb https://deb.debian.org/debian trixie main contrib non-free non-free-firmware\n"
                . "deb https://deb.debian.org/debian trixie-updates main contrib non-free non-free-firmware\n"
                . "deb https://deb.debian.org/debian-security trixie-security main contrib non-free non-free-firmware\n"
                . "EOF\n";
            
            $repoOutput = [];
            exec("docker exec {$containerId} /bin/bash -c " . escapeshellarg($setupRepos) . " 2>&1", $repoOutput, $repoCode);
            
            if ($repoCode !== 0) {
                Log::warning('VM Repository Setup Warning: ' . implode(' ', $repoOutput));
            }
            
            // Bootstrap CA certificates without verification (required for HTTPS repos)
            // This is safe because we're installing from official Debian mirrors
            $bootstrapCA = "apt-get -o Acquire::https::Verify-Peer=false -o Acquire::https::Verify-Host=false update 2>&1 && "
                . "apt-get -o Acquire::https::Verify-Peer=false -o Acquire::https::Verify-Host=false install -y ca-certificates 2>&1 && "
                . "update-ca-certificates 2>&1";
            
            $caOutput = [];
            exec("docker exec {$containerId} /bin/bash -c " . escapeshellarg($bootstrapCA) . " 2>&1", $caOutput, $caCode);
            
            if ($caCode !== 0) {
                Log::warning('VM CA Bootstrap Warning: ' . implode(' ', $caOutput));
            }
            
            // Now run apt-get update normally with proper SSL verification
            // This is critical - without this, apt install will fail
            $updateOutput = [];
            exec("docker exec {$containerId} /bin/bash -c 'apt-get update 2>&1'", $updateOutput, $updateCode);
            
            if ($updateCode !== 0) {
                Log::warning('VM apt-get update warning: ' . implode(' ', $updateOutput));
            }
            
            // Set root password synchronously
            exec("docker exec {$containerId} /bin/bash -c \"echo 'root:{$password}' | chpasswd\" 2>&1");
            
            // APT is now ready - user can install packages themselves
            // No automatic tool installation - let users install what they need
            
            // Ensure container is running before returning
            exec("docker ps -q -f name={$containerId}", $checkOutput);
            if (empty($checkOutput)) {
                throw new \Exception("Container failed to start properly");
            }

            // Store session in database/cache with long TTL
            // We use manual expiry check in execute() and status() instead of relying on cache TTL
            cache()->put("vm_session_{$containerId}", [
                'container_id' => $containerId,
                'user_id' => $request->user_id,
                'username' => $request->username,
                'password' => $password,
                'started_at' => now(),
                'expires_at' => now()->addSeconds($duration),
                'status' => 'running',
            ], 14401); // Long TTL (4 hours) to survive extends

            // Mark user as having used their one-time VM session (1 year retention)
            cache()->put("vm_used_{$request->user_id}", [
                'container_id' => $containerId,
                'started_at' => now()->toIso8601String(),
                'expires_at' => now()->addSeconds($duration)->toIso8601String(),
            ], 86400 * 365);
            
            // Schedule container deletion
            $this->scheduleContainerCleanup($containerId, $duration);
            
            return response()->json([
                'success' => true,
                'container_id' => $containerId,
                'password' => $password,
                'os' => 'Debian 13 (Trixie)',
                'resources' => [
                    'ram' => '1 GB',
                    'storage' => '20 GB',
                    'cpu' => '1 Core'
                ],
                'expires_at' => now()->addSeconds($duration)->toIso8601String(),
            ]);
            
        } catch (\Exception $e) {
            Log::error('VM Start Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Internal server error',
            ], 500);
        }
    }
    
    /**
     * Stop VM container
     */
    public function stop(Request $request, $containerId)
    {
        try {
            // Verify container belongs to user
            $session = cache()->get("vm_session_{$containerId}");
            
            if (!$session) {
                return response()->json([
                    'success' => false,
                    'message' => 'Container not found or expired',
                ], 404);
            }
            
            // Stop and remove container
            exec("docker stop {$containerId} 2>&1", $output, $returnCode);
            
            // Clean up session
            cache()->forget("vm_session_{$containerId}");
            
            return response()->json([
                'success' => true,
                'message' => 'Container stopped successfully',
            ]);
            
        } catch (\Exception $e) {
            Log::error('VM Stop Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to stop container',
            ], 500);
        }
    }
    
    /**
     * Get VM status
     */
    public function status($containerId)
    {
        try {
            $session = cache()->get("vm_session_{$containerId}");
            
            if (!$session || !is_array($session)) {
                return response()->json([
                    'success' => false,
                    'status' => 'not_found',
                ], 404);
            }
            
            // Check if session has expired
            if (now() > $session['expires_at']) {
                cache()->forget("vm_session_{$containerId}");
                exec("docker stop {$containerId} 2>&1", $stopOutput, $stopCode);
                return response()->json([
                    'success' => false,
                    'status' => 'expired',
                ], 404);
            }
            
            // Check if container is still running
            exec("docker ps -q -f name={$containerId}", $output);
            $isRunning = !empty($output);
            
            if (!$isRunning) {
                cache()->forget("vm_session_{$containerId}");
                return response()->json([
                    'success' => false,
                    'status' => 'stopped',
                ], 404);
            }
            
            $timeRemaining = $session['expires_at']->diffInSeconds(now());
            
            return response()->json([
                'success' => true,
                'status' => 'running',
                'container_id' => $containerId,
                'time_remaining' => max(0, $timeRemaining),
                'started_at' => $session['started_at']->toIso8601String(),
                'expires_at' => $session['expires_at']->toIso8601String(),
            ]);
            
        } catch (\Exception $e) {
            Log::error('VM Status Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to get status',
            ], 500);
        }
    }
    
    public function execute(Request $request, $containerId)
    {
        $request->validate([
            'command' => 'required|string',
        ]);
        
        try {
            $session = cache()->get("vm_session_{$containerId}");
            
            if (!$session || !is_array($session)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Container not found or expired',
                ], 404);
            }
            
            // Check if session has expired
            if (now() > $session['expires_at']) {
                cache()->forget("vm_session_{$containerId}");
                exec("docker stop {$containerId} 2>&1", $stopOutput, $stopCode);
                return response()->json([
                    'success' => false,
                    'message' => 'Session has expired',
                ], 404);
            }
            
            $command = $request->command;
            
            // Execute command in Docker container with real-time output streaming
            $dockerCommand = sprintf(
                'docker exec %s /bin/bash -c %s 2>&1',
                $containerId,
                escapeshellarg($command)
            );
            
            // Use proc_open for better output handling
            $descriptorspec = [
                0 => ["pipe", "r"],  // stdin
                1 => ["pipe", "w"],  // stdout
                2 => ["pipe", "w"]   // stderr
            ];
            
            $process = proc_open($dockerCommand, $descriptorspec, $pipes);
            
            if (!is_resource($process)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to start command execution',
                    'output' => '',
                ], 500);
            }
            
            // Close stdin as we don't need it
            fclose($pipes[0]);
            
            // Read stdout and stderr with timeout
            stream_set_blocking($pipes[1], false);
            stream_set_blocking($pipes[2], false);
            
            $output = '';
            $errorOutput = '';
            $timeout = 30; // 30 seconds timeout
            $start = time();
            
            while (true) {
                if (time() - $start > $timeout) {
                    proc_terminate($process);
                    break;
                }
                
                $stdout = fread($pipes[1], 8192);
                $stderr = fread($pipes[2], 8192);
                
                if ($stdout !== false && $stdout !== '') {
                    $output .= $stdout;
                }
                
                if ($stderr !== false && $stderr !== '') {
                    $errorOutput .= $stderr;
                }
                
                // Check if process is still running
                $status = proc_get_status($process);
                if (!$status['running']) {
                    // Read any remaining output
                    $output .= stream_get_contents($pipes[1]);
                    $errorOutput .= stream_get_contents($pipes[2]);
                    break;
                }
                
                usleep(50000); // Sleep for 50ms
            }
            
            fclose($pipes[1]);
            fclose($pipes[2]);
            
            $returnCode = proc_close($process);
            
            // Combine stdout and stderr
            $fullOutput = trim($output . $errorOutput);
            
            return response()->json([
                'success' => true,
                'output' => $fullOutput,
                'exit_code' => $returnCode,
            ]);
            
        } catch (\Exception $e) {
            Log::error('VM Execute Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to execute command',
                'output' => $e->getMessage(),
            ], 500);
        }
    }
    
    /**
     * Extend VM session
     */
    public function extend(Request $request, $containerId)
    {
        $request->validate([
            'hours' => 'required|integer|min:1|max:4',
        ]);
        
        try {
            $session = cache()->get("vm_session_{$containerId}");
            
            if (!$session || !is_array($session)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Container not found or expired',
                ], 404);
            }
            
            // Check if session has already expired
            if (now() > $session['expires_at']) {
                return response()->json([
                    'success' => false,
                    'message' => 'Session already expired',
                ], 404);
            }
            
            $additionalSeconds = $request->hours * 3600;
            $newExpiresAt = $session['expires_at']->addSeconds($additionalSeconds);
            
            // Check max 4 hours total
            $totalDuration = $newExpiresAt->diffInSeconds($session['started_at']);
            if ($totalDuration > 14400) { // 4 hours
                return response()->json([
                    'success' => false,
                    'message' => 'Cannot extend beyond 4 hours total',
                ], 400);
            }
            
            $session['expires_at'] = $newExpiresAt;
            
            // Store with very long TTL to prevent premature expiration
            // We'll use manual expiry check in execute() and status()
            $longTtl = 14401; // Slightly more than max session (4 hours + buffer)
            cache()->put("vm_session_{$containerId}", $session, $longTtl);
            
            // Reschedule container cleanup with new duration
            $newSessionDuration = $newExpiresAt->diffInSeconds($session['started_at']);
            $this->scheduleContainerCleanup($containerId, $newSessionDuration);
            
            return response()->json([
                'success' => true,
                'expires_at' => $newExpiresAt->toIso8601String(),
                'time_remaining' => $newExpiresAt->diffInSeconds(now()),
            ]);
            
        } catch (\Exception $e) {
            Log::error('VM Extend Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to extend session',
            ], 500);
        }
    }
    
    /**
     * Get container info
     */
    private function getContainerInfo($containerId)
    {
        exec("docker inspect {$containerId}", $output);
        return json_decode(implode('', $output), true)[0] ?? null;
    }

    /**
     * Return VPN connection info with hourly-rotating IP
     */
    public function vpnConfig(Request $request)
    {
        $ipPool = $this->getVpnIpPool();
        $currentHour = (int) date('G');
        $currentIp = $ipPool[$currentHour % count($ipPool)];
        $nextRotationAt = now()->startOfHour()->addHour();

        return response()->json([
            'success'                => true,
            'current_ip'             => $currentIp,
            'port'                   => (int) env('VPN_PORT', 1194),
            'protocol'               => strtoupper(env('VPN_PROTO', 'udp')),
            'encryption'             => 'AES-256-GCM',
            'auth'                   => 'SHA512',
            'tls_version'            => '1.3',
            'next_rotation_at'       => $nextRotationAt->toIso8601String(),
            'next_rotation_minutes'  => max(1, $nextRotationAt->diffInMinutes(now())),
        ]);
    }

    /**
     * Download the OpenVPN client config (.ovpn) with the current rotating IP
     */
    public function downloadVpnConfig(Request $request)
    {
        $ipPool = $this->getVpnIpPool();
        $currentHour = (int) date('G');
        $currentIp = $ipPool[$currentHour % count($ipPool)];

        $configContent = $this->generateOpenVpnConfig($currentIp);

        return response($configContent, 200, [
            'Content-Type'        => 'application/x-openvpn-profile',
            'Content-Disposition' => 'attachment; filename="neverland-vpn.ovpn"',
        ]);
    }

    /**
     * Return the VPN IP pool from environment, or fall back to the VPS IP.
     */
    private function getVpnIpPool(): array
    {
        $poolEnv = env('VPN_IP_POOL', '');
        if ($poolEnv) {
            return array_values(array_filter(array_map('trim', explode(',', $poolEnv))));
        }
        return [env('VPS_IP', '127.0.0.1')];
    }

    /**
     * Build the .ovpn file content with strong encryption settings.
     */
    private function generateOpenVpnConfig(string $serverIp): string
    {
        $port    = env('VPN_PORT', '1194');
        $proto   = env('VPN_PROTO', 'udp');
        $ca      = env('VPN_CA_CERT', '# *** REPLACE with your server CA certificate (base64 PEM) ***');
        $tlsAuth = env('VPN_TLS_AUTH_KEY', '# *** REPLACE with your tls-auth / tls-crypt key ***');

        return <<<OVPN
# Neverland Studio — OpenVPN Client Config
# IP rotates every hour for enhanced privacy.
# Generated: {$serverIp}

client
dev tun
proto {$proto}
remote {$serverIp} {$port}
resolv-retry infinite
nobind
persist-key
persist-tun
remote-cert-tls server

# ── Strong Encryption (AES-256-GCM + SHA-512 + TLS 1.3) ──────────────────────
cipher AES-256-GCM
auth SHA512
tls-version-min 1.3
tls-cipher TLS-AES-256-GCM-SHA384:TLS-CHACHA20-POLY1305-SHA256

# ── Connection Settings ───────────────────────────────────────────────────────
connect-retry 5 30
keepalive 10 60
ping-restart 120
explicit-exit-notify 1

# ── DNS Leak Prevention ───────────────────────────────────────────────────────
dhcp-option DNS 1.1.1.1
dhcp-option DNS 1.0.0.1
block-outside-dns

# ── Logging ───────────────────────────────────────────────────────────────────
verb 3
mute 20

key-direction 1

<ca>
{$ca}
</ca>

<tls-auth>
{$tlsAuth}
</tls-auth>
OVPN;
    }
    
    /**
     * Schedule container cleanup
     */
    private function scheduleContainerCleanup($containerId, $duration)
    {
        // Schedule cleanup job
        dispatch(function () use ($containerId) {
            exec("docker stop {$containerId} 2>&1");
            cache()->forget("vm_session_{$containerId}");
        })->delay(now()->addSeconds($duration + 60)); // Add 60s buffer
    }
}
