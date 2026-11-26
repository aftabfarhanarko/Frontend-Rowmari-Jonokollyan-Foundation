'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileBottomBar from '@/components/layout/MobileBottomBar';
import { useGetRoumariOverviewQuery, useGetRoumariDirectoriesQuery } from '@/store/api/roumariApi';
import { RoumariEmergencyBar } from '@/components/roumari/RoumariEmergencyBar';
import { RoumariNewsSection } from '@/components/roumari/RoumariNewsSection';
import { RoumariDirectorySection } from '@/components/roumari/RoumariDirectorySection';
import { RoumariTouristSection } from '@/components/roumari/RoumariTouristSection';
import { MapPin, Info, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function RoumariPortalClient() {
  const { data: overview, isLoading } = useGetRoumariOverviewQuery();
  const { data: directories } = useGetRoumariDirectoriesQuery();

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Navbar lang="bn" />

      {/* Hero Header */}
      <section className="bg-white border-b border-stone-200 pt-6 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#D62828] text-xs font-bold mb-2 border border-red-200">
                <MapPin className="w-3.5 h-3.5" />
                <span>রৌমারী উপজেলা, কুড়িগ্রাম ডিজিটাল তথ্য বাতায়ন</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight">
                আমাদের রৌমারী — তথ্য ও কমিউনিটি নিউজ পোর্টাল
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl">
                জরুরি হটলাইন, বাস কাউন্টার, হাসপাতাল, পুলিশ, শিক্ষা প্রতিষ্ঠান, ঐতিহাসিক স্থান এবং রৌমারীর সর্বশেষ সংবাদ এক ঠিকানায়।
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/donate"
                className="px-5 py-2.5 rounded-xl bg-[#D62828] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm shadow-xs transition"
              >
                অনুদান দিন
              </Link>
              <Link
                href="/volunteer"
                className="px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 font-bold text-xs sm:text-sm transition"
              >
                স্বেচ্ছাসেবক হন
              </Link>
            </div>
          </div>

          {/* Emergency Bar */}
          <RoumariEmergencyBar contacts={overview?.emergencyContacts || []} />
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 w-full">
        {/* 1. Latest News Portal */}
        <RoumariNewsSection news={overview?.latestNews || []} />

        {/* 2. Full Directory with filter */}
        <RoumariDirectorySection directories={directories || []} />

        {/* 3. Tourist Attractions */}
        <RoumariTouristSection places={overview?.touristPlaces || []} />
      </main>

      <Footer lang="bn" />
      <MobileBottomBar lang="bn" />
    </div>
  );
}
