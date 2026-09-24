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
  Copy,
  Check,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';

const SUBJECT_PRESETS = [
  '💼 Job Opportunity',
  '🤝 Project Collaboration',
  '💬 General Inquiry',
  '👋 Saying Hi',
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submittedData, setSubmittedData] = useState(null);

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
    source: null,
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Please enter your name.';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters.';
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

  const handleSelectPreset = (preset) => {
    setFormData((prev) => ({
      ...prev,
      subject: prev.subject === preset ? '' : preset,
    }));
  };

  const handleCopyEmail = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(portfolioData.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setStatus({ submitting: true, success: false, error: null, source: null });

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: (formData.subject || 'General Inquiry').trim(),
      message: formData.message.trim(),
    };

    // Tier 1: Try local Express API route (/api/contact)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const contentType = response.headers.get('content-type') || '';
      if (response.ok && contentType.includes('application/json')) {
        const data = await response.json();
        if (data.success) {
          setSubmittedData(payload);
          setStatus({
            submitting: false,
            success: true,
            error: null,
            source: 'local',
          });
          setFormData({ name: '', email: '', subject: '', message: '' });
          return;
        }
      }
    } catch (localErr) {
      console.warn('Local API attempt unreachable, attempting FormSubmit cloud delivery...', localErr);
    }

    // Tier 2: Cloud Fallback via FormSubmit AJAX (direct email to Karan's inbox)
    try {
      const cloudResponse = await fetch('https://formsubmit.co/ajax/vanmolekaranyadav@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          _subject: `[Portfolio Contact] ${payload.subject} from ${payload.name}`,
          message: payload.message,
          _template: 'table',
        }),
      });

      const cloudData = await cloudResponse.json();
      if (cloudResponse.ok && (cloudData.success === 'true' || cloudData.success === true || cloudData.message)) {
        setSubmittedData(payload);
        setStatus({
          submitting: false,
          success: true,
          error: null,
          source: 'cloud',
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
        return;
      }
    } catch (cloudErr) {
      console.error('Cloud form delivery error:', cloudErr);
    }

    // Tier 3: Network / adblock fallback
    setStatus({
      submitting: false,
      success: false,
      error: 'Network request blocked or unavailable. Click below to launch your email client with your message pre-filled.',
      source: null,
    });
  };

  const rawPhone = portfolioData.phone.replace(/[^0-9]/g, '');
  const mailtoFallback = `mailto:${portfolioData.email}?subject=${encodeURIComponent(
    formData.subject || 'Portfolio Inquiry'
  )}&body=${encodeURIComponent(
    `Name: ${formData.name || 'Recruiter'}\nEmail: ${formData.email || ''}\n\nMessage:\n${formData.message || ''}`
  )}`;

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
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-text-primary">
                  Send a Message
                </h3>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  Inbox Active
                </span>
              </div>
              <p className="text-xs text-text-muted mb-6">
                Fill in the form below. Messages are delivered directly to Karan's inbox and development ledger.
              </p>

              {status.success ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 animate-pulse">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-text-primary">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs text-text-muted max-w-md">
                    Thank you for reaching out. Karan has received your inquiry and will respond to{' '}
                    <span className="font-semibold text-text-primary">{submittedData?.email}</span> promptly.
                  </p>

                  {submittedData && (
                    <div className="w-full mt-2 p-3.5 rounded-xl bg-surface border border-surface-border text-left text-xs space-y-1">
                      <div className="text-[11px] text-text-subtle font-mono">Message Summary:</div>
                      <div className="font-semibold text-text-primary">
                        {submittedData.name} &bull; <span className="text-text-muted font-normal">{submittedData.subject}</span>
                      </div>
                      <p className="text-text-muted italic line-clamp-2">
                        "{submittedData.message}"
                      </p>
                    </div>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setStatus({ submitting: false, success: false, error: null, source: null });
                      setSubmittedData(null);
                    }}
                    className="mt-3"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                  {status.error && (
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex flex-col gap-2.5 text-xs text-rose-500">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{status.error}</span>
                      </div>
                      <a
                        href={mailtoFallback}
                        className="inline-flex items-center gap-1.5 self-start px-3 py-1.5 rounded-lg bg-rose-500 text-white font-medium hover:bg-rose-600 transition-colors text-[11px]"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        Open in Email App
                      </a>
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

                  {/* Subject Field & Quick Preset Chips */}
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-subtle border border-surface-border text-xs sm:text-sm text-text-primary placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-accent transition-all mb-2"
                    />

                    {/* Quick Selection Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {SUBJECT_PRESETS.map((preset) => {
                        const isSelected = formData.subject === preset;
                        return (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => handleSelectPreset(preset)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors border ${
                              isSelected
                                ? 'bg-accent text-accent-contrast border-accent'
                                : 'bg-surface-subtle text-text-muted border-surface-border hover:border-surface-hover hover:text-text-primary'
                            }`}
                          >
                            {preset}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="message" className="block text-xs font-semibold text-text-primary">
                        Message <span className="text-rose-500">*</span>
                      </label>
                      <span className="text-[10px] text-text-subtle font-mono">
                        {formData.message.length}/2000
                      </span>
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      maxLength={2000}
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
            {/* Email Card with Quick Copy */}
            <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-surface-border hover:border-surface-hover shadow-sm hover:shadow-card transition-all flex items-center justify-between group">
              <a
                href={`mailto:${portfolioData.email}`}
                className="flex items-center gap-3 min-w-0 flex-1"
              >
                <div className="w-10 h-10 rounded-xl bg-surface-subtle border border-surface-border flex items-center justify-center text-text-primary group-hover:bg-accent group-hover:text-accent-contrast transition-colors shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-mono text-text-subtle block">
                    Email Address
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-text-primary group-hover:underline truncate block">
                    {portfolioData.email}
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-1 shrink-0 ml-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  title="Copy email to clipboard"
                  className="p-2 rounded-lg bg-surface-subtle hover:bg-surface-hover text-text-muted hover:text-text-primary transition-colors text-xs flex items-center gap-1"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-[10px] text-emerald-500 font-medium">Copied!</span>
                    </>
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                <a
                  href={`mailto:${portfolioData.email}`}
                  title="Open mail client"
                  className="p-2 text-text-subtle group-hover:text-text-primary transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-surface-border hover:border-surface-hover shadow-sm hover:shadow-card transition-all flex items-center justify-between group">
              <a
                href={`tel:${portfolioData.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center gap-3 min-w-0 flex-1"
              >
                <div className="w-10 h-10 rounded-xl bg-surface-subtle border border-surface-border flex items-center justify-center text-text-primary group-hover:bg-accent group-hover:text-accent-contrast transition-colors shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-mono text-text-subtle block">
                    Direct Phone / Call
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-text-primary group-hover:underline truncate block">
                    {portfolioData.phone}
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-2 shrink-0 ml-2">
                <a
                  href={`https://wa.me/${rawPhone}?text=${encodeURIComponent('Hi Karan, I saw your portfolio and would like to connect!')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-emerald-500/20"
                  title="Chat on WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </a>
                <a
                  href={`tel:${portfolioData.phone.replace(/[^0-9+]/g, '')}`}
                  className="p-1.5 text-text-subtle group-hover:text-text-primary transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

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
