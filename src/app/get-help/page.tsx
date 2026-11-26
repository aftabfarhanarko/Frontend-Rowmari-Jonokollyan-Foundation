'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  ArrowRight,
  ShieldCheck, 
  FileText, 
  HeartHandshake, 
  CheckCircle2, 
  Clock, 
  HelpCircle,
  FileCheck,
  Sparkles
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import BackToTop from '@/components/BackToTop';
import AssistanceModal from '@/components/modals/AssistanceModal';
import DonationModal from '@/components/modals/DonationModal';
import TrackingResultModal from '@/components/modals/TrackingResultModal';
import { GlassSection, SectionHeading, glassCard, glassCardHover } from '@/components/ui/glass';
import { MOCK_APPLICATIONS } from '@/data/mockData';
import { Language, ApplicationTrackingStatus } from '@/types';

export default function GetHelpPage() {
  const [lang, setLang] = useState<Language>('bn');
  const [assistanceModalOpen, setAssistanceModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [trackingInput, setTrackingInput] = useState('');
  const [trackingRecord, setTrackingRecord] = useState<ApplicationTrackingStatus | null>(null);

  const t = (bn: string, en: string) => (lang === 'bn' ? bn : en);

  const categories = [
    { 
      key: 'medical', 
      titleBn: 'জরুরি চিকিৎসা ও ওষুধ সহায়তা', 
      titleEn: 'Medical & Medicine Aid', 
      descBn: 'অপারেশন, জটিল হৃদরোগ, থ্যালাসেমিয়া ও নিয়মিত ওষুধ ক্রয়ে আর্থিক সহায়তা।',
      descEn: 'Surgery grants, thalassemia treatment, and regular critical medicine supplies.',
      icon: HeartHandshake,
      color: 'bg-red-100 text-[#D62828]'
    },
    { 
      key: 'winter', 
      titleBn: 'শীতবস্ত্র ও কম্বল সহায়তা', 
      titleEn: 'Winter Clothes & Blankets', 
      descBn: 'কনকনে শীতে চরাঞ্চলের প্রবীণ, শিশু ও দিনমজুর পরিবারের মাঝে উষ্ণ কম্বল বিতরণ।',
      descEn: 'Warm heavy blankets and winter clothing for vulnerable char islanders.',
      icon: Sparkles,
      color: 'bg-red-100 text-[#E53935]'
    },
    { 
      key: 'education', 
      titleBn: 'দরিদ্র ছাত্রছাত্রীদের শিক্ষাবৃত্তি', 
      titleEn: 'Education & Scholarships', 
      descBn: 'ঝরে পড়া রোধে দরিদ্র মেধাবী শিক্ষার্থীদের স্কুল ব্যাগ, বইপত্র ও মাসিক বৃত্তি প্রদান।',
      descEn: 'Monthly academic stipends, uniforms, and textbooks for underprivileged students.',
      icon: FileText,
      color: 'bg-indigo-100 text-indigo-700'
    },
    { 
      key: 'food', 
      titleBn: 'দুর্যোগকালীন জরুরি খাদ্য সহায়তা', 
      titleEn: 'Emergency Food Relief', 
      descBn: 'বন্যা, নদীভাঙন ও আকস্মিক দুর্যোগে দুর্গত পরিবারের ঘরে চাল, ডাল ও শুকনো খাবার পৌঁছানো।',
      descEn: 'Dry food packs and essentials delivered during flash floods and riverbank erosion.',
      icon: CheckCircle2,
      color: 'bg-amber-100 text-amber-800'
    },
  ];

  const handleSearchTracking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingInput.trim()) return;
    const key = trackingInput.trim().toUpperCase();
    setTrackingRecord(MOCK_APPLICATIONS[key] || null);
    setTrackingModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1E293B]">
      <Navbar 
        lang={lang} 
        onToggleLang={() => setLang(l => l === 'bn' ? 'en' : 'bn')} 
        onOpenDonation={() => setDonationModalOpen(true)}
      />

      <main className="flex-1 pb-20 sm:pb-24">
        {/* Header Hero Banner */}
        <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 bg-gradient-to-b from-red-50/50 via-white to-white">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-red-400/20 blur-3xl" />
            <div className="absolute top-1/2 -right-24 h-80 w-80 rounded-full bg-red-300/20 blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-[#D62828] text-xs font-bold mb-3 shadow-2xs">
                <FileCheck className="w-3.5 h-3.5 text-[#D62828]" />
                <span>{t('সহায়তা আবেদন ও লাইভ স্ট্যাটাস ট্র্যাকিং পোর্টাল', 'Assistance Application & Tracking Portal')}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-4">
                {t('প্রয়োজনে আপনার পাশে আছে রৌমারী জনকল্যাণ ফাউন্ডেশন', 'We Are Standing by Your Side in Every Need')}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-stone-600 leading-relaxed font-normal">
                {t(
                  'রৌমারী ও দুর্গম চরাঞ্চলের কোনো মানুষ যাতে অসহায় না থাকে—চিকিৎসা, শীতবস্ত্র, খাদ্য কিংবা শিক্ষায় যেকোনো সহায়তার জন্য সরাসরি অনলাইনে আবেদন করুন।',
                  'Apply online for verified humanitarian aid: medical operations, winter relief, char student scholarships, and emergency rations with real-time status tracking.'
                )}
              </p>
            </motion.div>

            {/* Application Tracking Search Box */}
            <motion.div 
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-8 max-w-2xl"
            >
              <form onSubmit={handleSearchTracking} className="relative flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                    placeholder={t('আপনার ট্র্যাকিং আইডি লিখুন (উদাঃ RJF-2026-MED-101)...', 'Enter your tracking ID (e.g. RJF-2026-MED-101)...')}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-stone-300 text-stone-900 placeholder:text-stone-400 text-xs sm:text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-[#D62828]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-7 py-3.5 rounded-2xl bg-[#D62828] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm shadow-md transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{t('অবস্থা দেখুন', 'Track Status')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Categories of Aid Grid */}
        <GlassSection id="aid-categories">
          <SectionHeading
            title={t('যেসব বিষয়ে সহায়তা দেওয়া হয়', 'Categories of Humanitarian Assistance')}
            subtitle={t('প্রয়োজন অনুসারে সঠিক ক্যাটাগরি বেছে নিয়ে সরাসরি অনলাইনে আবেদন ফরম পূরণ করুন।', 'Select the specific aid category you need and submit your verified application.')}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {categories.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.key} className={`${glassCardHover} p-6 sm:p-7 flex flex-col justify-between`}>
                  <div>
                    <div className="flex items-center gap-3.5 mb-3">
                      <div className={`w-12 h-12 rounded-2xl ${c.color} flex items-center justify-center font-bold shadow-xs`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h2 className="text-lg sm:text-xl font-bold text-stone-900">{t(c.titleBn, c.titleEn)}</h2>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">{t(c.descBn, c.descEn)}</p>
                  </div>

                  <button
                    onClick={() => setAssistanceModalOpen(true)}
                    className="w-full py-3 rounded-xl bg-[#D62828] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm transition cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                  >
                    <span>{t('এই সহায়তার জন্য আবেদন করুন', 'Apply for this Assistance')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </GlassSection>

        {/* Eligibility & Verification Criteria */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="rounded-3xl bg-white border border-stone-200 p-6 sm:p-10 shadow-lg">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D62828] mb-2">
              <ShieldCheck className="w-4 h-4 text-[#D62828]" />
              <span>{t('আবেদনের যোগ্যতা ও যাচাই নীতি', 'Eligibility & Verification Policy')}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 mb-6">
              {t('আবেদনের পূর্বে জেনে নিন গুরুত্বপূর্ণ তথ্য', 'Essential Guidelines Before You Apply')}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs sm:text-sm text-stone-600">
              <div className="space-y-2">
                <div className="font-bold text-stone-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D62828]" />
                  <span>{t('কারা আবেদন করবেন?', 'Who is Eligible?')}</span>
                </div>
                <p className="leading-relaxed">
                  {t('রৌমারী, রাজিবপুর ও পার্শ্ববর্তী চরাঞ্চলের অসহায়, সুবিধাবঞ্চিত, অসুস্থ ও দুর্যোগকবলিত পরিবারের সদস্যরা সরাসরি আবেদন করতে পারবেন।', 'Impoverished char residents, patients needing urgent surgery/medicine, and distressed families in Rowmari.')}
                </p>
              </div>

              <div className="space-y-2">
                <div className="font-bold text-stone-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D62828]" />
                  <span>{t('প্রয়োজনীয় কাগজপত্র', 'Required Documents')}</span>
                </div>
                <p className="leading-relaxed">
                  {t('জাতীয় পরিচয়পত্র/জন্মসনদের কপি এবং চিকিৎসার ক্ষেত্রে ডাক্তারের প্রেসক্রিপশন বা হাসপাতালের ছুটির স্লিপের ছবি যুক্ত করতে হবে।', 'NID or Birth Certificate copy, and medical prescriptions/doctor recommendations for healthcare grants.')}
                </p>
              </div>

              <div className="space-y-2">
                <div className="font-bold text-stone-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D62828]" />
                  <span>{t('যাচাই ও সিদ্ধান্ত', 'Verification Timeline')}</span>
                </div>
                <p className="leading-relaxed">
                  {t('আবেদন জমার ২৪-৪৮ ঘণ্টার মধ্যে স্থানীয় যাচাই কমিটি সরেজমিনে তথ্য মিলিয়ে সিদ্ধান্ত গ্রহণ করে এবং আবেদনকারীকে অবহিত করে।', 'The local verification committee inspects details within 24-48 hours and notifies the applicant.')}
                </p>
              </div>
            </div>
          </div>
        </section>
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

      <TrackingResultModal
        isOpen={trackingModalOpen}
        onClose={() => setTrackingModalOpen(false)}
        lang={lang}
        application={trackingRecord}
        searchedId={trackingInput}
      />
    </div>
  );
}
