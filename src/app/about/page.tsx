'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FOUNDATION_INFO } from '@/data/mockData';
import { Language } from '@/types';

export default function AboutPage() {
  const [lang, setLang] = useState<Language>('bn');

  const milestones = [
    {
      year: '২০১৮',
      yearEn: '2018',
      titleBn: 'ফাউন্ডেশনের যাত্রা শুরু',
      titleEn: 'Inception of Foundation',
      descBn: 'রৌমারীর একদল তরুণ ও সমাজসেবীদের উদ্যোগে দুর্গম চরাঞ্চলের শীতার্ত ও বন্যাপীড়িত মানুষের সেবায় আত্মপ্রকাশ।',
      descEn: 'Initiated by committed local youths to serve flood-hit and winter-affected river island char families in Rowmari.',
    },
    {
      year: '২০২০',
      yearEn: '2020',
      titleBn: 'জরুরি রক্তদাতা নেটওয়ার্ক ও করোনা খাদ্য সহায়তা',
      titleEn: 'Emergency Blood Network & Pandemic Relief',
      descBn: 'রৌমারী উপজেলা স্বাস্থ্য কমপ্লেক্সের রোগীদের জন্য সার্বক্ষণিক ব্লাড ডোনার গ্রুপ ও মহামারীকালীন জরুরি খাদ্য কর্মসূচি চালু।',
      descEn: 'Established 24/7 volunteer blood donor network and dispatched emergency pandemic rations.',
    },
    {
      year: '২০২৩',
      yearEn: '2023',
      titleBn: 'বিনামূল্যে স্বাস্থ্য ও চক্ষু ক্যাম্প বিস্তার',
      titleEn: 'Free Eye & Healthcare Camp Expansion',
      descBn: 'বিশেষজ্ঞ চিকিৎসকদের নিয়ে বিনামূল্যে ভ্রাম্যমাণ স্বাস্থ্য ক্যাম্প ও নিয়মিত শিক্ষাবৃত্তি কার্যক্রম প্রাতিষ্ঠানিক রূপ লাভ করে।',
      descEn: 'Institutionalized mobile healthcare camps, doctor consultations, and annual student scholarships.',
    },
    {
      year: '২০২৬',
      yearEn: '2026',
      titleBn: '৯ম বছরে পদার্পণ ও কেন্দ্রীয় ডিজিটাল ব্যবস্থাপনা',
      titleEn: '9th Year of Service & Digital Management',
      descBn: 'স্বচ্ছতা, স্বয়ংক্রিয় ট্র্যাকিং, নিরাপদ অনুদান এবং আধুনিক ডিজিটাল ব্যবস্থার মাধ্যমে সেবার মান ও বিস্তার বৃদ্ধি।',
      descEn: 'Advancing with transparent digital tracking, verified donation receipts, and scalable service delivery.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBF9] text-[#1E293B]">
      <Navbar lang={lang} onToggleLang={() => setLang(l => l === 'bn' ? 'en' : 'bn')} />

      <main className="flex-1">
        {/* Page Hero Banner */}
        <section className="bg-gradient-to-b from-emerald-900 to-[#0A4F2E] text-white py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold mb-3 border border-emerald-700">
              {lang === 'bn' ? 'পরিচিতি ও ইতিহাস' : 'About Our Foundation'}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              {lang === 'bn' ? 'আমাদের কথা' : 'About Us'}
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              {lang === 'bn'
                ? 'রৌমারীর সুবিধা ও চিকিৎসাবঞ্চিত চরাঞ্চলের মানুষের পাশে প্রায় ৯ বছরের মানবিক পথচলা।'
                : 'Over 8+ years of dedicated humanitarian service for underprivileged char dwellers in Rowmari.'}
            </p>
          </div>
        </section>

        {/* Detailed Narrative Section */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-7 space-y-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D5C35]">
                  {lang === 'bn' ? 'ফাউন্ডেশনের পটভূমি ও বাস্তবতা' : 'Our Background & Mission'}
                </h2>
                <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                  {lang === 'bn'
                    ? 'কুড়িগ্রাম জেলার ভারত সীমান্তবর্তী ও নদীবেষ্টিত রৌমারী উপজেলা একটি অত্যন্ত প্রাকৃতিক দুর্যোগপ্রবণ অঞ্চল। প্রতি বছর ব্রহ্মপুত্র, জিঞ্জিরাম ও কালজানি নদীর বিধ্বংসী ভাঙন ও বন্যায় শত শত পরিবার ভিটেমাটি হারায়। এছাড়া শীতকালে তীব্র শৈত্যপ্রবাহে সীমান্তবর্তী নদীদ্বীপগুলোর সাধারণ জীবন বিপর্যস্ত হয়ে পড়ে।'
                    : 'Rowmari Upazila in Kurigram is an isolated border region crisscrossed by the mighty Brahmaputra and Jinjiram rivers. River erosion and extreme winter cold waves severely distress underprivileged char families every year.'}
                </p>
                <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                  {lang === 'bn'
                    ? '২০১৮ সালে এই অবহেলিত মানুষের পাশে নিঃস্বার্থভাবে দাঁড়ানোর ব্রত নিয়ে প্রতিষ্ঠিত হয় "রৌমারী জনকল্যাণ ফাউন্ডেশন"। কোনো বাণিজ্যিক বা রাজনৈতিক উদ্দেশ্য ছাড়া, নিছক মানবিক তাগিদ থেকে আমরা কাজ করে যাচ্ছি শীতবস্ত্র বিতরণ, বিনামূল্যে চিকিৎসা ও ওষুধ প্রদান, মুমূর্ষু রোগীর রক্তদান সমন্বয় এবং দরিদ্র মেধাবী শিক্ষার্থীদের শিক্ষাবৃত্তির মতো মৌলিক ক্ষেত্রে।'
                    : 'Founded in 2018 with zero commercial or political affiliation, Rowmari Janakalyan Foundation is committed to providing winter clothing, free healthcare, blood donor coordination, and student scholarships to marginalized char residents.'}
                </p>

                {/* Core Values */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs">
                    <span className="text-2xl block mb-1">🤝</span>
                    <h4 className="font-bold text-stone-900 text-sm mb-1">{lang === 'bn' ? 'স্বচ্ছতা' : 'Transparency'}</h4>
                    <p className="text-xs text-stone-500">{lang === 'bn' ? 'প্রতিটি অনুদান ও ব্যয়ের পাই-টু-পাই নিরীক্ষিত হিসাব।' : 'Strict accounting and verified audit records for all funds.'}</p>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs">
                    <span className="text-2xl block mb-1">❤️</span>
                    <h4 className="font-bold text-stone-900 text-sm mb-1">{lang === 'bn' ? 'সহমর্মিতা' : 'Compassion'}</h4>
                    <p className="text-xs text-stone-500">{lang === 'bn' ? 'অসহায় মানুষের সম্মান ও মর্যাদাকে অগ্রাধিকার।' : 'Prioritizing dignity and privacy of beneficiaries.'}</p>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs">
                    <span className="text-2xl block mb-1">🛡️</span>
                    <h4 className="font-bold text-stone-900 text-sm mb-1">{lang === 'bn' ? 'নিরাপত্তা' : 'Data Privacy'}</h4>
                    <p className="text-xs text-stone-500">{lang === 'bn' ? 'রক্তদাতা ও সহায়তা প্রার্থীদের তথ্যের সর্বোচ্চ সুরক্ষা।' : 'Strict confidentiality of donor and applicant information.'}</p>
                  </div>
                </div>
              </div>

              {/* Sidebar: Affiliation & Timeline */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-md">
                  <h3 className="text-lg font-bold text-stone-900 mb-6 flex items-center gap-2">
                    <span>⏱️</span>
                    <span>{lang === 'bn' ? 'প্রতিষ্ঠার ঐতিহাসিক সময়রেখা' : 'Timeline of Milestones'}</span>
                  </h3>
                  <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-200">
                    {milestones.map((m, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-emerald-700 ring-4 ring-white" />
                        <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                          {lang === 'bn' ? m.year : m.yearEn}
                        </span>
                        <h4 className="text-sm font-bold text-stone-900 mt-1 leading-snug">
                          {lang === 'bn' ? m.titleBn : m.titleEn}
                        </h4>
                        <p className="text-xs text-stone-500 mt-1">{lang === 'bn' ? m.descBn : m.descEn}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-4 border-t border-stone-100 text-xs text-stone-500 space-y-1">
                    <p>🏛️ <strong>নিবন্ধন:</strong> {FOUNDATION_INFO.registrationNoBn}</p>
                    <p>📍 <strong>কার্যালয়:</strong> {FOUNDATION_INFO.addressBn}</p>
                  </div>
                </div>

                <div className="p-6 bg-emerald-900 text-white rounded-2xl shadow-md">
                  <h3 className="font-bold text-base mb-2">{lang === 'bn' ? 'আমাদের কার্যক্রমে যুক্ত হতে চান?' : 'Want to Get Involved?'}</h3>
                  <p className="text-xs text-emerald-200 mb-4">{lang === 'bn' ? 'আপনার সামর্থ্য অনুযায়ী সহায়তা অথবা স্বেচ্ছাসেবা নিয়ে দাঁড়ান।' : 'Contribute your time or donation to transform lives in Rowmari.'}</p>
                  <div className="flex gap-2">
                    <Link href="/donate" className="px-4 py-2 bg-white text-emerald-950 font-bold text-xs rounded-lg hover:bg-stone-100 transition">
                      {lang === 'bn' ? 'অনুদান দিন' : 'Donate'}
                    </Link>
                    <Link href="/volunteer" className="px-4 py-2 border border-white text-white font-bold text-xs rounded-lg hover:bg-white/10 transition">
                      {lang === 'bn' ? 'স্বেচ্ছাসেবক হোন' : 'Volunteer'}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
