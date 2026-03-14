import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Search,
  Plus,
  Edit,
  Trash2,
  Mail,
  Phone,
  Building2,
  MapPin,
  DollarSign,
  AlertCircle,
  X,
  Globe,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';
import { useApiCrud } from '@hooks/useApiCrud';
import Toast from '@components/atoms/Toast';

interface Client {
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: string;
  location: string;
  industry: string;
  projects: number;
  activeProjects: number;
  revenue: number;
  joinDate: string;
  status: 'active' | 'inactive' | 'prospect';
  avatar: string;
  bgColor: string;
  company: string;
}

const defaultClients: Client[] = [
  { id: 1, name: 'Tokopedia', contact: 'Ahmad Rizki', email: 'ahmad@tokopedia.com', phone: '+62812345678', location: 'Jakarta, ID', industry: 'Technology', projects: 5, activeProjects: 2, revenue: 150000, joinDate: '2023-01-15', status: 'active', avatar: 'TK', bgColor: 'from-emerald-500 to-green-500', company: 'Tokopedia' },
  { id: 2, name: 'Gojek', contact: 'Sarah Melinda', email: 'sarah@gojek.com', phone: '+62898765432', location: 'Jakarta, ID', industry: 'Technology', projects: 3, activeProjects: 1, revenue: 95000, joinDate: '2023-03-20', status: 'active', avatar: 'GJ', bgColor: 'from-green-500 to-emerald-500', company: 'Gojek' },
  { id: 3, name: 'Bank BTN', contact: 'Budi Santoso', email: 'budi@btn.co.id', phone: '+62811223344', location: 'Jakarta, ID', industry: 'Finance', projects: 2, activeProjects: 1, revenue: 200000, joinDate: '2023-06-10', status: 'active', avatar: 'BT', bgColor: 'from-blue-500 to-indigo-500', company: 'Bank BTN' },
  { id: 4, name: 'Traveloka', contact: 'Lisa Pertiwi', email: 'lisa@traveloka.com', phone: '+62855667788', location: 'Jakarta, ID', industry: 'Technology', projects: 4, activeProjects: 0, revenue: 120000, joinDate: '2022-11-05', status: 'inactive', avatar: 'TV', bgColor: 'from-blue-500 to-cyan-500', company: 'Traveloka' },
  { id: 5, name: 'Grab', contact: 'Rendy Prakoso', email: 'rendy@grab.com', phone: '+62899887766', location: 'Singapore', industry: 'Technology', projects: 1, activeProjects: 1, revenue: 45000, joinDate: '2024-01-22', status: 'prospect', avatar: 'GR', bgColor: 'from-green-400 to-emerald-400', company: 'Grab' },
  { id: 6, name: 'Bank Mandiri', contact: 'Dewi Ayu', email: 'dewi@mandiri.co.id', phone: '+62844556677', location: 'Jakarta, ID', industry: 'Finance', projects: 3, activeProjects: 2, revenue: 180000, joinDate: '2023-08-18', status: 'active', avatar: 'BM', bgColor: 'from-yellow-500 to-orange-500', company: 'Bank Mandiri' },
];

const industries = ['Technology', 'Finance', 'Security', 'Cloud Services', 'Startups', 'Government', 'Healthcare', 'Retail'];

export default function DashboardClients() {
  const {
    items: clients,
    loading,
    isPolling,
    lastUpdated,
    create,
    update,
    remove,
    refresh,
    toast,
    dismissToast,
  } = useApiCrud<Client>({
    endpoint: '/clients',
    defaultData: defaultClients,
    pollingInterval: 30000,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterIndustry, setFilterIndustry] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [deletingClient, setDeletingClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState<Partial<Client>>({});

  const filteredClients = clients.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || (c.contact || '').toLowerCase().includes(searchTerm.toLowerCase()) || (c.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || c.status === filterStatus;
    const matchesIndustry = filterIndustry === 'all' || c.industry === filterIndustry;
    return matchesSearch && matchesStatus && matchesIndustry;
  });

  const handleSave = async () => {
    if (editingClient) {
      await update(editingClient.id, formData);
    } else {
      const initials = (formData.name || 'NC').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
      const colors = ['from-emerald-500 to-green-500', 'from-blue-500 to-indigo-500', 'from-purple-500 to-pink-500', 'from-orange-500 to-red-500'];
      await create({
        ...formData,
        avatar: initials,
        bgColor: colors[Math.floor(Math.random() * colors.length)],
        projects: 0,
        activeProjects: 0,
        revenue: 0,
        joinDate: new Date().toISOString().split('T')[0],
        status: formData.status || 'prospect',
      } as Partial<Client>);
    }
    setShowAddModal(false);
    setEditingClient(null);
    setFormData({});
  };

  const handleDelete = async () => {
    if (deletingClient) {
      await remove(deletingClient.id);
      setDeletingClient(null);
    }
  };

  const handleStatusChange = async (id: number, status: string) => {
    await update(id, { status } as Partial<Client>);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'active': 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
      'inactive': 'bg-gray-500/10 border-gray-500/30 text-gray-400',
      'prospect': 'bg-purple-500/10 border-purple-500/30 text-purple-400',
    };
    return colors[status] || colors['prospect'];
  };

  const stats = {
    total: clients.length,
    active: clients.filter(c => c.status === 'active').length,
    totalRevenue: clients.reduce((sum, c) => sum + (c.revenue || 0), 0),
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-40 bg-white/5 rounded-sm" />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => <div key={i} className="h-32 bg-white/5 rounded-sm" />)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => <div key={i} className="h-64 bg-white/5 rounded-sm" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div variants={slideUp} initial="hidden" animate="visible" className="relative">
        <div className="relative border border-white/10 rounded-sm sm:rounded-sm p-8 sm:p-10 overflow-hidden bg-[#0f172a] shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/5 via-transparent to-red-600/5" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 sm:w-48 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-70" />
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm border border-red-500/30 bg-red-500/10">
                  <Sparkles className="w-3.5 h-3.5 text-red-400" />
                  <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest">Clients</span>
                </div>
                {isPolling && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-400/20 bg-emerald-500/5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest">Live</span>
                  </div>
                )}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-mono font-black mb-4 tracking-tight">
                <span className="text-white drop-shadow-md">Client </span>
                <span className="bg-gradient-to-r from-red-500 via-red-500 to-red-700 bg-clip-text text-transparent filter drop-shadow-lg">Management</span>
              </h1>
              <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed">Manage your client relationships, track projects, and monitor revenue.</p>
              <p className="text-xs text-gray-500 mt-2 font-mono">Last updated: {lastUpdated.toLocaleTimeString()}</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={refresh} className="p-3 rounded-sm bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all">
                <RefreshCw className={`w-4 h-4 ${isPolling ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={() => { setShowAddModal(true); setEditingClient(null); setFormData({}); }}
                className="group relative flex items-center gap-2 px-6 py-3 rounded-sm bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-sm hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 overflow-hidden border border-white/10"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <Plus className="w-5 h-5 relative z-10 group-hover:rotate-90 transition-transform duration-300" />
                <span className="relative z-10">New Client</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6" variants={staggerContainer} initial="hidden" animate="visible">
        <motion.div variants={staggerItem} className="bg-[#0f172a] rounded-sm p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10"><div className="p-3 rounded-sm bg-red-500/20 border border-red-500/30 shadow-inner w-fit mb-4 group-hover:scale-110 transition-transform"><Users className="w-5 h-5 text-red-400" /></div><h3 className="text-4xl font-mono font-black text-white mb-1">{stats.total}</h3><p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total Clients</p></div>
        </motion.div>
        <motion.div variants={staggerItem} className="bg-[#0f172a] rounded-sm p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10"><div className="p-3 rounded-sm bg-emerald-500/20 border border-emerald-500/30 shadow-inner w-fit mb-4 group-hover:scale-110 transition-transform"><Globe className="w-5 h-5 text-emerald-400" /></div><h3 className="text-4xl font-mono font-black text-white mb-1">{stats.active}</h3><p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Active</p></div>
        </motion.div>
        <motion.div variants={staggerItem} className="bg-[#0f172a] rounded-sm p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10"><div className="p-3 rounded-sm bg-yellow-500/20 border border-yellow-500/30 shadow-inner w-fit mb-4 group-hover:scale-110 transition-transform"><DollarSign className="w-5 h-5 text-yellow-400" /></div><h3 className="text-4xl font-mono font-black text-white mb-1">${(stats.totalRevenue / 1000).toFixed(0)}K</h3><p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Revenue</p></div>
        </motion.div>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-white/[0.02] p-4 rounded-sm border border-white/5 backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-sm blur opacity-0 group-hover:opacity-100 transition-opacity" />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-red-400 transition-colors z-10" />
            <input type="text" placeholder="Search clients..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="relative pl-11 pr-4 py-2.5 rounded-sm bg-white/[0.03] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:bg-white/[0.05] w-64 transition-all duration-300" />
          </div>
          <div className="relative group">
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="relative px-4 py-2.5 rounded-sm bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-red-500/50 appearance-none transition-all pr-10 cursor-pointer">
              <option value="all" className="bg-[#0f172a]">All Status</option>
              <option value="active" className="bg-[#0f172a]">Active</option>
              <option value="inactive" className="bg-[#0f172a]">Inactive</option>
              <option value="prospect" className="bg-[#0f172a]">Prospect</option>
            </select>
          </div>
          <div className="relative group">
            <select value={filterIndustry} onChange={(e) => setFilterIndustry(e.target.value)} className="relative px-4 py-2.5 rounded-sm bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-red-500/50 appearance-none transition-all pr-10 cursor-pointer">
              <option value="all" className="bg-[#0f172a]">All Industries</option>
              {industries.map(ind => <option key={ind} value={ind} className="bg-[#0f172a]">{ind}</option>)}
            </select>
          </div>
        </div>
        <p className="text-sm font-medium text-gray-400 bg-white/5 px-4 py-2 rounded-sm border border-white/5">{filteredClients.length} clients found</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredClients.map((client) => (
            <motion.div key={client.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#0f172a] rounded-sm border border-white/10 overflow-hidden hover:border-red-500/30 hover:shadow-2xl transition-all duration-300 group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="p-6 relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-sm bg-gradient-to-br ${client.bgColor || 'from-red-500 to-red-600'} flex items-center justify-center text-white font-black text-xl shadow-lg ring-2 ring-white/10`}>
                      {client.avatar || client.name?.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">{client.name}</h3>
                      <p className="text-xs text-gray-500">{client.contact || client.email}</p>
                    </div>
                  </div>
                  <select value={client.status} onChange={(e) => handleStatusChange(client.id, e.target.value)} className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border bg-transparent cursor-pointer ${getStatusColor(client.status)}`}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="prospect">Prospect</option>
                  </select>
                </div>

                <div className="space-y-2 text-sm text-gray-400 mb-4">
                  {client.email && <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-gray-500 shrink-0" /><span className="truncate">{client.email}</span></div>}
                  {client.phone && <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-gray-500 shrink-0" /><span>{client.phone}</span></div>}
                  {client.industry && <div className="flex items-center gap-2"><Building2 className="w-3.5 h-3.5 text-gray-500 shrink-0" /><span>{client.industry}</span></div>}
                  {client.location && <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-gray-500 shrink-0" /><span>{client.location}</span></div>}
                </div>

                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-center">
                  <div className="bg-black/20 rounded-sm p-2 border border-white/5"><p className="text-lg font-bold text-white">{client.projects || 0}</p><p className="text-[10px] text-gray-500 uppercase tracking-wider">Projects</p></div>
                  <div className="bg-black/20 rounded-sm p-2 border border-white/5"><p className="text-lg font-bold text-white">{client.activeProjects || 0}</p><p className="text-[10px] text-gray-500 uppercase tracking-wider">Active</p></div>
                  <div className="bg-black/20 rounded-sm p-2 border border-white/5"><p className="text-lg font-bold text-white">${((client.revenue || 0) / 1000).toFixed(0)}K</p><p className="text-[10px] text-gray-500 uppercase tracking-wider">Revenue</p></div>
                </div>

                <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button onClick={() => { setEditingClient(client); setFormData(client); setShowAddModal(true); }} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-sm bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/30 text-gray-400 hover:text-red-400 transition-all text-xs font-medium">
                    <Edit className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button onClick={() => setDeletingClient(client)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-sm bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/30 text-gray-400 hover:text-red-400 transition-all text-xs font-medium">
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-[#0f172a] rounded-sm border border-white/10 p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">{editingClient ? 'Edit Client' : 'New Client'}</h3>
                <button onClick={() => { setShowAddModal(false); setEditingClient(null); }} className="p-2 rounded-sm hover:bg-white/5 text-gray-400 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm text-gray-400 mb-2">Name</label><input type="text" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50" placeholder="Company Name" /></div>
                  <div><label className="block text-sm text-gray-400 mb-2">Contact Person</label><input type="text" value={formData.contact || ''} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50" placeholder="John Doe" /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm text-gray-400 mb-2">Email</label><input type="email" value={formData.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50" placeholder="email@company.com" /></div>
                  <div><label className="block text-sm text-gray-400 mb-2">Phone</label><input type="text" value={formData.phone || ''} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50" placeholder="+62812345678" /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm text-gray-400 mb-2">Industry</label><select value={formData.industry || ''} onChange={(e) => setFormData({ ...formData, industry: e.target.value })} className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-red-500/50"><option value="">Select</option>{industries.map(i => <option key={i} value={i}>{i}</option>)}</select></div>
                  <div><label className="block text-sm text-gray-400 mb-2">Location</label><input type="text" value={formData.location || ''} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50" placeholder="Jakarta, ID" /></div>
                </div>
                <div><label className="block text-sm text-gray-400 mb-2">Status</label><select value={formData.status || 'prospect'} onChange={(e) => setFormData({ ...formData, status: e.target.value as any })} className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-red-500/50"><option value="active">Active</option><option value="inactive">Inactive</option><option value="prospect">Prospect</option></select></div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => { setShowAddModal(false); setEditingClient(null); }} className="flex-1 px-4 py-2 rounded-sm border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-colors">Cancel</button>
                <button onClick={handleSave} className="flex-1 px-4 py-2 rounded-sm bg-gradient-to-r from-red-500 to-red-600 text-white font-medium hover:shadow-lg hover:shadow-red-500/20 transition-all">{editingClient ? 'Save Changes' : 'Create Client'}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deletingClient && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-[#0f172a] rounded-sm border border-white/10 p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-sm bg-red-500/10 border border-red-500/20"><AlertCircle className="w-6 h-6 text-red-400" /></div>
                <div><h3 className="text-lg font-bold text-white">Delete Client?</h3><p className="text-gray-400 text-sm">This action cannot be undone.</p></div>
              </div>
              <p className="text-gray-300 mb-6">Are you sure you want to delete <span className="text-white font-medium">{deletingClient.name}</span>?</p>
              <div className="flex gap-3">
                <button onClick={() => setDeletingClient(null)} className="flex-1 px-4 py-2 rounded-sm border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-colors">Cancel</button>
                <button onClick={handleDelete} className="flex-1 px-4 py-2 rounded-sm bg-red-500/80 text-white font-medium hover:bg-red-600 transition-colors">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Toast toast={toast} onDismiss={dismissToast} />
    </div>
  );
}
