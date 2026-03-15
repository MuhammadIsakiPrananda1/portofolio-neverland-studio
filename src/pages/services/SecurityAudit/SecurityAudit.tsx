import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FileSearch, Shield, FileText, ClipboardList,
  CheckCircle, ArrowRight, Award, Clock, TrendingUp, Users,
} from 'lucide-react';
import Button from '@components/atoms/Button';
import SectionTitle from '@components/molecules/SectionTitle';

import { Routes } from '@config/constants';
import { slideUp, staggerContainer, staggerItem, fadeIn } from '@utils/animations';

export default function SecurityAuditPage() {
  const auditTypes = [
    {
      icon: ClipboardList,
      title: 'Compliance Assessment',
      description: 'Evaluate alignment with ISO 27001, SOC 2, PCI DSS, and other regulatory frameworks.',
      badge: 'Compliance',
    },
    {
      icon: Shield,
      title: 'Access Control Audit',
      description: 'Review user privileges, IAM policies, and least-privilege enforcement across systems.',
      badge: 'Identity',
    },
    {
      icon: FileSearch,
      title: 'Configuration Review',
      description: 'Analyze system and cloud configurations for misconfigurations and security gaps.',
      badge: 'Configuration',
    },
    {
      icon: FileText,
      title: 'Policy & Procedure Review',
      description: 'Assess security policies, incident response plans, and business continuity procedures.',
      badge: 'Governance',
    },
    {
      icon: TrendingUp,
      title: 'Third-Party Risk Assessment',
      description: 'Evaluate vendor and supplier security posture to reduce supply chain exposure.',
      badge: 'Supply Chain',
    },
    {
      icon: CheckCircle,
      title: 'Gap Analysis & Roadmap',
      description: 'Identify control deficiencies and deliver a prioritized remediation roadmap.',
      badge: 'Remediation',
    },
  ];

  const processSteps = [
    { icon: ClipboardList, title: 'Scope Definition', desc: 'Identify audit objectives, boundaries, and success criteria' },
    { icon: FileSearch,   title: 'Data Collection',  desc: 'Gather policies, procedures, configurations, and evidence' },
    { icon: Shield,       title: 'Assessment',        desc: 'Evaluate controls and compliance status against standards' },
    { icon: FileText,     title: 'Reporting',          desc: 'Deliver actionable findings with a prioritized remediation roadmap' },
  ];

  const stats = [
    { value: '100%',  label: 'Compliance Coverage' },
    { value: '48hr',  label: 'Initial Report' },
    { value: '200+',  label: 'Audits Completed' },
    { value: '0',     label: 'Compliance Failures' },
    { value: '15+',   label: 'Standards Supported' },
    { value: '98%',   label: 'Client Satisfaction' },
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">

        {/* Hero */}
        <motion.div
          className="text-center mb-24"
          variants={slideUp}
          initial="hidden"
          animate="visible"
        >
          <div className="w-20 h-1 bg-red-500 mx-auto mb-8 rounded-sm" />
          <div className="inline-flex p-4 rounded-sm border border-red-500/30 bg-red-500/10 mb-6">
            <FileSearch className="w-12 h-12 text-red-500" />
          </div>
          <h1 className="text-5xl lg:text-6xl font-black mb-6 uppercase tracking-tight">
            <span className="text-white drop-shadow-[0_0_10px_rgba(239,68,68,0.2)]">
              Security Audit
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-400 font-medium max-w-3xl mx-auto mb-8">
            Thorough evaluation of your security posture, policies, and compliance status.
            We ensure your organization meets industry standards and best practices.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={Routes.CONTACT}>
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white rounded-sm font-bold uppercase tracking-wide border-none group transition-all" rightIcon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}>
                Request an Audit
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
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6 mb-24"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="relative rounded-sm p-6 text-center border border-white/5 hover:border-red-500/50 transition-all duration-300 bg-[#0f172a] shadow-sm group"
              variants={staggerItem}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-3xl lg:text-4xl font-black text-white font-mono mb-2 group-hover:text-red-400 transition-colors">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                {stat.label}
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-red-500 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Audit Types */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="What We Audit"
            title="Comprehensive Security Audit Services"
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {auditTypes.map((audit, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-sm p-6 border border-white/5 border-l-2 border-l-red-500 bg-[#0f172a] shadow-sm hover:border-red-500/50 transition-all duration-300 group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2.5 rounded-sm bg-[#0B1120] border border-white/10 group-hover:border-red-500/30 transition-colors">
                    <audit.icon className="w-5 h-5 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-white uppercase tracking-tight group-hover:text-red-400 transition-colors">{audit.title}</h3>
                      <span className="px-2.5 py-1 rounded-sm text-xs font-mono font-bold border border-red-500/30 bg-red-500/10 text-red-400">
                        {audit.badge}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed">{audit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Process Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Our Process"
            title="How We Conduct Your Audit"
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-sm p-6 border border-white/5 bg-[#0f172a] shadow-sm hover:border-red-500/50 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="absolute top-0 right-0 p-4 font-mono text-5xl font-black text-white/5 group-hover:text-red-500/10 transition-colors select-none z-0">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-sm bg-[#0B1120] border border-white/10 mb-4 group-hover:border-red-500/30 transition-colors relative z-10">
                  <step.icon className="w-6 h-6 text-slate-300 group-hover:text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-tight group-hover:text-red-400 relative z-10 transition-colors">{step.title}</h3>
                <p className="text-slate-400 font-medium text-sm leading-relaxed relative z-10">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── Security Audit Certification Roadmap ─── */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Career Path"
            title="Security Audit Certification Roadmap"
            className="mb-4"
          />
          <p className="text-center text-gray-400 text-sm mb-12 max-w-2xl mx-auto">
            A structured progression for security auditors and compliance professionals —
            from IT fundamentals to elite governance and forensics specializations.
          </p>

          {/* Track legend */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
            {[
              { label: 'Foundation',          color: 'bg-blue-500' },
              { label: 'Compliance / Audit',  color: 'bg-amber-500' },
              { label: 'Governance / Risk',   color: 'bg-purple-500' },
              { label: 'Forensics & IR',      color: 'bg-emerald-500' },
            ].map(t => (
              <div key={t.label} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-sm ${t.color}`} />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{t.label}</span>
              </div>
            ))}
          </div>

          {/* Roadmap levels */}
          {[
            {
              level: 'Beginner',
              levelColor: 'from-sky-500 to-cyan-400',
              levelBorder: 'border-sky-500/30',
              levelBg: 'bg-sky-500/10',
              levelText: 'text-sky-300',
              desc: 'Build IT, security, and compliance foundations.',
              certs: [
                { name: 'CompTIA ITF+',    org: 'CompTIA',       track: 'foundation',   desc: 'Absolute beginner IT fundamentals.' },
                { name: 'CompTIA A+',      org: 'CompTIA',       track: 'foundation',   desc: 'Hardware, OS, troubleshooting — entry level IT.' },
                { name: 'CompTIA Net+',    org: 'CompTIA',       track: 'foundation',   desc: 'Networking fundamentals needed for any auditor.' },
                { name: 'CompTIA Sec+',    org: 'CompTIA',       track: 'foundation',   desc: 'Baseline security certification — prerequisite for audit roles.' },
              ],
            },
            {
              level: 'Intermediate',
              levelColor: 'from-amber-500 to-yellow-400',
              levelBorder: 'border-amber-500/30',
              levelBg: 'bg-amber-500/10',
              levelText: 'text-amber-300',
              desc: 'Core audit, compliance, and technical assessment certifications.',
              certs: [
                { name: 'CompTIA CySA+',        org: 'CompTIA',       track: 'foundation',   desc: 'SOC analyst skills: SIEM, threat detection, vulnerability mgmt.' },
                { name: 'CISA',                 org: 'ISACA',         track: 'compliance',   desc: 'THE premiere IT audit cert — auditing, control, and assurance.' },
                { name: 'ISO 27001 Foundation',  org: 'PECB/BSI',     track: 'compliance',   desc: 'ISMS concepts, controls, and ISO 27001 framework basics.' },
                { name: 'PCI DSS Practitioner', org: 'PCI SSC',       track: 'compliance',   desc: 'Payment card data security standards practitioner cert.' },
                { name: 'CEH',                  org: 'EC-Council',    track: 'foundation',   desc: 'Certified Ethical Hacker — understand attacks to audit defenses.' },
                { name: 'SOC 2 Auditor',        org: 'AICPA',         track: 'compliance',   desc: 'SOC 2 trust service criteria — security, availability, processing.' },
              ],
            },
            {
              level: 'Advanced',
              levelColor: 'from-orange-500 to-amber-500',
              levelBorder: 'border-orange-500/30',
              levelBg: 'bg-orange-500/10',
              levelText: 'text-orange-300',
              desc: 'Specialized audit, governance, and forensics certifications.',
              certs: [
                { name: 'ISO 27001 Lead Auditor', org: 'PECB',         track: 'compliance',   desc: 'Conduct third-party audits of ISMS against ISO 27001.' },
                { name: 'CISM',                   org: 'ISACA',        track: 'governance',   desc: 'Manage and govern enterprise information security programs.' },
                { name: 'CRISC',                  org: 'ISACA',        track: 'governance',   desc: 'IT risk management and information systems control.' },
                { name: 'GCFE',                   org: 'GIAC',         track: 'forensics',    desc: 'Windows forensics, evidence collection, chain-of-custody.' },
                { name: 'GCIH',                   org: 'GIAC',         track: 'forensics',    desc: 'Incident handling: IR methodology & malware analysis.' },
                { name: 'EnCE',                   org: 'OpenText',     track: 'forensics',    desc: 'Industry-standard digital forensics using EnCase software.' },
              ],
            },
            {
              level: 'Expert',
              levelColor: 'from-rose-500 to-pink-500',
              levelBorder: 'border-rose-500/30',
              levelBg: 'bg-rose-500/10',
              levelText: 'text-rose-300',
              desc: 'Elite governance, risk, and senior security leadership certifications.',
              certs: [
                { name: 'CISSP',          org: 'ISC²',   track: 'governance',  desc: 'The gold standard for senior security architects and managers.' },
                { name: 'CGEIT',          org: 'ISACA',  track: 'governance',  desc: 'Governance of enterprise IT — strategy, risk, and value delivery.' },
                { name: 'CDPSE',          org: 'ISACA',  track: 'compliance',  desc: 'Certified Data Privacy Solutions Engineer — privacy by design.' },
                { name: 'FedRAMP Auditor', org: 'A3PAO', track: 'compliance',  desc: 'US federal cloud security authorization audit credential.' },
                { name: 'CCSP',           org: 'ISC²',   track: 'governance',  desc: 'Premier cloud security professional cert for senior auditors.' },
              ],
            },
          ].map((row, rowIdx, arr) => {
            const trackStyle: Record<string, { bg: string; border: string; text: string; dot: string }> = {
              foundation:  { bg: 'bg-blue-500/10',   border: 'border-blue-500/25',   text: 'text-blue-300',   dot: 'bg-blue-500' },
              compliance:  { bg: 'bg-amber-500/10',  border: 'border-amber-500/25',  text: 'text-amber-300',  dot: 'bg-amber-500' },
              governance:  { bg: 'bg-purple-500/10', border: 'border-purple-500/25', text: 'text-purple-300', dot: 'bg-purple-500' },
              forensics:   { bg: 'bg-emerald-500/10',border: 'border-emerald-500/25',text: 'text-emerald-300',dot: 'bg-emerald-500' },
            };
            const isLast = rowIdx === arr.length - 1;
            return (
              <motion.div
                key={row.level}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: rowIdx * 0.12, duration: 0.5 }}
              >
                {!isLast && (
                  <div className="absolute left-[1.15rem] top-full w-px h-8 bg-white/10 z-10" />
                )}
                <div className="flex gap-5 mb-8">
                  {/* Level badge */}
                  <div className="flex flex-col items-center flex-shrink-0 pt-1">
                    <div className={`w-10 h-10 rounded-sm ${row.levelBg} border ${row.levelBorder} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                      <span className={`text-sm font-mono font-black ${row.levelText}`}>{rowIdx + 1}</span>
                    </div>
                  </div>
                  {/* Level content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className={`text-sm font-black uppercase tracking-widest ${row.levelText}`}>
                        {row.level}
                      </span>
                      <span className="text-xs text-white/20">—</span>
                      <span className="text-xs font-medium text-slate-400">{row.desc}</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                      {row.certs.map((cert) => {
                        const ts = trackStyle[cert.track];
                        return (
                          <div
                            key={cert.name}
                            className={`group relative rounded-sm border ${ts.border} ${ts.bg} p-3 transition-colors duration-300 cursor-default hover:bg-[#0B1120]`}
                          >
                            <div className={`w-2 h-2 rounded-sm ${ts.dot} mb-2`} />
                            <p className={`text-[11px] font-bold ${ts.text} leading-tight mb-1 transition-colors`}>{cert.name}</p>
                            <p className="text-[9px] text-slate-500 uppercase tracking-widest mb-1.5 font-bold">{cert.org}</p>
                            <p className="text-[10px] text-slate-400 font-medium leading-relaxed hidden group-hover:block absolute bottom-full left-0 right-0 z-20 bg-[#0B1120] border border-white/10 rounded-sm p-2 mb-1 shadow-2xl">
                              {cert.desc}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          <p className="text-center text-slate-500 text-xs mt-4 font-mono">
            [SYSINFO] Hover over any certificate card to see a brief description.
          </p>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          className="border border-white/5 rounded-sm p-8 lg:p-12 mb-24 bg-[#0f172a] shadow-xl relative overflow-hidden"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <h2 className="text-4xl font-black mb-6 text-white uppercase tracking-tight">Why Choose Our Audit Services?</h2>
              <div className="space-y-4">
                {[
                  'Certified auditors with CISSP, CISA, and ISO 27001 Lead Auditor credentials',
                  'Coverage for 15+ compliance frameworks and standards',
                  'Detailed remediation roadmap with priority scoring',
                  'Rapid turnaround — initial report within 48 hours',
                  'Executive summary and technical deep-dive reports',
                  'Post-audit support and re-assessment included',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-lg font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Award,      title: 'Certified Auditors', sub: 'CISSP, CISA, ISO 27001' },
                { icon: Clock,      title: '48hr Turnaround',    sub: 'Fast initial reporting' },
                { icon: TrendingUp, title: '200+ Audits Done',   sub: 'Proven track record' },
                { icon: Users,      title: '150+ Clients',       sub: 'Trusted by enterprises' },
              ].map((card, idx) => (
                <div key={idx} className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-red-500/30 transition-all duration-300">
                  <card.icon className="w-10 h-10 text-red-500 mx-auto mb-3" />
                  <h4 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">{card.title}</h4>
                  <p className="text-slate-500 text-xs font-mono">{card.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="relative border border-white/10 rounded-sm p-12 lg:p-16 text-center bg-[#0f172a] shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-red-500" />
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-red-500/30 bg-red-500/10">
              <FileSearch className="w-3.5 h-3.5 text-red-500" />
              <span className="text-xs font-bold text-red-400 uppercase tracking-widest">Get Audited</span>
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
                <span className="text-white">Ready for a</span>
                <br />
                <span className="text-red-500">
                  Security Audit?
                </span>
              </h2>
              <p className="text-base lg:text-lg text-slate-400 font-medium max-w-2xl mx-auto">
                Schedule a consultation to discuss your compliance and audit requirements with our certified security experts.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 py-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/10" />
              <div className="w-1.5 h-1.5 rounded-sm bg-red-500/50" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/10" />
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to={Routes.CONTACT}>
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white rounded-sm font-bold uppercase tracking-wide border-none group transition-all" rightIcon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}>
                  Schedule Free Consultation
                </Button>
              </Link>
              <Link to={Routes.HOME}>
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/5 hover:border-white/40 rounded-sm font-bold uppercase tracking-wide transition-all">
                  Explore Our Services
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
