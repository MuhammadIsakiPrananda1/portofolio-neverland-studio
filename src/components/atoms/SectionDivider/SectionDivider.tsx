import { motion } from 'framer-motion';

interface SectionDividerProps {
  variant?: 'default' | 'purple' | 'blue' | 'emerald';
  className?: string;
}

export default function SectionDivider({ variant = 'default', className = '' }: SectionDividerProps) {
  const variantStyles = {
    default: {
      line: 'bg-gradient-to-r from-transparent via-purple-500/30 to-transparent',
      dots: ['bg-purple-500/50', 'bg-blue-500/50', 'bg-purple-500/50'],
    },
    purple: {
      line: 'bg-gradient-to-r from-transparent via-purple-500/40 to-transparent',
      dots: ['bg-purple-500/60', 'bg-purple-400/60', 'bg-purple-500/60'],
    },
    blue: {
      line: 'bg-gradient-to-r from-transparent via-blue-500/40 to-transparent',
      dots: ['bg-blue-500/60', 'bg-cyan-500/60', 'bg-blue-500/60'],
    },
    emerald: {
      line: 'bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent',
      dots: ['bg-emerald-500/60', 'bg-teal-500/60', 'bg-emerald-500/60'],
    },
  };

  const style = variantStyles[variant];

  return (
    <div className={`relative py-8 md:py-12 ${className}`}>
      <div className="container-custom">
        <div className="relative flex items-center justify-center">
          {/* Horizontal Line */}
          <div className="absolute inset-0 flex items-center">
            <div className={`w-full h-px ${style.line}`} />
          </div>
          
          {/* Three Dots */}
          <motion.div 
            className="relative flex gap-2.5 px-8 bg-dark-900"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {style.dots.map((dotColor, index) => (
              <motion.div
                key={index}
                className={`w-2.5 h-2.5 rounded-full ${dotColor}`}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
