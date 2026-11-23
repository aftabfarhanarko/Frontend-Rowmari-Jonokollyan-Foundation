'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import AssistanceModal from '@/components/modals/AssistanceModal';
import DonationModal from '@/components/modals/DonationModal';
import { NEWS_EVENTS } from '@/data/mockData';
import { Language } from '@/types';

export default function NewsPage() {
  const [lang, setLang] = useState<Language>('bn');
  const [activeTab, setActiveTab] = useState<'news' | 'upcoming' | 'past'>('news');
  const [assistanceModalOpen, setAssistanceModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);

  const tabs = [
    { key: 'news' as const, labelBn: 'সংবাদ', labelEn: 'News' },
    { key: 'upcoming' as const, labelBn: 'আসন্ন ইভেন্ট', labelEn: 'Upcoming' },
    { key: 'past' as const, labelBn: 'অতীত', labelEn: 'Archive' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1E293B]">
      <Navbar 
        lang={lang} 
        onToggleLang={() => setLang(l => l === 'bn' ? 'en' : 'bn')} 
        onOpenDonation={() => setDonationModalOpen(true)}
      />

      <main className="flex-1 pb-24 sm:pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          
          {/* Header Title Matching Wireframe */}
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#E53935] tracking-tight mb-2">
              {lang === 'bn' ? 'সংবাদ ও ইভেন্ট' : 'News & Events'}
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 font-medium">
              {lang === 'bn'
                ? 'রৌমারী জনকল্যাণ ফাউন্ডেশনের সাম্প্রতিক কার্যক্রমের সংবাদ ও আসন্ন কর্মসূচি।'
                : 'Stay informed with upcoming camps, press announcements, and activity reports.'}
            </p>
          </div>

          {/* Filter Pills Matching Wireframe */}
          <div className="flex items-center gap-2 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer ${
                  activeTab === tab.key
                    ? 'bg-[#0D5C35] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {lang === 'bn' ? tab.labelBn : tab.labelEn}
              </button>
            ))}
          </div>

          {/* News Cards Matching Wireframe */}
          <div className="space-y-6 mb-12">
            {NEWS_EVENTS.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all"
              >
                {/* Visual Header */}
                <div className="relative aspect-16/9 bg-stone-100 overflow-hidden">
                  <Image
                    src={item.imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop'}
                    alt={lang === 'bn' ? item.titleBn : item.titleEn}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 672px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
                </div>

                <div className="p-5 sm:p-6">
                  <span className="text-xs text-stone-400 font-bold block mb-1">
                    [{lang === 'bn' ? item.dateBn : item.dateEn}]
                  </span>

                  <h2 className="text-lg sm:text-xl font-bold text-stone-900 leading-snug mb-2">
                    {lang === 'bn' ? item.titleBn : item.titleEn}
                  </h2>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {lang === 'bn' ? item.summaryBn : item.summaryEn}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Section: আসন্ন ইভেন্ট Matching Wireframe */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#E53935] tracking-tight mb-4">
              {lang === 'bn' ? 'আসন্ন ইভেন্ট' : 'Upcoming Events'}
            </h2>

            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs">
              <p className="text-xs sm:text-sm text-stone-800 font-semibold">
                <strong>[১৫ মার্চ, ২০২৬]</strong> — ফ্রি মেডিকেল ও চক্ষু পরীক্ষা ক্যাম্প, যাদুরচর ইউনিয়ন
              </p>
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
