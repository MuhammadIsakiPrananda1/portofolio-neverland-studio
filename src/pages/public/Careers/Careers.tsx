import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Briefcase, ArrowRight, MapPin, Clock,
    Terminal, Shield, Zap, Coffee, Globe, Cpu,
    Code, Server, Lock, Bug, Database, Users,
    Star, Heart, Rocket, Building2
} from 'lucide-react';
import { COMPANY_INFO, Routes } from '@config/constants';
import SEO from '@components/atoms/SEO/SEO';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';

export default function Careers() {
    const [activeFilter, setActiveFilter] = useState('All');

    const jobs = [
        { id: 1,  title: 'Senior Penetration Tester',      type: 'Full-time', location: 'Remote',                   department: 'Security Engineering', tags: ['Red Team', 'WebSec', 'Network'],               icon: Terminal, color: 'emerald' },
        { id: 2,  title: 'Frontend Developer (React)',      type: 'Full-time', location: 'Malang, Indonesia',        department: 'Engineering',          tags: ['React', 'TypeScript', 'Tailwind'],              icon: Cpu,      color: 'blue'    },
        { id: 3,  title: 'Cloud Security Architect',        type: 'Full-time', location: 'Remote',                   department: 'Cloud Solutions',      tags: ['AWS', 'Azure', 'DevSecOps'],                   icon: Shield,   color: 'purple'  },
        { id: 4,  title: 'UI/UX Designer',                  type: 'Full-time', location: 'Malang, Indonesia',        department: 'Design',               tags: ['Figma', 'Prototyping', 'User Research'],        icon: Star,     color: 'pink'    },
        { id: 5,  title: 'Security Analyst (SOC)',           type: 'Full-time', location: 'Remote',                   department: 'Security Engineering', tags: ['Blue Team', 'SIEM', 'Incident Response'],       icon: Shield,   color: 'emerald' },
        { id: 6,  title: 'Backend Engineer (Go/Node.js)',   type: 'Full-time', location: 'Jakarta, Indonesia (Hybrid)', department: 'Engineering',       tags: ['Go', 'Node.js', 'Microservices'],               icon: Code,     color: 'blue'    },
        { id: 7,  title: 'DevSecOps Engineer',              type: 'Full-time', location: 'Remote',                   department: 'Cloud Solutions',      tags: ['CI/CD', 'Kubernetes', 'Security Automation'],   icon: Server,   color: 'purple'  },
        { id: 8,  title: 'Malware Researcher',              type: 'Full-time', location: 'Remote',                   department: 'Security Engineering', tags: ['Reverse Engineering', 'Assembly', 'Threat Intel'], icon: Lock,  color: 'emerald' },
        { id: 9,  title: 'Vulnerability Researcher',        type: 'Contract',  location: 'Remote',                   department: 'Security Engineering', tags: ['Exploit Dev', '0-day', 'Fuzzing'],              icon: Bug,      color: 'emerald' },
        { id: 10, title: 'Data Engineer',                   type: 'Full-time', location: 'Singapore (Hybrid)',       department: 'Engineering',          tags: ['Python', 'SQL', 'Data Pipelines'],              icon: Database, color: 'blue'    },
    ];

    const benefits = [
        { icon: Globe,    title: 'Work Anywhere',     desc: 'Remote-first culture with flexible working hours across time zones.' },
        { icon: Zap,      title: 'Latest Tech Stack', desc: 'Work with cutting-edge cybersecurity and development tools every day.' },
        { icon: Coffee,   title: 'Health & Wellness', desc: 'Comprehensive health coverage, wellness stipends, and mental health support.' },
        { icon: Users,    title: 'Brilliant Team',    desc: 'Collaborate with elite professionals in an open, blameless culture.' },
    ];

    const stats = [
        { icon: Building2, value: '50+',  label: 'Team Members',     color: 'purple' },
        { icon: Globe,     value: '10+',  label: 'Countries',        color: 'blue'   },
        { icon: Heart,     value: '98%',  label: 'Employee Satisfaction', color: 'emerald' },
        { icon: Briefcase, value: '15+',  label: 'Open Roles',       color: 'yellow' },
    ];

    const filters = ['All', 'Engineering', 'Security Engineering', 'Cloud Solutions', 'Design'];
    const filteredJobs = activeFilter === 'All' ? jobs : jobs.filter(j => j.department === activeFilter);

    return (
        <>
            <SEO
                title="Careers | Neverland Studio"
                description="Join the Neverland Studio team. Explore open positions in cybersecurity, engineering, cloud solutions, and design."
            />

            <div className="pt-32 pb-24 relative min-h-screen">
                {/* Background */}
                <div className="fixed inset-0 pointer-events-none opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                </div>

                <div className="container-custom relative z-10 px-4 mx-auto max-w-7xl">

                    {/* ─── Hero ─── */}
                    <motion.div
                        className="text-center mb-20 lg:mb-28"
                        variants={slideUp}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-red-500/25 bg-red-500/10 mb-8 backdrop-blur-sm">
                            <Briefcase className="w-4 h-4 text-red-500" />
                            <span className="text-xs font-mono font-bold text-red-400 tracking-widest uppercase">Join Our Team</span>
                        </div>

                        <h1 className="text-5xl lg:text-8xl font-black mb-8 uppercase tracking-tight leading-[1.05]">
                            <span className="text-white">Build Your </span>
                            <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.2)]">Career</span>
                        </h1>

                        <p className="text-lg lg:text-xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed mb-10">
                            We are always looking for talented individuals passionate about cybersecurity, engineering, and pushing the boundaries of technology. Come build the future with {COMPANY_INFO.name}.
                        </p>

                        <button
                            className="inline-flex items-center gap-2 px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-sm font-bold uppercase tracking-wide transition-all shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]"
                            onClick={() => document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            View Open Positions
                        </button>
                    </motion.div>

                    {/* ─── Stats ─── */}
                    <motion.div
                        className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-24"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {stats.map((s, i) => {
                            const Icon = s.icon;
                            return (
                                <motion.div
                                    key={i}
                                    variants={staggerItem}
                                    className="group relative rounded-sm p-6 lg:p-8 border border-white/5 bg-[#0f172a] text-center overflow-hidden transition-all duration-300 hover:border-red-500/30"
                                    whileHover={{ y: -4 }}
                                >
                                    <Icon className="w-8 h-8 text-red-500 mx-auto mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                                    <div className="text-3xl lg:text-4xl font-black text-white font-mono mb-1 relative z-10 group-hover:text-red-400 transition-colors">{s.value}</div>
                                    <div className="text-xs text-slate-400 uppercase tracking-widest font-bold relative z-10">{s.label}</div>
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-red-500 group-hover:w-full transition-all duration-500" />
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* ─── Why Join Us ─── */}
                    <motion.div
                        className="mb-28 relative rounded-sm p-8 lg:p-12 overflow-hidden border border-white/10 bg-[#0f172a] shadow-xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight text-white leading-tight">
                                    Why Work<br />
                                    <span className="text-red-500">With Us?</span>
                                </h2>
                                <div className="space-y-5 text-slate-400 font-medium leading-relaxed text-base lg:text-lg mb-8">
                                    <p>
                                        At {COMPANY_INFO.name}, we believe exceptional talent deserves an exceptional environment. We combine a remote-first culture with a deeply collaborative ethos, giving you the freedom to do your best work wherever you are.
                                    </p>
                                    <p>
                                        We invest heavily in our people — from continuous education and certifications to the latest tooling and a wellness-first approach that keeps our team performing at its peak.
                                    </p>
                                </div>

                                <div className="p-6 rounded-sm border border-red-500/20 bg-red-500/5 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
                                    <div className="flex items-start gap-4 pl-2">
                                        <Heart className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                                        <p className="font-bold text-white text-sm uppercase tracking-wide">
                                            "We don't just hire talent — we build careers and grow together."
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {benefits.map((b, i) => {
                                    const Icon = b.icon;
                                    return (
                                        <motion.div
                                            key={i}
                                            className="group p-6 rounded-sm border border-white/5 bg-[#0B1120] hover:border-red-500/30 transition-all duration-300"
                                            whileHover={{ y: -4 }}
                                        >
                                            <div className="w-12 h-12 rounded-sm bg-[#0f172a] border border-white/10 flex items-center justify-center mb-5 group-hover:bg-red-500/10 group-hover:border-red-500/20 transition-all duration-300">
                                                <Icon className="w-6 h-6 text-red-500" />
                                            </div>
                                            <h3 className="text-base font-black uppercase tracking-tight text-white mb-2 group-hover:text-red-400 transition-colors">{b.title}</h3>
                                            <p className="text-xs text-slate-400 font-medium leading-relaxed">{b.desc}</p>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>

                    {/* ─── Open Positions ─── */}
                    <div id="open-positions" className="scroll-mt-32 mb-28">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tight text-white mb-4">Open Positions</h2>
                            <p className="text-slate-400 font-medium max-w-2xl mx-auto text-base lg:text-lg">
                                Find a role where your skills make a real difference.
                            </p>
                        </div>

                        {/* Filters */}
                        <div className="flex flex-wrap justify-center gap-3 mb-12">
                            {filters.map(filter => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`px-6 py-2.5 rounded-sm text-sm font-bold uppercase tracking-wide transition-all duration-300 border ${activeFilter === filter
                                        ? 'bg-red-600 text-white border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                                        : 'bg-transparent text-slate-400 border-white/10 hover:bg-white/5 hover:text-white hover:border-white/20'
                                    }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>

                        <motion.div
                            key={activeFilter}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                        >
                            {filteredJobs.map((job) => {
                                const Icon = job.icon;
                                return (
                                    <motion.div
                                        key={job.id}
                                        className="group relative p-8 rounded-sm border border-white/5 bg-[#0f172a] hover:border-red-500/30 hover:bg-[#0B1120] transition-all duration-300 overflow-hidden cursor-pointer"
                                        variants={staggerItem}
                                        whileHover={{ y: -4 }}
                                    >
                                        <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/5 group-hover:bg-red-500/10 pointer-events-none transition-colors" />

                                        <div className="relative z-10 flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                                            <div className="flex items-start gap-4">
                                                <div className="p-3.5 rounded-sm border border-white/10 bg-[#0B1120] group-hover:border-red-500/20 group-hover:bg-red-500/10 flex-shrink-0 transition-all duration-300">
                                                    <Icon className="w-5 h-5 text-red-500" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-black uppercase tracking-tight text-white mb-1 group-hover:text-red-400 transition-colors duration-300">{job.title}</h3>
                                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono mb-3">{job.department}</p>
                                                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-4 font-medium">
                                                        <span className="flex items-center gap-1.5">
                                                            <Clock className="w-3.5 h-3.5 text-slate-500" />
                                                            {job.type}
                                                        </span>
                                                        <span className="flex items-center gap-1.5">
                                                            <MapPin className="w-3.5 h-3.5 text-slate-500" />
                                                            {job.location}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {job.tags.map(tag => (
                                                            <span key={tag} className="px-2.5 py-1 text-[11px] font-bold font-mono rounded-sm bg-[#0B1120] text-slate-300 border border-white/5 group-hover:border-red-500/20 group-hover:text-white transition-colors">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-center lg:justify-end shrink-0">
                                                <div className="w-9 h-9 rounded-sm bg-[#0B1120] border border-white/10 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-500 transition-all duration-300">
                                                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>

                        {filteredJobs.length === 0 && (
                            <div className="text-center py-20 border border-white/5 rounded-sm bg-[#0f172a]">
                                <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                                <h3 className="text-xl font-black uppercase tracking-tight text-white mb-2">No Openings Found</h3>
                                <p className="text-slate-400 font-medium">There are currently no open positions in this department.</p>
                            </div>
                        )}
                    </div>

                    {/* ─── CTA ─── */}
                    <motion.div
                        className="relative rounded-sm p-12 lg:p-16 text-center border border-white/10 bg-[#0f172a] shadow-xl overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
                        
                        {/* Decorative grid background inside CTA */}
                        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                        <div className="relative z-10 space-y-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-sm bg-[#0B1120] border border-white/5 mx-auto mb-8">
                                <Rocket className="w-8 h-8 text-red-500" />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
                                    <span className="text-white">Don't See a </span>
                                    <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.2)]">Fit?</span>
                                </h2>
                                <p className="text-base lg:text-lg text-slate-400 font-medium max-w-2xl mx-auto">
                                    We're always looking for exceptional talent. Send us your resume and we'll keep you in mind for future opportunities that match your skills.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4 justify-center py-4">
                                <a href={`mailto:${COMPANY_INFO.email}?subject=Careers - Open Application`}>
                                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-sm font-bold uppercase tracking-wide transition-all duration-300 shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]">
                                        Send Your Resume <ArrowRight className="w-5 h-5" />
                                    </button>
                                </a>
                                <Link to={Routes.CONTACT}>
                                    <button className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-red-500/50 text-white rounded-sm font-bold uppercase tracking-wide transition-colors">
                                        Talk to Our Team
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </>
    );
}
