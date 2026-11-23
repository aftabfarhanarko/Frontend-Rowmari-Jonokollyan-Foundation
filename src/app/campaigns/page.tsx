'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Clock, Users, CheckCircle2, Heart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CAMPAIGNS_DATA } from '@/data/mockData';
import { Language } from '@/types';

export default function CampaignsPage() {
  const [lang, setLang] = useState<Language>('bn');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBF9] text-[#1E293B]">
      <Navbar lang={lang} onToggleLang={() => setLang(l => l === 'bn' ? 'en' : 'bn')} />

      <main className="flex-1">
        {/* Banner */}
        <section className="bg-gradient-to-b from-emerald-900 to-[#0A4F2E] text-white py-16 md:py-20 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold mb-3 border border-emerald-700">
              {lang === 'bn' ? 'লক্ষ্যভিত্তিক তহবিল সংগ্রহ' : 'Targeted Fundraising'}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              {lang === 'bn' ? 'চলমান ও বিশেষ ক্যাম্পেইন' : 'Our Campaigns'}
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              {lang === 'bn'
                ? 'রৌমারীর অসহায় মানুষের সুনির্দিষ্ট চাহিদা পূরণে প্রতিটি ক্যাম্পেইনে সরাসরি অংশ নিন।'
                : 'Directly fund specific community relief projects with 100% verified transparency.'}
            </p>
          </div>
        </section>

        {/* Campaigns List */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {CAMPAIGNS_DATA.map((camp) => {
                const percentage = Math.min(
                  100,
                  Math.round((camp.raisedAmount / camp.targetAmount) * 100)
                );
                return (
                  <div
                    key={camp.id}
                    className="bg-white rounded-3xl border border-stone-200 p-7 sm:p-8 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-semibold text-stone-500 mb-3">
                        <span className="bg-emerald-50 text-emerald-800 px-3 py-1 rounded-md font-bold text-xs">
                          {camp.category === 'winter' ? 'শীতবস্ত্র তহবিল' : camp.category === 'medical' ? 'স্বাস্থ্যসেবা ও অ্যাম্বুলেন্স' : 'শিক্ষাবৃত্তি'}
                        </span>
                        <span className="text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-amber-700" />
                          <span>{lang === 'bn' ? `মেয়াদ: ${camp.deadlineBn}` : `Deadline: ${camp.deadlineEn}`}</span>
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-stone-900 leading-snug mb-3">
                        {lang === 'bn' ? camp.titleBn : camp.titleEn}
                      </h3>

                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                        {lang === 'bn' ? camp.descriptionBn : camp.descriptionEn}
                      </p>

                      {/* Progress Bar & Financials */}
                      <div className="space-y-2 mb-6 p-4 bg-stone-50 rounded-2xl border border-stone-200">
                        <div className="flex justify-between text-xs sm:text-sm font-bold">
                          <span className="text-emerald-900">
                            {lang === 'bn' ? 'সংগৃহীত:' : 'Raised:'} ৳ {camp.raisedAmount.toLocaleString()}
                          </span>
                          <span className="text-stone-500">
                            {lang === 'bn' ? 'লক্ষ্য:' : 'Goal:'} ৳ {camp.targetAmount.toLocaleString()} ({percentage}%)
                          </span>
                        </div>

                        <div className="w-full h-3.5 bg-stone-200 rounded-full overflow-hidden p-0.5">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>

                        <div className="flex justify-between text-[11px] text-stone-500 pt-1">
                          <span className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                            <span>{camp.donorsCount} জন মহানুভব দাতা অনুদান দিয়েছেন</span>
                          </span>
                          <span className="text-emerald-700 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                            <span>অডিটযোগ্য রেকর্ড</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-xs text-stone-500">
                        বিকাশ / নগদ / ব্যাংক ট্রান্সফার
                      </span>
                      <Link
                        href="/donate"
                        className="px-6 py-3 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs sm:text-sm transition shadow-md flex items-center gap-2"
                      >
                        <Heart className="w-4 h-4 fill-white text-white shrink-0" />
                        <span>{lang === 'bn' ? 'এই তহবিলে অনুদান দিন' : 'Donate Now'}</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
