import { motion } from 'framer-motion';

export function SkeletonCard() {
  return (
    <div className="bg-[#0f172a] rounded-sm overflow-hidden border border-white/5 h-full flex flex-col">
      {/* Image Skeleton */}
      <motion.div 
        className="h-40 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 overflow-hidden"
        animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ backgroundSize: '200% 100%' }}
      />

      {/* Content Skeleton */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Category Badge */}
        <motion.div 
          className="w-20 h-6 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-sm mb-3"
          animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ backgroundSize: '200% 100%' }}
        />

        {/* Title Lines */}
        <div className="space-y-2 mb-4">
          <motion.div 
            className="h-4 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-sm w-full"
            animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ backgroundSize: '200% 100%' }}
          />
          <motion.div 
            className="h-4 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-sm w-4/5"
            animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ backgroundSize: '200% 100%' }}
          />
        </div>

        {/* Summary Lines */}
        <div className="space-y-2 mb-4 flex-1">
          <motion.div 
            className="h-3 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-sm w-full"
            animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ backgroundSize: '200% 100%' }}
          />
          <motion.div 
            className="h-3 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-sm w-full"
            animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ backgroundSize: '200% 100%' }}
          />
          <motion.div 
            className="h-3 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-sm w-3/5"
            animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ backgroundSize: '200% 100%' }}
          />
        </div>

        {/* Footer Skeleton */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <motion.div 
            className="h-3 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-sm w-28"
            animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ backgroundSize: '200% 100%' }}
          />
          <motion.div 
            className="h-3 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-sm w-20"
            animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ backgroundSize: '200% 100%' }}
          />
        </div>
      </div>
    </div>
  );
}
