import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal, Play, Square, Wifi, HardDrive,
  Cpu, MemoryStick, AlertCircle, Loader, Check, X
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@components/atoms/Button';
import AuthModal from '@components/organisms/AuthModal';
import { vmService } from '@/services/vm.service';

interface VMStatus {
  id: number;
  status: 'stopped' | 'starting' | 'running' | 'error';
  container_name: string;
  vnc_port: number;
  web_port: number;
  cpu_cores: number;
  memory_mb: number;
  storage_gb: number;
  error_message?: string;
  started_at?: string;
  stopped_at?: string;
}

interface ConnectUrlType {
  novnc_url: string;
  vnc_port: number;
  web_port: number;
  session_token: string;
}

const PlaygroundVMLab = () => {
  const { user, isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const [vmStatus, setVmStatus] = useState<VMStatus | null>(null);
  const [connectUrl, setConnectUrl] = useState<ConnectUrlType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const novncFrameRef = useRef<HTMLIFrameElement>(null);

  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    }
  }, [isAuthenticated]);

  // Fetch VM status
  const fetchVmStatus = async () => {
    if (!isAuthenticated) return;

    try {
      const status = await vmService.getStatus();
      setVmStatus(status);
      setError(null);

      // If running, calculate time remaining (assume 2 hour max)
      if (status?.status === 'running' && status.started_at) {
        const startTime = new Date(status.started_at).getTime();
        const now = new Date().getTime();
        const elapsed = Math.floor((now - startTime) / 1000);
        const remaining = Math.max(0, 7200 - elapsed); // 2 hours
        setTimeRemaining(remaining);
      } else {
        setTimeRemaining(0);
      }
    } catch (err: any) {
      console.error('Failed to fetch VM status:', err);
      if (err.message !== 'Authentication token not found') {
        setError('Failed to fetch VM status');
      }
    }
  };

  // Poll VM status every 5 seconds
  useEffect(() => {
    fetchVmStatus();
    const interval = setInterval(fetchVmStatus, 5000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  // Timer countdown
  useEffect(() => {
    if (timeRemaining > 0 && vmStatus?.status === 'running') {
      const timer = setTimeout(() => {
        setTimeRemaining(t => Math.max(0, t - 1));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeRemaining, vmStatus?.status]);

  // Start VM
  const handleStartVM = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await vmService.startVM();
      setSuccess('VM starting... Please wait');
      await fetchVmStatus();
      // Refresh every 2 seconds while starting
      const startTimer = setInterval(() => {
        fetchVmStatus();
      }, 2000);
      setTimeout(() => clearInterval(startTimer), 15000);
    } catch (err: any) {
      setError(err.message || 'Failed to start VM');
    } finally {
      setLoading(false);
    }
  };

  // Stop VM
  const handleStopVM = async () => {
    if (!confirm('Stop VM? You will lose unsaved work.')) return;

    setLoading(true);
    setError(null);

    try {
      await vmService.stopVM();
      setSuccess('VM stopped');
      setConnectUrl(null);
      await fetchVmStatus();
    } catch (err: any) {
      setError(err.message || 'Failed to stop VM');
    } finally {
      setLoading(false);
    }
  };

  // Connect to VM
  const handleConnect = async () => {
    setLoading(true);
    setError(null);

    try {
      const url = await vmService.getConnectUrl();
      setConnectUrl(url);
      setSuccess('Connected to VM!');
    } catch (err: any) {
      setError(err.message || 'Failed to connect');
    } finally {
      setLoading(false);
    }
  };

  // Delete VM
  const handleDeleteVM = async () => {
    if (!confirm('Delete VM? This cannot be undone.')) return;

    setLoading(true);
    setError(null);

    try {
      await vmService.deleteVM();
      setSuccess('VM deleted successfully');
      setVmStatus(null);
      setConnectUrl(null);
      await fetchVmStatus();
    } catch (err: any) {
      setError(err.message || 'Failed to delete VM');
    } finally {
      setLoading(false);
    }
  };

  // Format time
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'text-green-400';
      case 'starting':
        return 'text-yellow-400';
      case 'stopped':
        return 'text-gray-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-500/10 border-green-500/20';
      case 'starting':
        return 'bg-yellow-500/10 border-yellow-500/20';
      case 'stopped':
        return 'bg-gray-500/10 border-gray-500/20';
      case 'error':
        return 'bg-red-500/10 border-red-500/20';
      default:
        return 'bg-gray-500/10 border-gray-500/20';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <Terminal className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Authentication Required</h2>
          <p className="text-gray-400 mb-6">
            Please log in to access the Virtual Machine Lab
          </p>
          <Button
            onClick={() => setShowAuthModal(true)}
            className="w-full bg-primary hover:bg-primary/80"
          >
            Login to Continue
          </Button>
        </motion.div>
        <AuthModal isOpen={showAuthModal} onClose={() => {}} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950 text-white">
      {/* Header */}
      <div className="bg-dark-900/50 border-b border-white/10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Terminal className="w-6 h-6 text-primary" />
                Virtual Machine Lab
              </h1>
              <p className="text-gray-400 text-sm mt-1">Interactive Debian 13 Environment</p>
            </div>
            {user && (
              <div className="text-right text-sm">
                <p className="text-gray-400">Connected as</p>
                <p className="text-white font-semibold">{user.name}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status & Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-lg border p-6 mb-6 ${
            vmStatus ? getStatusBg(vmStatus.status) : 'bg-gray-500/10 border-gray-500/20'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${
                  vmStatus?.status === 'running'
                    ? 'bg-green-400 animate-pulse'
                    : vmStatus?.status === 'starting'
                    ? 'bg-yellow-400 animate-pulse'
                    : vmStatus?.status === 'error'
                    ? 'bg-red-400'
                    : 'bg-gray-400'
                }`} />
                <h2 className={`text-lg font-semibold capitalize ${getStatusColor(vmStatus?.status || 'stopped')}`}>
                  {vmStatus?.status === 'stopped' ? 'No VM Running' : vmStatus?.status}
                </h2>
              </div>
              
              {vmStatus?.error_message && (
                <p className="text-red-400 text-sm flex items-center gap-1 mt-2">
                  <AlertCircle className="w-4 h-4" />
                  {vmStatus.error_message}
                </p>
              )}
            </div>

            {vmStatus?.status === 'running' && timeRemaining > 0 && (
              <div className="text-right">
                <p className="text-gray-400 text-sm">Time Remaining</p>
                <p className="text-xl font-mono font-bold text-primary">
                  {formatTime(timeRemaining)}
                </p>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex gap-3 flex-wrap">
            {!vmStatus || vmStatus.status === 'stopped' ? (
              <Button
                onClick={handleStartVM}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
              >
                {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                Start VM
              </Button>
            ) : vmStatus.status === 'running' ? (
              <>
                <Button
                  onClick={handleConnect}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                >
                  {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Wifi className="w-4 h-4" />}
                  Connect (noVNC)
                </Button>
                <Button
                  onClick={handleStopVM}
                  disabled={loading}
                  className="bg-red-600 hover:bg-red-700 flex items-center gap-2"
                >
                  <Square className="w-4 h-4" />
                  Stop VM
                </Button>
              </>
            ) : (
              <Button disabled className="flex items-center gap-2">
                <Loader className="w-4 h-4 animate-spin" />
                {vmStatus.status.charAt(0).toUpperCase() + vmStatus.status.slice(1)}...
              </Button>
            )}

            {vmStatus && vmStatus.status !== 'starting' && (
              <Button
                onClick={handleDeleteVM}
                disabled={loading}
                className="bg-gray-700 hover:bg-gray-800 flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Delete
              </Button>
            )}
          </div>
        </motion.div>

        {/* Error/Success Messages */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 flex items-gap gap-2"
            >
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-400">{error}</p>
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6 flex items-center gap-2"
            >
              <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
              <p className="text-green-400">{success}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* VM Info */}
        {vmStatus && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
          >
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Cpu className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400 text-sm">CPU Cores</span>
              </div>
              <p className="text-2xl font-bold">{vmStatus.cpu_cores}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <MemoryStick className="w-4 h-4 text-purple-400" />
                <span className="text-gray-400 text-sm">Memory</span>
              </div>
              <p className="text-2xl font-bold">{vmStatus.memory_mb} MB</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <HardDrive className="w-4 h-4 text-green-400" />
                <span className="text-gray-400 text-sm">Storage</span>
              </div>
              <p className="text-2xl font-bold">{vmStatus.storage_gb} GB</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 text-orange-400">🖥️</div>
                <span className="text-gray-400 text-sm">Port</span>
              </div>
              <p className="text-2xl font-bold">{vmStatus.vnc_port}</p>
            </div>
          </motion.div>
        )}

        {/* noVNC Viewer */}
        {connectUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-900 rounded-lg border border-white/10 overflow-hidden"
          >
            <div className="bg-dark-800 border-b border-white/10 px-4 py-3 flex items-center justify-between">
              <h3 className="font-semibold flex items-center gap-2">
                <Wifi className="w-4 h-4 text-blue-400" />
                VM Console (noVNC)
              </h3>
              <button
                onClick={() => setConnectUrl(null)}
                className="text-gray-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video bg-black">
              <iframe
                ref={novncFrameRef}
                src={connectUrl.novnc_url}
                className="w-full h-full border-0"
                allow="clipboard-read; clipboard-write"
                title="VM Console"
              />
            </div>
            <div className="bg-dark-800 border-t border-white/10 px-4 py-3 text-xs text-gray-400">
              <p>Connected to: {connectUrl.vnc_port} | Session: {connectUrl.session_token.substring(0, 8)}...</p>
            </div>
          </motion.div>
        )}

        {/* No VM Running Message */}
        {(!vmStatus || vmStatus.status === 'stopped') && !connectUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-dark-900 rounded-lg border border-dashed border-white/20 p-8 text-center"
          >
            <Terminal className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-300 mb-2">No VM Running</h3>
            <p className="text-gray-500 mb-4">
              Click "Start VM" to create a new Debian 13 virtual machine
            </p>
            <ul className="text-left text-gray-400 text-sm max-w-md mx-auto space-y-1 mb-6">
              <li>✓ Full root access</li>
              <li>✓ XFCE4 desktop environment</li>
              <li>✓ Development tools pre-installed</li>
              <li>✓ Isolated network</li>
              <li>✓ Auto-cleanup after 2 hours</li>
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PlaygroundVMLab;
