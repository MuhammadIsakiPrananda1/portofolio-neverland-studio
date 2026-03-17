import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, Tag, ChevronRight, X, Shield } from 'lucide-react';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';
import { Link } from 'react-router-dom';
import { Routes } from '@/config/constants';
import SEO from '@components/atoms/SEO/SEO';

interface GlossaryTerm {
    term: string;
    definition: string;
    category: 'Attack' | 'Defense' | 'Concept' | 'Protocol' | 'Tool' | 'Compliance';
    related?: string[];
}

const categoryColors: Record<GlossaryTerm['category'], string> = {
    Attack:     'text-red-400    border-red-500/30    bg-red-500/10',
    Defense:    'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    Concept:    'text-blue-400   border-blue-500/30   bg-blue-500/10',
    Protocol:   'text-purple-400 border-purple-500/30 bg-purple-500/10',
    Tool:       'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
    Compliance: 'text-orange-400 border-orange-500/30 bg-orange-500/10',
};

const glossaryTerms: GlossaryTerm[] = [
    // A
    { term: 'Advanced Persistent Threat (APT)', category: 'Attack', definition: 'A prolonged and targeted cyberattack in which an intruder gains access to a network and remains undetected for an extended period to steal sensitive data or disrupt operations.', related: ['Threat Actor', 'Lateral Movement'] },
    { term: 'Attack Surface', category: 'Concept', definition: 'The sum of all possible entry points (attack vectors) where an unauthorized user can try to enter or extract data from an environment.', related: ['Vulnerability', 'Exposure'] },
    { term: 'Authentication', category: 'Concept', definition: 'The process of verifying the identity of a user, device, or other entity in a computer system, often using credentials such as passwords, tokens, or biometrics.', related: ['MFA', 'Zero Trust'] },
    { term: 'Authorization', category: 'Concept', definition: 'The process of granting or denying specific permissions to an authenticated identity to access resources or perform actions within a system.' },
    // B
    { term: 'Backdoor', category: 'Attack', definition: 'A covert method of bypassing normal authentication or encryption in a computer system. They can be legitimate (built by developers) or malicious (planted by attackers).', related: ['Rootkit', 'Malware'] },
    { term: 'Botnet', category: 'Attack', definition: 'A network of private computers infected with malicious software and controlled as a group without the owners\' knowledge, often used for DDoS attacks or spam campaigns.', related: ['DDoS', 'Malware'] },
    { term: 'Brute Force Attack', category: 'Attack', definition: 'A trial-and-error method used to obtain information such as passwords or PINs by exhaustively checking all possible combinations until the correct one is found.' },
    { term: 'Bug Bounty', category: 'Defense', definition: 'A program offered by organizations that rewards individuals for discovering and reporting software bugs, especially security vulnerabilities, before malicious actors can exploit them.' },
    // C
    { term: 'CSRF (Cross-Site Request Forgery)', category: 'Attack', definition: 'An attack that tricks an authenticated user into executing unwanted actions on a web application in which they are currently authenticated.', related: ['XSS', 'Session Hijacking'] },
    { term: 'CVE (Common Vulnerabilities and Exposures)', category: 'Concept', definition: 'A publicly disclosed list of known cybersecurity vulnerabilities and exposures. Each CVE entry contains an identification number, description, and public references.', related: ['CVSS', 'Patch Management'] },
    { term: 'CVSS (Common Vulnerability Scoring System)', category: 'Concept', definition: 'A free and open industry standard for assessing the severity of computer system security vulnerabilities. Scores range from 0.0 to 10.0.', related: ['CVE'] },
    { term: 'Cryptography', category: 'Concept', definition: 'The practice of securing information by transforming it into an unreadable format using algorithms and keys, so that only authorized parties can decipher it.', related: ['Encryption', 'PKI'] },
    { term: 'Cyber Kill Chain', category: 'Concept', definition: 'A framework developed by Lockheed Martin that identifies the stages of a cyberattack: Reconnaissance, Weaponization, Delivery, Exploitation, Installation, C2, and Actions on Objectives.' },
    // D
    { term: 'DDoS (Distributed Denial of Service)', category: 'Attack', definition: 'An attack that overwhelms a target server, service, or network with a flood of internet traffic from multiple sources, making it unavailable to legitimate users.', related: ['Botnet', 'DoS'] },
    { term: 'Defense in Depth', category: 'Defense', definition: 'A layered security strategy that uses multiple security controls and measures throughout an IT system to provide redundancy in case one control fails.', related: ['Zero Trust', 'Firewall'] },
    { term: 'DMZ (Demilitarized Zone)', category: 'Concept', definition: 'A physical or logical subnetwork that separates an organization\'s internal local area network from other untrusted networks, typically the internet.', related: ['Firewall', 'Network Segmentation'] },
    // E
    { term: 'Encryption', category: 'Defense', definition: 'The process of encoding data so that only authorized parties can access it. It uses an algorithm and a key to transform plaintext into ciphertext.', related: ['Cryptography', 'AES', 'TLS'] },
    { term: 'Exploit', category: 'Attack', definition: 'Code, software, or a sequence of commands that takes advantage of a vulnerability or weakness in a system, application, or network to cause unintended behavior.', related: ['Vulnerability', '0-day'] },
    { term: 'Endpoint Detection & Response (EDR)', category: 'Tool', definition: 'A cybersecurity solution that continuously monitors end-user devices to detect and respond to cyber threats such as ransomware and malware.', related: ['SIEM', 'Antivirus'] },
    // F
    { term: 'Firewall', category: 'Defense', definition: 'A network security device that monitors and filters incoming and outgoing network traffic based on an organization\'s previously established security policies.', related: ['IDS/IPS', 'DMZ'] },
    { term: 'Fuzzing', category: 'Tool', definition: 'An automated software testing technique that involves providing invalid, unexpected, or random data as input to a program to discover bugs and security vulnerabilities.', related: ['Penetration Testing', 'Bug Bounty'] },
    // G
    { term: 'GDPR', category: 'Compliance', definition: 'The General Data Protection Regulation — EU regulation on data protection and privacy for individuals within the European Union and the European Economic Area.', related: ['ISO 27001', 'Data Classification'] },
    // H
    { term: 'Honeypot', category: 'Defense', definition: 'A decoy computer system set up to detect, deflect, or study unauthorized access and attack patterns from attackers, without risking real assets.', related: ['IDS/IPS', 'Threat Intelligence'] },
    // I
    { term: 'IDS/IPS (Intrusion Detection/Prevention System)', category: 'Defense', definition: 'IDS monitors network traffic for suspicious activity and issues alerts; IPS goes further by actively blocking detected threats in real time.', related: ['Firewall', 'SIEM'] },
    { term: 'Incident Response (IR)', category: 'Defense', definition: 'An organized approach to addressing and managing the aftermath of a security breach or cyberattack, aiming to limit damage and reduce recovery time and costs.', related: ['SIEM', 'Forensics'] },
    { term: 'ISO 27001', category: 'Compliance', definition: 'An international standard that provides requirements for establishing, implementing, maintaining, and continually improving an information security management system (ISMS).', related: ['SOC 2', 'GDPR'] },
    // K
    { term: 'Keylogger', category: 'Attack', definition: 'Malicious software or hardware that secretly records every keystroke made on a device, often used to steal passwords, credit card numbers, and other sensitive data.', related: ['Malware', 'Spyware'] },
    // L
    { term: 'Lateral Movement', category: 'Attack', definition: 'Techniques used by attackers to progressively move through a network after gaining initial access, in search of key assets and sensitive data.', related: ['APT', 'Privilege Escalation'] },
    // M
    { term: 'Malware', category: 'Attack', definition: 'Short for "malicious software" — any software intentionally designed to cause disruption, damage, or unauthorized access to a computer system. Includes viruses, ransomware, spyware, and trojans.', related: ['Ransomware', 'Trojan', 'Spyware'] },
    { term: 'Man-in-the-Middle (MitM)', category: 'Attack', definition: 'An attack where the attacker secretly relays and potentially alters the communications between two parties who believe they are communicating directly with each other.', related: ['ARP Spoofing', 'TLS'] },
    { term: 'MFA (Multi-Factor Authentication)', category: 'Defense', definition: 'A security mechanism requiring users to provide two or more verification factors (something you know, have, or are) before granting access to a resource.', related: ['Authentication', 'Zero Trust'] },
    { term: 'MITRE ATT&CK', category: 'Concept', definition: 'A globally accessible knowledge base of adversary tactics and techniques based on real-world observations. Used as a foundation for threat models and security assessments.', related: ['Threat Intelligence', 'Cyber Kill Chain'] },
    // N
    { term: 'Network Segmentation', category: 'Defense', definition: 'The practice of splitting a computer network into subnetworks to improve performance and security, limiting an attacker\'s ability to move laterally.', related: ['DMZ', 'Zero Trust'] },
    // O
    { term: 'OSINT (Open Source Intelligence)', category: 'Tool', definition: 'The collection and analysis of data gathered from publicly available sources to produce actionable intelligence, widely used in penetration testing and threat hunting.' },
    { term: '0-day (Zero-Day)', category: 'Attack', definition: 'A software vulnerability that is unknown to those who should be interested in mitigating it, giving attackers an opportunity to exploit it before a patch is available.', related: ['CVE', 'Exploit', 'Patch Management'] },
    // P
    { term: 'Patch Management', category: 'Defense', definition: 'The process of distributing and applying updates to software, firmware, and operating systems to fix known vulnerabilities before they can be exploited.', related: ['CVE', 'Vulnerability Management'] },
    { term: 'Penetration Testing', category: 'Tool', definition: 'Also known as "pen testing" or "ethical hacking," it is an authorized simulated cyberattack on a computer system to evaluate its security and identify exploitable vulnerabilities.', related: ['Red Team', 'Bug Bounty'] },
    { term: 'Phishing', category: 'Attack', definition: 'A social engineering attack where attackers disguise themselves as trusted entities in electronic communications to trick users into revealing sensitive information.', related: ['Spear Phishing', 'Social Engineering'] },
    { term: 'PKI (Public Key Infrastructure)', category: 'Protocol', definition: 'A set of roles, policies, hardware, software, and procedures needed to create, manage, distribute, use, store, and revoke digital certificates and manage public-key encryption.', related: ['TLS', 'Cryptography'] },
    { term: 'Privilege Escalation', category: 'Attack', definition: 'An attack that exploits a bug, misconfiguration, or design flaw to gain elevated access to resources normally protected from regular users.', related: ['Lateral Movement', 'Exploit'] },
    // R
    { term: 'Ransomware', category: 'Attack', definition: 'A type of malware that encrypts a victim\'s files or entire system and demands a ransom payment to restore access. High-profile examples include WannaCry and NotPetya.', related: ['Malware', 'Incident Response'] },
    { term: 'Red Team', category: 'Tool', definition: 'A group of security professionals authorized to ethically mimic real-world adversary tactics, techniques, and procedures to test an organization\'s defenses.', related: ['Blue Team', 'Penetration Testing'] },
    { term: 'Blue Team', category: 'Tool', definition: 'The internal security team responsible for defending against real and simulated attacks. They monitor, detect, and respond to threats using tools like SIEM and EDR.', related: ['Red Team', 'SOC'] },
    { term: 'Rootkit', category: 'Attack', definition: 'A collection of software tools that enable administrator-level access to a computer or network while actively hiding its presence from users and security tools.', related: ['Malware', 'Backdoor'] },
    // S
    { term: 'SIEM (Security Information and Event Management)', category: 'Tool', definition: 'A security system that aggregates and analyzes log data from across an organization\'s IT infrastructure to detect, monitor, and respond to security threats in real time.', related: ['SOC', 'IDS/IPS'] },
    { term: 'Social Engineering', category: 'Attack', definition: 'Psychological manipulation of people into performing actions or divulging confidential information, bypassing technical security controls by targeting the human element.', related: ['Phishing', 'Vishing'] },
    { term: 'SOC (Security Operations Center)', category: 'Defense', definition: 'A centralized unit of security professionals that uses technology to continuously monitor, assess, and defend an organization\'s cybersecurity posture.', related: ['SIEM', 'Incident Response'] },
    { term: 'SOC 2', category: 'Compliance', definition: 'A type II auditing procedure developed by AICPA that ensures service providers securely manage data to protect client interests and privacy. Based on five Trust Service Criteria.', related: ['ISO 27001', 'GDPR'] },
    { term: 'Spear Phishing', category: 'Attack', definition: 'A targeted form of phishing where attackers personalize their attack for a specific individual or organization using detailed personal information to appear more convincing.', related: ['Phishing', 'Social Engineering'] },
    { term: 'SQL Injection', category: 'Attack', definition: 'A code injection technique that exploits security vulnerabilities in an application\'s database layer by inserting malicious SQL statements into entry fields.', related: ['XSS', 'OWASP Top 10'] },
    { term: 'SSL/TLS', category: 'Protocol', definition: 'Transport Layer Security (TLS), and its deprecated predecessor SSL, are cryptographic protocols designed to provide secure communication over a computer network.', related: ['PKI', 'HTTPS', 'Encryption'] },
    // T
    { term: 'Threat Intelligence', category: 'Concept', definition: 'Organized, analyzed, and refined information about potential or current threats to an organization\'s security. Helps predict, prevent, and identify cyberattacks.', related: ['MITRE ATT&CK', 'OSINT'] },
    { term: 'Trojan Horse', category: 'Attack', definition: 'Malware that disguises itself as legitimate software to gain access to a victim\'s system. Once executed, it can perform harmful actions like stealing data or creating backdoors.', related: ['Malware', 'Backdoor'] },
    // V
    { term: 'Vulnerability', category: 'Concept', definition: 'A weakness in a system, application, or network that can be exploited by a threat actor to perform unauthorized actions or gain unauthorized access.', related: ['CVE', 'Exploit', 'Attack Surface'] },
    // W
    { term: 'WAF (Web Application Firewall)', category: 'Defense', definition: 'A security solution that monitors, filters, and blocks HTTP/S traffic to and from a web application, protecting against attacks like SQL injection, XSS, and CSRF.', related: ['Firewall', 'XSS', 'SQL Injection'] },
    // X
    { term: 'XSS (Cross-Site Scripting)', category: 'Attack', definition: 'A vulnerability that allows attackers to inject malicious client-side scripts into web pages viewed by other users, bypassing access controls and stealing data.', related: ['CSRF', 'WAF', 'OWASP Top 10'] },
    // Z
    { term: 'Zero Trust', category: 'Concept', definition: 'A security framework requiring all users, inside or outside the network, to be authenticated, authorized, and continuously validated before being granted access to resources.', related: ['MFA', 'Network Segmentation', 'Defense in Depth'] },
];

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const allCategories: GlossaryTerm['category'][] = ['Attack', 'Defense', 'Concept', 'Protocol', 'Tool', 'Compliance'];

export default function SecurityGlossary() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeLetter, setActiveLetter] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState<GlossaryTerm['category'] | null>(null);
    const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

    const filtered = useMemo(() => {
        return glossaryTerms.filter(t => {
            const matchSearch = searchQuery.trim() === '' || t.term.toLowerCase().includes(searchQuery.toLowerCase()) || t.definition.toLowerCase().includes(searchQuery.toLowerCase());
            const matchLetter = activeLetter === null || t.term.toUpperCase().startsWith(activeLetter);
            const matchCategory = activeCategory === null || t.category === activeCategory;
            return matchSearch && matchLetter && matchCategory;
        });
    }, [searchQuery, activeLetter, activeCategory]);

    const availableLetters = new Set(glossaryTerms.map(t => t.term[0].toUpperCase()));

    const clearFilters = () => {
        setSearchQuery('');
        setActiveLetter(null);
        setActiveCategory(null);
    };

    const hasFilters = searchQuery || activeLetter || activeCategory;

    return (
        <>
            <SEO
                title="Security Glossary | Neverland Studio"
                description="A comprehensive dictionary of cybersecurity terms and concepts. From A to Z — understand APTs, Zero Trust, CVEs, MITRE ATT&CK, and more."
            />

            <div className="pt-32 pb-24 overflow-hidden relative min-h-screen">
                {/* Background */}
                <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-[#0A0F18]">
                    <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-red-500/5 blur-[120px]" />
                    <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] rounded-full bg-red-500/5 blur-[120px]" />
                    <div className="glossary-dot-grid opacity-20" />
                </div>

                <div className="container-custom relative z-10 px-4 mx-auto max-w-7xl">

                    {/* ─── Hero ─── */}
                    <motion.div
                        className="text-center mb-16 lg:mb-20"
                        variants={slideUp}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-red-500/25 bg-red-500/10 mb-8">
                            <BookOpen className="w-4 h-4 text-red-500" />
                            <span className="text-xs font-mono font-bold text-red-400 tracking-widest uppercase">Security Knowledge Base</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-mono font-black mb-8 tracking-tighter uppercase">
                            <span className="text-white">Security </span>
                            <span className="text-red-500">Glossary</span>
                        </h1>

                        <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            A comprehensive dictionary of cybersecurity terms, concepts, and techniques. From APT to Zero Trust — master the language of security.
                        </p>

                        {/* Stats row */}
                        <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-gray-500">
                            <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-purple-400" /><strong className="text-white">{glossaryTerms.length}</strong> Terms Defined</span>
                            <span className="flex items-center gap-2"><Tag className="w-4 h-4 text-blue-400" /><strong className="text-white">6</strong> Categories</span>
                            <span className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-emerald-400" /><strong className="text-white">Free</strong> to Reference</span>
                        </div>
                    </motion.div>

                    {/* ─── Search + Filters ─── */}
                    <motion.div
                        className="mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {/* Search Bar */}
                        <div className="relative mb-6 max-w-2xl mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Search terms or definitions…"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-12 py-4 rounded-sm bg-[#0B1120] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:bg-[#0f172a] transition-all duration-300 text-sm font-mono"
                            />
                            {searchQuery && (
                                <button title="Clear search" onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* Category Filter */}
                        <div className="flex flex-wrap justify-center gap-2 mb-6">
                            <button
                                onClick={() => setActiveCategory(null)}
                                className={`px-4 py-1.5 rounded-sm text-xs font-mono font-bold uppercase tracking-wider border transition-all duration-300 ${activeCategory === null ? 'bg-red-500/20 border-red-500/50 text-red-500' : 'border-white/10 text-gray-400 hover:border-white/20 hover:text-white bg-[#0f172a]'}`}
                            >All Categories</button>
                            {allCategories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
                                    className={`px-4 py-1.5 rounded-sm text-xs font-mono font-bold uppercase tracking-wider border transition-all duration-300 ${activeCategory === cat ? `${categoryColors[cat]} shadow-sm` : 'border-white/10 text-gray-400 hover:border-white/20 hover:text-white bg-[#0f172a]'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* A-Z Filter */}
                        <div className="flex flex-wrap justify-center gap-1.5">
                            {alphabet.map(letter => {
                                const available = availableLetters.has(letter);
                                const active = activeLetter === letter;
                                return (
                                    <button
                                        key={letter}
                                        disabled={!available}
                                        onClick={() => setActiveLetter(active ? null : letter)}
                                        className={`w-8 h-8 rounded-sm text-xs font-mono font-bold transition-all duration-200 ${
                                            !available
                                                ? 'text-gray-700 cursor-not-allowed border border-transparent'
                                                : active
                                                    ? 'bg-red-500/20 text-red-500 border border-red-500/50'
                                                    : 'bg-[#0f172a] border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white hover:border-white/20'
                                        }`}
                                    >
                                        {letter}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Active filters summary */}
                        {hasFilters && (
                            <div className="flex items-center justify-center gap-3 mt-4">
                                <span className="text-sm text-gray-500">
                                    <span className="text-white font-semibold">{filtered.length}</span> result{filtered.length !== 1 ? 's' : ''} found
                                </span>
                                <button onClick={clearFilters} className="text-xs font-mono text-red-500 hover:text-red-400 transition-colors flex items-center gap-1">
                                    <X className="w-3 h-3" /> Clear all filters
                                </button>
                            </div>
                        )}
                    </motion.div>

                    {/* ─── Terms List ─── */}
                    <AnimatePresence mode="wait">
                        {filtered.length === 0 ? (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-center py-24 border border-white/10 rounded-sm bg-[#0f172a]"
                                >
                                    <BookOpen className="w-14 h-14 text-gray-700 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold font-mono text-white mb-2 uppercase">No terms found</h3>
                                    <p className="text-gray-500 mb-6 font-mono text-sm">Try adjusting your search or filters.</p>
                                    <button onClick={clearFilters} className="px-6 py-2.5 rounded-sm bg-red-500/10 border border-red-500/30 text-red-500 text-sm font-mono font-bold hover:bg-red-500/20 transition-all uppercase tracking-wider">
                                        Clear Filters
                                    </button>
                                </motion.div>
                        ) : (
                            <motion.div
                                key={`${searchQuery}-${activeLetter}-${activeCategory}`}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-4"
                                variants={staggerContainer}
                                initial="hidden"
                                animate="visible"
                            >
                                {filtered.map((item) => {
                                    const isExpanded = expandedTerm === item.term;
                                    const catClass = categoryColors[item.category];
                                    return (
                                        <motion.div
                                            key={item.term}
                                            variants={staggerItem}
                                            className="group relative rounded-sm border border-white/10 bg-[#0f172a] overflow-hidden transition-all duration-300 hover:border-red-500/30 cursor-pointer"
                                            onClick={() => setExpandedTerm(isExpanded ? null : item.term)}
                                            whileHover={{ y: -2 }}
                                        >
                                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            <div className="relative z-10 p-6">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex flex-wrap items-center gap-2 mb-3">
                                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-mono font-bold uppercase tracking-widest border ${catClass}`}>
                                                                <Tag className="w-2.5 h-2.5" />
                                                                {item.category}
                                                            </span>
                                                        </div>
                                                        <h3 className="text-base font-bold font-mono uppercase text-white mb-2 truncate group-hover:text-red-400 transition-colors duration-300">{item.term}</h3>
                                                        <p className={`text-sm text-gray-400 font-mono leading-relaxed transition-all duration-300 ${isExpanded ? '' : 'line-clamp-2'}`}>
                                                            {item.definition}
                                                        </p>

                                                        <AnimatePresence>
                                                            {isExpanded && item.related && item.related.length > 0 && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, height: 0 }}
                                                                    animate={{ opacity: 1, height: 'auto' }}
                                                                    exit={{ opacity: 0, height: 0 }}
                                                                    className="mt-4 overflow-hidden"
                                                                >
                                                                    <p className="text-[11px] text-gray-500 font-mono uppercase tracking-wider font-bold mb-2">Related Terms</p>
                                                                    <div className="flex flex-wrap gap-2">
                                                                        {item.related.map(rel => (
                                                                            <span
                                                                                key={rel}
                                                                                onClick={e => { e.stopPropagation(); setSearchQuery(rel); setExpandedTerm(null); setActiveLetter(null); setActiveCategory(null); }}
                                                                                className="px-2 py-1 rounded-sm bg-[#0B1120] border border-white/10 text-gray-400 text-xs font-mono hover:border-red-500/40 hover:text-red-400 transition-all cursor-pointer uppercase tracking-wide"
                                                                            >
                                                                                {rel}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>

                                                    <div className={`flex-shrink-0 w-7 h-7 rounded-sm border flex items-center justify-center transition-all duration-300 ${isExpanded ? 'bg-red-500/20 border-red-500/50 rotate-90' : 'bg-[#0B1120] border-white/10 group-hover:border-red-500/40'}`}>
                                                        <ChevronRight className={`w-3.5 h-3.5 transition-colors ${isExpanded ? 'text-red-500' : 'text-gray-400 group-hover:text-red-400'}`} />
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ─── Bottom note ─── */}
                    {/* ─── Bottom CTA & Note ─── */}
                    {filtered.length > 0 && (
                        <motion.div
                            className="text-center mt-12 space-y-4"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <p className="text-xs text-gray-600">
                                Showing {filtered.length} of {glossaryTerms.length} terms · Click any card to expand its full definition and related terms.
                            </p>
                            <div className="pt-6 border-t border-white/5">
                                <p className="text-gray-400 mb-4 font-mono">Want to learn how these attacks actually work in the real world?</p>
                                <Link 
                                    to={Routes.WEB_SECURITY_VULNERABILITIES}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-mono font-bold uppercase tracking-widest text-sm rounded-sm transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)]"
                                >
                                    <Shield className="w-5 h-5" />
                                    Explore Web Security Vulnerabilities
                                </Link>
                            </div>
                        </motion.div>
                    )}

                </div>
            </div>
        </>
    );
}
