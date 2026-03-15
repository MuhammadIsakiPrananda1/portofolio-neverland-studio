import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Target, Eye, Zap, Shield, Award, Users, Globe, Globe2,
  TrendingUp, Code, Server, Lock, ArrowRight, Rocket,
  Lightbulb, Heart, Star, Clock, Briefcase, Database,
  Terminal
} from 'lucide-react';
import SectionTitle from '@components/molecules/SectionTitle';
import { COMPANY_INFO, Routes } from '@config/constants';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';

export default function About() {
  const companyStats = [
    { icon: Users, value: '50+', label: 'Expert Team Members' },
    { icon: Globe, value: '25+', label: 'Countries Served' },
    { icon: Briefcase, value: '500+', label: 'Successful Projects' },
    { icon: Award, value: '98%', label: 'Client Satisfaction' },
  ];

  const coreValues = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'Every decision we make prioritizes the safety and protection of our clients\' digital assets. Security isn\'t just what we do—it\'s who we are.',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We constantly evolve our methods and technologies to stay ahead of emerging threats, ensuring our clients always have cutting-edge protection.',
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We deliver exceptional quality in every project, every time. Our commitment to excellence has earned us recognition as industry leaders.',
    },
    {
      icon: Eye,
      title: 'Transparency',
      description: 'Clear communication and honest reporting in all our engagements. We believe trust is built through openness and accountability.',
    },
    {
      icon: Heart,
      title: 'Client Success',
      description: 'Your success is our success. We go beyond delivering services—we build partnerships that drive long-term business growth.',
    },
    {
      icon: Lightbulb,
      title: 'Continuous Learning',
      description: 'The cyber threat landscape evolves daily. We invest heavily in training and research to keep our team at the forefront of security knowledge.',
    },
  ];

  const achievements = [
    { year: COMPANY_INFO.founded, title: 'Company Founded', desc: 'Started with a vision to democratize enterprise security' },
    { year: '2020', title: 'Global Expansion', desc: 'Expanded operations to 25+ countries worldwide' },
    { year: '2022', title: 'Industry Recognition', desc: 'Awarded Best Cyber Security Firm by CyberTech Awards' },
    { year: '2024', title: 'Innovation Leader', desc: 'Launched AI-powered threat detection platform' },
  ];

  const techStack = [
    { name: 'Penetration Testing', icon: Lock },
    { name: 'Cloud Security', icon: Server },
    { name: 'Web Development', icon: Code },
    { name: 'Data Protection', icon: Database },
  ];

  return (
    <div className="pt-32 pb-20 relative">
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="container-custom relative z-10 px-4 sm:px-6">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-24"
          variants={slideUp}
          initial="hidden"
          animate="visible"
        >
          <div className="w-20 h-1 bg-emerald-500 mx-auto mb-8 rounded-sm" />

          <h1 className="text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6">
            <span className="text-white">About </span>
            <span className="text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.2)]">
              Neverland Studio
            </span>
          </h1>

          <p className="text-lg lg:text-xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
            Leading the future of cyber security and IT solutions with innovation, expertise, and unwavering commitment to protecting businesses in the digital age.
          </p>
        </motion.div>

        {/* Company Stats - Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-24"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {companyStats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="relative rounded-sm p-6 lg:p-8 text-center border border-white/5 hover:border-emerald-500/50 transition-all duration-300 bg-[#0f172a] group"
              variants={staggerItem}
              whileHover={{ y: -4 }}
            >
              <stat.icon className="w-10 h-10 mx-auto mb-3 text-emerald-500" />
              <div className="text-3xl lg:text-4xl font-black font-mono text-white group-hover:text-emerald-400 transition-colors mb-2">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                {stat.label}
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-emerald-500 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Company Story */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Our Story"
            title="Building a Safer Digital World"
            className="mb-12"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Vision */}
            <motion.div
              className="rounded-sm p-8 border border-white/5 bg-[#0f172a] relative overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
              <div className="inline-flex p-3 rounded-sm bg-[#0B1120] border border-white/10 mb-4">
                <Eye className="w-7 h-7 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-white">Our Vision</h3>
              <p className="text-slate-400 font-medium leading-relaxed text-sm">
                To be the world's most trusted cyber security partner, empowering businesses to operate
                fearlessly in the digital landscape. We envision a future where every organization,
                regardless of size, has access to enterprise-grade security solutions that protect their
                assets, reputation, and customer trust.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              className="rounded-sm p-8 border border-white/5 bg-[#0f172a] relative overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
              <div className="inline-flex p-3 rounded-sm bg-[#0B1120] border border-white/10 mb-4">
                <Target className="w-7 h-7 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-white">Our Mission</h3>
              <p className="text-slate-400 font-medium leading-relaxed text-sm">
                To deliver cutting-edge security solutions that protect businesses from evolving cyber threats.
                We combine technical expertise, innovative tools, and proven methodologies to safeguard our
                clients' digital assets, ensure business continuity, and enable them to focus on growth without
                fear of digital threats.
              </p>
            </motion.div>
          </div>

          {/* Detailed Description / Who We Are - Redesigned */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-emerald-500/30 bg-emerald-500/10 mb-4">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Identity</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-white mb-4">Who We Are</h3>
              <p className="text-slate-400 font-medium max-w-2xl mx-auto text-sm lg:text-base">
                A collective of elite security researchers, developers, and strategists united by a shared purpose.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Card 1: Origin */}
              <motion.div
                className="relative rounded-sm p-8 border border-white/5 bg-[#0f172a] hover:border-emerald-500/30 transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 rounded-sm bg-[#0B1120] border border-white/10 flex items-center justify-center mb-6">
                  <Rocket className="w-6 h-6 text-emerald-500" />
                </div>
                <h4 className="text-xl font-black uppercase tracking-tight text-white mb-3">Our Origin</h4>
                <p className="text-slate-400 font-medium text-sm leading-relaxed">
                  Founded in <span className="text-emerald-400 font-bold">{COMPANY_INFO.founded}</span>, <span className="text-white font-bold">Neverland Studio</span> has rapidly evolved from a dedicated team of security enthusiasts into a globally recognized authority in cyber security and advanced IT solutions.
                </p>
              </motion.div>

              {/* Card 2: Scale */}
              <motion.div
                className="relative rounded-sm p-8 border border-white/5 bg-[#0f172a] hover:border-emerald-500/30 transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 rounded-sm bg-[#0B1120] border border-white/10 flex items-center justify-center mb-6">
                  <Globe2 className="w-6 h-6 text-emerald-500" />
                </div>
                <h4 className="text-xl font-black uppercase tracking-tight text-white mb-3">Global Scale</h4>
                <p className="text-slate-400 font-medium text-sm leading-relaxed">
                  Protecting critical infrastructure across <span className="text-emerald-400 font-bold">25+ countries</span>. Our <span className="text-white font-bold">50+ certified experts</span> secure operations for top-tier enterprises in finance, healthcare, and critical tech sectors worldwide.
                </p>
              </motion.div>

              {/* Card 3: Approach */}
              <motion.div
                className="relative rounded-sm p-8 border border-white/5 bg-[#0f172a] hover:border-emerald-500/30 transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 rounded-sm bg-[#0B1120] border border-white/10 flex items-center justify-center mb-6">
                  <Terminal className="w-6 h-6 text-emerald-500" />
                </div>
                <h4 className="text-xl font-black uppercase tracking-tight text-white mb-3">Elite Approach</h4>
                <p className="text-slate-400 font-medium text-sm leading-relaxed">
                  We go beyond simple vulnerability scanning. We forge robust security cultures, engineering resilient systems that withstand sophisticated attacks, boasting a <span className="text-emerald-400 font-bold">98% client satisfaction rate</span>.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Core Values */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Our Values"
            title="What Drives Us Forward"
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, idx) => (
              <motion.div
                key={idx}
                className="rounded-sm p-6 border border-white/5 bg-[#0f172a] hover:border-emerald-500/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="inline-flex p-3 rounded-sm bg-[#0B1120] border border-white/10 mb-4">
                  <value.icon className="w-6 h-6 text-emerald-500" />
                </div>
                <h4 className="text-lg font-black uppercase tracking-tight mb-2 text-white">{value.title}</h4>
                <p className="text-slate-400 font-medium text-xs leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline / Achievements */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Our Journey"
            title="Key Milestones & Achievements"
            className="mb-12"
          />

          <div className="space-y-4">
            {achievements.map((achievement, idx) => (
              <motion.div
                key={idx}
                className="flex gap-4 items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-sm bg-[#0f172a] border border-white/5 hover:border-emerald-500/30 flex items-center justify-center transition-colors">
                  <span className="text-sm font-black font-mono text-emerald-500">{achievement.year}</span>
                </div>
                <div className="flex-1 pt-2">
                  <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">{achievement.title}</h4>
                  <p className="text-slate-400 font-medium text-sm">{achievement.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technology & Expertise */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Our Expertise"
            title="Core Technology Capabilities"
            className="mb-12"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {techStack.map((tech, idx) => (
              <motion.div
                key={idx}
                className="rounded-sm p-6 text-center border border-white/5 bg-[#0f172a] hover:border-emerald-500/30 transition-all duration-300 group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <tech.icon className="w-10 h-10 mx-auto mb-3 text-emerald-500" />
                <h4 className="text-sm font-bold uppercase tracking-wide text-white">{tech.name}</h4>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Culture / Our Team */}
        <motion.div
          className="relative rounded-sm p-8 lg:p-12 mb-24 border border-white/10 bg-[#0f172a] shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />

          <div className="relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-emerald-500/30 bg-emerald-500/10 mb-4">
                <Users className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Our Team</span>
              </div>
              <h3 className="text-3xl lg:text-5xl font-black uppercase tracking-tight mb-4">
                <span className="text-white">World-Class </span>
                <span className="text-emerald-500">
                  Professionals
                </span>
              </h3>
              <p className="text-slate-400 font-medium max-w-2xl mx-auto text-sm lg:text-base leading-relaxed">
                We are a team of passionate innovators, dedicated to redefining the standards of cyber security and digital excellence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Card 1 */}
              <motion.div
                className="rounded-sm p-6 lg:p-8 border border-white/5 bg-[#0B1120] hover:border-emerald-500/30 transition-all duration-300"
                whileHover={{ y: -8 }}
              >
                <div className="w-14 h-14 rounded-sm bg-[#0f172a] border border-white/10 flex items-center justify-center mb-6">
                  <Star className="w-7 h-7 text-emerald-500" />
                </div>
                <h4 className="text-xl font-black uppercase tracking-tight text-white mb-3">Certified Experts</h4>
                <p className="text-slate-400 font-medium text-sm leading-relaxed">
                  Industry-recognized professionals holding Elite certifications like <span className="text-white font-bold">CISSP, CEH, OSCP</span>, along with top-tier Cloud architecture credentials.
                </p>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                className="rounded-sm p-6 lg:p-8 border border-white/5 bg-[#0B1120] hover:border-emerald-500/30 transition-all duration-300"
                whileHover={{ y: -8 }}
              >
                <div className="w-14 h-14 rounded-sm bg-[#0f172a] border border-white/10 flex items-center justify-center mb-6">
                  <Clock className="w-7 h-7 text-emerald-500" />
                </div>
                <h4 className="text-xl font-black uppercase tracking-tight text-white mb-3">24/7 Readiness</h4>
                <p className="text-slate-400 font-medium text-sm leading-relaxed">
                    Our dedicated rapid-response team operates around the clock, providing <span className="text-white font-medium">continuous monitoring</span> and immediately neutralizing active threats.
                  </p>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                className="rounded-sm p-6 lg:p-8 border border-white/5 bg-[#0B1120] hover:border-emerald-500/30 transition-all duration-300"
                whileHover={{ y: -8 }}
              >
                <div className="w-14 h-14 rounded-sm bg-[#0f172a] border border-white/10 flex items-center justify-center mb-6">
                  <TrendingUp className="w-7 h-7 text-emerald-500" />
                </div>
                <h4 className="text-xl font-black uppercase tracking-tight text-white mb-3">Proven Track Record</h4>
                <p className="text-slate-400 font-medium text-sm leading-relaxed">
                  Empowered by <span className="text-white font-bold">decades of combined experience</span>, we have successfully secured critical infrastructure for global leaders across industries.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Partners & Clients Section */}
        <motion.div
          className="mb-24 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Trusted By"
            title="Our Partners & Clients"
            className="mb-12"
          />

          {/* ─── Diagonal band marquee (Stripe / Vercel style) ─── */}
          {/*
            The BAND itself is rotated -4°, stretching beyond the viewport
            to fill edge-to-edge without white gaps.
            Cards scroll horizontally inside the tilted band.
          */}
          <div className="relative overflow-visible -mb-6">
            {/* Rotated outer band */}
            <div
              className="relative py-8 overflow-hidden"
              style={{
                transform: 'rotate(-4deg)',
                width: '115%',
                marginLeft: '-7.5%',
              }}
            >
              {/* Band background */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/[0.05] via-blue-500/[0.08] to-purple-500/[0.05]" />
              <div className="absolute inset-0 border-y border-white/[0.04]" />

              {/* Left / Right fade masks */}
              <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none" />

              {/* ── Row 1 → moves LEFT at 35s ── */}
              <div className="relative overflow-hidden mb-4">
                <div
                  className="flex gap-4 hover:[animation-play-state:paused]"
                  style={{ animation: 'marquee-infinite 35s linear infinite', width: 'max-content' }}
                >
                  {[...Array(3)].map((_, setIdx) => (
                    <div key={`r1-${setIdx}`} className="flex gap-4">
                      {[
                        { name: 'Linux',      slug: 'linux',      color: '#FCC624' },
                        { name: 'Cisco',      slug: 'cisco',      color: '#1BA0D7' },
                        { name: 'VMware',     slug: 'vmware',     color: '#607078' },
                        { name: 'Red Hat',    slug: 'redhat',     color: '#EE0000' },
                        { name: 'Intel',      slug: 'intel',      color: '#0071C5' },
                        { name: 'Dell',       slug: 'dell',       color: '#007DB8' },
                        { name: 'Salesforce', slug: 'salesforce', color: '#00A1E0' },
                        { name: 'SAP',        slug: 'sap',        color: '#0FAAFF' },
                      ].map((p, idx) => (
                        <div
                          key={`r1-${setIdx}-${idx}`}
                          className="group flex-shrink-0 w-36 h-[4.5rem] rounded-sm border border-white/[0.07] bg-[#0f172a] hover:border-emerald-500/30 transition-all duration-300 flex flex-col items-center justify-center gap-1.5 px-3 cursor-default"
                        >
                          <img
                            src={`https://cdn.simpleicons.org/${p.slug}/${p.color.replace('#','')}`}
                            alt={p.name}
                            className="partner-logo w-7 h-7 object-contain group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                          <span className="text-[9px] font-bold text-slate-500 group-hover:text-slate-300 transition-colors duration-300 text-center leading-tight tracking-wide uppercase">
                            {p.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Row 2 → moves RIGHT at 50s ── */}
              <div className="relative overflow-hidden">
                <div
                  className="flex gap-4 hover:[animation-play-state:paused]"
                  style={{ animation: 'marquee-reverse 50s linear infinite', width: 'max-content' }}
                >
                  {[...Array(3)].map((_, setIdx) => (
                    <div key={`r2-${setIdx}`} className="flex gap-4">
                      {[
                        { name: 'MongoDB',    slug: 'mongodb',    color: '#47A248' },
                        { name: 'Proxmox',    slug: 'proxmox',    color: '#E57000' },
                        { name: 'VirtualBox', slug: 'virtualbox', color: '#183A61' },
                        { name: 'Mikrotik',   slug: 'mikrotik',   color: '#293239' },
                        { name: 'HP',         slug: 'hp',         color: '#0096D6' },
                        { name: 'Lenovo',     slug: 'lenovo',     color: '#E2231A' },
                        { name: 'Apple',      slug: 'apple',      color: '#A2AAAD' },
                        { name: 'Ubuntu',     slug: 'ubuntu',     color: '#E95420' },
                      ].map((p, idx) => (
                        <div
                          key={`r2-${setIdx}-${idx}`}
                          className="group flex-shrink-0 w-36 h-[4.5rem] rounded-sm border border-white/[0.07] bg-[#0f172a] hover:border-emerald-500/30 transition-all duration-300 flex flex-col items-center justify-center gap-1.5 px-3 cursor-default"
                        >
                          <img
                            src={`https://cdn.simpleicons.org/${p.slug}/${p.color.replace('#','')}`}
                            alt={p.name}
                            className="partner-logo w-7 h-7 object-contain group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                          <span className="text-[9px] font-bold text-slate-500 group-hover:text-slate-300 transition-colors duration-300 text-center leading-tight tracking-wide uppercase">
                            {p.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-slate-500 font-mono text-xs mt-12">
            [SYSINFO] Trusted by leading enterprises and technology partners worldwide
          </p>
        </motion.div>


        {/* CTA Section */}
        <motion.div
          className="relative border border-white/10 rounded-sm p-12 lg:p-16 text-center bg-[#0f172a] shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Top Accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />

          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-emerald-500/30 bg-emerald-500/10">
              <Users className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest">Join Us</span>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
                <span className="text-white">Ready to Work</span>
                <br />
                <span className="text-emerald-500">
                  With the Best?
                </span>
              </h2>
              <p className="text-base lg:text-lg text-slate-400 font-medium max-w-2xl mx-auto">
                Partner with Neverland Studio and experience the difference that true expertise, innovation, and commitment can make for your business security.
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 py-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/10" />
              <div className="w-1.5 h-1.5 rounded-sm bg-emerald-500/50" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/10" />
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to={Routes.CONTACT}>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-sm font-bold uppercase tracking-wide transition-colors">
                  Get Started Today <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link to={Routes.HOME}>
                <button className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white/40 text-white rounded-sm font-bold uppercase tracking-wide transition-colors">
                  Explore Services
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
