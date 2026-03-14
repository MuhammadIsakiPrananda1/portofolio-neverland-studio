import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    BookOpen, FileText, Download, Wrench, ChevronDown, ChevronUp,
    Search, Zap, Library, Mail, X
} from 'lucide-react';
import { slideUp, staggerContainer, staggerItem } from '@utils/animations';
import { Routes } from '@config/constants';
import Button from '@components/atoms/Button';

type ResourceItem = { title: string; meta: string; type: string; action: string; url: string };

const RESOURCE_CONTENT: Record<string, ResourceItem[]> = {
    'Blog & Articles': [
        { title: 'The Hacker News – Latest Cyber Security News', meta: 'Daily updates • thehackernews.com', type: 'Article', action: 'Read Now', url: 'https://thehackernews.com/' },
        { title: 'Krebs on Security – In-Depth Security News', meta: 'Investigative journalism • krebsonsecurity.com', type: 'Article', action: 'Read Now', url: 'https://krebsonsecurity.com/' },
        { title: 'Dark Reading – Information Security News', meta: 'Industry news • darkreading.com', type: 'Article', action: 'Read Now', url: 'https://www.darkreading.com/' },
        { title: 'Bleeping Computer – Security & Tech News', meta: 'Threat news & tutorials • bleepingcomputer.com', type: 'Article', action: 'Read Now', url: 'https://www.bleepingcomputer.com/' },
        { title: 'SANS Internet Storm Center', meta: 'Threat intelligence • isc.sans.edu', type: 'Article', action: 'Read Now', url: 'https://isc.sans.edu/' },
        { title: 'SecurityWeek – Information Security News & Insights', meta: 'Enterprise security • securityweek.com', type: 'Article', action: 'Read Now', url: 'https://www.securityweek.com/' },
        { title: 'Wired Security – Cybersecurity Deep Dives', meta: 'In-depth reporting • wired.com', type: 'Article', action: 'Read Now', url: 'https://www.wired.com/category/security/' },
        { title: "Bruce Schneier's Security Blog", meta: 'Cryptography & security • schneier.com', type: 'Article', action: 'Read Now', url: 'https://www.schneier.com/' },
        { title: 'OWASP Foundation Blog', meta: 'Application security • owasp.org', type: 'Article', action: 'Read Now', url: 'https://owasp.org/blog/' },
        { title: 'Google Project Zero Blog', meta: 'Vulnerability research • googleprojectzero.blogspot.com', type: 'Article', action: 'Read Now', url: 'https://googleprojectzero.blogspot.com/' },
        { title: 'Malwarebytes Labs – Threat Research', meta: 'Malware analysis • malwarebytes.com', type: 'Article', action: 'Read Now', url: 'https://www.malwarebytes.com/blog/' },
        { title: 'Rapid7 Blog – Vulnerability & Research', meta: 'Pen testing insights • rapid7.com', type: 'Article', action: 'Read Now', url: 'https://www.rapid7.com/blog/' },
        { title: 'Microsoft Security Blog', meta: 'Enterprise threats • microsoft.com', type: 'Article', action: 'Read Now', url: 'https://www.microsoft.com/en-us/security/blog/' },
        { title: 'Cisco Talos Intelligence Blog', meta: 'Threat intelligence • blog.talosintelligence.com', type: 'Article', action: 'Read Now', url: 'https://blog.talosintelligence.com/' },
        { title: 'Unit 42 by Palo Alto Networks', meta: 'Threat research • unit42.paloaltonetworks.com', type: 'Article', action: 'Read Now', url: 'https://unit42.paloaltonetworks.com/' },
        { title: 'CrowdStrike Blog – Adversary Intelligence', meta: 'Threat actors • crowdstrike.com', type: 'Article', action: 'Read Now', url: 'https://www.crowdstrike.com/blog/' },
        { title: 'Troy Hunt – Security Research Blog', meta: 'Data breaches & security • troyhunt.com', type: 'Article', action: 'Read Now', url: 'https://www.troyhunt.com/' },
        { title: 'SANS Reading Room – Security Articles', meta: '3000+ papers • sans.org', type: 'Article', action: 'Read Now', url: 'https://www.sans.org/reading-room/' },
    ],
    'Whitepapers': [
        { title: 'NIST Cybersecurity Framework v2.0', meta: 'PDF • NIST • 2024', type: 'Whitepaper', action: 'Download', url: 'https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf' },
        { title: 'OWASP Top 10 – Web Application Security Risks 2021', meta: 'PDF • OWASP • 2021', type: 'Whitepaper', action: 'Download', url: 'https://owasp.org/Top10/A00_2021_Introduction/' },
        { title: 'NIST Zero Trust Architecture (SP 800-207)', meta: 'PDF • NIST • 2020', type: 'Whitepaper', action: 'Download', url: 'https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-207.pdf' },
        { title: 'CIS Controls v8 – Critical Security Controls', meta: 'Free PDF • CIS Security • 2021', type: 'Whitepaper', action: 'Download', url: 'https://www.cisecurity.org/controls/v8' },
        { title: 'MITRE ATT&CK Enterprise Matrix', meta: 'Interactive • MITRE • 2024', type: 'Whitepaper', action: 'Download', url: 'https://attack.mitre.org/matrices/enterprise/' },
        { title: 'Verizon Data Breach Investigations Report 2024', meta: 'PDF • Verizon • 2024', type: 'Whitepaper', action: 'Download', url: 'https://www.verizon.com/business/resources/reports/dbir/' },
        { title: 'Cloud Security Alliance – Cloud Controls Matrix', meta: 'PDF • CSA • 2024', type: 'Whitepaper', action: 'Download', url: 'https://cloudsecurityalliance.org/research/cloud-controls-matrix/' },
        { title: 'ENISA Threat Landscape 2024', meta: 'PDF • ENISA • 2024', type: 'Whitepaper', action: 'Download', url: 'https://www.enisa.europa.eu/publications/enisa-threat-landscape-2024' },
        { title: 'Microsoft Digital Defense Report 2024', meta: 'PDF • Microsoft • 2024', type: 'Whitepaper', action: 'Download', url: 'https://www.microsoft.com/en-us/security/security-insider/microsoft-digital-defense-report-2024' },
        { title: 'Mandiant M-Trends 2024 Report', meta: 'PDF • Mandiant/Google • 2024', type: 'Whitepaper', action: 'Download', url: 'https://www.mandiant.com/m-trends' },
        { title: 'CISA Known Exploited Vulnerabilities Catalog', meta: 'Live database • CISA • Ongoing', type: 'Whitepaper', action: 'Download', url: 'https://www.cisa.gov/known-exploited-vulnerabilities-catalog' },
        { title: 'NIST Password Guidelines (SP 800-63B)', meta: 'PDF • NIST • 2020', type: 'Whitepaper', action: 'Download', url: 'https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-63b.pdf' },
    ],
    'Case Studies': [
        { title: 'SolarWinds Supply Chain Attack – CISA Advisory', meta: 'Nation-state • CISA • 2021', type: 'Case Study', action: 'View Case', url: 'https://www.cisa.gov/news-events/cybersecurity-advisories/aa21-008a' },
        { title: 'Colonial Pipeline Ransomware Incident', meta: 'Ransomware • CISA • 2021', type: 'Case Study', action: 'View Case', url: 'https://www.cisa.gov/news-events/cybersecurity-advisories/aa21-131a' },
        { title: 'Log4Shell Vulnerability (CVE-2021-44228)', meta: 'Critical RCE • NCSC UK • 2021', type: 'Case Study', action: 'View Case', url: 'https://www.ncsc.gov.uk/news/apache-log4j-vulnerability' },
        { title: 'MOVEit Transfer Zero-Day Data Theft', meta: 'Zero-day • Mandiant • 2023', type: 'Case Study', action: 'View Case', url: 'https://www.mandiant.com/resources/blog/zero-day-moveit-data-theft' },
        { title: 'WannaCry Ransomware – Global Outbreak Analysis', meta: 'Ransomware • NCSC UK • 2017', type: 'Case Study', action: 'View Case', url: 'https://www.ncsc.gov.uk/news/wannacry-guidance' },
        { title: 'NotPetya Cyberattack on Maersk', meta: 'Destructive malware • Wired • 2018', type: 'Case Study', action: 'View Case', url: 'https://www.wired.com/story/notpetya-cyberattack-ukraine-russia-code-crashed-the-world/' },
        { title: 'Kaseya VSA Ransomware Supply Chain Attack', meta: 'Supply chain • CISA • 2021', type: 'Case Study', action: 'View Case', url: 'https://www.cisa.gov/news-events/cybersecurity-advisories/aa21-200b' },
        { title: 'Microsoft Exchange ProxyLogon Exploitation', meta: 'Zero-day • CISA • 2021', type: 'Case Study', action: 'View Case', url: 'https://www.cisa.gov/news-events/cybersecurity-advisories/aa21-062a' },
        { title: 'Uber Security Breach – Social Engineering', meta: 'Social engineering • CISA • 2022', type: 'Case Study', action: 'View Case', url: 'https://www.cisa.gov/resources-tools/resources/social-engineering-attacks' },
        { title: 'Twitter Bitcoin Scam – Insider Threat', meta: 'Insider threat • FBI • 2020', type: 'Case Study', action: 'View Case', url: 'https://www.ic3.gov/PSA/2020/PSA200730' },
    ],
    'Security Tools': [
        { title: 'Have I Been Pwned – Data Breach Checker', meta: 'Browser-based • Free • haveibeenpwned.com', type: 'Utility', action: 'Open Tool', url: 'https://haveibeenpwned.com/' },
        { title: 'VirusTotal – File & URL Scanner', meta: 'Browser-based • Free • virustotal.com', type: 'Utility', action: 'Open Tool', url: 'https://www.virustotal.com/' },
        { title: 'Shodan – IoT & Network Search Engine', meta: 'Browser-based • Freemium • shodan.io', type: 'Utility', action: 'Open Tool', url: 'https://www.shodan.io/' },
        { title: 'CyberChef – Data Encoder / Decoder', meta: 'Browser-based • Free • gchq.github.io', type: 'Utility', action: 'Open Tool', url: 'https://gchq.github.io/CyberChef/' },
        { title: 'Wireshark – Network Protocol Analyzer', meta: 'Desktop app • Free • wireshark.org', type: 'Utility', action: 'Open Tool', url: 'https://www.wireshark.org/' },
        { title: 'OWASP ZAP – Web App Security Scanner', meta: 'Desktop/CI • Free • zaproxy.org', type: 'Utility', action: 'Open Tool', url: 'https://www.zaproxy.org/' },
        { title: 'Nmap – Network Discovery & Port Scanner', meta: 'CLI/GUI • Free • nmap.org', type: 'Utility', action: 'Open Tool', url: 'https://nmap.org/' },
        { title: 'Burp Suite – Web Vulnerability Testing', meta: 'Desktop app • Freemium • portswigger.net', type: 'Utility', action: 'Open Tool', url: 'https://portswigger.net/burp' },
        { title: 'Metasploit Framework – Penetration Testing', meta: 'CLI • Free/Pro • metasploit.com', type: 'Utility', action: 'Open Tool', url: 'https://www.metasploit.com/' },
        { title: 'DNSdumpster – DNS Reconnaissance', meta: 'Browser-based • Free • dnsdumpster.com', type: 'Utility', action: 'Open Tool', url: 'https://dnsdumpster.com/' },
        { title: 'SSL Labs Server Test', meta: 'Browser-based • Free • ssllabs.com', type: 'Utility', action: 'Open Tool', url: 'https://www.ssllabs.com/ssltest/' },
        { title: 'Exploit Database – CVE & PoC Repository', meta: 'Browser-based • Free • exploit-db.com', type: 'Utility', action: 'Open Tool', url: 'https://www.exploit-db.com/' },
    ],
};

const resourceCategories = [
    {
        title: 'Blog & Articles',
        description: 'Latest insights, security trends, and technical guides from our experts.',
        icon: BookOpen,
        link: Routes.BLOG,
        color: 'red',
        count: '18 Articles'
    },
    {
        title: 'Whitepapers',
        description: 'In-depth research papers and strategic security frameworks.',
        icon: Download,
        link: '#',
        color: 'red',
        count: '12 Papers'
    },
    {
        title: 'Case Studies',
        description: 'Real-world examples of major cybersecurity incidents and how they unfolded.',
        icon: FileText,
        link: '#',
        color: 'red',
        count: '10 Stories'
    },
    {
        title: 'Security Tools',
        description: 'Free utilities for scanning, analysis, and penetration testing.',
        icon: Wrench,
        link: Routes.PLAYGROUND,
        color: 'red',
        count: '12 Tools'
    }
];

const faqs = [
    {
        category: 'General',
        question: 'How often should I perform a penetration test?',
        answer: 'We recommend conducting penetration tests at least annually, or whenever significant changes are made to your infrastructure or applications. For high-risk industries, quarterly testing is advisable.'
    },
    {
        category: 'Services',
        question: 'What is the difference between a vulnerability scan and a penetration test?',
        answer: 'A vulnerability scan is an automated search for known weaknesses, while a penetration test simulates a real-world attack where extensive manual testing is performed to exploit those weaknesses and assess the business impact.'
    },
    {
        category: 'Security',
        question: 'Do you offer 24/7 security monitoring?',
        answer: 'Yes, our SOC (Security Operations Center) operates 24/7/365 to monitor, detect, and respond to threats in real-time.'
    },
    {
        category: 'Support',
        question: 'How does your incident response process work?',
        answer: 'Our incident response team follows a 6-step process: Preparation, Identification, Containment, Eradication, Recovery, and Lessons Learned. We can deploy immediately to mitigate active threats.'
    }
];

export default function Resources() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedResource, setSelectedResource] = useState<typeof resourceCategories[0] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const openResourceModal = (resource: typeof resourceCategories[0]) => {
        setSelectedResource(resource);
        setIsModalOpen(true);
    };

    const closeResourceModal = () => {
        setIsModalOpen(false);
        setSelectedResource(null);
    };

    return (
        <div className="pt-32 pb-20 min-h-screen bg-[#0B1120] relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-red-500/5 blur-[100px]" />
                <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-red-500/5 blur-[100px]" />
            </div>

            <div className="container-custom relative z-10 px-4 mx-auto max-w-7xl">
                {/* Hero Section - Matching Help Center */}
                <motion.div
                    className="text-center mb-20"
                    variants={slideUp}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-[#0f172a] border border-red-500/20 mb-6 w-fit">
                        <Library className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-mono font-bold text-red-500 uppercase tracking-widest">Resources</span>
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-mono font-black mb-6 uppercase tracking-tighter text-white">
                        Knowledge Center
                    </h1>

                    <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
                        Empowering you with the knowledge, tools, and insights to stay ahead of cyber threats.
                    </p>

                    {/* Helper Center Style Search Bar */}
                    <div className="max-w-2xl mx-auto relative z-20">
                        <div className="relative flex items-center bg-[#0f172a] border border-white/10 rounded-sm p-1.5 hover:border-red-500/30 transition-all duration-200 backdrop-blur-md">
                            <Search className="w-5 h-5 text-gray-400 mx-4 flex-shrink-0" />
                            <input
                                type="text"
                                placeholder="Search for articles, whitepapers, or tools..."
                                className="w-full bg-transparent border-none text-white font-mono text-sm placeholder-gray-500 py-3 focus:outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Button variant="primary" className="!py-2.5 !px-5 rounded-sm bg-red-500/20 text-red-500 hover:bg-red-500/30 border border-red-500/50 font-mono font-bold tracking-widest uppercase">
                                Search
                            </Button>
                        </div>
                    </div>
                </motion.div>

                {/* Resource Categories - Matching Help Center Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {resourceCategories.map((cat) => (
                        <motion.div
                            key={cat.title}
                            variants={staggerItem}
                        >
                            <button
                                onClick={() => openResourceModal(cat)}
                                className="w-full text-left block group h-full"
                            >
                                <div className="relative h-full rounded-sm p-6 border border-white/10 bg-[#0f172a] hover:border-red-500/40 transition-all duration-300 group overflow-hidden">
                                    <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-red-500 to-red-600 rounded-tl-sm rounded-bl-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                                    
                                    <div className="inline-flex p-3 rounded-sm bg-[#0B1120] border border-white/10 mb-4 group-hover:border-red-500/30 transition-all">
                                        <cat.icon className="w-6 h-6 text-red-500" />
                                    </div>

                                    <h3 className="text-lg font-mono font-bold uppercase tracking-tight text-white mb-2 group-hover:text-red-400 transition-colors">{cat.title}</h3>
                                    <p className="text-sm font-mono text-gray-400 mb-4 leading-relaxed">{cat.description}</p>

                                    <div className="flex items-center gap-2 mt-auto border-t border-white/10 pt-4">
                                        <BookOpen className="w-4 h-4 text-gray-500" />
                                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500">{cat.count}</span>
                                    </div>
                                </div>
                            </button>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Modal for Resource Content */}
                <AnimatePresence>
                    {isModalOpen && selectedResource && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="relative w-full max-w-2xl bg-[#0f172a] border border-white/10 rounded-sm shadow-2xl overflow-hidden z-[101]"
                            >
                                {/* Modal Header */}
                                <div className="p-6 border-b border-white/10 flex items-start justify-between bg-[#0B1120] relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-600" />

                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-sm bg-[#0f172a] border border-white/10">
                                            <selectedResource.icon className="w-6 h-6 text-red-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-mono font-bold uppercase tracking-tight text-white">{selectedResource.title}</h3>
                                            <p className="text-sm font-mono text-gray-400">{selectedResource.count}</p>
                                        </div>
                                    </div>
                                    <button onClick={closeResourceModal} className="p-2 rounded-sm hover:bg-white/10 text-gray-400 hover:text-red-400 transition-colors">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {RESOURCE_CONTENT[selectedResource.title]?.map((item, i) => (
                                            <div key={i} className="group p-4 rounded-sm border border-white/10 bg-[#0B1120] hover:border-red-500/30 transition-all duration-200 flex flex-col h-full">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="p-2 rounded-sm bg-[#0f172a] border border-white/5 group-hover:border-red-500/20 transition-colors">
                                                        <FileText className="w-4 h-4 text-red-500" />
                                                    </div>
                                                    <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-gray-500 bg-[#0f172a] border border-white/5 px-2 py-1 rounded-sm">{item.type}</span>
                                                </div>

                                                <h4 className="text-white text-sm font-mono font-bold uppercase tracking-tight mb-2 group-hover:text-red-400 transition-colors line-clamp-2">{item.title}</h4>
                                                <p className="text-[10px] font-mono text-gray-500 mb-4">{item.meta}</p>

                                                <a
                                                    href={item.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full mt-auto py-2 rounded-sm text-xs font-mono font-bold uppercase tracking-widest bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 transition-colors text-center block"
                                                >
                                                    {item.action}
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Modal Footer */}
                                <div className="p-4 border-t border-white/10 bg-[#0B1120] text-center">
                                    <p className="text-sm font-mono text-gray-500">Need something else? <Link to={Routes.CONTACT} className="text-red-400 font-bold hover:underline">Contact our team</Link></p>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Featured Resource - Horizontal Card */}
                <motion.div
                    className="mb-24"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="p-1 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20">
                        <div className="bg-dark-900 rounded-[22px] overflow-hidden relative border border-white/5">
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="p-8 lg:p-12 flex flex-col justify-center">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6 w-fit">
                                        <Zap className="w-3 h-3" />
                                        <span>New Release</span>
                                    </div>
                                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">State of Cyber Security 2024 Report</h2>
                                    <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                        Our comprehensive annual analysis of the global threat landscape, emerging trends, and predictive insights for the coming year.
                                    </p>
                                    <ul className="mb-8 space-y-3">
                                        {['Ransomware evolution analysis', 'AI in offensive and defensive security', 'Cloud infrastructure vulnerabilities'].map((item, i) => (
                                            <li key={i} className="flex items-center text-gray-300">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-3" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <a
                                        href="https://www.crowdstrike.com/global-threat-report/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-dark-900 font-bold hover:bg-gray-200 transition-colors w-fit"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download Report
                                    </a>
                                </div>
                                <div className="relative min-h-[300px] lg:min-h-full bg-gradient-to-br from-emerald-900/10 to-blue-900/10 p-12 flex items-center justify-center overflow-hidden">
                                    {/* Abstract Decorative Background */}
                                    <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px]" />

                                    {/* Mock Report Cover */}
                                    <motion.div
                                        className="relative w-64 aspect-[3/4] bg-dark-800 rounded-lg shadow-2xl border border-white/10 p-6 flex flex-col justify-between group z-10"
                                        whileHover={{ rotate: 0, scale: 1.05 }}
                                        initial={{ rotate: 6 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-lg" />
                                        <div>
                                            <div className="w-8 h-8 rounded bg-emerald-500 mb-4" />
                                            <div className="h-4 w-3/4 bg-white/10 rounded mb-2" />
                                            <div className="h-4 w-1/2 bg-white/10 rounded" />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-2 w-full bg-white/5 rounded" />
                                            <div className="h-2 w-full bg-white/5 rounded" />
                                            <div className="h-2 w-full bg-white/5 rounded" />
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* FAQ Section - Matching Help Center Style */}
                <motion.div
                    className="max-w-4xl mx-auto mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-3">Common Questions</h2>
                        <p className="text-gray-400">Quick answers to frequently asked questions</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className={`rounded-xl border transition-all duration-200 ${openFaq === index
                                    ? 'bg-dark-800 border-emerald-500/30'
                                    : 'bg-dark-800/50 border-white/10 hover:border-white/20'
                                    }`}
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full text-left p-6 flex items-start justify-between gap-4"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${openFaq === index
                                                ? 'bg-emerald-500/20 text-emerald-400'
                                                : 'bg-white/5 text-gray-500'
                                                }`}>
                                                {faq.category}
                                            </span>
                                        </div>
                                        <span className={`font-semibold text-base transition-colors ${openFaq === index ? 'text-emerald-400' : 'text-white'
                                            }`}>
                                            {faq.question}
                                        </span>
                                    </div>
                                    <div className={`p-2 rounded-lg flex-shrink-0 transition-colors ${openFaq === index
                                        ? 'bg-emerald-500/20 text-emerald-400'
                                        : 'bg-white/5 text-gray-400'
                                        }`}>
                                        {openFaq === index ? (
                                            <ChevronUp className="w-5 h-5" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5" />
                                        )}
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {openFaq === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Need More Help / Newsletter Section */}
                <motion.div
                    className="rounded-2xl bg-dark-800/50 border border-white/10 p-10 text-center"
                    variants={slideUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="max-w-2xl mx-auto">
                        <div className="inline-flex p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-6">
                            <Mail className="w-8 h-8 text-blue-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
                        <p className="text-gray-400 mb-8">
                            Get the latest security insights and resources delivered directly to your inbox.
                        </p>

                        <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                placeholder="Enter your work email"
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                            />
                            <Button variant="primary" className="!py-3 !px-6 rounded-xl whitespace-nowrap">
                                Subscribe
                            </Button>
                        </form>
                        <p className="text-gray-600 text-xs mt-4">No spam. Unsubscribe at any time.</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
