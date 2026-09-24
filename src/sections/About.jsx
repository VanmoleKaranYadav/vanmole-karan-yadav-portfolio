import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { portfolioData } from '../data/portfolio';
import { GraduationCap, Award, MapPin, Target, CheckCircle2 } from 'lucide-react';

export default function About() {
  const { about, education } = portfolioData;

  return (
    <section id="about" className="py-20 border-t border-surface-border-subtle">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow="Background & Profile"
          title="About Me"
          subtitle="Dedicated to crafting clean code, robust software architectures, and dependable user experiences."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Bio & Core Pillars */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="p-6 rounded-2xl bg-surface border border-surface-border shadow-card">
              <p className="text-base sm:text-lg text-text-primary leading-relaxed">
                {about.lead}
              </p>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {about.pillars.map((pillar) => (
                <div
                  key={pillar.num}
                  className="p-5 rounded-xl bg-surface border border-surface-border hover:border-surface-hover transition-colors flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-xs font-bold text-text-subtle mb-2 block">
                      {pillar.num}
                    </span>
                    <h3 className="text-sm font-semibold text-text-primary mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-text-muted leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Facts Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-lg bg-surface-subtle border border-surface-border">
                <span className="text-[10px] uppercase font-mono text-text-subtle block mb-1">
                  Primary Focus
                </span>
                <span className="text-xs font-semibold text-text-primary">
                  Full-Stack & AI
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-surface-subtle border border-surface-border">
                <span className="text-[10px] uppercase font-mono text-text-subtle block mb-1">
                  Degree Target
                </span>
                <span className="text-xs font-semibold text-text-primary">
                  B.Tech (2027)
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-surface-subtle border border-surface-border">
                <span className="text-[10px] uppercase font-mono text-text-subtle block mb-1">
                  Academic Status
                </span>
                <span className="text-xs font-semibold text-text-primary">
                  DRK CET / JNTUH
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-surface-subtle border border-surface-border">
                <span className="text-[10px] uppercase font-mono text-text-subtle block mb-1">
                  Location
                </span>
                <span className="text-xs font-semibold text-text-primary">
                  Hyderabad, India
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Academic Details Timeline */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-2xl bg-surface border border-surface-border shadow-card">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-surface-border-subtle">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-text-primary" />
                  <h3 className="text-base font-semibold text-text-primary">
                    Academic Background
                  </h3>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-medium">
                  Verified
                </span>
              </div>

              <div className="flex flex-col gap-6">
                {education.map((edu, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-surface-border pb-2 last:pb-0">
                    {/* Circle marker */}
                    <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-accent border-2 border-surface"></span>

                    <div className="flex flex-col">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-sm font-semibold text-text-primary">
                          {edu.degree}
                        </span>
                        <span className="text-xs font-mono text-text-subtle shrink-0">
                          {edu.period}
                        </span>
                      </div>

                      <p className="text-xs text-text-muted mb-1">
                        {edu.institution} {edu.affiliation && `(${edu.affiliation})`}
                      </p>

                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex items-center gap-1 text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {edu.score}
                        </span>
                        {edu.status && (
                          <span className="text-[10px] text-text-subtle">
                            • {edu.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
