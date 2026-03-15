import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, Globe } from 'lucide-react';
import ContactForm from '@components/organisms/ContactForm';
import { COMPANY_INFO } from '@config/constants';
import { slideUp, staggerContainer, staggerItem } from '@utils/animations';

export default function Contact() {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      value: COMPANY_INFO.email,
      link: `mailto:${COMPANY_INFO.email}`,
      color: 'blue',
      desc: 'For general inquiries and support'
    },
    {
      icon: Phone,
      title: 'Call Us',
      value: COMPANY_INFO.phone,
      link: `tel:${COMPANY_INFO.phone}`,
      color: 'emerald',
      desc: 'Mon-Fri from 9am to 6pm'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      value: COMPANY_INFO.address,
      link: '#',
      color: 'red',
      desc: 'Come say hello at our HQ'
    }
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        {/* Hero Section - Modern */}
        <motion.div
          className="text-center mb-20 md:mb-28"
          variants={slideUp}
          initial="hidden"
          animate="visible"
        >
          {/* Icon Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-red-500/25 bg-red-500/10 mb-8 backdrop-blur-sm">
            <MessageSquare className="w-4 h-4 text-red-500" />
            <span className="text-xs font-mono font-bold text-red-400 tracking-widest uppercase">Contact Us</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tight">
            <span className="text-white">Let's Start a </span>
            <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.2)]">
              Conversation
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Ready to strengthen your security posture? Our experts are standing by to help you 
            navigate the complex landscape of cyber security.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column: Contact Info */}
          <motion.div
            className="lg:col-span-1 space-y-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {contactInfo.map((item, idx) => (
              <motion.a
                key={idx}
                href={item.link}
                className="block p-6 rounded-sm border border-white/5 bg-[#0f172a] hover:bg-[#0B1120] hover:border-red-500/30 transition-all duration-300 group shadow-lg relative overflow-hidden"
                variants={staggerItem}
                whileHover={{ x: 4 }}
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500/20 group-hover:bg-red-500 transition-colors" />
                <div className="flex items-start gap-4 pl-2">
                  <div className="p-3 rounded-sm bg-[#0B1120] border border-white/10 group-hover:border-red-500/30 group-hover:bg-red-500/10 transition-all duration-300">
                    <item.icon className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tight text-white mb-1 group-hover:text-red-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-300 font-bold mb-1 font-mono">{item.value}</p>
                    <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                  </div>
                </div>
              </motion.a>
            ))}

            {/* Global Reach Card */}
            <motion.div 
              className="p-6 rounded-sm border border-red-500/20 bg-red-500/5 relative overflow-hidden"
              variants={staggerItem}
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-5 h-5 text-red-500" />
                <h3 className="font-black uppercase tracking-tight text-white">Global Reach</h3>
              </div>
              <p className="text-sm text-slate-400 font-medium mb-4">
                We work with clients worldwide. Our team is distributed across multiple time zones to ensure 24/7 coverage.
              </p>
              <div className="flex items-center gap-2 text-xs font-bold font-mono text-red-400 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-sm bg-red-500 animate-pulse" />
                Operational Now
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            className="lg:col-span-2"
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Form Grid Background */}
              <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: 'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
              
              <div className="relative z-10 space-y-8">
                <div className="p-8 rounded-sm border border-white/10 bg-[#0f172a] shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
                    <ContactForm />
                </div>

                {/* Map Section */}
                <div className="space-y-4">
                  <div className="rounded-sm overflow-hidden border border-white/10 bg-[#0f172a] h-[300px] relative shadow-lg p-1">
                    <iframe 
                      src="https://maps.google.com/maps?q=SMK+Negeri+6+Kota+Malang&t=&z=17&ie=UTF8&iwloc=&output=embed"
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="SMKN 6 Malang Map"
                      className="rounded-sm grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  
                  {/* Map Label */}
                  <div className="p-4 rounded-sm border border-white/5 bg-[#0f172a] flex items-center gap-3">
                    <div className="p-2 rounded-sm bg-[#0B1120] border border-white/10">
                      <MapPin className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <h4 className="font-black uppercase tracking-tight text-white text-sm">SMK Negeri 6 Kota Malang</h4>
                      <p className="text-xs text-slate-400 font-medium">Jl. Ki Ageng Gribig No.28, Madyopuro, Kec. Kedungkandang, Kota Malang, Jawa Timur 65139</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>


      </div>
    </div>
  );
}
