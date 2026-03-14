import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Cloud, Server, Database, Shield,
  CheckCircle, ArrowRight, Lock,
  RefreshCw, TrendingUp, Award, Clock, BarChart, Users, Layers
} from 'lucide-react';
import SectionTitle from '@components/molecules/SectionTitle';
import { Routes } from '@config/constants';

export default function CloudSolutionsPage() {
  const services = [
    {
      icon: Cloud,
      title: 'Cloud Migration',
      description: 'Seamlessly migrate your infrastructure to the cloud with zero downtime and optimized performance.',
    },
    {
      icon: Server,
      title: 'Infrastructure as Code',
      description: 'Automate your infrastructure with Terraform, CloudFormation, and Ansible for consistency.',
    },
    {
      icon: Database,
      title: 'Cloud Database Solutions',
      description: 'Managed database services with high availability, automatic backups, and scaling.',
    },
    {
      icon: Shield,
      title: 'Cloud Security',
      description: 'Comprehensive security solutions to protect your cloud infrastructure and data.',
    },
  ];

  const features = [
    {
      icon: BarChart,
      title: 'Monitoring & Analytics',
      description: 'Real-time monitoring and analytics for optimal performance and cost management.',
    },
    {
      icon: RefreshCw,
      title: 'Auto-Scaling',
      description: 'Dynamic resource allocation to handle traffic spikes efficiently and cost-effectively.',
    },
    {
      icon: Layers,
      title: 'Multi-Cloud Strategy',
      description: 'Leverage multiple cloud providers for redundancy, performance, and cost optimization.',
    },
    {
      icon: Lock,
      title: 'Compliance & Governance',
      description: 'Ensure compliance with industry standards and implement governance policies.',
    },
  ];

  const cloudPlatforms = [
    { name: 'AWS', description: 'Amazon Web Services' },
    { name: 'Azure', description: 'Microsoft Azure' },
    { name: 'GCP', description: 'Google Cloud Platform' },
    { name: 'Digital Ocean', description: 'Cloud Hosting' },
  ];

  const stats = [
    { value: '99.9%', label: 'Uptime Guarantee' },
    { value: '80+', label: 'Cloud Projects' },
    { value: '45%', label: 'Avg. Cost Reduction' },
    { value: '24/7', label: 'Support & Monitoring' },
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
          {/* Accent Line */}
          <div className="w-20 h-1 bg-cyan-500 mx-auto mb-8 rounded-sm" />
          
          {/* Icon Badge */}
          <div className="inline-flex p-4 rounded-sm border border-cyan-500/30 bg-cyan-500/10 mb-6">
            <Cloud className="w-12 h-12 text-cyan-500" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6 text-white drop-shadow-[0_0_10px_rgba(6,182,212,0.2)]">
            Cloud Solutions
          </h1>
          
          <p className="text-lg lg:text-xl text-slate-400 font-medium max-w-3xl mx-auto mb-8">
            Transform your business with scalable, secure, and cost-effective cloud infrastructure. 
            We help you leverage AWS, Azure, and Google Cloud Platform to accelerate innovation.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={Routes.CONTACT}>
              <button className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-sm font-bold uppercase tracking-wide px-6 py-3 border-none group transition-all">
                Get Started Today
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link to={Routes.HOME}>
              <button className="inline-flex items-center gap-2 border border-white/20 text-white hover:bg-white/5 hover:border-white/40 rounded-sm font-bold uppercase tracking-wide px-6 py-3 transition-all">
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
              className="relative rounded-sm p-6 text-center border border-white/5 hover:border-cyan-500/50 transition-all duration-300 bg-[#0f172a] shadow-sm group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="text-3xl lg:text-4xl font-black font-mono text-white group-hover:text-cyan-400 transition-colors mb-2">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                {stat.label}
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-cyan-500 group-hover:w-full transition-all duration-500" />
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
            title="Comprehensive Cloud Services"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-sm p-6 border border-white/5 bg-[#0f172a] hover:border-cyan-500/50 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="inline-flex p-3 rounded-sm bg-[#0B1120] border border-white/10 mb-4">
                  <service.icon className="w-6 h-6 text-cyan-500" />
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight text-white mb-2">
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
            subtitle="Advanced Capabilities"
            title="Enterprise-Grade Cloud Features"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-sm p-6 border border-white/5 border-l-2 border-l-cyan-500 bg-[#0f172a] hover:border-cyan-500/50 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2.5 rounded-sm bg-[#0B1120] border border-white/10">
                    <feature.icon className="w-5 h-5 text-cyan-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-black uppercase tracking-tight text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 font-medium text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Cloud Platforms Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Supported Platforms"
            title="Multi-Cloud Expertise"
            className="mb-12"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cloudPlatforms.map((platform, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-sm p-5 text-center border border-white/5 bg-[#0f172a] hover:border-cyan-500/50 transition-all duration-300 group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-sm bg-[#0B1120] border border-white/10 flex items-center justify-center">
                  <Cloud className="w-6 h-6 text-cyan-500" />
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight text-white mb-1">{platform.name}</h3>
                <p className="text-slate-500 font-mono text-xs">{platform.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us Section - Clean */}
        <motion.div
          className="border border-white/5 rounded-sm p-8 lg:p-12 mb-24 bg-[#0f172a] shadow-xl relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tight mb-6 text-white">
                Why Choose Neverland Studio?
              </h2>
              <div className="space-y-4">
                {[
                  'AWS, Azure, and GCP certified cloud architects',
                  'Proven track record with 80+ successful migrations',
                  'Cost optimization strategies saving up to 45%',
                  'Zero-downtime migration expertise',
                  '24/7 monitoring and support services',
                  'Compliance with industry standards and regulations'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 font-medium text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-cyan-500/30 transition-colors duration-300">
                <Award className="w-10 h-10 text-cyan-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">Certified Team</h4>
                <p className="text-slate-500 font-mono text-xs">Multi-cloud experts</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-cyan-500/30 transition-colors duration-300">
                <Clock className="w-10 h-10 text-cyan-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">24/7 Support</h4>
                <p className="text-slate-500 font-mono text-xs">Always available</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-cyan-500/30 transition-colors duration-300">
                <TrendingUp className="w-10 h-10 text-cyan-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">Cost Savings</h4>
                <p className="text-slate-500 font-mono text-xs">45% average reduction</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-cyan-500/30 transition-colors duration-300">
                <Users className="w-10 h-10 text-cyan-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">80+ Clients</h4>
                <p className="text-slate-500 font-mono text-xs">Trusted worldwide</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section - Ultra Clean */}
        <motion.div
          className="relative border border-white/10 rounded-sm p-12 lg:p-16 text-center bg-[#0f172a] shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Top Accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-cyan-500" />
          
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-cyan-500/30 bg-cyan-500/10">
              <Cloud className="w-3.5 h-3.5 text-cyan-500" />
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">Cloud Ready</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
                <span className="text-white">Ready to Move</span>
                <br />
                <span className="text-cyan-500">to the Cloud?</span>
              </h2>
              <p className="text-base lg:text-lg text-slate-400 font-medium max-w-2xl mx-auto">
                Get a free cloud assessment and discover how we can help optimize your infrastructure, reduce costs, and improve performance.
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 py-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/10" />
              <div className="w-1.5 h-1.5 rounded-sm bg-cyan-500/50" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/10" />
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to={Routes.CONTACT}>
                <button className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-sm font-bold uppercase tracking-wide px-6 py-3 border-none group transition-all">
                  Schedule Free Assessment
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link to={Routes.HOME}>
                <button className="inline-flex items-center gap-2 border border-white/20 text-white hover:bg-white/5 hover:border-white/40 rounded-sm font-bold uppercase tracking-wide px-6 py-3 transition-all">
                  Explore Our Services
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
