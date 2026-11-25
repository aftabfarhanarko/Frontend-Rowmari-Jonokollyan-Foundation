'use client';

import React from 'react';
import { CheckCircle2, Users, HeartHandshake, Droplet, Sparkles } from 'lucide-react';
import { Language } from '@/types';
import { IMPACT_STATS } from '@/data/mockData';
import { useGetPublicSummaryQuery } from '@/store/api/dashboardApi';

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
      descBn: IMPACT_STATS[0].descBn,
      descEn: IMPACT_STATS[0].descEn,
      accent: 'emerald',
    },
    {
      icon: Sparkles,
      countBn: IMPACT_STATS[1].countBn,
      countEn: IMPACT_STATS[1].countEn,
      labelBn: IMPACT_STATS[1].labelBn,
      labelEn: IMPACT_STATS[1].labelEn,
      descBn: IMPACT_STATS[1].descBn,
      descEn: IMPACT_STATS[1].descEn,
      accent: 'emerald',
    },
    {
      icon: Droplet,
      countBn: summary?.registeredBloodDonors ? `${toBnNum(summary.registeredBloodDonors)}+` : IMPACT_STATS[2].countBn,
      countEn: summary?.registeredBloodDonors ? `${summary.registeredBloodDonors}+` : IMPACT_STATS[2].countEn,
      labelBn: IMPACT_STATS[2].labelBn,
      labelEn: IMPACT_STATS[2].labelEn,
      descBn: IMPACT_STATS[2].descBn,
      descEn: IMPACT_STATS[2].descEn,
      accent: 'red',
    },
    {
      icon: HeartHandshake,
      countBn: summary?.activeVolunteers ? `${toBnNum(summary.activeVolunteers)}+` : IMPACT_STATS[3].countBn,
      countEn: summary?.activeVolunteers ? `${summary.activeVolunteers}+` : IMPACT_STATS[3].countEn,
      labelBn: IMPACT_STATS[3].labelBn,
      labelEn: IMPACT_STATS[3].labelEn,
      descBn: IMPACT_STATS[3].descBn,
      descEn: IMPACT_STATS[3].descEn,
      accent: 'emerald',
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[#0D5C35] text-xs font-bold mb-3 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{lang === 'bn' ? 'স্বচ্ছ ও যাচাইকৃত পরিসংখ্যান' : 'Transparent & Verified Statistics'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#E53935] tracking-tight mb-3">
            {lang === 'bn' ? 'আমাদের মাঠপর্যায়ের বাস্তব প্রভাব' : 'Our Real On-Ground Impact'}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-stone-600 font-medium leading-relaxed">
            {lang === 'bn'
              ? 'কুড়িগ্রাম জেলার রৌমারী ও দুর্গম চরাঞ্চলে প্রত্যক্ষ যাচাইকৃত সেবা — প্রতিটি তথ্যের শতভাগ জবাবদিহিতা সংরক্ষিত।'
              : 'Direct verified service delivery across Rowmari and river-char communities with complete accountability.'}
          </p>
        </div>

        {/* 4 Premium Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {displayStats.map((stat, idx) => {
            const Icon = stat.icon;
            const isRedAccent = stat.accent === 'red';
            return (
              <div
                key={idx}
                className="bg-gradient-to-b from-[#0D5C35] via-[#0b4e2d] to-[#07361e] text-white p-6 sm:p-7 rounded-2xl shadow-xl border border-emerald-700/50 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1.5 hover:border-emerald-400/60 transition-all duration-300 relative overflow-hidden group"
              >
                {/* Subtle radial ambient glow */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-400/15 rounded-full blur-2xl group-hover:bg-emerald-400/30 transition-all duration-500 pointer-events-none" />

                <div>
                  {/* Top Header of Card: Icon & Verified Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center backdrop-blur-md border ${
                        isRedAccent
                          ? 'bg-red-500/20 border-red-400/30 text-rose-200'
                          : 'bg-white/10 border-white/20 text-emerald-200'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-300 bg-emerald-950/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {lang === 'bn' ? 'যাচাইকৃত' : 'Verified'}
                    </span>
                  </div>

                  {/* Number - Clean, Large, Bold without brackets */}
                  <div className="text-3xl sm:text-4xl md:text-[42px] font-black text-white tracking-tight leading-none mb-2 font-sans drop-shadow-xs">
                    {lang === 'bn' ? stat.countBn : stat.countEn}
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 leading-snug">
                    {lang === 'bn' ? stat.labelBn : stat.labelEn}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs text-emerald-100/80 mt-4 pt-3.5 border-t border-emerald-700/60 leading-relaxed font-normal">
                  {lang === 'bn' ? stat.descBn : stat.descEn}
                </p>
              </div>
            );
          })}
        </div>

        {/* Transparency Footnote */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-50 border border-stone-200 text-xs text-stone-600 shadow-2xs font-medium">
            <CheckCircle2 className="w-4 h-4 text-[#0D5C35] shrink-0" />
            <span>
              {lang === 'bn'
                ? 'রৌমারী জনকল্যাণ ফাউন্ডেশনের প্রতিটি কার্যক্রমের সুবিধাভোগী তথ্য ও হিসাব স্বচ্ছতার সাথে সংরক্ষিত।'
                : 'All beneficiary registries, welfare reports, and field audits are strictly documented and verified.'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
