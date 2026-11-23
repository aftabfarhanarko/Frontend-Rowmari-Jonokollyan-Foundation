'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import AssistanceModal from '@/components/modals/AssistanceModal';
import DonationModal from '@/components/modals/DonationModal';
import { CAMPAIGNS_DATA } from '@/data/mockData';
import { Language } from '@/types';

export default function CampaignsPage() {
  const [lang, setLang] = useState<Language>('bn');
  const [activeTab, setActiveTab] = useState<'active' | 'upcoming' | 'completed'>('active');
  const [modalOpen, setModalOpen] = useState(false);
  const [assistanceModalOpen, setAssistanceModalOpen] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState('general');

  const tabs = [
    { key: 'active' as const, labelBn: 'চলমান', labelEn: 'Active' },
    { key: 'upcoming' as const, labelBn: 'আসন্ন', labelEn: 'Upcoming' },
    { key: 'completed' as const, labelBn: 'সম্পন্ন', labelEn: 'Completed' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1E293B]">
      <Navbar 
        lang={lang} 
        onToggleLang={() => setLang(l => l === 'bn' ? 'en' : 'bn')} 
        onOpenDonation={() => setModalOpen(true)}
      />

      <main className="flex-1 pb-24 sm:pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          
          {/* Header Title Matching Wireframe */}
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#E53935] tracking-tight mb-2">
              {lang === 'bn' ? 'ক্যাম্পেইন' : 'Campaigns'}
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 font-medium">
              {lang === 'bn' 
                ? 'রৌমারীর অসহায় মানুষের সুনির্দিষ্ট চাহিদা পূরণে প্রতিটি ক্যাম্পেইনে সরাসরি অংশ নিন।' 
                : 'Directly fund specific community relief projects with verified transparency.'}
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

          {/* Campaign Cards Matching Wireframe */}
          <div className="space-y-6 sm:space-y-8">
            {CAMPAIGNS_DATA.map((camp) => {
              const percentage = Math.min(
                100,
                Math.round((camp.raisedAmount / camp.targetAmount) * 100)
              );
              return (
                <div
                  key={camp.id}
                  className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  {/* Photo area with category badge */}
                  <div className="relative aspect-16/9 bg-stone-100 overflow-hidden">
                    <Image
                      src={camp.imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop'}
                      alt={lang === 'bn' ? camp.titleBn : camp.titleEn}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 672px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-emerald-100 text-[#0D5C35] text-xs font-bold px-2.5 py-0.5 rounded shadow-2xs">
                        {lang === 'bn' ? 'চলমান' : 'Active'}
                      </span>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="p-5 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-bold text-stone-900 leading-snug mb-3">
                      {lang === 'bn' ? camp.titleBn : camp.titleEn}
                    </h2>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                      {lang === 'bn' ? camp.descriptionBn : camp.descriptionEn}
                    </p>

                    {/* Progress Bar Matching Wireframe */}
                    <div className="space-y-2 mb-5">
                      <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                        <div
                          className="h-full bg-[#0D5C35] rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>

                      <div className="flex justify-between text-xs text-stone-500 font-medium">
                        <span>
                          {lang === 'bn' 
                            ? `সংগৃহীত ৳${camp.raisedAmount.toLocaleString()} / লক্ষ্য ৳${camp.targetAmount.toLocaleString()}` 
                            : `Raised ৳${camp.raisedAmount.toLocaleString()} / Goal ৳${camp.targetAmount.toLocaleString()}`}
                        </span>
                        <span>
                          {lang === 'bn' ? `${camp.deadlineBn} বাকি` : `${camp.deadlineEn} left`}
                        </span>
                      </div>
                    </div>

                    {/* Donate Action Button Matching Wireframe */}
                    <button
                      onClick={() => {
                        setSelectedCampaignId(camp.category);
                        setModalOpen(true);
                      }}
                      className="w-full py-3 rounded-xl bg-[#0D5C35] hover:bg-[#094527] text-white font-bold text-sm transition cursor-pointer flex items-center justify-center gap-2 shadow-xs active:scale-98"
                    >
                      <Heart className="w-4 h-4 fill-white text-white" />
                      <span>{lang === 'bn' ? 'অনুদান দিন' : 'Donate Now'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footnote Matching Wireframe */}
          <div className="mt-8 text-center">
            <p className="text-xs text-stone-400 font-medium">
              {lang === 'bn' ? '* অগ্রগতি বার নকশার নমুনা' : '* Progress bar design sample'}
            </p>
          </div>

        </div>
      </main>

      <Footer 
        lang={lang} 
        onOpenAssistance={() => setAssistanceModalOpen(true)}
        onOpenDonation={() => setModalOpen(true)}
      />

      <MobileBottomBar
        lang={lang}
        onOpenAssistance={() => setAssistanceModalOpen(true)}
        onOpenDonation={() => setModalOpen(true)}
      />

      <AssistanceModal
        isOpen={assistanceModalOpen}
        onClose={() => setAssistanceModalOpen(false)}
        lang={lang}
      />

      <DonationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        lang={lang}
        preselectedCampaign={selectedCampaignId}
      />
    </div>
  );
}
