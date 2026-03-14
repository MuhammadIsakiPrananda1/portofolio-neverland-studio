import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Map, CheckCircle, ChevronDown, ChevronUp,
    Shield, Globe, Terminal, Cpu, Lock as LockIcon, Eye, Trophy, Star, LucideIcon
} from 'lucide-react';

const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const staggerItem = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

interface Step {
    title: string;
    detail: string;
    done?: boolean;
}

interface RoadmapPath {
    id: string;
    title: string;
    icon: LucideIcon;
    color: string;
    borderColor: string;
    bgColor: string;
    iconColor: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    duration: string;
    description: string;
    steps: Step[];
}

const PATHS: RoadmapPath[] = [
    {
        id: 'newbie',
        title: 'Cybersecurity Fundamentals',
        icon: Shield,
        color: 'from-red-500 to-red-600',
        borderColor: 'border-red-500/20',
        bgColor: 'bg-[#0f172a]',
        iconColor: 'text-red-500',
        level: 'Beginner',
        duration: '4-6 weeks',
        description: 'Mandatory foundation before entering any specialization. From networking concepts, Linux OS, to the ethics and laws of hacking.',
        steps: [
            { title: 'Computer Networking Basics', detail: 'TCP/IP, DNS, HTTP/S, OSI model, subnetting, and common protocols.' },
            { title: 'Linux & Command Line', detail: 'Filesystem navigation, process management, permissions, and basic bash scripting.' },
            { title: 'Security Concepts', detail: 'CIA Triad, types of attacks, defensive vs. offensive security.' },
            { title: 'Ethics & Legal Framework', detail: 'Bug bounty ethics, responsible disclosure, and cybersecurity law.' },
            { title: 'Setting Up Your First Lab', detail: 'Install VirtualBox/VMware, set up Kali Linux, configure a lab network.' },
        ]
    },
    {
        id: 'web',
        title: 'Web Application Security',
        icon: Globe,
        color: 'from-red-500 to-red-600',
        borderColor: 'border-red-500/20',
        bgColor: 'bg-[#0f172a]',
        iconColor: 'text-red-500',
        level: 'Intermediate',
        duration: '8-10 weeks',
        description: 'Master the OWASP Top 10 and modern web exploitation techniques. From SQL Injection to SSRF and XXE.',
        steps: [
            { title: 'HTTP & Web Fundamentals', detail: 'Request/response cycle, cookies, sessions, headers, and HTTPS.' },
            { title: 'OWASP Top 10', detail: 'Injection, Broken Auth, XSS, IDOR, Security Misconfiguration, and more.' },
            { title: 'SQL Injection', detail: 'Manual SQLi, blind SQLi, time-based SQLi, and automation with SQLMap.' },
            { title: 'XSS & CSRF', detail: 'Reflected, stored, and DOM-based XSS. CSRF bypass with token manipulation.' },
            { title: 'Advanced: SSRF & XXE', detail: 'Server-side request forgery, XML external entity injection, and bypasses.' },
            { title: 'Burp Suite Mastery', detail: 'Proxy, Repeater, Intruder, Scanner, and Extensions.' },
        ]
    },
    {
        id: 'pentest',
        title: 'Penetration Testing',
        icon: Terminal,
        color: 'from-red-500 to-red-600',
        borderColor: 'border-red-500/20',
        bgColor: 'bg-[#0f172a]',
        iconColor: 'text-red-500',
        level: 'Intermediate',
        duration: '10-12 weeks',
        description: 'Professional pentesting methodology. Reconnaissance, scanning, exploitation, post-exploitation, and reporting.',
        steps: [
            { title: 'Pentest Methodology', detail: 'PTES, OWASP Testing Guide, NIST SP 800-115, scoping & rules of engagement.' },
            { title: 'Reconnaissance', detail: 'OSINT, passive recon, active recon with Nmap, Shodan, and TheHarvester.' },
            { title: 'Basic Exploitation', detail: 'Metasploit framework, manual exploits, and payload generation.' },
            { title: 'Post Exploitation', detail: 'Privilege escalation, persistence, lateral movement, and pivoting.' },
            { title: 'Active Directory', detail: 'AD basics, enumeration, Kerberoasting, and Pass-the-Hash attacks.' },
            { title: 'Pentest Reporting', detail: 'Writing professional reports, CVSS scoring, and remediation recommendations.' },
        ]
    },
    {
        id: 'reverse',
        title: 'Reverse Engineering',
        icon: Cpu,
        color: 'from-red-500 to-red-600',
        borderColor: 'border-red-500/20',
        bgColor: 'bg-[#0f172a]',
        iconColor: 'text-red-500',
        level: 'Advanced',
        duration: '12-16 weeks',
        description: 'Analyze binaries, malware, and firmware. From assembly basics to anti-debugging techniques and unpacking.',
        steps: [
            { title: 'x86/x64 Assembly', detail: 'Registers, instructions, calling conventions, and stack frames.' },
            { title: 'Tools: Ghidra & IDA', detail: 'Disassembly, decompilation, function analysis, and cross-references.' },
            { title: 'Static Analysis', detail: 'String extraction, import analysis, and packer detection.' },
            { title: 'Dynamic Analysis', detail: 'GDB, debugging, breakpoints, and memory inspection.' },
            { title: 'Anti-Debug & Packing', detail: 'Anti-debugging techniques, UPX unpacking, and obfuscation bypass.' },
            { title: 'Malware Analysis', detail: 'Behavioral analysis, IOC extraction, and sandbox analysis.' },
        ]
    },
    {
        id: 'crypto',
        title: 'Cryptography',
        icon: LockIcon,
        color: 'from-red-500 to-red-600',
        borderColor: 'border-red-500/20',
        bgColor: 'bg-[#0f172a]',
        iconColor: 'text-red-500',
        level: 'Intermediate',
        duration: '6-8 weeks',
        description: 'From cryptographic mathematics to practical attacks on RSA, AES, and flawed implementations.',
        steps: [
            { title: 'Classical Cryptography', detail: 'Caesar, Vigenere, frequency analysis, and substitution ciphers.' },
            { title: 'Modern Cryptography', detail: 'Symmetric vs. asymmetric, hashing, MAC, and digital signatures.' },
            { title: 'RSA & Attacks', detail: 'RSA math, low exponent attack, common modulus attack, and Wiener attack.' },
            { title: 'Block Ciphers', detail: 'AES, operation modes (ECB, CBC, CTR), and padding oracle attacks.' },
            { title: 'Hashing & Cracking', detail: 'MD5/SHA, rainbow tables, hashcat, and bcrypt.' },
        ]
    },
    {
        id: 'forensics',
        title: 'Digital Forensics',
        icon: Eye,
        color: 'from-red-500 to-red-600',
        borderColor: 'border-red-500/20',
        bgColor: 'bg-[#0f172a]',
        iconColor: 'text-red-500',
        level: 'Intermediate',
        duration: '6-8 weeks',
        description: 'Digital investigations from memory dumps, disk images, network captures, to steganography.',
        steps: [
            { title: 'Forensics Fundamentals', detail: 'Chain of custody, imaging, and hashing for evidence integrity.' },
            { title: 'Disk Forensics', detail: 'Filesystem analysis, file recovery, and artifact extraction with Autopsy.' },
            { title: 'Memory Forensics', detail: 'Volatility framework, process dumps, and network connections from memory.' },
            { title: 'Network Forensics', detail: 'Wireshark, pcap analysis, and protocol reconstruction.' },
            { title: 'Steganography', detail: 'Audio/image/video stego, binwalk, stegsolve, and zsteg.' },
        ]
    },
];

const levelColor: Record<string, string> = {
    Beginner: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Intermediate: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    Advanced: 'bg-red-500/10 text-red-500 border-red-500/20',
};

export default function PlaygroundLearningRoadmap() {
    const [expanded, setExpanded] = useState<string | null>('newbie');
    const [filter, setFilter] = useState<string>('All');

    const filtered = PATHS.filter(p => filter === 'All' || p.level === filter);

    return (
        <div className="pt-32 pb-20">
            <div className="container-custom">
                {/* Hero */}
                <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto mb-8 rounded-sm" />
                    <div className="inline-flex p-4 rounded-sm border border-red-500/20 bg-[#0f172a] mb-6">
                        <Map className="w-12 h-12 text-red-500" />
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-mono font-black mb-6 uppercase tracking-tighter">
                        <span className="text-white">Learning </span>
                        <span className="text-red-500">Roadmap</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Structured learning paths from beginner to expert. Follow the steps crafted by security professionals.
                    </p>
                </motion.div>

                {/* Stats */}
                <motion.div className="flex flex-wrap justify-center gap-6 mb-12"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    {[
                        { icon: Trophy, value: '6', label: 'Learning Paths' },
                        { icon: Star, value: '50+', label: 'Topics Covered' },
                        { icon: CheckCircle, value: '3', label: 'Difficulty Levels' },
                    ].map(({ icon: Icon, value, label }) => (
                        <div key={label} className="flex items-center gap-3 px-5 py-3 rounded-sm border border-white/10 bg-[#0B1120]">
                            <Icon className="w-5 h-5 text-red-500" />
                            <div><span className="text-lg font-mono font-bold text-white uppercase tracking-tighter">{value}</span><span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 ml-2">{label}</span></div>
                        </div>
                    ))}
                </motion.div>

                {/* Filter */}
                <div className="flex gap-2 mb-8">
                    {['All', 'Beginner', 'Intermediate', 'Advanced'].map(f => (
                        <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-sm text-xs font-mono font-bold uppercase tracking-wider transition-all border ${filter === f ? 'bg-red-500/20 text-red-500 border-red-500/50' : 'bg-[#0f172a] text-gray-400 border-white/10 hover:text-white hover:border-white/20'}`}>{f}</button>
                    ))}
                </div>

                {/* Paths */}
                <motion.div className="space-y-4" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    {filtered.map((path) => {
                        const Icon = path.icon;
                        const isOpen = expanded === path.id;
                        return (
                            <motion.div key={path.id} variants={staggerItem} className={`rounded-sm border ${path.borderColor} ${path.bgColor} overflow-hidden`}>
                                <button
                                    onClick={() => setExpanded(isOpen ? null : path.id)}
                                    className="w-full flex items-center justify-between p-6 text-left transition-all hover:brightness-110"
                                >
                                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="flex-shrink-0">
                                                <div className={`p-3 rounded-sm border ${path.borderColor} bg-white/[0.04]`}>
                                                    <Icon className={`w-6 h-6 ${path.iconColor}`} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex items-center justify-between gap-3 mb-1">
                                                    <h3 className="text-lg font-mono font-bold uppercase tracking-tighter text-white">{path.title}</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:ml-2">
                                            <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-sm border uppercase tracking-widest ${levelColor[path.level]}`}>{path.level}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-widest text-gray-500 md:ml-auto">
                                            <span>{path.steps.length} steps</span>
                                            <span>•</span>
                                            <span>{path.duration}</span>
                                        </div>
                                    </div>
                                    {isOpen ? <ChevronUp className="w-5 h-5 text-red-500 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 hover:text-red-400" />}
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6">
                                                <p className="text-gray-400 text-sm font-mono mb-5 pb-5 border-b border-white/5">{path.description}</p>
                                                <div className="space-y-3">
                                                    {path.steps.map((step, i) => (
                                                        <div key={i} className="flex gap-4 group">
                                                            <div className="flex flex-col items-center">
                                                                <div className={`w-7 h-7 rounded-sm border-2 flex items-center justify-center flex-shrink-0 ${step.done ? 'bg-red-500 border-red-500' : `border-white/10 bg-[#0B1120]`}`}>
                                                                    {step.done ? <CheckCircle className="w-4 h-4 text-white" /> : <span className={`text-xs font-mono font-bold uppercase tracking-widest ${path.iconColor}`}>{i + 1}</span>}
                                                                </div>
                                                                {i < path.steps.length - 1 && <div className="w-px flex-1 mt-1 mb-1 bg-white/10" />}
                                                            </div>
                                                            <div className="flex-1 pt-0.5 pb-3">
                                                                <h4 className="text-sm font-mono font-bold uppercase tracking-tight text-white mb-1">{step.title}</h4>
                                                                <p className="text-xs text-gray-500 font-mono leading-relaxed">{step.detail}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </motion.div>

            </div>
        </div>
    );
}
