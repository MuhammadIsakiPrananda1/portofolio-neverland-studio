import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Zap, CheckCircle, ArrowRight, Wifi, Download, Bell, 
  Smartphone, Battery, RefreshCw, TrendingUp, Award, Clock, Users
} from 'lucide-react';
import SectionTitle from '@components/molecules/SectionTitle';
import { Routes } from '@config/constants';

export default function PWAPage() {
  const features = [
    {
      icon: Wifi,
      title: 'Offline Capability',
      description: 'Work seamlessly without internet connection using service workers and caching.',
    },
    {
      icon: Download,
      title: 'Installable',
      description: 'Add to home screen for app-like experience without app store downloads.',
    },
    {
      icon: Bell,
      title: 'Push Notifications',
      description: 'Engage users with timely updates and personalized notifications.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Instant loading with pre-caching and optimized performance.',
    },
  ];

  const benefits = [
    {
      icon: Smartphone,
      title: 'Cross-Platform',
      description: 'Single codebase works across iOS, Android, and desktop browsers.',
    },
    {
      icon: Battery,
      title: 'Battery Efficient',
      description: 'Optimized code that consumes less power than native apps.',
    },
    {
      icon: RefreshCw,
      title: 'Auto-Updates',
      description: 'Seamless updates without user intervention or app store approval.',
    },
    {
      icon: TrendingUp,
      title: 'Better Engagement',
      description: 'Improved user retention with app-like experience and features.',
    },
  ];

  const stats = [
    { value: '80+', label: 'PWAs Built' },
    { value: '70%', label: 'Faster Load' },
    { value: '50%', label: 'More Engagement' },
    { value: '100%', label: 'Offline Ready' },
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-20 h-1 bg-violet-500 mx-auto mb-8 rounded-sm" />
          
          <div className="inline-flex p-4 rounded-sm border border-violet-500/30 bg-violet-500/10 mb-6">
            <Zap className="w-12 h-12 text-violet-500" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6 text-white drop-shadow-[0_0_10px_rgba(139,92,246,0.2)]">
            Progressive Web Apps
          </h1>
          
          <p className="text-lg lg:text-xl text-slate-400 font-medium max-w-3xl mx-auto mb-8">
            Build fast, reliable, and engaging web applications that work offline. 
            Combine the best of web and mobile apps for exceptional user experience.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={Routes.CONTACT}>
              <button className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white rounded-sm font-bold uppercase tracking-wide px-6 py-3 border-none group transition-all">
                Build Your PWA <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link to={Routes.HOME}>
              <button className="inline-flex items-center gap-2 border border-white/20 text-white hover:bg-white/5 hover:border-white/40 rounded-sm font-bold uppercase tracking-wide px-6 py-3 transition-all">
                View All Services
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="relative rounded-sm p-6 text-center border border-white/5 hover:border-violet-500/50 transition-all duration-300 bg-[#0f172a] shadow-sm group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="text-3xl lg:text-4xl font-black font-mono text-white group-hover:text-violet-400 transition-colors mb-2">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                {stat.label}
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-violet-500 group-hover:w-full transition-all duration-500" />
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
            subtitle="PWA Capabilities"
            title="What Makes PWAs Powerful"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-sm p-6 border border-white/5 bg-[#0f172a] shadow-sm hover:border-violet-500/50 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="inline-flex p-3 rounded-sm bg-[#0B1120] border border-white/10 group-hover:border-violet-500/30 transition-colors mb-4">
                  <feature.icon className="w-6 h-6 text-violet-500" />
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight text-white group-hover:text-violet-400 transition-colors mb-2">
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
            subtitle="Key Advantages"
            title="Why Choose Progressive Web Apps"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-sm p-6 border border-white/5 border-l-2 border-l-violet-500 bg-[#0f172a] shadow-sm hover:border-violet-500/50 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2.5 rounded-sm bg-[#0B1120] border border-white/10 group-hover:border-violet-500/30 transition-colors">
                    <benefit.icon className="w-5 h-5 text-violet-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-black uppercase tracking-tight text-white group-hover:text-violet-400 transition-colors mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-400 font-medium text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
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
          <div className="absolute top-0 left-0 w-full h-1 bg-violet-500" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tight mb-6 text-white">
                Why Choose Neverland Studio?
              </h2>
              <div className="space-y-4">
                {[
                  'Expert PWA implementation with service workers',
                  'Optimized offline-first architecture',
                  'Push notification strategies',
                  'App manifest configuration',
                  'Performance optimization',
                  'Cross-browser compatibility testing'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-violet-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 font-medium text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-violet-500/30 transition-all duration-300">
                <Award className="w-10 h-10 text-violet-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">PWA Experts</h4>
                <p className="text-slate-500 font-mono text-xs">80+ PWAs built</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-violet-500/30 transition-all duration-300">
                <Clock className="w-10 h-10 text-violet-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">Fast Development</h4>
                <p className="text-slate-500 font-mono text-xs">Quick deployment</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-violet-500/30 transition-all duration-300">
                <TrendingUp className="w-10 h-10 text-violet-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">Performance</h4>
                <p className="text-slate-500 font-mono text-xs">70% faster load</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-violet-500/30 transition-all duration-300">
                <Users className="w-10 h-10 text-violet-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">100+ Clients</h4>
                <p className="text-slate-500 font-mono text-xs">Satisfied customers</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── PWA Certification Roadmap ─── */}
        <motion.div className="mb-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <SectionTitle subtitle="Career Path" title="Progressive Web App Certification Roadmap" className="mb-4" />
          <p className="text-center text-gray-400 text-sm mb-12 max-w-2xl mx-auto">
            From web fundamentals to advanced PWA architecture and cloud deployment — master next-generation web development.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
            {[{ label: 'Web Standards', color: 'bg-blue-500' }, { label: 'Performance', color: 'bg-amber-500' }, { label: 'Mobile / PWA', color: 'bg-emerald-500' }, { label: 'Cloud & DevOps', color: 'bg-purple-500' }].map(t => (
              <div key={t.label} className="flex items-center gap-2"><div className={`w-3 h-3 rounded-sm ${t.color}`} /><span className="text-xs font-bold uppercase tracking-wider text-slate-400">{t.label}</span></div>
            ))}
          </div>
          {[
            { level: 'Beginner', levelColor: 'from-sky-500 to-cyan-400', levelBorder: 'border-sky-500/30', levelBg: 'bg-sky-500/10', levelText: 'text-sky-300', desc: 'Web fundamentals: HTML, CSS, JavaScript, and accessibility.',
              certs: [
                { name: 'fCC RWD',          org: 'freeCodeCamp', track: 'standards', desc: 'Responsive Web Design — HTML, CSS, and accessibility foundations.' },
                { name: 'fCC JS & DS',      org: 'freeCodeCamp', track: 'standards', desc: 'JavaScript Algorithms and Data Structures certificate.' },
                { name: 'Google UX Design', org: 'Google',        track: 'pwa',      desc: 'Mobile-first UX design thinking and Figma prototyping.' },
                { name: 'AWS CLF-C02',      org: 'Amazon',        track: 'cloud',    desc: 'Cloud Practitioner — hosting and deploying web apps on AWS.' },
              ]},
            { level: 'Intermediate', levelColor: 'from-amber-500 to-yellow-400', levelBorder: 'border-amber-500/30', levelBg: 'bg-amber-500/10', levelText: 'text-amber-300', desc: 'PWA APIs, service workers, and performance optimization.',
              certs: [
                { name: 'Meta Front-End',   org: 'Meta',          track: 'standards', desc: 'React, Hooks, advanced JS — foundation for modern PWA development.' },
                { name: 'Google Web Dev',   org: 'Google',        track: 'pwa',      desc: 'Web.dev badge — Performance, PWA, Accessibility, SEO audits.' },
                { name: 'AWS SAA-C03',      org: 'Amazon',        track: 'cloud',    desc: 'Solutions Architect Associate — CDN, serverless, and hosting.' },
                { name: 'Lighthouse Perf.', org: 'Google',        track: 'performance', desc: 'Core Web Vitals — LCP, FID, CLS optimization strategies.' },
              ]},
            { level: 'Advanced', levelColor: 'from-orange-500 to-amber-500', levelBorder: 'border-orange-500/30', levelBg: 'bg-orange-500/10', levelText: 'text-orange-300', desc: 'Advanced caching strategies, push notifications, and offline-first.',
              certs: [
                { name: 'AWS Developer DVA',    org: 'Amazon',    track: 'cloud',    desc: 'Lambda, CloudFront, S3 — serverless PWA backend services.' },
                { name: 'CKA',                  org: 'CNCF',      track: 'cloud',    desc: 'Kubernetes — containerize PWA microservices for cloud scale.' },
                { name: 'W3C ARIA / WCAG',      org: 'W3C',       track: 'standards', desc: 'Accessibility compliance — WCAG 2.1 AA for inclusive PWAs.' },
                { name: 'Terraform Associate',  org: 'HashiCorp', track: 'cloud',    desc: 'IaC for repeatable, automated PWA deployment pipelines.' },
              ]},
            { level: 'Expert', levelColor: 'from-rose-500 to-pink-500', levelBorder: 'border-rose-500/30', levelBg: 'bg-rose-500/10', levelText: 'text-rose-300', desc: 'Enterprise PWA architecture, edge computing, and engineering leadership.',
              certs: [
                { name: 'AWS SAP-C02',         org: 'Amazon',    track: 'cloud',    desc: 'Solutions Architect Pro — global, highly available PWA architectures.' },
                { name: 'Google Cloud Arch',   org: 'Google',    track: 'cloud',    desc: 'Professional Cloud Architect — manage GCP-hosted PWA infrastructure.' },
                { name: 'PMP',                 org: 'PMI',       track: 'performance', desc: 'Project Management Professional — lead large-scale PWA teams.' },
                { name: 'CKAD',                org: 'CNCF',      track: 'cloud',    desc: 'App Developer — PWA containerization and Kubernetes application design.' },
              ]},
          ].map((row, rowIdx, arr) => {
            const ts: Record<string, { bg: string; border: string; text: string; dot: string }> = {
              standards:   { bg: 'bg-blue-500/10',   border: 'border-blue-500/25',   text: 'text-blue-300',   dot: 'bg-blue-500' },
              performance: { bg: 'bg-amber-500/10',  border: 'border-amber-500/25',  text: 'text-amber-300',  dot: 'bg-amber-500' },
              pwa:         { bg: 'bg-emerald-500/10',border: 'border-emerald-500/25',text: 'text-emerald-300',dot: 'bg-emerald-500' },
              cloud:       { bg: 'bg-purple-500/10', border: 'border-purple-500/25', text: 'text-purple-300', dot: 'bg-purple-500' },
            };
            const isLast = rowIdx === arr.length - 1;
            return (
              <motion.div key={row.level} className="relative" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: rowIdx * 0.12, duration: 0.5 }}>
                {!isLast && <div className="absolute left-[1.15rem] top-full w-px h-8 bg-white/10 z-10" />}
                <div className="flex gap-5 mb-8">
                  <div className="flex flex-col items-center flex-shrink-0 pt-1">
                    <div className={`w-10 h-10 rounded-sm shadow-sm ${row.levelBg} border ${row.levelBorder} flex items-center justify-center`}>
                      <span className={`text-sm font-mono font-black ${row.levelText}`}>{rowIdx + 1}</span>
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
                        <div key={cert.name} className={`group relative rounded-sm border ${s.border} ${s.bg} p-3 hover:bg-[#0B1120] transition-colors duration-300 cursor-default`}>
                          <div className={`w-2 h-2 rounded-sm ${s.dot} mb-2`} />
                          <p className={`text-[11px] font-bold ${s.text} leading-tight mb-1`}>{cert.name}</p>
                          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1.5">{cert.org}</p>
                          <p className="text-[10px] text-slate-400 font-medium hidden group-hover:block absolute bottom-full left-0 right-0 z-20 bg-[#0B1120] border border-white/10 rounded-sm p-2 mb-1 shadow-xl">{cert.desc}</p>
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
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-violet-500" />
          
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-violet-500/30 bg-violet-500/10">
              <Zap className="w-3.5 h-3.5 text-violet-500" />
              <span className="text-xs font-semibold text-violet-400 uppercase tracking-widest">Go Progressive</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
                <span className="text-white">Ready to Build Your</span>
                <br />
                <span className="text-violet-500">
                  Progressive Web App?
                </span>
              </h2>
              <p className="text-base lg:text-lg text-slate-400 font-medium max-w-2xl mx-auto">
                Transform your web app into a fast, offline-capable PWA that users love. Get started today.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 py-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/10" />
              <div className="w-1.5 h-1.5 rounded-sm bg-violet-500/50" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/10" />
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to={Routes.CONTACT}>
                <button className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white rounded-sm font-bold uppercase tracking-wide px-6 py-3 border-none group transition-all">
                  Start Your PWA Project <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link to={Routes.WEB_DEVELOPMENT}>
                <button className="inline-flex items-center gap-2 border border-white/20 text-white hover:bg-white/5 hover:border-white/40 rounded-sm font-bold uppercase tracking-wide px-6 py-3 transition-all">
                  Explore Web Development
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
