import React, { useState } from 'react';
import { Mail, Github, Linkedin, Send, Download, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import resumePdf from '../assets/resume.pdf';
import Modal from '../components/Modal';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';

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
      icon: Mail,
      label: 'Email',
      value: 'josh.dizon.aguiluz25@gmail.com',
      link: 'https://mail.google.com/mail/?view=cm&fs=1&to=josh.dizon.aguiluz25@gmail.com'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Josh Andrei Aguiluz',
      link: 'https://www.linkedin.com/in/josh-aguiluz-0a150a350/'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: '@Josh-Aguiluz',
      link: 'https://github.com/Josh-Aguiluz'
    }
  ];

  const fields = [
    { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name', autoComplete: 'name' },
    { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com', autoComplete: 'email' },
    { id: 'subject', label: 'Subject', type: 'text', placeholder: "What's this about?", autoComplete: 'off' },
  ] as const;

  return (
    <div className="container-page section-y">
      <SectionHeader
        id="contact-title"
        eyebrow="// Contact"
        title="Get In Touch"
        lede="Have a project in mind or just want to say hi? I'm always open to discussing new opportunities."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:gap-8">
        {/* Contact info */}
        <Reveal className="flex flex-col gap-3">
          <ul className="surface divide-y divide-border overflow-hidden">
            {contactInfo.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <a href={item.link} className="group flex items-center gap-4 p-5 transition-colors hover:bg-surface-2">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2 text-fg-muted">
                      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-xs text-fg-subtle">{item.label}</span>
                      <span className="block break-all text-[0.9375rem] font-medium text-fg">{item.value}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-fg-subtle transition-colors group-hover:text-fg" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href={resumePdf}
            download="Josh_Aguiluz_Resume.pdf"
            className="surface group flex items-center gap-4 p-5 transition-colors hover:bg-surface-2"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-fg">
              <Download className="h-[18px] w-[18px]" aria-hidden="true" />
            </span>
            <span className="flex-1 font-medium">Download Resume</span>
            <span className="font-mono text-xs text-fg-subtle">PDF</span>
          </a>
        </Reveal>

        {/* Contact Form */}
        <Reveal delay={0.05}>
          <form onSubmit={handleSubmit} className="surface p-6 sm:p-8" aria-labelledby="contact-form-title">
            <h3 id="contact-form-title" className="text-lg font-semibold tracking-tight">Send a message</h3>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {fields.map((f) => (
                <div key={f.id} className={f.id === 'subject' ? 'sm:col-span-2' : ''}>
                  <label htmlFor={f.id} className="mb-2 block text-sm font-medium text-fg">
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    id={f.id}
                    name={f.id}
                    value={formData[f.id]}
                    onChange={handleChange}
                    required
                    autoComplete={f.autoComplete}
                    className="field"
                    placeholder={f.placeholder}
                  />
                </div>
              ))}

              <div className="sm:col-span-2">
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-fg">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="field resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="btn btn-primary mt-6 w-full sm:w-auto">
              {isSubmitting ? (
                'Sending...'
              ) : (
                <>
                  Send Message <Send className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </button>
          </form>
        </Reveal>
      </div>

      {/* Status dialog */}
      <Modal open={submitStatus !== 'idle'} onClose={() => setSubmitStatus('idle')} labelledBy="contact-status-title" className="!max-w-md" closeLabel="Close message">
        <div className="flex flex-col items-center px-6 pb-8 pt-12 text-center sm:px-10">
          {submitStatus === 'success' ? (
            <>
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-surface-2 text-success">
                <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
              </span>
              <h3 id="contact-status-title" className="mt-6 text-h3 font-semibold">Success!</h3>
              <p className="mt-2 text-fg-muted">
                Your message was sent successfully. I'll reply to you shortly!
              </p>
              <button type="button" onClick={() => setSubmitStatus('idle')} className="btn btn-primary mt-8 w-full">
                Got it
              </button>
            </>
          ) : (
            <>
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-surface-2 text-danger">
                <AlertCircle className="h-7 w-7" aria-hidden="true" />
              </span>
              <h3 id="contact-status-title" className="mt-6 text-h3 font-semibold">Error</h3>
              <p className="mt-2 text-fg-muted">
                Something went wrong. Please try again later.
              </p>
              <button type="button" onClick={() => setSubmitStatus('idle')} className="btn btn-secondary mt-8 w-full">
                Back
              </button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ContactPage;
