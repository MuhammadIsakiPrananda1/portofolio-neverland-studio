// Application constants and configuration

export const COMPANY_INFO = {
  name: "Neverland Studio",
  tagline: "Securing the Digital Future",
  secondaryTagline: "Engineering Secure IT Systems",
  description:
    "Empowering businesses with cutting-edge cyber security solutions and robust IT infrastructure to safeguard your digital assets and drive innovation.",
  email: "Arlianto032@gmail.com",
  phone: "+6281252254886",
  address:
    "Jl. Ki Ageng Gribig No.28, Madyopuro, Kec. Kedungkandang, Kota Malang, Jawa Timur 65139",
  founded: "2020",
} as const;

export const SOCIAL_LINKS = {
  linkedin: "https://linkedin.com/company/neverland-studio",
  twitter: "https://twitter.com/neverlandstudio",
  github: "https://github.com/neverland-studio",
  facebook: "https://facebook.com/neverlandstudio",
} as const;

// Navigation routes
export enum Routes {
  HOME = "/",
  SERVICES = "/services",
  CYBER_SECURITY = "/services/cyber-security",
  WEB_DEVELOPMENT = "/services/web-development",
  CUSTOM_WEB_APPS = "/services/custom-web-apps",
  ECOMMERCE = "/services/ecommerce",
  PWA = "/services/pwa",
  API_DEVELOPMENT = "/services/api-development",
  UI_UX_DESIGN = "/services/ui-ux-design",
  CLOUD_SOLUTIONS = "/services/cloud-solutions",
  CLOUD_MIGRATION = "/services/cloud-migration",
  INFRASTRUCTURE_AS_CODE = "/services/infrastructure-as-code",
  CLOUD_SECURITY_SOLUTIONS = "/services/cloud-security-solutions",
  COST_OPTIMIZATION = "/services/cost-optimization",
  MANAGED_SERVICES = "/services/managed-services",
  CONSULTING = "/services/consulting",
  CTF = "/services/ctf",
  ABOUT = "/about",
  PROJECTS = "/projects",
  BLOG = "/blog",
  AWARDS = "/awards",
  PLAYGROUND = "/playground",
  PLAYGROUND_SQL = "/playground/sql-injection",
  PLAYGROUND_WEB = "/playground/web-security",
  PLAYGROUND_SYSTEM = "/playground/system-exploitation",
  PLAYGROUND_CRYPTO = "/playground/cryptography",
  PLAYGROUND_VM = "/playground/virtual-machine",
  PLAYGROUND_OVPN = "/playground/ovpn",
  PLAYGROUND_CVE = "/playground/cve-labs",
  PLAYGROUND_LEARNING = "/playground/learning",
  PLAYGROUND_LEARNING_WRITEUPS = "/playground/learning/writeups",
  PLAYGROUND_LEARNING_TOOLS = "/playground/learning/tools",
  PLAYGROUND_LEARNING_ROADMAP = "/playground/learning/roadmap",
  LEARNING_PATH = "/learning-path",
  WEB_SECURITY_VULNERABILITIES = "/web-security-vulnerabilities",
  CONTACT = "/contact",
  TEAM = "/team",
  CAREERS = "/company/careers",
  SECURITY_GLOSSARY = "/security-glossary",
  VALUES_CULTURE = "/company/values-culture",
  CSR = "/company/csr",
  PARTNER_PROGRAM = "/company/partner-program",
  RESOURCES = "/resources",
  TESTIMONIALS = "/testimonials",
  HELP = "/help",
  SETTINGS = "/settings",
  PRICING = "/pricing",

  // Dashboard Routes
  DASHBOARD = "/dashboard",
  DASHBOARD_PROJECTS = "/dashboard/projects",
  DASHBOARD_ANALYTICS = "/dashboard/analytics",
  DASHBOARD_MESSAGES = "/dashboard/messages",
  DASHBOARD_CLIENTS = "/dashboard/clients",
  DASHBOARD_REPORTS = "/dashboard/reports",
  DASHBOARD_SETTINGS = "/dashboard/settings",
  DASHBOARD_TEAM = "/dashboard/team",
  DASHBOARD_SERVICES = "/dashboard/services",
  DASHBOARD_TASKS = "/dashboard/tasks",
  DASHBOARD_INVOICES = "/dashboard/invoices",
  DASHBOARD_CALENDAR = "/dashboard/calendar",
  DASHBOARD_RESOURCES = "/dashboard/resources",

  // Main Routes
  CYBER_NEWS = "/cyber-news",
  IT_SERVICES_STORE = "/store",
  IT_SERVICES_CHECKOUT = "/store/checkout",
}

// Service IDs
export enum ServiceId {
  PENETRATION_TESTING = "penetration-testing",
  SECURITY_AUDIT = "security-audit",
  NETWORK_SECURITY = "network-security",
  CLOUD_SECURITY = "cloud-security",
  IT_INFRASTRUCTURE = "it-infrastructure",
  MANAGED_SECURITY = "managed-security",
}

// Message types for contact form
export enum MessageType {
  GENERAL = "general",
  SECURITY_AUDIT = "security-audit",
  PENETRATION_TESTING = "penetration-testing",
  CONSULTING = "consulting",
  SUPPORT = "support",
}

// Company statistics
export const COMPANY_STATS: ReadonlyArray<{
  readonly label: string;
  readonly value: string;
  readonly suffix?: string;
  readonly prefix?: string;
}> = [
  { label: "Projects", value: "500", suffix: "+" },
  { label: "Clients", value: "150", suffix: "+" },
  { label: "Experts", value: "50", suffix: "+" },
  { label: "Countries", value: "25", suffix: "+" },
  { label: "Years", value: "10", suffix: "+" },
  { label: "Uptime", value: "99.9", suffix: "%" },
];

// Trust badges/certifications
export const CERTIFICATIONS = [
  "ISO 27001",
  "SOC 2 Type II",
  "PCI DSS",
  "CISSP",
  "CEH",
  "OSCP",
] as const;

export const TECH_STACK = [
  { name: "React", icon: "react" },
  { name: "Node.js", icon: "node" },
  { name: "AWS", icon: "aws" },
  { name: "Docker", icon: "docker" },
  { name: "Kubernetes", icon: "kubernetes" },
  { name: "Python", icon: "python" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Next.js", icon: "nextjs" },
] as const;

export const TESTIMONIALS_DATA = [
  {
    id: 1,
    content:
      "Neverland Studio transformed our security posture completely. Their penetration testing found vulnerabilities we didn't even know existed. Highly recommended.",
    author: "Sarah Jenkins",
    role: "CTO, TechFin Solutions",
    rating: 5,
  },
  {
    id: 2,
    content:
      "The cloud migration process was seamless and secure. Their team demonstrated deep expertise in AWS and ensured zero downtime for our critical applications.",
    author: "Michael Chang",
    role: "VP of Engineering, HealthCare Plus",
    rating: 5,
  },
  {
    id: 3,
    content:
      "Outstanding IT infrastructure support. Since partnering with them, our system uptime has been 99.99%. They are truly a reliable security partner.",
    author: "David Rodriguez",
    role: "Director of IT, Global Manufacturing Corp",
    rating: 5,
  },
];

// SEO Configuration
export const SEO = {
  defaultTitle: "Neverland Studio - Cyber Security & IT Solutions",
  titleTemplate: "%s | Neverland Studio",
  description:
    "Enterprise-grade cyber security and IT infrastructure solutions. Penetration testing, security audits, network security, cloud security, and IT consulting.",
  keywords: [
    "cyber security",
    "penetration testing",
    "security audit",
    "network security",
    "cloud security",
    "IT infrastructure",
    "enterprise security",
    "cybersecurity consulting",
  ],
} as const;
