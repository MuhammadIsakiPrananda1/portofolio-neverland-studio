import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Mail,
  Clock,
  CheckCircle2,
  AlertCircle,
  X,
  Sparkles,
  RefreshCw,
  Eye,
} from 'lucide-react';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';
import { useApiCrud } from '@hooks/useApiCrud';
import Toast from '@components/atoms/Toast';

interface Message {
  id: number;
  name: string;
  email: string;
  company: string;
  phone: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  message: string;
  message_type: string;
  type: string;
  priority: 'low' | 'medium' | 'high';
  created_at: string;
}

const defaultMessages: Message[] = [
  { id: 1, name: 'Ahmad Rizki', email: 'ahmad@tokopedia.com', company: 'Tokopedia', phone: '+62812345678', status: 'new', message: 'We need a comprehensive security audit for our payment system.', message_type: 'security-audit', type: 'security-audit', priority: 'high', created_at: '2026-02-28T10:30:00Z' },
  { id: 2, name: 'Sarah Melinda', email: 'sarah@gojek.com', company: 'Gojek', phone: '+62898765432', status: 'read', message: 'Interested in your cloud migration services for our infrastructure.', message_type: 'consulting', type: 'consulting', priority: 'medium', created_at: '2026-02-27T14:15:00Z' },
  { id: 3, name: 'Budi Santoso', email: 'budi@btn.co.id', company: 'Bank BTN', phone: '+62811223344', status: 'replied', message: 'Need penetration testing for our mobile banking application.', message_type: 'penetration-testing', type: 'penetration-testing', priority: 'high', created_at: '2026-02-26T09:00:00Z' },
  { id: 4, name: 'Lisa Pertiwi', email: 'lisa@traveloka.com', company: 'Traveloka', phone: '+62855667788', status: 'new', message: 'Looking for network security assessment services.', message_type: 'network-security', type: 'network-security', priority: 'medium', created_at: '2026-02-25T16:45:00Z' },
  { id: 5, name: 'Rendy Prakoso', email: 'rendy@grab.com', company: 'Grab', phone: '+62899887766', status: 'archived', message: 'Follow up on the compliance audit proposal.', message_type: 'compliance', type: 'compliance', priority: 'low', created_at: '2026-02-20T11:30:00Z' },
];

const messageTypes = ['general', 'security-audit', 'penetration-testing', 'cloud-security', 'consulting', 'compliance', 'network-security'];

export default function DashboardMessages() {
  const {
    items: messages,
    loading,
    isPolling,
    lastUpdated,
    create,
    update,
    remove,
    refresh,
    toast,
    dismissToast,
  } = useApiCrud<Message>({
    endpoint: '/contacts',
    defaultData: defaultMessages,
    pollingInterval: 30000,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const [deletingMessage, setDeletingMessage] = useState<Message | null>(null);
  const [viewingMessage, setViewingMessage] = useState<Message | null>(null);
  const [formData, setFormData] = useState<Partial<Message>>({});

  const filteredMessages = messages.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.email.toLowerCase().includes(searchTerm.toLowerCase()) || (m.company || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || m.status === filterStatus;
    const matchesType = filterType === 'all' || m.message_type === filterType || m.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleSave = async () => {
    if (editingMessage) {
      await update(editingMessage.id, formData);
    } else {
      await create({
        ...formData,
        status: 'new',
        priority: formData.priority || 'medium',
        message_type: formData.message_type || formData.type || 'general',
        created_at: new Date().toISOString(),
      } as Partial<Message>);
    }
    setShowAddModal(false);
    setEditingMessage(null);
    setFormData({});
  };

  const handleDelete = async () => {
    if (deletingMessage) {
      await remove(deletingMessage.id);
      setDeletingMessage(null);
    }
  };

  const handleStatusChange = async (id: number, status: string) => {
    if (status === 'read') {
      await update(id, { status: 'read' } as Partial<Message>);
    } else {
      await update(id, { status } as Partial<Message>);
    }
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

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'new': 'bg-red-500/10 border-red-500/30 text-red-400',
      'read': 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
      'replied': 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
      'archived': 'bg-gray-500/10 border-gray-500/30 text-gray-400',
    };
    return colors[status] || colors['new'];
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      'high': 'bg-red-500/10 border-red-500/30 text-red-400',
      'medium': 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
      'low': 'bg-gray-500/10 border-gray-500/30 text-gray-400',
    };
    return colors[priority] || colors['medium'];
  };

  const stats = {
    total: messages.length,
    new: messages.filter(m => m.status === 'new').length,
    read: messages.filter(m => m.status === 'read').length,
    replied: messages.filter(m => m.status === 'replied').length,
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-40 bg-white/5 rounded-sm" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-white/5 rounded-sm" />)}
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => <div key={i} className="h-24 bg-white/5 rounded-sm" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div variants={slideUp} initial="hidden" animate="visible" className="relative">
        <div className="relative border border-white/10 rounded-sm sm:rounded-sm p-8 sm:p-10 overflow-hidden bg-[#0f172a] shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/5 via-transparent to-red-600/5" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 sm:w-48 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-70" />
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm border border-red-500/30 bg-red-500/10">
                  <Sparkles className="w-3.5 h-3.5 text-red-400" />
                  <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest">Messages</span>
                </div>
                {isPolling && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-400/20 bg-emerald-500/5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest">Live</span>
                  </div>
                )}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-mono font-black mb-4 tracking-tight">
                <span className="text-white drop-shadow-md">Message </span>
                <span className="bg-gradient-to-r from-red-500 via-red-500 to-red-600 bg-clip-text text-transparent filter drop-shadow-lg">Center</span>
              </h1>
              <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed">Manage incoming messages, contact inquiries, and client communications.</p>
              <p className="text-xs text-gray-500 mt-2 font-mono">Last updated: {lastUpdated.toLocaleTimeString()}</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={refresh} className="p-3 rounded-sm bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"><RefreshCw className={`w-4 h-4 ${isPolling ? 'animate-spin' : ''}`} /></button>
              <button onClick={() => { setShowAddModal(true); setEditingMessage(null); setFormData({}); }} className="group relative flex items-center gap-2 px-6 py-3 rounded-sm bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-sm hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 overflow-hidden border border-white/10">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <Plus className="w-5 h-5 relative z-10" /><span className="relative z-10">New Message</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-4" variants={staggerContainer} initial="hidden" animate="visible">
        <motion.div variants={staggerItem} className="bg-[#0f172a] rounded-sm p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all"><div className="relative z-10"><div className="p-3 rounded-sm bg-red-500/20 border border-red-500/30 w-fit mb-4"><Mail className="w-5 h-5 text-red-400" /></div><h3 className="text-4xl font-mono font-black text-white mb-1">{stats.total}</h3><p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total</p></div></motion.div>
        <motion.div variants={staggerItem} className="bg-[#0f172a] rounded-sm p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all"><div className="relative z-10"><div className="p-3 rounded-sm bg-red-500/20 border border-red-500/30 w-fit mb-4"><AlertCircle className="w-5 h-5 text-red-400" /></div><h3 className="text-4xl font-mono font-black text-white mb-1">{stats.new}</h3><p className="text-sm font-medium text-gray-400 uppercase tracking-wider">New</p></div></motion.div>
        <motion.div variants={staggerItem} className="bg-[#0f172a] rounded-sm p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all"><div className="relative z-10"><div className="p-3 rounded-sm bg-yellow-500/20 border border-yellow-500/30 w-fit mb-4"><Eye className="w-5 h-5 text-yellow-400" /></div><h3 className="text-4xl font-mono font-black text-white mb-1">{stats.read}</h3><p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Read</p></div></motion.div>
        <motion.div variants={staggerItem} className="bg-[#0f172a] rounded-sm p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all"><div className="relative z-10"><div className="p-3 rounded-sm bg-emerald-500/20 border border-emerald-500/30 w-fit mb-4"><CheckCircle2 className="w-5 h-5 text-emerald-400" /></div><h3 className="text-4xl font-mono font-black text-white mb-1">{stats.replied}</h3><p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Replied</p></div></motion.div>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-white/[0.02] p-4 rounded-sm border border-white/5 backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group"><Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 z-10" /><input type="text" placeholder="Search messages..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-11 pr-4 py-2.5 rounded-sm bg-white/[0.03] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 w-64 transition-all" /></div>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2.5 rounded-sm bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none appearance-none pr-10 cursor-pointer"><option value="all" className="bg-[#0f172a]">All Status</option><option value="new" className="bg-[#0f172a]">New</option><option value="read" className="bg-[#0f172a]">Read</option><option value="replied" className="bg-[#0f172a]">Replied</option><option value="archived" className="bg-[#0f172a]">Archived</option></select>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-4 py-2.5 rounded-sm bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none appearance-none pr-10 cursor-pointer"><option value="all" className="bg-[#0f172a]">All Types</option>{messageTypes.map(t => <option key={t} value={t} className="bg-[#0f172a]">{t.replace('-', ' ')}</option>)}</select>
        </div>
        <p className="text-sm font-medium text-gray-400 bg-white/5 px-4 py-2 rounded-sm border border-white/5">{filteredMessages.length} messages</p>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredMessages.map((msg) => (
            <motion.div key={msg.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="bg-[#0f172a] rounded-sm border border-white/10 p-6 hover:border-red-500/30 transition-all duration-300 group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="w-12 h-12 rounded-sm bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-lg">{msg.name?.charAt(0) || 'M'}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors">{msg.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(msg.status)}`}>{msg.status}</span>
                      {msg.priority && <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${getPriorityColor(msg.priority)}`}>{msg.priority}</span>}
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{msg.email} • {msg.company || 'N/A'} • <Clock className="w-3 h-3 inline" /> {getTimeSince(msg.created_at)}</p>
                    <p className="text-sm text-gray-400 line-clamp-2">{msg.message}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <select value={msg.status} onChange={(e) => handleStatusChange(msg.id, e.target.value)} className={`px-2.5 py-1 rounded-full text-xs font-medium border bg-transparent cursor-pointer ${getStatusColor(msg.status)}`}>
                    <option value="new">New</option><option value="read">Read</option><option value="replied">Replied</option><option value="archived">Archived</option>
                  </select>
                  <button onClick={() => setViewingMessage(msg)} className="p-2 rounded-sm hover:bg-white/10 text-gray-400 hover:text-white transition-colors"><Eye className="w-4 h-4" /></button>
                  <button onClick={() => { setEditingMessage(msg); setFormData(msg); setShowAddModal(true); }} className="p-2 rounded-sm hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => setDeletingMessage(msg)} className="p-2 rounded-sm hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* View Message Modal */}
      <AnimatePresence>
        {viewingMessage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-[#0f172a] rounded-sm border border-white/10 p-6 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Message from {viewingMessage.name}</h3>
                <button onClick={() => setViewingMessage(null)} className="p-2 rounded-sm hover:bg-white/5 text-gray-400 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-3 text-sm">
                <p className="text-gray-400"><span className="text-gray-500 font-medium">Email:</span> {viewingMessage.email}</p>
                <p className="text-gray-400"><span className="text-gray-500 font-medium">Company:</span> {viewingMessage.company || 'N/A'}</p>
                <p className="text-gray-400"><span className="text-gray-500 font-medium">Phone:</span> {viewingMessage.phone || 'N/A'}</p>
                <p className="text-gray-400"><span className="text-gray-500 font-medium">Type:</span> {(viewingMessage.message_type || viewingMessage.type || 'general').replace('-', ' ')}</p>
                <p className="text-gray-400"><span className="text-gray-500 font-medium">Date:</span> {new Date(viewingMessage.created_at).toLocaleString()}</p>
                <div className="pt-4 border-t border-white/10"><p className="text-gray-300 leading-relaxed">{viewingMessage.message}</p></div>
              </div>
              <button onClick={() => setViewingMessage(null)} className="w-full mt-6 px-4 py-2 rounded-sm bg-gradient-to-r from-red-500 to-red-600 text-white font-medium hover:shadow-lg transition-all">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-[#0f172a] rounded-sm border border-white/10 p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">{editingMessage ? 'Edit Message' : 'New Message'}</h3>
                <button onClick={() => { setShowAddModal(false); setEditingMessage(null); }} className="p-2 rounded-sm hover:bg-white/5 text-gray-400 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm text-gray-400 mb-2">Name</label><input type="text" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50" placeholder="John Doe" /></div>
                  <div><label className="block text-sm text-gray-400 mb-2">Email</label><input type="email" value={formData.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50" placeholder="email@company.com" /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm text-gray-400 mb-2">Company</label><input type="text" value={formData.company || ''} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50" placeholder="Company" /></div>
                  <div><label className="block text-sm text-gray-400 mb-2">Phone</label><input type="text" value={formData.phone || ''} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50" placeholder="+62812345678" /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm text-gray-400 mb-2">Type</label><select value={formData.message_type || formData.type || 'general'} onChange={(e) => setFormData({ ...formData, message_type: e.target.value, type: e.target.value })} className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-red-500/50">{messageTypes.map(t => <option key={t} value={t}>{t.replace('-', ' ')}</option>)}</select></div>
                  <div><label className="block text-sm text-gray-400 mb-2">Priority</label><select value={formData.priority || 'medium'} onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })} className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-red-500/50"><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select></div>
                </div>
                <div><label className="block text-sm text-gray-400 mb-2">Message</label><textarea value={formData.message || ''} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={4} className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50" placeholder="Enter message..." /></div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => { setShowAddModal(false); setEditingMessage(null); }} className="flex-1 px-4 py-2 rounded-sm border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-colors">Cancel</button>
                <button onClick={handleSave} className="flex-1 px-4 py-2 rounded-sm bg-gradient-to-r from-red-500 to-red-600 text-white font-medium hover:shadow-lg hover:shadow-red-500/20 transition-all">{editingMessage ? 'Save Changes' : 'Send Message'}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deletingMessage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-[#0f172a] rounded-sm border border-white/10 p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-sm bg-red-500/10 border border-red-500/20"><AlertCircle className="w-6 h-6 text-red-400" /></div>
                <div><h3 className="text-lg font-bold text-white">Delete Message?</h3><p className="text-gray-400 text-sm">This action cannot be undone.</p></div>
              </div>
              <p className="text-gray-300 mb-6">Are you sure you want to delete message from <span className="text-white font-medium">{deletingMessage.name}</span>?</p>
              <div className="flex gap-3">
                <button onClick={() => setDeletingMessage(null)} className="flex-1 px-4 py-2 rounded-sm border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-colors">Cancel</button>
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
