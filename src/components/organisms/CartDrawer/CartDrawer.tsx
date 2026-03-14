import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    X, ShoppingCart, Trash2, Plus, Minus, ArrowRight, Zap, Tag,
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Routes } from '@config/constants';

function formatRupiah(num: number): string {
    return 'Rp ' + num.toLocaleString('id-ID');
}

export default function CartDrawer() {
    const {
        items,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        totalSavings,
        isCartOpen,
        setIsCartOpen,
        lastAddedItem,
    } = useCart();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[70]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                    />

                    {/* Drawer */}
                    <motion.div
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0B1120] border-l border-white/10 z-[80] flex flex-col"
                        style={{ boxShadow: '-8px 0 40px rgba(0,0,0,0.6)' }}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#0f172a]">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-red-500/10 border border-red-500/20 rounded-sm">
                                    <ShoppingCart className="w-4 h-4 text-red-400" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-mono uppercase tracking-widest text-red-400 mb-0.5">
                                        Service Cart
                                    </p>
                                    <h2 className="text-sm font-bold text-white leading-none">
                                        {totalItems} {totalItems === 1 ? 'Item' : 'Items'} Selected
                                    </h2>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 rounded-sm border border-white/10 hover:border-red-500/40 hover:bg-red-500/5 text-gray-400 hover:text-red-400 transition-all"
                                aria-label="Close cart"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ scrollbarWidth: 'thin', scrollbarColor: '#ef444420 transparent' }}>
                            {items.length === 0 ? (
                                /* Empty State */
                                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                                    <div className="relative mb-6">
                                        <div className="w-20 h-20 rounded-sm border border-white/10 bg-[#0f172a] flex items-center justify-center">
                                            <ShoppingCart className="w-8 h-8 text-gray-600" />
                                        </div>
                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500/30 border border-red-500/50 rounded-sm" />
                                    </div>
                                    <p className="text-[10px] font-mono uppercase tracking-widest text-red-400/60 mb-2">
                                        Cart Empty
                                    </p>
                                    <h3 className="text-sm font-bold text-white mb-2">No Services Added</h3>
                                    <p className="text-xs text-gray-500 mb-6 max-w-[200px]">
                                        Browse our security services and add them to your cart.
                                    </p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="px-5 py-2.5 rounded-sm bg-red-500/10 text-red-400 text-xs font-mono uppercase tracking-widest border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40 transition-all"
                                    >
                                        Browse Services
                                    </button>
                                </div>
                            ) : (
                                <AnimatePresence mode="popLayout">
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, x: 30 }}
                                            animate={{
                                                opacity: 1,
                                                x: 0,
                                                ...(lastAddedItem === item.id
                                                    ? { boxShadow: '0 0 16px rgba(239,68,68,0.2)' }
                                                    : {}),
                                            }}
                                            exit={{ opacity: 0, x: 30 }}
                                            transition={{ type: 'spring', damping: 22 }}
                                            className={`relative overflow-hidden rounded-sm border transition-all duration-300 ${
                                                lastAddedItem === item.id
                                                    ? 'border-red-500/40 bg-[#0f172a]'
                                                    : 'border-white/10 bg-[#0f172a] hover:border-white/20'
                                            }`}
                                        >
                                            {/* Left accent bar */}
                                            <div className={`absolute left-0 top-0 w-0.5 h-full transition-all duration-300 ${
                                                lastAddedItem === item.id ? 'bg-red-500' : 'bg-red-500/20'
                                            }`} />

                                            {/* Just added badge */}
                                            {lastAddedItem === item.id && (
                                                <motion.div
                                                    className="absolute top-2 right-2 px-2 py-0.5 rounded-sm bg-red-500 text-[9px] font-mono font-bold uppercase tracking-widest text-white"
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    exit={{ scale: 0, opacity: 0 }}
                                                >
                                                    + Added
                                                </motion.div>
                                            )}

                                            <div className="pl-4 pr-3 pt-3 pb-0">
                                                <div className="flex items-start gap-3">
                                                    {/* Icon */}
                                                    <div className={`p-2 rounded-sm flex-shrink-0 bg-gradient-to-br ${item.gradient}`}>
                                                        <Zap className="w-3.5 h-3.5 text-white" />
                                                    </div>

                                                    {/* Details */}
                                                    <div className="flex-1 min-w-0 pr-6">
                                                        <h4 className="text-white font-semibold text-sm leading-tight truncate">
                                                            {item.name}
                                                        </h4>
                                                        <div className="flex items-center gap-2 mt-1.5">
                                                            <span className="text-gray-600 text-[11px] line-through">
                                                                {formatRupiah(item.originalPrice)}
                                                            </span>
                                                            <span className="text-[9px] px-1.5 py-0.5 rounded-sm bg-red-500/10 border border-red-500/20 text-red-400 font-mono font-bold">
                                                                -{item.discountPercent}%
                                                            </span>
                                                        </div>
                                                        <div className="text-red-400 font-bold text-sm mt-0.5">
                                                            {formatRupiah(item.discountedPrice)}
                                                            <span className="text-gray-600 font-normal text-[11px]"> /{item.period}</span>
                                                        </div>
                                                    </div>

                                                    {/* Remove */}
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="absolute top-3 right-3 p-1 rounded-sm hover:bg-red-500/10 text-gray-600 hover:text-red-400 transition-all"
                                                        aria-label="Remove item"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Quantity + subtotal row */}
                                            <div className="flex items-center justify-between px-4 py-2.5 mt-2 border-t border-white/5">
                                                <div className="flex items-center gap-0">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-7 h-7 rounded-sm bg-white/5 border border-white/10 hover:border-red-500/30 hover:bg-red-500/5 hover:text-red-400 transition-all flex items-center justify-center text-gray-400"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <motion.span
                                                        key={item.quantity}
                                                        initial={{ scale: 1.4, color: '#ef4444' }}
                                                        animate={{ scale: 1, color: '#ffffff' }}
                                                        className="w-9 text-center text-sm font-bold font-mono"
                                                    >
                                                        {item.quantity}
                                                    </motion.span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-7 h-7 rounded-sm bg-white/5 border border-white/10 hover:border-red-500/30 hover:bg-red-500/5 hover:text-red-400 transition-all flex items-center justify-center text-gray-400"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <span className="text-white font-bold text-sm font-mono">
                                                    {formatRupiah(item.discountedPrice * item.quantity)}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="border-t border-white/10 bg-[#0f172a] px-5 py-4 space-y-3">
                                {/* Savings banner */}
                                {totalSavings > 0 && (
                                    <motion.div
                                        className="flex items-center gap-2 px-3 py-2 rounded-sm bg-red-500/5 border border-red-500/20"
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <Tag className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                                        <span className="text-[11px] text-red-300 font-mono">
                                            Saving {formatRupiah(totalSavings)} on this order
                                        </span>
                                    </motion.div>
                                )}

                                {/* Total row */}
                                <div className="flex items-center justify-between py-2 border-t border-b border-white/5">
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
                                        Total ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                                    </span>
                                    <span className="text-white font-bold text-base font-mono">
                                        {formatRupiah(totalPrice)}
                                    </span>
                                </div>

                                {/* Checkout button */}
                                <Link
                                    to={Routes.IT_SERVICES_CHECKOUT}
                                    onClick={() => setIsCartOpen(false)}
                                    className="block w-full"
                                >
                                    <button className="w-full py-3 rounded-sm bg-red-500 hover:bg-red-600 text-white font-mono font-bold text-xs uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_30px_rgba(239,68,68,0.35)]">
                                        Proceed to Checkout
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </Link>

                                {/* Clear cart */}
                                <button
                                    onClick={clearCart}
                                    className="w-full py-2 rounded-sm text-gray-600 hover:text-red-400 text-[10px] font-mono uppercase tracking-widest hover:bg-red-500/5 border border-transparent hover:border-red-500/10 transition-all"
                                >
                                    Clear All Items
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
