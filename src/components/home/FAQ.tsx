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
    qBn: 'ফাউন্ডেশনের অনুদান প্রক্রিয়া ও আর্থিক স্বচ্ছতা কীভাবে বজায় রাখা হয়?',
    qEn: 'How does the foundation ensure financial transparency and audit?',
    aBn: 'প্রতিটি অনুদান বিকাশ, নগদ ও ব্যাংকের মাধ্যমে গ্রহণ করা হয় এবং ডিজিটাল পদ্ধতিতে ভেরিফাই করে উন্মুক্ত দাতা তালিকায় লিপিবদ্ধ করা হয়। বছর শেষে নিয়মিত অডিট রিপোর্ট প্রকাশ করা হয়।',
    aEn: 'Every contribution through bKash, Nagad, and bank is digitally verified and published on our transparent donor showcase. Financial audits are maintained annually.',
  },
  {
    qBn: 'ফাউন্ডেশনের সদস্য ও কর্মকর্তাদের পরিচয় কীভাবে যাচাই করব?',
    qEn: 'How can I verify official RJF committee members and identity?',
    aBn: 'আমাদের ওয়েবসাইটের “সদস্য যাচাই” মেন্যুতে গিয়ে মেম্বার আইডি (যেমন: RJF-000001) দিয়ে সার্চ করলেই সদস্যের ছবি, পদবি ও কমিটির মেয়াদ সরাসরি দেখা যাবে।',
    aEn: 'Visit the “Member Verification” portal and enter the Member ID (e.g. RJF-000001) to verify official designation, photo, and committee term directly.',
  },
  {
    qBn: 'ফাউন্ডেশনে কীভাবে অনলাইন অনুদান দেওয়া যায়?',
    qEn: 'How can I donate online to the foundation?',
    aBn: '“অনুদান দিন” বাটনে ক্লিক করে বিকাশ, নগদ বা রকেটের মাধ্যমে সরাসরি তহবিলে অর্থ পাঠিয়ে ট্রানজ্যাকশন আইডি ও বিবরণ দিয়ে নিশ্চিত করুন।',
    aEn: 'Click the “Donate” button and transfer funds via bKash, Nagad, or Rocket, then submit the transaction ID to confirm.',
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
