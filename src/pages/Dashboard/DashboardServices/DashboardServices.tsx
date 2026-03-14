import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Shield,
  Activity,
  Server,
  Cloud,
  Code,
  Sparkles,
  Plus,
  Edit,
  Trash2,
  X,
  AlertCircle,
  RefreshCw,
  DollarSign,
  Users,
} from 'lucide-react';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';
import { useApiCrud } from '@hooks/useApiCrud';
import Toast from '@components/atoms/Toast';

interface Service {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  status: 'active' | 'inactive';
  clients: number;
}

const defaultServices: Service[] = [
  { id: 1, name: 'Penetration Testing', description: 'Comprehensive ethical hacking services', category: 'Security', price: 15000, status: 'active', clients: 45 },
  { id: 2, name: 'Cloud Migration', description: 'Seamless cloud infrastructure migration', category: 'Cloud', price: 25000, status: 'active', clients: 32 },
  { id: 3, name: 'Network Security', description: 'Advanced network protection solutions', category: 'Security', price: 12000, status: 'active', clients: 28 },
  { id: 4, name: 'DevOps Consulting', description: 'CI/CD pipeline and automation services', category: 'Development', price: 18000, status: 'active', clients: 22 },
  { id: 5, name: 'Compliance Audit', description: 'Regulatory compliance assessment', category: 'Compliance', price: 20000, status: 'active', clients: 15 },
  { id: 6, name: 'Managed Infrastructure', description: 'Full infrastructure management', category: 'Infrastructure', price: 35000, status: 'active', clients: 18 },
  { id: 7, name: 'Web Application Security', description: 'Web app vulnerability assessment', category: 'Security', price: 10000, status: 'active', clients: 38 },
  { id: 8, name: '24/7 Monitoring', description: 'Real-time security monitoring', category: 'Services', price: 5000, status: 'inactive', clients: 0 },
];

const serviceCategories = ['Security', 'Cloud', 'Development', 'Infrastructure', 'Compliance', 'Services'];

export default function DashboardServices() {
  const {
    items: services,
    loading,
    isPolling,
    lastUpdated,
    create,
    update,
    remove,
    refresh,
    toast,
    dismissToast,
  } = useApiCrud<Service>({
    endpoint: '/services',
    defaultData: defaultServices,
    pollingInterval: 30000,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [deletingService, setDeletingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<Partial<Service>>({});

  const filteredServices = services.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || s.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSave = async () => {
    if (editingService) {
      await update(editingService.id, formData);
    } else {
      await create({
        ...formData,
        status: formData.status || 'active',
        clients: 0,
      } as Partial<Service>);
    }
    setShowAddModal(false);
    setEditingService(null);
    setFormData({});
  };

  const handleDelete = async () => {
    if (deletingService) {
      await remove(deletingService.id);
      setDeletingService(null);
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, any> = { 'Security': Shield, 'Cloud': Cloud, 'Development': Code, 'Infrastructure': Server, 'Compliance': Activity, 'Services': Activity };
    return icons[category] || Activity;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = { 'Security': 'from-red-500 to-pink-500', 'Cloud': 'from-blue-500 to-cyan-500', 'Development': 'from-green-500 to-emerald-500', 'Infrastructure': 'from-orange-500 to-amber-500', 'Compliance': 'from-purple-500 to-indigo-500', 'Services': 'from-teal-500 to-cyan-500' };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  const stats = {
    total: services.length,
    active: services.filter(s => s.status === 'active').length,
    totalClients: services.reduce((sum, s) => sum + (s.clients || 0), 0),
    revenue: services.reduce((sum, s) => sum + (s.status === 'active' ? (s.price || 0) : 0), 0),
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-40 bg-white/5 rounded-sm" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => <div key={i} className="h-48 bg-white/5 rounded-sm" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div variants={slideUp} initial="hidden" animate="visible" className="relative">
        <div className="relative border border-white/10 rounded-sm sm:rounded-sm p-8 sm:p-10 overflow-hidden bg-[#0f172a] shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 sm:w-48 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-70" />
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-emerald-400/20 bg-emerald-500/5 backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest">Services</span>
                </div>
                {isPolling && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-400/20 bg-emerald-500/5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest">Live</span>
                  </div>
                )}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-mono font-black mb-4 tracking-tight">
                <span className="text-white drop-shadow-md">Service </span>
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">Management</span>
              </h1>
              <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed">Manage your service offerings, pricing, and client base.</p>
              <p className="text-xs text-gray-500 mt-2 font-mono">Last updated: {lastUpdated.toLocaleTimeString()}</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={refresh} className="p-3 rounded-sm bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"><RefreshCw className={`w-4 h-4 ${isPolling ? 'animate-spin' : ''}`} /></button>
              <button onClick={() => { setShowAddModal(true); setEditingService(null); setFormData({}); }} className="group relative flex items-center gap-2 px-6 py-3 rounded-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-white/10">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <Plus className="w-5 h-5 relative z-10" /><span className="relative z-10">New Service</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-4" variants={staggerContainer} initial="hidden" animate="visible">
        <motion.div variants={staggerItem} className="bg-[#0f172a] rounded-sm p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all"><div className="relative z-10"><div className="p-3 rounded-sm bg-emerald-500/20 border border-emerald-500/30 w-fit mb-4"><Shield className="w-5 h-5 text-emerald-400" /></div><h3 className="text-4xl font-mono font-black text-white mb-1">{stats.total}</h3><p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total</p></div></motion.div>
        <motion.div variants={staggerItem} className="bg-[#0f172a] rounded-sm p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all"><div className="relative z-10"><div className="p-3 rounded-sm bg-red-500/20 border border-red-500/30 w-fit mb-4"><Activity className="w-5 h-5 text-red-400" /></div><h3 className="text-4xl font-mono font-black text-white mb-1">{stats.active}</h3><p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Active</p></div></motion.div>
        <motion.div variants={staggerItem} className="bg-[#0f172a] rounded-sm p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all"><div className="relative z-10"><div className="p-3 rounded-sm bg-emerald-500/20 border border-emerald-500/30 w-fit mb-4"><Users className="w-5 h-5 text-emerald-400" /></div><h3 className="text-4xl font-mono font-black text-white mb-1">{stats.totalClients}</h3><p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Clients</p></div></motion.div>
        <motion.div variants={staggerItem} className="bg-[#0f172a] rounded-sm p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all"><div className="relative z-10"><div className="p-3 rounded-sm bg-orange-500/20 border border-orange-500/30 w-fit mb-4"><DollarSign className="w-5 h-5 text-orange-400" /></div><h3 className="text-4xl font-mono font-black text-white mb-1">${(stats.revenue / 1000).toFixed(0)}K</h3><p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Revenue</p></div></motion.div>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-white/[0.02] p-4 rounded-sm border border-white/5 backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group"><Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 z-10" /><input type="text" placeholder="Search services..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-11 pr-4 py-2.5 rounded-sm bg-white/[0.03] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 w-64 transition-all" /></div>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="px-4 py-2.5 rounded-sm bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none appearance-none pr-10 cursor-pointer"><option value="all" className="bg-[#0f172a]">All Categories</option>{serviceCategories.map(c => <option key={c} value={c} className="bg-[#0f172a]">{c}</option>)}</select>
        </div>
        <p className="text-sm font-medium text-gray-400 bg-white/5 px-4 py-2 rounded-sm border border-white/5">{filteredServices.length} services found</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredServices.map((service) => {
            const Icon = getCategoryIcon(service.category);
            return (
              <motion.div key={service.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#0f172a] rounded-sm border border-white/10 overflow-hidden hover:border-emerald-500/30 hover:shadow-2xl transition-all duration-300 group relative">
                <div className="p-6 relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-sm bg-gradient-to-br ${getCategoryColor(service.category)} shadow-lg`}><Icon className="w-5 h-5 text-white" /></div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${service.status === 'active' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-gray-500/10 border-gray-500/30 text-gray-400'}`}>{service.status}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">{service.name}</h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">{service.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10 text-sm">
                    <div className="flex items-center gap-1 text-gray-400"><DollarSign className="w-4 h-4" /><span className="font-bold text-white">${(service.price || 0).toLocaleString()}</span></div>
                    <div className="flex items-center gap-1 text-gray-400"><Users className="w-4 h-4" /><span className="font-bold text-white">{service.clients || 0}</span> clients</div>
                  </div>
                  <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={() => { setEditingService(service); setFormData(service); setShowAddModal(true); }} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-sm bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/30 text-gray-400 hover:text-red-400 transition-all text-xs font-medium"><Edit className="w-3.5 h-3.5" /> Edit</button>
                    <button onClick={() => setDeletingService(service)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-sm bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/30 text-gray-400 hover:text-red-400 transition-all text-xs font-medium"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-[#0f172a] rounded-sm border border-white/10 p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">{editingService ? 'Edit Service' : 'New Service'}</h3>
                <button onClick={() => { setShowAddModal(false); setEditingService(null); }} className="p-2 rounded-sm hover:bg-white/5 text-gray-400 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div><label className="block text-sm text-gray-400 mb-2">Service Name</label><input type="text" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50" placeholder="Service name" /></div>
                <div><label className="block text-sm text-gray-400 mb-2">Description</label><textarea value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50" placeholder="Service description..." /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm text-gray-400 mb-2">Category</label><select value={formData.category || 'Security'} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-emerald-500/50">{serviceCategories.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                  <div><label className="block text-sm text-gray-400 mb-2">Price ($)</label><input type="number" value={formData.price || ''} onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })} className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50" placeholder="10000" /></div>
                </div>
                <div><label className="block text-sm text-gray-400 mb-2">Status</label><select value={formData.status || 'active'} onChange={(e) => setFormData({ ...formData, status: e.target.value as any })} className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-emerald-500/50"><option value="active">Active</option><option value="inactive">Inactive</option></select></div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => { setShowAddModal(false); setEditingService(null); }} className="flex-1 px-4 py-2 rounded-sm border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-colors">Cancel</button>
                <button onClick={handleSave} className="flex-1 px-4 py-2 rounded-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium hover:shadow-lg transition-all">{editingService ? 'Save Changes' : 'Create Service'}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deletingService && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-[#0f172a] rounded-sm border border-white/10 p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-sm bg-red-500/10 border border-red-500/20"><AlertCircle className="w-6 h-6 text-red-400" /></div>
                <div><h3 className="text-lg font-bold text-white">Delete Service?</h3><p className="text-gray-400 text-sm">This action cannot be undone.</p></div>
              </div>
              <p className="text-gray-300 mb-6">Are you sure you want to delete <span className="text-white font-medium">{deletingService.name}</span>?</p>
              <div className="flex gap-3">
                <button onClick={() => setDeletingService(null)} className="flex-1 px-4 py-2 rounded-sm border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-colors">Cancel</button>
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
