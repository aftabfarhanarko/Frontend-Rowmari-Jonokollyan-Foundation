'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Users, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileBottomBar from '@/components/layout/MobileBottomBar';
import { PageBanner } from '@/components/layout/PageBanner';
import { useGetRoumariOverviewQuery, useGetRoumariDirectoriesQuery } from '@/store/api/roumariApi';
import { RoumariEmergencyBar } from '@/components/roumari/RoumariEmergencyBar';
import { RoumariNewsSection } from '@/components/roumari/RoumariNewsSection';
import { RoumariDirectorySection } from '@/components/roumari/RoumariDirectorySection';
import { RoumariTouristSection } from '@/components/roumari/RoumariTouristSection';

export default function RoumariPortalClient() {
  const { data: overview } = useGetRoumariOverviewQuery();
  const { data: directories } = useGetRoumariDirectoriesQuery();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar lang="bn" />

      <PageBanner
        badge="রৌমারী উপজেলা, কুড়িগ্রাম ডিজিটাল তথ্য বাতায়ন"
        title="আমাদের রৌমারী — তথ্য ও কমিউনিটি নিউজ পোর্টাল"
        subtitle="জরুরি হটলাইন, বাস কাউন্টার, হাসপাতাল, পুলিশ, শিক্ষা প্রতিষ্ঠান, ঐতিহাসিক স্থান এবং রৌমারীর সর্বশেষ সংবাদ এক ঠিকানায়।"
      >
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/donate"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white hover:bg-red-50 text-[#D62828] font-bold text-xs sm:text-sm shadow-md transition active:scale-[0.98]"
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>অনুদান দিন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/volunteer"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/40 text-white font-bold text-xs sm:text-sm transition active:scale-[0.98]"
          >
            <Users className="w-3.5 h-3.5" />
            <span>স্বেচ্ছাসেবক হন</span>
          </Link>
        </div>
      </PageBanner>

      {/* Main Content Sections */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-16 space-y-8 w-full">
        {/* Emergency Hotlines Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <RoumariEmergencyBar contacts={overview?.emergencyContacts || []} />
        </motion.div>

        {/* 1. Latest News Portal */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <RoumariNewsSection news={overview?.latestNews || []} />
        </motion.div>

        {/* 2. Full Directory with filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <RoumariDirectorySection directories={directories || []} />
        </motion.div>

        {/* 3. Tourist Attractions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <RoumariTouristSection places={overview?.touristPlaces || []} />
        </motion.div>
      </main>

      <Footer lang="bn" />
      <MobileBottomBar lang="bn" />
    </div>
  );
}
