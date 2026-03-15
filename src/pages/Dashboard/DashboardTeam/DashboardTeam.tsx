import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Mail,
  Phone,
  Clock,
  Shield,
  Sparkles,
  Plus,
  Edit,
  Trash2,
  X,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';
import { useApiCrud } from '@hooks/useApiCrud';
import Toast from '@components/atoms/Toast';

interface TeamMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  status: 'active' | 'inactive' | 'away';
  avatar: string;
  skills: string[];
  joinDate: string;
}

const defaultTeam: TeamMember[] = [
  { id: 1, name: 'Arlianto', email: 'arli@neverlandstudio.id', phone: '+6281252254886', role: 'CEO & Founder', department: 'Executive', status: 'active', avatar: 'AR', skills: ['Leadership', 'Security', 'Strategy'], joinDate: '2020-01-15' },
  { id: 2, name: 'Ahmad Fauzi', email: 'fauzi@neverlandstudio.id', phone: '+6281234567890', role: 'Lead Developer', department: 'Development', status: 'active', avatar: 'AF', skills: ['React', 'Node.js', 'Security'], joinDate: '2021-03-20' },
  { id: 3, name: 'Sarah Melinda', email: 'sarah@neverlandstudio.id', phone: '+6289876543210', role: 'Security Analyst', department: 'Security', status: 'active', avatar: 'SM', skills: ['Penetration Testing', 'SOC', 'CEH'], joinDate: '2021-06-10' },
  { id: 4, name: 'Budi Santoso', email: 'budi@neverlandstudio.id', phone: '+6281122334455', role: 'DevOps Engineer', department: 'Infrastructure', status: 'away', avatar: 'BS', skills: ['AWS', 'Kubernetes', 'Terraform'], joinDate: '2022-01-05' },
  { id: 5, name: 'Lisa Pertiwi', email: 'lisa@neverlandstudio.id', phone: '+6285566778899', role: 'UI/UX Designer', department: 'Design', status: 'active', avatar: 'LP', skills: ['Figma', 'UI Design', 'User Research'], joinDate: '2022-04-18' },
  { id: 6, name: 'Rendy Prakoso', email: 'rendy@neverlandstudio.id', phone: '+6289988776655', role: 'Backend Developer', department: 'Development', status: 'active', avatar: 'RP', skills: ['Python', 'Go', 'PostgreSQL'], joinDate: '2022-08-22' },
  { id: 7, name: 'Dewi Ayu', email: 'dewi@neverlandstudio.id', phone: '+6284455667788', role: 'Project Manager', department: 'Management', status: 'inactive', avatar: 'DA', skills: ['Agile', 'Scrum', 'Communication'], joinDate: '2023-02-14' },
];

const departments = ['Executive', 'Development', 'Security', 'Infrastructure', 'Design', 'Management', 'Marketing'];

export default function DashboardTeam() {
  const {
    items: team,
    loading,
    isPolling,
    lastUpdated,
    create,
    update,
    remove,
    refresh,
    toast,
    dismissToast,
  } = useApiCrud<TeamMember>({
    endpoint: '/team',
    defaultData: defaultTeam,
    pollingInterval: 30000,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [deletingMember, setDeletingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState<Partial<TeamMember>>({});
  const [skillInput, setSkillInput] = useState('');

  const filteredTeam = team.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === 'all' || m.department === filterDept;
    const matchesStatus = filterStatus === 'all' || m.status === filterStatus;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const handleSave = async () => {
    if (editingMember) {
      await update(editingMember.id, formData);
    } else {
      const initials = (formData.name || 'NM').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
      await create({
        ...formData,
        avatar: initials,
        status: formData.status || 'active',
        skills: formData.skills || [],
        joinDate: new Date().toISOString().split('T')[0],
      } as Partial<TeamMember>);
    }
    setShowAddModal(false);
    setEditingMember(null);
    setFormData({});
    setSkillInput('');
  };

  const handleDelete = async () => {
    if (deletingMember) {
      await remove(deletingMember.id);
      setDeletingMember(null);
    }
  };

  const addSkill = () => {
    if (skillInput.trim()) {
      const currentSkills = formData.skills || [];
      setFormData({ ...formData, skills: [...currentSkills, skillInput.trim()] });
      setSkillInput('');
    }
  };

  const removeSkill = (idx: number) => {
    const currentSkills = formData.skills || [];
    setFormData({ ...formData, skills: currentSkills.filter((_, i) => i !== idx) });
  };

  const stats = {
    total: team.length,
    active: team.filter(m => m.status === 'active').length,
    away: team.filter(m => m.status === 'away').length,
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'active': 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
      'away': 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
      'inactive': 'bg-gray-500/10 border-gray-500/30 text-gray-400',
    };
    return colors[status] || colors['inactive'];
  };

  const getDeptColor = (dept: string) => {
    const colors: Record<string, string> = {
      'Executive': 'text-purple-400', 'Development': 'text-blue-400', 'Security': 'text-red-400',
      'Infrastructure': 'text-orange-400', 'Design': 'text-pink-400', 'Management': 'text-cyan-400', 'Marketing': 'text-green-400',
    };
    return colors[dept] || 'text-gray-400';
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-40 bg-white/5 rounded-sm" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => <div key={i} className="h-64 bg-white/5 rounded-sm" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div variants={slideUp} initial="hidden" animate="visible" className="relative">
        <div className="relative border border-white/10 rounded-sm sm:rounded-sm p-8 sm:p-10 overflow-hidden bg-[#0f172a] shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/5 via-transparent to-red-900/5" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 sm:w-48 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-70" />
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm border border-red-500/30 bg-red-500/10">
                  <Sparkles className="w-3.5 h-3.5 text-red-400" />
                  <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest">Team Workspace</span>
                </div>
                {isPolling && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-400/20 bg-emerald-500/5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest">Live</span>
                  </div>
                )}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-mono font-black mb-4 tracking-tight">
                <span className="text-white drop-shadow-md">Team </span>
                <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-400 bg-clip-text text-transparent filter drop-shadow-lg">Management</span>
              </h1>
              <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed">Manage your team members, roles, departments, and monitor their status and skills.</p>
              <p className="text-xs text-gray-500 mt-2 font-mono">Last updated: {lastUpdated.toLocaleTimeString()}</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={refresh} className="p-3 rounded-sm bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"><RefreshCw className={`w-4 h-4 ${isPolling ? 'animate-spin' : ''}`} /></button>
              <button onClick={() => { setShowAddModal(true); setEditingMember(null); setFormData({}); setSkillInput(''); }} className="group relative flex items-center gap-2 px-6 py-3 rounded-sm bg-red-500 hover:bg-red-600 text-white font-bold text-sm hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 overflow-hidden border border-white/10">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <Plus className="w-5 h-5 relative z-10" /><span className="relative z-10">Add Member</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6" variants={staggerContainer} initial="hidden" animate="visible">
        <motion.div variants={staggerItem} className="bg-[#0f172a] rounded-sm p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all"><div className="relative z-10"><div className="p-3 rounded-sm bg-red-500/20 border border-red-500/30 shadow-inner w-fit mb-4 group-hover:scale-110 transition-transform"><Shield className="w-5 h-5 text-red-400" /></div><h3 className="text-4xl font-mono font-black text-white mb-1">{stats.total}</h3><p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total Members</p></div></motion.div>
        <motion.div variants={staggerItem} className="bg-[#0f172a] rounded-sm p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all"><div className="relative z-10"><div className="p-3 rounded-sm bg-emerald-500/20 border border-emerald-500/30 shadow-inner w-fit mb-4 group-hover:scale-110 transition-transform"><div className="w-4 h-4 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]" /></div><h3 className="text-4xl font-mono font-black text-white mb-1">{stats.active}</h3><p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Active</p></div></motion.div>
        <motion.div variants={staggerItem} className="bg-[#0f172a] rounded-sm p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all"><div className="relative z-10"><div className="p-3 rounded-sm bg-yellow-500/20 border border-yellow-500/30 shadow-inner w-fit mb-4 group-hover:scale-110 transition-transform"><div className="w-4 h-4 rounded-full bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]" /></div><h3 className="text-4xl font-mono font-black text-white mb-1">{stats.away}</h3><p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Away</p></div></motion.div>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-white/[0.02] p-4 rounded-sm border border-white/5 backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group"><Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-red-400 transition-colors z-10" /><input type="text" placeholder="Search team..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="relative pl-11 pr-4 py-2.5 rounded-sm bg-white/[0.03] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:bg-white/[0.05] w-64 transition-all duration-300" /></div>
          <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} className="px-4 py-2.5 rounded-sm bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-red-500/50 appearance-none pr-10 cursor-pointer"><option value="all" className="bg-[#0f172a]">All Departments</option>{departments.map(d => <option key={d} value={d} className="bg-[#0f172a]">{d}</option>)}</select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2.5 rounded-sm bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-red-500/50 appearance-none pr-10 cursor-pointer"><option value="all" className="bg-[#0f172a]">All Status</option><option value="active" className="bg-[#0f172a]">Active</option><option value="away" className="bg-[#0f172a]">Away</option><option value="inactive" className="bg-[#0f172a]">Inactive</option></select>
        </div>
        <p className="text-sm font-medium text-gray-400 bg-white/5 px-4 py-2 rounded-sm border border-white/5">{filteredTeam.length} members found</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredTeam.map((member) => (
            <motion.div key={member.id} layout initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="bg-[#0f172a] rounded-sm border border-white/10 overflow-hidden hover:border-red-500/30 hover:shadow-2xl transition-all duration-300 group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="p-6 relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-sm bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-black text-xl shadow-lg ring-2 ring-white/10 group-hover:ring-red-500/50 transition-all duration-300">{member.avatar}</div>
                    <div><h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors leading-tight">{member.name}</h3><p className={`text-xs font-bold uppercase tracking-wider mt-1 ${getDeptColor(member.department)}`}>{member.department}</p></div>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm ${getStatusColor(member.status)}`}>{member.status}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-300 mb-4 bg-white/5 py-2 px-3 rounded-sm border border-white/5 inline-block">{member.role}</p>
                  <div className="space-y-3 text-sm text-gray-400 mb-6">
                    <div className="flex items-center gap-3 group/item"><Mail className="w-4 h-4 text-gray-500 group-hover/item:text-red-400 transition-colors shrink-0" /><span className="truncate group-hover/item:text-gray-300 transition-colors">{member.email}</span></div>
                    <div className="flex items-center gap-3 group/item"><Phone className="w-4 h-4 text-gray-500 group-hover/item:text-red-400 transition-colors shrink-0" /><span className="group-hover/item:text-gray-300 transition-colors">{member.phone}</span></div>
                    <div className="flex items-center gap-3 group/item"><Clock className="w-4 h-4 text-gray-500 group-hover/item:text-red-400 transition-colors shrink-0" /><span className="group-hover/item:text-gray-300 transition-colors">Joined {new Date(member.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span></div>
                  </div>
                </div>
                <div className="mt-auto pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {(member.skills || []).map(skill => (<span key={skill} className="px-2.5 py-1 text-[10px] font-medium rounded-md bg-white/5 text-gray-400 border border-white/10">{skill}</span>))}
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={() => { setEditingMember(member); setFormData(member); setShowAddModal(true); }} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-sm bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/30 text-gray-400 hover:text-red-400 transition-all text-xs font-medium"><Edit className="w-3.5 h-3.5" /> Edit</button>
                    <button onClick={() => setDeletingMember(member)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-sm bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/30 text-gray-400 hover:text-red-400 transition-all text-xs font-medium"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
                  </div>
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
                <h3 className="text-lg font-bold text-white">{editingMember ? 'Edit Member' : 'New Member'}</h3>
                <button onClick={() => { setShowAddModal(false); setEditingMember(null); }} className="p-2 rounded-sm hover:bg-white/5 text-gray-400 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm text-gray-400 mb-2">Name</label><input type="text" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50" placeholder="Full Name" /></div>
                  <div><label className="block text-sm text-gray-400 mb-2">Email</label><input type="email" value={formData.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50" placeholder="email@company.com" /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm text-gray-400 mb-2">Phone</label><input type="text" value={formData.phone || ''} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50" placeholder="+62812345678" /></div>
                  <div><label className="block text-sm text-gray-400 mb-2">Role</label><input type="text" value={formData.role || ''} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50" placeholder="Developer" /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm text-gray-400 mb-2">Department</label><select value={formData.department || 'Development'} onChange={(e) => setFormData({ ...formData, department: e.target.value })} className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-red-500/50">{departments.map(d => <option key={d} value={d}>{d}</option>)}</select></div>
                  <div><label className="block text-sm text-gray-400 mb-2">Status</label><select value={formData.status || 'active'} onChange={(e) => setFormData({ ...formData, status: e.target.value as any })} className="w-full px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-red-500/50"><option value="active">Active</option><option value="away">Away</option><option value="inactive">Inactive</option></select></div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Skills</label>
                  <div className="flex gap-2 mb-2">
                    <input type="text" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())} className="flex-1 px-4 py-2 rounded-sm bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 text-sm" placeholder="Add skill..." />
                    <button type="button" onClick={addSkill} className="px-4 py-2 rounded-sm bg-blue-500/20 border border-blue-500/30 text-blue-400 hover:bg-blue-500/30 transition-colors text-sm font-medium">Add</button>
                  </div>
                  <div className="flex flex-wrap gap-2">{(formData.skills || []).map((skill, idx) => (<span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md bg-white/5 text-gray-300 border border-white/10">{skill}<button type="button" onClick={() => removeSkill(idx)} className="text-gray-500 hover:text-red-400 transition-colors"><X className="w-3 h-3" /></button></span>))}</div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => { setShowAddModal(false); setEditingMember(null); }} className="flex-1 px-4 py-2 rounded-sm border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-colors">Cancel</button>
                <button onClick={handleSave} className="flex-1 px-4 py-2 rounded-sm bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium hover:shadow-lg transition-all">{editingMember ? 'Save Changes' : 'Add Member'}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deletingMember && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-[#0f172a] rounded-sm border border-white/10 p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-sm bg-red-500/10 border border-red-500/20"><AlertCircle className="w-6 h-6 text-red-400" /></div>
                <div><h3 className="text-lg font-bold text-white">Remove Team Member?</h3><p className="text-gray-400 text-sm">This action cannot be undone.</p></div>
              </div>
              <p className="text-gray-300 mb-6">Are you sure you want to remove <span className="text-white font-medium">{deletingMember.name}</span>?</p>
              <div className="flex gap-3">
                <button onClick={() => setDeletingMember(null)} className="flex-1 px-4 py-2 rounded-sm border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-colors">Cancel</button>
                <button onClick={handleDelete} className="flex-1 px-4 py-2 rounded-sm bg-red-500/80 text-white font-medium hover:bg-red-600 transition-colors">Remove</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Toast toast={toast} onDismiss={dismissToast} />
    </div>
  );
}
