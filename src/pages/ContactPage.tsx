import React, { useState } from 'react';
import { Mail, Github, Linkedin, Send, Download, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import resumePdf from '../assets/resume.pdf';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Hardcoded fallback for defense reliability
      const ACCESS_KEY = "3aff745f-75ea-44b8-bd29-f8f15600113f";

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          subject: `Portfolio Inquiry: ${formData.subject}`,
          message: formData.message,
          from_name: "Portfolio Form",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        console.error("Web3Forms error:", result);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail />,
      label: 'Email',
      value: 'josh.dizon.aguiluz25@gmail.com',
      link: 'https://mail.google.com/mail/?view=cm&fs=1&to=josh.dizon.aguiluz25@gmail.com'
    },
    {
      icon: <Linkedin />,
      label: 'LinkedIn',
      value: 'Josh Andrei Aguiluz',
      link: 'https://www.linkedin.com/in/josh-aguiluz-0a150a350/'
    },
    {
      icon: <Github />,
      label: 'GitHub',
      value: '@Josh-Aguiluz',
      link: 'https://github.com/Josh-Aguiluz'
    }
  ];

  return (
    <>
      <style>{`
        .dark input::placeholder,
        .dark textarea::placeholder {
          color: rgba(226, 232, 240, 0.5) !important;
          opacity: 1 !important;
        }
      `}</style>
      <section className="min-h-screen py-20 md:py-32 graph-paper-bg relative overflow-hidden bg-[#FDF5E7] dark:bg-[#1A1715]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="text-center mb-12 md:mb-20">
            <div className="inline-block px-8 md:px-10 py-3 md:py-4 bg-[#A47A2D] dark:bg-[#A47A2D] rounded-full mb-6 md:mb-8">
              <p className="font-mono text-[16px] md:text-[24px] font-bold text-white dark:text-[#1A1715] uppercase tracking-wider">
              // Contact
              </p>
            </div>
            <h1 style={{ fontFamily: 'Michroma, sans-serif' }} className="text-4xl sm:text-6xl lg:text-7xl leading-tight font-black text-[#521D07] dark:text-[#E2E8F0] uppercase mb-8">
              Get In Touch
            </h1>
            <p className="text-lg md:text-[28px] font-bold text-[#521D07] dark:text-[#B8B0A6] max-w-3xl mx-auto">
              Have a project in mind or just want to say hi? I'm always open to discussing new opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Info */}
            <div className="space-y-6 md:space-y-8">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className="sticker-card bg-white dark:bg-[#252220] p-6 md:p-8 flex items-center gap-6 border-4 border-[#A47A2D] dark:border-[#A47A2D] hover:scale-105 transition-transform"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-[#F5EBD9] dark:bg-[#1A1715] rounded-full flex items-center justify-center border-2 border-[#A47A2D] dark:border-[#A47A2D]">
                    <div className="text-[#521D07] dark:text-[#E2E8F0]">
                      {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
                    </div>
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'Michroma, sans-serif' }} className="text-[18px] md:text-[24px] font-black text-[#521D07] dark:text-[#E2E8F0] uppercase mb-1">
                      {item.label}
                    </h4>
                    <p className="font-mono text-[14px] md:text-[18px] font-bold text-[#A47A2D] dark:text-[#A47A2D] break-all">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}

              {/* Social Links */}
              <div className="sticker-card bg-[#521D07] dark:bg-[#E2E8F0] p-6 md:p-8 border-4 border-[#A47A2D] dark:border-[#A47A2D]">
                <h4 style={{ fontFamily: 'Michroma, sans-serif' }} className="text-[20px] md:text-[24px] font-black text-white dark:text-[#1A1715] uppercase mb-6 text-center">
                  Connect With Me
                </h4>
                <div className="flex justify-center gap-4 md:gap-6">
                  {[
                    { icon: <Github />, link: 'https://github.com/Josh-Aguiluz', label: "GitHub Profile" },
                    { icon: <Linkedin />, link: 'https://www.linkedin.com/in/josh-aguiluz-0a150a350/', label: "LinkedIn Profile" },
                    { icon: <Mail />, link: 'https://mail.google.com/mail/?view=cm&fs=1&to=josh.dizon.aguiluz25@gmail.com', label: "Send Email" },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      aria-label={social.label}
                      className="p-3 md:p-4 bg-white dark:bg-[#1A1715] rounded-full hover:bg-[#FFA51F] dark:hover:bg-[#FFA51F] transition-colors group"
                    >
                      <div className="w-5 h-5 md:w-6 md:h-6 text-[#521D07] dark:text-[#E2E8F0] group-hover:text-white transition-colors">
                        {React.cloneElement(social.icon as React.ReactElement, { className: "w-full h-full" })}
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Download Resume */}
              <a
                href={resumePdf}
                download="Josh_Aguiluz_Resume.pdf"
                className="sticker-card bg-[#A47A2D] dark:bg-[#D4AF37] p-6 md:p-8 flex items-center justify-center gap-4 border-4 border-[#521D07] dark:border-[#1A1715] hover:scale-105 hover:bg-[#FFA51F] dark:hover:bg-[#F2C94C] transition-all group cursor-pointer"
              >
                <Download className="w-8 h-8 text-white dark:text-[#1A1715] group-hover:-translate-y-1 transition-transform" />
                <h4 style={{ fontFamily: 'Michroma, sans-serif' }} className="text-[20px] md:text-[24px] font-black text-white dark:text-[#1A1715] uppercase">
                  Download Resume
                </h4>
              </a>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="sticker-card bg-white dark:bg-[#252220] p-6 md:p-10 border-4 border-[#A47A2D] dark:border-[#A47A2D]">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" style={{ fontFamily: 'Michroma, sans-serif' }} className="block text-[16px] md:text-[20px] font-black text-[#521D07] dark:text-[#E2E8F0] uppercase mb-3 tracking-wide">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 md:px-6 md:py-4 text-[16px] md:text-[20px] font-bold bg-white dark:bg-[#252220] text-[#521D07] dark:text-[#E2E8F0] border-2 border-[#A47A2D] dark:border-[#A47A2D] rounded-[16px] md:rounded-[20px] focus:outline-none focus:border-[#FFA51F] dark:focus:border-[#FFA51F] transition-colors placeholder:text-[#521D07]/40 dark:placeholder:text-[#E2E8F0]/40"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" style={{ fontFamily: 'Michroma, sans-serif' }} className="block text-[16px] md:text-[20px] font-black text-[#521D07] dark:text-[#E2E8F0] uppercase mb-3 tracking-wide">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 md:px-6 md:py-4 text-[16px] md:text-[20px] font-bold bg-white dark:bg-[#252220] text-[#521D07] dark:text-[#E2E8F0] border-2 border-[#A47A2D] dark:border-[#A47A2D] rounded-[16px] md:rounded-[20px] focus:outline-none focus:border-[#FFA51F] dark:focus:border-[#FFA51F] transition-colors placeholder:text-[#521D07]/40 dark:placeholder:text-[#E2E8F0]/40"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" style={{ fontFamily: 'Michroma, sans-serif' }} className="block text-[16px] md:text-[20px] font-black text-[#521D07] dark:text-[#E2E8F0] uppercase mb-3 tracking-wide">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 md:px-6 md:py-4 text-[16px] md:text-[20px] font-bold bg-white dark:bg-[#252220] text-[#521D07] dark:text-[#E2E8F0] border-2 border-[#A47A2D] dark:border-[#A47A2D] rounded-[16px] md:rounded-[20px] focus:outline-none focus:border-[#FFA51F] dark:focus:border-[#FFA51F] transition-colors placeholder:text-[#521D07]/40 dark:placeholder:text-[#E2E8F0]/40"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" style={{ fontFamily: 'Michroma, sans-serif' }} className="block text-[16px] md:text-[20px] font-black text-[#521D07] dark:text-[#E2E8F0] uppercase mb-3 tracking-wide">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 md:px-6 md:py-4 text-[16px] md:text-[20px] font-bold bg-white dark:bg-[#252220] text-[#521D07] dark:text-[#E2E8F0] border-2 border-[#A47A2D] dark:border-[#A47A2D] rounded-[16px] md:rounded-[20px] focus:outline-none focus:border-[#FFA51F] dark:focus:border-[#FFA51F] resize-none transition-colors placeholder:text-[#521D07]/40 dark:placeholder:text-[#E2E8F0]/40"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 md:px-8 md:py-4 bg-[#521D07] dark:bg-[#E2E8F0] text-white dark:text-[#1A1715] text-[18px] md:text-[24px] font-black uppercase tracking-wider rounded-[16px] md:rounded-[20px] hover:bg-[#FFA51F] dark:hover:bg-[#FFA51F] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_0px_#A47A2D] active:translate-y-1 active:shadow-none"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message <Send className="w-5 h-5 md:w-6 md:h-6" />
                    </>
                  )}
                </button>

              </div>
            </form>
          </div>
        </div>

        {/* Status Modal Overlay */}
        <AnimatePresence>
          {submitStatus !== 'idle' && (
            <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                style={{
                  backgroundColor: '#FFF9F0',
                  width: '95%',
                  maxWidth: '800px',
                  padding: '80px',
                  borderRadius: '60px',
                  border: '8px solid #A47A2D',
                  position: 'relative',
                  boxShadow: '0 50px 150px rgba(0,0,0,0.8)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '60px'
                }}
              >
                {submitStatus === 'success' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%', gap: '50px' }}>
                    <div style={{
                      width: '140px',
                      height: '140px',
                      backgroundColor: '#A47A2D',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 20px 40px rgba(164,122,45,0.4)'
                    }}>
                      <CheckCircle2 size={80} strokeWidth={2} className="text-white" />
                    </div>

                    <div style={{ width: '100%' }}>
                      <h3
                        style={{
                          fontFamily: 'Michroma, sans-serif',
                          fontSize: '56px',
                          fontWeight: '900',
                          color: '#521D07',
                          textTransform: 'uppercase',
                          lineHeight: '1',
                          whiteSpace: 'nowrap',
                          margin: '0 0 30px 0',
                          letterSpacing: '0.1em'
                        }}
                      >
                        SUCCESS!
                      </h3>
                      <p style={{
                        fontSize: '28px',
                        fontWeight: '700',
                        color: 'rgba(82, 29, 7, 0.9)',
                        lineHeight: '1.5',
                        margin: '0'
                      }}>
                        Your message was sent successfully.<br />I'll reply to you shortly!
                      </p>
                    </div>

                    <button
                      onClick={() => setSubmitStatus('idle')}
                      style={{
                        width: '100%',
                        padding: '30px',
                        backgroundColor: '#521D07',
                        color: '#FFFFFF',
                        fontSize: '24px',
                        fontWeight: '900',
                        textTransform: 'uppercase',
                        letterSpacing: '0.4em',
                        borderRadius: '30px',
                        border: '4px solid #A47A2D',
                        boxShadow: '12px 12px 0 #A47A2D',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#A47A2D';
                        e.currentTarget.style.transform = 'translateY(-4px)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#521D07';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      Got it
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%', gap: '50px' }}>
                    <div style={{
                      width: '140px',
                      height: '140px',
                      backgroundColor: '#DC2626',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 20px 40px rgba(220,38,38,0.4)'
                    }}>
                      <AlertCircle size={80} strokeWidth={2} className="text-white" />
                    </div>

                    <div style={{ width: '100%' }}>
                      <h3
                        style={{
                          fontFamily: 'Michroma, sans-serif',
                          fontSize: '56px',
                          fontWeight: '900',
                          color: '#DC2626',
                          textTransform: 'uppercase',
                          lineHeight: '1',
                          whiteSpace: 'nowrap',
                          margin: '0 0 30px 0',
                          letterSpacing: '0.1em'
                        }}
                      >
                        ERROR
                      </h3>
                      <p style={{
                        fontSize: '28px',
                        fontWeight: '700',
                        color: 'rgba(82, 29, 7, 0.9)',
                        lineHeight: '1.5',
                        margin: '0'
                      }}>
                        Something went wrong.<br />Please try again later.
                      </p>
                    </div>

                    <button
                      onClick={() => setSubmitStatus('idle')}
                      style={{
                        width: '100%',
                        padding: '30px',
                        backgroundColor: '#DC2626',
                        color: '#FFFFFF',
                        fontSize: '24px',
                        fontWeight: '900',
                        textTransform: 'uppercase',
                        letterSpacing: '0.4em',
                        borderRadius: '30px',
                        border: '4px solid #7F1D1D',
                        boxShadow: '12px 12px 0 #7F1D1D',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#B91C1C';
                        e.currentTarget.style.transform = 'translateY(-4px)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#DC2626';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      Back
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
};

export default ContactPage;