'use client';

import React from 'react';
import { FileText, ShieldCheck, HandHeart, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Language } from '@/types';

interface Props {
  lang: Language;
  onOpenAssistance: () => void;
}

export default function HowItWorks({ lang, onOpenAssistance }: Props) {
  const t = (bn: string, en: string) => (lang === 'bn' ? bn : en);

  const steps = [
    {
      num: '০১',
      numEn: '01',
      icon: FileText,
      badgeBn: 'সহজ ডিজিটাল পোর্টাল',
      badgeEn: 'Simple Portal',
      title: t('সহজ অনলাইন আবেদন', 'Submit Your Request'),
      text: t(
        'অনলাইন ফর্মে নিজের বা অসহায় প্রতিবেশীর চিকিৎসা, খাদ্য, শীতবস্ত্র বা শিক্ষা সহায়তার প্রয়োজন জানান। সাথে সাথেই পাবেন একটি ইউনিক ট্র্যাকিং আইডি।',
        'Fill in the online form with your details and need. You receive an instant tracking ID upon submission.'
      ),
    },
    {
      num: '০২',
      numEn: '02',
      icon: ShieldCheck,
      badgeBn: 'মাঠপর্যায়ের নিরীক্ষা',
      badgeEn: 'Field Verification',
      title: t('কমিটির নিরপেক্ষ যাচাই', 'Committee Verification'),
      text: t(
        'আমাদের রৌমারী শাখা ও চরাঞ্চলের দায়িত্বশীল যাচাই কমিটি সরেজমিনে সত্যতা ও অগ্রাধিকার যাচাই করে দ্রুততম সময়ে নিরপেক্ষ সিদ্ধান্ত গ্রহণ করে।',
        'Our local field verification committee checks details on the ground ensuring transparency and immediate priority matching.'
      ),
    },
    {
      num: '০৩',
      numEn: '03',
      icon: HandHeart,
      badgeBn: 'সম্মানের সাথে প্রদান',
      badgeEn: 'Dignified Aid',
      title: t('মর্যাদাপূর্ণ সহায়তা হস্তান্তর', 'Dignified Delivery'),
      text: t(
        'অনুমোদন সাপেক্ষে কোনো লোকদেখানো প্রচার ছাড়াই সরাসরি আবেদনকারীর নিকট সহায়তা সামগ্রী বা চিকিৎসা অনুদান পৌঁছে দেওয়া হয়।',
        'Once verified, food, medical care, or winter relief is handed over with dignity, respect, and complete privacy.'
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-12 md:py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[#0D5C35] text-xs font-bold mb-3 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{t('স্বচ্ছ ও সহজ ৩টি ধাপ', 'Simple 3-Step Process')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#E53935] tracking-tight mb-2">
            {t('সহায়তা পেতে যা করতে হবে', 'How to Receive Assistance')}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-medium">
            {t('কোনো মধ্যস্বত্বভোগী ছাড়া সরাসরি ফাউন্ডেশনের সেবার আওতায় আসার স্বচ্ছ প্রক্রিয়া।', 'Direct and transparent assistance workflow with zero middlemen.')}
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-7 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative flex flex-col justify-between group overflow-hidden"
              >
                {/* Large Background Step Number */}
                <span className="absolute top-4 right-5 text-5xl sm:text-6xl font-black text-stone-100 group-hover:text-emerald-50 select-none transition-colors duration-300 font-sans">
                  {lang === 'bn' ? s.num : s.numEn}
                </span>

                <div>
                  {/* Top Step Pill & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#0D5C35] to-[#0a4628] text-white flex items-center justify-center shadow-md shadow-emerald-900/20 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-[11px] font-bold text-[#0D5C35] bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-full">
                      {lang === 'bn' ? s.badgeBn : s.badgeEn}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-stone-900 mb-2.5 group-hover:text-[#0D5C35] transition-colors">
                    {s.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                    {s.text}
                  </p>
                </div>

                {/* Bottom Step Indicator */}
                <div className="mt-6 pt-3.5 border-t border-stone-100 flex items-center gap-1.5 text-[11px] text-stone-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>{lang === 'bn' ? `ধাপ ${s.num}` : `Step ${s.numEn}`}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="mt-10 text-center">
          <button
            onClick={onOpenAssistance}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#0D5C35] hover:bg-[#094527] text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-950/20 hover:shadow-xl transition-all duration-200 active:scale-98 cursor-pointer group"
          >
            <span>{t('এখনই সহায়তার আবেদন করুন', 'Apply for Assistance Now')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
