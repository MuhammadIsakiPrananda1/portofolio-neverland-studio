import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileSearch, BarChart, Shield, Zap, CheckCircle, TrendingUp, Clock, ArrowRight, Award, AlertTriangle } from 'lucide-react';
import SectionTitle from '@components/molecules/SectionTitle';
import { Routes } from '@config/constants';

export default function TechnologyAssessmentPage() {
  const stats = [
    { value: '500+', label: 'Assessments Completed' },
    { value: '99%', label: 'Issue Detection Rate' },
    { value: '70%', label: 'Cost Reduction' },
    { value: '24/7', label: 'Support' },
  ];

  const services = [
    {
      icon: FileSearch,
      title: 'Infrastructure Assessment',
      description: 'Comprehensive evaluation of your IT infrastructure and architecture.',
    },
    {
      icon: Shield,
      title: 'Security Assessment',
      description: 'Identify vulnerabilities and security gaps in your systems.',
    },
    {
      icon: BarChart,
      title: 'Performance Analysis',
      description: 'Analyze system performance and identify optimization opportunities.',
    },
    {
      icon: TrendingUp,
      title: 'ROI Evaluation',
      description: 'Assess technology investments and their business impact.',
    },
  ];

  const features = [
    {
      icon: FileSearch,
      title: 'Deep Analysis',
      description: 'Thorough examination of infrastructure, applications, and processes.',
    },
    {
      icon: AlertTriangle,
      title: 'Risk Identification',
      description: 'Uncover potential risks, vulnerabilities, and compliance gaps.',
    },
    {
      icon: BarChart,
      title: 'Detailed Reporting',
      description: 'Comprehensive reports with actionable recommendations and priorities.',
    },
    {
      icon: Zap,
      title: 'Quick Wins',
      description: 'Identify immediate improvements for fast ROI and value delivery.',
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
            <FileSearch className="w-12 h-12 text-purple-500" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6">
            <span className="text-white drop-shadow-[0_0_10px_rgba(168,85,247,0.2)]">
              Technology Assessment
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-slate-400 font-medium max-w-3xl mx-auto mb-8">
            Gain complete visibility into your technology landscape with comprehensive assessments 
            that identify risks, opportunities, and optimization potential.
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
            subtitle="What We Assess"
            title="Comprehensive Technology Assessment Services"
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
            subtitle="Assessment Features"
            title="Thorough Technology Evaluation"
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

        {/* Assessment Areas Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Assessment Scope"
            title="What We Evaluate"
            className="mb-12"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Shield, title: 'Security', desc: 'Vulnerabilities & compliance' },
              { icon: BarChart, title: 'Performance', desc: 'System efficiency' },
              { icon: Zap, title: 'Scalability', desc: 'Growth capacity' },
              { icon: TrendingUp, title: 'Cost', desc: 'Budget optimization' },
            ].map((area, idx) => (
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
                  <area.icon className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{area.title}</h3>
                <p className="text-gray-500 text-xs">{area.desc}</p>
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
                Why Choose Our Assessment Services?
              </h2>
              <div className="space-y-4">
                {[
                  '500+ successful technology assessments',
                  'Certified experts across multiple domains',
                  'Vendor-neutral recommendations',
                  'Actionable insights with clear priorities',
                  'Comprehensive documentation and reports',
                  'Ongoing support for implementation'
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
                <p className="text-slate-500 text-xs">Certified assessors</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-purple-500/30 transition-all duration-300">
                <Clock className="w-10 h-10 text-purple-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">2-3 Weeks</h4>
                <p className="text-slate-500 text-xs">Typical timeline</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-purple-500/30 transition-all duration-300">
                <FileSearch className="w-10 h-10 text-purple-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">500+ Done</h4>
                <p className="text-slate-500 text-xs">Assessments completed</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-purple-500/30 transition-all duration-300">
                <TrendingUp className="w-10 h-10 text-purple-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">70% Savings</h4>
                <p className="text-slate-500 text-xs">Cost reduction</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Technology Assessment Certification Roadmap ─── */}
        <motion.div className="mb-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <SectionTitle subtitle="Career Path" title="Technology Assessment Certification Roadmap" className="mb-4" />
          <p className="text-center text-gray-400 text-sm mb-12 max-w-2xl mx-auto">
            From IT auditing basics to enterprise technology advisory — certifications for assessment specialists.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
            {[{ label: 'IT Audit', color: 'bg-blue-500' }, { label: 'Security Assess.', color: 'bg-red-500' }, { label: 'Data & Analysis', color: 'bg-amber-500' }, { label: 'Enterprise Arch.', color: 'bg-purple-500' }].map(t => (
              <div key={t.label} className="flex items-center gap-2"><div className={`w-3 h-3 rounded-sm ${t.color}`} /><span className="text-xs text-gray-400">{t.label}</span></div>
            ))}
          </div>
          {[
            { level: 'Beginner', levelColor: 'from-sky-500 to-cyan-400', levelBorder: 'border-sky-500/30', levelBg: 'bg-sky-500/10', levelText: 'text-sky-300', desc: 'IT fundamentals and entry-level assessment skills.',
              certs: [
                { name: 'CompTIA A+',    org: 'CompTIA',  track: 'audit',   desc: 'IT support foundation — understand the technology you assess.' },
                { name: 'CompTIA Sec+',  org: 'CompTIA',  track: 'security', desc: 'Security+ — basic security concepts for technology assessment.' },
                { name: 'AWS CLF-C02',  org: 'Amazon',   track: 'data',    desc: 'Cloud Practitioner — assess cloud environments and services.' },
                { name: 'ITIL 4 Fdn',   org: 'Axelos',   track: 'audit',   desc: 'ITIL 4 — IT service management framework for assessments.' },
              ]},
            { level: 'Intermediate', levelColor: 'from-amber-500 to-yellow-400', levelBorder: 'border-amber-500/30', levelBg: 'bg-amber-500/10', levelText: 'text-amber-300', desc: 'IT audit, risk assessment, and security evaluation.',
              certs: [
                { name: 'CISA',          org: 'ISACA',    track: 'audit',   desc: 'Certified Information Systems Auditor — IT audit gold standard.' },
                { name: 'CompTIA CySA+', org: 'CompTIA',  track: 'security', desc: 'CySA+ — security analysis and threat assessment.' },
                { name: 'AWS SAA-C03',   org: 'Amazon',   track: 'data',    desc: 'Solutions Architect Associate — assess AWS architectures.' },
                { name: 'CRISC',         org: 'ISACA',    track: 'audit',   desc: 'Risk and Information Systems Control — IT risk assessment.' },
              ]},
            { level: 'Advanced', levelColor: 'from-orange-500 to-amber-500', levelBorder: 'border-orange-500/30', levelBg: 'bg-orange-500/10', levelText: 'text-orange-300', desc: 'Enterprise technology architecture and advanced risk assessment.',
              certs: [
                { name: 'TOGAF 10',     org: 'Open Group',track: 'arch',    desc: 'Enterprise Architecture — evaluate and assess IT architectures.' },
                { name: 'CISSP',        org: 'ISC²',      track: 'security', desc: 'CISSP — advanced cybersecurity assessment and advisory.' },
                { name: 'AWS SAP-C02',  org: 'Amazon',   track: 'data',    desc: 'Solutions Architect Pro — complex multi-account AWS assessments.' },
                { name: 'ISO 27001 LA', org: 'PECB',     track: 'audit',   desc: 'ISO 27001 Lead Auditor — formal ISMS audit and gap assessments.' },
              ]},
            { level: 'Expert', levelColor: 'from-rose-500 to-pink-500', levelBorder: 'border-rose-500/30', levelBg: 'bg-rose-500/10', levelText: 'text-rose-300', desc: 'Advisory CTO, enterprise technology governance, and board assessment.',
              certs: [
                { name: 'CGEIT',        org: 'ISACA',    track: 'arch',    desc: 'Enterprise IT Governance — board-level technology assessments.' },
                { name: 'SABSA Fellow', org: 'SABSA',    track: 'arch',    desc: 'SABSA — enterprise security architecture assessment mastery.' },
                { name: 'MIT CTO',      org: 'MIT',      track: 'arch',    desc: 'MIT CTO Leadership — executive technology assessment advisory.' },
                { name: 'ISO 27005 LI', org: 'PECB',     track: 'audit',   desc: 'ISO 27005 — enterprise information risk management.' },
              ]},
          ].map((row, rowIdx, arr) => {
            const ts: Record<string, { bg: string; border: string; text: string; dot: string }> = {
              audit:    { bg: 'bg-blue-500/10',   border: 'border-blue-500/25',   text: 'text-blue-300',   dot: 'bg-blue-500' },
              security: { bg: 'bg-red-500/10',    border: 'border-red-500/25',    text: 'text-red-300',    dot: 'bg-red-500' },
              data:     { bg: 'bg-amber-500/10',  border: 'border-amber-500/25',  text: 'text-amber-300',  dot: 'bg-amber-500' },
              arch:     { bg: 'bg-purple-500/10', border: 'border-purple-500/25', text: 'text-purple-300', dot: 'bg-purple-500' },
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
              <FileSearch className="w-3.5 h-3.5 text-purple-500" />
              <span className="text-xs font-semibold text-purple-300 uppercase tracking-widest">Technology Assessment</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
                <span className="text-white">Discover Hidden</span>
                <br />
                <span className="text-purple-500">
                  Opportunities &amp; Risks
                </span>
              </h2>
              <p className="text-base lg:text-lg text-gray-400 max-w-2xl mx-auto">
                Get a comprehensive assessment of your technology landscape and actionable recommendations.
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
                  Request an Assessment <ArrowRight className="w-5 h-5" />
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
