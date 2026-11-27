'use client';

import React from 'react';
import Link from 'next/link';
import { Megaphone, X, Heart, Users } from 'lucide-react';
import { Language } from '@/types';

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
  if (!isOpen) return null;

  const handleDismissToday = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('rjf_announcement_dismissed', new Date().toDateString());
    }
    onClose();
  };

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
            <span>{lang === 'bn' ? 'জরুরি জনকল্যাণ নোটিশ ও ঘোষণা' : 'Urgent Humanitarian Notice'}</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-red-800 text-red-100 flex items-center justify-center hover:bg-red-900 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
              {lang === 'bn' ? 'শীতবস্ত্র ও জরুরি মানবিক ত্রাণ ঘোষণা' : 'Winter Relief & Humanitarian Notice'}
            </span>
            <h3 className="text-lg md:text-xl font-bold text-stone-900 mt-2">
              {lang === 'bn'
                ? 'রৌমারী ও দুর্গম চরাঞ্চলের শীতার্ত পরিবারের পাশে দাঁড়ান'
                : 'Support Vulnerable Families in Remote Rowmari Chars'}
            </h3>
            <p className="text-xs md:text-sm text-stone-600 mt-2 leading-relaxed">
              {lang === 'bn'
                ? 'তীব্র শীতে রৌমারীর ব্রহ্মপুত্র নদের দুর্গম চরাঞ্চলের অসহায় পরিবারের মাঝে কম্বল ও শীতবস্ত্র বিতরণ কার্যক্রম পুরোদমে শুরু হয়েছে। আপনার সামান্য অনুদানে ফুটতে পারে একটি অসহায় পরিবারের মুখে হাসি।'
                : 'Winter relief and blanket distribution campaigns are actively ongoing across river-island char communities. Your small contribution brings warmth to a struggling family.'}
            </p>
          </div>

          <div className="p-3.5 bg-red-50 rounded-xl border border-red-200 text-xs text-red-950 mb-5 flex items-center justify-between">
            <div>
              <span className="font-bold block">২৪/৭ কেন্দ্রীয় জরুরি হটলাইন ও ঠিকানা:</span>
              <span className="font-mono font-bold text-sm text-red-800">+880 1712-345678</span>
              <span className="text-[11px] text-stone-600 block mt-0.5">ভোলামোড়, রৌমারী উপজেলা, রংপুর, বাংলাদেশ (৫৬৪০)</span>
            </div>
            <Link
              href="/donate"
              onClick={onClose}
              className="px-3 py-1.5 bg-[#D62828] text-white rounded-lg text-xs font-semibold hover:bg-[#B91C1C] transition cursor-pointer flex items-center gap-1"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>{lang === 'bn' ? 'অনুদান দিন' : 'Donate'}</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <Link
              href="/donate"
              onClick={onClose}
              className="py-2.5 px-3 rounded-xl bg-[#D62828] hover:bg-[#B91C1C] text-white text-xs font-bold transition text-center flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>{lang === 'bn' ? 'অনুদান দিন' : 'Donate Now'}</span>
            </Link>
            <Link
              href="/volunteer"
              onClick={onClose}
              className="py-2.5 px-3 rounded-xl border border-stone-300 text-stone-800 hover:bg-stone-50 text-xs font-semibold transition text-center flex items-center justify-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5 text-[#D62828]" />
              <span>{lang === 'bn' ? 'স্বেচ্ছাসেবক হন' : 'Join Volunteer'}</span>
            </Link>
          </div>

          <div className="text-center pt-2 border-t border-stone-100">
            <button
              onClick={handleDismissToday}
              className="text-xs text-stone-400 hover:text-stone-600 transition underline"
            >
              {lang === 'bn' ? 'আজকের জন্য আর দেখাবেন না' : "Don't show again today"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
