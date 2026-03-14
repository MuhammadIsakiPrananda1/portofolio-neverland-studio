import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Shield,
  User,
  Settings,
  MessageCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  Clock,
  Book,
  Zap,
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Button from '@components/atoms/Button';
import { slideUp } from '@utils/animations';
import { Link } from 'react-router-dom';
import { Routes, COMPANY_INFO } from '@config/constants';

// Help Categories
const HELP_CATEGORIES = [
  {
    id: 'getting-started',
    icon: Zap,
    title: 'Getting Started',
    description: 'Quick guides to help you get up and running with our services.',
    articleCount: 12
  },
  {
    id: 'account',
    icon: User,
    title: 'Account & Billing',
    description: 'Manage your account, subscriptions, and payment information.',
    articleCount: 8
  },
  {
    id: 'services',
    icon: Shield,
    title: 'Security Services',
    description: 'Learn about penetration testing, audits, and security solutions.',
    articleCount: 15
  },
  {
    id: 'technical',
    icon: Settings,
    title: 'Technical Support',
    description: 'Troubleshooting guides and technical documentation.',
    articleCount: 20
  }
];

// FAQ by Help Category
const CATEGORY_FAQS: Record<string, Array<{ question: string; answer: string }>> = {
  'getting-started': [
    {
      question: "How do I get started with Neverland Studio services?",
      answer: "Getting started is easy! Contact us through our contact form or WhatsApp. Our team will schedule a free consultation to understand your needs, then provide a tailored proposal that fits your budget and timeline."
    },
    {
      question: "What should I prepare before starting a project?",
      answer: "Prepare a project brief or description, your business goals, reference examples (if any), and desired timeline. For security projects, we'll also need information about your IT infrastructure."
    },
    {
      question: "How long does it take from consultation to project kickoff?",
      answer: "Typically 3-7 business days. The process includes: initial consultation (1 day), proposal creation (2-3 days), review and approval (1-2 days), then project kickoff. For urgent projects, we can expedite this process."
    },
    {
      question: "Is there a minimum project value?",
      answer: "We serve projects of all scales, from startups to enterprises. Development projects start from $350 USD, while security audits start from $700 USD. Contact us to discuss your specific needs."
    },
    {
      question: "Can I make changes after the project starts?",
      answer: "Yes, we understand that requirements can change. Minor changes typically have no additional cost. For significant scope changes, we'll discuss the impact on timeline and budget first."
    },
    {
      question: "What is your project delivery methodology?",
      answer: "We follow Agile methodology with regular sprints and milestones. You'll receive progress updates, demo sessions, and opportunities to provide feedback throughout the development process."
    },
    {
      question: "Do you sign Non-Disclosure Agreements (NDAs)?",
      answer: "Absolutely! We respect client confidentiality and are happy to sign NDAs before project discussions. We also have standard confidentiality clauses in our service agreements."
    },
    {
      question: "What time zone does your team operate in?",
      answer: "Our main team is based in Indonesia (GMT+7), but we work with clients globally. We schedule meetings and support hours to accommodate different time zones as needed."
    },
    {
      question: "Can I visit your office for a meeting?",
      answer: "Yes! Our office is located in Malang, East Java, Indonesia. We welcome in-person meetings. We also offer virtual meetings via Zoom or Google Meet for international clients."
    },
    {
      question: "Do you offer trial or pilot projects?",
      answer: "Yes, for enterprise clients considering long-term partnerships, we can arrange a smaller pilot project to demonstrate our capabilities and establish a working relationship."
    },
    {
      question: "What industries do you specialize in?",
      answer: "We have experience across multiple industries including: fintech, e-commerce, healthcare, education, logistics, and SaaS. Our security expertise spans all sectors requiring robust cybersecurity."
    },
    {
      question: "How do you handle intellectual property rights?",
      answer: "Upon full payment, all source code, designs, and project assets become your complete property. We include IP transfer clauses in our contracts to ensure clear ownership."
    }
  ],
  'account': [
    {
      question: "How do I create an account with Neverland Studio?",
      answer: "We currently use a project-based system. Each client receives access to our project portal with unique credentials after the project agreement is signed. No prior registration is required."
    },
    {
      question: "What payment methods are available?",
      answer: "We accept bank transfers (BCA, Mandiri, BNI), e-wallets (OVO, GoPay), credit cards, PayPal, and international wire transfers. Corporate clients can also pay via Purchase Order (PO) with flexible terms."
    },
    {
      question: "What is the payment structure for projects?",
      answer: "For development projects: 30-50% down payment upfront, 30-40% upon development completion, remainder after User Acceptance Testing (UAT). For security services: 50% upfront, 50% after final report delivery. Terms are flexible for enterprise clients."
    },
    {
      question: "Are there monthly maintenance fees?",
      answer: "Maintenance is optional. We offer packages starting from $35 USD/month including: bug fixes, security updates, minor changes, and technical support. Packages can be customized to your needs."
    },
    {
      question: "What if I need to cancel a project?",
      answer: "Cancellations require 14 days notice. Refund policy based on progress: <25% progress = 50% refund; 25-50% = 25% refund; >50% = no refund. Down payments are non-refundable in all cases."
    },
    {
      question: "Do you provide official invoices and receipts?",
      answer: "Yes, we provide official invoices and receipts for all transactions. For companies requiring specific tax documentation, we can provide these according to applicable regulations."
    },
    {
      question: "Can I upgrade or downgrade my service plan?",
      answer: "Yes, for ongoing maintenance or support plans, you can upgrade or downgrade at any time. Changes take effect from the next billing cycle with prorated adjustments if applicable."
    },
    {
      question: "What currency do you accept for international payments?",
      answer: "We accept USD, EUR, and IDR. For other currencies, please contact us to arrange suitable payment options. Exchange rates are locked at the time of invoice issuance."
    }
  ],
  'services': [
    {
      question: "What cyber security services does Neverland Studio offer?",
      answer: "We provide: Penetration Testing (web, mobile, network), Security Audits, Vulnerability Assessments, Security Code Reviews, Cloud Security Assessments, Network Security, and Security Consulting. All performed by certified security professionals."
    },
    {
      question: "How long does a penetration test take?",
      answer: "Depends on scope: Small scope (1-2 applications) = 1-2 weeks; Medium scope (3-5 applications/systems) = 2-3 weeks; Large scope (enterprise) = 3-6 weeks. Includes time for reconnaissance, exploitation, and comprehensive reporting."
    },
    {
      question: "What deliverables do I receive from a security audit?",
      answer: "You'll receive: Executive Summary for management, Technical Report with detailed findings and severity ratings, Proof of Concept for each vulnerability, actionable Remediation Guidelines, and complimentary Retest to verify fixes."
    },
    {
      question: "Do your development services include UI/UX design?",
      answer: "Yes! Every development project includes: Research & Discovery, Wireframing, UI/UX Design, Prototyping, User Testing (optional), and final design implementation. Designs align with your brand identity."
    },
    {
      question: "What technologies do you use for development?",
      answer: "We use modern tech stacks: Frontend (React, Vue, Next.js), Backend (Node.js, Python, PHP), Databases (MySQL, PostgreSQL, MongoDB), Cloud (AWS, Azure, GCP), and DevOps tools for CI/CD. Stack selection is based on project requirements."
    },
    {
      question: "Is source code delivered to the client?",
      answer: "Yes, 100%. After full payment, all source code, documentation, and design assets become your complete property. We provide knowledge transfer and comprehensive technical documentation."
    },
    {
      question: "Do you offer API development and integration?",
      answer: "Yes, we specialize in RESTful and GraphQL API development, third-party API integrations (payment gateways, social media, cloud services), and custom API solutions with complete documentation."
    },
    {
      question: "Can you work with our existing technology stack?",
      answer: "Absolutely! Our team is experienced with various technologies and can adapt to your existing stack, whether for enhancements, integrations, or migrations to new platforms."
    },
    {
      question: "Do you provide mobile app development?",
      answer: "Yes, we develop native (iOS/Android) and cross-platform mobile apps (React Native, Flutter). Services include design, development, testing, deployment, and ongoing support."
    },
    {
      question: "What is your approach to cloud security?",
      answer: "We perform comprehensive cloud security assessments covering: configuration review, access management, data encryption, network security, compliance checks, and security monitoring. Supports AWS, Azure, and GCP."
    },
    {
      question: "Do you offer security awareness training?",
      answer: "Yes, we provide customized security awareness training for employees covering: phishing prevention, password security, social engineering, safe browsing, and incident reporting procedures."
    },
    {
      question: "Can you help with compliance certifications?",
      answer: "Yes, we assist with ISO 27001, SOC 2, PCI DSS, GDPR, HIPAA, and other standards. Services include gap analysis, policy development, control implementation, and audit preparation."
    },
    {
      question: "What is your penetration testing methodology?",
      answer: "We follow industry standards (OWASP, PTES, NIST) with phases: Planning & Reconnaissance, Scanning & Enumeration, Vulnerability Assessment, Exploitation, Post-Exploitation, and Reporting with remediation recommendations."
    },
    {
      question: "Do you offer bug bounty program setup?",
      answer: "Yes, we help organizations establish bug bounty programs including: scope definition, rules of engagement, reward structure, triaging process, and coordination with security researchers."
    },
    {
      question: "Can you perform social engineering assessments?",
      answer: "Yes, we conduct authorized social engineering tests including: phishing campaigns, vishing (voice phishing), physical security testing, and employee awareness assessments with detailed reporting and training recommendations."
    }
  ],
  'technical': [
    {
      question: "How do I access technical support?",
      answer: "Technical support is available via: Email (2-4 hour response), WhatsApp (1-2 hour response), Phone for urgent issues, or Project Portal for tracking. 24/7 priority support available for enterprise clients with SLA guarantees."
    },
    {
      question: "What is included in post-launch support?",
      answer: "Free 30-day post-launch support includes: bug fixes, performance monitoring, security patches, minor adjustments, deployment support, and technical consultation. Extended support available in maintenance packages."
    },
    {
      question: "What happens if there's an issue in production?",
      answer: "For critical issues: <15 minute response (enterprise) or <1 hour (standard), immediate hotfix deployment, incident analysis, and prevention plan. Non-critical issues handled per agreed priority and SLA."
    },
    {
      question: "Is technical documentation provided?",
      answer: "Yes, every project includes: Technical Documentation (architecture, API docs, database schema), User Manual for admin/users, Deployment Guide, Troubleshooting Guide, and Video Tutorials for key features."
    },
    {
      question: "How do application updates and upgrades work?",
      answer: "We provide: Regular security updates (free with maintenance), Feature updates (custom requests), Technology upgrades (additional cost), and Migration support when needed. All updates tested in staging before production."
    },
    {
      question: "Can you provide training for our internal team?",
      answer: "Yes! We offer training sessions for: End-user training, Admin training, Developer handover, Security awareness training, and Custom technical training. Available onsite or remote with customized materials."
    },
    {
      question: "What is your server and hosting recommendation?",
      answer: "We recommend cloud hosting (AWS, Azure, GCP, DigitalOcean) for scalability and reliability. We can help with server setup, optimization, security hardening, and migration from existing infrastructure."
    },
    {
      question: "Do you provide database optimization services?",
      answer: "Yes, we offer database performance tuning, query optimization, indexing strategies, schema redesign, migration services, and backup/recovery solutions for MySQL, PostgreSQL, MongoDB, and more."
    },
    {
      question: "Can you help with DevOps and CI/CD setup?",
      answer: "Absolutely! We implement comprehensive DevOps pipelines including: automated testing, continuous integration, continuous deployment, infrastructure as code, monitoring, and containerization with Docker/Kubernetes."
    },
    {
      question: "What monitoring and logging do you implement?",
      answer: "We set up comprehensive monitoring using tools like: Application Performance Monitoring (APM), Error tracking, Server monitoring, Log aggregation, Uptime monitoring, and alerting systems with dashboard access."
    },
    {
      question: "Do you offer disaster recovery planning?",
      answer: "Yes, we help design and implement disaster recovery plans including: backup strategies, recovery procedures, failover systems, data replication, and regular disaster recovery testing."
    },
    {
      question: "Can you migrate our existing application to the cloud?",
      answer: "Yes, we specialize in cloud migration services: assessment, planning, data migration, application refactoring, testing, and cutover. We minimize downtime and ensure smooth transitions."
    },
    {
      question: "What is your approach to performance optimization?",
      answer: "We perform comprehensive optimization: code profiling, database tuning, caching strategies, CDN implementation, image optimization, lazy loading, and infrastructure scaling recommendations."
    },
    {
      question: "Do you provide load testing services?",
      answer: "Yes, we conduct load and stress testing to identify bottlenecks and ensure your application can handle expected traffic. We use tools like JMeter, Gatling, and k6 with detailed reporting."
    },
    {
      question: "Can you help with legacy system modernization?",
      answer: "Absolutely! We assess legacy systems, create modernization roadmaps, refactor or rebuild applications using modern technologies, migrate data, and ensure business continuity throughout the process."
    },
    {
      question: "What backup and recovery solutions do you offer?",
      answer: "We implement automated backup solutions with versioning, encrypted storage, offsite replication, regular recovery testing, and documented recovery procedures. RPO and RTO defined per client requirements."
    },
    {
      question: "Do you offer white-label services for agencies?",
      answer: "Yes, we provide white-label development and security services for digital agencies. You maintain client relationships while we deliver the technical work under your brand with NDA protection."
    },
    {
      question: "Can you integrate with our project management tools?",
      answer: "Yes, we work with popular tools like Jira, Asana, Trello, Monday.com, and Slack. We adapt to your workflows and can provide API integrations for custom project management systems."
    },
    {
      question: "What is your code review and quality assurance process?",
      answer: "We follow strict QA processes: peer code reviews, automated testing (unit, integration, E2E), security scanning, performance testing, cross-browser testing, and UAT before any production deployment."
    },
    {
      question: "Do you provide ongoing security monitoring?",
      answer: "Yes, our Security Operations Center (SOC) offers 24/7 monitoring including: threat detection, vulnerability scanning, log analysis, incident response, and monthly security reports with actionable insights."
    }
  ]
};

// Comprehensive FAQ organized by category
const FAQS = [
  {
    category: 'Services',
    question: "What is the typical timeline for a penetration test?",
    answer: "A standard penetration test usually takes between 1-3 weeks depending on the scope and complexity of the target system. The process includes: (1) Scoping and planning (2-3 days), (2) Active testing (5-10 days), (3) Analysis and reporting (3-5 days). We work with you to establish a timeline that meets your needs."
  },
  {
    category: 'Services',
    question: "What types of penetration testing do you offer?",
    answer: "We offer several types of penetration testing: Network Penetration Testing (internal and external), Web Application Testing, Mobile Application Testing, Cloud Infrastructure Testing, Wireless Network Testing, and Social Engineering Assessments. Each can be customized to your specific requirements."
  },
  {
    category: 'Services',
    question: "How often should I conduct a security audit?",
    answer: "We recommend conducting a comprehensive security audit at least once a year. However, you should also perform audits when: deploying new applications, making significant infrastructure changes, after a security incident, or when preparing for compliance certification."
  },
  {
    category: 'Support',
    question: "Do you offer 24/7 security monitoring?",
    answer: "Yes, our Security Operations Center (SOC) provides 24/7/365 monitoring services. This includes real-time threat detection, incident response, security event analysis, and immediate notification of critical issues. Our team is always available to protect your infrastructure."
  },
  {
    category: 'Support',
    question: "What is your response time for security incidents?",
    answer: "For critical security incidents, our initial response time is within 15 minutes for enterprise clients with SOC services. For standard support requests, we respond within 2-4 business hours. Emergency support is available 24/7 for all active clients."
  },
  {
    category: 'Compliance',
    question: "What compliance standards do you support?",
    answer: "We assist with a wide range of compliance standards including ISO 27001, SOC 2 Type I/II, PCI DSS, GDPR, HIPAA, NIST Cybersecurity Framework, and industry-specific regulations. Our team provides guidance throughout the entire certification process."
  },
  {
    category: 'Compliance',
    question: "Can you help with compliance documentation?",
    answer: "Yes, we provide comprehensive compliance support including policy development, procedure documentation, control implementation guidance, gap analysis reports, and remediation roadmaps. We work alongside your team to ensure complete compliance readiness."
  },
  {
    category: 'Billing',
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, bank transfers, and purchase orders from established businesses. For enterprise contracts, we offer flexible payment terms including monthly, quarterly, or annual billing cycles."
  },
  {
    category: 'Billing',
    question: "Do you offer customized pricing for enterprise clients?",
    answer: "Yes, we provide customized pricing packages for enterprise clients based on scope, duration, and specific requirements. Contact our sales team to discuss a tailored solution that fits your budget and security needs."
  },
  {
    category: 'General',
    question: "How do I get started with your services?",
    answer: "Getting started is easy: (1) Contact us through our website or call our team, (2) Schedule a free consultation to discuss your needs, (3) Receive a customized proposal and quote, (4) Sign the agreement and schedule your engagement, (5) Our team begins work on your project."
  }
];

// Quick contact options
const QUICK_CONTACTS = [
  {
    icon: Phone,
    title: 'Call Us',
    description: COMPANY_INFO.phone,
    action: `tel:${COMPANY_INFO.phone}`,
    color: 'red'
  },
  {
    icon: Mail,
    title: 'Email Support',
    description: COMPANY_INFO.email,
    action: `mailto:${COMPANY_INFO.email}`,
    color: 'red'
  },
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Available 24/7',
    action: Routes.CONTACT,
    color: 'red'
  }
];

export default function Help() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHelpCategory, setSelectedHelpCategory] = useState<typeof HELP_CATEGORIES[0] | null>(null);
  const [modalOpenFaq, setModalOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const toggleModalFaq = (index: number) => {
    setModalOpenFaq(modalOpenFaq === index ? null : index);
  };

  const openCategoryModal = (category: typeof HELP_CATEGORIES[0]) => {
    setSelectedHelpCategory(category);
    setIsModalOpen(true);
    setModalOpenFaq(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedHelpCategory(null);
    setModalOpenFaq(null);
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Filter FAQs based on selected category
  const filteredFaqs = selectedCategory === 'All'
    ? FAQS
    : FAQS.filter(faq => faq.category === selectedCategory);

  // Get unique categories from FAQs
  const faqCategories = ['All', ...Array.from(new Set(FAQS.map(faq => faq.category)))];

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        {/* Clean Hero Section */}
        <motion.div
          className="text-center mb-20"
          variants={slideUp}
          initial="hidden"
          animate="visible"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-[#0f172a] border border-red-500/20 mb-6 w-fit">
            <HelpCircle className="w-4 h-4 text-red-500" />
            <span className="text-sm font-mono font-bold text-red-500 uppercase tracking-widest">Help Center</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-mono font-black mb-6 uppercase tracking-tighter text-white">
            How can we help you?
          </h1>

          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            Search our knowledge base or browse categories to find answers to your questions.
          </p>

          {/* Simplified Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative flex items-center bg-[#0f172a] border border-white/10 rounded-sm p-1.5 hover:border-red-500/30 transition-all duration-200">
              <Search className="w-5 h-5 text-gray-400 mx-4 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search for help articles, guides, or FAQs..."
                className="w-full bg-transparent border-none text-white font-mono text-sm placeholder-gray-500 py-3 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="primary" className="!py-2.5 !px-5 rounded-sm bg-red-500/20 text-red-500 hover:bg-red-500/30 border border-red-500/50 font-mono font-bold tracking-widest uppercase">
                Search
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Quick Contact Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {QUICK_CONTACTS.map((contact) => (
            <a
              key={contact.title}
              href={contact.action}
              className="group relative rounded-sm p-6 border border-white/10 bg-[#0B1120] hover:border-red-500/40 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex flex-col items-center text-center">
                <div className="p-3 rounded-sm bg-[#0f172a] border border-white/5 mb-4 group-hover:border-red-500/20 transition-colors">
                  <contact.icon className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-lg font-mono font-bold uppercase tracking-tight text-white mb-2 group-hover:text-red-400 transition-colors">
                  {contact.title}
                </h3>
                <p className="text-xs font-mono text-gray-400">{contact.description}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Help Categories */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Browse by Category</h2>
            <p className="text-gray-400">Find help articles organized by topic</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HELP_CATEGORIES.map((category) => (
              <div
                key={category.id}
                onClick={() => openCategoryModal(category)}
                className="relative rounded-sm p-6 border border-white/10 bg-[#0f172a] hover:border-red-500/40 transition-all duration-300 cursor-pointer group overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="inline-flex p-3 rounded-sm bg-[#0B1120] border border-white/10 mb-4 group-hover:border-red-500/30 transition-all">
                  <category.icon className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-lg font-mono font-bold uppercase tracking-tight text-white mb-2 group-hover:text-red-400 transition-colors">{category.title}</h3>
                <p className="text-xs font-mono text-gray-400 mb-4 leading-relaxed">
                  {category.description}
                </p>
                <div className="flex items-center gap-2 border-t border-white/10 pt-4 mt-auto">
                  <Book className="w-4 h-4 text-gray-500" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500">{category.articleCount} articles</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Modal */}
        <AnimatePresence>
          {isModalOpen && selectedHelpCategory && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9999]"
              />

              {/* Modal Container */}
              <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="w-full max-w-3xl max-h-[90vh] bg-[#0f172a] border border-white/10 rounded-sm shadow-2xl flex flex-col overflow-hidden pointer-events-auto"
                >
                  {/* Modal Header */}
                  <div className="relative border-b border-white/10 p-6 shrink-0 bg-[#0B1120]">
                    {/* Top Accent */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="inline-flex p-3 rounded-sm bg-[#0f172a] border border-white/5">
                          <selectedHelpCategory.icon className="w-7 h-7 text-red-500" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-mono font-bold tracking-tight uppercase text-white mb-2">
                            {selectedHelpCategory.title}
                          </h2>
                          <p className="text-gray-400 font-mono text-sm leading-relaxed">
                            {selectedHelpCategory.description}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={closeModal}
                        className="text-gray-400 hover:text-red-400 hover:bg-white/5 p-2 rounded-sm transition-all duration-200 flex-shrink-0"
                        aria-label="Close modal"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  {/* Modal Content */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar">
                    <div className="mb-4">
                      <h3 className="text-lg font-mono font-bold uppercase tracking-tight text-white mb-2 flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-red-500" />
                        Frequently Asked Questions
                      </h3>
                      <p className="text-sm font-mono text-gray-400">
                        Find answers to common questions about {selectedHelpCategory.title.toLowerCase()}
                      </p>
                    </div>

                    {CATEGORY_FAQS[selectedHelpCategory.id]?.map((faq, index) => (
                      <div
                        key={index}
                        className={`rounded-sm border transition-all duration-200 ${modalOpenFaq === index
                            ? 'bg-[#0B1120] border-red-500/30'
                            : 'bg-[#0f172a] border-white/10 hover:border-white/20'
                          }`}
                      >
                        <button
                          onClick={() => toggleModalFaq(index)}
                          className="w-full text-left p-4 flex items-start justify-between gap-4"
                        >
                          <span className={`font-semibold text-sm transition-colors flex-1 ${modalOpenFaq === index ? 'text-red-400' : 'text-white'
                            }`}>
                            {faq.question}
                          </span>
                          <div className={`p-1.5 rounded-sm flex-shrink-0 transition-colors ${modalOpenFaq === index
                              ? 'bg-red-500/20 text-red-500'
                              : 'bg-[#0B1120] border border-white/5 text-gray-400'
                            }`}>
                            {modalOpenFaq === index ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </div>
                        </button>

                        <motion.div
                          initial={false}
                          animate={{
                            height: modalOpenFaq === index ? 'auto' : 0,
                            opacity: modalOpenFaq === index ? 1 : 0
                          }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-3">
                            {faq.answer}
                          </div>
                        </motion.div>
                      </div>
                    ))}

                    {!CATEGORY_FAQS[selectedHelpCategory.id] || CATEGORY_FAQS[selectedHelpCategory.id].length === 0 ? (
                      <div className="text-center py-12 text-gray-400">
                        <HelpCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No FAQs available for this category yet.</p>
                      </div>
                    ) : null}
                  </div>

                  {/* Modal Footer */}
                  <div className="p-6 border-t border-white/5 bg-white/[0.02] shrink-0">
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <p className="text-sm text-gray-400 flex-1">
                        Can't find what you're looking for?
                      </p>
                      <Link to={Routes.CONTACT} onClick={closeModal}>
                        <Button variant="primary" size="sm">
                          Contact Support
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>

        {/* FAQ Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-400 mb-8">Find quick answers to common questions</p>

            {/* Category Filter */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {faqCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-sm text-[10px] font-mono tracking-widest uppercase font-bold transition-all duration-200 border ${selectedCategory === category
                      ? 'bg-red-500/20 text-red-500 border-red-500/50'
                      : 'bg-[#0f172a] text-gray-400 border-white/10 hover:bg-[#0B1120]'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-sm border transition-all duration-200 ${openFaq === index
                    ? 'bg-[#0B1120] border-red-500/30'
                    : 'bg-[#0f172a] border-white/10 hover:border-white/20'
                  }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-6 flex items-start justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-[10px] px-2.5 py-1 rounded-sm font-mono tracking-widest uppercase font-bold ${openFaq === index
                          ? 'bg-red-500/20 text-red-500'
                          : 'bg-[#0B1120] border border-white/5 text-gray-500'
                        }`}>
                        {faq.category}
                      </span>
                    </div>
                    <span className={`font-semibold text-base transition-colors ${openFaq === index ? 'text-red-400' : 'text-white'
                      }`}>
                      {faq.question}
                    </span>
                  </div>
                  <div className={`p-2 rounded-sm flex-shrink-0 transition-colors ${openFaq === index
                      ? 'bg-red-500/20 text-red-500'
                      : 'bg-[#0B1120] border border-white/5 text-gray-400'
                    }`}>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </button>

                <motion.div
                  initial={false}
                  animate={{ height: openFaq === index ? 'auto' : 0, opacity: openFaq === index ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No FAQs found in this category.</p>
            </div>
          )}
        </div>

        {/* Need More Help Section */}
        <motion.div
          className="rounded-sm bg-[#0f172a] border border-white/10 p-10 text-center"
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex p-4 rounded-sm bg-[#0B1120] border border-white/5 mb-6">
              <MessageCircle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-3xl font-mono font-bold uppercase tracking-tight text-white mb-4">Still need help?</h2>
            <p className="text-gray-400 mb-8">
              Can't find the answer you're looking for? Our support team is here to help you 24/7.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to={Routes.CONTACT}>
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Contact Support Team
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto" leftIcon={<Clock className="w-4 h-4" />}>
                Schedule a Call
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
