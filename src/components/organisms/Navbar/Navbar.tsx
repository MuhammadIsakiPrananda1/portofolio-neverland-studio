import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Briefcase,
  Users,
  FolderOpen,
  BookOpen,
  Mail,
  Shield,
  ChevronDown,
  HelpCircle,
  Code,
  CloudCog,
  Settings,
  Network,
  FileSearch,
  Cloud,
  Target,
  Server,
  Flag,
  Globe,
  ShoppingCart,
  Zap,
  Palette,
  Box,
  ArrowUpCircle,
  FileCode,
  TrendingDown,
  Headphones,
  Database,
  HardDrive,
  Layers,
  Activity,
  LogOut,
  Swords,
  MessageSquare,
  Library,
  Terminal,
  Lock,
  Cpu,
  Rss,
  Binary,
  Eye,
  Search,
  Smartphone,
  Bug,
  Map,
  FileText,
  Wrench,
  Handshake,
  Heart,
  BookMarked,
  Rocket,
  GraduationCap,
  Trophy,
  AlertTriangle,
} from "lucide-react";
import Logo from "@components/atoms/Logo";
import AuthModal from "@components/organisms/AuthModal";
import { Routes } from "@config/constants";
import logoImage from "@/assets/logo.webp";
import { useAuth } from "@/contexts/AuthContext";
import { authService } from "@/services/auth.service";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface NavItem {
  path: string;
  label: string;
  icon: any;
  subItems?: NavItem[];
}

// ─────────────────────────────────────────────────────────────────────────────
// findAncestorPaths — recursively walks the nav tree and returns the list of
// ancestor item paths for a given route. Used on mount / route change to
// automatically expand the correct groups so the active item is always visible.
// ─────────────────────────────────────────────────────────────────────────────

function findAncestorPaths(items: NavItem[], targetPath: string): string[] {
  for (const item of items) {
    if (!item.subItems) continue;
    if (item.subItems.some((s) => s.path === targetPath)) return [item.path];
    const nested = findAncestorPaths(item.subItems, targetPath);
    if (nested.length > 0) return [item.path, ...nested];
  }
  return [];
}

// ─────────────────────────────────────────────────────────────────────────────
// Navigation data — three groups with clear functional boundaries:
//   mainNavItems  — top-level pages  (Home, Services, Company, Portfolio)
//   hubItems      — learning / community resources
//   resourceItems — utility links    (Resources, Help, Settings)
// ─────────────────────────────────────────────────────────────────────────────

const mainNavItems: NavItem[] = [
  { path: Routes.HOME, label: "Home", icon: Home },
  {
    path: "#services",
    label: "Services",
    icon: Briefcase,
    subItems: [
      {
        path: "/services/cyber-security",
        label: "Cyber Security",
        icon: Shield,
        subItems: [
          { path: "/services/cyber-security", label: "Overview", icon: Shield },
          {
            path: "/services/penetration-testing",
            label: "Penetration Testing",
            icon: Target,
          },
          {
            path: "/services/security-audit",
            label: "Security Audit",
            icon: FileSearch,
          },
          {
            path: "/services/network-security",
            label: "Network Security",
            icon: Network,
          },
          {
            path: "/services/cloud-security",
            label: "Cloud Monitoring",
            icon: Cloud,
          },
          { path: "/services/ctf", label: "CTF Training", icon: Flag },
        ],
      },
      {
        path: "/services/web-development",
        label: "Web Development",
        icon: Code,
        subItems: [
          { path: "/services/web-development", label: "Overview", icon: Code },
          {
            path: "/services/custom-web-apps",
            label: "Custom Web Apps",
            icon: Globe,
          },
          {
            path: "/services/ecommerce",
            label: "E-Commerce",
            icon: ShoppingCart,
          },
          { path: "/services/pwa", label: "Progressive Web Apps", icon: Zap },
          {
            path: "/services/api-development",
            label: "API Development",
            icon: Box,
          },
          {
            path: "/services/ui-ux-design",
            label: "UI/UX Design",
            icon: Palette,
          },
        ],
      },
      {
        path: "/services/cloud-solutions",
        label: "Cloud Solutions",
        icon: CloudCog,
        subItems: [
          { path: "/services/cloud-solutions", label: "Overview", icon: Cloud },
          {
            path: "/services/cloud-migration",
            label: "Cloud Migration",
            icon: ArrowUpCircle,
          },
          {
            path: "/services/infrastructure-as-code",
            label: "Infrastructure as Code",
            icon: FileCode,
          },
          {
            path: "/services/cloud-security-solutions",
            label: "Cloud Security",
            icon: Shield,
          },
          {
            path: "/services/cost-optimization",
            label: "Cost Optimization",
            icon: TrendingDown,
          },
          {
            path: "/services/managed-services",
            label: "Managed Services",
            icon: Headphones,
          },
        ],
      },
      {
        path: "/services/it-infrastructure",
        label: "IT Infrastructure",
        icon: Server,
        subItems: [
          {
            path: "/services/it-infrastructure",
            label: "Overview",
            icon: Server,
          },
          {
            path: "/services/server-management",
            label: "Server Management",
            icon: HardDrive,
          },
          {
            path: "/services/network-infrastructure",
            label: "Network Infrastructure",
            icon: Network,
          },
          {
            path: "/services/storage-solutions",
            label: "Storage Solutions",
            icon: Database,
          },
          {
            path: "/services/virtualization",
            label: "Virtualization",
            icon: Layers,
          },
          {
            path: "/services/monitoring-maintenance",
            label: "Monitoring & Maintenance",
            icon: Activity,
          },
        ],
      },
      {
        path: "/services/consulting",
        label: "IT Consulting",
        icon: Users,
        subItems: [
          { path: "/services/consulting", label: "Overview", icon: Briefcase },
          {
            path: "/services/it-strategy-planning",
            label: "IT Strategy & Planning",
            icon: Target,
          },
          {
            path: "/services/technology-assessment",
            label: "Technology Assessment",
            icon: FileSearch,
          },
          {
            path: "/services/digital-transformation",
            label: "Digital Transformation",
            icon: Zap,
          },
          {
            path: "/services/it-governance",
            label: "IT Governance",
            icon: Shield,
          },
          {
            path: "/services/vendor-management",
            label: "Vendor Management",
            icon: Users,
          },
        ],
      },
    ],
  },
  {
    path: "#company",
    label: "Company",
    icon: Globe,
    subItems: [
      { path: Routes.ABOUT, label: "About Us", icon: Target },
      { path: Routes.TEAM, label: "Our Team", icon: Users },
      { path: Routes.VALUES_CULTURE, label: "Values & Culture", icon: Heart },
      { path: Routes.CSR, label: "CSR", icon: Globe },
      {
        path: Routes.PARTNER_PROGRAM,
        label: "Partner Program",
        icon: Handshake,
      },
      { path: Routes.CAREERS, label: "Careers", icon: Briefcase },
      { path: Routes.CONTACT, label: "Contact", icon: Mail },
    ],
  },
  {
    path: "#portfolio-insights",
    label: "Portfolio & Insights",
    icon: FolderOpen,
    subItems: [
      { path: Routes.PROJECTS, label: "Our Projects", icon: Code },
      { path: Routes.TESTIMONIALS, label: "Testimonials", icon: MessageSquare },
      { path: Routes.BLOG, label: "Blog & News", icon: BookOpen },
      { path: Routes.AWARDS, label: "Awards & Recognition", icon: Trophy },
    ],
  },
];

const hubItems: NavItem[] = [
  {
    path: '#hub-learning',
    label: 'Hub & Learning',
    icon: Rocket, // Need to import Rocket
    subItems: [
      { path: Routes.IT_SERVICES_STORE, label: "Store", icon: ShoppingCart },
      { path: Routes.CYBER_NEWS, label: "Cyber News", icon: Rss },
      { path: Routes.PLAYGROUND, label: "All Challenges", icon: Swords },
      { path: Routes.PLAYGROUND_CVE, label: "CVE Lab", icon: Bug },
      { path: Routes.PLAYGROUND_VM, label: "Virtual Machine", icon: CloudCog },
      { path: Routes.SECURITY_GLOSSARY, label: "Security Glossary", icon: BookMarked },
      { path: Routes.WEB_SECURITY_VULNERABILITIES, label: "Web Vulnerabilities", icon: AlertTriangle },
      {
        path: "#security-categories",
        label: "Security Categories",
        icon: Layers,
        subItems: [
          {
            path: "#web-security",
            label: "Web Security",
            icon: Globe,
            subItems: [
              { path: Routes.PLAYGROUND_SQL, label: "SQL Injection", icon: Database },
              { path: Routes.PLAYGROUND_WEB, label: "Web Security (XSS)", icon: Code },
            ],
          },
          {
            path: "#system-security",
            label: "System Security",
            icon: Terminal,
            subItems: [
              { path: Routes.PLAYGROUND_SYSTEM, label: "System Exploitation", icon: Terminal },
              { path: "/playground/binary-exploitation", label: "Binary Exploitation", icon: Cpu },
              { path: "/playground/reverse-engineering", label: "Reverse Engineering", icon: Binary },
            ],
          },
          {
            path: "#crypto-forensics",
            label: "Cryptography & Forensics",
            icon: Lock,
            subItems: [
              { path: Routes.PLAYGROUND_CRYPTO, label: "Cryptography", icon: Lock },
              { path: "/playground/forensics", label: "Forensics", icon: FileSearch },
              { path: "/playground/steganography", label: "Steganography", icon: Eye },
            ],
          },
          {
            path: "#endpoint-security",
            label: "Endpoint Security",
            icon: Shield,
            subItems: [
              { path: "/playground/mobile-security", label: "Mobile Security", icon: Smartphone },
              { path: "/playground/osint", label: "OSINT", icon: Search },
            ],
          },
        ],
      },
      {
        path: Routes.PLAYGROUND_LEARNING,
        label: "Learning Hub",
        icon: BookOpen,
        subItems: [
          { path: Routes.PLAYGROUND_LEARNING_WRITEUPS, label: "CTF Write-ups", icon: FileText },
          { path: Routes.PLAYGROUND_LEARNING_TOOLS, label: "Tools & Cheatsheets", icon: Wrench },
          { path: Routes.PLAYGROUND_LEARNING_ROADMAP, label: "Learning Roadmap", icon: Map },
          { path: Routes.LEARNING_PATH, label: "Learning Path", icon: GraduationCap },
        ],
      },
    ]
  }
];

const resourceItems: NavItem[] = [
  { path: Routes.RESOURCES, label: "Resources", icon: Library },
  { path: "/help", label: "Help Center", icon: HelpCircle },
  { path: Routes.SETTINGS, label: "Settings", icon: Settings },
];

// ─────────────────────────────────────────────────────────────────────────────
// NavSectionLabel — consistent typography for every section heading
// ─────────────────────────────────────────────────────────────────────────────

function NavSectionLabel({ label }: { label: string }) {
  return (
    // Red accent bar gives each section a clear visual anchor point
    <div className="flex items-center gap-2 mb-2 px-1">
      <div className="w-[3px] h-3.5 bg-red-500 rounded-full flex-shrink-0" />
      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.12em]">
        {label}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NavSectionDivider — horizontal separator between nav groups
// ─────────────────────────────────────────────────────────────────────────────

function NavSectionDivider() {
  return (
    // Gradient divider with a red tint signals intentional group boundaries
    <div className="py-1">
      <div className="h-px bg-gradient-to-r from-red-500/25 via-white/10 to-transparent" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MenuItem — single nav link with optional collapsible sub-items at any depth
// ─────────────────────────────────────────────────────────────────────────────

interface MenuItemProps {
  item: NavItem;
  isActive: boolean;
  isMobile?: boolean;
  depth?: number;
  /** Always provided — no default needed now that SidebarContent owns the state */
  expandedItems: string[];
  onToggle: (path: string) => void;
}

function MenuItem({
  item,
  isActive,
  isMobile = false,
  depth = 0,
  expandedItems,
  onToggle,
}: MenuItemProps) {
  const location = useLocation();
  const Icon = item.icon;
  const hasSubItems = item.subItems && item.subItems.length > 0;

  const isExpanded = expandedItems.includes(item.path);

  // Recursively check whether any descendant route is currently active
  const checkSubItemActive = (items?: NavItem[]): boolean => {
    if (!items) return false;
    return items.some(
      (sub) => location.pathname === sub.path || checkSubItemActive(sub.subItems),
    );
  };

  const isSubItemActive = hasSubItems && checkSubItemActive(item.subItems);
  const shouldHighlight = isActive || isSubItemActive;

  const handleClick = (e: React.MouseEvent) => {
    if (hasSubItems) {
      e.preventDefault();
      onToggle(item.path);
    } else if (depth === 0) {
      // Leaf item at root level — collapse all open groups on navigation
      onToggle("RESET_ALL");
    }
  };

  return (
    <div>
      <Link to={hasSubItems ? "#" : item.path} onClick={handleClick}>
        <div
          className={`
            relative flex items-center justify-between gap-2 rounded-sm
            transition-all duration-300 group cursor-pointer overflow-hidden
            ${depth === 0 ? 'px-3 py-3' : 'px-2 py-1.5 mt-0.5'}
            ${
              shouldHighlight
                ? depth === 0
                  ? "bg-red-500/10 text-white border border-red-500/30"
                  : "bg-red-500/10 text-white"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }
          `}
        >
          {/* Animated background on hover */}
          <div
            className={`absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${shouldHighlight ? "opacity-100" : ""}`}
          />

          {/* Active indicator - left bar */}
          {shouldHighlight && depth === 0 && (
            <motion.div
              layoutId={`activeIndicator-${isMobile ? "mobile" : "desktop"}-${depth}`}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-red-500"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}

          <div className="flex items-center gap-2 flex-1 min-w-0">
            {/* Icon with glow effect */}
            <div
              className={`relative z-10 flex-shrink-0 ${shouldHighlight ? "text-red-500" : ""} transition-colors duration-300`}
            >
              <Icon className={depth === 0 ? "w-4 h-4" : "w-3.5 h-3.5"} />
            </div>

            {/* Label */}
            <span className={`relative z-10 font-medium tracking-wide truncate ${depth === 0 ? "text-xs" : "text-[11px]"}`}>
              {item.label}
            </span>
          </div>

          {/* Expand icon or active dot */}
          <div className="relative z-10 flex-shrink-0">
            {hasSubItems ? (
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
              />
            ) : shouldHighlight ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-1.5 h-1.5 rounded-sm bg-red-500"
              />
            ) : null}
          </div>

          {/* Hover shine effect (disabled on mobile) */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block">
            <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:left-full transition-all duration-700" />
          </div>
        </div>
      </Link>

      {/* Sub-items — CSS grid-rows transition (no layout reflow, GPU-friendly) */}
      <div
        className="grid transition-[grid-template-rows] duration-200 ease-in-out"
        style={{ gridTemplateRows: hasSubItems && isExpanded ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div
            className={`mt-1 space-y-0.5 border-l-2 border-red-500/20 ${depth === 0 ? "ml-[18px] pl-3" : "ml-2 pl-2"}`}
          >
            {item.subItems?.map((subItem) => {
              const SubIcon = subItem.icon;
              const isSubActive = location.pathname === subItem.path;
              const hasNestedSubItems =
                subItem.subItems && subItem.subItems.length > 0;

              // If the sub-item has its own sub-items, render it as another MenuItem
              if (hasNestedSubItems) {
                return (
                  <MenuItem
                    key={subItem.path}
                    item={subItem}
                    isActive={isSubActive}
                    isMobile={isMobile}
                    depth={depth + 1}
                    expandedItems={expandedItems}
                    onToggle={onToggle}
                  />
                );
              }

              // Otherwise, render as a simple link
              return (
                <Link key={subItem.path} to={subItem.path}>
                  <div
                    className={`
                      relative flex items-center gap-2 px-2.5 py-1.5 rounded-sm
                      transition-[background-color,color] duration-150 group/sub cursor-pointer
                      ${
                        isSubActive
                          ? "bg-red-500/10 text-white border-l-2 border-red-500 pl-2"
                          : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                      }
                    `}
                  >
                    <SubIcon
                      className={`w-3.5 h-3.5 flex-shrink-0 ${isSubActive ? "text-red-400" : ""}`}
                    />
                    <span className="text-[11px] font-medium tracking-wide truncate">
                      {subItem.label}
                    </span>
                    {isSubActive && (
                      <div className="ml-auto w-1 h-1 rounded-sm bg-red-500" />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SidebarLogo — branding block; sits at the very top of the sidebar
// ─────────────────────────────────────────────────────────────────────────────

function SidebarLogo() {
  return (
    <div className="px-5 py-4 border-b border-white/10 flex-shrink-0">
      <div className="flex items-center gap-3 group">
        {/* Logo mark */}
        <div className="relative w-12 h-12 rounded-sm bg-[#0f172a] flex items-center justify-center shadow-lg overflow-hidden border border-white/10">
          <img
            src={logoImage}
            alt="Neverland Studio Logo"
            loading="lazy"
            className="w-10 h-10 object-contain"
          />
        </div>

        {/* Wordmark + tagline */}
        <div className="flex flex-col">
          <Logo size="sm" clickable={false} />
          <span className="text-xs text-slate-500 font-mono font-bold tracking-widest uppercase">
            Security Solutions
          </span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SidebarContent — shared body used by BOTH the desktop panel and the mobile
// slide-in drawer. Composes: Logo → Scrollable nav groups → Auth footer.
//
// Extracting this prevents the ~400 lines of duplicated JSX that previously
// existed between the two render paths.
// ─────────────────────────────────────────────────────────────────────────────

interface SidebarContentProps {
  isAuthenticated: boolean;
  expandedItems: string[];
  onToggle: (path: string) => void;
  onLogout: () => void;
  /** Opens the auth modal. On mobile this should also close the drawer. */
  onAuthOpen: () => void;
  isMobile?: boolean;
}

function SidebarContent({
  isAuthenticated,
  expandedItems,
  onToggle,
  onLogout,
  onAuthOpen,
  isMobile = false,
}: SidebarContentProps) {
  const location = useLocation();

  // Checks whether an item or any of its descendants matches the current route
  const checkActive = (item: NavItem): boolean => {
    if (item.path === location.pathname) return true;
    if (item.subItems) return item.subItems.some((sub) => checkActive(sub));
    return false;
  };

  return (
    <>
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-red-500" />

      {/* 1. Branding */}
      <SidebarLogo />

      {/* 2. Scrollable navigation — three functionally distinct sections */}
      <nav
        className={`flex-1 px-4 overflow-y-auto custom-scrollbar min-h-0 ${
          isMobile ? "py-4 space-y-5" : "py-5 space-y-5"
        }`}
        aria-label="Site navigation"
      >
        {/* ── Main navigation: Home · Services · Company · Portfolio ── */}
        <div className="space-y-1">
          <NavSectionLabel label="Navigation" />
          {mainNavItems.map((item) => (
            <MenuItem
              key={item.path}
              item={item}
              isActive={checkActive(item)}
              isMobile={isMobile}
              expandedItems={expandedItems}
              onToggle={onToggle}
            />
          ))}
        </div>

        <NavSectionDivider />

        {/*
          ── Hub & Learning ──────────────────────────────────────────────────
          Sub-items are rendered directly (flattened) so users immediately
          see all available tools without having to click a wrapper item.
          Security Categories and Learning Hub still expand their own sub-menus.
        */}
        <div className="space-y-1">
          <NavSectionLabel label="Hub & Learning" />
          {hubItems
            .flatMap((item) => item.subItems ?? [])
            .map((item) => (
              <MenuItem
                key={item.path}
                item={item}
                isActive={checkActive(item)}
                isMobile={isMobile}
                expandedItems={expandedItems}
                onToggle={onToggle}
              />
            ))}
        </div>

        <NavSectionDivider />

        {/* ── Resources: utility links; Settings only shown when authenticated ── */}
        <div className="space-y-1">
          <NavSectionLabel label="Resources" />
          {resourceItems
            .filter((item) => item.path !== Routes.SETTINGS || isAuthenticated)
            .map((item) => (
              <MenuItem
                key={item.path}
                item={item}
                isActive={checkActive(item)}
                isMobile={isMobile}
                expandedItems={expandedItems}
                onToggle={onToggle}
              />
            ))}
        </div>
      </nav>

      {/* 3. Auth footer — gradient rule + login / logout CTA */}
      <div className="flex-shrink-0">
        <div className="px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
        <div className="p-4">
          {isAuthenticated ? (
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-sm bg-red-600 hover:bg-red-700 border border-red-500/30 text-white font-bold uppercase tracking-wide text-sm transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          ) : (
            <button
              onClick={onAuthOpen}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-sm bg-red-600 hover:bg-red-700 border border-red-500/30 text-white font-bold uppercase tracking-wide text-sm transition-colors"
            >
              <Users className="w-4 h-4" />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-red-500/30" />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sidebar (default export)
// Manages mobile open/close state, auth, and the expanded-group accordion.
// Renders both the desktop static panel and the mobile slide-in drawer,
// delegating all visible content to the shared <SidebarContent> component.
// ─────────────────────────────────────────────────────────────────────────────

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // ── Notify external consumers when the mobile drawer opens / closes ─────────
  useEffect(() => {
    document.body.classList.toggle("mobile-sidebar-open", isOpen);
    window.dispatchEvent(
      new CustomEvent("mobileSidebarChange", { detail: { isOpen } }),
    );
  }, [isOpen]);

  // ── Close mobile drawer on route change ─────────────────────────────────────
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // ── Auto-expand ancestor groups of the currently active route ───────────────
  useEffect(() => {
    const allItems = [...mainNavItems, ...hubItems, ...resourceItems];
    const ancestors = findAncestorPaths(allItems, location.pathname);
    if (ancestors.length > 0) {
      setExpandedItems((prev) => {
        // Avoid a re-render when the expanded set already matches
        const next = Array.from(new Set([...prev, ...ancestors]));
        return JSON.stringify(next.sort()) === JSON.stringify([...prev].sort())
          ? prev
          : ancestors;
      });
    }
  }, [location.pathname]);

  // ── Toggle accordion expand / collapse ──────────────────────────────────────
  const handleToggle = (path: string) => {
    setExpandedItems((prev) => {
      if (path === "RESET_ALL") return [];
      if (prev.includes(path)) return prev.filter((p) => p !== path);

      // Collapse any open sibling directly under the Services category
      // so only one service sub-menu is open at a time.
      const serviceItem = mainNavItems.find((item) => item.path === "#services");
      const isServiceSubItem = serviceItem?.subItems?.some((s) => s.path === path);
      if (isServiceSubItem && serviceItem?.subItems) {
        const siblings = serviceItem.subItems.map((s) => s.path);
        return [...prev.filter((p) => !siblings.includes(p)), path];
      }

      return [...prev, path];
    });
  };

  // ── Auth handlers ────────────────────────────────────────────────────────────
  const handleLogout = async () => {
    try {
      await authService.logout();
      setIsOpen(false);
    } catch {
      // Logout errors are handled silently
    }
  };

  // Props shared by both desktop and mobile SidebarContent instances
  const contentProps: SidebarContentProps = {
    isAuthenticated,
    expandedItems,
    onToggle: handleToggle,
    onLogout: handleLogout,
    onAuthOpen: () => setIsAuthOpen(true),
  };

  return (
    <>
      {/* ── Mobile: hamburger toggle button ────────────────────────────────── */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="lg:hidden fixed top-6 left-6 z-[60] p-3 rounded-sm bg-[#0B1120] border border-white/10 hover:border-red-500/30 hover:bg-white/5 transition-[transform,border-color,background-color] duration-300 shadow-lg"
        style={{ transform: isOpen ? 'translateX(240px)' : 'translateX(0)' }}
        aria-label="Toggle sidebar"
      >
        {isOpen
          ? <X    className="w-6 h-6 text-white" />
          : <Menu className="w-6 h-6 text-white" />}
      </button>

      {/* ── Mobile: backdrop overlay ────────────────────────────────────────── */}
      <div
        onClick={() => setIsOpen(false)}
        className={`lg:hidden fixed inset-0 bg-black/80 z-[45] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* ── Desktop sidebar (always visible ≥ lg) ──────────────────────────── */}
      <aside
        className="hidden lg:flex fixed left-0 top-0 h-[100dvh] w-[280px] bg-[#0B1120] border-r border-white/10 z-50 flex-col shadow-2xl"
        aria-label="Site sidebar"
      >
        <SidebarContent {...contentProps} />
      </aside>

      {/* ── Mobile sidebar — always mounted, CSS translate for GPU compositing */}
      <aside
        className="lg:hidden fixed left-0 top-0 h-[100dvh] w-80 bg-[#0B1120] border-r border-white/10 z-50 flex flex-col shadow-2xl overflow-hidden transition-transform duration-300 ease-in-out"
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          willChange: 'transform',
        }}
        aria-label="Site sidebar"
        aria-hidden={!isOpen}
      >
        {/* Opening auth modal on mobile also closes the drawer */}
        <SidebarContent
          {...contentProps}
          isMobile
          onAuthOpen={() => { setIsAuthOpen(true); setIsOpen(false); }}
        />
      </aside>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
