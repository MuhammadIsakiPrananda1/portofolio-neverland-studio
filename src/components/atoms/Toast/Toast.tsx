import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

interface ToastProps {
    toast: { message: string; type: 'success' | 'error' | 'info'; id: number } | null;
    onDismiss: () => void;
}

const toastConfig = {
    success: {
        icon: CheckCircle2,
        bg: 'from-emerald-500/20 to-emerald-500/5',
        border: 'border-emerald-500/30',
        iconColor: 'text-emerald-400',
        glow: 'shadow-emerald-500/20',
    },
    error: {
        icon: XCircle,
        bg: 'from-red-500/20 to-red-500/5',
        border: 'border-red-500/30',
        iconColor: 'text-red-400',
        glow: 'shadow-red-500/20',
    },
    info: {
        icon: Info,
        bg: 'from-blue-500/20 to-blue-500/5',
        border: 'border-blue-500/30',
        iconColor: 'text-blue-400',
        glow: 'shadow-blue-500/20',
    },
};

export default function Toast({ toast, onDismiss }: ToastProps) {
    return (
        <div className="fixed bottom-6 right-6 z-[100] pointer-events-none">
            <AnimatePresence>
                {toast && (() => {
                    const config = toastConfig[toast.type];
                    const Icon = config.icon;
                    return (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className={`pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-xl bg-gradient-to-r ${config.bg} border ${config.border} backdrop-blur-2xl shadow-2xl ${config.glow} min-w-[280px] max-w-md`}
                        >
                            <Icon className={`w-5 h-5 ${config.iconColor} flex-shrink-0`} />
                            <span className="text-sm font-medium text-white flex-1">{toast.message}</span>
                            <button
                                onClick={onDismiss}
                                className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors flex-shrink-0"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </motion.div>
                    );
                })()}
            </AnimatePresence>
        </div>
    );
}
