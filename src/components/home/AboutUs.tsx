'use client';

import React from 'react';
import Link from 'next/link';
import { Landmark, Target, Eye, Clock } from 'lucide-react';
import { Language } from '@/types';
import { FOUNDATION_INFO } from '@/data/mockData';

interface AboutUsProps {
  lang: Language;
  onOpenAssistance: () => void;
  onOpenDonation?: () => void;
}

export default function AboutUs({
  lang,
  onOpenAssistance,
  onOpenDonation,
}: AboutUsProps) {
  const milestones = [
    {
      year: '২০১৮',
      yearEn: '2018',
      titleBn: 'ফাউন্ডেশনের যাত্রা শুরু',
      titleEn: 'Foundation Established',
      descBn: 'রৌমারীর একদল তরুণ ও সমাজসেবীদের উদ্যোগে দুর্গম চরাঞ্চলের শীতার্ত ও বন্যাপীড়িত মানুষের সেবায় আত্মপ্রকাশ।',
      descEn: 'Initiated by committed youths to serve flood-hit and winter-affected river island char families in Rowmari.',
    },
    {
      year: '২০২০',
      yearEn: '2020',
      titleBn: 'মহামারীকালীন খাদ্য ও জরুরি সহায়তা',
      titleEn: 'Pandemic Relief & Food Assistance',
      descBn: 'লকডাউনে কর্মহীন চরাঞ্চলের পরিবারগুলোর জন্য বাড়ি বাড়ি জরুরি খাদ্য ও স্বাস্থ্য সুরক্ষা সামগ্রী বিতরণ।',
      descEn: 'Dispatched emergency family food packs and sanitation relief kits across remote char settlements.',
    },
    {
      year: '২০২৩',
      yearEn: '2023',
      titleBn: 'মেডিকেল ও চক্ষু ক্যাম্প বিস্তার',
      titleEn: 'Free Healthcare & Eye Care Expansion',
      descBn: 'বিশেষজ্ঞ চিকিৎসকদের নিয়ে বিনামূল্যে ভ্রাম্যমাণ স্বাস্থ্য ক্যাম্প ও নিয়মিত শিক্ষাবৃত্তি কার্যক্রম প্রাতিষ্ঠানিক রূপ লাভ করে।',
      descEn: 'Institutionalized mobile healthcare camps, doctor consultations, and annual student scholarships.',
    },
    {
      year: '২০২৬',
      yearEn: '2026',
      titleBn: '৯ম বছরে পদার্পণ ও কেন্দ্রীয় ডিজিটাল ব্যবস্থাপনা',
      titleEn: '9th Year of Service & Digital Management',
      descBn: 'স্বচ্ছতা, স্বয়ংক্রিয় ট্র্যাকিং, সমন্বিত সেবা বিতরণ এবং আধুনিক ডিজিটাল ব্যবস্থার মাধ্যমে সেবার মান ও বিস্তার বৃদ্ধি।',
      descEn: 'Advancing with transparent digital tracking, verified donation receipts, and scalable service delivery.',
    },
  ];

  return (
    <section id="about" className="py-10 md:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Organization Story */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold">
              <Landmark className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'আমাদের পরিচিতি ও অঙ্গীকার' : 'About Our Foundation'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#E53935] leading-tight tracking-tight">
              {lang === 'bn'
                ? 'মানবিক মূল্যবোধে গড়া ৯ বছরের অবিচল পথচলা'
                : 'Nearly 9 Years of Steadfast Humanitarian Service'}
            </h2>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              {lang === 'bn'
                ? 'কুড়িগ্রাম জেলার ভারত সীমান্তবর্তী ও নদীবেষ্টিত রৌমারী উপজেলা একটি প্রাকৃতিক দুর্যোগপ্রবণ অঞ্চল। ব্রহ্মপুত্র ও জিঞ্জিরাম নদীর ভাঙন এবং শীতকালে হিমালয়ের কনকনে শৈত্যপ্রবাহ এখানকার মানুষের জীবনকে কঠিন করে তোলে। ২০১৮ সালে প্রতিষ্ঠার পর থেকে রৌমারী জনকল্যাণ ফাউন্ডেশন এই অসহায় মানুষের পাশে একটি বিশ্বস্ত আশ্রয় হয়ে কাজ করছে।'
                : 'Rowmari Upazila in Kurigram is a flood and cold-wave vulnerable border region surrounded by river island chars. Since its founding in 2018, Rowmari Janakalyan Foundation has served as a trusted beacon of hope for underprivileged families.'}
            </p>

            {/* Mission & Vision Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded-xl border border-stone-200 border-t-4 border-t-[#D62828] shadow-xs">
                <Target className="w-6 h-6 text-[#D62828] mb-2" />
                <h3 className="font-bold text-stone-900 text-sm mb-1">
                  {lang === 'bn' ? 'আমাদের লক্ষ্য (Mission)' : 'Our Mission'}
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  {lang === 'bn'
                    ? 'জরুরি চিকিৎসা, শীতবস্ত্র, খাদ্য ও শিক্ষা সহায়তার মাধ্যমে রৌমারীর প্রান্তিক জনগোষ্ঠীর জীবনমানের টেকসই উন্নয়ন নিশ্চিত করা।'
                    : 'Providing emergency medical, winter relief, nutrition and education support to uplift the marginalized communities of Rowmari.'}
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-stone-200 border-t-4 border-t-[#E53935] shadow-xs">
                <Eye className="w-6 h-6 text-[#E53935] mb-2" />
                <h3 className="font-bold text-stone-900 text-sm mb-1">
                  {lang === 'bn' ? 'আমাদের স্বপ্ন (Vision)' : 'Our Vision'}
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  {lang === 'bn'
                    ? 'এমন একটি সমাজ যেখানে কোনো মানুষ বিনা চিকিৎসায় মারা যাবে না এবং শীত বা ক্ষুধায় কেউ কষ্টে থাকবে না।'
                    : 'A compassionate society where no human suffers untreated disease, freezing cold, or starvation.'}
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenAssistance}
                className="px-5 py-2.5 rounded-xl bg-[#D62828] hover:bg-[#B91C1C] text-white font-semibold text-xs sm:text-sm transition shadow-sm cursor-pointer"
              >
                {lang === 'bn' ? 'সহায়তার আবেদন করুন' : 'Request Assistance'}
              </button>
              <Link
                href="/volunteer"
                className="px-5 py-2.5 rounded-xl bg-[#E53935] hover:bg-[#D32F2F] text-white font-semibold text-xs sm:text-sm transition shadow-sm cursor-pointer"
              >
                {lang === 'bn' ? 'স্বেচ্ছাসেবক হিসেবে যুক্ত হোন' : 'Join as Volunteer'}
              </Link>
            </div>
          </div>

          {/* Right Column: Timeline / Milestones */}
          <div className="lg:col-span-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-md">
              <h3 className="text-lg font-bold text-stone-900 mb-6 flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-800" />
                <span>{lang === 'bn' ? 'প্রতিষ্ঠার ঐতিহাসিক সময়রেখা' : 'Our Timeline & Milestones'}</span>
              </h3>

              <div className="relative pl-6 space-y-7 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-red-200">
                {milestones.map((m, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-red-700 ring-4 ring-white" />
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold font-mono bg-red-100 text-red-800 mb-1">
                        {lang === 'bn' ? m.year : m.yearEn}
                      </span>
                      <h4 className="text-sm font-bold text-stone-900 leading-snug">
                        {lang === 'bn' ? m.titleBn : m.titleEn}
                      </h4>
                      <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                        {lang === 'bn' ? m.descBn : m.descEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 text-[11px] text-stone-400">
                <span>{FOUNDATION_INFO.registrationNoBn}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
