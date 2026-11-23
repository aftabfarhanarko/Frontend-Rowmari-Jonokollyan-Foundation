'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TEAM_MEMBERS } from '@/data/mockData';
import { Language } from '@/types';

export default function TeamPage() {
  const [lang, setLang] = useState<Language>('bn');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBF9] text-[#1E293B]">
      <Navbar lang={lang} onToggleLang={() => setLang(l => l === 'bn' ? 'en' : 'bn')} />

      <main className="flex-1">
        {/* Banner */}
        <section className="bg-gradient-to-b from-emerald-900 to-[#0A4F2E] text-white py-16 md:py-20 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold mb-3 border border-emerald-700">
              {lang === 'bn' ? 'নেতৃত্ব ও সাংগঠনিক কাঠামো' : 'Leadership & Organization'}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              {lang === 'bn' ? 'আমাদের কার্যনির্বাহী টিম' : 'Our Dedicated Team'}
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              {lang === 'bn'
                ? 'রৌমারী জনকল্যাণ ফাউন্ডেশনের পরিচালনা কমিটি ও বিভিন্ন উইংয়ের দায়িত্বপ্রাপ্ত সমন্বয়কবৃন্দ।'
                : 'Meet the executive committee and specialized wing coordinators driving our humanitarian mission.'}
            </p>
          </div>
        </section>

        {/* Team Grid */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {TEAM_MEMBERS.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center text-2xl font-bold shrink-0">
                        👤
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-stone-900 leading-snug">
                          {lang === 'bn' ? member.nameBn : member.nameEn}
                        </h3>
                        <span className="inline-block text-xs font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md mt-1">
                          {lang === 'bn' ? member.roleBn : member.roleEn}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                      {lang === 'bn' ? member.bioBn : member.bioEn}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <span className="font-mono text-emerald-800 font-semibold">{member.phone}</span>
                    <span className="text-emerald-700 font-bold">✓ অনুমোদিত দায়িত্ব</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Volunteer Callout Box */}
            <div className="mt-16 bg-[#0A4F2E] text-white rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
                {lang === 'bn' ? 'আপনিও কি আমাদের টিমের সাথে কাজ করতে চান?' : 'Want to join our field volunteer team?'}
              </h2>
              <p className="text-sm text-emerald-100 max-w-xl mx-auto mb-6 leading-relaxed">
                {lang === 'bn'
                  ? 'রৌমারীর চরাঞ্চলে শীতবস্ত্র বিতরণ, মেডিকেল ক্যাম্প পরিচালনা বা রক্তের প্রয়োজনে আমাদের ভলান্টিয়ার নেটওয়ার্কে যোগ দিন।'
                  : 'Join our field volunteers in distribution, health camp logistics, or blood coordination.'}
              </p>
              <Link
                href="/volunteer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-emerald-900 font-bold text-sm shadow-md hover:bg-stone-100 transition"
              >
                <span>👥</span>
                <span>{lang === 'bn' ? 'স্বেচ্ছাসেবক আবেদন করুন' : 'Apply as Volunteer'}</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
