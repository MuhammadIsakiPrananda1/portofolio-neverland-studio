import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import apiClient from '@services/api.client';
import dashboardService from '@services/dashboard.service';
import { Contact as ContactType } from '@services/contact.service';
import Toast from '@components/atoms/Toast';
import {
  Users,
  User,
  Mail,
  FolderKanban,
  Clock,
  RefreshCw,
  Plus,
  Eye,
  Edit,
  Trash2,
  Search,
  Target,
  Wallet,
  BarChart3,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  UserPlus,
  FileText,
  Globe,
  X,
  Briefcase,
  Activity,
  Sparkles,
} from 'lucide-react';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';
import { Link } from 'react-router-dom';
import { Routes } from '@config/constants';

interface Project {
  id: number;
  name: string;
  client: string;
  status: 'active' | 'completed' | 'pending' | 'on-hold';
  progress: number;
  budget: number;
  deadline: string;
  category: string;
}

interface Client {
  id: number;
  name: string;
  email: string;
  company: string;
  phone: string;
  industry: string;
  status: 'active' | 'inactive' | 'prospect';
  totalProjects: number;
  totalSpent: number;
  joined: string;
  avatar?: string;
}

interface AnalyticsData {
  visitors: number;
  pageViews: number;
  bounceRate: number;
  avgSessionDuration: number;
  conversions: number;
  revenue: number;
  updatedAt: string;
}



const quickActions = [
  { id: 'projects', label: 'New Project', icon: FolderKanban, color: 'from-red-500 to-red-600', path: Routes.DASHBOARD_PROJECTS },
  { id: 'contacts', label: 'Add Contact', icon: UserPlus, color: 'from-red-500 to-red-700', path: Routes.DASHBOARD_MESSAGES },
  { id: 'clients', label: 'Add Client', icon: Users, color: 'from-red-500 to-red-600', path: Routes.DASHBOARD_CLIENTS },
  { id: 'reports', label: 'Generate Report', icon: FileText, color: 'from-emerald-500 to-teal-500', path: Routes.DASHBOARD_REPORTS },
];

const recentActivities = [
  { id: 1, type: 'project', message: 'New project "E-Commerce Security Audit" created', time: '2 min ago', icon: FolderKanban, color: 'text-red-400' },
  { id: 2, type: 'contact', message: 'New contact request from Ahmad Rizki', time: '15 min ago', icon: Mail, color: 'text-red-400' },
  { id: 3, type: 'client', message: 'Client "CloudAsia" updated their profile', time: '1 hour ago', icon: Users, color: 'text-red-400' },
  { id: 4, type: 'alert', message: 'Server CPU usage above 80%', time: '2 hours ago', icon: AlertCircle, color: 'text-red-400' },
  { id: 5, type: 'success', message: 'Project "Penetration Testing" completed', time: '3 hours ago', icon: CheckCircle2, color: 'text-emerald-400' },
];

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    visitors: 0, pageViews: 0, bounceRate: 0, avgSessionDuration: 0, conversions: 0, revenue: 0, updatedAt: new Date().toISOString()
  });

  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'contacts' | 'clients'>('overview');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState<string | null>(null);
  const [_editingItem, setEditingItem] = useState<{ type: string; data: any } | null>(null);
  const [deletingItem, setDeletingItem] = useState<{ type: string; id: number; name: string } | null>(null);
  const [formData, setFormData] = useState<any>({});

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentUserName = localStorage.getItem('dashboardUserName') || 'Admin';

  const fetchData = useCallback(async () => {
    try {
      setIsRefreshing(true);
      const [projectsRes, contactsRes, clientsRes, analyticsRes] = await Promise.all([
        apiClient.get('/projects'),
        dashboardService.getContacts(),
        apiClient.get('/clients'),
        dashboardService.getOverview()
      ]);
      if (projectsRes.data?.data) setProjects(projectsRes.data.data);
      if (contactsRes?.data?.data) setContacts(contactsRes.data.data);
      if (clientsRes.data?.data) setClients(clientsRes.data.data);
      if (analyticsRes?.data?.overview) setAnalytics(analyticsRes.data.overview);
      setLastUpdated(new Date());
    } catch (e) {
      console.error('Error fetching dashboard data', e);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-polling every 30 seconds for real-time data
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      fetchData();
    }, 30000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchData]);

  const handleRefresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  // Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info'; id: number } | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    const id = Date.now();
    setToast({ message, type, id });
    toastTimeoutRef.current = setTimeout(() => setToast(null), 3500);
  }, []);

  const handleMarkAsRead = async (id: number) => {
    try {
      await apiClient.put(`/contacts/${id}/read`);
      setContacts(prev => prev.map(c => c.id === id ? { ...c, status: 'read' as const } : c));
    } catch (e) { console.error('Error marking as read', e); }
  };

  const handleDeleteContact = async (id: number) => {
    try {
      await apiClient.delete(`/contacts/${id}`);
      setContacts(prev => prev.filter(c => c.id !== id));
      setDeletingItem(null);
    } catch (e) { console.error('Error deleting contact', e); }
  };

  const handleDeleteProject = async (id: number) => {
    try {
      await apiClient.delete(`/projects/${id}`);
      setProjects(prev => prev.filter(p => p.id !== id));
      setDeletingItem(null);
    } catch (e) { console.error('Error deleting project', e); }
  };

  const handleDeleteClient = async (id: number) => {
    try {
      await apiClient.delete(`/clients/${id}`);
      setClients(prev => prev.filter(c => c.id !== id));
      setDeletingItem(null);
    } catch (e) { console.error('Error deleting client', e); }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await apiClient.put(`/projects/${id}`, { status: newStatus });
      setProjects(prev => prev.map(p => p.id === id ? { ...p, status: newStatus as any } : p));
    } catch (e) { console.error('Error updating project', e); }
  };

  const handleClientStatusChange = async (id: number, newStatus: string) => {
    try {
      await apiClient.put(`/clients/${id}`, { status: newStatus });
      setClients(prev => prev.map(c => c.id === id ? { ...c, status: newStatus as any } : c));
    } catch (e) { console.error('Error updating client', e); }
  };

  const getTimeSince = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const getContactStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'new': 'bg-red-500/10 border-red-500/30 text-red-400',
      'read': 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
      'replied': 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
      'archived': 'bg-gray-500/10 border-gray-500/30 text-gray-400',
    };
    return colors[status] || colors['new'];
  };

  const getProjectStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'active': 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
      'completed': 'bg-blue-500/10 border-blue-500/30 text-blue-400',
      'pending': 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
      'on-hold': 'bg-red-500/10 border-red-500/30 text-red-400',
    };
    return colors[status] || colors['pending'];
  };

  const getClientStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'active': 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
      'inactive': 'bg-gray-500/10 border-gray-500/30 text-gray-400',
      'prospect': 'bg-purple-500/10 border-purple-500/30 text-purple-400',
    };
    return colors[status] || colors['prospect'];
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || p.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredContacts = contacts.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase()) || (c.company?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesFilter = filterStatus === 'all' || c.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredClients = clients.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase()) || c.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || c.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const statCards = [
    {
      label: 'Total Visitors',
      value: analytics.visitors.toLocaleString(),
      icon: Globe,
      gradient: 'from-red-500/20 via-red-500/10 to-red-600/5',
      iconBg: 'bg-red-500/10 border-red-500/20',
      iconColor: 'text-red-400',
    },
    {
      label: 'Page Views',
      value: analytics.pageViews.toLocaleString(),
      icon: Eye,
      gradient: 'from-red-500/20 via-red-600/10 to-red-600/5',
      iconBg: 'bg-red-500/10 border-red-500/20',
      iconColor: 'text-red-400',
    },
    {
      label: 'Conversions',
      value: analytics.conversions.toString(),
      icon: Target,
      gradient: 'from-red-500/20 via-red-500/10 to-red-700/5',
      iconBg: 'bg-red-500/10 border-red-500/20',
      iconColor: 'text-red-400',
      suffix: '',
    },
    {
      label: 'Revenue',
      value: `$${(analytics.revenue / 1000).toFixed(0)}K`,
      icon: Wallet,
      gradient: 'from-emerald-500/20 via-red-500/10 to-emerald-500/5',
      iconBg: 'bg-emerald-500/10 border-emerald-500/20',
      iconColor: 'text-emerald-400',
      prefix: '$',
    },
  ];

  return (
    <div className="relative">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] bg-red-500/10 rounded-full blur-[100px] sm:blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-56 h-56 sm:w-72 sm:h-72 md:w-[350px] md:h-[350px] bg-red-900/10 rounded-full blur-[80px] sm:blur-[100px]" />
      </div>

      <div className="relative z-10 space-y-6">
        <motion.div
          variants={slideUp}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          <div className="relative border border-white/10 rounded-sm sm:rounded-sm p-8 sm:p-10 overflow-hidden bg-[#0f172a] shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/5 via-transparent to-red-600/5" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 sm:w-48 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-70" />

            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm border border-red-500/30 bg-red-500/10">
                    <Sparkles className="w-3 h-3 text-red-400" />
                    <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest">Dashboard Overview</span>
                  </div>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-mono font-black mb-4 tracking-tight">
                  <span className="text-white drop-shadow-md">
                    Welcome back,{' '}
                  </span>
                  <span className="bg-gradient-to-r from-red-500 via-red-500 to-red-700 bg-clip-text text-transparent filter drop-shadow-lg">
                    {currentUserName}
                  </span>
                </h1>
                <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed">
                  Everything you need to manage your security solutions and infrastructure is right here.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 bg-black/20 p-2 rounded-sm backdrop-blur-md border border-white/5">
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-sm bg-white/5 text-sm text-gray-300 font-medium">
                  <Clock className="w-4 h-4 text-red-400" />
                  <span>{lastUpdated.toLocaleTimeString()}</span>
                </div>

                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="group relative flex items-center gap-2 px-6 py-2.5 rounded-sm bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-300 disabled:opacity-50 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <RefreshCw className={`relative z-10 w-4 h-4 ${isRefreshing ? 'animate-spin' : 'group-hover:text-red-400 transition-colors'}`} />
                  <span className="relative z-10 font-semibold tracking-wide">Sync</span>
                </button>
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-8 border-t border-white/10">
              <div className="flex flex-wrap gap-4">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={action.id}
                      to={action.path}
                      className="group relative overflow-hidden px-5 py-3 rounded-sm bg-white/[0.03] border border-white/10 hover:border-white/30 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-0 group-hover:opacity-15 transition-opacity duration-300`} />
                      <div className="relative z-10 flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors drop-shadow-md" />
                        <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors tracking-wide">{action.label}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {statCards.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={staggerItem}
              className="group relative rounded-sm p-5 bg-[#0f172a] border border-white/10 overflow-hidden hover:border-red-500/30 transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-30`} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2.5 rounded-sm ${stat.iconBg} border backdrop-blur-sm`}>
                    <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                  </div>
                </div>
                <motion.h3
                  className="text-3xl font-mono font-bold text-white mb-1"
                >
                  {stat.value}
                </motion.h3>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-sm overflow-hidden">
                <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:left-full transition-all duration-700 ease-in-out" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex gap-2 p-1.5 rounded-sm bg-[#0f172a] border border-white/10 bg-black/20 backdrop-blur-xl w-fit drop-shadow-2xl">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-2.5 rounded-sm text-sm font-semibold transition-all duration-300 flex items-center gap-2.5 ${activeTab === 'overview'
              ? 'bg-gradient-to-r from-red-500 via-red-500 to-red-600/80 text-white shadow-lg shadow-red-500/20 border border-white/10 scale-105'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
          >
            <BarChart3 className="w-4 h-4" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-5 py-2.5 rounded-sm text-sm font-semibold transition-all duration-300 flex items-center gap-2.5 ${activeTab === 'projects'
              ? 'bg-gradient-to-r from-red-500 via-red-500 to-red-600/80 text-white shadow-lg shadow-red-500/20 border border-white/10 scale-105'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
          >
            <FolderKanban className="w-4 h-4" />
            Projects
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-5 py-2.5 rounded-sm text-sm font-semibold transition-all duration-300 flex items-center gap-2.5 ${activeTab === 'contacts'
              ? 'bg-gradient-to-r from-red-500 via-red-500 to-red-600/80 text-white shadow-lg shadow-red-500/20 border border-white/10 scale-105'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
          >
            <Mail className="w-4 h-4" />
            Messages
          </button>
          <button
            onClick={() => setActiveTab('clients')}
            className={`px-5 py-2.5 rounded-sm text-sm font-semibold transition-all duration-300 flex items-center gap-2.5 ${activeTab === 'clients'
              ? 'bg-gradient-to-r from-red-500 via-red-500 to-red-600/80 text-white shadow-lg shadow-red-500/20 border border-white/10 scale-105'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
          >
            <Users className="w-4 h-4" />
            Clients
          </button>
        </div>

        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#0f172a] rounded-sm p-6 border border-white/10 hover:border-red-500/30 transition-colors shadow-xl group">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-mono font-bold text-white group-hover:text-red-400 transition-colors">Projects</h3>
                  <div className="p-2.5 rounded-sm bg-red-500/10 border border-red-500/30 shadow-inner">
                    <FolderKanban className="w-5 h-5 text-red-400" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-sm bg-white/[0.02] hover:bg-white/[0.05] transition-colors border border-transparent hover:border-white/5">
                    <span className="text-gray-400 text-sm font-medium">Active</span>
                    <span className="text-emerald-400 font-bold bg-emerald-400/10 px-3 py-1 rounded-sm border border-emerald-400/20">{projects.filter(p => p.status === 'active').length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-sm bg-white/[0.02] hover:bg-white/[0.05] transition-colors border border-transparent hover:border-white/5">
                    <span className="text-gray-400 text-sm font-medium">Completed</span>
                    <span className="text-blue-400 font-bold bg-blue-400/10 px-3 py-1 rounded-sm border border-blue-400/20">{projects.filter(p => p.status === 'completed').length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-sm bg-white/[0.02] hover:bg-white/[0.05] transition-colors border border-transparent hover:border-white/5">
                    <span className="text-gray-400 text-sm font-medium">Pending</span>
                    <span className="text-yellow-400 font-bold bg-yellow-400/10 px-3 py-1 rounded-sm border border-yellow-400/20">{projects.filter(p => p.status === 'pending').length}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#0f172a] rounded-sm p-6 border border-white/10 hover:border-red-500/30 transition-colors shadow-xl group">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-mono font-bold text-white group-hover:text-red-400 transition-colors">Messages</h3>
                  <div className="p-2.5 rounded-sm bg-red-500/10 border border-red-500/30 shadow-inner">
                    <Mail className="w-5 h-5 text-red-400" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-sm bg-white/[0.02] hover:bg-white/[0.05] transition-colors border border-transparent hover:border-white/5">
                    <span className="text-gray-400 text-sm font-medium">New</span>
                    <span className="text-red-400 font-bold bg-red-500/10 px-3 py-1 rounded-sm border border-red-500/20">{contacts.filter(c => c.status === 'new').length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-sm bg-white/[0.02] hover:bg-white/[0.05] transition-colors border border-transparent hover:border-white/5">
                    <span className="text-gray-400 text-sm font-medium">Read</span>
                    <span className="text-yellow-400 font-bold bg-yellow-400/10 px-3 py-1 rounded-sm border border-yellow-400/20">{contacts.filter(c => c.status === 'read').length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-sm bg-white/[0.02] hover:bg-white/[0.05] transition-colors border border-transparent hover:border-white/5">
                    <span className="text-gray-400 text-sm font-medium">Replied</span>
                    <span className="text-emerald-400 font-bold bg-emerald-400/10 px-3 py-1 rounded-sm border border-emerald-400/20">{contacts.filter(c => c.status === 'replied').length}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#0f172a] rounded-sm p-6 border border-white/10 hover:border-red-500/30 transition-colors shadow-xl group">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-mono font-bold text-white group-hover:text-red-400 transition-colors">Clients</h3>
                  <div className="p-2.5 rounded-sm bg-red-500/10 border border-red-500/30 shadow-inner">
                    <Users className="w-5 h-5 text-red-400" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-sm bg-white/[0.02] hover:bg-white/[0.05] transition-colors border border-transparent hover:border-white/5">
                    <span className="text-gray-400 text-sm font-medium">Active</span>
                    <span className="text-emerald-400 font-bold bg-emerald-400/10 px-3 py-1 rounded-sm border border-emerald-400/20">{clients.filter(c => c.status === 'active').length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-sm bg-white/[0.02] hover:bg-white/[0.05] transition-colors border border-transparent hover:border-white/5">
                    <span className="text-gray-400 text-sm font-medium">Inactive</span>
                    <span className="text-gray-400 font-bold bg-gray-400/10 px-3 py-1 rounded-sm border border-gray-400/20">{clients.filter(c => c.status === 'inactive').length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-sm bg-white/[0.02] hover:bg-white/[0.05] transition-colors border border-transparent hover:border-white/5">
                    <span className="text-gray-400 text-sm font-medium">Prospects</span>
                    <span className="text-purple-400 font-bold bg-purple-400/10 px-3 py-1 rounded-sm border border-purple-400/20">{clients.filter(c => c.status === 'prospect').length}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#0f172a] rounded-sm border border-white/10 overflow-hidden shadow-xl">
                <div className="p-6 border-b border-white/10 bg-white/[0.02]">
                  <h3 className="text-xl font-mono font-bold text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-red-400" />
                    Activity Log
                  </h3>
                </div>
                <div className="divide-y divide-white/5">
                  {recentActivities.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <div key={activity.id} className="p-5 hover:bg-white/[0.04] transition-colors group">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-sm bg-white/5 border border-white/5 group-hover:scale-110 transition-transform ${activity.color}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0 pt-1">
                            <p className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{activity.message}</p>
                            <p className="text-xs text-gray-500 mt-1.5 font-mono">{activity.time}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-[#0f172a] rounded-sm border border-white/10 overflow-hidden shadow-xl">
                <div className="p-6 border-b border-white/10 bg-white/[0.02] flex justify-between items-center">
                  <h3 className="text-xl font-mono font-bold text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-red-400" />
                    Recent Projects
                  </h3>
                  <Link to={Routes.DASHBOARD_PROJECTS} className="text-sm font-medium text-red-400 hover:text-white px-3 py-1.5 rounded-sm bg-red-500/10 hover:bg-red-500/20 transition-all flex items-center gap-1 border border-red-500/20">
                    View All <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="divide-y divide-white/5">
                  {projects.slice(0, 5).map((project) => (
                    <div key={project.id} className="p-5 hover:bg-white/[0.04] transition-colors group">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-base font-bold text-white truncate group-hover:text-red-400 transition-colors">{project.name}</h4>
                        <span className={`px-3 py-1 rounded-sm text-xs font-bold border ${getProjectStatusColor(project.status)} uppercase tracking-wider`}>
                          {project.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                        <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {project.client}</span>
                        <span className="font-mono bg-white/5 px-2 py-0.5 rounded text-white">{project.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-red-500 via-red-500 to-red-700 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'projects' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/[0.02] p-4 rounded-sm border border-white/5 backdrop-blur-md">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-sm blur opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-red-400 transition-colors z-10" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="relative pl-10 pr-4 py-2.5 rounded-sm bg-white/[0.03] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:bg-white/[0.05] w-64 transition-all duration-300"
                  />
                </div>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-700/20 rounded-sm blur opacity-0 group-hover:opacity-100 transition-opacity" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="relative px-4 py-2.5 rounded-sm bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-red-500/50 focus:bg-white/[0.05] appearance-none transition-all duration-300 pr-10"
                  >
                    <option value="all" className="bg-[#0f172a]">All Status</option>
                    <option value="active" className="bg-[#0f172a]">Active</option>
                    <option value="completed" className="bg-[#0f172a]">Completed</option>
                    <option value="pending" className="bg-[#0f172a]">Pending</option>
                    <option value="on-hold" className="bg-[#0f172a]">On Hold</option>
                  </select>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal('project')}
                className="group relative flex items-center gap-2 px-5 py-2.5 rounded-sm bg-gradient-to-r from-red-500 to-red-600 text-white font-medium text-sm hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 overflow-hidden border border-white/10"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <Plus className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Add Project</span>
              </button>
            </div>

            <div className="bg-[#0f172a] rounded-sm border border-white/10 overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Project</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Progress</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Budget</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Deadline</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProjects.map((project) => (
                      <tr key={project.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-white font-medium text-sm">{project.name}</p>
                            <p className="text-gray-500 text-xs">{project.category}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-sm">{project.client}</td>
                        <td className="px-6 py-4">
                          <select
                            value={project.status}
                            onChange={(e) => handleStatusChange(project.id, e.target.value)}
                            className={`px-2.5 py-1 rounded-full text-xs font-medium border bg-transparent ${getProjectStatusColor(project.status)}`}
                          >
                            <option value="active">Active</option>
                            <option value="completed">Completed</option>
                            <option value="pending">Pending</option>
                            <option value="on-hold">On Hold</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full"
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                            <span className="text-gray-400 text-xs">{project.progress}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-sm">${project.budget.toLocaleString()}</td>
                        <td className="px-6 py-4 text-gray-500 text-sm">{new Date(project.deadline).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => setEditingItem({ type: 'project', data: project })}
                              className="p-2 rounded-sm hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeletingItem({ type: 'project', id: project.id, name: project.name })}
                              className="p-2 rounded-sm hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'contacts' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/[0.02] p-4 rounded-sm border border-white/5 backdrop-blur-md">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-sm blur opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-red-400 transition-colors z-10" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="relative pl-10 pr-4 py-2.5 rounded-sm bg-white/[0.03] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:bg-white/[0.05] w-64 transition-all duration-300"
                  />
                </div>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-700/20 rounded-sm blur opacity-0 group-hover:opacity-100 transition-opacity" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="relative px-4 py-2.5 rounded-sm bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-red-500/50 focus:bg-white/[0.05] appearance-none transition-all duration-300 pr-10"
                  >
                    <option value="all" className="bg-[#0f172a]">All Status</option>
                    <option value="new" className="bg-[#0f172a]">New</option>
                    <option value="read" className="bg-[#0f172a]">Read</option>
                    <option value="replied" className="bg-[#0f172a]">Replied</option>
                    <option value="archived" className="bg-[#0f172a]">Archived</option>
                  </select>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal('contact')}
                className="group relative flex items-center gap-2 px-5 py-2.5 rounded-sm bg-gradient-to-r from-red-500 to-red-600 text-white font-medium text-sm hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 overflow-hidden border border-white/10"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <Plus className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Add Message</span>
              </button>
            </div>

            <div className="bg-[#0f172a] rounded-sm border border-white/10 overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Company</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Time</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.map((contact) => (
                      <tr key={contact.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-white font-medium text-sm">{contact.name}</p>
                            <p className="text-gray-500 text-xs">{contact.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-sm">{contact.company}</td>
                        <td className="px-6 py-4 text-gray-400 text-sm capitalize">{(contact.message_type || 'general').replace('-', ' ')}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getContactStatusColor(contact.status)}`}>
                            {contact.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-500 text-sm">{getTimeSince(contact.created_at)}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-1">
                            {contact.status === 'new' && (
                              <button
                                onClick={() => handleMarkAsRead(contact.id)}
                                className="p-2 rounded-sm hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                                title="Mark as read"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => setEditingItem({ type: 'contact', data: contact })}
                              className="p-2 rounded-sm hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeletingItem({ type: 'contact', id: contact.id, name: contact.name })}
                              className="p-2 rounded-sm hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'clients' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/[0.02] p-4 rounded-sm border border-white/5 backdrop-blur-md">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-sm blur opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-red-400 transition-colors z-10" />
                  <input
                    type="text"
                    placeholder="Search clients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="relative pl-10 pr-4 py-2.5 rounded-sm bg-white/[0.03] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:bg-white/[0.05] w-64 transition-all duration-300"
                  />
                </div>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-700/20 rounded-sm blur opacity-0 group-hover:opacity-100 transition-opacity" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="relative px-4 py-2.5 rounded-sm bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-red-500/50 focus:bg-white/[0.05] appearance-none transition-all duration-300 pr-10"
                  >
                    <option value="all" className="bg-[#0f172a]">All Status</option>
                    <option value="active" className="bg-[#0f172a]">Active</option>
                    <option value="inactive" className="bg-[#0f172a]">Inactive</option>
                    <option value="prospect" className="bg-[#0f172a]">Prospect</option>
                  </select>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal('client')}
                className="group relative flex items-center gap-2 px-5 py-2.5 rounded-sm bg-gradient-to-r from-red-500 to-red-600 text-white font-medium text-sm hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 overflow-hidden border border-white/10"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <Plus className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Add Client</span>
              </button>
            </div>

            <div className="bg-[#0f172a] rounded-sm border border-white/10 overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Company</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Industry</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Projects</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Spent</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClients.map((client) => (
                      <tr key={client.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-white font-medium text-sm">{client.name}</p>
                            <p className="text-gray-500 text-xs">{client.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-sm">{client.company}</td>
                        <td className="px-6 py-4 text-gray-400 text-sm">{client.industry}</td>
                        <td className="px-6 py-4">
                          <select
                            value={client.status}
                            onChange={(e) => handleClientStatusChange(client.id, e.target.value)}
                            className={`px-2.5 py-1 rounded-full text-xs font-medium border bg-transparent ${getClientStatusColor(client.status)}`}
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="prospect">Prospect</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-sm">{client.totalProjects}</td>
                        <td className="px-6 py-4 text-gray-400 text-sm">${client.totalSpent.toLocaleString()}</td>
                        <td className="px-6 py-4 text-gray-500 text-sm">{new Date(client.joined).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => setEditingItem({ type: 'client', data: client })}
                              className="p-2 rounded-sm hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeletingItem({ type: 'client', id: client.id, name: client.name })}
                              className="p-2 rounded-sm hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {showAddModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-[#0f172a] rounded-sm border border-white/10 p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white">
                    Add {showAddModal === 'project' ? 'Project' : showAddModal === 'contact' ? 'Message' : 'Client'}
                  </h3>
                  <button
                    onClick={() => setShowAddModal(null)}
                    className="p-2 rounded-sm hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {showAddModal === 'project' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Project Name</label>
                      <input
                        type="text"
                        value={formData.name || ''}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50"
                        placeholder="Enter project name"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Client</label>
                        <input
                          type="text"
                          value={formData.client || ''}
                          onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                          className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50"
                          placeholder="Client name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Category</label>
                        <select
                          value={formData.category || ''}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-red-500/50"
                        >
                          <option value="">Select category</option>
                          <option value="Security">Security</option>
                          <option value="Cloud">Cloud</option>
                          <option value="Infrastructure">Infrastructure</option>
                          <option value="Development">Development</option>
                          <option value="Compliance">Compliance</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Budget ($)</label>
                        <input
                          type="number"
                          value={formData.budget || ''}
                          onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) })}
                          className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Deadline</label>
                        <input
                          type="date"
                          value={formData.deadline || ''}
                          onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                          className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-red-500/50"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {showAddModal === 'contact' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Name</label>
                        <input
                          type="text"
                          value={formData.name || ''}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Email</label>
                        <input
                          type="email"
                          value={formData.email || ''}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Company</label>
                        <input
                          type="text"
                          value={formData.company || ''}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50"
                          placeholder="Company Name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Phone</label>
                        <input
                          type="text"
                          value={formData.phone || ''}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50"
                          placeholder="+62812345678"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Message</label>
                      <textarea
                        value={formData.message || ''}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50"
                        placeholder="Enter message..."
                      />
                    </div>
                  </div>
                )}

                {showAddModal === 'client' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Name</label>
                        <input
                          type="text"
                          value={formData.name || ''}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Email</label>
                        <input
                          type="email"
                          value={formData.email || ''}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Company</label>
                        <input
                          type="text"
                          value={formData.company || ''}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50"
                          placeholder="Company Name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Industry</label>
                        <select
                          value={formData.industry || ''}
                          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                          className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-red-500/50"
                        >
                          <option value="">Select industry</option>
                          <option value="Technology">Technology</option>
                          <option value="Financial Services">Financial Services</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="E-Commerce">E-Commerce</option>
                          <option value="Government">Government</option>
                          <option value="Startups">Startups</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => { setShowAddModal(null); setFormData({}); }}
                    className="flex-1 px-4 py-2 rounded-sm border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        if (showAddModal === 'project') {
                          const res = await apiClient.post('/projects', {
                            name: formData.name || 'New Project',
                            client: formData.client || 'Unknown',
                            status: 'pending',
                            progress: 0,
                            budget: formData.budget || 0,
                            deadline: formData.deadline || new Date().toISOString(),
                            category: formData.category || 'General',
                          });
                          const newProject = res.data?.data || res.data;
                          setProjects(prev => [newProject, ...prev]);
                          showToast('Project created successfully', 'success');
                        } else if (showAddModal === 'contact') {
                          const res = await apiClient.post('/contact', {
                            name: formData.name || 'New Contact',
                            email: formData.email || '',
                            company: formData.company || '',
                            phone: formData.phone || '',
                            message: formData.message || '',
                            message_type: 'general',
                          });
                          const newContact = res.data?.data || res.data;
                          setContacts(prev => [newContact, ...prev]);
                          showToast('Message created successfully', 'success');
                        } else if (showAddModal === 'client') {
                          const res = await apiClient.post('/clients', {
                            name: formData.name || 'New Client',
                            email: formData.email || '',
                            company: formData.company || '',
                            phone: formData.phone || '',
                            industry: formData.industry || 'Technology',
                            status: 'prospect',
                          });
                          const newClient = res.data?.data || res.data;
                          setClients(prev => [newClient, ...prev]);
                          showToast('Client created successfully', 'success');
                        }
                      } catch (e: any) {
                        console.error('Error creating item:', e);
                        showToast(e.response?.data?.message || 'Failed to create', 'error');
                      }
                      setShowAddModal(null);
                      setFormData({});
                    }}
                    className="flex-1 px-4 py-2 rounded-sm bg-gradient-to-r from-red-500 to-red-600 text-white font-medium hover:shadow-lg hover:shadow-red-500/20 transition-all"
                  >
                    Add
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {deletingItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-[#0f172a] rounded-sm border border-white/10 p-6 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-sm bg-red-500/10 border border-red-500/20">
                    <AlertCircle className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Delete {deletingItem.type === 'project' ? 'Project' : deletingItem.type === 'contact' ? 'Message' : 'Client'}?</h3>
                    <p className="text-gray-400 text-sm">This action cannot be undone.</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6">
                  Are you sure you want to delete <span className="text-white font-medium">{deletingItem.name}</span>?
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeletingItem(null)}
                    className="flex-1 px-4 py-2 rounded-sm border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (deletingItem.type === 'project') handleDeleteProject(deletingItem.id);
                      else if (deletingItem.type === 'contact') handleDeleteContact(deletingItem.id);
                      else if (deletingItem.type === 'client') handleDeleteClient(deletingItem.id);
                    }}
                    className="flex-1 px-4 py-2 rounded-sm bg-red-500/80 text-white font-medium hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Toast toast={toast} onDismiss={() => setToast(null)} />
      </div>
    </div>
  );
}
