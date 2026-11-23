'use client';

import React from 'react';
import { Quote } from 'lucide-react';
import { Language } from '@/types';
import { GlassSection, SectionHeading, glassCardHover } from '@/components/ui/glass';

interface Props {
  lang: Language;
}

// SAMPLE CONTENT: replace with real, permission-approved stories before publishing.
const STORIES = [
  {
    nameBn: 'উপকারভোগী পরিবার',
    nameEn: 'Beneficiary family',
    roleBn: 'চর এলাকা, রৌমারী',
    roleEn: 'River island char, Rowmari',
    bn: 'শীতের রাতে কম্বল পেয়ে ছেলেমেয়েরা প্রথমবার নিশ্চিন্তে ঘুমাতে পেরেছে।',
    en: 'With a blanket on a cold winter night, our children could finally sleep without worry.',
  },
  {
    nameBn: 'রক্তগ্রহীতার স্বজন',
    nameEn: 'Blood recipient’s relative',
    roleBn: 'কুড়িগ্রাম',
    roleEn: 'Kurigram',
    bn: 'রাতে জরুরি রক্তের দরকার হয়েছিল। ফাউন্ডেশনের মাধ্যমে কয়েক ঘণ্টার মধ্যেই দাতা পেয়েছি।',
    en: 'We needed blood urgently at night. Through the foundation we found a donor within hours.',
  },
  {
    nameBn: 'স্বেচ্ছাসেবক',
    nameEn: 'Volunteer',
    roleBn: 'রৌমারী শাখা',
    roleEn: 'Rowmari branch',
    bn: 'নিজের চোখে দেখেছি সহায়তা ঠিক মানুষটির হাতে পৌঁছাচ্ছে। এটাই আমাকে যুক্ত রেখেছে।',
    en: 'I have seen help reach exactly the right person. That is what keeps me involved.',
  },
];

export default function Testimonials({ lang }: Props) {
  const t = (bn: string, en: string) => (lang === 'bn' ? bn : en);
  return (
    <GlassSection id="stories">
      <SectionHeading
        title={t('যাদের পাশে দাঁড়িয়েছি, তাদের কথা', 'In their own words')}
        subtitle={t('উপকারভোগী, দাতা ও স্বেচ্ছাসেবকদের অভিজ্ঞতা।', 'Experiences from beneficiaries, donors and volunteers.')}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {STORIES.map((s) => (
          <figure key={s.nameEn} className={`${glassCardHover} p-6 md:p-7 flex flex-col gap-5`}>
            <Quote className="w-8 h-8 text-[#E53935]/70" />
            <blockquote className="text-stone-800 leading-relaxed flex-1">{t(s.bn, s.en)}</blockquote>
            <figcaption className="flex items-center gap-3 pt-4 border-t border-white/70">
              <span className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0D5C35] to-emerald-500 text-white flex items-center justify-center font-bold text-sm">
                {t(s.nameBn, s.nameEn).charAt(0)}
              </span>
              <span>
                <span className="block text-sm font-bold text-stone-900">{t(s.nameBn, s.nameEn)}</span>
                <span className="block text-xs text-stone-500">{t(s.roleBn, s.roleEn)}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </GlassSection>
  );
}
