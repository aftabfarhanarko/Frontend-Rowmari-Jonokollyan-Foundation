import React from 'react';

/** Clean, modern card surface matching foundation's professional aesthetic. */
export const glassCard =
  'rounded-2xl border border-stone-200/80 bg-white shadow-xs';

export const glassCardHover = `${glassCard} transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-stone-300`;

interface GlassSectionProps {
  id?: string;
  tone?: 'green' | 'red';
  children: React.ReactNode;
}

/** Section wrapper with subtle, gentle background tone instead of heavy glowing gradient orbs. */
export function GlassSection({ id, tone = 'green', children }: GlassSectionProps) {
  return (
    <section id={id} className="relative overflow-hidden py-10 md:py-16 scroll-mt-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-emerald-50/30 blur-2xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-stone-100/40 blur-2xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="max-w-2xl mx-auto text-center mb-8 md:mb-10 space-y-2">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D5C35] leading-tight tracking-tight">
        {title}
      </h2>
      {subtitle && <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">{subtitle}</p>}
    </div>
  );
}

