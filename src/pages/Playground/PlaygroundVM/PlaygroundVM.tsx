import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Terminal, Power, Clock, Plus, AlertCircle,
  ArrowLeft, HardDrive, Shield, Key, Server, Code, Download, Lock, Wifi
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '@components/atoms/Button';
import SectionTitle from '@components/molecules/SectionTitle';
import AuthModal from '@components/organisms/AuthModal';
import { useAuthState } from '@/hooks/useAuthState';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'success';
  content: string;
  timestamp: Date;
}
const PlaygroundVM = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthState();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isVMActive, setIsVMActive] = useState(false);
  const [containerId, setContainerId] = useState<string>('');
  const [vmPassword, setVmPassword] = useState<string>('');
  const [vmOS, setVmOS] = useState<string>('');
  const [resources, setResources] = useState({ ram: '', storage: '', cpu: '' });

  // Session States
  const [timeRemaining, setTimeRemaining] = useState(3600); // 1 hour default
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);

  // Terminal States
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [commandsExecuted, setCommandsExecuted] = useState(0);
  const [currentDir, setCurrentDir] = useState('/root');

  // Tab Completion States
  const [tabSuggestions, setTabSuggestions] = useState<string[]>([]);
  const [tabIndex, setTabIndex] = useState(-1);
  const [originalCommand, setOriginalCommand] = useState('');

  // One-time use + VPN states
  const [vmUsed, setVmUsed] = useState(false);
  const [vpnNextRotation, setVpnNextRotation] = useState(0);
  const [isDownloadingVpn] = useState(false); // kept for UI compat, download is instant

  // Backend URL - prefer explicit env var, otherwise use same-origin proxy (most reliable)
  const apiBase = import.meta.env.VITE_API_URL || '/api';

  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Helper functions - defined before useEffect to avoid reference errors
  const addTerminalLine = (type: TerminalLine['type'], content: string) => {
    setTerminalLines(prev => [...prev, { type, content, timestamp: new Date() }]);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  // Format ls output in columns like real terminal
  const formatLsOutput = (output: string): string => {
    const items = output.split('\n').filter((item: string) => item.trim());
    if (items.length === 0) return '';

    // Sort items alphabetically (case-insensitive)
    const sortedItems = items.sort((a, b) =>
      a.toLowerCase().localeCompare(b.toLowerCase())
    );

    // Calculate max width for column alignment
    const maxWidth = Math.max(...sortedItems.map(item => item.length));
    const columnWidth = maxWidth + 2; // Add padding
    const terminalWidth = 100; // Assume 100 chars width
    const columnsPerRow = Math.max(1, Math.floor(terminalWidth / columnWidth));

    // Build rows with aligned columns
    const rows: string[] = [];
    for (let i = 0; i < sortedItems.length; i += columnsPerRow) {
      const rowItems = sortedItems.slice(i, i + columnsPerRow);
      const rowText = rowItems
        .map(item => item.padEnd(columnWidth, ' '))
        .join('')
        .trimEnd();
      rows.push(rowText);
    }

    return rows.join('\n');
  };

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [terminalLines]);

  // Focus input when terminal is active
  useEffect(() => {
    if (isVMActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isVMActive, terminalLines]);

  // Restore session if exists
  useEffect(() => {
    const savedContainerId = localStorage.getItem('vm-container-id');
    const savedExpiresAt = localStorage.getItem('vm-expires-at');

    if (savedContainerId && savedExpiresAt) {
      const expiresDate = new Date(savedExpiresAt);
      const now = new Date();

      if (expiresDate > now) {
        // Session still valid
        setContainerId(savedContainerId);
        setExpiresAt(expiresDate);
        setIsVMActive(true);
        addTerminalLine('success', '✓ Session restored from previous connection');
        addTerminalLine('output', `Container ID: ${savedContainerId.substring(0, 12)}`);
      } else {
        // Session expired, clean up
        localStorage.removeItem('vm-container-id');
        localStorage.removeItem('vm-expires-at');
      }
    }
  }, []);

  // Check one-time use flag and start VPN rotation countdown
  useEffect(() => {
    if (user?.id) {
      const used = localStorage.getItem(`vm-session-used-${user.id}`);
      if (used === 'true') setVmUsed(true);
    }

    const updateRotation = () => {
      const now = new Date();
      setVpnNextRotation(60 - now.getMinutes());
    };
    updateRotation();
    const rotationInterval = setInterval(updateRotation, 60000);
    return () => clearInterval(rotationInterval);
  }, [user]);

  // Countdown timer - moved after addTerminalLine definition
  useEffect(() => {
    if (!isVMActive || !expiresAt) return;

    const interval = setInterval(() => {
      const now = new Date();
      const remaining = Math.floor((expiresAt.getTime() - now.getTime()) / 1000);

      if (remaining <= 0) {
        addTerminalLine('error', '⏰ Session expired! VM akan dihapus...');
        setIsVMActive(false);
        setContainerId('');
        localStorage.removeItem('vm-container-id');
        localStorage.removeItem('vm-expires-at');
        // Mark one-time use consumed
        if (user?.id) {
          localStorage.setItem(`vm-session-used-${user.id}`, 'true');
        }
        setVmUsed(true);
        return;
      }

      setTimeRemaining(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [isVMActive, expiresAt]);

  const handleStartVM = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    setTerminalLines([]);
    setIsStarting(true);

    try {
      console.log('[VM] Starting VM with apiBase:', apiBase);
      const response = await fetch(`${apiBase}/v1/vm/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          user_id: String(user?.id || 'guest'),
          username: String(user?.name || 'guest'),
          duration: 3600, // 1 hour
        }),
      });

      console.log('[VM] Response status:', response.status, 'ok:', response.ok);
      const contentType = response.headers.get('content-type') || '';
      console.log('[VM] Content-Type:', contentType);

      const raw = await response.text();
      console.log('[VM] Raw response:', raw.substring(0, 200));

      let data;
      try {
        data = JSON.parse(raw);
        console.log('[VM] Parsed data:', data);
      } catch (parseErr) {
        console.error('[VM] JSON parse error:', parseErr);
        data = null;
      }

      if (!response.ok) {
        console.error('[VM] Response not OK:', response.status, data?.message || raw);
        // Backend enforces one-time use
        if (response.status === 403 && data?.vpn_required) {
          if (user?.id) {
            localStorage.setItem(`vm-session-used-${user.id}`, 'true');
          }
          setVmUsed(true);
          return;
        }
        addTerminalLine('error', `❌ API Error: ${response.status} - ${data?.message || 'Unknown error'}`);
        return;
      }

      if (!data?.success) {
        console.error('[VM] Success field false:', data?.message || data);
        addTerminalLine('error', `❌ Server error: ${data?.message || 'VM gagal dibuat'}`);
        return;
      }

      // Save session info
      console.log('[VM] Creating VM with ID:', data.container_id);

      try {
        setContainerId(data.container_id);
        console.log('[VM] Set container ID');

        setVmPassword(data.password);
        console.log('[VM] Set password');

        setVmOS(data.os || 'Debian 13 (Trixie)');
        setResources(data.resources || { ram: '1 GB', storage: '20 GB', cpu: '1 Core' });
        console.log('[VM] Set OS and resources');

        const expiry = new Date(data.expires_at);
        setExpiresAt(expiry);
        console.log('[VM] Set expiry:', expiry);

        // Save to localStorage
        localStorage.setItem('vm-container-id', data.container_id);
        localStorage.setItem('vm-expires-at', expiry.toISOString());
        console.log('[VM] Saved to localStorage');

        // Clear terminal and show success message
        setTerminalLines([]);
        console.log('[VM] Cleared terminal lines');

        setTimeout(() => {
          addTerminalLine('success', `✓ VM created successfully!`);
          addTerminalLine('output', '');
          addTerminalLine('output', `📦 Container: ${data.container_id.substring(0, 12)}`);
          addTerminalLine('output', `🔑 Password: ${data.password}`);
          addTerminalLine('output', `⏰ Session: 1 hour (extendable)`);
          addTerminalLine('output', '');
          addTerminalLine('success', '✓ APT repositories configured (HTTPS)');
          addTerminalLine('success', '✓ Internet access enabled');
          addTerminalLine('output', '');
          addTerminalLine('output', '💡 Quick start:');
          addTerminalLine('output', '   apt update');
          addTerminalLine('output', '   apt install nano vim curl wget git');
          addTerminalLine('output', '');
          console.log('[VM] Added terminal messages');
        }, 100);

        // Set VM active LAST to ensure all state is ready
        setIsVMActive(true);
        console.log('[VM] Set VM active = true');

      } catch (stateError) {
        console.error('[VM] Error setting state:', stateError);
        addTerminalLine('error', `❌ Error initializing VM state: ${stateError}`);
      }

    } catch (err) {
      console.error('[VM] Fetch error:', err);
      const errMsg = err instanceof Error ? err.message : 'Unknown error';
      addTerminalLine('error', `❌ Error: ${errMsg}`);
    } finally {
      console.log('[VM] Finally block - setting isStarting = false');
      setIsStarting(false);
    }
  };

  const handleStopVM = async () => {
    if (!containerId) {
      setIsVMActive(false);
      return;
    }

    addTerminalLine('output', '');
    addTerminalLine('output', '⏳ Stopping Docker container...');

    try {
      await fetch(`${apiBase}/v1/vm/${containerId}/stop`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      addTerminalLine('success', '✓ Container stopped and removed');
      addTerminalLine('success', '✓ All resources cleaned up');
      addTerminalLine('output', '');
      addTerminalLine('output', `📊 Session Summary:`);
      addTerminalLine('output', `   • Commands Executed: ${commandsExecuted}`);
      addTerminalLine('output', `   • Session Duration: ${formatTime(3600 - timeRemaining)}`);
      addTerminalLine('output', '');
      addTerminalLine('success', '👋 Thank you for using Neverland VM!');
    } catch (error) {
      addTerminalLine('error', '⚠️  Failed to stop container properly');
    }

    // Clean up states
    setIsVMActive(false);
    setContainerId('');
    setVmPassword('');
    setVmOS('');
    setResources({ ram: '', storage: '', cpu: '' });
    setTimeRemaining(3600);
    setExpiresAt(null);
    setCommandsExecuted(0);
    setCurrentDir('/root');

    // Mark one-time use consumed
    if (user?.id) {
      localStorage.setItem(`vm-session-used-${user.id}`, 'true');
    }
    setVmUsed(true);

    // Clean up localStorage
    localStorage.removeItem('vm-container-id');
    localStorage.removeItem('vm-expires-at');
  };

  const handleExtendTime = async (hours: number) => {
    if (!containerId) return;

    try {
      const response = await fetch(`${apiBase}/v1/vm/${containerId}/extend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ hours }),
      });

      const data = await response.json();

      if (data.success) {
        const newExpiresAt = new Date(data.expires_at);
        setExpiresAt(newExpiresAt);
        localStorage.setItem('vm-expires-at', newExpiresAt.toISOString());

        addTerminalLine('success', `✓ Session extended by ${hours} hour(s)`);
        addTerminalLine('output', `New expiry: ${newExpiresAt.toLocaleTimeString()}`);
      } else {
        addTerminalLine('error', `❌ ${data.message}`);
      }
    } catch (error) {
      addTerminalLine('error', '❌ Failed to extend session');
    }
  };

  const handleDownloadVpnConfig = () => {
    // Use direct browser navigation — avoids CORS blob restrictions on Content-Disposition
    const a = document.createElement('a');
    a.href = `${apiBase}/v1/vm/vpn-config/download`;
    a.download = 'neverland-vpn.ovpn';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const executeCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    const username = user?.name ? user.name.toLowerCase().replace(/\s+/g, '-') : 'neverland';
    const displayPath = currentDir === '/root' ? '~' : currentDir;
    addTerminalLine('input', `root@${username}:${displayPath}# ${trimmedCmd}`);
    setCommandHistory(prev => [...prev, trimmedCmd]);
    setCommandsExecuted(prev => prev + 1);

    // Frontend-only commands
    if (trimmedCmd.toLowerCase() === 'clear') {
      setTerminalLines([]);
      return;
    }

    if (trimmedCmd.toLowerCase() === 'exit') {
      addTerminalLine('output', '');
      addTerminalLine('success', '👋 Goodbye! Stopping VM...');
      setTimeout(handleStopVM, 1000);
      return;
    }

    // Handle cd command separately - update currentDir state
    if (trimmedCmd.toLowerCase().startsWith('cd')) {
      const parts = trimmedCmd.split(/\s+/);
      if (parts.length >= 2) {
        const targetDir = parts[1];
        // Build command with proper current directory prefix and validate with pwd
        const cdCommand = `cd ${currentDir} && cd ${targetDir} && pwd`;

        if (!containerId) {
          addTerminalLine('error', '❌ No active container. Please start the VM first.');
          return;
        }

        setIsExecuting(true);
        try {
          const response = await fetch(`${apiBase}/v1/vm/${containerId}/execute`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              command: cdCommand,
            }),
          });

          const data = await response.json();
          if (data.success) {
            // Update current directory from pwd output
            const newDir = data.output?.trim() || currentDir;
            setCurrentDir(newDir);
            addTerminalLine('output', newDir);
          } else {
            addTerminalLine('error', `cd: ${data.message || 'Directory not found'}`);
          }
        } catch (err) {
          addTerminalLine('error', `❌ Error changing directory`);
        } finally {
          setIsExecuting(false);
        }
        return;
      }
    }

    // Execute in Docker container with current directory prefix
    if (!containerId) {
      addTerminalLine('error', '❌ No active container. Please start the VM first.');
      return;
    }

    setIsExecuting(true);

    // Show loading indicator in terminal
    const loadingLineIndex = terminalLines.length;
    addTerminalLine('output', `⏳ Executing: ${trimmedCmd}`);

    try {
      // Prefix command with cd to maintain directory context
      const prefixedCmd = `cd ${currentDir} && ${trimmedCmd}`;

      const response = await fetch(`${apiBase}/v1/vm/${containerId}/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          command: prefixedCmd,
        }),
      });

      const data = await response.json();

      // Remove loading indicator
      setTerminalLines(prev => prev.slice(0, loadingLineIndex));

      if (!data.success) {
        addTerminalLine('error', `❌ Error: ${data.message || 'Command execution failed'}`);
        return;
      }

      // Display output from Docker container
      const output = data.output?.trim() || '';
      if (output) {
        // Check if command is ls or ls variant (ls, ls -l, ls -la, etc.)
        const isLsCommand = trimmedCmd.toLowerCase().startsWith('ls') &&
          !trimmedCmd.toLowerCase().includes('-l') &&
          !trimmedCmd.toLowerCase().includes('--list');

        if (isLsCommand) {
          // Format ls output in columns like real terminal
          const formattedOutput = formatLsOutput(output);
          addTerminalLine('output', formattedOutput);
        } else {
          const lines = output.split('\n');
          lines.forEach((line: string) => {
            // Simple colorization based on keywords
            if (line.toLowerCase().includes('error') ||
              line.toLowerCase().includes('failed') ||
              line.toLowerCase().includes('fatal')) {
              addTerminalLine('error', line);
            } else if (line.toLowerCase().includes('success') ||
              line.includes('✓') ||
              line.toLowerCase().includes('done')) {
              addTerminalLine('success', line);
            } else {
              addTerminalLine('output', line);
            }
          });
        }
      }

      // Show exit code if command failed
      if (data.exit_code !== 0 && !output) {
        addTerminalLine('error', `Command exited with code ${data.exit_code}`);
      }

    } catch (error: any) {
      addTerminalLine('error', `❌ Network error: ${error.message}`);
      addTerminalLine('error', 'Failed to execute command on server');
    } finally {
      setIsExecuting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentCommand.trim() && !isExecuting) {
      await executeCommand(currentCommand);
      setCurrentCommand('');
      setHistoryIndex(-1);
      // Reset tab completion
      setTabSuggestions([]);
      setTabIndex(-1);
      setOriginalCommand('');
    }
  };

  // Get file list for tab completion
  const getFileList = async (directory?: string): Promise<string[]> => {
    if (!containerId || isExecuting) return [];

    try {
      const targetDir = directory || currentDir;
      const response = await fetch(`${apiBase}/v1/vm/${containerId}/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          command: `cd ${targetDir} && ls -1A 2>/dev/null`,
        }),
      });

      const data = await response.json();
      if (data.success && data.output) {
        return data.output.trim().split('\n').filter(Boolean);
      }
    } catch (error) {
      console.error('Failed to get file list:', error);
    }

    return [];
  };

  // Handle Tab completion
  const handleTabCompletion = async (e: React.KeyboardEvent) => {
    e.preventDefault();

    // Get the last word (what we want to complete)
    const words = currentCommand.split(' ');
    const lastWord = words[words.length - 1] || '';

    // Check if it's a path (contains /)
    const isPath = lastWord.includes('/');

    // If we're starting a new tab sequence
    if (tabSuggestions.length === 0 || originalCommand !== currentCommand) {
      setOriginalCommand(currentCommand);

      let fileList: string[];
      let searchPrefix: string;
      let pathPrefix: string = '';

      if (isPath) {
        // Handle path completion (e.g., /usr/lo<Tab> or ./fold<Tab>)
        const lastSlashIndex = lastWord.lastIndexOf('/');
        pathPrefix = lastWord.substring(0, lastSlashIndex + 1);
        searchPrefix = lastWord.substring(lastSlashIndex + 1);

        // Determine directory to list
        let targetDir: string;
        if (lastWord.startsWith('/')) {
          // Absolute path
          targetDir = pathPrefix || '/';
        } else if (lastWord.startsWith('./')) {
          // Relative path with ./
          targetDir = currentDir + '/' + pathPrefix;
        } else if (lastWord.startsWith('../')) {
          // Relative path with ../
          targetDir = currentDir + '/' + pathPrefix;
        } else {
          // Relative path without ./
          targetDir = currentDir + '/' + pathPrefix;
        }

        fileList = await getFileList(targetDir);
      } else {
        // Simple filename completion in current directory
        searchPrefix = lastWord;
        fileList = await getFileList();
      }

      const matches = fileList.filter(file =>
        file.toLowerCase().startsWith(searchPrefix.toLowerCase())
      ).sort();

      if (matches.length === 0) {
        // No matches - do nothing
        return;
      } else if (matches.length === 1) {
        // Single match - complete it
        const completedWord = pathPrefix + matches[0];
        const completed = [...words.slice(0, -1), completedWord].join(' ');
        setCurrentCommand(completed + ' ');
        setTabSuggestions([]);
        setTabIndex(-1);
      } else {
        // Multiple matches - start cycling
        setTabSuggestions(matches.map(m => pathPrefix + m));
        setTabIndex(0);
        const completedWord = pathPrefix + matches[0];
        const completed = [...words.slice(0, -1), completedWord].join(' ');
        setCurrentCommand(completed);
      }
    } else {
      // Cycle through suggestions
      const nextIndex = (tabIndex + 1) % tabSuggestions.length;
      setTabIndex(nextIndex);
      const words = originalCommand.split(' ');
      const completed = [...words.slice(0, -1), tabSuggestions[nextIndex]].join(' ');
      setCurrentCommand(completed);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    // Tab completion
    if (e.key === 'Tab') {
      await handleTabCompletion(e);
      return;
    }

    // Reset tab completion on any other key
    if (tabSuggestions.length > 0) {
      setTabSuggestions([]);
      setTabIndex(-1);
      setOriginalCommand('');
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#0B1120] relative">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] bg-red-500/5 rounded-full blur-[100px] sm:blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-56 h-56 sm:w-72 sm:h-72 md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] bg-red-800/5 rounded-full blur-[80px] sm:blur-[100px]" />
        <div
            className="absolute inset-0 opacity-10"
            style={{
                backgroundImage: 'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)',
                backgroundSize: '40px 40px',
            }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Button
            onClick={() => navigate('/services')}
            variant="ghost"
            className="text-red-500 hover:text-red-400 transition-colors font-mono text-[10px] uppercase tracking-widest"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Services
          </Button>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          className="text-center mb-24"
          variants={slideUp}
          initial="hidden"
          animate="visible"
        >
          {/* Accent Line */}
          <div className="w-20 h-1 bg-red-600 mx-auto mb-8 rounded-sm" />

          <h1 className="text-5xl lg:text-6xl font-black mb-6 uppercase tracking-tight">
            <span className="text-white">Virtual Machine</span>{' '}
            <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">
              Playground
            </span>
          </h1>

          <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Full root access Debian 13 container with internet connectivity. Install any tool, run exploits,
            practice pentesting - just like TryHackMe. Perfect for learning cybersecurity and Linux administration.
          </p>
        </motion.div>

        {/* VM Status Cards */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-16"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="relative rounded-sm p-6 lg:p-8 text-center border border-white/5 bg-[#0f172a] hover:border-red-500/50 transition-all duration-300 hover:-translate-y-1 group"
            variants={staggerItem}
          >
            <div className="p-3 rounded-sm bg-[#0B1120] border border-white/5 inline-block mb-3 group-hover:border-red-500/30 transition-colors">
              <Server className="w-6 h-6 text-red-500" />
            </div>
            <div className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-500 mb-2">
              Operating System
            </div>
            <div className="text-sm lg:text-base font-bold text-white group-hover:text-red-400 transition-colors">
              {vmOS || 'Debian 13 (Trixie)'}
            </div>
          </motion.div>

          <motion.div
            className="relative rounded-sm p-6 lg:p-8 text-center border border-white/5 bg-[#0f172a] hover:border-red-500/50 transition-all duration-300 hover:-translate-y-1 group"
            variants={staggerItem}
          >
            <div className="p-3 rounded-sm bg-[#0B1120] border border-white/5 inline-block mb-3 group-hover:border-red-500/30 transition-colors">
              <HardDrive className="w-6 h-6 text-red-500" />
            </div>
            <div className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-500 mb-2">
              Resources
            </div>
            <div className="text-sm lg:text-base font-bold text-white group-hover:text-red-400 transition-colors">
              {resources.ram && resources.storage ? `${resources.ram} • ${resources.storage}` : '1GB RAM • 20GB'}
            </div>
          </motion.div>

          <motion.div
            className="relative rounded-sm p-6 lg:p-8 text-center border border-white/5 bg-[#0f172a] hover:border-red-500/50 transition-all duration-300 hover:-translate-y-1 group"
            variants={staggerItem}
          >
            <div className="p-3 rounded-sm bg-[#0B1120] border border-white/5 inline-block mb-3 group-hover:border-red-500/30 transition-colors">
              <Clock className="w-6 h-6 text-red-500" />
            </div>
            <div className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-500 mb-2">
              Time Remaining
            </div>
            <div className={`text-sm lg:text-base font-mono font-bold ${timeRemaining < 600 ? 'text-red-600' : 'text-red-400'}`}>
              {isVMActive ? formatTime(timeRemaining) : '1:00:00'}
            </div>
          </motion.div>

          <motion.div
            className="relative rounded-sm p-6 lg:p-8 text-center border border-white/5 bg-[#0f172a] hover:border-red-500/50 transition-all duration-300 hover:-translate-y-1 group"
            variants={staggerItem}
          >
            <div className="p-3 rounded-sm bg-[#0B1120] border border-white/5 inline-block mb-3 group-hover:border-red-500/30 transition-colors">
              <Shield className="w-6 h-6 text-red-500" />
            </div>
            <div className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-500 mb-2">
              Status
            </div>
            <div className="text-sm lg:text-base font-bold">
              {isVMActive ? (
                <span className="text-green-500">● Running</span>
              ) : (
                <span className="text-slate-500">○ Stopped</span>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Terminal Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="border border-white/10 rounded-sm overflow-hidden bg-[#0a0f18] relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-600" />
            {/* Terminal Header */}
            <div className="bg-[#0f172a] border-b border-white/5 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <Terminal className="text-red-500" size={24} />
                <div>
                  <h3 className="font-bold text-white text-lg uppercase tracking-tight">Debian 13 Root Terminal</h3>
                  <p className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-500 mt-1">
                    {isVMActive ? (
                      <>
                        Container: <span className="font-mono text-red-500">{containerId.substring(0, 12)}</span>
                        {vmPassword && (
                          <>
                            {' • '}
                            <Key size={12} className="inline" />
                            {' '}
                            <span className="font-mono text-red-400">{vmPassword}</span>
                          </>
                        )}
                      </>
                    ) : (
                      vmUsed ? (
                        <span className="text-orange-400">⚠ Session Expired — VPN Required</span>
                      ) : (
                        'Ready to start'
                      )
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 flex-wrap">
                {!isVMActive ? (
                  vmUsed ? (
                    <Button
                      onClick={handleDownloadVpnConfig}
                      variant="primary"
                      leftIcon={<Download size={18} />}
                      className="bg-orange-600 hover:bg-orange-700 text-white rounded-sm font-mono text-xs uppercase tracking-widest transition-all"
                      disabled={isDownloadingVpn}
                    >
                      {isDownloadingVpn ? 'Downloading...' : 'Download VPN Config (.ovpn)'}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleStartVM}
                      variant="primary"
                      leftIcon={<Power size={18} />}
                      className="bg-red-600 hover:bg-red-700 text-white rounded-sm font-mono text-xs uppercase tracking-widest transition-all"
                      disabled={isStarting}
                    >
                      {isStarting ? 'Starting...' : 'Start Virtual Machine'}
                    </Button>
                  )
                ) : (
                  <>
                    {timeRemaining < 600 && (
                      <div className="flex items-center text-red-500 animate-pulse bg-red-500/10 px-3 py-1.5 rounded-sm border border-red-500/20">
                        <AlertCircle size={14} className="mr-2" />
                        <span className="text-[10px] font-mono font-bold tracking-widest uppercase">Low Time!</span>
                      </div>
                    )}
                    <Button
                      onClick={() => handleExtendTime(1)}
                      variant="ghost"
                      size="sm"
                      leftIcon={<Plus size={16} />}
                      className="text-red-500 hover:text-red-400 rounded-sm font-mono text-[10px] uppercase tracking-widest border border-white/5 bg-[#0B1120] transition-colors"
                    >
                      +1 Hour
                    </Button>
                    <Button
                      onClick={handleStopVM}
                      variant="secondary"
                      size="sm"
                      leftIcon={<Power size={16} />}
                      className="bg-red-900 border border-red-500 hover:bg-red-800 text-white rounded-sm font-mono text-[10px] uppercase tracking-widest transition-colors"
                    >
                      Stop VM
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Terminal Body */}
            <div
              ref={terminalContainerRef}
              className="bg-black p-6 font-mono text-sm h-[500px] overflow-hidden"
            >
              {isStarting && (
                <div className="text-slate-300 text-center py-28">
                  <div className="w-10 h-10 border-4 border-red-500/70 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-sm font-mono uppercase tracking-widest text-slate-400">Starting VM...</p>
                </div>
              )}

              {!isVMActive && !isStarting && terminalLines.length === 0 && (
                vmUsed ? (
                  /* ── VPN Required Panel — HTB-style ─────────────────── */
                  <div className="p-5 h-full font-mono text-xs select-text">
                    {/* top bar */}
                    <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/[0.06]">
                      <div className="flex items-center gap-2">
                        <Wifi size={13} className="text-red-500" />
                        <span className="text-[10px] uppercase tracking-widest text-slate-400">OpenVPN · Neverland Access</span>
                      </div>
                      <span className="text-[9px] bg-orange-500/10 border border-orange-500/25 text-orange-400 px-2 py-0.5 rounded-full uppercase tracking-widest">Session Expired</span>
                    </div>

                    {/* status cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
                      {([
                        { label: 'Status',    value: 'DISCONNECTED',      accent: 'text-red-400',    dot: 'bg-red-500' },
                        { label: 'Server',    value: 'NL-VPS-01',         accent: 'text-white',      dot: '' },
                        { label: 'Protocol',  value: 'UDP 1194',           accent: 'text-white',      dot: '' },
                        { label: 'IP Rotate', value: `~${vpnNextRotation}m`, accent: 'text-orange-400', dot: '' },
                      ] as const).map(({ label, value, accent, dot }) => (
                        <div key={label} className="bg-[#070c14] border border-white/[0.06] rounded-sm px-3 py-2">
                          <p className="text-[8px] uppercase tracking-widest text-slate-600 mb-1">{label}</p>
                          <div className="flex items-center gap-1.5">
                            {dot && <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot}`} />}
                            <span className={`font-bold ${accent}`}>{value}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* download */}
                    <button
                      onClick={handleDownloadVpnConfig}
                      disabled={isDownloadingVpn}
                      className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:opacity-50 text-white text-[10px] uppercase tracking-widest rounded-sm transition-colors mb-5"
                    >
                      <Download size={13} />
                      {isDownloadingVpn ? 'Preparing config…' : 'Download  neverland-vpn.ovpn'}
                    </button>
                    <button
                      onClick={() => navigate('/playground/ovpn')}
                      className="w-full flex items-center justify-center gap-1.5 py-1.5 border border-white/[0.06] hover:border-red-500/40 rounded-sm text-[9px] font-mono uppercase tracking-widest text-slate-600 hover:text-red-400 transition-colors"
                    >
                      Open VPN Connect Page →
                    </button>

                    {/* quick-start */}
                    <p className="text-[8px] uppercase tracking-widest text-slate-600 mb-2">— Quick-start</p>
                    <div className="space-y-1.5 mb-4">
                      {[
                        { step: '1', cmd: 'sudo apt install openvpn -y',               note: '# install client' },
                        { step: '2', cmd: 'sudo openvpn --config neverland-vpn.ovpn',  note: '# connect' },
                        { step: '3', cmd: 'curl -s ifconfig.me',                       note: '# verify ip' },
                      ].map(({ step, cmd, note }) => (
                        <div key={step} className="flex items-center gap-2">
                          <span className="w-4 text-[8px] text-slate-600 flex-shrink-0">{step}.</span>
                          <code className="flex-1 text-[10px] text-red-300 bg-red-500/5 border border-red-500/10 px-2 py-1 rounded-sm">
                            {cmd} <span className="text-slate-600">{note}</span>
                          </code>
                        </div>
                      ))}
                    </div>

                    {/* footer */}
                    <div className="pt-3 border-t border-white/[0.05] flex items-center gap-3 text-[8px] uppercase tracking-widest text-slate-700">
                      <span>AES-256-GCM</span><span className="text-slate-800">·</span>
                      <span>SHA-512</span><span className="text-slate-800">·</span>
                      <span>TLS 1.3</span><span className="text-slate-800">·</span>
                      <span>UDP 1194</span>
                    </div>
                  </div>
                ) : (
                  /* ── Default "start VM" placeholder ─────────────────── */
                  <div className="text-slate-500 text-center py-20">
                    <Terminal size={64} className="mx-auto mb-4 opacity-30 text-red-500" />
                    <p className="text-lg mb-2 font-bold uppercase tracking-widest text-white">Virtual Machine Not Running</p>
                    <p className="text-[10px] mb-4 font-mono uppercase tracking-widest">Click "Start Virtual Machine" to begin</p>
                    <div className="text-left max-w-md mx-auto mt-6 text-xs space-y-2 bg-[#0a0f18] p-4 rounded-sm border border-white/5">
                      <p className="text-slate-400 font-bold uppercase tracking-widest mb-3">💡 What you'll get:</p>
                      <p className="text-slate-500">• Full root access Debian 13 (privileged mode)</p>
                      <p className="text-slate-500">• APT ready - repositories configured with HTTPS</p>
                      <p className="text-slate-500">• Internet enabled - curl, wget, ping work</p>
                      <p className="text-slate-500">• Clean slate - install only what you need</p>
                      <p className="text-slate-500 mt-2">• Start with: <code className="text-red-400 font-mono bg-red-500/10 px-1 py-0.5 rounded-sm">apt update && apt install nano vim</code></p>
                      <p className="text-slate-500">• Session: 1 hour (one-time use), fresh container</p>
                    </div>
                  </div>
                )
              )}

              {terminalLines.map((line, index) => (
                <div key={index} className="mb-1 whitespace-pre-wrap break-words">
                  <span className={
                    line.type === 'input' ? 'text-red-400 font-bold' :
                      line.type === 'error' ? 'text-orange-400' :
                        line.type === 'success' ? 'text-green-500' :
                          'text-slate-300'
                  }>
                    {line.content}
                  </span>
                </div>
              ))}

              {isVMActive && (
                <>
                  <form onSubmit={handleSubmit} className="flex items-center mt-2">
                    <span className="text-red-500 mr-2 flex-shrink-0 font-bold">
                      root@{user?.name ? user.name.toLowerCase().replace(/\s+/g, '-') : 'neverland'}:{currentDir === '/root' ? '~' : currentDir}#
                    </span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={currentCommand}
                      onChange={(e) => {
                        setCurrentCommand(e.target.value);
                        // Reset tab completion when user types manually
                        if (tabSuggestions.length > 0) {
                          setTabSuggestions([]);
                          setTabIndex(-1);
                          setOriginalCommand('');
                        }
                      }}
                      onKeyDown={handleKeyDown}
                      disabled={isExecuting}
                      className="flex-1 bg-transparent text-white outline-none border-none font-mono"
                      placeholder={isExecuting ? 'Executing...' : 'Type any Linux command... (Tab to autocomplete)'}
                      autoComplete="off"
                      spellCheck="false"
                    />
                  </form>

                  {/* Tab Completion Suggestions */}
                  {tabSuggestions.length > 1 && (
                    <div className="mt-1 text-[10px] tracking-widest uppercase font-mono ml-2">
                      <span className="text-red-500">⇥</span>
                      <span className="text-slate-500"> {tabSuggestions.length} matches: </span>
                      <span className="text-red-400">{tabSuggestions.slice(0, 5).join('  ')}</span>
                      {tabSuggestions.length > 5 && <span className="text-slate-500"> ...</span>}
                      <span className="text-slate-600"> (Tab to cycle)</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="VM Features"
            title="How It Works"
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* What Happens When You Start */}
            <motion.div
              className="rounded-sm p-8 border border-white/5 bg-[#0f172a]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex p-3 rounded-sm bg-[#0B1120] border border-white/5 mb-4">
                <Power className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-lg font-bold mb-4 text-white uppercase tracking-tight">🚀 What Happens When You Start</h3>
              <ul className="space-y-3 text-slate-400 text-sm font-medium leading-relaxed">
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1 text-xs">■</span>
                  <span>Creates fresh Debian 13 container in privileged mode</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1 text-xs">■</span>
                  <span>Full root access with all Linux capabilities enabled</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1 text-xs">■</span>
                  <span>Internet access enabled (HTTPS with SSL verification)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1 text-xs">■</span>
                  <span>APT repositories configured & ready to use</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1 text-xs">■</span>
                  <span>Clean slate - install only what you need!</span>
                </li>
              </ul>
            </motion.div>

            {/* What You Can Do */}
            <motion.div
              className="rounded-sm p-8 border border-white/5 bg-[#0f172a]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="inline-flex p-3 rounded-sm bg-[#0B1120] border border-white/5 mb-4">
                <Terminal className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-lg font-bold mb-4 text-white uppercase tracking-tight">💻 What You Can Do (Full Root)</h3>
              <ul className="space-y-3 text-slate-400 text-sm font-medium leading-relaxed">
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1 text-xs">■</span>
                  <span>Run ANY Linux command with full root privileges</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1 text-xs">■</span>
                  <span><code className="text-red-400 font-mono text-[10px] uppercase tracking-widest bg-red-500/10 px-1 py-0.5 rounded-sm">apt update && apt install</code> works immediately!</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1 text-xs">■</span>
                  <span>Install ANY tool you need (nano, nmap, python, gcc, etc.)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1 text-xs">■</span>
                  <span>Internet access: curl, wget, ping external sites</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1 text-xs">■</span>
                  <span>Compile & run programs (Python, C/C++, Go, etc.)</span>
                </li>
              </ul>
            </motion.div>

            {/* Security & Cleanup */}
            <motion.div
              className="rounded-sm p-8 border border-white/5 bg-[#0f172a]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-flex p-3 rounded-sm bg-[#0B1120] border border-white/5 mb-4">
                <Shield className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-lg font-bold mb-4 text-white uppercase tracking-tight">🔒 Security & Isolation</h3>
              <ul className="space-y-3 text-slate-400 text-sm font-medium leading-relaxed">
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1 text-xs">■</span>
                  <span>Full root access inside container (privileged mode)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1 text-xs">■</span>
                  <span>Internet enabled but isolated from host system</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1 text-xs">■</span>
                  <span>Resource limits: 1GB RAM, 1 CPU core</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1 text-xs">■</span>
                  <span>Auto-deleted when session expires (1 hour, one-time use)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1 text-xs">■</span>
                  <span>Fresh container every session - nothing persists</span>
                </li>
              </ul>
            </motion.div>

            {/* Quick Commands */}
            <motion.div
              className="rounded-sm p-8 border border-white/5 bg-[#0f172a]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="inline-flex p-3 rounded-sm bg-[#0B1120] border border-white/5 mb-4">
                <Code className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-lg font-bold mb-4 text-white uppercase tracking-tight">⚡ Quick Start Commands</h3>
              <ul className="space-y-3 text-slate-400 text-sm font-medium leading-relaxed">
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1 text-xs">■</span>
                  <span><code className="text-red-400 font-mono text-[10px] uppercase tracking-widest bg-red-500/10 px-1 py-0.5 rounded-sm">apt update</code> - Update package lists</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1 text-xs">■</span>
                  <span><code className="text-red-400 font-mono text-[10px] uppercase tracking-widest bg-red-500/10 px-1 py-0.5 rounded-sm">apt install nano vim curl wget git</code></span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1 text-xs">■</span>
                  <span><code className="text-red-400 font-mono text-[10px] uppercase tracking-widest bg-red-500/10 px-1 py-0.5 rounded-sm">apt install python3-pip nmap</code></span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1 text-xs">■</span>
                  <span><code className="text-red-400 font-mono text-[10px] uppercase tracking-widest bg-red-500/10 px-1 py-0.5 rounded-sm">curl ifconfig.me</code> - Check your public IP</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1 text-xs">■</span>
                  <span><code className="text-red-400 font-mono text-[10px] uppercase tracking-widest bg-red-500/10 px-1 py-0.5 rounded-sm">ping google.com</code> - Test connectivity</span>
                </li>
              </ul>
            </motion.div>

            {/* OpenVPN Access — HTB-style */}
            <motion.div
              className="rounded-sm border border-white/10 bg-[#0f172a] md:col-span-2 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              {/* card header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] bg-[#0a0f18]">
                <div className="flex items-center gap-3">
                  <div className="inline-flex p-1.5 rounded-sm bg-red-500/10 border border-red-500/20">
                    <Wifi className="w-4 h-4 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-tight">OpenVPN Access</h3>
                    <p className="text-[9px] text-slate-500 uppercase tracking-widest font-mono">Direct VPS connection after session expires</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-[9px] font-mono uppercase tracking-widest text-red-400">Disconnected</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* left: specs + download */}
                  <div className="flex-1">
                    <div className="grid grid-cols-3 gap-2 mb-3 font-mono text-xs">
                      {[
                        { label: 'Server',    value: 'NL-VPS-01',         accent: 'text-white' },
                        { label: 'Protocol',  value: 'UDP 1194',           accent: 'text-white' },
                        { label: 'IP Rotate', value: `~${vpnNextRotation}m`, accent: 'text-orange-400' },
                      ].map(item => (
                        <div key={item.label} className="bg-[#0B1120] border border-white/5 rounded-sm px-3 py-2">
                          <p className="text-[8px] uppercase tracking-widest text-slate-600 mb-1">{item.label}</p>
                          <p className={`font-bold ${item.accent}`}>{item.value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 font-mono text-xs">
                      {[
                        { label: 'Cipher',   value: 'AES-256-GCM' },
                        { label: 'Auth',     value: 'SHA-512' },
                        { label: 'TLS',      value: '1.3 min' },
                        { label: 'Compress', value: 'lz4-v2' },
                      ].map(item => (
                        <div key={item.label} className="bg-[#0B1120] border border-white/5 rounded-sm px-3 py-2">
                          <p className="text-[8px] uppercase tracking-widest text-slate-600 mb-0.5">{item.label}</p>
                          <p className="font-bold text-red-400">{item.value}</p>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={handleDownloadVpnConfig}
                      disabled={isDownloadingVpn}
                      className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-mono text-xs uppercase tracking-widest rounded-sm transition-colors"
                    >
                      <Download size={14} />
                      {isDownloadingVpn ? 'Preparing…' : 'Download neverland-vpn.ovpn'}
                    </button>
                  </div>

                  {/* right: connection steps */}
                  <div className="flex-1 font-mono text-xs">
                    <p className="text-[8px] uppercase tracking-widest text-slate-600 mb-3">— Connection Steps</p>
                    <div className="space-y-2">
                      {[
                        { n: '01', cmd: 'sudo apt install openvpn -y',               note: '# install client' },
                        { n: '02', cmd: 'sudo openvpn --config neverland-vpn.ovpn',  note: '# connect' },
                        { n: '03', cmd: 'curl -s ifconfig.me',                       note: '# check vpn ip' },
                        { n: '04', cmd: 'ping 10.10.0.1',                            note: '# test gateway' },
                      ].map(({ n, cmd, note }) => (
                        <div key={n} className="flex items-start gap-2">
                          <span className="text-slate-700 text-[9px] pt-1.5 w-5 flex-shrink-0">{n}</span>
                          <div className="flex-1 bg-black/40 border border-white/[0.04] rounded-sm px-3 py-1.5">
                            <span className="text-red-400">{cmd}</span>
                            <span className="text-slate-600 ml-2">{note}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
};

export default PlaygroundVM;
