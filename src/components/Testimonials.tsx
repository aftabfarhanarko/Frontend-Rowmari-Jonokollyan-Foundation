'use client';

import React from 'react';
import { Quote, CheckCircle2, Heart } from 'lucide-react';
import { Language } from '@/types';

interface Props {
  lang: Language;
}

const STORIES = [
  {
    nameBn: 'শহীদুল ইসলাম',
    nameEn: 'Shahidul Islam',
    roleBn: 'উপকারভোগী পরিবার, দাঁতভাঙ্গা চর',
    roleEn: 'Beneficiary, Datbhanga Char',
    typeBn: 'শীতবস্ত্র সেবা',
    typeEn: 'Winter Relief',
    bn: 'তীব্র শৈত্যপ্রবাহের সময় যখন কুয়াশায় নদী পার হওয়া অসম্ভব ছিল, তখন ফাউন্ডেশনের স্বেচ্ছাসেবকরা ট্রলারে করে চরে এসে আমাদের ঘরে ঘরে উন্নত কম্বল দিয়ে গেছেন। ছেলেমেয়েরা এখন নিশ্চিন্তে ঘুমাতে পারে।',
    en: 'During the harsh cold wave when crossing the river was almost impossible, volunteers arrived by boat to deliver warm blankets right to our doorsteps.',
  },
  {
    nameBn: 'মোছাঃ রোকেয়া বেগম',
    nameEn: 'Rokeya Begum',
    roleBn: 'চিকিৎসা সহায়তা গ্রহীতা, রৌমারী সদর',
    roleEn: 'Medical Aid Recipient',
    typeBn: 'চিকিৎসা সহায়তা',
    typeEn: 'Medical Aid',
    bn: 'রৌমারী হাসপাতালে প্রসূতি মেয়ের জরুরি চিকিৎসার দরকার ছিল। ফাউন্ডেশনের সহায়তায় দ্রুত প্রয়োজনীয় ওষুধ ও চিকিৎসা সহায়তার ব্যবস্থা হয়েছিল।',
    en: 'My daughter needed urgent medical assistance at Rowmari hospital. RJF quickly provided essential medicines and direct medical support.',
  },
  {
    nameBn: 'মাহমুদুল হাসান',
    nameEn: 'Mahmudul Hasan',
    roleBn: 'মাঠপর্যায়ের স্বেচ্ছাসেবক, রৌমারী',
    roleEn: 'Field Volunteer, Rowmari',
    typeBn: 'স্বেচ্ছাসেবক',
    typeEn: 'Volunteer',
    bn: 'এখানে কোনো রাজনীতি বা ব্যক্তিপ্রচারের সুযোগ নেই। আমরা প্রতিটি বাড়ি বাড়ি গিয়ে যাচাই করে শুধু প্রকৃত অসহায় ও অধিকারীদের হাতেই সেবা তুলে দিই। এই স্বচ্ছতাই আমার সবচেয়ে বড় অনুপ্রেরণা।',
    en: 'No publicity or bias. We visit every single family to verify genuine need before distributing aid. This pure transparency keeps us dedicated.',
  },
];

export default function Testimonials({ lang }: Props) {
  const t = (bn: string, en: string) => (lang === 'bn' ? bn : en);

  return (
    <section id="stories" className="py-12 md:py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[#0D5C35] text-xs font-bold mb-3 shadow-2xs">
            <Heart className="w-3.5 h-3.5 fill-[#0D5C35] text-[#0D5C35]" />
            <span>{t('বাস্তব অভিজ্ঞতা ও অনুপ্রেরণা', 'Real Testimonials & Voices')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#E53935] tracking-tight mb-2">
            {t('যাদের পাশে দাঁড়িয়েছি, তাদের কথা', 'Voices of Those We Serve')}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-medium">
            {t('উপকারভোগী পরিবার, চিকিৎসা সহায়তা গ্রহীতা ও নিবেদিত স্বেচ্ছাসেবকদের সরাসরি অনুভূতি।', 'Direct feedback from char beneficiaries, aid recipients and dedicated volunteers.')}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STORIES.map((s, idx) => (
            <figure
              key={idx}
              className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-7 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Accent Strip */}
              <div className="flex items-center justify-between mb-4">
                <Quote className="w-8 h-8 text-[#E53935]/80 group-hover:scale-110 transition-transform" />
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{lang === 'bn' ? s.typeBn : s.typeEn}</span>
                </span>
              </div>

              {/* Story Content */}
              <blockquote className="text-stone-700 text-sm sm:text-[14px] leading-relaxed flex-1 mb-6 font-normal">
                "{t(s.bn, s.en)}"
              </blockquote>

              {/* Author / Beneficiary Info */}
              <figcaption className="flex items-center gap-3 pt-4 border-t border-stone-100">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#0D5C35] to-[#084224] text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                  {t(s.nameBn, s.nameEn).charAt(0)}
                </div>
                <div className="min-w-0">
                  <span className="block text-sm font-bold text-stone-900 truncate">
                    {t(s.nameBn, s.nameEn)}
                  </span>
                  <span className="block text-xs text-stone-500 truncate">
                    {t(s.roleBn, s.roleEn)}
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
