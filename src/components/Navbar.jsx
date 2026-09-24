import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { portfolioData } from '../data/portfolio';
import { Sun, Moon, FileText, Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sectionIds = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];

      // Edge case: if user is scrolled near the bottom of document, activate Contact
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollY = window.scrollY;

      if (windowHeight + scrollY >= documentHeight - 80) {
        setActiveSection('contact');
        return;
      }

      // Edge case: top of page
      if (scrollY < 120) {
        setActiveSection('home');
        return;
      }

      // Check sections from bottom to top
      const headerOffset = 180;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - headerOffset;
          if (scrollY >= top) {
            setActiveSection(id);
            return;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'glass-header border-b border-surface-border py-3 shadow-subtle'
          : 'bg-background/80 backdrop-blur-sm border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Monogram */}
        <a
          href="#home"
          onClick={() => setActiveSection('home')}
          className="flex items-center gap-2.5 group focus-visible:outline-none"
          aria-label="Vanmole Karan Yadav Portfolio Home"
        >
          <div
            className={`w-9 h-9 rounded-lg bg-surface-subtle border flex items-center justify-center font-mono font-bold text-sm text-text-primary transition-all ${
              activeSection === 'home'
                ? 'border-accent shadow-sm ring-1 ring-accent/30'
                : 'border-surface-border group-hover:border-accent'
            }`}
          >
            VK
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-text-primary leading-tight">
              Karan Yadav
            </span>
            <span className="text-[10px] font-mono text-emerald-500 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Available for work
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-1 rounded-full p-1 bg-surface-subtle/80 border border-surface-border text-sm backdrop-blur-sm"
          style={{ scrollTargetGroup: 'auto' }}
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setActiveSection(link.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative px-3.5 py-1.5 rounded-full text-xs transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-surface text-text-primary font-semibold shadow-sm border border-surface-border'
                    : 'text-text-muted hover:text-text-primary hover:bg-surface/50 font-medium'
                }`}
              >
                {isActive && (
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"
                    aria-hidden="true"
                  />
                )}
                <span>{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Resume & Theme Toggle */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Dual Segmented Theme Switch */}
          <div
            className="flex items-center bg-surface-subtle border border-surface-border rounded-lg p-0.5 text-xs font-medium"
            role="group"
            aria-label="Theme switcher"
          >
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                theme === 'light'
                  ? 'bg-surface text-text-primary shadow-sm font-semibold'
                  : 'text-text-muted hover:text-text-primary'
              }`}
              aria-pressed={theme === 'light'}
              title="Switch to White Mode"
            >
              <Sun className="w-3.5 h-3.5" />
              <span>White</span>
            </button>

            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                theme === 'dark'
                  ? 'bg-surface text-text-primary shadow-sm font-semibold'
                  : 'text-text-muted hover:text-text-primary'
              }`}
              aria-pressed={theme === 'dark'}
              title="Switch to Dark Mode"
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Dark</span>
            </button>
          </div>

          {/* Resume button */}
          <a
            href={portfolioData.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-accent text-accent-contrast hover:opacity-90 transition-all shadow-sm"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3 opacity-70" />
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex sm:hidden items-center gap-2">
          {/* Mobile Theme Toggle Icon */}
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg bg-surface-subtle border border-surface-border text-text-muted hover:text-text-primary"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-surface-subtle border border-surface-border text-text-muted hover:text-text-primary"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden glass-header border-b border-surface-border px-4 py-4 mt-2 transition-all">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    setActiveSection(link.id);
                    setMobileMenuOpen(false);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3.5 py-2.5 text-sm rounded-lg transition-all flex items-center justify-between font-medium ${
                    isActive
                      ? 'bg-surface text-text-primary font-semibold border border-surface-border shadow-sm'
                      : 'text-text-muted hover:text-text-primary hover:bg-surface-subtle'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isActive && (
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"
                        aria-hidden="true"
                      />
                    )}
                    <span>{link.label}</span>
                  </div>
                  {isActive && (
                    <span className="text-[10px] font-mono text-emerald-500 font-semibold uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      Current
                    </span>
                  )}
                </a>
              );
            })}

            <div className="pt-2 border-t border-surface-border flex items-center justify-between mt-2">
              <a
                href={portfolioData.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-accent text-accent-contrast w-full justify-center shadow-sm"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Open Resume PDF</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
