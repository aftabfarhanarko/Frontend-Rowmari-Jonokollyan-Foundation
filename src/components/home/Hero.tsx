'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Search,
  CheckCircle2,
  MapPin,
  Sparkles,
  Users,
  HeartPulse,
  HeartHandshake,
  GraduationCap,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Heart,
} from 'lucide-react';
import { Language } from '@/types';
import { useGetHeroSlidesQuery } from '@/store/api/contentApi';

interface HeroProps {
  lang: Language;
  onOpenAssistance?: () => void;
  onOpenActivities: () => void;
  onOpenDonation?: (campaignId?: string) => void;
}

const DEFAULT_HERO_SLIDES = [
  {
    id: 'slide-1',
    badgeBn: 'স্থাপিত ২০১৮ • রৌমারী, কুড়িগ্রাম • ৯ম বছরে পদার্পণ',
    badgeEn: 'Est. 2018 • Rowmari, Kurigram • 8+ Years of Service',
    categoryBn: 'মানবিক সহায়তা মিশন',
    categoryEn: 'Humanitarian Mission',
    titleBn: 'মানুষের পাশে, মানুষের জন্য',
    titleEn: 'Standing by People, For Humanity',
    subtitleBn:
      'রৌমারী ও ব্রহ্মপুত্রের দুর্গম চরাঞ্চলের অসহায় শীতার্ত মানুষের পাশে দাঁড়ানোই আমাদের কাজ। শীতবস্ত্র, খাদ্য, শিক্ষা ও জরুরি চিকিৎসাসেবায় আমরা সার্বক্ষণিক নিবেদিত।',
    subtitleEn:
      'Dedicated to serving the underprivileged in Rowmari and remote river island chars through winter relief, food aid, education, and healthcare support.',
    btnPrimaryBn: 'অনুদান দিন',
    btnPrimaryEn: 'Donate Now',
    btnPrimaryAction: 'donate',
    btnPrimaryIcon: Heart,
    btnSecondaryBn: 'কার্যক্রম দেখুন',
    btnSecondaryEn: 'Explore Activities',
    btnSecondaryAction: 'activities',
    btnSecondaryIcon: Search,
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1800&q=85',
    overlayGradient: 'from-[#7f1d1d]/90 via-[#991b1b]/65 to-black/30',
  },
  {
    id: 'slide-2',
    badgeBn: 'শীতবস্ত্র ও জরুরি খাদ্য সহায়তা তহবিল',
    badgeEn: 'Winter Warmth & Food Aid Relief',
    categoryBn: 'ত্রাণ ও পুনর্বাসন উইং',
    categoryEn: 'Relief & Rehabilitation Wing',
    titleBn: 'চরাঞ্চলের শীতার্ত মানুষের মুখে ফুটুক উষ্ণতার হাসি',
    titleEn: 'Spreading Warmth & Nutrition to Char Families',
    subtitleBn:
      'তীব্র শীতে রৌমারীর ব্রহ্মপুত্র নদের প্রত্যন্ত চরাঞ্চলের অসহায় পরিবার, বৃদ্ধ ও শিশুদের মাঝে কম্বল, খাদ্যসামগ্রী ও জরুরি মানবিক সহায়তা প্রদান।',
    subtitleEn:
      'Distributing warm blankets, food supplies, and urgent humanitarian relief to vulnerable families across river-island char unions.',
    btnPrimaryBn: 'অনুদান দিন',
    btnPrimaryEn: 'Donate Now',
    btnPrimaryAction: 'donate',
    btnPrimaryIcon: Heart,
    btnSecondaryBn: 'কার্যক্রম দেখুন',
    btnSecondaryEn: 'Explore Activities',
    btnSecondaryAction: 'activities',
    btnSecondaryIcon: Search,
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1800&q=85',
    overlayGradient: 'from-[#7f1d1d]/90 via-[#991b1b]/65 to-black/30',
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
      'বিনা চিকিৎসায় যেন কোনো প্রাণ না হারায়—অসহায় রোগীদের বড় ধরনের অপারেশন, জটিল হৃদরোগ, থ্যালাসেমিয়া ও ওষুধে জরুরি স্বাস্থ্যসেবা ও সহায়তা প্রদান।',
    subtitleEn:
      'No life should be lost for lack of medicine. Providing vital medical grants, complex surgery support, and free physician camps in remote river island unions.',
    btnPrimaryBn: 'চিকিৎসায় অনুদান দিন',
    btnPrimaryEn: 'Support Healthcare',
    btnPrimaryAction: 'donate',
    btnPrimaryIcon: HeartPulse,
    btnSecondaryBn: 'কার্যক্রম দেখুন',
    btnSecondaryEn: 'View Healthcare Work',
    btnSecondaryAction: 'activities',
    btnSecondaryIcon: HeartHandshake,
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1800&q=85',
    overlayGradient: 'from-[#991B1B]/90 via-[#B91C1C]/65 to-black/30',
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
    btnPrimaryBn: 'শিক্ষায় অনুদান দিন',
    btnPrimaryEn: 'Support Education',
    btnPrimaryAction: 'donate',
    btnPrimaryIcon: GraduationCap,
    btnSecondaryBn: 'কার্যক্রম দেখুন',
    btnSecondaryEn: 'View Education Work',
    btnSecondaryAction: 'activities',
    btnSecondaryIcon: Sparkles,
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=85',
    overlayGradient: 'from-[#881337]/90 via-[#991B1B]/65 to-black/30',
  },
];

export default function Hero({
  lang,
  onOpenAssistance,
  onOpenActivities,
  onOpenDonation,
}: HeroProps) {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: dbSlides } = useGetHeroSlidesQuery();

  // Dynamic slides from database with default fallbacks
  const heroSlides = useMemo(() => {
    if (dbSlides && dbSlides.length > 0) {
      return dbSlides.map((slide, idx) => ({
        id: slide.id || `slide-${idx + 1}`,
        badgeBn: slide.badgeBn || 'স্থাপিত ২০১৮ • রৌমারী, কুড়িগ্রাম • ৯ম বছরে পদার্পণ',
        badgeEn: slide.badgeEn || 'Est. 2018 • Rowmari, Kurigram',
        categoryBn: slide.categoryBn || 'মানবিক সহায়তা মিশন',
        categoryEn: slide.categoryEn || 'Humanitarian Mission',
        titleBn: slide.titleBn,
        titleEn: slide.titleEn || slide.titleBn,
        subtitleBn: slide.subtitleBn,
        subtitleEn: slide.subtitleEn || slide.subtitleBn,
        btnPrimaryBn: slide.btnPrimaryBn || 'অনুদান দিন',
        btnPrimaryEn: slide.btnPrimaryEn || 'Donate Now',
        btnPrimaryAction: slide.btnPrimaryLink || 'donate',
        btnPrimaryIcon: Heart,
        btnSecondaryBn: slide.btnSecondaryBn || 'কার্যক্রম দেখুন',
        btnSecondaryEn: slide.btnSecondaryEn || 'Explore Activities',
        btnSecondaryAction: slide.btnSecondaryLink || 'activities',
        btnSecondaryIcon: Search,
        imageUrl: slide.imageUrl || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1800&q=85',
        overlayGradient: 'from-[#7f1d1d]/90 via-[#991b1b]/65 to-black/30',
      }));
    }
    return DEFAULT_HERO_SLIDES;
  }, [dbSlides]);

  // Continuous automatic slideshow rotation every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const safeIndex = currentSlide >= heroSlides.length ? 0 : currentSlide;
  const activeSlide = heroSlides[safeIndex] || heroSlides[0];

  const handleAction = (actionType: string) => {
    if (actionType.startsWith('/') || actionType.startsWith('http')) {
      router.push(actionType);
      return;
    }
    switch (actionType) {
      case 'donate':
        router.push('/donate');
        break;
      case 'activities':
        onOpenActivities();
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
      titleBn: 'জরুরি খাদ্য ও পুষ্টি সহায়তা বিতরণ',
      titleEn: 'Emergency Food & Relief Assistance',
      tagBn: 'খাদ্য সহায়তা',
      tagEn: 'Food Support',
      badgeColor: 'bg-red-600',
      statBn: '৩,২০০+ পরিবার উপকৃত',
      statEn: '3,200+ Families',
      locationBn: 'চর শৌলমারী ও কর্তিমারী',
      locationEn: 'Char Shoulmari & Kartimari',
      descBn: 'চরাঞ্চলের বন্যাপীড়িত ও দিনমজুর পরিবারের মাঝে চাল, ডাল, তেলসহ নিত্যপ্রয়োজনীয় খাদ্য বিতরণ।',
      descEn: 'Distributing food packages containing rice, lentils, and essentials to impoverished char families.',
      imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'field-3',
      titleBn: 'বিনামূল্যে চিকিৎসা ও বিশেষজ্ঞ ক্যাম্প',
      titleEn: 'Free Medical Camps & Medicines',
      tagBn: 'চিকিৎসা সহায়তা',
      tagEn: 'Healthcare Aid',
      badgeColor: 'bg-red-800',
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
      badgeColor: 'bg-red-700',
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
      className="relative pt-0 sm:pt-4 pb-8 sm:pb-12 overflow-hidden bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Full-Width Split Hero Card (Clean White Editorial Layout - NO TEXT OVER IMAGE) */}
        <div className="relative w-full rounded-2xl md:rounded-3xl border border-stone-200/90 shadow-sm bg-white overflow-hidden p-5 sm:p-7 md:p-9 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* Left Column: Text & Action Controls (On Clean White Background) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4 sm:space-y-5">
              {/* Top Tagline Badge */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`badge-${activeSlide.id}`}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[#D62828] text-xs font-bold shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-[#D62828] animate-pulse" />
                    <span>{lang === 'bn' ? activeSlide.badgeBn : activeSlide.badgeEn}</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Category, Title & Subtitle */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`text-${activeSlide.id}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-3 sm:space-y-4"
                >
                  <div className="inline-block">
                    <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-stone-100 text-stone-700">
                      {lang === 'bn' ? activeSlide.categoryBn : activeSlide.categoryEn}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black text-stone-900 leading-[1.25] tracking-tight">
                    {lang === 'bn' ? activeSlide.titleBn : activeSlide.titleEn}
                  </h1>

                  <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal max-w-xl">
                    {lang === 'bn' ? activeSlide.subtitleBn : activeSlide.subtitleEn}
                  </p>

                  {/* Primary & Secondary Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => handleAction(activeSlide.btnPrimaryAction)}
                      className="px-6 py-2.5 sm:py-3 rounded-xl bg-[#D62828] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 cursor-pointer"
                    >
                      <PrimaryIcon className="w-4 h-4 text-white shrink-0" />
                      <span>{lang === 'bn' ? activeSlide.btnPrimaryBn : activeSlide.btnPrimaryEn}</span>
                    </button>

                    <button
                      onClick={() => handleAction(activeSlide.btnSecondaryAction)}
                      className="px-6 py-2.5 sm:py-3 rounded-xl bg-white hover:bg-stone-50 text-stone-800 font-bold text-xs sm:text-sm border border-stone-300 transition-all shadow-xs hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 cursor-pointer"
                    >
                      <SecondaryIcon className="w-4 h-4 text-[#D62828] shrink-0" />
                      <span>{lang === 'bn' ? activeSlide.btnSecondaryBn : activeSlide.btnSecondaryEn}</span>
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slider Controls & Slide Indicators */}
              <div className="flex items-center gap-4 pt-2 border-t border-stone-100">
                <div className="flex items-center gap-1.5">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`transition-all duration-300 rounded-full cursor-pointer ${
                        currentSlide === idx
                          ? 'w-7 h-2 bg-[#D62828]'
                          : 'w-2 h-2 bg-stone-300 hover:bg-stone-400'
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-1 text-stone-400 ml-auto">
                  <button
                    onClick={prevSlide}
                    className="p-1.5 rounded-full hover:bg-stone-100 text-stone-600 border border-stone-200 transition cursor-pointer"
                    aria-label="Previous Slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="p-1.5 rounded-full hover:bg-stone-100 text-stone-600 border border-stone-200 transition cursor-pointer"
                    aria-label="Next Slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Authentic Photography (NO TEXT OVER IMAGE) */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 rounded-xl sm:rounded-2xl overflow-hidden shadow-md border border-stone-200/80 bg-stone-100">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide.id}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeSlide.imageUrl}
                      alt={lang === 'bn' ? activeSlide.titleBn : activeSlide.titleEn}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Credential Strip Underneath Panoramic Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 px-2 sm:px-1">
          <div className="flex items-center gap-1.5 text-stone-600">
            <ShieldCheck className="w-4 h-4 text-[#D62828] shrink-0" />
            <span>
              {lang === 'bn' ? 'অধিভুক্তি ও অনুমোদন:' : 'Affiliation & Status:'}{' '}
              <a
                href="/about"
                className="underline text-[#D62828] font-bold hover:text-[#E53935] transition"
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
            <span>৪৫০+ সক্রিয় স্বেচ্ছাসেবক</span>
            <span>•</span>
            <span>৮+ বছরের নিবেদিত মানবিক সেবা</span>
          </div>

          <a
            href="/volunteer"
            className="text-[#E53935] font-bold hover:underline inline-flex items-center gap-1"
          >
            <span>{lang === 'bn' ? 'স্বেচ্ছাসেবক হিসেবে যোগ দিন' : 'Join as Volunteer'}</span>
            <span>→</span>
          </a>
        </div>

        {/* --- Premium Field Photography Showcase Underneath Hero --- */}
        <div className="pt-6 sm:pt-8 border-t border-stone-200">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100/80 text-red-900 text-xs font-bold mb-2 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#D62828]" />
                <span>{lang === 'bn' ? 'মাঠপর্যায়ের বাস্তব চিত্র' : 'Live Fieldwork Gallery'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-stone-900 tracking-tight">
                {lang === 'bn' ? 'রৌমারী ও চরাঞ্চলে আমাদের মানবিক কার্যক্রম' : 'Humanitarian Initiatives in Remote Chars'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
                {lang === 'bn'
                  ? 'শীতবস্ত্র বিতরণ, বিনামূল্যে চিকিৎসা ক্যাম্প, জরুরি খাদ্য সহায়তা এবং সুবিধাবঞ্চিত শিশুদের শিক্ষার আলোকচ্ছটা।'
                  : 'Delivering winter warmth, emergency medical relief, food packages, and underprivileged child education.'}
              </p>
            </div>

            <button
              onClick={onOpenActivities}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#D62828] hover:text-[#E53935] transition-colors group cursor-pointer self-start md:self-auto shrink-0 bg-white px-4 py-2 rounded-full border border-stone-200 shadow-2xs hover:shadow-xs"
            >
              <span>{lang === 'bn' ? 'সকল কার্যক্রমের ছবি দেখুন' : 'Explore All Gallery Photos'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 4 Premium Visual Cards Grid - NO TEXT OVER IMAGES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {fieldHighlights.map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={onOpenActivities}
                  className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  {/* Clean Authentic Image - NO TEXT OVER IMAGE */}
                  <div className="relative w-full aspect-16/10 bg-stone-100 overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={lang === 'bn' ? item.titleBn : item.titleEn}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>

                  {/* Clean Content Below Image */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <span className={`text-[11px] font-bold text-white px-2.5 py-0.5 rounded-md ${item.badgeColor}`}>
                          {lang === 'bn' ? item.tagBn : item.tagEn}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] text-stone-500 font-medium">
                          <MapPin className="w-3 h-3 text-[#D62828] shrink-0" />
                          <span className="truncate max-w-[110px]">{lang === 'bn' ? item.locationBn : item.locationEn}</span>
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-stone-900 group-hover:text-[#D62828] transition line-clamp-2 leading-snug">
                        {lang === 'bn' ? item.titleBn : item.titleEn}
                      </h3>

                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {lang === 'bn' ? item.descBn : item.descEn}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                      <span className="font-bold text-[#D62828]">✓ {lang === 'bn' ? item.statBn : item.statEn}</span>
                      <span className="text-stone-400 font-semibold group-hover:text-[#D62828] transition flex items-center gap-0.5">
                        {lang === 'bn' ? 'বিস্তারিত' : 'View'}
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
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
