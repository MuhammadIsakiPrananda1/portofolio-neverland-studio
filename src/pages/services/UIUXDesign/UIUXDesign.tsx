import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Palette, CheckCircle, ArrowRight, Layout, Smartphone, Eye, 
  Users, MousePointer, Sparkles, TrendingUp, Award, Clock, Target
} from 'lucide-react';
import SectionTitle from '@components/molecules/SectionTitle';
import { Routes } from '@config/constants';

export default function UIUXDesignPage() {
  const features = [
    {
      icon: Layout,
      title: 'User Interface Design',
      description: 'Beautiful, intuitive interfaces that users love with modern design principles.',
    },
    {
      icon: Eye,
      title: 'User Experience',
      description: 'Research-driven UX strategies that enhance user satisfaction and engagement.',
    },
    {
      icon: Smartphone,
      title: 'Responsive Design',
      description: 'Designs that adapt perfectly to any screen size and device type.',
    },
    {
      icon: MousePointer,
      title: 'Interactive Prototypes',
      description: 'Clickable prototypes to test and validate designs before development.',
    },
  ];

  const benefits = [
    {
      icon: Users,
      title: 'User Research',
      description: 'In-depth user research and personas to understand your target audience.',
    },
    {
      icon: Sparkles,
      title: 'Design Systems',
      description: 'Scalable design systems with reusable components and style guides.',
    },
    {
      icon: Target,
      title: 'Usability Testing',
      description: 'Comprehensive testing to ensure optimal user experience and conversion.',
    },
    {
      icon: TrendingUp,
      title: 'Conversion Optimization',
      description: 'Data-driven design decisions to maximize conversions and engagement.',
    },
  ];

  const stats = [
    { value: '300+', label: 'Designs Created' },
    { value: '85%', label: 'Conversion Increase' },
    { value: '95%', label: 'User Satisfaction' },
    { value: '150+', label: 'Happy Clients' },
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
            <Palette className="w-12 h-12 text-violet-500" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6 text-white drop-shadow-[0_0_10px_rgba(139,92,246,0.2)]">
            UI/UX Design
          </h1>
          
          <p className="text-lg lg:text-xl text-slate-400 font-medium max-w-3xl mx-auto mb-8">
            Create stunning user interfaces and exceptional experiences. 
            We blend aesthetics with functionality to deliver designs that users love.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={Routes.CONTACT}>
              <button className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white rounded-sm font-bold uppercase tracking-wide px-6 py-3 border-none group transition-all">
                Start Your Design <ArrowRight className="w-5 h-5" />
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
            subtitle="Design Services"
            title="Comprehensive UI/UX Design Solutions"
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
            subtitle="Our Approach"
            title="What Makes Our Designs Exceptional"
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
                  'Award-winning design team with 10+ years experience',
                  'User-centered design methodology',
                  'Modern design tools (Figma, Sketch, Adobe XD)',
                  'Accessibility and inclusive design focus',
                  'Fast turnaround with iterative feedback',
                  'Design handoff with developer collaboration'
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
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">Award Winning</h4>
                <p className="text-slate-500 font-mono text-xs">300+ designs</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-violet-500/30 transition-all duration-300">
                <Clock className="w-10 h-10 text-violet-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">Fast Delivery</h4>
                <p className="text-slate-500 font-mono text-xs">2-3 weeks average</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-violet-500/30 transition-all duration-300">
                <TrendingUp className="w-10 h-10 text-violet-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">High Impact</h4>
                <p className="text-slate-500 font-mono text-xs">85% conversion boost</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-violet-500/30 transition-all duration-300">
                <Users className="w-10 h-10 text-violet-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">150+ Clients</h4>
                <p className="text-slate-500 font-mono text-xs">Satisfied worldwide</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── UI/UX Design Certification Roadmap ─── */}
        <motion.div className="mb-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <SectionTitle subtitle="Career Path" title="UI/UX Design Certification Roadmap" className="mb-4" />
          <p className="text-center text-gray-400 text-sm mb-12 max-w-2xl mx-auto">
            From design fundamentals to expert-level UX strategy — certifications for modern product designers.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
            {[{ label: 'UX Research', color: 'bg-blue-500' }, { label: 'Visual Design', color: 'bg-pink-500' }, { label: 'Interaction', color: 'bg-emerald-500' }, { label: 'Design Systems', color: 'bg-purple-500' }].map(t => (
              <div key={t.label} className="flex items-center gap-2"><div className={`w-3 h-3 rounded-sm ${t.color}`} /><span className="text-xs font-bold uppercase tracking-wider text-slate-400">{t.label}</span></div>
            ))}
          </div>
          {[
            { level: 'Beginner', levelColor: 'from-sky-500 to-cyan-400', levelBorder: 'border-sky-500/30', levelBg: 'bg-sky-500/10', levelText: 'text-sky-300', desc: 'Design fundamentals and tooling basics.',
              certs: [
                { name: 'Google UX Design', org: 'Google',    track: 'research',    desc: 'Google UX Design Certificate — design thinking, wireframing, Figma.' },
                { name: 'Figma Essentials', org: 'Figma',     track: 'visual',      desc: 'Official Figma certification — components, prototyping, auto-layout.' },
                { name: 'ACP Adobe XD',    org: 'Adobe',     track: 'visual',      desc: 'Adobe Certified Professional XD — UI design and prototyping.' },
                { name: 'Canva Design',    org: 'Canva',     track: 'visual',      desc: 'Canva Design certification — visual fundamentals and branding.' },
              ]},
            { level: 'Intermediate', levelColor: 'from-amber-500 to-yellow-400', levelBorder: 'border-amber-500/30', levelBg: 'bg-amber-500/10', levelText: 'text-amber-300', desc: 'User research, accessibility, and component design.',
              certs: [
                { name: 'NN/g UX Cert',   org: 'Nielsen NN', track: 'research',    desc: 'Nielsen Norman Group UX Certificate — usability research methods.' },
                { name: 'CPACC',          org: 'IAAP',       track: 'research',    desc: 'Certified Professional in Accessibility Core Competencies.' },
                { name: 'Interaction Des.', org: 'IxDF',    track: 'interaction', desc: 'Interaction Design Foundation — IxD, cognitive psychology.' },
                { name: 'CSS / HTML Cert', org: 'fCC',       track: 'interaction', desc: 'freeCodeCamp Responsive Web Design — HTML/CSS for designers.' },
                { name: 'Sketch Certified',org: 'Sketch',    track: 'visual',      desc: 'Sketch Certified Designer — advanced vector and symbol systems.' },
              ]},
            { level: 'Advanced', levelColor: 'from-orange-500 to-amber-500', levelBorder: 'border-orange-500/30', levelBg: 'bg-orange-500/10', levelText: 'text-orange-300', desc: 'Product strategy, design systems, and leadership.',
              certs: [
                { name: 'IxDF Advanced UX', org: 'IxDF',    track: 'research',    desc: 'Advanced UX Research and Design — advanced methodologies.' },
                { name: 'CPUX-F',          org: 'UXQB',     track: 'research',    desc: 'Certified Professional for Usability and UX — Foundation level.' },
                { name: 'Framer Motion',   org: 'Framer',   track: 'interaction', desc: 'Framer Certified Expert — advanced micro-animation and prototyping.' },
                { name: 'Design Tokens',   org: 'W3C',      track: 'systems',     desc: 'Design System Token specification — scalable design systems.' },
              ]},
            { level: 'Expert', levelColor: 'from-rose-500 to-pink-500', levelBorder: 'border-rose-500/30', levelBg: 'bg-rose-500/10', levelText: 'text-rose-300', desc: 'Strategic design leadership and enterprise UX.',
              certs: [
                { name: 'NN/g UX Master', org: 'Nielsen NN', track: 'research',  desc: 'UX Master Certificate — advanced specialization in UX strategy.' },
                { name: 'WAS',            org: 'IAAP',       track: 'research',  desc: 'Web Accessibility Specialist — WCAG, ARIA, and inclusive design.' },
                { name: 'PMP',            org: 'PMI',        track: 'systems',   desc: 'Project Management Professional — lead large design programs.' },
                { name: 'CPUX-UR',        org: 'UXQB',       track: 'research',  desc: 'Certified Professional for UX — User Requirements specialization.' },
              ]},
          ].map((row, rowIdx, arr) => {
            const ts: Record<string, { bg: string; border: string; text: string; dot: string }> = {
              research:    { bg: 'bg-blue-500/10',   border: 'border-blue-500/25',   text: 'text-blue-300',   dot: 'bg-blue-500' },
              visual:      { bg: 'bg-pink-500/10',   border: 'border-pink-500/25',   text: 'text-pink-300',   dot: 'bg-pink-500' },
              interaction: { bg: 'bg-emerald-500/10',border: 'border-emerald-500/25',text: 'text-emerald-300',dot: 'bg-emerald-500' },
              systems:     { bg: 'bg-purple-500/10', border: 'border-purple-500/25', text: 'text-purple-300', dot: 'bg-purple-500' },
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
              <Palette className="w-3.5 h-3.5 text-violet-500" />
              <span className="text-xs font-semibold text-violet-400 uppercase tracking-widest">Design Better</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
                <span className="text-white">Ready to Create</span>
                <br />
                <span className="text-violet-500">
                  Amazing Experiences?
                </span>
              </h2>
              <p className="text-base lg:text-lg text-slate-400 font-medium max-w-2xl mx-auto">
                Let's design beautiful, user-friendly interfaces that delight users and drive business results.
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
                  Start Your Design Project <ArrowRight className="w-5 h-5" />
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
