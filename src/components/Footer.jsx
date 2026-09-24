import React from 'react';
import { portfolioData } from '../data/portfolio';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-surface-border bg-surface-subtle/50 py-10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-2 text-xs text-text-muted text-center sm:text-left">
          <span className="font-medium text-text-primary">
            © {currentYear} {portfolioData.name}
          </span>
          <span className="hidden sm:inline text-text-subtle">•</span>
          <span>Computer Science & Engineering</span>
          <span className="hidden sm:inline text-text-subtle">•</span>
          <span className="text-text-subtle">Hyderabad, India</span>
        </div>

        {/* Social Links & Back to Top */}
        <div className="flex items-center gap-4">
          <a
            href={portfolioData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-text-subtle hover:text-text-primary hover:bg-surface border border-transparent hover:border-surface-border transition-all"
            aria-label="GitHub profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={portfolioData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-text-subtle hover:text-text-primary hover:bg-surface border border-transparent hover:border-surface-border transition-all"
            aria-label="LinkedIn profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href={`mailto:${portfolioData.email}`}
            className="p-2 rounded-lg text-text-subtle hover:text-text-primary hover:bg-surface border border-transparent hover:border-surface-border transition-all"
            aria-label="Email Karan"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-text-muted hover:text-text-primary bg-surface border border-surface-border hover:border-accent transition-all ml-2"
            title="Scroll to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
