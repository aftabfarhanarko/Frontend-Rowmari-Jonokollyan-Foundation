'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  MapPin,
  Sparkles,
  Users,
  HeartPulse,
  HeartHandshake,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  Heart,
} from 'lucide-react';
import { Language } from '@/types';
import { IMPACT_STATS } from '@/data/mockData';
import { useGetHeroSlidesQuery } from '@/store/api/contentApi';
import { useGetPublicSummaryQuery } from '@/store/api/dashboardApi';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

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
  const { data: summary } = useGetPublicSummaryQuery();

  const toBnNum = (n: number | string) =>
    n.toString().replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[parseInt(d, 10)]);

  const heroStats = useMemo(
    () => [
      {
        icon: Users,
        countBn: summary?.applicationsApproved ? `${toBnNum(summary.applicationsApproved)}+` : IMPACT_STATS[0].countBn,
        countEn: summary?.applicationsApproved ? `${summary.applicationsApproved}+` : IMPACT_STATS[0].countEn,
        labelBn: IMPACT_STATS[0].labelBn,
        labelEn: IMPACT_STATS[0].labelEn,
        shortLabelBn: 'সুবিধাভোগী',
        shortLabelEn: 'Served',
      },
      {
        icon: HeartHandshake,
        countBn: IMPACT_STATS[1].countBn,
        countEn: IMPACT_STATS[1].countEn,
        labelBn: IMPACT_STATS[1].labelBn,
        labelEn: IMPACT_STATS[1].labelEn,
        shortLabelBn: 'প্রকল্প',
        shortLabelEn: 'Projects',
      },
      {
        icon: HeartPulse,
        countBn: IMPACT_STATS[2].countBn,
        countEn: IMPACT_STATS[2].countEn,
        labelBn: IMPACT_STATS[2].labelBn,
        labelEn: IMPACT_STATS[2].labelEn,
        shortLabelBn: 'চিকিৎসা',
        shortLabelEn: 'Medical',
      },
      {
        icon: ShieldCheck,
        countBn: summary?.activeVolunteers ? `${toBnNum(summary.activeVolunteers)}+` : IMPACT_STATS[3].countBn,
        countEn: summary?.activeVolunteers ? `${summary.activeVolunteers}+` : IMPACT_STATS[3].countEn,
        labelBn: IMPACT_STATS[3].labelBn,
        labelEn: IMPACT_STATS[3].labelEn,
        shortLabelBn: 'স্বেচ্ছাসেবক',
        shortLabelEn: 'Volunteers',
      },
    ],
    [summary]
  );

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
      className="relative pb-8 sm:pb-12 overflow-hidden bg-white"
    >
      {/* Full-Bleed Dynamic Hero Banner */}
      <div className="relative w-full min-h-[430px] sm:min-h-[480px] lg:min-h-[540px] flex items-center overflow-hidden bg-stone-900">
        {/* Background Slideshow Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`bg-${activeSlide.id}`}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <Image
              src={activeSlide.imageUrl}
              alt={lang === 'bn' ? activeSlide.titleBn : activeSlide.titleEn}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center sm:object-right"
            />
          </motion.div>
        </AnimatePresence>

        {/* Subtle Dark Scrim on Left for Text Readability (No Red Tint or Blur) */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent"
        />

        {/* Hero Foreground Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 sm:pt-12 sm:pb-24">
          <div className="max-w-xl lg:max-w-2xl space-y-3.5 sm:space-y-5">
            {/* Top Pill Badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${activeSlide.id}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25 }}
              >
                <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#D62828] border border-red-400/40 text-white text-[11px] sm:text-xs font-bold shadow-md">
                  <span>{lang === 'bn' ? activeSlide.badgeBn : activeSlide.badgeEn}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Headline & Subtitle */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${activeSlide.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="space-y-2.5 sm:space-y-3.5"
              >
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.2] tracking-tight drop-shadow-sm">
                  {lang === 'bn' ? activeSlide.titleBn : activeSlide.titleEn}
                </h1>

                <p className="text-xs sm:text-base text-stone-100 leading-relaxed max-w-lg drop-shadow-xs">
                  {lang === 'bn' ? activeSlide.subtitleBn : activeSlide.subtitleEn}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3 pt-1">
              <button
                type="button"
                onClick={() => handleAction(activeSlide.btnPrimaryAction)}
                className="whitespace-nowrap px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-[#D62828] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>{lang === 'bn' ? activeSlide.btnPrimaryBn : activeSlide.btnPrimaryEn}</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction(activeSlide.btnSecondaryAction)}
                className="whitespace-nowrap px-4 py-2 sm:px-5 sm:py-3 rounded-full bg-black/25 hover:bg-black/40 text-white font-bold text-xs sm:text-sm border border-white/60 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>{lang === 'bn' ? activeSlide.btnSecondaryBn : activeSlide.btnSecondaryEn}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Dynamic Stats Bar overlapping bottom edge of Hero */}
      <div className="relative z-20 max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 -mt-10 sm:-mt-12">
        <div className="bg-white rounded-2xl shadow-[0_14px_40px_-12px_rgba(0,0,0,0.18)] border border-stone-200/90 px-2 py-3.5 sm:px-6 sm:py-5">
          <div className="grid grid-cols-4 divide-x divide-stone-200/80">
            {heroStats.map((stat, idx) => {
              const StatIcon = stat.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 px-1.5 sm:px-4 text-center sm:text-left"
                >
                  <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#D62828] shrink-0">
                    <StatIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm sm:text-xl font-black text-stone-900 leading-tight">
                      <AnimatedCounter value={lang === 'bn' ? stat.countBn : stat.countEn} />
                    </div>
                    <div className="text-[10px] sm:text-xs font-semibold text-stone-500 truncate mt-0.5">
                      <span className="sm:hidden">{lang === 'bn' ? stat.shortLabelBn : stat.shortLabelEn}</span>
                      <span className="hidden sm:inline">{lang === 'bn' ? stat.labelBn : stat.labelEn}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 mt-6 sm:mt-8">

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

        {/* --- Field Photography Showcase Underneath Hero --- */}
        <div className="pt-4 sm:pt-6">
          {/* Header Row */}
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-1.5 h-5 sm:h-6 rounded-full bg-[#D62828] shrink-0" />
              <h2 className="text-base sm:text-xl md:text-2xl font-black text-stone-900 tracking-tight truncate">
                {lang === 'bn' ? 'রৌমারী ও চরাঞ্চলে আমাদের মানবিক কার্যক্রম' : 'Humanitarian Initiatives in Remote Chars'}
              </h2>
            </div>

            <button
              type="button"
              onClick={onOpenActivities}
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#D62828] hover:text-[#B91C1C] transition-colors group cursor-pointer shrink-0"
            >
              <span>{lang === 'bn' ? 'সব দেখুন' : 'View All'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* 4 Visual Cards Grid — 2 per row on mobile, 4 per row on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {fieldHighlights.map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={onOpenActivities}
                  className="group bg-[#FFF8F8] rounded-2xl border border-red-100/80 overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  {/* Image with bottom-left tag badge */}
                  <div className="relative w-full aspect-16/10 bg-stone-100 overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={lang === 'bn' ? item.titleBn : item.titleEn}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full bg-[#D62828] text-white text-[10px] sm:text-[11px] font-bold shadow-xs">
                      {lang === 'bn' ? item.tagBn : item.tagEn}
                    </span>
                  </div>

                  {/* Compact Title & Stat Below Image */}
                  <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2">
                    <h3 className="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-[#D62828] transition line-clamp-2 leading-snug">
                      {lang === 'bn' ? item.titleBn : item.titleEn}
                    </h3>

                    <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-stone-700">
                      <Heart className="w-3.5 h-3.5 text-[#D62828] fill-[#D62828] shrink-0" />
                      <span className="truncate">{lang === 'bn' ? item.statBn : item.statEn}</span>
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
