import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Briefcase, TrendingUp } from 'lucide-react';
import Button from '@components/atoms/Button';
import SectionTitle from '@components/molecules/SectionTitle';
import { PROJECTS_DATA } from '@config/projects';
import { Routes } from '@config/constants';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';

export default function Projects() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        {/* Hero Section - Modern */}
        <motion.div
          className="text-center mb-20 md:mb-28"
          variants={slideUp}
          initial="hidden"
          animate="visible"
        >
          {/* Icon Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-red-500/25 bg-red-500/10 mb-8 backdrop-blur-sm">
            <Briefcase className="w-4 h-4 text-red-500" />
            <span className="text-xs font-mono font-bold text-red-400 tracking-widest uppercase">Portfolio</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tight">
            <span className="text-white">Our </span>
            <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.2)]">
              Success Stories
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
            Discover how we've helped organizations across industries strengthen their security posture, 
            protect their digital assets, and achieve their business goals.
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { value: '500+', label: 'Projects Delivered' },
            { value: '98%', label: 'Client Satisfaction' },
            { value: '25+', label: 'Countries Served' },
            { value: '10+', label: 'Years Experience' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="relative rounded-sm p-6 text-center border border-white/5 bg-[#0f172a] hover:bg-[#0B1120] hover:border-red-500/30 transition-all duration-300 group shadow-lg overflow-hidden"
              variants={staggerItem}
              whileHover={{ y: -4 }}
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/5 rounded-full blur-xl group-hover:bg-red-500/10 transition-colors pointer-events-none" />
              <div className="text-3xl font-black text-white mb-2 tracking-tight group-hover:text-red-400 transition-colors">
                {stat.value}
              </div>
              <div className="text-xs text-slate-500 font-bold uppercase tracking-widest font-mono">
                {stat.label}
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-red-500/20 group-hover:bg-red-500 transition-colors" />
            </motion.div>
          ))}
        </motion.div>

        {/* Section Title */}
        <SectionTitle
          subtitle="Case Studies"
          title="Featured Projects"
          className="mb-12"
        />

        {/* Projects Grid */}
        <motion.div
          className="space-y-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {PROJECTS_DATA.map((project) => (
            <motion.div
              key={project.id}
              className="rounded-sm border border-white/10 bg-[#0f172a] hover:border-red-500/30 transition-all duration-300 overflow-hidden shadow-xl"
              variants={staggerItem}
            >
              <div className="p-8 md:p-10 relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500/50" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pl-4">
                  {/* Project Info */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Header */}
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-red-500/20 bg-red-500/5 mb-3">
                        <span className="text-red-400 text-xs font-mono font-bold uppercase tracking-wider">
                          {project.industry}
                        </span>
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-black uppercase tracking-tight text-white group-hover:text-red-400 transition-colors">
                        {project.title}
                      </h3>
                    </div>

                    {/* Challenge */}
                    <div>
                      <h4 className="text-base font-black uppercase tracking-wide text-white mb-2 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-sm" />
                        Challenge
                      </h4>
                      <p className="text-slate-400 text-sm leading-relaxed font-medium">
                        {project.challenge}
                      </p>
                    </div>

                    {/* Solution */}
                    <div>
                      <h4 className="text-base font-black uppercase tracking-wide text-white mb-2 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-sm" />
                        Solution
                      </h4>
                      <p className="text-slate-400 text-sm leading-relaxed font-medium">
                        {project.solution}
                      </p>
                    </div>

                    {/* Results */}
                    <div>
                      <h4 className="text-base font-black uppercase tracking-wide text-white mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-red-500" />
                        Results & Impact
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {project.results.map((result, idx) => (
                          <li key={idx} className="flex items-start gap-3 p-3 rounded-sm border border-white/5 bg-[#0B1120]">
                            <CheckCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-300 text-sm font-medium">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Technologies Sidebar */}
                  <div className="lg:border-l lg:border-white/10 lg:pl-8">
                    <h4 className="text-base font-black uppercase tracking-wide text-white mb-4">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-sm text-xs font-mono font-bold border border-white/5 bg-[#0B1120] text-slate-300 hover:border-red-500/30 hover:text-red-400 transition-all duration-200 cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Project Meta */}
                    <div className="mt-8 pt-8 border-t border-white/10">
                      <div className="space-y-4 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-bold uppercase tracking-wider text-xs">Industry</span>
                          <span className="text-white font-mono font-bold">{project.industry}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-bold uppercase tracking-wider text-xs">Project Type</span>
                          <span className="text-white font-mono font-bold flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-sm bg-red-500 animate-pulse" />
                            Enterprise
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section - Ultra Clean */}
        <motion.div
          className="relative border border-white/10 rounded-sm p-12 lg:p-16 text-center bg-[#0f172a] mt-20 shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Top Accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
          
          <div className="relative z-10 space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-red-500/20 bg-red-500/5">
              <Briefcase className="w-3.5 h-3.5 text-red-500" />
              <span className="text-xs font-mono font-bold text-red-400 tracking-widest uppercase">Start Your Project</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
                <span className="text-white">Ready to Be Our</span>
                <br />
                <span className="text-red-500">
                  Next Success Story?
                </span>
              </h2>
              <p className="text-base lg:text-lg text-slate-400 font-medium max-w-2xl mx-auto">
                Let's discuss how we can help you achieve your security goals and protect your business from digital threats.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link to={Routes.CONTACT}>
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Start a Project
                </Button>
              </Link>
              <Link to={Routes.SERVICES}>
                <Button variant="outline" size="lg" className="border-white/10 hover:border-red-500/30 bg-[#0B1120]">
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
