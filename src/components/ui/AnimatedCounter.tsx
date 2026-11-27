'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  value: string;
  duration?: number;
  className?: string;
}

const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

function toEnglishDigits(str: string): string {
  return str.replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)));
}

function toBengaliDigits(str: string): string {
  return str.replace(/\d/g, (d) => BN_DIGITS[parseInt(d, 10)]);
}

function parseValue(raw: string) {
  const isBengali = /[০-৯]/.test(raw);
  const normalized = toEnglishDigits(raw);
  const match = normalized.match(/^(.*?)([\d,]+)(.*)$/);
  if (!match) {
    return { valid: false, prefix: '', target: 0, suffix: '', isBengali, hasCommas: false };
  }
  const [, prefix, numStr, suffix] = match;
  const target = parseInt(numStr.replace(/,/g, ''), 10);
  return {
    valid: !Number.isNaN(target),
    prefix,
    target,
    suffix,
    isBengali,
    hasCommas: numStr.includes(','),
  };
}

/**
 * Counts up smoothly from 0 to the target number whenever it enters the viewport
 * (or on initial load if visible), supporting both Bengali and English numerals.
 */
export function AnimatedCounter({ value, duration = 1200, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const parsed = parseValue(value);
  const [display, setDisplay] = useState<string>(value);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || !parsed.valid) {
      setDisplay(value);
      return;
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || parsed.target <= 0) {
      setDisplay(value);
      return;
    }

    let rafId = 0;
    const startTime = performance.now();

    const formatNumber = (num: number) => {
      const formatted = parsed.hasCommas ? num.toLocaleString('en-US') : String(num);
      const localized = parsed.isBengali ? toBengaliDigits(formatted) : formatted;
      return `${parsed.prefix}${localized}${parsed.suffix}`;
    };

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * parsed.target);
      setDisplay(formatNumber(current));

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, value, duration, parsed.valid, parsed.target, parsed.prefix, parsed.suffix, parsed.isBengali, parsed.hasCommas]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
