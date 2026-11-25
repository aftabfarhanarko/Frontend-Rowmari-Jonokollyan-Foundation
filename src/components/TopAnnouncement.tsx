'use client';

import React from 'react';
import { AlertCircle, ChevronRight } from 'lucide-react';
import { Language } from '@/types';
import { useAppStore } from '@/store/useAppStore';
import { useGetAnnouncementsQuery } from '@/store/api/contentApi';

interface TopAnnouncementProps {
  lang?: Language;
  onOpenDetails?: () => void;
  onDismiss?: () => void;
  isVisible?: boolean;
}

export default function TopAnnouncement({
  lang: propLang,
  onOpenDetails,
}: TopAnnouncementProps) {
  const storeLang = useAppStore((state) => state.lang);
  const setAnnouncementModalOpen = useAppStore((state) => state.setAnnouncementModalOpen);
  const lang = propLang || storeLang || 'bn';

  const handleOpen = () => {
    if (onOpenDetails) {
      onOpenDetails();
    } else {
      setAnnouncementModalOpen(true);
    }
  };

  const alertContentBn =
    'রৌমারী জনকল্যাণ ফাউন্ডেশন, ভোলামোড়, রৌমারী উপজেলা, কুড়িগ্রাম জেলা, বাংলাদেশ, ৫৬৪০ • জরুরি মানবিক সহায়তা ও শীতবস্ত্র বিতরণ কার্যক্রম চলমান • হটলাইন: +880 1712-345678 • মানুষের পাশে, মানুষের জন্য';

  const alertContentEn =
    'Rowmari Jonokolyan Foundation, Volamor, Rowmari Upazila, Kurigram, Bangladesh, 5640 • Emergency Relief & Humanitarian Aid Ongoing • Hotline: +880 1712-345678 • Standing beside humanity, for humanity';

  const { data: announcements = [] } = useGetAnnouncementsQuery();
  const activeAnnouncement = announcements[0];
  const alertText = activeAnnouncement
    ? activeAnnouncement.message
    : (lang === 'bn' ? alertContentBn : alertContentEn);

  return (
    <aside
      aria-label="Emergency Announcement"
      className="bg-[#E53935] text-white text-xs md:text-sm shadow-xs border-b border-[#D32F2F] relative z-40 overflow-hidden select-none"
    >
      <div className="w-full flex items-center h-9 sm:h-10">
        {/* Pinned Left Badge */}
        <div className="shrink-0 flex items-center h-full bg-[#E53935] px-2 sm:px-3.5 z-20 shadow-[4px_0_8px_rgba(229,57,53,0.95)]">
          <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wide flex items-center gap-1 sm:gap-1.5 shadow-2xs">
            <AlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white animate-pulse" />
            <span className="whitespace-nowrap">{lang === 'bn' ? 'জরুরি ঘোষণা' : 'Urgent Alert'}</span>
          </span>
        </div>

        {/* Continuous Right-to-Left Scrolling Track */}
        <div
          className="flex-1 overflow-hidden relative h-full flex items-center cursor-pointer group"
          onClick={handleOpen}
          title={lang === 'bn' ? 'বিস্তারিত দেখতে ক্লিক করুন' : 'Click to view details'}
        >
          <div className="animate-marquee-rtl flex items-center whitespace-nowrap text-xs md:text-sm font-medium text-red-50">
            <span className="inline-block px-4 sm:px-6">{alertText}</span>
            <span className="inline-block px-4 sm:px-6">{alertText}</span>
          </div>
        </div>

        {/* Pinned Right Action Button */}
        <div className="shrink-0 flex items-center h-full bg-[#E53935] px-2 sm:px-3.5 z-20 shadow-[-4px_0_8px_rgba(229,57,53,0.95)]">
          <button
            onClick={handleOpen}
            className="bg-white/20 hover:bg-white/30 active:scale-95 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all flex items-center gap-0.5 sm:gap-1 cursor-pointer shadow-2xs whitespace-nowrap"
          >
            <span>{lang === 'bn' ? 'বিস্তারিত' : 'Details'}</span>
            <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
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
          animation: marqueeScroll 22s linear infinite;
        }
        .animate-marquee-rtl:hover {
          animation-play-state: paused;
        }
      `}</style>
    </aside>
  );
}
