'use client';

import React from 'react';
import { FileText, ShieldCheck, HandHeart } from 'lucide-react';
import { Language } from '@/types';
import { GlassSection, SectionHeading, glassCardHover } from '@/components/ui/glass';

interface Props {
  lang: Language;
  onOpenAssistance: () => void;
}

export default function HowItWorks({ lang, onOpenAssistance }: Props) {
  const t = (bn: string, en: string) => (lang === 'bn' ? bn : en);
  const steps = [
    {
      icon: FileText,
      title: t('আবেদন জমা দিন', 'Submit your request'),
      text: t(
        'অনলাইন ফর্মে আপনার প্রয়োজনের কথা লিখুন। আবেদন শেষে একটি ট্র্যাকিং আইডি পাবেন।',
        'Fill in the online form with what you need. You get a tracking ID when you finish.'
      ),
    },
    {
      icon: ShieldCheck,
      title: t('কমিটি যাচাই করবে', 'The committee verifies'),
      text: t(
        'আমাদের যাচাই কমিটি তথ্য মিলিয়ে দেখে এবং প্রয়োজনে আপনার সঙ্গে যোগাযোগ করে।',
        'Our verification committee checks the details and contacts you if needed.'
      ),
    },
    {
      icon: HandHeart,
      title: t('সহায়তা পৌঁছে যাবে', 'Help reaches you'),
      text: t(
        'অনুমোদন হলে খাদ্য, শীতবস্ত্র, চিকিৎসা বা শিক্ষা সহায়তা আপনার কাছে পৌঁছে দেওয়া হয়।',
        'Once approved, food, winter clothing, medical or education support is delivered to you.'
      ),
    },
  ];

  return (
    <GlassSection id="how-it-works">
      <SectionHeading
        title={t('সহায়তা পেতে যা করতে হবে', 'How to get help')}
        subtitle={t('তিনটি সহজ ধাপে আপনার আবেদন সম্পন্ন হয়।', 'Your request is completed in three simple steps.')}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className={`${glassCardHover} p-6 md:p-7 relative`}>
              <span className="absolute top-5 right-6 text-5xl font-black text-[#0D5C35]/10 select-none">
                {i + 1}
              </span>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0D5C35] to-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-900/20 mb-5">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">{s.title}</h3>
              <p className="text-sm text-stone-600 leading-relaxed">{s.text}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-10 text-center">
        <button
          onClick={onOpenAssistance}
          className="px-8 py-3 rounded-full bg-[#0D5C35] hover:bg-[#094527] text-white font-semibold shadow-lg shadow-emerald-900/20 transition active:scale-[0.98] cursor-pointer"
        >
          {t('এখনই আবেদন করুন', 'Apply now')}
        </button>
      </div>
    </GlassSection>
  );
}
