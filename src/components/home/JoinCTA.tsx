'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Language } from '@/types';

interface Props {
  lang: Language;
  onOpenDonation?: () => void;
  onOpenVolunteer?: () => void;
}

export default function JoinCTA({ lang }: Props) {
  const t = (bn: string, en: string) => (lang === 'bn' ? bn : en);
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
    setEmail('');
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#FFF4F5] py-4 md:py-5">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-8 lg:pr-56">
          {/* Left: envelope icon + text */}
          <div className="flex items-center gap-4 min-w-0 lg:flex-1">
            <svg viewBox="0 0 48 48" className="w-12 h-12 shrink-0 drop-shadow-sm" aria-hidden>
              <rect x="4" y="10" width="40" height="30" rx="5" fill="#D62828" />
              <path
                d="M6 14 L24 28 L42 14"
                fill="none"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg lg:text-xl font-extrabold text-stone-900 leading-snug">
                {t('মানবতার কল্যাণে আমাদের সাথে যুক্ত হোন', 'Join us for the welfare of humanity')}
              </h2>
              <p className="text-xs text-stone-600 mt-1">
                {t(
                  'নতুন কার্যক্রম ও সকল জরুরি আপডেট নিয়মিত পেতে ইমেইল দিয়ে যুক্ত থাকুন।',
                  'Subscribe to receive regular updates on our humanitarian initiatives.'
                )}
              </p>
            </div>
          </div>

          {/* Middle: form */}
          <div className="lg:w-[440px] shrink-0">
            {done ? (
              <div className="inline-flex items-center gap-2 rounded-xl bg-white border border-emerald-200 px-4 py-3 text-xs sm:text-sm font-bold text-emerald-700 shadow-sm">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{t('ধন্যবাদ! আপনার ইমেইল যুক্ত হয়েছে।', 'Thank you! Your email has been added.')}</span>
              </div>
            ) : (
              <form onSubmit={submit} className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('আপনার ইমেইল লিখুন...', 'Enter your email...')}
                  className="flex-1 min-w-0 px-5 py-3 rounded-xl bg-white shadow-md text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-[#D62828]"
                />
                <button
                  type="submit"
                  className="px-5 sm:px-6 py-3 rounded-xl bg-[#D62828] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm transition active:scale-[0.98] cursor-pointer whitespace-nowrap inline-flex items-center gap-2 shadow-md"
                >
                  <span>{t('যুক্ত হোন', 'Subscribe')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </motion.div>

      {/* Right: hands holding plant (put your image at public/images/hands-plant.png) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hands-plant.png"
        alt=""
        aria-hidden
        className="hidden lg:block pointer-events-none absolute right-0 bottom-0 h-full max-h-40 w-auto object-contain object-bottom"
      />
    </section>
  );
}