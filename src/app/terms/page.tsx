'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import AssistanceModal from '@/components/modals/AssistanceModal';
import DonationModal from '@/components/modals/DonationModal';
import { useGetPublicPageQuery } from '@/store/api/adminApi';
import { Language } from '@/types';

export default function TermsPage() {
  const [lang, setLang] = useState<Language>('bn');
  const [assistanceModalOpen, setAssistanceModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const { data: pageData } = useGetPublicPageQuery('terms-and-conditions');

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
              {lang === 'bn' ? 'ব্যবহারের শর্ত' : 'Terms of Use'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#E53935] tracking-tight">
              {lang === 'bn' ? 'ব্যবহারের সাধারণ শর্তাবলী' : 'Terms & Conditions'}
            </h1>
            <p className="text-xs text-stone-400">সর্বশেষ সংস্করণ: নভেম্বর ২০২৬ • অনুমোদিত নীতিমালা</p>

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
