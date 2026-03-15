import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, FileText } from 'lucide-react';
import { COMPANY_INFO } from '@config/constants';

type PolicyType = 'privacy' | 'terms' | null;

interface PolicyModalProps {
    isOpen: boolean;
    type: PolicyType;
    onClose: () => void;
}

export default function PolicyModal({ isOpen, type, onClose }: PolicyModalProps) {
    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [isOpen]);

    if (!isOpen || !type) return null;

    const isPrivacy = type === 'privacy';
    const Icon = isPrivacy ? Shield : FileText;
    const title = isPrivacy ? 'Privacy Policy' : 'Terms of Service';

    const lastUpdated = 'October 15, 2023';

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                {/* Backdrop */}
                <motion.div
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                />

                {/* Modal */}
                <motion.div
                    className="relative w-full max-w-2xl max-h-[90vh] flex flex-col z-10 mx-auto"
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                >
                    <div className="relative rounded-sm overflow-hidden border border-white/10 shadow-2xl bg-[#0f172a] flex flex-col h-full font-sans">
                        {/* Header */}
                        <div className="relative p-6 border-b border-white/10 bg-[#0B1120] shrink-0">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-red-500/50" />

                            <div className="flex items-center gap-4 pr-10">
                                <div className={`p-3 rounded-sm border bg-red-500/10 border-red-500/20`}>
                                    <Icon className="w-6 h-6 text-red-500" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-white font-mono uppercase tracking-tight">{title}</h2>
                                    <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mt-1">Last Updated: {lastUpdated}</p>
                                </div>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                aria-label="Close modal"
                                className="absolute top-6 right-6 p-2 rounded-sm bg-white/5 border border-white/5 text-gray-400 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10 transition-all duration-200"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content Body - Scrollable */}
                        <div className="p-6 md:p-8 overflow-y-auto scrollbar-hide flex-1">
                            <div className="prose prose-invert max-w-none text-gray-300 text-sm md:text-base">
                                {isPrivacy ? (
                                    <div className="space-y-6">
                                        <p>
                                            At <strong>{COMPANY_INFO.name}</strong>, accessible via our various platforms and consulting services,
                                            one of our main priorities is the privacy of our visitors and clients. This Privacy Policy document
                                            contains types of information that is collected and recorded by {COMPANY_INFO.name} and how we use it.
                                        </p>

                                        <div>
                                            <h3 className="text-white font-semibold text-lg mb-2">1. Information We Collect</h3>
                                            <p>
                                                The personal information that you are asked to provide, and the reasons why you are asked to provide it,
                                                will be made clear to you at the point we ask you to provide your personal information.
                                            </p>
                                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                                <li>Contact information (email address, phone number)</li>
                                                <li>Account credentials</li>
                                                <li>Usage data and technical system logs</li>
                                                <li>Project requirements and sensitive infrastructure details (under NDA)</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="text-white font-semibold text-lg mb-2">2. How We Use Your Information</h3>
                                            <p>We use the information we collect in various ways, including to:</p>
                                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                                <li>Provide, operate, and maintain our services</li>
                                                <li>Improve, personalize, and expand our services</li>
                                                <li>Understand and analyze how you use our services</li>
                                                <li>Develop new products, services, features, and functionality</li>
                                                <li>Communicate with you, either directly or through one of our partners</li>
                                                <li>Find and prevent fraud and security incidents</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="text-white font-semibold text-lg mb-2">3. Data Security</h3>
                                            <p>
                                                As a cybersecurity company, {COMPANY_INFO.name} takes the protection of your data very seriously.
                                                We implement industry-standard security measures, including end-to-end encryption, strict access
                                                controls, and regular security audits to protect against unauthorized access, alteration, disclosure,
                                                or destruction of your personal information, username, password, transaction information, and data stored on our platform.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-white font-semibold text-lg mb-2">4. Your Data Protection Rights</h3>
                                            <p>
                                                Every user is entitled to the following:
                                            </p>
                                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                                <li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li>
                                                <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li>
                                                <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
                                            </ul>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <p>
                                            Welcome to <strong>{COMPANY_INFO.name}</strong>. By accessing this website or engaging our services,
                                            you agree to be bound by these Terms of Service. If you disagree with any part of these terms,
                                            you may not access our services.
                                        </p>

                                        <div>
                                            <h3 className="text-white font-semibold text-lg mb-2">1. Scope of Services</h3>
                                            <p>
                                                {COMPANY_INFO.name} provides cybersecurity consulting, penetration testing, IT infrastructure management,
                                                and related digital services. The specific scope and deliverables of any project will be outlined
                                                in a mutually agreed-upon Statement of Work (SOW) or engagement letter.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-white font-semibold text-lg mb-2">2. Client Responsibilities</h3>
                                            <p>
                                                When receiving security services, notably penetration testing or vulnerability assessments, you must:
                                            </p>
                                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                                <li>Ensure you have explicit authorization for us to test the target systems</li>
                                                <li>Provide accurate configuration information as requested</li>
                                                <li>Acknowledge that security testing carries inherent risks to system stability</li>
                                                <li>Not use our reports to perform malicious acts against third parties</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="text-white font-semibold text-lg mb-2">3. Confidentiality (NDA)</h3>
                                            <p>
                                                Both parties agree to maintain strict confidentiality regarding all proprietary information,
                                                trade secrets, system architectures, vulnerabilities discovered, and source code accessed during
                                                the course of our engagement. A formal Non-Disclosure Agreement (NDA) is typically executed prior
                                                to any core consulting work.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-white font-semibold text-lg mb-2">4. Intellectual Property</h3>
                                            <p>
                                                Unless otherwise specified in a custom agreement, {COMPANY_INFO.name} retains intellectual property
                                                rights over our proprietary methodologies, scripts, and software tools. Clients retain full ownership
                                                of their systems and the specific confidential reports generated specifically for them.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-white font-semibold text-lg mb-2">5. Limitation of Liability</h3>
                                            <p>
                                                While we strive for excellence and adhere to industry best practices, cybersecurity is a constantly
                                                evolving field. {COMPANY_INFO.name} cannot guarantee that systems will be 100% secure after our services,
                                                and we shall not be held liable for indirect, incidental, special, consequential, or punitive damages
                                                resulting from future security breaches.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-white/10 bg-[#0B1120] shrink-0 text-center">
                            <button
                                onClick={onClose}
                                className="px-6 py-2.5 rounded-sm bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 text-white font-mono text-sm uppercase tracking-widest transition-colors"
                            >
                                Close Document
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
