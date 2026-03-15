import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, FileText, TrendingDown, Award, CheckCircle, Clock, ArrowRight, Target, BarChart, HandshakeIcon } from 'lucide-react';
import SectionTitle from '@components/molecules/SectionTitle';
import { Routes } from '@config/constants';

export default function VendorManagementPage() {
  const stats = [
    { value: '300+', label: 'Vendors Managed' },
    { value: '40%', label: 'Cost Savings' },
    { value: '99%', label: 'Contract Compliance' },
    { value: '24/7', label: 'Support' },
  ];

  const services = [
    {
      icon: Users,
      title: 'Vendor Selection',
      description: 'Identify and evaluate vendors based on capabilities and fit.',
    },
    {
      icon: FileText,
      title: 'Contract Negotiation',
      description: 'Negotiate favorable terms and SLAs for optimal value.',
    },
    {
      icon: BarChart,
      title: 'Performance Monitoring',
      description: 'Track vendor performance against KPIs and SLAs.',
    },
    {
      icon: TrendingDown,
      title: 'Cost Optimization',
      description: 'Identify savings opportunities and optimize spending.',
    },
  ];

  const features = [
    {
      icon: Target,
      title: 'Strategic Sourcing',
      description: 'Develop vendor strategies aligned with business objectives and goals.',
    },
    {
      icon: HandshakeIcon,
      title: 'Relationship Management',
      description: 'Build and maintain productive partnerships with key vendors.',
    },
    {
      icon: FileText,
      title: 'Contract Management',
      description: 'Track contracts, renewals, and compliance throughout lifecycle.',
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'Ensure vendor deliverables meet quality standards and requirements.',
    },
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        {/* Hero Section - Clean & Modern */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Subtle Accent Line */}
          <div className="w-20 h-1 bg-purple-500 mx-auto mb-8 rounded-sm" />
          
          {/* Icon Badge - Minimal */}
          <div className="inline-flex p-4 rounded-sm border border-purple-500/30 bg-purple-500/10 mb-6">
            <Users className="w-12 h-12 text-purple-500" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6">
            <span className="text-white drop-shadow-[0_0_10px_rgba(168,85,247,0.2)]">
              Vendor Management
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-slate-400 font-medium max-w-3xl mx-auto mb-8">
            Optimize vendor relationships and contracts to reduce costs, improve service quality, 
            and ensure compliance with strategic vendor management.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={Routes.CONTACT}>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-sm font-bold uppercase tracking-wide transition-colors">
                Get Started Today <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link to={Routes.HOME}>
              <button className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white/40 text-white rounded-sm font-bold uppercase tracking-wide transition-colors">
                View All Services
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Section - Clean Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="relative rounded-sm p-6 text-center border border-white/5 hover:border-purple-500/50 transition-all duration-300 bg-[#0f172a] group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="text-3xl lg:text-4xl font-black font-mono text-white group-hover:text-purple-400 transition-colors mb-2">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                {stat.label}
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-purple-500 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Services Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="What We Offer"
            title="Complete Vendor Management Services"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-sm p-6 border border-white/5 bg-[#0f172a] hover:border-purple-500/30 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="inline-flex p-3 rounded-sm bg-[#0B1120] border border-white/10 mb-4">
                  <service.icon className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-slate-400 font-medium text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Key Capabilities"
            title="Strategic Vendor Management Features"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-sm p-6 border border-white/5 border-l-2 border-l-purple-500/30 bg-[#0f172a] hover:bg-[#0B1120] transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2.5 rounded-sm bg-[#0B1120] border border-white/10">
                    <feature.icon className="w-5 h-5 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Management Process Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Our Approach"
            title="Vendor Management Lifecycle"
            className="mb-12"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Target, title: 'Vendor Selection', desc: 'Evaluate & choose' },
              { icon: FileText, title: 'Onboarding', desc: 'Setup & contracts' },
              { icon: BarChart, title: 'Monitoring', desc: 'Track performance' },
              { icon: TrendingDown, title: 'Optimization', desc: 'Improve & save' },
            ].map((phase, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-sm p-5 text-center border border-white/5 bg-[#0f172a] hover:border-purple-500/30 transition-all duration-300 group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-sm bg-[#0B1120] border border-white/10 flex items-center justify-center">
                  <phase.icon className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{phase.title}</h3>
                <p className="text-gray-500 text-xs">{phase.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div
          className="border border-white/10 rounded-sm p-8 lg:p-12 mb-24 bg-[#0f172a] shadow-xl relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-purple-500" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tight mb-6 text-white">
                Why Choose Our Vendor Management Services?
              </h2>
              <div className="space-y-4">
                {[
                  'Managing 300+ vendor relationships',
                  'Average 40% cost reduction achieved',
                  'Expert negotiators with proven track record',
                  'Comprehensive contract management tools',
                  'Ongoing performance monitoring and reporting',
                  'Strategic vendor partnership development'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-purple-500/30 transition-all duration-300">
                <Award className="w-10 h-10 text-purple-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Expert Team</h4>
                <p className="text-slate-500 text-xs">Procurement pros</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-purple-500/30 transition-all duration-300">
                <Clock className="w-10 h-10 text-purple-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Fast Results</h4>
                <p className="text-slate-500 text-xs">4-6 weeks average</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-purple-500/30 transition-all duration-300">
                <Users className="w-10 h-10 text-purple-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">300+ Vendors</h4>
                <p className="text-slate-500 text-xs">Under management</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-purple-500/30 transition-all duration-300">
                <TrendingDown className="w-10 h-10 text-purple-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">40% Savings</h4>
                <p className="text-slate-500 text-xs">Average reduction</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Vendor Management Certification Roadmap ─── */}
        <motion.div className="mb-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <SectionTitle subtitle="Career Path" title="Vendor Management Certification Roadmap" className="mb-4" />
          <p className="text-center text-gray-400 text-sm mb-12 max-w-2xl mx-auto">
            From procurement basics to strategic sourcing executive — certifications for vendor and procurement professionals.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
            {[{ label: 'Procurement', color: 'bg-blue-500' }, { label: 'Contracts / Legal', color: 'bg-amber-500' }, { label: 'Supply Chain', color: 'bg-emerald-500' }, { label: 'Strategic Mgmt', color: 'bg-purple-500' }].map(t => (
              <div key={t.label} className="flex items-center gap-2"><div className={`w-3 h-3 rounded-sm ${t.color}`} /><span className="text-xs text-gray-400">{t.label}</span></div>
            ))}
          </div>
          {[
            { level: 'Beginner', levelColor: 'from-sky-500 to-cyan-400', levelBorder: 'border-sky-500/30', levelBg: 'bg-sky-500/10', levelText: 'text-sky-300', desc: 'Procurement basics and vendor relationship foundations.',
              certs: [
                { name: 'CIPS L3',       org: 'CIPS',     track: 'proc',    desc: 'CIPS Level 3 — Advanced Certificate in Procurement and Supply.' },
                { name: 'PMP Fdn',       org: 'PMI',      track: 'contract', desc: 'CAPM — project management basics for vendor coordination.' },
                { name: 'ITIL 4 Fdn',   org: 'Axelos',   track: 'proc',    desc: 'ITIL 4 — supplier management and vendor SLA frameworks.' },
                { name: 'Six Sigma WHT', org: 'ASQ',      track: 'supply',  desc: 'Six Sigma White Belt — process improvement for procurement.' },
              ]},
            { level: 'Intermediate', levelColor: 'from-amber-500 to-yellow-400', levelBorder: 'border-amber-500/30', levelBg: 'bg-amber-500/10', levelText: 'text-amber-300', desc: 'Supplier negotiation, contract management, and compliance.',
              certs: [
                { name: 'CIPS L4',       org: 'CIPS',     track: 'proc',    desc: 'CIPS Level 4 — Diploma in Procurement and Supply Management.' },
                { name: 'NCMA CPCM',    org: 'NCMA',     track: 'contract', desc: 'Certified Professional Contracts Manager — government/commercial.' },
                { name: 'APICS CSCP',   org: 'APICS',    track: 'supply',  desc: 'Certified Supply Chain Professional — end-to-end supply management.' },
                { name: 'Six Sigma GB', org: 'ASQ',      track: 'proc',    desc: 'Six Sigma Green Belt — optimize vendor delivery performance.' },
              ]},
            { level: 'Advanced', levelColor: 'from-orange-500 to-amber-500', levelBorder: 'border-orange-500/30', levelBg: 'bg-orange-500/10', levelText: 'text-orange-300', desc: 'Strategic sourcing, SRM, and enterprise vendor governance.',
              certs: [
                { name: 'CIPS L6',       org: 'CIPS',     track: 'proc',    desc: 'CIPS Level 6 — Advanced Diploma: professional procurement leadership.' },
                { name: 'ISM CPSM',     org: 'ISM',      track: 'proc',    desc: 'Certified Professional Supply Manager — strategic sourcing mastery.' },
                { name: 'ISCEA CSCP',   org: 'ISCEA',    track: 'supply',  desc: 'Certified Supply Chain Analyst — advanced vendor analytics.' },
                { name: 'PMP',          org: 'PMI',      track: 'strategic', desc: 'PMP — lead complex multi-vendor IT programs and contracts.' },
              ]},
            { level: 'Expert', levelColor: 'from-rose-500 to-pink-500', levelBorder: 'border-rose-500/30', levelBg: 'bg-rose-500/10', levelText: 'text-rose-300', desc: 'CPO-level leadership, enterprise sourcing, and board advisory.',
              certs: [
                { name: 'CIPS Fellow',  org: 'CIPS',     track: 'strategic', desc: 'FCIPS — top recognition for procurement excellence and leadership.' },
                { name: 'ISM Fellow',   org: 'ISM',      track: 'strategic', desc: 'ISM Fellow — strategic sourcing thought leadership at CPO level.' },
                { name: 'CGEIT',        org: 'ISACA',    track: 'strategic', desc: 'IT Governance Expert — oversee enterprise vendor governance.' },
                { name: 'MBA SCM',      org: 'Various',  track: 'supply',   desc: 'MBA in Supply Chain Mgmt — executive vendor strategy and finance.' },
              ]},
          ].map((row, rowIdx, arr) => {
            const ts: Record<string, { bg: string; border: string; text: string; dot: string }> = {
              proc:     { bg: 'bg-blue-500/10',   border: 'border-blue-500/25',   text: 'text-blue-300',   dot: 'bg-blue-500' },
              contract: { bg: 'bg-amber-500/10',  border: 'border-amber-500/25',  text: 'text-amber-300',  dot: 'bg-amber-500' },
              supply:   { bg: 'bg-emerald-500/10',border: 'border-emerald-500/25',text: 'text-emerald-300',dot: 'bg-emerald-500' },
              strategic:{ bg: 'bg-purple-500/10', border: 'border-purple-500/25', text: 'text-purple-300', dot: 'bg-purple-500' },
            };
            const isLast = rowIdx === arr.length - 1;
            return (
              <motion.div key={row.level} className="relative" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: rowIdx * 0.12, duration: 0.5 }}>
                {!isLast && <div className="absolute left-[1.15rem] top-full w-px h-8 bg-white/10 z-10" />}
                <div className="flex gap-5 mb-8">
                  <div className="flex flex-col items-center flex-shrink-0 pt-1">
                    <div className={`w-10 h-10 rounded-sm ${row.levelBg} border ${row.levelBorder} flex items-center justify-center`}>
                      <span className={`text-xs font-black ${row.levelText}`}>{rowIdx + 1}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className={`text-sm font-extrabold uppercase tracking-widest ${row.levelText}`}>{row.level}</span>
                      <span className="text-xs text-white/20">—</span>
                      <span className="text-xs text-gray-500">{row.desc}</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                      {row.certs.map((cert) => { const s = ts[cert.track]; return (
                        <div key={cert.name} className={`group relative rounded-sm border ${s.border} ${s.bg} p-3 hover:bg-[#0B1120] transition-all duration-200 cursor-default`}>
                          <div className={`w-2 h-2 rounded-sm ${s.dot} mb-2`} />
                          <p className={`text-[11px] font-bold ${s.text} leading-tight mb-1`}>{cert.name}</p>
                          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1.5">{cert.org}</p>
                          <p className="text-[10px] text-gray-500 hidden group-hover:block absolute bottom-full left-0 right-0 z-20 bg-[#0B1120] border border-white/10 rounded-sm p-2 mb-1 shadow-xl">{cert.desc}</p>
                        </div>
                      ); })}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
          <p className="text-center text-slate-500 font-mono text-xs mt-4">[SYSINFO] Hover over any certificate card to see a brief description.</p>
        </motion.div>

        {/* CTA Section - Ultra Clean */}
        <motion.div
          className="relative border border-white/10 rounded-sm p-12 lg:p-16 text-center bg-[#0f172a] shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Top Accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-purple-500" />
          
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-purple-500/30 bg-purple-500/10">
              <Users className="w-3.5 h-3.5 text-purple-500" />
              <span className="text-xs font-semibold text-purple-300 uppercase tracking-widest">Vendor Management</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
                <span className="text-white">Optimize Your</span>
                <br />
                <span className="text-purple-500">
                  Vendor Relationships
                </span>
              </h2>
              <p className="text-base lg:text-lg text-gray-400 max-w-2xl mx-auto">
                Let us help you reduce costs, improve quality, and build strategic vendor partnerships.
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 py-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/10" />
              <div className="w-1.5 h-1.5 rounded-sm bg-purple-500/50" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/10" />
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to={Routes.CONTACT}>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-sm font-bold uppercase tracking-wide transition-colors">
                  Optimize Vendor Spend <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link to={Routes.HOME}>
                <button className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white/40 text-white rounded-sm font-bold uppercase tracking-wide transition-colors">
                  Explore More Services
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
