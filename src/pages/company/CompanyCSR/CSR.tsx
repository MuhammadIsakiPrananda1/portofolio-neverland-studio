import { motion } from 'framer-motion';
import { Globe, Heart, Shield, Users, ArrowRight, GraduationCap, Leaf, Handshake, BookOpen } from 'lucide-react';
import { COMPANY_INFO, Routes } from '@config/constants';
import SEO from '@components/atoms/SEO/SEO';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';
import { Link } from 'react-router-dom';

const CSR = () => {
    const initiatives = [
        {
            icon: Globe,
            title: 'Digital Inclusion',
            description: 'We believe everyone deserves access to digital resources safely. We partner with non-profits to provide security training to underserved communities.',
            color: 'blue',
            stat: '2,000+',
            statLabel: 'People Trained',
        },
        {
            icon: Heart,
            title: 'Community Support',
            description: 'Our team volunteers time and resources to local organizations, matching employee donations to causes they care about.',
            color: 'rose',
            stat: '500+',
            statLabel: 'Volunteer Hours',
        },
        {
            icon: Shield,
            title: 'Pro-Bono Security',
            description: 'We offer discounted and pro-bono security audits for select non-governmental organizations working on critical societal issues.',
            color: 'emerald',
            stat: '40+',
            statLabel: 'NGOs Protected',
        },
        {
            icon: GraduationCap,
            title: 'Education Initiatives',
            description: 'We host free workshops and sponsor scholarships for students pursuing careers in cybersecurity to build the next generation of defenders.',
            color: 'purple',
            stat: '30+',
            statLabel: 'Scholarships Given',
        },
    ];

    const impactStats = [
        { icon: Users, value: '12K+', label: 'Lives Impacted', color: 'blue' },
        { icon: Globe, value: '15+', label: 'Countries Reached', color: 'emerald' },
        { icon: Leaf, value: '100%', label: 'Carbon Neutral Ops', color: 'green' },
        { icon: BookOpen, value: '80+', label: 'Free Workshops', color: 'purple' },
    ];

    const milestones = [
        { year: '2020', title: 'CSR Program Launched', desc: 'Formalized our commitment to social responsibility with a dedicated CSR fund.' },
        { year: '2021', title: 'Digital Inclusion Drive', desc: 'Partnered with 5 NGOs to deliver free cybersecurity training across rural communities.' },
        { year: '2022', title: 'Scholarship Program', desc: 'Launched annual scholarships for 10 cybersecurity students per year.' },
        { year: '2024', title: 'Carbon Neutral', desc: 'Achieved carbon neutral operations through renewable energy and tree-planting initiatives.' },
    ];

    return (
        <>
            <SEO
                title="Corporate Social Responsibility | Neverland Studio"
                description="Learn about Neverland Studio's commitment to giving back to the community, promoting digital inclusion, and supporting education in cybersecurity."
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
                            <Leaf className="w-4 h-4 text-emerald-400" />
                            <span className="text-xs font-mono font-bold text-emerald-300 tracking-widest uppercase">Our Impact</span>
                        </div>

                        <h1 className="text-5xl lg:text-8xl font-black mb-8 tracking-tight uppercase leading-[1.05]">
                            <span className="text-white">Corporate </span>
                            <span className="text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.2)]">Social</span>
                            <br />
                            <span className="text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.2)]">Responsibility</span>
                        </h1>

                        <p className="text-lg lg:text-xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
                            At {COMPANY_INFO.name}, we recognize our responsibility to the broader community. We leverage our cybersecurity expertise to drive meaningful, lasting social impact.
                        </p>
                    </motion.div>

                    {/* ─── Impact Stats ─── */}
                    <motion.div
                        className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-24"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {impactStats.map((stat, i) => {
                            const Icon = stat.icon;
                            return (
                                <motion.div
                                    key={i}
                                    variants={staggerItem}
                                    className="group relative rounded-sm p-6 lg:p-8 border border-white/5 bg-[#0f172a] text-center overflow-hidden transition-all duration-300 hover:border-emerald-500/30"
                                    whileHover={{ y: -4 }}
                                >
                                    <Icon className="w-8 h-8 text-emerald-500 mx-auto mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                                    <div className="text-3xl lg:text-4xl font-black text-white font-mono mb-1 relative z-10 group-hover:text-emerald-400 transition-colors">{stat.value}</div>
                                    <div className="text-xs text-slate-400 uppercase tracking-widest font-bold relative z-10">{stat.label}</div>
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-emerald-500 group-hover:w-full transition-all duration-500" />
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* ─── Initiatives ─── */}
                    <motion.div
                        className="mb-28"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-emerald-500/20 bg-emerald-500/10 mb-5 backdrop-blur-sm">
                                <Globe className="w-4 h-4 text-emerald-400" />
                                <span className="text-xs font-mono font-bold text-emerald-300 tracking-widest uppercase">What We Do</span>
                            </div>
                            <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tight text-white mb-4">Our Initiatives</h2>
                            <p className="text-slate-400 font-medium max-w-2xl mx-auto text-base lg:text-lg">
                                Focused efforts where we can make the most significant impact, leveraging our unique skills for those in need.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-7">
                            {initiatives.map((initiative, index) => {
                                const Icon = initiative.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        variants={staggerItem}
                                        className="group relative rounded-sm p-8 lg:p-10 border border-white/5 bg-[#0f172a] hover:border-emerald-500/30 transition-all duration-300 overflow-hidden"
                                        whileHover={{ y: -5 }}
                                    >
                                        {/* Stat badge */}
                                        <div className="absolute top-8 right-8 text-right">
                                            <div className="text-2xl font-black text-emerald-500 font-mono">{initiative.stat}</div>
                                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{initiative.statLabel}</div>
                                        </div>

                                        <div className="relative z-10">
                                            <div className="w-14 h-14 rounded-sm bg-[#0B1120] border border-white/10 flex items-center justify-center mb-6 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-all duration-300">
                                                <Icon className="w-7 h-7 text-emerald-500" />
                                            </div>
                                            <h3 className="text-xl lg:text-2xl font-black uppercase tracking-tight text-white mb-3 group-hover:text-emerald-400 transition-colors">{initiative.title}</h3>
                                            <p className="text-slate-400 font-medium text-sm lg:text-base leading-relaxed pr-24">
                                                {initiative.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* ─── Timeline ─── */}
                    <motion.div
                        className="mb-28"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="text-center mb-16">
                            <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tight text-white mb-4">Our Journey</h2>
                            <p className="text-slate-400 font-medium max-w-2xl mx-auto">Milestones that mark our commitment to making a difference.</p>
                        </div>

                        <div className="relative pl-8 border-l border-white/10 space-y-10">
                            {milestones.map((m, i) => (
                                <motion.div
                                    key={i}
                                    className="relative"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.12, duration: 0.6 }}
                                >
                                    {/* dot */}
                                    <div className="absolute -left-[38px] top-5 w-4 h-4 rounded-sm bg-emerald-500 border-4 border-[#0B1120]" />

                                    <div className="p-7 rounded-sm border border-white/5 bg-[#0f172a] hover:border-emerald-500/30 transition-all duration-300">
                                        <div className="text-emerald-500 font-mono text-sm font-black uppercase tracking-widest mb-2">{m.year}</div>
                                        <h3 className="text-xl font-black uppercase tracking-tight text-white mb-2">{m.title}</h3>
                                        <p className="text-slate-400 font-medium text-sm leading-relaxed">{m.desc}</p>
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
                                <Handshake className="w-3.5 h-3.5 text-emerald-500" />
                                <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest">Connect</span>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
                                    <span className="text-white">Are you a </span>
                                    <span className="text-emerald-500">
                                        Non-Profit?
                                    </span>
                                </h2>
                                <p className="text-base lg:text-lg text-slate-400 font-medium max-w-2xl mx-auto">
                                    We are always looking for new ways to support organizations doing good in the world. Reach out to discuss how we can help secure your operations so you can focus on your mission.
                                </p>
                            </div>

                            <div className="flex items-center justify-center gap-3 py-4">
                                <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/10" />
                                <div className="w-1.5 h-1.5 rounded-sm bg-emerald-500/50" />
                                <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/10" />
                            </div>

                            <div className="flex flex-wrap gap-4 justify-center">
                                <a href={`mailto:${COMPANY_INFO.email}?subject=CSR Inquiry`}>
                                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-sm font-bold uppercase tracking-wide transition-colors">
                                        Contact Us for Support <ArrowRight className="w-5 h-5" />
                                    </button>
                                </a>
                                <Link to={Routes.ABOUT}>
                                    <button className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white/40 text-white rounded-sm font-bold uppercase tracking-wide transition-colors">
                                        Learn More About Us
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

export default CSR;
