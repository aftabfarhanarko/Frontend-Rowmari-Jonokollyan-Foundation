'use client';

import React, { useState } from 'react';
import { Heart, Droplet, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BloodRequestModal from '@/components/modals/BloodRequestModal';
import BloodDonorModal from '@/components/modals/BloodDonorModal';
import { FOUNDATION_INFO } from '@/data/mockData';
import { Language } from '@/types';

export default function BloodDonationPage() {
  const [lang, setLang] = useState<Language>('bn');
  const [bloodRequestOpen, setBloodRequestOpen] = useState(false);
  const [bloodDonorOpen, setBloodDonorOpen] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBF9] text-[#1E293B]">
      <Navbar lang={lang} onToggleLang={() => setLang(l => l === 'bn' ? 'en' : 'bn')} />

      <main className="flex-1">
        {/* Banner */}
        <section className="bg-gradient-to-b from-red-900 to-[#7F1D1D] text-white py-16 md:py-20 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-red-800/80 text-red-100 text-xs font-bold mb-3 border border-red-700">
              {lang === 'bn' ? 'জরুরি রক্তদাতা নেটওয়ার্ক' : 'Emergency Blood Donor Wing'}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              {lang === 'bn' ? 'রক্তদান ও ডোনার পোর্টাল' : 'Blood Donation Portal'}
            </h1>
            <p className="text-sm sm:text-base text-red-100/90 leading-relaxed mb-6">
              {lang === 'bn'
                ? 'রৌমারী উপজেলা স্বাস্থ্য কমপ্লেক্স ও কুড়িগ্রামের রোগীদের জন্য ২৪/৭ রক্তদাতা সমন্বয়।'
                : 'Connecting verified voluntary blood donors with critical hospital patients in Rowmari.'}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setBloodDonorOpen(true)}
                className="px-6 py-3 rounded-xl bg-white text-red-900 font-bold text-sm shadow-md hover:bg-red-50 transition cursor-pointer inline-flex items-center gap-2"
              >
                <Heart className="w-4 h-4 fill-red-700 text-red-700" />
                <span>{lang === 'bn' ? 'স্বেচ্ছায় রক্তদাতা হন' : 'Register as Donor'}</span>
              </button>
              <button
                onClick={() => setBloodRequestOpen(true)}
                className="px-6 py-3 rounded-xl border-2 border-white text-white font-bold text-sm hover:bg-white/10 transition cursor-pointer inline-flex items-center gap-2"
              >
                <Droplet className="w-4 h-4 fill-white text-white" />
                <span>{lang === 'bn' ? 'জরুরি রক্তের অনুরোধ পাঠান' : 'Request Blood'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* 24/7 Hotline Bar */}
        <section className="bg-red-50 border-b border-red-200 py-4 px-4 text-center">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-red-900">
            <span className="flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              <span><strong>{lang === 'bn' ? 'জরুরি রক্তের প্রয়োজনে হটলাইন:' : 'Emergency Blood Hotline:'}</strong> {FOUNDATION_INFO.emergencyBloodHotline}</span>
            </span>
            <span className="text-red-700">{lang === 'bn' ? '২৪ ঘণ্টা দায়িত্বপ্রাপ্ত সমন্বয়ক সক্রিয়' : '24/7 Coordinator On Call'}</span>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Column: Rules & Privacy */}
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-stone-900 mb-3">
                    {lang === 'bn' ? 'আমাদের রক্তদান সমন্বয় ব্যবস্থা কীভাবে কাজ করে?' : 'How Our Blood Network Operates'}
                  </h2>
                  <p className="text-stone-600 text-sm leading-relaxed mb-4">
                    {lang === 'bn'
                      ? 'রৌমারী উপজেলা মূল জেলা শহর কুড়িগ্রাম থেকে নদী দ্বারা বিচ্ছিন্ন। জরুরি মুহূর্তে রক্ত জোগাড় করা অত্যন্ত চ্যালেঞ্জিং। তাই আমাদের ১,২০০+ নিবেদিত রক্তদাতাদের নেটওয়ার্ক থেকে অনুমোদিত কো-অর্ডিনেটর রোগীর রক্তের গ্রুপ অনুযায়ী যোগাযোগ করে ডোনার নিশ্চিত করেন।'
                      : 'Because Rowmari is geographically isolated by the Brahmaputra, arranging emergency blood requires quick coordination. Our 1,200+ volunteer donor network is mobilized instantly by authorized coordinators.'}
                  </p>
                </div>

                {/* Privacy Guarantee Box */}
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-950 space-y-2">
                  <h3 className="font-bold text-base flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                    <span>{lang === 'bn' ? 'কঠোর তথ্যের গোপনীয়তা নীতি (PRD Compliant)' : 'Strict Privacy Assurance'}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
                    {lang === 'bn'
                      ? 'রক্তদাতার ফোন নম্বর, নাম বা পরিচয় কোনো পাবলিক ডিরেক্টরি বা অনলাইন তালিকায় প্রকাশ করা হয় না। ব্লাড কো-অর্ডিনেটর কেবল রোগীর জরুরি প্রয়োজনে ডোনারের সম্মতি নিয়ে সরাসরি যোগাযোগ করেন।'
                      : 'Donor contact numbers are NEVER displayed publicly. Only verified foundation coordinators reach out upon explicit consent.'}
                  </p>
                </div>

                {/* Eligibility checklist */}
                <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
                  <h3 className="font-bold text-stone-900 text-base">
                    {lang === 'bn' ? 'রক্তদানের প্রাথমিক শর্তাবলী' : 'Donor Eligibility Checklist'}
                  </h3>
                  <ul className="text-xs sm:text-sm text-stone-600 space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>বয়স ১৮ থেকে ৬০ বছরের মধ্যে হতে হবে।</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>শারীরিক ওজন নূন্যতম ৫০ কেজি (পুরুষ) ও ৪৫ কেজি (নারী)।</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>সর্বশেষ রক্তদানের পর কমপক্ষে ৩ থেকে ৪ মাস অতিবাহিত হওয়া আবশ্যক।</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>রক্তচাপ, হিমোগ্লোবিনের মাত্রা ও সাধারণ স্বাস্থ্য স্বাভাবিক থাকা প্রয়োজন।</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Column: Blood Group Grid & Actions */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-md">
                  <h3 className="text-lg font-bold text-stone-900 mb-2">
                    {lang === 'bn' ? 'রক্তের গ্রুপ ও উপস্থিতি' : 'Supported Blood Groups'}
                  </h3>
                  <p className="text-xs text-stone-500 mb-4">
                    {lang === 'bn' ? 'যেকোনো গ্রুপের রক্তের জন্য ডোনার নিবন্ধন উন্মুক্ত:' : 'Active donor database:'}
                  </p>

                  <div className="grid grid-cols-4 gap-2 mb-6">
                    {bloodGroups.map((bg) => (
                      <div
                        key={bg}
                        className="p-3 bg-red-50 border border-red-200 rounded-xl text-center"
                      >
                        <span className="text-lg font-extrabold text-red-700 block">{bg}</span>
                        <span className="text-[10px] text-stone-500">উপলব্ধ</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => setBloodDonorOpen(true)}
                      className="w-full py-3 bg-red-700 hover:bg-red-800 text-white rounded-xl font-bold text-sm shadow-md transition cursor-pointer"
                    >
                      {lang === 'bn' ? 'রক্তদাতা হিসেবে নিবন্ধন করুন' : 'Register as Blood Donor'}
                    </button>
                    <button
                      onClick={() => setBloodRequestOpen(true)}
                      className="w-full py-3 border-2 border-red-700 text-red-700 hover:bg-red-50 rounded-xl font-bold text-sm transition cursor-pointer"
                    >
                      {lang === 'bn' ? 'জরুরি রক্তের আবেদন করুন' : 'Post Blood Request'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />

      {/* Modals */}
      <BloodRequestModal
        isOpen={bloodRequestOpen}
        onClose={() => setBloodRequestOpen(false)}
        lang={lang}
      />
      <BloodDonorModal
        isOpen={bloodDonorOpen}
        onClose={() => setBloodDonorOpen(false)}
        lang={lang}
      />
    </div>
  );
}
