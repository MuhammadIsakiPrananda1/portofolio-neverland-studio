import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Flag, Target, Lock, Code, FileCode, 
  Binary, Network, Zap,
  Award, Users, CheckCircle,
  ArrowRight, Lightbulb,
  Shield, GraduationCap, TrendingUp,
  Terminal
} from 'lucide-react';
import Button from '@components/atoms/Button';
import SectionTitle from '@components/molecules/SectionTitle';
import { staggerContainer } from '@utils/animations';
import { Routes } from '@config/constants';

export default function CTFPage() {
  const stats = [
    { value: '500+', label: 'Global CTF Events/Year' },
    { value: '100K+', label: 'Active Participants' },  
    { value: '85%', label: 'Skill Improvement' },
    { value: 'Top 10', label: 'Career Booster Skill' },
  ];

  const benefits = [
    {
      icon: Target,
      title: 'Practical Experience',
      description: 'Learn by doing - solve real-world security challenges in a safe, controlled environment.',
    },
    {
      icon: GraduationCap,
      title: 'Skill Development',
      description: 'Build expertise in penetration testing, cryptography, and vulnerability analysis through hands-on practice.',
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Enhance your cybersecurity career with practical problem-solving experience valued by employers.',
    },
    {
      icon: Users,
      title: 'Community Learning',
      description: 'Join a global community of security professionals and enthusiasts, share knowledge and grow together.',
    },
  ];

  const categories = [
    { 
      id: 'web', 
      name: 'Web Exploitation', 
      icon: Code,
      description: 'Master web vulnerabilities including SQL injection, XSS, CSRF, and authentication bypass techniques.',
    },
    { 
      id: 'crypto', 
      name: 'Cryptography', 
      icon: Lock,
      description: 'Learn to break ciphers, understand encryption mechanisms, and analyze cryptographic protocols.',
    },
    { 
      id: 'forensics', 
      name: 'Digital Forensics', 
      icon: FileCode,
      description: 'Analyze files, memory dumps, network captures, and uncover hidden information in digital artifacts.',
    },
    { 
      id: 'reverse', 
      name: 'Reverse Engineering', 
      icon: Binary,
      description: 'Understand compiled binaries, malware analysis, and assembly code reverse engineering.',
    },
    { 
      id: 'pwn', 
      name: 'Binary Exploitation', 
      icon: Target,
      description: 'Exploit memory corruption vulnerabilities including buffer overflows, ROP chains, and format strings.',
    },
    { 
      id: 'network', 
      name: 'Network Security', 
      icon: Network,
      description: 'Master packet analysis, protocol exploitation, and network-based attack techniques.',
    },
  ];

  const whyCTF = [
    {
      icon: Shield,
      title: 'Build Defense Skills',
      description: 'Understanding attack vectors helps you build better defenses. CTF challenges teach you to think like an attacker to protect like a defender.',
    },
    {
      icon: Lightbulb,
      title: 'Problem-Solving Excellence',
      description: 'Develop critical thinking and creative problem-solving skills that are essential for cybersecurity professionals in real-world scenarios.',
    },
    {
      icon: Award,
      title: 'Industry Recognition',
      description: 'CTF participation is highly valued by employers and demonstrates practical security knowledge beyond theoretical certifications.',
    },
    {
      icon: TrendingUp,
      title: 'Continuous Learning',
      description: 'Stay updated with the latest attack techniques and security trends through challenging scenarios that mirror real-world threats.',
    },
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">

        {/* ─── CTF Hub Live Entry Banner ─── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <Link to={Routes.CTF_HUB} className="group block">
            <div className="relative overflow-hidden rounded-sm border border-red-500/40 bg-gradient-to-r from-red-950/40 via-[#0f172a] to-[#0f172a] hover:border-red-500/70 transition-all duration-300 p-6 lg:p-8">
              {/* Animated top border */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-red-500" />
              {/* Glow bg */}
              <div className="absolute top-0 left-0 w-64 h-full bg-red-500/5 blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="p-3.5 rounded-sm bg-red-500/15 border border-red-500/30 group-hover:bg-red-500/25 transition-colors">
                    <Terminal className="w-8 h-8 text-red-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-400">Live Platform</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Online</span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-black uppercase tracking-tight text-white group-hover:text-red-300 transition-colors">
                      Enter CTF Hub
                    </h2>
                    <p className="text-slate-400 text-sm font-medium mt-1">
                      13 live challenges · Solve flags · Earn points · Climb the leaderboard
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-red-600 group-hover:bg-red-700 transition-colors rounded-sm px-6 py-3 text-white font-black uppercase tracking-wide text-sm whitespace-nowrap">
                  Play Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Hero Section - Clean & Modern */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Subtle Accent Line */}
          <div className="w-20 h-1 bg-red-500 mx-auto mb-8 rounded-sm" />
          
          {/* Icon Badge - Minimal */}
          <div className="inline-flex p-4 rounded-sm border border-red-500/30 bg-red-500/10 mb-6">
            <Flag className="w-12 h-12 text-red-500" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black mb-6 uppercase tracking-tight">
            <span className="text-white drop-shadow-[0_0_10px_rgba(239,68,68,0.2)]">
              Capture The Flag Training
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-slate-400 font-medium max-w-3xl mx-auto mb-8">
            Learn cybersecurity through hands-on challenges. CTF competitions test your ability 
            to find and exploit vulnerabilities in a safe, legal environment.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={Routes.CONTACT}>
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white rounded-sm font-bold uppercase tracking-wide border-none group transition-all" rightIcon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}>
                Start Learning
              </Button>
            </Link>
            <Link to={Routes.CYBER_SECURITY}>
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/5 hover:border-white/40 rounded-sm font-bold uppercase tracking-wide transition-all">
                View All Services
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Section - Clean Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-24"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="relative rounded-sm p-6 text-center border border-white/5 hover:border-red-500/50 transition-all duration-300 bg-[#0f172a] shadow-sm group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="text-3xl lg:text-4xl font-black text-white font-mono mb-2 group-hover:text-red-400 transition-colors">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                {stat.label}
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-red-500 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* What is CTF Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Introduction"
            title="What is Capture The Flag?"
            className="mb-12"
          />
          
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-sm p-8 lg:p-10 border border-white/5 bg-[#0f172a] shadow-sm">
              <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                CTF (Capture The Flag) is a cybersecurity competition where participants solve security challenges 
                to find hidden "flags". Each challenge tests different skills - from web exploitation and cryptography 
                to reverse engineering and forensics.
              </p>
              <p className="text-slate-400 font-medium leading-relaxed">
                These competitions simulate real-world security scenarios in a safe, legal environment, making them 
                perfect for learning offensive security techniques, testing your skills, and understanding how attackers 
                think. Whether you're just starting in cybersecurity or are an experienced professional, CTFs offer 
                valuable hands-on experience that complements theoretical knowledge.
              </p>
            </div>
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
            subtitle="Why Learn CTF"
            title="Key Benefits of CTF Training"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-sm p-6 border border-white/5 bg-[#0f172a] shadow-sm hover:border-red-500/50 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex-shrink-0 p-2.5 rounded-sm bg-[#0B1120] border border-white/10 group-hover:border-red-500/30 transition-colors inline-flex mb-4">
                  <benefit.icon className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-tight group-hover:text-red-400 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-slate-400 font-medium text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Categories Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Challenge Types"
            title="CTF Categories & Disciplines"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, idx) => (
              <motion.div
                key={category.id}
                className="relative rounded-sm p-6 border border-white/5 bg-[#0f172a] shadow-sm hover:border-red-500/50 transition-all duration-300 group"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 p-2.5 rounded-sm bg-[#0B1120] border border-white/10 group-hover:border-red-500/30 transition-colors">
                    <category.icon className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white pt-1 uppercase tracking-tight group-hover:text-red-400 transition-colors">
                    {category.name}
                  </h3>
                </div>
                <p className="text-slate-400 font-medium text-sm leading-relaxed">
                  {category.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why CTF Matters Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Impact"
            title="Why CTF Training Matters"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyCTF.map((item, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-sm p-6 border border-white/5 bg-[#0f172a] shadow-sm hover:border-red-500/50 transition-all duration-300 group"
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2.5 rounded-sm bg-[#0B1120] border border-white/10 group-hover:border-red-500/30 transition-colors">
                    <item.icon className="w-5 h-5 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-tight group-hover:text-red-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 font-medium text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── CTF Certification Roadmap ─── */}
        <motion.div className="mb-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <SectionTitle subtitle="Career Path" title="CTF & Cybersecurity Certification Roadmap" className="mb-4" />
          <p className="text-center text-gray-400 text-sm mb-12 max-w-2xl mx-auto">
            From CTF beginner to certified security professional — build real-world security skills step by step.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
            {[{ label: 'Foundation', color: 'bg-blue-500' }, { label: 'Offensive / CTF', color: 'bg-red-500' }, { label: 'Forensics / RE', color: 'bg-amber-500' }, { label: 'Professional', color: 'bg-purple-500' }].map(t => (
              <div key={t.label} className="flex items-center gap-2"><div className={`w-3 h-3 rounded-sm ${t.color}`} /><span className="text-xs font-bold uppercase tracking-wider text-slate-400">{t.label}</span></div>
            ))}
          </div>
          {[
            { level: 'Beginner', levelColor: 'from-sky-500 to-cyan-400', levelBorder: 'border-sky-500/30', levelBg: 'bg-sky-500/10', levelText: 'text-sky-300', desc: 'Security and networking basics for CTF participation.',
              certs: [
                { name: 'CompTIA ITF+',    org: 'CompTIA',  track: 'foundation', desc: 'IT fundamentals — the starting point for all security work.' },
                { name: 'CompTIA Net+',    org: 'CompTIA',  track: 'foundation', desc: 'TCP/IP, routing, switching — essential for network CTF challenges.' },
                { name: 'CompTIA Sec+',    org: 'CompTIA',  track: 'foundation', desc: 'Security concepts: cryptography, firewalls, access control.' },
                { name: 'Google Cybersec', org: 'Google',   track: 'foundation', desc: 'Google Cybersecurity Certificate — entry-level security path.' },
                { name: 'eJPT',            org: 'INE',      track: 'offensive',  desc: 'eLearnSecurity Junior Penetration Tester — first hands-on hacking cert.' },
              ]},
            { level: 'Intermediate', levelColor: 'from-amber-500 to-yellow-400', levelBorder: 'border-amber-500/30', levelBg: 'bg-amber-500/10', levelText: 'text-amber-300', desc: 'Hands-on exploitation, web hacking, and forensics.',
              certs: [
                { name: 'CEH',             org: 'EC-Council', track: 'offensive',  desc: 'Certified Ethical Hacker — web exploits, scanning, and social engineering.' },
                { name: 'CySA+',           org: 'CompTIA',    track: 'foundation', desc: 'SOC analyst skills: SIEM, threat analysis, incident response.' },
                { name: 'CHFI',            org: 'EC-Council', track: 'forensics',  desc: 'Computer Hacking Forensic Investigator — digital evidence analysis.' },
                { name: 'GWAPT',           org: 'GIAC',       track: 'offensive',  desc: 'Web Application Penetration Tester — SQLi, XSS, CSRF, SSRF.' },
                { name: 'HTB CDSA',        org: 'HackTheBox', track: 'forensics',  desc: 'Certified Defensive Security Analyst — SIEM and SOC operations.' },
              ]},
            { level: 'Advanced', levelColor: 'from-orange-500 to-amber-500', levelBorder: 'border-orange-500/30', levelBg: 'bg-orange-500/10', levelText: 'text-orange-300', desc: 'Advanced exploitation, reverse engineering, and malware analysis.',
              certs: [
                { name: 'OSCP',            org: 'OffSec',   track: 'offensive',  desc: 'Offensive Security Certified Professional — the top pentesting cert.' },
                { name: 'GREM',            org: 'GIAC',     track: 'forensics',  desc: 'Reverse Engineering Malware — binary analysis and RE techniques.' },
                { name: 'GCIH',            org: 'GIAC',     track: 'forensics',  desc: 'Incident Handler — detect, respond, and recover from cyber incidents.' },
                { name: 'PNPT',            org: 'TCM Sec',  track: 'offensive',  desc: 'Practical Network Penetration Tester — realistic network labs.' },
                { name: 'eCPPTv2',         org: 'INE',      track: 'offensive',  desc: 'Professional Penetration Tester — advanced exploitation techniques.' },
              ]},
            { level: 'Expert', levelColor: 'from-rose-500 to-pink-500', levelBorder: 'border-rose-500/30', levelBg: 'bg-rose-500/10', levelText: 'text-rose-300', desc: 'Elite cybersecurity and research-level certifications.',
              certs: [
                { name: 'OSED',            org: 'OffSec',   track: 'offensive',  desc: 'Windows User Mode Exploit Developer — advanced x86/x64 exploitation.' },
                { name: 'OSWE',            org: 'OffSec',   track: 'offensive',  desc: 'Web Expert — advanced web app exploitation and source code review.' },
                { name: 'CISSP',           org: 'ISC²',     track: 'professional', desc: 'Gold standard senior security professional certification.' },
                { name: 'GXPN',            org: 'GIAC',     track: 'offensive',  desc: 'Exploit Researcher and Advanced Penetration Tester.' },
              ]},
          ].map((row, rowIdx, arr) => {
            const ts: Record<string, { bg: string; border: string; text: string; dot: string }> = {
              foundation:  { bg: 'bg-blue-500/10',   border: 'border-blue-500/25',   text: 'text-blue-300',   dot: 'bg-blue-500' },
              offensive:   { bg: 'bg-red-500/10',    border: 'border-red-500/25',    text: 'text-red-300',    dot: 'bg-red-500' },
              forensics:   { bg: 'bg-amber-500/10',  border: 'border-amber-500/25',  text: 'text-amber-300',  dot: 'bg-amber-500' },
              professional:{ bg: 'bg-purple-500/10', border: 'border-purple-500/25', text: 'text-purple-300', dot: 'bg-purple-500' },
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
                        <div key={cert.name} className={`group relative rounded-sm border ${s.border} ${s.bg} p-3 transition-colors duration-300 cursor-default hover:bg-[#0B1120]`}>
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
          className="relative rounded-sm p-10 lg:p-14 border border-white/10 bg-[#0f172a] shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-red-500/30 bg-red-500/10 mb-6">
              <Zap className="w-4 h-4 text-red-500" />
              <span className="text-xs font-bold text-red-400 uppercase tracking-widest">Get Started</span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-white mb-4">
              Ready to Start Your CTF Journey?
            </h2>
            <p className="text-slate-400 font-medium mb-8 max-w-2xl">
              Join our cybersecurity training program and learn CTF skills from industry experts. 
              We offer comprehensive training, expert mentoring, and practical challenges to accelerate your growth.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to={Routes.CONTACT}>
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white rounded-sm font-bold uppercase tracking-wide border-none group transition-all" rightIcon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}>
                  Get Started Today
                </Button>
              </Link>
              <Link to={Routes.CYBER_SECURITY}>
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/5 hover:border-white/40 rounded-sm font-bold uppercase tracking-wide transition-all">
                  Explore Services
                </Button>
              </Link>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-white mb-1 uppercase tracking-tight">Expert Mentors</div>
                  <div className="text-xs text-slate-400 font-medium">Learn from experienced professionals</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-white mb-1 uppercase tracking-tight">Hands-On Practice</div>
                  <div className="text-xs text-slate-400 font-medium">Real challenges in safe environments</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-white mb-1 uppercase tracking-tight">Industry Certification</div>
                  <div className="text-xs text-slate-400 font-medium">Recognized credentials to boost your career</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
