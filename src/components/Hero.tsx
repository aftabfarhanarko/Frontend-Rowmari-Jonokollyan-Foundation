'use client';

import React from 'react';
import Image from 'next/image';
import { FileText, Search, CheckCircle2, HeartHandshake } from 'lucide-react';
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
  return (
    <section id="home" className="relative pt-6 pb-14 md:pt-12 md:pb-20 overflow-hidden bg-gradient-to-b from-emerald-50/50 via-white to-stone-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-[#0D5C35] leading-[1.2] tracking-tight">
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
            <div className="pt-2 flex items-center gap-2 text-xs text-stone-500">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                {lang === 'bn' ? 'অধিভুক্তি ও অনুমোদন:' : 'Affiliation & Status:'}{' '}
                <a
                  href="/about"
                  className="underline text-emerald-800 font-medium hover:text-emerald-950 transition"
                >
                  {lang === 'bn'
                    ? 'সরকারি সমাজসেবা ট্রাস্ট ও অনুমোদিত ছাড়পত্র দেখুন'
                    : 'View verified trust certificates & registration'}
                </a>
              </span>
            </div>
          </div>

          {/* Right Column: Visual Frame with floating official seal badge */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md sm:max-w-lg aspect-4/3 rounded-3xl overflow-hidden bg-gradient-to-br from-stone-200 via-stone-100 to-emerald-100/50 shadow-xl border border-stone-200/80 p-2 flex flex-col justify-between">
              {/* Graphic Representation of Foundation in Action */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-stone-100 flex flex-col justify-end p-6">
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/40 to-transparent z-10" />

                {/* Decorative image-like illustration */}
                <div className="absolute inset-0 bg-stone-200">
                  <div className="w-full h-full bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
                  <div className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm font-medium">
                    <div className="text-center p-6 space-y-2">
                      <HeartHandshake className="w-16 h-16 text-emerald-700/60 mx-auto" />
                      <p className="text-xs text-stone-600 font-semibold">
                        {lang === 'bn'
                          ? 'রৌমারীর চরাঞ্চলে শীতবস্ত্র ও খাদ্য সহায়তা কর্মসূচি'
                          : 'Humanitarian Winter & Food Relief Drive in Rowmari Chars'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Overlay Card Details */}
                <div className="relative z-20 text-white space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-600/90 text-white px-2.5 py-0.5 rounded-md inline-block">
                    {lang === 'bn' ? 'মাঠপর্যায়ের মানবিক কার্যক্রম' : 'Ground Fieldwork'}
                  </span>
                  <h2 className="text-lg font-bold leading-tight drop-shadow-xs">
                    {lang === 'bn'
                      ? 'চরবাসীর মুখে হাসি ফোটানোর অঙ্গীকার'
                      : 'Bringing smiles to remote river island families'}
                  </h2>
                  <p className="text-xs text-stone-200 drop-shadow-xs">
                    {lang === 'bn'
                      ? '৯ বছর ধরে কুড়িগ্রামের অবহেলিত মানুষের পাশে বিশ্বস্ততার সাথে'
                      : 'Serving the vulnerable communities of Kurigram since 2018'}
                  </p>
                </div>
              </div>

              {/* Overlaid Official Logo Badge */}
              <div className="absolute -bottom-4 -left-3 sm:-left-4 z-30 bg-white rounded-full p-1.5 shadow-2xl border-2 border-emerald-600/30 flex items-center justify-center hover:scale-105 transition-transform duration-200">
                <Image
                  src="/logo.png"
                  alt="রৌমারী জনকল্যাণ ফাউন্ডেশন লোগো সিলমোহর"
                  width={84}
                  height={84}
                  className="rounded-full object-contain"
                  priority
                />
              </div>

              {/* Floating verified badge on top right */}
              <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full shadow-md border border-stone-200 flex items-center gap-1.5 text-xs text-emerald-900 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{lang === 'bn' ? 'যাচাইকৃত মানবিক সংস্থা' : 'Verified Foundation'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
