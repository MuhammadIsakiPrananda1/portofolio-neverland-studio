import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Github, Mail, Phone, MapPin } from 'lucide-react';
import Logo from '@components/atoms/Logo';
import PolicyModal from '@components/organisms/PolicyModal';
import { Routes, COMPANY_INFO, SOCIAL_LINKS } from '@config/constants';

const footerLinks = {
  company: [
    { label: 'About Us', path: Routes.ABOUT },
    { label: 'Projects', path: Routes.PROJECTS },
    { label: 'Values & Culture', path: Routes.VALUES_CULTURE },
    { label: 'Corporate Social Responsibility', path: Routes.CSR },
    { label: 'Partner Program', path: Routes.PARTNER_PROGRAM },
  ],
  services: [
    { label: 'Penetration Testing', path: '/services/penetration-testing' },
    { label: 'Security Audit', path: '/services/security-audit' },
    { label: 'Network Security', path: '/services/network-security' },
    { label: 'Cloud Monitoring', path: '/services/cloud-security' },
  ],
  support: [
    { label: 'Contact Us', path: Routes.CONTACT },
    { label: 'Help Center', path: Routes.CONTACT },
    { label: 'Privacy Policy', path: '/' },
    { label: 'Terms of Service', path: '/' },
  ],
};

export default function Footer() {
  const [policyConfig, setPolicyConfig] = useState<{ isOpen: boolean; type: 'privacy' | 'terms' | null }>({
    isOpen: false,
    type: null,
  });

  return (
    <footer className="relative bg-[#0B1120] border-t border-white/5 font-sans">
      {/* Main Footer Content */}
      <div className="container-custom py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Company Info - Takes more space */}
          <div className="lg:col-span-4">
            <Logo size="lg" clickable={false} />
            <p className="mt-6 text-gray-400 leading-relaxed text-sm">
              {COMPANY_INFO.description}
            </p>

            {/* Contact Info */}
            <div className="mt-8 space-y-4">
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-3 text-gray-400 hover:text-red-400 transition-colors duration-200 group"
              >
                <div className="p-2 rounded-sm bg-[#0f172a] border border-white/5 group-hover:border-red-500/30 transition-colors duration-200">
                  <Mail className="w-4 h-4 text-red-500" />
                </div>
                <span className="text-sm font-medium">{COMPANY_INFO.email}</span>
              </a>

              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-center gap-3 text-gray-400 hover:text-red-400 transition-colors duration-200 group"
              >
                <div className="p-2 rounded-sm bg-[#0f172a] border border-white/5 group-hover:border-red-500/30 transition-colors duration-200">
                  <Phone className="w-4 h-4 text-red-500" />
                </div>
                <span className="text-sm font-medium">{COMPANY_INFO.phone}</span>
              </a>

              <div className="flex items-start gap-3 text-gray-400">
                <div className="p-2 rounded-sm bg-[#0f172a] border border-white/5">
                  <MapPin className="w-4 h-4 text-red-500" />
                </div>
                <span className="text-sm pt-2 font-medium">{COMPANY_INFO.address}</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-mono font-bold text-sm uppercase tracking-widest mb-6">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-red-400 transition-colors duration-200 text-sm inline-flex items-center group font-medium"
                  >
                    <span className="w-0 h-px bg-red-500 group-hover:w-4 transition-all duration-200 mr-0 group-hover:mr-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-mono font-bold text-sm uppercase tracking-widest mb-6">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-red-400 transition-colors duration-200 text-sm inline-flex items-center group font-medium"
                  >
                    <span className="w-0 h-px bg-red-500 group-hover:w-4 transition-all duration-200 mr-0 group-hover:mr-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-mono font-bold text-sm uppercase tracking-widest mb-6">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => {
                const isPolicy = link.label === 'Privacy Policy' || link.label === 'Terms of Service';
                const policyType = link.label === 'Privacy Policy' ? 'privacy' : 'terms';

                return (
                  <li key={index}>
                    {isPolicy ? (
                      <button
                        onClick={() => setPolicyConfig({ isOpen: true, type: policyType })}
                        className="text-gray-400 hover:text-red-400 transition-colors duration-200 text-sm inline-flex items-center group cursor-pointer font-medium"
                      >
                        <span className="w-0 h-px bg-red-500 group-hover:w-4 transition-all duration-200 mr-0 group-hover:mr-2" />
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        to={link.path}
                        className="text-gray-400 hover:text-red-400 transition-colors duration-200 text-sm inline-flex items-center group font-medium"
                      >
                        <span className="w-0 h-px bg-red-500 group-hover:w-4 transition-all duration-200 mr-0 group-hover:mr-2" />
                        {link.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-[#0f172a]">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <p className="text-gray-500 text-sm order-2 md:order-1">
              © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 order-1 md:order-2">
              <span className="text-xs font-mono text-gray-500 mr-2 uppercase tracking-wide">Follow Us:</span>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our LinkedIn page"
                className="p-2.5 rounded-sm bg-[#0B1120] hover:bg-red-500/10 border border-white/5 hover:border-red-500/30 transition-all duration-200 group"
              >
                <Linkedin className="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-colors duration-200" />
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Twitter page"
                className="p-2.5 rounded-sm bg-[#0B1120] hover:bg-red-500/10 border border-white/5 hover:border-red-500/30 transition-all duration-200 group"
              >
                <Twitter className="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-colors duration-200" />
              </a>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our GitHub page"
                className="p-2.5 rounded-sm bg-[#0B1120] hover:bg-red-500/10 border border-white/5 hover:border-red-500/30 transition-all duration-200 group"
              >
                <Github className="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-colors duration-200" />
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Facebook page"
                className="p-2.5 rounded-sm bg-[#0B1120] hover:bg-red-500/10 border border-white/5 hover:border-red-500/30 transition-all duration-200 group"
              >
                <Facebook className="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-colors duration-200" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Policy Modal */}
      <PolicyModal
        isOpen={policyConfig.isOpen}
        type={policyConfig.type}
        onClose={() => setPolicyConfig({ ...policyConfig, isOpen: false })}
      />
    </footer>
  );
}
