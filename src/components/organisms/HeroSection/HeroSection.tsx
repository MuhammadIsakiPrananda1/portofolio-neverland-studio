import { motion } from 'framer-motion';
import { ArrowRight, Shield, Lock, Zap, Server, Database, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '@components/atoms/Button';
import TypewriterText from '@components/atoms/TypewriterText';
import { fadeIn, slideUp, staggerContainer, staggerItem } from '@utils/animations';
import { Routes, COMPANY_INFO } from '@config/constants';

const HERO_STATS = [
  { icon: Shield, label: 'SECURITY METRIC', value: '500+ Projects Secured', status: 'bg-green-500' },
  { icon: Lock, label: 'SERVICE LEVEL AGREEMENT', value: '99.9% Uptime SLA', status: 'bg-green-500' },
  { icon: Zap, label: 'SYSTEM MONITORING', value: '24/7 Threat Monitoring', status: 'bg-green-500' },
  { icon: Server, label: 'ENTERPRISE OS', value: 'Linux Enterprise', status: 'bg-green-500' },
  { icon: Database, label: 'RDBMS ENGINE', value: 'High Availability', status: 'bg-green-500' },
  { icon: Globe, label: 'NETWORK EDGE', value: 'Global CDN Active', status: 'bg-green-500' }
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[500px] sm:min-h-[600px] flex flex-col items-center justify-center overflow-hidden pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-[#0B1120]">
      {/* Dark Grid Background simulating monitor UI */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center'
        }}
      />
      
      {/* Background glow effects */}
      <div className="absolute top-10 sm:top-20 right-5 sm:right-10 w-48 h-48 sm:w-72 sm:h-72 bg-[#ef4444]/10 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-10 sm:bottom-20 left-5 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-[#ef4444]/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 md:w-[600px] md:h-[600px] bg-slate-800/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />

      {/* Content Container */}
      <div className="container relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 mt-4 sm:mt-8 md:mt-12">
        <motion.div
          className="flex flex-col items-center text-center w-full"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Main Typography Header (Stacked bold text) */}
          <motion.div variants={slideUp} className="mb-6 flex flex-col items-center max-w-5xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4.5rem] xl:text-[5.5rem] font-black uppercase tracking-tight text-white leading-none mb-1 sm:mb-2 drop-shadow-md">
              {COMPANY_INFO.tagline}
            </h1>
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.5rem] font-black uppercase tracking-tight text-[#ef4444] leading-tight min-h-[1.2rem] sm:min-h-[1.5em] flex items-center justify-center drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]">
              <TypewriterText
                texts={[
                  'ENGINEERING SECURE IT SYSTEMS',
                  'PROTECTING DIGITAL ASSETS',
                  'BUILDING CYBER RESILIENCE',
                  'ADVANCING SECURITY INNOVATION'
                ]}
                className="text-[#ef4444]"
                cursorClassName="bg-[#ef4444]"
                typingSpeed={80}
                deletingSpeed={40}
                pauseDuration={3000}
              />
            </div>
          </motion.div>

          {/* Description Text */}
          <motion.p
            variants={fadeIn}
            className="text-sm sm:text-base md:text-lg text-slate-400 font-medium mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-4"
          >
            {COMPANY_INFO.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={staggerItem}
            className="flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16"
          >
            <Link to={Routes.CONTACT}>
              <div className="relative overflow-hidden group rounded-sm cursor-pointer">
                {/* Wave sweep layer */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out bg-transparent border border-red-500 rounded-sm z-0" />
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out"
                  style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(239,68,68,0.08) 50%, transparent 100%)' }} />
                {/* Button */}
                <button className="relative z-10 flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-red-500 group-hover:bg-transparent border border-red-500 text-white font-bold text-sm sm:text-base rounded-sm transition-colors duration-500 uppercase tracking-wide">
                  Get Started
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </Link>
            <Link to={Routes.CYBER_SECURITY}>
              <Button variant="outline" size="lg" className="bg-transparent text-white border-2 border-white/20 hover:border-white/50 rounded-md px-6 sm:px-8 py-2.5 sm:py-3 hover:bg-white/5 font-bold transition-all shadow-sm">
                Our Services
              </Button>
            </Link>
          </motion.div>

          {/* Divider: INFRASTRUCTURE & STACK INVENTORY */}
          <motion.div variants={fadeIn} className="w-full mt-4 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-center gap-4 max-w-6xl mx-auto px-4 sm:px-0">
              <h2 className="text-xs sm:text-sm md:text-base font-mono font-bold text-slate-300 uppercase tracking-widest whitespace-nowrap">
                INFRASTRUCTURE & STACK INVENTORY
              </h2>
              <div className="h-[2px] bg-white/10 flex-grow relative w-full sm:w-auto mt-2 sm:mt-0">
                 <div className="absolute top-0 left-0 h-full w-1/3 bg-[#ef4444]" />
                 <div className="absolute top-0 right-0 h-[10px] w-[2px] bg-slate-500 -mt-[4px]" />
                 <div className="absolute top-0 right-8 h-[10px] w-[2px] bg-slate-500 -mt-[4px]" />
              </div>
            </div>
          </motion.div>

          {/* Cards Grid */}
          <motion.div
            variants={staggerItem}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 w-full p-2"
          >
            {HERO_STATS.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, scale: 1.01 }}
                className="bg-[#0f172a]/60 backdrop-blur-md border sm:border border-white/10 rounded-xl p-3 sm:p-4 flex items-center justify-between shadow-lg hover:shadow-xl hover:border-white/20 transition-all group"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Left Icon Block */}
                  <div className="p-2 sm:p-3 bg-white/5 border border-white/10 rounded-lg group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-300 group-hover:text-white transition-colors" />
                  </div>
                  {/* Card Details */}
                  <div className="flex flex-col items-start text-left">
                    <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5 font-mono">
                      {item.label}
                    </span>
                    <span className="text-xs sm:text-sm md:text-base font-black text-white">
                      {item.value}
                    </span>
                  </div>
                </div>
                {/* Right Status Indicator */}
                <div className="flex items-center justify-center p-1 sm:p-2 ml-2 border border-white/10 rounded-full bg-white/5">
                  <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${item.status} animate-none sm:animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]`} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
