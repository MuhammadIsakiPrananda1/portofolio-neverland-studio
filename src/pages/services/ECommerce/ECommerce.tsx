import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, CheckCircle, ArrowRight, CreditCard, Package, 
  TrendingUp, Shield, Smartphone, Users, Award, Clock, DollarSign
} from 'lucide-react';
import Button from '@components/atoms/Button';
import SectionTitle from '@components/molecules/SectionTitle';
import { Routes } from '@config/constants';

export default function ECommercePage() {
  const features = [
    {
      icon: ShoppingCart,
      title: 'Shopping Cart',
      description: 'Advanced cart functionality with wishlist, quick checkout, and abandoned cart recovery.',
    },
    {
      icon: CreditCard,
      title: 'Payment Integration',
      description: 'Secure payment gateways supporting cards, digital wallets, and cryptocurrencies.',
    },
    {
      icon: Package,
      title: 'Inventory Management',
      description: 'Real-time stock tracking, automated alerts, and multi-warehouse support.',
    },
    {
      icon: TrendingUp,
      title: 'Sales Analytics',
      description: 'Comprehensive insights into sales trends, customer behavior, and revenue metrics.',
    },
  ];

  const benefits = [
    {
      icon: Smartphone,
      title: 'Mobile Optimized',
      description: 'Seamless shopping experience across all devices with mobile-first design.',
    },
    {
      icon: Shield,
      title: 'PCI Compliant',
      description: 'Enterprise-grade security meeting PCI DSS standards for payment processing.',
    },
    {
      icon: Users,
      title: 'Customer Management',
      description: 'CRM integration with order history, preferences, and loyalty programs.',
    },
    {
      icon: DollarSign,
      title: 'Multi-Currency',
      description: 'Support for multiple currencies and languages for global expansion.',
    },
  ];

  const stats = [
    { value: '50+', label: 'Stores Built' },
    { value: '99.99%', label: 'Payment Success' },
    { value: '< 3s', label: 'Checkout Time' },
    { value: '$10M+', label: 'Revenue Processed' },
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-20 h-1 bg-violet-500 mx-auto mb-8 rounded-sm" />
          
          <div className="inline-flex p-4 rounded-sm border border-violet-500/30 bg-violet-500/10 mb-6">
            <ShoppingCart className="w-12 h-12 text-violet-500" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black mb-6 uppercase tracking-tight">
            <span className="text-white drop-shadow-[0_0_10px_rgba(139,92,246,0.2)]">
              E-Commerce Solutions
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-slate-400 font-medium max-w-3xl mx-auto mb-8">
            Launch your online store with powerful e-commerce platforms. 
            From small shops to enterprise marketplaces, we build solutions that drive sales.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={Routes.CONTACT}>
              <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white rounded-sm font-bold uppercase tracking-wide border-none group transition-all" rightIcon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}>
                Launch Your Store
              </Button>
            </Link>
            <Link to={Routes.HOME}>
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/5 hover:border-white/40 rounded-sm font-bold uppercase tracking-wide transition-all">
                View All Services
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="relative rounded-sm p-6 text-center border border-white/5 hover:border-violet-500/50 transition-all duration-300 bg-[#0f172a] shadow-sm group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="text-3xl lg:text-4xl font-black text-white font-mono mb-2 group-hover:text-violet-400 transition-colors">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                {stat.label}
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-violet-500 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Platform Features"
            title="Everything You Need to Sell Online"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-sm p-6 border border-white/5 bg-[#0f172a] shadow-sm hover:border-violet-500/50 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="inline-flex p-3 rounded-sm bg-[#0B1120] border border-white/10 group-hover:border-violet-500/30 transition-colors mb-4">
                  <feature.icon className="w-6 h-6 text-violet-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-tight group-hover:text-violet-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 font-medium text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Additional Benefits"
            title="Why Our E-Commerce Solutions Stand Out"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-sm p-6 border border-white/5 border-l-2 border-l-violet-500 bg-[#0f172a] shadow-sm hover:border-violet-500/50 transition-all duration-300 group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2.5 rounded-sm bg-[#0B1120] border border-white/10 group-hover:border-violet-500/30 transition-colors">
                    <benefit.icon className="w-5 h-5 text-violet-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-tight group-hover:text-violet-400 transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-400 font-medium text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div
          className="border border-white/5 rounded-sm p-8 lg:p-12 mb-24 bg-[#0f172a] shadow-xl relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-violet-500" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <h2 className="text-4xl font-black mb-6 text-white uppercase tracking-tight">
                Why Choose Neverland Studio?
              </h2>
              <div className="space-y-4">
                {[
                  'Experience with major e-commerce platforms',
                  'Custom cart and checkout optimization',
                  'SEO-optimized product pages',
                  'Integration with shipping providers',
                  'Marketing automation tools',
                  'Ongoing maintenance and updates'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-violet-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-lg font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-violet-500/30 transition-all duration-300">
                <Award className="w-10 h-10 text-violet-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">Proven Track Record</h4>
                <p className="text-slate-500 text-xs font-mono">50+ stores launched</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-violet-500/30 transition-all duration-300">
                <Clock className="w-10 h-10 text-violet-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">Fast Launch</h4>
                <p className="text-slate-500 text-xs font-mono">4-6 weeks average</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-violet-500/30 transition-all duration-300">
                <TrendingUp className="w-10 h-10 text-violet-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">High Conversion</h4>
                <p className="text-slate-500 text-xs font-mono">Optimized checkout</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-violet-500/30 transition-all duration-300">
                <Users className="w-10 h-10 text-violet-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">24/7 Support</h4>
                <p className="text-slate-500 text-xs font-mono">Always available</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── E-Commerce Certification Roadmap ─── */}
        <motion.div className="mb-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <SectionTitle subtitle="Career Path" title="E-Commerce Certification Roadmap" className="mb-4" />
          <p className="text-center text-gray-400 text-sm mb-12 max-w-2xl mx-auto">
            From online store setup to enterprise e-commerce architecture — skills and certifications for digital commerce professionals.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
            {[{ label: 'Platform / Dev', color: 'bg-blue-500' }, { label: 'Payments & Security', color: 'bg-red-500' }, { label: 'Marketing / SEO', color: 'bg-emerald-500' }, { label: 'Analytics / Data', color: 'bg-purple-500' }].map(t => (
              <div key={t.label} className="flex items-center gap-2"><div className={`w-3 h-3 rounded-sm ${t.color}`} /><span className="text-xs font-bold uppercase tracking-wider text-slate-400">{t.label}</span></div>
            ))}
          </div>
          {[
            { level: 'Beginner', levelColor: 'from-sky-500 to-cyan-400', levelBorder: 'border-sky-500/30', levelBg: 'bg-sky-500/10', levelText: 'text-sky-300', desc: 'Platform basics and digital marketing foundations.',
              certs: [
                { name: 'Shopify Partner',    org: 'Shopify',    track: 'platform',  desc: 'Shopify Partner Certification — store setup and theme development.' },
                { name: 'Google Analytics 4', org: 'Google',     track: 'analytics', desc: 'Understand e-commerce data, conversion funnels, and attribution.' },
                { name: 'Google Ads',         org: 'Google',     track: 'marketing', desc: 'Google Ads fundamentals — PPC, product listings, remarketing.' },
                { name: 'Meta Blueprint',     org: 'Meta',       track: 'marketing', desc: 'Facebook/Instagram advertising for online store promotion.' },
                { name: 'HubSpot Marketing',  org: 'HubSpot',    track: 'marketing', desc: 'Inbound marketing, email automation, and CRM fundamentals.' },
              ]},
            { level: 'Intermediate', levelColor: 'from-amber-500 to-yellow-400', levelBorder: 'border-amber-500/30', levelBg: 'bg-amber-500/10', levelText: 'text-amber-300', desc: 'Payment security, platform optimization, and SEO.',
              certs: [
                { name: 'Shopify Dev',        org: 'Shopify',    track: 'platform',  desc: 'Shopify Developer Certification — Liquid, APIs, apps.' },
                { name: 'WooCommerce Dev',    org: 'Automattic', track: 'platform',  desc: 'WooCommerce Certified Developer — advanced WordPress e-commerce.' },
                { name: 'CompTIA Sec+',       org: 'CompTIA',    track: 'security',  desc: 'Security fundamentals relevant to e-commerce and payment safety.' },
                { name: 'Google SEO Cert',    org: 'Google',     track: 'marketing', desc: 'Search engine optimization for product pages and category pages.' },
                { name: 'HubSpot CRM',        org: 'HubSpot',    track: 'analytics', desc: 'CRM and customer lifecycle management for online stores.' },
              ]},
            { level: 'Advanced', levelColor: 'from-orange-500 to-amber-500', levelBorder: 'border-orange-500/30', levelBg: 'bg-orange-500/10', levelText: 'text-orange-300', desc: 'PCI compliance, advanced analytics, and platform architecture.',
              certs: [
                { name: 'PCI DSS QSA',        org: 'PCI SSC',    track: 'security',  desc: 'Qualified Security Assessor — payment card data protection.' },
                { name: 'AWS SAA-C03',        org: 'Amazon',     track: 'platform',  desc: 'Design scalable, highly available e-commerce cloud architectures.' },
                { name: 'Google Cloud CE',    org: 'Google',     track: 'platform',  desc: 'Cloud Engineer — deploy and manage GCP-hosted retail solutions.' },
                { name: 'GA4 Advanced',       org: 'Google',     track: 'analytics', desc: 'Advanced GA4 — custom events, attribution modeling, BigQuery.' },
              ]},
            { level: 'Expert', levelColor: 'from-rose-500 to-pink-500', levelBorder: 'border-rose-500/30', levelBg: 'bg-rose-500/10', levelText: 'text-rose-300', desc: 'Enterprise commerce architecture and leadership.',
              certs: [
                { name: 'Salesforce Commerce', org: 'Salesforce', track: 'platform',  desc: 'B2C Commerce Architect — enterprise-grade Salesforce Commerce Cloud.' },
                { name: 'Adobe Commerce',      org: 'Adobe',      track: 'platform',  desc: 'Adobe Commerce (Magento) Architect — complex multi-store setups.' },
                { name: 'CISSP',               org: 'ISC²',       track: 'security',  desc: 'Senior security for enterprise payment and commerce systems.' },
                { name: 'PMP',                 org: 'PMI',        track: 'analytics', desc: 'Project Management Professional — lead large e-commerce programs.' },
              ]},
          ].map((row, rowIdx, arr) => {
            const ts: Record<string, { bg: string; border: string; text: string; dot: string }> = {
              platform:  { bg: 'bg-blue-500/10',   border: 'border-blue-500/25',   text: 'text-blue-300',   dot: 'bg-blue-500' },
              security:  { bg: 'bg-red-500/10',    border: 'border-red-500/25',    text: 'text-red-300',    dot: 'bg-red-500' },
              marketing: { bg: 'bg-emerald-500/10',border: 'border-emerald-500/25',text: 'text-emerald-300',dot: 'bg-emerald-500' },
              analytics: { bg: 'bg-purple-500/10', border: 'border-purple-500/25', text: 'text-purple-300', dot: 'bg-purple-500' },
            };
            const isLast = rowIdx === arr.length - 1;
            return (
              <motion.div key={row.level} className="relative" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: rowIdx * 0.12, duration: 0.5 }}>
                {!isLast && <div className="absolute left-[1.15rem] top-full w-px h-8 bg-white/10 z-10" />}
                <div className="flex gap-5 mb-8">
                  <div className="flex flex-col items-center flex-shrink-0 pt-1">
                    <div className={`w-10 h-10 rounded-sm ${row.levelBg} border ${row.levelBorder} flex items-center justify-center shadow-sm`}>
                      <span className={`text-sm font-mono font-black ${row.levelText}`}>{rowIdx + 1}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className={`text-sm font-black uppercase tracking-widest ${row.levelText}`}>{row.level}</span>
                      <span className="text-xs text-white/20">—</span>
                      <span className="text-xs font-medium text-slate-400">{row.desc}</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                      {row.certs.map((cert) => { const s = ts[cert.track]; return (
                        <div key={cert.name} className={`group relative rounded-sm border ${s.border} ${s.bg} p-3 hover:bg-[#0B1120] transition-colors duration-300 cursor-default`}>
                          <div className={`w-2 h-2 rounded-sm ${s.dot} mb-2`} />
                          <p className={`text-[11px] font-bold ${s.text} leading-tight mb-1 transition-colors`}>{cert.name}</p>
                          <p className="text-[9px] text-slate-500 uppercase tracking-widest mb-1.5 font-bold">{cert.org}</p>
                          <p className="text-[10px] text-slate-400 font-medium hidden group-hover:block absolute bottom-full left-0 right-0 z-20 bg-[#0B1120] border border-white/10 rounded-sm p-2 mb-1 shadow-2xl">{cert.desc}</p>
                        </div>
                      ); })}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
          <p className="text-center text-slate-500 text-xs mt-4 font-mono">[SYSINFO] Hover over any certificate card to see a brief description.</p>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="relative border border-white/10 rounded-sm p-12 lg:p-16 text-center bg-[#0f172a] shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-violet-500" />
          
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-violet-500/30 bg-violet-500/10">
              <ShoppingCart className="w-3.5 h-3.5 text-violet-500" />
              <span className="text-xs font-bold text-violet-400 uppercase tracking-widest">Start Selling</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
                <span className="text-white">Ready to Launch Your</span>
                <br />
                <span className="text-violet-500">
                  Online Store?
                </span>
              </h2>
              <p className="text-base lg:text-lg text-slate-400 font-medium max-w-2xl mx-auto">
                Contact us today to discuss your e-commerce vision and get a custom quote for your online store.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 py-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/10" />
              <div className="w-1.5 h-1.5 rounded-sm bg-violet-500/50" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/10" />
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to={Routes.CONTACT}>
                <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white rounded-sm font-bold uppercase tracking-wide border-none group transition-all" rightIcon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}>
                  Get Started Today
                </Button>
              </Link>
              <Link to={Routes.WEB_DEVELOPMENT}>
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/5 hover:border-white/40 rounded-sm font-bold uppercase tracking-wide transition-all">
                  Explore Web Development
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
