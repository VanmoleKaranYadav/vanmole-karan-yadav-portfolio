import React from 'react';

export default function SectionHeader({ eyebrow, title, subtitle, className = '' }) {
  return (
    <div className={`mb-12 ${className}`}>
      {eyebrow && (
        <p className="text-xs uppercase tracking-widest font-mono font-semibold text-text-subtle mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base text-text-muted max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
