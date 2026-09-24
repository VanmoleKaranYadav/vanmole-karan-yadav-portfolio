import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { portfolioData } from '../data/portfolio';
import { ArrowUpRight, CheckCircle2, Sparkles, Server, Terminal, ExternalLink } from 'lucide-react';
import Button from '../components/Button';

export default function Projects() {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="py-20 border-t border-surface-border-subtle">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow="Portfolio Works"
          title="Featured Projects"
          subtitle="Real-world software engineering applications built with high focus on performance, usability, and architecture."
        />

        <div className="flex flex-col gap-10">
          {projects.map((project) => (
            <article
              key={project.id}
              className="p-6 sm:p-8 rounded-3xl bg-surface border border-surface-border hover:border-surface-hover shadow-card transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left details */}
                <div className="lg:col-span-7 flex flex-col items-start">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-surface-subtle border border-surface-border text-text-subtle">
                      {project.num}
                    </span>
                    <span className="text-xs font-mono font-medium text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                      {project.badge}
                    </span>
                    <span className="text-xs text-text-subtle">
                      • {project.type}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-2.5 tracking-tight">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-4">
                    {project.desc}
                  </p>

                  {/* Highlights */}
                  {project.highlights && (
                    <div className="flex flex-col gap-1.5 mb-4 w-full">
                      {project.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-text-muted">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Technologies tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-md text-xs font-mono font-medium bg-surface-subtle border border-surface-border text-text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions & status */}
                  <div className="flex flex-wrap items-center justify-between w-full pt-4 border-t border-surface-border-subtle gap-4">
                    <span className="text-xs font-mono text-text-subtle">
                      Status: <strong className="text-text-primary font-medium">{project.status}</strong>
                    </span>

                    <div className="flex items-center gap-3">
                      <Button
                        href="#contact"
                        variant="primary"
                        size="sm"
                        icon={<ArrowUpRight className="w-3.5 h-3.5" />}
                      >
                        Inquire / Discuss Project
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Right mockup simulation */}
                <div className="lg:col-span-5">
                  <div className="rounded-2xl bg-surface-subtle border border-surface-border p-4 shadow-sm font-mono text-xs">
                    {/* Mockup header */}
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-surface-border-subtle text-[11px] text-text-subtle">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                        <span className="ml-2 font-semibold text-text-primary">{project.mockup.headerLeft}</span>
                      </div>
                      <span>{project.mockup.headerRight}</span>
                    </div>

                    {/* Mockup items list */}
                    <div className="flex flex-col gap-2.5 py-2">
                      {project.mockup.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-surface border border-surface-border"
                        >
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${item.dotColor}`}></span>
                            <span className="text-text-primary text-[11px]">{item.label}</span>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-surface-subtle text-text-muted border border-surface-border">
                            {item.badge}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Mockup footer */}
                    <div className="flex items-center justify-between pt-3 mt-2 border-t border-surface-border-subtle text-[10px] text-text-subtle">
                      <span>Full-Stack Architecture</span>
                      <span className="text-emerald-500">Verified System</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
