import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Shield, Lock, Eye, Zap, TrendingUp, Users, 
  CheckCircle, AlertTriangle, Server,
  ArrowRight, Award, Clock, Target,
  Cpu, FileWarning, Globe, Activity, Code, Key
} from 'lucide-react';
import Button from '@components/atoms/Button';
import SectionTitle from '@components/molecules/SectionTitle';
import ServiceCard from '@components/molecules/ServiceCard';
import { Routes, SERVICES_DATA } from '@config';
import { slideUp, staggerContainer, staggerItem, fadeIn } from '@utils/animations';

export default function CyberSecurityPage() {
  const threats = [
    {
      icon: AlertTriangle,
      title: 'Ransomware Attacks',
      description: 'Malicious software that encrypts data and demands payment for decryption.',
      severity: 'Critical',
    },
    {
      icon: Eye,
      title: 'Data Breaches',
      description: 'Unauthorized access to sensitive information and customer data.',
      severity: 'High',
    },
    {
      icon: Server,
      title: 'DDoS Attacks',
      description: 'Distributed denial-of-service attacks that overwhelm systems.',
      severity: 'High',
    },
    {
      icon: Lock,
      title: 'Phishing & Social Engineering',
      description: 'Deceptive tactics to trick employees into revealing credentials.',
      severity: 'Medium',
    },
    {
      icon: Code,
      title: 'Zero-Day Exploits',
      description: 'Attacks leveraging previously unknown vulnerabilities in software.',
      severity: 'Critical',
    },
    {
      icon: FileWarning,
      title: 'Supply Chain Attacks',
      description: 'Infiltration through third-party vendors and compromised dependencies.',
      severity: 'High',
    },
    {
      icon: Globe,
      title: 'Advanced Persistent Threats (APTs)',
      description: 'Prolonged and targeted stealth attacks by sophisticated adversaries.',
      severity: 'Critical',
    },
    {
      icon: Users,
      title: 'Insider Threats',
      description: 'Security risks originating from within the targeted organization.',
      severity: 'High',
    },
  ];

  const protections = [
    {
      icon: Shield,
      title: 'Proactive Defense',
      description: 'Stay ahead of threats with continuous monitoring and threat intelligence.',
    },
    {
      icon: Lock,
      title: 'Multi-Layer Security',
      description: 'Defense-in-depth strategy with multiple security controls.',
    },
    {
      icon: Zap,
      title: 'Rapid Response',
      description: '24/7 incident response team ready to mitigate threats immediately.',
    },
    {
      icon: Target,
      title: 'Risk Assessment',
      description: 'Comprehensive evaluation to identify and prioritize vulnerabilities.',
    },
    {
      icon: Activity,
      title: 'Continuous Monitoring',
      description: 'Real-time observability across all digital assets and network traffic.',
    },
    {
      icon: Key,
      title: 'Identity Access Management',
      description: 'Strict access controls, MFA, and Zero Trust architecture implementation.',
    },
    {
      icon: Cpu,
      title: 'Endpoint Protection',
      description: 'Advanced EDR solutions securing every device connected to your network.',
    },
    {
      icon: Server,
      title: 'Infrastructure Hardening',
      description: 'Securing servers, cloud configurations, and network perimeters.',
    },
  ];

  const stats = [
    { value: '99.9%', label: 'Threat Detection Rate' },
    { value: '< 15min', label: 'Average Response Time' },
    { value: '500+', label: 'Threats Neutralized' },
    { value: '150+', label: 'Protected Enterprises' },
    { value: '24/7', label: 'SOC Monitoring' },
    { value: 'Zero', label: 'Data Loss Incidents' },
    { value: '100%', label: 'Compliance Guarantee' },
    { value: '30+', label: 'Certified Experts' },
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        {/* Hero Section - Clean & Modern */}
        <motion.div
          className="text-center mb-24 relative"
          variants={slideUp}
          initial="hidden"
          animate="visible"
        >
          {/* Subtle Cyber Grid Background Behind Hero */}
          <div className="absolute inset-0 opacity-10 pointer-events-none -z-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: 'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
          </div>

          {/* Subtle Accent Line */}
          <div className="w-20 h-1 bg-red-500 mx-auto mb-8 rounded-sm" />
          
          {/* Icon Badge - Minimal */}
          <div className="inline-flex p-4 rounded-sm border border-red-500/30 bg-red-500/10 mb-6">
            <Shield className="w-12 h-12 text-red-500" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black mb-6 uppercase tracking-tight">
            <span className="text-white drop-shadow-[0_0_10px_rgba(239,68,68,0.2)]">
              Enterprise Cyber Security
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-slate-400 font-medium max-w-3xl mx-auto mb-8">
            Protect your digital assets with cutting-edge security solutions. 
            We safeguard businesses from evolving cyber threats with proactive defense strategies.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={Routes.CONTACT}>
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white rounded-sm font-bold uppercase tracking-wide border-none group transition-all" rightIcon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}>
                Get Protected Today
              </Button>
            </Link>
            <Link to={Routes.HOME}>
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/5 hover:border-white/40 rounded-sm font-bold uppercase tracking-wide transition-all">
                View All Services
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Section - Clean Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-24"
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

        {/* Threat Landscape Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Modern Threats"
            title="The Evolving Cyber Threat Landscape"
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
                      <h3 className="text-lg font-bold text-white uppercase tracking-tight group-hover:text-red-400 transition-colors">
                        {threat.title}
                      </h3>
                      <span className="px-2.5 py-1 rounded-sm text-xs font-mono font-bold border border-red-500/30 bg-red-500/10 text-red-400">
                        {threat.severity}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed">
                      {threat.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Protection Strategies Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Our Approach"
            title="Comprehensive Protection Strategies"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {protections.map((protection, idx) => (
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
                  <protection.icon className="w-6 h-6 text-slate-300 group-hover:text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-tight group-hover:text-red-400 relative z-10 transition-colors">
                  {protection.title}
                </h3>
                <p className="text-slate-400 font-medium text-sm leading-relaxed relative z-10">
                  {protection.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── Certification Roadmap ─── */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Career Path"
            title="Cyber Security Certification Roadmap"
            className="mb-4"
          />
          <p className="text-center text-slate-400 font-medium text-sm mb-16 max-w-2xl mx-auto">
            A structured progression from IT fundamentals to elite security specializations.
            Choose your track and climb from beginner to expert level.
          </p>

          {/* Track legend */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-12">
            {[
              { label: 'General / Foundation', color: 'bg-blue-500' },
              { label: 'Offensive / Red Team',  color: 'bg-red-500' },
              { label: 'Defensive / Blue Team', color: 'bg-emerald-500' },
              { label: 'Cloud Security',        color: 'bg-indigo-500' },
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
              levelColor: 'text-sky-400',
              levelBorder: 'border-sky-500/30',
              levelBg: 'bg-[#0f172a]',
              levelText: 'text-sky-400',
              desc: 'Build your IT & security foundation. No prior experience required.',
              certs: [
                { name: 'CompTIA ITF+',   org: 'CompTIA',   track: 'general',    desc: 'IT fundamentals for absolute beginners.' },
                { name: 'CompTIA A+',     org: 'CompTIA',   track: 'general',    desc: 'Hardware, OS, and troubleshooting essentials.' },
                { name: 'CompTIA Net+',   org: 'CompTIA',   track: 'general',    desc: 'Networking fundamentals: OSI, TCP/IP, routing.' },
                { name: 'AWS CLF-C02',    org: 'Amazon',    track: 'cloud',      desc: 'Foundational AWS cloud concepts & services.' },
                { name: 'AZ-900',         org: 'Microsoft', track: 'cloud',      desc: 'Azure cloud fundamentals & compliance basics.' },
              ],
            },
            {
              level: 'Intermediate',
              levelColor: 'text-yellow-400',
              levelBorder: 'border-yellow-500/30',
              levelBg: 'bg-[#0f172a]',
              levelText: 'text-yellow-400',
              desc: 'Core security certifications that open doors to most cyber roles.',
              certs: [
                { name: 'CompTIA Sec+',   org: 'CompTIA',          track: 'general',    desc: 'The baseline security cert. Required by DoD.' },
                { name: 'CompTIA CySA+',  org: 'CompTIA',          track: 'defensive',  desc: 'SOC analyst skills: SIEM, threat detection.' },
                { name: 'CompTIA PenTest+', org: 'CompTIA',        track: 'offensive',  desc: 'Pen testing methodology & vulnerability mgmt.' },
                { name: 'CEH',            org: 'EC-Council',       track: 'offensive',  desc: 'Certified Ethical Hacker — 20 attack domains.' },
                { name: 'eJPT',           org: 'INE',              track: 'offensive',  desc: 'Practical junior pen tester certification.' },
                { name: 'BTL1',           org: 'Security Blue Team', track: 'defensive', desc: 'IR, SIEM, forensics, phishing analysis.' },
                { name: 'SC-200',         org: 'Microsoft',        track: 'cloud',      desc: 'Security ops with Sentinel & Defender XDR.' },
                { name: 'AWS SAA',        org: 'Amazon',           track: 'cloud',      desc: 'Secure, scalable AWS architecture design.' },
              ],
            },
            {
              level: 'Advanced',
              levelColor: 'text-orange-400',
              levelBorder: 'border-orange-500/30',
              levelBg: 'bg-[#0f172a]',
              levelText: 'text-orange-400',
              desc: 'Specialized mastery for seasoned security professionals.',
              certs: [
                { name: 'OSCP',           org: 'Offensive Sec.',   track: 'offensive',  desc: '24h hands-on live pen testing exam. Gold standard.' },
                { name: 'GCIH',           org: 'GIAC',             track: 'defensive',  desc: 'Incident handling: forensics & malware analysis.' },
                { name: 'GCIA',           org: 'GIAC',             track: 'defensive',  desc: 'Intrusion analysis & deep packet inspection.' },
                { name: 'AWS Security',   org: 'Amazon',           track: 'cloud',      desc: 'Advanced AWS data protection & IR.' },
                { name: 'AZ-500',         org: 'Microsoft',        track: 'cloud',      desc: 'Azure security engineer — identity & data.' },
                { name: 'CompTIA CASP+',  org: 'CompTIA',          track: 'general',    desc: 'Advanced practitioner — security architecture.' },
              ],
            },
            {
              level: 'Expert',
              levelColor: 'text-red-500',
              levelBorder: 'border-red-500/30',
              levelBg: 'bg-[#0f172a]',
              levelText: 'text-red-500',
              desc: 'Elite certifications for senior architects, managers, and specialists.',
              certs: [
                { name: 'CISSP',          org: 'ISC²',             track: 'general',    desc: 'The gold standard for senior security pros.' },
                { name: 'CISM',           org: 'ISACA',            track: 'general',    desc: 'Security management & governance leadership.' },
                { name: 'OSED / OSEP',    org: 'Offensive Sec.',   track: 'offensive',  desc: 'Exploit Dev & advanced evasion techniques.' },
                { name: 'CCSP',           org: 'ISC²',             track: 'cloud',      desc: 'Premier cloud security professional cert.' },
                { name: 'SC-100',         org: 'Microsoft',        track: 'cloud',      desc: 'Cybersecurity architecture across MS stack.' },
              ],
            },
          ].map((row, rowIdx, arr) => {
            const trackStyle: Record<string, { bg: string; border: string; text: string; dot: string }> = {
              general:   { bg: 'bg-[#0f172a]',    border: 'border-blue-500/25',    text: 'text-white group-hover:text-blue-400',    dot: 'bg-blue-500' },
              offensive: { bg: 'bg-[#0f172a]',     border: 'border-red-500/25',     text: 'text-white group-hover:text-red-400',     dot: 'bg-red-500' },
              defensive: { bg: 'bg-[#0f172a]', border: 'border-emerald-500/25', text: 'text-white group-hover:text-emerald-400', dot: 'bg-emerald-500' },
              cloud:     { bg: 'bg-[#0f172a]',  border: 'border-indigo-500/25',  text: 'text-white group-hover:text-indigo-400',  dot: 'bg-indigo-500' },
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
                {/* Vertical connector to next level */}
                {!isLast && (
                  <div className="absolute left-[1.15rem] top-full w-px h-8 bg-white/10 z-10" />
                )}

                <div className={`flex gap-5 mb-8`}>
                  {/* Level badge column */}
                  <div className="flex flex-col items-center flex-shrink-0 pt-1">
                    <div className={`w-10 h-10 rounded-sm ${row.levelBg} border ${row.levelBorder} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                      <span className={`text-sm font-mono font-black ${row.levelText}`}>{rowIdx + 1}</span>
                    </div>
                  </div>

                  {/* Level content */}
                  <div className="flex-1 min-w-0">
                    {/* Level header */}
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className={`text-sm font-black uppercase tracking-widest ${row.levelColor}`}>
                        {row.level}
                      </span>
                      <span className="text-xs text-white/20">—</span>
                      <span className="text-xs font-medium text-slate-400">{row.desc}</span>
                    </div>

                    {/* Certs grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                      {row.certs.map((cert) => {
                        const ts = trackStyle[cert.track];
                        return (
                          <div
                            key={cert.name}
                            className={`group relative rounded-sm border ${ts.border} ${ts.bg} p-3 transition-colors duration-300 cursor-default hover:bg-[#0B1120]`}
                          >
                            {/* Track dot */}
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

          {/* Bottom note */}
          <p className="text-center text-slate-500 text-xs mt-4 font-mono">
            [SYSINFO] Hover over any certificate card to see a brief description.
          </p>
        </motion.div>

        {/* Cyber Security Services Listing Section */}
        <section className="relative z-10 py-16 sm:py-20 mb-12">
          {/* Subtle Grid Background for this section */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none rounded-sm bg-[#0a0f18] border border-white/5"
               style={{
                 backgroundImage: 'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)',
                 backgroundSize: '32px 32px'
               }}
          />
          <div className="relative z-10 px-4">
            <SectionTitle
              subtitle="Our Solutions"
              title="Tailored Cyber Security Services"
              className="mb-12"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {SERVICES_DATA.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section - Clean */}
        <motion.div
          className="border border-white/5 rounded-sm p-8 lg:p-12 mb-24 bg-[#0f172a] shadow-xl relative overflow-hidden"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Accent border top */}
          <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <h2 className="text-4xl font-black mb-6 text-white uppercase tracking-tight">
                Why Choose Neverland Studio?
              </h2>
              <div className="space-y-4">
                {[
                  'Certified security experts with 10+ years experience',
                  'Proven track record with 500+ successful projects',
                  '24/7 security operations center (SOC)',
                  'Compliance with international standards (ISO 27001, SOC 2)',
                  'Tailored solutions for your industry',
                  'Transparent reporting and continuous monitoring'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-lg font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-red-500/30 transition-all duration-300">
                <Award className="w-10 h-10 text-red-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">Certified Experts</h4>
                <p className="text-slate-500 text-xs font-mono">CISSP, CEH, OSCP certified</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-red-500/30 transition-all duration-300">
                <Clock className="w-10 h-10 text-red-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">24/7 Support</h4>
                <p className="text-slate-500 text-xs font-mono">Round-the-clock monitoring</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-red-500/30 transition-all duration-300">
                <TrendingUp className="w-10 h-10 text-red-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">Proven Results</h4>
                <p className="text-slate-500 text-xs font-mono">99.9% threat detection</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-red-500/30 transition-all duration-300">
                <Users className="w-10 h-10 text-red-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">150+ Clients</h4>
                <p className="text-slate-500 text-xs font-mono">Trusted by enterprises</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section - Ultra Clean */}
        <motion.div
          className="relative border border-white/10 rounded-sm p-12 lg:p-16 text-center bg-[#0f172a] shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Top Accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-red-500" />
          
          <div className="space-y-8 relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-red-500/30 bg-red-500/10">
              <Shield className="w-3.5 h-3.5 text-red-500" />
              <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest">Get Protected</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
                <span className="text-white">Ready to Secure</span>
                <br />
                <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                  Your Business?
                </span>
              </h2>
              <p className="text-base lg:text-lg text-slate-400 font-medium max-w-2xl mx-auto">
                Don't wait for a breach to happen. Contact us today for a free security assessment and discover how we can protect your digital assets.
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 py-4">
              <div className="w-12 h-px bg-red-500/30" />
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <div className="w-12 h-px bg-red-500/30" />
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to={Routes.CONTACT}>
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white rounded-sm px-8 font-bold uppercase tracking-wide border-none group transition-all" rightIcon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}>
                  Schedule Free Consultation
                </Button>
              </Link>
              <Link to={Routes.HOME}>
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/5 hover:border-white/40 rounded-sm font-bold uppercase tracking-wide transition-all text-slate-300">
                  Explore Our Services
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Defensive Corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-500/20 rounded-tl-sm pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-500/20 rounded-br-sm pointer-events-none" />
        </motion.div>
      </div>
    </div>
  );
}
