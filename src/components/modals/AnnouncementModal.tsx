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
  onOpenDonation,
}: AnnouncementModalProps) {
  const { data: modalData, isLoading } = useGetActiveModalQuery();

  // Check if modal is active and within valid time range
  const isTimeValid = useMemo(() => {
    if (!modalData) return true; // Fallback to default if no active modal returned from query
    if (modalData.isActive === false) return false;

    const now = new Date();
    if (modalData.startDate) {
      const start = new Date(modalData.startDate);
      if (start > now) return false;
    }
    if (modalData.endDate) {
      const end = new Date(modalData.endDate);
      if (end < now) return false;
    }
    return true;
  }, [modalData]);

  const storageKey = modalData?.id
    ? `rjf_announcement_dismissed_${modalData.id}`
    : 'rjf_announcement_dismissed';

  const isDismissedToday = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const today = new Date().toDateString();
    if (localStorage.getItem('rjf_announcement_dismissed') === today) return true;
    if (modalData?.id && localStorage.getItem(`rjf_announcement_dismissed_${modalData.id}`) === today) return true;
    return false;
  }, [modalData?.id]);

  if (!isOpen || !isTimeValid || isDismissedToday) return null;

  const handleDismissToday = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('rjf_announcement_dismissed', new Date().toDateString());
      if (modalData?.id) {
        localStorage.setItem(`rjf_announcement_dismissed_${modalData.id}`, new Date().toDateString());
      }
    }
    onClose();
  };

  const headerTitle =
    modalData?.headerTitle ||
    (lang === 'bn' ? 'জরুরি জনকল্যাণ নোটিশ ও ঘোষণা' : 'Urgent Humanitarian Notice');
  const badge =
    modalData?.badge ||
    (lang === 'bn' ? 'শীতবস্ত্র ও জরুরি মানবিক ত্রাণ ঘোষণা' : 'Winter Relief & Humanitarian Notice');
  const title =
    modalData?.title ||
    (lang === 'bn'
      ? 'রৌমারী ও দুর্গম চরাঞ্চলের শীতার্ত পরিবারের পাশে দাঁড়ান'
      : 'Support Vulnerable Families in Remote Rowmari Chars');
  const description =
    modalData?.description ||
    (lang === 'bn'
      ? 'তীব্র শীতে রৌমারীর ব্রহ্মপুত্র নদের দুর্গম চরাঞ্চলের অসহায় পরিবারের মাঝে কম্বল ও শীতবস্ত্র বিতরণ কার্যক্রম পুরোদমে শুরু হয়েছে। আপনার সামান্য অনুদানে ফুটতে পারে একটি অসহায় পরিবারের মুখে হাসি।'
      : 'Winter relief and blanket distribution campaigns are actively ongoing across river-island char communities. Your small contribution brings warmth to a struggling family.');
  const hotline = modalData?.hotline || '+880 1712-345678';
  const address = modalData?.address || 'ভোলামোড়, রৌমারী উপজেলা, রংপুর, বাংলাদেশ (৫৬৪০)';
  const primaryBtnText =
    modalData?.primaryBtnText || (lang === 'bn' ? 'অনুদান দিন' : 'Donate Now');
  const primaryBtnLink = modalData?.primaryBtnLink || '/donate';
  const secondaryBtnText =
    modalData?.secondaryBtnText || (lang === 'bn' ? 'স্বেচ্ছাসেবক হন' : 'Join Volunteer');
  const secondaryBtnLink = modalData?.secondaryBtnLink || '/volunteer';

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
        {modalData?.imageUrl && (
          <div className="relative w-full h-36 sm:h-44 bg-stone-100 border-b border-stone-200 overflow-hidden">
            <Image
              src={modalData.imageUrl}
              alt={title}
              fill
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
            <p className="text-xs md:text-sm text-stone-600 mt-2 leading-relaxed">
              {description}
            </p>
          </div>

          <div className="p-3.5 bg-red-50 rounded-xl border border-red-200 text-xs text-red-950 mb-5 flex items-center justify-between">
            <div>
              <span className="font-bold block">২৪/৭ কেন্দ্রীয় জরুরি হটলাইন ও ঠিকানা:</span>
              <span className="font-mono font-bold text-sm text-red-800">{hotline}</span>
              <span className="text-[11px] text-stone-600 block mt-0.5">{address}</span>
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

          <div className="grid grid-cols-2 gap-3 mb-4">
            <Link
              href={primaryBtnLink}
              onClick={onClose}
              className="py-2.5 px-3 rounded-xl bg-[#D62828] hover:bg-[#B91C1C] text-white text-xs font-bold transition text-center flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>{primaryBtnText}</span>
            </Link>
            <Link
              href={secondaryBtnLink}
              onClick={onClose}
              className="py-2.5 px-3 rounded-xl border border-stone-300 text-stone-800 hover:bg-stone-50 text-xs font-semibold transition text-center flex items-center justify-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5 text-[#D62828]" />
              <span>{secondaryBtnText}</span>
            </Link>
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
