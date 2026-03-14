// AI Chat Question Templates Configuration

export interface QuestionTemplate {
  id: number;
  text: string;
  response: string;
}

export const CHAT_TEMPLATES: QuestionTemplate[] = [
  {
    id: 1,
    text: "What services does Neverland Studio offer?",
    response: "Neverland Studio provides various professional IT services:\n\n🔒 Cyber Security - Penetration Testing, Security Audit, Network & Cloud Security\n💻 Web Development - Modern Websites, Web Applications, E-commerce\n☁️ Cloud Solutions - Cloud Infrastructure, Migration, Management\n🎯 IT Consulting - Technology Consultation, Digital Transformation\n🛠️ IT Infrastructure - Server Setup, Network Design, Maintenance\n\nWe are ready to help your business with the best technology solutions!"
  },
  {
    id: 2,
    text: "How to contact Neverland Studio?",
    response: "You can contact us through:\n\n📧 Email: Arlianto032@gmail.com\n📱 WhatsApp: +6281252254886\n🌐 Website: www.neverlandstudio.com\n📍 Location: Jl. Ki Ageng Gribig No.28, Madyopuro, Kec. Kedungkandang, Kota Malang, Jawa Timur 65139\n\nOur team is ready to serve you 24/7. Please contact us for a free consultation!"
  },
  {
    id: 3,
    text: "How long does project completion take?",
    response: "Project completion time varies depending on complexity:\n\n⚡ Landing Page Website: 1-2 weeks\n🌐 Company Profile Website: 2-4 weeks\n🛒 E-commerce: 4-8 weeks\n🔒 Security Audit: 1-2 weeks\n☁️ Cloud Migration: 2-6 weeks\n\nEach project will receive a detailed timeline after initial consultation. We ensure on-time delivery with the best quality!"
  },
  {
    id: 4,
    text: "Do you provide cyber security services?",
    response: "Yes! We provide comprehensive Cyber Security services:\n\n🔍 Penetration Testing - Identifying system security vulnerabilities\n📋 Security Audit - Comprehensive IT security evaluation\n🛡️ Network Security - Network protection from threats\n☁️ Cloud Security - Cloud infrastructure security\n🔐 Security Consultation - Security strategy consultation\n\nOur certified security experts team is ready to protect your digital assets!"
  },
  {
    id: 5,
    text: "How to request a quotation?",
    response: "Very easy! Follow these steps:\n\n1️⃣ Contact us via email/WhatsApp\n2️⃣ Explain your project requirements\n3️⃣ Our team will analyze & consult\n4️⃣ We send proposal & price quotation\n5️⃣ Discussion & finalize scope of work\n6️⃣ Project kickoff!\n\n💡 Initial consultation is FREE! We will help you find the best solution for your needs."
  }
];

export const WELCOME_MESSAGE = '👋 Hello! Welcome to Neverland Studio!\n\nPlease select a question below for more information:';

export const CHAT_CONFIG = {
  TEMPLATE_DISPLAY_DELAY: 2000,
  AUTO_SCROLL_BEHAVIOR: 'smooth' as ScrollBehavior,
} as const;
