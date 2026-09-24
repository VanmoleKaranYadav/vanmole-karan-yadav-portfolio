import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { portfolioData } from '../data/portfolio';
import { Trophy, Calendar, Building2, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function Experience() {
  const { internship, achievement, certifications } = portfolioData;

  return (
    <section id="experience" className="py-20 border-t border-surface-border-subtle bg-surface-subtle/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow="Milestones"
          title="Experience & Achievements"
          subtitle="Internships, industry-recognized certifications, and competitive hackathon accomplishments."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Internship */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-surface-border shadow-card flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-text-subtle mb-3">
                  <Calendar className="w-4 h-4 text-emerald-500" />
                  <span>{internship.period}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-2">
                  {internship.title}
                </h3>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface-subtle border border-surface-border text-xs font-medium text-text-primary mb-4">
                  <Building2 className="w-3.5 h-3.5 text-text-subtle" />
                  <span>{internship.organization}</span>
                </div>

                <p className="text-sm text-text-muted leading-relaxed mb-6">
                  {internship.desc}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-surface-border-subtle">
                  {internship.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-surface-subtle border border-surface-border text-text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hackathon Winner & Certifications */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Hackathon Award Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-surface to-surface border border-amber-500/30 shadow-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold block">
                    Hackathon Award
                  </span>
                  <h4 className="text-lg font-bold text-text-primary leading-tight">
                    {achievement.title}
                  </h4>
                </div>
              </div>

              <p className="text-xs font-medium text-text-primary mb-1">
                {achievement.event} — {achievement.venue}
              </p>
              <p className="text-xs text-text-muted leading-relaxed">
                {achievement.desc}
              </p>
            </div>

            {/* Certifications Card */}
            <div className="p-6 rounded-2xl bg-surface border border-surface-border shadow-card flex-1">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-surface-border-subtle">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-text-primary" />
                  <h4 className="text-sm font-semibold text-text-primary">
                    Professional Certifications
                  </h4>
                </div>
                <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                  Verified
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-surface-subtle border border-surface-border flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-text-primary">
                        {cert.name}
                      </span>
                      <span className="text-[11px] text-text-muted">
                        {cert.issuer}
                      </span>
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
