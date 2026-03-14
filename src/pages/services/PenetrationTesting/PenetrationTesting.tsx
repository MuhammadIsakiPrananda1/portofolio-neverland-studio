import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Shield, Lock, Bug, Target, FileText, ArrowRight } from 'lucide-react';
import Button from '@components/atoms/Button';
import SectionTitle from '@components/molecules/SectionTitle';
import { Routes } from '@config/constants';
import { slideUp, staggerContainer, staggerItem } from '@utils/animations';

export default function PenetrationTestingPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        {/* Service Header - Clean & Modern */}
        <motion.div
          className="text-center mb-20 relative"
          variants={slideUp}
          initial="hidden"
          animate="visible"
        >
          {/* Accent Line */}
          <div className="w-20 h-1 bg-red-500 mx-auto mb-8 rounded-sm" />
          
          {/* Icon Badge */}
          <div className="inline-flex p-4 rounded-sm border border-red-500/30 bg-red-500/10 mb-6">
            <Shield className="w-12 h-12 text-red-500" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black mb-6 uppercase tracking-tight">
            <span className="text-white drop-shadow-[0_0_10px_rgba(239,68,68,0.2)]">
              Penetration Testing
            </span>
          </h1>
          
          <p className="text-lg text-slate-400 font-medium max-w-3xl mx-auto mb-8">
            Comprehensive ethical hacking services to identify vulnerabilities before malicious actors do. 
            Our expert team simulates real-world attacks to test your defenses.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={Routes.CONTACT}>
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white rounded-sm font-bold uppercase tracking-wide border-none group transition-all" rightIcon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}>
                Get a Free Assessment
              </Button>
            </Link>
            <Link to={Routes.CYBER_SECURITY}>
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/5 hover:border-white/40 rounded-sm font-bold uppercase tracking-wide transition-all">
                View All Services
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Key Features Section - Clean Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Features List */}
          <motion.div
            className="border border-white/5 rounded-sm p-8 bg-[#0f172a] hover:border-red-500/50 transition-all duration-300 shadow-sm relative overflow-hidden group"
            variants={staggerItem}
          >
            {/* Accent border top */}
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
            <h2 className="text-2xl font-black mb-6 text-white flex items-center gap-3 uppercase tracking-tight">
              <span className="w-2 h-2 rounded-sm bg-red-500"></span>
              Key Features
            </h2>
            <div className="space-y-3">
              {[
                'External & Internal Network Testing',
                'Web Application Security Assessment',
                'Mobile Application Testing',
                'Social Engineering Simulations',
                'Red Team Operations',
                'Detailed Remediation Reports',
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-3"
                  variants={staggerItem}
                >
                  <Check className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 font-medium group-hover:text-red-100 transition-colors">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            className="border border-white/5 rounded-sm p-8 bg-[#0f172a] hover:border-red-500/50 transition-all duration-300 shadow-sm relative overflow-hidden group"
            variants={staggerItem}
          >
            {/* Accent border top */}
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
            <h2 className="text-2xl font-black mb-6 text-white flex items-center gap-3 uppercase tracking-tight">
              <span className="w-2 h-2 rounded-sm bg-red-500"></span>
              Why Choose This Service
            </h2>
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-bold mb-2 text-white group-hover:text-red-400 transition-colors uppercase tracking-tight">
                  Identify Vulnerabilities Early
                </h3>
                <p className="text-slate-400 font-medium text-sm leading-relaxed">
                  Discover security weaknesses before hackers do, allowing you to patch vulnerabilities proactively.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-white group-hover:text-red-400 transition-colors uppercase tracking-tight">
                  Real-World Attack Simulations
                </h3>
                <p className="text-slate-400 font-medium text-sm leading-relaxed">
                  Our certified ethical hackers use the same techniques as cybercriminals to test your defenses.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-white group-hover:text-red-400 transition-colors uppercase tracking-tight">
                  Compliance & Peace of Mind
                </h3>
                <p className="text-slate-400 font-medium text-sm leading-relaxed">
                  Meet regulatory requirements and gain confidence in your security posture with professional testing.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Methodology Section - Clean */}
        <motion.div
          className="border border-white/5 rounded-sm p-8 lg:p-12 mb-20 bg-[#0B1120]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-black mb-10 text-center text-white uppercase tracking-tight">
            Our Testing Methodology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-white/10" />
            
            {[
              { icon: Target, title: 'Reconnaissance', desc: 'Gather information about target systems' },
              { icon: Bug, title: 'Vulnerability Scanning', desc: 'Identify potential security weaknesses' },
              { icon: Lock, title: 'Exploitation', desc: 'Attempt to exploit discovered vulnerabilities' },
              { icon: FileText, title: 'Reporting', desc: 'Comprehensive documentation with remediation steps' },
            ].map((phase, idx) => (
              <div key={idx} className="text-center group relative z-10">
                <div className="inline-flex p-4 rounded-sm bg-[#0f172a] border border-white/10 mb-4 group-hover:border-red-500/50 group-hover:bg-[#0B1120] transition-all duration-300 shadow-xl">
                  <phase.icon className="w-7 h-7 text-slate-400 group-hover:text-red-500 transition-colors" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white group-hover:text-red-400 transition-colors uppercase tracking-tight">
                  {idx + 1}. {phase.title}
                </h3>
                <p className="text-slate-400 font-medium text-xs leading-relaxed">
                  {phase.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ─── Penetration Testing Certification Roadmap ─── */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Career Path"
            title="Penetration Testing Certification Roadmap"
            className="mb-4"
          />
          <p className="text-center text-slate-400 font-medium text-sm mb-12 max-w-2xl mx-auto">
            A clear progression from security fundamentals to elite offensive security specializations.
            Choose your track and advance from beginner to expert.
          </p>

          {/* Track legend */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
            {[
              { label: 'Foundation',        color: 'bg-blue-500' },
              { label: 'Offensive / Red Team', color: 'bg-red-500' },
              { label: 'Web Hacking',       color: 'bg-amber-500' },
              { label: 'Advanced / APT',    color: 'bg-indigo-500' },
            ].map(t => (
              <div key={t.label} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-sm ${t.color}`} />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{t.label}</span>
              </div>
            ))}
          </div>

          {/* Roadmap levels */}
          {[
            {
              level: 'Beginner',
              levelColor: 'text-sky-400',
              levelBorder: 'border-sky-500/30',
              levelBg: 'bg-[#0f172a]',
              levelText: 'text-sky-400',
              desc: 'Build IT & networking foundations before diving into hacking.',
              certs: [
                { name: 'CompTIA ITF+',    org: 'CompTIA',  track: 'foundation', desc: 'Absolute beginner IT fundamentals.' },
                { name: 'CompTIA A+',      org: 'CompTIA',  track: 'foundation', desc: 'Hardware, OS, and troubleshooting basics.' },
                { name: 'CompTIA Net+',    org: 'CompTIA',  track: 'foundation', desc: 'TCP/IP, routing, protocols — essential for pen testing.' },
                { name: 'CompTIA Linux+',  org: 'CompTIA',  track: 'foundation', desc: 'Linux command line — core skill for all pen testers.' },
                { name: 'Google IT Cert',  org: 'Google', track: 'foundation', desc: 'Free IT fundamentals certificate for career starters.' },
              ],
            },
            {
              level: 'Intermediate',
              levelColor: 'text-yellow-400',
              levelBorder: 'border-yellow-500/30',
              levelBg: 'bg-[#0f172a]',
              levelText: 'text-yellow-400',
              desc: 'Core pen testing and ethical hacking certifications.',
              certs: [
                { name: 'CompTIA Sec+',    org: 'CompTIA',       track: 'foundation', desc: 'Baseline security required before most pen testing certs.' },
                { name: 'CompTIA PenTest+', org: 'CompTIA',      track: 'offensive',  desc: 'Pen testing methodology & vulnerability management.' },
                { name: 'CEH',             org: 'EC-Council',    track: 'offensive',  desc: 'Certified Ethical Hacker — 20 attack domains.' },
                { name: 'eJPT',            org: 'INE',           track: 'offensive',  desc: 'Beginner-friendly hands-on practical pen test cert.' },
                { name: 'TCM PNPT',        org: 'TCM Security',  track: 'offensive',  desc: 'Practical Network Pen Tester — highly practical & affordable.' },
                { name: 'HTB CPTS',        org: 'HackTheBox',    track: 'offensive',  desc: 'Certified Penetration Testing Specialist — advanced labs.' },
                { name: 'Burp Suite Cert', org: 'PortSwigger',   track: 'web',        desc: 'Official Burp Suite Web Security Professional cert.' },
                { name: 'Web Hacking 101', org: 'HackerOne',     track: 'web',        desc: 'Bug bounty & web vulnerability hunting fundamentals.' },
              ],
            },
            {
              level: 'Advanced',
              levelColor: 'text-orange-400',
              levelBorder: 'border-orange-500/30',
              levelBg: 'bg-[#0f172a]',
              levelText: 'text-orange-400',
              desc: 'Professional-grade offensive security certifications.',
              certs: [
                { name: 'OSCP',            org: 'Offensive Sec.', track: 'offensive',  desc: '24h live lab exam — THE gold standard for pen testers.' },
                { name: 'GPEN',            org: 'GIAC',           track: 'offensive',  desc: 'GIAC Penetration Tester — methodology & advanced exploitation.' },
                { name: 'GWAPT',           org: 'GIAC',           track: 'web',        desc: 'GIAC Web Application Penetration Tester.' },
                { name: 'BSCP',            org: 'PortSwigger',    track: 'web',        desc: 'Burp Suite Certified Practitioner — advanced web hacking.' },
                { name: 'CRTE',            org: 'Altered Security', track: 'advanced', desc: 'Certified Red Team Expert — AD, lateral movement, persistence.' },
                { name: 'CRTO',            org: 'Zero-Point Sec.',track: 'advanced',   desc: 'Certified Red Team Operator — Cobalt Strike & C2 ops.' },
              ],
            },
            {
              level: 'Expert',
              levelColor: 'text-red-500',
              levelBorder: 'border-red-500/30',
              levelBg: 'bg-[#0f172a]',
              levelText: 'text-red-500',
              desc: 'Elite offensive security for seasoned red teamers and exploit developers.',
              certs: [
                { name: 'OSED',            org: 'Offensive Sec.', track: 'advanced',  desc: 'Windows exploit dev, shellcode, SEH-based exploits.' },
                { name: 'OSEP',            org: 'Offensive Sec.', track: 'advanced',  desc: 'Evasion techniques, AV bypass, advanced red teaming.' },
                { name: 'OSWE',            org: 'Offensive Sec.', track: 'web',       desc: 'Advanced web attacks: source code review & RCE chains.' },
                { name: 'OSMR',            org: 'Offensive Sec.', track: 'advanced',  desc: 'macOS offensive security & exploitation.' },
                { name: 'CISSP',           org: 'ISC²',           track: 'foundation', desc: 'Senior security management for pen test team leaders.' },
              ],
            },
          ].map((row, rowIdx, arr) => {
            const trackStyle: Record<string, { bg: string; border: string; text: string; dot: string }> = {
              foundation: { bg: 'bg-[#0f172a]',   border: 'border-blue-500/25',   text: 'text-white group-hover:text-blue-400',   dot: 'bg-blue-500' },
              offensive:  { bg: 'bg-[#0f172a]',    border: 'border-red-500/25',    text: 'text-white group-hover:text-red-400',    dot: 'bg-red-500' },
              web:        { bg: 'bg-[#0f172a]',  border: 'border-amber-500/25',  text: 'text-white group-hover:text-amber-400',  dot: 'bg-amber-500' },
              advanced:   { bg: 'bg-[#0f172a]', border: 'border-indigo-500/25', text: 'text-white group-hover:text-indigo-400', dot: 'bg-indigo-500' },
            };
            const isLast = rowIdx === arr.length - 1;
            return (
              <motion.div
                key={row.level}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: rowIdx * 0.12, duration: 0.5 }}
              >
                {!isLast && (
                  <div className="absolute left-[1.15rem] top-full w-px h-8 bg-white/10 z-10" />
                )}
                <div className="flex gap-5 mb-8">
                  {/* Level badge */}
                  <div className="flex flex-col items-center flex-shrink-0 pt-1">
                    <div className={`w-10 h-10 rounded-sm ${row.levelBg} border ${row.levelBorder} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                      <span className={`text-sm font-mono font-black ${row.levelText}`}>{rowIdx + 1}</span>
                    </div>
                  </div>
                  {/* Level content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className={`text-sm font-black uppercase tracking-widest ${row.levelColor}`}>
                        {row.level}
                      </span>
                      <span className="text-xs text-white/20">—</span>
                      <span className="text-xs font-medium text-slate-400">{row.desc}</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                      {row.certs.map((cert) => {
                        const ts = trackStyle[cert.track];
                        return (
                          <div
                            key={cert.name}
                            className={`group relative rounded-sm border ${ts.border} ${ts.bg} p-3 hover:bg-[#0B1120] transition-colors duration-300 cursor-default`}
                          >
                            <div className={`w-2 h-2 rounded-sm ${ts.dot} mb-2`} />
                            <p className={`text-[11px] font-bold ${ts.text} leading-tight mb-1 transition-colors`}>{cert.name}</p>
                            <p className="text-[9px] text-slate-500 uppercase tracking-widest mb-1.5 font-bold">{cert.org}</p>
                            <p className="text-[10px] text-slate-400 font-medium leading-relaxed hidden group-hover:block absolute bottom-full left-0 right-0 z-20 bg-[#0B1120] border border-white/10 rounded-sm p-2 mb-1 shadow-2xl">
                              {cert.desc}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          <p className="text-center text-slate-500 text-xs mt-4 font-mono">
            [SYSINFO] Hover over any certificate card to see a brief description.
          </p>
        </motion.div>

        {/* CTA Section - Ultra Clean */}
        <motion.div
          className="relative border border-white/10 rounded-sm p-12 lg:p-16 text-center bg-[#0f172a] shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Top Accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-red-500" />
          
          <div className="space-y-8 relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-red-500/30 bg-red-500/10">
              <Shield className="w-3.5 h-3.5 text-red-500" />
              <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest">Security Testing</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
                <span className="text-white">Ready to Test</span>
                <br />
                <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                  Your Defenses?
                </span>
              </h2>
              <p className="text-base lg:text-lg text-slate-400 font-medium max-w-2xl mx-auto">
                Schedule a free consultation to discuss your penetration testing needs and get a customized proposal.
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 py-4">
              <div className="w-12 h-px bg-red-500/30" />
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <div className="w-12 h-px bg-red-500/30" />
            </div>

            <Link to={Routes.CONTACT}>
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white rounded-sm px-8 font-bold uppercase tracking-wide border-none group transition-all" rightIcon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}>
                Contact Us Today
              </Button>
            </Link>
          </div>
          
          {/* Defensive Corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-500/20 rounded-tl-sm pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-500/20 rounded-br-sm pointer-events-none" />
        </motion.div>
      </div>
    </div>
  );
}
