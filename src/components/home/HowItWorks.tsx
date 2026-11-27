'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Search, Check, ArrowRight } from 'lucide-react';
import { Language } from '@/types';

interface Props {
  lang: Language;
  onOpenAssistance?: () => void;
}

export default function HowItWorks({ lang }: Props) {
  const t = (bn: string, en: string) => (lang === 'bn' ? bn : en);

  const steps = [
    {
      icon: Heart,
      title: t('স্বচ্ছ ডিজিটাল অনুদান', 'Transparent Digital Donations'),
      text: t(
        'বিকাশ, নগদ বা ব্যাংকে প্রাপ্ত প্রতিটি অনুদান ডিজিটাল ভেরিফিকেশনের আওতায় সংরক্ষিত।',
        'Every donation via bKash, Nagad, or bank is digitally verified and logged.'
      ),
    },
    {
      icon: Search,
      title: t('মাঠপর্যায়ে সরেজমিনে যাচাই', 'On-Ground Verification'),
      text: t(
        'রৌমারীর দুর্গম চরাঞ্চলে স্বেচ্ছাসেবক দল বাড়ি বাড়ি গিয়ে প্রকৃত অসহায়দের তালিকা করে।',
        'Our grassroots volunteer team conducts door-to-door audits across remote chars.'
      ),
    },
    {
      icon: Check,
      title: t('সরাসরি মর্যাদাপূর্ণ বিতরণ', 'Direct Dignified Distribution'),
      text: t(
        'কোনো মধ্যস্বত্বভোগী ছাড়াই সরাসরি সুবিধাভোগীদের হাতে সহায়তা পৌঁছে দেওয়া হয়।',
        'Relief goods and medical aid are handed directly to families with dignity.'
      ),
    },
  ];

  return (
    <section
      id="how-it-works"
      className="pt-5 pb-7 md:pt-6 md:pb-9 bg-gradient-to-b from-[#FFF4F5] via-[#FFF4F5]/65 to-white relative overflow-hidden"
    >
      {/* Subtle Wavy Background Silhouette */}
      <svg
        aria-hidden
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-44 w-full opacity-55"
      >
        <path
          d="M0,120 C260,40 520,190 820,120 C1100,55 1290,140 1440,95 L1440,220 L0,220 Z"
          fill="#FFE4E6"
          opacity="0.45"
        />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Centered Red Heading */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#B91C1C] tracking-tight">
            {t('কীভাবে পরিচালিত হয় আমাদের কার্যক্রম', 'How Our Humanitarian Operations Work')}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1.5 max-w-xl mx-auto">
            {t(
              'কোনো মধ্যস্বত্বভোগী ছাড়া শতভাগ স্বচ্ছতার সাথে সরাসরি চরাঞ্চলের মানুষের কাছে পৌঁছানোর প্রক্রিয়া।',
              'Direct, transparent 3-step workflow delivering aid straight to remote char families.'
            )}
          </p>
        </div>

        {/* 3 Connected Step Cards with Overlapping Top Red Circle Icons */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-7 md:gap-3">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <React.Fragment key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: i * 0.12, ease: 'easeOut' }}
                  className="relative flex-1 bg-white/90 rounded-3xl px-5 pt-8 pb-5 shadow-[0_8px_28px_-10px_rgba(214,40,40,0.14)] border border-red-100/80 text-center flex flex-col items-center justify-center hover:-translate-y-1 transition-transform duration-300"
                >
                  {/* Top Overlapping Circular Red Icon */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-[#D62828] to-[#991B1B] text-white flex items-center justify-center shadow-md shadow-red-900/25 ring-4 ring-[#FFF4F5]">
                    <Icon className="w-4.5 h-4.5" />
                  </div>

                  <h3 className="text-sm sm:text-base font-extrabold text-stone-900 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-stone-500 mt-1.5 leading-relaxed line-clamp-2">
                    {s.text}
                  </p>
                </motion.div>

                {i < steps.length - 1 && (
                  <div
                    aria-hidden
                    className="hidden md:flex items-center justify-center text-red-300 shrink-0 px-1"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
