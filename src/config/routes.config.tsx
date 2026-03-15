import { lazy } from 'react';
import { Routes as AppRoutes } from './constants';

// Lazy load components for code splitting
const lazyLoad = (importFn: () => Promise<any>) => lazy(importFn);

// ─── Public pages ────────────────────────────────────────────────────────────
export const Home = lazyLoad(() => import('@pages/public/Home'));
export const CyberNews = lazyLoad(() => import('@pages/public/CyberNews/CyberNews'));
export const Awards = lazyLoad(() => import('@pages/public/Awards'));
export const About = lazyLoad(() => import('@pages/public/About'));
export const Projects = lazyLoad(() => import('@pages/public/Projects'));
export const Team = lazyLoad(() => import('@pages/public/Team/Team'));
export const Resources = lazyLoad(() => import('@pages/public/Resources/Resources'));
export const Blog = lazyLoad(() => import('@pages/public/Blog'));
export const Testimonials = lazyLoad(() => import('@pages/public/Testimonials/Testimonials'));
export const LearningPath = lazyLoad(() => import('@pages/public/LearningPath'));
export const Contact = lazyLoad(() => import('@pages/public/Contact'));
export const Help = lazyLoad(() => import('@pages/public/Help'));
export const Settings = lazyLoad(() => import('@pages/public/Settings'));
export const Careers = lazyLoad(() => import('@pages/public/Careers'));
export const SecurityGlossary = lazyLoad(() => import('@pages/public/SecurityGlossary'));
export const NotFound = lazyLoad(() => import('@pages/public/NotFound'));

// ─── Company pages ───────────────────────────────────────────────────────────
export const ValuesCulture = lazyLoad(() => import('@pages/company/CompanyValuesCulture'));
export const CSR = lazyLoad(() => import('@pages/company/CompanyCSR'));
export const PartnerProgram = lazyLoad(() => import('@pages/company/CompanyPartnerProgram'));

// ─── Service pages – Cyber Security ─────────────────────────────────────────
export const CyberSecurity = lazyLoad(() => import('@pages/services/CyberSecurity'));
export const PenetrationTesting = lazyLoad(() => import('@pages/services/PenetrationTesting'));
export const SecurityAudit = lazyLoad(() => import('@pages/services/SecurityAudit'));
export const NetworkSecurity = lazyLoad(() => import('@pages/services/NetworkSecurity'));
export const CloudSecurity = lazyLoad(() => import('@pages/services/CloudSecurity'));
export const CTF = lazyLoad(() => import('@pages/public/CTF'));

// ─── Service pages – Web Development ─────────────────────────────────────────
export const WebDevelopment = lazyLoad(() => import('@pages/services/WebDevelopment'));
export const CustomWebApps = lazyLoad(() => import('@pages/services/CustomWebApps'));
export const ECommerce = lazyLoad(() => import('@pages/services/ECommerce'));
export const PWA = lazyLoad(() => import('@pages/services/PWA'));
export const APIDevelopment = lazyLoad(() => import('@pages/services/APIDevelopment'));
export const UIUXDesign = lazyLoad(() => import('@pages/services/UIUXDesign'));

// ─── Service pages – Cloud Solutions ─────────────────────────────────────────
export const CloudSolutions = lazyLoad(() => import('@pages/services/CloudSolutions'));
export const CloudMigration = lazyLoad(() => import('@pages/services/CloudMigration'));
export const InfrastructureAsCode = lazyLoad(() => import('@pages/services/InfrastructureAsCode'));
export const CloudSecuritySolutions = lazyLoad(() => import('@pages/services/CloudSecuritySolutions'));
export const CostOptimization = lazyLoad(() => import('@pages/services/CostOptimization'));
export const ManagedServices = lazyLoad(() => import('@pages/services/ManagedServices'));

// ─── Service pages – Consulting ───────────────────────────────────────────────
export const Consulting = lazyLoad(() => import('@pages/services/Consulting'));
export const ITStrategyPlanning = lazyLoad(() => import('@pages/services/ITStrategyPlanning'));
export const TechnologyAssessment = lazyLoad(() => import('@pages/services/TechnologyAssessment'));
export const DigitalTransformation = lazyLoad(() => import('@pages/services/DigitalTransformation'));
export const ITGovernance = lazyLoad(() => import('@pages/services/ITGovernance'));
export const VendorManagement = lazyLoad(() => import('@pages/services/VendorManagement'));

// ─── Service pages – IT Infrastructure ───────────────────────────────────────
export const ITInfrastructure = lazyLoad(() => import('@pages/services/ITInfrastructure'));
export const ServerManagement = lazyLoad(() => import('@pages/services/ServerManagement'));
export const NetworkInfrastructure = lazyLoad(() => import('@pages/services/NetworkInfrastructure'));
export const StorageSolutions = lazyLoad(() => import('@pages/services/StorageSolutions'));
export const Virtualization = lazyLoad(() => import('@pages/services/Virtualization'));
export const MonitoringMaintenance = lazyLoad(() => import('@pages/services/MonitoringMaintenance'));

// ─── Store pages ──────────────────────────────────────────────────────────────
export const ITServicesStore = lazyLoad(() => import('@pages/store/ITServicesStore'));
export const ITServicesCheckout = lazyLoad(() => import('@pages/store/ITServicesCheckout'));

// ─── Playground pages ─────────────────────────────────────────────────────────
export const Playground = lazyLoad(() => import('@pages/Playground'));
export const PlaygroundSQL = lazyLoad(() => import('@pages/Playground/PlaygroundSQL'));
export const PlaygroundWeb = lazyLoad(() => import('@pages/Playground/PlaygroundWeb'));
export const PlaygroundSystem = lazyLoad(() => import('@pages/Playground/PlaygroundSystem'));
export const PlaygroundCrypto = lazyLoad(() => import('@pages/Playground/PlaygroundCrypto'));
export const PlaygroundVM = lazyLoad(() => import('@pages/Playground/PlaygroundVM'));
export const PlaygroundOVPN = lazyLoad(() => import('@pages/Playground/PlaygroundOVPN'));
export const PlaygroundBinary = lazyLoad(() => import('@pages/Playground/PlaygroundBinary'));
export const PlaygroundReverse = lazyLoad(() => import('@pages/Playground/PlaygroundReverse'));
export const PlaygroundForensics = lazyLoad(() => import('@pages/Playground/PlaygroundForensics'));
export const PlaygroundSteganography = lazyLoad(() => import('@pages/Playground/PlaygroundSteganography'));
export const PlaygroundOSINT = lazyLoad(() => import('@pages/Playground/PlaygroundOSINT'));
export const PlaygroundMobile = lazyLoad(() => import('@pages/Playground/PlaygroundMobile'));
export const PlaygroundCVE = lazyLoad(() => import('@pages/Playground/PlaygroundCVE'));
export const PlaygroundLearning = lazyLoad(() => import('@pages/Playground/PlaygroundLearning'));
export const PlaygroundLearningWriteups = lazyLoad(() => import('@pages/Playground/PlaygroundLearningWriteups'));
export const PlaygroundLearningTools = lazyLoad(() => import('@pages/Playground/PlaygroundLearningTools'));
export const PlaygroundLearningRoadmap = lazyLoad(() => import('@pages/Playground/PlaygroundLearningRoadmap'));

// ─── Dashboard pages ──────────────────────────────────────────────────────────
export const Dashboard = lazyLoad(() => import('@pages/Dashboard'));
export const DashboardProjects = lazyLoad(() => import('@pages/Dashboard/DashboardProjects'));
export const DashboardAnalytics = lazyLoad(() => import('@pages/Dashboard/DashboardAnalytics'));
export const DashboardMessages = lazyLoad(() => import('@pages/Dashboard/DashboardMessages'));
export const DashboardClients = lazyLoad(() => import('@pages/Dashboard/DashboardClients'));
export const DashboardReports = lazyLoad(() => import('@pages/Dashboard/DashboardReports'));
export const DashboardSettings = lazyLoad(() => import('@pages/Dashboard/DashboardSettings'));
export const DashboardTeam = lazyLoad(() => import('@pages/Dashboard/DashboardTeam'));
export const DashboardServices = lazyLoad(() => import('@pages/Dashboard/DashboardServices'));
export const DashboardTasks = lazyLoad(() => import('@pages/Dashboard/DashboardTasks'));
export const DashboardInvoices = lazyLoad(() => import('@pages/Dashboard/DashboardInvoices'));
export const DashboardCalendar = lazyLoad(() => import('@pages/Dashboard/DashboardCalendar'));
export const DashboardResources = lazyLoad(() => import('@pages/Dashboard/DashboardResources'));
export const DashboardLogin = lazyLoad(() => import('@pages/Dashboard/DashboardLogin'));

// ─── Auth pages ───────────────────────────────────────────────────────────────
export const AuthCallback = lazyLoad(() => import('@pages/auth/AuthCallback'));

// Route configuration interface
interface RouteConfig {
  path: string;
  element: React.ComponentType;
}

// Main application routes
export const mainRoutes: RouteConfig[] = [
  { path: '/', element: Home },
  { path: AppRoutes.CYBER_NEWS, element: CyberNews },
  { path: AppRoutes.ABOUT, element: About },
  { path: AppRoutes.TEAM, element: Team },
  { path: AppRoutes.RESOURCES, element: Resources },
  { path: AppRoutes.PROJECTS, element: Projects },
  { path: AppRoutes.BLOG, element: Blog },
  { path: AppRoutes.TESTIMONIALS, element: Testimonials },
  { path: AppRoutes.PLAYGROUND, element: Playground },
  { path: AppRoutes.PLAYGROUND_SQL, element: PlaygroundSQL },
  { path: AppRoutes.PLAYGROUND_WEB, element: PlaygroundWeb },
  { path: AppRoutes.PLAYGROUND_SYSTEM, element: PlaygroundSystem },
  { path: AppRoutes.PLAYGROUND_CRYPTO, element: PlaygroundCrypto },
  { path: AppRoutes.PLAYGROUND_VM,   element: PlaygroundVM },
  { path: AppRoutes.PLAYGROUND_OVPN, element: PlaygroundOVPN },
  { path: '/playground/binary-exploitation', element: PlaygroundBinary },
  { path: '/playground/reverse-engineering', element: PlaygroundReverse },
  { path: '/playground/forensics', element: PlaygroundForensics },
  { path: '/playground/steganography', element: PlaygroundSteganography },
  { path: '/playground/osint', element: PlaygroundOSINT },
  { path: '/playground/mobile-security', element: PlaygroundMobile },
  { path: AppRoutes.PLAYGROUND_CVE, element: PlaygroundCVE },
  { path: AppRoutes.PLAYGROUND_LEARNING, element: PlaygroundLearning },
  { path: AppRoutes.PLAYGROUND_LEARNING_WRITEUPS, element: PlaygroundLearningWriteups },
  { path: AppRoutes.PLAYGROUND_LEARNING_TOOLS, element: PlaygroundLearningTools },
  { path: AppRoutes.PLAYGROUND_LEARNING_ROADMAP, element: PlaygroundLearningRoadmap },
  { path: AppRoutes.LEARNING_PATH, element: LearningPath },
  { path: AppRoutes.CONTACT, element: Contact },
  { path: AppRoutes.CAREERS, element: Careers },
  { path: AppRoutes.VALUES_CULTURE, element: ValuesCulture },
  { path: AppRoutes.CSR, element: CSR },
  { path: AppRoutes.PARTNER_PROGRAM, element: PartnerProgram },
  { path: AppRoutes.SECURITY_GLOSSARY, element: SecurityGlossary },
  { path: AppRoutes.AWARDS, element: Awards },
  { path: AppRoutes.HELP, element: Help },
  { path: AppRoutes.SETTINGS, element: Settings },
  { path: AppRoutes.IT_SERVICES_STORE, element: ITServicesStore },
  { path: AppRoutes.IT_SERVICES_CHECKOUT, element: ITServicesCheckout },
  
  // Auth routes
  { path: '/dashboard/login', element: DashboardLogin },
  { path: '/auth/callback', element: AuthCallback },
];

// Service routes configuration
export const serviceRoutes: RouteConfig[] = [
  // Cyber Security
  { path: AppRoutes.CYBER_SECURITY, element: CyberSecurity },
  { path: '/services/penetration-testing', element: PenetrationTesting },
  { path: '/services/security-audit', element: SecurityAudit },
  { path: '/services/network-security', element: NetworkSecurity },
  { path: '/services/cloud-security', element: CloudSecurity },
  { path: AppRoutes.CTF, element: CTF },

  // Web Development
  { path: AppRoutes.WEB_DEVELOPMENT, element: WebDevelopment },
  { path: AppRoutes.CUSTOM_WEB_APPS, element: CustomWebApps },
  { path: AppRoutes.ECOMMERCE, element: ECommerce },
  { path: AppRoutes.PWA, element: PWA },
  { path: AppRoutes.API_DEVELOPMENT, element: APIDevelopment },
  { path: AppRoutes.UI_UX_DESIGN, element: UIUXDesign },

  // Cloud Solutions
  { path: AppRoutes.CLOUD_SOLUTIONS, element: CloudSolutions },
  { path: AppRoutes.CLOUD_MIGRATION, element: CloudMigration },
  { path: AppRoutes.INFRASTRUCTURE_AS_CODE, element: InfrastructureAsCode },
  { path: AppRoutes.CLOUD_SECURITY_SOLUTIONS, element: CloudSecuritySolutions },
  { path: AppRoutes.COST_OPTIMIZATION, element: CostOptimization },
  { path: AppRoutes.MANAGED_SERVICES, element: ManagedServices },

  // Consulting
  { path: AppRoutes.CONSULTING, element: Consulting },
  { path: '/services/it-strategy-planning', element: ITStrategyPlanning },
  { path: '/services/technology-assessment', element: TechnologyAssessment },
  { path: '/services/digital-transformation', element: DigitalTransformation },
  { path: '/services/it-governance', element: ITGovernance },
  { path: '/services/vendor-management', element: VendorManagement },

  // IT Infrastructure
  { path: '/services/it-infrastructure', element: ITInfrastructure },
  { path: '/services/server-management', element: ServerManagement },
  { path: '/services/network-infrastructure', element: NetworkInfrastructure },
  { path: '/services/storage-solutions', element: StorageSolutions },
  { path: '/services/virtualization', element: Virtualization },
  { path: '/services/monitoring-maintenance', element: MonitoringMaintenance },
];

// Dashboard routes configuration
export const dashboardRoutes: RouteConfig[] = [
  { path: '/dashboard', element: Dashboard },
  { path: '/dashboard/projects', element: DashboardProjects },
  { path: '/dashboard/analytics', element: DashboardAnalytics },
  { path: '/dashboard/messages', element: DashboardMessages },
  { path: '/dashboard/clients', element: DashboardClients },
  { path: '/dashboard/reports', element: DashboardReports },
  { path: '/dashboard/settings', element: DashboardSettings },
  { path: '/dashboard/team', element: DashboardTeam },
  { path: '/dashboard/services', element: DashboardServices },
  { path: '/dashboard/tasks', element: DashboardTasks },
  { path: '/dashboard/invoices', element: DashboardInvoices },
  { path: '/dashboard/calendar', element: DashboardCalendar },
  { path: '/dashboard/resources', element: DashboardResources },
];
