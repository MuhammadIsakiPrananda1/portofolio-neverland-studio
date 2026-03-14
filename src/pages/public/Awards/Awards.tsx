import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Trophy, Award, Shield, Star, CheckCircle, ArrowRight,
  Calendar, ExternalLink, Medal, BadgeCheck, Zap, Globe,
} from 'lucide-react';
import SectionTitle from '@components/molecules/SectionTitle';
import { Routes } from '@config/constants';
import { staggerContainer, staggerItem, slideUp } from '@utils/animations';

// ─── Types ───────────────────────────────────────────────────────────────────
interface AwardItem {
  id: number;
  year: string;
  title: string;
  organization: string;
  category: string;
  description: string;
  badge: 'gold' | 'silver' | 'platinum';
  verified: boolean;
}

interface CertificationItem {
  id: number;
  name: string;
  body: string;
  validUntil: string;
  scope: string;
  iconColor: string;
}

interface PartnerItem {
  id: number;
  name: string;
  tier: 'Premier' | 'Advanced' | 'Select';
  since: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const awards: AwardItem[] = [
  {
    id: 1,
    year: '2025',
    title: 'Best Cybersecurity Firm of the Year',
    organization: 'Asia Pacific Cyber Awards',
    category: 'Cyber Security Excellence',
    description:
      'Recognized for delivering outstanding penetration testing and threat intelligence services across Southeast Asia, with a measurable impact on enterprise security posture.',
    badge: 'platinum',
    verified: true,
  },
  {
    id: 2,
    year: '2025',
    title: 'Top 50 Fastest Growing IT Companies',
    organization: 'Tech Growth Index',
    category: 'Business Growth',
    description:
      'Ranked among the top 50 fastest-growing information technology companies in the region, based on revenue growth, client expansion, and market penetration.',
    badge: 'gold',
    verified: true,
  },
  {
    id: 3,
    year: '2024',
    title: 'Excellence in Cloud Security Innovation',
    organization: 'Cloud Security Alliance – Indonesia Chapter',
    category: 'Cloud Innovation',
    description:
      'Awarded for pioneering cloud-native security architecture and helping over 30 enterprises achieve zero critical findings in cloud compliance assessments.',
    badge: 'gold',
    verified: true,
  },
  {
    id: 4,
    year: '2024',
    title: 'Best Managed Security Service Provider',
    organization: 'IDC APAC Security Awards',
    category: 'Managed Services',
    description:
      'Honoured as the best MSSP in the APAC region for our 24/7 SOC operations, threat response under 15 minutes, and 99.97% SLA uptime.',
    badge: 'platinum',
    verified: true,
  },
  {
    id: 5,
    year: '2023',
    title: 'Innovative Web Development Studio',
    organization: 'Indonesia Digital Awards',
    category: 'Web & Digital',
    description:
      'Recognized for crafting secure, high-performance web applications that blend cutting-edge UI/UX with enterprise-grade security practices.',
    badge: 'silver',
    verified: true,
  },
  {
    id: 6,
    year: '2023',
    title: 'Customer Satisfaction Excellence Award',
    organization: 'Clutch Global Awards',
    category: 'Client Relations',
    description:
      'Awarded by Clutch.co with a 4.9/5 aggregate review score from verified enterprise clients, reflecting our commitment to quality and long-term partnerships.',
    badge: 'gold',
    verified: true,
  },
];

const certifications: CertificationItem[] = [
  {
    id: 1,
    name: 'ISO/IEC 27001:2022',
    body: 'International Organization for Standardization',
    validUntil: 'Dec 2026',
    scope: 'Information Security Management System',
    iconColor: 'text-sky-400',
  },
  {
    id: 2,
    name: 'SOC 2 Type II',
    body: 'American Institute of CPAs (AICPA)',
    validUntil: 'Nov 2026',
    scope: 'Security, Availability & Confidentiality',
    iconColor: 'text-violet-400',
  },
  {
    id: 3,
    name: 'PCI-DSS v4.0',
    body: 'PCI Security Standards Council',
    validUntil: 'Mar 2027',
    scope: 'Payment Card Industry Compliance',
    iconColor: 'text-emerald-400',
  },
  {
    id: 4,
    name: 'OSCP & OSEP',
    body: 'Offensive Security',
    validUntil: 'Lifetime',
    scope: 'Penetration Testing Professionals',
    iconColor: 'text-red-400',
  },
  {
    id: 5,
    name: 'CISSP',
    body: '(ISC)²',
    validUntil: 'Lifetime (CPE required)',
    scope: 'Certified Information Systems Security Professionals',
    iconColor: 'text-amber-400',
  },
  {
    id: 6,
    name: 'CEH – Certified Ethical Hacker',
    body: 'EC-Council',
    validUntil: 'Lifetime (ECE required)',
    scope: 'Ethical Hacking & Vulnerability Assessment',
    iconColor: 'text-orange-400',
  },
];

const partners: PartnerItem[] = [
  { id: 1, name: 'AWS Partner Network', tier: 'Premier', since: '2021' },
  { id: 2, name: 'Microsoft Azure Partner', tier: 'Advanced', since: '2022' },
  { id: 3, name: 'Google Cloud Partner', tier: 'Select', since: '2022' },
  { id: 4, name: 'Palo Alto Networks MSSP', tier: 'Premier', since: '2020' },
  { id: 5, name: 'CrowdStrike Alliance Partner', tier: 'Advanced', since: '2023' },
  { id: 6, name: 'Cloudflare Authorized Partner', tier: 'Premium', since: '2023' } as any,
];

// ─── Badge Config ──────────────────────────────────────────────────────────────
const badgeConfig = {
  platinum: {
    label: 'Platinum',
    ring: 'border-violet-500/40',
    bg: 'bg-violet-500/10',
    text: 'text-violet-300',
    glow: 'group-hover:bg-violet-500/5',
    icon: 'text-violet-400',
  },
  gold: {
    label: 'Gold',
    ring: 'border-amber-500/40',
    bg: 'bg-amber-500/10',
    text: 'text-amber-300',
    glow: 'group-hover:bg-amber-500/5',
    icon: 'text-amber-400',
  },
  silver: {
    label: 'Silver',
    ring: 'border-slate-400/40',
    bg: 'bg-slate-400/10',
    text: 'text-slate-300',
    glow: 'group-hover:bg-slate-400/5',
    icon: 'text-slate-400',
  },
};

const tierConfig: Record<string, { bg: string; text: string; border: string }> = {
  Premier: { bg: 'bg-amber-500/10', text: 'text-amber-300', border: 'border-amber-500/30' },
  Advanced: { bg: 'bg-sky-500/10', text: 'text-sky-300', border: 'border-sky-500/30' },
  Select: { bg: 'bg-emerald-500/10', text: 'text-emerald-300', border: 'border-emerald-500/30' },
  Premium: { bg: 'bg-violet-500/10', text: 'text-violet-300', border: 'border-violet-500/30' },
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function Awards() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'platinum' | 'gold' | 'silver'>('all');

  const filteredAwards =
    activeFilter === 'all' ? awards : awards.filter((a) => a.badge === activeFilter);

  const stats = [
    { value: '15+', label: 'Awards Won' },
    { value: '6', label: 'Certifications' },
    { value: '5+', label: 'Years Recognized' },
    { value: '12+', label: 'Tech Partners' },
  ];

  const filters: { key: typeof activeFilter; label: string }[] = [
    { key: 'all', label: 'All Awards' },
    { key: 'platinum', label: 'Platinum' },
    { key: 'gold', label: 'Gold' },
    { key: 'silver', label: 'Silver' },
  ];

  return (
    <div className="pt-32 pb-20 min-h-screen bg-[#0B1120] relative overflow-hidden">
      {/* Background grid + blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute top-0 right-0 w-1/3 h-[500px] bg-amber-500/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-1/3 h-[500px] bg-red-500/5 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-500/3 blur-[160px]" />
      </div>

      <div className="container-custom relative z-10 px-4 mx-auto max-w-7xl">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <motion.div
          className="text-center mb-20 md:mb-28"
          variants={slideUp}
          initial="hidden"
          animate="visible"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-amber-500/30 bg-amber-500/10 mb-8 backdrop-blur-sm">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-mono font-bold text-amber-400 tracking-widest uppercase">
              Awards & Recognition
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tight">
            <span className="text-white">Industry </span>
            <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.2)]">
              Recognition
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
            A decade of excellence, recognized by the world's leading security and technology organizations.
            Our awards reflect not only our technical capability but our unwavering commitment to client success.
          </p>
        </motion.div>

        {/* ── Stats ────────────────────────────────────────────────────────── */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="relative rounded-sm p-6 text-center border border-white/5 bg-[#0f172a] hover:bg-[#0B1120] hover:border-amber-500/30 transition-all duration-300 group shadow-lg overflow-hidden"
              variants={staggerItem}
              whileHover={{ y: -4 }}
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-full blur-xl group-hover:bg-amber-500/10 transition-colors pointer-events-none" />
              <div className="text-3xl font-black text-white mb-2 tracking-tight group-hover:text-amber-400 transition-colors">
                {stat.value}
              </div>
              <div className="text-xs text-slate-500 font-bold uppercase tracking-widest font-mono">
                {stat.label}
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-500/20 group-hover:bg-amber-500 transition-colors" />
            </motion.div>
          ))}
        </motion.div>

        {/* ── Awards Section ───────────────────────────────────────────────── */}
        <div className="mb-24">
          <SectionTitle
            subtitle="Industry Awards"
            title="Our Recognition"
            className="mb-10"
          />

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {filters.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`px-4 py-2 rounded-sm text-xs font-mono font-bold uppercase tracking-widest transition-all duration-200 border ${
                  activeFilter === key
                    ? 'bg-red-500/20 border-red-500/50 text-red-300'
                    : 'bg-[#0f172a] border-white/10 text-slate-500 hover:border-red-500/30 hover:text-slate-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Awards Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            key={activeFilter}
          >
            {filteredAwards.map((award) => {
              const cfg = badgeConfig[award.badge];
              return (
                <motion.div
                  key={award.id}
                  variants={staggerItem}
                  whileHover={{ y: -4 }}
                  className="relative rounded-sm border border-white/10 bg-[#0f172a] hover:border-red-500/30 transition-all duration-300 group overflow-hidden shadow-xl"
                >
                  {/* Left accent */}
                  <div className="absolute top-0 left-0 w-1 h-full bg-red-500/30 group-hover:bg-red-500 transition-colors" />

                  {/* Glow at top-right */}
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 ${cfg.glow} rounded-full blur-2xl transition-colors pointer-events-none`}
                  />

                  <div className="p-7 pl-9">
                    {/* Top row: year + badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-slate-500 font-mono text-xs font-bold">
                        <Calendar className="w-3.5 h-3.5" />
                        {award.year}
                      </div>
                      <div
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-sm border ${cfg.ring} ${cfg.bg}`}
                      >
                        <Trophy className={`w-3.5 h-3.5 ${cfg.icon}`} />
                        <span className={`text-xs font-mono font-black uppercase tracking-widest ${cfg.text}`}>
                          {cfg.label}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-black uppercase tracking-tight text-white group-hover:text-red-400 transition-colors mb-1.5">
                      {award.title}
                    </h3>

                    {/* Org & category */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs font-mono font-bold text-red-400/80">{award.organization}</span>
                      <span className="w-1 h-1 rounded-sm bg-slate-600" />
                      <span className="text-xs font-mono text-slate-500">{award.category}</span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-400 leading-relaxed font-medium border-l border-white/5 pl-3">
                      {award.description}
                    </p>

                    {/* Verified badge */}
                    {award.verified && (
                      <div className="flex items-center gap-1.5 mt-5 text-emerald-400">
                        <BadgeCheck className="w-4 h-4" />
                        <span className="text-xs font-mono font-bold uppercase tracking-widest">Verified Award</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ── Certifications ───────────────────────────────────────────────── */}
        <div className="mb-24">
          <SectionTitle
            subtitle="Compliance & Credentials"
            title="Certifications"
            className="mb-12"
          />

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {certifications.map((cert) => (
              <motion.div
                key={cert.id}
                variants={staggerItem}
                whileHover={{ y: -4 }}
                className="relative rounded-sm border border-white/10 bg-[#0f172a] hover:border-red-500/30 hover:bg-[#0B1120] transition-all duration-300 group overflow-hidden shadow-lg p-6"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500/20 group-hover:bg-red-500 transition-colors" />
                <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/5 rounded-full blur-2xl group-hover:bg-red-500/10 transition-colors pointer-events-none" />

                <div className="flex items-start gap-4 pl-2">
                  <div className="w-10 h-10 rounded-sm border border-white/10 bg-[#0B1120] flex items-center justify-center shrink-0 group-hover:border-red-500/30 transition-colors">
                    <Shield className={`w-5 h-5 ${cert.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-black uppercase tracking-tight text-white group-hover:text-red-400 transition-colors mb-1">
                      {cert.name}
                    </h4>
                    <p className="text-xs text-slate-500 font-mono mb-3 leading-snug">{cert.body}</p>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        <span className="text-xs text-slate-300 font-medium">{cert.scope}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="text-xs text-slate-500 font-mono">Valid until {cert.validUntil}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Technology Partners ──────────────────────────────────────────── */}
        <div className="mb-24">
          <SectionTitle
            subtitle="Official Partnerships"
            title="Technology Partners"
            className="mb-12"
          />

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {partners.map((partner) => {
              const tc = tierConfig[partner.tier] ?? tierConfig.Select;
              return (
                <motion.div
                  key={partner.id}
                  variants={staggerItem}
                  whileHover={{ y: -4 }}
                  className="relative rounded-sm border border-white/10 bg-[#0f172a] hover:border-red-500/30 hover:bg-[#0B1120] transition-all duration-300 group overflow-hidden shadow-lg p-6"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-red-500/20 group-hover:bg-red-500 transition-colors" />

                  <div className="flex items-start justify-between gap-4 pl-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-sm border border-white/10 bg-[#0B1120] flex items-center justify-center shrink-0">
                        <Globe className="w-4 h-4 text-red-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black uppercase tracking-tight text-white group-hover:text-red-400 transition-colors">
                          {partner.name}
                        </h4>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Calendar className="w-3 h-3 text-slate-600" />
                          <span className="text-xs font-mono text-slate-500">Since {partner.since}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`px-2.5 py-1 rounded-sm border text-xs font-mono font-black uppercase tracking-widest shrink-0 ${tc.bg} ${tc.text} ${tc.border}`}>
                      {partner.tier}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ── Timeline ─────────────────────────────────────────────────────── */}
        <div className="mb-24">
          <SectionTitle
            subtitle="Our Journey"
            title="Recognition Timeline"
            className="mb-12"
          />

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-white/5 hidden md:block" />

            <motion.div
              className="space-y-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {awards
                .slice()
                .sort((a, b) => Number(b.year) - Number(a.year))
                .map((award) => {
                  const cfg = badgeConfig[award.badge];
                  return (
                    <motion.div
                      key={award.id}
                      variants={staggerItem}
                      className="relative flex gap-6 items-start group"
                    >
                      {/* Year dot */}
                      <div className="hidden md:flex flex-col items-center shrink-0 w-12">
                        <div className={`w-4 h-4 rounded-sm border-2 ${cfg.ring} bg-[#0B1120] mt-1 group-hover:scale-125 transition-transform`} />
                      </div>

                      {/* Card */}
                      <div className="flex-1 rounded-sm border border-white/10 bg-[#0f172a] hover:border-red-500/30 hover:bg-[#0B1120] transition-all duration-300 overflow-hidden p-5 shadow-lg">
                        <div className="absolute top-0 left-0 w-1 h-full bg-red-500/0 group-hover:bg-red-500 transition-colors" />
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span className={`px-2 py-0.5 rounded-sm text-xs font-mono font-black ${cfg.bg} ${cfg.text} ${cfg.ring} border`}>
                            {award.year}
                          </span>
                          <Zap className="w-3.5 h-3.5 text-red-500" />
                          <span className="text-sm font-black uppercase tracking-tight text-white group-hover:text-red-400 transition-colors">
                            {award.title}
                          </span>
                        </div>
                        <p className="text-xs font-mono text-slate-500">{award.organization} — {award.category}</p>
                      </div>
                    </motion.div>
                  );
                })}
            </motion.div>
          </div>
        </div>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <motion.div
          className="relative border border-white/10 rounded-sm p-12 lg:p-16 text-center bg-[#0f172a] mt-4 shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Top accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-red-500/20 bg-red-500/5">
              <Medal className="w-4 h-4 text-red-500" />
              <span className="text-xs font-mono font-bold text-red-400 tracking-widest uppercase">
                Work With The Best
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
              Ready to Partner With an{' '}
              <span className="text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]">
                Award-Winning
              </span>{' '}
              Team?
            </h2>

            <p className="text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
              Our recognition is only as meaningful as the results we deliver for our clients. Let's build
              something exceptional together — secure, scalable, and industry-leading.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={Routes.CONTACT}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-sm bg-red-500 hover:bg-red-600 text-white font-black uppercase tracking-wider text-sm transition-all duration-300 shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] group"
              >
                Start a Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to={Routes.PROJECTS}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-sm bg-[#0B1120] hover:bg-[#0f172a] border border-white/10 hover:border-red-500/30 text-white font-black uppercase tracking-wider text-sm transition-all duration-300 group"
              >
                <ExternalLink className="w-4 h-4 text-red-400" />
                View Our Work
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
