import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Lightbulb, Target, FileSearch, Zap, Shield, Users,
  CheckCircle, ArrowRight, Award, Clock, TrendingUp, BarChart, Briefcase
} from 'lucide-react';
import SectionTitle from '@components/molecules/SectionTitle';
import { Routes } from '@config/constants';

export default function ConsultingPage() {
  const stats = [
    { value: '200+', label: 'Consulting Projects' },
    { value: '95%', label: 'Client Satisfaction' },
    { value: '60%', label: 'Avg. Efficiency Gain' },
    { value: '24/7', label: 'Expert Support' },
  ];

  const services = [
    {
      icon: Target,
      title: 'IT Strategy & Planning',
      description: 'Align technology initiatives with business goals through strategic planning.',
      path: '/services/it-strategy-planning',
    },
    {
      icon: FileSearch,
      title: 'Technology Assessment',
      description: 'Comprehensive evaluation of your technology landscape and opportunities.',
      path: '/services/technology-assessment',
    },
    {
      icon: Zap,
      title: 'Digital Transformation',
      description: 'Transform your business with modern technologies and optimized processes.',
      path: '/services/digital-transformation',
    },
    {
      icon: Shield,
      title: 'IT Governance',
      description: 'Establish robust governance frameworks for compliance and risk management.',
      path: '/services/it-governance',
    },
    {
      icon: Users,
      title: 'Vendor Management',
      description: 'Optimize vendor relationships and contracts to reduce costs.',
      path: '/services/vendor-management',
    },
    {
      icon: BarChart,
      title: 'Process Optimization',
      description: 'Streamline operations and improve efficiency with best practices.',
      path: '#',
    },
  ];

  const features = [
    {
      icon: Lightbulb,
      title: 'Expert Insights',
      description: '10+ years of industry experience across multiple sectors and technologies.',
    },
    {
      icon: TrendingUp,
      title: 'Proven Results',
      description: 'Measurable improvements in efficiency, ROI, and business value delivery.',
    },
    {
      icon: Users,
      title: 'Collaborative Approach',
      description: 'Working closely with your team for lasting impact and knowledge transfer.',
    },
    {
      icon: Briefcase,
      title: 'Industry Expertise',
      description: 'Deep domain knowledge across finance, healthcare, retail, and tech sectors.',
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
          {/* Subtle Accent Line */}
          <div className="w-20 h-1 bg-purple-500 mx-auto mb-8 rounded-sm" />
          
          {/* Icon Badge - Minimal */}
          <div className="inline-flex p-4 rounded-sm border border-purple-500/30 bg-purple-500/10 mb-6">
            <Lightbulb className="w-12 h-12 text-purple-500" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6">
            <span className="text-white drop-shadow-[0_0_10px_rgba(168,85,247,0.2)]">
              IT Consulting Services
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-slate-400 font-medium max-w-3xl mx-auto mb-8">
            Transform your business with strategic IT consulting. We help organizations optimize technology, 
            reduce costs, and achieve their digital transformation goals.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={Routes.CONTACT}>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-sm font-bold uppercase tracking-wide transition-colors">
                Get Started Today <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link to={Routes.HOME}>
              <button className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white/40 text-white rounded-sm font-bold uppercase tracking-wide transition-colors">
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
              className="relative rounded-sm p-6 text-center border border-white/5 hover:border-purple-500/50 transition-all duration-300 bg-[#0f172a] group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="text-3xl lg:text-4xl font-black font-mono text-white group-hover:text-purple-400 transition-colors mb-2">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                {stat.label}
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-purple-500 group-hover:w-full transition-all duration-500" />
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
            subtitle="Our Consulting Services"
            title="Comprehensive IT Consulting Solutions"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <Link key={idx} to={service.path}>
                <motion.div
                  className="relative rounded-sm p-6 border border-white/5 bg-[#0f172a] hover:border-purple-500/30 transition-all duration-300 group h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="inline-flex p-3 rounded-sm bg-[#0B1120] border border-white/10 mb-4">
                    <service.icon className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 font-medium text-sm leading-relaxed mb-3">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 text-purple-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
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
            subtitle="Why Choose Us"
            title="Our Consulting Approach"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-sm p-6 border border-white/5 border-l-2 border-l-purple-500/30 bg-[#0f172a] hover:bg-[#0B1120] transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2.5 rounded-sm bg-[#0B1120] border border-white/10">
                    <feature.icon className="w-5 h-5 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Consulting Process Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Our Process"
            title="Consulting Methodology"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: '01', title: 'Discovery', desc: 'Understand challenges' },
              { step: '02', title: 'Analysis', desc: 'Assess current state' },
              { step: '03', title: 'Strategy', desc: 'Develop recommendations' },
              { step: '04', title: 'Implementation', desc: 'Guide execution' },
              { step: '05', title: 'Optimization', desc: 'Continuous improvement' },
            ].map((phase, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-sm p-5 text-center border border-white/5 bg-[#0f172a] hover:border-purple-500/30 transition-all duration-300 group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="text-2xl font-black font-mono text-purple-500 mb-2">{phase.step}</div>
                <h3 className="text-lg font-bold text-white mb-1">{phase.title}</h3>
                <p className="text-gray-500 text-xs">{phase.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div
          className="border border-white/10 rounded-sm p-8 lg:p-12 mb-24 bg-[#0f172a] shadow-xl relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-purple-500" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tight mb-6 text-white">
                Why Choose Our IT Consulting Services?
              </h2>
              <div className="space-y-4">
                {[
                  '200+ successful consulting projects delivered',
                  'Experienced consultants with diverse industry expertise',
                  'Proven methodologies and frameworks',
                  'Focus on measurable business value and ROI',
                  'Collaborative approach with knowledge transfer',
                  'Ongoing support through implementation'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-purple-500/30 transition-all duration-300">
                <Award className="w-10 h-10 text-purple-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Expert Team</h4>
                <p className="text-slate-500 text-xs">10+ years experience</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-purple-500/30 transition-all duration-300">
                <Clock className="w-10 h-10 text-purple-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Fast Results</h4>
                <p className="text-slate-500 text-xs">4-6 weeks typical</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-purple-500/30 transition-all duration-300">
                <Briefcase className="w-10 h-10 text-purple-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">200+ Projects</h4>
                <p className="text-slate-500 text-xs">Successfully delivered</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-purple-500/30 transition-all duration-300">
                <TrendingUp className="w-10 h-10 text-purple-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">60% Growth</h4>
                <p className="text-slate-500 text-xs">Efficiency gain</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── IT Consulting Certification Roadmap ─── */}
        <motion.div className="mb-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <SectionTitle subtitle="Career Path" title="IT Consulting Certification Roadmap" className="mb-4" />
          <p className="text-center text-gray-400 text-sm mb-12 max-w-2xl mx-auto">
            From IT fundamentals to senior consulting leadership — structured certifications for aspiring IT consultants.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
            {[{ label: 'Foundation', color: 'bg-blue-500' }, { label: 'Project / Agile', color: 'bg-amber-500' }, { label: 'Architecture', color: 'bg-emerald-500' }, { label: 'Leadership', color: 'bg-purple-500' }].map(t => (
              <div key={t.label} className="flex items-center gap-2"><div className={`w-3 h-3 rounded-sm ${t.color}`} /><span className="text-xs text-gray-400">{t.label}</span></div>
            ))}
          </div>
          {[
            { level: 'Beginner', levelColor: 'from-sky-500 to-cyan-400', levelBorder: 'border-sky-500/30', levelBg: 'bg-sky-500/10', levelText: 'text-sky-300', desc: 'IT and business fundamentals for consultants.',
              certs: [
                { name: 'CompTIA A+',     org: 'CompTIA',  track: 'foundation', desc: 'IT operations foundation — hardware, OS, and troubleshooting.' },
                { name: 'AWS CLF-C02',   org: 'Amazon',   track: 'foundation', desc: 'Cloud basics — understand the technology domains you will advise on.' },
                { name: 'Scrum PSM I',   org: 'Scrum.org',track: 'agile',      desc: 'Professional Scrum Master — agile project delivery basics.' },
                { name: 'ITIL 4 Fdn',   org: 'Axelos',   track: 'foundation', desc: 'IT service management framework — essential for consulting practice.' },
              ]},
            { level: 'Intermediate', levelColor: 'from-amber-500 to-yellow-400', levelBorder: 'border-amber-500/30', levelBg: 'bg-amber-500/10', levelText: 'text-amber-300', desc: 'Project delivery, architecture, and business analysis.',
              certs: [
                { name: 'CAPM',          org: 'PMI',      track: 'agile',      desc: 'Certified Associate in Project Management — entry-level PM cert.' },
                { name: 'CBAP',          org: 'IIBA',     track: 'foundation', desc: 'Certified Business Analysis Professional — requirements and gaps.' },
                { name: 'AWS SAA-C03',   org: 'Amazon',   track: 'architecture', desc: 'Solutions Architect — advise clients on cloud architecture.' },
                { name: 'TOGAF Fdn',     org: 'Open Group',track: 'architecture', desc: 'Enterprise Architecture foundation — system design consulting.' },
                { name: 'AZ-104',        org: 'Microsoft',track: 'foundation', desc: 'Azure Administrator — practical infra knowledge for client advisory.' },
              ]},
            { level: 'Advanced', levelColor: 'from-orange-500 to-amber-500', levelBorder: 'border-orange-500/30', levelBg: 'bg-orange-500/10', levelText: 'text-orange-300', desc: 'Senior consulting, architecture, and delivery leadership.',
              certs: [
                { name: 'PMP',           org: 'PMI',      track: 'agile',      desc: 'Project Management Professional — manage complex consulting engagements.' },
                { name: 'TOGAF 10',      org: 'Open Group',track: 'architecture', desc: 'Enterprise Architecture certified — advise on EA transformation.' },
                { name: 'AWS SAP-C02',   org: 'Amazon',   track: 'architecture', desc: 'Solutions Architect Pro — lead cloud architecture consulting.' },
                { name: 'PMI-ACP',       org: 'PMI',      track: 'agile',      desc: 'Agile Certified Practitioner — lead agile consulting engagements.' },
              ]},
            { level: 'Expert', levelColor: 'from-rose-500 to-pink-500', levelBorder: 'border-rose-500/30', levelBg: 'bg-rose-500/10', levelText: 'text-rose-300', desc: 'Executive consulting, CISO advisory, and management leadership.',
              certs: [
                { name: 'CISSP',         org: 'ISC²',     track: 'leadership', desc: 'Security consulting — advise CISOs and boards on security strategy.' },
                { name: 'CGEIT',         org: 'ISACA',    track: 'leadership', desc: 'IT Governance — align IT strategy with business objectives.' },
                { name: 'MBA (IT)',      org: 'Various',  track: 'leadership', desc: 'Master of Business Administration — business + technology leadership.' },
                { name: 'PgMP',          org: 'PMI',      track: 'leadership', desc: 'Program Management Professional — lead complex consulting programs.' },
              ]},
          ].map((row, rowIdx, arr) => {
            const ts: Record<string, { bg: string; border: string; text: string; dot: string }> = {
              foundation:   { bg: 'bg-blue-500/10',   border: 'border-blue-500/25',   text: 'text-blue-300',   dot: 'bg-blue-500' },
              agile:        { bg: 'bg-amber-500/10',  border: 'border-amber-500/25',  text: 'text-amber-300',  dot: 'bg-amber-500' },
              architecture: { bg: 'bg-emerald-500/10',border: 'border-emerald-500/25',text: 'text-emerald-300',dot: 'bg-emerald-500' },
              leadership:   { bg: 'bg-purple-500/10', border: 'border-purple-500/25', text: 'text-purple-300', dot: 'bg-purple-500' },
            };
            const isLast = rowIdx === arr.length - 1;
            return (
              <motion.div key={row.level} className="relative" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: rowIdx * 0.12, duration: 0.5 }}>
                {!isLast && <div className="absolute left-[1.15rem] top-full w-px h-8 bg-white/10 z-10" />}
                <div className="flex gap-5 mb-8">
                  <div className="flex flex-col items-center flex-shrink-0 pt-1">
                    <div className={`w-10 h-10 rounded-sm ${row.levelBg} border ${row.levelBorder} flex items-center justify-center`}>
                      <span className={`text-xs font-black ${row.levelText}`}>{rowIdx + 1}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className={`text-sm font-extrabold uppercase tracking-widest ${row.levelText}`}>{row.level}</span>
                      <span className="text-xs text-white/20">—</span>
                      <span className="text-xs text-gray-500">{row.desc}</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                      {row.certs.map((cert) => { const s = ts[cert.track]; return (
                        <div key={cert.name} className={`group relative rounded-sm border ${s.border} ${s.bg} p-3 hover:bg-[#0B1120] transition-all duration-200 cursor-default`}>
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

        {/* CTA Section - Ultra Clean */}
        <motion.div
          className="relative border border-white/10 rounded-sm p-12 lg:p-16 text-center bg-[#0f172a] shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Top Accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-purple-500" />
          
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-purple-500/30 bg-purple-500/10">
              <Lightbulb className="w-3.5 h-3.5 text-purple-500" />
              <span className="text-xs font-semibold text-purple-300 uppercase tracking-widest">IT Consulting</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
                <span className="text-white">Ready to Transform</span>
                <br />
                <span className="text-purple-500">
                  Your IT Strategy?
                </span>
              </h2>
              <p className="text-base lg:text-lg text-gray-400 max-w-2xl mx-auto">
                Schedule a consultation to discuss your business challenges and discover how we can help.
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 py-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/10" />
              <div className="w-1.5 h-1.5 rounded-sm bg-purple-500/50" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/10" />
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to={Routes.CONTACT}>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-sm font-bold uppercase tracking-wide transition-colors">
                  Schedule a Consultation <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link to={Routes.HOME}>
                <button className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white/40 text-white rounded-sm font-bold uppercase tracking-wide transition-colors">
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
