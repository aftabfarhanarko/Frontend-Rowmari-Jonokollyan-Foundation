'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Target,
  Eye,
  ShieldCheck,
  Users,
  HeartHandshake,
  Clock,
  CheckCircle2,
  FileCheck,
  BookOpen,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { PageBanner } from '@/components/layout/PageBanner';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import BackToTop from '@/components/BackToTop';
import DonationModal from '@/components/modals/DonationModal';
import { GlassSection, SectionHeading, glassCard, glassCardHover } from '@/components/ui/glass';
import { useGetPublicPageQuery } from '@/store/api/adminApi';
import { Language } from '@/types';

const DEFAULT_BANNER_IMAGE = '/images/activities/winter-relief.jpg';

const DEFAULT_STORY_BN =
  'রৌমারী জনকল্যাণ ফাউন্ডেশন (RJF) ২০১৮ সালে কুড়িগ্রাম জেলার রৌমারী উপজেলার একদল নিবেদিতপ্রাণ তরুণ ও সমাজসেবীর হাত ধরে যাত্রা শুরু করে। ব্রহ্মপুত্র নদের দুর্গম চরাঞ্চল ও প্রত্যন্ত গ্রামের অসহায়, শীতার্ত, বন্যার্ত এবং সুবিধাবঞ্চিত মানুষের মৌলিক চাহিদা পূরণে আমরা নিরলসভাবে কাজ করে যাচ্ছি।\n\nআমাদের মূল কার্যক্রমের মধ্যে রয়েছে জরুরি ত্রাণ ও শীতবস্ত্র বিতরণ, বিনামূল্যে ভ্রাম্যমাণ মেডিকেল ক্যাম্প ও চক্ষু চিকিৎসা, দরিদ্র ও মেধাবী শিক্ষার্থীদের জন্য শিক্ষাবৃত্তি এবং দুর্যোগকালীন উদ্ধার ও পুনর্বাসন সহায়তা। প্রতিটি অনুদান শতভাগ স্বচ্ছতা ও জবাবদিহিতার সাথে সরাসরি প্রকৃত উপকারভোগীর হাতে পৌঁছে দেওয়া আমাদের অঙ্গীকার।';

const DEFAULT_STORY_EN =
  'Rowmari Janakalyan Foundation (RJF) began in 2018 through the collective initiative of dedicated local youths and social workers in Rowmari, Kurigram. We work tirelessly to support flood-affected, winter-stricken, and marginalized families across the remote Brahmaputra river-island chars.\n\nOur core initiatives span emergency food and winter relief, free mobile healthcare and eye camps, academic stipends for underprivileged students, and rapid disaster rehabilitation—delivered directly with 100% transparency and community accountability.';

export default function AboutPage() {
  const [lang, setLang] = useState<Language>('bn');
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const { data: pageData } = useGetPublicPageQuery('about-us');

  const t = (bn: string, en: string) => (lang === 'bn' ? bn : en);

  const heroTitle =
    lang === 'bn' && pageData?.title
      ? pageData.title
      : t('মানুষের পাশে, মানুষের জন্য—আমাদের অঙ্গীকার', 'Standing by People, For Humanity');

  const heroSubtitle =
    lang === 'bn' && pageData?.subtitle
      ? pageData.subtitle
      : t(
          'রৌমারী জনকল্যাণ ফাউন্ডেশন (RJF) কুড়িগ্রামের দুর্গম ব্রহ্মপুত্র চরাঞ্চলের সুবিধাবঞ্চিত, শীতার্ত, দরিদ্র ও মুমূর্ষু মানুষের পাশে নিঃস্বার্থভাবে কাজ করে যাওয়া একটি স্থানীয় মানবিক সংগঠন।',
          'Rowmari Janakalyan Foundation is a verified grassroots humanitarian foundation dedicated to uplifting vulnerable river-island char communities of Kurigram through winter warmth, healthcare, and education.'
        );

  const featuredCaption =
    lang === 'bn' && pageData?.description
      ? pageData.description
      : t(
          'চরাঞ্চলের প্রতিটি বাড়িতে সরাসরি গিয়ে যাচাই ও অনুদান বিতরণ',
          'Direct door-to-door verification and relief delivery in isolated chars'
        );

  const cmsStory =
    lang === 'bn' && pageData?.content
      ? pageData.content
      : t(DEFAULT_STORY_BN, DEFAULT_STORY_EN);

  const bannerSrc =
    !imgError && pageData?.bannerImageUrl
      ? pageData.bannerImageUrl
      : DEFAULT_BANNER_IMAGE;

  const milestones = [
    {
      yearBn: '২০১৮',
      yearEn: '2018',
      titleBn: 'ফাউন্ডেশন প্রতিষ্ঠা ও প্রথম শীতবস্ত্র মিশন',
      titleEn: 'Foundation Established & First Winter Relief',
      descBn:
        'রৌমারীর একদল তরুণ ও সমাজসেবীদের উদ্যোগে দুর্গম চরাঞ্চলের শীতার্ত ও বন্যাপীড়িত মানুষের সেবায় আত্মপ্রকাশ। ৫০০ কম্বল ও জরুরি খাদ্য বিতরণের মাধ্যমে শুরু।',
      descEn:
        'Initiated by committed local youth to serve flood-hit and winter-affected river island char families in Rowmari with 500 blankets and dry rations.',
      theme: 'red',
    },
    {
      yearBn: '২০২০',
      yearEn: '2020',
      titleBn: 'করোনা মহামারী ও পরিবার পুনর্বাসন সহায়তা',
      titleEn: 'Pandemic Relief & Family Rehabilitation',
      descBn:
        'লকডাউনে কর্মহীন চরাঞ্চলের দিনমজুর পরিবারে জরুরি খাদ্য সহায়তা এবং স্বাস্থ্য সুরক্ষা সামগ্রী বিতরণ।',
      descEn:
        'Dispatched emergency pandemic food packs and hygiene supplies to daily wage-earning char families during lockdown.',
      theme: 'red',
    },
    {
      yearBn: '২০২২',
      yearEn: '2022',
      titleBn: 'বন্যা পুনর্বাসন ও নিরাপদ পানি প্রকল্প',
      titleEn: 'Flood Rehabilitation & Safe Water Project',
      descBn:
        'ব্রহ্মপুত্রের তীব্র বন্যায় দুর্গত চরাঞ্চলে উদ্ধার অভিযান, ভাসমান মেডিকেল ক্যাম্প পরিচালনা এবং ২০টি গভীর নলকূপ স্থাপন।',
      descEn:
        'Rescued stranded families during Brahmaputra flash floods, ran boat-based medical relief camps, and installed 20 deep tube-wells in remote chars.',
      theme: 'red',
    },
    {
      yearBn: '২০২৪',
      yearEn: '2024',
      titleBn: 'বিনামূল্যে স্বাস্থ্যসেবা ও শিক্ষাবৃত্তি বিস্তার',
      titleEn: 'Free Eye & Healthcare Camps & Char Education',
      descBn:
        'বিশেষজ্ঞ চিকিৎসকদের নিয়ে বিনামূল্যে ভ্রাম্যমাণ স্বাস্থ্য ও চক্ষু ক্যাম্প এবং চরাঞ্চলের দরিদ্র শিক্ষার্থীদের নিয়মিত শিক্ষাবৃত্তি কর্মসূচি প্রাতিষ্ঠানিক রূপ লাভ করে।',
      descEn:
        'Institutionalized mobile healthcare and eye camps with specialist doctors, alongside monthly academic stipends and school kits for char children.',
      theme: 'red',
    },
    {
      yearBn: 'আজ (২০২৬)',
      yearEn: 'Today (2026)',
      titleBn: 'আধুনিক ডিজিটাল প্ল্যাটফর্ম ও শতভাগ জবাবদিহিতা',
      titleEn: 'Digital Governance & 100% Transparent Relief',
      descBn:
        'স্বয়ংক্রিয় অনলাইন আবেদন, রিয়েল-টাইম ট্র্যাকিং, নিরাপদ অনুদান এবং আধুনিক ডিজিটাল ব্যবস্থার মাধ্যমে সেবার মান ও বিস্তার উত্তরোত্তর বৃদ্ধি।',
      descEn:
        'Scaling humanitarian reach through digital application tracking, transparent financial reporting, and audited direct community delivery.',
      theme: 'red',
    },
  ];

  const pillars = [
    {
      icon: ShieldCheck,
      titleBn: 'শতভাগ স্বচ্ছতা ও হিসাব',
      titleEn: '100% Verified Transparency',
      descBn:
        'অনুদানের প্রতিটি টাকার হিসাব ও ব্যয়ের রসিদ উন্মুক্ত। যে কেউ নিরীক্ষা প্রতিবেদন দেখে নিতে পারেন।',
      descEn:
        'Open financial accounts with itemized expenditure reports and digital donor receipts.',
    },
    {
      icon: Users,
      titleBn: 'স্থানীয় নিবেদিত নেতৃত্ব',
      titleEn: 'Local Grassroots Leadership',
      descBn:
        'রৌমারীর স্থানীয় বাসিন্দা ও যুবসমাজ সরাসরি চরে গিয়ে সরেজমিনে যাচাই করে সহায়তা প্রদান করে।',
      descEn:
        'Rowmari locals and active youths conducting physical on-site verifications across remote chars.',
    },
    {
      icon: HeartHandshake,
      titleBn: 'দলমত নির্বিশেষে সেবা',
      titleEn: 'Neutral & Universal Aid',
      descBn:
        'ধর্ম, বর্ণ, রাজনৈতিক মতাদর্শ নির্বিশেষে শুধুমাত্র প্রকৃত অসহায়ত্বের ভিত্তিতে সহায়তা পৌঁছানো হয়।',
      descEn:
        'Strictly humanitarian criteria prioritizing solely vulnerability and medical emergency.',
    },
    {
      icon: Clock,
      titleBn: '২৪/৭ দ্রুত সাড়া প্রদান',
      titleEn: '24/7 Rapid Emergency Response',
      descBn:
        'আকস্মিক দুর্যোগ ও জরুরি সংকটে দুর্গম চরে স্পিডবোট ও ট্রলারযোগে দ্রুত ত্রাণ পৌঁছে দেওয়া।',
      descEn:
        'Swift volunteer mobilization with emergency relief and boat missions during flood crises.',
    },
  ];

  const stats = [
    { valueBn: '১২,৫০০+', valueEn: '12,500+', labelBn: 'সহায়তাপ্রাপ্ত মানুষ', labelEn: 'People Supported' },
    { valueBn: '৬+', valueEn: '6+', labelBn: 'সক্রিয় ইউনিয়ন', labelEn: 'Char Unions' },
    { valueBn: '৮+ বছর', valueEn: '8+ Years', labelBn: 'মাঠপর্যায়ে সেবা', labelEn: 'Field Service' },
    { valueBn: '১০০%', valueEn: '100%', labelBn: 'সরাসরি চরে বিতরণ', labelEn: 'Direct Char Delivery' },
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
          badge={t('স্থাপিত ২০১৮ • রৌমারী, কুড়িগ্রাম • সামাজিক অলাভজনক সংস্থা', 'Est. 2018 • Rowmari, Kurigram • Non-Profit Organization')}
          title={heroTitle}
          subtitle={heroSubtitle}
        >
          {/* Impact Metric Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-4">
            {stats.map((s, idx) => (
              <div key={idx} className="rounded-2xl bg-white/95 p-4 sm:p-5 text-center shadow-md">
                <div className="text-2xl sm:text-3xl font-black text-[#D62828] mb-1">
                  {t(s.valueBn, s.valueEn)}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-stone-600">
                  {t(s.labelBn, s.labelEn)}
                </div>
              </div>
            ))}
          </div>
        </PageBanner>

        {/* Featured Real Field Image Showcase */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2 mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-64 sm:h-80 md:h-[440px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-stone-200/90"
          >
            <Image
              src={bannerSrc}
              alt={t('রৌমারী জনকল্যাণ ফাউন্ডেশন মাঠপর্যায়ের কার্যক্রম', 'RJF Field Humanitarian Work')}
              fill
              onError={() => setImgError(true)}
              className="object-cover"
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/25 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 text-white max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider bg-[#E53935] px-3 py-1 rounded-md inline-block mb-2 shadow-md">
                {t('মাঠপর্যায়ের বাস্তব চিত্র', 'Live Fieldwork')}
              </span>
              <h2 className="text-lg sm:text-2xl font-black leading-snug drop-shadow-md">
                {featuredCaption}
              </h2>
              <p className="text-xs sm:text-sm text-stone-200 mt-1 hidden sm:block drop-shadow-xs">
                {t(
                  'কনকনে শীতে কম্বল বিতরণ থেকে শুরু করে জরুরি চিকিৎসা সহায়তা—সবকিছুতেই আমাদের স্বেচ্ছাসেবকরা নিয়োজিত।',
                  'From winter blanket relief to emergency healthcare support, our volunteer force stands with the marginalized.'
                )}
              </p>
            </div>
          </motion.div>
        </section>

        {/* CMS-Managed Organization Overview */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14">
          <div className="rounded-3xl bg-[#FFF4F5] border border-red-100/90 p-6 sm:p-8 lg:p-10 shadow-[0_8px_24px_-8px_rgba(214,40,40,0.08)]">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#D62828]">
                <BookOpen className="w-4 h-4" />
                <span>{t('প্রতিষ্ঠানের পরিচিতি ও পটভূমি', 'Foundation Overview & Story')}</span>
              </div>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white text-stone-600 border border-red-100">
                {t('রৌমারী, কুড়িগ্রাম', 'Rowmari, Kurigram')}
              </span>
            </div>
            <div className="text-sm sm:text-base text-stone-700 leading-relaxed whitespace-pre-line">
              {cmsStory}
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <GlassSection id="mission-vision">
          <SectionHeading
            title={t('আমাদের লক্ষ্য ও রূপকল্প', 'Mission & Vision')}
            subtitle={t(
              'টেকসই মানবিক উন্নয়ন এবং সমতাভিত্তিক সমাজ বিনির্মাণই আমাদের মূল প্রেরণা।',
              'Driving sustainable community resilience and empathetic social welfare.'
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className={`${glassCard} p-6 sm:p-8 border-t-4 border-t-[#D62828] flex flex-col justify-between`}
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-red-100 text-[#D62828] flex items-center justify-center mb-5 shadow-xs">
                  <Target className="w-6 h-6 text-[#D62828]" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-3">
                  {t('আমাদের লক্ষ্য (Mission)', 'Our Mission')}
                </h3>
                <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                  {t(
                    'কুড়িগ্রামের রৌমারী ও দুর্গম চরাঞ্চলের অসহায়, শীতার্ত ও প্রান্তিক জনগোষ্ঠীর মাঝে জরুরি মানবিক সহায়তা, বিনামূল্যে স্বাস্থ্যসেবা এবং দরিদ্র শিক্ষার্থীদের শিক্ষাবৃত্তি পৌঁছে দিয়ে তাদের জীবনমানের টেকসই উন্নয়ন নিশ্চিত করা।',
                    'Providing emergency humanitarian relief, free medical care, and educational scholarships to uplift marginalized families in flood-prone river island chars of Rowmari.'
                  )}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-200/60 flex items-center gap-2 text-xs font-bold text-[#D62828]">
                <CheckCircle2 className="w-4 h-4 text-[#D62828]" />
                <span>{t('জরুরি ত্রাণ ও দীর্ঘমেয়াদী পুনর্বাসন', 'Emergency relief & long-term rehabilitation')}</span>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className={`${glassCard} p-6 sm:p-8 border-t-4 border-t-[#E53935] flex flex-col justify-between`}
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-red-100 text-[#E53935] flex items-center justify-center mb-5 shadow-xs">
                  <Eye className="w-6 h-6 text-[#E53935]" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-3">
                  {t('আমাদের রূপকল্প (Vision)', 'Our Vision')}
                </h3>
                <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                  {t(
                    'এমন একটি মানবিক ও সমতাভিত্তিক সমাজ বিনির্মাণ, যেখানে অর্থের অভাবে কোনো রোগী বিনা চিকিৎসায় মারা যাবে না, কোনো পরিবার শীতে কষ্ট পাবে না এবং দারিদ্র্যের কারণে কোনো মেধাবী শিশুর পড়াশোনা বন্ধ হবে না।',
                    'Envisioning a compassionate and resilient society where no human suffers untreated illness for lack of money, no char family suffers in the freezing cold, and no talented child drops out of school due to poverty.'
                  )}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-200/60 flex items-center gap-2 text-xs font-bold text-[#E53935]">
                <CheckCircle2 className="w-4 h-4 text-[#E53935]" />
                <span>{t('মর্যাদাপূর্ণ ও আত্মনির্ভরশীল জীবন', 'Dignified & self-reliant life for all')}</span>
              </div>
            </motion.div>
          </div>
        </GlassSection>

        {/* 4 Core Pillars */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <SectionHeading
            title={t('আমাদের মূল স্তম্ভ ও মূল্যবোধ', 'Our Core Pillars & Values')}
            subtitle={t(
              'যেকোনো কাজ পরিচালনার ক্ষেত্রে আমরা এই চারটি নীতি কঠোরভাবে অনুসরণ করি।',
              'The fundamental principles guiding every single relief operation we conduct.'
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={idx} className={`${glassCardHover} p-5 sm:p-6 flex flex-col justify-between`}>
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#D62828] to-red-600 text-white flex items-center justify-center mb-4 shadow-md shadow-red-900/20">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-stone-900 mb-2">{t(p.titleBn, p.titleEn)}</h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{t(p.descBn, p.descEn)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 8-Year Milestones Timeline */}
        <GlassSection id="journey" tone="red">
          <SectionHeading
            title={t('আমাদের পথচলা (২০১৮ - ২০২৬)', 'Our 8-Year Journey')}
            subtitle={t(
              'ছোট একটি উদ্যোগ থেকে শুরু হয়ে আজ রৌমারীর মানুষের সবচেয়ে বিশ্বস্ত আশ্রয়ে রূপান্তর।',
              'From a modest winter drive to Rowmari’s most reliable frontline humanitarian organization.'
            )}
          />

          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 relative">
            <div className="hidden sm:block absolute left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#D62828] via-[#E53935] to-[#D62828]" />
            {milestones.map((m, idx) => {
              const isRed = m.theme === 'red';
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className={`${glassCardHover} p-5 sm:p-6 relative sm:ml-16`}
                >
                  <div
                    className={`hidden sm:flex absolute -left-[54px] top-6 w-8 h-8 rounded-full border-2 border-white items-center justify-center shadow-md ${
                      isRed ? 'bg-[#D62828] text-white' : 'bg-[#E53935] text-white'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 mb-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono shadow-2xs ${
                        isRed ? 'bg-red-100 text-[#D62828]' : 'bg-red-100 text-[#E53935]'
                      }`}
                    >
                      {t(m.yearBn, m.yearEn)}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-stone-900">{t(m.titleBn, m.titleEn)}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{t(m.descBn, m.descEn)}</p>
                </motion.div>
              );
            })}
          </div>
        </GlassSection>

        {/* Governance & Trust Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="rounded-3xl bg-gradient-to-br from-[#D62828] via-[#B91C1C] to-stone-950 p-6 sm:p-10 md:p-12 text-white shadow-2xl relative overflow-hidden">
            <div aria-hidden className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-red-400/20 blur-3xl" />

            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-red-200 text-xs font-bold">
                  <FileCheck className="w-4 h-4" />
                  <span>{t('আইনি অনুমোদন ও প্রশাসনিক ভিত্তি', 'Legal Status & Affiliation')}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black leading-tight">
                  {t('সরকারি সমাজসেবা ট্রাস্ট ও অনুমোদিত কাঠামোর অধীনে পরিচালিত', 'Operating Under Official Non-Profit Social Welfare Standards')}
                </h2>
                <p className="text-xs sm:text-sm text-red-100/90 leading-relaxed">
                  {t(
                    'রৌমারী জনকল্যাণ ফাউন্ডেশনের প্রতিটি কার্যক্রম উন্মুক্ত ও অডিটযোগ্য। সকল অনুদান নির্ধারিত ব্যাংক ও অফিসিয়াল মার্চেন্ট একাউন্টে সংরক্ষিত হয় এবং সরাসরি মাঠপর্যায়ে ব্যয়িত হয়।',
                    'Every activity is fully auditable. Donations are received exclusively through authorized institutional banking channels and dispatched directly to vetted recipients.'
                  )}
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    href="/team"
                    className="px-5 py-2.5 rounded-full bg-white text-[#D62828] font-bold text-xs sm:text-sm hover:bg-red-50 transition"
                  >
                    {t('পরিচালনা কমিটি দেখুন', 'View Executive Committee')}
                  </Link>
                  <Link
                    href="/donation-policy"
                    className="px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-xs sm:text-sm backdrop-blur-md transition"
                  >
                    {t('অনুদান নীতিমালা ও অডিট', 'Donation Policy & Audit')}
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                  <div className="text-xs font-semibold text-red-300 mb-1">{t('নিবন্ধন ও ছাড়পত্র', 'Registration')}</div>
                  <div className="text-sm font-bold text-white">{t('রৌমারী উপজেলা সমাজসেবা ট্রাস্ট নথিভুক্ত', 'Rowmari Social Welfare Affiliated')}</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                  <div className="text-xs font-semibold text-red-300 mb-1">{t('আর্থিক স্বচ্ছতা', 'Financial Audit')}</div>
                  <div className="text-sm font-bold text-white">{t('বার্ষিক হিসাব ও ব্যয়ের নিরীক্ষা সম্পন্ন', 'Annual External Audit Verified')}</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                  <div className="text-xs font-semibold text-red-300 mb-1">{t('জরুরি ত্রাণ সেল', 'Emergency Relief Cell')}</div>
                  <div className="text-sm font-bold text-white">{t('চরাঞ্চলে তাৎক্ষণিক খাদ্য ও শীতবস্ত্র সরবরাহ', 'Immediate Char Relief Dispatch')}</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                  <div className="text-xs font-semibold text-red-300 mb-1">{t('স্বেচ্ছাসেবক সেল', 'Volunteer Network')}</div>
                  <div className="text-sm font-bold text-white">{t('৬টি ইউনিয়নে সক্রিয় ফিল্ড টিম', 'Active in 6 Char Unions')}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Action Callout Boxes */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 sm:p-7 rounded-2xl bg-[#D62828] text-white flex flex-col justify-between shadow-xl shadow-red-950/20">
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">{t('মানবতার পাশে অনুদান দিন', 'Support With Donations')}</h3>
              <p className="text-xs sm:text-sm text-red-100/90 leading-relaxed mb-4">
                {t(
                  'রৌমারী ও চরাঞ্চলের অসহায় পরিবারের খাদ্য, চিকিৎসা ও শীতবস্ত্র সেবায় আপনার সামান্য অনুদান বিরাট পরিবর্তন আনতে পারে।',
                  'Your small contribution provides emergency healthcare, food, and winter clothes to struggling char families.'
                )}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setDonationModalOpen(true)}
              className="w-full py-3 rounded-xl bg-white text-[#D62828] font-bold text-xs sm:text-sm hover:bg-red-50 transition cursor-pointer text-center block shadow-sm"
            >
              {t('অনুদান দিন', 'Donate to RJF')}
            </button>
          </div>

          <div className="p-6 sm:p-7 rounded-2xl bg-white border-2 border-[#D62828] flex flex-col justify-between shadow-xl shadow-red-950/10">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#D62828] mb-2">{t('স্বেচ্ছাসেবক হিসেবে যুক্ত হোন', 'Join as Volunteer')}</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                {t(
                  'চর ও প্রত্যন্ত অঞ্চলের মানুষের পাশে দাঁড়াতে আমাদের নিবেদিত স্বেচ্ছাসেবক দলে নাম নিবন্ধন করুন।',
                  'Join our dedicated volunteer team to stand beside marginalized communities in remote char regions.'
                )}
              </p>
            </div>
            <Link
              href="/volunteer"
              className="w-full py-3 rounded-xl bg-[#D62828] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm transition cursor-pointer shadow-md text-center block"
            >
              {t('স্বেচ্ছাসেবক নিবন্ধন', 'Register as Volunteer')}
            </Link>
          </div>
        </div>
      </main>

      <Footer lang={lang} />
      <MobileBottomBar lang={lang} />
      <BackToTop />

      <DonationModal
        isOpen={donationModalOpen}
        onClose={() => setDonationModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
