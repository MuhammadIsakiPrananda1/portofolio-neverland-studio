import { motion } from 'framer-motion';
import { slideUp } from '@utils/animations';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionTitle({ title, subtitle, align = 'center', className = '' }: SectionTitleProps) {
  const alignClasses = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  
  return (
    <motion.div
      className={`flex flex-col ${alignClasses} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={slideUp}
    >
      {subtitle && (
        <span className="text-primary font-semibold uppercase tracking-wider text-sm mb-3">
          {subtitle}
        </span>
      )}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
        {title}
      </h2>
      <div className={`h-1 w-24 bg-gradient-cyber rounded-full ${align === 'center' ? 'mx-auto' : ''}`} />
    </motion.div>
  );
}
