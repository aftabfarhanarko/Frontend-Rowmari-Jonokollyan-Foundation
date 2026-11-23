'use client';

import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { NEWS_EVENTS } from '@/data/mockData';
import { Language } from '@/types';

export default function NewsPage() {
  const [lang, setLang] = useState<Language>('bn');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBF9] text-[#1E293B]">
      <Navbar lang={lang} onToggleLang={() => setLang(l => l === 'bn' ? 'en' : 'bn')} />

      <main className="flex-1">
        {/* Banner */}
        <section className="bg-gradient-to-b from-emerald-900 to-[#0A4F2E] text-white py-16 md:py-20 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold mb-3 border border-emerald-700">
              {lang === 'bn' ? 'আপডেট ও সময়সূচি' : 'Updates & Press'}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              {lang === 'bn' ? 'সংবাদ, ইভেন্ট ও বিজ্ঞপ্তি' : 'News & Announcements'}
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              {lang === 'bn'
                ? 'রৌমারী জনকল্যাণ ফাউন্ডেশনের সাম্প্রতিক কার্যক্রমের সংবাদ ও আসন্ন কর্মসূচি।'
                : 'Stay informed with upcoming camps, press announcements, and activity reports.'}
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {NEWS_EVENTS.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs hover:shadow-md transition flex flex-col sm:flex-row gap-6 items-start"
              >
                <div className="shrink-0 w-full sm:w-36 text-center sm:text-left">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${
                      item.type === 'event'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    }`}
                  >
                    {item.type === 'event'
                      ? lang === 'bn' ? 'আসন্ন ইভেন্ট' : 'Upcoming Event'
                      : lang === 'bn' ? 'প্রেস রিলিজ' : 'Press News'}
                  </span>
                  <p className="text-xs font-bold text-stone-900">{lang === 'bn' ? item.dateBn : item.dateEn}</p>
                  <p className="text-xs text-stone-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{lang === 'bn' ? item.locationBn : item.locationEn}</span>
                  </p>
                </div>

                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-stone-900 leading-snug mb-2 hover:text-emerald-800 transition">
                    {lang === 'bn' ? item.titleBn : item.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {lang === 'bn' ? item.summaryBn : item.summaryEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
