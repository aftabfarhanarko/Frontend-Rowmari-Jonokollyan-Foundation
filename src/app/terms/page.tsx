'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Language } from '@/types';

export default function TermsPage() {
  const [lang, setLang] = useState<Language>('bn');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBF9] text-[#1E293B]">
      <Navbar lang={lang} onToggleLang={() => setLang(l => l === 'bn' ? 'en' : 'bn')} />

      <main className="flex-1 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded">
              {lang === 'bn' ? 'ব্যবহারের শর্ত' : 'Terms of Use'}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0D5C35]">
              {lang === 'bn' ? 'ব্যবহারের সাধারণ শর্তাবলী' : 'Terms & Conditions'}
            </h1>
            <p className="text-xs text-stone-400">সর্বশেষ সংস্করণ: নভেম্বর ২০২৬ • PRD v1.0 কমপ্লায়েন্ট</p>

            <div className="space-y-6 text-xs sm:text-sm text-stone-600 leading-relaxed pt-4 border-t border-stone-100">
              <section className="space-y-2">
                <h3 className="font-bold text-stone-900 text-base">১. ওয়েবসাইটের ব্যবহার ও উদ্দেশ্য</h3>
                <p>
                  এই প্ল্যাটফর্মটি সম্পূর্ণ অলাভজনক, অরাজনৈতিক এবং জনকল্যাণমূলক উদ্দেশ্যে পরিচালিত। ওয়েবসাইটের মাধ্যমে সহায়তা প্রাপ্তি, অনুদান প্রদান এবং রক্তদান সমন্বয়ের কাজ পরিচালিত হয়।
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-stone-900 text-base">২. তথ্যের সত্যতা ও দায়বদ্ধতা</h3>
                <p>
                  সহায়তার আবেদন বা রক্তদাতা নিবন্ধনের সময় ব্যবহারকারী প্রদত্ত তথ্যের সত্যতা নিশ্চিত করবেন। ভুল বা বিভ্রান্তিকর তথ্য প্রদান প্রমাণিত হলে ফাউন্ডেশন যে কোনো আবেদন বাতিলের অধিকার সংরক্ষণ করে।
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-stone-900 text-base">৩. মেধা ও কনটেন্ট স্বত্ব</h3>
                <p>
                  ওয়েবসাইটের লোগো, কনটেন্ট, আলোকচিত্র ও প্রতিবেদন রৌমারী জনকল্যাণ ফাউন্ডেশনের অনুমোদিত সম্পত্তি। অনুমতি ব্যতীত বাণিজ্যিক উদ্দেশ্যে ব্যবহার দণ্ডনীয়।
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
