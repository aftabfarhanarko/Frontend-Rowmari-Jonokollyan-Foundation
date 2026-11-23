'use client';

import React from 'react';
import Image from 'next/image';
import {
  FileText,
  Search,
  CheckCircle2,
  MapPin,
  Sparkles,
  Users,
  Droplet,
  HeartPulse,
  GraduationCap,
  ArrowRight,
} from 'lucide-react';
import { Language } from '@/types';

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
  // Curated field photo cards with real-life humanitarian impact details
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
      icon: Users,
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
      icon: Droplet,
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
      icon: HeartPulse,
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
      icon: GraduationCap,
    },
  ];

  return (
    <section id="home" className="relative pt-6 pb-14 md:pt-12 md:pb-20 overflow-hidden bg-gradient-to-b from-emerald-50/50 via-white to-stone-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid: Hero Typography (Left) + Focal Image Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Texts & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/70 border border-emerald-200/60 text-emerald-900 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>{lang === 'bn' ? 'স্থাপিত ২০১৮ • রৌমারী, কুড়িগ্রাম' : 'Est. 2018 • Rowmari, Kurigram'}</span>
              <span className="text-emerald-700/60">|</span>
              <span className="text-emerald-800 font-medium">
                {lang === 'bn' ? '৯ম বছরে পদার্পণ' : '8+ Years of Service'}
              </span>
            </div>

            {/* Main Heading in bold Primary Red */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-[#E53935] leading-[1.2] tracking-tight">
              {lang === 'bn' ? 'মানুষের পাশে, মানুষের জন্য' : 'Standing by People, For Humanity'}
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl font-normal">
              {lang === 'bn'
                ? 'শীতবস্ত্র, খাদ্য, শিক্ষা, চিকিৎসা ও রক্তদানে রৌমারীর অসহায় মানুষের পাশে দাঁড়ানোই আমাদের কাজ। রৌমারী ও দুর্গম চরাঞ্চলের সুবিধাবঞ্চিত প্রতিটি মানুষের পাশে আমরা নিরলসভাবে নিবেদিত।'
                : 'Dedicated to serving the underprivileged in Rowmari and remote river island chars through winter relief, food aid, education, healthcare, and emergency blood donor coordination.'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenAssistance}
                className="px-7 py-3 rounded-xl bg-[#0D5C35] hover:bg-[#094527] text-white font-semibold text-base transition duration-150 shadow-md shadow-emerald-900/15 hover:shadow-lg flex items-center gap-2.5 active:scale-98 cursor-pointer"
              >
                <FileText className="w-5 h-5" />
                <span>{lang === 'bn' ? 'সহায়তার আবেদন' : 'Request Assistance'}</span>
              </button>

              <button
                onClick={onOpenActivities}
                className="px-7 py-3 rounded-xl border-2 border-[#0D5C35] text-[#0D5C35] hover:bg-emerald-50/70 font-semibold text-base transition duration-150 flex items-center gap-2 active:scale-98 cursor-pointer"
              >
                <Search className="w-5 h-5" />
                <span>{lang === 'bn' ? 'কার্যক্রম দেখুন' : 'Explore Activities'}</span>
              </button>
            </div>

            {/* Trust and Certification Note */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-stone-500">
              <div className="flex items-center gap-1.5 text-stone-600">
                <CheckCircle2 className="w-4 h-4 text-[#0D5C35] shrink-0" />
                <span>
                  {lang === 'bn' ? 'অধিভুক্তি ও অনুমোদন:' : 'Affiliation & Status:'}{' '}
                  <a
                    href="/about"
                    className="underline text-[#0D5C35] font-medium hover:text-[#E53935] transition"
                  >
                    {lang === 'bn'
                      ? 'সরকারি সমাজসেবা ট্রাস্ট ও অনুমোদিত ছাড়পত্র'
                      : 'Verified trust certificates & registration'}
                  </a>
                </span>
              </div>
              <span className="text-stone-300 hidden sm:inline">•</span>
              <a
                href="#track"
                className="text-[#E53935] font-semibold hover:underline"
              >
                {lang === 'bn' ? 'আবেদনের অবস্থা দেখুন →' : 'Track Application →'}
              </a>
            </div>
          </div>

          {/* Right Column: Visual Frame with real authentic photo & floating seal badge */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md sm:max-w-lg aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-2 border-stone-200/90 group">
              {/* Authentic Charity Field Image */}
              <Image
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80"
                alt="রৌমারী জনকল্যাণ ফাউন্ডেশনের চরাঞ্চলে মাঠপর্যায়ের মানবিক কার্যক্রম"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent z-10" />

              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-[#E53935] text-white px-2.5 py-0.5 rounded-md inline-block shadow-xs">
                  {lang === 'bn' ? 'মাঠপর্যায়ের মানবিক কার্যক্রম' : 'Ground Fieldwork'}
                </span>
                <h3 className="text-base sm:text-lg font-bold leading-tight drop-shadow-xs">
                  {lang === 'bn'
                    ? 'চরবাসীর মুখে হাসি ফোটানোর অবিচল অঙ্গীকার'
                    : 'Bringing smiles to remote river island families'}
                </h3>
                <p className="text-xs text-stone-200 drop-shadow-xs">
                  {lang === 'bn'
                    ? '২০১৮ সাল থেকে কুড়িগ্রামের অবহেলিত মানুষের পাশে বিশ্বস্ততার সাথে'
                    : 'Serving vulnerable communities of Kurigram since 2018'}
                </p>
              </div>

              {/* Overlaid Official Logo Badge */}
              <div className="absolute -bottom-3 -left-3 sm:-left-4 z-30 bg-white rounded-full p-1.5 shadow-2xl border-2 border-emerald-600/30 flex items-center justify-center hover:scale-105 transition-transform duration-200">
                <Image
                  src="/logo.png"
                  alt="রৌমারী জনকল্যাণ ফাউন্ডেশন লোগো সিলমোহর"
                  width={80}
                  height={80}
                  className="rounded-full object-contain"
                  priority
                />
              </div>

              {/* Floating verified badge on top right */}
              <div className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full shadow-md border border-stone-200 flex items-center gap-1.5 text-xs text-[#0D5C35] font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0D5C35]" />
                <span>{lang === 'bn' ? 'যাচাইকৃত মানবিক সংস্থা' : 'Verified Foundation'}</span>
              </div>
            </div>
          </div>
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
