import { motion } from 'framer-motion';
import SectionTitle from '@components/molecules/SectionTitle';

export interface Cert {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  org: string;
  desc: string;
}

export interface CertTrack {
  track: string;
  subtitle: string;
  accent: string;       // hex color for dot & connector
  glow: string;         // rgba color for top glow
  border: string;       // tailwind border class
  bg: string;           // tailwind from- gradient class
  badgeBg: string;      // tailwind bg class
  badgeText: string;    // tailwind text class
  certs: Cert[];
}

interface Props {
  subtitle?: string;
  title?: string;
  description?: string;
  tracks: CertTrack[];
}

const levelConfig: Record<string, { color: string }> = {
  Beginner:     { color: 'text-sky-400' },
  Intermediate: { color: 'text-amber-400' },
  Advanced:     { color: 'text-orange-400' },
  Expert:       { color: 'text-rose-400' },
};

const legend = [
  { label: 'Beginner',     color: 'bg-sky-400' },
  { label: 'Intermediate', color: 'bg-amber-400' },
  { label: 'Advanced',     color: 'bg-orange-400' },
  { label: 'Expert',       color: 'bg-rose-400' },
];

export default function CertificationRoadmap({
  subtitle = 'Career Path',
  title = 'Certification Roadmap',
  description = 'Structured learning paths followed by our certified experts — from foundational knowledge to elite specializations.',
  tracks,
}: Props) {
  return (
    <motion.div
      className="mb-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <SectionTitle subtitle={subtitle} title={title} className="mb-4" />
      <p className="text-center text-gray-400 text-sm mb-14 max-w-2xl mx-auto">
        {description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tracks.map((track) => (
          <motion.div
            key={track.track}
            className={`relative rounded-2xl border ${track.border} bg-gradient-to-b ${track.bg} to-transparent p-6 lg:p-8 overflow-hidden`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Glow top */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 blur-3xl pointer-events-none opacity-40"
              style={{ background: track.glow }}
            />

            {/* Track header */}
            <div className="relative z-10 mb-8">
              <span
                className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${track.badgeBg} ${track.badgeText} border ${track.border} mb-3`}
              >
                {track.track}
              </span>
              <h3 className="text-xl font-bold text-white mb-1">{track.track} Track</h3>
              <p className="text-gray-500 text-xs">{track.subtitle}</p>
            </div>

            {/* Timeline nodes */}
            <div className="relative z-10">
              {track.certs.map((cert, i) => {
                const lc = levelConfig[cert.level];
                const isLast = i === track.certs.length - 1;
                return (
                  <div key={cert.name} className="flex gap-4">
                    {/* Left: dot + connector */}
                    <div className="flex flex-col items-center flex-shrink-0 w-6">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0 mt-1 shadow-lg ring-2 ring-white/10"
                        style={{ background: track.accent }}
                      />
                      {!isLast && (
                        <div
                          className="w-px flex-1 my-1 min-h-[2rem]"
                          style={{
                            background: `linear-gradient(to bottom, ${track.accent}60, ${track.accent}10)`,
                          }}
                        />
                      )}
                    </div>

                    {/* Right: cert info */}
                    <div className={`pb-6 ${isLast ? 'pb-0' : ''}`}>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h4 className="text-sm font-bold text-white leading-tight">{cert.name}</h4>
                        <span
                          className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${lc.color} bg-white/5`}
                        >
                          {cert.level}
                        </span>
                      </div>
                      <p className="text-[10px] font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                        {cert.org}
                      </p>
                      <p className="text-[11px] text-gray-500 leading-relaxed">{cert.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-5 mt-10">
        {legend.map((l) => (
          <div key={l.label} className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${l.color}`} />
            <span className="text-xs text-gray-500">{l.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
