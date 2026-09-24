import React, { useState } from 'react';
import { portfolioData } from '../data/portfolio';
import Button from '../components/Button';
import { ArrowRight, Mail, FileText, Download, MapPin } from 'lucide-react';

export default function Hero() {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="home" className="pt-32 pb-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Sub-headline / Eyebrow */}
            <p className="text-xs uppercase tracking-widest font-mono font-semibold text-text-subtle mb-3">
              {portfolioData.degreeBadge}
            </p>

            {/* Main Name Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.1] mb-6">
              Vanmole{' '}
              <span className="text-text-muted hover:text-text-primary transition-colors">
                Karan Yadav.
              </span>
            </h1>

            {/* Bio Description */}
            <p className="text-base sm:text-lg text-text-muted leading-relaxed mb-8 max-w-xl">
              {portfolioData.heroBio}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <Button href="#projects" variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                View Projects
              </Button>

              <Button href="#contact" variant="outline" size="md" icon={<Mail className="w-4 h-4" />}>
                Get in Touch
              </Button>

              <Button
                href={portfolioData.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                variant="subtle"
                size="md"
                icon={<FileText className="w-4 h-4" />}
              >
                My Resume
              </Button>

              <Button
                href={portfolioData.resumePath}
                download={portfolioData.resumeDownloadName}
                variant="outline"
                size="md"
                icon={<Download className="w-4 h-4" />}
                title="Download Vanmole-Karan-Yadav-Resume.pdf"
              >
                Download Resume
              </Button>
            </div>

            {/* Meta details */}
            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-surface-border-subtle text-xs text-text-subtle">
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {portfolioData.location}
              </span>
              <span>•</span>
              <span className="font-mono">B.Tech CSE (2027)</span>
              <span>•</span>
              <span className="font-mono">DRK CET / JNTUH</span>
            </div>
          </div>

          {/* Right Column: Profile Visual */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group">
              {/* Outer decorative ring */}
              <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-surface-border via-accent/20 to-surface-border opacity-70 group-hover:opacity-100 transition-opacity blur-sm"></div>

              {/* Circular Card Container */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 aspect-square rounded-full bg-surface border-2 border-surface-border p-2 shadow-elevated flex items-center justify-center overflow-hidden">
                {!imgError ? (
                  <img
                    src={portfolioData.profileImagePath}
                    alt="Vanmole Karan Yadav"
                    className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-105"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-surface-subtle flex flex-col items-center justify-center">
                    <span className="text-5xl font-mono font-bold tracking-tight text-text-primary">
                      VK
                    </span>
                    <span className="text-xs font-mono text-text-subtle mt-2">
                      Vanmole Karan Yadav
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
