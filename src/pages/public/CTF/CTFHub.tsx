import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flag, Shield, Lock, Binary, FileCode,
  Network, Trophy, CheckCircle, XCircle,
  Search, Filter, X, Loader2, Send, Eye, EyeOff,
  ChevronRight, Target, AlertTriangle,
  Globe, Terminal, Database, Cpu
} from 'lucide-react';
import { challengeService, Challenge, ChallengeDetail, ScoreboardEntry } from '@/services/challenge.service';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Routes } from '@config/constants';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const CATEGORIES: Array<{ id: string; label: string; icon: React.ElementType; color: string }> = [
  { id: 'all',      label: 'All',       icon: Flag,    color: 'text-white' },
  { id: 'web',      label: 'Web',       icon: Globe,   color: 'text-blue-400' },
  { id: 'crypto',   label: 'Crypto',    icon: Lock,    color: 'text-purple-400' },
  { id: 'binary',   label: 'Binary',    icon: Cpu,     color: 'text-orange-400' },
  { id: 'forensics',label: 'Forensics', icon: FileCode, color: 'text-green-400' },
  { id: 'reverse',  label: 'Reverse',   icon: Binary,  color: 'text-yellow-400' },
  { id: 'network',  label: 'Network',   icon: Network, color: 'text-cyan-400' },
  { id: 'misc',     label: 'Misc',      icon: Terminal,color: 'text-pink-400' },
];

const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard', 'Expert'] as const;

const DIFF_COLORS: Record<string, string> = {
  Easy:   'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  Medium: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  Hard:   'bg-orange-500/15 text-orange-400 border-orange-500/30',
  Expert: 'bg-red-500/15 text-red-400 border-red-500/30',
};

const CAT_COLORS: Record<string, string> = {
  web:      'bg-blue-500/15 text-blue-400 border-blue-500/30',
  crypto:   'bg-purple-500/15 text-purple-400 border-purple-500/30',
  binary:   'bg-orange-500/15 text-orange-400 border-orange-500/30',
  forensics:'bg-green-500/15 text-green-400 border-green-500/30',
  reverse:  'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  network:  'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  misc:     'bg-pink-500/15 text-pink-400 border-pink-500/30',
};

function getCatIcon(cat: string) {
  return CATEGORIES.find(c => c.id === cat)?.icon ?? Flag;
}

// ─── Challenge Modal ───────────────────────────────────────────────────────────

interface ChallengeModalProps {
  challenge: Challenge;
  onClose: () => void;
  onSolved: (id: number) => void;
}

function ChallengeModal({ challenge, onClose, onSolved }: ChallengeModalProps) {
  const { isAuthenticated } = useAuth();
  const [detail, setDetail] = useState<ChallengeDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(true);
  const [flag, setFlag] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ type: 'correct' | 'incorrect' | 'already_solved' | 'error' | null; message: string }>({ type: null, message: '' });
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setLoadingDetail(true);
    challengeService.getChallenge(challenge.id)
      .then(res => setDetail(res.data))
      .catch(() => setDetail(null))
      .finally(() => setLoadingDetail(false));
  }, [challenge.id]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!flag.trim() || submitting) return;
    setSubmitting(true);
    setResult({ type: null, message: '' });

    const res = await challengeService.submitFlag(challenge.id, flag.trim());
    setResult({ type: res.status as any, message: res.message });

    if (res.status === 'correct') {
      onSolved(challenge.id);
      setTimeout(onClose, 2000);
    }
    setSubmitting(false);
  }, [flag, submitting, challenge.id, onSolved, onClose]);

  const CatIcon = getCatIcon(challenge.category);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-2xl bg-[#0B1120] border border-white/10 rounded-sm shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top border accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-red-500" />

        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4">
          <div className="flex items-start gap-4">
            <div className={`p-2.5 rounded-sm border ${CAT_COLORS[challenge.category] ?? 'bg-white/10 text-white border-white/20'}`}>
              <CatIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm border ${CAT_COLORS[challenge.category] ?? 'bg-white/10 text-white border-white/20'}`}>
                  {challenge.category}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm border ${DIFF_COLORS[challenge.difficulty] ?? ''}`}>
                  {challenge.difficulty}
                </span>
                {challenge.solved && (
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm border bg-emerald-500/15 text-emerald-400 border-emerald-500/30">
                    ✓ Solved
                  </span>
                )}
              </div>
              <h2 className="text-xl font-black text-white uppercase tracking-tight">{challenge.title}</h2>
              <div className="flex items-center gap-4 mt-1 text-xs text-slate-400 font-mono">
                <span className="text-red-400 font-bold">{challenge.points} pts</span>
                <span>{challenge.solve_count} solve{challenge.solve_count !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-sm text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 pb-6 space-y-5">
          {/* Description */}
          {loadingDetail ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 text-red-500 animate-spin" />
            </div>
          ) : (
            <div className="relative bg-[#050c1a] border border-white/5 rounded-sm p-4">
              <div className="absolute top-0 left-0 w-0.5 h-full bg-red-500/60 rounded-sm" />
              <p className="text-slate-300 text-sm leading-relaxed pl-3">
                {detail?.description ?? challenge.description}
              </p>
            </div>
          )}

          {/* Hint */}
          {detail?.hints && (
            <div>
              <button
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors uppercase tracking-wider"
              >
                {showHint ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>
              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 bg-amber-500/5 border border-amber-500/20 rounded-sm p-3">
                      <p className="text-amber-300/80 text-xs font-mono leading-relaxed">{detail.hints}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Guest notice */}
          {!isAuthenticated && (
            <div className="flex items-start gap-2 bg-blue-500/10 border border-blue-500/20 rounded-sm p-3">
              <AlertTriangle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <p className="text-blue-300 text-xs">
                You're in guest mode. Flag verification works but progress won't be saved.{' '}
                <Link to="/dashboard/login" className="underline font-bold hover:text-blue-200">Login to earn points.</Link>
              </p>
            </div>
          )}

          {/* Flag submission */}
          {!challenge.solved ? (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <Flag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={flag}
                  onChange={e => setFlag(e.target.value)}
                  placeholder="flag{...}"
                  className="w-full bg-[#050c1a] border border-white/10 focus:border-red-500/50 rounded-sm pl-10 pr-4 py-3 text-white font-mono text-sm outline-none transition-colors placeholder:text-slate-600"
                  autoFocus
                />
              </div>

              {/* Result feedback */}
              <AnimatePresence>
                {result.type && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex items-center gap-2 rounded-sm px-3 py-2.5 text-sm font-medium border ${
                      result.type === 'correct' || result.type === 'already_solved'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
                        : 'bg-red-500/10 text-red-400 border-red-500/25'
                    }`}
                  >
                    {result.type === 'correct' || result.type === 'already_solved'
                      ? <CheckCircle className="w-4 h-4 shrink-0" />
                      : <XCircle className="w-4 h-4 shrink-0" />
                    }
                    {result.message}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={submitting || !flag.trim()}
                className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold uppercase tracking-wide text-sm py-3 rounded-sm transition-colors"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {submitting ? 'Checking...' : 'Submit Flag'}
              </button>
            </form>
          ) : (
            <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/25 rounded-sm px-4 py-4">
              <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <p className="text-emerald-400 font-bold text-sm">Challenge Solved!</p>
                <p className="text-emerald-400/70 text-xs">You already solved this one. Great work!</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Challenge Card ────────────────────────────────────────────────────────────

interface ChallengeCardProps {
  challenge: Challenge;
  onClick: () => void;
}

function ChallengeCard({ challenge, onClick }: ChallengeCardProps) {
  const CatIcon = getCatIcon(challenge.category);
  const catStyle = CAT_COLORS[challenge.category] ?? 'bg-white/10 text-white border-white/20';
  const diffStyle = DIFF_COLORS[challenge.difficulty] ?? '';

  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -3 }}
      onClick={onClick}
      className={`relative w-full text-left rounded-sm border transition-all duration-300 group overflow-hidden ${
        challenge.solved
          ? 'bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500/60'
          : 'bg-[#0f172a] border-white/5 hover:border-red-500/40'
      }`}
    >
      {/* Solved glow top line */}
      {challenge.solved && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-emerald-500" />
      )}

      <div className="p-5">
        {/* Badges row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap gap-1.5">
            <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm border ${catStyle}`}>
              <CatIcon className="w-2.5 h-2.5" />
              {challenge.category}
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm border ${diffStyle}`}>
              {challenge.difficulty}
            </span>
          </div>
          {challenge.solved && (
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          )}
        </div>

        {/* Title */}
        <h3 className={`font-bold text-sm uppercase tracking-tight mb-3 transition-colors ${
          challenge.solved ? 'text-emerald-300 group-hover:text-emerald-200' : 'text-white group-hover:text-red-300'
        }`}>
          {challenge.title}
        </h3>

        {/* Stats footer */}
        <div className="flex items-center justify-between">
          <span className={`font-mono font-black text-base ${challenge.solved ? 'text-emerald-400' : 'text-red-400'}`}>
            {challenge.points} <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">pts</span>
          </span>
          <span className="text-[10px] text-slate-500 font-mono">
            {challenge.solve_count} solve{challenge.solve_count !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Hover arrow */}
      <div className="absolute right-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronRight className="w-4 h-4 text-red-400" />
      </div>
    </motion.button>
  );
}

// ─── Leaderboard ──────────────────────────────────────────────────────────────

function Leaderboard() {
  const [entries, setEntries] = useState<ScoreboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    challengeService.getScoreboard(10)
      .then(res => setEntries(res.data ?? []))
      .catch(() => setEntries([]))
      .finally(() => setLoading(false));
  }, []);

  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="bg-[#0f172a] border border-white/5 rounded-sm overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
        <Trophy className="w-4 h-4 text-amber-400" />
        <span className="text-sm font-bold text-white uppercase tracking-widest">Leaderboard</span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-5 h-5 text-red-500 animate-spin" />
        </div>
      ) : entries.length === 0 ? (
        <div className="text-center py-10 text-slate-500 text-sm">No participants yet. Be the first!</div>
      ) : (
        <div className="divide-y divide-white/5">
          {entries.map((entry) => (
            <div key={entry.user_id} className="flex items-center gap-3 px-5 py-3 hover:bg-white/3 transition-colors">
              <span className="w-7 text-center text-sm font-mono">
                {entry.rank <= 3 ? medals[entry.rank - 1] : `#${entry.rank}`}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">{entry.username}</p>
                <p className="text-[10px] text-slate-500">{entry.solved} solved</p>
              </div>
              <span className="text-sm font-black font-mono text-amber-400">{entry.score.toLocaleString()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CTFHub() {
  const { isAuthenticated, user } = useAuth();

  // Data
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI state
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDiff, setSelectedDiff] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);

  // Fetch challenges
  useEffect(() => {
    setLoading(true);
    setError(null);
    challengeService.getChallenges()
      .then(res => setChallenges(res.data ?? []))
      .catch(() => setError('Failed to load challenges. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  // Mark challenge as solved in local state (optimistic update)
  const handleSolved = useCallback((id: number) => {
    setChallenges(prev => prev.map(c => c.id === id ? { ...c, solved: true } : c));
  }, []);

  // Filter challenges (immutable — never modifies original array)
  const filtered = useMemo(() => {
    return challenges.filter(c => {
      const catOk = selectedCategory === 'all' || c.category === selectedCategory;
      const diffOk = selectedDiff === 'All' || c.difficulty === selectedDiff;
      const searchOk = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase());
      return catOk && diffOk && searchOk;
    });
  }, [challenges, selectedCategory, selectedDiff, search]);

  // Stats
  const totalSolved = useMemo(() => challenges.filter(c => c.solved).length, [challenges]);
  const totalChallenges = challenges.length;

  return (
    <div className="min-h-screen bg-[#0B1120] pt-28 pb-20">
      <div className="container-custom max-w-7xl mx-auto px-4">

        {/* ─── Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-[2px] bg-red-500" />
                <span className="text-xs font-bold text-red-400 uppercase tracking-[0.2em]">CTF Platform</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-3">
                CTF <span className="text-red-500">Hub</span>
              </h1>
              <p className="text-slate-400 font-medium max-w-xl">
                Solve security challenges, earn points, and climb the leaderboard. 
                All {totalChallenges} challenges are live and ready to be conquered.
              </p>
            </div>

            {/* Quick stats */}
            <div className="flex gap-3">
              {[
                { label: 'Challenges', value: totalChallenges, icon: Target, color: 'text-red-400' },
                { label: 'Solved', value: totalSolved, icon: CheckCircle, color: 'text-emerald-400' },
                { label: 'Remaining', value: totalChallenges - totalSolved, icon: Flag, color: 'text-amber-400' },
              ].map(s => (
                <div key={s.label} className="bg-[#0f172a] border border-white/5 rounded-sm px-4 py-3 text-center min-w-[90px]">
                  <s.icon className={`w-4 h-4 ${s.color} mx-auto mb-1`} />
                  <div className={`text-xl font-black font-mono ${s.color}`}>{s.value}</div>
                  <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Auth notice */}
          {!isAuthenticated && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 flex items-center gap-3 bg-blue-500/10 border border-blue-500/20 rounded-sm px-4 py-3"
            >
              <Shield className="w-4 h-4 text-blue-400 shrink-0" />
              <p className="text-blue-300 text-sm">
                You're browsing as a guest. You can attempt challenges but progress won't be saved.{' '}
                <Link to="/dashboard/login" className="font-bold underline hover:text-blue-200">Login to earn points →</Link>
              </p>
            </motion.div>
          )}

          {isAuthenticated && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-sm px-4 py-3"
            >
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <p className="text-emerald-300 text-sm font-medium">
                Logged in as <span className="font-bold">{user?.name}</span>. 
                Solved challenges and points are being tracked!
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* ─── Main Layout: Challenges + Sidebar ─── */}
        <div className="flex gap-6 flex-col xl:flex-row">

          {/* Left: Challenges */}
          <div className="flex-1 min-w-0">

            {/* Filter Bar */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#0f172a] border border-white/5 rounded-sm p-4 mb-5 space-y-4"
            >
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search challenges..."
                  className="w-full bg-[#050c1a] border border-white/10 focus:border-red-500/40 rounded-sm pl-10 pr-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-slate-600"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                    <X className="w-3.5 h-3.5 text-slate-500 hover:text-white transition-colors" />
                  </button>
                )}
              </div>

              {/* Category tabs */}
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => {
                  const count = cat.id === 'all' ? challenges.length : challenges.filter(c => c.category === cat.id).length;
                  if (count === 0 && cat.id !== 'all') return null;
                  const CatIcon = cat.icon;
                  const active = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm border transition-all ${
                        active
                          ? 'bg-red-600 border-red-600 text-white'
                          : 'border-white/10 text-slate-400 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      <CatIcon className="w-3 h-3" />
                      {cat.label}
                      <span className={`font-mono text-[10px] ${active ? 'text-red-200' : 'text-slate-600'}`}>{count}</span>
                    </button>
                  );
                })}
              </div>

              {/* Difficulty chips */}
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold self-center">Difficulty:</span>
                {DIFFICULTIES.map(d => (
                  <button
                    key={d}
                    onClick={() => setSelectedDiff(d)}
                    className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm border transition-all ${
                      selectedDiff === d
                        ? (DIFF_COLORS[d] ?? 'bg-red-600 border-red-600 text-white')
                        : 'border-white/10 text-slate-500 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Results count */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-slate-500 font-mono">
                {filtered.length} challenge{filtered.length !== 1 ? 's' : ''} 
                {(selectedCategory !== 'all' || selectedDiff !== 'All' || search) ? ' (filtered)' : ''}
              </p>
              {totalSolved > 0 && (
                <p className="text-xs text-emerald-400 font-mono font-bold">
                  {totalSolved}/{totalChallenges} solved
                </p>
              )}
            </div>

            {/* Challenge Grid */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
                <p className="text-slate-400 text-sm font-mono">Loading challenges...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <XCircle className="w-10 h-10 text-red-500" />
                <p className="text-red-400 text-sm">{error}</p>
                <button
                  onClick={() => { setLoading(true); challengeService.getChallenges().then(r => setChallenges(r.data ?? [])).catch(() => setError('Failed.')).finally(() => setLoading(false)); }}
                  className="text-xs font-bold text-slate-400 hover:text-white underline"
                >
                  Try again
                </button>
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <Filter className="w-10 h-10 text-slate-600" />
                <p className="text-slate-500 text-sm">No challenges match your filters.</p>
                <button
                  onClick={() => { setSelectedCategory('all'); setSelectedDiff('All'); setSearch(''); }}
                  className="text-xs font-bold text-red-400 hover:text-red-300 underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                >
                  {filtered.map(ch => (
                    <ChallengeCard
                      key={ch.id}
                      challenge={ch}
                      onClick={() => setActiveChallenge(ch)}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="xl:w-72 shrink-0 space-y-5">
            {/* Category breakdown */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#0f172a] border border-white/5 rounded-sm overflow-hidden"
            >
              <div className="flex items-center gap-2 px-5 py-4 border-b border-white/5">
                <Database className="w-4 h-4 text-red-400" />
                <span className="text-sm font-bold text-white uppercase tracking-widest">Categories</span>
              </div>
              <div className="p-3 space-y-1.5">
                {CATEGORIES.filter(c => c.id !== 'all').map(cat => {
                  const total = challenges.filter(c => c.category === cat.id).length;
                  const solved = challenges.filter(c => c.category === cat.id && c.solved).length;
                  if (total === 0) return null;
                  const CatIcon = cat.icon;
                  const pct = total > 0 ? (solved / total) * 100 : 0;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(selectedCategory === cat.id ? 'all' : cat.id)}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-sm hover:bg-white/5 transition-colors group"
                    >
                      <CatIcon className={`w-3.5 h-3.5 ${cat.color} shrink-0`} />
                      <span className="flex-1 text-xs text-left text-slate-300 group-hover:text-white font-bold uppercase tracking-wide capitalize">
                        {cat.label}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-red-500/70 rounded-full transition-all" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 w-8 text-right">{solved}/{total}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Leaderboard />
            </motion.div>

            {/* Back to CTF Info */}
            <Link
              to={Routes.CTF}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-sm border border-white/10 text-slate-400 hover:text-white hover:border-white/30 text-xs font-bold uppercase tracking-widest transition-all"
            >
              <ChevronRight className="w-3.5 h-3.5 rotate-180" />
              Back to CTF Overview
            </Link>
          </div>
        </div>
      </div>

      {/* ─── Challenge Modal ─── */}
      <AnimatePresence>
        {activeChallenge && (
          <ChallengeModal
            challenge={activeChallenge}
            onClose={() => setActiveChallenge(null)}
            onSolved={handleSolved}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
