import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, DollarSign, Clock, CheckCircle, XCircle, FileText, Sparkles, Plus, Edit, Trash2, X, AlertCircle } from 'lucide-react';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';
import Toast from '@components/atoms/Toast';

interface Invoice {
  id: string;
  client: string;
  project: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  issueDate: string;
  dueDate: string;
}

const defaultInvoices: Invoice[] = [
  { id: 'INV-001', client: 'Tokopedia', project: 'Security Audit', amount: 15000, status: 'paid', issueDate: '2026-01-15', dueDate: '2026-02-15' },
  { id: 'INV-002', client: 'Gojek', project: 'Cloud Migration', amount: 50000, status: 'pending', issueDate: '2026-02-01', dueDate: '2026-03-01' },
  { id: 'INV-003', client: 'Bank BTN', project: 'Network Infrastructure', amount: 75000, status: 'pending', issueDate: '2026-02-10', dueDate: '2026-03-10' },
  { id: 'INV-004', client: 'Traveloka', project: 'Penetration Testing', amount: 12000, status: 'paid', issueDate: '2026-01-20', dueDate: '2026-02-20' },
  { id: 'INV-005', client: 'Bank Mandiri', project: 'Compliance Audit', amount: 25000, status: 'overdue', issueDate: '2026-01-05', dueDate: '2026-02-05' },
  { id: 'INV-006', client: 'Grab', project: 'Mobile App', amount: 45000, status: 'paid', issueDate: '2026-01-25', dueDate: '2026-02-25' },
];

const STORAGE_KEY = 'dashboard_invoices';

const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch (e) { console.error(`Error loading ${key}:`, e); }
  return defaultValue;
};

const saveToStorage = <T,>(key: string, value: T): void => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { console.error(`Error saving ${key}:`, e); }
};

export default function DashboardInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>(() => loadFromStorage(STORAGE_KEY, defaultInvoices));
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [deletingInvoice, setDeletingInvoice] = useState<Invoice | null>(null);
  const [formData, setFormData] = useState<Partial<Invoice>>({});

  // Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info'; id: number } | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    const id = Date.now();
    setToast({ message, type, id });
    toastTimeoutRef.current = setTimeout(() => setToast(null), 3500);
  }, []);

  useEffect(() => { saveToStorage(STORAGE_KEY, invoices); }, [invoices]);

  const filteredInvoices = invoices.filter(i => {
    const matchesSearch = i.client.toLowerCase().includes(searchTerm.toLowerCase()) || i.project.toLowerCase().includes(searchTerm.toLowerCase()) || i.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || i.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSave = () => {
    if (editingInvoice) {
      setInvoices(prev => prev.map(inv => inv.id === editingInvoice.id ? { ...inv, ...formData } as Invoice : inv));
      showToast('Invoice updated successfully', 'success');
    } else {
      const nextNum = invoices.length + 1;
      const newInvoice: Invoice = {
        id: `INV-${String(nextNum).padStart(3, '0')}`,
        client: formData.client || '',
        project: formData.project || '',
        amount: formData.amount || 0,
        status: formData.status || 'pending',
        issueDate: formData.issueDate || new Date().toISOString().split('T')[0],
        dueDate: formData.dueDate || '',
      };
      setInvoices(prev => [newInvoice, ...prev]);
      showToast('Invoice created successfully', 'success');
    }
    setShowAddModal(false);
    setEditingInvoice(null);
    setFormData({});
  };

  const handleDelete = () => {
    if (deletingInvoice) {
      setInvoices(prev => prev.filter(inv => inv.id !== deletingInvoice.id));
      setDeletingInvoice(null);
      showToast('Invoice deleted successfully', 'success');
    }
  };

  const handleStatusChange = (id: string, status: string) => {
    setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, status: status as Invoice['status'] } : inv));
    showToast('Status updated', 'info');
  };

  const stats = {
    total: invoices.reduce((sum, i) => sum + i.amount, 0),
    paid: invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0),
    pending: invoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.amount, 0),
    overdue: invoices.filter(i => i.status === 'overdue').reduce((sum, i) => sum + i.amount, 0),
  };

  const getStatusColor = (status: string) => {
    if (status === 'paid') return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
    if (status === 'pending') return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400';
    return 'bg-red-500/10 border-red-500/30 text-red-400';
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
                  <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest">Invoices</span>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-mono font-black mb-4 tracking-tight">
                <span className="text-white drop-shadow-md">Finance &{' '}</span>
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent filter drop-shadow-lg">Billing</span>
              </h1>
              <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed">Track payments, manage pending invoices, and monitor your agency's cash flow.</p>
            </div>
            <button onClick={() => { setShowAddModal(true); setEditingInvoice(null); setFormData({}); }} className="group relative flex items-center gap-2 px-6 py-3 rounded-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-white/10">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <Plus className="w-5 h-5 relative z-10" /><span className="relative z-10">New Invoice</span>
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6" variants={staggerContainer} initial="hidden" animate="visible">
        <motion.div variants={staggerItem} className="bg-[#0f172a] rounded-sm p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300"><div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" /><div className="relative z-10"><div className="p-3 rounded-sm bg-red-500/20 border border-red-500/30 shadow-inner group-hover:scale-110 transition-transform w-fit mb-4"><DollarSign className="w-5 h-5 text-red-400" /></div><h3 className="text-4xl font-mono font-black text-white mb-1 drop-shadow-md">${(stats.total / 1000).toFixed(0)}K</h3><p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total Amount</p></div></motion.div>
        <motion.div variants={staggerItem} className="bg-[#0f172a] rounded-sm p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300"><div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" /><div className="relative z-10"><div className="p-3 rounded-sm bg-emerald-500/20 border border-emerald-500/30 shadow-inner group-hover:scale-110 transition-transform w-fit mb-4"><CheckCircle className="w-5 h-5 text-emerald-400" /></div><h3 className="text-4xl font-mono font-black text-white mb-1 drop-shadow-md">${(stats.paid / 1000).toFixed(0)}K</h3><p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Paid Invoices</p></div></motion.div>
        <motion.div variants={staggerItem} className="bg-[#0f172a] rounded-sm p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300"><div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" /><div className="relative z-10"><div className="p-3 rounded-sm bg-yellow-500/20 border border-yellow-500/30 shadow-inner group-hover:scale-110 transition-transform w-fit mb-4"><Clock className="w-5 h-5 text-yellow-400" /></div><h3 className="text-4xl font-mono font-black text-white mb-1 drop-shadow-md">${(stats.pending / 1000).toFixed(0)}K</h3><p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Pending</p></div></motion.div>
        <motion.div variants={staggerItem} className="bg-[#0f172a] rounded-sm p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300"><div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" /><div className="relative z-10"><div className="p-3 rounded-sm bg-red-500/20 border border-red-500/30 shadow-inner group-hover:scale-110 transition-transform w-fit mb-4"><XCircle className="w-5 h-5 text-red-400" /></div><h3 className="text-4xl font-mono font-black text-white mb-1 drop-shadow-md">${(stats.overdue / 1000).toFixed(0)}K</h3><p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Overdue</p></div></motion.div>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-white/[0.02] p-4 rounded-sm border border-white/5 backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 z-10" />
            <input type="text" placeholder="Search invoices..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-11 pr-4 py-2.5 rounded-sm bg-white/[0.03] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 w-64 md:w-80 transition-all" />
          </div>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2.5 rounded-sm bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none appearance-none pr-10 cursor-pointer">
            <option value="all" className="bg-[#0f172a]">All Status</option>
            <option value="paid" className="bg-[#0f172a]">Paid</option>
            <option value="pending" className="bg-[#0f172a]">Pending</option>
            <option value="overdue" className="bg-[#0f172a]">Overdue</option>
          </select>
        </div>
        <p className="text-sm font-medium text-gray-400 bg-white/5 px-4 py-2 rounded-sm border border-white/5">{filteredInvoices.length} invoices found</p>
      </div>

      <div className="bg-[#0f172a] rounded-sm border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02]">
                <th className="px-6 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Invoice ID</th>
                <th className="px-6 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Client</th>
                <th className="px-6 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Project</th>
                <th className="px-6 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Amount</th>
                <th className="px-6 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Status</th>
                <th className="px-6 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Due Date</th>
                <th className="px-6 py-5 text-sm font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-white/[0.04] transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-sm bg-white/5 text-gray-400 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-colors"><FileText className="w-4 h-4" /></div>
                      <span className="text-white font-bold group-hover:text-emerald-400 transition-colors">{invoice.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-gray-300 font-medium group-hover:text-white transition-colors">{invoice.client}</td>
                  <td className="px-6 py-5 text-gray-400 font-medium">{invoice.project}</td>
                  <td className="px-6 py-5 text-white font-mono font-bold tracking-tight text-lg">${invoice.amount.toLocaleString()}</td>
                  <td className="px-6 py-5">
                    <select value={invoice.status} onChange={(e) => handleStatusChange(invoice.id, e.target.value)} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border bg-transparent cursor-pointer ${getStatusColor(invoice.status)}`}>
                      <option value="paid">Paid</option>
                      <option value="pending">Pending</option>
                      <option value="overdue">Overdue</option>
                    </select>
                  </td>
                  <td className="px-6 py-5 text-gray-500 font-medium group-hover:text-gray-300 transition-colors">{new Date(invoice.dueDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => { setEditingInvoice(invoice); setFormData(invoice); setShowAddModal(true); }} className="p-2 rounded-sm hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => setDeletingInvoice(invoice)} className="p-2 rounded-sm hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-[#0f172a] rounded-sm border border-white/10 p-6 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">{editingInvoice ? 'Edit Invoice' : 'New Invoice'}</h3>
                <button onClick={() => { setShowAddModal(false); setEditingInvoice(null); }} className="p-2 rounded-sm hover:bg-white/5 text-gray-400 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm text-gray-400 mb-2">Client</label><input type="text" value={formData.client || ''} onChange={(e) => setFormData({ ...formData, client: e.target.value })} className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50" placeholder="Client Name" /></div>
                  <div><label className="block text-sm text-gray-400 mb-2">Project</label><input type="text" value={formData.project || ''} onChange={(e) => setFormData({ ...formData, project: e.target.value })} className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50" placeholder="Project Name" /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm text-gray-400 mb-2">Amount ($)</label><input type="number" value={formData.amount || ''} onChange={(e) => setFormData({ ...formData, amount: parseInt(e.target.value) })} className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50" placeholder="10000" /></div>
                  <div><label className="block text-sm text-gray-400 mb-2">Status</label><select value={formData.status || 'pending'} onChange={(e) => setFormData({ ...formData, status: e.target.value as any })} className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-emerald-500/50"><option value="paid">Paid</option><option value="pending">Pending</option><option value="overdue">Overdue</option></select></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm text-gray-400 mb-2">Issue Date</label><input type="date" value={formData.issueDate || ''} onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })} className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-emerald-500/50" /></div>
                  <div><label className="block text-sm text-gray-400 mb-2">Due Date</label><input type="date" value={formData.dueDate || ''} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-emerald-500/50" /></div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => { setShowAddModal(false); setEditingInvoice(null); }} className="flex-1 px-4 py-2 rounded-sm border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-colors">Cancel</button>
                <button onClick={handleSave} className="flex-1 px-4 py-2 rounded-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium hover:shadow-lg transition-all">{editingInvoice ? 'Save Changes' : 'Create Invoice'}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deletingInvoice && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-[#0f172a] rounded-sm border border-white/10 p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-sm bg-red-500/10 border border-red-500/20"><AlertCircle className="w-6 h-6 text-red-400" /></div>
                <div><h3 className="text-lg font-bold text-white">Delete Invoice?</h3><p className="text-gray-400 text-sm">This action cannot be undone.</p></div>
              </div>
              <p className="text-gray-300 mb-6">Are you sure you want to delete invoice <span className="text-white font-medium">{deletingInvoice.id}</span>?</p>
              <div className="flex gap-3">
                <button onClick={() => setDeletingInvoice(null)} className="flex-1 px-4 py-2 rounded-sm border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-colors">Cancel</button>
                <button onClick={handleDelete} className="flex-1 px-4 py-2 rounded-sm bg-red-500/80 text-white font-medium hover:bg-red-600 transition-colors">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}
