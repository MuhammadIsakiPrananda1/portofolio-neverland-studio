import { motion } from "framer-motion";
import {
  Shield,
  Sparkles,
  Target,
  Rocket,
  Search,
  ClipboardList,
  Cpu,
  Activity,
  ArrowRight,
  Award,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import HeroSection from "@components/organisms/HeroSection";
import ServiceCard from "@components/molecules/ServiceCard";
import Button from "@components/atoms/Button";
import {
  Routes,
  SERVICES_DATA,
  COMPANY_INFO,
  PROJECTS_DATA,
} from "@config";
import logoImage from '@/assets/logo.webp';
import { staggerContainer, staggerItem, slideUp } from "@utils";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";


export default function Home() {
  // Show all featured services on home page
  const featuredServices = SERVICES_DATA;

  return (
    <div className="relative">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] bg-purple-500/10 rounded-full blur-[100px] sm:blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-56 h-56 sm:w-72 sm:h-72 md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] bg-blue-500/10 rounded-full blur-[80px] sm:blur-[100px]" />
      </div>

      {/* Hero Section */}
      <div className="relative z-10">
        <HeroSection />
      </div>

      {/* About Us Summary */}
      <section className="relative z-10 py-16 sm:py-24 overflow-hidden bg-[#0B1120]">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-12 md:gap-16 lg:gap-20 items-center">

            {/* ── Left: Text Content ── */}
            <motion.div
              className="lg:w-1/2 w-full"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-red-500/30 bg-red-500/10 mb-6">
                <Target className="w-4 h-4 text-red-500" />
                <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest">
                  Who We Are
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-5 leading-tight uppercase tracking-tight">
                <span className="text-white">Discover </span>
                <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                  {COMPANY_INFO.name}
                </span>
              </h2>

              <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8 font-medium">
                {COMPANY_INFO.description}
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { value: "10+", label: "Years", color: "text-red-500" },
                  { value: "500+", label: "Projects", color: "text-red-500" },
                  { value: "99.9%", label: "Uptime", color: "text-red-500" },
                ].map((stat, i) => (
                  <div key={i} className="p-4 text-center rounded-sm bg-[#0f172a] border border-white/5 hover:border-red-500/50 transition-colors duration-300">
                    <p className={`text-2xl font-black ${stat.color} font-mono`}>{stat.value}</p>
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Feature List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {[
                  { text: "Enterprise-grade Security", color: "bg-red-500/10 text-red-500 border-red-500/20" },
                  { text: "Proactive Threat Hunting", color: "bg-red-500/10 text-red-500 border-red-500/20" },
                  { text: "24/7 Monitoring & Support", color: "bg-red-500/10 text-red-500 border-red-500/20" },
                  { text: "Cloud Infrastructure", color: "bg-red-500/10 text-red-500 border-red-500/20" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3.5 rounded-sm bg-[#0f172a] border border-white/5 hover:border-red-500/30 transition-all duration-300 group shadow-sm relative overflow-hidden group-hover:-translate-y-0.5"
                  >
                    <div className={`p-1.5 rounded-sm ${item.color} flex-shrink-0 border transition-colors group-hover:bg-red-500/20`}>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm font-bold text-slate-400 group-hover:text-red-400 transition-colors uppercase tracking-wide">{item.text}</span>
                  </div>
                ))}
              </div>

              <Link to={Routes.ABOUT}>
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white rounded-sm font-bold uppercase tracking-wide border-none group transition-all"
                  rightIcon={<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                >
                  Learn More About Us
                </Button>
              </Link>
            </motion.div>

            {/* ── Right: Image ── */}
            <motion.div
              className="lg:w-1/2 relative w-full max-w-lg lg:max-w-none mx-auto"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative border border-white/5 p-2 sm:p-3 rounded-sm bg-[#0f172a] shadow-xl group hover:border-red-500/30 transition-all duration-500">

                <div className="relative rounded-sm overflow-hidden aspect-[4/3] border border-white/10 bg-[#0B1120]">

                  {/* Cyber grid lines */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: 'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)',
                      backgroundSize: '32px 32px',
                    }}
                  />

                  {/* Logo — absolute full cover */}
                  <img
                    src={logoImage}
                    alt="Neverland Studio"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-90 grayscale-[0.2] contrast-125"
                  />
                  
                  {/* Overlay to darken image slightly for tech feel */}
                  <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay pointer-events-none" />
                </div>

                {/* Floating Badge - Experience */}
                <div className="absolute -bottom-5 -left-4 sm:-bottom-6 sm:-left-8 bg-[#0B1120] border border-red-500/20 p-3 sm:p-4 rounded-sm hidden sm:flex items-center gap-3 animate-bounce-slow shadow-[0_8px_32px_rgba(239,68,68,0.15)] group-hover:border-red-500/50 transition-colors duration-300">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-sm bg-red-500/10 flex items-center justify-center flex-shrink-0 border border-red-500/30">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                  </div>
                  <div>
                    <p className="text-white font-black text-base sm:text-xl tracking-tight leading-none uppercase">10+ Years</p>
                    <p className="text-[10px] sm:text-xs text-red-400 font-bold uppercase tracking-widest mt-0.5">Experience</p>
                  </div>
                </div>

                {/* Floating Badge - Trusted */}
                <div className="absolute -top-5 -right-4 sm:-top-6 sm:-right-8 bg-[#0B1120] border border-red-500/20 p-3 sm:p-4 rounded-sm hidden md:flex items-center gap-3 animate-bounce-slow shadow-[0_8px_32px_rgba(239,68,68,0.15)] group-hover:border-red-500/50 transition-colors duration-300" style={{ animationDelay: '1.5s' }}>
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-sm bg-red-500/10 flex items-center justify-center border border-red-500/30 flex-shrink-0">
                    <Shield className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-white font-black text-sm leading-none uppercase tracking-wide">Trusted</p>
                    <p className="text-[10px] text-red-400 uppercase tracking-widest font-bold mt-0.5">Security Partner</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Services Preview - Enhanced */}
      <section className="relative z-10 py-16 sm:py-20 md:py-24 overflow-hidden bg-[#0a0f18]">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2.5 px-4 sm:px-6 py-2 sm:py-3 rounded-sm border border-red-500/30 bg-red-500/5 mb-8 sm:mb-12">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" />
                <span className="text-xs sm:text-sm font-mono font-bold text-red-400 tracking-widest uppercase">
                  Our Core Services
                </span>
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" />
              </div>

              {/* Main Title */}
              <div className="mb-6 sm:mb-8">
                <h2 className="relative inline-block">
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-2 sm:mb-3 uppercase tracking-tight">
                    <span className="text-white">
                      Enterprise Security
                    </span>
                  </div>
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tight">
                    <span className="text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                      Solutions
                    </span>
                  </div>
                </h2>
              </div>

              {/* Subtitle */}
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-10 px-4 font-medium">
                Comprehensive cyber security services tailored to protect your
                business from evolving digital threats
              </p>

              {/* Decorative Line */}
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                <div className="w-12 sm:w-20 md:w-32 h-px bg-red-500/40" />
                <div className="flex gap-1.5 sm:gap-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 animate-pulse" />
                  <div
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  />
                  <div
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 animate-pulse"
                    style={{ animationDelay: "1s" }}
                  />
                </div>
                <div className="w-12 sm:w-20 md:w-32 h-px bg-red-500/40" />
              </div>
            </motion.div>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative">

            {featuredServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="relative z-10 py-16 sm:py-20 md:py-24 bg-[#0B1120]">
        <div className="container-custom px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-red-500/30 bg-red-500/10 mb-6">
                <Rocket className="w-4 h-4 text-red-500" />
                <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest">
                  Success Stories
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-white uppercase tracking-tight">
                Featured Projects
              </h2>
              <p className="text-base sm:text-lg text-slate-400 font-medium">
                Explore how we've helped leading enterprise organizations secure their infrastructure and achieve digital resilience.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link to={Routes.PROJECTS}>
                <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500 transition-colors" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  View All Projects
                </Button>
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {PROJECTS_DATA.slice(0, 3).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link to={Routes.PROJECTS} className="block h-full">
                  <div className="bg-[#0f172a] rounded-sm overflow-hidden border border-white/5 hover:border-red-500/50 transition-all duration-300 h-full flex flex-col group-hover:-translate-y-1 shadow-md">
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      <div className="absolute inset-0 bg-[#0B1120]/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"

                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100 grayscale-[30%] group-hover:grayscale-0"
                      />
                      <div className="absolute top-4 left-4 z-20">
                        <span className="px-3 py-1 rounded-sm text-[10px] font-mono font-bold bg-[#0B1120]/80 backdrop-blur-md border border-white/10 text-slate-300 uppercase tracking-widest">
                          {project.industry}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 sm:p-6 flex-1 flex flex-col bg-[#0f172a]">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors uppercase tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-slate-400 text-sm line-clamp-3 mb-4 flex-1">
                        {project.challenge}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.technologies.slice(0, 3).map(tech => (
                          <span key={tech} className="text-[10px] text-slate-300 bg-white/5 px-2 py-1 rounded-sm border border-white/10 font-mono">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-1 rounded-sm border border-white/10 font-mono">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Clean & Modern */}
      <section className="relative z-10 py-12 sm:py-16 md:py-20 bg-[#0B1120]">
        <div className="container-custom px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Simple Badge */}
              <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-sm border border-red-500/30 mb-4 sm:mb-6 bg-red-500/10">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" />
                <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest">
                  Why Choose Us
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4 text-white px-4 uppercase tracking-tight">
                Trusted Security Partner
              </h2>

              {/* Subtitle */}
              <p className="text-sm sm:text-base md:text-lg text-slate-400 max-w-2xl mx-auto px-4 font-medium">
                Delivering excellence in cyber security with proven expertise
                and cutting-edge solutions
              </p>
            </motion.div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group"
            >
              <div className="bg-[#0f172a] rounded-xl sm:rounded-2xl p-6 sm:p-8 h-full border border-white/5 hover:border-red-500/30 transition-all duration-300 shadow-sm">
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 mb-4 sm:mb-6 group-hover:bg-red-500/10 group-hover:border-red-500/20 transition-all duration-300">
                  <Target className="w-6 h-6 sm:w-7 sm:h-7 text-slate-300 group-hover:text-red-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white uppercase tracking-tight group-hover:text-red-400 transition-colors">
                  Proven Excellence
                </h3>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                  Over 10 years delivering enterprise-grade security solutions
                  with 99.9% client satisfaction
                </p>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group"
            >
              <div className="bg-[#0f172a] rounded-xl sm:rounded-2xl p-6 sm:p-8 h-full border border-white/5 hover:border-red-500/30 transition-all duration-300 shadow-sm">
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 mb-4 sm:mb-6 group-hover:bg-red-500/10 group-hover:border-red-500/20 transition-all duration-300">
                  <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-slate-300 group-hover:text-red-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white uppercase tracking-tight group-hover:text-red-400 transition-colors">
                  Elite Expertise
                </h3>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                  Team of certified security professionals with industry-leading
                  certifications and experience
                </p>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group"
            >
              <div className="bg-[#0f172a] rounded-xl sm:rounded-2xl p-6 sm:p-8 h-full border border-white/5 hover:border-red-500/30 transition-all duration-300 shadow-sm">
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 mb-4 sm:mb-6 group-hover:bg-red-500/10 group-hover:border-red-500/20 transition-all duration-300">
                  <Rocket className="w-6 h-6 sm:w-7 sm:h-7 text-slate-300 group-hover:text-red-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white uppercase tracking-tight group-hover:text-red-400 transition-colors">
                  Cutting-Edge Solutions
                </h3>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                  Latest security technologies and methodologies to stay ahead
                  of emerging threats
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Approach - Clean & Modern */}
      <section className="relative z-10 py-12 sm:py-16 md:py-20 bg-[#0a0f18]">
        <div className="container-custom px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-sm border border-red-500/30 mb-4 sm:mb-6 bg-red-500/10">
                <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" />
                <span className="text-xs sm:text-sm font-mono font-bold text-red-400 uppercase tracking-widest">
                  Our Approach
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4 text-white px-4 uppercase tracking-tight">
                How We Secure You
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-slate-400 max-w-2xl mx-auto px-4 font-medium">
                A proven methodology designed to comprehensively analyze, plan,
                execute, and monitor your security posture
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative"
            >
              <div className="bg-[#0f172a] rounded-sm p-6 sm:p-8 h-full border border-white/5 hover:border-red-500/50 transition-all duration-300 shadow-sm relative overflow-hidden group-hover:-translate-y-1">
                <div className="absolute top-4 right-4 text-5xl font-black text-white/5 group-hover:text-red-500/10 transition-colors duration-300 font-mono">
                  01
                </div>
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-sm bg-[#0B1120] border border-white/10 mb-4 sm:mb-6 group-hover:border-red-500/30 transition-colors duration-300 shadow-sm">
                  <Search className="w-6 h-6 sm:w-7 sm:h-7 text-slate-300 group-hover:text-red-500" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white uppercase tracking-tight group-hover:text-red-400">
                  Discovery
                </h3>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-medium">
                  We begin by comprehensively mapping your attack surface and
                  identifying vulnerabilities.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative"
            >
              <div className="bg-[#0f172a] rounded-sm p-6 sm:p-8 h-full border border-white/5 hover:border-red-500/50 transition-all duration-300 shadow-sm relative overflow-hidden group-hover:-translate-y-1">
                <div className="absolute top-4 right-4 text-5xl font-black text-white/5 group-hover:text-red-500/10 transition-colors duration-300 font-mono">
                  02
                </div>
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-sm bg-[#0B1120] border border-white/10 mb-4 sm:mb-6 group-hover:border-red-500/30 transition-colors duration-300 shadow-sm">
                  <ClipboardList className="w-6 h-6 sm:w-7 sm:h-7 text-slate-300 group-hover:text-red-500" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white uppercase tracking-tight group-hover:text-red-400">
                  Strategy
                </h3>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-medium">
                  Developing customized, prioritized remediation plans tailored
                  to your risk profile.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group relative"
            >
              <div className="bg-[#0f172a] rounded-sm p-6 sm:p-8 h-full border border-white/5 hover:border-red-500/50 transition-all duration-300 shadow-sm relative overflow-hidden group-hover:-translate-y-1">
                <div className="absolute top-4 right-4 text-5xl font-black text-white/5 group-hover:text-red-500/10 transition-colors duration-300 font-mono">
                  03
                </div>
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-sm bg-[#0B1120] border border-white/10 mb-4 sm:mb-6 group-hover:border-red-500/30 transition-colors duration-300 shadow-sm">
                  <Cpu className="w-6 h-6 sm:w-7 sm:h-7 text-slate-300 group-hover:text-red-500" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white uppercase tracking-tight group-hover:text-red-400">
                  Execution
                </h3>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-medium">
                  Implementing robust controls and fortifying your
                  infrastructure against attacks.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="group relative"
            >
              <div className="bg-[#0f172a] rounded-sm p-6 sm:p-8 h-full border border-white/5 hover:border-red-500/50 transition-all duration-300 shadow-sm relative overflow-hidden group-hover:-translate-y-1">
                <div className="absolute top-4 right-4 text-5xl font-black text-white/5 group-hover:text-red-500/10 transition-colors duration-300 font-mono">
                  04
                </div>
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-sm bg-[#0B1120] border border-white/10 mb-4 sm:mb-6 group-hover:border-red-500/30 transition-colors duration-300 shadow-sm">
                  <Activity className="w-6 h-6 sm:w-7 sm:h-7 text-slate-300 group-hover:text-red-500" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white uppercase tracking-tight group-hover:text-red-400">
                  Monitoring
                </h3>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-medium">
                  Providing 24/7 observability and rapid incident response to
                  keep you secure.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="relative z-10 py-16 sm:py-20 md:py-24 overflow-hidden bg-[#0B1120]">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6">
          {/* Header */}
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-red-500/30 bg-red-500/10 mb-6">
              <Cpu className="w-4 h-4 text-red-500" />
              <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest">
                Technology Stack
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight">
              Tools We Master
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base font-medium">
              Battle-tested technologies powering our security solutions and infrastructure.
            </p>
          </motion.div>

          {/* Tech Cards Grid */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {[
              { name: 'React',       icon: 'https://cdn.simpleicons.org/react/61DAFB',         color: '#61DAFB', border: 'hover:border-cyan-400/40',    bg: 'group-hover:bg-[#0f172a]'   },
              { name: 'TypeScript',  icon: 'https://cdn.simpleicons.org/typescript/3178C6',    color: '#3178C6', border: 'hover:border-blue-400/40',    bg: 'group-hover:bg-[#0f172a]'   },
              { name: 'Node.js',     icon: 'https://cdn.simpleicons.org/nodedotjs/339933',     color: '#339933', border: 'hover:border-green-400/40',   bg: 'group-hover:bg-[#0f172a]'  },
              { name: 'Python',      icon: 'https://cdn.simpleicons.org/python/3776AB',        color: '#FFD343', border: 'hover:border-yellow-400/40',  bg: 'group-hover:bg-[#0f172a]' },
              { name: 'Next.js',     icon: 'https://cdn.simpleicons.org/nextdotjs/ffffff',     color: '#ffffff', border: 'hover:border-white/30',       bg: 'group-hover:bg-[#0f172a]'       },
              { name: 'Docker',      icon: 'https://cdn.simpleicons.org/docker/2496ED',        color: '#2496ED', border: 'hover:border-blue-300/40',    bg: 'group-hover:bg-[#0f172a]'   },
              { name: 'Kubernetes',  icon: 'https://cdn.simpleicons.org/kubernetes/326CE5',    color: '#326CE5', border: 'hover:border-indigo-400/40',  bg: 'group-hover:bg-[#0f172a]' },
              { name: 'Go',          icon: 'https://cdn.simpleicons.org/go/00ADD8',            color: '#00ADD8', border: 'hover:border-cyan-300/40',    bg: 'group-hover:bg-[#0f172a]'  },
            ].map((tech) => (
              <motion.div
                key={tech.name}
                variants={staggerItem}
                whileHover={{ y: -5, scale: 1.03 }}
                transition={{ duration: 0.2 }}
                className="group"
              >
                <div className={`relative h-full bg-[#0f172a] rounded-sm border border-white/5 hover:border-red-500/50 transition-all duration-300 p-5 sm:p-6 flex flex-col items-center justify-center gap-4 text-center cursor-default overflow-hidden min-h-[140px] sm:min-h-[160px]`}>
                  {/* Hover glow bg */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${tech.bg} rounded-xl`} />

                  {/* Top shimmer */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-3/4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-500" />

                  {/* Icon container */}
                  <div
                    className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl transition-all duration-300"
                    style={{ background: `${tech.color}12`, border: `1.5px solid ${tech.color}25` }}
                  >
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="w-9 h-9 sm:w-11 sm:h-11 object-contain transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  {/* Tech name */}
                  <span
                    className="relative text-xs sm:text-sm font-semibold transition-colors duration-300 tracking-wide"
                    style={{ color: tech.color }}
                  >
                    {tech.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>



      {/* CTA Section - Ultra Clean & Modern */}
      <section className="relative z-10 py-16 sm:py-20 md:py-24 bg-[#0a0f18]">
        <div className="container-custom px-4 sm:px-6">
          <motion.div
            className="relative max-w-5xl mx-auto"
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Clean Container */}
            <div className="relative border border-white/10 rounded-sm p-6 sm:p-10 md:p-14 lg:p-20 text-center overflow-hidden bg-[#0f172a] shadow-xl">
              {/* Subtle Top Accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-px bg-red-500/50" />

              <div className="space-y-6 sm:space-y-8">
                {/* Small Badge */}
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm border border-red-500/30 bg-red-500/10 mb-2">
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-500" />
                  <span className="text-[10px] sm:text-xs font-mono font-bold text-red-400 uppercase tracking-widest">
                    Ready to Start
                  </span>
                </div>

                {/* Title */}
                <div className="space-y-3 sm:space-y-4 relative z-10">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight">
                    <span className="text-white">Secure Your</span>
                    <br />
                    <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                      Digital Future
                    </span>
                  </h2>

                  {/* Subtitle */}
                  <p className="text-sm sm:text-base md:text-lg text-slate-400 max-w-xl mx-auto px-4 sm:px-0 font-medium">
                    Partner with industry-leading security experts to protect
                    your business from evolving cyber threats.
                  </p>
                </div>

                {/* Divider */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 py-3 sm:py-4 relative z-10">
                  <div className="w-8 sm:w-12 h-px bg-red-500/30" />
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-red-500" />
                  <div className="w-8 sm:w-12 h-px bg-red-500/30" />
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center relative z-10">
                  <Link to={Routes.CONTACT}>
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white rounded-sm px-8 font-bold uppercase tracking-wide border-none group transition-all"
                      rightIcon={<Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                    >
                      Start Free Consultation
                    </Button>
                  </Link>
                  <Link to={Routes.CYBER_SECURITY}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto border-white/20 text-white hover:bg-white/5 hover:border-white/40 rounded-sm px-8 font-bold uppercase tracking-wide transition-all"
                    >
                      View Expertise
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Decorative Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-500/20 rounded-tl-sm pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-500/20 rounded-br-sm pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
