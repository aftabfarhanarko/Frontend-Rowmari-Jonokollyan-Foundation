'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, ShieldCheck, HandHeart, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Language } from '@/types';

interface Props {
  lang: Language;
  onOpenAssistance?: () => void;
}

export default function HowItWorks({ lang }: Props) {
  const t = (bn: string, en: string) => (lang === 'bn' ? bn : en);

  const steps = [
    {
      num: '০১',
      numEn: '01',
      icon: FileText,
      badgeBn: 'তহবিল ও স্বচ্ছতা',
      badgeEn: 'Fundraising & Trust',
      title: t('স্বচ্ছ ডিজিটাল অনুদান', 'Transparent Digital Donations'),
      text: t(
        'বিকাশ, নগদ বা ব্যাংক ট্রান্সফারের মাধ্যমে প্রাপ্ত অনুদানের প্রতিটি টাকা ডিজিটাল ভেরিফিকেশন ও অডিটের আওতায় সংরক্ষিত হয়।',
        'Every donation received through bKash, Nagad, or direct transfer is digitally logged and publicly verified for full transparency.'
      ),
    },
    {
      num: '০২',
      numEn: '02',
      icon: ShieldCheck,
      badgeBn: 'সরেজমিন নিরীক্ষা',
      badgeEn: 'Field Verification',
      title: t('মাঠপর্যায়ে সরেজমিনে যাচাই', 'On-Ground Verification'),
      text: t(
        'রৌমারীর দুর্গম চরাঞ্চলে আমাদের নিবেদিত স্বেচ্ছাসেবক দল বাড়ি বাড়ি গিয়ে প্রকৃত শীতার্ত, দরিদ্র ও রোগীদের অগ্রাধিকার তালিকা তৈরি করে।',
        'Our dedicated grassroots volunteer team conducts door-to-door field audits across remote chars to identify truly vulnerable families.'
      ),
    },
    {
      num: '০৩',
      numEn: '03',
      icon: HandHeart,
      badgeBn: 'মর্যাদাপূর্ণ হস্তান্তর',
      badgeEn: 'Dignified Aid',
      title: t('সরাসরি মর্যাদাপূর্ণ বিতরণ', 'Direct Dignified Distribution'),
      text: t(
        'কোনো মধ্যস্বত্বভোগী ছাড়াই সরাসরি সুবিধাভোগীদের হাতে কম্বল, খাদ্যসামগ্রী ও চিকিৎসা সহায়তা পরম শ্রদ্ধার সাথে হস্তান্তর করা হয়।',
        'Relief goods, medicine, and winter supplies are handed directly to beneficiaries with dignity, zero overhead, and complete accountability.'
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-12 md:py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200/80 text-[#D62828] text-xs font-bold mb-3 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{t('স্বচ্ছ ও কার্যকর ৩টি ধাপ', 'Simple 3-Step Operation')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight mb-2">
            {t('কীভাবে পরিচালিত হয় আমাদের কার্যক্রম', 'How Our Humanitarian Operations Work')}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-medium">
            {t('কোনো মধ্যস্বত্বভোগী ছাড়া শতভাগ স্বচ্ছতার সাথে সরাসরি চরাঞ্চলের মানুষের কাছে পৌঁছানোর কর্মপদ্ধতি।', 'Direct, transparent, and accountable field workflow delivering aid straight to remote char families.')}
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
                <span className="absolute top-4 right-5 text-5xl sm:text-6xl font-black text-stone-100 group-hover:text-red-50 select-none transition-colors duration-300 font-sans">
                  {lang === 'bn' ? s.num : s.numEn}
                </span>

                <div>
                  {/* Top Step Pill & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-13 h-13 rounded-2xl bg-linear-to-br from-[#D62828] to-[#991B1B] text-white flex items-center justify-center shadow-md shadow-red-900/20 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-[11px] font-bold text-[#D62828] bg-red-50 border border-red-200/70 px-2.5 py-0.5 rounded-full">
                      {lang === 'bn' ? s.badgeBn : s.badgeEn}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-stone-900 mb-2.5 group-hover:text-[#D62828] transition-colors">
                    {s.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                    {s.text}
                  </p>
                </div>

                {/* Bottom Step Indicator */}
                <div className="mt-6 pt-3.5 border-t border-stone-100 flex items-center gap-1.5 text-[11px] text-stone-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  <span>{lang === 'bn' ? `ধাপ ${s.num}` : `Step ${s.numEn}`}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="mt-10 text-center">
          <Link
            href="/donate"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#D62828] hover:bg-[#B91C1C] text-white font-bold text-sm sm:text-base shadow-lg shadow-red-950/20 hover:shadow-xl transition-all duration-200 active:scale-98 cursor-pointer group"
          >
            <span>{t('মানবতার পাশে অনুদান দিন', 'Donate to Stand with Humanity')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
