'use client';

import React from 'react';
import Link from 'next/link';
import { Target, Clock, Heart, Users, CheckCircle2 } from 'lucide-react';
import { Language } from '@/types';
import { useGetCampaignsQuery } from '@/store/api/campaignsApi';

interface OngoingCampaignsProps {
  lang: Language;
  onOpenDonation?: (campaignId?: string) => void;
}

export default function OngoingCampaigns({
  lang,
  onOpenDonation,
}: OngoingCampaignsProps) {
  const { data: campaigns = [], isLoading, isError } = useGetCampaignsQuery();
  return (
    <section id="campaigns" className="py-10 md:py-14 bg-stone-50/40 border-t border-stone-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
              <Target className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'চলমান ক্যাম্পেইন' : 'Active Campaigns'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#E53935] tracking-tight">
              {lang === 'bn' ? 'জরুরি মানবকল্যাণ তহবিলসমূহ' : 'Ongoing Humanitarian Funds'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {lang === 'bn'
                ? 'নির্দিষ্ট লক্ষ্যভিত্তিক ক্যাম্পেইনে সরাসরি আপনার সহায়তা পৌঁছে দিন'
                : 'Directly support targeted campaigns with full fund transparency'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {isLoading ? <p className="col-span-full text-center">Loading campaigns…</p> : null}
          {isError ? <p role="alert" className="col-span-full text-center">Campaigns could not be loaded.</p> : null}
          {!isLoading && !isError && campaigns.length === 0 ? <p className="col-span-full text-center">No campaigns are currently available.</p> : null}
          {campaigns.map((camp) => {
            const percentage = Math.min(
              100,
              Math.round((camp.raisedAmount / camp.targetAmount) * 100)
            );
            return (
              <div
                key={camp.id}
                className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-stone-500 mb-2">
                    <span className="bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-md font-bold">
                      {camp.category === 'winter' ? 'শীতবস্ত্র তহবিল' : 'স্বাস্থ্যসেবা ও অ্যাম্বুলেন্স'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>{lang === 'bn' ? `মেয়াদ: ${camp.deadlineBn}` : `Deadline: ${camp.deadlineEn}`}</span>
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-stone-900 leading-snug mb-3">
                    {lang === 'bn' ? camp.titleBn : camp.titleEn}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                    {lang === 'bn' ? camp.descriptionBn : camp.descriptionEn}
                  </p>

                  {/* Progress Bar */}
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-xs font-bold text-stone-700">
                      <span className="text-emerald-800">
                        {lang === 'bn' ? 'সংগৃহীত:' : 'Raised:'} ৳ {camp.raisedAmount.toLocaleString()}
                      </span>
                      <span className="text-stone-500">
                        {lang === 'bn' ? 'লক্ষ্য:' : 'Goal:'} ৳ {camp.targetAmount.toLocaleString()} ({percentage}%)
                      </span>
                    </div>

                    <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden p-0.5 border border-stone-200">
                      <div
                        className="h-full bg-gradient-to-r from-[#0D5C35] to-[#0A4F2E] rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-[11px] text-stone-500">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-stone-400" />
                        <span>{camp.donorsCount} {lang === 'bn' ? 'জন মহানুভব দাতা' : 'generous donors'}</span>
                      </span>
                      <span className="font-semibold text-[#0D5C35] flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-[#0D5C35]" />
                        <span>{lang === 'bn' ? 'সরাসরি অডিট রিপোর্ট প্রযোজ্য' : 'Reconciled in Audit'}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs text-stone-500">
                    {lang === 'bn' ? 'ফাউন্ডেশনের প্রত্যক্ষ তত্ত্বাবধানে পরিচালিত' : 'Directly Supervised by RJF'}
                  </span>
                  <Link
                    href="/get-help"
                    className="px-5 py-2.5 rounded-xl bg-[#0D5C35] hover:bg-[#094527] text-white font-semibold text-xs sm:text-sm transition shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white text-white" />
                    <span>{lang === 'bn' ? 'সহায়তার আবেদন' : 'Apply for Aid'}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
