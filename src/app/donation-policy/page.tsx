'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Language } from '@/types';

export default function DonationPolicyPage() {
  const [lang, setLang] = useState<Language>('bn');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBF9] text-[#1E293B]">
      <Navbar lang={lang} onToggleLang={() => setLang(l => l === 'bn' ? 'en' : 'bn')} />

      <main className="flex-1 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded">
              {lang === 'bn' ? 'আর্থিক স্বচ্ছতা' : 'Donation Policy'}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0D5C35]">
              {lang === 'bn' ? 'অনুদান ও স্বচ্ছতা নীতিমালা' : 'Donation & Financial Transparency Policy'}
            </h1>
            <p className="text-xs text-stone-400">সর্বশেষ সংস্করণ: নভেম্বর ২০২৬ • PRD v1.0 কমপ্লায়েন্ট</p>

            <div className="space-y-6 text-xs sm:text-sm text-stone-600 leading-relaxed pt-4 border-t border-stone-100">
              <section className="space-y-2">
                <h3 className="font-bold text-stone-900 text-base">১. অনুদানের ব্যবহার ও বণ্টন</h3>
                <p>
                  দাতা যে নির্দিষ্ট ক্যাম্পেইনের জন্য অনুদান পাঠাবেন, সংগৃহীত অর্থ শতভাগ সেই নির্দিষ্ট মানবিক কাজেই ব্যয় করা হয়। সাধারণ তহবিলের অর্থ জরুরি দুর্যোগ ত্রাণ ও চিকিৎসা সহায়তায় ব্যয় হয়।
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-stone-900 text-base">২. ডিজিটাল রসিদ ও ভেরিফিকেশন</h3>
                <p>
                  প্রতিটি অনুদানের বিপরীতে একটি স্বয়ংক্রিয় রেফারেন্স আইডি ও ডিজিটাল রসিদ প্রদান করা হয়। ব্যাংক বা মোবাইল ব্যাংকিং গেটওয়ের স্টেটমেন্ট যাচাই সাপেক্ষে হিসাব নিরীক্ষায় যুক্ত হয়।
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-stone-900 text-base">৩. রিফান্ড ও সমন্বয় নীতিমালা</h3>
                <p>
                  মানবকল্যাণমূলক অনুদান সাধারণত ফেরতযোগ্য নয়। তবে ভুলবশত অতিরিক্ত অর্থ প্রেরিত হলে প্রেরক ৭ দিনের মধ্যে ট্রানজেকশন আইডিসহ লিখিত আবেদন করলে যাচাই সাপেক্ষে ব্যাংক চার্জ বাদে সমন্বয় করা যেতে পারে।
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
