import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Box, CheckCircle, ArrowRight, Code, Database, Lock, 
  Zap, GitBranch, FileCode, TrendingUp, Award, Clock, Users
} from 'lucide-react';
import SectionTitle from '@components/molecules/SectionTitle';
import { Routes } from '@config/constants';

export default function APIDevelopmentPage() {
  const features = [
    {
      icon: Code,
      title: 'RESTful APIs',
      description: 'Scalable REST APIs following best practices with proper HTTP methods and status codes.',
    },
    {
      icon: GitBranch,
      title: 'GraphQL',
      description: 'Flexible GraphQL APIs with efficient data fetching and real-time subscriptions.',
    },
    {
      icon: Lock,
      title: 'Secure Authentication',
      description: 'OAuth 2.0, JWT, and API key authentication with role-based access control.',
    },
    {
      icon: Zap,
      title: 'High Performance',
      description: 'Optimized endpoints with caching, rate limiting, and load balancing.',
    },
  ];

  const benefits = [
    {
      icon: FileCode,
      title: 'Documentation',
      description: 'Comprehensive API documentation with Swagger/OpenAPI specifications.',
    },
    {
      icon: Database,
      title: 'Database Integration',
      description: 'Seamless integration with SQL, NoSQL, and cloud database solutions.',
    },
    {
      icon: GitBranch,
      title: 'Version Control',
      description: 'Proper API versioning ensuring backward compatibility and smooth migrations.',
    },
    {
      icon: TrendingUp,
      title: 'Monitoring & Analytics',
      description: 'Real-time monitoring, logging, and performance analytics for your APIs.',
    },
  ];

  const stats = [
    { value: '100+', label: 'APIs Built' },
    { value: '99.99%', label: 'Uptime' },
    { value: '< 100ms', label: 'Response Time' },
    { value: '10M+', label: 'Requests/Day' },
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
            <Box className="w-12 h-12 text-violet-500" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6 text-white drop-shadow-[0_0_10px_rgba(139,92,246,0.2)]">
            API Development
          </h1>
          
          <p className="text-lg lg:text-xl text-slate-400 font-medium max-w-3xl mx-auto mb-8">
            Build robust, scalable APIs that power your applications and integrations. 
            RESTful, GraphQL, and microservices architecture designed for performance.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={Routes.CONTACT}>
              <button className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white rounded-sm font-bold uppercase tracking-wide px-6 py-3 border-none group transition-all">
                Build Your API <ArrowRight className="w-5 h-5" />
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
            subtitle="API Solutions"
            title="Comprehensive API Development Services"
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
            subtitle="Additional Value"
            title="What Sets Our APIs Apart"
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
                  'Expert in REST, GraphQL, and microservices',
                  'Scalable architecture for millions of requests',
                  'Comprehensive error handling and logging',
                  'Third-party integrations and webhooks',
                  'Automated testing and CI/CD pipelines',
                  'Ongoing maintenance and support'
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
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">API Experts</h4>
                <p className="text-slate-500 font-mono text-xs">100+ APIs built</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-violet-500/30 transition-all duration-300">
                <Clock className="w-10 h-10 text-violet-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">Fast Response</h4>
                <p className="text-slate-500 font-mono text-xs">&lt; 100ms average</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-violet-500/30 transition-all duration-300">
                <TrendingUp className="w-10 h-10 text-violet-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">High Uptime</h4>
                <p className="text-slate-500 font-mono text-xs">99.99% reliability</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-violet-500/30 transition-all duration-300">
                <Users className="w-10 h-10 text-violet-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">120+ Clients</h4>
                <p className="text-slate-500 font-mono text-xs">Trusted globally</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── API Development Certification Roadmap ─── */}
        <motion.div className="mb-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <SectionTitle subtitle="Career Path" title="API Development Certification Roadmap" className="mb-4" />
          <p className="text-center text-gray-400 text-sm mb-12 max-w-2xl mx-auto">
            From REST fundamentals to API architect — structured certifications for modern backend and integration engineers.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
            {[{ label: 'Backend / REST', color: 'bg-blue-500' }, { label: 'Security', color: 'bg-red-500' }, { label: 'Cloud & DevOps', color: 'bg-emerald-500' }, { label: 'Architecture', color: 'bg-purple-500' }].map(t => (
              <div key={t.label} className="flex items-center gap-2"><div className={`w-3 h-3 rounded-sm ${t.color}`} /><span className="text-xs font-bold uppercase tracking-wider text-slate-400">{t.label}</span></div>
            ))}
          </div>
          {[
            { level: 'Beginner', levelColor: 'from-sky-500 to-cyan-400', levelBorder: 'border-sky-500/30', levelBg: 'bg-sky-500/10', levelText: 'text-sky-300', desc: 'Programming foundations and intro to REST APIs.',
              certs: [
                { name: 'Meta Back-End',         org: 'Meta',       track: 'backend', desc: 'Python, Django REST — build and consume REST APIs.' },
                { name: 'fCC JS & DS',           org: 'freeCodeCamp',track: 'backend', desc: 'JavaScript — Node.js foundation for API development.' },
                { name: 'Postman Student Expert',org: 'Postman',    track: 'backend', desc: 'API testing with Postman — collections, environments, assertions.' },
                { name: 'AWS CLF-C02',           org: 'Amazon',     track: 'cloud',   desc: 'Cloud Practitioner — deploy APIs on AWS with API Gateway.' },
              ]},
            { level: 'Intermediate', levelColor: 'from-amber-500 to-yellow-400', levelBorder: 'border-amber-500/30', levelBg: 'bg-amber-500/10', levelText: 'text-amber-300', desc: 'GraphQL, OAuth, and cloud-hosted APIs.',
              certs: [
                { name: 'MongoDB Developer',    org: 'MongoDB',    track: 'backend', desc: 'Node.js Developer — build APIs with MongoDB Atlas backend.' },
                { name: 'CompTIA Sec+',         org: 'CompTIA',    track: 'security', desc: 'API security: OAuth, JWT, and input validation basics.' },
                { name: 'AWS SAA-C03',          org: 'Amazon',     track: 'cloud',   desc: 'Solutions Architect — API Gateway, Lambda, and RDS architectures.' },
                { name: 'Scrum PSM I',          org: 'Scrum.org',  track: 'architecture', desc: 'Agile API delivery cycles and sprint planning.' },
                { name: 'Postman API Expert',   org: 'Postman',    track: 'backend', desc: 'Advanced Postman — automated test scripts, Newman CI/CD.' },
              ]},
            { level: 'Advanced', levelColor: 'from-orange-500 to-amber-500', levelBorder: 'border-orange-500/30', levelBg: 'bg-orange-500/10', levelText: 'text-orange-300', desc: 'Microservices, API security, and cloud-native design.',
              certs: [
                { name: 'AWS Developer DVA',    org: 'Amazon',     track: 'cloud',   desc: 'Build, deploy, and debug serverless APIs and microservices on AWS.' },
                { name: 'GWEB',                 org: 'GIAC',       track: 'security', desc: 'Web Application Defender — OWASP Top 10, API attack mitigation.' },
                { name: 'CKAD',                 org: 'CNCF',       track: 'cloud',   desc: 'Kubernetes App Developer — containerize API microservices.' },
                { name: 'Terraform Associate',  org: 'HashiCorp',  track: 'cloud',   desc: 'Infrastructure as code for reproducible API environments.' },
              ]},
            { level: 'Expert', levelColor: 'from-rose-500 to-pink-500', levelBorder: 'border-rose-500/30', levelBg: 'bg-rose-500/10', levelText: 'text-rose-300', desc: 'Enterprise API governance, platform engineering, and leadership.',
              certs: [
                { name: 'AWS SAP-C02',         org: 'Amazon',     track: 'cloud',        desc: 'Solutions Architect Pro — complex multi-region API platform design.' },
                { name: 'CISSP',               org: 'ISC²',       track: 'security',     desc: 'Senior security for API platforms and enterprise integration.' },
                { name: 'TOGAF 10',            org: 'Open Group', track: 'architecture', desc: 'Enterprise Architecture — design API-first enterprise platforms.' },
                { name: 'PMP',                 org: 'PMI',        track: 'architecture', desc: 'PMP — lead enterprise API product and platform programs.' },
              ]},
          ].map((row, rowIdx, arr) => {
            const ts: Record<string, { bg: string; border: string; text: string; dot: string }> = {
              backend:      { bg: 'bg-blue-500/10',   border: 'border-blue-500/25',   text: 'text-blue-300',   dot: 'bg-blue-500' },
              security:     { bg: 'bg-red-500/10',    border: 'border-red-500/25',    text: 'text-red-300',    dot: 'bg-red-500' },
              cloud:        { bg: 'bg-emerald-500/10',border: 'border-emerald-500/25',text: 'text-emerald-300',dot: 'bg-emerald-500' },
              architecture: { bg: 'bg-purple-500/10', border: 'border-purple-500/25', text: 'text-purple-300', dot: 'bg-purple-500' },
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
              <Box className="w-3.5 h-3.5 text-violet-500" />
              <span className="text-xs font-semibold text-violet-400 uppercase tracking-widest">Build APIs</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
                <span className="text-white">Ready to Build Your</span>
                <br />
                <span className="text-violet-500">
                  Powerful API?
                </span>
              </h2>
              <p className="text-base lg:text-lg text-slate-400 font-medium max-w-2xl mx-auto">
                Let's create a robust, scalable API that powers your applications and integrations seamlessly.
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
                  Get Started Today <ArrowRight className="w-5 h-5" />
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
