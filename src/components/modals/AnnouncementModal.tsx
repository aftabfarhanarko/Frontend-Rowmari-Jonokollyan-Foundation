'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Megaphone, X, Heart, Users } from 'lucide-react';
import { Language } from '@/types';
import { useGetActiveModalQuery } from '@/store/api/contentApi';

interface AnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onOpenAssistance?: () => void;
  onOpenDonation?: () => void;
}

export default function AnnouncementModal({
  isOpen,
  onClose,
  lang,
}: AnnouncementModalProps) {
  const { data: modalData, isLoading } = useGetActiveModalQuery();

  // Purely dynamic: if no active modal is returned from database or if loading, DO NOT render anything
  if (!isOpen || isLoading || !modalData || !modalData.id || !modalData.title || modalData.isActive === false) {
    return null;
  }

  // Check if modal is within valid date/time range
  const now = new Date();
  if (modalData.startDate) {
    const start = new Date(modalData.startDate);
    if (start > now) return null;
  }
  if (modalData.endDate) {
    const end = new Date(modalData.endDate);
    if (end < now) return null;
  }

  // Check if dismissed for this specific modal today
  if (typeof window !== 'undefined') {
    const today = new Date().toDateString();
    if (localStorage.getItem(`rjf_announcement_dismissed_${modalData.id}`) === today) {
      return null;
    }
  }

  const handleDismissToday = () => {
    if (typeof window !== 'undefined' && modalData?.id) {
      localStorage.setItem(`rjf_announcement_dismissed_${modalData.id}`, new Date().toDateString());
    }
    onClose();
  };

  const headerTitle =
    modalData.headerTitle ||
    (lang === 'bn' ? 'জরুরি জনকল্যাণ নোটিশ ও ঘোষণা' : 'Urgent Humanitarian Notice');
  const badge = modalData.badge;
  const title = modalData.title;
  const description = modalData.description;
  const hotline = modalData.hotline;
  const address = modalData.address;
  const primaryBtnText =
    modalData.primaryBtnText || (lang === 'bn' ? 'অনুদান দিন' : 'Donate Now');
  const primaryBtnLink = modalData.primaryBtnLink || '/donate';
  const secondaryBtnText = modalData.secondaryBtnText;
  const secondaryBtnLink = modalData.secondaryBtnLink || '/volunteer';

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border-2 border-red-500 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Banner Top */}
        <div className="bg-red-700 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-sm md:text-base">
            <span className="animate-ping inline-flex h-2.5 w-2.5 rounded-full bg-white opacity-75 mr-1" />
            <Megaphone className="w-4 h-4 text-white shrink-0" />
            <span>{headerTitle}</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-red-800 text-red-100 flex items-center justify-center hover:bg-red-900 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Optional Modal Image */}
        {modalData.imageUrl && (modalData.imageUrl.startsWith("http://") || modalData.imageUrl.startsWith("https://") || modalData.imageUrl.startsWith("/")) && (
          <div className="relative w-full h-36 sm:h-44 bg-stone-100 border-b border-stone-200 overflow-hidden">
            <Image
              src={modalData.imageUrl}
              alt={title}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 500px"
            />
          </div>
        )}

        <div className="p-6">
          <div className="mb-4">
            {badge && (
              <span className="text-[11px] font-bold uppercase tracking-wider text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
                {badge}
              </span>
            )}
            <h3 className="text-lg md:text-xl font-bold text-stone-900 mt-2">
              {title}
            </h3>
            {description && (
              <p className="text-xs md:text-sm text-stone-600 mt-2 leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {(hotline || address) && (
            <div className="p-3.5 bg-red-50 rounded-xl border border-red-200 text-xs text-red-950 mb-5 flex items-center justify-between">
              <div>
                {hotline && (
                  <>
                    <span className="font-bold block">২৪/৭ কেন্দ্রীয় জরুরি হটলাইন ও ঠিকানা:</span>
                    <span className="font-mono font-bold text-sm text-red-800">{hotline}</span>
                  </>
                )}
                {address && (
                  <span className="text-[11px] text-stone-600 block mt-0.5">{address}</span>
                )}
              </div>
              <Link
                href={primaryBtnLink}
                onClick={onClose}
                className="px-3 py-1.5 bg-[#D62828] text-white rounded-lg text-xs font-semibold hover:bg-[#B91C1C] transition cursor-pointer flex items-center gap-1 shrink-0 ml-2"
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>{primaryBtnText}</span>
              </Link>
            </div>
          )}

          <div className={secondaryBtnText ? "grid grid-cols-2 gap-3 mb-4" : "flex flex-col gap-3 mb-4"}>
            <Link
              href={primaryBtnLink}
              onClick={onClose}
              className="py-2.5 px-3 rounded-xl bg-[#D62828] hover:bg-[#B91C1C] text-white text-xs font-bold transition text-center flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>{primaryBtnText}</span>
            </Link>
            {secondaryBtnText && (
              <Link
                href={secondaryBtnLink}
                onClick={onClose}
                className="py-2.5 px-3 rounded-xl border border-stone-300 text-stone-800 hover:bg-stone-50 text-xs font-semibold transition text-center flex items-center justify-center gap-1.5"
              >
                <Users className="w-3.5 h-3.5 text-[#D62828]" />
                <span>{secondaryBtnText}</span>
              </Link>
            )}
          </div>

          <div className="text-center pt-2 border-t border-stone-100">
            <button
              onClick={handleDismissToday}
              className="text-xs text-stone-400 hover:text-stone-600 transition underline cursor-pointer"
            >
              {lang === 'bn' ? 'আজকের জন্য আর দেখাবেন না' : "Don't show again today"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
