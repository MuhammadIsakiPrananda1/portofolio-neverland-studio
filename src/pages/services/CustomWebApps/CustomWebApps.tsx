import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Globe, CheckCircle, ArrowRight, Code, Zap, 
  Database, Shield, Smartphone, TrendingUp, Award, Clock, Users
} from 'lucide-react';
import Button from '@components/atoms/Button';
import SectionTitle from '@components/molecules/SectionTitle';
import { Routes } from '@config/constants';

export default function CustomWebAppsPage() {
  const features = [
    {
      icon: Code,
      title: 'Tailored Solutions',
      description: 'Custom-built applications designed specifically for your business processes and requirements.',
    },
    {
      icon: Zap,
      title: 'High Performance',
      description: 'Optimized code and architecture ensuring lightning-fast load times and smooth interactions.',
    },
    {
      icon: Database,
      title: 'Scalable Infrastructure',
      description: 'Built to grow with your business, handling increased traffic and data effortlessly.',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Multiple layers of security to protect your data and user information.',
    },
  ];

  const benefits = [
    {
      icon: Smartphone,
      title: 'Cross-Platform',
      description: 'Works seamlessly across desktop, tablet, and mobile devices with responsive design.',
    },
    {
      icon: Database,
      title: 'Data Management',
      description: 'Efficient data handling with advanced CRUD operations and real-time updates.',
    },
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Maintainable, well-documented codebase following industry best practices.',
    },
    {
      icon: TrendingUp,
      title: 'Analytics Integration',
      description: 'Built-in analytics to track user behavior and application performance.',
    },
  ];

  const stats = [
    { value: '150+', label: 'Apps Delivered' },
    { value: '99.9%', label: 'Uptime' },
    { value: '< 2s', label: 'Load Time' },
    { value: '100%', label: 'Custom Built' },
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
            <Globe className="w-12 h-12 text-violet-500" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black mb-6 uppercase tracking-tight">
            <span className="text-white drop-shadow-[0_0_10px_rgba(139,92,246,0.2)]">
              Custom Web Applications
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-slate-400 font-medium max-w-3xl mx-auto mb-8">
            Build powerful, bespoke web applications tailored to your unique business needs. 
            From concept to deployment, we create solutions that drive growth.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={Routes.CONTACT}>
              <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white rounded-sm font-bold uppercase tracking-wide border-none group transition-all" rightIcon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}>
                Start Your Project
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
              <div className="text-3xl lg:text-4xl font-black text-white font-mono mb-2 group-hover:text-violet-400 transition-colors">
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
            subtitle="Core Features"
            title="What Makes Our Custom Apps Exceptional"
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
                <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-tight group-hover:text-violet-400 transition-colors">
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
            subtitle="Key Benefits"
            title="Why Choose Custom Web Applications"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-sm p-6 border border-white/5 border-l-2 border-l-violet-500 bg-[#0f172a] shadow-sm hover:border-violet-500/50 transition-all duration-300 group"
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
                    <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-tight group-hover:text-violet-400 transition-colors">
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
              <h2 className="text-4xl font-black mb-6 text-white uppercase tracking-tight">
                Why Choose Neverland Studio?
              </h2>
              <div className="space-y-4">
                {[
                  'Full-stack expertise in modern frameworks',
                  'Agile development methodology',
                  'Continuous integration and deployment',
                  'Comprehensive testing and QA',
                  'Post-launch support and maintenance',
                  'Transparent communication throughout'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-violet-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-lg font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-violet-500/30 transition-all duration-300">
                <Award className="w-10 h-10 text-violet-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">Expert Team</h4>
                <p className="text-slate-500 text-xs font-mono">10+ years experience</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-violet-500/30 transition-all duration-300">
                <Clock className="w-10 h-10 text-violet-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">Fast Delivery</h4>
                <p className="text-slate-500 text-xs font-mono">Agile sprints</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-violet-500/30 transition-all duration-300">
                <TrendingUp className="w-10 h-10 text-violet-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">High Quality</h4>
                <p className="text-slate-500 text-xs font-mono">99.9% uptime</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-violet-500/30 transition-all duration-300">
                <Users className="w-10 h-10 text-violet-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">150+ Clients</h4>
                <p className="text-slate-500 text-xs font-mono">Worldwide</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Custom Web Apps Certification Roadmap ─── */}
        <motion.div className="mb-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <SectionTitle subtitle="Career Path" title="Custom Web Apps Certification Roadmap" className="mb-4" />
          <p className="text-center text-gray-400 text-sm mb-12 max-w-2xl mx-auto">
            Structured certifications for building custom, scalable web applications from foundations to enterprise architecture.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
            {[{ label: 'Frontend', color: 'bg-blue-500' }, { label: 'Backend', color: 'bg-amber-500' }, { label: 'DevOps / Cloud', color: 'bg-emerald-500' }, { label: 'Architecture', color: 'bg-purple-500' }].map(t => (
              <div key={t.label} className="flex items-center gap-2"><div className={`w-3 h-3 rounded-sm ${t.color}`} /><span className="text-xs font-bold uppercase tracking-wider text-slate-400">{t.label}</span></div>
            ))}
          </div>
          {[
            { level: 'Beginner', levelColor: 'from-sky-500 to-cyan-400', levelBorder: 'border-sky-500/30', levelBg: 'bg-sky-500/10', levelText: 'text-sky-300', desc: 'Programming and web fundamentals.',
              certs: [
                { name: 'Meta Front-End',      org: 'Meta',       track: 'frontend', desc: 'React, HTML, CSS, JS — foundation for custom app UI.' },
                { name: 'fCC JavaScript',      org: 'freeCodeCamp',track: 'frontend', desc: 'JavaScript Algorithms and Data Structures certificate.' },
                { name: 'Meta Back-End',       org: 'Meta',       track: 'backend',  desc: 'Python, Django, REST APIs, and databases.' },
                { name: 'AWS CLF-C02',         org: 'Amazon',     track: 'devops',   desc: 'Cloud Practitioner — basics of deploying web apps on AWS.' },
              ]},
            { level: 'Intermediate', levelColor: 'from-amber-500 to-yellow-400', levelBorder: 'border-amber-500/30', levelBg: 'bg-amber-500/10', levelText: 'text-amber-300', desc: 'Framework expertise and cloud deployment.',
              certs: [
                { name: 'MongoDB Developer',   org: 'MongoDB',    track: 'backend',  desc: 'Node.js Developer Path — apps with MongoDB Atlas.' },
                { name: 'PostgreSQL Assoc.',   org: 'PostgreSQL', track: 'backend',  desc: 'PostgreSQL Associate — relational database for web apps.' },
                { name: 'AWS SAA-C03',         org: 'Amazon',     track: 'devops',   desc: 'Solutions Architect Associate — scalable cloud-native apps.' },
                { name: 'Scrum PSM I',         org: 'Scrum.org',  track: 'architecture', desc: 'Professional Scrum Master — agile custom app delivery.' },
                { name: 'Docker & K8s',        org: 'CNCF',       track: 'devops',   desc: 'CKAD — containerized applications deployment.' },
              ]},
            { level: 'Advanced', levelColor: 'from-orange-500 to-amber-500', levelBorder: 'border-orange-500/30', levelBg: 'bg-orange-500/10', levelText: 'text-orange-300', desc: 'Microservices, DevOps, and app security.',
              certs: [
                { name: 'AWS Developer DVA',   org: 'Amazon',     track: 'devops',   desc: 'Developer Associate — CI/CD, serverless, and APIs on AWS.' },
                { name: 'CKA',                 org: 'CNCF',       track: 'devops',   desc: 'Certified Kubernetes Admin — orchestrate containerized apps.' },
                { name: 'Terraform Associate', org: 'HashiCorp',  track: 'devops',   desc: 'Infrastructure as Code for reproducible deployments.' },
                { name: 'GWEB',                org: 'GIAC',       track: 'architecture', desc: 'Web App Defender — secure coding and app vulnerability analysis.' },
              ]},
            { level: 'Expert', levelColor: 'from-rose-500 to-pink-500', levelBorder: 'border-rose-500/30', levelBg: 'bg-rose-500/10', levelText: 'text-rose-300', desc: 'Enterprise architecture and engineering leadership.',
              certs: [
                { name: 'AWS SAP-C02',         org: 'Amazon',     track: 'devops',   desc: 'Solutions Architect Professional — complex enterprise app design.' },
                { name: 'TOGAF 10',            org: 'Open Group', track: 'architecture', desc: 'Enterprise Architecture — design scalable, composable systems.' },
                { name: 'PMP',                 org: 'PMI',        track: 'architecture', desc: 'Project Management Professional — lead large custom app teams.' },
                { name: 'Google Cloud Arch',   org: 'Google',     track: 'devops',   desc: 'Professional Cloud Architect — GCP-native web architectures.' },
              ]},
          ].map((row, rowIdx, arr) => {
            const ts: Record<string, { bg: string; border: string; text: string; dot: string }> = {
              frontend:     { bg: 'bg-blue-500/10',   border: 'border-blue-500/25',   text: 'text-blue-300',   dot: 'bg-blue-500' },
              backend:      { bg: 'bg-amber-500/10',  border: 'border-amber-500/25',  text: 'text-amber-300',  dot: 'bg-amber-500' },
              devops:       { bg: 'bg-emerald-500/10',border: 'border-emerald-500/25',text: 'text-emerald-300',dot: 'bg-emerald-500' },
              architecture: { bg: 'bg-purple-500/10', border: 'border-purple-500/25', text: 'text-purple-300', dot: 'bg-purple-500' },
            };
            const isLast = rowIdx === arr.length - 1;
            return (
              <motion.div key={row.level} className="relative" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: rowIdx * 0.12, duration: 0.5 }}>
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
                      {row.certs.map((cert) => { const s = ts[cert.track]; return (
                        <div key={cert.name} className={`group relative rounded-sm border ${s.border} ${s.bg} p-3 hover:bg-[#0B1120] transition-colors duration-300 cursor-default`}>
                          <div className={`w-2 h-2 rounded-sm ${s.dot} mb-2`} />
                          <p className={`text-[11px] font-bold ${s.text} leading-tight mb-1 transition-colors`}>{cert.name}</p>
                          <p className="text-[9px] text-slate-500 uppercase tracking-widest mb-1.5 font-bold">{cert.org}</p>
                          <p className="text-[10px] text-slate-400 font-medium hidden group-hover:block absolute bottom-full left-0 right-0 z-20 bg-[#0B1120] border border-white/10 rounded-sm p-2 mb-1 shadow-2xl">{cert.desc}</p>
                        </div>
                      ); })}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
          <p className="text-center text-slate-500 text-xs mt-4 font-mono">[SYSINFO] Hover over any certificate card to see a brief description.</p>
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
              <Globe className="w-3.5 h-3.5 text-violet-500" />
              <span className="text-xs font-bold text-violet-400 uppercase tracking-widest">Let's Build</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
                <span className="text-white">Ready to Build Your</span>
                <br />
                <span className="text-violet-500">
                  Custom Solution?
                </span>
              </h2>
              <p className="text-base lg:text-lg text-slate-400 font-medium max-w-2xl mx-auto">
                Let's discuss your project requirements and create a custom web application that perfectly fits your business needs.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 py-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/10" />
              <div className="w-1.5 h-1.5 rounded-sm bg-violet-500/50" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/10" />
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to={Routes.CONTACT}>
                <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white rounded-sm font-bold uppercase tracking-wide border-none group transition-all" rightIcon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}>
                  Start Your Project
                </Button>
              </Link>
              <Link to={Routes.WEB_DEVELOPMENT}>
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/5 hover:border-white/40 rounded-sm font-bold uppercase tracking-wide transition-all">
                  Explore Web Development
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
