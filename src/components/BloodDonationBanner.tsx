'use client';

import React from 'react';
import { Droplet, Heart, PhoneCall, ShieldCheck } from 'lucide-react';
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
    <section id="blood" className="py-10 md:py-14 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Soft Pink/Red Container with Red Border matching the wireframe */}
        <div className="bg-gradient-to-br from-rose-50 via-white to-red-50/60 border border-red-200/90 rounded-3xl p-6 sm:p-9 lg:p-11 shadow-lg relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-red-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-rose-400/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left Text details */}
          <div className="space-y-3.5 text-center lg:text-left max-w-2xl relative z-10">
            {/* Live Status Pill with Pulsing Dot */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100/90 border border-red-200 text-[#E53935] text-xs font-bold shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
              </span>
              <span>{lang === 'bn' ? '২৪/৭ লাইভ জরুরি ব্লাড ব্যাংক নেটওয়ার্ক' : '24/7 Live Emergency Blood Network'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#E53935] tracking-tight leading-tight">
              {lang === 'bn' ? 'এক ব্যাগ রক্ত, একটি মুমূর্ষু জীবনের আলো' : 'One Bag of Blood, A Precious Life Saved'}
            </h2>

            <p className="text-xs sm:text-sm md:text-[15px] text-stone-700 leading-relaxed font-normal">
              {lang === 'bn'
                ? 'রৌমারী উপজেলা স্বাস্থ্য কমপ্লেক্স ও কুড়িগ্রামের রোগীদের জন্য ১,২০০+ নিবন্ধিত রক্তদাতা সদা প্রস্তুত। আপনার ফোন নম্বর সুরক্ষিত রাখা হয় এবং সম্পূর্ণ সম্মতির ভিত্তিতে যোগাযোগ করা হয়।'
                : 'Over 1,200 verified donors are ready across Rowmari & Kurigram hospitals. Your personal number is kept strictly private.'}
            </p>

            {/* Emergency Hotline Chip */}
            <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-stone-600 font-medium">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-red-100 text-stone-800 shadow-2xs">
                <PhoneCall className="w-3.5 h-3.5 text-[#E53935]" />
                <span>জরুরি হেল্পলাইন: <strong>+৮৮০ ১৮১২-৯৮৭৬৫৪</strong></span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>শতভাগ গোপনীয়তা ও নিরাপত্তা নিশ্চিত</span>
              </span>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 shrink-0 relative z-10 w-full sm:w-auto">
            {/* Button 1: "ডোনার হন" (Red background) */}
            <button
              onClick={onOpenDonorModal}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#E53935] to-[#D32F2F] hover:from-[#D32F2F] hover:to-[#B71C1C] text-white font-bold text-sm sm:text-base transition-all duration-200 shadow-lg shadow-red-900/20 active:scale-98 cursor-pointer flex items-center justify-center gap-2.5 group"
            >
              <Heart className="w-4 h-4 fill-white text-white group-hover:scale-110 transition-transform" />
              <span>{lang === 'bn' ? 'ডোনার হিসেবে যুক্ত হন' : 'Become a Blood Donor'}</span>
            </button>

            {/* Button 2: "রক্ত চাই" (Outline button) */}
            <button
              onClick={onOpenBloodRequestModal}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white border-2 border-[#E53935] text-[#E53935] hover:bg-red-50/80 font-bold text-sm sm:text-base transition-all duration-200 shadow-sm active:scale-98 cursor-pointer flex items-center justify-center gap-2.5 group"
            >
              <Droplet className="w-4 h-4 text-[#E53935] group-hover:scale-110 transition-transform" />
              <span>{lang === 'bn' ? 'জরুরি রক্তের আবেদন' : 'Need Emergency Blood'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
