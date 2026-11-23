import React from 'react';

/** Frosted-glass card surface. Needs a colourful backdrop (GlassSection provides one). */
export const glassCard =
  'rounded-3xl border border-white/70 bg-white/55 backdrop-blur-xl shadow-[0_8px_32px_-12px_rgba(13,92,53,0.25)]';

export const glassCardHover = `${glassCard} transition duration-300 hover:-translate-y-1 hover:bg-white/75 hover:shadow-[0_18px_44px_-14px_rgba(13,92,53,0.35)]`;

interface GlassSectionProps {
  id?: string;
  tone?: 'green' | 'red';
  children: React.ReactNode;
}

/** Section wrapper with soft blurred colour orbs so the glass cards have something to blur. */
export function GlassSection({ id, tone = 'green', children }: GlassSectionProps) {
  const a = tone === 'green' ? 'bg-emerald-300/40' : 'bg-red-300/35';
  const b = tone === 'green' ? 'bg-red-200/30' : 'bg-emerald-200/40';
  return (
    <section id={id} className="relative overflow-hidden py-16 md:py-24 scroll-mt-20">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className={`absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl ${a}`} />
        <div className={`absolute -bottom-24 -right-24 h-96 w-96 rounded-full blur-3xl ${b}`} />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="max-w-2xl mx-auto text-center mb-10 md:mb-14 space-y-3">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0D5C35] leading-tight tracking-tight">
        {title}
      </h2>
      {subtitle && <p className="text-stone-600 text-sm sm:text-base leading-relaxed">{subtitle}</p>}
    </div>
  );
}
