import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, FileText, Users, CheckCircle, AlertTriangle, TrendingUp, Clock, ArrowRight, Award, Scale, Lock } from 'lucide-react';
import SectionTitle from '@components/molecules/SectionTitle';
import { Routes } from '@config/constants';

export default function ITGovernancePage() {
  const stats = [
    { value: '100%', label: 'Compliance Rate' },
    { value: '200+', label: 'Policies Created' },
    { value: '50+', label: 'Audits Conducted' },
    { value: '24/7', label: 'Monitoring' },
  ];

  const services = [
    {
      icon: FileText,
      title: 'Policy Development',
      description: 'Create comprehensive IT policies and procedures aligned with best practices.',
    },
    {
      icon: Scale,
      title: 'Compliance Management',
      description: 'Ensure regulatory compliance with GDPR, SOC2, HIPAA, and more.',
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'Identify, assess, and mitigate IT risks across your organization.',
    },
    {
      icon: Users,
      title: 'IT Oversight',
      description: 'Establish governance structures and decision-making frameworks.',
    },
  ];

  const features = [
    {
      icon: FileText,
      title: 'Framework Implementation',
      description: 'Deploy industry-standard frameworks like COBIT, ITIL, and ISO 27001.',
    },
    {
      icon: AlertTriangle,
      title: 'Risk Assessment',
      description: 'Regular risk assessments with mitigation strategies and action plans.',
    },
    {
      icon: Lock,
      title: 'Access Controls',
      description: 'Define and enforce role-based access controls and data governance.',
    },
    {
      icon: TrendingUp,
      title: 'Performance Metrics',
      description: 'Track governance effectiveness with KPIs and continuous improvement.',
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
            <Shield className="w-12 h-12 text-purple-500" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6">
            <span className="text-white drop-shadow-[0_0_10px_rgba(168,85,247,0.2)]">
              IT Governance
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-slate-400 font-medium max-w-3xl mx-auto mb-8">
            Establish robust IT governance frameworks to ensure compliance, manage risks, 
            and align technology initiatives with business objectives.
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
            subtitle="Governance Services"
            title="Comprehensive IT Governance Solutions"
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
            subtitle="Core Capabilities"
            title="Effective Governance Implementation"
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

        {/* Frameworks Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Industry Standards"
            title="Governance Frameworks"
            className="mb-12"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Shield, title: 'COBIT', desc: 'IT governance framework' },
              { icon: FileText, title: 'ITIL', desc: 'Service management' },
              { icon: Lock, title: 'ISO 27001', desc: 'Information security' },
              { icon: Scale, title: 'SOC 2', desc: 'Compliance controls' },
            ].map((framework, idx) => (
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
                  <framework.icon className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{framework.title}</h3>
                <p className="text-gray-500 text-xs">{framework.desc}</p>
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
                Why Choose Our IT Governance Services?
              </h2>
              <div className="space-y-4">
                {[
                  '100% compliance success rate',
                  'Certified governance professionals',
                  'Industry-standard frameworks and methodologies',
                  'Comprehensive risk management',
                  'Ongoing monitoring and optimization',
                  'Proven track record with audits'
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
                <h4 className="text-lg font-bold text-white mb-1">Certified Team</h4>
                <p className="text-slate-500 text-xs">Governance experts</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-purple-500/30 transition-all duration-300">
                <Clock className="w-10 h-10 text-purple-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">6-8 Weeks</h4>
                <p className="text-slate-500 text-xs">Implementation time</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-purple-500/30 transition-all duration-300">
                <Shield className="w-10 h-10 text-purple-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">200+ Policies</h4>
                <p className="text-slate-500 text-xs">Created &amp; deployed</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-purple-500/30 transition-all duration-300">
                <TrendingUp className="w-10 h-10 text-purple-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">100% Success</h4>
                <p className="text-slate-500 text-xs">Compliance rate</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── IT Governance Certification Roadmap ─── */}
        <motion.div className="mb-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <SectionTitle subtitle="Career Path" title="IT Governance Certification Roadmap" className="mb-4" />
          <p className="text-center text-gray-400 text-sm mb-12 max-w-2xl mx-auto">
            From IT basics to executive governance and compliance leadership — structured certifications for GRC professionals.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
            {[{ label: 'IT Foundation', color: 'bg-blue-500' }, { label: 'Compliance / Audit', color: 'bg-amber-500' }, { label: 'Risk Management', color: 'bg-red-500' }, { label: 'Executive / GRC', color: 'bg-purple-500' }].map(t => (
              <div key={t.label} className="flex items-center gap-2"><div className={`w-3 h-3 rounded-sm ${t.color}`} /><span className="text-xs text-gray-400">{t.label}</span></div>
            ))}
          </div>
          {[
            { level: 'Beginner', levelColor: 'from-sky-500 to-cyan-400', levelBorder: 'border-sky-500/30', levelBg: 'bg-sky-500/10', levelText: 'text-sky-300', desc: 'IT and business fundamentals for governance professionals.',
              certs: [
                { name: 'ITIL 4 Fdn',     org: 'Axelos',   track: 'foundation', desc: 'IT Service Management — basis of all IT governance frameworks.' },
                { name: 'CompTIA Sec+',   org: 'CompTIA',  track: 'risk',       desc: 'Security fundamentals — baseline for compliance and risk assessments.' },
                { name: 'ISACA CSX Fdn',  org: 'ISACA',    track: 'foundation', desc: 'Cybersecurity fundamentals for governance professionals.' },
                { name: 'AWS CLF-C02',   org: 'Amazon',   track: 'foundation', desc: 'Cloud basics — govern and assess cloud-based IT initiatives.' },
              ]},
            { level: 'Intermediate', levelColor: 'from-amber-500 to-yellow-400', levelBorder: 'border-amber-500/30', levelBg: 'bg-amber-500/10', levelText: 'text-amber-300', desc: 'Audit, compliance frameworks, and risk assessment.',
              certs: [
                { name: 'CISA',           org: 'ISACA',    track: 'audit',    desc: 'Certified Information Systems Auditor — premier IT audit certification.' },
                { name: 'ISO 27001 LA',   org: 'PECB',     track: 'audit',    desc: 'ISO 27001 Lead Auditor — audit ISMS implementations for compliance.' },
                { name: 'CRISC',          org: 'ISACA',    track: 'risk',     desc: 'Certified in Risk and IS Controls — IT risk management and control.' },
                { name: 'CompTIA CySA+',  org: 'CompTIA',  track: 'risk',     desc: 'SOC analyst skills — incident response and threat monitoring.' },
                { name: 'COBIT Fdn',      org: 'ISACA',    track: 'audit',    desc: 'COBIT 2019 Foundation — IT governance framework for enterprises.' },
              ]},
            { level: 'Advanced', levelColor: 'from-orange-500 to-amber-500', levelBorder: 'border-orange-500/30', levelBg: 'bg-orange-500/10', levelText: 'text-orange-300', desc: 'Advanced GRC, privacy law, and CISO-track skills.',
              certs: [
                { name: 'CRISC Advanced', org: 'ISACA',    track: 'risk',     desc: 'Advanced risk management — complex enterprise risk portfolios.' },
                { name: 'CDPSE',          org: 'ISACA',    track: 'audit',    desc: 'Certified Data Privacy Solutions Engineer — GDPR, CCPA compliance.' },
                { name: 'ISO 31000 RM',   org: 'PECB',     track: 'risk',     desc: 'ISO 31000 Risk Manager — enterprise risk management framework.' },
                { name: 'CISSP ISSMP',    org: 'ISC²',     track: 'risk',     desc: 'Security Management Professional concentration for governance leads.' },
              ]},
            { level: 'Expert', levelColor: 'from-rose-500 to-pink-500', levelBorder: 'border-rose-500/30', levelBg: 'bg-rose-500/10', levelText: 'text-rose-300', desc: 'Board-level governance, CISO advisory, and enterprise GRC leadership.',
              certs: [
                { name: 'CISM',           org: 'ISACA',    track: 'executive', desc: 'Certified Information Security Manager — lead security governance.' },
                { name: 'CGEIT',          org: 'ISACA',    track: 'executive', desc: 'Governance of Enterprise IT — align IT strategy with business goals.' },
                { name: 'CISSP',          org: 'ISC²',     track: 'executive', desc: 'Senior security governance — CISO pathway certification.' },
                { name: 'PMP',            org: 'PMI',      track: 'executive', desc: 'PMP — lead governance implementation and compliance programs.' },
              ]},
          ].map((row, rowIdx, arr) => {
            const ts: Record<string, { bg: string; border: string; text: string; dot: string }> = {
              foundation: { bg: 'bg-blue-500/10',   border: 'border-blue-500/25',   text: 'text-blue-300',   dot: 'bg-blue-500' },
              audit:      { bg: 'bg-amber-500/10',  border: 'border-amber-500/25',  text: 'text-amber-300',  dot: 'bg-amber-500' },
              risk:       { bg: 'bg-red-500/10',    border: 'border-red-500/25',    text: 'text-red-300',    dot: 'bg-red-500' },
              executive:  { bg: 'bg-purple-500/10', border: 'border-purple-500/25', text: 'text-purple-300', dot: 'bg-purple-500' },
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
              <Shield className="w-3.5 h-3.5 text-purple-500" />
              <span className="text-xs font-semibold text-purple-300 uppercase tracking-widest">IT Governance</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
                <span className="text-white">Strengthen Your</span>
                <br />
                <span className="text-purple-500">
                  IT Governance
                </span>
              </h2>
              <p className="text-base lg:text-lg text-gray-400 max-w-2xl mx-auto">
                Establish robust governance frameworks for compliance, risk management, and strategic alignment.
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
                  Start Governance Program <ArrowRight className="w-5 h-5" />
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
