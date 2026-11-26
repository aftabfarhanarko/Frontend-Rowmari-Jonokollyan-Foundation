'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Language } from '@/types';
import { GlassSection, SectionHeading, glassCard } from '@/components/ui/glass';

interface Props {
  lang: Language;
}

// SAMPLE VALUES: replace with your real figures before publishing.
const USAGE = [
  { bn: 'সরাসরি সহায়তা বিতরণ', en: 'Direct relief distribution', value: 80, color: 'from-[#D62828] to-red-500' },
  { bn: 'পরিচালনা ও সমন্বয়', en: 'Operations & coordination', value: 12, color: 'from-amber-500 to-amber-400' },
  { bn: 'জরুরি তহবিল সংরক্ষণ', en: 'Emergency reserve', value: 8, color: 'from-[#E53935] to-red-400' },
];

export default function FundUsage({ lang }: Props) {
  const t = (bn: string, en: string) => (lang === 'bn' ? bn : en);
  const reduce = useReducedMotion();

  return (
    <GlassSection id="transparency" tone="red">
      <SectionHeading
        title={t('আমাদের সেবা ও সম্পদ বণ্টন', 'How Our Humanitarian Aid is Allocated')}
        subtitle={t(
          'প্রতিটি সেবামূলক উদ্যোগের স্বচ্ছ বিবরণী আমরা প্রকাশ করি।',
          'We maintain transparent records for all field operations and relief activities.'
        )}
      />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className={`${glassCard} lg:col-span-3 p-6 md:p-8 space-y-6`}>
          {USAGE.map((u) => (
            <div key={u.en}>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-sm font-semibold text-stone-800">{t(u.bn, u.en)}</span>
                <span className="text-sm font-bold text-[#D62828]">{u.value}%</span>
              </div>
              <div className="h-3 rounded-full bg-white/70 border border-white overflow-hidden">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${u.color}`}
                  initial={reduce ? false : { width: 0 }}
                  whileInView={{ width: `${u.value}%` }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2 rounded-3xl p-6 md:p-8 bg-gradient-to-br from-[#D62828]/95 to-[#B91C1C]/95 backdrop-blur-xl border border-white/20 text-white shadow-[0_18px_44px_-14px_rgba(13,92,53,0.6)] flex flex-col justify-between gap-6">
          <div className="space-y-3">
            <h3 className="text-xl font-bold">{t('স্বচ্ছতা আমাদের অঙ্গীকার', 'Transparency is our promise')}</h3>
            <p className="text-sm text-red-50/90 leading-relaxed">
              {t(
                'আয়-ব্যয়ের হিসাব ও কার্যক্রম প্রতিবেদন আমরা নিয়মিত প্রকাশ করি। যে কেউ দেখে নিতে পারেন।',
                'Income and expense statements and activity reports are published regularly. Anyone can review them.'
              )}
            </p>
          </div>
          <Link
            href="/about"
            className="self-start px-6 py-2.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-md text-sm font-semibold transition"
          >
            {t('প্রতিবেদন দেখুন', 'View reports')}
          </Link>
        </div>
      </div>
    </GlassSection>
  );
}
