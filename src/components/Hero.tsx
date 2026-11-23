'use client';

import React from 'react';
import Image from 'next/image';
import { FileText, Search, CheckCircle2 } from 'lucide-react';
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
      </div>
    </section>
  );
}
