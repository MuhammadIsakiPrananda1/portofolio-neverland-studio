import { motion } from 'framer-motion';
import { Award, Linkedin, Twitter, Github, Briefcase, Mail } from 'lucide-react';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';

const leadership = [
    {
        name: 'Alexander Sterling',
        role: 'Chief Executive Officer',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400',
        bio: 'Visionary leader with 15 years in cybersecurity. Former CISO at major fintech firm.',
        socials: { linkedin: '#', twitter: '#' }
    },
    {
        name: 'Elena Vance',
        role: 'Chief Technology Officer',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400',
        bio: 'Architect of our core security infrastructure. Holds multiple patents in encryption technology.',
        socials: { linkedin: '#', github: '#' }
    },
    {
        name: 'Marcus Chen',
        role: 'Chief Information Security Officer',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400',
        bio: 'Expert in threat intelligence and incident response. Leads our 24/7 SOC operations.',
        socials: { linkedin: '#', twitter: '#' }
    }
];

const team = [
    {
        name: 'Sarah Jenkins',
        role: 'Lead Penetration Tester',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300',
        cert: 'OSCP, CISSP',
        color: 'emerald'
    },
    {
        name: 'David Okafor',
        role: 'Cloud Security Architect',
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300&h=300',
        cert: 'AWS Security Specialty',
        color: 'blue'
    },
    {
        name: 'Emily Wong',
        role: 'Security Analyst',
        image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=300&h=300',
        cert: 'CEH, CompTIA Security+',
        color: 'purple'
    },
    {
        name: 'James Miller',
        role: 'DevSecOps Engineer',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300',
        cert: 'CISM',
        color: 'pink'
    }
];

export default function Team() {
    return (
        <div className="pt-32 pb-20 min-h-screen relative overflow-hidden">
            {/* Ultra Modern Background Elements */}
            <div className="fixed inset-0 pointer-events-none opacity-10">
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>

            <div className="container-custom relative z-10 px-4 mx-auto max-w-7xl">
                {/* Hero Section */}
                <motion.div
                    className="text-center mb-20 md:mb-32"
                    variants={slideUp}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-red-500/25 bg-red-500/10 mb-8 backdrop-blur-sm">
                        <Award className="w-4 h-4 text-red-500" />
                        <span className="text-xs font-mono font-bold text-red-400 tracking-widest uppercase">Our Elite Force</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tight">
                        <span className="text-white">Meet The </span>
                        <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                            Guardians
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
                        We are a collective of security experts, ethical hackers, and engineers united by a single mission:
                        <span className="text-white font-bold ml-1">to protect your digital world.</span>
                    </p>
                </motion.div>

                {/* Leadership Section */}
                <motion.div
                    className="mb-32"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-4">Leadership Team</h2>
                        <div className="w-24 h-1 bg-red-500 mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {leadership.map((leader, index) => (
                            <motion.div
                                key={leader.name}
                                className="group relative rounded-sm p-8 border border-white/5 bg-[#0f172a] transition-all duration-300 hover:border-red-500/30 shadow-lg"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, duration: 0.6 }}
                            >
                                {/* Top Red Accent Line */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />

                                {/* Image Container */}
                                <div className="relative w-48 h-48 mx-auto mb-8">
                                    <div className="relative w-full h-full rounded-sm overflow-hidden border border-white/10 group-hover:border-red-500/30 transition-colors duration-300">
                                        <img
                                            src={leader.image}
                                            alt={leader.name}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-out"
                                        />
                                    </div>
                                </div>

                                <div className="text-center relative z-10">
                                    <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2 group-hover:text-red-400 transition-colors">{leader.name}</h3>
                                    <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-sm bg-red-500/10 border border-red-500/20 text-red-500 font-bold text-xs mb-6 uppercase tracking-widest font-mono">
                                        {leader.role}
                                    </div>
                                    <p className="text-slate-400 text-sm mb-8 leading-relaxed h-16 font-medium">{leader.bio}</p>

                                    {/* Social Links */}
                                    <div className="flex justify-center gap-3">
                                        {Object.entries(leader.socials).map(([platform, link]) => {
                                            const Icon = platform === 'linkedin' ? Linkedin : platform === 'twitter' ? Twitter : Github;
                                            return (
                                                <a key={platform} href={link} className="w-10 h-10 rounded-sm flex items-center justify-center bg-[#0B1120] border border-white/5 hover:bg-red-500/10 hover:border-red-500/30 transition-all duration-300 text-slate-400 hover:text-red-500">
                                                    <Icon className="w-4 h-4" />
                                                </a>
                                            )
                                        })}
                                        <a href="#" className="w-10 h-10 rounded-sm flex items-center justify-center bg-[#0B1120] border border-white/5 hover:bg-red-500/10 hover:border-red-500/30 transition-all duration-300 text-slate-400 hover:text-red-500">
                                            <Mail className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Security Experts Grid */}
                <motion.div
                    className="mb-32"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-4">Core Experts</h2>
                        <div className="w-24 h-1 bg-red-500 mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {team.map((member) => (
                            <motion.div
                                key={member.name}
                                className={`rounded-sm p-6 border border-white/5 bg-[#0f172a] hover:bg-[#0B1120] hover:border-red-500/30 transition-all duration-300 group hover:-translate-y-2 text-center relative overflow-hidden`}
                                variants={staggerItem}
                            >
                                <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none group-hover:bg-red-500/5 transition-colors" />

                                <div className="relative w-24 h-24 mx-auto mb-6">
                                    <div className="relative w-full h-full rounded-sm overflow-hidden border border-white/10 group-hover:border-red-500/20 transition-colors duration-300">
                                        <img src={member.image} alt={member.name} loading="lazy" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                    </div>
                                </div>

                                <h4 className="text-xl font-black uppercase tracking-tight text-white mb-2 group-hover:text-red-400 transition-colors">{member.name}</h4>
                                <p className="text-slate-400 text-sm mb-5 font-medium">{member.role}</p>

                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#0B1120] border border-white/5 text-xs text-slate-300 font-mono">
                                    <Award className="w-3.5 h-3.5 text-red-500" />
                                    <span>{member.cert}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Join Us CTA - Ultra Modern */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-sm border border-white/10 bg-[#0f172a] shadow-xl p-8 md:p-16 overflow-hidden mt-20"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
                    
                    {/* Decorative grid background inside CTA */}
                    <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="md:w-3/5 text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#0B1120] border border-white/5 mb-6">
                                <Briefcase className="w-4 h-4 text-red-500" />
                                <span className="text-xs font-bold font-mono text-slate-300 tracking-wider uppercase">Careers</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tight text-white leading-tight">
                                Build the Future of <br className="hidden md:block" />
                                <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.2)]">Cybersecurity</span>
                            </h2>
                            <p className="text-slate-400 font-medium text-lg mb-0 max-w-xl">
                                We are always looking for exceptional talent to join our mission. If you're passionate about security and innovation, we'd love to meet you.
                            </p>
                        </div>

                        <div className="md:w-2/5 flex flex-col gap-4 w-full">
                            <button className="w-full px-8 py-4 rounded-sm bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wide transition-all duration-300 shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] flex items-center justify-center gap-2">
                                <span>View Open Positions</span>
                            </button>
                            <button className="w-full px-8 py-4 rounded-sm bg-transparent border border-white/20 hover:border-red-500/50 text-white font-bold uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-2">
                                <span>Contact HR Team</span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

