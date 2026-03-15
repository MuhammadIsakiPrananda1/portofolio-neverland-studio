import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  TrendingDown, DollarSign, BarChart, Zap, Shield, Clock, 
  CheckCircle, ArrowRight, Users, TrendingUp, Server, Eye 
} from 'lucide-react';
import SectionTitle from '@components/molecules/SectionTitle';
import { Routes } from '@config/constants';

export default function CostOptimization() {
  const stats = [
    { value: '45%', label: 'Average Cost Reduction' },
    { value: '30 Days', label: 'ROI Timeline' },
    { value: '$2M+', label: 'Total Savings' },
    { value: '150+', label: 'Optimized Accounts' },
  ];

  const features = [
    {
      icon: BarChart,
      title: 'Cost Analysis',
      description: 'Comprehensive analysis of your cloud spending with detailed breakdowns, trends, and anomaly detection.'
    },
    {
      icon: Eye,
      title: 'Usage Monitoring',
      description: 'Real-time monitoring of resource utilization to identify waste, unused resources, and optimization opportunities.'
    },
    {
      icon: Zap,
      title: 'Auto-Scaling',
      description: 'Implement intelligent auto-scaling policies to match resources with demand and eliminate over-provisioning.'
    },
    {
      icon: Server,
      title: 'Right-Sizing',
      description: 'Optimize instance types and sizes based on actual usage patterns and performance requirements.'
    },
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: 'Cost Savings',
      description: 'Reduce cloud spending by up to 45% through strategic optimization and efficient resource management.'
    },
    {
      icon: TrendingUp,
      title: 'Better Performance',
      description: 'Improve application performance while reducing costs through optimized resource allocation.'
    },
    {
      icon: Shield,
      title: 'Predictable Budgets',
      description: 'Set up budget alerts and forecasting to prevent cost overruns and maintain control.'
    },
    {
      icon: Clock,
      title: 'Continuous Optimization',
      description: 'Ongoing monitoring and optimization ensures sustained cost efficiency over time.'
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
          {/* Accent Line */}
          <div className="w-20 h-1 bg-cyan-500 mx-auto mb-8 rounded-sm" />
          
          {/* Icon Badge */}
          <div className="inline-flex p-4 rounded-sm border border-cyan-500/30 bg-cyan-500/10 mb-6">
            <TrendingDown className="w-12 h-12 text-cyan-500" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6 text-white drop-shadow-[0_0_10px_rgba(6,182,212,0.2)]">
            Cost Optimization
          </h1>
          
          <p className="text-lg lg:text-xl text-slate-400 font-medium max-w-3xl mx-auto mb-8">
            Reduce cloud spending by up to 45% without compromising performance. 
            Our expert optimization strategies help you maximize ROI on your cloud investment.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={Routes.CONTACT}>
              <button className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-sm font-bold uppercase tracking-wide px-6 py-3 border-none group transition-all">
                Start Saving Today
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link to={Routes.CLOUD_SOLUTIONS}>
              <button className="inline-flex items-center gap-2 border border-white/20 text-white hover:bg-white/5 hover:border-white/40 rounded-sm font-bold uppercase tracking-wide px-6 py-3 transition-all">
                View Cloud Solutions
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

        {/* Features Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Optimization Services"
            title="Complete Cost Management"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
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
                  <feature.icon className="w-6 h-6 text-cyan-500" />
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight text-white mb-2">
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
            subtitle="Key Benefits"
            title="Why Optimize Cloud Costs?"
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-sm p-6 text-center border border-white/5 bg-[#0f172a] hover:border-cyan-500/50 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="inline-flex p-3 rounded-sm bg-[#0B1120] border border-white/10 mb-4">
                  <benefit.icon className="w-6 h-6 text-cyan-500" />
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-slate-400 font-medium text-sm">
                  {benefit.description}
                </p>
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
                  'FinOps certified cost optimization experts',
                  'Average 45% cost reduction within 30 days',
                  'No upfront fees - pay from savings',
                  'Automated optimization recommendations',
                  'Multi-cloud cost management expertise',
                  'Continuous monitoring and optimization'
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
                <TrendingDown className="w-10 h-10 text-cyan-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">45% Savings</h4>
                <p className="text-slate-500 font-mono text-xs">Average reduction</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-cyan-500/30 transition-colors duration-300">
                <BarChart className="w-10 h-10 text-cyan-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">Real-time Analytics</h4>
                <p className="text-slate-500 font-mono text-xs">Cost insights</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-cyan-500/30 transition-colors duration-300">
                <Zap className="w-10 h-10 text-cyan-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">Quick ROI</h4>
                <p className="text-slate-500 font-mono text-xs">30-day results</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-cyan-500/30 transition-colors duration-300">
                <Users className="w-10 h-10 text-cyan-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">Expert Team</h4>
                <p className="text-slate-500 font-mono text-xs">FinOps certified</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Cloud Cost Optimization Certification Roadmap ─── */}
        <motion.div className="mb-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <SectionTitle subtitle="Career Path" title="Cloud Cost Optimization Certification Roadmap" className="mb-4" />
          <p className="text-center text-gray-400 text-sm mb-12 max-w-2xl mx-auto">
            From cloud economics to FinOps expert — certifications for cloud cost optimization and financial management professionals.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
            {[{ label: 'Cloud Basics', color: 'bg-blue-500' }, { label: 'FinOps', color: 'bg-emerald-500' }, { label: 'AWS / Azure', color: 'bg-amber-500' }, { label: 'Analytics', color: 'bg-purple-500' }].map(t => (
              <div key={t.label} className="flex items-center gap-2"><div className={`w-3 h-3 rounded-sm ${t.color}`} /><span className="text-xs text-gray-400">{t.label}</span></div>
            ))}
          </div>
          {[
            { level: 'Beginner', levelColor: 'from-sky-500 to-cyan-400', levelBorder: 'border-sky-500/30', levelBg: 'bg-sky-500/10', levelText: 'text-sky-300', desc: 'Cloud fundamentals and cost awareness.',
              certs: [
                { name: 'AWS CLF-C02',       org: 'Amazon',    track: 'cloud',   desc: 'Cloud Practitioner — understand AWS pricing and billing models.' },
                { name: 'AZ-900',            org: 'Microsoft', track: 'cloud',   desc: 'Azure Fundamentals — Azure pricing, SLAs, and cost management tools.' },
                { name: 'GCP Digital Leader',org: 'Google',    track: 'cloud',   desc: 'Digital Cloud Leader — GCP pricing models and cloud economic basics.' },
                { name: 'Google Analytics 4',org: 'Google',    track: 'analytics', desc: 'GA4 — data-driven approach to cloud usage and optimization metrics.' },
              ]},
            { level: 'Intermediate', levelColor: 'from-amber-500 to-yellow-400', levelBorder: 'border-amber-500/30', levelBg: 'bg-amber-500/10', levelText: 'text-amber-300', desc: 'FinOps practitioner and cloud cost management.',
              certs: [
                { name: 'FinOps Practitioner', org: 'FinOps Foundation', track: 'finops', desc: 'Cloud Financial Management — FinOps framework practitioner.' },
                { name: 'AWS SAA-C03',         org: 'Amazon',    track: 'aws',   desc: 'Solutions Architect — right-sizing and reserved instance strategies.' },
                { name: 'AZ-104',              org: 'Microsoft', track: 'aws',   desc: 'Azure Administrator — Azure Cost Management and Advisor.' },
                { name: 'Tableau Analyst',     org: 'Tableau',   track: 'analytics', desc: 'Data Analyst — build cloud cost dashboards and trend reports.' },
              ]},
            { level: 'Advanced', levelColor: 'from-orange-500 to-amber-500', levelBorder: 'border-orange-500/30', levelBg: 'bg-orange-500/10', levelText: 'text-orange-300', desc: 'Advanced FinOps, automation, and multi-cloud cost governance.',
              certs: [
                { name: 'FinOps Certified Pro',org: 'FinOps Foundation', track: 'finops', desc: 'Advanced cloud financial management and governance expertise.' },
                { name: 'AWS Cost Optimizer', org: 'Amazon',    track: 'aws',   desc: 'AWS Cost Optimization — reserved instances, savings plans, Spot.' },
                { name: 'Terraform Associate',org: 'HashiCorp', track: 'finops', desc: 'IaC for automated, cost-efficient cloud resource provisioning.' },
                { name: 'Power BI',           org: 'Microsoft', track: 'analytics', desc: 'Power BI — advanced cloud cost reporting and executive dashboards.' },
              ]},
            { level: 'Expert', levelColor: 'from-rose-500 to-pink-500', levelBorder: 'border-rose-500/30', levelBg: 'bg-rose-500/10', levelText: 'text-rose-300', desc: 'Enterprise FinOps leadership and multi-cloud governance.',
              certs: [
                { name: 'FinOps Director',    org: 'FinOps Foundation', track: 'finops', desc: 'FinOps Director — lead enterprise cloud financial operations.' },
                { name: 'AWS SAP-C02',        org: 'Amazon',    track: 'aws',   desc: 'Solutions Architect Pro — enterprise cost-optimized cloud designs.' },
                { name: 'CGEIT',              org: 'ISACA',     track: 'analytics', desc: 'Governance of Enterprise IT — align cloud spend to business strategy.' },
                { name: 'PMP',                org: 'PMI',       track: 'finops',   desc: 'PMP — lead enterprise cloud cost optimization programs.' },
              ]},
          ].map((row, rowIdx, arr) => {
            const ts: Record<string, { bg: string; border: string; text: string; dot: string }> = {
              cloud:     { bg: 'bg-blue-500/10',   border: 'border-blue-500/25',   text: 'text-blue-300',   dot: 'bg-blue-500' },
              finops:    { bg: 'bg-emerald-500/10',border: 'border-emerald-500/25',text: 'text-emerald-300',dot: 'bg-emerald-500' },
              aws:       { bg: 'bg-amber-500/10',  border: 'border-amber-500/25',  text: 'text-amber-300',  dot: 'bg-amber-500' },
              analytics: { bg: 'bg-purple-500/10', border: 'border-purple-500/25', text: 'text-purple-300', dot: 'bg-purple-500' },
            };
            const isLast = rowIdx === arr.length - 1;
            return (
              <motion.div key={row.level} className="relative" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: rowIdx * 0.12, duration: 0.5 }}>
                {!isLast && <div className="absolute left-[1.15rem] top-full w-px h-8 bg-white/10 z-10" />}
                <div className="flex gap-5 mb-8">
                  <div className="flex flex-col items-center flex-shrink-0 pt-1">
                    <div className={`w-10 h-10 rounded-sm shadow-sm ${row.levelBg} border ${row.levelBorder} flex items-center justify-center`}>
                      <span className={`text-xs font-black ${row.levelText}`}>{rowIdx + 1}</span>
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
                        <div key={cert.name} className={`group relative rounded-sm border ${s.border} ${s.bg} p-3 hover:bg-[#0B1120] transition-colors duration-200 cursor-default`}>
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

        {/* CTA Section */}
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
              <TrendingDown className="w-3.5 h-3.5 text-cyan-500" />
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">Save Money</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
                <span className="text-white">Ready to Reduce</span>
                <br />
                <span className="text-cyan-500">Your Cloud Costs?</span>
              </h2>
              <p className="text-base lg:text-lg text-slate-400 font-medium max-w-2xl mx-auto">
                Get a free cost analysis report showing exactly where you can save. Our team will identify optimization opportunities and provide an action plan.
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
                  Get Free Cost Analysis
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link to={Routes.CLOUD_SOLUTIONS}>
                <button className="inline-flex items-center gap-2 border border-white/20 text-white hover:bg-white/5 hover:border-white/40 rounded-sm font-bold uppercase tracking-wide px-6 py-3 transition-all">
                  Explore Cloud Solutions
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
