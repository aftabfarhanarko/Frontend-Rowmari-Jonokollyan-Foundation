'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Users, 
  ShieldCheck, 
  HeartHandshake, 
  Sparkles, 
  Award, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  BookOpen,
  FileText
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import BackToTop from '@/components/BackToTop';
import VolunteerModal from '@/components/modals/VolunteerModal';
import DonationModal from '@/components/modals/DonationModal';
import { GlassSection, SectionHeading, glassCard, glassCardHover } from '@/components/ui/glass';
import { Language } from '@/types';

export default function VolunteerPage() {
  const [lang, setLang] = useState<Language>('bn');
  const [modalOpen, setModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);

  const t = (bn: string, en: string) => (lang === 'bn' ? bn : en);

  const wings = [
    {
      icon: BookOpen,
      titleBn: 'শিক্ষা ও মেধা বিকাশ সেল',
      titleEn: 'Education & Youth Development',
      descBn: 'সুবিধাবঞ্চিত শিশুদের স্কুল উপকরণ বিতরণ, পাঠাগার পরিচালনা এবং শিক্ষাবৃত্তি কার্যক্রমে সহায়তা।',
      descEn: 'Assisting marginalized students with school supplies, library operations, and scholarship programs.',
      color: 'bg-amber-100 text-amber-800',
    },
    {
      icon: HeartHandshake,
      titleBn: 'মাঠপর্যায়ের ত্রাণ ও পুনর্বাসন টিম',
      titleEn: 'Field Relief & Logistics Team',
      descBn: 'দুর্গম চরাঞ্চলে বাড়ি বাড়ি গিয়ে প্রকৃত দুস্থ পরিবার যাচাই, শীতবস্ত্র প্যাকিং ও সরাসরি বিতরণ পরিচালনা।',
      descEn: 'Surveying remote char households, packing winter clothes/relief kits, and executing direct distributions.',
      color: 'bg-red-100 text-[#D62828]',
    },
    {
      icon: FileText,
      titleBn: 'চিকিৎসা ক্যাম্প ও রোগী সহায়তা সেল',
      titleEn: 'Medical Camps & Healthcare Cell',
      descBn: 'বিশেষজ্ঞ ডাক্তার ক্যাম্পে রোগী নিবন্ধন, প্রেসক্রিপশন বিতরণ ও জরুরি ওষুধ ব্যবস্থাপনায় সহায়তা।',
      descEn: 'Managing patient registration, crowd flow, and prescription medicine distribution during clinics.',
      color: 'bg-red-50 text-red-700',
    },
    {
      icon: Sparkles,
      titleBn: 'মিডিয়া, আইটি ও ডকুমেন্টেশন ডেস্ক',
      titleEn: 'Media, IT & Public Relations',
      descBn: 'মাঠপর্যায়ের কাজের স্থিরচিত্র ও ভিডিও ধারণ, সোশ্যাল মিডিয়ায় সচেতনতা সৃষ্টি ও ডিজিটাল ডাটা এন্ট্রি।',
      descEn: 'Photographic documentation, social awareness publishing, and beneficiary application records.',
      color: 'bg-stone-100 text-stone-800',
    },
  ];

  const benefits = [
    {
      titleBn: 'মানবতার সেবায় আত্মতৃপ্তি',
      titleEn: 'Spiritual Fulfillment',
      descBn: 'দুর্গম চরাঞ্চলের অসহায় মানুষের মুখে হাসি ফোটানোর চেয়ে মহৎ আনন্দ আর কিছু হতে পারে না।',
      descEn: 'The purest joy of directly touching vulnerable lives and bringing smiles to distressed families.',
    },
    {
      titleBn: 'অফিসিয়াল স্বেচ্ছাসেবক সনদ',
      titleEn: 'Official Volunteer Certificate',
      descBn: 'সক্রিয় অংশগ্রহণের স্বীকৃতিস্বরূপ ফাউন্ডেশনের পক্ষ থেকে প্রাতিষ্ঠানিক অভিজ্ঞতা প্রশংসাপত্র প্রদান।',
      descEn: 'Institutional certificates of social welfare service validating leadership and civic contributions.',
    },
    {
      titleBn: 'নেতৃত্ব ও টিমওয়ার্ক দক্ষতা বৃদ্ধি',
      titleEn: 'Leadership & Team Building',
      descBn: 'দুর্যোগকালীন উদ্ধার, লজিস্টিকস ব্যবস্থাপনা ও তাৎক্ষণিক সিদ্ধান্ত গ্রহণের বাস্তব অভিজ্ঞতা অর্জন।',
      descEn: 'Direct hands-on experience in disaster logistics, emergency response, and community organizing.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1E293B]">
      <Navbar 
        lang={lang} 
        onToggleLang={() => setLang(l => l === 'bn' ? 'en' : 'bn')} 
        onOpenDonation={() => setDonationModalOpen(true)}
      />

      <main className="flex-1 pb-20 sm:pb-24">
        {/* Header Hero Banner */}
        <section className="relative overflow-hidden pt-8 pb-10 sm:pt-12 sm:pb-14 bg-gradient-to-b from-red-50/50 via-white to-white">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-red-400/20 blur-3xl" />
            <div className="absolute top-1/2 -right-20 h-80 w-80 rounded-full bg-red-300/20 blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-[#D62828] text-xs font-bold mb-3 shadow-2xs">
                <Users className="w-3.5 h-3.5 text-[#D62828]" />
                <span>{t('স্বেচ্ছাসেবী নেটওয়ার্ক • মানবতার কল্যাণে তারুণ্য', 'Volunteer Network • Youth for Humanity')}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-4">
                {t('আপনার মেধা ও সময় দিয়ে চরাঞ্চলের মানুষের পাশে দাঁড়ান', 'Join Rowmari’s Largest Humanitarian Volunteer Force')}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-stone-600 leading-relaxed font-normal">
                {t(
                  'রৌমারী জনকল্যাণ ফাউন্ডেশনের প্রতিটি কার্যক্রম পরিচালিত হয় উদ্যমী তরুণ ও সমাজসেবীদের স্বেচ্ছাশ্রমের ভিত্তিতে। আপনিও যুক্ত হয়ে পরিবর্তনের অংশীদার হোন।',
                  'Every relief mission is carried out by selfless youth volunteers. Offer your energy, skills, and empathy to create a real impact in remote chars.'
                )}
              </p>
            </motion.div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setModalOpen(true)}
                className="px-8 py-3.5 rounded-full bg-[#D62828] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm shadow-xl shadow-red-950/20 transition cursor-pointer flex items-center gap-2"
              >
                <span>{t('স্বেচ্ছাসেবক হিসেবে নিবন্ধন করুন', 'Apply as Volunteer Now')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Featured Image Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2 mb-12 sm:mb-16">
          <div className="relative w-full h-64 sm:h-80 md:h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-stone-200">
            <Image
              src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1600&auto=format&fit=crop"
              alt="Volunteer Humanitarian Team"
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/25 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider bg-[#E53935] px-3 py-1 rounded-md inline-block mb-2 shadow-md">
                {t('মাঠপর্যায়ের স্বেচ্ছাশ্রম', 'Frontline Action')}
              </span>
              <h2 className="text-lg sm:text-2xl font-black leading-snug drop-shadow-md">
                {t('প্রকৃত অসহায় মানুষের দ্বারে দ্বারে সাহায্য পৌঁছে দেওয়াই আমাদের আনন্দ', 'Reaching the most isolated char homes through rain, river, and cold')}
              </h2>
            </div>
          </div>
        </section>

        {/* 4 Specialized Volunteer Wings */}
        <GlassSection id="volunteer-wings">
          <SectionHeading
            title={t('যেসব উইংয়ে কাজ করতে পারেন', 'Specialized Volunteer Wings')}
            subtitle={t('আপনার পছন্দ ও দক্ষতার ভিত্তিতে যেকোনো উইং নির্বাচন করে কাজ শুরু করতে পারেন।', 'Choose the domain where your passion and skills can make the highest impact.')}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {wings.map((w, idx) => {
              const Icon = w.icon;
              return (
                <div key={idx} className={`${glassCardHover} p-6 sm:p-7 flex flex-col justify-between`}>
                  <div>
                    <div className="flex items-center gap-3.5 mb-3">
                      <div className={`w-12 h-12 rounded-2xl ${w.color} flex items-center justify-center font-bold shadow-xs`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h2 className="text-lg sm:text-xl font-bold text-stone-900">{t(w.titleBn, w.titleEn)}</h2>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">{t(w.descBn, w.descEn)}</p>
                  </div>

                  <button
                    onClick={() => setModalOpen(true)}
                    className="text-xs font-bold text-[#D62828] hover:text-[#E53935] transition inline-flex items-center gap-1.5 cursor-pointer self-start"
                  >
                    <span>{t('এই উইংয়ে যোগ দিন', 'Join this Wing')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </GlassSection>

        {/* Volunteer Benefits */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <SectionHeading
            title={t('স্বেচ্ছাসেবক হিসেবে আপনি যা পাবেন', 'What You Gain as a Volunteer')}
            subtitle={t('মানবতার সেবা করার পাশাপাশি আপনার ব্যক্তিগত ও সামাজিক দক্ষতা বৃদ্ধি পাবে।', 'Social recognition, practical fieldwork skills, and lifelong camaraderie in service.')}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {benefits.map((b, idx) => (
              <div key={idx} className={`${glassCardHover} p-6 sm:p-7 space-y-3`}>
                <div className="w-10 h-10 rounded-xl bg-red-100 text-[#D62828] flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h2 className="text-base sm:text-lg font-bold text-stone-900">{t(b.titleBn, b.titleEn)}</h2>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{t(b.descBn, b.descEn)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Callout */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-[#D62828] via-[#B91C1C] to-stone-950 p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl text-center md:text-left">
              <h2 className="text-xl sm:text-2xl font-black">
                {t('আজই রৌমারী জনকল্যাণ ফাউন্ডেশনের পরিবারে যুক্ত হোন', 'Ready to Make a Real Difference in River Chars?')}
              </h2>
              <p className="text-xs sm:text-sm text-red-100/90 leading-relaxed">
                {t('একটি সহজ অনলাইন ফরম পূরণের মাধ্যমে আপনার আগ্রহ প্রকাশ করুন। আমাদের সমন্বয়ক আপনার সাথে যোগাযোগ করবেন।', 'Complete a quick online registration. Our volunteer desk will connect with you.')}
              </p>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="px-8 py-3.5 rounded-full bg-white text-[#D62828] font-bold text-xs sm:text-sm hover:bg-red-50 transition shadow-lg cursor-pointer shrink-0"
            >
              {t('অনলাইন ফরম পূরণ করুন', 'Open Application Form')}
            </button>
          </div>
        </section>
      </main>

      <Footer 
        lang={lang} 
        onOpenDonation={() => setDonationModalOpen(true)}
      />

      <MobileBottomBar
        lang={lang}
        onOpenDonation={() => setDonationModalOpen(true)}
      />

      <BackToTop />

      <VolunteerModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
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
