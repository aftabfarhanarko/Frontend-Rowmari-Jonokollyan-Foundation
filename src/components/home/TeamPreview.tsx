'use client';

import React from 'react';
import Link from 'next/link';
import { Language } from '@/types';
import { GlassSection, SectionHeading, glassCardHover } from '@/components/ui/glass';

interface Props {
  lang: Language;
}

// PLACEHOLDERS: put real names (and later photos) here.
const TEAM = [
  { nameBn: 'সভাপতির নাম', nameEn: 'President name', roleBn: 'সভাপতি', roleEn: 'President' },
  { nameBn: 'সাধারণ সম্পাদকের নাম', nameEn: 'General Secretary name', roleBn: 'সাধারণ সম্পাদক', roleEn: 'General Secretary' },
  { nameBn: 'কোষাধ্যক্ষের নাম', nameEn: 'Treasurer name', roleBn: 'কোষাধ্যক্ষ', roleEn: 'Treasurer' },
  { nameBn: 'সমন্বয়কের নাম', nameEn: 'Coordinator name', roleBn: 'কার্যক্রম সমন্বয়ক', roleEn: 'Programme Coordinator' },
];

export default function TeamPreview({ lang }: Props) {
  const t = (bn: string, en: string) => (lang === 'bn' ? bn : en);
  return (
    <GlassSection id="team" tone="red">
      <SectionHeading
        title={t('যাঁরা নেতৃত্ব দিচ্ছেন', 'The people behind the work')}
        subtitle={t('স্থানীয় মানুষের একটি নিবেদিত কমিটি আমাদের কার্যক্রম পরিচালনা করে।', 'A dedicated committee of local people runs our work.')}
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {TEAM.map((m) => (
          <div key={m.roleEn} className={`${glassCardHover} p-5 md:p-6 text-center`}>
            <div className="mx-auto w-20 h-20 md:w-24 md:h-24 rounded-full p-1 bg-gradient-to-br from-[#D62828] via-red-400 to-[#E53935] shadow-lg">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-2xl md:text-3xl font-extrabold text-[#D62828]">
                {t(m.nameBn, m.nameEn).charAt(0)}
              </div>
            </div>
            <h3 className="mt-4 text-sm md:text-base font-bold text-stone-900">{t(m.nameBn, m.nameEn)}</h3>
            <p className="text-xs md:text-sm text-[#E53935] font-semibold mt-0.5">{t(m.roleBn, m.roleEn)}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          href="/team"
          className="inline-block px-7 py-2.5 rounded-full border border-[#D62828] text-[#D62828] hover:bg-[#D62828] hover:text-white font-semibold text-sm transition bg-white/50 backdrop-blur-md"
        >
          {t('পুরো কমিটি দেখুন', 'See the full committee')}
        </Link>
      </div>
    </GlassSection>
  );
}
