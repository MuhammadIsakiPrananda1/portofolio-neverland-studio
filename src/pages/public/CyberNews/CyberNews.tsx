import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Search,
  ExternalLink,
  Clock,
  AlertTriangle,
  Bug,
  Lock,
  Eye,
  TrendingUp,
  Rss,

  ChevronDown,
  Globe,
  Check,
  RefreshCw
} from 'lucide-react';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';

interface NewsItem {
  id: string;
  title: string;
  link: string;
  summary: string;
  published: string; // ISO string for sorting
  displayTime: string; // Relative time for display
  source: string;
  category: 'breach' | 'vulnerability' | 'malware' | 'exploit' | 'ai' | 'revenue' | 'research' | 'general';
  imageUrl?: string;
  severity: 'high' | 'medium' | 'low';
}

const RSS_FEEDS = [
  { url: "https://rss.app/feeds/NtWv90XXBqU6xsdZ.xml", source: "Enterprise Technology News", category: 'general' },
  { url: "https://www.darkreading.com/rss.xml", source: "Dark Reading", category: 'general' },
  { url: "https://news.sophos.com/en-us/feed/", source: "Sophos News", category: 'general' },
  { url: "https://grahamcluley.com/feed/", source: "Graham Cluley", category: 'general' },
  { url: "https://portswigger.net/daily-swig/rss", source: "Daily Swig", category: 'general' },
  { url: "https://www.csoonline.com/feed/", source: "CSO Online", category: 'general' },
  { url: "https://rss.app/feeds/bPZVlkOPLeSy1DTf.xml", source: "Security | TechRepublic", category: 'general' },
  { url: "https://www.cybersecuritydive.com/feeds/news/", source: "Cybersecurity Dive", category: 'general' },
  { url: "https://www.wired.com/feed/category/security/latest/rss", source: "Wired Security", category: 'general' },
  { url: "https://www.cyberdefenseinsight.com/feeds/posts/default", source: "Cyber Defense Insight", category: 'general' },
  { url: "https://cyberscoop.com/feed/", source: "CyberScoop", category: 'general' },
  { url: "https://www.hackread.com/feed/", source: "Hackread", category: 'general' },
  { url: "https://www.helpnetsecurity.com/feed/", source: "Help Net Security", category: 'general' },
  { url: "https://rss.app/feeds/1YNmv0pH9snsACKJ.xml", source: "CyberWire", category: 'general' },
  { url: "https://www.databreachtoday.com/rss-feeds", source: "DataBreachToday", category: 'general' },
  { url: "https://www.bankinfosecurity.com/rss-feeds", source: "Bank Info Security", category: 'general' },
  { url: "https://malware.news/c/news/8.rss", source: "Malware News", category: 'malware' },
  { url: "https://thecyberexpress.com/feed/", source: "The Cyber Express", category: 'general' },
  { url: "https://cybersecuritynews.com/feed/", source: "Cybersecurity News", category: 'general' },
  { url: "https://www.msspalert.com/feed/topic/latest", source: "MSSP Alert", category: 'general' },
  { url: "https://krebsonsecurity.com/feed/", source: "Krebs on Security", category: 'general' },
  { url: "https://www.bellingcat.com/category/news/feed/", source: "Bellingcat News", category: 'general' },
  { url: "https://www.cio.com/security/feed/", source: "Security | CIO", category: 'general' },
  { url: "https://www.hackmageddon.com/feed/", source: "Hackmageddon", category: 'general' },
  { url: "https://gbhackers.com/feed/", source: "GBHackers Security", category: 'general' },
  { url: "https://feeds.feedburner.com/TheHackersNews", source: "The Hacker News", category: 'general' },
  { url: "https://www.bleepingcomputer.com/feed/", source: "BleepingComputer", category: 'general' },
  { url: "https://securityaffairs.co/wordpress/feed", source: "Security Affairs", category: 'general' },
  { url: "https://threatpost.com/feed/", source: "Threatpost", category: 'general' },
  { url: "https://www.zdnet.com/topic/security/rss.xml", source: "ZDNet Security", category: 'general' },
  { url: "https://www.infosecurity-magazine.com/rss/news/", source: "Infosecurity Magazine", category: 'general' },
  { url: "https://www.securityweek.com/feed/", source: "SecurityWeek", category: 'general' },
  { url: "https://rss.app/feeds/CnNSVChyk4iMi2g2.xml", source: "Reuters Security", category: 'general' },
  { url: "https://rss.app/feeds/uY5nOpUNz7YY4dZh.xml", source: "Daily Dark Web", category: 'general' },
  { url: "https://rss.app/feeds/JdKBkRcAtmDfU8YC.xml", source: "Secureworks Blog", category: 'general' },
  { url: "https://cyberpress.org/feed/", source: "CyberPress", category: 'general' },
  { url: "https://4sysops.com/feed/", source: "4sysops", category: 'general' },
  { url: "https://feed.infoq.com/", source: "InfoQ", category: 'general' },
  { url: "https://www.govinfosecurity.com/rss-feeds", source: "Gov Info Security", category: 'general' },
  { url: "https://www.blackhillsinfosec.com/feed/", source: "Black Hills InfoSec", category: 'general' },
  { url: "https://www.malwarebytes.com/blog/feed/index.xml", source: "Malwarebytes Blog", category: 'malware' },
  { url: "https://thenewstack.io/blog/feed/", source: "The New Stack", category: 'general' },
  { url: "https://cyble.com/feed/", source: "Cyble", category: 'general' },
  { url: "https://securelist.com/feed/", source: "Securelist", category: 'general' },
  { url: "https://rss.app/feeds/OIBWrjqdXF46RxDG.xml", source: "Cyber News Updates", category: 'general' },
  { url: "https://www.cisa.gov/cybersecurity-advisories/all.xml", source: "CISA Advisories", category: 'vulnerability' },
  { url: "https://redcanary.com/blog/feed/", source: "Red Canary Blog", category: 'general' },
  { url: "https://flashpoint.io/blog/feed/", source: "Flashpoint Blog", category: 'general' },
  { url: "https://www.cronup.com/investigaciones/feed/", source: "CronUp Investigations", category: 'general' },
  { url: "https://darkwebinformer.com/rss/", source: "Dark Web Informer", category: 'general' }
];

const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json';

const getRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
};

const getCategoryInfo = (title: string, summary: string): { category: NewsItem['category'], severity: NewsItem['severity'], icon: React.ReactNode } => {
  const text = (title + ' ' + summary).toLowerCase();

  // Severity Logic
  let severity: NewsItem['severity'] = 'low';
  if (text.includes('breach') || text.includes('ransomware') || text.includes('exploit') || text.includes('critical') || text.includes('zero-day')) {
    severity = 'high';
  } else if (text.includes('vulnerability') || text.includes('update') || text.includes('patch') || text.includes('warning')) {
    severity = 'medium';
  }

  // Category Logic
  if (text.includes('breach') || text.includes('leak') || text.includes('compromis')) {
    return { category: 'breach', severity: 'high', icon: <AlertTriangle className="w-3.5 h-3.5" /> };
  }
  if (text.includes('vulnerability') || text.includes('zero-day') || text.includes('cve-')) {
    return { category: 'vulnerability', severity: 'high', icon: <Bug className="w-3.5 h-3.5" /> };
  }
  if (text.includes('ransomware') || text.includes('malware') || text.includes('trojan') || text.includes('virus')) {
    return { category: 'malware', severity: 'high', icon: <Lock className="w-3.5 h-3.5" /> };
  }
  if (text.includes('exploit') || text.includes('attack') || text.includes('payload')) {
    return { category: 'exploit', severity: 'high', icon: <TrendingUp className="w-3.5 h-3.5" /> };
  }
  if (text.includes('ai') || text.includes('artificial intelligence') || text.includes('machine learning') || text.includes('deep learning')) {
    return { category: 'ai', severity: 'low', icon: <Eye className="w-3.5 h-3.5" /> };
  }
  if (text.includes('revenue') || text.includes('funding') || text.includes('investment') || text.includes('profit')) {
    return { category: 'revenue', severity: 'low', icon: <TrendingUp className="w-3.5 h-3.5" /> };
  }
  if (text.includes('research') || text.includes('study') || text.includes('report') || text.includes('analysis')) {
    return { category: 'research', severity: 'low', icon: <Shield className="w-3.5 h-3.5" /> };
  }

  return { category: 'general', severity, icon: <Rss className="w-3.5 h-3.5" /> };
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
      summary: 'Security researchers have identified a critical zero-day vulnerability affecting millions of users worldwide. The vulnerability allows remote code execution and is being actively exploited in the wild.',
      published: today.toISOString(),
      displayTime: 'Just now',
      source: 'The Hacker News',
      category: 'vulnerability',
      severity: 'high',
      imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070'
    },
    {
      id: 'sample-2',
      title: 'Major Ransomware Attack Targets Healthcare Organizations',
      link: 'https://www.bleepingcomputer.com/',
      summary: 'A sophisticated ransomware campaign is targeting healthcare institutions globally, encrypting patient records and disrupting medical services. Security experts urge immediate patching.',
      published: new Date(today.getTime() - 1000 * 60 * 30).toISOString(), // 30 mins ago
      displayTime: '30 minutes ago',
      source: 'BleepingComputer',
      category: 'malware',
      severity: 'high',
      imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1470'
    },
    {
      id: 'sample-3',
      title: 'AI-Powered Phishing Attacks Surge in 2026',
      link: 'https://krebsonsecurity.com/',
      summary: 'Cybercriminals are increasingly using artificial intelligence to create highly convincing phishing emails that bypass traditional security filters.',
      published: new Date(today.getTime() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      displayTime: '2 hours ago',
      source: 'Krebs on Security',
      category: 'ai',
      severity: 'medium',
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1470'
    },
    {
      id: 'sample-4',
      title: 'Global Tech Giant Suffers Massive Data Breach',
      link: 'https://www.darkreading.com/',
      summary: 'A leading technology company has disclosed a data breach exposing sensitive customer information. Initial investigations point to a compromised third-party vendor.',
      published: new Date(today.getTime() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
      displayTime: '4 hours ago',
      source: 'Dark Reading',
      category: 'breach',
      severity: 'high',
      imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=1470'
    },
    {
      id: 'sample-5',
      title: 'New Encrypted Malware Variant Evades Detection',
      link: 'https://threatpost.com/',
      summary: 'Researchers have analyzed a new strain of malware that uses advanced encryption techniques to hide its payload from standard antivirus software.',
      published: new Date(today.getTime() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
      displayTime: '6 hours ago',
      source: 'Threatpost',
      category: 'research',
      severity: 'medium',
      imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=1470'
    }
  ];
};

export default function CyberNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isLive, setIsLive] = useState(false);
  const [, setCurrentTime] = useState(new Date());

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Pulse effect for live badge & clock update
  useEffect(() => {
    const timer = setInterval(() => {
      setIsLive(prev => !prev);
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchNews = useCallback(async () => {
    // Only set loading on first fetch
    if (news.length === 0) setLoading(true);
    setIsRefreshing(true);

    // Add cache busting timestamp
    const timestamp = Date.now();

    // FETCH STRATEGY: High Volume Mode
    // 1. Initial Load: Fetch 40 feeds to populate massive initial data
    // 2. Updates: Fetch 30 feeds every cycle
    // 3. Buffer: Keep up to 1000 items

    const BATCH_SIZE = news.length === 0 ? 40 : 30;

    // Shuffle and pick feeds
    const shuffledFeeds = [...RSS_FEEDS].sort(() => 0.5 - Math.random());
    const selectedFeeds = shuffledFeeds.slice(0, BATCH_SIZE);

    try {
      // Fetch feeds in parallel
      const feedPromises = selectedFeeds.map(async (feed) => {
        try {
          const response = await fetch(`${RSS2JSON_API}?rss_url=${encodeURIComponent(feed.url)}&count=10&t=${timestamp}`, {
            signal: AbortSignal.timeout(10000)
          });

          if (!response.ok) return [];

          const data = await response.json();

          if (data.status === 'ok' && data.items) {
            return data.items.map((item: any, index: number) => {
              const { category, severity } = getCategoryInfo(item.title, item.description);
              const imageUrl = item.thumbnail || item.image || '';
              const cleanSummary = (item.description || '')
                .replace(/<[^>]*>/g, '')
                .replace(/&[^;]+;/g, ' ')
                .replace(/\s+/g, ' ')
                .trim()
                .slice(0, 300);

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
        } catch (error) {
          console.warn(`Error fetching ${feed.source}:`, error);
          return [];
        }
      });

      const results = await Promise.all(feedPromises);
      const newArticles = results.flat();

      if (newArticles.length > 0) {
        setNews(prevNews => {
          // Merge with existing news
          const combinedNews = [...newArticles, ...prevNews];

          // Remove duplicates based on title
          const uniqueNews = combinedNews.filter((item, index, self) =>
            index === self.findIndex((t) => t.title === item.title)
          );

          // Sort by date (newest first)
          const sortedNews = uniqueNews.sort((a, b) => {
            const dateA = new Date(a.published).getTime();
            const dateB = new Date(b.published).getTime();
            return dateB - dateA;
          });

          // Keep up to 1000 to ensure we have "massive" items
          return sortedNews.slice(0, 1000);
        });
      } else if (news.length === 0) {
        // Fallback only if we still have absolutely nothing
        setNews(getSampleNews());
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      if (news.length === 0) setNews(getSampleNews());
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []); // Remove dependency on news to avoid re-creating function unnecessarily

  // Initial fetch
  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // Real-time update interval (every 30 seconds for aggressive updates)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchNews();
      // Update relative times without re-fetching
      setNews(currentNews => currentNews.map(item => ({
        ...item,
        displayTime: getRelativeTime(item.published)
      })));
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [fetchNews]);

  useEffect(() => {
    let filtered = news;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.source.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(item => item.category === filterCategory);
    }

    setFilteredNews(filtered);
  }, [searchTerm, filterCategory, news]);

  // ... (keep categories and stats logic)
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

  return (
    <div className="relative min-h-screen bg-[#0B1120]">
      {/* Decorative Background Elements */}
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
                <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest">LIVE INTELLIGENCE FEED</span>
              </div>

              {/* Title */}
              <div className="flex items-center justify-center mb-6">
                <Globe className="w-10 h-10 md:w-12 md:h-12 text-red-500 mr-4" />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight">
                  Global Cyber <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">News</span>
                </h1>
              </div>

              {/* Subtitle */}
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
              {/* Total Articles */}
              <motion.div variants={staggerItem} className="bg-[#0f172a] rounded-sm px-6 py-4 border border-white/5 hover:border-red-500/50 transition-colors duration-300 min-w-[140px]">
                <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1">Live Articles</div>
                <div className="text-2xl font-black text-white font-mono">{stats.total}</div>
              </motion.div>

              {/* High Severity */}
              <motion.div variants={staggerItem} className="bg-[#0f172a] rounded-sm px-6 py-4 border border-white/5 hover:border-red-500/50 transition-colors duration-300 min-w-[140px]">
                <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1">Critical Threats</div>
                <div className="text-2xl font-black text-red-500 font-mono">{stats.high}</div>
              </motion.div>

              {/* Sources */}
              <motion.div variants={staggerItem} className="bg-[#0f172a] rounded-sm px-6 py-4 border border-white/5 hover:border-red-500/50 transition-colors duration-300 min-w-[140px]">
                <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1">Active Sources</div>
                <div className="text-2xl font-black text-red-400 font-mono">{stats.sources}</div>
              </motion.div>


            </motion.div>
          </motion.div>

          {/* Filters & Refresh Control */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 z-20 relative">
            {/* Search & Refresh Group */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search live feed..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-[42px] pl-10 pr-4 rounded-sm bg-[#0f172a] border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500/50 transition-all font-mono"
                />
              </div>

              <button
                onClick={() => fetchNews()}
                disabled={isRefreshing}
                className="flex h-[42px] items-center justify-center gap-2 px-5 rounded-sm bg-red-600 hover:bg-red-700 font-bold uppercase tracking-wide text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap group"
              >
                <RefreshCw className={`w-4 h-4 group-hover:rotate-180 transition-transform duration-500 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline text-xs">{isRefreshing ? 'Updating...' : 'Update'}</span>
              </button>
            </div>

            {/* Dropdown Filter */}
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
                    className="absolute top-full text-left left-0 right-0 mt-2 bg-[#0B1120] border border-white/10 rounded-sm shadow-xl overflow-hidden z-50"
                  >
                    <div className="py-1 max-h-60 overflow-y-auto">
                      {categories.map((cat) => (
                        <button
                          key={cat.value}
                          onClick={() => {
                            setFilterCategory(cat.value);
                            setIsDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2.5 text-sm font-mono text-left text-slate-300 hover:text-white hover:bg-white/[0.05] transition-colors flex items-center justify-between group"
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
        </div>

        {/* Loading State */}
        {loading && news.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-400 animate-pulse">Establishing secure connection to global feeds...</p>
            </div>
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center py-20">
            <Shield className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No news found matching your criteria.</p>
          </div>
        ) : (
          /* News Grid */
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

                        {/* Absolute Time Badge */}
                        <div className="absolute bottom-3 right-3 px-2 py-1 rounded-sm bg-[#0B1120]/80 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold tracking-widest text-slate-300 flex items-center gap-1.5 z-20 uppercase">
                          <Clock className="w-3 h-3 text-red-500" />
                          {item.displayTime}
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Category & Severity */}
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
                          Read Report <ExternalLink className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] border border-white/5 text-xs text-gray-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            System Status: Online • Auto-syncing with global threat feeds
          </div>
        </div>
      </div>
    </div>
  );
}
