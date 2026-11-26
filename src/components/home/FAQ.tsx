'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Language } from '@/types';
import { GlassSection, SectionHeading, glassCard } from '@/components/ui/glass';

interface Props {
  lang: Language;
}

const FAQS = [
  {
    qBn: 'কারা সহায়তার জন্য আবেদন করতে পারেন?',
    qEn: 'Who can apply for assistance?',
    aBn: 'রৌমারী ও আশপাশের এলাকার অসহায়, দরিদ্র ও ক্ষতিগ্রস্ত পরিবার আবেদন করতে পারেন। আবেদন যাচাই করে সহায়তা দেওয়া হয়।',
    aEn: 'Vulnerable, low-income and affected families in Rowmari and nearby areas can apply. Every request is verified before help is given.',
  },
  {
    qBn: 'আমার আবেদনের অবস্থা কীভাবে জানব?',
    qEn: 'How do I check my application status?',
    aBn: 'আবেদনের পর পাওয়া ট্র্যাকিং আইডি দিয়ে হোমপেজের “আবেদনের অবস্থা” অংশে খুঁজলেই বর্তমান অবস্থা দেখা যাবে।',
    aEn: 'Use the tracking ID you received in the “Track Application” section on the home page to see the current status.',
  },
  {
    qBn: 'কীভাবে সহায়তার জন্য আবেদন করব?',
    qEn: 'How can I apply for humanitarian assistance?',
    aBn: '“সহায়তার আবেদন” বাটনে ক্লিক করে ফর্মটি পূরণ করুন। আমাদের যাচাই কমিটি মাঠপর্যায়ে তথ্য যাচাই করে দ্রত সহায়তা নিশ্চিত করবে।',
    aEn: 'Click the “Request Help” button and submit the form. Our verification committee will verify the details on the ground to provide aid.',
  },
  {
    qBn: 'ফাউন্ডেশনের মানবিক সেবা কার্যক্রম কীভাবে পরিচালিত হয়?',
    qEn: 'How are the foundation relief operations conducted?',
    aBn: 'আমাদের সকল সেবামূলক কার্যক্রম ও ক্যাম্পেইন সম্পূর্ণ নিজস্ব স্বেচ্ছাসেবক দল এবং স্থানীয় প্রতিনিধিদের প্রত্যক্ষ অংশগ্রহণে পরিচালিত হয়।',
    aEn: 'All our relief activities and campaigns are directly organized and executed by registered volunteers and field teams.',
  },
  {
    qBn: 'স্বেচ্ছাসেবক হতে কী করতে হবে?',
    qEn: 'How can I volunteer?',
    aBn: '“স্বেচ্ছাসেবক হোন” ফর্ম পূরণ করুন। আমাদের সমন্বয়ক আপনার সঙ্গে যোগাযোগ করে কাজের বিষয়ে জানাবেন।',
    aEn: 'Fill in the “Volunteer” form. Our coordinator will get in touch and explain how you can help.',
  },
];

export default function FAQ({ lang }: Props) {
  const t = (bn: string, en: string) => (lang === 'bn' ? bn : en);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <GlassSection id="faq" tone="red">
      <SectionHeading title={t('সাধারণ জিজ্ঞাসা', 'Frequently asked questions')} />
      <div className="max-w-3xl mx-auto space-y-3">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className={`${glassCard} overflow-hidden`}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 text-left px-5 md:px-6 py-4 cursor-pointer"
              >
                <span className="font-semibold text-stone-900 text-sm md:text-base">{t(f.qBn, f.qEn)}</span>
                <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0">
                  <ChevronDown className="w-5 h-5 text-[#D62828]" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 md:px-6 pb-5 text-sm text-stone-600 leading-relaxed">{t(f.aBn, f.aEn)}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </GlassSection>
  );
}
