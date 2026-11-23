'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VolunteerModal from '@/components/modals/VolunteerModal';
import { Language } from '@/types';

export default function VolunteerPage() {
  const [lang, setLang] = useState<Language>('bn');
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBF9] text-[#1E293B]">
      <Navbar lang={lang} onToggleLang={() => setLang(l => l === 'bn' ? 'en' : 'bn')} />

      <main className="flex-1">
        {/* Banner */}
        <section className="bg-gradient-to-b from-emerald-900 to-[#0A4F2E] text-white py-16 md:py-20 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold mb-3 border border-emerald-700">
              {lang === 'bn' ? 'স্বেচ্ছাসেবী নেটওয়ার্ক' : 'Volunteer Network'}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              {lang === 'bn' ? 'স্বেচ্ছাসেবক হিসেবে যুক্ত হোন' : 'Join as a Volunteer'}
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed mb-6">
              {lang === 'bn'
                ? 'আপনার মেধা, সময় ও মানবিক শ্রম দিয়ে রৌমারীর দুর্গম চরাঞ্চলের মানুষের পাশে দাঁড়ান।'
                : 'Offer your time, empathy, and skills to create lasting social impact across Rowmari.'}
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="px-8 py-3.5 rounded-xl bg-white text-emerald-950 font-bold text-sm shadow-xl hover:bg-stone-100 transition cursor-pointer"
            >
              👥 {lang === 'bn' ? 'স্বেচ্ছাসেবক নিবন্ধন ফর্ম পূরণ করুন' : 'Fill Volunteer Application'}
            </button>
          </div>
        </section>

        {/* Roles & Opportunities */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D5C35] mb-2">
                {lang === 'bn' ? 'স্বেচ্ছাসেবীদের দায়িত্ব ও কাজের ক্ষেত্র' : 'Volunteer Wings & Opportunities'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-500">
                {lang === 'bn' ? 'আপনার দক্ষতা ও সুবিধাজনক সময়ে যেকোনো একটি বা একাধিক উইংয়ে যুক্ত হতে পারেন' : 'Choose the wing that best matches your interest and availability.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {[
                { icon: '📦', title: 'ত্রাণ ও শীতবস্ত্র বিতরণ', desc: 'চরাঞ্চলে বাড়ি বাড়ি গিয়ে সুবিধাভোগী তালিকা তৈরি এবং সুষ্ঠুভাবে কম্বল ও খাদ্যসামগ্রী বিতরণ।' },
                { icon: '🩺', title: 'মেডিকেল ক্যাম্প সহায়তা', desc: 'স্বাস্থ্য ক্যাম্পে ডাক্তারদের সহায়তা, রোগী শৃঙ্খলা রক্ষা ও বিনামূল্যে ওষুধ বিতরণ কার্যক্রম পরিচালনা।' },
                { icon: '🩸', title: 'রক্তদাতা সমন্বয় উইং', desc: 'রৌমারী উপজেলা স্বাস্থ্য কমপ্লেক্সের জন্য জরুরি রক্তদাতা খোঁজা ও ডোনারদের সাথে যোগাযোগ রক্ষা।' },
                { icon: '📷', title: 'মিডিয়া, ফটোগ্রাফি ও প্রচার', desc: 'কার্যক্রমের ছবি/ভিডিও ডকুমেন্টেশন, সোশাল মিডিয়া আপডেট এবং গ্রাফিক ডিজাইন তৈরি।' },
                { icon: '💻', title: 'আইটি ও ডেটাবেজ ম্যানেজমেন্ট', desc: 'অনলাইন আবেদন পর্যালোচনা, ডোনার ডেটাবেজ হালনাগাদ ও ডিজিটাল সিস্টেম পরিচালনায় সহায়তা।' },
                { icon: '🎓', title: 'শিক্ষা ও শিশুকল্যাণ কর্মসূচি', desc: 'চরাঞ্চলের স্কুলে শিক্ষাসামগ্রী পৌঁছানো, শিশু অধিকার ও ঝরে পড়া শিক্ষার্থী জরিপ।' },
              ].map((role, idx) => (
                <div key={idx} className="p-6 bg-white rounded-2xl border border-stone-200 shadow-2xs hover:shadow-lg transition">
                  <span className="text-4xl block mb-3">{role.icon}</span>
                  <h3 className="text-base font-bold text-stone-900 mb-2">{role.title}</h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{role.desc}</p>
                </div>
              ))}
            </div>

            {/* Why volunteer box */}
            <div className="bg-stone-50 rounded-3xl border border-stone-200 p-8 sm:p-10 max-w-3xl mx-auto text-center space-y-4">
              <h3 className="text-xl font-bold text-stone-900">{lang === 'bn' ? 'স্বেচ্ছাসেবক হিসেবে আপনি কী পাবেন?' : 'What You Gain as a Volunteer'}</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-xl mx-auto">
                {lang === 'bn'
                  ? 'মানবিক তৃপ্তির পাশাপাশি ফাউন্ডেশনের অফিশিয়াল ভলান্টিয়ার সার্টিফিকেট, নেতৃত্ব উন্নয়ন অভিজ্ঞতা এবং কুড়িগ্রামের নিবেদিত তরুণদের একটি শক্তিশালী নেটওয়ার্ক।'
                  : 'Experience community leadership, official voluntary service certificates, and a network of dedicated changemakers.'}
              </p>
              <div>
                <button
                  onClick={() => setModalOpen(true)}
                  className="px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm transition shadow-md cursor-pointer"
                >
                  {lang === 'bn' ? 'আজই আবেদন করুন' : 'Apply Today'}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />

      <VolunteerModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
