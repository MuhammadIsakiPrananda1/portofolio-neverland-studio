import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, CheckCircle, Clock, AlertTriangle, Sparkles } from 'lucide-react';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: string;
  project: string;
}

const defaultTasks: Task[] = [
  { id: 1, title: 'Complete Security Audit Report', description: 'Finalize the security audit report for Tokopedia', status: 'in-progress', priority: 'high', assignee: 'Sarah Melinda', dueDate: '2026-02-20', project: 'E-Commerce Security' },
  { id: 2, title: 'Deploy Cloud Infrastructure', description: 'Set up AWS infrastructure for Gojek migration', status: 'todo', priority: 'high', assignee: 'Budi Santoso', dueDate: '2026-02-25', project: 'Cloud Migration' },
  { id: 3, title: 'UI Design Review', description: 'Review new dashboard design mockups', status: 'review', priority: 'medium', assignee: 'Lisa Pertiwi', dueDate: '2026-02-18', project: 'Dashboard Redesign' },
  { id: 4, title: 'API Documentation', description: 'Update API docs for new endpoints', status: 'done', priority: 'low', assignee: 'Rendy Prakoso', dueDate: '2026-02-15', project: 'API Development' },
  { id: 5, title: 'Penetration Testing', description: 'Conduct penetration testing for Traveloka', status: 'done', priority: 'high', assignee: 'Sarah Melinda', dueDate: '2026-02-10', project: 'Penetration Testing' },
  { id: 6, title: 'Client Meeting Preparation', description: 'Prepare slides for Bank Mandiri meeting', status: 'todo', priority: 'medium', assignee: 'Arlianto', dueDate: '2026-02-22', project: 'Compliance Audit' },
];

const STORAGE_KEY = 'dashboard_tasks';

const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch (e) { console.error(`Error loading ${key}:`, e); }
  return defaultValue;
};

export default function DashboardTasks() {
  const [tasks] = useState<Task[]>(() => loadFromStorage(STORAGE_KEY, defaultTasks));
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) || t.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || t.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    done: tasks.filter(t => t.status === 'done').length,
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'todo': 'bg-gray-500/10 border-gray-500/30 text-gray-400',
      'in-progress': 'bg-blue-500/10 border-blue-500/30 text-blue-400',
      'review': 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
      'done': 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    };
    return colors[status];
  };

  const getPriorityIcon = (priority: string) => {
    if (priority === 'high') return <AlertTriangle className="w-4 h-4 text-red-400" />;
    if (priority === 'medium') return <Clock className="w-4 h-4 text-yellow-400" />;
    return <CheckCircle className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className="space-y-6">
      <motion.div variants={slideUp} initial="hidden" animate="visible" className="relative">
        <div className="relative border border-white/10 rounded-sm sm:rounded-sm p-8 sm:p-10 overflow-hidden bg-[#0f172a] shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 sm:w-48 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-70" />

          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm border border-red-500/30 bg-red-500/10">
                  <Sparkles className="w-3.5 h-3.5 text-red-400" />
                  <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest">Operations</span>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-mono font-black mb-4 tracking-tight">
                <span className="text-white drop-shadow-md">
                  Task{' '}
                </span>
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent filter drop-shadow-lg">
                  Management
                </span>
              </h1>
              <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed">
                Track, assign, and manage all project tasks and operational activities across the team.
              </p>
            </div>

            <button
              className="group relative flex items-center gap-2 px-6 py-3 rounded-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 overflow-hidden border border-white/10"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <CheckCircle className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <span className="relative z-10">Create Task</span>
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6" variants={staggerContainer} initial="hidden" animate="visible">
        <motion.div variants={staggerItem} className="bg-[#0f172a] rounded-sm p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-sm bg-emerald-500/20 border border-emerald-500/30 shadow-inner group-hover:scale-110 transition-transform">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-mono font-black text-white mb-1 drop-shadow-md">{stats.total}</h3>
              <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors uppercase tracking-wider">Total Tasks</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={staggerItem} className="bg-[#0f172a] rounded-sm p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-sm bg-gray-500/20 border border-gray-500/30 shadow-inner group-hover:scale-110 transition-transform">
                <Clock className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-mono font-black text-white mb-1 drop-shadow-md">{stats.todo}</h3>
              <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors uppercase tracking-wider">To Do</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={staggerItem} className="bg-[#0f172a] rounded-sm p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-sm bg-yellow-500/20 border border-yellow-500/30 shadow-inner group-hover:scale-110 transition-transform flex items-center justify-center">
                <div className="w-5 h-5 rounded-full border-2 border-yellow-400" />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-mono font-black text-white mb-1 drop-shadow-md">{stats.inProgress}</h3>
              <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors uppercase tracking-wider">In Progress</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={staggerItem} className="bg-[#0f172a] rounded-sm p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-sm bg-emerald-500/20 border border-emerald-500/30 shadow-inner group-hover:scale-110 transition-transform">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-mono font-black text-white mb-1 drop-shadow-md">{stats.done}</h3>
              <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors uppercase tracking-wider">Completed</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-white/[0.02] p-4 rounded-sm border border-white/5 backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-sm blur opacity-0 group-hover:opacity-100 transition-opacity" />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-emerald-400 transition-colors z-10" />
            <input type="text" placeholder="Search tasks..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="relative pl-11 pr-4 py-2.5 rounded-sm bg-white/[0.03] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.05] w-64 md:w-80 transition-all duration-300" />
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-sm blur opacity-0 group-hover:opacity-100 transition-opacity" />
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="relative px-4 py-2.5 rounded-sm bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.05] appearance-none transition-all duration-300 pr-10 cursor-pointer">
              <option value="all" className="bg-[#0f172a]">All Status</option>
              <option value="todo" className="bg-[#0f172a]">To Do</option>
              <option value="in-progress" className="bg-[#0f172a]">In Progress</option>
              <option value="review" className="bg-[#0f172a]">Review</option>
              <option value="done" className="bg-[#0f172a]">Done</option>
            </select>
          </div>
        </div>
        <p className="text-sm font-medium text-gray-400 bg-white/5 px-4 py-2 rounded-sm border border-white/5">{filteredTasks.length} tasks found</p>
      </div>

      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <motion.div key={task.id} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#0f172a] rounded-sm border border-white/10 p-5 hover:border-emerald-500/30 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="flex flex-col sm:flex-row items-start justify-between gap-6 relative z-10">
              <div className="flex items-start gap-4 flex-1">
                <div className="p-3 rounded-sm bg-white/5 border border-white/10 shadow-inner group-hover:scale-110 transition-transform mt-1 shrink-0">
                  {getPriorityIcon(task.priority)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm ${getStatusColor(task.status)}`}>
                      {task.status.replace('-', ' ')}
                    </span>
                    <span className="text-gray-600 font-bold">•</span>
                    <span className="textxs font-bold text-gray-400 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded border border-white/5">{task.project}</span>
                  </div>
                  <h3 className="text-xl font-mono font-black text-white group-hover:text-emerald-400 transition-colors mb-2">{task.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{task.description}</p>
                </div>
              </div>
              <div className="text-left md:text-right flex-shrink-0 sm:pt-2 w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end border-t sm:border-t-0 border-white/10 pt-4 sm:pt-0">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-black/20 px-3 py-1.5 rounded-full border border-white/5 mb-2 flex items-center gap-2">
                  <Shield className="w-3 h-3 text-emerald-400" />
                  {task.assignee}
                </div>
                <p className="text-xs font-medium text-gray-500">Due {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
