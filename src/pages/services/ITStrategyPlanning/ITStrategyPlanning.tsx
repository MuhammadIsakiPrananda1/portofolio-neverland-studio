import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, Lightbulb, TrendingUp, FileText, BarChart, CheckCircle, ArrowRight, Award, Clock, Zap } from 'lucide-react';
import SectionTitle from '@components/molecules/SectionTitle';
import { Routes } from '@config/constants';

export default function ITStrategyPlanningPage() {
  const stats = [
    { value: '150+', label: 'Strategies Delivered' },
    { value: '80%', label: 'ROI Increase' },
    { value: '95%', label: 'Client Satisfaction' },
    { value: '24/7', label: 'Support' },
  ];

  const services = [
    {
      icon: Target,
      title: 'Strategic Planning',
      description: 'Develop comprehensive IT strategies aligned with business objectives.',
    },
    {
      icon: Lightbulb,
      title: 'Technology Roadmap',
      description: 'Create multi-year technology roadmaps for digital transformation.',
    },
    {
      icon: BarChart,
      title: 'Business Analysis',
      description: 'Analyze current technology landscape and identify opportunities.',
    },
    {
      icon: TrendingUp,
      title: 'ROI Optimization',
      description: 'Maximize return on technology investments with data-driven insights.',
    },
  ];

  const features = [
    {
      icon: FileText,
      title: 'IT Alignment',
      description: 'Ensure IT initiatives support and drive business goals and objectives.',
    },
    {
      icon: Target,
      title: 'Goal Setting',
      description: 'Define clear, measurable IT goals with realistic timelines and milestones.',
    },
    {
      icon: TrendingUp,
      title: 'Budget Planning',
      description: 'Develop comprehensive IT budgets with accurate cost projections.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation Strategy',
      description: 'Identify emerging technologies and innovation opportunities for growth.',
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
            <Target className="w-12 h-12 text-purple-500" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6">
            <span className="text-white drop-shadow-[0_0_10px_rgba(168,85,247,0.2)]">
              IT Strategy &amp; Planning
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-slate-400 font-medium max-w-3xl mx-auto mb-8">
            Align your technology initiatives with business goals through comprehensive strategic planning 
            and roadmap development for sustainable growth.
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
            subtitle="What We Offer"
            title="Comprehensive IT Strategy Services"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-sm p-6 border border-white/5 bg-[#0f172a] hover:border-purple-500/30 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="inline-flex p-3 rounded-sm bg-[#0B1120] border border-white/10 mb-4">
                  <service.icon className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
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
            subtitle="Key Capabilities"
            title="Strategic Planning Features"
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

        {/* Approach Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Our Process"
            title="Strategy Development Approach"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: '01', title: 'Discovery', desc: 'Understand business goals' },
              { step: '02', title: 'Analysis', desc: 'Assess current state' },
              { step: '03', title: 'Planning', desc: 'Develop strategy' },
              { step: '04', title: 'Roadmap', desc: 'Create implementation plan' },
              { step: '05', title: 'Execution', desc: 'Guide implementation' },
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
                Why Choose Our IT Strategy Services?
              </h2>
              <div className="space-y-4">
                {[
                  'Proven track record with 150+ strategy projects',
                  'Experienced consultants with diverse industry expertise',
                  'Data-driven approach with measurable outcomes',
                  'Collaborative process with stakeholder engagement',
                  'Practical roadmaps with realistic timelines',
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
                <h4 className="text-lg font-bold text-white mb-1">Fast Delivery</h4>
                <p className="text-slate-500 text-xs">4-6 weeks typical</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-purple-500/30 transition-all duration-300">
                <Target className="w-10 h-10 text-purple-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">150+ Projects</h4>
                <p className="text-slate-500 text-xs">Successfully delivered</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-purple-500/30 transition-all duration-300">
                <Zap className="w-10 h-10 text-purple-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">80% ROI</h4>
                <p className="text-slate-500 text-xs">Average increase</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── IT Strategy Certification Roadmap ─── */}
        <motion.div className="mb-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <SectionTitle subtitle="Career Path" title="IT Strategy & Planning Certification Roadmap" className="mb-4" />
          <p className="text-center text-gray-400 text-sm mb-12 max-w-2xl mx-auto">
            From business analysis to C-suite IT strategy leadership — structured certifications for IT strategists.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
            {[{ label: 'Business & IT', color: 'bg-blue-500' }, { label: 'Agile / PM', color: 'bg-amber-500' }, { label: 'Architecture', color: 'bg-emerald-500' }, { label: 'Strategy & Leadership', color: 'bg-purple-500' }].map(t => (
              <div key={t.label} className="flex items-center gap-2"><div className={`w-3 h-3 rounded-sm ${t.color}`} /><span className="text-xs text-gray-400">{t.label}</span></div>
            ))}
          </div>
          {[
            { level: 'Beginner', levelColor: 'from-sky-500 to-cyan-400', levelBorder: 'border-sky-500/30', levelBg: 'bg-sky-500/10', levelText: 'text-sky-300', desc: 'IT, business, and project fundamentals.',
              certs: [
                { name: 'ITIL 4 Fdn',    org: 'Axelos',   track: 'biz',  desc: 'IT service management foundation — aligns IT to business goals.' },
                { name: 'CompTIA IT+',   org: 'CompTIA',  track: 'biz',  desc: 'Core IT knowledge — foundation for strategic planning roles.' },
                { name: 'Scrum PSM I',   org: 'Scrum.org',track: 'agile', desc: 'Agile Scrum basics — iterative delivery for IT strategy projects.' },
                { name: 'AWS CLF-C02',  org: 'Amazon',   track: 'biz',  desc: 'Cloud Practitioner — strategic understanding of cloud business value.' },
              ]},
            { level: 'Intermediate', levelColor: 'from-amber-500 to-yellow-400', levelBorder: 'border-amber-500/30', levelBg: 'bg-amber-500/10', levelText: 'text-amber-300', desc: 'Strategic planning, business analysis, and architecture.',
              certs: [
                { name: 'CAPM',          org: 'PMI',      track: 'agile', desc: 'CAPM — manage IT strategy planning projects effectively.' },
                { name: 'CBAP',          org: 'IIBA',     track: 'biz',  desc: 'Certified Business Analysis Professional — requirements and strategy.' },
                { name: 'TOGAF Fdn',     org: 'Open Group',track: 'arch', desc: 'Enterprise Architecture Foundation — strategic IT design frameworks.' },
                { name: 'AWS SAA-C03',   org: 'Amazon',   track: 'arch', desc: 'Solutions Architect — assess and plan cloud-based IT strategies.' },
              ]},
            { level: 'Advanced', levelColor: 'from-orange-500 to-amber-500', levelBorder: 'border-orange-500/30', levelBg: 'bg-orange-500/10', levelText: 'text-orange-300', desc: 'Enterprise IT strategy execution and planning leadership.',
              certs: [
                { name: 'PMP',           org: 'PMI',      track: 'agile', desc: 'PMP — lead complex multi-year IT strategy programs.' },
                { name: 'TOGAF 10',      org: 'Open Group',track: 'arch', desc: 'TOGAF Certified — architect enterprise-wide IT strategies.' },
                { name: 'CISM',          org: 'ISACA',    track: 'governance', desc: 'Security manager — include cybersecurity in IT strategic planning.' },
                { name: 'SAFe SA',       org: 'Scaled Agile',track: 'agile', desc: 'SAFe Solution Architect — scale agile strategy delivery.' },
              ]},
            { level: 'Expert', levelColor: 'from-rose-500 to-pink-500', levelBorder: 'border-rose-500/30', levelBg: 'bg-rose-500/10', levelText: 'text-rose-300', desc: 'CIO/CTO advisory, IT governance, and enterprise strategy.',
              certs: [
                { name: 'CGEIT',         org: 'ISACA',    track: 'governance', desc: 'Governance of Enterprise IT — board-level IT strategy alignment.' },
                { name: 'MIT CIO',       org: 'MIT',      track: 'governance', desc: 'MIT Sloan CIO Leadership — executive IT strategic planning.' },
                { name: 'MBA (Technology)',org: 'Various',track: 'governance', desc: 'Technology MBA — blend business strategy with IT leadership.' },
                { name: 'PgMP',          org: 'PMI',      track: 'agile',      desc: 'Program Manager Professional — orchestrate enterprise IT programs.' },
              ]},
          ].map((row, rowIdx, arr) => {
            const ts: Record<string, { bg: string; border: string; text: string; dot: string }> = {
              biz:        { bg: 'bg-blue-500/10',   border: 'border-blue-500/25',   text: 'text-blue-300',   dot: 'bg-blue-500' },
              agile:      { bg: 'bg-amber-500/10',  border: 'border-amber-500/25',  text: 'text-amber-300',  dot: 'bg-amber-500' },
              arch:       { bg: 'bg-emerald-500/10',border: 'border-emerald-500/25',text: 'text-emerald-300',dot: 'bg-emerald-500' },
              governance: { bg: 'bg-purple-500/10', border: 'border-purple-500/25', text: 'text-purple-300', dot: 'bg-purple-500' },
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
              <Target className="w-3.5 h-3.5 text-purple-500" />
              <span className="text-xs font-semibold text-purple-300 uppercase tracking-widest">IT Strategy</span>
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
                Schedule a consultation to discuss your business goals and develop a winning IT strategy.
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
                  Schedule Strategy Session <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link to={Routes.HOME}>
                <button className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white/40 text-white rounded-sm font-bold uppercase tracking-wide transition-colors">
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
