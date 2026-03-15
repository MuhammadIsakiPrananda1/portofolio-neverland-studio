import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Activity, Shield, Bell, Wrench, LineChart, Clock, CheckCircle, ArrowRight, Award, TrendingUp, Zap } from 'lucide-react';
import SectionTitle from '@components/molecules/SectionTitle';
import { Routes } from '@config/constants';

export default function MonitoringMaintenancePage() {
  const stats = [
    { value: '99.9%', label: 'Monitoring Uptime' },
    { value: '<5min', label: 'Alert Response' },
    { value: '200+', label: 'Systems Monitored' },
    { value: '24/7', label: 'Support' },
  ];

  const services = [
    {
      icon: Activity,
      title: 'Proactive Monitoring',
      description: '24/7 real-time monitoring of all infrastructure components and services.',
    },
    {
      icon: Bell,
      title: 'Instant Alerts',
      description: 'Immediate notification system for critical incidents and anomalies.',
    },
    {
      icon: Wrench,
      title: 'Preventive Maintenance',
      description: 'Scheduled maintenance to prevent issues before they impact operations.',
    },
    {
      icon: Shield,
      title: 'Incident Management',
      description: 'Rapid response and resolution for security and performance incidents.',
    },
  ];

  const features = [
    {
      icon: LineChart,
      title: 'Performance Analytics',
      description: 'Detailed metrics and dashboards for infrastructure health monitoring.',
    },
    {
      icon: Clock,
      title: 'Health Checks',
      description: 'Regular automated health checks for servers, networks, and applications.',
    },
    {
      icon: Zap,
      title: 'Auto-Remediation',
      description: 'Automated fixes for common issues to minimize manual intervention.',
    },
    {
      icon: CheckCircle,
      title: 'Compliance Tracking',
      description: 'Monitor and maintain compliance with industry standards and regulations.',
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
            <Activity className="w-12 h-12 text-sky-500" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6 text-white drop-shadow-[0_0_10px_rgba(14,165,233,0.2)]">
            Monitoring &amp; Maintenance
          </h1>
          
          <p className="text-lg lg:text-xl text-slate-400 font-medium max-w-3xl mx-auto mb-8">
            Ensure maximum uptime and optimal performance with our 24/7 proactive monitoring 
            and preventive maintenance services.
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
            title="Comprehensive Monitoring & Maintenance Services"
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
            title="Proactive Infrastructure Management Features"
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

        {/* Monitoring Tools Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Monitoring Stack"
            title="Enterprise Monitoring Tools"
            className="mb-12"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: LineChart, title: 'Prometheus', desc: 'Metrics & alerting' },
              { icon: Activity, title: 'Grafana', desc: 'Visualization' },
              { icon: Bell, title: 'Nagios', desc: 'Infrastructure monitoring' },
              { icon: Shield, title: 'Zabbix', desc: 'Network monitoring' },
            ].map((tool, idx) => (
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
                  <tool.icon className="w-6 h-6 text-sky-500" />
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight text-white mb-1">{tool.title}</h3>
                <p className="text-slate-500 font-mono text-xs">{tool.desc}</p>
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
                Why Choose Our Monitoring &amp; Maintenance?
              </h2>
              <div className="space-y-4">
                {[
                  'Real-time monitoring with instant alerts',
                  'Experienced DevOps and SRE team',
                  'Proactive issue detection and resolution',
                  'Comprehensive dashboards and reporting',
                  'Automated maintenance and patching',
                  '99.9% monitoring uptime guarantee'
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
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">Certified Pros</h4>
                <p className="text-slate-500 font-mono text-xs">DevOps experts</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-sky-500/30 transition-colors duration-300">
                <Clock className="w-10 h-10 text-sky-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">&lt;5 Minutes</h4>
                <p className="text-slate-500 font-mono text-xs">Alert response</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-sky-500/30 transition-colors duration-300">
                <Activity className="w-10 h-10 text-sky-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">200+ Systems</h4>
                <p className="text-slate-500 font-mono text-xs">Under monitoring</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-sky-500/30 transition-colors duration-300">
                <TrendingUp className="w-10 h-10 text-sky-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">99.9% Uptime</h4>
                <p className="text-slate-500 font-mono text-xs">Monitoring reliability</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Monitoring & Maintenance Certification Roadmap ─── */}
        <motion.div className="mb-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <SectionTitle subtitle="Career Path" title="Monitoring & Maintenance Certification Roadmap" className="mb-4" />
          <p className="text-center text-gray-400 text-sm mb-12 max-w-2xl mx-auto">
            From IT support to expert SRE and observability architect — certifications for monitoring specialists.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
            {[{ label: 'IT Support', color: 'bg-blue-500' }, { label: 'Cloud Ops', color: 'bg-amber-500' }, { label: 'Observability', color: 'bg-emerald-500' }, { label: 'SRE / Advanced', color: 'bg-purple-500' }].map(t => (
              <div key={t.label} className="flex items-center gap-2"><div className={`w-3 h-3 rounded-sm ${t.color}`} /><span className="text-xs text-gray-400">{t.label}</span></div>
            ))}
          </div>
          {[
            { level: 'Beginner', levelColor: 'from-sky-500 to-cyan-400', levelBorder: 'border-sky-500/30', levelBg: 'bg-sky-500/10', levelText: 'text-sky-300', desc: 'IT support basics and entry-level monitoring tools.',
              certs: [
                { name: 'CompTIA A+',    org: 'CompTIA',  track: 'support', desc: 'IT support foundation — hardware, OS, and incident basics.' },
                { name: 'CompTIA Net+',  org: 'CompTIA',  track: 'support', desc: 'Networking fundamentals — understand what you monitor.' },
                { name: 'ITIL 4 Fdn',   org: 'Axelos',   track: 'support', desc: 'ITIL 4 — incident, problem, and change management frameworks.' },
                { name: 'AWS CLF-C02',  org: 'Amazon',   track: 'cloud',   desc: 'Cloud Practitioner — cloud services to monitor and maintain.' },
              ]},
            { level: 'Intermediate', levelColor: 'from-amber-500 to-yellow-400', levelBorder: 'border-amber-500/30', levelBg: 'bg-amber-500/10', levelText: 'text-amber-300', desc: 'Cloud operations, monitoring tools, and automation.',
              certs: [
                { name: 'AWS SysOps',   org: 'Amazon',   track: 'cloud',   desc: 'SysOps Administrator — monitor, operate, and automate AWS.' },
                { name: 'AZ-104',       org: 'Microsoft',track: 'cloud',   desc: 'Azure Administrator — manage and monitor Azure infrastructure.' },
                { name: 'Linux LPIC-2', org: 'LPI',      track: 'sre',     desc: 'Linux engineer — advanced server administration and debugging.' },
                { name: 'HashiCorp Terraform',org: 'HashiCorp',track: 'obs', desc: 'Terraform — automate infrastructure maintenance with IaC.' },
              ]},
            { level: 'Advanced', levelColor: 'from-orange-500 to-amber-500', levelBorder: 'border-orange-500/30', levelBg: 'bg-orange-500/10', levelText: 'text-orange-300', desc: 'Kubernetes operations, observability stacks, and SRE practices.',
              certs: [
                { name: 'CKA',          org: 'CNCF',     track: 'sre',     desc: 'Kubernetes Admin — operate, monitor, and maintain K8s clusters.' },
                { name: 'AWS DevOps Pro',org: 'Amazon',  track: 'cloud',   desc: 'DevOps Pro — CI/CD pipelines and monitoring automation.' },
                { name: 'Datadog Prof.',org: 'Datadog',  track: 'obs',     desc: 'Datadog Pro — cloud observability and metric visualization.' },
                { name: 'GCP Prof. CE', org: 'Google',   track: 'cloud',   desc: 'Professional Cloud Engineer — GCP cloud operations and monitoring.' },
              ]},
            { level: 'Expert', levelColor: 'from-rose-500 to-pink-500', levelBorder: 'border-rose-500/30', levelBg: 'bg-rose-500/10', levelText: 'text-rose-300', desc: 'Enterprise SRE, observability architecture, and platform engineering.',
              certs: [
                { name: 'CKAD',         org: 'CNCF',     track: 'sre',     desc: 'Kubernetes App Developer — deploy apps monitored at scale.' },
                { name: 'AWS SAP-C02',  org: 'Amazon',   track: 'cloud',   desc: 'Solutions Architect Pro — architect monitored, highly-available systems.' },
                { name: 'Prometheus Exp',org: 'CNCF',    track: 'obs',     desc: 'Prometheus + Grafana — expertise in metrics and alerting pipelines.' },
                { name: 'CISSP',        org: 'ISC²',     track: 'sre',     desc: 'CISSP — security-first monitoring and incident response leadership.' },
              ]},
          ].map((row, rowIdx, arr) => {
            const ts: Record<string, { bg: string; border: string; text: string; dot: string }> = {
              support: { bg: 'bg-blue-500/10',   border: 'border-blue-500/25',   text: 'text-blue-300',   dot: 'bg-blue-500' },
              cloud:   { bg: 'bg-amber-500/10',  border: 'border-amber-500/25',  text: 'text-amber-300',  dot: 'bg-amber-500' },
              obs:     { bg: 'bg-emerald-500/10',border: 'border-emerald-500/25',text: 'text-emerald-300',dot: 'bg-emerald-500' },
              sre:     { bg: 'bg-purple-500/10', border: 'border-purple-500/25', text: 'text-purple-300', dot: 'bg-purple-500' },
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
              <Activity className="w-3.5 h-3.5 text-sky-500" />
              <span className="text-xs font-semibold text-sky-400 uppercase tracking-widest">24/7 Monitoring</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
                <span className="text-white">Keep Your Systems Running</span>
                <br />
                <span className="text-sky-500">With Proactive Monitoring</span>
              </h2>
              <p className="text-base lg:text-lg text-slate-400 font-medium max-w-2xl mx-auto">
                Detect and resolve issues before they impact your business with our 24/7 monitoring services.
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
                  Start Monitoring Today
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
