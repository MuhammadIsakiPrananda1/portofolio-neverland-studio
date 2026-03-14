import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Database, HardDrive, Cloud, Shield, Zap, Archive, ArrowRight, Award, Clock, TrendingUp, CheckCircle } from 'lucide-react';
import SectionTitle from '@components/molecules/SectionTitle';
import { Routes } from '@config/constants';

export default function StorageSolutionsPage() {
  const stats = [
    { value: '10PB+', label: 'Storage Managed' },
    { value: '99.999%', label: 'Data Availability' },
    { value: '100+', label: 'Storage Systems' },
    { value: '24/7', label: 'Support' },
  ];

  const services = [
    {
      icon: HardDrive,
      title: 'SAN/NAS Solutions',
      description: 'High-performance storage area network and network-attached storage solutions.',
    },
    {
      icon: Cloud,
      title: 'Cloud Storage',
      description: 'Scalable cloud storage integration with AWS, Azure, and Google Cloud.',
    },
    {
      icon: Archive,
      title: 'Backup & Recovery',
      description: 'Automated backup solutions with rapid recovery capabilities.',
    },
    {
      icon: Shield,
      title: 'Data Protection',
      description: 'Multi-layer data protection with encryption and redundancy.',
    },
  ];

  const features = [
    {
      icon: Database,
      title: 'Storage Tiering',
      description: 'Intelligent data tiering to optimize performance and reduce costs across storage tiers.',
    },
    {
      icon: Zap,
      title: 'Deduplication',
      description: 'Advanced data deduplication and compression to maximize storage efficiency.',
    },
    {
      icon: Shield,
      title: 'RAID Configuration',
      description: 'Enterprise RAID configurations for data redundancy and high availability.',
    },
    {
      icon: Archive,
      title: 'Disaster Recovery',
      description: 'Comprehensive disaster recovery planning with automated failover capabilities.',
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
            <Database className="w-12 h-12 text-sky-500" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6 text-white drop-shadow-[0_0_10px_rgba(14,165,233,0.2)]">
            Storage Solutions
          </h1>
          
          <p className="text-lg lg:text-xl text-slate-400 font-medium max-w-3xl mx-auto mb-8">
            Comprehensive storage solutions for your data needs, from high-performance SAN/NAS to cloud storage 
            with backup and disaster recovery capabilities.
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
            title="Comprehensive Storage Services"
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
            title="Enterprise-Grade Storage Features"
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

        {/* Storage Types Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Storage Options"
            title="Enterprise Storage Solutions"
            className="mb-12"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: HardDrive, title: 'SAN Storage', desc: 'High-performance block storage' },
              { icon: Database, title: 'NAS Storage', desc: 'File-level network storage' },
              { icon: Cloud, title: 'Cloud Storage', desc: 'Scalable cloud-based storage' },
              { icon: Archive, title: 'Backup Systems', desc: 'Automated backup solutions' },
            ].map((type, idx) => (
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
                  <type.icon className="w-6 h-6 text-sky-500" />
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight text-white mb-1">{type.title}</h3>
                <p className="text-slate-500 font-mono text-xs">{type.desc}</p>
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
                Why Choose Our Storage Solutions?
              </h2>
              <div className="space-y-4">
                {[
                  '99.999% data availability guarantee',
                  'Enterprise-grade SAN/NAS hardware',
                  'Automated backup and disaster recovery',
                  'Data deduplication saves up to 80% space',
                  '24/7 monitoring and technical support',
                  'Flexible scaling from TB to PB'
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
                <p className="text-slate-500 font-mono text-xs">Storage experts</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-sky-500/30 transition-colors duration-300">
                <Clock className="w-10 h-10 text-sky-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">24/7 Support</h4>
                <p className="text-slate-500 font-mono text-xs">Always available</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-sky-500/30 transition-colors duration-300">
                <Database className="w-10 h-10 text-sky-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">10PB+ Managed</h4>
                <p className="text-slate-500 font-mono text-xs">Storage capacity</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-sky-500/30 transition-colors duration-300">
                <TrendingUp className="w-10 h-10 text-sky-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">99.999% SLA</h4>
                <p className="text-slate-500 font-mono text-xs">Data availability</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Storage Solutions Certification Roadmap ─── */}
        <motion.div className="mb-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <SectionTitle subtitle="Career Path" title="Storage Solutions Certification Roadmap" className="mb-4" />
          <p className="text-center text-gray-400 text-sm mb-12 max-w-2xl mx-auto">
            From storage fundamentals to expert data architect — certifications for storage and data professionals.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
            {[{ label: 'Storage Admin', color: 'bg-blue-500' }, { label: 'Backup / DR', color: 'bg-red-500' }, { label: 'Cloud Storage', color: 'bg-amber-500' }, { label: 'Data Architecture', color: 'bg-purple-500' }].map(t => (
              <div key={t.label} className="flex items-center gap-2"><div className={`w-3 h-3 rounded-sm ${t.color}`} /><span className="text-xs text-gray-400">{t.label}</span></div>
            ))}
          </div>
          {[
            { level: 'Beginner', levelColor: 'from-sky-500 to-cyan-400', levelBorder: 'border-sky-500/30', levelBg: 'bg-sky-500/10', levelText: 'text-sky-300', desc: 'Storage fundamentals, networking, and basic administration.',
              certs: [
                { name: 'CompTIA A+',    org: 'CompTIA',  track: 'storage', desc: 'IT fundamentals — storage hardware, RAID, and OS storage basics.' },
                { name: 'CompTIA Net+',  org: 'CompTIA',  track: 'storage', desc: 'Networking — understand SAN/NAS network connectivity basics.' },
                { name: 'AWS CLF-C02',  org: 'Amazon',   track: 'cloud',   desc: 'Cloud Practitioner — S3, EBS, EFS and cloud storage concepts.' },
                { name: 'Linux LPIC-1', org: 'LPI',      track: 'storage', desc: 'Linux Admin Level 1 — file systems, LVM, and storage management.' },
              ]},
            { level: 'Intermediate', levelColor: 'from-amber-500 to-yellow-400', levelBorder: 'border-amber-500/30', levelBg: 'bg-amber-500/10', levelText: 'text-amber-300', desc: 'SAN/NAS administration, backup solutions, and cloud storage.',
              certs: [
                { name: 'AWS SysOps',   org: 'Amazon',   track: 'cloud',   desc: 'SysOps — manage and monitor AWS storage services at scale.' },
                { name: 'NetApp NCDA',  org: 'NetApp',   track: 'storage', desc: 'NetApp Certified Data Administrator — ONTAP storage management.' },
                { name: 'Veeam VMCA',   org: 'Veeam',   track: 'backup',  desc: 'Veeam Certified Architect — backup and DR infrastructure design.' },
                { name: 'HPE ASE Stor.',org: 'HPE',      track: 'storage', desc: 'HPE ASE Storage Solutions — enterprise SAN/NAS design.' },
              ]},
            { level: 'Advanced', levelColor: 'from-orange-500 to-amber-500', levelBorder: 'border-orange-500/30', levelBg: 'bg-orange-500/10', levelText: 'text-orange-300', desc: 'Enterprise storage architecture, disaster recovery, and data management.',
              certs: [
                { name: 'AWS SAA-C03',  org: 'Amazon',   track: 'cloud',   desc: 'Solutions Architect — architect scalable cloud storage solutions.' },
                { name: 'NetApp NCIE',  org: 'NetApp',   track: 'storage', desc: 'NetApp Infrastructure Expert — expert-level NetApp systems.' },
                { name: 'EMC DECS-TA', org: 'Dell/EMC', track: 'backup',  desc: 'Data Center Expert — enterprise storage deployment specialist.' },
                { name: 'Terraform Assc',org: 'HashiCorp',track: 'cloud',  desc: 'Terraform — automate cloud storage provisioning with IaC.' },
              ]},
            { level: 'Expert', levelColor: 'from-rose-500 to-pink-500', levelBorder: 'border-rose-500/30', levelBg: 'bg-rose-500/10', levelText: 'text-rose-300', desc: 'Data architect, enterprise storage design, and cloud-native data platforms.',
              certs: [
                { name: 'AWS SAP-C02',  org: 'Amazon',   track: 'cloud',   desc: 'Solutions Architect Pro — enterprise multi-PB cloud storage design.' },
                { name: 'Google ProDE', org: 'Google',   track: 'arch',    desc: 'Professional Data Engineer — data pipelines + cloud storage mastery.' },
                { name: 'CDMP',         org: 'DAMA',     track: 'arch',    desc: 'Certified Data Management Professional — enterprise data governance.' },
                { name: 'CISSP',        org: 'ISC²',     track: 'backup',  desc: 'CISSP — data security, encryption, and storage compliance leadership.' },
              ]},
          ].map((row, rowIdx, arr) => {
            const ts: Record<string, { bg: string; border: string; text: string; dot: string }> = {
              storage: { bg: 'bg-blue-500/10',   border: 'border-blue-500/25',   text: 'text-blue-300',   dot: 'bg-blue-500' },
              backup:  { bg: 'bg-red-500/10',    border: 'border-red-500/25',    text: 'text-red-300',    dot: 'bg-red-500' },
              cloud:   { bg: 'bg-amber-500/10',  border: 'border-amber-500/25',  text: 'text-amber-300',  dot: 'bg-amber-500' },
              arch:    { bg: 'bg-purple-500/10', border: 'border-purple-500/25', text: 'text-purple-300', dot: 'bg-purple-500' },
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
              <Database className="w-3.5 h-3.5 text-sky-500" />
              <span className="text-xs font-semibold text-sky-400 uppercase tracking-widest">Storage Solutions</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
                <span className="text-white">Secure Your Data with</span>
                <br />
                <span className="text-sky-500">Reliable Storage</span>
              </h2>
              <p className="text-base lg:text-lg text-slate-400 font-medium max-w-2xl mx-auto">
                Implement enterprise-grade storage solutions tailored to your data growth and recovery needs.
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
                  Discuss Your Storage Needs
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
