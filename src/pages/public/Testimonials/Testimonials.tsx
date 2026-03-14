import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Building, MessageSquare, X, Check, User, Briefcase } from 'lucide-react';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';

const testimonials = [
    {
        id: 1,
        name: 'Sarah Johnson',
        role: 'CTO',
        company: 'TechFlow Solutions',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
        content: "Neverland Studio transformed our security infrastructure. Their penetration testing revealed critical vulnerabilities we hadn't even considered. Highly recommended for any enterprise serious about security.",
        rating: 5
    },
    {
        id: 2,
        name: 'Michael Chen',
        role: 'Director of Engineering',
        company: 'CloudScale Inc.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150',
        content: "The cloud migration strategy they implemented was flawless. We reduced costs by 40% while improving performance and security. A true partner in our digital transformation journey.",
        rating: 5
    },
    {
        id: 3,
        name: 'Emily Rodriguez',
        role: 'CISO',
        company: 'FinGuard Bank',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150',
        content: "In the financial sector, security is non-negotiable. Neverland Studio's audit was thorough and their recommendations were practical. They speak our language and understand compliance.",
        rating: 5
    },
    {
        id: 4,
        name: 'David Kim',
        role: 'Founder',
        company: 'Nexus Startups',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150',
        content: "As a startup, we needed a scalable and secure architecture from day one. Their team delivered beyond expectations, setting us up for rapid growth without compromising on security.",
        rating: 5
    },
    {
        id: 5,
        name: 'Lisa Patel',
        role: 'IT Manager',
        company: 'Global Health Systems',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150',
        content: "Their ongoing managed services have been a lifesaver. proactive monitoring means we catch issues before they impact operations. The peace of mind is invaluable.",
        rating: 4
    },
    {
        id: 6,
        name: 'James Wilson',
        role: 'VP of Operations',
        company: 'Logistics Pro',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150',
        content: "We engaged them for a custom web app with high security requirements. The result was a sleek, performant, and fortress-like application that our users love.",
        rating: 5
    }
];

export default function Testimonials() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rating, setRating] = useState(5);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTimeout(() => {
            setSubmitSuccess(true);
            setTimeout(() => {
                setIsModalOpen(false);
                setSubmitSuccess(false);
                setRating(5);
            }, 2000);
        }, 1000);
    };

    return (
        <div className="pt-32 pb-20 min-h-screen bg-[#0B1120] relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
                <div className="absolute top-0 right-0 w-1/3 h-[500px] bg-red-500/5 blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-1/3 h-[500px] bg-red-500/5 blur-[120px]" />
            </div>

            <div className="container-custom relative z-10 px-4 mx-auto max-w-7xl">
                {/* Hero Section */}
                <motion.div
                    className="text-center mb-20 md:mb-28"
                    variants={slideUp}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Icon Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-red-500/25 bg-red-500/10 mb-8 backdrop-blur-sm">
                        <Star className="w-4 h-4 text-red-500" />
                        <span className="text-xs font-mono font-bold text-red-400 tracking-widest uppercase">Testimonials</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tight">
                        <span className="text-white">Client </span>
                        <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.2)]">Success Stories</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed mb-10">
                        See how we've helped businesses secure their digital assets and drive innovation.
                        Real stories from real clients who trust Neverland Studio.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-[#0f172a] hover:bg-[#0B1120] border border-white/10 hover:border-red-500/30 text-white font-bold uppercase tracking-wider text-sm transition-all duration-300 shadow-lg group"
                    >
                        <MessageSquare className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
                        Share Your Story
                    </motion.button>
                </motion.div>

                {/* Testimonials Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-24"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {testimonials.map((testimonial) => (
                        <motion.div
                            key={testimonial.id}
                            className="rounded-sm p-8 border border-white/10 bg-[#0f172a] hover:border-red-500/30 hover:bg-[#0B1120] transition-all duration-300 group flex flex-col h-full relative shadow-xl overflow-hidden"
                            variants={staggerItem}
                            whileHover={{ y: -5 }}
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl group-hover:bg-red-500/10 transition-colors pointer-events-none" />
                            <div className="absolute top-0 left-0 w-1 h-full bg-red-500/20 group-hover:bg-red-500 transition-colors" />

                            {/* Quote Icon */}
                            <div className="absolute top-6 right-8 text-white/5 group-hover:text-red-500/10 transition-colors duration-300">
                                <Quote className="w-10 h-10 rotate-12" />
                            </div>

                            {/* Profile Section */}
                            <div className="flex items-center gap-4 mb-6 pl-2 z-10">
                                <div className="relative w-12 h-12 rounded-sm p-0.5 border border-white/10 bg-[#0B1120] group-hover:border-red-500/40 transition-colors duration-300 overflow-hidden">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        loading="lazy"
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black uppercase tracking-tight text-white group-hover:text-red-400 transition-colors duration-300">
                                        {testimonial.name}
                                    </h3>
                                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mt-1">
                                        <span>{testimonial.role}</span>
                                        <span className="w-1 h-1 rounded-sm bg-red-500/50" />
                                        <div className="flex items-center gap-1.5 group-hover:text-red-400 transition-colors duration-300">
                                            <Building className="w-3.5 h-3.5 text-red-500" />
                                            <span>{testimonial.company}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="flex gap-1 mb-5 pl-2 z-10">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < testimonial.rating ? 'fill-red-500 text-red-500' : 'fill-slate-800 text-slate-800'}`}
                                    />
                                ))}
                            </div>

                            {/* Content */}
                            <p className="text-slate-300 leading-relaxed text-sm flex-grow font-medium pl-2 z-10 border-l border-white/5">
                                "{testimonial.content}"
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-20 text-center"
                >
                    <div className="relative border border-white/10 rounded-sm p-12 lg:p-16 text-center bg-[#0f172a] shadow-2xl overflow-hidden w-full max-w-4xl mx-auto">
                        <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
                        
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-6">Ready to start your <span className="text-red-500">success story?</span></h2>
                            <p className="text-slate-400 font-medium mb-10 max-w-xl mx-auto leading-relaxed">
                                Join hundreds of satisfied clients who have secured their digital future with Neverland Studio.
                            </p>
                            <a
                                href="/contact"
                                className="inline-block px-8 py-4 rounded-sm bg-[#0B1120] border border-white/10 text-white font-bold uppercase tracking-widest text-sm hover:bg-[#0f172a] hover:border-red-500/40 hover:text-red-400 transition-all duration-300"
                            >
                                Schedule Consultation
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Testimonial Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative w-full max-w-lg bg-[#0f172a] border border-white/10 rounded-sm shadow-2xl overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-red-500 z-20" />
                        {/* Header */}
                        <div className="p-6 pt-8 border-b border-white/5 flex items-center justify-between bg-[#0B1120]">
                            <h3 className="text-xl font-black uppercase tracking-tight text-white">Share Your Story</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-red-400 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            {submitSuccess ? (
                                <div className="text-center py-10">
                                    <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-sm flex items-center justify-center mx-auto mb-6">
                                        <Check className="w-8 h-8 text-red-500" />
                                    </div>
                                    <h4 className="text-2xl font-black uppercase tracking-tight text-white mb-2">Thank You!</h4>
                                    <p className="text-slate-400 font-medium">Your testimonial has been submitted successfully.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="name" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">Full Name</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                                <input id="name" name="name" required className="w-full bg-[#0B1120] border border-white/10 rounded-sm pl-11 pr-4 py-3 text-white text-sm placeholder-slate-600 focus:border-red-500 focus:outline-none transition-colors" placeholder="Enter full name" />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="role" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">Role</label>
                                            <div className="relative">
                                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                                <input id="role" name="role" required className="w-full bg-[#0B1120] border border-white/10 rounded-sm pl-11 pr-4 py-3 text-white text-sm placeholder-slate-600 focus:border-red-500 focus:outline-none transition-colors" placeholder="Enter role" />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="company" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">Company</label>
                                        <div className="relative">
                                            <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                            <input id="company" name="company" required className="w-full bg-[#0B1120] border border-white/10 rounded-sm pl-11 pr-4 py-3 text-white text-sm placeholder-slate-600 focus:border-red-500 focus:outline-none transition-colors" placeholder="Enter company name" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="content" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">Review</label>
                                        <div className="relative">
                                            <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-slate-500" />
                                            <textarea id="content" name="content" required rows={4} className="w-full bg-[#0B1120] border border-white/10 rounded-sm pl-11 pr-4 py-3 text-white text-sm placeholder-slate-600 focus:border-red-500 focus:outline-none transition-colors" placeholder="Enter your testimonial..." />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">Rating</label>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button type="button" key={star} onClick={() => setRating(star)} className="focus:outline-none group p-1 transition-transform hover:scale-110">
                                                    <Star className={`w-5 h-5 transition-colors ${star <= rating ? 'fill-red-500 text-red-500' : 'text-slate-700 group-hover:text-red-400/50'}`} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full py-3.5 rounded-sm bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest text-sm transition-all mt-6 shadow-lg shadow-red-500/20">
                                        Submit Testimonial
                                    </button>
                                </>
                            )}</form>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
