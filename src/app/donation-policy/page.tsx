'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  FileCheck, 
  CheckCircle2, 
  Lock, 
  Scale, 
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import BackToTop from '@/components/BackToTop';
import AssistanceModal from '@/components/modals/AssistanceModal';
import DonationModal from '@/components/modals/DonationModal';
import { GlassSection, SectionHeading, glassCard } from '@/components/ui/glass';
import { Language } from '@/types';

export default function DonationPolicyPage() {
  const [lang, setLang] = useState<Language>('bn');
  const [assistanceModalOpen, setAssistanceModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);

  const t = (bn: string, en: string) => (lang === 'bn' ? bn : en);

  const policies = [
    {
      num: '১',
      titleBn: 'অনুদানের শতভাগ সুনির্দিষ্ট ব্যবহার ও তহবিল পৃথকীকরণ',
      titleEn: '100% Dedicated Fund Allocation & Segregation',
      descBn: 'দাতা যে নির্দিষ্ট ক্যাম্পেইন বা খাতের জন্য অনুদান পাঠাবেন (যেমন: শীতবস্ত্র, মুমূর্ষু রোগীর চিকিৎসা, শিক্ষাবৃত্তি বা যাকাত), সংগৃহীত অর্থ শতভাগ সেই নির্দিষ্ট মানবিক কাজেই ব্যয় করা হয়। কোনো খাতের অর্থ অন্য খাতে স্থানান্তর করা হয় না। সাধারণ তহবিলের অর্থ আকস্মিক দুর্যোগ ও জরুরি ত্রাণে ব্যয় হয়।',
      descEn: 'Funds designated by donors for specific campaigns (e.g. winter blankets, medical surgery, scholarships, or zakat) are 100% isolated and dispatched solely for that verified humanitarian purpose.',
    },
    {
      num: '২',
      titleBn: 'যাকাত তহবিল ব্যবস্থাপনা ও হকদারদের কাছে পৌঁছানো',
      titleEn: 'Zakat Fund Governance & Eligible Distribution',
      descBn: 'যাকাতের অর্থ সম্পূর্ণ আলাদা একাউন্টে সংরক্ষণ করা হয় এবং শরিয়াহ নির্দেশিত সুনির্দিষ্ট দরিদ্র, অসহায় ও রিক্তহস্ত পরিবারের হাতে সরাসরি পৌঁছে দেওয়া হয়। যাকাতের অর্থ থেকে কোনো সাংগঠনিক বা প্রশাসনিক খরচ কাটা হয় না।',
      descEn: 'Zakat contributions are held in a separate bank account and distributed strictly to verified impoverished beneficiaries without any administrative deduction.',
    },
    {
      num: '৩',
      titleBn: 'স্বয়ংক্রিয় ডিজিটাল রসিদ ও ট্র্যাকিং নিশ্চয়তা',
      titleEn: 'Automated Digital Receipts & Auditable Tracking',
      descBn: 'প্রতিটি সফল অনুদানের বিপরীতে দাতাকে একটি ইউনিক রেফারেন্স আইডি সহ যাচাইযোগ্য ডিজিটাল রসিদ প্রদান করা হয়। ব্যাংক বা মোবাইল ব্যাংকিং গেটওয়ের ট্রানজেকশন স্টেটমেন্ট কেন্দ্রীয় অডিট লেজারে স্বয়ংক্রিয়ভাবে সংরক্ষিত থাকে।',
      descEn: 'Every donation generates an authenticated digital receipt with a serial tracking code automatically mirrored into the central financial audit ledger.',
    },
    {
      num: '৪',
      titleBn: 'রিফান্ড ও হিসাব সমন্বয় নীতিমালা',
      titleEn: 'Refund & Transaction Reconciliation Policy',
      descBn: 'মানবকল্যাণমূলক অনুদান সাধারণত ফেরতযোগ্য নয়। তবে অনিচ্ছাকৃতভাবে বা ভুলবশত অতিরিক্ত অর্থ প্রেরিত হলে, প্রেরক ট্রানজেকশনের ৭ দিনের মধ্যে ট্রানজেকশন আইডিসহ লিখিত আবেদন জানালে যাচাই সাপেক্ষে ব্যাংক চার্জ বাদে সমন্বয় করা হবে।',
      descEn: 'Charitable donations are non-refundable. However, in verified cases of technical duplicate charges or accidental transfers, written requests within 7 days will be reconciled.',
    },
    {
      num: '৫',
      titleBn: 'বার্ষিক হিসাব নিরীক্ষা ও উন্মুক্ত প্রতিবেদন',
      titleEn: 'Annual Independent Audit & Public Disclosures',
      descBn: 'রৌমারী জনকল্যাণ ফাউন্ডেশনের প্রতিটি আর্থিক বছরের আয়-ব্যয়ের হিসাব নিরীক্ষক দ্বারা নিরীক্ষিত হয় এবং সংক্ষিপ্ত অডিট রিপোর্ট ওয়েবসাইটের বার্ষিক প্রতিবেদন অংশে জনসাধারণের জন্য উন্মুক্ত রাখা হয়।',
      descEn: 'Our accounts are audited annually by certified independent auditors, with summarized balance sheets publicly accessible for community accountability.',
    },
    {
      num: '৬',
      titleBn: 'প্রাতিষ্ঠানিক ও নিরাপদ ব্যাংক চ্যানেল',
      titleEn: 'Institutional & Secure Banking Channels',
      descBn: 'কোনো ব্যক্তিগত ব্যাংক একাউন্টে ফাউন্ডেশনের অনুদান গ্রহণ করা হয় না। শুধুমাত্র রৌমারী জনকল্যাণ ফাউন্ডেশন নামে নিবন্ধিত প্রাতিষ্ঠানিক ব্যাংক ও অফিসিয়াল মার্চেন্ট চ্যানেলেই লেনদেন পরিচালিত হয়।',
      descEn: 'Donations are accepted strictly via institutional bank accounts and verified merchant numbers registered in the foundation’s legal name.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBF9] text-[#1E293B]">
      <Navbar 
        lang={lang} 
        onToggleLang={() => setLang(l => l === 'bn' ? 'en' : 'bn')} 
        onOpenDonation={() => setDonationModalOpen(true)}
      />

      <main className="flex-1 pb-20 sm:pb-24">
        {/* Header Hero Banner */}
        <section className="relative overflow-hidden pt-8 pb-10 sm:pt-12 sm:pb-14 bg-gradient-to-b from-emerald-50/50 via-white to-[#FAFBF9]">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
            <div className="absolute top-1/2 -right-20 h-80 w-80 rounded-full bg-red-300/20 blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#0D5C35] text-xs font-bold mb-3 shadow-2xs">
                <FileCheck className="w-3.5 h-3.5 text-[#0D5C35]" />
                <span>{t('আর্থিক স্বচ্ছতা, জবাবদিহিতা ও অডিট নীতিমালা', 'Financial Transparency, Accountability & Audit Policy')}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-4">
                {t('অনুদান ও আর্থিক স্বচ্ছতা নীতিমালা', 'Donation & Financial Transparency Policy')}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-stone-600 leading-relaxed font-normal">
                {t(
                  'রৌমারী জনকল্যাণ ফাউন্ডেশনের প্রতিটি অনুদানের প্রতিটি পয়সার হিসাব সুরক্ষিত ও যাচাইযোগ্য। আমরা দাতাদের আমানতের শতভাগ মর্যাদা রক্ষায় দায়বদ্ধ।',
                  'Ensuring strict financial integrity, zero administrative leakage, auditable digital receipts, and shariah-compliant zakat distribution in char communities.'
                )}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Policy Document Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2">
          <div className="space-y-5">
            {policies.map((p, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className={`${glassCard} p-6 sm:p-7 space-y-2`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#0D5C35] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {p.num}
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
                    {t(p.titleBn, p.titleEn)}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-10">
                  {t(p.descBn, p.descEn)}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Trust Seal Card */}
          <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-emerald-50 border border-emerald-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0D5C35] text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900">{t('কোনো প্রশ্ন বা অডিট অনুসন্ধান?', 'Have Any Financial Audit Inquiries?')}</h3>
                <p className="text-xs text-stone-600">{t('আমাদের কোষাধ্যক্ষ ও নিরীক্ষা কমিটির সাথে সরাসরি যোগাযোগ করতে পারেন।', 'Contact our audit and finance wing at accounts@rjf.org.bd')}</p>
              </div>
            </div>
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-full bg-[#0D5C35] hover:bg-[#094527] text-white text-xs sm:text-sm font-bold transition shrink-0"
            >
              {t('যোগাযোগ করুন', 'Contact Us')}
            </Link>
          </div>
        </div>
      </main>

      <Footer 
        lang={lang} 
        onOpenAssistance={() => setAssistanceModalOpen(true)}
        onOpenDonation={() => setDonationModalOpen(true)}
      />

      <MobileBottomBar
        lang={lang}
        onOpenAssistance={() => setAssistanceModalOpen(true)}
        onOpenDonation={() => setDonationModalOpen(true)}
      />

      <BackToTop />

      <AssistanceModal
        isOpen={assistanceModalOpen}
        onClose={() => setAssistanceModalOpen(false)}
        lang={lang}
      />

      <DonationModal
        isOpen={donationModalOpen}
        onClose={() => setDonationModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
