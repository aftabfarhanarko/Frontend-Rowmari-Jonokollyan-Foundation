'use client';

import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { Language } from '@/types';

interface TopAnnouncementProps {
  lang: Language;
  onOpenDetails: () => void;
  onDismiss: () => void;
  isVisible: boolean;
}

export default function TopAnnouncement({
  lang,
  onOpenDetails,
  onDismiss,
  isVisible,
}: TopAnnouncementProps) {
  if (!isVisible) return null;

  return (
    <aside aria-label="Emergency Announcement" className="bg-[#E53935] text-white text-xs md:text-sm py-2 px-4 shadow-sm border-b border-[#D32F2F]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="shrink-0 bg-white/20 text-white px-2 py-0.5 rounded text-[11px] font-bold tracking-wide flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'জরুরি ঘোষণা' : 'Urgent Alert'}</span>
          </span>
          <p className="truncate text-red-50 text-xs md:text-sm">
            {lang === 'bn' ? (
              <span>
                <strong>জরুরি রক্তের প্রয়োজন:</strong> রৌমারী হাসপাতালে O- ও B+ রক্তের জরুরি আহ্বান • চরাঞ্চলে শীতবস্ত্র বিতরণ চলছে
              </span>
            ) : (
              <span>
                <strong>Emergency Blood Appeal:</strong> Urgent need for O- & B+ blood at Rowmari Health Complex
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenDetails}
            className="underline underline-offset-2 text-xs font-semibold hover:text-red-100 transition cursor-pointer"
          >
            {lang === 'bn' ? 'বিস্তারিত' : 'Details'}
          </button>
          <button
            onClick={onDismiss}
            aria-label="Dismiss banner"
            className="text-red-100 hover:text-white p-0.5 rounded transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
