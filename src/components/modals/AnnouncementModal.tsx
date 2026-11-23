'use client';

import React from 'react';
import { Megaphone, X } from 'lucide-react';
import { Language } from '@/types';

interface AnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onOpenBloodRequest: () => void;
  onOpenAssistance: () => void;
}

export default function AnnouncementModal({
  isOpen,
  onClose,
  lang,
  onOpenBloodRequest,
  onOpenAssistance,
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
            <span className="text-[11px] font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
              {lang === 'bn' ? 'রক্তদান ও শীতবস্ত্র জরুরি সমন্বয়' : 'Emergency Blood & Relief Alert'}
            </span>
            <h3 className="text-lg md:text-xl font-bold text-stone-900 mt-2">
              {lang === 'bn'
                ? 'রৌমারী উপজেলা স্বাস্থ্য কমপ্লেক্সের জন্য জরুরি রক্তের আহ্বান'
                : 'Emergency Blood Requirement at Rowmari Health Complex'}
            </h3>
            <p className="text-xs md:text-sm text-stone-600 mt-2 leading-relaxed">
              {lang === 'bn'
                ? 'বর্তমানে রৌমারী হাসপাতালে দুইজন সংকটাপন্ন প্রসূতি ও সড়ক দুর্ঘটনায় আহত রোগীর জন্য "O নেগেটিভ" ও "B পজিটিভ" রক্তের জরুরি প্রয়োজন। সক্ষম রক্তদাতাদের অবিলম্বে যোগাযোগ করার অনুরোধ করা হচ্ছে।'
                : 'Urgent need of O- and B+ blood for critically ill emergency patients at Rowmari Hospital.'}
            </p>
          </div>

          <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 mb-5 flex items-center justify-between">
            <div>
              <span className="font-bold block">২৪/৭ জরুরি রক্তদাতা হটলাইন:</span>
              <span className="font-mono font-bold text-sm text-red-700">+880 1812-987654</span>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenBloodRequest();
              }}
              className="px-3 py-1.5 bg-red-700 text-white rounded-lg text-xs font-semibold hover:bg-red-800 transition"
            >
              {lang === 'bn' ? 'রক্তের বিস্তারিত' : 'Blood Details'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              onClick={() => {
                onClose();
                onOpenAssistance();
              }}
              className="py-2.5 px-3 rounded-xl border border-emerald-700 text-emerald-800 hover:bg-emerald-50 text-xs font-semibold transition text-center"
            >
              {lang === 'bn' ? 'সহায়তার আবেদন করুন' : 'Request Assistance'}
            </button>
            <button
              onClick={onClose}
              className="py-2.5 px-3 rounded-xl bg-red-700 text-white hover:bg-red-800 text-xs font-semibold transition text-center"
            >
              {lang === 'bn' ? 'বিজ্ঞপ্তি বন্ধ করুন' : 'Dismiss Alert'}
            </button>
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
