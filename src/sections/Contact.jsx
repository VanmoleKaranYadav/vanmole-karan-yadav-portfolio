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
  CheckCircle,
  AlertCircle,
  FileText,
  Copy,
  Check,
  MessageCircle,
} from 'lucide-react';

// Reliable form submission endpoint for static React/Vite applications
// Delivers messages directly to vanmolekaranyadav@gmail.com without needing a backend server
const FORM_ENDPOINT =
  import.meta.env.VITE_CONTACT_ENDPOINT ||
  'https://formsubmit.co/ajax/vanmolekaranyadav@gmail.com';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    _honey: '', // Honeypot field for bot spam prevention
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
    needsActivation: false,
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Client-side validation: Name, Email format, Message not empty
  const validate = () => {
    const errors = {};
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName) {
      errors.name = 'Please enter your name.';
    } else if (trimmedName.length < 2) {
      errors.name = 'Name must be at least 2 characters.';
    }

    if (!trimmedEmail) {
      errors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!trimmedMessage) {
      errors.message = 'Please enter your message.';
    } else if (trimmedMessage.length < 5) {
      errors.message = 'Message must be at least 5 characters.';
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

    // Honeypot spam trap check
    if (formData._honey) {
      console.warn('Spam submission detected and blocked.');
      setStatus({ submitting: false, success: true, error: null, needsActivation: false });
      setFormData({ name: '', email: '', message: '', _honey: '' });
      return;
    }

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      const firstErrorField = Object.keys(errors)[0];
      const el = document.getElementById(firstErrorField);
      if (el) el.focus();
      return;
    }

    setStatus({ submitting: true, success: false, error: null, needsActivation: false });

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        _subject: `New Portfolio Message from ${formData.name.trim()}`,
        _template: 'table',
        _captcha: 'false',
      };

      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      const isActivationPending =
        typeof data.message === 'string' &&
        data.message.toLowerCase().includes('activation');

      const isSuccess =
        response.ok &&
        (data.success === 'true' ||
          data.success === true ||
          isActivationPending);

      if (isSuccess) {
        setStatus({
          submitting: false,
          success: true,
          error: null,
          needsActivation: isActivationPending,
        });
        setFormData({ name: '', email: '', message: '', _honey: '' });
        setFieldErrors({});
      } else {
        setStatus({
          submitting: false,
          success: false,
          error: 'Something went wrong. Please try again.',
          needsActivation: false,
        });
      }
    } catch (err) {
      console.error('Form submission network error:', err);
      setStatus({
        submitting: false,
        success: false,
        error: 'Something went wrong. Please try again.',
        needsActivation: false,
      });
    }
  };

  const rawPhone = portfolioData.phone.replace(/[^0-9]/g, '');

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
                Fill in the form below. Messages are delivered directly to Karan's inbox at {portfolioData.email}.
              </p>

              {status.success ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="p-6 sm:p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center flex flex-col items-center gap-3"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-text-primary">
                    Message sent successfully. I'll get back to you soon.
                  </h4>
                  {status.needsActivation && (
                    <p className="text-xs text-amber-600 dark:text-amber-400 max-w-md bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5 mt-1">
                      <strong>One-time email activation:</strong> FormSubmit sent an activation email to{' '}
                      <span className="font-mono underline">{portfolioData.email}</span>. Click the "Activate Form" link in your inbox to enable automatic delivery.
                    </p>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setStatus({
                        submitting: false,
                        success: false,
                        error: null,
                        needsActivation: false,
                      })
                    }
                    className="mt-3"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  {status.error && (
                    <div
                      role="alert"
                      aria-live="assertive"
                      className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-2.5 text-xs text-rose-500"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{status.error}</span>
                    </div>
                  )}

                  {/* Honeypot Spam Trap (Hidden from real visitors) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="_honey">Do not fill this field</label>
                    <input
                      type="text"
                      id="_honey"
                      name="_honey"
                      value={formData._honey}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-semibold text-text-primary mb-1.5"
                    >
                      Name <span className="text-rose-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder=""
                      disabled={status.submitting}
                      aria-required="true"
                      aria-invalid={!!fieldErrors.name}
                      aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-surface-subtle border text-sm text-text-primary placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 ${
                        fieldErrors.name
                          ? 'border-rose-500 ring-1 ring-rose-500'
                          : 'border-surface-border hover:border-surface-hover'
                      }`}
                    />
                    {fieldErrors.name && (
                      <p
                        id="name-error"
                        role="alert"
                        className="text-xs text-rose-500 mt-1.5 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{fieldErrors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold text-text-primary mb-1.5"
                    >
                      Email <span className="text-rose-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder=""
                      disabled={status.submitting}
                      aria-required="true"
                      aria-invalid={!!fieldErrors.email}
                      aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-surface-subtle border text-sm text-text-primary placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 ${
                        fieldErrors.email
                          ? 'border-rose-500 ring-1 ring-rose-500'
                          : 'border-surface-border hover:border-surface-hover'
                      }`}
                    />
                    {fieldErrors.email && (
                      <p
                        id="email-error"
                        role="alert"
                        className="text-xs text-rose-500 mt-1.5 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{fieldErrors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="message"
                        className="block text-xs font-semibold text-text-primary"
                      >
                        Message <span className="text-rose-500" aria-hidden="true">*</span>
                      </label>
                      <span className="text-[11px] text-text-subtle font-mono">
                        {formData.message.length}/2000
                      </span>
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      maxLength={2000}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder=""
                      disabled={status.submitting}
                      aria-required="true"
                      aria-invalid={!!fieldErrors.message}
                      aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-surface-subtle border text-sm text-text-primary placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 resize-y ${
                        fieldErrors.message
                          ? 'border-rose-500 ring-1 ring-rose-500'
                          : 'border-surface-border hover:border-surface-hover'
                      }`}
                    ></textarea>
                    {fieldErrors.message && (
                      <p
                        id="message-error"
                        role="alert"
                        className="text-xs text-rose-500 mt-1.5 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{fieldErrors.message}</span>
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
                    icon={<ArrowUpRight className="w-4 h-4" />}
                    iconPosition="right"
                    className="w-full mt-2"
                  >
                    {status.submitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Direct Channels & Verified Contacts */}
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
                  className="p-2 rounded-lg bg-surface-subtle hover:bg-surface-hover text-text-muted hover:text-text-primary transition-colors text-xs flex items-center gap-1 cursor-pointer"
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
