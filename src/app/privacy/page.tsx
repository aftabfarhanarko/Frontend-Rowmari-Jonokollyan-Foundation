'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import AssistanceModal from '@/components/modals/AssistanceModal';
import DonationModal from '@/components/modals/DonationModal';
import { Language } from '@/types';

export default function PrivacyPolicyPage() {
  const [lang, setLang] = useState<Language>('bn');
  const [assistanceModalOpen, setAssistanceModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1E293B]">
      <Navbar 
        lang={lang} 
        onToggleLang={() => setLang(l => l === 'bn' ? 'en' : 'bn')} 
        onOpenDonation={() => setDonationModalOpen(true)}
      />

      <main className="flex-1 py-10 md:py-16 pb-24 sm:pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 sm:p-10 rounded-2xl border border-stone-200 shadow-xs space-y-6">
            <span className="text-xs font-bold text-[#E53935] uppercase tracking-wider bg-red-50 px-2.5 py-1 rounded">
              {lang === 'bn' ? 'আইনগত ও গোপনীয়তা সুরক্ষা' : 'Privacy & Compliance'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#E53935] tracking-tight">
              {lang === 'bn' ? 'গোপনীয়তা ও ডেটা সুরক্ষা নীতিমালা' : 'Privacy & Data Protection Policy'}
            </h1>
            <p className="text-xs text-stone-400">সর্বশেষ সংস্করণ: নভেম্বর ২০২৬ • কঠোর গোপনীয়তা কমপ্লায়েন্ট</p>

            <div className="space-y-6 text-xs sm:text-sm text-stone-600 leading-relaxed pt-4 border-t border-stone-100">
              <section className="space-y-2">
                <h3 className="font-bold text-stone-900 text-base">১. ব্যক্তিগত তথ্য সংগ্রহ ও উদ্দেশ্য</h3>
                <p>
                  রৌমারী জনকল্যাণ ফাউন্ডেশন কেবল মানবিক সেবা প্রদানের উদ্দেশ্যে প্রয়োজনীয় তথ্য (যেমন: নাম, মোবাইল নম্বর, রক্তের গ্রুপ, এলাকা) সংগ্রহ করে। এর বাইরে কোনো ব্যক্তিগত বা সংবেদনশীল ডেটা অপ্রয়োজনীয়ভাবে গ্রহণ করা হয় না।
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-stone-900 text-base">২. রক্তদাতার গোপনীয়তা সুরক্ষা (কঠোর নিয়ম)</h3>
                <p>
                  রক্তদাতাদের ফোন নম্বর বা পরিচয় কোনো অবস্থাতেই পাবলিক ডিরেক্টরি, ওয়েবসাইট বা সোশ্যাল মিডিয়ায় উন্মুক্ত করা হয় না। জরুরি রক্তের চাহিদার ক্ষেত্রে ফাউন্ডেশনের অনুমোদিত রক্ত সমন্বয়ক কেবল দাতার সম্মতিক্রমে যোগাযোগ করেন।
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-stone-900 text-base">৩. আবেদনকারী ও সুবিধাভোগীর মর্যাদা রক্ষা</h3>
                <p>
                  সহায়তাপ্রার্থী ব্যক্তির পারিবারিক বা আর্থিক দুরবস্থার তথ্য তৃতীয় কোনো পক্ষের কাছে প্রকাশ করা হয় না। কার্যক্রমের ফটো বা ভিডিও ডকুমেন্টেশনের ক্ষেত্রে সুবিধাভোগীর সম্মতি নিশ্চিত করা হয়।
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="font-bold text-stone-900 text-base">৪. ডেটা নিরাপত্তা ও প্রবেশাধিকার নিয়ন্ত্রণ</h3>
                <p>
                  আমাদের কেন্দ্রীয় ডাটাবেজ সুরক্ষিত সার্ভারে এনক্রিপ্টেড অবস্থায় সংরক্ষিত থাকে এবং রোল-বেজড অ্যাক্সেস কন্ট্রোল দ্বারা পরিচালিত হয়।
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer 
        lang={lang} 
        onOpenAssistance={() => setAssistanceModalOpen(true)}
        onOpenDonation={() => setDonationModalOpen(true)}
      />

      <MobileBottomBar
        lang={lang}
        onOpenAssistance={() => setAssistanceModalOpen(true)}
        onOpenDonation={() => setDonationModalOpen(true)}
      />

      <AssistanceModal
        isOpen={assistanceModalOpen}
        onClose={() => setAssistanceModalOpen(false)}
        lang={lang}
      />

      <DonationModal
        isOpen={donationModalOpen}
        onClose={() => setDonationModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
