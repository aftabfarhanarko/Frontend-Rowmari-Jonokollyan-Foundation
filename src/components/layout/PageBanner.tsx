'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PageBannerProps {
  badge?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

/**
 * Shared full-width crimson gradient header banner for public sub-pages,
 * matching the Home page's visual identity and wave transition.
 */
export function PageBanner({ badge, title, subtitle, children }: PageBannerProps) {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-[#991B1B] via-[#D62828] to-[#E53935] text-white pt-8 pb-12 sm:pt-10 sm:pb-14">
      {/* Subtle light swoosh */}
      <svg
        aria-hidden
        viewBox="0 0 1440 240"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <path
          d="M0,150 C420,90 920,230 1440,120 L1440,240 L0,240 Z"
          fill="rgba(255,255,255,0.06)"
        />
      </svg>

      {/* Curved transition to white below */}
      <svg
        aria-hidden
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-6 sm:h-9 w-full"
      >
        <path d="M0,42 C420,68 980,45 1440,6 L1440,56 L0,56 Z" fill="#ffffff" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="max-w-3xl space-y-2.5"
        >
          {badge && (
            <span className="inline-block px-3 py-1 rounded-full bg-white/15 border border-white/25 text-white text-[11px] sm:text-xs font-bold">
              {badge}
            </span>
          )}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-snug">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs sm:text-sm md:text-base text-red-50/90 leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </motion.div>

        {children && <div className="mt-5">{children}</div>}
      </div>
    </section>
  );
}
