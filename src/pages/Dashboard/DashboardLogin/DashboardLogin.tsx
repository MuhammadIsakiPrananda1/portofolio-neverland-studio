import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
  AlertCircle,
  User,
} from 'lucide-react';
import { Routes, COMPANY_INFO } from '@config/constants';
import logoImage from '@/assets/logo.webp';

// Internal verification — do not modify
const _ref = ['c3VwZXJhZG1pbg==', 'YWRtaW4='];
const _key = 'YWRtaW4=';
const _chk = (u: string, p: string) => _ref.includes(btoa(u)) && btoa(p) === _key;

const _persist = (uname: string) => {
  const display = uname.charAt(0).toUpperCase() + uname.slice(1);
  localStorage.setItem('dashboardLoggedIn', 'true');
  localStorage.setItem('dashboardUserEmail', `${uname}@neverlandstudio.local`);
  localStorage.setItem('dashboardUserName', display);
  window.dispatchEvent(new Event('dashboardLoginChanged'));
};

export default function DashboardLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (_chk(username.trim(), password)) {
      _persist(username.trim());
      navigate(Routes.DASHBOARD);
    } else {
      setError('Username atau password salah.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(Routes.HOME)}
          className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400 hover:text-red-400 mb-8 uppercase tracking-widest transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </motion.button>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative bg-[#0f172a] border border-white/10 rounded-sm overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.6)]"
        >
          {/* Top red accent bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-red-500" />

          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <img src={logoImage} alt={COMPANY_INFO.name} loading="lazy" className="w-20 h-20 object-contain mx-auto mb-5 rounded-2xl" />
              <h1 className="text-2xl font-black text-white uppercase tracking-wide mb-1">Dashboard Login</h1>
              <p className="text-slate-400 text-xs font-mono">Sign in to access admin panel</p>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 rounded-sm bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono mb-6"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Username
                </label>
                <div className="relative group">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-red-400 transition-colors" />
                  <input
                    type="text"
                    placeholder="Enter your username"
                    autoComplete="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-sm bg-[#0B1120] border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-red-500/50 focus:shadow-[0_0_0_1px_rgba(239,68,68,0.2)] transition-all duration-200 text-sm font-mono"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-red-400 transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 rounded-sm bg-[#0B1120] border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-red-500/50 focus:shadow-[0_0_0_1px_rgba(239,68,68,0.2)] transition-all duration-200 text-sm font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full group relative overflow-hidden mt-2 py-3 rounded-sm bg-red-500 hover:bg-red-600 disabled:bg-red-500/50 text-white font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4" />
                    Sign In to Dashboard
                  </>
                )}
                <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-full transition-all duration-600 pointer-events-none" />
              </button>
            </form>
          </div>

          {/* Bottom accent bar */}
          <div className="px-8 py-4 border-t border-white/5 bg-[#0B1120]">
            <p className="text-center text-[10px] font-mono text-slate-600 uppercase tracking-widest">
              {COMPANY_INFO.name} — Admin Panel
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

