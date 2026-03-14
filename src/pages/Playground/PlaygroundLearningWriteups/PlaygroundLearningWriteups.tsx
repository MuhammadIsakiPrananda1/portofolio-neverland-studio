import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, ExternalLink, Tag, Clock, Shield, Globe, Lock, Terminal, Cpu, Eye, LucideIcon } from 'lucide-react';

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

interface Writeup {
    id: string;
    title: string;
    event: string;
    category: string;
    difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
    tags: string[];
    icon: LucideIcon;
    readTime: string;
    date: string;
    description: string;
    url: string;
}

const WRITEUPS: Writeup[] = [
    {
        id: '1',
        title: 'SQL Injection Authentication Bypass',
        event: 'PortSwigger Lab',
        category: 'Web',
        difficulty: 'Easy',
        tags: ['SQLi', 'Authentication', 'MySQL'],
        icon: Globe,
        readTime: '8 min',
        date: '2024-12',
        description: 'Classic authentication bypass technique using SQL Injection on an unprotected login form.',
        url: 'https://portswigger.net/web-security/sql-injection/lab-login-bypass'
    },
    {
        id: '2',
        title: 'Buffer Overflow – Ret2libc Attack',
        event: 'PicoCTF',
        category: 'Pwn',
        difficulty: 'Hard',
        tags: ['Buffer Overflow', 'Ret2libc', 'ASLR Bypass'],
        icon: Terminal,
        readTime: '15 min',
        date: '2024-11',
        description: 'Exploiting buffer overflow using return-to-libc technique to bypass NX protection on a 64-bit binary.',
        url: 'https://play.picoctf.org/practice/challenge/319'
    },
    {
        id: '3',
        title: 'RSA Low Public Exponent Attack',
        event: 'CryptoHack',
        category: 'Crypto',
        difficulty: 'Medium',
        tags: ['RSA', 'Low Exponent', 'Number Theory'],
        icon: Lock,
        readTime: '10 min',
        date: '2024-11',
        description: 'Analysis of an attack on RSA implementations with public exponent e=3 using the Hastad Broadcast Attack.',
        url: 'https://cryptohack.org/challenges/rsa/'
    },
    {
        id: '4',
        title: 'XSS to Admin Cookie Theft',
        event: 'PortSwigger Lab',
        category: 'Web',
        difficulty: 'Medium',
        tags: ['XSS', 'Cookie Stealing', 'CSP Bypass'],
        icon: Globe,
        readTime: '12 min',
        date: '2024-10',
        description: 'XSS exploit chain to steal admin session cookies by bypassing Content Security Policy.',
        url: 'https://portswigger.net/web-security/cross-site-scripting/exploiting/lab-stealing-cookies'
    },
    {
        id: '5',
        title: 'Linux Privilege Escalation via SUID',
        event: 'TryHackMe',
        category: 'Linux',
        difficulty: 'Easy',
        tags: ['Privesc', 'SUID', 'GTFOBins'],
        icon: Shield,
        readTime: '6 min',
        date: '2024-10',
        description: 'Privilege escalation to root using an exploitable SUID binary via GTFOBins.',
        url: 'https://tryhackme.com/room/linprivesc'
    },
    {
        id: '6',
        title: 'Reverse Engineering Obfuscated Binary',
        event: 'CTFtime – DEFCON',
        category: 'Reversing',
        difficulty: 'Expert',
        tags: ['Reversing', 'Anti-Debug', 'Ghidra'],
        icon: Cpu,
        readTime: '20 min',
        date: '2024-09',
        description: 'Deep analysis of an obfuscated binary with anti-debugging tricks using Ghidra and GDB.',
        url: 'https://ctftime.org/event/2316/tasks/'
    },
    {
        id: '7',
        title: 'Stego: Hidden Data in PNG Metadata',
        event: 'PicoCTF',
        category: 'Forensics',
        difficulty: 'Easy',
        tags: ['Steganography', 'PNG', 'Metadata'],
        icon: Eye,
        readTime: '5 min',
        date: '2024-09',
        description: 'Extracting hidden data from PNG file metadata using exiftool and binwalk.',
        url: 'https://play.picoctf.org/practice/challenge/90'
    },
    {
        id: '8',
        title: 'JWT Algorithm Confusion Attack',
        event: 'PortSwigger Lab',
        category: 'Web',
        difficulty: 'Hard',
        tags: ['JWT', 'RS256 to HS256', 'Auth Bypass'],
        icon: Globe,
        readTime: '14 min',
        date: '2024-08',
        description: 'Exploiting a JWT algorithm confusion attack to gain admin access without the private key.',
        url: 'https://portswigger.net/web-security/jwt/algorithm-confusion/lab-jwt-authentication-bypass-via-algorithm-confusion'
    },
    {
        id: '9',
        title: 'SSRF to Internal AWS Metadata',
        event: 'HackTheBox',
        category: 'Web',
        difficulty: 'Hard',
        tags: ['SSRF', 'AWS', 'Cloud'],
        icon: Globe,
        readTime: '16 min',
        date: '2024-08',
        description: 'Server-Side Request Forgery to access AWS EC2 metadata endpoint and retrieve IAM credentials.',
        url: 'https://portswigger.net/web-security/ssrf/lab-ssrf-with-blacklist-filter'
    },
    {
        id: '10',
        title: 'Format String Exploit – Arbitrary Write',
        event: 'PicoCTF',
        category: 'Pwn',
        difficulty: 'Medium',
        tags: ['Format String', 'GOT Overwrite', 'pwntools'],
        icon: Terminal,
        readTime: '11 min',
        date: '2024-07',
        description: 'Leveraging a format string vulnerability to perform arbitrary write and overwrite the Global Offset Table.',
        url: 'https://play.picoctf.org/practice/challenge/459'
    },
    {
        id: '11',
        title: 'AES-CBC Padding Oracle Attack',
        event: 'CryptoHack',
        category: 'Crypto',
        difficulty: 'Hard',
        tags: ['AES-CBC', 'Padding Oracle', 'Block Cipher'],
        icon: Lock,
        readTime: '18 min',
        date: '2024-07',
        description: 'Step-by-step implementation of the POODLE-style padding oracle attack to decrypt AES-CBC ciphertext.',
        url: 'https://cryptohack.org/challenges/padding/'
    },
    {
        id: '12',
        title: 'Windows Active Directory Kerberoasting',
        event: 'HackTheBox',
        category: 'Windows',
        difficulty: 'Medium',
        tags: ['Kerberoasting', 'Active Directory', 'Impacket'],
        icon: Shield,
        readTime: '13 min',
        date: '2024-06',
        description: 'Abusing Kerberos TGS tickets to crack service account credentials offline in an AD environment.',
        url: 'https://tryhackme.com/room/attackingkerberos'
    },
];

const CATEGORIES = ['All', 'Web', 'Crypto', 'Pwn', 'Reversing', 'Forensics', 'Linux', 'Windows'];
const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard', 'Expert'];

const diffColor: Record<string, string> = {
    Easy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    Hard: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    Expert: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export default function PlaygroundLearningWriteups() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [difficulty, setDifficulty] = useState('All');

    const filtered = WRITEUPS.filter(w => {
        const matchSearch = w.title.toLowerCase().includes(search.toLowerCase()) ||
            w.event.toLowerCase().includes(search.toLowerCase()) ||
            w.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
        const matchCat = category === 'All' || w.category === category;
        const matchDiff = difficulty === 'All' || w.difficulty === difficulty;
        return matchSearch && matchCat && matchDiff;
    });

    return (
        <div className="pt-32 pb-20">
            <div className="container-custom">
                {/* Hero */}
                <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto mb-8 rounded-sm" />
                    <div className="inline-flex p-4 rounded-sm border border-red-500/20 bg-red-500/10 mb-6">
                        <FileText className="w-12 h-12 text-red-500" />
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-mono font-black mb-6 uppercase tracking-tighter">
                        <span className="text-white">CTF </span>
                        <span className="text-red-500">Write-ups</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        In-depth analysis of CTF solutions from various competitions. Learn the techniques, tricks, and methodologies used by top players.
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div className="flex flex-col gap-4 mb-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search write-ups, events, or tags..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full bg-[#0B1120] border border-white/10 rounded-sm pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:bg-[#0f172a] transition-all font-mono text-sm"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map(c => (
                            <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1.5 rounded-sm text-xs font-mono font-bold uppercase tracking-wider border transition-all ${category === c ? 'bg-red-500/20 text-red-500 border-red-500/50' : 'bg-[#0f172a] text-gray-400 border-white/10 hover:text-white hover:border-white/20'}`}>{c}</button>
                        ))}
                        <div className="w-px h-6 bg-white/10 mx-1 self-center" />
                        {DIFFICULTIES.map(d => (
                            <button key={d} onClick={() => setDifficulty(d)} className={`px-3 py-1.5 rounded-sm text-xs font-mono font-bold uppercase tracking-wider border transition-all ${difficulty === d ? 'bg-red-500/20 text-red-500 border-red-500/50' : 'bg-[#0f172a] text-gray-400 border-white/10 hover:text-white hover:border-white/20'}`}>{d}</button>
                        ))}
                    </div>
                </motion.div>

                {/* Stats bar */}
                <motion.div
                    className="flex items-center gap-3 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                        Showing <span className="text-red-400 font-bold">{filtered.length}</span> of {WRITEUPS.length} write-ups
                    </span>
                </motion.div>

                {/* Grid */}
                <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-5" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    {filtered.map(w => {
                        const Icon = w.icon;
                        return (
                            <motion.a
                                key={w.id}
                                href={w.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                variants={staggerItem}
                                className="group relative rounded-sm border border-white/10 bg-[#0f172a] hover:border-red-500/40 transition-all p-6 overflow-hidden block"
                            >
                                <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-red-500 to-red-600 rounded-tl-sm rounded-bl-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 rounded-sm bg-[#0B1120] border border-white/10 group-hover:border-red-500/30 transition-all duration-300">
                                            <Icon className="w-5 h-5 text-red-500" />
                                        </div>
                                        <div>
                                            <span className="block text-[10px] font-mono font-bold uppercase tracking-widest text-red-500 mb-0.5">{w.event}</span>
                                            <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500">{w.category} • {w.date}</span>
                                        </div>
                                    </div>
                                    <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-sm border uppercase tracking-wider ${diffColor[w.difficulty]}`}>{w.difficulty}</span>
                                </div>
                                <h3 className="text-base font-mono font-bold uppercase tracking-tight text-white mb-2 group-hover:text-red-400 transition-colors">{w.title}</h3>
                                <p className="text-gray-400 text-sm font-mono leading-relaxed mb-4">{w.description}</p>
                                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                    <div className="flex flex-wrap gap-1.5">
                                        {w.tags.slice(0, 2).map(tag => (
                                            <span key={tag} className="flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-widest text-gray-400 bg-[#0B1120] border border-white/10 rounded-sm px-2 py-0.5">
                                                <Tag className="w-2.5 h-2.5" />{tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-3 text-xs font-mono text-gray-500">
                                        <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{w.readTime}</div>
                                        <div className="flex items-center gap-1 text-red-500 font-bold uppercase tracking-widest group-hover:gap-2 transition-all">
                                            <ExternalLink className="w-3.5 h-3.5" />Read
                                        </div>
                                    </div>
                                </div>
                            </motion.a>
                        );
                    })}
                </motion.div>

                {filtered.length === 0 && (
                    <div className="text-center py-20 border border-white/10 rounded-sm bg-[#0f172a] mt-8">
                        <Search className="w-8 h-8 text-red-500/50 mx-auto mb-3" />
                        <h3 className="text-xl font-mono font-bold uppercase tracking-wider text-white mb-2">No Results Found</h3>
                        <p className="text-gray-500 text-sm font-mono">Try adjusting your filters or search terms.</p>
                    </div>
                )}

                {/* More Resources Banner */}
                <motion.div
                    className="mt-14 rounded-sm border border-white/10 bg-[#0f172a] p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div>
                        <p className="text-sm font-mono font-bold uppercase tracking-widest text-white mb-1">Browse More Write-ups</p>
                        <p className="text-xs font-mono text-gray-500">Thousands of community write-ups across all CTF competitions on CTFtime.</p>
                    </div>
                    <a
                        href="https://ctftime.org/writeups"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-sm bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500/20 transition-colors text-xs font-mono font-bold uppercase tracking-widest"
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
                        CTFtime Write-ups
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
