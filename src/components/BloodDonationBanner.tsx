'use client';

import React from 'react';
import { Droplet, Heart } from 'lucide-react';
import { Language } from '@/types';

interface BloodDonationBannerProps {
  lang: Language;
  onOpenDonorModal: () => void;
  onOpenBloodRequestModal: () => void;
}

export default function BloodDonationBanner({
  lang,
  onOpenDonorModal,
  onOpenBloodRequestModal,
}: BloodDonationBannerProps) {
  return (
    <section id="blood" className="py-8 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Soft Pink/Red Container with Red Border matching the wireframe */}
        <div className="bg-[#FEECEB] border border-[#F8B4B4] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left Text details */}
          <div className="space-y-2 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 text-xs font-bold mb-1">
              <Droplet className="w-3.5 h-3.5 text-red-700" />
              <span>{lang === 'bn' ? 'জরুরি ব্লাড ব্যাংক নেটওয়ার্ক' : 'Emergency Blood Network'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#991B1B] tracking-tight">
              {lang === 'bn' ? 'রক্তদাতা হয়ে একটি জীবন বাঁচান' : 'Be a Blood Donor, Save a Precious Life'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
              {lang === 'bn'
                ? 'আপনার ফোন নম্বর কখনো প্রকাশ্যে দেখানো হয় না। আপনার সম্মতি ছাড়া কারও সাথে ব্যক্তিগত তথ্য শেয়ার করা হয় না।'
                : 'Your contact number is never published openly. We respect your privacy and only connect you upon consent.'}
            </p>
          </div>

          {/* Right Action Buttons matching wireframe */}
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            {/* Button 1: "ডোনার হন" (Red background) */}
            <button
              onClick={onOpenDonorModal}
              className="px-6 py-3 rounded-xl bg-[#991B1B] hover:bg-[#7F1D1D] text-white font-bold text-sm sm:text-base transition duration-150 shadow-md shadow-red-900/20 active:scale-98 cursor-pointer flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-white text-white" />
              <span>{lang === 'bn' ? 'ডোনার হন' : 'Become a Donor'}</span>
            </button>

            {/* Button 2: "রক্ত চাই" (Outline button) */}
            <button
              onClick={onOpenBloodRequestModal}
              className="px-6 py-3 rounded-xl bg-white border-2 border-[#991B1B] text-[#991B1B] hover:bg-red-50/80 font-bold text-sm sm:text-base transition duration-150 active:scale-98 cursor-pointer flex items-center gap-2"
            >
              <Droplet className="w-4 h-4 text-[#991B1B]" />
              <span>{lang === 'bn' ? 'রক্ত চাই' : 'Need Blood'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
