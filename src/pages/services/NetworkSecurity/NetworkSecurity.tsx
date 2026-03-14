import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Network, Shield, Eye, Lock, Activity,
  CheckCircle, ArrowRight, Award, Clock, TrendingUp, Users,
  Wifi, Server, Globe, Zap,
} from 'lucide-react';
import Button from '@components/atoms/Button';
import SectionTitle from '@components/molecules/SectionTitle';

import { Routes } from '@config/constants';
import { slideUp, staggerContainer, staggerItem, fadeIn } from '@utils/animations';

export default function NetworkSecurityPage() {
  const threats = [
    {
      icon: Globe,
      title: 'DDoS Attacks',
      description: 'Volumetric and protocol attacks that overwhelm network bandwidth and server resources.',
      badge: 'High',
    },
    {
      icon: Eye,
      title: 'Network Eavesdropping',
      description: 'Passive interception of unencrypted traffic to steal credentials and sensitive data.',
      badge: 'High',
    },
    {
      icon: Wifi,
      title: 'Rogue Access Points',
      description: 'Unauthorized wireless access points used to intercept traffic from legitimate users.',
      badge: 'Medium',
    },
    {
      icon: Server,
      title: 'Lateral Movement',
      description: 'Attackers pivoting through your network after initial compromise to reach critical assets.',
      badge: 'Critical',
    },
    {
      icon: Lock,
      title: 'Man-in-the-Middle',
      description: 'Interception of communications between systems to steal or manipulate transmitted data.',
      badge: 'High',
    },
    {
      icon: Zap,
      title: 'Zero-Day Network Exploits',
      description: 'Attacks leveraging unknown vulnerabilities in routers, switches, and network appliances.',
      badge: 'Critical',
    },
  ];

  const protections = [
    { icon: Shield,   title: 'Perimeter Defense',         description: 'Next-gen firewall and edge security protecting your network boundary from external threats.' },
    { icon: Eye,      title: 'Real-Time Monitoring',       description: '24/7 network traffic analysis detecting anomalies and threats before they cause damage.' },
    { icon: Lock,     title: 'End-to-End Encryption',      description: 'Protect data in transit with TLS, IPSec VPN, and encrypted tunnels across all connections.' },
    { icon: Network,  title: 'Network Segmentation',       description: 'Isolate critical systems with VLANs and micro-segmentation to limit blast radius of breaches.' },
    { icon: Activity, title: 'Intrusion Prevention (IPS)', description: 'Automatically detect and block malicious traffic patterns and attack signatures in real-time.' },
    { icon: Wifi,     title: 'Wireless Security',          description: 'Secure your Wi-Fi infrastructure with WPA3, rogue AP detection, and network access control.' },
    { icon: Globe,    title: 'DDoS Mitigation',            description: 'Multi-layer DDoS protection with traffic scrubbing to absorb and filter attack traffic.' },
    { icon: Zap,      title: 'Rapid Incident Response',    description: '< 15 minute response time with automated playbooks and expert containment procedures.' },
  ];

  const stats = [
    { value: '99.9%', label: 'Uptime Guarantee' },
    { value: '<15min', label: 'Response Time' },
    { value: '300+',  label: 'Networks Secured' },
    { value: '24/7',  label: 'SOC Monitoring' },
    { value: 'Zero',  label: 'Breaches Undetected' },
    { value: '10Gbps', label: 'DDoS Protection' },
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
            <Network className="w-12 h-12 text-red-500" />
          </div>
          <h1 className="text-5xl lg:text-6xl font-black mb-6 uppercase tracking-tight">
            <span className="text-white drop-shadow-[0_0_10px_rgba(239,68,68,0.2)]">
              Network Security
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-400 font-medium max-w-3xl mx-auto mb-8">
            Advanced network protection solutions to safeguard your infrastructure from unauthorized access,
            attacks, and data breaches — with 24/7 monitoring and rapid incident response.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={Routes.CONTACT}>
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white rounded-sm font-bold uppercase tracking-wide border-none group transition-all" rightIcon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}>
                Secure My Network
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

        {/* Threat Landscape */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Network Threats"
            title="Threats Targeting Your Network"
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
            title="Multi-Layer Network Defense"
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

        {/* ─── Network Security Certification Roadmap ─── */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Career Path"
            title="Network Security Certification Roadmap"
            className="mb-4"
          />
          <p className="text-center text-gray-400 text-sm mb-12 max-w-2xl mx-auto">
            A structured progression for network security engineers — from CompTIA fundamentals
            to elite Cisco CCIE and Zero Trust architecture certifications.
          </p>

          {/* Track legend */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
            {[
              { label: 'Foundation',          color: 'bg-blue-500' },
              { label: 'Network Security',     color: 'bg-red-500' },
              { label: 'Infrastructure',       color: 'bg-emerald-500' },
              { label: 'Wireless & Zero Trust',color: 'bg-purple-500' },
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
              desc: 'Build a solid networking and IT foundation before specializing.',
              certs: [
                { name: 'CompTIA ITF+',    org: 'CompTIA',   track: 'foundation',  desc: 'Absolute beginner IT fundamentals.' },
                { name: 'CompTIA A+',      org: 'CompTIA',   track: 'foundation',  desc: 'Hardware, OS, and troubleshooting essentials.' },
                { name: 'CompTIA Net+',    org: 'CompTIA',   track: 'foundation',  desc: 'OSI model, TCP/IP, routing, switching, firewalls.' },
                { name: 'CCNA',            org: 'Cisco',     track: 'foundation',  desc: 'Cisco routing, switching, VLANs, and basic security.' },
                { name: 'Juniper JNCIA',   org: 'Juniper',   track: 'infra',       desc: 'Juniper networking fundamentals and Junos OS basics.' },
              ],
            },
            {
              level: 'Intermediate',
              levelColor: 'from-amber-500 to-yellow-400',
              levelBorder: 'border-amber-500/30',
              levelBg: 'bg-amber-500/10',
              levelText: 'text-amber-300',
              desc: 'Core network security and vendor-specific certifications.',
              certs: [
                { name: 'CompTIA Sec+',    org: 'CompTIA',   track: 'foundation',  desc: 'Baseline security: firewalls, VPNs, cryptography, IDS/IPS.' },
                { name: 'CompTIA CySA+',   org: 'CompTIA',   track: 'security',    desc: 'SOC analyst skills: SIEM, traffic analysis, threat detection.' },
                { name: 'CEH',             org: 'EC-Council', track: 'security',   desc: 'Ethical hacking mindset for network penetration and defense.' },
                { name: 'NSE 4',           org: 'Fortinet',  track: 'security',    desc: 'FortiGate firewall, VPN, SD-WAN, and network threat protection.' },
                { name: 'Juniper JNCIS-SP',org: 'Juniper',   track: 'infra',       desc: 'MPLS, BGP routing policies, CoS on Juniper platforms.' },
                { name: 'CWNA',            org: 'CWNP',      track: 'wireless',    desc: 'Certified Wireless Network Administrator — WLAN essentials.' },
              ],
            },
            {
              level: 'Advanced',
              levelColor: 'from-orange-500 to-amber-500',
              levelBorder: 'border-orange-500/30',
              levelBg: 'bg-orange-500/10',
              levelText: 'text-orange-300',
              desc: 'Specialized Cisco/Juniper professional tracks and wireless security.',
              certs: [
                { name: 'CCNP Security',   org: 'Cisco',     track: 'security',    desc: 'Cisco firewall, VPN, IPS, and identity management.' },
                { name: 'CCNP Enterprise', org: 'Cisco',     track: 'infra',       desc: 'BGP, OSPF, EIGRP, SD-WAN, and network automation.' },
                { name: 'GCIA',            org: 'GIAC',      track: 'security',    desc: 'Deep packet inspection, traffic analysis, intrusion detection.' },
                { name: 'NSE 7',           org: 'Fortinet',  track: 'security',    desc: 'Advanced enterprise security with FortiGate & Fortinet fabric.' },
                { name: 'CWSP',            org: 'CWNP',      track: 'wireless',    desc: 'WPA3, 802.1X, RADIUS, rogue AP detection on enterprise WLANs.' },
                { name: 'ZTCA',            org: 'ZT Institute', track: 'wireless', desc: 'Zero Trust Certified Architect — design ZTA across enterprise.' },
              ],
            },
            {
              level: 'Expert',
              levelColor: 'from-rose-500 to-pink-500',
              levelBorder: 'border-rose-500/30',
              levelBg: 'bg-rose-500/10',
              levelText: 'text-rose-300',
              desc: 'Elite certifications for senior network architects and security leaders.',
              certs: [
                { name: 'CCIE Security',   org: 'Cisco',     track: 'security',    desc: 'Most prestigious Cisco cert — covers all enterprise security domains.' },
                { name: 'CCIE Enterprise', org: 'Cisco',     track: 'infra',       desc: 'Elite Cisco enterprise infrastructure: advanced routing, automation, SD-WAN.' },
                { name: 'CISSP',           org: 'ISC²',     track: 'foundation',  desc: 'Gold standard for senior security pros — covers network security in depth.' },
                { name: 'JNCIE-SP',        org: 'Juniper',   track: 'infra',       desc: 'Expert-level Juniper service provider networking certification.' },
                { name: 'CCDE',            org: 'Cisco',     track: 'infra',       desc: 'Cisco Certified Design Expert — strategic network design and architecture.' },
              ],
            },
          ].map((row, rowIdx, arr) => {
            const trackStyle: Record<string, { bg: string; border: string; text: string; dot: string }> = {
              foundation: { bg: 'bg-blue-500/10',   border: 'border-blue-500/25',   text: 'text-blue-300',   dot: 'bg-blue-500' },
              security:   { bg: 'bg-red-500/10',    border: 'border-red-500/25',    text: 'text-red-300',    dot: 'bg-red-500' },
              infra:      { bg: 'bg-emerald-500/10',border: 'border-emerald-500/25',text: 'text-emerald-300',dot: 'bg-emerald-500' },
              wireless:   { bg: 'bg-purple-500/10', border: 'border-purple-500/25', text: 'text-purple-300', dot: 'bg-purple-500' },
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
                  <div className="flex flex-col items-center flex-shrink-0 pt-1">
                    <div className={`w-10 h-10 rounded-sm ${row.levelBg} border ${row.levelBorder} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                      <span className={`text-sm font-mono font-black ${row.levelText}`}>{rowIdx + 1}</span>
                    </div>
                  </div>
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
              <h2 className="text-4xl font-black mb-6 text-white uppercase tracking-tight">Why Choose Our Network Security?</h2>
              <div className="space-y-4">
                {[
                  'Certified network security engineers (CCNP, CCIE, CEH)',
                  '24/7 Security Operations Center (SOC) with < 15min response',
                  'Complete multi-layer protection from perimeter to endpoint',
                  'DDoS mitigation up to 10 Gbps attack traffic',
                  'Network segmentation and zero-trust architecture',
                  'Transparent monthly reporting and continuous improvement',
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
                { icon: Award,      title: 'Certified Engineers', sub: 'CCNP, CCIE, CEH certified' },
                { icon: Clock,      title: '<15min Response',      sub: 'Round-the-clock SOC' },
                { icon: TrendingUp, title: '99.9% Uptime',         sub: 'Network reliability SLA' },
                { icon: Users,      title: '300+ Networks',         sub: 'Secured globally' },
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
              <Network className="w-3.5 h-3.5 text-red-500" />
              <span className="text-xs font-bold text-red-400 uppercase tracking-widest">Get Protected</span>
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
                <span className="text-white">Ready to Secure</span>
                <br />
                <span className="text-red-500">
                  Your Network?
                </span>
              </h2>
              <p className="text-base lg:text-lg text-slate-400 font-medium max-w-2xl mx-auto">
                Get a free network security assessment and discover exactly how we can protect your infrastructure from modern threats.
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
                  Schedule Free Assessment
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
