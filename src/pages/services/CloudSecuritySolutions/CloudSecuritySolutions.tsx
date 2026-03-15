import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Shield, Lock, Eye, Key, AlertTriangle, FileCheck, 
  CheckCircle, ArrowRight, Users, TrendingUp, Server 
} from 'lucide-react';
import SectionTitle from '@components/molecules/SectionTitle';
import { Routes } from '@config/constants';

export default function CloudSecuritySolutions() {
  const stats = [
    { value: '99.99%', label: 'Security Uptime' },
    { value: '24/7', label: 'Threat Monitoring' },
    { value: '< 15min', label: 'Incident Response' },
    { value: '100%', label: 'Compliance Rate' },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Advanced Threat Protection',
      description: 'Real-time threat detection and prevention using AI-powered security tools and continuous monitoring systems.'
    },
    {
      icon: Lock,
      title: 'Data Encryption',
      description: 'End-to-end encryption for data at rest and in transit with industry-standard encryption protocols and key management.'
    },
    {
      icon: Eye,
      title: 'Security Monitoring',
      description: '24/7 security operations center monitoring with automated alerts and incident response protocols.'
    },
    {
      icon: Key,
      title: 'Identity & Access Management',
      description: 'Comprehensive IAM solutions with multi-factor authentication, role-based access control, and privilege management.'
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Enhanced Protection',
      description: 'Multi-layered security architecture protecting against advanced threats and vulnerabilities.'
    },
    {
      icon: FileCheck,
      title: 'Compliance Assurance',
      description: 'Meet regulatory requirements with automated compliance monitoring and reporting.'
    },
    {
      icon: AlertTriangle,
      title: 'Threat Intelligence',
      description: 'Proactive threat hunting and intelligence gathering to stay ahead of emerging risks.'
    },
    {
      icon: Server,
      title: 'Infrastructure Security',
      description: 'Secure configuration and hardening of cloud infrastructure and network architecture.'
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
          {/* Accent Line */}
          <div className="w-20 h-1 bg-red-500 mx-auto mb-8 rounded-sm" />
          
          {/* Icon Badge */}
          <div className="inline-flex p-4 rounded-sm border border-red-500/30 bg-red-500/10 mb-6">
            <Shield className="w-12 h-12 text-red-500" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6 text-white drop-shadow-[0_0_10px_rgba(239,68,68,0.2)]">
            Cloud Security Solutions
          </h1>
          
          <p className="text-lg lg:text-xl text-slate-400 font-medium max-w-3xl mx-auto mb-8">
            Protect your cloud infrastructure with enterprise-grade security solutions. 
            Comprehensive threat protection, compliance, and 24/7 monitoring for complete peace of mind.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={Routes.CONTACT}>
              <button className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white rounded-sm font-bold uppercase tracking-wide px-6 py-3 border-none group transition-all">
                Secure Your Cloud
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link to={Routes.CLOUD_SOLUTIONS}>
              <button className="inline-flex items-center gap-2 border border-white/20 text-white hover:bg-white/5 hover:border-white/40 rounded-sm font-bold uppercase tracking-wide px-6 py-3 transition-all">
                View Cloud Solutions
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
              className="relative rounded-sm p-6 text-center border border-white/5 hover:border-red-500/50 transition-all duration-300 bg-[#0f172a] shadow-sm group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="text-3xl lg:text-4xl font-black font-mono text-white group-hover:text-red-400 transition-colors mb-2">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                {stat.label}
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-red-500 group-hover:w-full transition-all duration-500" />
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
            subtitle="Security Services"
            title="Complete Cloud Security Stack"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-sm p-6 border border-white/5 bg-[#0f172a] hover:border-red-500/50 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="inline-flex p-3 rounded-sm bg-[#0B1120] border border-white/10 mb-4">
                  <feature.icon className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight text-white mb-2">
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
            subtitle="Security Benefits"
            title="Why Cloud Security Matters"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-sm p-6 text-center border border-white/5 bg-[#0f172a] hover:border-red-500/50 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="inline-flex p-3 rounded-sm bg-[#0B1120] border border-white/10 mb-4">
                  <benefit.icon className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-slate-400 font-medium text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us Section - Clean */}
        <motion.div
          className="border border-white/5 rounded-sm p-8 lg:p-12 mb-24 bg-[#0f172a] shadow-xl relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tight mb-6 text-white">
                Why Choose Our Security Services?
              </h2>
              <div className="space-y-4">
                {[
                  'Certified cloud security professionals',
                  'Zero-trust security architecture',
                  'Automated threat detection and response',
                  'Compliance with major standards (SOC 2, ISO 27001)',
                  '24/7 security operations center',
                  'Regular security audits and assessments'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 font-medium text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-red-500/30 transition-colors duration-300">
                <Shield className="w-10 h-10 text-red-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">24/7 Protection</h4>
                <p className="text-slate-500 font-mono text-xs">Always secured</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-red-500/30 transition-colors duration-300">
                <Eye className="w-10 h-10 text-red-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">Real-time Monitoring</h4>
                <p className="text-slate-500 font-mono text-xs">Threat detection</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-red-500/30 transition-colors duration-300">
                <FileCheck className="w-10 h-10 text-red-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">100% Compliant</h4>
                <p className="text-slate-500 font-mono text-xs">Industry standards</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-red-500/30 transition-colors duration-300">
                <Users className="w-10 h-10 text-red-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">Expert Team</h4>
                <p className="text-slate-500 font-mono text-xs">Security specialists</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Cloud Security Certification Roadmap ─── */}
        <motion.div className="mb-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <SectionTitle subtitle="Career Path" title="Cloud Security Certification Roadmap" className="mb-4" />
          <p className="text-center text-gray-400 text-sm mb-12 max-w-2xl mx-auto">
            From cloud basics to expert cloud CISO — structured certifications for cloud security professionals.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
            {[{ label: 'Cloud Basics', color: 'bg-blue-500' }, { label: 'Security Ops', color: 'bg-red-500' }, { label: 'Compliance / IAM', color: 'bg-amber-500' }, { label: 'CISO Track', color: 'bg-purple-500' }].map(t => (
              <div key={t.label} className="flex items-center gap-2"><div className={`w-3 h-3 rounded-sm ${t.color}`} /><span className="text-xs text-gray-400">{t.label}</span></div>
            ))}
          </div>
          {[
            { level: 'Beginner', levelColor: 'from-sky-500 to-cyan-400', levelBorder: 'border-sky-500/30', levelBg: 'bg-sky-500/10', levelText: 'text-sky-300', desc: 'Cloud fundamentals and basic cybersecurity concepts.',
              certs: [
                { name: 'AWS CLF-C02',     org: 'Amazon',   track: 'cloud',   desc: 'Cloud Practitioner — foundational cloud security shared responsibility.' },
                { name: 'AZ-900',          org: 'Microsoft',track: 'cloud',   desc: 'Azure Fundamentals — Azure security, compliance, and identity basics.' },
                { name: 'CompTIA Sec+',    org: 'CompTIA',  track: 'security', desc: 'Security+ — baseline cybersecurity for cloud environments.' },
                { name: 'ISACA CSX Fdn',  org: 'ISACA',    track: 'security', desc: 'CSX Foundation — cybersecurity framework basics and cloud security.' },
              ]},
            { level: 'Intermediate', levelColor: 'from-amber-500 to-yellow-400', levelBorder: 'border-amber-500/30', levelBg: 'bg-amber-500/10', levelText: 'text-amber-300', desc: 'Cloud security operations, IAM, and compliance.',
              certs: [
                { name: 'AWS Security+',   org: 'Amazon',   track: 'security', desc: 'AWS Security Specialty — IAM, KMS, GuardDuty, CloudTrail, WAF.' },
                { name: 'AZ-500',          org: 'Microsoft',track: 'compliance', desc: 'Azure Security Engineer — Microsoft Defender, RBAC, Key Vault.' },
                { name: 'CompTIA CySA+',   org: 'CompTIA',  track: 'security', desc: 'CySA+ — threat detection and incident response in cloud environments.' },
                { name: 'CCSP',            org: 'ISC²',     track: 'compliance', desc: 'Certified Cloud Security Professional — comprehensive cloud security.' },
              ]},
            { level: 'Advanced', levelColor: 'from-orange-500 to-amber-500', levelBorder: 'border-orange-500/30', levelBg: 'bg-orange-500/10', levelText: 'text-orange-300', desc: 'Advanced cloud security architecture and zero-trust design.',
              certs: [
                { name: 'Google Prof. CS', org: 'Google',   track: 'security', desc: 'Professional Cloud Security Engineer — GCP zero-trust and posture.' },
                { name: 'ISO 27001 LI',    org: 'PECB',     track: 'compliance', desc: 'ISO 27001 Lead Implementer — deploy ISMS in cloud environments.' },
                { name: 'CISM',            org: 'ISACA',    track: 'ciso',    desc: 'Information Security Manager — lead cloud security teams.' },
                { name: 'Terraform Assoc.',org: 'HashiCorp',track: 'compliance', desc: 'IaC for policy-as-code and compliant cloud provisioning.' },
              ]},
            { level: 'Expert', levelColor: 'from-rose-500 to-pink-500', levelBorder: 'border-rose-500/30', levelBg: 'bg-rose-500/10', levelText: 'text-rose-300', desc: 'Cloud CISO, enterprise security governance, and advisory.',
              certs: [
                { name: 'CISSP',           org: 'ISC²',     track: 'ciso',    desc: 'CISSP — gold-standard for cloud security leadership and CISO roles.' },
                { name: 'CGEIT',           org: 'ISACA',    track: 'ciso',    desc: 'IT Governance — align cloud security strategy with business goals.' },
                { name: 'AWS SAP-C02',     org: 'Amazon',   track: 'cloud',   desc: 'Solutions Architect Pro — architect secure, multi-account AWS environments.' },
                { name: 'SABSA Fellow',    org: 'SABSA',    track: 'ciso',    desc: 'SABSA — enterprise security architecture for board-level advisory.' },
              ]},
          ].map((row, rowIdx, arr) => {
            const ts: Record<string, { bg: string; border: string; text: string; dot: string }> = {
              cloud:      { bg: 'bg-blue-500/10',   border: 'border-blue-500/25',   text: 'text-blue-300',   dot: 'bg-blue-500' },
              security:   { bg: 'bg-red-500/10',    border: 'border-red-500/25',    text: 'text-red-300',    dot: 'bg-red-500' },
              compliance: { bg: 'bg-amber-500/10',  border: 'border-amber-500/25',  text: 'text-amber-300',  dot: 'bg-amber-500' },
              ciso:       { bg: 'bg-purple-500/10', border: 'border-purple-500/25', text: 'text-purple-300', dot: 'bg-purple-500' },
            };
            const isLast = rowIdx === arr.length - 1;
            return (
              <motion.div key={row.level} className="relative" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: rowIdx * 0.12, duration: 0.5 }}>
                {!isLast && <div className="absolute left-[1.15rem] top-full w-px h-8 bg-white/10 z-10" />}
                <div className="flex gap-5 mb-8">
                  <div className="flex flex-col items-center flex-shrink-0 pt-1">
                    <div className={`w-10 h-10 rounded-sm shadow-sm ${row.levelBg} border ${row.levelBorder} flex items-center justify-center`}>
                      <span className={`text-xs font-black ${row.levelText}`}>{rowIdx + 1}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className={`text-sm font-extrabold uppercase tracking-widest ${row.levelText}`}>{row.level}</span>
                      <span className="text-xs text-white/20">—</span>
                      <span className="text-xs text-slate-400 font-medium">{row.desc}</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                      {row.certs.map((cert) => { const s = ts[cert.track]; return (
                        <div key={cert.name} className={`group relative rounded-sm border ${s.border} ${s.bg} p-3 hover:bg-[#0B1120] transition-colors duration-200 cursor-default`}>
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

          {/* CTA Section */}
        <motion.div
          className="relative border border-white/10 rounded-sm p-12 lg:p-16 text-center bg-[#0f172a] shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Top Accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-red-500" />
          
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-red-500/30 bg-red-500/10">
              <Shield className="w-3.5 h-3.5 text-red-500" />
              <span className="text-xs font-semibold text-red-400 uppercase tracking-widest">Secure Now</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
                <span className="text-white">Ready to Secure</span>
                <br />
                <span className="text-red-500">Your Cloud?</span>
              </h2>
              <p className="text-base lg:text-lg text-slate-400 font-medium max-w-2xl mx-auto">
                Get a free security assessment and discover vulnerabilities in your cloud infrastructure. Our experts will provide actionable recommendations.
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 py-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/10" />
              <div className="w-1.5 h-1.5 rounded-sm bg-red-500/50" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/10" />
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to={Routes.CONTACT}>
                <button className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white rounded-sm font-bold uppercase tracking-wide px-6 py-3 border-none group transition-all">
                  Get Security Assessment
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link to={Routes.CLOUD_SOLUTIONS}>
                <button className="inline-flex items-center gap-2 border border-white/20 text-white hover:bg-white/5 hover:border-white/40 rounded-sm font-bold uppercase tracking-wide px-6 py-3 transition-all">
                  Explore Cloud Solutions
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
