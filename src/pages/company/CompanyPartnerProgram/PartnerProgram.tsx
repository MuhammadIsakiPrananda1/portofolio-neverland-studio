import { motion } from 'framer-motion';
import { Handshake, Star, Shield, Zap, TrendingUp, CheckCircle, ArrowRight, Award, Users, Globe, BarChart3 } from 'lucide-react';
import { COMPANY_INFO } from '@config/constants';
import SEO from '@components/atoms/SEO/SEO';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';

const PartnerProgram = () => {
    const benefits = [
        {
            icon: Star,
            title: 'Tiered Rewards',
            description: 'Earn greater margins and exclusive benefits as you grow your partnership level with us.',
            color: 'yellow',
        },
        {
            icon: Shield,
            title: 'Co-Branded Marketing',
            description: 'Access our library of marketing materials and collaborate on joint go-to-market campaigns.',
            color: 'emerald',
        },
        {
            icon: Zap,
            title: 'Technical Training',
            description: 'Comprehensive technical training and certifications for your sales and engineering teams.',
            color: 'blue',
        },
        {
            icon: TrendingUp,
            title: 'Dedicated Support',
            description: 'Prioritized technical support and a dedicated channel manager to help you close deals faster.',
            color: 'purple',
        },
    ];

    const tiers = [
        {
            name: 'Silver',
            subtitle: 'Entry level for referral partners',
            color: 'slate',
            highlighted: false,
            items: [
                'Competitive referral commissions',
                'Access to partner portal',
                'Standard sales enablement materials',
            ],
        },
        {
            name: 'Gold',
            subtitle: 'For active value-added resellers',
            color: 'purple',
            highlighted: true,
            badge: 'Most Popular',
            items: [
                'Higher margin discounts',
                'Deal registration protection',
                'Co-branded marketing campaigns',
                'NFR licenses for internal use',
                'Quarterly business reviews',
            ],
        },
        {
            name: 'Platinum',
            subtitle: 'For strategic managed service providers',
            color: 'emerald',
            highlighted: false,
            items: [
                'Maximum margin discounts & rebates',
                'Dedicated channel manager',
                'Custom integration support',
                'Joint business planning',
                '24/7 priority escalation path',
            ],
        },
    ];

    const stats = [
        { icon: Users, value: '120+', label: 'Active Partners', color: 'purple' },
        { icon: Globe, value: '30+', label: 'Countries', color: 'blue' },
        { icon: BarChart3, value: '$50M+', label: 'Partner Revenue Generated', color: 'emerald' },
        { icon: Award, value: '98%', label: 'Partner Satisfaction', color: 'yellow' },
    ];

    return (
        <>
            <SEO
                title="Partner Program | Neverland Studio"
                description="Join the Neverland Studio Partner Program to expand your service offerings and deliver enterprise-grade cybersecurity solutions to your clients."
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
                            <Handshake className="w-4 h-4 text-red-500" />
                            <span className="text-xs font-mono font-bold text-red-400 tracking-widest uppercase">Grow Together</span>
                        </div>

                        <h1 className="text-5xl lg:text-8xl font-black mb-8 tracking-tight uppercase leading-[1.05]">
                            <span className="text-white">Partner </span>
                            <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.2)]">Program</span>
                        </h1>

                        <p className="text-lg lg:text-xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed mb-10">
                            Grow your business by offering {COMPANY_INFO.name}'s industry-leading cybersecurity solutions. Our Program is designed to enable your success and reward your commitment.
                        </p>

                        <a href={`mailto:${COMPANY_INFO.email}?subject=Partner Program Application`}>
                            <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-sm font-bold uppercase tracking-wide transition-all shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]">
                                Apply to Partner Program
                            </button>
                        </a>
                    </motion.div>

                    {/* ─── Partner Stats ─── */}
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

                    {/* ─── Why Partner ─── */}
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
                                    Why Partner<br />
                                    <span className="text-red-500">With Us?</span>
                                </h2>
                                <div className="space-y-5 text-slate-400 font-medium leading-relaxed text-base lg:text-lg mb-8">
                                    <p>
                                        As the threat landscape becomes more complex, your clients rely on you for robust and scalable security solutions. Partnering with {COMPANY_INFO.name} lets you seamlessly integrate our proven expertise into your portfolio.
                                    </p>
                                    <p>
                                        We provide the tools, training, and resources you need to position yourself as a trusted security advisor — and grow your business sustainably.
                                    </p>
                                </div>

                                <div className="p-6 rounded-sm border border-red-500/20 bg-red-500/5 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
                                    <div className="flex items-start gap-4 pl-2">
                                        <Award className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                                        <p className="font-bold text-white text-sm uppercase tracking-wide">
                                            "Our partners are an extension of our team. We win when you win."
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
                                            <p className="text-xs text-slate-400 font-medium leading-relaxed">{b.description}</p>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>

                    {/* ─── Tiers ─── */}
                    <motion.div
                        className="mb-28"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <div className="text-center mb-16">
                            <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tight text-white mb-4">Partnership Tiers</h2>
                            <p className="text-slate-400 font-medium max-w-2xl mx-auto text-base lg:text-lg">
                                Three distinct tiers designed to match your business model and commitment level.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                            {tiers.map((tier, i) => (
                                <motion.div
                                    key={i}
                                    variants={staggerItem}
                                    className={`relative rounded-sm p-8 lg:p-10 border flex flex-col transition-all duration-300 ${
                                        tier.highlighted
                                            ? 'border-red-500/50 bg-[#0B1120] lg:scale-105 z-10'
                                            : 'border-white/5 bg-[#0f172a] hover:border-red-500/30'
                                    }`}
                                    whileHover={{ y: tier.highlighted ? 0 : -5 }}
                                >
                                    {tier.highlighted && <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />}
                                    
                                    {tier.badge && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                            <span className="px-4 py-1.5 rounded-sm bg-red-600 text-white text-[10px] font-black uppercase tracking-widest whitespace-nowrap shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                                                {tier.badge}
                                            </span>
                                        </div>
                                    )}

                                    <div className="mb-8 mt-2">
                                        <h3 className={`text-3xl font-black uppercase tracking-tight mb-2 ${
                                            tier.highlighted ? 'text-red-500' : 'text-white'
                                        }`}>{tier.name}</h3>
                                        <p className="text-slate-400 font-medium text-sm">{tier.subtitle}</p>
                                    </div>

                                    <ul className="space-y-4 flex-1 mb-8">
                                        {tier.items.map((item, j) => (
                                            <li key={j} className="flex items-start gap-3">
                                                <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                                                    tier.highlighted ? 'text-red-500' : 'text-slate-500'
                                                }`} />
                                                <span className={`text-sm font-medium ${tier.highlighted ? 'text-white' : 'text-slate-400'}`}>{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <a href={`mailto:${COMPANY_INFO.email}?subject=${tier.name} Partner Application`}>
                                        <button
                                            className={`w-full py-3 rounded-sm font-bold uppercase tracking-wide transition-all ${
                                                tier.highlighted 
                                                ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg' 
                                                : 'border border-white/20 hover:border-red-500/50 text-white bg-transparent'
                                            }`}
                                        >
                                            Get Started
                                        </button>
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ─── How It Works ─── */}
                    <motion.div
                        className="mb-28"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="text-center mb-16">
                            <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tight text-white mb-4">How It Works</h2>
                            <p className="text-slate-400 font-medium max-w-2xl mx-auto">Getting started is simple. Go from prospect to enabled partner in four steps.</p>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between items-center md:items-start relative">
                            {/* Connecting Line (desktop) */}
                            <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-red-500/10 via-red-500/30 to-red-500/10 z-0" />

                            {[
                                { step: '01', title: 'Apply', desc: 'Submit a simple application detailing your business model.' },
                                { step: '02', title: 'Review', desc: 'Our team evaluates your application for mutual fit.' },
                                { step: '03', title: 'Onboard', desc: 'Complete training and gain access to the partner portal.' },
                                { step: '04', title: 'Grow', desc: 'Start registering deals, co-selling, and earning rewards.' },
                            ].map((s, i) => (
                                <motion.div
                                    key={i}
                                    className="relative z-10 flex flex-col items-center text-center max-w-[200px] mb-10 md:mb-0"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15, duration: 0.5 }}
                                >
                                    <div className="w-14 h-14 rounded-sm bg-[#0B1120] border-2 border-red-500/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(239,68,68,0.15)] group hover:border-red-500 transition-colors">
                                        <span className="text-red-500 font-bold font-mono">{s.step}</span>
                                    </div>
                                    <h4 className="text-lg font-black uppercase tracking-tight text-white mb-2">{s.title}</h4>
                                    <p className="text-sm text-slate-500 font-medium">{s.desc}</p>
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
                        <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
                        <div className="relative z-10 space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-red-500/30 bg-red-500/10">
                                <Handshake className="w-3.5 h-3.5 text-red-500" />
                                <span className="text-xs font-bold text-red-300 uppercase tracking-widest">Connect</span>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
                                    <span className="text-white">Join the </span>
                                    <span className="text-red-500">
                                        Ecosystem
                                    </span>
                                </h2>
                                <p className="text-base lg:text-lg text-slate-400 font-medium max-w-2xl mx-auto">
                                    Expand your service offerings, delight your clients, and unlock new revenue streams. Let's build a more secure future together.
                                </p>
                            </div>

                            <div className="flex items-center justify-center gap-3 py-4">
                                <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/10" />
                                <div className="w-1.5 h-1.5 rounded-sm bg-red-500/50" />
                                <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/10" />
                            </div>

                            <div className="flex flex-wrap gap-4 justify-center">
                                <a href={`mailto:${COMPANY_INFO.email}?subject=Partner Program Application`}>
                                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-sm font-bold uppercase tracking-wide transition-colors">
                                        Submit Application <ArrowRight className="w-5 h-5" />
                                    </button>
                                </a>
                                <a href={`mailto:${COMPANY_INFO.email}?subject=Partner Inquiry`}>
                                    <button className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white/40 text-white rounded-sm font-bold uppercase tracking-wide transition-colors">
                                        Speak to Channel Team
                                    </button>
                                </a>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </>
    );
};

export default PartnerProgram;
