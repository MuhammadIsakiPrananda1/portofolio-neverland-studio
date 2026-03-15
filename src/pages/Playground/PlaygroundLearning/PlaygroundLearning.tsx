import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    BookOpen, FileText, Wrench, Map, ArrowRight,
    Shield, Terminal, Lock, Globe, Cpu, ChevronRight,
    GraduationCap, Lightbulb, Star, TrendingUp
} from 'lucide-react';
import { Routes } from '@config/constants';

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const learningCategories = [
    {
        path: Routes.PLAYGROUND_LEARNING_WRITEUPS,
        label: 'CTF Write-ups',
        icon: FileText,
        color: 'from-red-500 to-red-600',
        borderColor: 'border-red-500/20',
        bgColor: 'bg-[#0f172a]',
        iconColor: 'text-red-500',
        description: 'In-depth analysis of CTF challenge solutions. Learn techniques, methodologies, and hidden tricks across various challenge categories.',
        stats: '120+ Write-ups',
        badge: 'Popular',
        badgeColor: 'bg-red-500/10 text-red-500 border border-red-500/30 font-mono uppercase',
    },
    {
        path: Routes.PLAYGROUND_LEARNING_TOOLS,
        label: 'Tools & Cheatsheets',
        icon: Wrench,
        color: 'from-red-500 to-red-600',
        borderColor: 'border-red-500/20',
        bgColor: 'bg-[#0f172a]',
        iconColor: 'text-red-500',
        description: 'A complete collection of cybersecurity tools, command cheatsheets, and quick references for penetration testing and forensics.',
        stats: '50+ Tools',
        badge: 'New',
        badgeColor: 'bg-red-500/10 text-red-500 border border-red-500/30 font-mono uppercase',
    },
    {
        path: Routes.PLAYGROUND_LEARNING_ROADMAP,
        label: 'Learning Roadmap',
        icon: Map,
        color: 'from-red-500 to-red-600',
        borderColor: 'border-red-500/20',
        bgColor: 'bg-[#0f172a]',
        iconColor: 'text-red-500',
        description: 'Structured learning paths from beginner to expert. Follow roadmaps designed by cybersecurity professionals.',
        stats: '8 Learning Paths',
        badge: 'Guided',
        badgeColor: 'bg-red-500/10 text-red-500 border border-red-500/30 font-mono uppercase',
    },
];

const featuredTopics = [
    { icon: Shield, label: 'Network Security', count: '24 lessons', color: 'text-red-500' },
    { icon: Terminal, label: 'Linux & Shell', count: '18 lessons', color: 'text-red-500' },
    { icon: Lock, label: 'Cryptography', count: '15 lessons', color: 'text-red-500' },
    { icon: Globe, label: 'Web Exploitation', count: '32 lessons', color: 'text-red-500' },
    { icon: Cpu, label: 'Reverse Engineering', count: '12 lessons', color: 'text-red-500' },
    { icon: GraduationCap, label: 'Ethical Hacking', count: '40 lessons', color: 'text-red-500' },
];

const stats = [
    { icon: BookOpen, value: '200+', label: 'Learning Materials' },
    { icon: Star, value: '4.9', label: 'Avg. Rating' },
    { icon: TrendingUp, value: '8', label: 'Learning Paths' },
    { icon: Lightbulb, value: '50+', label: 'Tools & References' },
];

export default function PlaygroundLearning() {
    return (
        <div className="pt-32 pb-20">
            <div className="container-custom">

                {/* Hero */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="w-20 h-1 bg-gradient-to-r from-red-500 via-red-600 to-red-700 mx-auto mb-8 rounded-sm" />

                    <div className="inline-flex p-4 rounded-sm border border-red-500/20 bg-red-500/10 mb-6">
                        <BookOpen className="w-12 h-12 text-red-500" />
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-mono font-black mb-6 uppercase tracking-tighter">
                        <span className="text-white">Deep </span>
                        <span className="text-red-500">
                            Learning Hub
                        </span>
                    </h1>

                    <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
                        Your deep learning center for cybersecurity. From CTF write-ups and tool references
                        to structured roadmaps — everything you need to level up your skills.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
                        {[
                            { icon: Shield, label: 'Curated Content' },
                            { icon: GraduationCap, label: 'Structured Learning' },
                            { icon: TrendingUp, label: 'Progressive Difficulty' },
                        ].map(({ icon: Icon, label }) => (
                            <div key={label} className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#0f172a] border border-white/10 font-mono text-xs uppercase tracking-wider text-gray-400">
                                <Icon className="w-4 h-4 text-red-500" />
                                <span>{label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Stats Row */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {stats.map(({ icon: Icon, value, label }) => (
                        <motion.div
                            key={label}
                            variants={staggerItem}
                            className="text-center p-6 rounded-sm border border-white/10 bg-[#0B1120]"
                        >
                            <Icon className="w-6 h-6 text-red-500 mx-auto mb-2" />
                            <div className="text-3xl font-mono font-bold text-white mb-1">{value}</div>
                            <div className="text-[10px] font-mono uppercase tracking-widest text-gray-500">{label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Main Categories */}
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {learningCategories.map((cat) => {
                        const Icon = cat.icon;
                        return (
                            <motion.div key={cat.path} variants={staggerItem}>
                                <Link to={cat.path} className="group block h-full">
                                    <div className={`relative h-full rounded-sm border ${cat.borderColor} ${cat.bgColor} p-7 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(239,68,68,0.1)] overflow-hidden hover:border-red-500/40`}>
                                        {/* Top gradient bar */}
                                        <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                                        {/* Badge */}
                                        <div className="flex items-start justify-between mb-5">
                                            <div className="p-3 rounded-sm border border-white/10 bg-[#0B1120]">
                                                <Icon className={`w-7 h-7 ${cat.iconColor}`} />
                                            </div>
                                            <span className={`text-[10px] px-2.5 py-1 rounded-sm tracking-wider ${cat.badgeColor}`}>
                                                {cat.badge}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-mono font-bold text-white mb-3 group-hover:text-red-400 transition-colors uppercase tracking-tight">
                                            {cat.label}
                                        </h3>
                                        <p className="text-gray-400 text-sm font-mono leading-relaxed mb-6">
                                            {cat.description}
                                        </p>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between mt-auto pt-5 border-t border-white/5">
                                            <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">{cat.stats}</span>
                                            <div className={`flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-widest ${cat.iconColor} group-hover:gap-2 transition-all duration-200`}>
                                                Explore <ArrowRight className="w-3.5 h-3.5" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Featured Topics */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-mono font-bold text-white uppercase tracking-tighter">Featured Topics</h2>
                        <Link
                            to={Routes.PLAYGROUND_LEARNING_ROADMAP}
                            className="flex items-center gap-1 text-xs font-mono font-bold text-red-500 hover:text-red-400 transition-colors uppercase tracking-wider"
                        >
                            View All Paths <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {featuredTopics.map(({ icon: Icon, label, count }) => (
                            <Link
                                key={label}
                                to={Routes.PLAYGROUND_LEARNING_ROADMAP}
                                className="group flex flex-col items-center text-center p-4 rounded-sm border border-white/10 bg-[#0B1120] hover:bg-[#0f172a] hover:border-red-500/40 transition-all duration-200"
                            >
                                <div className="p-3 rounded-sm bg-[#0f172a] border border-white/10 mb-3 group-hover:scale-110 transition-transform duration-200 group-hover:border-red-500/30">
                                    <Icon className="w-5 h-5 text-red-500" />
                                </div>
                                <span className="text-white text-[10px] font-mono font-bold uppercase tracking-widest mb-1">{label}</span>
                                <span className="text-gray-500 text-[10px] font-mono">{count}</span>
                            </Link>
                        ))}
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
