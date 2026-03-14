import { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, FolderKanban, MessageSquare, Settings, LogOut,
  Menu, X, User, Bell, Search, ChevronDown, Home, BarChart3,
  FileText, Users, Clock, Briefcase, CheckSquare, CreditCard,
  Calendar, FolderOpen,
} from 'lucide-react';
import { Routes, COMPANY_INFO } from '@config/constants';
import DashboardLogin from '@pages/Dashboard/DashboardLogin';
import logoImage from '@/assets/logo.webp';

// ─────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────

interface NavItem {
  id: string;
  path: string;
  label: string;
  icon: React.ElementType;
  subItems?: NavItem[];
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

// ─────────────────────────────────────────────────────────────────────
// Navigation data — grouped by functional domain
// ─────────────────────────────────────────────────────────────────────

const dashboardNavGroups: NavGroup[] = [
  {
    title: 'Overview',
    items: [
      { id: 'overview',  label: 'Overview',  icon: LayoutDashboard, path: '/dashboard' },
      { id: 'analytics', label: 'Analytics', icon: BarChart3,        path: '/dashboard/analytics' },
    ],
  },
  {
    title: 'Workspace',
    items: [
      { id: 'projects',  label: 'Projects',  icon: FolderKanban, path: '/dashboard/projects' },
      { id: 'tasks',     label: 'Tasks',     icon: CheckSquare,  path: '/dashboard/tasks' },
      { id: 'services',  label: 'Services',  icon: Briefcase,    path: '/dashboard/services' },
    ],
  },
  {
    title: 'People',
    items: [
      { id: 'team',    label: 'Team',    icon: Users, path: '/dashboard/team' },
      { id: 'clients', label: 'Clients', icon: User,  path: '/dashboard/clients' },
    ],
  },
  {
    title: 'Operations',
    items: [
      { id: 'invoices',  label: 'Invoices',  icon: CreditCard,    path: '/dashboard/invoices' },
      { id: 'calendar',  label: 'Calendar',  icon: Calendar,      path: '/dashboard/calendar' },
      { id: 'messages',  label: 'Messages',  icon: MessageSquare, path: '/dashboard/messages' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { id: 'reports',   label: 'Reports',   icon: FileText,   path: '/dashboard/reports' },
      { id: 'resources', label: 'Resources', icon: FolderOpen, path: '/dashboard/resources' },
      { id: 'settings',  label: 'Settings',  icon: Settings,   path: '/dashboard/settings' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────
// MenuItem — single navigation link row
// ─────────────────────────────────────────────────────────────────────

interface MenuItemProps {
  item: NavItem;
  isActive: boolean;
  /** Called after navigation (used by mobile to close the drawer) */
  onNavigate?: () => void;
}

function MenuItem({ item, isActive, onNavigate }: MenuItemProps) {
  const Icon = item.icon;
  return (
    <Link to={item.path} onClick={onNavigate}>
      <div
        className={`relative flex items-center justify-between gap-2 px-3 py-2.5 rounded-sm transition-all duration-200 group cursor-pointer
          ${isActive
            ? 'bg-red-500/10 border border-red-500/30 text-white'
            : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
          }`}
      >
        {/* Active indicator — left accent bar */}
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-red-500 rounded-r-full" />
        )}

        {/* Icon + label */}
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <Icon
            className={`w-4 h-4 flex-shrink-0 transition-colors
              ${isActive ? 'text-red-400' : 'group-hover:text-red-400'}`}
          />
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest truncate">
            {item.label}
          </span>
        </div>

        {/* Active dot */}
        {isActive && (
          <div className="w-1.5 h-1.5 rounded-sm bg-red-500 flex-shrink-0" />
        )}
      </div>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────────
// NavGroupSection — collapsible section with a labelled group header
// ─────────────────────────────────────────────────────────────────────

interface NavGroupSectionProps {
  group: NavGroup;
  isExpanded: boolean;
  isLastGroup: boolean;
  activePath: string;
  onToggle: () => void;
  onNavigate?: () => void;
}

function NavGroupSection({
  group,
  isExpanded,
  isLastGroup,
  activePath,
  onToggle,
  onNavigate,
}: NavGroupSectionProps) {
  return (
    <div className="mb-1">
      {/* Section header — acts as collapse toggle */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3 py-2 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest hover:text-slate-300 transition-colors"
      >
        <span>{group.title}</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Animated items list */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="space-y-0.5 mt-1 mb-2">
              {group.items.map((item) => (
                <MenuItem
                  key={item.path}
                  item={item}
                  isActive={activePath === item.path}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section divider — omitted after the last group */}
      {!isLastGroup && <div className="mx-3 my-2 h-px bg-white/5" />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// SidebarNav — scrollable navigation area with all grouped sections
// ─────────────────────────────────────────────────────────────────────

interface SidebarNavProps {
  activePath: string;
  expandedGroups: string[];
  onToggleGroup: (title: string) => void;
  /** Passed to every MenuItem; used by mobile to close the drawer */
  onNavigate?: () => void;
}

function SidebarNav({ activePath, expandedGroups, onToggleGroup, onNavigate }: SidebarNavProps) {
  return (
    <nav
      className="flex-1 py-4 px-3 overflow-y-auto custom-scrollbar min-h-0"
      aria-label="Dashboard navigation"
    >
      {dashboardNavGroups.map((group, index) => (
        <NavGroupSection
          key={group.title}
          group={group}
          isExpanded={expandedGroups.includes(group.title)}
          isLastGroup={index === dashboardNavGroups.length - 1}
          activePath={activePath}
          onToggle={() => onToggleGroup(group.title)}
          onNavigate={onNavigate}
        />
      ))}
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────
// SidebarLogo — branding / identity area at the top of the sidebar
// ─────────────────────────────────────────────────────────────────────

function SidebarLogo() {
  return (
    <div className="p-5 border-b border-white/10 flex-shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-sm bg-red-500/10 border border-red-500/30 flex items-center justify-center flex-shrink-0">
          <img
            src={logoImage}
            alt={COMPANY_INFO.name}
            loading="lazy"
            className="w-7 h-7 object-contain rounded-sm"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-white font-black text-sm uppercase tracking-wide leading-none">
            {COMPANY_INFO.name}
          </p>
          <p className="text-red-400 text-[10px] font-mono font-bold uppercase tracking-widest leading-none">
            Admin Panel
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// SidebarFooter — utility actions pinned to the bottom of the sidebar
// ─────────────────────────────────────────────────────────────────────

interface SidebarFooterProps {
  onLogout: () => void;
  onNavigate?: () => void;
}

function SidebarFooter({ onLogout, onNavigate }: SidebarFooterProps) {
  return (
    <footer className="p-3 border-t border-white/10 flex-shrink-0 space-y-1.5">
      {/* Back to public site */}
      <Link
        to={Routes.HOME}
        onClick={onNavigate}
        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-sm text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-200 group"
      >
        <Home className="w-4 h-4 group-hover:text-red-400 transition-colors" />
        <span className="text-[11px] font-mono font-bold uppercase tracking-widest">Back to Site</span>
      </Link>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-sm bg-red-500/10 border border-red-500/30 hover:bg-red-500 hover:border-red-500 text-red-400 hover:text-white transition-all duration-200 group"
      >
        <LogOut className="w-4 h-4" />
        <span className="text-[11px] font-mono font-bold uppercase tracking-widest">Logout</span>
      </button>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────
// SidebarContent — composes Logo + Nav + Footer into one reusable unit.
// Used by both the desktop static sidebar and the mobile slide-in drawer.
// ─────────────────────────────────────────────────────────────────────

interface SidebarContentProps {
  activePath: string;
  expandedGroups: string[];
  onToggleGroup: (title: string) => void;
  onLogout: () => void;
  /** Passed down to close the mobile drawer after navigation */
  onNavigate?: () => void;
}

function SidebarContent({
  activePath,
  expandedGroups,
  onToggleGroup,
  onLogout,
  onNavigate,
}: SidebarContentProps) {
  return (
    <>
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-red-500 pointer-events-none" />

      {/* 1. Branding */}
      <SidebarLogo />

      {/* 2. Navigation — takes all remaining vertical space */}
      <SidebarNav
        activePath={activePath}
        expandedGroups={expandedGroups}
        onToggleGroup={onToggleGroup}
        onNavigate={onNavigate}
      />

      {/* 3. Utility actions — pinned to the bottom */}
      <SidebarFooter onLogout={onLogout} onNavigate={onNavigate} />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────
// DashboardLayout — root layout; manages auth, sidebar, and top-bar state
// ─────────────────────────────────────────────────────────────────────

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // All groups start expanded so users immediately see every menu item
  const [expandedGroups, setExpandedGroups] = useState<string[]>(
    dashboardNavGroups.map(g => g.title)
  );

  const toggleGroup = (title: string) => {
    setExpandedGroups(prev =>
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Resolve the currently active nav item for the top-bar title + icon
  const activeItem = useMemo(() => {
    for (const group of dashboardNavGroups) {
      const match = group.items.find(
        i => location.pathname === i.path || location.pathname.startsWith(i.path + '/')
      );
      if (match) return match;
    }
    return { label: 'Dashboard', icon: LayoutDashboard } as NavItem;
  }, [location.pathname]);

  const ActiveIcon = activeItem.icon;

  // Refresh the clock in the top-bar every 30 s
  useEffect(() => {
    intervalRef.current = setInterval(() => setLastUpdated(new Date()), 30_000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  // Sync auth state from localStorage + listen for external changes
  useEffect(() => {
    const syncAuth = () => {
      const loggedIn = localStorage.getItem('dashboardLoggedIn') === 'true';
      const email    = localStorage.getItem('dashboardUserEmail');
      const name     = localStorage.getItem('dashboardUserName');
      const photo    = localStorage.getItem('settings_profile_photo');

      setIsLoggedIn(loggedIn);
      if (email) setUserEmail(email);
      if (name)  setUserName(name);
      setUserPhoto(photo);
    };

    syncAuth();
    window.addEventListener('dashboardLoginChanged', syncAuth);
    return () => window.removeEventListener('dashboardLoginChanged', syncAuth);
  }, []);

  // Notify the rest of the app when the mobile drawer opens / closes
  useEffect(() => {
    document.body.classList.toggle('mobile-sidebar-open', isOpen);
    window.dispatchEvent(
      new CustomEvent('mobileSidebarChange', { detail: { isOpen } })
    );
  }, [isOpen]);

  // Close mobile drawer on route change
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  // Guard: show login page when not authenticated
  if (!isLoggedIn) return <DashboardLogin />;

  const handleLogout = () => {
    ['dashboardLoggedIn', 'dashboardUserEmail', 'dashboardUserName',
      'dashboardProfile', 'dashboardRemember'].forEach(k => localStorage.removeItem(k));
    window.dispatchEvent(new Event('dashboardLoginChanged'));
    navigate(Routes.HOME);
  };

  // Shared props for SidebarContent used by both desktop and mobile
  const sidebarProps: SidebarContentProps = {
    activePath: location.pathname,
    expandedGroups,
    onToggleGroup: toggleGroup,
    onLogout: handleLogout,
  };

  return (
    <div className="min-h-screen bg-[#0B1120]">

      {/* ── Mobile: hamburger toggle button ───────────────────────── */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className={`lg:hidden fixed top-5 z-[60] p-2.5 rounded-sm bg-[#0f172a] border border-white/10
          hover:border-red-500/40 transition-all duration-200 shadow-lg
          ${isOpen ? 'left-[264px]' : 'left-4'}`}
        aria-label="Toggle sidebar"
      >
        {isOpen
          ? <X    className="w-5 h-5 text-white" />
          : <Menu className="w-5 h-5 text-white" />}
      </button>

      {/* ── Mobile: backdrop overlay ───────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/80 z-[45]"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* ── Desktop sidebar (always visible ≥ lg) ─────────────────── */}
      <aside
        className="hidden lg:flex fixed left-0 top-0 h-[100dvh] w-[280px]
          bg-[#0f172a] border-r border-white/10 z-50 flex-col overflow-hidden"
        aria-label="Dashboard sidebar"
      >
        <SidebarContent {...sidebarProps} />
      </aside>

      {/* ── Mobile sidebar (slide-in drawer) ──────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            id="mobile-sidebar"
            className="lg:hidden fixed left-0 top-0 h-[100dvh] w-72
              bg-[#0f172a] border-r border-white/10 z-50 flex flex-col overflow-hidden"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            aria-label="Dashboard sidebar"
          >
            <SidebarContent
              {...sidebarProps}
              onNavigate={() => setIsOpen(false)}
            />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="lg:ml-[280px] flex flex-col min-h-screen">
        {/* Grid Pattern Background */}
        <div className="fixed inset-0 pointer-events-none opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>
        {/* Ambient glow */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[130px]" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-red-500/3 rounded-full blur-[100px]" />
        </div>

        {/* Top Bar */}
        <header className="sticky top-0 h-16 bg-[#0f172a]/90 backdrop-blur-xl border-b border-white/10 z-20 flex items-center">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-red-500" />
          <div className="w-full px-4 lg:px-6 flex items-center justify-between gap-4">

            {/* Left: Page title */}
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex w-8 h-8 rounded-sm bg-red-500/10 border border-red-500/30 items-center justify-center">
                <ActiveIcon className="w-4 h-4 text-red-400" />
              </div>
              <div className="hidden lg:block">
                <h1 className="text-sm font-black text-white uppercase tracking-wide">{activeItem.label}</h1>
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Admin Panel</p>
              </div>
            </div>

            {/* Center: Search */}
            <div className="flex-1 max-w-sm hidden md:block">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 group-focus-within:text-red-400 transition-colors" />
                <input
                  type="text"
                  placeholder={`Search ${activeItem.label.toLowerCase()}...`}
                  className="w-full pl-9 pr-4 py-2 rounded-sm bg-[#0B1120] border border-white/10 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-red-500/40 transition-all duration-200"
                />
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">
              {/* Time */}
              <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm bg-[#0B1120] border border-white/10 text-slate-500 text-[10px] font-mono">
                <Clock className="w-3 h-3" />
                <span>{lastUpdated.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>

              {/* Bell */}
              <button aria-label="Notifications" className="relative p-2 rounded-sm bg-[#0B1120] border border-white/10 hover:border-red-500/40 transition-all duration-200 group">
                <Bell className="w-4 h-4 text-slate-400 group-hover:text-red-400 transition-colors" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-sm border border-[#0f172a]" />
              </button>

              {/* Profile */}
              <div className="relative z-50">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-sm bg-[#0B1120] border border-white/10 hover:border-red-500/40 transition-all duration-200 group"
                >
                  <div className="w-7 h-7 rounded-sm bg-red-500/10 border border-red-500/30 flex items-center justify-center overflow-hidden">
                    {userPhoto ? (
                      <img src={userPhoto} alt="Profile" loading="lazy" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-3.5 h-3.5 text-red-400" />
                    )}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-[11px] font-mono font-bold text-white uppercase tracking-wide leading-none">{userName || userEmail.split('@')[0]}</p>
                    <p className="text-[9px] font-mono text-red-400 uppercase tracking-widest leading-none mt-0.5">Admin</p>
                  </div>
                  <ChevronDown className="w-3 h-3 text-slate-500 hidden md:block group-hover:text-slate-300 transition-colors" />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-52 bg-[#0f172a] border border-white/10 rounded-sm shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden z-50"
                    >
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-red-500" />
                      <div className="p-3 border-b border-white/10">
                        <p className="text-xs font-mono font-bold text-white uppercase tracking-wide">{userName || 'Admin'}</p>
                        <p className="text-[10px] font-mono text-slate-500 mt-0.5 truncate">{userEmail}</p>
                      </div>
                      <div className="p-2 space-y-0.5">
                        <Link
                          to="/dashboard/settings"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-sm text-slate-400 hover:bg-white/5 hover:text-white transition-all duration-150 group"
                        >
                          <Settings className="w-3.5 h-3.5 group-hover:text-red-400 transition-colors" />
                          <span className="text-[11px] font-mono font-bold uppercase tracking-widest">Settings</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-150 group"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span className="text-[11px] font-mono font-bold uppercase tracking-widest">Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
}
