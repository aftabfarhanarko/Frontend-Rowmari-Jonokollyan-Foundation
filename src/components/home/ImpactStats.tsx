'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, HeartHandshake, HeartPulse, ArrowRight } from 'lucide-react';
import { Language } from '@/types';
import { IMPACT_STATS } from '@/data/mockData';
import { useGetPublicSummaryQuery } from '@/store/api/dashboardApi';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

interface ImpactStatsProps {
  lang: Language;
}

export default function ImpactStats({ lang }: ImpactStatsProps) {
  const { data: summary } = useGetPublicSummaryQuery();

  const toBnNum = (n: number | string) =>
    n.toString().replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[parseInt(d, 10)]);

  const displayStats = [
    {
      icon: Users,
      countBn: summary?.applicationsApproved ? `${toBnNum(summary.applicationsApproved)}+` : IMPACT_STATS[0].countBn,
      countEn: summary?.applicationsApproved ? `${summary.applicationsApproved}+` : IMPACT_STATS[0].countEn,
      labelBn: IMPACT_STATS[0].labelBn,
      labelEn: IMPACT_STATS[0].labelEn,
    },
    {
      icon: ShieldCheck,
      countBn: IMPACT_STATS[1].countBn,
      countEn: IMPACT_STATS[1].countEn,
      labelBn: IMPACT_STATS[1].labelBn,
      labelEn: IMPACT_STATS[1].labelEn,
    },
    {
      icon: HeartPulse,
      countBn: IMPACT_STATS[2].countBn,
      countEn: IMPACT_STATS[2].countEn,
      labelBn: IMPACT_STATS[2].labelBn,
      labelEn: IMPACT_STATS[2].labelEn,
    },
    {
      icon: HeartHandshake,
      countBn: summary?.activeVolunteers ? `${toBnNum(summary.activeVolunteers)}+` : IMPACT_STATS[3].countBn,
      countEn: summary?.activeVolunteers ? `${summary.activeVolunteers}+` : IMPACT_STATS[3].countEn,
      labelBn: IMPACT_STATS[3].labelBn,
      labelEn: IMPACT_STATS[3].labelEn,
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-rose-50/90 via-[#FFF4F5] to-[#FFF4F5] pt-6 pb-5 md:pt-8 md:pb-6">
      {/* Full-bleed Curved Red Wave Background */}
      <svg
        aria-hidden
        viewBox="0 0 1440 420"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full hidden lg:block"
      >
        <defs>
          <linearGradient id="rjf-impact-wave" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#991B1B" />
            <stop offset="50%" stopColor="#D62828" />
            <stop offset="100%" stopColor="#E53935" />
          </linearGradient>
          <linearGradient id="rjf-impact-wave-outer" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D62828" />
            <stop offset="100%" stopColor="#FB7185" />
          </linearGradient>
        </defs>
        <path
          d="M0,18 C190,-10 380,45 500,155 C625,270 760,375 1060,365 C1240,360 1350,330 1440,305 L1440,420 L0,420 Z"
          fill="url(#rjf-impact-wave-outer)"
          opacity="0.22"
        />
        <path
          d="M0,32 C175,-5 340,55 455,175 C575,295 740,385 1080,375 C1260,370 1365,345 1440,325 L1440,420 L0,420 Z"
          fill="url(#rjf-impact-wave)"
        />
        {/* Bottom white-blush transition wave */}
        <path
          d="M0,385 C360,420 720,360 1080,395 C1260,412 1370,400 1440,390 L1440,420 L0,420 Z"
          fill="#FFF4F5"
        />
      </svg>

      {/* Mobile/Tablet Red Header Background */}
      <div
        aria-hidden
        className="lg:hidden absolute inset-x-0 top-0 h-56 bg-gradient-to-br from-[#991B1B] via-[#D62828] to-[#E53935] rounded-b-[36px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Title, Description, White Pill CTA */}
          <div className="lg:col-span-4 space-y-3.5 text-white">
            <h2 className="text-2xl sm:text-3xl font-black leading-snug tracking-tight drop-shadow-xs">
              {lang === 'bn'
                ? 'আমাদের মাঠপর্যায়ের বাস্তব প্রভাব'
                : 'Our Real On-Ground Impact'}
            </h2>
            <p className="text-xs sm:text-sm text-red-50/90 leading-relaxed max-w-sm">
              {lang === 'bn'
                ? 'কুড়িগ্রাম জেলার রৌমারী ও দুর্গম চরাঞ্চলে প্রত্যক্ষ যাচাইকৃত সেবা — প্রতিটি তথ্যের শতভাগ জবাবদিহিতা সংরক্ষিত।'
                : 'Direct verified service delivery across Rowmari and river-char communities with complete accountability.'}
            </p>
            <div className="pt-1">
              <Link
                href="/activities"
                className="inline-flex items-center gap-1.5 rounded-full bg-white hover:bg-red-50 px-5 py-2.5 text-xs sm:text-sm font-bold text-[#D62828] shadow-md transition active:scale-[0.98]"
              >
                <span>{lang === 'bn' ? 'বিস্তারিত জানুন' : 'Learn More'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: 4 White Rounded Stat Cards */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {displayStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: idx * 0.09, ease: 'easeOut' }}
                  className="bg-white/95 rounded-2xl p-4 sm:p-5 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center text-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-full bg-red-50 text-[#D62828] flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight leading-none">
                    <AnimatedCounter value={lang === 'bn' ? stat.countBn : stat.countEn} />
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-stone-600 mt-1.5 leading-snug">
                    {lang === 'bn' ? stat.labelBn : stat.labelEn}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
