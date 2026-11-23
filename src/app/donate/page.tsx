'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DonationModal from '@/components/modals/DonationModal';
import { FOUNDATION_INFO } from '@/data/mockData';
import { Language } from '@/types';

export default function DonatePage() {
  const [lang, setLang] = useState<Language>('bn');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState('general');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBF9] text-[#1E293B]">
      <Navbar lang={lang} onToggleLang={() => setLang(l => l === 'bn' ? 'en' : 'bn')} />

      <main className="flex-1">
        {/* Banner */}
        <section className="bg-gradient-to-b from-[#064024] to-[#0A5C36] text-white py-16 md:py-20 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold mb-3 border border-emerald-700">
              {lang === 'bn' ? 'স্বচ্ছ ও নিরাপদ অনুদান' : 'Transparent & Secure Donation'}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              {lang === 'bn' ? 'মানবতার কল্যাণে অনুদান দিন' : 'Donate for Humanity'}
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed mb-6">
              {lang === 'bn'
                ? 'আপনার দেওয়া প্রতিটি টাকার পাই-টু-পাই হিসাব সংরক্ষিত থাকে এবং তাৎক্ষণিক ডিজিটাল রসিদ প্রদান করা হয়।'
                : 'Every penny of your donation directly supports vulnerable char families with transparent digital receipts.'}
            </p>
            <button
              onClick={() => {
                setSelectedCampaign('general');
                setModalOpen(true);
              }}
              className="px-8 py-3.5 rounded-full bg-red-700 hover:bg-red-800 text-white font-bold text-sm shadow-xl transition cursor-pointer"
            >
              ❤️ {lang === 'bn' ? 'এখনই অনলাইন অনুদান দিন ও রসিদ পান' : 'Donate Now & Get Receipt'}
            </button>
          </div>
        </section>

        {/* Payment Channels Section */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {/* bKash */}
              <div className="bg-white p-6 rounded-2xl border-2 border-pink-100 shadow-xs hover:border-pink-300 transition">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-extrabold text-pink-700 text-lg">bKash (বিকাশ)</span>
                  <span className="text-[10px] bg-pink-100 text-pink-700 px-2 py-0.5 rounded font-bold">মার্চেন্ট / পেমেন্ট</span>
                </div>
                <p className="text-xs text-stone-500 mb-3">বিকাশ অ্যাপের ‘Make Payment’ বা ‘Send Money’ অপশন ব্যবহার করুন:</p>
                <div className="p-3 bg-pink-50/60 rounded-xl font-mono font-bold text-stone-900 text-center text-sm border border-pink-200 mb-3">
                  01712-345678
                </div>
                <p className="text-[11px] text-stone-400">রেফারেন্সে আপনার নাম বা খাতের নাম (যেমন: Winter) লিখুন।</p>
              </div>

              {/* Nagad */}
              <div className="bg-white p-6 rounded-2xl border-2 border-orange-100 shadow-xs hover:border-orange-300 transition">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-extrabold text-orange-600 text-lg">Nagad (নগদ)</span>
                  <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded font-bold">পেমেন্ট / পার্সোনাল</span>
                </div>
                <p className="text-xs text-stone-500 mb-3">নগদ অ্যাপ বা ইউএসএসডি কোড দিয়ে সেন্ড মানি করুন:</p>
                <div className="p-3 bg-orange-50/60 rounded-xl font-mono font-bold text-stone-900 text-center text-sm border border-orange-200 mb-3">
                  01812-987654
                </div>
                <p className="text-[11px] text-stone-400">লেনদেনের পর TrxID টি আমাদের ফর্মে লিখে রসিদ সংগ্রহ করুন।</p>
              </div>

              {/* Bank Account */}
              <div className="bg-white p-6 rounded-2xl border-2 border-emerald-100 shadow-xs hover:border-emerald-300 transition">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-extrabold text-emerald-800 text-lg">ব্যাংক একাউন্ট</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">সরাসরি ট্রান্সফার</span>
                </div>
                <div className="space-y-1 text-xs text-stone-600 mb-3">
                  <p><strong>ব্যাংক:</strong> ইসলামী ব্যাংক বাংলাদেশ লিমিটেড</p>
                  <p><strong>হিসাবের নাম:</strong> Rowmari Janakalyan Foundation</p>
                  <p><strong>হিসাব নং:</strong> <span className="font-mono font-bold text-stone-900">2050398010009876</span></p>
                  <p><strong>শাখা:</strong> রৌমারী শাখা, কুড়িগ্রাম</p>
                </div>
                <p className="text-[11px] text-stone-400">রাউটিং নম্বর: 125492482 (BEFTN / NPSB সমর্থিত)</p>
              </div>
            </div>

            {/* Transparency statement */}
            <div className="bg-stone-50 border border-stone-200 rounded-3xl p-8 sm:p-10 max-w-4xl mx-auto space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
                <span>🛡️</span>
                <span>{lang === 'bn' ? 'আমাদের আর্থিক স্বচ্ছতা ও জবাবদিহিতা নীতি' : 'Financial Transparency & Accountability'}</span>
              </h2>
              <ul className="text-xs sm:text-sm text-stone-600 space-y-2.5">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span><strong>ডিজিটাল রসিদ:</strong> প্রত্যেক দাতাকে তাৎক্ষণিক ইউনিক রসিদ নম্বরসহ ডিজিটাল মানি রিসিপ্ট প্রদান করা হয়।</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span><strong>নিরীক্ষিত হিসাব:</strong> প্রতিটি ক্যাম্পেইনের সংগ্রহ ও ব্যয়ের হিসাব চার্টার্ড একাউন্ট্যান্ট বা অনুমোদিত অডিট কমিটি দ্বারা নিরীক্ষিত হয়।</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span><strong>গোপনীয়তার অধিকার:</strong> কোনো দাতা চাইলে নিজের নাম-পরিচয় সম্পূর্ণ গোপন রেখে অনুদান দিতে পারেন (Anonymous Donation)।</span>
                </li>
              </ul>

              <div className="pt-4 border-t border-stone-200 flex justify-center">
                <button
                  onClick={() => setModalOpen(true)}
                  className="px-8 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md transition cursor-pointer"
                >
                  {lang === 'bn' ? 'অনুদান ফর্ম ওপেন করুন' : 'Open Donation Form'}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />

      <DonationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        lang={lang}
        preselectedCampaign={selectedCampaign}
      />
    </div>
  );
}
