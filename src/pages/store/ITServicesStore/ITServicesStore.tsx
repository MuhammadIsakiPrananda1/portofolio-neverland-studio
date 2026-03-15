import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    ShoppingCart, ArrowRight, CheckCircle, Sparkles, Zap, Star,
    Shield, Code, CloudCog, Users, Server, Palette, Tag, Percent,
    Clock, Award, TrendingUp, Headphones, Globe, Target, FileSearch,
    Database, Layers, FileCode, Plus, Check
} from 'lucide-react';
import Button from '@components/atoms/Button';
import SectionTitle from '@components/molecules/SectionTitle';
import { Routes, CERTIFICATIONS } from '@config/constants';
import { slideUp, staggerContainer, staggerItem, fadeIn } from '@utils/animations';
import { useCart } from '@/contexts/CartContext';

interface ServicePackage {
    id: string;
    icon: React.ElementType;
    iconName: string;
    name: string;
    description: string;
    originalPrice: number;
    discountedPrice: number;
    discountPercent: number;
    period: string;
    features: string[];
    popular?: boolean;
    gradient: string;
    accentColor: string;
    link: string;
}

function formatRupiah(num: number): string {
    return 'Rp ' + num.toLocaleString('id-ID');
}

const servicePackages: ServicePackage[] = [
    {
        id: 'web-development',
        icon: Code,
        iconName: 'Code',
        name: 'Web Development',
        description: 'Modern and responsive web solutions for your business, from landing pages to complex web applications.',
        originalPrice: 15000000,
        discountedPrice: 12000000,
        discountPercent: 20,
        period: '/project',
        features: [
            'Custom Web Application',
            'Responsive Design (Mobile-First)',
            'E-Commerce Integration',
            'Progressive Web App (PWA)',
            'SEO Optimization',
            'Free 3 Months Support',
        ],
        popular: true,
        gradient: 'from-red-600 to-red-800',
        accentColor: 'red',
        link: Routes.WEB_DEVELOPMENT,
    },
    {
        id: 'cyber-security',
        icon: Shield,
        iconName: 'Shield',
        name: 'Cyber Security',
        description: 'Protect your digital assets with professional and comprehensive cybersecurity services.',
        originalPrice: 25000000,
        discountedPrice: 21250000,
        discountPercent: 15,
        period: '/project',
        features: [
            'Penetration Testing (Black/White Box)',
            'Security Audit & Compliance',
            'Vulnerability Assessment (VAPT)',
            'Network Security Analysis',
            'Incident Response Plan',
            'Detailed Remediation Report',
        ],
        gradient: 'from-red-600 to-red-800',
        accentColor: 'red',
        link: Routes.CYBER_SECURITY,
    },
    {
        id: 'cloud-solutions',
        icon: CloudCog,
        iconName: 'CloudCog',
        name: 'Cloud Solutions',
        description: 'Migrate and manage your cloud infrastructure efficiently, securely, and cost-effectively.',
        originalPrice: 20000000,
        discountedPrice: 15000000,
        discountPercent: 25,
        period: '/project',
        features: [
            'Cloud Migration (AWS/Azure/GCP)',
            'Infrastructure as Code (Terraform)',
            'Managed Cloud Services',
            'Cost Optimization & Monitoring',
            'Auto-Scaling Configuration',
            'Free 1 Month Managed Service',
        ],
        popular: true,
        gradient: 'from-red-600 to-red-800',
        accentColor: 'red',
        link: Routes.CLOUD_SOLUTIONS,
    },
    {
        id: 'it-consulting',
        icon: Users,
        iconName: 'Users',
        name: 'IT Consulting',
        description: 'The right IT strategy for your business digital transformation and growth.',
        originalPrice: 10000000,
        discountedPrice: 9000000,
        discountPercent: 10,
        period: '/session',
        features: [
            'IT Strategy & Planning',
            'Digital Transformation Roadmap',
            'Technology Assessment',
            'IT Governance Framework',
            'Vendor Management Advisory',
            'Monthly Progress Report',
        ],
        gradient: 'from-red-600 to-red-800',
        accentColor: 'red',
        link: Routes.CONSULTING,
    },
    {
        id: 'it-infrastructure',
        icon: Server,
        iconName: 'Server',
        name: 'IT Infrastructure',
        description: 'Build and manage robust, scalable, and enterprise-grade IT infrastructure.',
        originalPrice: 18000000,
        discountedPrice: 14400000,
        discountPercent: 20,
        period: '/project',
        features: [
            'Server Setup & Management',
            'Network Infrastructure Design',
            'Storage Solutions (NAS/SAN)',
            'Virtualization (VMware/Proxmox)',
            '24/7 Monitoring & Maintenance',
            'Disaster Recovery Planning',
        ],
        gradient: 'from-red-600 to-red-800',
        accentColor: 'red',
        link: '/services/it-infrastructure',
    },
    {
        id: 'ui-ux-design',
        icon: Palette,
        iconName: 'Palette',
        name: 'UI/UX Design',
        description: 'Beautiful, intuitive interface design that delivers the best user experience.',
        originalPrice: 8000000,
        discountedPrice: 5600000,
        discountPercent: 30,
        period: '/project',
        features: [
            'User Research & Persona',
            'Wireframe & Prototyping',
            'Mobile App UI Design',
            'Web Interface Design',
            'Design System Creation',
            'Usability Testing',
        ],
        gradient: 'from-red-600 to-red-800',
        accentColor: 'red',
        link: Routes.UI_UX_DESIGN,
    },
];

const addOnServices = [
    { id: 'addon-domain', icon: Globe, name: 'Domain & Hosting', price: 500000, priceLabel: 'Rp 500,000/year', desc: 'Domain .com + Hosting 10GB SSD', gradient: 'from-red-600 to-red-800' },
    { id: 'addon-db', icon: Database, name: 'Database Management', price: 2000000, priceLabel: 'Rp 2,000,000', desc: 'Database setup & optimization', gradient: 'from-red-600 to-red-800' },
    { id: 'addon-support', icon: Headphones, name: 'Priority Support 24/7', price: 3000000, priceLabel: 'Rp 3,000,000/month', desc: 'Dedicated support engineer', gradient: 'from-red-600 to-red-800' },
    { id: 'addon-source', icon: FileCode, name: 'Source Code & Docs', price: 1500000, priceLabel: 'Rp 1,500,000', desc: 'Full source code + technical docs', gradient: 'from-red-600 to-red-800' },
];

const processSteps = [
    { step: '01', title: 'Consultation', desc: 'Discuss your business needs & goals', icon: Target },
    { step: '02', title: 'Proposal & Quote', desc: 'Transparent work plan and pricing', icon: FileSearch },
    { step: '03', title: 'Execution', desc: 'Our expert team starts working on your project', icon: Layers },
    { step: '04', title: 'Delivery & Support', desc: 'Handover + free maintenance & support', icon: Award },
];

function AddToCartButton({ pkg }: { pkg: ServicePackage }) {
    const { addItem, items } = useCart();
    const [justAdded, setJustAdded] = useState(false);
    const inCart = items.some(i => i.id === pkg.id);

    const handleAdd = () => {
        addItem({
            id: pkg.id,
            name: pkg.name,
            description: pkg.description,
            originalPrice: pkg.originalPrice,
            discountedPrice: pkg.discountedPrice,
            discountPercent: pkg.discountPercent,
            period: pkg.period,
            icon: pkg.iconName,
            gradient: pkg.gradient,
        });
        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 1500);
    };

    return (
        <motion.button
            onClick={handleAdd}
            whileTap={{ scale: 0.95 }}
            className={`w-full py-3.5 rounded-sm font-semibold text-sm transition-all duration-300 ${justAdded
                ? 'bg-red-500 text-white shadow-sm'
                : pkg.popular
                    ? `bg-red-600 text-white shadow-sm hover:bg-red-700`
                    : 'bg-[#0B1120] text-white border border-white/10 hover:border-red-500/30'
                }`}
        >
            <span className="flex items-center justify-center gap-2">
                <AnimatePresence mode="wait">
                    {justAdded ? (
                        <motion.span
                            key="check"
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0 }}
                            className="flex items-center gap-2"
                        >
                            <Check className="w-4 h-4" />
                            Added!
                        </motion.span>
                    ) : (
                        <motion.span
                            key="add"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="flex items-center gap-2"
                        >
                            {inCart ? <Plus className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                            {inCart ? 'Add More' : 'Add to Cart'}
                        </motion.span>
                    )}
                </AnimatePresence>
            </span>
        </motion.button>
    );
}

function AddOnButton({ addon }: { addon: typeof addOnServices[0] }) {
    const { addItem, items } = useCart();
    const [justAdded, setJustAdded] = useState(false);
    const inCart = items.some(i => i.id === addon.id);

    const handleAdd = () => {
        addItem({
            id: addon.id,
            name: addon.name,
            description: addon.desc,
            originalPrice: addon.price,
            discountedPrice: addon.price,
            discountPercent: 0,
            period: '',
            icon: addon.name,
            gradient: addon.gradient,
        });
        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 1500);
    };

    return (
        <motion.button
            onClick={handleAdd}
            whileTap={{ scale: 0.95 }}
            className={`mt-3 w-full py-2 rounded-sm text-xs font-semibold transition-all duration-300 ${justAdded
                ? 'bg-red-500/20 text-red-500 border border-red-500/30'
                : inCart
                    ? 'bg-red-600 border border-red-500 text-white'
                    : 'bg-[#0B1120] text-gray-400 border border-white/10 hover:bg-[#0f172a] hover:text-white hover:border-red-500/30'
                }`}
        >
            {justAdded ? (
                <span className="flex items-center justify-center gap-1">
                    <Check className="w-3 h-3" /> Added!
                </span>
            ) : (
                <span className="flex items-center justify-center gap-1">
                    <Plus className="w-3 h-3" /> {inCart ? 'Add More' : 'Add to Cart'}
                </span>
            )}
        </motion.button>
    );
}

export default function ITServicesStorePage() {
    const { totalItems } = useCart();

    return (
        <div className="pt-32 pb-20">
            <div className="container-custom">


                {/* Hero Section */}
                <motion.div
                    className="text-center mb-24"
                    variants={slideUp}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm border border-red-500/30 bg-[#0B1120] mb-8"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                    >
                        <Sparkles className="w-4 h-4 text-red-500 animate-pulse" />
                        <span className="text-sm font-bold text-red-500 uppercase tracking-widest">
                            🔥 Up to 30% Off — Limited Time Promo!
                        </span>
                        <Sparkles className="w-4 h-4 text-red-500 animate-pulse" />
                    </motion.div>

                    <div className="w-20 h-1 bg-red-600 mx-auto mb-8 rounded-sm" />

                    <div className="inline-flex p-4 rounded-sm border border-white/10 bg-[#0f172a] mb-6">
                        <ShoppingCart className="w-12 h-12 text-red-500" />
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tight mb-6">
                        <span className="text-white">
                            IT Services Store
                        </span>
                    </h1>

                    <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
                        Discover professional IT services at affordable prices with special discounts.
                        Choose your services, add to cart, and checkout with ease!
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center">
                        <a href="#packages">
                            <Button variant="primary" size="lg" className="rounded-sm bg-red-600 hover:bg-red-700" rightIcon={<ArrowRight className="w-5 h-5" />}>
                                View Packages
                            </Button>
                        </a>
                        {totalItems > 0 && (
                            <Link
                                to={Routes.IT_SERVICES_CHECKOUT}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-sm border border-red-500/30 bg-red-600 text-white font-semibold transition-all hover:bg-red-700"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Checkout ({totalItems})
                            </Link>
                        )}
                    </div>
                </motion.div>

                {/* Stats Bar */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-24"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {[
                        { value: '500+', label: 'Projects Delivered', icon: TrendingUp },
                        { value: '150+', label: 'Happy Clients', icon: Users },
                        { value: '99.9%', label: 'Client Satisfaction', icon: Star },
                        { value: '24/7', label: 'Support Available', icon: Clock },
                    ].map((stat, idx) => (
                        <motion.div
                            key={idx}
                            className="relative rounded-sm p-6 text-center border border-white/10 hover:border-red-500/30 transition-all duration-300 bg-[#0f172a] hover:bg-[#0B1120] group"
                            variants={staggerItem}
                            whileHover={{ y: -4 }}
                        >
                            <stat.icon className="w-6 h-6 text-red-500 mx-auto mb-2 opacity-60" />
                            <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                                {stat.value}
                            </div>
                            <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                                {stat.label}
                            </div>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-red-600 group-hover:w-3/4 transition-all duration-500" />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Service Packages */}
                <div id="packages">
                    <motion.div
                        className="mb-20"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <SectionTitle
                            subtitle="Service Packages"
                            title="Choose the IT Services You Need"
                            className="mb-4"
                        />
                        <p className="text-center text-gray-500 text-sm mb-12 max-w-2xl mx-auto">
                            Click "Add to Cart" to select services. You can choose multiple services at once!
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            {servicePackages.map((pkg, idx) => {
                                const Icon = pkg.icon;
                                return (
                                    <motion.div
                                        key={pkg.id}
                                        className={`relative rounded-sm border transition-all duration-500 group overflow-hidden h-full flex flex-col ${pkg.popular
                                            ? 'border-red-500/30 bg-[#0f172a] shadow-lg shadow-red-500/5'
                                            : 'border-white/10 bg-[#0f172a] hover:bg-[#0B1120] hover:border-red-500/30'
                                            }`}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        whileHover={{ y: -6, transition: { duration: 0.3 } }}
                                    >
                                        {pkg.popular && (
                                            <div className="absolute top-0 left-0 right-0 h-1 bg-red-600" />
                                        )}

                                        {/* Discount Badge */}
                                        <div className="absolute top-4 right-4 z-10">
                                            <motion.div
                                                className="flex items-center gap-1 px-3 py-1.5 rounded-sm bg-red-600 shadow-sm"
                                                initial={{ scale: 0, rotate: -12 }}
                                                whileInView={{ scale: 1, rotate: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: idx * 0.1 + 0.3, type: 'spring', stiffness: 300 }}
                                            >
                                                <Percent className="w-3 h-3 text-white" />
                                                <span className="text-xs font-extrabold text-white">{pkg.discountPercent}% OFF</span>
                                            </motion.div>
                                        </div>

                                        {pkg.popular && (
                                            <div className="absolute top-4 left-4 z-10">
                                                <div className="flex items-center gap-1 px-3 py-1.5 rounded-sm bg-[#0B1120] border border-red-500/30">
                                                    <Star className="w-3 h-3 text-red-500 fill-red-500" />
                                                    <span className="text-xs font-bold text-red-500">Popular</span>
                                                </div>
                                            </div>
                                        )}

                                        <div className="p-6 lg:p-8 flex flex-col flex-1">
                                            <div className="mb-6 pt-6">
                                                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${pkg.gradient} mb-4`}>
                                                    <Icon className="w-7 h-7 text-white" />
                                                </div>
                                                <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                                                <p className="text-gray-400 text-sm leading-relaxed min-h-[4rem]">{pkg.description}</p>
                                            </div>

                                            {/* Pricing */}
                                            <div className="mb-6 pb-6 border-b border-white/5 h-[6rem] flex flex-col justify-center">
                                                <div className="flex items-baseline gap-2 mb-1">
                                                    <span className="text-gray-500 text-sm line-through">{formatRupiah(pkg.originalPrice)}</span>
                                                    <Tag className="w-3 h-3 text-red-500" />
                                                </div>
                                                <div className="flex items-baseline gap-1">
                                                    <span className={`text-2xl lg:text-3xl font-extrabold text-white whitespace-nowrap`}>
                                                        {formatRupiah(pkg.discountedPrice)}
                                                    </span>
                                                    <span className="text-gray-500 text-sm">{pkg.period}</span>
                                                </div>
                                            </div>

                                            {/* Features */}
                                            <div className="space-y-3 mb-8 flex-1">
                                                {pkg.features.map((feature, fIdx) => (
                                                    <div key={fIdx} className="flex items-start gap-3">
                                                        <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-500" />
                                                        <span className="text-gray-300 text-sm">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Add to Cart Button - always at bottom */}
                                            <AddToCartButton pkg={pkg} />

                                            {/* View Details link */}
                                            <Link
                                                to={pkg.link}
                                                className="mt-3 flex items-center justify-center gap-1.5 text-xs font-bold text-gray-500 hover:text-red-500 transition-colors uppercase tracking-widest"
                                            >
                                                View Details <ArrowRight className="w-3 h-3" />
                                            </Link>
                                        </div>

                                        {/* Hover shine */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                                            <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-12 group-hover:left-full transition-all duration-1000" />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>

                {/* Add-On Services */}
                <motion.div
                    className="mb-24"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <SectionTitle
                        subtitle="Extra Services"
                        title="Add-On Services"
                        className="mb-12"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {addOnServices.map((addon, idx) => {
                            const Icon = addon.icon;
                            return (
                                <motion.div
                                    key={addon.id}
                                    className="relative rounded-sm p-5 border border-white/10 bg-[#0f172a] hover:bg-[#0B1120] hover:border-red-500/30 transition-all duration-300 group h-full flex flex-col"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ y: -4 }}
                                >
                                    <div className="flex items-start gap-3 flex-1">
                                        <div className={`p-2 rounded-sm bg-gradient-to-br ${addon.gradient} flex-shrink-0`}>
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-white font-semibold text-sm mb-1">{addon.name}</h4>
                                            <p className="text-gray-500 text-xs mb-2 min-h-[2rem]">{addon.desc}</p>
                                            <span className="text-red-500 font-bold text-sm">{addon.priceLabel}</span>
                                        </div>
                                    </div>
                                    <AddOnButton addon={addon} />
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* How It Works */}
                <motion.div
                    className="mb-24"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <SectionTitle
                        subtitle="How It Works"
                        title="Ordering Process"
                        className="mb-12"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {processSteps.map((step, idx) => {
                            const StepIcon = step.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    className="relative rounded-sm p-6 border border-white/10 bg-[#0f172a] text-center group hover:bg-[#0B1120] hover:border-red-500/30 transition-all duration-300"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.15 }}
                                    whileHover={{ y: -4 }}
                                >
                                    <div className="text-6xl font-black text-white/[0.03] absolute top-4 right-4 select-none">
                                        {step.step}
                                    </div>
                                    <div className="relative z-10">
                                        <div className="inline-flex p-3 rounded-sm bg-[#0B1120] border border-red-500/30 mb-4">
                                            <StepIcon className="w-6 h-6 text-red-500" />
                                        </div>
                                        <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                                        <p className="text-gray-400 text-sm">{step.desc}</p>
                                    </div>
                                    {idx < processSteps.length - 1 && (
                                        <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-red-600/30" />
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Trust Badges */}
                <motion.div
                    className="border border-white/10 rounded-sm p-8 lg:p-12 mb-24 bg-[#0f172a]"
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
                                Why Choose Neverland Studio?
                            </h2>
                            <div className="space-y-4">
                                {[
                                    'Internationally certified expert team',
                                    'Transparent pricing with no hidden fees',
                                    'Quality guarantee & free revisions',
                                    'Real-time progress reports via dashboard',
                                    '24/7 support via WhatsApp & Discord',
                                    'Proven portfolio of 500+ projects',
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-300 text-base">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Certifications & Trust</h4>
                            <div className="grid grid-cols-3 gap-3">
                                {CERTIFICATIONS.map((cert, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="rounded-sm p-4 text-center border border-white/10 bg-[#0B1120] hover:border-red-500/30 transition-all duration-300"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.05 }}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <Shield className="w-6 h-6 text-red-500 mx-auto mb-2" />
                                        <span className="text-white text-xs font-bold">{cert}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    className="relative overflow-hidden rounded-sm border border-white/10 bg-[#0f172a] p-12 lg:p-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-red-600" />

                    <div className="relative z-10 space-y-8">
                        <motion.div
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm border border-red-500/20 bg-[#0B1120]"
                            initial={{ scale: 0.8 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: 'spring' }}
                        >
                            <Zap className="w-4 h-4 text-red-500" />
                            <span className="text-xs font-semibold text-red-500 uppercase tracking-widest">Limited Time Offer</span>
                        </motion.div>

                        <div className="space-y-4">
                            <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
                                <span className="text-white/90">Ready to Start</span>
                                <br />
                                <span className="text-white">
                                    Your Digital Project?
                                </span>
                            </h2>
                            <p className="text-base lg:text-lg text-gray-400 max-w-2xl mx-auto">
                                Choose your services, add to cart, and checkout to get the best deals!
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 justify-center pt-4">
                            <Link
                                to={totalItems > 0 ? Routes.IT_SERVICES_CHECKOUT : '#packages'}
                                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm bg-red-600 text-white font-semibold hover:bg-red-700 transition-all"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                {totalItems > 0 ? `Checkout (${totalItems})` : 'Browse Services'}
                            </Link>
                            <Link to={Routes.CONTACT}>
                                <Button variant="outline" size="lg" className="rounded-sm border-white/10 hover:border-red-500/30">
                                    Free Consultation
                                </Button>
                            </Link>
                        </div>

                        <p className="text-xs text-gray-600 flex items-center justify-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            Discount promo valid while slots last.
                        </p>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
