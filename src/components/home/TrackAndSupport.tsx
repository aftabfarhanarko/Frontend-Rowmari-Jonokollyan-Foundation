'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Newspaper, ArrowRight, ShieldCheck } from 'lucide-react';
import { Language } from '@/types';
import { useGetRoumariOverviewQuery } from '@/store/api/roumariApi';

interface TrackAndSupportProps {
  lang: Language;
  onSearchTracking: (id: string) => void;
  onOpenDonation?: () => void;
  onOpenVolunteer?: () => void;
}

export default function TrackAndSupport({
  lang,
  onSearchTracking,
}: TrackAndSupportProps) {
  const [trackingId, setTrackingId] = useState('');
  const { data: overview } = useGetRoumariOverviewQuery();

  const tourist = overview?.touristPlaces?.[0];
  const latestNews = overview?.latestNews?.[0];
  const firstEmergency = overview?.emergencyContacts?.[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;
    onSearchTracking(trackingId.trim());
  };

  return (
    <section className="py-5 sm:py-7 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
          {/* Left Card: রৌমারী ডিজিটাল তথ্য বাতায়ন ও সংবাদ */}
          <div className="rounded-2xl bg-[#FFF4F5] p-4 sm:p-5 shadow-[0_4px_16px_-6px_rgba(214,40,40,0.08)] flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1 h-4 rounded-full bg-[#D62828] shrink-0" />
              <h2 className="text-sm sm:text-base font-extrabold text-stone-900 tracking-tight">
                {lang === 'bn' ? (
                  <>
                    রৌমারী ডিজিটাল তথ্য <span className="text-[#D62828]">বাতায়ন ও সংবাদ</span>
                  </>
                ) : (
                  <>
                    Roumari Digital <span className="text-[#D62828]">Portal &amp; News</span>
                  </>
                )}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-center">
              {/* Featured Image */}
              <Link
                href="/roumari"
                className="sm:col-span-5 relative h-28 sm:h-[116px] w-full rounded-xl overflow-hidden bg-stone-200 block group"
              >
                <Image
                  src={
                    tourist?.featuredImage ||
                    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
                  }
                  alt={tourist?.name || 'রৌমারী ডিজিটাল তথ্য বাতায়ন'}
                  fill
                  sizes="(max-width: 640px) 100vw, 240px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>

              {/* Quick Links & CTA */}
              <div className="sm:col-span-7 space-y-2">
                <Link
                  href="/roumari"
                  className="flex items-center gap-2 group text-xs font-bold text-stone-800 hover:text-[#D62828] transition-colors"
                >
                  <span className="w-6 h-6 rounded-full bg-[#D62828] text-white flex items-center justify-center shrink-0">
                    <Phone className="w-3 h-3" />
                  </span>
                  <span className="truncate">
                    {firstEmergency?.name || (lang === 'bn' ? 'জরুরি হটলাইন নম্বর' : 'Emergency Hotlines')}
                  </span>
                </Link>

                <Link
                  href={latestNews ? `/roumari/news/${latestNews.slug}` : '/roumari'}
                  className="flex items-center gap-2 group text-xs font-bold text-stone-800 hover:text-[#D62828] transition-colors"
                >
                  <span className="w-6 h-6 rounded-full bg-[#D62828] text-white flex items-center justify-center shrink-0">
                    <Newspaper className="w-3 h-3" />
                  </span>
                  <span className="truncate">
                    {latestNews?.headline || (lang === 'bn' ? 'রৌমারী তাজা সংবাদ' : 'Roumari Latest News')}
                  </span>
                </Link>

                <div className="pt-0.5">
                  <Link
                    href="/roumari"
                    className="inline-flex items-center gap-1 rounded-full border border-[#D62828]/60 bg-white hover:bg-[#D62828] text-[#D62828] hover:text-white px-3.5 py-1 text-[11px] font-bold transition-colors"
                  >
                    <span>{lang === 'bn' ? 'আরও দেখুন' : 'View More'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card: আবেদনের সর্বশেষ স্থিতি জানুন */}
          <div className="rounded-2xl bg-[#FFF4F5] p-4 sm:p-5 shadow-[0_4px_16px_-6px_rgba(214,40,40,0.08)] flex flex-col justify-between">
            <div>
              <div className="border-b border-red-200/60 pb-2 mb-3">
                <h2 className="text-sm sm:text-base font-extrabold text-stone-900 tracking-tight">
                  {lang === 'bn' ? (
                    <>
                      <span className="text-[#D62828]">আবেদনের</span> সর্বশেষ স্থিতি জানুন
                    </>
                  ) : (
                    <>
                      <span className="text-[#D62828]">Track</span> Application Status
                    </>
                  )}
                </h2>
              </div>

              {/* Search Form */}
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder={lang === 'bn' ? 'আপনার আইডি লিখুন...' : 'Enter your ID...'}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-red-100 text-xs sm:text-sm text-stone-800 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#D62828] font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#D62828] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm transition shadow-sm cursor-pointer whitespace-nowrap active:scale-[0.98] inline-flex items-center justify-center gap-1.5"
                >
                  <span>{lang === 'bn' ? 'অনুসন্ধান করুন' : 'Search'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            {/* Sample IDs */}
            <div className="mt-3 flex items-center gap-1.5 flex-wrap">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-500 mr-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{lang === 'bn' ? 'ডেমো:' : 'Demo:'}</span>
              </span>
              {['RJF-2026-0842', 'RJF-2026-0915', 'RJF-2026-0720'].map((sampleId) => (
                <button
                  key={sampleId}
                  type="button"
                  onClick={() => {
                    setTrackingId(sampleId);
                    onSearchTracking(sampleId);
                  }}
                  className="font-mono text-[11px] px-2.5 py-1 rounded-lg bg-[#FCE7E8] hover:bg-[#D62828] text-[#B91C1C] hover:text-white transition font-bold cursor-pointer"
                >
                  {sampleId}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
