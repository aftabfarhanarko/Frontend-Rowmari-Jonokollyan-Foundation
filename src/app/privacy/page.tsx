'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Mail, CalendarDays, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import BackToTop from '@/components/BackToTop';
import DonationModal from '@/components/modals/DonationModal';
import { PageBanner } from '@/components/layout/PageBanner';
import { Language } from '@/types';

const CONTACT_EMAIL = 'contact@rowmarijanakalyan.org';
const UPDATED = { bn: '২৮ নভেম্বর ২০২৬', en: 'November 28, 2026' };

const sections = [
  {
    id: 'collection',
    numBn: '১',
    numEn: '1',
    titleBn: 'ব্যক্তিগত তথ্য সংগ্রহ ও মানবিক সেবার উদ্দেশ্য',
    titleEn: 'Collection & Purpose of Personal Data',
    descBn:
      'রৌমারী জনকল্যাণ ফাউন্ডেশন কেবলমাত্র প্রকৃত মানবিক ত্রাণ, চিকিৎসা সহায়তা এবং সমাজকল্যাণ সমন্বয়ের উদ্দেশ্যেই সীমিত আকারে তথ্য (যেমন: নাম, যোগাযোগের নম্বর, বসবাসের চর বা এলাকা) সংগ্রহ করে। কোনো বাণিজ্যিক বা অননুমোদিত উদ্দেশ্যে ব্যবহার করা হয় না।',
    descEn:
      'Rowmari Janakalyan Foundation collects limited personal data (such as name, phone number and area of residence) exclusively for emergency relief delivery, verified patient aid, and humanitarian coordination — never for commercial purposes.',
  },
  {
    id: 'confidentiality',
    numBn: '২',
    numEn: '2',
    titleBn: 'স্বেচ্ছাসেবক ও আবেদনকারীর তথ্যের কঠোর গোপনীয়তা',
    titleEn: 'Strict Volunteer & Applicant Confidentiality',
    descBn:
      'আবেদনকারী ও স্বেচ্ছাসেবকদের ফোন নম্বর বা ব্যক্তিগত পরিচয় কোনো অবস্থাতেই উন্মুক্ত ওয়েবসাইট, সামাজিক যোগাযোগ মাধ্যম বা গ্রুপে প্রচার করা হয় না। অনুমোদিত কো-অর্ডিনেটর কেবল যাচাই ও সহায়তার প্রয়োজনেই যোগাযোগ করেন।',
    descEn:
      'Applicant and volunteer phone numbers and identities are never published on public websites, social media or groups. Authorized coordinators make contact solely for verification and relief logistics.',
  },
  {
    id: 'dignity',
    numBn: '৩',
    numEn: '3',
    titleBn: 'আবেদনকারী ও সুবিধাভোগীর মানবিক মর্যাদা রক্ষা',
    titleEn: 'Dignity & Privacy of Beneficiaries',
    descBn:
      'সহায়তাপ্রার্থী দরিদ্র ও অসহায় পরিবারের পারিবারিক বা আর্থিক দুরবস্থার তথ্য তৃতীয় কোনো পক্ষের নিকট প্রকাশ করা হয় না। কার্যক্রমের স্থিরচিত্র বা ভিডিও ডকুমেন্টেশনের ক্ষেত্রে সুবিধাভোগীর শালীনতা ও মানবিক মর্যাদা অক্ষুণ্ণ রাখা হয়।',
    descEn:
      'Family, financial and medical hardship details of applicants are never disclosed to third parties. Photos and videos from fieldwork are taken in a way that protects the dignity of every beneficiary.',
  },
  {
    id: 'security',
    numBn: '৪',
    numEn: '4',
    titleBn: 'ডেটা এনক্রিপশন ও রোল-বেজড অ্যাক্সেস কন্ট্রোল',
    titleEn: 'Data Encryption & Role-Based Access Control',
    descBn:
      'আমাদের কেন্দ্রীয় ডাটাবেজ সুরক্ষিত ক্লাউড সার্ভারে এনক্রিপ্টেড অবস্থায় সংরক্ষিত থাকে। শুধুমাত্র অনুমোদিত কার্যনির্বাহী সদস্যবৃন্দ তাদের নির্দিষ্ট দায়িত্বের সীমানায় তথ্য অ্যাক্সেস করতে পারেন।',
    descEn:
      'Our central database is stored encrypted on secure cloud servers. Only authorized executive members can access records, and only within the limits of their specific role.',
  },
  {
    id: 'rights',
    numBn: '৫',
    numEn: '5',
    titleBn: 'ব্যবহারকারীর অধিকার ও তথ্য সংশোধনের অনুরোধ',
    titleEn: 'User Rights & Data Correction',
    descBn:
      'যে কোনো দাতা, স্বেচ্ছাসেবক বা আবেদনকারী যেকোনো সময় নিজের নিবন্ধিত তথ্য হালনাগাদ, সংশোধন বা ডাটাবেজ থেকে মুছে ফেলার অনুরোধ করতে পারেন। অনুরোধ পাওয়ার পর যাচাই করে যুক্তিসংগত সময়ের মধ্যে ব্যবস্থা নেওয়া হবে।',
    descEn:
      'Any donor, volunteer or applicant may ask to update, correct or delete their registered information at any time. We verify the request and act on it within a reasonable time.',
  },
];

export default function PrivacyClient() {
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
          badge={t('তথ্য সুরক্ষা ও গোপনীয়তা অঙ্গীকার', 'Data Protection & Privacy Commitment')}
          title={t('গোপনীয়তা নীতি (Privacy Policy)', 'Privacy Policy')}
          subtitle={t(
            'রৌমারী জনকল্যাণ ফাউন্ডেশন আপনার ব্যক্তিগত তথ্যের সর্বোচ্চ সুরক্ষা ও মানবিক মর্যাদা রক্ষায় প্রতিশ্রুতিবদ্ধ।',
            'Rowmari Janakalyan Foundation is committed to safeguarding your personal information and beneficiary dignity.'
          )}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/25 px-3.5 py-1.5 text-xs font-semibold text-white">
            <CalendarDays className="w-3.5 h-3.5" />
            <span>
              {t('সর্বশেষ হালনাগাদ:', 'Last Updated:')} {t(UPDATED.bn, UPDATED.en)}
            </span>
          </div>
        </PageBanner>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left Sidebar: Quick Index & Security Summary */}
            <aside className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
              <div className="rounded-2xl bg-[#FFF4F5] border border-red-100/80 p-5 space-y-3 shadow-[0_4px_16px_-6px_rgba(214,40,40,0.08)]">
                <div className="flex items-center gap-2">
                  <span className="w-1 h-5 rounded-full bg-[#D62828]" />
                  <h2 className="text-sm font-extrabold text-stone-900">
                    {t('সূচিপত্র', 'Policy Overview')}
                  </h2>
                </div>
                <nav className="space-y-1.5">
                  {sections.map((sec) => (
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
                  <Lock className="w-4 h-4" />
                  <span>{t('তথ্য সংশোধন বা প্রশ্ন?', 'Questions or Requests?')}</span>
                </div>
                <p className="text-xs text-red-50/90 leading-relaxed">
                  {t(
                    'আপনার তথ্য সংশোধন, মুছে ফেলা বা গোপনীয়তা সংক্রান্ত যেকোনো প্রশ্নে সরাসরি যোগাযোগ করুন।',
                    'Contact us directly regarding data correction, deletion, or any privacy inquiries.'
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

            {/* Right Main Content: Numbered Policy Cards */}
            <div className="lg:col-span-8 space-y-4">
              {sections.map((sec, idx) => (
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

              {/* Related Terms Link Strip */}
              <div className="rounded-2xl bg-[#FFF4F5] border border-red-100/80 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-stone-800">
                  <ShieldCheck className="w-5 h-5 text-[#D62828] shrink-0" />
                  <span>
                    {t('আমাদের ওয়েবসাইটের ব্যবহারের শর্তাবলীও দেখে নিন।', 'Also review our Terms & Conditions of Use.')}
                  </span>
                </div>
                <Link
                  href="/terms"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#D62828] hover:bg-[#B91C1C] text-white px-4 py-2 text-xs font-bold transition shrink-0 self-start sm:self-auto"
                >
                  <span>{t('ব্যবহারের শর্তাবলী', 'Terms of Use')}</span>
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
