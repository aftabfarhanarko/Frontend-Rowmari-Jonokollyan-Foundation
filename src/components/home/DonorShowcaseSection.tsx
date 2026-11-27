'use client';

import React from 'react';
import { Heart, Users, Target, ShieldCheck, Sparkles, Award } from 'lucide-react';
import { useGetPublicApprovedDonorsQuery, useGetPublicDonationStatsQuery } from '@/store/api/donationsApi';
import { Language } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

interface DonorShowcaseSectionProps {
  lang: Language;
}

export default function DonorShowcaseSection({ lang }: DonorShowcaseSectionProps) {
  const { data: donors = [], isLoading } = useGetPublicApprovedDonorsQuery({ limit: 12 });
  const { data: stats } = useGetPublicDonationStatsQuery();

  const toBn = (num: number | string) =>
    num.toString().replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[parseInt(d, 10)]);

  return (
    <section className="py-14 sm:py-20 bg-stone-50/70 border-t border-b border-stone-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[#D62828] text-xs font-bold mb-3 shadow-2xs">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>{lang === 'bn' ? 'স্বচ্ছ ও যাচাইকৃত অবদান' : 'Verified Contributions'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight">
            {lang === 'bn' ? 'মানবতার পাশে যারা দাঁড়িয়েছেন' : 'Standing by Humanity'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
            {lang === 'bn'
              ? 'আপনাদের ভালোবাসা ও সহযোগিতায় অসহায় মানুষের পাশে দাঁড়ানো সম্ভব হচ্ছে। প্রতিটি অনুদানই আমাদের এগিয়ে যাওয়ার অনুপ্রেরণা।'
              : 'Your selfless support empowers our ground relief and medical missions for underprivileged families.'}
          </p>
        </div>

        {/* 4 Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-12">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs text-center">
            <div className="w-9 h-9 mx-auto rounded-xl bg-red-50 text-[#D62828] flex items-center justify-center mb-2">
              <Heart className="w-4 h-4" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-stone-900">
              ৳ {toBn((stats?.totalApprovedAmount || 3500).toLocaleString('en-US'))}
            </div>
            <p className="text-xs text-stone-500 font-semibold mt-0.5">
              {lang === 'bn' ? 'সর্বমোট অনুমোদিত অনুদান' : 'Total Approved Funds'}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs text-center">
            <div className="w-9 h-9 mx-auto rounded-xl bg-red-50 text-[#D62828] flex items-center justify-center mb-2">
              <Users className="w-4 h-4" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-stone-900">
              {toBn(stats?.verifiedDonors || 2)} জন
            </div>
            <p className="text-xs text-stone-500 font-semibold mt-0.5">
              {lang === 'bn' ? 'যাচাইকৃত অনুদানদাতা' : 'Verified Donors'}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs text-center">
            <div className="w-9 h-9 mx-auto rounded-xl bg-red-50 text-[#D62828] flex items-center justify-center mb-2">
              <Target className="w-4 h-4" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-stone-900">
              {toBn(1)} টি
            </div>
            <p className="text-xs text-stone-500 font-semibold mt-0.5">
              {lang === 'bn' ? 'চলমান ক্যাম্পেইন' : 'Active Campaigns'}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs text-center">
            <div className="w-9 h-9 mx-auto rounded-xl bg-red-50 text-[#D62828] flex items-center justify-center mb-2">
              <Award className="w-4 h-4" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-stone-900">
              ১০০%
            </div>
            <p className="text-xs text-stone-500 font-semibold mt-0.5">
              {lang === 'bn' ? 'সরাসরি মাঠপর্যায়ে বিতরণ' : 'Direct Ground Delivery'}
            </p>
          </div>
        </div>

        {/* Approved Donors Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-stone-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D62828]" />
              <span>{lang === 'bn' ? 'সম্প্রতি অনুমোদিত শুভাকাঙ্ক্ষীদের তালিকা' : 'Recently Verified Donors'}</span>
            </h3>
            <span className="text-[11px] text-stone-500">
              {lang === 'bn' ? 'প্রশাসক দ্বারা সরাসরি ভেরিফায়েড' : 'Admin Verified'}
            </span>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, n) => (
                <div key={n} className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-2xs space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <Skeleton className="size-9 rounded-full shrink-0" />
                      <div className="space-y-1">
                        <Skeleton className="h-3.5 w-24 rounded-md" />
                        <Skeleton className="h-2.5 w-16 rounded-md" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-14 rounded-full" />
                  </div>
                  <div className="pt-2 border-t border-stone-100 flex justify-between items-center">
                    <Skeleton className="h-4 w-16 rounded-md" />
                    <Skeleton className="h-5 w-20 rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          ) : donors.length === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center text-stone-500 text-xs">
              {lang === 'bn' ? 'কোনো অনুমোদিত অনুদানের তালিকা পাওয়া যায়নি।' : 'No approved donations yet.'}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {donors.map((donor) => (
                <div
                  key={donor.id}
                  className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-2xs hover:border-red-200 hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="size-9 rounded-full bg-red-50 text-[#D62828] font-bold text-xs flex items-center justify-center shrink-0 border border-red-100">
                        {donor.donorName[0] || 'দ'}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-stone-900 leading-tight">
                          {donor.donorName}
                        </div>
                        <div className="text-[10px] text-stone-400 mt-0.5">
                          {new Date(donor.createdAt).toLocaleDateString('bn-BD')}
                        </div>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 text-[#D62828] text-[10px] font-bold border border-red-200 shrink-0">
                      <ShieldCheck className="w-3 h-3" />
                      <span>যাচাইকৃত</span>
                    </span>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-500 text-[11px] truncate max-w-[120px]">
                      {donor.campaignTitle}
                    </span>
                    <span className="font-black text-[#D62828]">
                      ৳ {toBn(donor.amount.toLocaleString('en-US'))}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
