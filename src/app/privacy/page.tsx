'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Lock, 
  FileText, 
  CheckCircle2, 
  HelpCircle,
  EyeOff
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import BackToTop from '@/components/BackToTop';
import AssistanceModal from '@/components/modals/AssistanceModal';
import DonationModal from '@/components/modals/DonationModal';
import { GlassSection, SectionHeading, glassCard } from '@/components/ui/glass';
import { useGetPublicPageQuery } from '@/store/api/adminApi';
import { Language } from '@/types';

export default function PrivacyPolicyPage() {
  const [lang, setLang] = useState<Language>('bn');
  const [assistanceModalOpen, setAssistanceModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const { data: pageData } = useGetPublicPageQuery('privacy-policy');

  const t = (bn: string, en: string) => (lang === 'bn' ? bn : en);

  const sections = [
    {
      num: '১',
      titleBn: 'ব্যক্তিগত তথ্য সংগ্রহ ও মানবিক সেবার উদ্দেশ্য',
      titleEn: 'Collection & Purpose of Personal Data',
      descBn: 'রৌমারী জনকল্যাণ ফাউন্ডেশন কেবলমাত্র প্রকৃত মানবিক ত্রাণ, চিকিৎসা সহায়তা এবং রক্তদান সমন্বয়ের উদ্দেশ্যেই সীমিত আকারে তথ্য (যেমন: নাম, যোগাযোগের নম্বর, রক্তের গ্রুপ, বসবাসের চর বা এলাকা) সংগ্রহ করে। কোনো বাণিজ্যিক বা অননুমোদিত উদ্দেশ্যে ব্যবহার করা হয় না।',
      descEn: 'Rowmari Janakalyan Foundation collects personal data exclusively for emergency relief delivery, verified patient aid, and voluntary blood donor coordination without any commercial intent.',
    },
    {
      num: '২',
      titleBn: 'রক্তদাতার তথ্যের কঠোর গোপনীয়তা ও সুরক্ষা (কঠোর নিয়ম)',
      titleEn: 'Strict Voluntary Blood Donor Confidentiality',
      descBn: 'রক্তদাতাদের ফোন নম্বর বা ব্যক্তিগত পরিচয় কোনো অবস্থাতেই উন্মুক্ত ওয়েবসাইট, সামাজিক যোগাযোগ মাধ্যম বা গ্রুপে প্রচার করা হয় না। হাসপাতালে মুমূর্ষু রোগীর রক্তের প্রয়োজনে অনুমোদিত ব্লাড কো-অর্ডিনেটর কেবল রক্তদাতার সম্মতিক্রমে ব্যক্তিগতভাবে যোগাযোগ করেন।',
      descEn: 'Volunteer donor phone numbers and addresses are strictly protected and never published on public websites or social channels. Coordinators contact donors only upon consent during emergencies.',
    },
    {
      num: '৩',
      titleBn: 'আবেদনকারী ও সুবিধাভোগীর মানবিক মর্যাদা রক্ষা',
      titleEn: 'Dignity & Privacy of Beneficiaries',
      descBn: 'সহায়তাপ্রার্থী দরিদ্র ও অসহায় পরিবারের পারিবারিক বা আর্থিক দুরবস্থার তথ্য তৃতীয় কোনো পক্ষের নিকট প্রকাশ করা হয় না। কার্যক্রমের স্থিরচিত্র বা ভিডিও ডকুমেন্টেশনের ক্ষেত্রে সুবিধাভোগীর শালীনতা ও মানবিক মর্যাদা অক্ষুণ্ণ রাখা হয়।',
      descEn: 'Personal and medical information of assistance applicants is kept confidential. Fieldwork documentation strictly adheres to human dignity guidelines.',
    },
    {
      num: '৪',
      titleBn: 'ডেটা এনক্রিপশন ও রোল-বেজড অ্যাক্সেস কন্ট্রোল',
      titleEn: 'Data Encryption & Role-Based Access Control',
      descBn: 'আমাদের কেন্দ্রীয় ডাটাবেজ সুরক্ষিত ক্লাউড সার্ভারে এনক্রিপ্টেড অবস্থায় সংরক্ষিত থাকে। শুধুমাত্র অনুমোদিত কার্যনির্বাহী সদস্যবৃন্দ তাদের নির্দিষ্ট দায়িত্বের সীমানায় তথ্য অ্যাক্সেস করতে পারেন।',
      descEn: 'All applicant and donor records are encrypted and governed by strict role-based access control, ensuring zero unauthorized data tampering.',
    },
    {
      num: '৫',
      titleBn: 'ব্যবহারকারীর অধিকার ও তথ্য সংশোধনের অনুরোধ',
      titleEn: 'User Rights & Contact Information',
      descBn: 'যে কোনো রক্তদাতা বা আবেদনকারী যেকোনো সময় তাদের নিবন্ধিত তথ্য হালনাগাদ, সংশোধন বা ডাটাবেজ থেকে অপসারণের জন্য আমাদের প্রশাসনিক ডেস্কে যোগাযোগ করতে পারেন।',
      descEn: 'Users may update, correct, or request deletion of their records at any time by contacting our data protection desk.',
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
                <Lock className="w-3.5 h-3.5 text-[#0D5C35]" />
                <span>{t('আইনগত কমপ্লায়েন্স ও ডেটা সুরক্ষা নীতিমালা', 'Legal Compliance & Data Protection Policy')}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-4">
                {t('গোপনীয়তা ও ডেটা সুরক্ষা নীতিমালা', 'Privacy & Data Protection Policy')}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-stone-600 leading-relaxed font-normal">
                {t(
                  'রৌমারী জনকল্যাণ ফাউন্ডেশন রক্তদাতা, সহায়তাপ্রার্থী এবং দাতাদের তথ্যের সর্বোচ্চ নিরাপত্তা ও গোপনীয়তা রক্ষায় দৃঢ়ভাবে অঙ্গীকারবদ্ধ।',
                  'Committed to the highest standards of data confidentiality, respecting the human dignity of beneficiaries, and safeguarding voluntary blood donors.'
                )}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2">
          <div className="space-y-5">
            {sections.map((s, idx) => (
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
                    {s.num}
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
                    {t(s.titleBn, s.titleEn)}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-10">
                  {t(s.descBn, s.descEn)}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Contact Privacy Desk */}
          <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0D5C35] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900">{t('তথ্য সংশোধন বা প্রত্যাহারের আবেদন', 'Data Correction or Removal Inquiries')}</h3>
                <p className="text-xs text-stone-600">{t('যেকোনো গোপনীয়তা সংক্রান্ত প্রশ্নে আমাদের আইটি ও কমপ্লায়েন্স ডেস্কে লিখুন।', 'Reach our compliance coordinator at privacy@rjf.org.bd')}</p>
              </div>
            </div>
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-full bg-[#0D5C35] hover:bg-[#094527] text-white text-xs sm:text-sm font-bold transition shrink-0"
            >
              {t('যোগাযোগ করুন', 'Contact Privacy Desk')}
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
