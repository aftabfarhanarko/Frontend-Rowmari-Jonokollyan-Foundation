'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Search,
  CheckCircle2,
  MapPin,
  Sparkles,
  Droplet,
  Users,
  HeartPulse,
  HeartHandshake,
  GraduationCap,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { Language } from '@/types';
import { useAppStore } from '@/store/useAppStore';

interface HeroProps {
  lang: Language;
  onOpenAssistance: () => void;
  onOpenActivities: () => void;
}

export default function Hero({
  lang,
  onOpenAssistance,
  onOpenActivities,
}: HeroProps) {
  const {
    setBloodRequestModalOpen,
    setBloodDonorModalOpen,
    setDonationModalOpen,
  } = useAppStore();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // 4 Full-Width Panoramic Hero Banner Slides
  const heroSlides = [
    {
      id: 'slide-1',
      badgeBn: 'স্থাপিত ২০১৮ • রৌমারী, কুড়িগ্রাম • ৯ম বছরে পদার্পণ',
      badgeEn: 'Est. 2018 • Rowmari, Kurigram • 8+ Years of Service',
      categoryBn: 'মানবিক সহায়তা মিশন',
      categoryEn: 'Humanitarian Mission',
      titleBn: 'মানুষের পাশে, মানুষের জন্য',
      titleEn: 'Standing by People, For Humanity',
      subtitleBn:
        'রৌমারী ও ব্রহ্মপুত্রের দুর্গম চরাঞ্চলের অসহায় শীতার্ত মানুষের পাশে দাঁড়ানোই আমাদের কাজ। শীতবস্ত্র, খাদ্য, শিক্ষা, চিকিৎসা ও রক্তদানে আমরা সার্বক্ষণিক নিবেদিত।',
      subtitleEn:
        'Dedicated to serving the underprivileged in Rowmari and remote river island chars through winter relief, food aid, education, healthcare, and emergency blood donor coordination.',
      btnPrimaryBn: 'সহায়তার আবেদন',
      btnPrimaryEn: 'Request Assistance',
      btnPrimaryAction: 'assistance',
      btnPrimaryIcon: FileText,
      btnSecondaryBn: 'কার্যক্রম দেখুন',
      btnSecondaryEn: 'Explore Activities',
      btnSecondaryAction: 'activities',
      btnSecondaryIcon: Search,
      imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1800&q=85',
      overlayGradient: 'from-[#073B22]/95 via-[#073B22]/80 to-transparent',
    },
    {
      id: 'slide-2',
      badgeBn: '২৪/৭ লাইভ ইমার্জেন্সি ব্লাড নেটওয়ার্ক',
      badgeEn: '24/7 Live Emergency Blood Network',
      categoryBn: 'জরুরি রক্তদান উইং',
      categoryEn: 'Blood Donation Wing',
      titleBn: 'এক ব্যাগ রক্ত, একটি মুমূর্ষু জীবনের আলো',
      titleEn: 'One Bag of Blood, A Lifeline for Humanity',
      subtitleBn:
        'রৌমারী উপজেলা স্বাস্থ্য কমপ্লেক্স ও কুড়িগ্রামের হাসপাতালে রক্তের প্রয়োজনে ১,২০০+ নিবন্ধিত রক্তদাতা মানুষের জীবন বাঁচাতে সদা প্রস্তুত।',
      subtitleEn:
        'Ready 24/7 for emergency blood requirements at Rowmari Upazila Health Complex and Kurigram hospitals with a dedicated network of verified blood donors.',
      btnPrimaryBn: 'জরুরি রক্তের আবেদন',
      btnPrimaryEn: 'Request Blood',
      btnPrimaryAction: 'blood-request',
      btnPrimaryIcon: Droplet,
      btnSecondaryBn: 'রক্তদাতা নিবন্ধন',
      btnSecondaryEn: 'Become Blood Donor',
      btnSecondaryAction: 'blood-donor',
      btnSecondaryIcon: Users,
      imageUrl: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1800&q=85',
      overlayGradient: 'from-[#7f1d1d]/95 via-[#991b1b]/80 to-transparent',
    },
    {
      id: 'slide-3',
      badgeBn: 'দরিদ্র ও অসহায় রোগীর চিকিৎসা তহবিল',
      badgeEn: 'Medical Aid & Healthcare Fund',
      categoryBn: 'চিকিৎসা সহায়তা ও ফ্রি ওষুধ',
      categoryEn: 'Healthcare & Medicine Aid',
      titleBn: 'অসহায় রোগীর সুচিকিৎসায় আমাদের নিরলস অঙ্গীকার',
      titleEn: 'Quality Healthcare for Every Underprivileged Life',
      subtitleBn:
        'বিনা চিকিৎসায় যেন কোনো প্রাণ না হারায়—অসহায় রোগীদের বড় ধরনের অপারেশন, জটিল হৃদরোগ, থ্যালাসেমিয়া ও ওষুধে জরুরি আর্থিক অনুদান ও সহায়তা প্রদান।',
      subtitleEn:
        'No life should be lost for lack of medicine. Providing vital medical grants, complex surgery support, and free physician camps in remote river island unions.',
      btnPrimaryBn: 'চিকিৎসা সহায়তা আবেদন',
      btnPrimaryEn: 'Apply Medical Aid',
      btnPrimaryAction: 'assistance',
      btnPrimaryIcon: HeartPulse,
      btnSecondaryBn: 'চিকিৎসায় অনুদান দিন',
      btnSecondaryEn: 'Donate For Patients',
      btnSecondaryAction: 'donation',
      btnSecondaryIcon: HeartHandshake,
      imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1800&q=85',
      overlayGradient: 'from-[#064e3b]/95 via-[#065f46]/80 to-transparent',
    },
    {
      id: 'slide-4',
      badgeBn: 'চরাঞ্চলের সুবিধাবঞ্চিত শিশুদের মেধা বিকাশ',
      badgeEn: 'Char Education & Child Empowerment',
      categoryBn: 'শিক্ষা উপবৃত্তি ও বইপত্র',
      categoryEn: 'Education & Scholarships',
      titleBn: 'শিক্ষার আলোয় আলোকিত হোক প্রতিটি শিশুর ভবিষ্যৎ',
      titleEn: 'Lighting the Lamp of Education for Every Child',
      subtitleBn:
        'অর্থের অভাবে যেন কোনো দরিদ্র মেধাবী শিশুর পড়াশোনা বন্ধ না হয়—রৌমারীর চরাঞ্চলে প্রাথমিক ও মাধ্যমিক শিক্ষার্থীদের স্কুল ব্যাগ, বইপত্র ও মাসিক বৃত্তি প্রদান।',
      subtitleEn:
        'Poverty must not stop education. Distributing school supplies, notebooks, bags, and monthly scholarships to prevent student dropouts in remote chars.',
      btnPrimaryBn: 'শিক্ষা উপবৃত্তি আবেদন',
      btnPrimaryEn: 'Scholarship Aid',
      btnPrimaryAction: 'assistance',
      btnPrimaryIcon: GraduationCap,
      btnSecondaryBn: 'শিক্ষা তহবিলে অনুদান',
      btnSecondaryEn: 'Support Education',
      btnSecondaryAction: 'donation',
      btnSecondaryIcon: Sparkles,
      imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=85',
      overlayGradient: 'from-[#1e1b4b]/95 via-[#312e81]/80 to-transparent',
    },
  ];

  // Auto-play slideshow every 6 seconds (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, heroSlides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const activeSlide = heroSlides[currentSlide];

  const handleAction = (actionType: string) => {
    switch (actionType) {
      case 'assistance':
        onOpenAssistance();
        break;
      case 'activities':
        onOpenActivities();
        break;
      case 'blood-request':
        setBloodRequestModalOpen(true);
        break;
      case 'blood-donor':
        setBloodDonorModalOpen(true);
        break;
      case 'donation':
        setDonationModalOpen(true);
        break;
      default:
        onOpenActivities();
    }
  };

  const PrimaryIcon = activeSlide.btnPrimaryIcon;
  const SecondaryIcon = activeSlide.btnSecondaryIcon;

  // 4 Curated Field Photography Highlights
  const fieldHighlights = [
    {
      id: 'field-1',
      titleBn: 'শীতবস্ত্র ও কম্বল বিতরণ ২০২৪',
      titleEn: 'Winter Warmth & Blanket Relief',
      tagBn: 'শীতবস্ত্র ত্রাণ',
      tagEn: 'Winter Relief',
      badgeColor: 'bg-[#E53935]',
      statBn: '৫,০০০+ কম্বল বিতরণ',
      statEn: '5,000+ Blankets',
      locationBn: 'যাদুরচর ও দাঁতভাঙ্গা চর',
      locationEn: 'Yadurchar & Datbhanga Char',
      descBn: 'কনকনে শীতে ব্রহ্মপুত্রের প্রত্যন্ত চরাঞ্চলের অসহায় পরিবারের মুখে উষ্ণতার হাসি।',
      descEn: 'Delivering warmth to vulnerable families across remote Brahmaputra river island chars.',
      imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'field-2',
      titleBn: 'জরুরি রক্তদান ও ডোনার নেটওয়ার্ক',
      titleEn: 'Emergency Blood Donation Network',
      tagBn: 'রক্তদান সেবা',
      tagEn: 'Blood Service',
      badgeColor: 'bg-red-600',
      statBn: '১,২০০+ ব্যাগ সরবরাহ',
      statEn: '1,200+ Units Donated',
      locationBn: 'রৌমারী উপজেলা হাসপাতাল',
      locationEn: 'Rowmari Health Complex',
      descBn: 'মুমূর্ষু রোগীর জীবন বাঁচাতে ২৪/৭ জরুরি রক্তের ব্যবস্থা ও ফ্রি ব্লাড গ্রুপিং ক্যাম্প।',
      descEn: '24/7 volunteer emergency blood supply and regular community donor camps.',
      imageUrl: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'field-3',
      titleBn: 'বিনামূল্যে চিকিৎসা ও বিশেষজ্ঞ ক্যাম্প',
      titleEn: 'Free Medical Camps & Medicines',
      tagBn: 'চিকিৎসা সহায়তা',
      tagEn: 'Healthcare Aid',
      badgeColor: 'bg-teal-700',
      statBn: '৮৫০+ রোগী চিকিৎসাপ্রাপ্ত',
      statEn: '850+ Patients Treated',
      locationBn: 'চর শৌলমারী ইউনিয়ন',
      locationEn: 'Char Shoulmari Union',
      descBn: 'অভিজ্ঞ চিকিৎসকদের মাধ্যমে সুবিধাবঞ্চিত চরাঞ্চলবাসীর বিনামূল্যে স্বাস্থ্য পরীক্ষা ও ওষুধ।',
      descEn: 'Free physician consultations, diagnosis, and essential life-saving medicine distribution.',
      imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'field-4',
      titleBn: 'দরিদ্র শিক্ষার্থীদের শিক্ষা ও মেধা বৃত্তি',
      titleEn: 'Education Support & Scholarships',
      tagBn: 'শিক্ষা উইং',
      tagEn: 'Education Aid',
      badgeColor: 'bg-emerald-700',
      statBn: '৩৫০+ শিক্ষার্থী উপবৃত্তি',
      statEn: '350+ Students Aided',
      locationBn: 'বন্দবেড় ও যাদুরচর চর',
      locationEn: 'Bondober & Yadurchar',
      descBn: 'ঝরে পড়া রোধে চরাঞ্চলের দরিদ্র শিক্ষার্থীদের স্কুল ব্যাগ, বইপত্র ও মাসিক উপবৃত্তি প্রদান।',
      descEn: 'Providing bags, stationery, and monthly stipends to keep children in classrooms.',
      imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section
      id="home"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative pt-4 pb-12 md:pt-6 md:pb-16 overflow-hidden bg-gradient-to-b from-stone-50 via-white to-stone-50/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Full-Width Panoramic Hero Slider Card (Matching Reference Banner Style) */}
        <div className="relative w-full rounded-3xl md:rounded-[36px] overflow-hidden min-h-[460px] sm:min-h-[500px] md:min-h-[540px] lg:min-h-[560px] shadow-2xl border border-stone-200/90 flex flex-col justify-between bg-stone-950">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="absolute inset-0 z-0"
            >
              {/* Full Background Photography */}
              <Image
                src={activeSlide.imageUrl}
                alt={lang === 'bn' ? activeSlide.titleBn : activeSlide.titleEn}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-center scale-102 transition-transform duration-1000 ease-out"
              />

              {/* Multi-layered Deep Branded Gradient Overlay for 100% Crisp Typography */}
              <div className={`absolute inset-0 z-10 bg-gradient-to-r ${activeSlide.overlayGradient}`} />
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Left & Right Chevron Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-black/35 hover:bg-black/65 text-white border border-white/20 backdrop-blur-md shadow-xl transition-all hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-black/35 hover:bg-black/65 text-white border border-white/20 backdrop-blur-md shadow-xl transition-all hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slide Content Overlay (Inside the Banner) */}
          <div className="relative z-20 flex-1 flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-16 max-w-3xl">
            {/* Top Tagline Badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${activeSlide.id}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4 }}
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{lang === 'bn' ? activeSlide.badgeBn : activeSlide.badgeEn}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Middle Main Text & CTAs */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${activeSlide.id}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="my-auto py-6 sm:py-8 space-y-4 sm:space-y-5"
              >
                <div className="inline-block">
                  <span className="text-xs sm:text-sm font-bold tracking-wider uppercase px-3 py-1 rounded-md bg-[#E53935] text-white shadow-md">
                    {lang === 'bn' ? activeSlide.categoryBn : activeSlide.categoryEn}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[54px] font-black text-white leading-[1.18] tracking-tight drop-shadow-md">
                  {lang === 'bn' ? activeSlide.titleBn : activeSlide.titleEn}
                </h1>

                <p className="text-sm sm:text-base md:text-lg text-stone-100 leading-relaxed font-normal max-w-xl drop-shadow-sm">
                  {lang === 'bn' ? activeSlide.subtitleBn : activeSlide.subtitleEn}
                </p>

                {/* Primary & Secondary Buttons Inside the Banner */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                  <button
                    onClick={() => handleAction(activeSlide.btnPrimaryAction)}
                    className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold text-sm sm:text-base transition-all duration-200 shadow-xl shadow-red-950/40 hover:scale-[1.03] active:scale-[0.98] flex items-center gap-2.5 cursor-pointer"
                  >
                    <PrimaryIcon className="w-5 h-5 text-white" />
                    <span>{lang === 'bn' ? activeSlide.btnPrimaryBn : activeSlide.btnPrimaryEn}</span>
                  </button>

                  <button
                    onClick={() => handleAction(activeSlide.btnSecondaryAction)}
                    className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-sm sm:text-base border border-white/30 backdrop-blur-md transition-all duration-200 shadow-md hover:scale-[1.03] active:scale-[0.98] flex items-center gap-2.5 cursor-pointer"
                  >
                    <SecondaryIcon className="w-5 h-5 text-white" />
                    <span>{lang === 'bn' ? activeSlide.btnSecondaryBn : activeSlide.btnSecondaryEn}</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Spacer */}
            <div className="h-4" />
          </div>

          {/* Bottom Center Capsule Dot Pagination (Matching Reference Image 2!) */}
          <div className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 flex items-center gap-2 shadow-2xl">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentSlide === idx
                    ? 'w-7 sm:w-8 h-2.5 bg-[#E53935] shadow-xs'
                    : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Bottom Right Brand Seal & Logo Watermark (Matching Image 2 watermark!) */}
          <div className="absolute bottom-5 sm:bottom-6 right-5 sm:right-8 z-30 flex items-center gap-2.5 bg-black/35 backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-full border border-white/15 text-white shadow-xl pointer-events-none">
            <Image
              src="/logo.png"
              alt="RJF Seal"
              width={30}
              height={30}
              className="rounded-full object-contain"
            />
            <div className="hidden sm:block text-left">
              <div className="text-[10px] uppercase tracking-wider text-emerald-300 font-bold leading-tight">
                RJF OFFICIAL
              </div>
              <div className="text-xs font-black text-white leading-tight">
                রৌমারী জনকল্যাণ ফাউন্ডেশন
              </div>
            </div>
          </div>
        </div>

        {/* Trust Credential Strip Underneath Panoramic Banner */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 px-2 sm:px-4">
          <div className="flex items-center gap-1.5 text-stone-600">
            <ShieldCheck className="w-4 h-4 text-[#0D5C35] shrink-0" />
            <span>
              {lang === 'bn' ? 'অধিভুক্তি ও অনুমোদন:' : 'Affiliation & Status:'}{' '}
              <a
                href="/about"
                className="underline text-[#0D5C35] font-bold hover:text-[#E53935] transition"
              >
                {lang === 'bn'
                  ? 'সরকারি সমাজসেবা ট্রাস্ট ও অনুমোদিত ছাড়পত্র'
                  : 'Verified trust certificates & registration'}
              </a>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-stone-600 font-medium">
            <span>১২,৫০০+ মানুষ সহায়তাপ্রাপ্ত</span>
            <span>•</span>
            <span>১,২০০+ রক্তদাতা</span>
            <span>•</span>
            <span>৮+ বছরের নিবেদিত মানবিক সেবা</span>
          </div>

          <a
            href="#track"
            className="text-[#E53935] font-bold hover:underline inline-flex items-center gap-1"
          >
            <span>{lang === 'bn' ? 'আবেদনের অবস্থা দেখুন' : 'Track Application'}</span>
            <span>→</span>
          </a>
        </div>

        {/* --- Premium Field Photography Showcase Underneath Hero --- */}
        <div className="mt-12 sm:mt-16 pt-10 border-t border-emerald-950/10">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-bold mb-2 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#0D5C35]" />
                <span>{lang === 'bn' ? 'মাঠপর্যায়ের বাস্তব চিত্র' : 'Live Fieldwork Gallery'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-stone-900 tracking-tight">
                {lang === 'bn' ? 'রৌমারী ও চরাঞ্চলে আমাদের মানবিক কার্যক্রম' : 'Humanitarian Initiatives in Remote Chars'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
                {lang === 'bn'
                  ? 'শীতবস্ত্র বিতরণ, বিনামূল্যে চিকিৎসা ক্যাম্প, জরুরি রক্তদান এবং সুবিধাবঞ্চিত শিশুদের শিক্ষার আলোকচ্ছটা।'
                  : 'Delivering winter warmth, emergency medical relief, blood donor network, and underprivileged child education.'}
              </p>
            </div>

            <button
              onClick={onOpenActivities}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0D5C35] hover:text-[#E53935] transition-colors group cursor-pointer self-start md:self-auto shrink-0 bg-white px-4 py-2 rounded-full border border-stone-200 shadow-2xs hover:shadow-xs"
            >
              <span>{lang === 'bn' ? 'সকল কার্যক্রমের ছবি দেখুন' : 'Explore All Gallery Photos'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 4 Premium Visual Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {fieldHighlights.map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={onOpenActivities}
                  className="group relative h-72 sm:h-80 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-stone-200/90 transition-all duration-500 cursor-pointer flex flex-col justify-between p-4 sm:p-5"
                >
                  {/* High Quality Authentic Image */}
                  <Image
                    src={item.imageUrl}
                    alt={lang === 'bn' ? item.titleBn : item.titleEn}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />

                  {/* Deep Contrast Multi-Stop Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/45 to-stone-950/25 z-10 group-hover:via-stone-950/35 transition-colors duration-500" />

                  {/* Top Overlay: Category Badge & Location Chip */}
                  <div className="relative z-20 flex items-center justify-between gap-2">
                    <span
                      className={`text-[11px] font-bold text-white px-2.5 py-1 rounded-full shadow-md backdrop-blur-md ${item.badgeColor}`}
                    >
                      {lang === 'bn' ? item.tagBn : item.tagEn}
                    </span>

                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-white/90 bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20 shadow-xs">
                      <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="truncate max-w-[110px]">{lang === 'bn' ? item.locationBn : item.locationEn}</span>
                    </span>
                  </div>

                  {/* Bottom Overlay: Title, Description & Impact Metric */}
                  <div className="relative z-20 space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-[11px] font-bold text-emerald-300 border border-white/20 shadow-xs">
                      <span>✓ {lang === 'bn' ? item.statBn : item.statEn}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug group-hover:text-emerald-300 transition-colors duration-300 drop-shadow-md">
                      {lang === 'bn' ? item.titleBn : item.titleEn}
                    </h3>

                    <p className="text-xs text-stone-200 line-clamp-2 leading-relaxed drop-shadow-xs">
                      {lang === 'bn' ? item.descBn : item.descEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
