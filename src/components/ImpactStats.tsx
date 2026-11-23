'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Language } from '@/types';
import { IMPACT_STATS } from '@/data/mockData';

interface ImpactStatsProps {
  lang: Language;
}

export default function ImpactStats({ lang }: ImpactStatsProps) {
  return (
    <section className="py-16 md:py-20 bg-stone-50/70 border-y border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0D5C35] mb-2 tracking-tight">
            {lang === 'bn' ? 'আমাদের প্রভাব' : 'Our Real Impact'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-medium">
            {lang === 'bn'
              ? 'শুধু যাচাইকৃত সংখ্যা — তথ্যের স্বচ্ছতা ও জবাবদিহিতা নিশ্চিত'
              : 'Verified numbers only — ensuring transparency and trust'}
          </p>
        </div>

        {/* 4 Green Boxes matching the wireframe */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {IMPACT_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="bg-[#0A4F2E] text-white p-6 sm:p-7 rounded-2xl shadow-lg border border-emerald-800/60 text-center flex flex-col justify-between hover:scale-[1.02] transition-transform duration-200 relative overflow-hidden group"
            >
              {/* Subtle background glow */}
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-emerald-400/10 rounded-full blur-xl group-hover:bg-emerald-400/20 transition-all duration-300" />

              <div>
                <span className="text-3xl sm:text-4xl md:text-[42px] font-extrabold font-mono text-emerald-100 tracking-tight block mb-2">
                  [{lang === 'bn' ? stat.countBn : stat.countEn}]
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 leading-snug">
                  {lang === 'bn' ? stat.labelBn : stat.labelEn}
                </h3>
              </div>

              <p className="text-xs text-emerald-200/80 mt-3 pt-3 border-t border-emerald-800/80">
                {lang === 'bn' ? stat.descBn : stat.descEn}
              </p>
            </div>
          ))}
        </div>

        {/* Transparency Footnote */}
        <div className="mt-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-stone-200 text-[11px] text-stone-500 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>
              {lang === 'bn'
                ? 'প্রতিটি কার্যক্রমের নাম, সুবিধাভোগী তালিকা ও ব্যয়ের হিসাব নিরীক্ষিত ও সংরক্ষিত'
                : 'All beneficiary lists and expenditure audits are strictly archived'}
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
