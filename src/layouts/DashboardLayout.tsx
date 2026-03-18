/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * DASHBOARD LAYOUT COMPONENT
 * ═══════════════════════════════════════════════════════════════════════════════
 * Main layout wrapper for the admin dashboard with features:
 * - Grouped sidebar navigation by functional domain (Overview, Workspace, People, etc.)
 * - Collapsible navigation groups with smooth animations
 * - Sticky top header with search, clock, notifications, and profile menu
 * - Background grid pattern and ambient glow effects
 * - Mobile-responsive with slide-in drawer
 * - Authentication guard (redirects to login if not authenticated)
 * - Active route detection and highlighting
 *
 * Layout Structure:
 * ├── Desktop Sidebar (fixed left panel)
 * ├── Mobile Header (hamburger, backdrop, drawer)
 * ├── Main Content Area
 * │   ├── Sticky Header (title, search, notifications, profile)
 * │   │   └── Profile Dropdown Menu
 * │   ├── Background Effects (grid, glow)
 * │   └── Page Content
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// ──────────────────────────────────────────────────────────────────────────────
// LUCIDE ICONS — Organized by category/function
// ──────────────────────────────────────────────────────────────────────────────
import {
  // Navigation & Toggle
  Menu,
  X,
  ChevronDown,
  // Dashboard Views
  LayoutDashboard,
  BarChart3,
  // Workspace Items
  FolderKanban,
  CheckSquare,
  Briefcase,
  // People Items
  Users,
  User,
  // Operations Items
  MessageSquare,
  CreditCard,
  Calendar,
  Clock,
  // Resources Items
  FileText,
  FolderOpen,
  Settings,
  // Top Bar
  Search,
  Bell,
  LogOut,
  Home,
} from "lucide-react";

// ──────────────────────────────────────────────────────────────────────────────
// CONFIGURATION & SERVICES
// ──────────────────────────────────────────────────────────────────────────────
import { Routes, COMPANY_INFO } from "@config/constants";
import DashboardLogin from "@pages/Dashboard/DashboardLogin";
import logoImage from "@/assets/logo.webp";
import { useAuth } from "@/contexts/AuthContext";



// ═══════════════════════════════════════════════════════════════════════════════
// TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * NavItem — Individual navigation item within a group
 * @property id — Unique identifier for the item
 * @property path — URL path to navigate to
 * @property label — Display text shown in UI
 * @property icon — Lucide icon component
 * @property subItems — Optional nested items (currently unused but available for expansion)
 */
interface NavItem {
  id: string;
  path: string;
  label: string;
  icon: React.ElementType;
  subItems?: NavItem[];
}

/**
 * NavGroup — A collapsible group/section of navigation items
 * @property title — Group header text (displayed as collapse toggle)
 * @property items — Array of navigation items in this group
 */
interface NavGroup {
  title: string;
  items: NavItem[];
}

/**
 * SidebarContentProps — Props for the shared SidebarContent component
 * Passed to both desktop and mobile sidebar instances to avoid JSX duplication
 */
interface SidebarContentProps {
  activePath: string;
  expandedGroups: string[];
  onToggleGroup: (title: string) => void;
  onLogout: () => void;
  onNavigate?: () => void;
}

// ═══════════════════════════════════════════════════════════════════════════════
// NAVIGATION DATA
// ═══════════════════════════════════════════════════════════════════════════════
//
// Dashboard navigation is organized into 5 functional domains:
// 1. OVERVIEW — High-level dashboard views (Dashboard, Analytics)
// 2. WORKSPACE — Core business items (Projects, Tasks, Services)
// 3. PEOPLE — Team and client management
// 4. OPERATIONS — Transactional features (Invoices, Calendar, Messages)
// 5. RESOURCES — Documentation and configuration (Reports, Settings)
//
// Each group can be independently expanded/collapsed.
// All groups start expanded to show users the full menu structure.
// ═══════════════════════════════════════════════════════════════════════════════

const dashboardNavGroups: NavGroup[] = [
  // ────────────────────────────────────────────────────────────────────────────
  // Overview Group — High-level dashboard metrics and insights
  // ────────────────────────────────────────────────────────────────────────────
  {
    title: "Overview",
    items: [
      {
        id: "overview",
        label: "Overview",
        icon: LayoutDashboard,
        path: "/dashboard",
      },
      {
        id: "analytics",
        label: "Analytics",
        icon: BarChart3,
        path: "/dashboard/analytics",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────────
  // Workspace Group — Core business and project management
  // ────────────────────────────────────────────────────────────────────────────
  {
    title: "Workspace",
    items: [
      {
        id: "projects",
        label: "Projects",
        icon: FolderKanban,
        path: "/dashboard/projects",
      },
      {
        id: "tasks",
        label: "Tasks",
        icon: CheckSquare,
        path: "/dashboard/tasks",
      },
      {
        id: "services",
        label: "Services",
        icon: Briefcase,
        path: "/dashboard/services",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────────
  // People Group — Team and client/customer relationships
  // ────────────────────────────────────────────────────────────────────────────
  {
    title: "People",
    items: [
      {
        id: "team",
        label: "Team",
        icon: Users,
        path: "/dashboard/team",
      },
      {
        id: "clients",
        label: "Clients",
        icon: User,
        path: "/dashboard/clients",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────────
  // Operations Group — Financial and scheduling functions
  // ────────────────────────────────────────────────────────────────────────────
  {
    title: "Operations",
    items: [
      {
        id: "invoices",
        label: "Invoices",
        icon: CreditCard,
        path: "/dashboard/invoices",
      },
      {
        id: "calendar",
        label: "Calendar",
        icon: Calendar,
        path: "/dashboard/calendar",
      },
      {
        id: "messages",
        label: "Messages",
        icon: MessageSquare,
        path: "/dashboard/messages",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────────
  // Resources Group — Documentation, reports, and configuration
  // ────────────────────────────────────────────────────────────────────────────
  {
    title: "Resources",
    items: [
      {
        id: "reports",
        label: "Reports",
        icon: FileText,
        path: "/dashboard/reports",
      },
      {
        id: "resources",
        label: "Resources",
        icon: FolderOpen,
        path: "/dashboard/resources",
      },
      {
        id: "settings",
        label: "Settings",
        icon: Settings,
        path: "/dashboard/settings",
      },
    ],
  },
];


// ═══════════════════════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════
// Organized from smallest (simple UI) to larger (composite components).
// ═══════════════════════════════════════════════════════════════════════════════

// ──────────────────────────────────────────────────────────────────────────────
// MenuItem — Single navigation list item with link and indicators
// ──────────────────────────────────────────────────────────────────────────────
// Features:
// - Left accent bar indicates active item
// - Right dot indicator shows selected state
// - Icon and label with smooth transitions
// - Calls onNavigate callback for mobile drawer close
// ──────────────────────────────────────────────────────────────────────────────

interface MenuItemProps {
  item: NavItem;
  isActive: boolean;
  onNavigate?: () => void;
}

function MenuItem({ item, isActive, onNavigate }: MenuItemProps) {
  const Icon = item.icon;
  return (
    <Link to={item.path} onClick={onNavigate}>
      <div
        className={`
          relative flex items-center justify-between gap-2 px-3 py-2.5 rounded-sm
          transition-all duration-200 group cursor-pointer
          ${
            isActive
              ? "bg-red-500/10 border border-red-500/30 text-white"
              : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
          }
        `}
      >
        {/* Left accent bar — indicates active item */}
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-red-500 rounded-r-full" />
        )}

        {/* Icon + label */}
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <Icon
            className={`
              w-4 h-4 flex-shrink-0 transition-colors
              ${isActive ? "text-red-400" : "group-hover:text-red-400"}
            `}
          />
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest truncate">
            {item.label}
          </span>
        </div>

        {/* Right indicator — active dot */}
        {isActive && (
          <div className="w-1.5 h-1.5 rounded-sm bg-red-500 flex-shrink-0" />
        )}
      </div>
    </Link>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// NavGroupSection — Collapsible group containing multiple menu items
// ──────────────────────────────────────────────────────────────────────────────
// Features:
// - Clickable header that toggles expand/collapse
// - Animated height transition for smooth open/close
// - Shows all items when expanded
// - Divider separates this group from the next (except last group)
// ──────────────────────────────────────────────────────────────────────────────

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
      {/* Group header — acts as collapse/expand toggle */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3 py-2 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest hover:text-slate-300 transition-colors"
        aria-expanded={isExpanded}
      >
        <span>{group.title}</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Group items — animated height transition for smooth expand/collapse */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
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

      {/* Group divider — omitted after last group */}
      {!isLastGroup && <div className="mx-3 my-2 h-px bg-white/5" />}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// SidebarNav — Main scrollable navigation area
// ──────────────────────────────────────────────────────────────────────────────
// Renders all navigation groups stacked vertically in a scrollable container.
// Each group is independently expandable/collapsible.
// ──────────────────────────────────────────────────────────────────────────────

interface SidebarNavProps {
  activePath: string;
  expandedGroups: string[];
  onToggleGroup: (title: string) => void;
  onNavigate?: () => void;
}

function SidebarNav({
  activePath,
  expandedGroups,
  onToggleGroup,
  onNavigate,
}: SidebarNavProps) {
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

// ──────────────────────────────────────────────────────────────────────────────
// SidebarLogo — Branding section at the top of the sidebar
// ──────────────────────────────────────────────────────────────────────────────
// Displays company logo, name, and "Admin Panel" label.
// Located in a fixed position at the top of both desktop and mobile sidebars.
// ──────────────────────────────────────────────────────────────────────────────

function SidebarLogo() {
  return (
    <div className="p-5 border-b border-white/10 flex-shrink-0">
      <div className="flex items-center gap-3">
        {/* Logo icon */}
        <div className="w-10 h-10 rounded-sm bg-red-500/10 border border-red-500/30 flex items-center justify-center flex-shrink-0">
          <img
            src={logoImage}
            alt={COMPANY_INFO.name}
            loading="lazy"
            className="w-7 h-7 object-contain rounded-sm"
          />
        </div>

        {/* Company name + label */}
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

// ──────────────────────────────────────────────────────────────────────────────
// SidebarFooter — Quick action buttons pinned to the bottom
// ──────────────────────────────────────────────────────────────────────────────
// Contains "Back to Site" link and "Logout" button.
// Located in a fixed position at the bottom of both desktop and mobile sidebars.
// ──────────────────────────────────────────────────────────────────────────────

interface SidebarFooterProps {
  onLogout: () => void;
  onNavigate?: () => void;
}

function SidebarFooter({ onLogout, onNavigate }: SidebarFooterProps) {
  return (
    <footer className="p-3 border-t border-white/10 flex-shrink-0 space-y-1.5">
      {/* Back to public site link */}
      <Link
        to={Routes.HOME}
        onClick={onNavigate}
        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-sm text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-200 group"
      >
        <Home className="w-4 h-4 group-hover:text-red-400 transition-colors" />
        <span className="text-[11px] font-mono font-bold uppercase tracking-widest">
          Back to Site
        </span>
      </Link>

      {/* Logout button */}
      <button
        onClick={onLogout}
        className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-sm bg-red-500/10 border border-red-500/30 hover:bg-red-500 hover:border-red-500 text-red-400 hover:text-white transition-all duration-200 group"
      >
        <LogOut className="w-4 h-4" />
        <span className="text-[11px] font-mono font-bold uppercase tracking-widest">
          Logout
        </span>
      </button>
    </footer>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// SidebarContent — Composite component combining all sidebar sections
// ──────────────────────────────────────────────────────────────────────────────
// Arranges Logo + Nav + Footer into a single reusable component.
// Used by both desktop static sidebar and mobile slide-in drawer to avoid
// duplicating ~300 lines of JSX between the two render paths.
//
// Structure: Logo (fixed top) → Nav (scrollable flex-1) → Footer (fixed bottom)
// ──────────────────────────────────────────────────────────────────────────────

function SidebarContent({
  activePath,
  expandedGroups,
  onToggleGroup,
  onLogout,
  onNavigate,
}: SidebarContentProps) {
  return (
    <>
      {/* Top accent line — visual design element */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-red-500 pointer-events-none" />

      {/* 1. Branding — company identity section (fixed top) */}
      <SidebarLogo />

      {/* 2. Navigation — main scrollable content area (flex-1) */}
      <SidebarNav
        activePath={activePath}
        expandedGroups={expandedGroups}
        onToggleGroup={onToggleGroup}
        onNavigate={onNavigate}
      />

      {/* 3. Utility actions — quick buttons (fixed bottom) */}
      <SidebarFooter onLogout={onLogout} onNavigate={onNavigate} />
    </>
  );
}


// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT — Dashboard Layout (Default Export)
// ═══════════════════════════════════════════════════════════════════════════════
//
// Root layout component that manages:
// - Authentication guard (show login if not authenticated)
// - Sidebar state (mobile open/close, expanded groups)
// - Profile menu state and user data
// - Active route detection for header title
// - Background effects and responsive design
//
// Structure:
// ├── Auth Guard → DashboardLogin if not authenticated
// ├── Desktop Sidebar (fixed left panel ≥lg)
// ├── Mobile Header (hamburger, backdrop, drawer <lg)
// ├── Main Content Area (with sticky header)
// │   ├── Header (title, search, clock, notifications, profile menu)
// │   ├── Background effects (grid, glow)
// │   └── Page children content
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * DashboardLayout — Main admin dashboard layout wrapper
 *
 * Props:
 * @param children — Page content to render in the main area
 *
 * Features:
 * - Authentication-gated (redirects to login if not authenticated)
 * - Responsive sidebar (desktop fixed, mobile drawer)
 * - Sticky header with page title and quick actions
 * - Navigation group expansion/collapse
 * - Active route detection and highlighting
 * - Profile dropdown menu with settings and logout
 * - Real-time clock display (updates every 30 seconds)
 * - Background grid pattern and ambient glow effects
 * - Full accessibility (ARIA labels, semantic HTML)
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ────────────────────────────────────────────────────────────────────────────
  // STATE MANAGEMENT
  // ────────────────────────────────────────────────────────────────────────────

  const [isOpen, setIsOpen] = useState(false); // Mobile drawer open/close
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Profile dropdown
  const [userPhoto, setUserPhoto] = useState<string | null>(null); // User avatar
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date()); // Clock display

  // Navigation groups expand/collapse state
  // All groups start expanded so users see the full menu structure
  const [expandedGroups, setExpandedGroups] = useState<string[]>(
    dashboardNavGroups.map((g) => g.title)
  );

  // ────────────────────────────────────────────────────────────────────────────
  // CONTEXT & HOOKS
  // ────────────────────────────────────────────────────────────────────────────

  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ────────────────────────────────────────────────────────────────────────────
  // DERIVED STATE
  // ────────────────────────────────────────────────────────────────────────────

  const userEmail = user?.email || "admin@neverland.studio";
  const userName = user?.name || "Admin Neverland";
  const isLoggedIn = isAuthenticated;

  /**
   * Resolve the currently active navigation item based on the current route.
   * Used to display the page title and icon in the top header.
   * Falls back to Dashboard if no match is found.
   */
  const activeItem = useMemo(() => {
    for (const group of dashboardNavGroups) {
      const match = group.items.find(
        (i) =>
          location.pathname === i.path ||
          location.pathname.startsWith(i.path + "/")
      );
      if (match) return match;
    }
    return {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    } as NavItem;
  }, [location.pathname]);

  const ActiveIcon = activeItem.icon;

  // ────────────────────────────────────────────────────────────────────────────
  // EFFECTS
  // ────────────────────────────────────────────────────────────────────────────

  /**
   * Effect 1: Update clock display every 30 seconds
   * Shows current time in the header's fixed time widget
   */
  useEffect(() => {
    intervalRef.current = setInterval(() => setLastUpdated(new Date()), 30_000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  /**
   * Effect 2: Load user profile photo from localStorage
   * Allows users to set a custom avatar in settings
   */
  useEffect(() => {
    const photo = localStorage.getItem("settings_profile_photo");
    if (photo) setUserPhoto(photo);
  }, []);

  /**
   * Effect 3: Notify external consumers when mobile drawer opens/closes
   * Fires 'mobileSidebarChange' custom event consumed by AILiveChat,
   * FloatingCartButton, and other components for blur effects
   */
  useEffect(() => {
    document.body.classList.toggle("mobile-sidebar-open", isOpen);
    window.dispatchEvent(
      new CustomEvent("mobileSidebarChange", { detail: { isOpen } })
    );
  }, [isOpen]);

  /**
   * Effect 4: Close mobile drawer when route changes
   * Ensures drawer auto-closes after user navigates to a new page
   */
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // ────────────────────────────────────────────────────────────────────────────
  // EVENT HANDLERS
  // ────────────────────────────────────────────────────────────────────────────

  /**
   * toggleGroup — Toggle expand/collapse for a navigation group
   * Allows users to show/hide entire sections of the sidebar menu
   */
  const toggleGroup = (title: string) => {
    setExpandedGroups((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  /**
   * handleLogout — Logout user and navigate to home page
   */
  const handleLogout = () => {
    logout();
    navigate(Routes.HOME);
  };

  // ────────────────────────────────────────────────────────────────────────────
  // AUTHENTICATION GUARD
  // ────────────────────────────────────────────────────────────────────────────

  // Redirect to login page if not authenticated
  if (!isLoggedIn) return <DashboardLogin />;

  // ────────────────────────────────────────────────────────────────────────────
  // COMPONENT PROPS
  // ────────────────────────────────────────────────────────────────────────────

  // Props passed to SidebarContent (used by both desktop and mobile)
  const sidebarProps: SidebarContentProps = {
    activePath: location.pathname,
    expandedGroups,
    onToggleGroup: toggleGroup,
    onLogout: handleLogout,
  };

  // ────────────────────────────────────────────────────────────────────────────
  // RENDER
  // ────────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#0B1120]">
      {/* ──────────────────────────────────────────────────────────────────────
          MOBILE: Hamburger Toggle Button
          Fixed at top-left, slides right when drawer opens
          ────────────────────────────────────────────────────────────────────── */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`lg:hidden fixed top-5 z-[60] p-2.5 rounded-sm bg-[#0f172a] border border-white/10
          hover:border-red-500/40 transition-all duration-200 shadow-lg
          ${isOpen ? "left-[264px]" : "left-4"}`}
        aria-label="Toggle sidebar"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <Menu className="w-5 h-5 text-white" />
        )}
      </button>

      {/* ──────────────────────────────────────────────────────────────────────
          MOBILE: Backdrop Overlay
          Click to close the drawer
          ────────────────────────────────────────────────────────────────────── */}
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

      {/* ──────────────────────────────────────────────────────────────────────
          DESKTOP: Static Sidebar
          Always visible on lg and larger screens
          ────────────────────────────────────────────────────────────────────── */}
      <aside
        className="hidden lg:flex fixed left-0 top-0 h-[100dvh] w-[280px]
          bg-[#0f172a] border-r border-white/10 z-50 flex-col overflow-hidden"
        aria-label="Dashboard sidebar"
      >
        <SidebarContent {...sidebarProps} />
      </aside>

      {/* ──────────────────────────────────────────────────────────────────────
          MOBILE: Slide-In Drawer
          Animated entrance/exit with framer-motion
          ────────────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            id="mobile-sidebar"
            className="lg:hidden fixed left-0 top-0 h-[100dvh] w-72
              bg-[#0f172a] border-r border-white/10 z-50 flex flex-col overflow-hidden"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            aria-label="Dashboard sidebar"
          >
            <SidebarContent
              {...sidebarProps}
              onNavigate={() => setIsOpen(false)}
            />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ──────────────────────────────────────────────────────────────────────
          MAIN CONTENT AREA
          Takes full width minus sidebar on desktop
          ────────────────────────────────────────────────────────────────────── */}
      <div className="lg:ml-[280px] flex flex-col min-h-screen">
        {/* Background Effects — decorative grid and glow */}
        <div className="fixed inset-0 pointer-events-none opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[130px]" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-red-500/3 rounded-full blur-[100px]" />
        </div>

        {/* Sticky Header — page title, search, clock, notifications, profile */}
        <header className="sticky top-0 h-16 bg-[#0f172a]/90 backdrop-blur-xl border-b border-white/10 z-20 flex items-center">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-red-500" />
          <div className="w-full px-4 lg:px-6 flex items-center justify-between gap-4">
            {/* Left: Active page title */}
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex w-8 h-8 rounded-sm bg-red-500/10 border border-red-500/30 items-center justify-center">
                <ActiveIcon className="w-4 h-4 text-red-400" />
              </div>
              <div className="hidden lg:block">
                <h1 className="text-sm font-black text-white uppercase tracking-wide">
                  {activeItem.label}
                </h1>
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  Admin Panel
                </p>
              </div>
            </div>

            {/* Center: Search input */}
            <div className="flex-1 max-w-sm hidden md:block">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 group-focus-within:text-red-400 transition-colors" />
                <input
                  type="text"
                  placeholder={`Search ${activeItem.label.toLowerCase()}...`}
                  className="w-full pl-9 pr-4 py-2 rounded-sm bg-[#0B1120] border border-white/10 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-red-500/40 transition-all duration-200"
                  aria-label={`Search ${activeItem.label.toLowerCase()}`}
                />
              </div>
            </div>

            {/* Right: Time, notifications, profile */}
            <div className="flex items-center gap-2">
              {/* Clock display — updates every 30 seconds */}
              <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm bg-[#0B1120] border border-white/10 text-slate-500 text-[10px] font-mono">
                <Clock className="w-3 h-3" />
                <span>
                  {lastUpdated.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {/* Notifications bell button */}
              <button
                aria-label="Notifications"
                className="relative p-2 rounded-sm bg-[#0B1120] border border-white/10 hover:border-red-500/40 transition-all duration-200 group"
              >
                <Bell className="w-4 h-4 text-slate-400 group-hover:text-red-400 transition-colors" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-sm border border-[#0f172a]" />
              </button>

              {/* Profile dropdown menu */}
              <div className="relative z-50">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-sm bg-[#0B1120] border border-white/10 hover:border-red-500/40 transition-all duration-200 group"
                  aria-label="Profile menu"
                  aria-expanded={isProfileOpen}
                >
                  <div className="w-7 h-7 rounded-sm bg-red-500/10 border border-red-500/30 flex items-center justify-center overflow-hidden">
                    {userPhoto ? (
                      <img
                        src={userPhoto}
                        alt="Profile"
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-3.5 h-3.5 text-red-400" />
                    )}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-[11px] font-mono font-bold text-white uppercase tracking-wide leading-none">
                      {userName || userEmail.split("@")[0]}
                    </p>
                    <p className="text-[9px] font-mono text-red-400 uppercase tracking-widest leading-none mt-0.5">
                      Admin
                    </p>
                  </div>
                  <ChevronDown className="w-3 h-3 text-slate-500 hidden md:block group-hover:text-slate-300 transition-colors" />
                </button>

                {/* Profile dropdown content */}
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
                        <p className="text-xs font-mono font-bold text-white uppercase tracking-wide">
                          {userName || "Admin"}
                        </p>
                        <p className="text-[10px] font-mono text-slate-500 mt-0.5 truncate">
                          {userEmail}
                        </p>
                      </div>
                      <div className="p-2 space-y-0.5">
                        <Link
                          to="/dashboard/settings"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-sm text-slate-400 hover:bg-white/5 hover:text-white transition-all duration-150 group"
                        >
                          <Settings className="w-3.5 h-3.5 group-hover:text-red-400 transition-colors" />
                          <span className="text-[11px] font-mono font-bold uppercase tracking-widest">
                            Settings
                          </span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-150 group"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span className="text-[11px] font-mono font-bold uppercase tracking-widest">
                            Logout
                          </span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content — renders children */}
        <main className="flex-1 p-4 lg:p-6 relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
}
