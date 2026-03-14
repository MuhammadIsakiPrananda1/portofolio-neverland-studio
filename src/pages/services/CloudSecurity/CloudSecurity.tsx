import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Cloud, Shield, Lock, Activity, Eye,
  CheckCircle, ArrowRight, Award, Clock, TrendingUp, Users,
  Database, Bell, LineChart, Server, Globe, Key,
} from 'lucide-react';
import Button from '@components/atoms/Button';
import SectionTitle from '@components/molecules/SectionTitle';

import { Routes } from '@config/constants';
import { slideUp, staggerContainer, staggerItem, fadeIn } from '@utils/animations';

export default function CloudMonitoringPage() {
  const threats = [
    {
      icon: Lock,
      title: 'Cloud Misconfiguration',
      description: 'Improperly configured S3 buckets, IAM policies, and firewall rules exposing critical data.',
      badge: 'Critical',
    },
    {
      icon: Key,
      title: 'Credential Compromise',
      description: 'Stolen API keys and access tokens used to exfiltrate data or deploy malicious workloads.',
      badge: 'Critical',
    },
    {
      icon: Globe,
      title: 'Data Exfiltration',
      description: 'Unauthorized transfer of cloud-hosted data to external servers by threat actors.',
      badge: 'High',
    },
    {
      icon: Server,
      title: 'Cryptojacking',
      description: 'Hijacking cloud compute resources to mine cryptocurrency at your expense.',
      badge: 'High',
    },
    {
      icon: Eye,
      title: 'Insider Threats',
      description: 'Privileged users abusing cloud access to steal data or sabotage infrastructure.',
      badge: 'High',
    },
    {
      icon: Database,
      title: 'Insecure APIs',
      description: 'Vulnerable cloud APIs exposing data or allowing unauthorized access to services.',
      badge: 'Medium',
    },
  ];

  const protections = [
    { icon: Shield,    title: 'Cloud Security Posture',     description: 'Continuous assessment of your cloud configuration against security best practices and CIS benchmarks.' },
    { icon: Eye,       title: 'Real-Time Monitoring',        description: 'Full visibility into cloud logs, events, and network traffic with AI-powered anomaly detection.' },
    { icon: Key,       title: 'Identity & Access Control',   description: 'Enforce least-privilege access, MFA, and Zero Trust policies across multi-cloud environments.' },
    { icon: Lock,      title: 'Data Encryption',             description: 'Protect data at rest and in transit with AES-256 encryption and robust key management.' },
    { icon: Bell,      title: 'Intelligent Alerting',        description: 'High-fidelity alerts with automated playbooks to minimize false positives and speed up response.' },
    { icon: LineChart, title: 'Compliance Automation',       description: 'Automated compliance checks for AWS, Azure, and GCP against SOC 2, ISO 27001, and PCI DSS.' },
    { icon: Activity,  title: 'Workload Protection',         description: 'Runtime protection for containers, serverless functions, and cloud-native workloads.' },
    { icon: Globe,     title: 'Multi-Cloud Coverage',        description: 'Unified security visibility across AWS, Azure, GCP, and hybrid cloud environments.' },
  ];

  const stats = [
    { value: '99.9%',  label: 'Detection Rate' },
    { value: '<5min',  label: 'Alert Response' },
    { value: '400+',   label: 'Clouds Secured' },
    { value: '24/7',   label: 'Cloud SOC' },
    { value: '3',      label: 'Major CSPs Covered' },
    { value: '100%',   label: 'Compliance Rate' },
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
            <Cloud className="w-12 h-12 text-red-500" />
          </div>
          <h1 className="text-5xl lg:text-6xl font-black mb-6 uppercase tracking-tight">
            <span className="text-white drop-shadow-[0_0_10px_rgba(239,68,68,0.2)]">
              Cloud Security &amp; Monitoring
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-400 font-medium max-w-3xl mx-auto mb-8">
            Gain complete visibility and control over your cloud infrastructure with real-time security monitoring,
            compliance automation, and proactive threat detection across AWS, Azure, and GCP.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={Routes.CONTACT}>
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white rounded-sm font-bold uppercase tracking-wide border-none group transition-all" rightIcon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}>
                Secure My Cloud
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

        {/* Cloud Threat Landscape */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Cloud Threats"
            title="Top Cloud Security Risks"
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {threats.map((threat, idx) => (
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
                    <threat.icon className="w-5 h-5 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-white uppercase tracking-tight group-hover:text-red-400 transition-colors">{threat.title}</h3>
                      <span className="px-2.5 py-1 rounded-sm text-xs font-mono font-bold border border-red-500/30 bg-red-500/10 text-red-400">
                        {threat.badge}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed">{threat.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Protection Strategies */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Our Approach"
            title="Comprehensive Cloud Protection"
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {protections.map((item, idx) => (
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
                  <item.icon className="w-6 h-6 text-slate-300 group-hover:text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-tight group-hover:text-red-400 relative z-10 transition-colors">{item.title}</h3>
                <p className="text-slate-400 font-medium text-sm leading-relaxed relative z-10">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── Cloud Security Certification Roadmap ─── */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Career Path"
            title="Cloud Security Certification Roadmap"
            className="mb-4"
          />
          <p className="text-center text-gray-400 text-sm mb-12 max-w-2xl mx-auto">
            A structured path for cloud security engineers — from AWS/Azure fundamentals
            to elite multi-cloud security architect and CCSP certifications.
          </p>
          {/* Track legend */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
            {[
              { label: 'Foundation',     color: 'bg-blue-500' },
              { label: 'AWS Security',   color: 'bg-amber-500' },
              { label: 'Azure / M365',   color: 'bg-sky-500' },
              { label: 'GCP & Governance', color: 'bg-emerald-500' },
            ].map(t => (
              <div key={t.label} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-sm ${t.color}`} />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{t.label}</span>
              </div>
            ))}
          </div>
          {[
            {
              level: 'Beginner', levelColor: 'from-sky-500 to-cyan-400', levelBorder: 'border-sky-500/30',
              levelBg: 'bg-sky-500/10', levelText: 'text-sky-300',
              desc: 'Cloud and security fundamentals before specialization.',
              certs: [
                { name: 'CompTIA ITF+',      org: 'CompTIA',   track: 'foundation', desc: 'IT fundamentals for complete beginners.' },
                { name: 'CompTIA Sec+',      org: 'CompTIA',   track: 'foundation', desc: 'Baseline security: firewalls, crypto, IAM concepts.' },
                { name: 'AWS CLF-C02',       org: 'Amazon',    track: 'aws',        desc: 'AWS Cloud Practitioner — foundational cloud concepts.' },
                { name: 'AZ-900',            org: 'Microsoft', track: 'azure',      desc: 'Azure Fundamentals — core cloud and security concepts.' },
                { name: 'GCP Digital Leader',org: 'Google',    track: 'gcp',        desc: 'Google Cloud fundamentals and service overview.' },
              ],
            },
            {
              level: 'Intermediate', levelColor: 'from-amber-500 to-yellow-400', levelBorder: 'border-amber-500/30',
              levelBg: 'bg-amber-500/10', levelText: 'text-amber-300',
              desc: 'Platform-specific cloud security certifications.',
              certs: [
                { name: 'AWS SAA-C03',      org: 'Amazon',    track: 'aws',   desc: 'Solutions Architect Associate — design secure AWS architectures.' },
                { name: 'SC-200',           org: 'Microsoft', track: 'azure', desc: 'Security Operations Analyst — Sentinel, Defender XDR.' },
                { name: 'AZ-500',           org: 'Microsoft', track: 'azure', desc: 'Azure Security Engineer — identity, data, and network security.' },
                { name: 'CompTIA CySA+',    org: 'CompTIA',   track: 'foundation', desc: 'SOC analyst skills for cloud threat detection and response.' },
                { name: 'Google Assoc. CE', org: 'Google',    track: 'gcp',   desc: 'Google Cloud Associate Cloud Engineer.' },
              ],
            },
            {
              level: 'Advanced', levelColor: 'from-orange-500 to-amber-500', levelBorder: 'border-orange-500/30',
              levelBg: 'bg-orange-500/10', levelText: 'text-orange-300',
              desc: 'Advanced cloud security specialist-level certifications.',
              certs: [
                { name: 'AWS Security Spec.', org: 'Amazon',    track: 'aws',   desc: 'Advanced AWS security: GuardDuty, KMS, WAF, IAM policies.' },
                { name: 'SC-100',            org: 'Microsoft', track: 'azure', desc: 'Cybersecurity Architect — Zero Trust on Microsoft platforms.' },
                { name: 'GCP Prof. Sec.',    org: 'Google',    track: 'gcp',   desc: 'Professional Cloud Security Engineer on GCP.' },
                { name: 'CKS',               org: 'CNCF',      track: 'gcp',   desc: 'Certified Kubernetes Security Specialist for container security.' },
                { name: 'ISO 27001 LA',      org: 'PECB',      track: 'foundation', desc: 'ISO 27001 Lead Auditor for cloud ISMS compliance.' },
              ],
            },
            {
              level: 'Expert', levelColor: 'from-rose-500 to-pink-500', levelBorder: 'border-rose-500/30',
              levelBg: 'bg-rose-500/10', levelText: 'text-rose-300',
              desc: 'Elite multi-cloud security architect and governance certifications.',
              certs: [
                { name: 'CCSP',     org: 'ISC²',  track: 'foundation', desc: 'Certified Cloud Security Professional — the premier cloud security cert.' },
                { name: 'CISSP',    org: 'ISC²',  track: 'foundation', desc: 'Gold standard senior security professional certification.' },
                { name: 'AWS SAP',  org: 'Amazon',    track: 'aws',   desc: 'AWS Solutions Architect Professional — complex multi-account designs.' },
                { name: 'CGEIT',    org: 'ISACA',     track: 'gcp',   desc: 'Governance of Enterprise IT — cloud strategy and risk.' },
                { name: 'AZ Expert',org: 'Microsoft', track: 'azure', desc: 'Azure Expert MSP — elite multi-cloud managed security.' },
              ],
            },
          ].map((row, rowIdx, arr) => {
            const ts: Record<string, { bg: string; border: string; text: string; dot: string }> = {
              foundation: { bg: 'bg-blue-500/10',   border: 'border-blue-500/25',   text: 'text-blue-300',   dot: 'bg-blue-500' },
              aws:        { bg: 'bg-amber-500/10',  border: 'border-amber-500/25',  text: 'text-amber-300',  dot: 'bg-amber-500' },
              azure:      { bg: 'bg-sky-500/10',    border: 'border-sky-500/25',    text: 'text-sky-300',    dot: 'bg-sky-500' },
              gcp:        { bg: 'bg-emerald-500/10',border: 'border-emerald-500/25',text: 'text-emerald-300',dot: 'bg-emerald-500' },
            };
            const isLast = rowIdx === arr.length - 1;
            return (
              <motion.div key={row.level} className="relative"
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: rowIdx * 0.12, duration: 0.5 }}
              >
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
                      {row.certs.map((cert) => {
                        const s = ts[cert.track];
                        return (
                          <div key={cert.name} className={`group relative rounded-sm border ${s.border} ${s.bg} p-3 transition-colors duration-300 cursor-default hover:bg-[#0B1120]`}>
                            <div className={`w-2 h-2 rounded-sm ${s.dot} mb-2`} />
                            <p className={`text-[11px] font-bold ${s.text} leading-tight mb-1 transition-colors`}>{cert.name}</p>
                            <p className="text-[9px] text-slate-500 uppercase tracking-widest mb-1.5 font-bold">{cert.org}</p>
                            <p className="text-[10px] text-slate-400 font-medium hidden group-hover:block absolute bottom-full left-0 right-0 z-20 bg-[#0B1120] border border-white/10 rounded-sm p-2 mb-1 shadow-2xl">{cert.desc}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
          <p className="text-center text-slate-500 text-xs mt-4 font-mono">[SYSINFO] Hover over any certificate card to see a brief description.</p>
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
              <h2 className="text-4xl font-black mb-6 text-white uppercase tracking-tight">Why Choose Our Cloud Security?</h2>
              <div className="space-y-4">
                {[
                  'AWS, Azure & GCP certified security architects',
                  'Unified security dashboard across all cloud environments',
                  'Automated compliance for SOC 2, ISO 27001, PCI DSS, HIPAA',
                  '< 5 minute alert-to-response time with automated playbooks',
                  'Zero-trust architecture design and implementation',
                  'Continuous cloud posture management (CSPM)',
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
                { icon: Award,      title: 'Cloud Certified',    sub: 'AWS, Azure, GCP experts' },
                { icon: Clock,      title: '<5min Response',     sub: 'Automated playbooks' },
                { icon: TrendingUp, title: '99.9% Detection',    sub: 'AI-powered monitoring' },
                { icon: Users,      title: '400+ Clouds',         sub: 'Secured globally' },
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
              <Cloud className="w-3.5 h-3.5 text-red-500" />
              <span className="text-xs font-bold text-red-400 uppercase tracking-widest">Cloud Security</span>
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
                <span className="text-white">Ready to Secure</span>
                <br />
                <span className="text-red-500">
                  Your Cloud?
                </span>
              </h2>
              <p className="text-base lg:text-lg text-slate-400 font-medium max-w-2xl mx-auto">
                Get full visibility into your cloud infrastructure. Schedule a free consultation with our cloud security experts today.
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
