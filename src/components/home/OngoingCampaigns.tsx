'use client';

import React from 'react';
import Link from 'next/link';
import { Target, Clock, Users, CheckCircle2, ArrowRight, HeartHandshake } from 'lucide-react';
import { Language } from '@/types';
import { useGetCampaignsQuery } from '@/store/api/campaignsApi';
import { CAMPAIGNS_DATA } from '@/data/mockData';

interface OngoingCampaignsProps {
  lang: Language;
}

export default function OngoingCampaigns({ lang }: OngoingCampaignsProps) {
  const { data: apiCampaigns = [], isLoading, isError } = useGetCampaignsQuery();
  const campaigns = (apiCampaigns && apiCampaigns.length > 0) ? apiCampaigns : CAMPAIGNS_DATA;

  const toBnNum = (n: number | string) =>
    n.toString().replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[parseInt(d, 10)]);

  return (
    <section id="campaigns" className="py-12 md:py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200/80 text-[#D62828] text-xs font-bold mb-3 shadow-2xs">
              <Target className="w-3.5 h-3.5 text-[#D62828]" />
              <span>{lang === 'bn' ? 'সুনির্দিষ্ট লক্ষ্যভিত্তিক সেবা কর্মসূচি' : 'Target-Driven Humanitarian Missions'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#E53935] tracking-tight">
              {lang === 'bn' ? 'চলমান মানবিক ও ত্রাণ কার্যক্রম' : 'Ongoing Relief & Welfare Initiatives'}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-stone-600 mt-1 max-w-2xl leading-relaxed">
              {lang === 'bn'
                ? 'রৌমারীর প্রত্যন্ত চরাঞ্চলের অসহায় পরিবারের জন্য সুনির্দিষ্ট লক্ষ্যমাত্রা অনুযায়ী সরাসরি সেবা পৌঁছে দেওয়ার চলমান উদ্যোগ।'
                : 'Direct field operations delivering verified relief and essential care to river-char families in Kurigram.'}
            </p>
          </div>

          <Link
            href="/activities"
            className="text-xs sm:text-sm font-bold text-[#D62828] hover:text-[#B91C1C] self-start sm:self-auto cursor-pointer flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50/80 border border-red-200/60 hover:bg-red-100/70 transition shadow-2xs"
          >
            <span>{lang === 'bn' ? 'সকল কার্যক্রম দেখুন' : 'Explore All Activities'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {isLoading ? (
            <p className="col-span-full text-center py-10 text-stone-500 font-medium">লোড হচ্ছে...</p>
          ) : null}

          {campaigns.map((camp) => {
            // Target beneficiaries calculation (from amount or mock estimate)
            const targetBeneficiaries = Math.max(100, Math.round(camp.targetAmount / 250));
            const servedBeneficiaries = Math.min(targetBeneficiaries, Math.round(camp.raisedAmount / 250));
            const percentage = Math.min(100, Math.round((servedBeneficiaries / targetBeneficiaries) * 100));

            return (
              <div
                key={camp.id}
                className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-7 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Category Pill and Deadline */}
                  <div className="flex items-center justify-between text-xs font-semibold text-stone-500 mb-3">
                    <span className="bg-red-50 text-[#D62828] border border-red-200/70 px-3 py-1 rounded-lg font-bold">
                      {camp.category === 'winter'
                        ? (lang === 'bn' ? 'শীতবস্ত্র সেবা মিশন' : 'Winter Relief Mission')
                        : camp.category === 'medical'
                        ? (lang === 'bn' ? 'জরুরি চিকিৎসা সহায়তা' : 'Emergency Medical Support')
                        : (lang === 'bn' ? 'শিক্ষা ও মেধা বিকাশ' : 'Education & Skill Aid')}
                    </span>
                    <span className="flex items-center gap-1.5 text-stone-500 bg-stone-50 px-2.5 py-1 rounded-md border border-stone-200/60 text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>{lang === 'bn' ? `চলমান: ${camp.deadlineBn}` : `Schedule: ${camp.deadlineEn}`}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-stone-900 leading-snug mb-2 group-hover:text-[#D62828] transition-colors">
                    {lang === 'bn' ? camp.titleBn : camp.titleEn}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6 font-normal">
                    {lang === 'bn' ? camp.descriptionBn : camp.descriptionEn}
                  </p>

                  {/* Beneficiary Progress Bar */}
                  <div className="space-y-2.5 mb-6 p-4 rounded-xl bg-stone-50/80 border border-stone-200/70">
                    <div className="flex justify-between text-xs font-bold text-stone-800">
                      <span className="text-[#D62828] flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-[#D62828]" />
                        <span>
                          {lang === 'bn' ? 'সেবাপ্রাপ্ত পরিবার:' : 'Served:'}{' '}
                          <span className="font-extrabold">{lang === 'bn' ? toBnNum(servedBeneficiaries) : servedBeneficiaries}</span>
                        </span>
                      </span>
                      <span className="text-stone-600">
                        {lang === 'bn' ? 'লক্ষ্যমাত্রা:' : 'Target:'}{' '}
                        <span className="font-bold">{lang === 'bn' ? toBnNum(targetBeneficiaries) : targetBeneficiaries}</span> ({lang === 'bn' ? toBnNum(percentage) : percentage}%)
                      </span>
                    </div>

                    {/* Styled Progress Line */}
                    <div className="w-full h-3 bg-stone-200/80 rounded-full overflow-hidden p-0.5">
                      <div
                        className="h-full bg-linear-to-r from-[#D62828] via-red-600 to-red-500 rounded-full transition-all duration-700 shadow-xs"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-stone-500 pt-0.5">
                      <span className="flex items-center gap-1 text-red-800 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-600" />
                        <span>{lang === 'bn' ? 'মাঠপর্যায়ে সরাসরি বিতরণ' : 'Direct Ground Distribution'}</span>
                      </span>
                      <span>
                        {percentage >= 100
                          ? (lang === 'bn' ? 'লক্ষ্যমাত্রা পূর্ণ' : 'Target Achieved')
                          : (lang === 'bn' ? 'বিতরণ চলমান' : 'Distribution Active')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA & Notice */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                  <span className="text-[11px] sm:text-xs text-stone-500 font-medium">
                    {lang === 'bn' ? 'রৌমারী সদর ও চরাঞ্চল শাখা' : 'Rowmari Sadar & Char Branch'}
                  </span>
                  <div className="flex items-center gap-2">
                    <Link
                      href="/donate"
                      className="px-4 py-2 rounded-xl bg-[#D62828] hover:bg-[#B91C1C] text-white font-semibold text-xs sm:text-sm transition shadow-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <Target className="w-4 h-4" />
                      <span>{lang === 'bn' ? 'অনুদান দিন' : 'Donate'}</span>
                    </Link>
                    <Link
                      href="/get-help"
                      className="px-3 py-2 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 font-semibold text-xs sm:text-sm transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <HeartHandshake className="w-4 h-4 text-[#D62828]" />
                      <span>{lang === 'bn' ? 'সহায়তার আবেদন' : 'Apply'}</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
