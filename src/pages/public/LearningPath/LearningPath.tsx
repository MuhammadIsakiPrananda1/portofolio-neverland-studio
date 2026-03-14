import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BookOpen, Shield, Globe, Terminal, Cpu, Cloud, Code2,
  ChevronRight, ChevronDown, ChevronUp, Star, Clock, Zap,
  Trophy, Users, Target, ArrowRight, Flame,
  GraduationCap, BarChart2, Layers, Award,
  ScanLine, FileSearch, Eye, Sword, Play, X
} from 'lucide-react';
import Button from '@components/atoms/Button';
import { Routes } from '@config/constants';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// ─── Types ───────────────────────────────────────────────────────────────────

interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  xp: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  topics: string[];
  prerequisites?: string[];
  isNew?: boolean;
  isPopular?: boolean;
}

interface Track {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  gradient: string;
  borderColor: string;
  bgColor: string;
  iconColor: string;
  glowColor: string;
  category: string;
  totalXP: number;
  modules: number;
  duration: string;
  enrolledCount: string;
  rating: number;
  description: string;
  skills: string[];
  moduleList: Module[];
}

// ─── Data ────────────────────────────────────────────────────────────────────

const TRACKS: Track[] = [
  {
    id: 'cybersec',
    title: 'Cybersecurity Fundamentals',
    subtitle: 'Start your security journey',
    icon: Shield,
    gradient: 'from-emerald-500 to-teal-500',
    borderColor: 'border-emerald-500/25',
    bgColor: 'bg-emerald-500/5',
    iconColor: 'text-emerald-400',
    glowColor: 'shadow-emerald-500/10',
    category: 'Security',
    totalXP: 4200,
    modules: 8,
    duration: '6–8 weeks',
    enrolledCount: '12.4K',
    rating: 4.9,
    description: 'Master the foundations every security professional must know — networking, Linux, threat modeling, and hands-on lab setup.',
    skills: ['TCP/IP & Networking', 'Linux CLI', 'CIA Triad', 'Threat Modeling', 'VirtualBox / Kali', 'OSINT Basics'],
    moduleList: [
      { id: 'cs-01', title: 'Introduction to Cybersecurity', description: 'What is cybersecurity? Offensive vs defensive, career paths, and the threat landscape.', duration: '45 min', xp: 300, difficulty: 'Beginner', topics: ['Security mindset', 'Career overview', 'Threat landscape'], isNew: false },
      { id: 'cs-02', title: 'Networking Essentials', description: 'TCP/IP, DNS, HTTP/S, OSI model, subnetting, and the protocols that power the internet.', duration: '90 min', xp: 500, difficulty: 'Beginner', topics: ['OSI model', 'IP/TCP/UDP', 'DNS & HTTP', 'Subnetting'], isPopular: true },
      { id: 'cs-03', title: 'Linux for Security Pros', description: 'Filesystem, permissions, process management, and bash scripting essentials.', duration: '2 hrs', xp: 600, difficulty: 'Beginner', topics: ['File system', 'Bash scripting', 'User permissions', 'Service management'] },
      { id: 'cs-04', title: 'Cryptography Basics', description: 'Symmetric, asymmetric, hashing, digital signatures, and TLS/SSL explained.', duration: '1.5 hrs', xp: 500, difficulty: 'Beginner', topics: ['AES/RSA', 'Hashing', 'PKI', 'TLS'] },
      { id: 'cs-05', title: 'Threat Intelligence & OSINT', description: 'Passive and active reconnaissance, Shodan, theHarvester, and Maltego.', duration: '2 hrs', xp: 600, difficulty: 'Intermediate', topics: ['Recon-ng', 'Shodan', 'WHOIS', 'Google Dorking'], prerequisites: ['cs-02'] },
      { id: 'cs-06', title: 'Building Your Hacking Lab', description: 'Set up VirtualBox, import Kali Linux, configure a safe isolated network.', duration: '1 hr', xp: 300, difficulty: 'Beginner', topics: ['VirtualBox', 'Kali Linux', 'NAT/Host-only network'] },
      { id: 'cs-07', title: 'Security Policies & Ethics', description: 'Laws around ethical hacking, responsible disclosure, Bug Bounty programs, and GDPR.', duration: '1 hr', xp: 250, difficulty: 'Beginner', topics: ['Bug Bounty', 'Disclosure', 'CFAA/GDPR', 'Scope rules'] },
      { id: 'cs-08', title: 'Capstone: Your First Pentest Report', description: 'Combine all skills to write a professional pentest report on a sample scope.', duration: '3 hrs', xp: 1150, difficulty: 'Intermediate', topics: ['Report writing', 'CVSS scoring', 'Executive summary', 'Evidence'], prerequisites: ['cs-02', 'cs-05'], isPopular: true },
    ],
  },
  {
    id: 'webapp',
    title: 'Web Application Security',
    subtitle: 'Hack the web, protect the web',
    icon: Globe,
    gradient: 'from-blue-500 to-indigo-500',
    borderColor: 'border-blue-500/25',
    bgColor: 'bg-blue-500/5',
    iconColor: 'text-blue-400',
    glowColor: 'shadow-blue-500/10',
    category: 'Security',
    totalXP: 5800,
    modules: 10,
    duration: '8–10 weeks',
    enrolledCount: '18.7K',
    rating: 4.9,
    description: 'Deep dive into the OWASP Top 10, Burp Suite, and modern web exploitation. From SQLi to SSRF — learn to find and fix real vulnerabilities.',
    skills: ['OWASP Top 10', 'Burp Suite', 'SQL Injection', 'XSS / CSRF', 'IDOR', 'SSRF / XXE'],
    moduleList: [
      { id: 'wa-01', title: 'HTTP Deep Dive', description: 'Requests, responses, headers, cookies, sessions, and HTTPS in detail.', duration: '1 hr', xp: 350, difficulty: 'Beginner', topics: ['HTTP methods', 'Status codes', 'Cookies/Sessions', 'HTTPS/TLS'] },
      { id: 'wa-02', title: 'OWASP Top 10 (2021)', description: 'Overview of the 10 most critical web application security risks with demos.', duration: '2 hrs', xp: 600, difficulty: 'Beginner', topics: ['Injection', 'Broken Auth', 'XSS', 'IDOR', 'Misconfig'], isPopular: true },
      { id: 'wa-03', title: 'SQL Injection Mastery', description: 'Manual SQLi, blind, time-based, out-of-band, automation with SQLMap.', duration: '3 hrs', xp: 800, difficulty: 'Intermediate', topics: ['Union-based', 'Blind SQLi', 'Time-based', 'SQLMap'], prerequisites: ['wa-01'], isPopular: true },
      { id: 'wa-04', title: 'XSS & CSRF', description: 'Reflected, stored, DOM-based XSS. CSRF bypass with token manipulation.', duration: '2.5 hrs', xp: 700, difficulty: 'Intermediate', topics: ['Reflected XSS', 'Stored XSS', 'CSP bypass', 'CSRF tokens'] },
      { id: 'wa-05', title: 'Authentication & Sessions', description: 'Weak credentials, JWT attacks, OAuth flaws, and brute-force protection bypass.', duration: '2 hrs', xp: 600, difficulty: 'Intermediate', topics: ['JWT attacks', 'OAuth flaws', 'Brute force', 'MFA bypass'] },
      { id: 'wa-06', title: 'File Upload & Path Traversal', description: 'Bypass upload filters, traverse directories, and achieve RCE via malicious files.', duration: '2 hrs', xp: 700, difficulty: 'Intermediate', topics: ['MIME bypass', 'Extension tricks', 'Path traversal', 'Webshells'], prerequisites: ['wa-01'] },
      { id: 'wa-07', title: 'SSRF & XXE', description: 'Server-side request forgery, XML external entity injection, and cloud metadata exploits.', duration: '2.5 hrs', xp: 750, difficulty: 'Advanced', topics: ['SSRF chains', 'AWS metadata', 'XXE OOB', 'Blind SSRF'], prerequisites: ['wa-04'] },
      { id: 'wa-08', title: 'Business Logic Vulnerabilities', description: 'Identify logic flaws, IDOR, insecure direct object references, and horizontal privilege escalation.', duration: '2 hrs', xp: 650, difficulty: 'Intermediate', topics: ['IDOR', 'Price tampering', 'Race conditions', 'Role bypass'] },
      { id: 'wa-09', title: 'Burp Suite Mastery', description: 'Proxy, Repeater, Intruder, Scanner, and custom extensions for automated testing.', duration: '3 hrs', xp: 800, difficulty: 'Intermediate', topics: ['Repeater', 'Intruder', 'Scanner', 'BApp Store'], isNew: true },
      { id: 'wa-10', title: 'Capstone: Bug Bounty Hunt', description: 'Apply all skills on a simulated bug bounty target and write a full disclosure report.', duration: '5 hrs', xp: 1550, difficulty: 'Advanced', topics: ['Full scope recon', 'Chain exploits', 'PoC writing', 'HackerOne report'], prerequisites: ['wa-03', 'wa-07'], isPopular: true },
    ],
  },
  {
    id: 'pentest',
    title: 'Penetration Testing',
    subtitle: 'Professional red-team methodology',
    icon: Terminal,
    gradient: 'from-orange-500 to-red-500',
    borderColor: 'border-orange-500/25',
    bgColor: 'bg-orange-500/5',
    iconColor: 'text-orange-400',
    glowColor: 'shadow-orange-500/10',
    category: 'Security',
    totalXP: 6500,
    modules: 9,
    duration: '10–12 weeks',
    enrolledCount: '9.2K',
    rating: 4.8,
    description: 'End-to-end professional pentesting: scoping, OSINT, exploitation, Active Directory attacks, and writing polished client reports.',
    skills: ['Metasploit', 'Nmap / Shodan', 'Active Directory', 'Privilege Escalation', 'Pivoting', 'Report Writing'],
    moduleList: [
      { id: 'pt-01', title: 'Pentest Methodology', description: 'PTES, NIST SP 800-115, rules of engagement, scoping, and legal contracts.', duration: '1 hr', xp: 350, difficulty: 'Beginner', topics: ['PTES phases', 'Scoping', 'Legal docs', 'OSCP prep'] },
      { id: 'pt-02', title: 'Reconnaissance & Scanning', description: 'Passive OSINT, Nmap service enumeration, port scanning strategies, NSE scripts.', duration: '2 hrs', xp: 600, difficulty: 'Intermediate', topics: ['Nmap', 'Shodan', 'theHarvester', 'NSE'], isPopular: true },
      { id: 'pt-03', title: 'Exploitation with Metasploit', description: 'Metasploit framework, modules, payloads, and post-exploitation with Meterpreter.', duration: '3 hrs', xp: 800, difficulty: 'Intermediate', topics: ['Modules', 'Meterpreter', 'Payload gen', 'Sessions'], prerequisites: ['pt-02'] },
      { id: 'pt-04', title: 'Windows Privilege Escalation', description: 'Local privilege escalation techniques: service misconfigs, DLL hijacking, token impersonation.', duration: '3 hrs', xp: 900, difficulty: 'Advanced', topics: ['DLL hijack', 'Unquoted paths', 'Token impersonation', 'WinPEAS'], prerequisites: ['pt-03'] },
      { id: 'pt-05', title: 'Linux Privilege Escalation', description: 'SUID/SGID, cron jobs, weak sudo, capabilities, and kernel exploits.', duration: '2.5 hrs', xp: 800, difficulty: 'Advanced', topics: ['SUID abuse', 'Cron injection', 'Sudo -l', 'LinPEAS'], prerequisites: ['pt-03'] },
      { id: 'pt-06', title: 'Active Directory Attacks', description: 'AD enumeration, Kerberoasting, AS-REP Roasting, Pass-the-Hash, BloodHound.', duration: '4 hrs', xp: 1100, difficulty: 'Advanced', topics: ['BloodHound', 'Kerberoast', 'Pass-the-Hash', 'DCSync'], prerequisites: ['pt-04'], isPopular: true },
      { id: 'pt-07', title: 'Post-Exploitation & Persistence', description: 'Establishing persistence, lateral movement, pivoting through networks, covering tracks.', duration: '3 hrs', xp: 850, difficulty: 'Advanced', topics: ['Lateral movement', 'Pivoting', 'C2 basics', 'Cover tracks'], prerequisites: ['pt-03'] },
      { id: 'pt-08', title: 'Evasion Techniques', description: 'AV evasion, obfuscation, payload encoding, AMSI bypass, and EDR circumvention basics.', duration: '2 hrs', xp: 700, difficulty: 'Advanced', topics: ['AV bypass', 'AMSI', 'Obfuscation', 'Reflective loading'], prerequisites: ['pt-07'], isNew: true },
      { id: 'pt-09', title: 'Capstone: Full Network Pentest', description: 'Complete a multi-machine network engagement: from recon to domain compromise and full report.', duration: '6 hrs', xp: 1400, difficulty: 'Advanced', topics: ['Full kill chain', 'AD compromise', 'Report', 'Remediation'], prerequisites: ['pt-06', 'pt-07'] },
    ],
  },
  {
    id: 'reverse',
    title: 'Reverse Engineering',
    subtitle: 'Understand what the machine really does',
    icon: Cpu,
    gradient: 'from-purple-500 to-pink-500',
    borderColor: 'border-purple-500/25',
    bgColor: 'bg-purple-500/5',
    iconColor: 'text-purple-400',
    glowColor: 'shadow-purple-500/10',
    category: 'Security',
    totalXP: 5200,
    modules: 7,
    duration: '10–14 weeks',
    enrolledCount: '5.8K',
    rating: 4.7,
    description: 'Decompile, disassemble, and understand compiled binaries. From reading x86 assembly to defeating anti-analysis tricks.',
    skills: ['x86/x64 Assembly', 'Ghidra / IDA Free', 'GDB / pwndbg', 'Malware Analysis', 'Anti-debug bypass', 'CTF RE challenges'],
    moduleList: [
      { id: 're-01', title: 'x86/x64 Assembly Crash Course', description: 'Registers, stack, calling conventions, key instructions, and reading disassembly.', duration: '3 hrs', xp: 700, difficulty: 'Intermediate', topics: ['Registers', 'Stack frames', 'Calling conventions', 'Flags'] },
      { id: 're-02', title: 'Static Analysis with Ghidra', description: 'Importing binaries, function identification, renaming, and C pseudocode analysis.', duration: '2.5 hrs', xp: 650, difficulty: 'Intermediate', topics: ['Ghidra UI', 'Decompiler', 'Symbol analysis', 'Patching'], prerequisites: ['re-01'], isPopular: true },
      { id: 're-03', title: 'Dynamic Analysis with GDB', description: 'Setting breakpoints, inspecting memory, stepping through code, and scripting GDB.', duration: '2.5 hrs', xp: 700, difficulty: 'Intermediate', topics: ['GDB commands', 'pwndbg', 'Watchpoints', 'GDB-Python'], prerequisites: ['re-01'] },
      { id: 're-04', title: 'Crackme Challenges', description: 'Solve increasing difficulty crackmes to practice all RE skills — from simple keygens to complex anti-debug.', duration: '3 hrs', xp: 800, difficulty: 'Intermediate', topics: ['Keygens', 'Serial checks', 'Patches', 'Anti-debug'], prerequisites: ['re-02', 're-03'], isPopular: true },
      { id: 're-05', title: 'Malware Analysis Basics', description: 'Static and dynamic malware analysis, sandbox analysis, IOC extraction, and YARA rules.', duration: '4 hrs', xp: 900, difficulty: 'Advanced', topics: ['Sandbox', 'IOC extraction', 'YARA', 'Behavior analysis'], prerequisites: ['re-03'] },
      { id: 're-06', title: 'Anti-Analysis Techniques', description: 'Packers, obfuscators, anti-debug, anti-VM, and how to bypass them.', duration: '3 hrs', xp: 800, difficulty: 'Advanced', topics: ['Packers', 'VM detection', 'Timing checks', 'Unpacking'], prerequisites: ['re-05'] },
      { id: 're-07', title: 'Capstone: Malware Reverse Engineering', description: 'Fully analyze a real-world malware sample, extract C2 indicators, and write a threat report.', duration: '5 hrs', xp: 1350, difficulty: 'Advanced', topics: ['Full analysis', 'C2 extraction', 'Threat report', 'MITRE ATT&CK'], prerequisites: ['re-05', 're-06'] },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud Security',
    subtitle: 'Secure infrastructure in the sky',
    icon: Cloud,
    gradient: 'from-cyan-500 to-sky-500',
    borderColor: 'border-cyan-500/25',
    bgColor: 'bg-cyan-500/5',
    iconColor: 'text-cyan-400',
    glowColor: 'shadow-cyan-500/10',
    category: 'Cloud',
    totalXP: 4800,
    modules: 8,
    duration: '8–10 weeks',
    enrolledCount: '7.3K',
    rating: 4.8,
    description: 'Attack and defend AWS, Azure, and GCP environments. IAM misconfigurations, S3 bucket leaks, container escapes, and cloud incident response.',
    skills: ['AWS IAM', 'S3 Security', 'Container Security', 'Terraform', 'Cloud SIEM', 'Incident Response'],
    moduleList: [
      { id: 'cl-01', title: 'Cloud Security Fundamentals', description: 'Shared responsibility model, threat actors in the cloud, and key cloud services overview.', duration: '1 hr', xp: 300, difficulty: 'Beginner', topics: ['Shared responsibility', 'Cloud threat model', 'AWS/Azure basics'] },
      { id: 'cl-02', title: 'AWS IAM Deep Dive', description: 'Policies, roles, privilege escalation in IAM, and the least-privilege principle.', duration: '2 hrs', xp: 600, difficulty: 'Intermediate', topics: ['IAM policies', 'Roles vs Users', 'PrivEsc paths', 'MFA enforcement'], isPopular: true },
      { id: 'cl-03', title: 'S3 & Data Exposure', description: 'Misconfigured buckets, public ACLs, presigned URL abuse, and data leakage scenarios.', duration: '1.5 hrs', xp: 500, difficulty: 'Intermediate', topics: ['Public buckets', 'ACLs', 'Presigned URLs', 'Bucket enumeration'], prerequisites: ['cl-02'] },
      { id: 'cl-04', title: 'Container & Kubernetes Security', description: 'Docker escape, Pod security, RBAC misconfigs, and lateral movement in K8s clusters.', duration: '3 hrs', xp: 800, difficulty: 'Advanced', topics: ['Docker escape', 'K8s RBAC', 'Pod sec', 'Namespace bypass'], prerequisites: ['cl-01'], isNew: true },
      { id: 'cl-05', title: 'Serverless & Lambda Attacks', description: 'Function injection, over-privileged Lambdas, environment variable leaks, and event injection.', duration: '2 hrs', xp: 650, difficulty: 'Advanced', topics: ['Env vars', 'Injection via events', 'IAM pivoting', 'Cold start analysis'], prerequisites: ['cl-02'] },
      { id: 'cl-06', title: 'Infrastructure as Code (Terraform)', description: 'Writing secure Terraform, detecting misconfigs with tfsec and Checkov.', duration: '2 hrs', xp: 600, difficulty: 'Intermediate', topics: ['Terraform HCL', 'tfsec', 'Checkov', 'State file risks'] },
      { id: 'cl-07', title: 'Cloud SIEM & Detection', description: 'CloudTrail, GuardDuty, Azure Sentinel setup, alert creation, and threat hunting.', duration: '2.5 hrs', xp: 700, difficulty: 'Intermediate', topics: ['CloudTrail', 'GuardDuty', 'Sentinel', 'KQL basics'], prerequisites: ['cl-02'] },
      { id: 'cl-08', title: 'Capstone: Cloud Incident Response', description: 'Respond to a simulated AWS breach: identify the attacker path, contain, and write a post-mortem.', duration: '4 hrs', xp: 1150, difficulty: 'Advanced', topics: ['IR playbook', 'Evidence collection', 'Timeline', 'Post-mortem'], prerequisites: ['cl-03', 'cl-07'] },
    ],
  },
  {
    id: 'devops',
    title: 'DevSecOps Engineering',
    subtitle: 'Security baked into every pipeline',
    icon: Code2,
    gradient: 'from-violet-500 to-fuchsia-500',
    borderColor: 'border-violet-500/25',
    bgColor: 'bg-violet-500/5',
    iconColor: 'text-violet-400',
    glowColor: 'shadow-violet-500/10',
    category: 'Development',
    totalXP: 4400,
    modules: 7,
    duration: '7–9 weeks',
    enrolledCount: '6.1K',
    rating: 4.7,
    description: 'Integrate security into CI/CD pipelines. SAST, DAST, SCA, secrets scanning, and compliance-as-code for modern engineering teams.',
    skills: ['SAST / DAST', 'SBOM & SCA', 'Secrets Scanning', 'GitHub Actions', 'Docker Hardening', 'OWASP SAMM'],
    moduleList: [
      { id: 'ds-01', title: 'DevSecOps Fundamentals', description: 'What is DevSecOps? Shift-left security, threat modeling in sprints, OWASP SAMM.', duration: '1 hr', xp: 300, difficulty: 'Beginner', topics: ['Shift-left', 'OWASP SAMM', 'Threat modeling', 'Security champions'] },
      { id: 'ds-02', title: 'SAST: Static Code Analysis', description: 'Integrate Semgrep, SonarQube, Bandit into CI pipelines and triage findings.', duration: '2 hrs', xp: 600, difficulty: 'Intermediate', topics: ['Semgrep rules', 'SonarQube', 'Bandit', 'False positive triage'], isPopular: true },
      { id: 'ds-03', title: 'SCA & Software Bill of Materials', description: 'Detect vulnerable dependencies with Dependabot, Snyk, and generate SBOM.', duration: '1.5 hrs', xp: 500, difficulty: 'Intermediate', topics: ['SBOM', 'Snyk', 'Dependabot', 'CVE triage'], prerequisites: ['ds-01'] },
      { id: 'ds-04', title: 'Secrets Management', description: 'Detect leaked secrets in code with truffleHog, GitLeaks, and manage with Vault / AWS Secrets Manager.', duration: '1.5 hrs', xp: 500, difficulty: 'Intermediate', topics: ['truffleHog', 'GitLeaks', 'Vault', 'AWS Secrets Manager'], prerequisites: ['ds-01'] },
      { id: 'ds-05', title: 'Container & Image Security', description: 'Trivy, Grype, Dockerfile best practices, minimal base images, and image signing.', duration: '2 hrs', xp: 600, difficulty: 'Intermediate', topics: ['Trivy', 'Grype', 'Distroless', 'Cosign'], prerequisites: ['ds-03'], isNew: true },
      { id: 'ds-06', title: 'DAST in CI/CD', description: 'OWASP ZAP automated scanning inside GitHub Actions/GitLab CI pipelines.', duration: '2 hrs', xp: 600, difficulty: 'Intermediate', topics: ['ZAP CLI', 'Passive/active scan', 'CI integration', 'Report parsing'], prerequisites: ['ds-02'] },
      { id: 'ds-07', title: 'Capstone: Secure CI/CD Pipeline', description: 'Build a full GitHub Actions pipeline with SAST, SCA, secrets scanning, container scan, and DAST.', duration: '4 hrs', xp: 1300, difficulty: 'Advanced', topics: ['End-to-end pipeline', 'Gate policies', 'Dashboards', 'Documentation'], prerequisites: ['ds-05', 'ds-06'] },
    ],
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const difficultyConfig = {
  Beginner: { className: 'bg-red-900/10 text-red-500 border-red-500/20', dot: 'bg-red-500' },
  Intermediate: { className: 'bg-red-800/10 text-red-400 border-red-500/20', dot: 'bg-red-400' },
  Advanced: { className: 'bg-red-700/10 text-red-300 border-red-500/20', dot: 'bg-red-300' },
};

function DifficultyBadge({ level }: { level: 'Beginner' | 'Intermediate' | 'Advanced' }) {
  const cfg = difficultyConfig[level];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm text-[10px] font-bold border ${cfg.className}`}>
      <span className={`w-1.5 h-1.5 rounded-sm ${cfg.dot}`} />
      {level}
    </span>
  );
}

function ModuleCard({ mod }: { mod: Module }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-sm border border-white/10 bg-[#0f172a] hover:bg-[#0B1120] hover:border-red-500/30 transition-all duration-200 group">
      <div className={`flex-shrink-0 w-9 h-9 rounded-sm border border-red-500/20 flex items-center justify-center text-xs font-bold text-red-500 bg-[#0B1120] group-hover:border-red-500/50 transition-colors`}>
        <Play className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h4 className="text-sm font-semibold text-white">{mod.title}</h4>
          {mod.isNew && (
            <span className="px-1.5 py-0.5 rounded-sm text-[9px] font-bold bg-white/10 text-white border border-white/20">NEW</span>
          )}
          {mod.isPopular && (
            <span className="px-1.5 py-0.5 rounded-sm text-[9px] font-bold bg-red-900/40 text-red-500 border border-red-500/30 flex items-center gap-0.5"><Flame className="w-2.5 h-2.5" /> HOT</span>
          )}
        </div>
        <p className="text-xs text-gray-500 leading-relaxed mb-2">{mod.description}</p>
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-600">
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{mod.duration}</span>
          <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-red-500" />{mod.xp} XP</span>
          <DifficultyBadge level={mod.difficulty} />
        </div>
      </div>
    </div>
  );
}

function TrackCard({ track, isExpanded, onToggle }: { track: Track; isExpanded: boolean; onToggle: () => void }) {
  const Icon = track.icon;
  return (
    <motion.div
      variants={staggerItem}
      className={`rounded-sm border border-white/10 bg-[#0f172a] hover:border-red-500/30 overflow-hidden flex flex-col h-full transition-colors`}
    >
      <div className="h-1 bg-red-600 w-full" />
      {/* Header */}
      <div className="p-6 lg:p-8 flex flex-col flex-1 bg-[#0B1120]">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-start gap-4">
            <div className={`flex-shrink-0 p-3 rounded-sm border border-red-500/20 bg-[#0f172a]`}>
              <Icon className={`w-7 h-7 text-red-500`} />
            </div>
            <div>
              <span className={`text-[10px] font-bold uppercase tracking-widest text-red-500 mb-1 block opacity-70`}>{track.category}</span>
              <h3 className="text-xl font-bold text-white leading-tight">{track.title}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{track.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-red-500 flex-shrink-0">
            <Star className="w-4 h-4 fill-red-500" />
            <span className="text-sm font-bold text-white">{track.rating}</span>
          </div>
        </div>

        <p className="text-sm text-gray-400 leading-relaxed mb-5 line-clamp-3 min-h-[4.5rem]">{track.description}</p>

        {/* Skills */}
        <div className="grid grid-cols-3 gap-1.5 mb-5">
          {track.skills.map(skill => (
            <span key={skill} className="px-2.5 py-1.5 rounded-sm text-[11px] font-medium bg-[#0f172a] border border-white/10 text-gray-400 text-center truncate">{skill}</span>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-gray-500 mb-5">
          <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 flex-shrink-0" />{track.modules} Modules</span>
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 flex-shrink-0" />{track.duration}</span>
          <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 flex-shrink-0" />{track.enrolledCount} enrolled</span>
          <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />{track.totalXP.toLocaleString()} XP</span>
        </div>

        {/* CTA Row */}
        <div className="flex items-center gap-3 mt-auto pt-2">
          <button
            onClick={onToggle}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-sm font-semibold text-sm transition-all duration-200 bg-red-600 text-white hover:bg-red-700`}
          >
            {isExpanded ? <><X className="w-4 h-4" /> Hide Modules</> : <><ChevronRight className="w-4 h-4" /> View Modules</>}
          </button>
          <Link to={Routes.CONTACT} aria-label="Enroll in course">
            <button className={`py-2.5 px-4 rounded-sm font-semibold text-sm border border-red-500/30 text-red-500 bg-transparent hover:bg-red-500/10 transition-all duration-200`}>
              Enroll Free
            </button>
          </Link>
        </div>
      </div>

      {/* Expandable Module List */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 lg:px-8 pb-6 lg:pb-8 border-t border-white/5 pt-5">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Course Curriculum — {track.modules} Modules</h4>
              <div className="space-y-2">
                {track.moduleList.map((mod) => (
                  <ModuleCard key={mod.id} mod={mod} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const CATEGORIES = ['All', 'Security', 'Cloud', 'Development'];

export default function LearningPath() {
  const [expandedTrack, setExpandedTrack] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [showXPBreakdown, setShowXPBreakdown] = useState(false);

  const filteredTracks = TRACKS.filter(t => activeCategory === 'All' || t.category === activeCategory);

  const totalModules = TRACKS.reduce((sum, t) => sum + t.modules, 0);
  const totalXP = TRACKS.reduce((sum, t) => sum + t.totalXP, 0);
  const totalEnrolled = '59K+';

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container-custom">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-20 h-1 bg-red-600 mx-auto mb-8 rounded-sm" />

          <div className="inline-flex p-4 rounded-sm border border-white/10 bg-[#0B1120] hover:border-red-500/30 transition-colors mb-6">
            <GraduationCap className="w-12 h-12 text-red-500" />
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white/90">Interactive </span>
            <span className="text-red-500">
              Learning Paths
            </span>
          </h1>

          <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Structured, hands-on courses built by security professionals. From zero to expert — follow
            guided paths, earn XP, and build real-world skills in cybersecurity, cloud, and beyond.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={Routes.PLAYGROUND_LEARNING_ROADMAP}>
              <Button variant="primary" size="lg" className="rounded-sm bg-red-600 hover:bg-red-700" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Browse Roadmaps
              </Button>
            </Link>
            <Link to={Routes.CONTACT}>
              <Button variant="outline" size="lg" className="rounded-sm border-white/10 hover:border-red-500/30">
                Get Mentorship
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* ── Stats ────────────────────────────────────────────────────────── */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { icon: Layers, value: `${TRACKS.length}`, label: 'Learning Tracks', color: 'text-red-500', border: 'hover:border-red-500/30' },
            { icon: BookOpen, value: `${totalModules}+`, label: 'Course Modules', color: 'text-red-500', border: 'hover:border-red-500/30' },
            { icon: Trophy, value: `${(totalXP / 1000).toFixed(0)}K+`, label: 'Total XP Available', color: 'text-red-500', border: 'hover:border-red-500/30' },
            { icon: Users, value: totalEnrolled, label: 'Active Learners', color: 'text-red-500', border: 'hover:border-red-500/30' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className={`rounded-sm p-6 border border-white/10 bg-[#0f172a] ${stat.border} transition-all duration-300 group`}
              whileHover={{ y: -4 }}
            >
              <stat.icon className={`w-6 h-6 ${stat.color} mb-3 group-hover:scale-110 transition-transform`} />
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Why Learn Here ───────────────────────────────────────────────── */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-red-500 mb-3 block">Platform Benefits</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Why learn on Neverland Studio?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Target, title: 'Hands-On Labs', description: 'Real-world exercises, not just theory. Each module ends with a practical challenge to cement your knowledge.', color: 'text-red-500', bg: 'bg-[#0f172a]', border: 'border-white/10' },
              { icon: BarChart2, title: 'XP Progression System', description: 'Earn XP for every completed module. Watch your skill level grow and unlock advanced content as you progress.', color: 'text-red-500', bg: 'bg-[#0f172a]', border: 'border-white/10' },
              { icon: Award, title: 'Industry Certifications', description: 'Paths align with OSCP, CEH, CompTIA Security+, eJPT, and AWS Security Specialty exam objectives.', color: 'text-red-500', bg: 'bg-[#0f172a]', border: 'border-white/10' },
              { icon: Eye, title: 'Expert-Curated Content', description: 'Courses created by active security professionals with real-world red team and blue team experience.', color: 'text-red-500', bg: 'bg-[#0f172a]', border: 'border-white/10' },
              { icon: Shield, title: 'Safe Legal Environment', description: 'All practice is done in isolated, legally safe lab environments — no risk of accidental illegal activity.', color: 'text-red-500', bg: 'bg-[#0f172a]', border: 'border-white/10' },
              { icon: Users, title: 'Community & Mentorship', description: 'Join Discord study groups, ask questions live, and get 1-on-1 mentorship from experienced practitioners.', color: 'text-red-500', bg: 'bg-[#0f172a]', border: 'border-white/10' },
            ].map((benefit, i) => (
              <motion.div
                key={i}
                className={`p-6 rounded-sm border ${benefit.border} ${benefit.bg} hover:bg-[#0B1120] hover:border-red-500/30 transition-all duration-300`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <div className={`inline-flex p-2.5 rounded-sm border ${benefit.border} ${benefit.bg} mb-4`}>
                  <benefit.icon className={`w-5 h-5 ${benefit.color}`} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── XP System explainer ──────────────────────────────────────────── */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => setShowXPBreakdown(!showXPBreakdown)}
            className="w-full flex items-center justify-between p-5 rounded-sm border border-white/10 bg-[#0f172a] hover:bg-[#0B1120] hover:border-red-500/30 transition-all"
          >
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-red-500" />
              <span className="font-semibold text-white">How does the XP system work?</span>
            </div>
            {showXPBreakdown ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
          </button>
          <AnimatePresence>
            {showXPBreakdown && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="p-5 rounded-b-sm border border-t-0 border-white/10 bg-[#0B1120]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { range: '0 – 1,000 XP', rank: 'Cadet', icon: '🎖️', color: 'text-gray-300' },
                      { range: '1,000 – 5,000 XP', rank: 'Specialist', icon: '🥉', color: 'text-red-800' },
                      { range: '5,000 – 15,000 XP', rank: 'Analyst', icon: '🥈', color: 'text-gray-400' },
                      { range: '15,000+ XP', rank: 'Elite Hacker', icon: '🥇', color: 'text-red-500' },
                    ].map(lvl => (
                      <div key={lvl.rank} className="flex items-center gap-3 p-3 rounded-sm bg-[#0f172a] border border-white/10">
                        <span className="text-2xl">{lvl.icon}</span>
                        <div>
                          <div className={`text-sm font-bold ${lvl.color}`}>{lvl.rank}</div>
                          <div className="text-[11px] text-gray-500">{lvl.range}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                    Complete modules to earn XP. Bonus XP awarded for first-try correct answers, speed runs, and helping other community members.
                    XP unlocks access to advanced paths and exclusive lab environments.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Tracks ───────────────────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-2 block">Curriculum</span>
              <h2 className="text-3xl font-bold text-white">Choose Your Learning Track</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-sm text-xs font-semibold transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'bg-[#0f172a] text-gray-400 border border-white/10 hover:text-white hover:border-red-500/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {filteredTracks.map(track => (
              <TrackCard
                key={track.id}
                track={track}
                isExpanded={expandedTrack === track.id}
                onToggle={() => setExpandedTrack(expandedTrack === track.id ? null : track.id)}
              />
            ))}
          </motion.div>
        </div>

        {/* ── Cert Alignment ─────────────────────────────────────────────── */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className="rounded-sm border border-white/10 bg-[#0f172a] p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <div className="flex-1">
                <span className="text-xs font-bold uppercase tracking-widest text-red-500 mb-3 block">Certification Prep</span>
                <h2 className="text-2xl font-bold text-white mb-3">Aligned with Top Industry Certifications</h2>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
                  Our learning tracks are mapped to the most in-demand security certifications.
                  Completing a full track prepares you for the exam — no separate study material needed.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-shrink-0">
                {[
                  { name: 'OSCP', color: 'border-red-500/30 text-red-500 bg-[#0B1120]' },
                  { name: 'CEH', color: 'border-red-500/30 text-red-500 bg-[#0B1120]' },
                  { name: 'Security+', color: 'border-red-500/30 text-red-500 bg-[#0B1120]' },
                  { name: 'eJPT', color: 'border-red-500/30 text-red-500 bg-[#0B1120]' },
                  { name: 'AWS Sec', color: 'border-red-500/30 text-red-500 bg-[#0B1120]' },
                  { name: 'CKS', color: 'border-red-500/30 text-red-500 bg-[#0B1120]' },
                ].map(cert => (
                  <div key={cert.name} className={`px-3 py-2 rounded-sm border text-xs font-bold text-center ${cert.color}`}>
                    {cert.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Learning Path Navigator quick links ──────────────────────────── */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-red-500 mb-3 block">More Resources</span>
            <h2 className="text-3xl font-bold text-white">Explore the Full Learning Hub</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { path: Routes.PLAYGROUND_LEARNING, label: 'Learning Hub', icon: BookOpen, desc: 'Overview of all learning resources — writeups, tools, and roadmaps in one place.', color: 'from-red-600 to-red-800', border: 'border-white/10', bg: 'bg-[#0f172a]', ic: 'text-red-500' },
              { path: Routes.PLAYGROUND_LEARNING_ROADMAP, label: 'Skill Roadmaps', icon: ScanLine, desc: 'Visual step-by-step roadmaps from zero to expert for each security specialization.', color: 'from-red-600 to-red-800', border: 'border-white/10', bg: 'bg-[#0f172a]', ic: 'text-red-500' },
              { path: Routes.PLAYGROUND_LEARNING_TOOLS, label: 'Tools & Cheatsheets', icon: FileSearch, desc: 'Categorized library of security tools with command references and quick-start guides.', color: 'from-red-600 to-red-800', border: 'border-white/10', bg: 'bg-[#0f172a]', ic: 'text-red-500' },
            ].map(item => (
              <Link key={item.path} to={item.path}>
                <motion.div
                  className={`h-full p-6 rounded-sm border ${item.border} ${item.bg} hover:bg-[#0B1120] hover:border-red-500/30 transition-all duration-200 group`}
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`inline-flex p-2 rounded-sm border ${item.border} bg-[#0B1120] group-hover:scale-110 transition-transform flex-shrink-0`}>
                      <item.icon className={`w-4 h-4 ${item.ic}`} />
                    </div>
                    <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                      {item.label} <ChevronRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </h3>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="relative overflow-hidden rounded-sm border border-white/10 bg-[#0f172a] p-10 lg:p-14">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-600" />
            <div className="relative z-10">
              <Sword className="w-10 h-10 text-red-500 mx-auto mb-5" />
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to level up your skills?
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto mb-8 text-sm leading-relaxed">
                Start your first learning path today — completely free. No fluff, no filler.
                Just structured, hands-on content that gets you hired.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to={Routes.CONTACT}>
                  <Button variant="primary" size="lg" className="rounded-sm bg-red-600 hover:bg-red-700" rightIcon={<ArrowRight className="w-5 h-5" />}>
                    Start Learning Free
                  </Button>
                </Link>
                <Link to={Routes.CTF}>
                  <Button variant="outline" size="lg" className="rounded-sm border-white/10 hover:border-red-500/30">
                    Try a CTF Challenge
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
