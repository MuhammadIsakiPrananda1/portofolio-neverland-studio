/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * SIDEBAR NAVIGATION COMPONENT
 * ═══════════════════════════════════════════════════════════════════════════════
 * Manages the main website's navigation sidebar with support for:
 * - Nested menu items with unlimited depth
 * - Mobile slide-in drawer and desktop static panel
 * - Authentication-aware UI (Login/Logout states)
 * - Automatic expansion of active route ancestors
 * - Smooth animations and transitions
 *
 * Design Principles:
 * - Single Responsibility: Each sub-component handles one concern
 * - Composition: Reusable pieces combine into larger structures
 * - Accessibility: Full ARIA labeling and semantic HTML
 * - Performance: GPU-accelerated transitions, memoized checks
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

// ──────────────────────────────────────────────────────────────────────────────
// LUCIDE ICONS — Organized by category
// ──────────────────────────────────────────────────────────────────────────────
import {
  // Navigation & Toggle
  Menu,
  X,
  ChevronDown,
  // Navigation Items
  Home,
  Briefcase,
  Users,
  FolderOpen,
  BookOpen,
  Mail,
  Globe,
  Code,
  MessageSquare,
  LogOut,
  Library,
  Settings,
  HelpCircle,
  // Security Services
  Shield,
  Target,
  FileSearch,
  Network,
  Cloud,
  Flag,
  CloudCog,
  Server,
  HardDrive,
  Database,
  Layers,
  Activity,
  // Web Development
  ShoppingCart,
  Zap,
  Palette,
  Box,
  // Cloud Solutions
  ArrowUpCircle,
  FileCode,
  TrendingDown,
  Headphones,
  // Learning & Security
  Swords,
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

// ──────────────────────────────────────────────────────────────────────────────
// INTERNAL COMPONENTS & HOOKS
// ──────────────────────────────────────────────────────────────────────────────
import Logo from "@components/atoms/Logo";
import AuthModal from "@components/organisms/AuthModal";

// ──────────────────────────────────────────────────────────────────────────────
// CONFIGURATION & SERVICES
// ──────────────────────────────────────────────────────────────────────────────
import { Routes } from "@config/constants";
import logoImage from "@/assets/logo.webp";
import { useAuth } from "@/contexts/AuthContext";
import { authService } from "@/services/auth.service";


// ═══════════════════════════════════════════════════════════════════════════════
// TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * NavItem — Core navigation structure supporting unlimited nesting
 * @property path — URL path or hash anchor for the item
 * @property label — Display text shown in the UI
 * @property icon — Lucide icon component to render
 * @property subItems — Optional nested items (can be nested any depth)
 */
interface NavItem {
  path: string;
  label: string;
  icon: any;
  subItems?: NavItem[];
}

/**
 * SidebarContentProps — Props passed to the shared SidebarContent component
 * Used by both desktop and mobile sidebar instances to avoid duplication
 */
interface SidebarContentProps {
  isAuthenticated: boolean;
  expandedItems: string[];
  onToggle: (path: string) => void;
  onLogout: () => void;
  onAuthOpen: () => void;
  isMobile?: boolean;
}


// ═══════════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * findAncestorPaths — Recursively finds all ancestor paths for a given route
 *
 * Used during URL changes to automatically expand parent menus so the
 * currently active route is always visible without requiring manual clicks.
 *
 * @param items — Flat or nested array of navigation items to search
 * @param targetPath — The route path we're looking for ancestors of
 * @returns Array of ancestor item paths leading to the target
 *
 * @example
 * const paths = findAncestorPaths(navItems, '/services/web-development')
 * // Returns: ['#services', '/services/web-development']
 */
function findAncestorPaths(items: NavItem[], targetPath: string): string[] {
  for (const item of items) {
    if (!item.subItems) continue;
    if (item.subItems.some((s) => s.path === targetPath)) return [item.path];
    const nested = findAncestorPaths(item.subItems, targetPath);
    if (nested.length > 0) return [item.path, ...nested];
  }
  return [];
}


// ═══════════════════════════════════════════════════════════════════════════════
// NAVIGATION DATA
// ═══════════════════════════════════════════════════════════════════════════════
//
// The sidebar is divided into three distinct functional groups:
//
// 1. MAIN NAVIGATION
//    Core pages: Home, Services (with 5 sub-categories), Company info, Portfolio
//    These form the primary user journey through the site.
//
// 2. HUB & LEARNING
//    Community resources: CTF Hub, Store, Challenges, Learning materials
//    Flattened to show items directly without parent wrapper.
//
// 3. RESOURCES
//    Utility links: Resources, Help, Settings (auth-dependent)
//    Always available at the bottom for quick access.
//
// ═══════════════════════════════════════════════════════════════════════════════

// ──────────────────────────────────────────────────────────────────────────────
// Main Navigation — Primary site sections
// ──────────────────────────────────────────────────────────────────────────────

const mainNavItems: NavItem[] = [
  {
    path: Routes.HOME,
    label: "Home",
    icon: Home,
  },
  {
    path: "#services",
    label: "Services",
    icon: Briefcase,
    subItems: [
      // Cyber Security Services
      {
        path: "/services/cyber-security",
        label: "Cyber Security",
        icon: Shield,
        subItems: [
          { path: "/services/cyber-security", label: "Overview", icon: Shield },
          { path: "/services/penetration-testing", label: "Penetration Testing", icon: Target },
          { path: "/services/security-audit", label: "Security Audit", icon: FileSearch },
          { path: "/services/network-security", label: "Network Security", icon: Network },
          { path: "/services/cloud-security", label: "Cloud Monitoring", icon: Cloud },
          { path: "/services/ctf", label: "CTF Training", icon: Flag },
        ],
      },
      // Web Development Services
      {
        path: "/services/web-development",
        label: "Web Development",
        icon: Code,
        subItems: [
          { path: "/services/web-development", label: "Overview", icon: Code },
          { path: "/services/custom-web-apps", label: "Custom Web Apps", icon: Globe },
          { path: "/services/ecommerce", label: "E-Commerce", icon: ShoppingCart },
          { path: "/services/pwa", label: "Progressive Web Apps", icon: Zap },
          { path: "/services/api-development", label: "API Development", icon: Box },
          { path: "/services/ui-ux-design", label: "UI/UX Design", icon: Palette },
        ],
      },
      // Cloud Solutions Services
      {
        path: "/services/cloud-solutions",
        label: "Cloud Solutions",
        icon: CloudCog,
        subItems: [
          { path: "/services/cloud-solutions", label: "Overview", icon: Cloud },
          { path: "/services/cloud-migration", label: "Cloud Migration", icon: ArrowUpCircle },
          { path: "/services/infrastructure-as-code", label: "Infrastructure as Code", icon: FileCode },
          { path: "/services/cloud-security-solutions", label: "Cloud Security", icon: Shield },
          { path: "/services/cost-optimization", label: "Cost Optimization", icon: TrendingDown },
          { path: "/services/managed-services", label: "Managed Services", icon: Headphones },
        ],
      },
      // IT Infrastructure Services
      {
        path: "/services/it-infrastructure",
        label: "IT Infrastructure",
        icon: Server,
        subItems: [
          { path: "/services/it-infrastructure", label: "Overview", icon: Server },
          { path: "/services/server-management", label: "Server Management", icon: HardDrive },
          { path: "/services/network-infrastructure", label: "Network Infrastructure", icon: Network },
          { path: "/services/storage-solutions", label: "Storage Solutions", icon: Database },
          { path: "/services/virtualization", label: "Virtualization", icon: Layers },
          { path: "/services/monitoring-maintenance", label: "Monitoring & Maintenance", icon: Activity },
        ],
      },
      // IT Consulting Services
      {
        path: "/services/consulting",
        label: "IT Consulting",
        icon: Users,
        subItems: [
          { path: "/services/consulting", label: "Overview", icon: Briefcase },
          { path: "/services/it-strategy-planning", label: "IT Strategy & Planning", icon: Target },
          { path: "/services/technology-assessment", label: "Technology Assessment", icon: FileSearch },
          { path: "/services/digital-transformation", label: "Digital Transformation", icon: Zap },
          { path: "/services/it-governance", label: "IT Governance", icon: Shield },
          { path: "/services/vendor-management", label: "Vendor Management", icon: Users },
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
      { path: Routes.PARTNER_PROGRAM, label: "Partner Program", icon: Handshake },
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

// ──────────────────────────────────────────────────────────────────────────────
// Hub & Learning — Community resources (flattened display)
// ──────────────────────────────────────────────────────────────────────────────

const hubItems: NavItem[] = [
  {
    path: "#hub-learning",
    label: "Hub & Learning",
    icon: Rocket,
    subItems: [
      // Main Hub Items
      { path: Routes.CTF_HUB, label: "CTF Hub", icon: Flag },
      { path: Routes.IT_SERVICES_STORE, label: "Store", icon: ShoppingCart },
      { path: Routes.CYBER_NEWS, label: "Cyber News", icon: Rss },
      { path: Routes.PLAYGROUND, label: "All Challenges", icon: Swords },
      { path: Routes.PLAYGROUND_CVE, label: "CVE Lab", icon: Bug },
      { path: Routes.PLAYGROUND_VM, label: "Virtual Machine", icon: CloudCog },
      { path: Routes.SECURITY_GLOSSARY, label: "Security Glossary", icon: BookMarked },
      { path: Routes.WEB_SECURITY_VULNERABILITIES, label: "Web Vulnerabilities", icon: AlertTriangle },
      // Security Categories with nested challenges
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
      // Learning Hub with Resources
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
    ],
  },
];

// ──────────────────────────────────────────────────────────────────────────────
// Resources — Utility links (filtered by auth state)
// ──────────────────────────────────────────────────────────────────────────────

const resourceItems: NavItem[] = [
  { path: Routes.RESOURCES, label: "Resources", icon: Library },
  { path: "/help", label: "Help Center", icon: HelpCircle },
  { path: Routes.SETTINGS, label: "Settings", icon: Settings },
];


// ═══════════════════════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════
// These components are organized from smallest (simple UI elements) to larger
// (composite components that combine multiple pieces together).
// ═══════════════════════════════════════════════════════════════════════════════

// ──────────────────────────────────────────────────────────────────────────────
// NavSectionLabel — Section heading with visual accent bar
// ──────────────────────────────────────────────────────────────────────────────
// Renders a small red accent dot next to the section title for visual hierarchy
// and to clearly separate distinct navigation groups.
// ──────────────────────────────────────────────────────────────────────────────

interface NavSectionLabelProps {
  label: string;
}

function NavSectionLabel({ label }: NavSectionLabelProps) {
  return (
    <div className="flex items-center gap-2 mb-3 px-1">
      {/* Red accent dot — visual anchor point for each section */}
      <div className="w-[3px] h-3.5 bg-red-500 rounded-full flex-shrink-0" />
      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.12em] leading-none">
        {label}
      </span>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// NavSectionDivider — Horizontal separator between navigation groups
// ──────────────────────────────────────────────────────────────────────────────
// Creates visual breathing room between distinct sections using a subtle
// gradient that signals intentional separation.
// ──────────────────────────────────────────────────────────────────────────────

function NavSectionDivider() {
  return (
    <div className="py-1">
      {/* Gradient divider with red tint emphasizes group boundaries */}
      <div className="h-px bg-gradient-to-r from-red-500/25 via-white/10 to-transparent" />
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// MenuItem — Navigation item with support for unlimited nesting
// ──────────────────────────────────────────────────────────────────────────────
// Features:
// - Renders as collapsible parent if subItems exist
// - Renders as link if it's a leaf item
// - Highlights active routes and automatically expands ancestors
// - Supports unlimited nesting depth
// - GPU-optimized CSS grid transitions for smooth expand/collapse
// ──────────────────────────────────────────────────────────────────────────────

interface MenuItemProps {
  item: NavItem;
  isActive: boolean;
  isMobile?: boolean;
  depth?: number;
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

  /**
   * Recursively checks if any descendant route is currently active.
   * Used to highlight parent items when a nested child is active.
   */
  const checkSubItemActive = (items?: NavItem[]): boolean => {
    if (!items) return false;
    return items.some(
      (sub) => location.pathname === sub.path || checkSubItemActive(sub.subItems),
    );
  };

  const isSubItemActive = hasSubItems && checkSubItemActive(item.subItems);
  const shouldHighlight = isActive || isSubItemActive;

  /**
   * Handles click events for menu items.
   * - If has subItems: toggle expand/collapse
   * - If leaf at depth 0: collapse all other groups on navigation
   * - Otherwise: navigate normally
   */
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
          className={`relative flex items-center justify-between gap-2 rounded-sm transition-all duration-300 group cursor-pointer overflow-hidden ${
            depth === 0 ? "px-3 py-2.5" : "px-2 py-2 mt-1"
          } ${
            shouldHighlight
              ? depth === 0
                ? "bg-red-500/10 text-white border border-red-500/30"
                : "bg-red-500/10 text-white"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          {/* Animated background on hover */}
          <div
            className={`absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              shouldHighlight ? "opacity-100" : ""
            }`}
          />

          {/* Left accent bar — indicates active item */}
          {shouldHighlight && depth === 0 && (
            <motion.div
              layoutId={`activeIndicator-${isMobile ? "mobile" : "desktop"}-${depth}`}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-red-500"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}

          {/* Icon + Label — Vertical center alignment */}
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <div
              className={`relative z-10 flex items-center justify-center flex-shrink-0 ${
                shouldHighlight ? "text-red-500" : ""
              } transition-colors duration-300`}
            >
              <Icon className={`${depth === 0 ? "w-4 h-4" : "w-3.5 h-3.5"}`} />
            </div>
            <span className={`relative z-10 font-medium tracking-wider truncate leading-none ${
              depth === 0 ? "text-xs" : "text-[11px]"
            }`}>
              {item.label}
            </span>
          </div>

          {/* Right control — expand arrow or active dot */}
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

          {/* Hover shine effect (desktop only) */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block">
            <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:left-full transition-all duration-700" />
          </div>
        </div>
      </Link>

      {/* Sub-items — GPU-optimized CSS grid transition */}
      {hasSubItems && (
        <div
          className="grid transition-[grid-template-rows] duration-200 ease-in-out"
          style={{ gridTemplateRows: isExpanded ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div
              className={`mt-2 space-y-1 border-l border-red-500/20 ${
                depth === 0 ? "ml-[calc(1rem-1px)] pl-3" : "ml-[calc(0.875rem-1px)] pl-2.5"
              }`}
            >
              {item.subItems?.map((subItem) => {
                const SubIcon = subItem.icon;
                const isSubActive = location.pathname === subItem.path;
                const hasNestedSubItems = subItem.subItems && subItem.subItems.length > 0;

                // Recursively render nested items
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

                // Render as simple link
                return (
                  <Link key={subItem.path} to={subItem.path}>
                    <div
                      className={`relative flex items-center gap-2 px-2.5 py-2 rounded-sm transition-[background-color,color] duration-150 group/sub cursor-pointer ${
                        isSubActive
                          ? "bg-red-500/10 text-white border-l-2 border-red-500 pl-[calc(0.625rem-2px)]"
                          : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                      }`}
                    >
                      <SubIcon className={`w-3.5 h-3.5 flex-shrink-0 transition-colors duration-150 ${isSubActive ? "text-red-400" : ""}`} />
                      <span className="text-[11px] font-medium tracking-wide truncate leading-none">
                        {subItem.label}
                      </span>
                      {isSubActive && (
                        <div className="ml-auto w-1 h-1 rounded-sm bg-red-500 flex-shrink-0" />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// SidebarLogo — Branding section at the top of the sidebar
// ──────────────────────────────────────────────────────────────────────────────
// Displays company logo, wordmark, and tagline. Sits in a fixed position
// at the top of both desktop and mobile sidebars.
// ──────────────────────────────────────────────────────────────────────────────

function SidebarLogo() {
  return (
    <div className="px-5 py-4 border-b border-white/10 flex-shrink-0">
      <div className="flex items-center gap-3 group">
        {/* Logo mark — company icon */}
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

// ──────────────────────────────────────────────────────────────────────────────
// SidebarContent — Composite component for shared sidebar content
// ──────────────────────────────────────────────────────────────────────────────
// This component is used by BOTH the desktop static sidebar and the mobile
// slide-in drawer, preventing the ~400 lines of JSX duplication that would
// otherwise exist between the two render paths.
//
// Structure: Logo → Scrollable Nav Groups → Auth Footer
// ──────────────────────────────────────────────────────────────────────────────

function SidebarContent({
  isAuthenticated,
  expandedItems,
  onToggle,
  onLogout,
  onAuthOpen,
  isMobile = false,
}: SidebarContentProps) {
  const location = useLocation();

  /**
   * Checks if an item or any of its descendants matches the current route.
   * Used to highlight parent items when a nested page is active.
   */
  const checkActive = (item: NavItem): boolean => {
    if (item.path === location.pathname) return true;
    if (item.subItems) return item.subItems.some((sub) => checkActive(sub));
    return false;
  };

  return (
    <>
      {/* Top accent bar — visual design element */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-red-500" />

      {/* 1. Branding — company identity section */}
      <SidebarLogo />

      {/* 2. Navigation — main scrollable content area */}
      <nav
        className={`flex-1 px-4 overflow-y-auto custom-scrollbar min-h-0 space-y-6 ${
          isMobile ? "py-4" : "py-5"
        }`}
        aria-label="Site navigation"
      >
        {/* Main Navigation Section */}
        <div className="space-y-2">
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

        {/* Hub & Learning Section — sub-items flattened for immediate visibility */}
        <div className="space-y-2">
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

        {/* Resources Section — auth-dependent items filtered */}
        <div className="space-y-2">
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

      {/* 3. Auth Footer — gradient rule + login/logout button */}
      <div className="flex-shrink-0">
        <div className="px-4 py-3">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
        <div className="px-4 py-3">
          {isAuthenticated ? (
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-sm bg-red-600 hover:bg-red-700 border border-red-500/30 text-white font-bold uppercase tracking-wide text-xs transition-colors duration-200"
              aria-label="Logout from the application"
            >
              <LogOut className="w-4 h-4 flex-shrink-0" />
              <span>Logout</span>
            </button>
          ) : (
            <button
              onClick={onAuthOpen}
              className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-sm bg-red-600 hover:bg-red-700 border border-red-500/30 text-white font-bold uppercase tracking-wide text-xs transition-colors duration-200"
              aria-label="Login to your account"
            >
              <Users className="w-4 h-4 flex-shrink-0" />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>

      {/* Bottom accent bar — visual design element */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-red-500/30" />
    </>
  );
}


// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT — Sidebar (Default Export)
// ═══════════════════════════════════════════════════════════════════════════════
//
// Root component that manages:
// - Mobile drawer open/close state and animations
// - Authentication state and logout handlers
// - Expanded groups accordion state
// - Event emission for external consumers (e.g., AI chat blur effect)
// - Rendering both desktop static panel and mobile drawer via SidebarContent
//
// Desktop: Always visible sidebar (fixed left panel, ≥lg breakpoint)
// Mobile: Slide-in drawer with backdrop overlay (<lg breakpoint)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Sidebar — Main navigation component
 *
 * Manages state for:
 * - Mobile sidebar visibility (open/close)
 * - Authentication modal visibility
 * - Expanded navigation accordion groups
 *
 * Renders:
 * - Desktop static sidebar (hidden on mobile)
 * - Mobile hamburger toggle button
 * - Mobile backdrop overlay
 * - Mobile slide-in drawer
 * - Authentication modal
 *
 * Events Emitted:
 * - 'mobileSidebarChange': Fired when drawer opens/closes
 *   Consumed by AILiveChat and FloatingCartButton for blur effects
 */
export default function Sidebar() {
  // ────────────────────────────────────────────────────────────────────────────
  // STATE MANAGEMENT
  // ────────────────────────────────────────────────────────────────────────────

  const [isOpen, setIsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // ────────────────────────────────────────────────────────────────────────────
  // CONTEXT & HOOKS
  // ────────────────────────────────────────────────────────────────────────────

  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // ────────────────────────────────────────────────────────────────────────────
  // EFFECTS
  // ────────────────────────────────────────────────────────────────────────────

  /**
   * Effect 1: Notify external consumers when mobile drawer opens/closes
   * Adds/removes 'mobile-sidebar-open' class to body and fires custom event.
   * This is consumed by components like AILiveChat to apply blur effects.
   */
  useEffect(() => {
    document.body.classList.toggle("mobile-sidebar-open", isOpen);
    window.dispatchEvent(
      new CustomEvent("mobileSidebarChange", { detail: { isOpen } }),
    );
  }, [isOpen]);

  /**
   * Effect 2: Close mobile drawer when route changes
   * Ensures drawer automatically closes after user navigates to a new page.
   */
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  /**
   * Effect 3: Auto-expand ancestor groups of the currently active route
   * When a user lands on a nested page (e.g., /services/web-development),
   * automatically expand all parent groups so the active item is visible.
   * This prevents closed parent groups from hiding the current page.
   */
  useEffect(() => {
    const allItems = [...mainNavItems, ...hubItems, ...resourceItems];
    const ancestors = findAncestorPaths(allItems, location.pathname);
    if (ancestors.length > 0) {
      setExpandedItems((prev) => {
        // Avoid re-renders when expanded set already matches
        const next = Array.from(new Set([...prev, ...ancestors]));
        return JSON.stringify(next.sort()) === JSON.stringify([...prev].sort())
          ? prev
          : ancestors;
      });
    }
  }, [location.pathname]);

  // ────────────────────────────────────────────────────────────────────────────
  // EVENT HANDLERS
  // ────────────────────────────────────────────────────────────────────────────

  /**
   * handleToggle — Toggle accordion expand/collapse for navigation groups
   *
   * Behaviors:
   * 1. RESET_ALL: Collapse all groups (used on root-level navigation)
   * 2. Already expanded: Collapse the group
   * 3. Service sub-items: Collapse siblings (only one open at a time)
   * 4. Otherwise: Expand the group
   */
  const handleToggle = (path: string) => {
    setExpandedItems((prev) => {
      if (path === "RESET_ALL") return [];
      if (prev.includes(path)) return prev.filter((p) => p !== path);

      // Collapse any open sibling directly under the Services category
      // so only one service sub-menu is open at a time
      const serviceItem = mainNavItems.find((item) => item.path === "#services");
      const isServiceSubItem = serviceItem?.subItems?.some((s) => s.path === path);
      if (isServiceSubItem && serviceItem?.subItems) {
        const siblings = serviceItem.subItems.map((s) => s.path);
        return [...prev.filter((p) => !siblings.includes(p)), path];
      }

      return [...prev, path];
    });
  };

  /**
   * handleLogout — Logout and close mobile drawer
   * Calls authService.logout() and closes the sidebar if open.
   */
  const handleLogout = async () => {
    try {
      await authService.logout();
      setIsOpen(false);
    } catch {
      // Logout errors are handled silently by the auth service
    }
  };

  // ────────────────────────────────────────────────────────────────────────────
  // COMPONENT PROPS
  // ────────────────────────────────────────────────────────────────────────────

  // Props passed to SidebarContent (used by both desktop and mobile)
  const contentProps: SidebarContentProps = {
    isAuthenticated,
    expandedItems,
    onToggle: handleToggle,
    onLogout: handleLogout,
    onAuthOpen: () => setIsAuthOpen(true),
  };

  // ────────────────────────────────────────────────────────────────────────────
  // RENDER
  // ────────────────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ──────────────────────────────────────────────────────────────────────
          MOBILE: Hamburger Toggle Button
          Fixed at top-left; slides right when drawer opens
          ────────────────────────────────────────────────────────────────────── */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="lg:hidden fixed top-6 left-6 z-[60] p-3 rounded-sm bg-[#0B1120] border border-white/10 hover:border-red-500/30 hover:bg-white/5 transition-[transform,border-color,background-color] duration-300 shadow-lg"
        style={{ transform: isOpen ? "translateX(240px)" : "translateX(0)" }}
        aria-label="Toggle sidebar"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      {/* ──────────────────────────────────────────────────────────────────────
          MOBILE: Backdrop Overlay
          Click to close the drawer
          ────────────────────────────────────────────────────────────────────── */}
      <div
        onClick={() => setIsOpen(false)}
        className={`lg:hidden fixed inset-0 bg-black/80 z-[45] transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      />

      {/* ──────────────────────────────────────────────────────────────────────
          DESKTOP: Static Sidebar
          Always visible on lg and larger screens
          ────────────────────────────────────────────────────────────────────── */}
      <aside
        className="hidden lg:flex fixed left-0 top-0 h-[100dvh] w-[280px] bg-[#0B1120] border-r border-white/10 z-50 flex-col shadow-2xl"
        aria-label="Site sidebar"
      >
        <SidebarContent {...contentProps} />
      </aside>

      {/* ──────────────────────────────────────────────────────────────────────
          MOBILE: Slide-In Drawer
          Always mounted for CSS animations; translateX for GPU compositing
          ────────────────────────────────────────────────────────────────────── */}
      <aside
        className="lg:hidden fixed left-0 top-0 h-[100dvh] w-80 bg-[#0B1120] border-r border-white/10 z-50 flex flex-col shadow-2xl overflow-hidden transition-transform duration-300 ease-in-out"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          willChange: "transform",
        }}
        aria-label="Site sidebar"
        aria-hidden={!isOpen}
      >
        {/* On mobile, also close drawer when opening auth modal */}
        <SidebarContent
          {...contentProps}
          isMobile
          onAuthOpen={() => {
            setIsAuthOpen(true);
            setIsOpen(false);
          }}
        />
      </aside>

      {/* ──────────────────────────────────────────────────────────────────────
          Authentication Modal
          Global modal for login/signup
          ────────────────────────────────────────────────────────────────────── */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
