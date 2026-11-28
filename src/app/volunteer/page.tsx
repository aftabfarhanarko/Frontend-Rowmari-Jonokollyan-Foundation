'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Users,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  FileText,
  ClipboardCheck,
  PhoneCall,
  BadgeCheck,
  Compass,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { PageBanner } from '@/components/layout/PageBanner';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import BackToTop from '@/components/BackToTop';
import VolunteerModal from '@/components/modals/VolunteerModal';
import DonationModal from '@/components/modals/DonationModal';
import { GlassSection, SectionHeading, glassCardHover } from '@/components/ui/glass';
import { Language } from '@/types';

export default function VolunteerPage() {
  const [lang, setLang] = useState<Language>('bn');
  const [modalOpen, setModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);

  const t = (bn: string, en: string) => (lang === 'bn' ? bn : en);

  const stats = [
    { valueBn: '৩২০+', valueEn: '320+', labelBn: 'সক্রিয় স্বেচ্ছাসেবক', labelEn: 'Active Volunteers' },
    { valueBn: '৬টি', valueEn: '6', labelBn: 'ইউনিয়নে ফিল্ড টিম', labelEn: 'Char Union Teams' },
    { valueBn: '৪টি', valueEn: '4', labelBn: 'বিশেষায়িত উইং', labelEn: 'Specialized Wings' },
    { valueBn: '২৪/৭', valueEn: '24/7', labelBn: 'জরুরি সাড়া প্রদান', labelEn: 'Emergency Response' },
  ];

  const steps = [
    {
      numBn: '০১',
      numEn: '01',
      icon: ClipboardCheck,
      titleBn: 'অনলাইন নিবন্ধন',
      titleEn: 'Online Application',
      descBn: 'সহজ ফরম পূরণ করে আপনার নাম, এলাকা, রক্তের গ্রুপ ও পছন্দের উইং নির্বাচন করুন।',
      descEn: 'Fill out the quick form with your contact details, area, blood group, and preferred wing.',
    },
    {
      numBn: '০২',
      numEn: '02',
      icon: PhoneCall,
      titleBn: 'যাচাই ও যোগাযোগ',
      titleEn: 'Verification & Call',
      descBn: 'আমাদের সমন্বয়ক টিম তথ্য যাচাই করে আপনার সাথে সরাসরি যোগাযোগ করবেন।',
      descEn: 'Our coordinator desk verifies your details and connects with you for onboarding.',
    },
    {
      numBn: '০৩',
      numEn: '03',
      icon: BadgeCheck,
      titleBn: 'টিম ও আইডি বরাদ্দ',
      titleEn: 'Team & ID Assignment',
      descBn: 'অনুমোদনের পর আপনার ইউনিয়ন ও উইং অনুযায়ী দায়িত্ব ও ড্যাশবোর্ড অ্যাক্সেস পাবেন।',
      descEn: 'Once approved, receive your union team assignment and volunteer dashboard access.',
    },
    {
      numBn: '০৪',
      numEn: '04',
      icon: Compass,
      titleBn: 'মাঠপর্যায়ে মানবিক সেবা',
      titleEn: 'Field Humanitarian Action',
      descBn: 'ত্রাণ বিতরণ, ফ্রি মেডিকেল ক্যাম্প ও শিক্ষা সহায়তা কার্যক্রমে সরাসরি অংশ নিন।',
      descEn: 'Participate directly in relief drives, free medical camps, and education initiatives.',
    },
  ];

  const wings = [
    {
      icon: BookOpen,
      tagBn: 'শিক্ষা সেল',
      tagEn: 'Education Wing',
      titleBn: 'শিক্ষা ও মেধা বিকাশ সেল',
      titleEn: 'Education & Youth Development',
      descBn: 'সুবিধাবঞ্চিত শিশুদের স্কুল উপকরণ বিতরণ, পাঠাগার পরিচালনা এবং শিক্ষাবৃত্তি কার্যক্রমে সহায়তা।',
      descEn: 'Assisting marginalized students with school supplies, library operations, and scholarship programs.',
      color: 'bg-amber-100 text-amber-800',
    },
    {
      icon: HeartHandshake,
      tagBn: 'ত্রাণ ও পুনর্বাসন',
      tagEn: 'Field Relief',
      titleBn: 'মাঠপর্যায়ের ত্রাণ ও পুনর্বাসন টিম',
      titleEn: 'Field Relief & Logistics Team',
      descBn: 'দুর্গম চরাঞ্চলে বাড়ি বাড়ি গিয়ে প্রকৃত দুস্থ পরিবার যাচাই, শীতবস্ত্র প্যাকিং ও সরাসরি বিতরণ পরিচালনা।',
      descEn: 'Surveying remote char households, packing winter clothes/relief kits, and executing direct distributions.',
      color: 'bg-red-100 text-[#D62828]',
    },
    {
      icon: FileText,
      tagBn: 'স্বাস্থ্যসেবা সেল',
      tagEn: 'Medical Wing',
      titleBn: 'চিকিৎসা ক্যাম্প ও রোগী সহায়তা সেল',
      titleEn: 'Medical Camps & Healthcare Cell',
      descBn: 'বিশেষজ্ঞ ডাক্তার ক্যাম্পে রোগী নিবন্ধন, প্রেসক্রিপশন বিতরণ ও জরুরি ওষুধ ব্যবস্থাপনায় সহায়তা।',
      descEn: 'Managing patient registration, crowd flow, and prescription medicine distribution during clinics.',
      color: 'bg-red-50 text-red-700',
    },
    {
      icon: Sparkles,
      tagBn: 'মিডিয়া ও আইটি',
      tagEn: 'Media & IT',
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

  const requirements = [
    {
      bn: 'ন্যূনতম বয়স ১৮ বছর এবং মানবিক কাজে স্বেচ্ছায় অংশগ্রহণের মানসিকতা।',
      en: 'Minimum age 18 years with genuine commitment to voluntary humanitarian service.',
    },
    {
      bn: 'দলমত ও ধর্ম-বর্ণ নির্বিশেষে অরাজনৈতিক ও নিরপেক্ষভাবে কাজ করার অঙ্গীকার।',
      en: 'Commitment to neutral, non-political, and inclusive community service.',
    },
    {
      bn: 'জরুরি দুর্যোগ বা ক্যাম্পের সময় স্থানীয় টিমের সাথে সমন্বয় করে সময় দেওয়ার সক্ষমতা।',
      en: 'Ability to coordinate with local union teams during camps or emergency relief.',
    },
    {
      bn: 'ফাউন্ডেশনের গোপনীয়তা নীতি ও সুবিধাভোগীর মানবিক মর্যাদা রক্ষায় শ্রদ্ধাশীল থাকা।',
      en: 'Strict adherence to beneficiary dignity and organizational privacy standards.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1E293B]" lang={lang === 'bn' ? 'bn' : 'en'}>
      <Navbar
        lang={lang}
        onToggleLang={() => setLang((l) => (l === 'bn' ? 'en' : 'bn'))}
        onOpenDonation={() => setDonationModalOpen(true)}
      />

      <main className="flex-1 pb-20 sm:pb-24">
        <PageBanner
          badge={t('স্বেচ্ছাসেবী নেটওয়ার্ক • মানবতার কল্যাণে তারুণ্য', 'Volunteer Network • Youth for Humanity')}
          title={t('আপনার মেধা ও সময় দিয়ে চরাঞ্চলের মানুষের পাশে দাঁড়ান', 'Join Rowmari’s Largest Humanitarian Volunteer Force')}
          subtitle={t(
            'রৌমারী জনকল্যাণ ফাউন্ডেশনের প্রতিটি কার্যক্রম পরিচালিত হয় উদ্যমী তরুণ ও সমাজসেবীদের স্বেচ্ছাশ্রমের ভিত্তিতে। আপনিও যুক্ত হয়ে পরিবর্তনের অংশীদার হোন।',
            'Every relief mission is carried out by selfless youth volunteers. Offer your energy, skills, and empathy to create a real impact in remote chars.'
          )}
        >
          <div className="space-y-5">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="px-7 py-3 rounded-full bg-white hover:bg-red-50 text-[#D62828] font-bold text-xs sm:text-sm shadow-lg transition cursor-pointer inline-flex items-center gap-2 active:scale-[0.98]"
            >
              <span>{t('স্বেচ্ছাসেবক হিসেবে নিবন্ধন করুন', 'Apply as Volunteer Now')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {stats.map((s, idx) => (
                <div key={idx} className="rounded-2xl bg-white/95 p-3.5 sm:p-4 text-center shadow-md">
                  <div className="text-xl sm:text-2xl font-black text-[#D62828] mb-0.5">
                    {t(s.valueBn, s.valueEn)}
                  </div>
                  <div className="text-[11px] sm:text-xs font-semibold text-stone-600">
                    {t(s.labelBn, s.labelEn)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PageBanner>

        {/* Featured Image Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2 mb-10 sm:mb-14">
          <div className="relative w-full h-60 sm:h-80 md:h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-stone-200">
            <Image
              src="/images/activities/food-aid.jpg"
              alt={t('রৌমারী জনকল্যাণ ফাউন্ডেশনের স্বেচ্ছাসেবক টিম', 'Volunteer Humanitarian Team')}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/25 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 text-white max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider bg-[#E53935] px-3 py-1 rounded-md inline-block mb-2 shadow-md">
                {t('মাঠপর্যায়ের স্বেচ্ছাশ্রম', 'Frontline Action')}
              </span>
              <h2 className="text-lg sm:text-2xl font-black leading-snug drop-shadow-md">
                {t('প্রকৃত অসহায় মানুষের দ্বারে দ্বারে সাহায্য পৌঁছে দেওয়াই আমাদের আনন্দ', 'Reaching the most isolated char homes through rain, river, and cold')}
              </h2>
            </div>
          </div>
        </section>

        {/* 4-Step Structured Onboarding Process */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14">
          <SectionHeading
            title={t('কীভাবে স্বেচ্ছাসেবক হিসেবে যুক্ত হবেন', 'How to Join in 4 Simple Steps')}
            subtitle={t(
              'স্বচ্ছ ও সুশৃঙ্খল প্রক্রিয়ায় মাত্র কয়েকটি ধাপে আমাদের ফিল্ড টিমের অংশ হোন।',
              'A structured onboarding process from online application to active fieldwork.'
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-stone-200/90 bg-white p-5 shadow-2xs hover:border-red-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-1 rounded-full bg-red-50 text-[#D62828] text-xs font-black font-mono">
                        {t(step.numBn, step.numEn)}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-stone-100 text-[#D62828] flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="text-base font-extrabold text-stone-900 mb-1.5">
                      {t(step.titleBn, step.titleEn)}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {t(step.descBn, step.descEn)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4 Specialized Volunteer Wings */}
        <GlassSection id="volunteer-wings">
          <SectionHeading
            title={t('যেসব উইংয়ে কাজ করতে পারেন', 'Specialized Volunteer Wings')}
            subtitle={t(
              'আপনার পছন্দ ও দক্ষতার ভিত্তিতে যেকোনো উইং নির্বাচন করে কাজ শুরু করতে পারেন।',
              'Choose the domain where your passion and skills can make the highest impact.'
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {wings.map((w, idx) => {
              const Icon = w.icon;
              return (
                <div key={idx} className={`${glassCardHover} p-6 sm:p-7 flex flex-col justify-between`}>
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3.5">
                        <div className={`w-12 h-12 rounded-2xl ${w.color} flex items-center justify-center font-bold shadow-xs shrink-0`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-stone-900">{t(w.titleBn, w.titleEn)}</h3>
                      </div>
                      <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-stone-100 text-stone-600 text-[11px] font-bold shrink-0">
                        {t(w.tagBn, w.tagEn)}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">{t(w.descBn, w.descEn)}</p>
                  </div>

                  <button
                    type="button"
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

        {/* Volunteer Benefits + Eligibility Checklist */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
          <div>
            <SectionHeading
              title={t('স্বেচ্ছাসেবক হিসেবে আপনি যা পাবেন', 'What You Gain as a Volunteer')}
              subtitle={t(
                'মানবতার সেবা করার পাশাপাশি আপনার ব্যক্তিগত ও সামাজিক দক্ষতা বৃদ্ধি পাবে।',
                'Social recognition, practical fieldwork skills, and lifelong camaraderie in service.'
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {benefits.map((b, idx) => (
                <div key={idx} className={`${glassCardHover} p-6 sm:p-7 space-y-3`}>
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-[#D62828] flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-stone-900">{t(b.titleBn, b.titleEn)}</h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{t(b.descBn, b.descEn)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility & Code of Conduct */}
          <div className="rounded-3xl bg-[#FFF4F5] border border-red-100/90 p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-[#D62828] text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-stone-900">
                  {t('স্বেচ্ছাসেবক হওয়ার যোগ্যতা ও আচরণবিধি', 'Volunteer Eligibility & Code of Conduct')}
                </h3>
                <p className="text-xs text-stone-500">
                  {t('আমাদের প্রতিটি স্বেচ্ছাসেবকের জন্য অনুসরণীয় মূল নীতিমালা', 'Core guidelines followed by every RJF volunteer')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {requirements.map((req, idx) => (
                <div key={idx} className="flex items-start gap-2.5 bg-white p-4 rounded-2xl border border-red-100/70">
                  <CheckCircle2 className="w-4 h-4 text-[#D62828] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">{t(req.bn, req.en)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Callout */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-[#D62828] via-[#B91C1C] to-stone-950 p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-red-200 text-xs font-bold">
                <Users className="w-3.5 h-3.5" />
                <span>{t('রৌমারী স্বেচ্ছাসেবী নেটওয়ার্ক', 'Rowmari Volunteer Network')}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black">
                {t('আজই রৌমারী জনকল্যাণ ফাউন্ডেশনের পরিবারে যুক্ত হোন', 'Ready to Make a Real Difference in River Chars?')}
              </h2>
              <p className="text-xs sm:text-sm text-red-100/90 leading-relaxed">
                {t(
                  'একটি সহজ অনলাইন ফরম পূরণের মাধ্যমে আপনার আগ্রহ প্রকাশ করুন। আমাদের সমন্বয়ক আপনার সাথে যোগাযোগ করবেন।',
                  'Complete a quick online registration. Our volunteer desk will connect with you.'
                )}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="px-8 py-3.5 rounded-full bg-white text-[#D62828] font-bold text-xs sm:text-sm hover:bg-red-50 transition shadow-lg cursor-pointer shrink-0"
            >
              {t('অনলাইন ফরম পূরণ করুন', 'Open Application Form')}
            </button>
          </div>
        </section>
      </main>

      <Footer lang={lang} onOpenDonation={() => setDonationModalOpen(true)} />

      <MobileBottomBar lang={lang} onOpenDonation={() => setDonationModalOpen(true)} />

      <BackToTop />

      <VolunteerModal isOpen={modalOpen} onClose={() => setModalOpen(false)} lang={lang} />

      <DonationModal
        isOpen={donationModalOpen}
        onClose={() => setDonationModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
