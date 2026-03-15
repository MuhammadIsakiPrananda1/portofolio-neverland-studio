import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useSidebarState } from '@hooks';
import { useLocation } from 'react-router-dom';

export default function FloatingCartButton() {
    const { totalItems, setIsCartOpen } = useCart();
    const isSidebarOpen = useSidebarState();
    const location = useLocation();

    // Show button only on the store page
    const isVisible = location.pathname.startsWith('/store');

    const blurClass = isSidebarOpen
        ? 'blur-[2px] opacity-50 pointer-events-none lg:blur-none lg:opacity-100 lg:pointer-events-auto'
        : '';

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0, y: 20 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    onClick={() => setIsCartOpen(true)}
                    className={`fixed bottom-[4.5rem] right-6 w-11 h-11 rounded-sm bg-[#0f172a] border border-red-500/40 hover:border-red-500 hover:bg-red-500/10 transition-all duration-300 shadow-[0_0_20px_rgba(239,68,68,0.15)] hover:shadow-[0_0_25px_rgba(239,68,68,0.3)] flex items-center justify-center z-50 group ${blurClass}`}
                    aria-label="Shopping Cart"
                >
                    <ShoppingCart className="w-4 h-4 text-red-400 group-hover:text-red-300 transition-colors" />

                    {/* Item count badge */}
                    <AnimatePresence>
                        {totalItems > 0 && (
                            <motion.div
                                key={totalItems}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-sm bg-red-500 text-white text-[9px] font-black flex items-center justify-center shadow-lg border border-[#0B1120] font-mono"
                            >
                                {totalItems}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Tooltip */}
                    <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#0f172a] border border-white/10 rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
                        <span className="text-[11px] font-mono font-bold text-slate-300 uppercase tracking-widest">Cart{totalItems > 0 ? ` (${totalItems})` : ''}</span>
                    </div>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
