'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Language } from '@/types';

interface AboutUsProps {
  lang: Language;
  onOpenAssistance?: () => void;
  onOpenDonation?: () => void;
}

export default function AboutUs({ lang }: AboutUsProps) {
  const milestones = [
    { year: '২০১৮', yearEn: '2018', titleBn: 'প্রতিষ্ঠা', titleEn: 'Founded' },
    { year: '২০২০', yearEn: '2020', titleBn: 'ত্রাণ ও খাদ্য সহায়তা', titleEn: 'Pandemic Relief' },
    { year: '২০২৩', yearEn: '2023', titleBn: 'মেডিকেল ও শিক্ষা', titleEn: 'Medical & Edu' },
    { year: '২০২৬', yearEn: '2026', titleBn: 'ডিজিটাল ব্যবস্থাপনা', titleEn: 'Digital Era' },
  ];

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden text-white pt-6 pb-14 sm:pb-16 md:pt-8"
    >
      {/* Background photo (put your image at public/images/about-bg.jpg) */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/about-bg.jpg')" }}
      />
      {/* Red gradient overlay */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-[#B91C1C] via-[#D62828]/95 to-[#E53935]/85"
      />
      {/* Soft light swoosh */}
      <svg
        aria-hidden
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <path
          d="M0,260 C400,180 900,380 1440,200 L1440,400 L0,400 Z"
          fill="rgba(255,255,255,0.07)"
        />
      </svg>

      {/* Curved transition into the pink section below */}
      <svg
        aria-hidden
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-10 sm:h-16 w-full"
      >
        <path d="M0,62 C380,95 1000,70 1440,8 L1440,80 L0,80 Z" fill="#FFF4F5" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left */}
          <div className="lg:col-span-4 space-y-3">
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-black leading-snug tracking-tight">
              {lang === 'bn'
                ? 'মানবিক মূল্যবোধে গড়া ৯ বছরের অবিচল পথচলা'
                : '9 Years of Steadfast Humanitarian Service'}
            </h2>
            <p className="text-xs sm:text-sm text-red-50/90 leading-relaxed max-w-sm">
              {lang === 'bn'
                ? '২০১৮ সাল থেকে রৌমারী ও দুর্গম চরাঞ্চলের অসহায় মানুষের পাশে নির্ভরযোগ্য আশ্রয় হয়ে কাজ করছি।'
                : 'Serving flood and winter-affected river island char families in Rowmari since 2018.'}
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-red-50 px-6 py-2.5 text-xs sm:text-sm font-bold text-[#D62828] shadow-lg transition active:scale-[0.98]"
              >
                <span>{lang === 'bn' ? 'আমাদের সম্পর্কে জানুন' : 'About Us'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right: timeline */}
          <div className="lg:col-span-8 relative">
            {/* connecting line (through circle centers) */}
            <div
              aria-hidden
              className="hidden sm:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-white/60"
            />
            {/* small dots between circles */}
            {[25, 50, 75].map((left) => (
              <span
                key={left}
                aria-hidden
                className="hidden sm:block absolute top-8 -mt-[5px] w-2.5 h-2.5 rounded-full bg-white shadow"
                style={{ left: `${left}%`, transform: 'translateX(-50%)' }}
              />
            ))}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 relative z-10">
              {milestones.map((m, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.38, delay: idx * 0.1, ease: 'easeOut' }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-white text-[#D62828] font-black text-sm flex items-center justify-center shadow-lg ring-[6px] ring-white/25">
                    {lang === 'bn' ? m.year : m.yearEn}
                  </div>
                  <div className="mt-3 text-lg sm:text-xl font-black text-white leading-none">
                    {lang === 'bn' ? m.year : m.yearEn}
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm font-medium text-red-50/95">
                    {lang === 'bn' ? m.titleBn : m.titleEn}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}