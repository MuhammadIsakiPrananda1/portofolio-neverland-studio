import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  RefreshCw,
  Users,
  Eye,
  MessageSquare,
  FolderKanban,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  Chrome,
  Activity,
  TrendingUp,
  TrendingDown,
  Clock,
  FileText,
  Wifi,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
} from 'lucide-react';
import { staggerContainer, staggerItem } from '@utils/animations';
import { useRealtimeAnalytics } from '@hooks/useRealtimeAnalytics';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number | undefined | null): string {
  if (!n) return '0';
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

// ─── SVG Line Chart ───────────────────────────────────────────────────────────

interface LineChartProps {
  data: { label: string; value: number }[];
  color?: string;
  height?: number;
}

function LineChart({ data, color = '#ef4444', height = 120 }: LineChartProps) {
  const W = 500;
  const H = height;
  const PAD = 8;

  const values = data.map((d) => d.value);
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = max - min || 1;

  const pts = data.map((d, i) => {
    const x = PAD + (i / Math.max(data.length - 1, 1)) * (W - PAD * 2);
    const y = H - PAD - ((d.value - min) / range) * (H - PAD * 2);
    return { x, y, ...d };
  });

  const polyline = pts.map((p) => `${p.x},${p.y}`).join(' ');
  const area =
    pts.length > 0
      ? `M ${pts[0].x},${H - PAD} ` +
        pts.map((p) => `L ${p.x},${p.y}`).join(' ') +
        ` L ${pts[pts.length - 1].x},${H - PAD} Z`
      : '';

  const gradId = `lg-${color.replace('#', '')}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {[0, 0.25, 0.5, 0.75, 1].map((t) => {
        const y = PAD + t * (H - PAD * 2);
        return (
          <line key={t} x1={PAD} y1={y} x2={W - PAD} y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        );
      })}
      <path d={area} fill={`url(#${gradId})`} />
      <polyline points={polyline} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3.5" fill={color} stroke="#0f172a" strokeWidth="2" />
      ))}
    </svg>
  );
}

// ─── SVG Bar Chart ────────────────────────────────────────────────────────────

interface BarChartProps {
  data: { label: string; value: number }[];
  color?: string;
  height?: number;
}

function BarChart({ data, color = '#ef4444', height = 120 }: BarChartProps) {
  const W = 500;
  const H = height;
  const PAD = 8;
  const GAP = 4;
  const values = data.map((d) => d.value);
  const max = Math.max(...values, 1);
  const barW = (W - PAD * 2 - GAP * (data.length - 1)) / Math.max(data.length, 1);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="none">
      {data.map((d, i) => {
        const barH = (d.value / max) * (H - PAD * 2 - 16);
        const x = PAD + i * (barW + GAP);
        const y = H - PAD - barH;
        return <rect key={i} x={x} y={y} width={barW} height={barH} rx="3" fill={color} opacity="0.8" />;
      })}
    </svg>
  );
}

// ─── Donut Chart ──────────────────────────────────────────────────────────────

interface DonutSegment { label: string; value: number; color: string; }

function DonutChart({ segments, size = 120 }: { segments: DonutSegment[]; size?: number }) {
  const total = segments.reduce((s, d) => s + d.value, 0) || 1;
  const r = size / 2 - 14;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  let offset = 0;
  const arcs = segments.map((seg) => {
    const frac = seg.value / total;
    const dash = frac * circumference;
    const gap = circumference - dash;
    const rot = offset;
    offset += frac * 360;
    return { ...seg, dash, gap, rot };
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="16" />
      {arcs.map((arc, i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={arc.color} strokeWidth="16"
          strokeDasharray={`${arc.dash} ${arc.gap}`} strokeDashoffset={0}
          transform={`rotate(${arc.rot - 90} ${cx} ${cy})`} strokeLinecap="butt" />
      ))}
      <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="13" fontWeight="700" fontFamily="monospace">{total}</text>
    </svg>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string; value: string; icon: React.ElementType;
  iconColor: string; bgColor: string; change?: number; sub?: string;
}

function StatCard({ label, value, icon: Icon, iconColor, bgColor, change, sub }: StatCardProps) {
  const isUp = (change ?? 0) >= 0;
  return (
    <motion.div variants={staggerItem} className="relative rounded-sm p-6 bg-[#0f172a] border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl group overflow-hidden">
      <div className={`absolute inset-0 ${bgColor} opacity-5 group-hover:opacity-10 transition-opacity`} />
      <div className="absolute top-0 right-0 w-28 h-28 bg-white/5 rounded-bl-full -mr-14 -mt-14 group-hover:scale-110 transition-transform duration-500" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5">
          <div className="p-2.5 rounded-sm bg-black/20 border border-white/10 group-hover:scale-110 transition-transform">
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
          {change !== undefined && (
            <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full bg-black/20 border border-white/5 ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
              {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {Math.abs(change)}%
            </span>
          )}
        </div>
        <p className="text-3xl font-mono font-black text-white mb-1">{value}</p>
        <p className="text-sm text-gray-400">{label}</p>
        {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
      </div>
    </motion.div>
  );
}

function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`bg-white/5 rounded-sm animate-pulse ${className}`} />;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const DEVICE_ICONS: Record<string, React.ElementType> = { desktop: Monitor, mobile: Smartphone, tablet: Tablet };
const SEGMENT_COLORS = ['#ef4444','#8b5cf6','#3b82f6','#10b981','#f59e0b','#ec4899','#06b6d4'];
const STATUS_COLORS: Record<string, string> = {
  published:'#10b981', draft:'#f59e0b', archived:'#6b7280', active:'#10b981',
  new:'#ef4444', read:'#3b82f6', replied:'#8b5cf6', closed:'#6b7280', pending:'#f59e0b',
};

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DashboardAnalytics() {
  const { data, loading, refreshing, lastUpdated, error, refresh } = useRealtimeAnalytics(30_000);
  const [visitRange, setVisitRange] = useState<'7' | '14' | '30'>('30');

  const visitorsChartData = useMemo(() => {
    return data.visitors.slice(-Number(visitRange)).map((v) => ({ label: fmtDate(v.date), value: v.unique_visitors }));
  }, [data.visitors, visitRange]);

  const pageViewsChartData = useMemo(() => {
    return data.visitors.slice(-Number(visitRange)).map((v) => ({ label: fmtDate(v.date), value: v.total_views }));
  }, [data.visitors, visitRange]);

  const hourlyData = useMemo(() => data.hourlyVisitors.map((h) => ({ label: `${h.hour}h`, value: h.visitors })), [data.hourlyVisitors]);

  const projectCategorySegments = useMemo(() =>
    (data.projectsStats?.by_category ?? []).map((c, i) => ({ label: c.category, value: c.total, color: SEGMENT_COLORS[i % SEGMENT_COLORS.length] })),
    [data.projectsStats]);

  const projectStatusSegments = useMemo(() =>
    (data.projectsStats?.by_status ?? []).map((s) => ({ label: s.status, value: s.total, color: STATUS_COLORS[s.status] ?? '#6b7280' })),
    [data.projectsStats]);

  const deviceTotal = useMemo(() => data.deviceStats.reduce((s, d) => s + d.count, 0) || 1, [data.deviceStats]);
  const browserTotal = useMemo(() => data.browserStats.reduce((s, b) => s + b.count, 0) || 1, [data.browserStats]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-sm bg-gradient-to-br from-red-500/20 to-purple-500/20 border border-red-500/30 shadow-lg shadow-red-500/10">
            <BarChart3 className="w-6 h-6 text-red-400" />
          </div>
          <div>
            <h1 className="text-3xl lg:text-4xl font-mono font-black text-white tracking-tight">
              Analytics <span className="text-red-400">Dashboard</span>
            </h1>
            <p className="text-gray-400 mt-0.5 text-sm">Real-time metrics — auto-refresh every 30s</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            LIVE
          </div>
          {lastUpdated && (
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Clock className="w-3.5 h-3.5" />
              {lastUpdated.toLocaleTimeString('id-ID')}
            </div>
          )}
          <button onClick={refresh} disabled={refreshing} className="flex items-center gap-2 px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 hover:border-white/20 text-white text-sm font-medium transition-all hover:bg-white/[0.06] disabled:opacity-60">
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 p-4 rounded-sm bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error} — Retrying automatically...
        </div>
      )}

      {/* KPI Cards */}
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6" variants={staggerContainer} initial="hidden" animate="visible">
        {loading ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-40" />) : (
          <>
            <StatCard label="Total Visitors (30d)" value={fmt(data.visitors.reduce((s, v) => s + v.unique_visitors, 0))} icon={Users} iconColor="text-blue-400" bgColor="bg-blue-500" sub="Unique IP addresses" />
            <StatCard label="Page Views (30d)" value={fmt(data.overview?.total_views)} icon={Eye} iconColor="text-purple-400" bgColor="bg-purple-500" sub={`Projects: ${fmt(data.overview?.project_views)} · Blog: ${fmt(data.overview?.blog_views)}`} />
            <StatCard label="Total Messages" value={fmt(data.overview?.total_messages)} icon={MessageSquare} iconColor="text-red-400" bgColor="bg-red-500" sub={`${fmt(data.overview?.new_messages)} unread`} />
            <StatCard label="Total Projects" value={fmt(data.overview?.total_projects)} icon={FolderKanban} iconColor="text-emerald-400" bgColor="bg-emerald-500" sub={`${fmt(data.overview?.published_projects)} published`} />
          </>
        )}
      </motion.div>

      {/* Traffic Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-sm bg-[#0f172a] border border-white/10 shadow-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 via-red-400 to-transparent opacity-60" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
            <div>
              <h2 className="text-lg font-mono font-bold text-white flex items-center gap-2"><Activity className="w-5 h-5 text-red-400" />Visitor Traffic</h2>
              <p className="text-xs text-gray-400 mt-0.5">Unique visitors over time</p>
            </div>
            <div className="flex gap-1">
              {(['7','14','30'] as const).map((v) => (
                <button key={v} onClick={() => setVisitRange(v)} className={`px-3 py-1.5 text-xs font-semibold rounded-sm transition-all ${visitRange === v ? 'bg-red-500 text-white' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'}`}>{v}d</button>
              ))}
            </div>
          </div>
          <div className="h-36">
            {loading ? <Skeleton className="h-full" /> : visitorsChartData.length > 0 ? <LineChart data={visitorsChartData} color="#ef4444" height={144} /> : <div className="h-full flex items-center justify-center text-gray-600 text-sm">No data</div>}
          </div>
          {visitorsChartData.length > 0 && !loading && (
            <div className="flex justify-between mt-2 px-2">
              {visitorsChartData.filter((_, i, arr) => i === 0 || i === Math.floor(arr.length / 2) || i === arr.length - 1).map((d, i) => (
                <span key={i} className="text-xs text-gray-600">{d.label}</span>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-sm bg-[#0f172a] border border-white/10 shadow-2xl p-6">
          <h2 className="text-lg font-mono font-bold text-white flex items-center gap-2 mb-1"><Clock className="w-5 h-5 text-purple-400" />Hourly Visitors</h2>
          <p className="text-xs text-gray-400 mb-5">Activity by hour today</p>
          <div className="h-32">
            {loading ? <Skeleton className="h-full" /> : hourlyData.length > 0 ? <BarChart data={hourlyData} color="#8b5cf6" height={128} /> : <div className="h-full flex items-center justify-center text-gray-600 text-sm">No data</div>}
          </div>
        </div>
      </div>

      {/* Page Views Trend */}
      <div className="rounded-sm bg-[#0f172a] border border-white/10 shadow-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-mono font-bold text-white">Page Views Trend</h2>
        </div>
        <div className="h-28">
          {loading ? <Skeleton className="h-full" /> : pageViewsChartData.length > 0 ? <LineChart data={pageViewsChartData} color="#3b82f6" height={112} /> : <div className="h-full flex items-center justify-center text-gray-600 text-sm">No data</div>}
        </div>
      </div>

      {/* Projects Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-sm bg-[#0f172a] border border-white/10 shadow-2xl p-6">
          <h2 className="text-lg font-mono font-bold text-white flex items-center gap-2 mb-6"><FolderKanban className="w-5 h-5 text-emerald-400" />Projects by Category</h2>
          {loading ? <div className="space-y-3">{Array.from({length:4}).map((_,i)=><Skeleton key={i} className="h-10"/>)}</div> : projectCategorySegments.length > 0 ? (
            <div className="flex gap-6 items-center">
              <div className="shrink-0"><DonutChart segments={projectCategorySegments} size={130} /></div>
              <div className="flex-1 space-y-2.5">
                {projectCategorySegments.map((s) => {
                  const total = projectCategorySegments.reduce((acc,x) => acc + x.value, 0) || 1;
                  return (
                    <div key={s.label} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{background:s.color}} />
                        <span className="text-sm text-gray-300 truncate capitalize">{s.label}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-gray-500">{Math.round((s.value/total)*100)}%</span>
                        <span className="text-sm font-mono font-bold text-white">{s.value}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : <div className="text-gray-600 text-sm">No category data</div>}
        </div>

        <div className="rounded-sm bg-[#0f172a] border border-white/10 shadow-2xl p-6">
          <h2 className="text-lg font-mono font-bold text-white flex items-center gap-2 mb-6"><CheckCircle2 className="w-5 h-5 text-blue-400" />Projects by Status</h2>
          {loading ? <div className="space-y-3">{Array.from({length:3}).map((_,i)=><Skeleton key={i} className="h-10"/>)}</div> : projectStatusSegments.length > 0 ? (
            <div className="flex gap-6 items-center">
              <div className="shrink-0"><DonutChart segments={projectStatusSegments} size={130} /></div>
              <div className="flex-1 space-y-2.5">
                {projectStatusSegments.map((s) => {
                  const total = projectStatusSegments.reduce((acc,x) => acc + x.value, 0) || 1;
                  return (
                    <div key={s.label} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{background:s.color}} />
                        <span className="text-sm text-gray-300 capitalize">{s.label}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-gray-500">{Math.round((s.value/total)*100)}%</span>
                        <span className="text-sm font-mono font-bold text-white">{s.value}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : <div className="text-gray-600 text-sm">No status data</div>}
        </div>
      </div>

      {/* Top Projects + Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-sm bg-[#0f172a] border border-white/10 shadow-2xl p-6">
          <h2 className="text-lg font-mono font-bold text-white flex items-center gap-2 mb-5"><TrendingUp className="w-5 h-5 text-amber-400" />Top Projects by Views</h2>
          {loading ? <div className="space-y-3">{Array.from({length:5}).map((_,i)=><Skeleton key={i} className="h-10"/>)}</div> : (data.projectsStats?.top_projects ?? []).length > 0 ? (
            <div className="space-y-3">
              {(data.projectsStats?.top_projects ?? []).slice(0, 8).map((p, i) => {
                const maxViews = Math.max(...(data.projectsStats?.top_projects ?? []).map((x) => x.views), 1);
                return (
                  <div key={p.id} className="flex items-center gap-3 group">
                    <span className="w-5 text-xs text-gray-600 font-mono">{i+1}.</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-300 truncate group-hover:text-white transition-colors">{p.title}</span>
                        <span className="text-xs font-mono text-gray-400 ml-2 shrink-0">{fmt(p.views)}</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div initial={{width:0}} animate={{width:`${(p.views/maxViews)*100}%`}} transition={{duration:0.8, delay:i*0.05}} className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : <div className="text-gray-600 text-sm">No project data</div>}
        </div>

        <div className="rounded-sm bg-[#0f172a] border border-white/10 shadow-2xl p-6">
          <h2 className="text-lg font-mono font-bold text-white flex items-center gap-2 mb-5"><MessageSquare className="w-5 h-5 text-red-400" />Messages Overview</h2>
          {loading ? <div className="space-y-3">{Array.from({length:4}).map((_,i)=><Skeleton key={i} className="h-10"/>)}</div> : (
            <div className="space-y-5">
              {(data.messagesStats?.by_type ?? []).length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">By Type</p>
                  <div className="space-y-2">
                    {(data.messagesStats?.by_type ?? []).map((t, i) => {
                      const total = (data.messagesStats?.by_type ?? []).reduce((s,x) => s + x.total, 0) || 1;
                      return (
                        <div key={i} className="flex items-center gap-3">
                          <span className="text-sm text-gray-300 capitalize w-28 shrink-0">{t.message_type}</span>
                          <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                            <motion.div initial={{width:0}} animate={{width:`${(t.total/total)*100}%`}} transition={{duration:0.7,delay:i*0.07}} className="h-full rounded-full" style={{background:SEGMENT_COLORS[i%SEGMENT_COLORS.length]}} />
                          </div>
                          <span className="text-xs font-mono text-gray-400 w-8 text-right">{t.total}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {(data.messagesStats?.by_status ?? []).length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">By Status</p>
                  <div className="flex flex-wrap gap-2">
                    {(data.messagesStats?.by_status ?? []).map((s,i) => (
                      <span key={i} className="px-3 py-1 rounded-sm text-xs font-semibold border" style={{color:STATUS_COLORS[s.status]??'#9ca3af',borderColor:`${STATUS_COLORS[s.status]??'#374151'}40`,background:`${STATUS_COLORS[s.status]??'#374151'}15`}}>
                        {s.status}: {s.total}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {(data.messagesStats?.recent ?? []).length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Recent</p>
                  <div className="space-y-2">
                    {(data.messagesStats?.recent ?? []).slice(0,3).map((m) => (
                      <div key={m.id} className="flex items-center justify-between py-1.5 border-b border-white/5">
                        <div className="min-w-0">
                          <p className="text-sm text-white truncate">{m.name}</p>
                          <p className="text-xs text-gray-500 truncate">{m.email}</p>
                        </div>
                        <div className="flex items-center gap-2 ml-3 shrink-0">
                          <span className="px-2 py-0.5 text-xs rounded-sm font-medium capitalize" style={{color:STATUS_COLORS[m.status]??'#9ca3af',background:`${STATUS_COLORS[m.status]??'#374151'}20`}}>{m.status}</span>
                          <span className="text-xs text-gray-600">{timeAgo(m.created_at)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Top Pages + Device/Browser */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-sm bg-[#0f172a] border border-white/10 shadow-2xl p-6">
          <h2 className="text-lg font-mono font-bold text-white flex items-center gap-2 mb-5"><Globe className="w-5 h-5 text-cyan-400" />Top Pages</h2>
          {loading ? <div className="space-y-3">{Array.from({length:8}).map((_,i)=><Skeleton key={i} className="h-8"/>)}</div> : data.topPages.length > 0 ? (
            <div className="space-y-1">
              {data.topPages.map((p, i) => {
                const maxViews = Math.max(...data.topPages.map((x) => x.views), 1);
                const path = p.page_url.replace(/^https?:\/\/[^/]+/,'').replace(/\/$/,'') || '/';
                return (
                  <div key={i} className="flex items-center gap-3 py-2 px-3 rounded-sm hover:bg-white/[0.03] transition-colors group">
                    <span className="text-xs text-gray-600 font-mono w-4 shrink-0">{i+1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-300 truncate font-mono group-hover:text-cyan-400 transition-colors">{path}</span>
                        <span className="text-xs font-mono font-semibold text-gray-300 ml-3 shrink-0">{fmt(p.views)}</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div initial={{width:0}} animate={{width:`${(p.views/maxViews)*100}%`}} transition={{duration:0.7,delay:i*0.04}} className="h-full rounded-full bg-cyan-500/60" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : <div className="text-gray-600 text-sm">No page data — start tracking visits</div>}
        </div>

        <div className="space-y-6">
          <div className="rounded-sm bg-[#0f172a] border border-white/10 shadow-2xl p-5">
            <h2 className="text-base font-mono font-bold text-white flex items-center gap-2 mb-4"><Monitor className="w-4 h-4 text-blue-400" />Devices</h2>
            {loading ? <div className="space-y-2">{Array.from({length:3}).map((_,i)=><Skeleton key={i} className="h-8"/>)}</div> : data.deviceStats.length > 0 ? (
              <div className="space-y-3">
                {data.deviceStats.map((d,i) => {
                  const DevIcon = DEVICE_ICONS[d.device_type] ?? Monitor;
                  const pct = Math.round((d.count/deviceTotal)*100);
                  return (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-gray-300 capitalize"><DevIcon className="w-3.5 h-3.5 text-blue-400" />{d.device_type}</div>
                        <span className="text-xs font-mono text-gray-400">{pct}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div initial={{width:0}} animate={{width:`${pct}%`}} transition={{duration:0.7,delay:i*0.1}} className="h-full rounded-full" style={{background:SEGMENT_COLORS[i%SEGMENT_COLORS.length]}} />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : <div className="text-gray-600 text-sm">No device data</div>}
          </div>

          <div className="rounded-sm bg-[#0f172a] border border-white/10 shadow-2xl p-5">
            <h2 className="text-base font-mono font-bold text-white flex items-center gap-2 mb-4"><Chrome className="w-4 h-4 text-amber-400" />Browsers</h2>
            {loading ? <div className="space-y-2">{Array.from({length:4}).map((_,i)=><Skeleton key={i} className="h-8"/>)}</div> : data.browserStats.length > 0 ? (
              <div className="space-y-3">
                {data.browserStats.map((b,i) => {
                  const pct = Math.round((b.count/browserTotal)*100);
                  return (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-300">{b.browser}</span>
                        <span className="text-xs font-mono text-gray-400">{pct}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div initial={{width:0}} animate={{width:`${pct}%`}} transition={{duration:0.7,delay:i*0.08}} className="h-full rounded-full" style={{background:SEGMENT_COLORS[(i+3)%SEGMENT_COLORS.length]}} />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : <div className="text-gray-600 text-sm">No browser data</div>}
          </div>
        </div>
      </div>

      {/* Top Services + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-sm bg-[#0f172a] border border-white/10 shadow-2xl p-6">
          <h2 className="text-lg font-mono font-bold text-white flex items-center gap-2 mb-5"><Wifi className="w-5 h-5 text-purple-400" />Top Requested Services</h2>
          {loading ? <div className="space-y-3">{Array.from({length:5}).map((_,i)=><Skeleton key={i} className="h-12"/>)}</div> : data.topServices.length > 0 ? (
            <div className="space-y-3">
              {data.topServices.slice(0,8).map((s,i) => {
                const max = Math.max(...data.topServices.map((x) => x.requests), 1);
                return (
                  <div key={i} className="flex items-center gap-3 group">
                    <span className="w-5 text-xs text-gray-600 font-mono">{i+1}.</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-300 capitalize truncate group-hover:text-purple-400 transition-colors">{s.message_type.replace(/-/g,' ')}</span>
                        <span className="text-xs font-mono text-gray-400 ml-2 shrink-0">{s.requests}</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div initial={{width:0}} animate={{width:`${(s.requests/max)*100}%`}} transition={{duration:0.7,delay:i*0.05}} className="h-full rounded-full" style={{background:SEGMENT_COLORS[i%SEGMENT_COLORS.length]}} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : <div className="text-gray-600 text-sm">No service request data yet</div>}
        </div>

        <div className="rounded-sm bg-[#0f172a] border border-white/10 shadow-2xl p-6">
          <h2 className="text-lg font-mono font-bold text-white flex items-center gap-2 mb-5">
            <Activity className="w-5 h-5 text-emerald-400" />Activity Feed
            {refreshing && <span className="ml-auto text-xs text-gray-500 flex items-center gap-1"><RefreshCw className="w-3 h-3 animate-spin" />Updating</span>}
          </h2>
          {loading ? <div className="space-y-3">{Array.from({length:6}).map((_,i)=><Skeleton key={i} className="h-12"/>)}</div> : data.activityFeed.length > 0 ? (
            <div className="space-y-1 max-h-96 overflow-y-auto pr-1">
              {data.activityFeed.map((a,i) => (
                <motion.div key={a.id} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:i*0.04}} className="flex items-start gap-3 py-2.5 px-3 rounded-sm hover:bg-white/[0.03] transition-colors group">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-300 group-hover:text-white transition-colors capitalize">{a.description ?? `${a.type} event`}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{timeAgo(a.created_at)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Activity className="w-10 h-10 text-gray-700 mb-3" />
              <p className="text-gray-500 text-sm">No activity recorded yet</p>
              <p className="text-gray-600 text-xs mt-1">Events will appear here in real-time</p>
            </div>
          )}
        </div>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-sm bg-[#0f172a] border border-white/10 p-5 flex items-center gap-4 shadow-xl group hover:border-emerald-500/30 transition-all">
          <div className="p-3 rounded-sm bg-emerald-500/10 border border-emerald-500/20 group-hover:scale-110 transition-transform">
            <FileText className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Blog Posts</p>
            <p className="text-2xl font-mono font-black text-white mt-0.5">{loading ? '—' : fmt(data.overview?.total_blog_posts)}</p>
          </div>
        </div>
        <div className="rounded-sm bg-[#0f172a] border border-white/10 p-5 flex items-center gap-4 shadow-xl group hover:border-blue-500/30 transition-all">
          <div className="p-3 rounded-sm bg-blue-500/10 border border-blue-500/20 group-hover:scale-110 transition-transform">
            <Users className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Total Users</p>
            <p className="text-2xl font-mono font-black text-white mt-0.5">{loading ? '—' : fmt(data.overview?.total_users)}</p>
          </div>
        </div>
        <div className="rounded-sm bg-[#0f172a] border border-white/10 p-5 flex items-center gap-4 shadow-xl group hover:border-red-500/30 transition-all">
          <div className="p-3 rounded-sm bg-red-500/10 border border-red-500/20 group-hover:scale-110 transition-transform">
            <TrendingDown className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Unread Messages</p>
            <p className="text-2xl font-mono font-black text-white mt-0.5">{loading ? '—' : fmt(data.overview?.new_messages)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}