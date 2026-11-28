'use client';

import React from 'react';
import { Language } from '@/types';
import { useAppStore } from '@/store/useAppStore';

interface TopAnnouncementProps {
  lang?: Language;
  onOpenDetails?: () => void;
  onDismiss?: () => void;
  isVisible?: boolean;
}

const SLIDE_TEXT_BN =
  'রৌমারী জনকল্যাণ ফাউন্ডেশন, ভলামোড়, রৌমারী উপজেলা, রংপুর, বাংলাদেশ, ৫৬৪০';
const SLIDE_TEXT_EN =
  'Rowmari Jonokolyan Foundation, Volamor, Rowmari Upazila, Rangpur, Bangladesh, 5640';

export default function TopAnnouncement({ lang: propLang }: TopAnnouncementProps) {
  const storeLang = useAppStore((state) => state.lang);
  const lang = propLang || storeLang || 'bn';
  const slideText = lang === 'bn' ? SLIDE_TEXT_BN : SLIDE_TEXT_EN;

  return (
    <aside
      aria-label="Foundation Address"
      className="bg-[#E53935] text-white text-xs md:text-sm shadow-xs border-b border-[#D32F2F] relative z-40 overflow-hidden select-none"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-9 sm:h-10">
        <div className="w-full overflow-hidden relative h-full flex items-center">
          <div className="animate-marquee-rtl flex items-center whitespace-nowrap text-xs md:text-sm font-medium text-red-50">
            <span className="inline-block px-8">{slideText}</span>
            <span className="inline-block px-8">{slideText}</span>
            <span className="inline-block px-8">{slideText}</span>
            <span className="inline-block px-8">{slideText}</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee-rtl {
          display: inline-flex;
          width: max-content;
          will-change: transform;
          animation: marqueeScroll 24s linear infinite;
        }
        .animate-marquee-rtl:hover {
          animation-play-state: paused;
        }
      `}</style>
    </aside>
  );
}
