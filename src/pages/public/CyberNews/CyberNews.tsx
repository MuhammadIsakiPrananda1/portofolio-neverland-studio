import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Search,
  ExternalLink,
  Clock,
  AlertTriangle,
  ChevronDown,
  Globe,
  Check,
  ChevronDown as LoadMoreIcon
} from 'lucide-react';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';
import { SkeletonCard } from '@components/atoms/SkeletonCard/SkeletonCard';

interface NewsItem {
  id: string;
  title: string;
  link: string;
  summary: string;
  published: string;
  displayTime: string;
  source: string;
  category: 'breach' | 'vulnerability' | 'malware' | 'exploit' | 'ai' | 'revenue' | 'research' | 'general';
  imageUrl?: string;
  severity: 'high' | 'medium' | 'low';
}

// OPTIMIZATION: Reduced from 50+ to 6 primary feeds for initial load
const PRIMARY_FEEDS = [
  { url: "https://feeds.feedburner.com/TheHackersNews", source: "The Hacker News", category: 'general' },
  { url: "https://www.bleepingcomputer.com/feed/", source: "BleepingComputer", category: 'general' },
  { url: "https://krebsonsecurity.com/feed/", source: "Krebs on Security", category: 'general' },
  { url: "https://news.sophos.com/en-us/feed/", source: "Sophos News", category: 'general' },
  { url: "https://www.cisa.gov/cybersecurity-advisories/all.xml", source: "CISA Advisories", category: 'vulnerability' },
  { url: "https://www.darkreading.com/rss.xml", source: "Dark Reading", category: 'general' },
];

// OPTIMIZATION: Additional feeds loaded when user clicks "Load More"
const SECONDARY_FEEDS = [
  { url: "https://www.csoonline.com/feed/", source: "CSO Online", category: 'general' },
  { url: "https://portswigger.net/daily-swig/rss", source: "Daily Swig", category: 'general' },
  { url: "https://grahamcluley.com/feed/", source: "Graham Cluley", category: 'general' },
  { url: "https://cyberscoop.com/feed/", source: "CyberScoop", category: 'general' },
  { url: "https://www.cybersecuritydive.com/feeds/news/", source: "Cybersecurity Dive", category: 'general' },
  { url: "https://threatpost.com/feed/", source: "Threatpost", category: 'general' },
  { url: "https://securityaffairs.co/wordpress/feed", source: "Security Affairs", category: 'general' },
  { url: "https://www.helpnetsecurity.com/feed/", source: "Help Net Security", category: 'general' },
  { url: "https://malware.news/c/news/8.rss", source: "Malware News", category: 'malware' },
  { url: "https://www.malwarebytes.com/blog/feed/index.xml", source: "Malwarebytes Blog", category: 'malware' },
];

const getRelativeTime = (dateString: string) => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'just now';
    let interval = seconds / 60;
    if (interval < 60) return Math.floor(interval) + " min ago";
    interval = seconds / 3600;
    if (interval < 24) return Math.floor(interval) + " hours ago";
    interval = seconds / 86400;
    if (interval < 30) return Math.floor(interval) + " days ago";
    interval = seconds / 2592000;
    return Math.floor(interval) + " months ago";
  } catch {
    return 'recently';
  }
};

const getCategoryInfo = (title: string, summary: string): { category: NewsItem['category'], severity: NewsItem['severity'] } => {
  const text = (title + ' ' + summary).toLowerCase();

  let severity: NewsItem['severity'] = 'low';
  if (text.includes('breach') || text.includes('ransomware') || text.includes('exploit') || text.includes('critical') || text.includes('zero-day')) {
    severity = 'high';
  } else if (text.includes('vulnerability') || text.includes('update') || text.includes('patch') || text.includes('warning')) {
    severity = 'medium';
  }

  if (text.includes('breach') || text.includes('leak') || text.includes('compromis')) {
    return { category: 'breach', severity: 'high' };
  }
  if (text.includes('vulnerability') || text.includes('zero-day') || text.includes('cve-')) {
    return { category: 'vulnerability', severity: 'high' };
  }
  if (text.includes('ransomware') || text.includes('malware') || text.includes('trojan') || text.includes('virus')) {
    return { category: 'malware', severity: 'high' };
  }
  if (text.includes('exploit') || text.includes('attack') || text.includes('payload')) {
    return { category: 'exploit', severity: 'high' };
  }
  if (text.includes('ai') || text.includes('artificial intelligence') || text.includes('machine learning')) {
    return { category: 'ai', severity: 'low' };
  }
  if (text.includes('revenue') || text.includes('funding') || text.includes('investment')) {
    return { category: 'revenue', severity: 'low' };
  }
  if (text.includes('research') || text.includes('study') || text.includes('report')) {
    return { category: 'research', severity: 'low' };
  }

  return { category: 'general', severity };
};

const getCategoryColor = (category: NewsItem['category']) => {
  const colors: Record<string, string> = {
    breach: 'bg-red-500/10 border-red-500/30 text-red-500',
    vulnerability: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
    malware: 'bg-red-500/10 border-red-500/30 text-red-400',
    exploit: 'bg-red-600/10 border-red-600/30 text-red-500',
    ai: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    revenue: 'bg-slate-500/10 border-slate-500/30 text-slate-400',
    research: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    general: 'bg-white/5 border-white/10 text-slate-400',
  };
  return colors[category] || colors.general;
};

const getSampleNews = (): NewsItem[] => {
  const today = new Date();
  return [
    {
      id: 'sample-1',
      title: 'Critical Zero-Day Vulnerability Discovered in Popular Software',
      link: 'https://thehackernews.com/',
      summary: 'Security researchers have identified a critical zero-day vulnerability affecting millions of users worldwide.',
      published: today.toISOString(),
      displayTime: 'just now',
      source: 'The Hacker News',
      category: 'vulnerability',
      severity: 'high',
      imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=500'
    },
    {
      id: 'sample-2',
      title: 'Major Ransomware Attack Targets Healthcare Organizations',
      link: 'https://www.bleepingcomputer.com/',
      summary: 'A sophisticated ransomware campaign is targeting healthcare institutions globally.',
      published: new Date(today.getTime() - 1000 * 60 * 30).toISOString(),
      displayTime: '30 min ago',
      source: 'BleepingComputer',
      category: 'malware',
      severity: 'high',
      imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=500'
    },
  ];
};

export default function CyberNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isLive, setIsLive] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // OPTIMIZATION: Pagination for displayed items
  const [displayLimit, setDisplayLimit] = useState(6); // Show 6 items initially
  const [hasLoadedSecondary, setHasLoadedSecondary] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const newsFetchRef = useRef<AbortController | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsLive(prev => !prev);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchNews = useCallback(async (feedList = PRIMARY_FEEDS) => {
    if (news.length === 0) setLoading(true);

    // Cancel previous requests
    if (newsFetchRef.current) {
      newsFetchRef.current.abort();
    }
    newsFetchRef.current = new AbortController();

    const timestamp = Date.now();

    try {
      // OPTIMIZATION: Fetch feeds in parallel with timeout
      const feedPromises = feedList.map(async (feed) => {
        try {
          const encodedUrl = btoa(feed.url);
          // OPTIMIZATION: Request only 10 items per feed (was unlimited)
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000);
          
          try {
            const response = await fetch(`/api/v1/cyber-news/fetch?feed=${encodedUrl}&limit=10&t=${timestamp}`, {
              signal: controller.signal
            });

            if (!response.ok) return [];

            const data = await response.json();

            if (data.status === 'ok' && data.items) {
              return data.items.map((item: any, index: number) => {
                const { category, severity } = getCategoryInfo(item.title, item.description);
                const imageUrl = item.image || '';
                const cleanSummary = (item.description || '')
                  .replace(/<[^>]*>/g, '')
                  .replace(/&[^;]+;/g, ' ')
                  .replace(/\s+/g, ' ')
                  .trim()
                  .slice(0, 200); // Shorter summaries

                return {
                  id: `${feed.source}-${index}-${item.pubDate}`,
                  title: item.title || 'No title',
                  link: item.link || '',
                  summary: cleanSummary,
                  published: item.pubDate,
                  displayTime: getRelativeTime(item.pubDate),
                  source: feed.source,
                  category,
                  severity,
                  imageUrl
                };
              });
            }
            return [];
          } finally {
            clearTimeout(timeoutId);
          }
        } catch (error) {
          console.warn(`Error fetching ${feed.source}:`, error);
          return [];
        }
      });

      const results = await Promise.all(feedPromises);
      const newArticles = results.flat();

      if (newArticles.length > 0) {
        setNews(prevNews => {
          const combinedNews = [...newArticles, ...prevNews];
          
          // Remove duplicates
          const uniqueNews = combinedNews.filter((item, index, self) =>
            index === self.findIndex((t) => t.title === item.title)
          );

          // Sort by date
          const sortedNews = uniqueNews.sort((a, b) => {
            const dateA = new Date(a.published).getTime();
            const dateB = new Date(b.published).getTime();
            return dateB - dateA;
          });

          // OPTIMIZATION: Keep only 100 items (was 1000) to save memory
          return sortedNews.slice(0, 100);
        });
      } else if (news.length === 0) {
        setNews(getSampleNews());
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('News fetch cancelled');
      } else {
        console.error('Error fetching news:', error);
      }
      if (news.length === 0) setNews(getSampleNews());
    } finally {
      setLoading(false);
    }
  }, [news.length]);

  // Initial fetch on component mount
  useEffect(() => {
    fetchNews(PRIMARY_FEEDS);

    return () => {
      if (newsFetchRef.current) {
        newsFetchRef.current.abort();
      }
    };
  }, []);

  // OPTIMIZATION: Increased from 30s to 60s to reduce server load
  useEffect(() => {
    const interval = setInterval(() => {
      fetchNews(PRIMARY_FEEDS);
      // Update display times without re-fetching
      setNews(currentNews => currentNews.map(item => ({
        ...item,
        displayTime: getRelativeTime(item.published)
      })));
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, [fetchNews]);

  // OPTIMIZATION: Efficient filtering with useMemo
  const filteredAndPaginatedNews = useMemo(() => {
    let filtered = news;

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(lowerSearch) ||
        item.summary.toLowerCase().includes(lowerSearch) ||
        item.source.toLowerCase().includes(lowerSearch)
      );
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(item => item.category === filterCategory);
    }

    // Paginate to display limit
    return filtered.slice(0, displayLimit);
  }, [news, searchTerm, filterCategory, displayLimit]);

  useEffect(() => {
    setFilteredNews(filteredAndPaginatedNews);
  }, [filteredAndPaginatedNews]);

  const categories = [
    { value: 'all', label: 'All News' },
    { value: 'breach', label: 'Breaches' },
    { value: 'vulnerability', label: 'Vulnerabilities' },
    { value: 'malware', label: 'Malware' },
    { value: 'exploit', label: 'Exploits' },
    { value: 'ai', label: 'AI & Tech' },
    { value: 'revenue', label: 'Business' },
    { value: 'research', label: 'Research' },
  ];

  const stats = {
    total: news.length,
    high: news.filter(n => n.severity === 'high').length,
    sources: [...new Set(news.map(n => n.source))].length,
  };

  // Check if there are more items to load
  const hasMoreItems = displayLimit < news.length;

  const handleLoadMore = useCallback(() => {
    // Load 6 more items
    setDisplayLimit(prev => prev + 6);

    // If we haven't loaded secondary feeds yet and have reached the end of primary
    if (!hasLoadedSecondary && displayLimit + 6 >= news.length) {
      setHasLoadedSecondary(true);
      fetchNews([...PRIMARY_FEEDS, ...SECONDARY_FEEDS]);
    }
  }, [displayLimit, news.length, hasLoadedSecondary, fetchNews]);

  return (
    <div className="relative min-h-screen bg-[#0B1120]">
      {/* Decorative Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] bg-red-500/5 rounded-full blur-[100px] sm:blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-56 h-56 sm:w-72 sm:h-72 md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] bg-red-800/5 rounded-full blur-[80px] sm:blur-[100px]" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            variants={slideUp}
            initial="hidden"
            animate="visible"
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-red-500/10 border border-red-500/30 mb-8">
                <div className="relative flex items-center justify-center w-2.5 h-2.5">
                  <div className={`absolute w-full h-full rounded-full bg-red-500 ${isLive ? 'animate-ping' : ''}`} />
                  <div className="relative w-2 h-2 rounded-full bg-red-500" />
                </div>
                <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest">LIVE FEED</span>
              </div>

              {/* Title */}
              <div className="flex items-center justify-center mb-6">
                <Globe className="w-10 h-10 md:w-12 md:h-12 text-red-500 mr-4" />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight">
                  Global Cyber <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">News</span>
                </h1>
              </div>

              <p className="text-slate-400 text-base sm:text-lg mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
                Real-time monitoring of global threats, zero-day vulnerabilities, and security breaches.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={staggerItem} className="bg-[#0f172a] rounded-sm px-6 py-4 border border-white/5 hover:border-red-500/50 transition-colors min-w-[140px]">
                <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1">Live Articles</div>
                <div className="text-2xl font-black text-white font-mono">{stats.total}</div>
              </motion.div>

              <motion.div variants={staggerItem} className="bg-[#0f172a] rounded-sm px-6 py-4 border border-white/5 hover:border-red-500/50 transition-colors min-w-[140px]">
                <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1">Critical Threats</div>
                <div className="text-2xl font-black text-red-500 font-mono">{stats.high}</div>
              </motion.div>

              <motion.div variants={staggerItem} className="bg-[#0f172a] rounded-sm px-6 py-4 border border-white/5 hover:border-red-500/50 transition-colors min-w-[140px]">
                <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1">Active Sources</div>
                <div className="text-2xl font-black text-red-400 font-mono">{stats.sources}</div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-end mb-8 z-20 relative">
            <div className="relative flex-1 md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-[42px] pl-10 pr-4 rounded-sm bg-[#0f172a] border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500/50 transition-all font-mono"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative w-full md:w-64" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full h-[42px] flex items-center justify-between px-4 rounded-sm bg-[#0f172a] border border-white/10 text-sm text-white focus:outline-none focus:border-red-500/50 hover:bg-white/[0.08] transition-all font-mono"
              >
                <span className="truncate">{categories.find(c => c.value === filterCategory)?.label || 'All News'}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-[#0B1120]/95 backdrop-blur-md border border-white/20 rounded-sm shadow-xl overflow-hidden z-50"
                  >
                    <div className="py-1 max-h-60 overflow-y-auto">
                      {categories.map((cat) => (
                        <button
                          key={cat.value}
                          onClick={() => {
                            setFilterCategory(cat.value);
                            setIsDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2.5 text-sm font-mono text-left text-slate-300 hover:text-white hover:bg-white/[0.05] transition-colors flex items-center justify-between"
                        >
                          <span>{cat.label}</span>
                          {filterCategory === cat.value && (
                            <Check className="w-3.5 h-3.5 text-red-400" />
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Content */}
          {loading && news.length === 0 ? (
            // OPTIMIZATION: Skeleton loading instead of spinner
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-20">
              <Shield className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No news found matching your criteria.</p>
            </div>
          ) : (
            <>
              {/* News Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredNews.map((item) => (
                    <motion.a
                      key={item.id}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="group block h-full"
                    >
                      <div className="bg-[#0f172a] rounded-sm overflow-hidden border border-white/5 hover:border-red-500/50 transition-all duration-300 h-full flex flex-col group-hover:-translate-y-1 shadow-md">
                        {/* Image */}
                        {item.imageUrl && (
                          <div className="relative h-40 overflow-hidden">
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              loading="lazy"
                              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100 grayscale-[30%] group-hover:grayscale-0"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                            <div className="absolute inset-0 bg-[#0B1120]/40 group-hover:bg-transparent transition-colors duration-500 z-10" />

                            {/* Time Badge */}
                            <div className="absolute bottom-3 right-3 px-2 py-1 rounded-sm bg-[#0B1120]/80 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold tracking-widest text-slate-300 flex items-center gap-1.5 z-20 uppercase">
                              <Clock className="w-3 h-3 text-red-500" />
                              {item.displayTime}
                            </div>
                          </div>
                        )}

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col">
                          {/* Category */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-sm text-[10px] uppercase font-mono font-bold tracking-widest border ${getCategoryColor(item.category)}`}>
                                {item.category}
                              </span>
                            </div>
                            {item.severity === 'high' && (
                              <span className="flex items-center gap-1 px-2 py-0.5 rounded-sm text-[9px] font-mono font-bold bg-red-500/10 border border-red-500/30 text-red-500 animate-pulse uppercase tracking-widest">
                                <AlertTriangle className="w-3 h-3" />
                                CRITICAL
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-red-400 transition-colors uppercase tracking-tight">
                            {item.title}
                          </h3>

                          {/* Summary */}
                          <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-3">
                            {item.summary}
                          </p>

                          {/* Footer */}
                          <div className="mt-auto flex items-center justify-between text-[11px] text-slate-500 pt-4 border-t border-white/5 font-mono">
                            <div className="flex items-center gap-1.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                              <span className="font-bold text-slate-400 uppercase tracking-wider">{item.source}</span>
                            </div>

                            <div className="flex items-center gap-1 font-bold text-red-400 group-hover:translate-x-1 transition-transform uppercase tracking-wider">
                              Read <ExternalLink className="w-3 h-3" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </AnimatePresence>
              </div>

              {/* Load More Button */}
              {hasMoreItems && (
                <div className="flex justify-center mt-12">
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={handleLoadMore}
                    className="flex items-center justify-center gap-2 px-8 py-3 rounded-sm bg-red-600 hover:bg-red-700 font-bold uppercase tracking-wide text-white transition-all group"
                  >
                    <span>Load More News</span>
                    <LoadMoreIcon className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                  </motion.button>
                </div>
              )}
            </>
          )}

          {/* Footer */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] border border-white/5 text-xs text-gray-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              System Status: Online • Syncing with global threat feeds
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
