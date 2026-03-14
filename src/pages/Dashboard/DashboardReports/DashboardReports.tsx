import { motion } from 'framer-motion';
import {
  FileText,
  Download,
  Filter,
  Calendar,
  TrendingUp,
  DollarSign,
  Users,
  FolderKanban,
  Eye,
  BarChart3,
  Sparkles
} from 'lucide-react';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';

const reports = [
  {
    id: 1,
    title: 'Monthly Revenue Report',
    description: 'Detailed revenue breakdown for February 2026',
    type: 'Financial',
    date: '2026-02-01',
    size: '2.4 MB',
    status: 'Ready',
    icon: DollarSign,
    bgColor: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400'
  },
  {
    id: 2,
    title: 'Client Activity Report',
    description: 'Client engagement and project status overview',
    type: 'Analytics',
    date: '2026-02-05',
    size: '1.8 MB',
    status: 'Ready',
    icon: Users,
    bgColor: 'bg-red-500/10',
    iconColor: 'text-red-400'
  },
  {
    id: 3,
    title: 'Project Performance',
    description: 'Q1 2026 project completion and timeline analysis',
    type: 'Operations',
    date: '2026-02-10',
    size: '3.2 MB',
    status: 'Ready',
    icon: FolderKanban,
    bgColor: 'bg-red-500/10',
    iconColor: 'text-red-400'
  },
  {
    id: 4,
    title: 'Traffic Analytics',
    description: 'Website traffic and user behavior metrics',
    type: 'Analytics',
    date: '2026-02-12',
    size: '1.5 MB',
    status: 'Processing',
    icon: TrendingUp,
    bgColor: 'bg-amber-500/10',
    iconColor: 'text-amber-400'
  },
  {
    id: 5,
    title: 'Sales Summary Report',
    description: 'Monthly sales performance and conversion rates',
    type: 'Financial',
    date: '2026-02-08',
    size: '2.1 MB',
    status: 'Ready',
    icon: BarChart3,
    bgColor: 'bg-pink-500/10',
    iconColor: 'text-pink-400'
  },
  {
    id: 6,
    title: 'Team Productivity Report',
    description: 'Team performance metrics and efficiency analysis',
    type: 'Operations',
    date: '2026-02-11',
    size: '1.9 MB',
    status: 'Ready',
    icon: Users,
    bgColor: 'bg-cyan-500/10',
    iconColor: 'text-cyan-400'
  },
];

const quickStats = [
  {
    label: 'Total Reports',
    value: '48',
    icon: FileText,
    bgColor: 'bg-red-500/10',
    iconColor: 'text-red-400'
  },
  {
    label: 'This Month',
    value: '12',
    icon: Calendar,
    bgColor: 'bg-red-500/10',
    iconColor: 'text-red-400'
  },
  {
    label: 'Downloads',
    value: '234',
    icon: Download,
    bgColor: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400'
  },
];

export default function DashboardReports() {
  return (
    <div className="space-y-6">
      <motion.div
        variants={slideUp}
        initial="hidden"
        animate="visible"
        className="relative"
      >
        <div className="relative border border-white/10 rounded-sm sm:rounded-sm p-8 sm:p-10 overflow-hidden bg-[#0f172a] shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/5 via-transparent to-red-900/5" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 sm:w-48 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-70" />

          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm border border-red-500/30 bg-red-500/10">
                  <Sparkles className="w-3.5 h-3.5 text-red-400" />
                  <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest">Analytics</span>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-mono font-black mb-4 tracking-tight">
                <span className="text-white drop-shadow-md">
                  Business{' '}
                </span>
                <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-400 bg-clip-text text-transparent filter drop-shadow-lg">
                  Reports
                </span>
              </h1>
              <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed">
                Access your business reports, analytics, and performance metrics in one comprehensive view.
              </p>
            </div>

            <button
              className="group relative flex items-center gap-2 px-6 py-3 rounded-sm bg-red-500 hover:bg-red-600 text-white font-bold text-sm hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 overflow-hidden border border-white/10"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <FileText className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <span className="relative z-10">Generate Report</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {quickStats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={staggerItem as any}
            className={`bg-[#0f172a] relative rounded-sm p-6 border border-white/10 shadow-xl overflow-hidden group hover:border-white/20 transition-all duration-300`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor.replace('bg-', 'from-').replace('/10', '/5')} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-sm ${stat.bgColor} border border-white/5 shadow-inner group-hover:scale-110 transition-transform`}>
                  <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
              </div>
              <div>
                <h3 className="text-4xl font-mono font-black text-white mb-1 drop-shadow-md">{stat.value}</h3>
                <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors uppercase tracking-wider">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white/[0.02] p-4 rounded-sm border border-white/5 backdrop-blur-md gap-4">
        <div className="flex flex-wrap gap-2">
          <button className="px-5 py-2.5 rounded-sm bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-bold tracking-wide transition-all duration-300 shadow-inner">
            All Reports
          </button>
          <button className="px-5 py-2.5 rounded-sm bg-white/[0.02] border border-white/5 text-gray-400 hover:text-white hover:border-white/10 hover:bg-white/5 text-sm font-bold tracking-wide transition-all duration-300">
            Financial
          </button>
          <button className="px-5 py-2.5 rounded-sm bg-white/[0.02] border border-white/5 text-gray-400 hover:text-white hover:border-white/10 hover:bg-white/5 text-sm font-bold tracking-wide transition-all duration-300">
            Analytics
          </button>
          <button className="px-5 py-2.5 rounded-sm bg-white/[0.02] border border-white/5 text-gray-400 hover:text-white hover:border-white/10 hover:bg-white/5 text-sm font-bold tracking-wide transition-all duration-300">
            Operations
          </button>
        </div>
        <button className="px-5 py-2.5 rounded-sm bg-white/[0.02] border border-white/5 text-gray-400 hover:text-white hover:border-white/10 hover:bg-white/5 transition-all duration-300 flex items-center gap-2 group">
          <Filter className="w-4 h-4 group-hover:text-red-400 transition-colors" />
          <span className="text-sm font-bold uppercase tracking-wider">Filters</span>
        </button>
      </div>

      {/* Reports List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {reports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-[#0f172a] rounded-sm border border-white/10 p-6 hover:border-white/20 hover:shadow-xl transition-all duration-300 group relative overflow-hidden flex flex-col"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${report.bgColor.replace('bg-', 'from-').replace('/10', '/5')} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

            <div className="flex items-start gap-4 mb-6 relative z-10 flex-1">
              {/* Icon */}
              <div className={`p-4 rounded-sm ${report.bgColor} border border-white/5 shadow-inner group-hover:scale-110 transition-transform shrink-0`}>
                <report.icon className={`w-6 h-6 ${report.iconColor}`} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm ${report.status === 'Ready'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                    {report.status}
                  </span>
                  <span className="text-gray-600 font-bold">•</span>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{report.type}</span>
                </div>
                <h3 className="text-xl font-mono font-black text-white group-hover:text-red-400 transition-colors mb-1 truncate">
                  {report.title}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">{report.description}</p>
              </div>
            </div>

            {/* Meta & Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10 relative z-10">
              <div className="flex items-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
                <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-full border border-white/5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(report.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <span className="bg-black/20 px-3 py-1.5 rounded-full border border-white/5">{report.size}</span>
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-sm:opacity-100">
                <button className="p-2.5 rounded-sm bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-all shadow-sm" title="Preview">
                  <Eye className="w-4 h-4" />
                </button>
                <button className={`p-2.5 rounded-sm ${report.bgColor} border border-white/5 hover:border-${report.iconColor.split('-')[1]}-500/30 ${report.iconColor} transition-all shadow-sm flex items-center gap-2`} title="Download">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
