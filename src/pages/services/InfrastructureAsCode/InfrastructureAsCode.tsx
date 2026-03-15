import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FileCode, GitBranch, Zap, Repeat, Shield, Clock, 
  CheckCircle, ArrowRight, Code, Users, TrendingUp 
} from 'lucide-react';
import SectionTitle from '@components/molecules/SectionTitle';
import { Routes } from '@config/constants';

export default function InfrastructureAsCode() {
  const stats = [
    { value: '10x', label: 'Faster Deployment' },
    { value: '95%', label: 'Error Reduction' },
    { value: '< 5min', label: 'Provisioning Time' },
    { value: '100%', label: 'Reproducibility' },
  ];

  const features = [
    {
      icon: FileCode,
      title: 'Infrastructure Templates',
      description: 'Define your infrastructure as code using Terraform, CloudFormation, or ARM templates for version-controlled infrastructure.'
    },
    {
      icon: GitBranch,
      title: 'Version Control',
      description: 'Track infrastructure changes with Git, enabling rollbacks, code reviews, and collaborative infrastructure management.'
    },
    {
      icon: Zap,
      title: 'Automated Provisioning',
      description: 'Deploy consistent environments in minutes with automated provisioning pipelines and validation processes.'
    },
    {
      icon: Repeat,
      title: 'CI/CD Integration',
      description: 'Seamlessly integrate infrastructure deployment into your CI/CD pipeline for true DevOps automation.'
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Increased Efficiency',
      description: 'Automate repetitive tasks and deploy infrastructure 10x faster than manual processes.'
    },
    {
      icon: Shield,
      title: 'Enhanced Consistency',
      description: 'Eliminate configuration drift with standardized, repeatable infrastructure deployments.'
    },
    {
      icon: Clock,
      title: 'Rapid Recovery',
      description: 'Quickly recreate entire environments from code in case of disasters or failures.'
    },
    {
      icon: Code,
      title: 'Better Collaboration',
      description: 'Enable teams to collaborate on infrastructure using familiar development workflows.'
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
            <FileCode className="w-12 h-12 text-cyan-500" />
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6 text-white drop-shadow-[0_0_10px_rgba(6,182,212,0.2)]">
            Infrastructure as Code
          </h1>
          
          <p className="text-lg lg:text-xl text-slate-400 font-medium max-w-3xl mx-auto mb-8">
            Automate infrastructure provisioning and management with version-controlled code. 
            Deploy consistent, repeatable environments in minutes instead of hours.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={Routes.CONTACT}>
              <button className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-sm font-bold uppercase tracking-wide px-6 py-3 border-none group transition-all">
                Start Automation
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
            subtitle="Core Capabilities"
            title="Complete IaC Implementation"
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
            subtitle="Key Advantages"
            title="Why Infrastructure as Code?"
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
                  'Expert in Terraform, CloudFormation, and ARM',
                  'CI/CD pipeline integration specialists',
                  'Multi-cloud IaC implementation',
                  'Automated testing and validation',
                  'Complete documentation and training',
                  'Ongoing support and optimization'
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
                <FileCode className="w-10 h-10 text-cyan-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">Code-First</h4>
                <p className="text-slate-500 font-mono text-xs">Infrastructure as code</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-cyan-500/30 transition-colors duration-300">
                <GitBranch className="w-10 h-10 text-cyan-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">Version Control</h4>
                <p className="text-slate-500 font-mono text-xs">Git integration</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-cyan-500/30 transition-colors duration-300">
                <Zap className="w-10 h-10 text-cyan-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">Fast Deploy</h4>
                <p className="text-slate-500 font-mono text-xs">Minutes not hours</p>
              </div>
              <div className="rounded-sm p-5 text-center border border-white/5 bg-[#0B1120] hover:border-cyan-500/30 transition-colors duration-300">
                <Users className="w-10 h-10 text-cyan-500 mx-auto mb-3" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white mb-1">Expert Team</h4>
                <p className="text-slate-500 font-mono text-xs">DevOps specialists</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── IaC Certification Roadmap ─── */}
        <motion.div className="mb-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <SectionTitle subtitle="Career Path" title="Infrastructure as Code Certification Roadmap" className="mb-4" />
          <p className="text-center text-gray-400 text-sm mb-12 max-w-2xl mx-auto">
            From DevOps basics to expert-level IaC automation — structured certifications for infrastructure engineers.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
            {[{ label: 'DevOps Basics', color: 'bg-blue-500' }, { label: 'Terraform / IaC', color: 'bg-amber-500' }, { label: 'Kubernetes', color: 'bg-emerald-500' }, { label: 'Governance', color: 'bg-purple-500' }].map(t => (
              <div key={t.label} className="flex items-center gap-2"><div className={`w-3 h-3 rounded-sm ${t.color}`} /><span className="text-xs text-gray-400">{t.label}</span></div>
            ))}
          </div>
          {[
            { level: 'Beginner', levelColor: 'from-sky-500 to-cyan-400', levelBorder: 'border-sky-500/30', levelBg: 'bg-sky-500/10', levelText: 'text-sky-300', desc: 'Linux, version control, and basic cloud fundamentals.',
              certs: [
                { name: 'CompTIA Linux+', org: 'CompTIA',   track: 'devops',   desc: 'Linux administration — foundational for IaC tool usage.' },
                { name: 'AWS CLF-C02',   org: 'Amazon',    track: 'devops',   desc: 'Cloud Practitioner — understand what you will be automating.' },
                { name: 'Git Essentials',org: 'GitHub',    track: 'iac',      desc: 'Git version control — essential for IaC workflows and CI/CD.' },
                { name: 'Docker Basics', org: 'Docker',    track: 'k8s',      desc: 'Docker fundamentals — containers that IaC will orchestrate.' },
              ]},
            { level: 'Intermediate', levelColor: 'from-amber-500 to-yellow-400', levelBorder: 'border-amber-500/30', levelBg: 'bg-amber-500/10', levelText: 'text-amber-300', desc: 'Terraform, Ansible, and cloud-specific IaC tools.',
              certs: [
                { name: 'HashiCorp Terraform', org: 'HashiCorp',  track: 'iac',      desc: 'Terraform Associate — provision cloud infrastructure with code.' },
                { name: 'AWS SAA-C03',         org: 'Amazon',    track: 'devops',   desc: 'Solutions Architect Associate — architecture to automate.' },
                { name: 'Ansible Automation',  org: 'Red Hat',   track: 'iac',      desc: 'Red Hat Certified Ansible Automation — configuration management.' },
                { name: 'CKAD',                org: 'CNCF',      track: 'k8s',      desc: 'Certified Kubernetes App Developer — deploy apps via IaC.' },
              ]},
            { level: 'Advanced', levelColor: 'from-orange-500 to-amber-500', levelBorder: 'border-orange-500/30', levelBg: 'bg-orange-500/10', levelText: 'text-orange-300', desc: 'Advanced Kubernetes, multi-cloud IaC, and CI/CD pipelines.',
              certs: [
                { name: 'CKA',                 org: 'CNCF',      track: 'k8s',      desc: 'Certified Kubernetes Administrator — orchestrate containerized infra.' },
                { name: 'AWS DevOps Pro',      org: 'Amazon',    track: 'devops',   desc: 'DevOps Engineer Professional — CI/CD, IaC, and automation on AWS.' },
                { name: 'Terraform Professional',org: 'HashiCorp',track: 'iac',    desc: 'Terraform Professional — advanced modules, workspaces, and Sentinel.' },
                { name: 'CKS',                 org: 'CNCF',      track: 'k8s',      desc: 'Kubernetes Security Specialist — secure IaC-managed clusters.' },
              ]},
            { level: 'Expert', levelColor: 'from-rose-500 to-pink-500', levelBorder: 'border-rose-500/30', levelBg: 'bg-rose-500/10', levelText: 'text-rose-300', desc: 'Platform engineering, IaC governance, and enterprise DevOps.',
              certs: [
                { name: 'AWS SAP-C02',         org: 'Amazon',    track: 'devops',   desc: 'Solutions Architect Pro — complex multi-account IaC architectures.' },
                { name: 'Google Cloud Arch',   org: 'Google',    track: 'devops',   desc: 'Professional Cloud Architect — deploy entire GCP infra via IaC.' },
                { name: 'CISSP',               org: 'ISC²',      track: 'governance', desc: 'Senior security governance for IaC pipelines and environments.' },
                { name: 'PMP',                 org: 'PMI',       track: 'governance', desc: 'PMP — lead enterprise DevOps and platform engineering teams.' },
              ]},
          ].map((row, rowIdx, arr) => {
            const ts: Record<string, { bg: string; border: string; text: string; dot: string }> = {
              devops:     { bg: 'bg-blue-500/10',   border: 'border-blue-500/25',   text: 'text-blue-300',   dot: 'bg-blue-500' },
              iac:        { bg: 'bg-amber-500/10',  border: 'border-amber-500/25',  text: 'text-amber-300',  dot: 'bg-amber-500' },
              k8s:        { bg: 'bg-emerald-500/10',border: 'border-emerald-500/25',text: 'text-emerald-300',dot: 'bg-emerald-500' },
              governance: { bg: 'bg-purple-500/10', border: 'border-purple-500/25', text: 'text-purple-300', dot: 'bg-purple-500' },
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
              <FileCode className="w-3.5 h-3.5 text-cyan-500" />
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">Automate Now</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
                <span className="text-white">Ready to Automate</span>
                <br />
                <span className="text-cyan-500">Your Infrastructure?</span>
              </h2>
              <p className="text-base lg:text-lg text-slate-400 font-medium max-w-2xl mx-auto">
                Transform manual processes into automated workflows. Get a free consultation to discover how IaC can revolutionize your infrastructure management.
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
                  Get Free Consultation
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
