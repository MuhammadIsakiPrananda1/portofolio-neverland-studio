import { motion } from 'framer-motion';
import { Shield, Users, Target, Zap, Globe, Heart, ArrowRight, Lightbulb, Code, Coffee, BookOpen, Smile } from 'lucide-react';
import { COMPANY_INFO, Routes } from '@config/constants';
import SEO from '@components/atoms/SEO/SEO';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';
import { Link } from 'react-router-dom';

const ValuesCulture = () => {
    const values = [
        {
            icon: Shield,
            title: 'Integrity First',
            description: 'We operate with uncompromising ethical standards in everything we do, ensuring absolute trust and transparency with our clients.',
            accent: 'from-emerald-500/15 to-emerald-500/5',
            border: 'hover:border-emerald-500/25',
            iconColor: 'text-emerald-400',
            iconBg: 'bg-emerald-500/10 border-emerald-500/20',
        },
        {
            icon: Target,
            title: 'Excellence',
            description: 'We are committed to delivering the highest quality security solutions and continuously improving our methodologies.',
            accent: 'from-blue-500/15 to-blue-500/5',
            border: 'hover:border-blue-500/25',
            iconColor: 'text-blue-400',
            iconBg: 'bg-blue-500/10 border-blue-500/20',
        },
        {
            icon: Users,
            title: 'Collaboration',
            description: 'The best solutions come from working closely with our clients and leveraging the diverse expertise of our global team.',
            accent: 'from-purple-500/15 to-purple-500/5',
            border: 'hover:border-purple-500/25',
            iconColor: 'text-purple-400',
            iconBg: 'bg-purple-500/10 border-purple-500/20',
        },
        {
            icon: Zap,
            title: 'Innovation',
            description: 'We stay ahead of emerging threats by continuously researching new technologies and developing novel security approaches.',
            accent: 'from-yellow-500/15 to-yellow-500/5',
            border: 'hover:border-yellow-500/25',
            iconColor: 'text-yellow-400',
            iconBg: 'bg-yellow-500/10 border-yellow-500/20',
        },
        {
            icon: Globe,
            title: 'Global Perspective',
            description: 'Cyber threats know no borders. Our solutions are designed to protect organizations operating at a global scale.',
            accent: 'from-teal-500/15 to-teal-500/5',
            border: 'hover:border-teal-500/25',
            iconColor: 'text-teal-400',
            iconBg: 'bg-teal-500/10 border-teal-500/20',
        },
        {
            icon: Heart,
            title: 'Passion',
            description: 'We are deeply passionate about cybersecurity and dedicated to making the digital world a safer place for everyone.',
            accent: 'from-rose-500/15 to-rose-500/5',
            border: 'hover:border-rose-500/25',
            iconColor: 'text-rose-400',
            iconBg: 'bg-rose-500/10 border-rose-500/20',
        },
    ];

    const perks = [
        { icon: Lightbulb, title: 'Continuous Learning', desc: 'Regular training sessions, cert reimbursements, and access to cutting-edge tools.', color: 'emerald' },
        { icon: Code, title: 'Flexible Environment', desc: 'Remote-first culture with async tools that fit the way modern security teams work.', color: 'blue' },
        { icon: Coffee, title: 'Balanced Culture', desc: 'We work hard, but we believe in sustainable pace, team socials, and real downtime.', color: 'yellow' },
        { icon: BookOpen, title: 'Research Time', desc: 'Dedicated time each week to explore CTFs, write-ups, or personal security projects.', color: 'purple' },
        { icon: Smile, title: 'Open Feedback', desc: 'An open-door policy where every voice matters and suggestions drive our roadmap.', color: 'rose' },
        { icon: Globe, title: 'Global Team', desc: 'Work alongside a diverse team spanning 15+ countries with different perspectives.', color: 'teal' },
    ];

    const teamQuotes = [
        { quote: "Working here pushed me to get my OSCP. The team's support was incredible.", author: "Rizky A.", role: "Senior Penetration Tester" },
        { quote: "The culture is the most collaborative I've ever experienced in tech.", author: "Dina M.", role: "Cloud Security Engineer" },
        { quote: "Remote-first doesn't mean isolated — it means trusted.", author: "Fajar L.", role: "Full-Stack Developer" },
    ];

    return (
        <>
            <SEO
                title="Values & Culture | Neverland Studio"
                description="Discover the core values and culture that drive Neverland Studio's commitment to excellence in cybersecurity and IT solutions."
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
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-emerald-500/25 bg-emerald-500/10 mb-8 backdrop-blur-sm">
                            <Heart className="w-4 h-4 text-emerald-400" />
                            <span className="text-xs font-mono font-bold text-emerald-300 tracking-widest uppercase">Our DNA</span>
                        </div>

                        <h1 className="text-5xl lg:text-8xl font-black mb-8 tracking-tight uppercase leading-[1.05]">
                            <span className="text-white">Values &amp; </span>
                            <span className="text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.2)]">Culture</span>
                        </h1>

                        <p className="text-lg lg:text-xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
                            At {COMPANY_INFO.name}, our principles guide every decision we make. We are building a culture of security, innovation, and trust — together.
                        </p>
                    </motion.div>

                    {/* ─── Core Values ─── */}
                    <motion.div
                        className="mb-28"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm border border-emerald-500/20 bg-emerald-500/10 mb-5 backdrop-blur-sm">
                                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-xs font-mono font-bold text-emerald-300 tracking-widest uppercase">What We Stand For</span>
                            </div>
                            <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tight text-white mb-4">Core Principles</h2>
                            <p className="text-slate-400 font-medium max-w-2xl mx-auto text-base lg:text-lg">
                                Fundamental beliefs that shape our company and drive our mission to secure the digital future.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                            {values.map((v, i) => {
                                const Icon = v.icon;
                                return (
                                    <motion.div
                                        key={i}
                                        variants={staggerItem}
                                        className="group relative rounded-sm p-8 border border-white/5 bg-[#0f172a] hover:border-emerald-500/30 transition-all duration-300 overflow-hidden"
                                        whileHover={{ y: -5 }}
                                    >
                                        <div className="relative z-10">
                                            <div className="w-12 h-12 rounded-sm bg-[#0B1120] border border-white/10 flex items-center justify-center mb-6 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-all duration-300">
                                                <Icon className="w-6 h-6 text-emerald-500" />
                                            </div>
                                            <h3 className="text-xl lg:text-2xl font-black uppercase tracking-tight text-white mb-3 group-hover:text-emerald-400 transition-colors">{v.title}</h3>
                                            <p className="text-slate-400 font-medium text-sm lg:text-base leading-relaxed">{v.description}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* ─── Life at Neverland ─── */}
                    <motion.div
                        className="mb-28 relative rounded-sm p-8 lg:p-12 overflow-hidden border border-white/10 bg-[#0f172a] shadow-xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />

                        <div className="relative z-10">
                            <div className="text-center mb-14">
                                <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tight mb-4">
                                    <span className="text-white">Life at </span>
                                    <span className="text-emerald-500">{COMPANY_INFO.name}</span>
                                </h2>
                                <p className="text-slate-400 font-medium max-w-2xl mx-auto text-base lg:text-lg">
                                    We've cultivated an environment where brilliant minds collaborate, learn, and grow together.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {perks.map((p, i) => {
                                    const Icon = p.icon;
                                    return (
                                        <motion.div
                                            key={i}
                                            className="group flex items-start gap-4 p-6 rounded-sm border border-white/5 bg-[#0B1120] hover:border-emerald-500/30 transition-all duration-300"
                                            whileHover={{ y: -4 }}
                                            initial={{ opacity: 0, y: 16 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.07, duration: 0.5 }}
                                        >
                                            <div className="w-12 h-12 flex-shrink-0 rounded-sm bg-[#0f172a] border border-white/10 flex items-center justify-center group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-all duration-300">
                                                <Icon className="w-6 h-6 text-emerald-500" />
                                            </div>
                                            <div>
                                                <h4 className="text-base font-black uppercase tracking-tight text-white mb-1 group-hover:text-emerald-400 transition-colors">{p.title}</h4>
                                                <p className="text-slate-400 font-medium text-xs leading-relaxed">{p.desc}</p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>

                    {/* ─── Team Quotes ─── */}
                    <motion.div
                        className="mb-28"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <div className="text-center mb-14">
                            <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-white mb-4">Voices of Our Team</h2>
                            <p className="text-slate-400 font-medium max-w-xl mx-auto">Don't take our word for it — hear from the people who live our culture every day.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {teamQuotes.map((q, i) => (
                                <motion.div
                                    key={i}
                                    variants={staggerItem}
                                    className="group relative p-8 rounded-sm border border-white/5 bg-[#0f172a] hover:border-emerald-500/30 transition-all duration-300 overflow-hidden"
                                    whileHover={{ y: -4 }}
                                >
                                    {/* quote mark */}
                                    <div className="text-6xl font-black text-emerald-500/10 absolute top-4 left-5 leading-none select-none">"</div>
                                    <div className="relative z-10 pt-4">
                                        <p className="text-slate-300 font-medium text-sm lg:text-base leading-relaxed italic mb-6">"{q.quote}"</p>
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-sm bg-[#0B1120] border border-white/10 flex items-center justify-center text-sm font-black text-emerald-500 font-mono">
                                                {q.author.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold uppercase tracking-wide text-white">{q.author}</div>
                                                <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500">{q.role}</div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ─── CTA ─── */}
                    <motion.div
                        className="relative rounded-sm p-12 lg:p-16 text-center border border-white/10 bg-[#0f172a] shadow-xl overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
                        <div className="relative z-10 space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-emerald-500/30 bg-emerald-500/10">
                                <Zap className="w-3.5 h-3.5 text-emerald-500" />
                                <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest">Join Us</span>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
                                    <span className="text-white">Ready to Shape the </span>
                                    <br />
                                    <span className="text-emerald-500">
                                        Future?
                                    </span>
                                </h2>
                                <p className="text-base lg:text-lg text-slate-400 font-medium max-w-2xl mx-auto">
                                    Join our team of experts and help us build a safer digital world. We're always looking for passionate individuals to join our mission.
                                </p>
                            </div>

                            <div className="flex items-center justify-center gap-3 py-4">
                                <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/10" />
                                <div className="w-1.5 h-1.5 rounded-sm bg-emerald-500/50" />
                                <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/10" />
                            </div>

                            <div className="flex flex-wrap gap-4 justify-center">
                                <Link to={Routes.CONTACT}>
                                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-sm font-bold uppercase tracking-wide transition-colors">
                                        View Open Positions <ArrowRight className="w-5 h-5" />
                                    </button>
                                </Link>
                                <Link to={Routes.ABOUT}>
                                    <button className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white/40 text-white rounded-sm font-bold uppercase tracking-wide transition-colors">
                                        Our Story
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </>
    );
};

export default ValuesCulture;
