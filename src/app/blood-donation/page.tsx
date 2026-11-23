'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Droplet, 
  ShieldCheck, 
  Phone, 
  Clock, 
  CheckCircle2, 
  Users, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import BackToTop from '@/components/BackToTop';
import BloodRequestModal from '@/components/modals/BloodRequestModal';
import BloodDonorModal from '@/components/modals/BloodDonorModal';
import AssistanceModal from '@/components/modals/AssistanceModal';
import DonationModal from '@/components/modals/DonationModal';
import { GlassSection, SectionHeading, glassCard, glassCardHover } from '@/components/ui/glass';
import { FOUNDATION_INFO } from '@/data/mockData';
import { Language } from '@/types';

export default function BloodDonationPage() {
  const [lang, setLang] = useState<Language>('bn');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [bloodRequestOpen, setBloodRequestOpen] = useState(false);
  const [bloodDonorOpen, setBloodDonorOpen] = useState(false);
  const [assistanceModalOpen, setAssistanceModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);

  const t = (bn: string, en: string) => (lang === 'bn' ? bn : en);

  const bloodGroups = [
    { group: 'A+', donorsBn: '১৮০+ জন', donorsEn: '180+ donors', status: 'available' },
    { group: 'A-', donorsBn: '৪৫+ জন', donorsEn: '45+ donors', status: 'rare' },
    { group: 'B+', donorsBn: '৩৫০+ জন', donorsEn: '350+ donors', status: 'available' },
    { group: 'B-', donorsBn: '৪০+ জন', donorsEn: '40+ donors', status: 'rare' },
    { group: 'O+', donorsBn: '৪২০+ জন', donorsEn: '420+ donors', status: 'available' },
    { group: 'O-', donorsBn: '৩৫+ জন', donorsEn: '35+ donors', status: 'urgent' },
    { group: 'AB+', donorsBn: '১১০+ জন', donorsEn: '110+ donors', status: 'available' },
    { group: 'AB-', donorsBn: '২০+ জন', donorsEn: '20+ donors', status: 'urgent' },
  ];

  const steps = [
    {
      step: '০১',
      titleBn: 'জরুরি রিকুয়েস্ট বা হটলাইন',
      titleEn: 'Request or Hotline Call',
      descBn: 'অনলাইন ফর্ম পূরণ করে বা সরাসরি আমাদের ২৪/৭ জরুরি ব্লাড ডেস্কে ফোন করে রক্তের চাহিদা জানান।',
      descEn: 'Submit online form or call 24/7 hotline with patient location and required blood units.',
    },
    {
      step: '০২',
      titleBn: 'নিকটস্থ ডোনার ম্যাচিং',
      titleEn: 'Nearest Donor Match',
      descBn: 'রৌমারী উপজেলা ও নিকটস্থ কুড়িগ্রামের তালিকাভুক্ত সক্রিয় রক্তদাতার সাথে সমন্বয়ক যোগাযোগ করেন।',
      descEn: 'Coordinators instantly filter verified available donors closest to the hospital.',
    },
    {
      step: '০৩',
      titleBn: 'হাসপাতালে সরাসরি উপস্থিতি',
      titleEn: 'Hospital Attendance',
      descBn: 'স্বেচ্ছাসেবক রক্তদাতা নির্ধারিত সময়ে হাসপাতালে উপস্থিত হয়ে বিনামূল্যে সরাসরি রক্তদান করেন।',
      descEn: 'The volunteer donor arrives at the hospital lab to donate blood directly to the patient.',
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
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 bg-gradient-to-b from-red-50/50 via-white to-[#FAFBF9]">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-red-400/20 blur-3xl" />
            <div className="absolute top-1/2 -right-24 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-[#E53935] text-xs font-bold mb-3 shadow-2xs">
                <Droplet className="w-3.5 h-3.5 text-[#E53935] animate-pulse" />
                <span>{t('২৪/৭ লাইভ ইমার্জেন্সি ব্লাড নেটওয়ার্ক • রৌমারী শাখা', '24/7 Live Emergency Blood Network • Rowmari')}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-4">
                {t('এক ব্যাগ রক্ত, একটি মুমূর্ষু জীবনের আলো', 'One Bag of Blood, A Lifeline for Humanity')}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-stone-600 leading-relaxed font-normal">
                {t(
                  'রৌমারী উপজেলা স্বাস্থ্য কমপ্লেক্স এবং কুড়িগ্রামের হাসপাতালে রক্তের প্রয়োজনে ১,২০০+ নিবন্ধিত স্বেচ্ছাসেবী রক্তদাতা মানুষের পাশে দাঁড়াতে সদা প্রস্তুত।',
                  'Connecting verified voluntary blood donors with critical hospital patients across Rowmari, Rajibpur, and Kurigram round the clock.'
                )}
              </p>
            </motion.div>

            {/* Urgent Hotline Card with Red Accent */}
            <motion.div 
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-8 rounded-3xl bg-gradient-to-br from-[#E53935] via-[#D32F2F] to-[#991b1b] p-6 sm:p-8 text-white shadow-xl shadow-red-950/20 relative overflow-hidden"
            >
              <div aria-hidden className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

              <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{t('তাৎক্ষণিক ইমার্জেন্সি হটলাইন', 'Immediate 24/7 Call Desk')}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black leading-tight">
                    {t('জরুরি রক্তের প্রয়োজনে সরাসরি ফোন দিন', 'Need Blood Right Now? Call Our Emergency Desk')}
                  </h2>
                  <p className="text-xs sm:text-sm text-red-100 font-mono font-bold tracking-wider">
                    {FOUNDATION_INFO.emergencyBloodHotline} • {t('সার্বক্ষণিক খোলা', 'Open 24/7/365')}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  <button
                    onClick={() => setBloodRequestOpen(true)}
                    className="flex-1 md:flex-none px-6 py-3 rounded-full bg-white text-[#E53935] hover:bg-stone-100 font-bold text-xs sm:text-sm transition shadow-lg cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Droplet className="w-4 h-4 text-[#E53935]" />
                    <span>{t('রক্তের আবেদন করুন', 'Request Blood Online')}</span>
                  </button>

                  <button
                    onClick={() => setBloodDonorOpen(true)}
                    className="flex-1 md:flex-none px-6 py-3 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-md text-white font-bold text-xs sm:text-sm transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>{t('রক্তদাতা নিবন্ধন', 'Become a Donor')}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Interactive Blood Groups Matrix */}
        <GlassSection id="blood-groups" tone="red">
          <SectionHeading
            title={t('রক্তের গ্রুপ ও ডোনার তালিকা', 'Blood Groups & Active Donors')}
            subtitle={t('রৌমারী জনকল্যাণ ফাউন্ডেশনের ভেরিফাইড রক্তদাতা ডাটাবেজ। গ্রুপ নির্বাচন করে দেখুন।', 'Verified voluntary donor counts categorized by blood group across char unions.')}
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
            {bloodGroups.map((bg) => {
              const isSelected = selectedGroup === bg.group;
              return (
                <motion.div
                  key={bg.group}
                  whileHover={{ y: -4, scale: 1.02 }}
                  onClick={() => setSelectedGroup(isSelected ? null : bg.group)}
                  className={`p-4 sm:p-5 rounded-2xl border text-center transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-red-500 text-white border-red-600 shadow-lg' 
                      : `${glassCardHover}`
                  }`}
                >
                  <span className={`text-2xl sm:text-3xl font-black block mb-1 ${
                    isSelected ? 'text-white' : 'text-[#E53935]'
                  }`}>
                    {bg.group}
                  </span>
                  <span className={`text-xs block font-bold ${
                    isSelected ? 'text-white/90' : 'text-stone-700'
                  }`}>
                    {t(bg.donorsBn, bg.donorsEn)}
                  </span>
                  <span className={`text-[10px] mt-1 inline-block px-2 py-0.5 rounded-full font-bold ${
                    isSelected 
                      ? 'bg-white/20 text-white' 
                      : bg.status === 'urgent' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {bg.status === 'urgent' ? t('জরুরি প্রয়োজন', 'Urgent') : t('সক্রিয়', 'Active')}
                  </span>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => setBloodDonorOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0D5C35] hover:bg-[#094527] text-white font-bold text-xs sm:text-sm shadow-md transition cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>{t('আপনার গ্রুপের রক্তদাতা হিসেবে যুক্ত হোন', 'Register Your Blood Group')}</span>
            </button>
          </div>
        </GlassSection>

        {/* 3 Step Blood Request Procedure */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <SectionHeading
            title={t('রক্ত পেতে যা করতে হবে', 'How the Blood Network Works')}
            subtitle={t('জরুরি মুহূর্তে খুব সহজ ও দ্রুত প্রক্রিয়ায় রক্তদাতা পৌঁছে দেওয়ার ব্যবস্থা।', 'A seamless 3-step rapid coordination process connecting hospital beds directly to verified donors.')}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {steps.map((s, idx) => (
              <div key={idx} className={`${glassCardHover} p-6 sm:p-7 relative`}>
                <span className="text-4xl font-black text-[#E53935]/15 absolute top-5 right-6 font-mono">
                  {s.step}
                </span>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E53935] to-red-600 text-white flex items-center justify-center font-bold text-lg mb-4 shadow-md shadow-red-950/20">
                  <Droplet className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-lg font-bold text-stone-900 mb-2">{t(s.titleBn, s.titleEn)}</h2>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{t(s.descBn, s.descEn)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Strict Confidentiality & Trust */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-emerald-50 border border-emerald-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-[#0D5C35] text-white flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div className="space-y-1.5 flex-1">
              <h2 className="text-base sm:text-lg font-bold text-stone-900">
                {t('রক্তদাতার তথ্যের শতভাগ কঠোর গোপনীয়তা নীতি', 'Strict Donor Confidentiality Guarantee')}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {t(
                  'রক্তদাতাদের ফোন নম্বর বা ব্যক্তিগত তথ্য কোনো পাবলিক ওয়েবসাইট, গ্রুপ বা সোশ্যাল মিডিয়ায় প্রচার করা হয় না। শুধুমাত্র হাসপাতাল প্রাঙ্গণে প্রকৃত রোগীর প্রয়োজনে সমন্বয়ক সম্মতি নিয়ে যোগাযোগ করেন। রক্তদান সম্পূর্ণ বিনামূল্যে ও মানবিক।',
                  'Donor phone numbers are strictly private and never publicly shared online. Certified coordinators contact donors exclusively during verified hospital emergencies. Blood donation is 100% voluntary and non-commercial.'
                )}
              </p>
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

      <BloodRequestModal
        isOpen={bloodRequestOpen}
        onClose={() => setBloodRequestOpen(false)}
        lang={lang}
      />

      <BloodDonorModal
        isOpen={bloodDonorOpen}
        onClose={() => setBloodDonorOpen(false)}
        lang={lang}
      />

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
