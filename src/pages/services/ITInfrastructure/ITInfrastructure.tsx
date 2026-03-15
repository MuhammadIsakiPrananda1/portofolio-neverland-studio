import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Server, Network, Database, Layers, Activity, Shield, Zap, CheckCircle, ArrowRight, Award, Clock, TrendingUp } from 'lucide-react';
import SectionTitle from '@components/molecules/SectionTitle';
import { Routes } from '@config/constants';

export default function ITInfrastructurePage() {
  const stats = [
    { value: '99.9%', label: 'Infrastructure Uptime' },
    { value: '500+', label: 'Systems Managed' },
    { value: '<30min', label: 'Response Time' },
    { value: '24/7', label: 'Support & Monitoring' },
  ];

  const services = [
    {
      icon: Server,
      title: 'Server Management',
      description: 'Enterprise server deployment, configuration, and 24/7 management.',
      path: '/services/server-management',
    },
    {
      icon: Network,
      title: 'Network Infrastructure',
      description: 'Design and implement secure, scalable network architectures.',
      path: '/services/network-infrastructure',
    },
    {
      icon: Database,
      title: 'Storage Solutions',
      description: 'SAN, NAS, and cloud storage with high availability and backup.',
      path: '/services/storage-solutions',
    },
    {
      icon: Layers,
      title: 'Virtualization',
      description: 'VMware, Hyper-V, and container platforms for resource optimization.',
      path: '/services/virtualization',
    },
    {
      icon: Activity,
      title: 'Monitoring & Maintenance',
      description: 'Proactive 24/7 monitoring and preventive maintenance services.',
      path: '/services/monitoring-maintenance',
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      description: 'Infrastructure security hardening and compliance management.',
      path: '#',
    },
  ];

  const features = [
    {
      icon: Zap,
      title: 'High Performance',
      description: 'Optimized infrastructure for maximum performance and minimal latency.',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Multi-layered security with encryption, firewalls, and access controls.',
    },
    {
      icon: Layers,
      title: 'Scalable Architecture',
      description: 'Infrastructure that grows seamlessly with your business needs.',
    },
    {
      icon: CheckCircle,
      title: 'Disaster Recovery',
      description: 'Comprehensive backup and disaster recovery planning and implementation.',
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
          <div className="w-20 h-1 bg-sky-500 mx-auto mb-8 rounded-sm" />
          
          {/* Icon Badge */}
          <div className="inline-flex p-4 rounded-sm border border-sky-500/30 bg-sky-500/10 mb-6">
            <Server className="w-12 h-12 text-sky-500" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6 text-white drop-shadow-[0_0_10px_rgba(14,165,233,0.2)]">
            IT Infrastructure
          </h1>
          
          <p className="text-lg lg:text-xl text-slate-400 font-medium max-w-3xl mx-auto mb-8">
            Build and maintain robust, scalable IT infrastructure with enterprise-grade reliability, security, 
            and performance. From design to ongoing management.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={Routes.CONTACT}>
              <button className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white rounded-sm font-bold uppercase tracking-wide px-6 py-3 border-none group transition-all">
                Get Started Today
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link to={Routes.HOME}>
              <button className="inline-flex items-center gap-2 border border-white/20 text-white hover:bg-white/5 hover:border-white/40 rounded-sm font-bold uppercase tracking-wide px-6 py-3 transition-all">
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
              className="relative rounded-sm p-6 text-center border border-white/5 hover:border-sky-500/50 transition-all duration-300 bg-[#0f172a] shadow-sm group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="text-3xl lg:text-4xl font-black font-mono text-white group-hover:text-sky-400 transition-colors mb-2">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                {stat.label}
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-sky-500 group-hover:w-full transition-all duration-500" />
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
            subtitle="Our IT Infrastructure Services"
            title="Comprehensive Infrastructure Solutions"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <Link key={idx} to={service.path}>
                <motion.div
                  className="relative rounded-sm p-6 border border-white/5 bg-[#0f172a] hover:border-sky-500/50 transition-all duration-300 group h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="inline-flex p-3 rounded-sm bg-[#0B1120] border border-white/10 mb-4">
                    <service.icon className="w-6 h-6 text-sky-500" />
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-tight text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 font-medium text-sm leading-relaxed mb-3">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 text-sky-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.div>
              </Link>
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
            title="Enterprise-Grade Infrastructure Features"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-sm p-6 border border-white/5 border-l-2 border-l-sky-500/30 bg-[#0f172a] hover:bg-[#0B1120] transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2.5 rounded-sm bg-[#0B1120] border border-white/10">
                    <feature.icon className="w-5 h-5 text-sky-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-black uppercase tracking-tight text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 font-medium text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Infrastructure Stack Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Technology Stack"
            title="Complete Infrastructure Components"
            className="mb-12"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Server, title: 'Physical Servers', desc: 'Enterprise hardware' },
              { icon: Layers, title: 'Virtualization', desc: 'VMware, Hyper-V' },
              { icon: Network, title: 'Networking', desc: 'Switches, routers' },
              { icon: Database, title: 'Storage', desc: 'SAN, NAS, cloud' },
            ].map((component, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-sm p-5 text-center border border-white/5 bg-[#0f172a] hover:border-sky-500/30 transition-all duration-300 group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-sm bg-[#0B1120] border border-white/10 flex items-center justify-center">
                  <component.icon className="w-6 h-6 text-sky-500" />
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight text-white mb-1">{component.title}</h3>
                <p className="text-slate-500 font-mono text-xs">{component.desc}</p>
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
          <div className="absolute top-0 left-0 w-full h-1 bg-sky-500" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tight mb-6 text-white">
                Why Choose Our IT Infrastructure Services?
              </h2>
              <div className="space-y-4">
                {[
                  '99.9% infrastructure uptime guarantee',
                  'Certified infrastructure engineers',
                  'Scalable solutions for any business size',
                  '24/7 monitoring and support',
                  'Future-proof technology stack',
                  'Comprehensive disaster recovery planning'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-sky-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 font-medium text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-sky-500/30 transition-colors duration-300">
                <Award className="w-10 h-10 text-sky-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">Expert Team</h4>
                <p className="text-slate-500 font-mono text-xs">Certified engineers</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-sky-500/30 transition-colors duration-300">
                <Clock className="w-10 h-10 text-sky-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">&lt;30 Minutes</h4>
                <p className="text-slate-500 font-mono text-xs">Response time</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-sky-500/30 transition-colors duration-300">
                <Server className="w-10 h-10 text-sky-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">500+ Systems</h4>
                <p className="text-slate-500 font-mono text-xs">Under management</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-sky-500/30 transition-colors duration-300">
                <TrendingUp className="w-10 h-10 text-sky-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">99.9% Uptime</h4>
                <p className="text-slate-500 font-mono text-xs">Guaranteed SLA</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── IT Infrastructure Certification Roadmap ─── */}
        <motion.div className="mb-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <SectionTitle subtitle="Career Path" title="IT Infrastructure Certification Roadmap" className="mb-4" />
          <p className="text-center text-gray-400 text-sm mb-12 max-w-2xl mx-auto">
            From IT support to enterprise infrastructure architect — structured certifications for infrastructure professionals.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
            {[{ label: 'Networking', color: 'bg-blue-500' }, { label: 'Server / OS', color: 'bg-amber-500' }, { label: 'Virtualization', color: 'bg-emerald-500' }, { label: 'Security', color: 'bg-red-500' }].map(t => (
              <div key={t.label} className="flex items-center gap-2"><div className={`w-3 h-3 rounded-sm ${t.color}`} /><span className="text-xs text-gray-400">{t.label}</span></div>
            ))}
          </div>
          {[
            { level: 'Beginner', levelColor: 'from-sky-500 to-cyan-400', levelBorder: 'border-sky-500/30', levelBg: 'bg-sky-500/10', levelText: 'text-sky-300', desc: 'IT support, networking basics, and OS fundamentals.',
              certs: [
                { name: 'CompTIA A+',     org: 'CompTIA',   track: 'server', desc: 'IT technician fundamentals — hardware, peripherals, and OS basics.' },
                { name: 'CompTIA Net+',   org: 'CompTIA',   track: 'network', desc: 'CompTIA Network+ — TCP/IP, routing, switching essentials.' },
                { name: 'CompTIA Linux+', org: 'CompTIA',   track: 'server', desc: 'Linux administration — server OS foundation.' },
                { name: 'AWS CLF-C02',   org: 'Amazon',    track: 'virt',   desc: 'Cloud Practitioner — understand hybrid infrastructure basics.' },
              ]},
            { level: 'Intermediate', levelColor: 'from-amber-500 to-yellow-400', levelBorder: 'border-amber-500/30', levelBg: 'bg-amber-500/10', levelText: 'text-amber-300', desc: 'Advanced networking, server admin, and virtualization.',
              certs: [
                { name: 'CCNA',          org: 'Cisco',     track: 'network', desc: 'Cisco Certified Network Associate — enterprise network design and config.' },
                { name: 'RHCSA',         org: 'Red Hat',   track: 'server', desc: 'Red Hat Certified System Admin — Linux server administration.' },
                { name: 'VMware VCP',    org: 'VMware',    track: 'virt',   desc: 'vSphere Foundation — VMware virtualization and vCenter management.' },
                { name: 'AZ-104',        org: 'Microsoft', track: 'server', desc: 'Azure Administrator — hybrid cloud and Windows Server management.' },
                { name: 'CompTIA Sec+',  org: 'CompTIA',   track: 'security', desc: 'Security+ — infrastructure security fundamentals and hardening.' },
              ]},
            { level: 'Advanced', levelColor: 'from-orange-500 to-amber-500', levelBorder: 'border-orange-500/30', levelBg: 'bg-orange-500/10', levelText: 'text-orange-300', desc: 'Enterprise architecture, Kubernetes, and advanced security.',
              certs: [
                { name: 'CCNP Ent.',     org: 'Cisco',     track: 'network', desc: 'CCNP Enterprise — advanced routing, SD-WAN, and network design.' },
                { name: 'RHCE',          org: 'Red Hat',   track: 'server', desc: 'Red Hat Certified Engineer — advanced Linux automation with Ansible.' },
                { name: 'VMware VCAP',   org: 'VMware',    track: 'virt',   desc: 'vSphere Advanced — enterprise VMware design and deployment.' },
                { name: 'CKA',           org: 'CNCF',      track: 'virt',   desc: 'Certified Kubernetes Admin — container-based infrastructure mgmt.' },
              ]},
            { level: 'Expert', levelColor: 'from-rose-500 to-pink-500', levelBorder: 'border-rose-500/30', levelBg: 'bg-rose-500/10', levelText: 'text-rose-300', desc: 'Enterprise architecture, network security, and leadership.',
              certs: [
                { name: 'CCIE Ent.',     org: 'Cisco',     track: 'network', desc: 'CCIE Enterprise Infrastructure — top-level Cisco expert certification.' },
                { name: 'CISSP',         org: 'ISC²',      track: 'security', desc: 'Certified Information Systems Security Professional — gold standard.' },
                { name: 'VMware VCIX',   org: 'VMware',    track: 'virt',   desc: 'VCIX-NV — NSX expert for software-defined networking (SDN).' },
                { name: 'AWS SAP-C02',   org: 'Amazon',    track: 'server', desc: 'Solutions Architect Pro — enterprise hybrid cloud architectures.' },
              ]},
          ].map((row, rowIdx, arr) => {
            const ts: Record<string, { bg: string; border: string; text: string; dot: string }> = {
              network:  { bg: 'bg-blue-500/10',   border: 'border-blue-500/25',   text: 'text-blue-300',   dot: 'bg-blue-500' },
              server:   { bg: 'bg-amber-500/10',  border: 'border-amber-500/25',  text: 'text-amber-300',  dot: 'bg-amber-500' },
              virt:     { bg: 'bg-emerald-500/10',border: 'border-emerald-500/25',text: 'text-emerald-300',dot: 'bg-emerald-500' },
              security: { bg: 'bg-red-500/10',    border: 'border-red-500/25',    text: 'text-red-300',    dot: 'bg-red-500' },
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
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-sky-500" />
          
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-sky-500/30 bg-sky-500/10">
              <Server className="w-3.5 h-3.5 text-sky-500" />
              <span className="text-xs font-semibold text-sky-400 uppercase tracking-widest">IT Infrastructure</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
                <span className="text-white">Build Your Foundation</span>
                <br />
                <span className="text-sky-500">For Digital Success</span>
              </h2>
              <p className="text-base lg:text-lg text-slate-400 font-medium max-w-2xl mx-auto">
                Let us help you design, deploy, and manage enterprise-grade IT infrastructure tailored to your business needs.
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 py-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/10" />
              <div className="w-1.5 h-1.5 rounded-sm bg-sky-500/50" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/10" />
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to={Routes.CONTACT}>
                <button className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white rounded-sm font-bold uppercase tracking-wide px-6 py-3 border-none group transition-all">
                  Schedule a Consultation
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link to={Routes.HOME}>
                <button className="inline-flex items-center gap-2 border border-white/20 text-white hover:bg-white/5 hover:border-white/40 rounded-sm font-bold uppercase tracking-wide px-6 py-3 transition-all">
                  Explore All Services
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
