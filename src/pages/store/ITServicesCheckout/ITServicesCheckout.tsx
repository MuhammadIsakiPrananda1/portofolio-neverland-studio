import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
    ShoppingCart, ArrowLeft, Trash2, Plus, Minus, Building2,
    Send, User, Mail, Phone, MessageSquare, CheckCircle,
    Tag, Clock, Shield, AlertCircle, Zap,
} from 'lucide-react';
import Button from '@components/atoms/Button';
import AuthModal from '@components/organisms/AuthModal';
import { Routes, COMPANY_INFO } from '@config/constants';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { slideUp } from '@utils/animations';

function formatRupiah(num: number): string {
    return 'Rp ' + num.toLocaleString('id-ID');
}

const inputCls = 'w-full pl-10 pr-4 py-3 rounded-sm bg-[#0B1120] border border-white/10 text-white text-sm focus:border-red-500/40 focus:ring-1 focus:ring-red-500/10 outline-none transition-all placeholder-gray-700';

export default function ITServicesCheckoutPage() {
    const {
        items,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        totalSavings,
    } = useCart();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        notes: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const generateWhatsAppMessage = (): string => {
        let msg = `Hello Neverland Studio! 👋\n\nI would like to order the following IT services:\n\n`;
        msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;

        items.forEach((item, idx) => {
            msg += `${idx + 1}. *${item.name}*\n`;
            msg += `   Qty: ${item.quantity}x\n`;
            if (item.discountPercent > 0) {
                msg += `   Price: ~${formatRupiah(item.originalPrice)}~ → ${formatRupiah(item.discountedPrice)}\n`;
                msg += `   Discount: ${item.discountPercent}% OFF\n`;
            } else {
                msg += `   Price: ${formatRupiah(item.discountedPrice)}\n`;
            }
            msg += `   Subtotal: ${formatRupiah(item.discountedPrice * item.quantity)}\n\n`;
        });

        msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
        msg += `💰 *Total: ${formatRupiah(totalPrice)}*\n`;
        if (totalSavings > 0) {
            msg += `🎉 *Savings: ${formatRupiah(totalSavings)}*\n`;
        }
        msg += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;

        msg += `📋 *Customer Details:*\n`;
        msg += `Name: ${formData.name}\n`;
        msg += `Email: ${formData.email}\n`;
        msg += `Phone/WA: ${formData.phone}\n`;
        if (formData.company) msg += `Company: ${formData.company}\n`;
        if (formData.notes) msg += `\nNotes: ${formData.notes}\n`;

        msg += `\nPlease provide more information and next steps. Thank you! 🙏`;

        return encodeURIComponent(msg);
    };

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();

        if (items.length === 0) return;

        // Require login before checkout
        if (!isAuthenticated) {
            setShowAuthModal(true);
            return;
        }

        const whatsappNumber = COMPANY_INFO.phone.replace(/[^0-9]/g, '');
        const message = generateWhatsAppMessage();
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

        window.open(whatsappUrl, '_blank');
        setIsSubmitted(true);
    };

    const handleNewOrder = () => {
        clearCart();
        setIsSubmitted(false);
        navigate(Routes.IT_SERVICES_STORE);
    };

    // Success state
    if (isSubmitted) {
        return (
            <div className="pt-32 pb-20 min-h-screen">
                <div className="container-custom max-w-2xl">
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring' }}
                    >
                        {/* Success icon */}
                        <motion.div
                            className="inline-flex p-5 rounded-sm bg-red-500/10 border border-red-500/20 mb-8"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        >
                            <CheckCircle className="w-14 h-14 text-red-400" />
                        </motion.div>

                        <p className="text-[10px] font-mono uppercase tracking-widest text-red-400 mb-3">
                            Order Confirmed
                        </p>
                        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                            Order Submitted
                        </h1>
                        <p className="text-base text-gray-400 mb-2 max-w-lg mx-auto">
                            Your order has been sent via WhatsApp. Our team will respond within{' '}
                            <strong className="text-white">1 hour</strong>.
                        </p>
                        {totalSavings > 0 && (
                            <p className="text-sm text-red-400/80 font-mono mb-8">
                                You saved {formatRupiah(totalSavings)} on this order
                            </p>
                        )}

                        {/* Next steps */}
                        <div className="rounded-sm border border-white/10 bg-[#0f172a] p-6 mb-8 text-left">
                            <h3 className="text-white font-bold text-sm font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Clock className="w-4 h-4 text-red-400" />
                                Next Steps
                            </h3>
                            <div className="space-y-3">
                                {[
                                    'Our team will review your order',
                                    'You will receive an official proposal & quotation',
                                    'Once approved, work begins immediately',
                                    'Progress updates via dashboard & WhatsApp',
                                ].map((step, idx) => (
                                    <div key={idx} className="flex items-start gap-3 text-sm text-gray-400">
                                        <div className="w-5 h-5 rounded-sm bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-[10px] font-mono font-bold text-red-400">{idx + 1}</span>
                                        </div>
                                        <span>{step}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 justify-center">
                            <button
                                onClick={handleNewOrder}
                                className="px-6 py-3 rounded-sm bg-red-500 hover:bg-red-600 text-white font-mono font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_30px_rgba(239,68,68,0.35)]"
                            >
                                New Order
                            </button>
                            <Link to={Routes.HOME}>
                                <Button variant="outline" size="lg" className="border-white/10 hover:border-red-500/30 rounded-sm font-mono uppercase tracking-widest text-xs">
                                    Back to Home
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 min-h-screen">
            <div className="container-custom max-w-5xl">

                {/* Header */}
                <motion.div
                    className="mb-12"
                    variants={slideUp}
                    initial="hidden"
                    animate="visible"
                >
                    <Link
                        to={Routes.IT_SERVICES_STORE}
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-red-400 text-sm mb-6 transition-colors font-mono"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Store
                    </Link>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-red-400 mb-3">
                        Order Review
                    </p>
                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">
                        Checkout
                    </h1>
                    <p className="text-gray-400 text-base">
                        Review your order and submit via WhatsApp
                    </p>
                </motion.div>

                {items.length === 0 ? (
                    <motion.div
                        className="text-center py-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="w-24 h-24 rounded-sm border border-white/10 bg-[#0f172a] flex items-center justify-center mx-auto mb-6">
                            <ShoppingCart className="w-10 h-10 text-gray-600" />
                        </div>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-red-400/60 mb-2">Cart Empty</p>
                        <h2 className="text-2xl font-bold text-white mb-3">No Services Selected</h2>
                        <p className="text-gray-600 mb-8 text-sm">Please select services from the store first</p>
                        <Link to={Routes.IT_SERVICES_STORE}>
                            <Button variant="primary" size="lg">
                                Go to Store
                            </Button>
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Left: Cart Items + Form */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Cart Items */}
                            <motion.div
                                className="rounded-sm border border-white/10 bg-[#0f172a] overflow-hidden"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <div className="px-5 py-4 border-b border-white/10 bg-[#0B1120] flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-1.5 bg-red-500/10 border border-red-500/20 rounded-sm">
                                            <ShoppingCart className="w-4 h-4 text-red-400" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-mono uppercase tracking-widest text-red-400">
                                                Selected Services
                                            </p>
                                            <h2 className="text-sm font-bold text-white">
                                                {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
                                            </h2>
                                        </div>
                                    </div>
                                </div>

                                <div className="divide-y divide-white/5">
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            className="relative p-5 flex items-start gap-4 hover:bg-white/[0.01] transition-colors"
                                        >
                                            {/* Left accent */}
                                            <div className="absolute left-0 top-0 w-0.5 h-full bg-red-500/15" />

                                            <div className={`p-2.5 rounded-sm flex-shrink-0 bg-gradient-to-br ${item.gradient}`}>
                                                <Zap className="w-4 h-4 text-white" />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-white font-semibold text-sm">{item.name}</h4>
                                                <p className="text-gray-600 text-xs mt-0.5 leading-relaxed">{item.description}</p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    {item.discountPercent > 0 && (
                                                        <span className="text-gray-600 text-[11px] line-through">
                                                            {formatRupiah(item.originalPrice)}
                                                        </span>
                                                    )}
                                                    <span className="text-red-400 font-bold text-sm">
                                                        {formatRupiah(item.discountedPrice)}
                                                    </span>
                                                    {item.discountPercent > 0 && (
                                                        <span className="text-[9px] px-1.5 py-0.5 rounded-sm bg-red-500/10 border border-red-500/20 text-red-400 font-mono font-bold">
                                                            -{item.discountPercent}%
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Quantity */}
                                            <div className="flex items-center gap-1 flex-shrink-0">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-7 h-7 rounded-sm bg-white/5 border border-white/10 hover:border-red-500/30 hover:bg-red-500/5 hover:text-red-400 transition-all flex items-center justify-center text-gray-400"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="w-8 text-center text-white font-bold font-mono text-sm">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-7 h-7 rounded-sm bg-white/5 border border-white/10 hover:border-red-500/30 hover:bg-red-500/5 hover:text-red-400 transition-all flex items-center justify-center text-gray-400"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>

                                            {/* Subtotal + remove */}
                                            <div className="text-right flex-shrink-0">
                                                <div className="text-white font-bold font-mono text-sm">
                                                    {formatRupiah(item.discountedPrice * item.quantity)}
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-[11px] text-gray-600 hover:text-red-400 transition-colors mt-1.5 flex items-center gap-1 ml-auto"
                                                >
                                                    <Trash2 className="w-3 h-3" /> Remove
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Customer Form */}
                            <motion.form
                                onSubmit={handleCheckout}
                                id="checkout-form"
                                className="rounded-sm border border-white/10 bg-[#0f172a] overflow-hidden"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <div className="px-5 py-4 border-b border-white/10 bg-[#0B1120] flex items-center gap-3">
                                    <div className="p-1.5 bg-red-500/10 border border-red-500/20 rounded-sm">
                                        <User className="w-4 h-4 text-red-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-mono uppercase tracking-widest text-red-400">
                                            Contact Info
                                        </p>
                                        <h2 className="text-sm font-bold text-white">Customer Details</h2>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-2">
                                                Full Name *
                                            </label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    required
                                                    className={inputCls}
                                                    placeholder="Muhammad Isaki"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-2">
                                                Email *
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                    className={inputCls}
                                                    placeholder="email@example.com"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-2">
                                                Phone / WhatsApp *
                                            </label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    required
                                                    className={inputCls}
                                                    placeholder="08123456789"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-2">
                                                Company (optional)
                                            </label>
                                            <div className="relative">
                                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                                <input
                                                    type="text"
                                                    name="company"
                                                    value={formData.company}
                                                    onChange={handleInputChange}
                                                    className={inputCls}
                                                    placeholder="PT Neverland Studio"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-2">
                                            Additional Notes (optional)
                                        </label>
                                        <div className="relative">
                                            <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-gray-600" />
                                            <textarea
                                                name="notes"
                                                value={formData.notes}
                                                onChange={handleInputChange}
                                                rows={3}
                                                className={`${inputCls} resize-none`}
                                                placeholder="Additional details about your project requirements..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.form>
                        </div>

                        {/* Right: Order Summary */}
                        <div className="lg:col-span-1">
                            <motion.div
                                className="rounded-sm border border-white/10 bg-[#0f172a] overflow-hidden sticky top-24"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                {/* Summary header */}
                                <div className="px-5 py-4 border-b border-white/10 bg-[#0B1120] flex items-center gap-3">
                                    <div className="p-1.5 bg-red-500/10 border border-red-500/20 rounded-sm">
                                        <Tag className="w-4 h-4 text-red-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-mono uppercase tracking-widest text-red-400">
                                            Summary
                                        </p>
                                        <h2 className="text-sm font-bold text-white">Order Summary</h2>
                                    </div>
                                </div>

                                <div className="p-5 space-y-4">
                                    {/* Item list */}
                                    <div className="space-y-2.5">
                                        {items.map((item) => (
                                            <div key={item.id} className="flex items-start justify-between text-sm gap-2">
                                                <span className="text-gray-500 text-xs leading-relaxed flex-1">
                                                    {item.name}
                                                    <span className="text-gray-700"> × {item.quantity}</span>
                                                </span>
                                                <span className="text-white font-mono font-medium text-xs flex-shrink-0">
                                                    {formatRupiah(item.discountedPrice * item.quantity)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Totals */}
                                    <div className="border-t border-white/10 pt-4 space-y-2">
                                        {totalSavings > 0 && (
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-red-400 font-mono flex items-center gap-1">
                                                    <Tag className="w-3 h-3" /> Savings
                                                </span>
                                                <span className="text-red-400 font-bold font-mono">-{formatRupiah(totalSavings)}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Total</span>
                                            <span className="text-white font-extrabold text-xl font-mono">
                                                {formatRupiah(totalPrice)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Security note */}
                                    <div className="p-3 rounded-sm bg-red-500/5 border border-red-500/10">
                                        <div className="flex items-start gap-2 text-xs text-red-400/70">
                                            <Shield className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                                            <span>Payment and project details will be agreed via WhatsApp before any work begins.</span>
                                        </div>
                                    </div>

                                    {/* Submit button */}
                                    <button
                                        type="submit"
                                        form="checkout-form"
                                        className="w-full py-3.5 rounded-sm bg-red-500 hover:bg-red-600 text-white font-mono font-bold text-xs uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_30px_rgba(239,68,68,0.35)]"
                                    >
                                        <Send className="w-4 h-4" />
                                        Submit via WhatsApp
                                    </button>

                                    <p className="text-center text-[10px] text-gray-700 flex items-center justify-center gap-1 font-mono">
                                        <AlertCircle className="w-3 h-3" />
                                        Sent to Neverland Studio's WhatsApp
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                    </div>
                )}
            </div>

            {/* Auth Modal */}
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
            />
        </div>
    );
}
