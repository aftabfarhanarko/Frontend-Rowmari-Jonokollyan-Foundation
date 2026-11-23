'use client';

import React, { useState } from 'react';
import { 
  Search, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import AssistanceModal from '@/components/modals/AssistanceModal';
import DonationModal from '@/components/modals/DonationModal';
import TrackingResultModal from '@/components/modals/TrackingResultModal';
import { MOCK_APPLICATIONS } from '@/data/mockData';
import { Language, ApplicationTrackingStatus } from '@/types';

export default function GetHelpPage() {
  const [lang, setLang] = useState<Language>('bn');
  const [selectedCategory, setSelectedCategory] = useState<string>('medical');
  const [step] = useState<number>(1);
  const [assistanceModalOpen, setAssistanceModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [trackingInput, setTrackingInput] = useState('');
  const [trackingRecord, setTrackingRecord] = useState<ApplicationTrackingStatus | null>(null);

  const categories = [
    { key: 'medical', labelBn: 'চিকিৎসা', labelEn: 'Medical' },
    { key: 'education', labelBn: 'শিক্ষা', labelEn: 'Education' },
    { key: 'financial', labelBn: 'আর্থিক', labelEn: 'Financial' },
    { key: 'food', labelBn: 'খাদ্য', labelEn: 'Food Aid' },
    { key: 'winter', labelBn: 'শীতবস্ত্র', labelEn: 'Winter Relief' },
    { key: 'emergency', labelBn: 'জরুরি সহায়তা', labelEn: 'Emergency Aid' },
  ];

  const handleSearchTracking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingInput.trim()) return;
    const key = trackingInput.trim().toUpperCase();
    setTrackingRecord(MOCK_APPLICATIONS[key] || null);
    setTrackingModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1E293B]">
      <Navbar 
        lang={lang} 
        onToggleLang={() => setLang(l => l === 'bn' ? 'en' : 'bn')} 
        onOpenDonation={() => setDonationModalOpen(true)}
      />

      <main className="flex-1 pb-24 sm:pb-16">
        <div className="max-w-xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          
          {/* Header Title Matching Wireframe */}
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#E53935] tracking-tight mb-2">
              {lang === 'bn' ? 'সহায়তার আবেদন' : 'Assistance Request'}
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 font-medium">
              {lang === 'bn' ? `ধাপ ${step} / ৫ • সহায়তার ধরন` : `Step ${step} of 5 • Aid Category`}
            </p>
          </div>

          {/* Progress Bar Matching Wireframe */}
          <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden mb-8 border border-stone-200">
            <div 
              className="h-full bg-[#0D5C35] rounded-full transition-all duration-300" 
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>

          {/* Category Selection Grid (2-Columns Matching Wireframe) */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`p-4 sm:p-5 rounded-2xl border text-center transition-all cursor-pointer font-bold text-sm sm:text-base ${
                    isSelected
                      ? 'border-2 border-[#0D5C35] text-[#0D5C35] bg-emerald-50/40 shadow-sm'
                      : 'border-stone-200 text-stone-700 bg-white hover:border-stone-300 shadow-2xs'
                  }`}
                >
                  {lang === 'bn' ? cat.labelBn : cat.labelEn}
                </button>
              );
            })}
          </div>

          {/* Next Button Matching Wireframe */}
          <button
            type="button"
            onClick={() => setAssistanceModalOpen(true)}
            className="w-full py-3.5 rounded-xl bg-[#0D5C35] hover:bg-[#094527] text-white font-bold text-sm sm:text-base transition duration-150 shadow-md cursor-pointer mb-8 flex items-center justify-center gap-2"
          >
            <span>{lang === 'bn' ? 'পরবর্তী ধাপ' : 'Next Step'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Notice Box "এরপর কী হবে" Matching Wireframe */}
          <div className="bg-[#F0FDF4] border border-emerald-200/80 rounded-2xl p-5 sm:p-6 mb-10 shadow-2xs">
            <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-3">
              {lang === 'bn' ? 'এরপর কী হবে' : 'What Happens Next'}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-600 mb-4">
              <li className="flex items-start gap-2">
                <span className="font-bold text-[#0D5C35]">১.</span>
                <span>{lang === 'bn' ? 'আবেদন জমা, আইডি পাবেন' : 'Submit application, receive tracking ID'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-[#0D5C35]">২.</span>
                <span>{lang === 'bn' ? 'যাচাই ও পর্যালোচনা' : 'Field verification & team review'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-[#0D5C35]">৩.</span>
                <span>{lang === 'bn' ? 'সিদ্ধান্ত জানানো হবে' : 'Decision notified via SMS and portal'}</span>
              </li>
            </ul>
            <p className="text-xs text-stone-500 pt-3 border-t border-emerald-200/60 font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0D5C35] shrink-0" />
              <span>{lang === 'bn' ? 'আপনার তথ্য সম্পূর্ণ গোপন ও সুরক্ষিত রাখা হয়।' : 'Your data is strictly confidential and protected.'}</span>
            </p>
          </div>

          {/* Application Tracking Box */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 sm:p-6 text-center">
            <h3 className="text-sm font-bold text-stone-800 mb-1">
              {lang === 'bn' ? 'পূর্বে জমাকৃত আবেদনের অবস্থা জানুন' : 'Track Existing Application'}
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              {lang === 'bn' ? 'আবেদন আইডি দিয়ে তাৎক্ষণিক অগ্রগতি দেখুন' : 'Check status using your tracking code'}
            </p>

            <form onSubmit={handleSearchTracking} className="flex gap-2 max-w-sm mx-auto">
              <input
                type="text"
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                placeholder="RJF-2026-XXXX"
                className="flex-1 px-3 py-2 rounded-xl border border-stone-300 text-xs font-mono uppercase bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0D5C35]"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#0D5C35] text-white font-bold text-xs hover:bg-[#094527] transition cursor-pointer flex items-center gap-1"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'খুঁজুন' : 'Track'}</span>
              </button>
            </form>
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

      <TrackingResultModal
        isOpen={trackingModalOpen}
        onClose={() => setTrackingModalOpen(false)}
        lang={lang}
        application={trackingRecord}
        searchedId={trackingInput}
      />
    </div>
  );
}
