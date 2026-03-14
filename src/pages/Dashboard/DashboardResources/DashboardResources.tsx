import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, FolderOpen, FileText, Download, Eye, Link as LinkIcon, Image, Video, Archive, Sparkles } from 'lucide-react';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';

interface Resource {
  id: number;
  name: string;
  type: 'document' | 'image' | 'video' | 'archive' | 'link';
  category: string;
  size?: string;
  url?: string;
  date: string;
}

const defaultResources: Resource[] = [
  { id: 1, name: 'Security Policy Template', type: 'document', category: 'Templates', size: '2.4 MB', date: '2026-01-15' },
  { id: 2, name: 'Company Branding Guidelines', type: 'document', category: 'Brand', size: '5.1 MB', date: '2026-01-10' },
  { id: 3, name: 'Project Proposal Template', type: 'document', category: 'Templates', size: '1.2 MB', date: '2026-01-08' },
  { id: 4, name: 'Team Photos 2026', type: 'image', category: 'Media', size: '45.2 MB', date: '2026-01-20' },
  { id: 5, name: 'Product Demo Video', type: 'video', category: 'Media', size: '128.5 MB', date: '2026-01-18' },
  { id: 6, name: 'Client Presentation Q1', type: 'document', category: 'Presentations', size: '8.7 MB', date: '2026-02-01' },
  { id: 7, name: 'AWS Architecture Diagrams', type: 'image', category: 'Technical', size: '12.3 MB', date: '2026-01-25' },
  { id: 8, name: 'Backup Files Jan 2026', type: 'archive', category: 'Backups', size: '512 MB', date: '2026-01-31' },
];

const STORAGE_KEY = 'dashboard_resources';

const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch (e) { console.error(`Error loading ${key}:`, e); }
  return defaultValue;
};

export default function DashboardResources() {
  const [resources] = useState<Resource[]>(() => loadFromStorage(STORAGE_KEY, defaultResources));
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredResources = resources.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || r.type === filterType;
    return matchesSearch && matchesType;
  });

  const stats = {
    total: resources.length,
    documents: resources.filter(r => r.type === 'document').length,
    images: resources.filter(r => r.type === 'image').length,
    videos: resources.filter(r => r.type === 'video').length,
  };

  const getTypeIcon = (type: string) => {
    if (type === 'document') return <FileText className="w-5 h-5 text-blue-400" />;
    if (type === 'image') return <Image className="w-5 h-5 text-purple-400" />;
    if (type === 'video') return <Video className="w-5 h-5 text-red-400" />;
    if (type === 'archive') return <Archive className="w-5 h-5 text-yellow-400" />;
    return <LinkIcon className="w-5 h-5 text-gray-400" />;
  };

  const getTypeColor = (type: string) => {
    if (type === 'document') return 'bg-blue-500/10 border-blue-500/20 text-blue-400';
    if (type === 'image') return 'bg-purple-500/10 border-purple-500/20 text-purple-400';
    if (type === 'video') return 'bg-red-500/10 border-red-500/20 text-red-400';
    if (type === 'archive') return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400';
    return 'bg-gray-500/10 border-gray-500/20 text-gray-400';
  };

  return (
    <div className="space-y-6">
      <motion.div variants={slideUp} initial="hidden" animate="visible" className="relative">
        <div className="relative border border-white/10 rounded-sm sm:rounded-sm p-8 sm:p-10 overflow-hidden bg-[#0f172a] shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 sm:w-48 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-70" />
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm border border-red-500/30 bg-red-500/10">
                  <Sparkles className="w-3.5 h-3.5 text-red-400" />
                  <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest">Files</span>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-mono font-black mb-4 tracking-tight">
                <span className="text-white drop-shadow-md">
                  Resource{' '}
                </span>
                <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400 bg-clip-text text-transparent filter drop-shadow-lg">
                  Archive
                </span>
              </h1>
              <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed">
                Securely manage, organize, and share your important business files, documents, and media assets.
              </p>
            </div>

            <button
              className="group relative flex items-center gap-2 px-6 py-3 rounded-sm bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 overflow-hidden border border-white/10"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <FolderOpen className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <span className="relative z-10">Upload Files</span>
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6" variants={staggerContainer} initial="hidden" animate="visible">
        <motion.div variants={staggerItem} className="bg-[#0f172a] rounded-sm p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-sm bg-orange-500/20 border border-orange-500/30 shadow-inner group-hover:scale-110 transition-transform">
                <FolderOpen className="w-5 h-5 text-orange-400" />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-mono font-black text-white mb-1 drop-shadow-md">{stats.total}</h3>
              <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors uppercase tracking-wider">Total Files</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={staggerItem} className="bg-[#0f172a] rounded-sm p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-sm bg-red-500/20 border border-red-500/30 shadow-inner group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-mono font-black text-white mb-1 drop-shadow-md">{stats.documents}</h3>
              <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors uppercase tracking-wider">Documents</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={staggerItem} className="bg-[#0f172a] rounded-sm p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-sm bg-yellow-500/20 border border-yellow-500/30 shadow-inner group-hover:scale-110 transition-transform">
                <Image className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-mono font-black text-white mb-1 drop-shadow-md">{stats.images}</h3>
              <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors uppercase tracking-wider">Images</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={staggerItem} className="bg-[#0f172a] rounded-sm p-6 border border-white/10 shadow-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-sm bg-red-500/20 border border-red-500/30 shadow-inner group-hover:scale-110 transition-transform">
                <Video className="w-5 h-5 text-red-400" />
              </div>
            </div>
            <div>
              <h3 className="text-4xl font-mono font-black text-white mb-1 drop-shadow-md">{stats.videos}</h3>
              <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors uppercase tracking-wider">Videos</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-white/[0.02] p-4 rounded-sm border border-white/5 backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-sm blur opacity-0 group-hover:opacity-100 transition-opacity" />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-orange-400 transition-colors z-10" />
            <input type="text" placeholder="Search resources..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="relative pl-11 pr-4 py-2.5 rounded-sm bg-white/[0.03] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.05] w-64 md:w-80 transition-all duration-300" />
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-sm blur opacity-0 group-hover:opacity-100 transition-opacity" />
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="relative px-4 py-2.5 rounded-sm bg-white/[0.03] border border-white/10 text-sm text-white focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.05] appearance-none transition-all duration-300 pr-10 cursor-pointer">
              <option value="all" className="bg-[#0f172a]">All Types</option>
              <option value="document" className="bg-[#0f172a]">Documents</option>
              <option value="image" className="bg-[#0f172a]">Images</option>
              <option value="video" className="bg-[#0f172a]">Videos</option>
              <option value="archive" className="bg-[#0f172a]">Archives</option>
            </select>
          </div>
        </div>
        <p className="text-sm font-medium text-gray-400 bg-white/5 px-4 py-2 rounded-sm border border-white/5">{filteredResources.length} files found</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredResources.map((resource) => (
          <motion.div key={resource.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0f172a] rounded-sm border border-white/10 p-5 hover:border-orange-500/30 hover:shadow-xl transition-all duration-300 group relative overflow-hidden flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="flex items-start gap-4 mb-4 relative z-10 flex-1">
              <div className={`p-3 rounded-sm ${getTypeColor(resource.type)} shadow-inner group-hover:scale-110 transition-transform shrink-0`}>
                {getTypeIcon(resource.type)}
              </div>
              <div className="flex-1 min-w-0 pr-2">
                <h3 className="text-lg font-mono font-black text-white truncate group-hover:text-orange-400 transition-colors mb-1">{resource.name}</h3>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded border border-white/5">{resource.category}</span>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-black/20 px-2 py-0.5 rounded border border-white/5">{resource.size}</span>
                </div>
              </div>
            </div>
            {/* Meta & Actions */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10 relative z-10">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-black/20 px-3 py-1.5 rounded-full border border-white/5">{new Date(resource.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-lg:opacity-100">
                <button className="p-2.5 rounded-sm bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-all shadow-sm" title="Preview">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2.5 rounded-sm bg-orange-500/10 border border-orange-500/20 hover:border-orange-500/30 text-orange-400 hover:bg-orange-500/20 transition-all shadow-sm" title="Download">
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
