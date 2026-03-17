import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, RefreshCw, Wifi } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '@components/organisms/AuthModal';

interface VpnInfo {
  current_ip: string;
  port: number;
  protocol: string;
  encryption: string;
  auth: string;
  tls_version: string;
  next_rotation_at: string;
  next_rotation_minutes: number;
}

const SERVERS = [
  { id: 'nl-vps-01', label: 'NL-VPS-01', region: 'Netherlands', flag: '🇳🇱', type: 'Free' },
];

const PROTOCOLS = [
  { id: 'udp', label: 'UDP 1194', desc: 'Faster, recommended' },
  { id: 'tcp', label: 'TCP 443', desc: 'Bypass firewalls' },
];

const PlaygroundOVPN = () => {
  const { user } = useAuth();
  const [vpnInfo, setVpnInfo]         = useState<VpnInfo | null>(null);
  const [isLoading, setIsLoading]     = useState(true);
  const [selectedServer, setSelectedServer] = useState('nl-vps-01');
  const [selectedProto, setSelectedProto]   = useState('udp');
  const [isDownloading, setIsDownloading]   = useState(false);
  const [showAuthModal, setShowAuthModal]   = useState(false);
  const [countdown, setCountdown]     = useState(0);

  const apiBase = import.meta.env.VITE_API_URL || '/api';

  const fetchVpnInfo = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${apiBase}/v1/vm/vpn-config`);
      if (res.ok) {
        const data = await res.json();
        setVpnInfo(data);
        setCountdown(data.next_rotation_minutes);
      }
    } catch {
      // silently fallback
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVpnInfo();
  }, []);

  // Countdown tick
  useEffect(() => {
    if (!vpnInfo) return;
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) { fetchVpnInfo(); return 0; }
        return prev - 1;
      });
    }, 60000);
    return () => clearInterval(timer);
  }, [vpnInfo]);

  const handleDownload = () => {
    if (!user) { setShowAuthModal(true); return; }
    setIsDownloading(true);
    const a = document.createElement('a');
    a.href = `${apiBase}/v1/vm/vpn-config/download`;
    a.download = 'neverland-vpn.ovpn';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => setIsDownloading(false), 1500);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#0B1120] relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-800/5 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(rgba(239,68,68,0.15) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Header ─────────────────────────────────────────────── */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[9px] font-mono uppercase tracking-widest text-red-500 border border-red-500/30 bg-red-500/10 px-2 py-0.5 rounded-full">
              OpenVPN
            </span>
            <span className="text-slate-700 text-xs">·</span>
            <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500">
              Neverland Access
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-2">
            VPN<span className="text-red-500">.</span>Connect
          </h1>
          <p className="text-slate-400 text-sm max-w-lg leading-relaxed">
            Download your personal OpenVPN config to connect directly to the Neverland VPS.
            IP rotates every hour for enhanced privacy.
          </p>
        </motion.div>

        {/* ── Main Grid ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

          {/* Left: config + download */}
          <motion.div
            className="lg:col-span-3 border border-white/10 rounded-sm bg-[#0f172a] overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {/* panel header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06] bg-[#0a0f18]">
              <div className="flex items-center gap-2">
                <Wifi size={13} className="text-red-500" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                  Access Configuration
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span className="text-[9px] font-mono uppercase tracking-widest text-red-400">Disconnected</span>
              </div>
            </div>

            <div className="p-5 space-y-5">
              {/* Server selection */}
              <div>
                <p className="text-[9px] uppercase tracking-widest text-slate-600 mb-2 font-mono">— Select Server</p>
                <div className="space-y-2">
                  {SERVERS.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedServer(s.id)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-sm border text-xs font-mono transition-colors ${
                        selectedServer === s.id
                          ? 'border-red-500/50 bg-red-500/10 text-white'
                          : 'border-white/[0.06] bg-[#0B1120] text-slate-400 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span>{s.flag}</span>
                        <span className="font-bold">{s.label}</span>
                        <span className="text-slate-600 text-[9px]">{s.region}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                          {s.type}
                        </span>
                        {selectedServer === s.id && (
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Protocol selection */}
              <div>
                <p className="text-[9px] uppercase tracking-widest text-slate-600 mb-2 font-mono">— Protocol</p>
                <div className="grid grid-cols-2 gap-2">
                  {PROTOCOLS.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProto(p.id)}
                      className={`flex flex-col px-4 py-2.5 rounded-sm border text-xs font-mono text-left transition-colors ${
                        selectedProto === p.id
                          ? 'border-red-500/50 bg-red-500/10 text-white'
                          : 'border-white/[0.06] bg-[#0B1120] text-slate-400 hover:border-white/20'
                      }`}
                    >
                      <span className="font-bold">{p.label}</span>
                      <span className="text-[9px] text-slate-600 mt-0.5">{p.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Download button */}
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:opacity-50 text-white font-mono text-xs uppercase tracking-widest rounded-sm transition-colors"
              >
                <Download size={14} />
                {isDownloading ? 'Preparing config…' : 'Download neverland-vpn.ovpn'}
              </button>

              <p className="text-[9px] text-slate-700 font-mono text-center uppercase tracking-widest">
                Config is personalized · Do not share
              </p>
            </div>
          </motion.div>

          {/* Right: info + steps */}
          <div className="lg:col-span-2 flex flex-col gap-4">

            {/* VPN info card */}
            <motion.div
              className="border border-white/10 rounded-sm bg-[#0f172a] overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="px-5 py-3.5 border-b border-white/[0.06] bg-[#0a0f18]">
                <p className="text-[9px] font-mono uppercase tracking-widest text-slate-500">Connection Info</p>
              </div>
              <div className="p-4 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-widest text-slate-600">VPN IP</span>
                  <span className="font-bold text-white">
                    {isLoading ? '—.—.—.—' : (vpnInfo?.current_ip ?? '—')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-widest text-slate-600">Protocol</span>
                  <span className="font-bold text-white">
                    {vpnInfo?.protocol ?? 'UDP'} {vpnInfo?.port ?? 1194}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-widest text-slate-600">IP Rotates in</span>
                  <span className="font-bold text-orange-400">
                    ~{countdown || vpnInfo?.next_rotation_minutes || '?'}m
                  </span>
                </div>

                <div className="h-px bg-white/[0.04]" />

                {[
                  { k: 'Cipher', v: vpnInfo?.encryption ?? 'AES-256-GCM' },
                  { k: 'Auth',   v: vpnInfo?.auth       ?? 'SHA-512'      },
                  { k: 'TLS',    v: `${vpnInfo?.tls_version ?? '1.3'} min` },
                ].map(({ k, v }) => (
                  <div key={k} className="flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-widest text-slate-600">{k}</span>
                    <span className="font-bold text-red-400 text-[10px]">{v}</span>
                  </div>
                ))}

                <button
                  onClick={fetchVpnInfo}
                  className="w-full flex items-center justify-center gap-1.5 py-1.5 border border-white/[0.06] hover:border-white/20 rounded-sm text-[9px] uppercase tracking-widest text-slate-600 hover:text-slate-400 transition-colors"
                >
                  <RefreshCw size={10} className={isLoading ? 'animate-spin' : ''} />
                  Refresh
                </button>
              </div>
            </motion.div>

            {/* Quick-start card */}
            <motion.div
              className="border border-white/10 rounded-sm bg-[#0f172a] overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="px-5 py-3.5 border-b border-white/[0.06] bg-[#0a0f18]">
                <p className="text-[9px] font-mono uppercase tracking-widest text-slate-500">Quick-Start</p>
              </div>
              <div className="p-4">
                <div className="space-y-2 font-mono text-[10px]">
                  {[
                    { n: '01', cmd: 'sudo apt install openvpn -y',               note: '# install' },
                    { n: '02', cmd: 'sudo openvpn --config neverland-vpn.ovpn',  note: '# connect' },
                    { n: '03', cmd: 'curl -s ifconfig.me',                       note: '# verify ip' },
                    { n: '04', cmd: 'ping 10.10.0.1',                            note: '# test gw' },
                  ].map(({ n, cmd, note }) => (
                    <div key={n} className="flex items-start gap-2">
                      <span className="text-slate-700 pt-1.5 w-5 flex-shrink-0">{n}</span>
                      <div className="flex-1 bg-black/40 border border-white/[0.04] rounded-sm px-3 py-1.5">
                        <span className="text-red-400">{cmd}</span>
                        <span className="text-slate-700 ml-2">{note}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ── Bottom spec bar ─────────────────────────────────────── */}
        <motion.div
          className="mt-4 border border-white/[0.06] rounded-sm bg-[#0a0f18] px-5 py-3 flex flex-wrap items-center gap-x-6 gap-y-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {[
            { label: 'Encryption', value: 'AES-256-GCM' },
            { label: 'HMAC Auth',  value: 'SHA-512'      },
            { label: 'TLS',        value: '1.3 minimum'  },
            { label: 'Protocol',   value: 'UDP 1194'     },
            { label: 'IP Rotate',  value: 'Every hour'   },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center gap-2 font-mono text-[9px]">
              <span className="uppercase tracking-widest text-slate-600">{label}</span>
              <span className="text-white/40">·</span>
              <span className="uppercase tracking-widest text-red-400">{value}</span>
            </div>
          ))}
        </motion.div>

      </div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};

export default PlaygroundOVPN;
