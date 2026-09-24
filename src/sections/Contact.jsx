import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { portfolioData } from '../data/portfolio';
import Button from '../components/Button';
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  ArrowUpRight,
  Send,
  CheckCircle,
  AlertCircle,
  FileText,
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  const [fieldErrors, setFieldErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Please enter your name.';
    }
    if (!formData.email.trim()) {
      errors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) {
      errors.message = 'Please enter your message.';
    } else if (formData.message.trim().length < 5) {
      errors.message = 'Message must be at least 5 characters long.';
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: null }));
    }
    if (status.error) {
      setStatus((prev) => ({ ...prev, error: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setStatus({ submitting: true, success: false, error: null });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({ submitting: false, success: true, error: null });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({
          submitting: false,
          success: false,
          error: data.error || 'Failed to send message. Please try again.',
        });
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setStatus({
        submitting: false,
        success: false,
        error: 'Network connection failed. You can reach out directly via vanmolekaranyadav@gmail.com.',
      });
    }
  };

  return (
    <section id="contact" className="py-20 border-t border-surface-border-subtle">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow="Communication"
          title="Get In Touch"
          subtitle="Interested in collaborating, hiring for entry-level positions, or discussing software engineering? Send a message or reach out via any channel below."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Interactive Contact Form */}
          <div className="lg:col-span-7 scroll-reveal">
            <div className="p-6 sm:p-8 rounded-3xl bg-surface border border-surface-border shadow-card">
              <h3 className="text-xl font-bold text-text-primary mb-2">
                Send a Message
              </h3>
              <p className="text-xs text-text-muted mb-6">
                Fill in the form below to deliver a message straight to my inbox and server ledger.
              </p>

              {status.success ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center flex flex-col items-center gap-3">
                  <CheckCircle className="w-10 h-10 text-emerald-500 animate-bounce" />
                  <h4 className="text-base font-semibold text-text-primary">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs text-text-muted max-w-md">
                    Thank you for reaching out, Karan has received your inquiry and will get back to you promptly.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setStatus({ submitting: false, success: false, error: null })}
                    className="mt-2"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                  {status.error && (
                    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-2.5 text-xs text-rose-500">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{status.error}</span>
                    </div>
                  )}

                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-text-primary mb-1">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder=""
                      disabled={status.submitting}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-surface-subtle border text-xs sm:text-sm text-text-primary placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
                        fieldErrors.name ? 'border-rose-500 ring-rose-500' : 'border-surface-border'
                      }`}
                      aria-invalid={!!fieldErrors.name}
                      aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                    />
                    {fieldErrors.name && (
                      <p id="name-error" className="text-[11px] text-rose-500 mt-1">
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-text-primary mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder=""
                      disabled={status.submitting}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-surface-subtle border text-xs sm:text-sm text-text-primary placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
                        fieldErrors.email ? 'border-rose-500 ring-rose-500' : 'border-surface-border'
                      }`}
                      aria-invalid={!!fieldErrors.email}
                      aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                    />
                    {fieldErrors.email && (
                      <p id="email-error" className="text-[11px] text-rose-500 mt-1">
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label htmlFor="subject" className="block text-xs font-semibold text-text-primary mb-1">
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder=""
                      disabled={status.submitting}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-subtle border border-surface-border text-xs sm:text-sm text-text-primary placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-text-primary mb-1">
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder=""
                      disabled={status.submitting}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-surface-subtle border text-xs sm:text-sm text-text-primary placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-y ${
                        fieldErrors.message ? 'border-rose-500 ring-rose-500' : 'border-surface-border'
                      }`}
                      aria-invalid={!!fieldErrors.message}
                      aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                    ></textarea>
                    {fieldErrors.message && (
                      <p id="message-error" className="text-[11px] text-rose-500 mt-1">
                        {fieldErrors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    loading={status.submitting}
                    disabled={status.submitting}
                    icon={<Send className="w-4 h-4" />}
                    className="w-full mt-2"
                  >
                    {status.submitting ? 'Sending Message...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Direct Channels & Resume Card */}
          <div className="lg:col-span-5 flex flex-col gap-4 scroll-reveal stagger-2">
            {/* Email Card */}
            <a
              href={`mailto:${portfolioData.email}`}
              className="p-4 sm:p-5 rounded-2xl bg-surface border border-surface-border hover:border-surface-hover shadow-sm hover:shadow-card transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-subtle border border-surface-border flex items-center justify-center text-text-primary group-hover:bg-accent group-hover:text-accent-contrast transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-text-subtle block">
                    Email Address
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-text-primary group-hover:underline">
                    {portfolioData.email}
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-text-subtle group-hover:text-text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Phone Card */}
            <a
              href={`tel:${portfolioData.phone.replace(/[^0-9+]/g, '')}`}
              className="p-4 sm:p-5 rounded-2xl bg-surface border border-surface-border hover:border-surface-hover shadow-sm hover:shadow-card transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-subtle border border-surface-border flex items-center justify-center text-text-primary group-hover:bg-accent group-hover:text-accent-contrast transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-text-subtle block">
                    Phone / WhatsApp
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-text-primary group-hover:underline">
                    {portfolioData.phone}
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-text-subtle group-hover:text-text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* LinkedIn Card */}
            <a
              href={portfolioData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-5 rounded-2xl bg-surface border border-surface-border hover:border-surface-hover shadow-sm hover:shadow-card transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-subtle border border-surface-border flex items-center justify-center text-text-primary group-hover:bg-accent group-hover:text-accent-contrast transition-colors">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-text-subtle block">
                    Professional Network
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-text-primary group-hover:underline">
                    linkedin.com/in/vanmole-karan-yadav
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-text-subtle group-hover:text-text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* GitHub Card */}
            <a
              href={portfolioData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-5 rounded-2xl bg-surface border border-surface-border hover:border-surface-hover shadow-sm hover:shadow-card transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-subtle border border-surface-border flex items-center justify-center text-text-primary group-hover:bg-accent group-hover:text-accent-contrast transition-colors">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-text-subtle block">
                    Source Code & Repositories
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-text-primary group-hover:underline">
                    github.com/VanmoleKaranYadav
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-text-subtle group-hover:text-text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Resume Viewer Card */}
            <div className="p-5 rounded-2xl bg-surface-subtle border border-surface-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface border border-surface-border flex items-center justify-center text-text-primary">
                  <FileText className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-text-primary block">
                    Curriculum Vitae / Resume
                  </span>
                  <span className="text-[11px] text-text-subtle font-mono">
                    PDF Document (Verified)
                  </span>
                </div>
              </div>
              <Button
                href={portfolioData.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="sm"
                icon={<ArrowUpRight className="w-3.5 h-3.5" />}
              >
                Open PDF
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
