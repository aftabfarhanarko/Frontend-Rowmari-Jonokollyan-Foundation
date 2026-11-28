'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileCheck2, Scale, Mail, CalendarDays, ArrowRight, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import BackToTop from '@/components/BackToTop';
import DonationModal from '@/components/modals/DonationModal';
import { PageBanner } from '@/components/layout/PageBanner';
import { Language } from '@/types';

const CONTACT_EMAIL = 'contact@rowmarijanakalyan.org';
const UPDATED = { bn: '২৮ নভেম্বর ২০২৬', en: 'November 28, 2026' };

const termsSections = [
  {
    id: 'purpose',
    numBn: '১',
    numEn: '1',
    titleBn: 'ওয়েবসাইটের ব্যবহার ও মানবিক উদ্দেশ্য',
    titleEn: 'Platform Usage & Humanitarian Purpose',
    descBn:
      'এই প্ল্যাটফর্মটি সম্পূর্ণ অলাভজনক, অরাজনৈতিক এবং জনকল্যাণমূলক উদ্দেশ্যে পরিচালিত। ওয়েবসাইটের মাধ্যমে মানবিক সহায়তার আবেদন, অনুদান প্রদান, স্বেচ্ছাসেবক নিবন্ধন এবং স্থানীয় তথ্য ও সংবাদ সেবা পরিচালিত হয়।',
    descEn:
      'This platform operates strictly as a non-profit, non-political humanitarian portal for relief applications, transparent donations, volunteer coordination, and community information.',
  },
  {
    id: 'accuracy',
    numBn: '২',
    numEn: '2',
    titleBn: 'তথ্যের সত্যতা ও আবেদনকারীর দায়বদ্ধতা',
    titleEn: 'Accuracy of Submitted Information',
    descBn:
      'সহায়তার আবেদন, স্বেচ্ছাসেবক নিবন্ধন বা অনুদান যাচাইয়ের তথ্য প্রদানের সময় ব্যবহারকারী প্রদত্ত তথ্যের সত্যতা নিশ্চিত করবেন। ভুল, ভুয়া বা বিভ্রান্তিকর তথ্য প্রমাণিত হলে ফাউন্ডেশন যেকোনো আবেদন বা নিবন্ধন বাতিলের অধিকার সংরক্ষণ করে।',
    descEn:
      'Users must ensure that all information submitted for relief applications, volunteer registration, or donation verification is accurate. The foundation reserves the right to reject false or misleading submissions.',
  },
  {
    id: 'donations',
    numBn: '৩',
    numEn: '3',
    titleBn: 'অনুদান ও তহবিল ব্যবহারের স্বচ্ছতা',
    titleEn: 'Donations & Fund Allocation Policy',
    descBn:
      'সকল অনুদান স্বেচ্ছায় প্রদত্ত এবং তা ফাউন্ডেশনের অনুমোদিত মানবিক, ত্রাণ, চিকিৎসা ও শিক্ষা প্রকল্পে ব্যয় করা হয়। অনুদানের প্রতিটি হিসাব প্রশাসনিকভাবে যাচাইকৃত এবং স্বচ্ছতার নীতিমালায় সংরক্ষিত।',
    descEn:
      'All donations are voluntary and allocated strictly to approved humanitarian relief, healthcare, and education initiatives under audited transparency guidelines.',
  },
  {
    id: 'ip',
    numBn: '৪',
    numEn: '4',
    titleBn: 'মেধা ও কনটেন্ট স্বত্ব (Intellectual Property)',
    titleEn: 'Intellectual Property & Content Rights',
    descBn:
      'এই ওয়েবসাইটের লোগো, ডিজাইন, প্রতিবেদন, মাঠপর্যায়ের আলোকচিত্র ও কনটেন্ট রৌমারী জনকল্যাণ ফাউন্ডেশনের অনুমোদিত সম্পত্তি। লিখিত অনুমতি ব্যতীত বাণিজ্যিক উদ্দেশ্যে বা বিকৃতভাবে ব্যবহার করা যাবে না।',
    descEn:
      'All logos, reports, field photography, and editorial content on this website belong to Rowmari Janakalyan Foundation and may not be reproduced commercially without prior written permission.',
  },
  {
    id: 'updates',
    numBn: '৫',
    numEn: '5',
    titleBn: 'শর্তাবলী পরিবর্তন ও যোগাযোগ',
    titleEn: 'Amendments & Governing Contact',
    descBn:
      'সেবার মানোন্নয়ন ও আইনি প্রয়োজনে ফাউন্ডেশন যেকোনো সময় এই ব্যবহারের শর্তাবলী হালনাগাদ করতে পারে। পরিবর্তিত শর্তাবলী ওয়েবসাইটে প্রকাশের সাথে সাথেই কার্যকর হবে।',
    descEn:
      'The foundation may update these terms from time to time to improve service delivery or meet legal obligations. Updated terms take effect immediately upon publication on this page.',
  },
];

export default function TermsPage() {
  const [lang, setLang] = useState<Language>('bn');
  const [donationModalOpen, setDonationModalOpen] = useState(false);

  const t = (bn: string, en: string) => (lang === 'bn' ? bn : en);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1E293B]" lang={lang === 'bn' ? 'bn' : 'en'}>
      <Navbar
        lang={lang}
        onToggleLang={() => setLang((l) => (l === 'bn' ? 'en' : 'bn'))}
        onOpenDonation={() => setDonationModalOpen(true)}
      />

      <main className="flex-1 pb-16 sm:pb-20">
        <PageBanner
          badge={t('ব্যবহারের সাধারণ শর্তাবলী ও নীতিমালা', 'Terms of Use & Governance')}
          title={t('ব্যবহারের শর্তাবলী (Terms of Use)', 'Terms & Conditions')}
          subtitle={t(
            'রৌমারী জনকল্যাণ ফাউন্ডেশনের ওয়েবসাইট ও ডিজিটাল সেবা ব্যবহারের ক্ষেত্রে প্রযোজ্য নিয়মাবলী ও অঙ্গীকারসমূহ।',
            'Guidelines and commitments governing the use of Rowmari Janakalyan Foundation’s website and digital services.'
          )}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/25 px-3.5 py-1.5 text-xs font-semibold text-white">
            <CalendarDays className="w-3.5 h-3.5" />
            <span>
              {t('সর্বশেষ সংস্করণ:', 'Effective Date:')} {t(UPDATED.bn, UPDATED.en)}
            </span>
          </div>
        </PageBanner>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left Sidebar: Quick Index & Governance Note */}
            <aside className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
              <div className="rounded-2xl bg-[#FFF4F5] border border-red-100/80 p-5 space-y-3 shadow-[0_4px_16px_-6px_rgba(214,40,40,0.08)]">
                <div className="flex items-center gap-2">
                  <span className="w-1 h-5 rounded-full bg-[#D62828]" />
                  <h2 className="text-sm font-extrabold text-stone-900">
                    {t('শর্তাবলী সূচিপত্র', 'Terms Overview')}
                  </h2>
                </div>
                <nav className="space-y-1.5">
                  {termsSections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-white hover:text-[#D62828] transition-colors"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#D62828] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                        {lang === 'bn' ? sec.numBn : sec.numEn}
                      </span>
                      <span className="line-clamp-1">{t(sec.titleBn, sec.titleEn)}</span>
                    </a>
                  ))}
                </nav>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-[#991B1B] via-[#D62828] to-[#E53935] text-white p-5 space-y-3 shadow-md">
                <div className="flex items-center gap-2 text-xs font-bold text-red-100">
                  <Scale className="w-4 h-4" />
                  <span>{t('স্বচ্ছ ও অলাভজনক পরিচালনা', 'Non-Profit & Transparent')}</span>
                </div>
                <p className="text-xs text-red-50/90 leading-relaxed">
                  {t(
                    'শর্তাবলী বা নীতিমালা সংক্রান্ত যেকোনো প্রশ্ন বা অনুমোদনের প্রয়োজনে আমাদের ইমেইলে যোগাযোগ করুন।',
                    'For any clarification regarding these terms or content permissions, please reach out via email.'
                  )}
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white text-[#D62828] hover:bg-red-50 px-4 py-2 text-xs font-bold shadow-sm transition"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{CONTACT_EMAIL}</span>
                </a>
              </div>
            </aside>

            {/* Right Main Content: Numbered Terms Cards */}
            <div className="lg:col-span-8 space-y-4">
              {termsSections.map((sec, idx) => (
                <motion.article
                  key={sec.id}
                  id={sec.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.35, delay: idx * 0.06, ease: 'easeOut' }}
                  className="scroll-mt-24 rounded-2xl bg-white border border-stone-200/90 p-5 sm:p-6 shadow-xs hover:border-red-200 transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#FFF4F5] border border-red-100 text-[#D62828] font-black text-sm flex items-center justify-center shrink-0">
                      {lang === 'bn' ? sec.numBn : sec.numEn}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-base sm:text-lg font-extrabold text-stone-900 leading-snug">
                        {t(sec.titleBn, sec.titleEn)}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                        {t(sec.descBn, sec.descEn)}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}

              {/* Related Privacy Link Strip */}
              <div className="rounded-2xl bg-[#FFF4F5] border border-red-100/80 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-stone-800">
                  <FileCheck2 className="w-5 h-5 text-[#D62828] shrink-0" />
                  <span>
                    {t('ব্যক্তিগত তথ্য সুরক্ষা সম্পর্কে জানতে গোপনীয়তা নীতি পড়ুন।', 'Read our Privacy Policy to learn how we protect your data.')}
                  </span>
                </div>
                <Link
                  href="/privacy"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#D62828] hover:bg-[#B91C1C] text-white px-4 py-2 text-xs font-bold transition shrink-0 self-start sm:self-auto"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{t('গোপনীয়তা নীতি', 'Privacy Policy')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer lang={lang} onOpenDonation={() => setDonationModalOpen(true)} />
      <MobileBottomBar lang={lang} onOpenDonation={() => setDonationModalOpen(true)} />
      <BackToTop />
      <DonationModal isOpen={donationModalOpen} onClose={() => setDonationModalOpen(false)} lang={lang} />
    </div>
  );
}
