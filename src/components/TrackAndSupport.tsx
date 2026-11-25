'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, HandHeart, Users, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Language } from '@/types';

interface TrackAndSupportProps {
  lang: Language;
  onSearchTracking: (id: string) => void;
  onOpenDonation?: () => void;
  onOpenVolunteer: () => void;
}

export default function TrackAndSupport({
  lang,
  onSearchTracking,
  onOpenVolunteer,
}: TrackAndSupportProps) {
  const [trackingId, setTrackingId] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;
    onSearchTracking(trackingId.trim());
  };

  return (
    <section className="py-12 md:py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Left Card: "আবেদনের অবস্থা দেখুন" (Tracking) */}
          <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 lg:p-9 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[#0D5C35] text-xs font-bold mb-3 shadow-2xs">
                <Search className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'স্বচ্ছ অনলাইন ট্র্যাকিং পোর্টাল' : 'Live Tracking Portal'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight mb-2">
                {lang === 'bn' ? 'আবেদনের সর্বশেষ স্থিতি জানুন' : 'Track Application Status'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {lang === 'bn'
                  ? 'আপনার আবেদন আইডি বা নিবন্ধিত মোবাইল নম্বর লিখে বর্তমান যাচাই ও অনুমোদনের অবস্থা সরাসরি পর্যবেক্ষণ করুন।'
                  : 'Enter your tracking ID or registered mobile number to monitor the review progress in real time.'}
              </p>

              {/* Search Form */}
              <form onSubmit={handleSearch} className="mt-6 flex flex-col sm:flex-row gap-2.5">
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder={
                    lang === 'bn'
                      ? 'আবেদন আইডি (যেমন: RJF-2026-0842)'
                      : 'Application ID (e.g., RJF-2026-0842)'
                  }
                  className="flex-1 px-4 py-3.5 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0D5C35] bg-stone-50 focus:bg-white transition shadow-2xs font-mono"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-xl bg-[#0D5C35] hover:bg-[#094527] text-white font-bold text-sm transition shadow-md hover:shadow-lg cursor-pointer whitespace-nowrap active:scale-98 flex items-center justify-center gap-2 group/btn"
                >
                  <Search className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'অনুসন্ধান করুন' : 'Search Status'}</span>
                </button>
              </form>

              {/* Sample IDs tip */}
              <div className="mt-4 flex items-center gap-2 text-xs text-stone-500 flex-wrap">
                <span className="font-medium">{lang === 'bn' ? 'ডেমো আইডি দিয়ে দেখুন:' : 'Sample IDs:'}</span>
                {['RJF-2026-0842', 'RJF-2026-0915', 'RJF-2026-0720'].map((sampleId) => (
                  <button
                    key={sampleId}
                    type="button"
                    onClick={() => {
                      setTrackingId(sampleId);
                      onSearchTracking(sampleId);
                    }}
                    className="font-mono text-xs px-2.5 py-1 rounded-md bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-[#0D5C35] border border-stone-200 transition font-semibold cursor-pointer"
                  >
                    {sampleId}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-2 text-xs text-stone-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {lang === 'bn'
                  ? 'সার্ভারে প্রতিটি আবেদনের তথ্য সুরক্ষিত ও নিরাপদ এনক্রিপশনে সংরক্ষিত।'
                  : 'All applications are encrypted and processed with complete confidentiality.'}
              </span>
            </div>
          </div>

          {/* Right Card: "আপনিও পাশে দাঁড়ান" (Deep Emerald box) */}
          <div className="bg-gradient-to-br from-[#0D5C35] via-[#0b4d2c] to-[#07361e] text-white rounded-3xl p-6 sm:p-8 lg:p-9 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden border border-emerald-700/60 group">
            {/* Background Ambient Glow */}
            <div className="absolute -top-10 -right-10 w-56 h-56 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-400/25 transition-all duration-500" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-400/30 text-emerald-200 text-xs font-bold mb-3 shadow-2xs">
                <HandHeart className="w-3.5 h-3.5 text-emerald-300" />
                <span>{lang === 'bn' ? 'মানবতার অংশীদারিত্ব' : 'Partnership for Humanity'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight mb-2">
                {lang === 'bn' ? 'মানবতার কল্যাণে আপনার হাত বাড়িয়ে দিন' : 'Stand With Us Today'}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal">
                {lang === 'bn'
                  ? 'রৌমারীর প্রত্যন্ত চরাঞ্চলের অসহায় শীতার্ত মানুষের সেবায় আপনার মেধা, সময়, শ্রম ও সহমর্মিতা যুক্ত করুন।'
                  : 'Contribute your time, skills, volunteerism, and compassion to serve the marginalized people of Rowmari.'}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <button
                  onClick={onOpenVolunteer}
                  className="px-6 py-3.5 rounded-2xl bg-white text-[#0D5C35] hover:bg-emerald-50 font-bold text-sm transition-all shadow-md hover:scale-[1.02] active:scale-98 cursor-pointer flex items-center gap-2"
                >
                  <Users className="w-4 h-4 text-[#0D5C35]" />
                  <span>{lang === 'bn' ? 'স্বেচ্ছাসেবক হিসেবে যুক্ত হোন' : 'Join as Volunteer'}</span>
                </button>

                <Link
                  href="/activities"
                  className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-all shadow-md hover:scale-[1.02] active:scale-98 cursor-pointer flex items-center gap-2"
                >
                  <span>{lang === 'bn' ? 'আমাদের কার্যক্রম দেখুন' : 'View Activities'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <p className="text-xs text-emerald-200/80 mt-6 pt-4 border-t border-emerald-700/60 relative z-10 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
              <span>
                {lang === 'bn'
                  ? 'সকল মানবিক কার্যক্রমের বিবরণ ও সেবা কার্যক্রমের প্রতিবেদন উন্মুক্ত ও স্বচ্ছ।'
                  : 'All humanitarian operations and relief details are published transparently.'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
