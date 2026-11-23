'use client';

import React from 'react';
import Link from 'next/link';
import { CalendarDays } from 'lucide-react';
import { Language } from '@/types';
import { GlassSection, glassCardHover } from '@/components/ui/glass';

interface Props {
  lang: Language;
}

// SAMPLE ITEMS: connect to your real news data (e.g. from mockData) later.
const ITEMS = [
  {
    dateBn: 'সম্প্রতি',
    dateEn: 'Recent',
    tagBn: 'ইভেন্ট',
    tagEn: 'Event',
    titleBn: 'শীতবস্ত্র বিতরণ কার্যক্রম',
    titleEn: 'Winter clothing distribution',
    textBn: 'চরাঞ্চলের পরিবারগুলোর কাছে কম্বল ও গরম কাপড় পৌঁছে দেওয়া হচ্ছে।',
    textEn: 'Blankets and warm clothes are being delivered to families in the char areas.',
  },
  {
    dateBn: 'সম্প্রতি',
    dateEn: 'Recent',
    tagBn: 'রক্তদান',
    tagEn: 'Blood',
    titleBn: 'স্বেচ্ছায় রক্তদান কর্মসূচি',
    titleEn: 'Voluntary blood donation drive',
    textBn: 'নতুন দাতাদের নিবন্ধনসহ রক্তদান কর্মসূচির আয়োজন।',
    textEn: 'A blood donation drive with registration for new donors.',
  },
  {
    dateBn: 'শিগগিরই',
    dateEn: 'Upcoming',
    tagBn: 'ঘোষণা',
    tagEn: 'Notice',
    titleBn: 'স্বেচ্ছাসেবক সমন্বয় সভা',
    titleEn: 'Volunteer coordination meeting',
    textBn: 'নতুন ও পুরোনো স্বেচ্ছাসেবকদের নিয়ে আসন্ন কার্যক্রমের পরিকল্পনা।',
    textEn: 'Planning upcoming work with new and existing volunteers.',
  },
];

export default function NewsEvents({ lang }: Props) {
  const t = (bn: string, en: string) => (lang === 'bn' ? bn : en);
  return (
    <GlassSection id="news">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 md:mb-12">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0D5C35] tracking-tight">
            {t('সংবাদ ও ইভেন্ট', 'News & events')}
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            {t('আমাদের সাম্প্রতিক কাজ ও আসন্ন আয়োজন।', 'Our latest work and what is coming up.')}
          </p>
        </div>
        <Link href="/news" className="text-[#E53935] font-semibold text-sm hover:underline shrink-0">
          {t('সব দেখুন →', 'View all →')}
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {ITEMS.map((n) => (
          <article key={n.titleEn} className={`${glassCardHover} p-6 flex flex-col gap-3`}>
            <div className="flex items-center justify-between text-xs">
              <span className="px-2.5 py-1 rounded-full bg-[#E53935]/10 text-[#E53935] font-bold">{t(n.tagBn, n.tagEn)}</span>
              <span className="flex items-center gap-1.5 text-stone-500">
                <CalendarDays className="w-3.5 h-3.5" />
                {t(n.dateBn, n.dateEn)}
              </span>
            </div>
            <h3 className="text-lg font-bold text-stone-900 leading-snug">{t(n.titleBn, n.titleEn)}</h3>
            <p className="text-sm text-stone-600 leading-relaxed">{t(n.textBn, n.textEn)}</p>
          </article>
        ))}
      </div>
    </GlassSection>
  );
}
