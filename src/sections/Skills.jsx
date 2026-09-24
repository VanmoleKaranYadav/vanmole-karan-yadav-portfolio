import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { portfolioData } from '../data/portfolio';
import { Code2, Globe, Layers, Database, Cpu, Wrench } from 'lucide-react';

export default function Skills() {
  const { skillsCategories } = portfolioData;

  const iconMap = {
    Code: Code2,
    Globe: Globe,
    Layers: Layers,
    Database: Database,
    Cpu: Cpu,
    Wrench: Wrench,
  };

  return (
    <section id="skills" className="py-20 border-t border-surface-border-subtle bg-surface-subtle/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow="Technical Stack"
          title="Technical Skills"
          subtitle="Proficiencies in programming languages, frontend/backend frameworks, database architectures, and data science libraries."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsCategories.map((category, idx) => {
            const IconComponent = iconMap[category.icon] || Code2;

            return (
              <div
                key={category.title}
                className={`p-6 rounded-2xl bg-surface border border-surface-border hover:border-surface-hover hover:shadow-card transition-all duration-300 flex flex-col justify-between scroll-reveal-scale stagger-${(idx % 3) + 1}`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-surface-subtle border border-surface-border flex items-center justify-center text-text-primary">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-semibold text-text-primary">
                      {category.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-surface-subtle border border-surface-border text-text-muted hover:text-text-primary hover:border-accent transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-surface-border-subtle text-[11px] font-mono text-text-subtle flex items-center justify-between">
                  <span>{category.skills.length} competencies</span>
                  <span className="text-emerald-500">Active</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
