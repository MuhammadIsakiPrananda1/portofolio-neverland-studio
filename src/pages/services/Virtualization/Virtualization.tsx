import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layers, Server, Cloud, Cpu, Zap, Box, ArrowRight, Award, Clock, TrendingUp, CheckCircle } from 'lucide-react';
import SectionTitle from '@components/molecules/SectionTitle';
import { Routes } from '@config/constants';

export default function VirtualizationPage() {
  const stats = [
    { value: '70%', label: 'Cost Reduction' },
    { value: '500+', label: 'VMs Deployed' },
    { value: '99.9%', label: 'VM Uptime' },
    { value: '24/7', label: 'Management' },
  ];

  const services = [
    {
      icon: Server,
      title: 'Server Virtualization',
      description: 'VMware vSphere and Hyper-V enterprise virtualization platforms.',
    },
    {
      icon: Box,
      title: 'Containerization',
      description: 'Docker and Kubernetes container platforms for modern applications.',
    },
    {
      icon: Cloud,
      title: 'Desktop Virtualization',
      description: 'VDI solutions for secure and flexible remote desktop access.',
    },
    {
      icon: Layers,
      title: 'VM Management',
      description: 'Centralized management and monitoring of virtual infrastructure.',
    },
  ];

  const features = [
    {
      icon: Cpu,
      title: 'Resource Optimization',
      description: 'Dynamic resource allocation and load balancing for maximum efficiency.',
    },
    {
      icon: Zap,
      title: 'High Availability',
      description: 'Clustering and failover capabilities for zero-downtime infrastructure.',
    },
    {
      icon: Server,
      title: 'Live Migration',
      description: 'Move virtual machines between hosts without service interruption.',
    },
    {
      icon: Cloud,
      title: 'Snapshot & Backup',
      description: 'Instant snapshots and automated backup for quick recovery.',
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
            <Layers className="w-12 h-12 text-sky-500" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6 text-white drop-shadow-[0_0_10px_rgba(14,165,233,0.2)]">
            Virtualization
          </h1>
          
          <p className="text-lg lg:text-xl text-slate-400 font-medium max-w-3xl mx-auto mb-8">
            Maximize resource utilization and reduce costs with enterprise virtualization solutions including 
            VMware, Hyper-V, and containerization technologies.
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
            subtitle="What We Offer"
            title="Comprehensive Virtualization Services"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-sm p-6 border border-white/5 bg-[#0f172a] hover:border-sky-500/50 transition-all duration-300 group"
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
            subtitle="Advanced Capabilities"
            title="Enterprise-Grade Virtualization Features"
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

        {/* Technologies Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Supported Platforms"
            title="Virtualization Technologies"
            className="mb-12"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Server, title: 'VMware vSphere', desc: 'Enterprise virtualization' },
              { icon: Cloud, title: 'Microsoft Hyper-V', desc: 'Windows virtualization' },
              { icon: Box, title: 'Docker', desc: 'Container platform' },
              { icon: Layers, title: 'Kubernetes', desc: 'Container orchestration' },
            ].map((tech, idx) => (
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
                  <tech.icon className="w-6 h-6 text-sky-500" />
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight text-white mb-1">{tech.title}</h3>
                <p className="text-slate-500 font-mono text-xs">{tech.desc}</p>
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
                Why Choose Our Virtualization Solutions?
              </h2>
              <div className="space-y-4">
                {[
                  'Reduce hardware costs by up to 70%',
                  'VMware and Microsoft certified engineers',
                  'Rapid VM deployment in minutes',
                  'High availability with automated failover',
                  'Simplified backup and disaster recovery',
                  'Efficient resource utilization and scaling'
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
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">Certified Team</h4>
                <p className="text-slate-500 font-mono text-xs">VMware &amp; Hyper-V</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-sky-500/30 transition-colors duration-300">
                <Clock className="w-10 h-10 text-sky-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">Rapid Deploy</h4>
                <p className="text-slate-500 font-mono text-xs">Minutes not weeks</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-sky-500/30 transition-colors duration-300">
                <Layers className="w-10 h-10 text-sky-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">500+ VMs</h4>
                <p className="text-slate-500 font-mono text-xs">Successfully deployed</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-sky-500/30 transition-colors duration-300">
                <TrendingUp className="w-10 h-10 text-sky-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">70% Savings</h4>
                <p className="text-slate-500 font-mono text-xs">Cost reduction</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Virtualization Certification Roadmap ─── */}
        <motion.div className="mb-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <SectionTitle subtitle="Career Path" title="Virtualization Certification Roadmap" className="mb-4" />
          <p className="text-center text-gray-400 text-sm mb-12 max-w-2xl mx-auto">
            From server fundamentals to expert virtualization architect — certifications for platform engineers.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
            {[{ label: 'VMware', color: 'bg-blue-500' }, { label: 'Kubernetes / Containers', color: 'bg-amber-500' }, { label: 'Cloud / HCI', color: 'bg-emerald-500' }, { label: 'VDI / Advanced', color: 'bg-purple-500' }].map(t => (
              <div key={t.label} className="flex items-center gap-2"><div className={`w-3 h-3 rounded-sm ${t.color}`} /><span className="text-xs text-gray-400">{t.label}</span></div>
            ))}
          </div>
          {[
            { level: 'Beginner', levelColor: 'from-sky-500 to-cyan-400', levelBorder: 'border-sky-500/30', levelBg: 'bg-sky-500/10', levelText: 'text-sky-300', desc: 'Virtualization fundamentals and entry-level certifications.',
              certs: [
                { name: 'CompTIA A+',     org: 'CompTIA',  track: 'vmware',  desc: 'IT Support — hardware and OS fundamentals for virtual environments.' },
                { name: 'CompTIA Server+',org: 'CompTIA',  track: 'vmware',  desc: 'Server+ — physical/virtual server fundamentals and RAID.' },
                { name: 'AWS CLF-C02',   org: 'Amazon',   track: 'cloud',   desc: 'Cloud Practitioner — cloud compute and virtualization concepts.' },
                { name: 'Nutanix NCA',   org: 'Nutanix',  track: 'hci',     desc: 'Nutanix Certified Associate — HCI and hyperconverged basics.' },
              ]},
            { level: 'Intermediate', levelColor: 'from-amber-500 to-yellow-400', levelBorder: 'border-amber-500/30', levelBg: 'bg-amber-500/10', levelText: 'text-amber-300', desc: 'VMware vSphere, Hyper-V, Docker administration.',
              certs: [
                { name: 'VCP-DCV',       org: 'VMware',   track: 'vmware',  desc: 'vSphere Foundations — vCenter, ESXi, HA/DRS/vMotion.' },
                { name: 'AZ-104',        org: 'Microsoft',track: 'cloud',   desc: 'Azure Admin — Azure VMs, Hyper-V, and virtual networking.' },
                { name: 'Docker DCA',    org: 'Docker',   track: 'k8s',     desc: 'Docker Certified Associate — container platform operations.' },
                { name: 'CKA',           org: 'CNCF',     track: 'k8s',     desc: 'Kubernetes Administrator — cluster ops, scheduling, storage.' },
              ]},
            { level: 'Advanced', levelColor: 'from-orange-500 to-amber-500', levelBorder: 'border-orange-500/30', levelBg: 'bg-orange-500/10', levelText: 'text-orange-300', desc: 'Advanced VMware, VDI, SDN, and cloud-hybrid virtualization.',
              certs: [
                { name: 'VCAP-DCV Design',org: 'VMware',  track: 'vmware',  desc: 'vSphere Advanced Design — design complex vSphere environments.' },
                { name: 'VCP-DTM',       org: 'VMware',   track: 'vdi',     desc: 'Horizon Desktop & Mobility — enterprise VDI implementation.' },
                { name: 'VMware NSX DCO',org: 'VMware',   track: 'vmware',  desc: 'NSX Data Center Operations — SDN and micro-segmentation.' },
                { name: 'Nutanix NCP-MCI',org: 'Nutanix', track: 'hci',     desc: 'NCP Multicloud Infrastructure — advanced HCI and cloud design.' },
              ]},
            { level: 'Expert', levelColor: 'from-rose-500 to-pink-500', levelBorder: 'border-rose-500/30', levelBg: 'bg-rose-500/10', levelText: 'text-rose-300', desc: 'VCDX architect, cloud-native platform engineering lead.',
              certs: [
                { name: 'VCDX-DCV',      org: 'VMware',   track: 'vmware',  desc: 'VMware Certified Design Expert — elite enterprise virtualization architect.' },
                { name: 'VCDX-DTM',      org: 'VMware',   track: 'vdi',     desc: 'VCDX Desktop — expert-level VDI architecture at enterprise scale.' },
                { name: 'CKS',           org: 'CNCF',     track: 'k8s',     desc: 'Kubernetes Security Specialist — secure and hardened cluster design.' },
                { name: 'AWS SAP-C02',   org: 'Amazon',   track: 'cloud',   desc: 'Solutions Architect Pro — architect cloud-native hybrid virtualization.' },
              ]},
          ].map((row, rowIdx, arr) => {
            const ts: Record<string, { bg: string; border: string; text: string; dot: string }> = {
              vmware: { bg: 'bg-blue-500/10',   border: 'border-blue-500/25',   text: 'text-blue-300',   dot: 'bg-blue-500' },
              k8s:    { bg: 'bg-amber-500/10',  border: 'border-amber-500/25',  text: 'text-amber-300',  dot: 'bg-amber-500' },
              cloud:  { bg: 'bg-emerald-500/10',border: 'border-emerald-500/25',text: 'text-emerald-300',dot: 'bg-emerald-500' },
              vdi:    { bg: 'bg-purple-500/10', border: 'border-purple-500/25', text: 'text-purple-300', dot: 'bg-purple-500' },
              hci:    { bg: 'bg-emerald-500/10',border: 'border-emerald-500/25',text: 'text-emerald-300',dot: 'bg-emerald-500' },
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
              <Layers className="w-3.5 h-3.5 text-sky-500" />
              <span className="text-xs font-semibold text-sky-400 uppercase tracking-widest">Virtualization</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
                <span className="text-white">Transform Your Infrastructure</span>
                <br />
                <span className="text-sky-500">with Virtualization</span>
              </h2>
              <p className="text-base lg:text-lg text-slate-400 font-medium max-w-2xl mx-auto">
                Reduce costs, improve efficiency, and increase agility with our virtualization solutions.
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
                  Start Your Virtualization Journey
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link to={Routes.HOME}>
                <button className="inline-flex items-center gap-2 border border-white/20 text-white hover:bg-white/5 hover:border-white/40 rounded-sm font-bold uppercase tracking-wide px-6 py-3 transition-all">
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
