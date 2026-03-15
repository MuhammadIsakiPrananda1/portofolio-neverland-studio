import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Bug, Search, Shield, Globe, Server, Code,
    Terminal, Lock, AlertTriangle, ArrowRight,
    Cpu, FileCode, Database, Network, Key
} from 'lucide-react';
import Button from '@components/atoms/Button';

// Animation variants
const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4 }
    }
};

interface CVE {
    id: string;
    cveId: string;
    title: string;
    severity: 'Critical' | 'High' | 'Medium' | 'Low';
    cvss: number;
    description: string;
    vector: string;
    year: number;
    category: string;
    icon: any;
    status: 'Available' | 'Coming Soon';
}

const CVES: CVE[] = [
    {
        id: 'log4shell',
        cveId: 'CVE-2021-44228',
        title: 'Log4Shell (Log4j)',
        severity: 'Critical',
        cvss: 10.0,
        description: 'Remote Code Execution vulnerability in Apache Log4j 2. Attackers can execute arbitrary code by logging a malicious string containing a JNDI lookup.',
        vector: 'Network',
        year: 2021,
        category: 'Remote Code Execution',
        icon: Server,
        status: 'Available'
    },
    {
        id: 'eternalblue',
        cveId: 'CVE-2017-0144',
        title: 'EternalBlue',
        severity: 'Critical',
        cvss: 9.3,
        description: 'Remote Code Execution vulnerability in Microsoft SMBv1 server. Famously used by WannaCry ransomware to spread rapidly across networks.',
        vector: 'Network',
        year: 2017,
        category: 'Remote Code Execution',
        icon: Network,
        status: 'Available'
    },
    {
        id: 'shellshock',
        cveId: 'CVE-2014-6271',
        title: 'Shellshock (Bash Bug)',
        severity: 'Critical',
        cvss: 9.8,
        description: 'GNU Bash through 4.3 processes trailing strings after function definitions in the values of environment variables, allowing remote attackers to execute arbitrary code.',
        vector: 'Network',
        year: 2014,
        category: 'Remote Code Execution',
        icon: Terminal,
        status: 'Available'
    },
    {
        id: 'spring4shell',
        cveId: 'CVE-2022-22965',
        title: 'Spring4Shell',
        severity: 'Critical',
        cvss: 9.8,
        description: 'Remote Code Execution in Spring Framework via Data Binding on JDK 9+. Allows attackers to load a malicious .jsp file to the server.',
        vector: 'Network',
        year: 2022,
        category: 'Remote Code Execution',
        icon: Code,
        status: 'Available'
    },
    {
        id: 'heartbleed',
        cveId: 'CVE-2014-0160',
        title: 'Heartbleed',
        severity: 'High',
        cvss: 7.5,
        description: 'Information disclosure vulnerability in OpenSSL. Allows attackers to read the memory of the systems protected by the vulnerable versions of the OpenSSL software.',
        vector: 'Network',
        year: 2014,
        category: 'Information Disclosure',
        icon: Lock,
        status: 'Available'
    },
    {
        id: 'dirtycow',
        cveId: 'CVE-2016-5195',
        title: 'Dirty COW',
        severity: 'High',
        cvss: 7.8,
        description: 'Race condition in the memory subsystem of the Linux kernel allows local users to gain privileges via a copy-on-write (COW) breakage of private read-only memory mappings.',
        vector: 'Local',
        year: 2016,
        category: 'Privilege Escalation',
        icon: Shield,
        status: 'Available'
    },
    {
        id: 'proxylogon',
        cveId: 'CVE-2021-26855',
        title: 'ProxyLogon',
        severity: 'Critical',
        cvss: 9.8,
        description: 'Server-Side Request Forgery (SSRF) vulnerability in Microsoft Exchange Server. Allows an unauthenticated attacker to authenticate as the Exchange server.',
        vector: 'Network',
        year: 2021,
        category: 'Remote Code Execution',
        icon: Globe,
        status: 'Available'
    },
    {
        id: 'follina',
        cveId: 'CVE-2022-30190',
        title: 'Follina (MSDT RCE)',
        severity: 'High',
        cvss: 7.8,
        description: 'Remote Code Execution vulnerability when MSDT is called using the URL protocol from a calling application such as Word. Allows attackers to run arbitrary code with privileges of the calling application.',
        vector: 'Local/Network',
        year: 2022,
        category: 'Remote Code Execution',
        icon: FileCode,
        status: 'Coming Soon'
    },
    {
        id: 'printnightmare',
        cveId: 'CVE-2021-34527',
        title: 'PrintNightmare',
        severity: 'Critical',
        cvss: 8.8,
        description: 'Remote Code Execution vulnerability exists when the Windows Print Spooler service improperly performs privileged file operations. Attacker could install programs, view, change, or delete data.',
        vector: 'Network',
        year: 2021,
        category: 'RCE / Privilege Escalation',
        icon: Server,
        status: 'Coming Soon'
    },
    {
        id: 'zerologon',
        cveId: 'CVE-2020-1472',
        title: 'Zerologon',
        severity: 'Critical',
        cvss: 10.0,
        description: 'Elevation of privilege vulnerability when an attacker establishes a vulnerable Netlogon secure channel connection to a domain controller, using the Netlogon Remote Protocol (MS-NRPC).',
        vector: 'Network',
        year: 2020,
        category: 'Privilege Escalation',
        icon: Shield,
        status: 'Coming Soon'
    },
    {
        id: 'spectre',
        cveId: 'CVE-2017-5753',
        title: 'Spectre (Variant 1)',
        severity: 'Medium',
        cvss: 5.6,
        description: 'Systems with microprocessors utilizing speculative execution and branch prediction may allow unauthorized disclosure of information to an attacker with local user access via a side-channel analysis.',
        vector: 'Local',
        year: 2017,
        category: 'Information Disclosure',
        icon: Cpu,
        status: 'Coming Soon'
    },
    {
        id: 'meltdown',
        cveId: 'CVE-2017-5754',
        title: 'Meltdown (Variant 3)',
        severity: 'Medium',
        cvss: 5.6,
        description: 'Systems with microprocessors utilizing speculative execution and indirect branch prediction may allow unauthorized disclosure of information to an attacker with local user access.',
        vector: 'Local',
        year: 2017,
        category: 'Information Disclosure',
        icon: Cpu,
        status: 'Coming Soon'
    },
    {
        id: 'krack',
        cveId: 'CVE-2017-13080',
        title: 'KRACK (WPA2)',
        severity: 'High',
        cvss: 7.5,
        description: 'Key Reinstallation Attack in WPA2 Wi-Fi protocol. Attackers within range of a victim can exploit weaknesses to read information previously assumed to be safely encrypted.',
        vector: 'Adjacent Network',
        year: 2017,
        category: 'Cryptographic Failure',
        icon: Key,
        status: 'Coming Soon'
    },
    {
        id: 'equifax-struts',
        cveId: 'CVE-2017-5638',
        title: 'Apache Struts (Equifax)',
        severity: 'Critical',
        cvss: 10.0,
        description: 'Remote Code Execution in Apache Struts 2 via crafted Content-Type header. Famously led to the massive Equifax data breach in 2017.',
        vector: 'Network',
        year: 2017,
        category: 'Remote Code Execution',
        icon: Database,
        status: 'Available'
    },
    {
        id: 'bluekeep',
        cveId: 'CVE-2019-0708',
        title: 'BlueKeep',
        severity: 'Critical',
        cvss: 9.8,
        description: 'Remote Code Execution vulnerability in Remote Desktop Services (RDP). This vulnerability is "wormable", meaning future malware could exploit it automatically from vulnerable computer to vulnerable computer.',
        vector: 'Network',
        year: 2019,
        category: 'Remote Code Execution',
        icon: Network,
        status: 'Coming Soon'
    },
    {
        id: 'poodle',
        cveId: 'CVE-2014-3566',
        title: 'POODLE',
        severity: 'Medium',
        cvss: 4.3,
        description: 'Padding Oracle On Downgraded Legacy Encryption. Man-in-the-middle attack exploiting SSL 3.0 fallback, allowing an attacker to decipher portions of encrypted traffic.',
        vector: 'Network',
        year: 2014,
        category: 'Cryptographic Failure',
        icon: Shield,
        status: 'Coming Soon'
    },
    {
        id: 'drupalgeddon2',
        cveId: 'CVE-2018-7600',
        title: 'Drupalgeddon 2',
        severity: 'Critical',
        cvss: 9.8,
        description: 'Drupal 7.x and 8.x allow remote attackers to execute arbitrary code because of an issue affecting multiple subsystems with default or common module configurations.',
        vector: 'Network',
        year: 2018,
        category: 'Remote Code Execution',
        icon: Globe,
        status: 'Coming Soon'
    },
    {
        id: 'confluence-ognl',
        cveId: 'CVE-2022-26134',
        title: 'Confluence OGNL Injection',
        severity: 'Critical',
        cvss: 9.8,
        description: 'An OGNL injection vulnerability exists that allows an unauthenticated attacker to execute arbitrary code on an Atlassian Confluence Server or Data Center instance.',
        vector: 'Network',
        year: 2022,
        category: 'Remote Code Execution',
        icon: Server,
        status: 'Coming Soon'
    },
    {
        id: 'imagetragick',
        cveId: 'CVE-2016-3714',
        title: 'ImageTragick',
        severity: 'Critical',
        cvss: 8.4,
        description: 'The (1) EPHEMERAL, (2) HTTPS, (3) MVG, (4) MSL, (5) TEXT, (6) SHOW, (7) WIN, and (8) PLT coders in ImageMagick before 6.9.3-10 allow remote attackers to execute arbitrary code via shell metacharacters in a crafted image.',
        vector: 'Network',
        year: 2016,
        category: 'Remote Code Execution',
        icon: FileCode,
        status: 'Coming Soon'
    },
    {
        id: 'vcenter-rce',
        cveId: 'CVE-2021-21972',
        title: 'vCenter Server RCE',
        severity: 'Critical',
        cvss: 9.8,
        description: 'The vSphere Client (HTML5) contains a remote code execution vulnerability in a vCenter Server plugin. A malicious actor with network access to port 443 may exploit this issue to execute commands with unrestricted privileges.',
        vector: 'Network',
        year: 2021,
        category: 'Remote Code Execution',
        icon: Server,
        status: 'Coming Soon'
    }
];

export default function PlaygroundCVE() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSeverity, setSelectedSeverity] = useState('All');

    const filteredCVEs = CVES.filter(cve => {
        const matchesSearch = cve.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cve.cveId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cve.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSeverity = selectedSeverity === 'All' || cve.severity === selectedSeverity;

        return matchesSearch && matchesSeverity;
    });

    return (
        <div className="pt-32 pb-20 bg-[#0B1120] relative min-h-screen">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] bg-red-500/5 rounded-full blur-[100px] sm:blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-56 h-56 sm:w-72 sm:h-72 md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] bg-red-800/5 rounded-full blur-[80px] sm:blur-[100px]" />
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}
                />
            </div>

            <div className="container-custom relative z-10">
                {/* Hero Section */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="w-20 h-1 bg-red-500 mx-auto mb-8 rounded-sm" />

                    <div className="inline-flex py-3 px-4 rounded-sm border border-red-500/30 bg-red-500/10 mb-6">
                        <Bug className="w-10 h-10 text-red-500" />
                    </div>

                    <h1 className="text-5xl lg:text-6xl font-black mb-6 uppercase tracking-tight">
                        <span className="text-white">CVE</span>{' '}
                        <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                            Laboratory
                        </span>
                    </h1>

                    <p className="text-lg lg:text-xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed mb-8">
                        Analyze, exploit, and patch famous Common Vulnerabilities and Exposures (CVEs)
                        in a safe, isolated sandboxed environment.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#0f172a] border border-white/5 hover:border-red-500/30 transition-colors">
                            <Shield className="w-3.5 h-3.5 text-red-400" />
                            <span>Safe Environment</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#0f172a] border border-white/5 hover:border-red-500/30 transition-colors">
                            <Globe className="w-3.5 h-3.5 text-red-400" />
                            <span>Real-world Scenarios</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#0f172a] border border-white/5 hover:border-red-500/30 transition-colors">
                            <Terminal className="w-3.5 h-3.5 text-red-400" />
                            <span>Hands-on Practice</span>
                        </div>
                    </div>
                </motion.div>

                {/* Filters */}
                <motion.div
                    className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="relative w-full md:w-96">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            <Search className="w-4 h-4" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search CVE ID, name, or description..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-[#0f172a] border border-white/10 rounded-sm pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500/50 transition-all font-mono"
                        />
                    </div>

                    <div className="flex items-center gap-2 flex-wrap justify-center">
                        {['All', 'Critical', 'High', 'Medium', 'Low'].map((severity) => (
                            <button
                                key={severity}
                                onClick={() => setSelectedSeverity(severity)}
                                className={`px-4 py-2 rounded-sm text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest transition-all ${selectedSeverity === severity
                                    ? 'bg-red-600 border border-red-500 text-white shadow-sm'
                                    : 'bg-[#0f172a] border border-white/5 text-slate-400 hover:text-white hover:border-red-500/30'
                                    }`}
                            >
                                {severity}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* CVE Grid */}
                <motion.div
                    key={selectedSeverity + searchTerm}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {filteredCVEs.map((cve) => {
                        const Icon = cve.icon;
                        return (
                            <motion.div
                                key={cve.id}
                                variants={staggerItem}
                                className="group relative rounded-sm border border-white/5 bg-[#0f172a] hover:border-red-500/50 transition-all duration-300 h-full flex flex-col overflow-hidden shadow-sm hover:-translate-y-1"
                            >
                                {/* Severity Stripe */}
                                <div className={`absolute top-0 left-0 w-1 h-full ${cve.severity === 'Critical' ? 'bg-red-600' :
                                    cve.severity === 'High' ? 'bg-orange-500' :
                                        cve.severity === 'Medium' ? 'bg-yellow-500' :
                                            'bg-blue-500'
                                    }`} />

                                <div className="p-6 flex-1 flex flex-col">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 rounded-sm bg-[#0B1120] border border-white/5 text-slate-300 group-hover:text-red-400 group-hover:border-red-500/30 transition-all">
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <span className="block text-xs font-mono font-bold tracking-widest text-red-400 mb-0.5">{cve.cveId}</span>
                                                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{cve.year} • {cve.category}</span>
                                            </div>
                                        </div>

                                        <div className={`px-2 py-1 rounded-sm text-[10px] font-mono font-bold tracking-widest uppercase border ${ // Fixed: wrapped expression in curly braces and $
                                            cve.severity === 'Critical' ? 'bg-red-500/10 text-red-500 border-red-500/30' :
                                                cve.severity === 'High' ? 'bg-orange-500/10 text-orange-400 border-orange-500/30' :
                                                    cve.severity === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' :
                                                        'bg-blue-500/10 text-blue-400 border-blue-500/30'
                                            }`}>
                                            CVSS {cve.cvss}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors uppercase tracking-tight">
                                        {cve.title}
                                    </h3>

                                    <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                                        {cve.description}
                                    </p>

                                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                        <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">
                                            <AlertTriangle className="w-3.5 h-3.5" />
                                            <span>{cve.vector} Vector</span>
                                        </div>

                                        {cve.status === 'Available' ? (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="border-red-500/30 rounded-sm text-red-400 hover:bg-red-500/10 hover:border-red-500/50 uppercase tracking-widest font-mono text-[10px]"
                                                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                                            >
                                                Start Lab
                                            </Button>
                                        ) : (
                                            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-600 px-3 py-1.5 rounded-sm bg-[#0B1120] border border-white/5 cursor-not-allowed">
                                                Coming Soon
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Empty State */}
                {filteredCVEs.length === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-flex p-4 rounded-sm bg-[#0f172a] border border-white/5 mb-4">
                            <Search className="w-8 h-8 text-slate-600" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">No CVEs Found</h3>
                        <p className="text-slate-500 text-sm font-medium">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
