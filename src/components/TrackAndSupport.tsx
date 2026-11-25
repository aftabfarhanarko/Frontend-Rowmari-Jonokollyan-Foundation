'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, HandHeart, Users, Droplet } from 'lucide-react';
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
  onOpenDonation,
  onOpenVolunteer,
}: TrackAndSupportProps) {
  const [trackingId, setTrackingId] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;
    onSearchTracking(trackingId.trim());
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Left Card: "আবেদনের অবস্থা দেখুন" (Tracking) */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-md flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2">
                <Search className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'স্বচ্ছ ট্র্যাকিং পোর্টাল' : 'Live Tracking'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                {lang === 'bn' ? 'আবেদনের অবস্থা দেখুন' : 'Track Application Status'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                {lang === 'bn'
                  ? 'আবেদন আইডি / মোবাইল নম্বর দিন'
                  : 'Enter your Application Tracking ID or phone number'}
              </p>

              {/* Search Form */}
              <form onSubmit={handleSearch} className="mt-6 flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder={
                    lang === 'bn'
                      ? 'আবেদন আইডি (যেমন: RJF-2026-0842)'
                      : 'Application ID (e.g., RJF-2026-0842)'
                  }
                  className="flex-1 px-4 py-3 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-700 bg-stone-50 focus:bg-white transition"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#0D5C35] hover:bg-[#094527] text-white font-bold text-sm transition shadow-sm cursor-pointer whitespace-nowrap active:scale-98 flex items-center justify-center gap-1.5"
                >
                  <Search className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'খুঁজুন' : 'Search'}</span>
                </button>
              </form>

              {/* Sample IDs tip */}
              <div className="mt-3 flex items-center gap-1.5 text-[11px] text-stone-500 flex-wrap">
                <span>{lang === 'bn' ? 'ডেমো আইডি পরীক্ষা করুন:' : 'Try sample IDs:'}</span>
                {['RJF-2026-0842', 'RJF-2026-0915', 'RJF-2026-0720'].map((sampleId) => (
                  <button
                    key={sampleId}
                    type="button"
                    onClick={() => {
                      setTrackingId(sampleId);
                      onSearchTracking(sampleId);
                    }}
                    className="font-mono text-emerald-800 underline hover:text-emerald-950 font-semibold cursor-pointer"
                  >
                    {sampleId}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-stone-400 mt-6 pt-4 border-t border-stone-100">
              {lang === 'bn'
                ? 'আবেদন জমা দেওয়ার পর আবেদনকারীর দেওয়া মোবাইল নম্বরে এসএমএস বা এই পোর্টালে স্থিতি দেখা যায়।'
                : 'Status updates are reflected in real-time on this portal.'}
            </p>
          </div>

          {/* Right Card: "আপনিও পাশে দাঁড়ান" (Dark Green box matching wireframe) */}
          <div className="bg-[#0D5C35] text-white rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between relative overflow-hidden border border-emerald-900">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-900/80 text-emerald-200 text-xs font-bold mb-2">
                <HandHeart className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'মানবতার অংশীদারিত্ব' : 'Partnership for Humanity'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {lang === 'bn' ? 'আপনিও পাশে দাঁড়ান' : 'Stand With Us Today'}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 mt-1">
                {lang === 'bn'
                  ? 'স্বেচ্ছাসেবী হিসেবে যোগ দিন অথবা জরুরি রক্তদানে এগিয়ে আসুন।'
                  : 'Join as a volunteer or step forward for voluntary blood donation.'}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/blood-donation"
                  className="px-6 py-3 rounded-xl bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold text-sm transition shadow-md hover:scale-[1.02] active:scale-98 cursor-pointer flex items-center gap-2"
                >
                  <Droplet className="w-4 h-4 fill-white text-white" />
                  <span>{lang === 'bn' ? 'রক্তদান পোর্টাল' : 'Blood Portal'}</span>
                </Link>

                <button
                  onClick={onOpenVolunteer}
                  className="px-6 py-3 rounded-xl border-2 border-white/90 text-white hover:bg-white/10 font-bold text-sm transition hover:scale-[1.02] active:scale-98 cursor-pointer flex items-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'স্বেচ্ছাসেবক' : 'Volunteer'}</span>
                </button>
              </div>
            </div>

            <p className="text-xs text-emerald-200/70 mt-6 pt-4 border-t border-emerald-800/80 relative z-10">
              {lang === 'bn'
                ? 'সকল মানবিক কার্যক্রমের তথ্য ও সেবা বিবরণী স্বচ্ছতার সাথে প্রকাশ করা হয়।'
                : 'All humanitarian operations and relief details are published transparently.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
