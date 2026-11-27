'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Calendar, 
  Users, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import BackToTop from '@/components/BackToTop';
import { GlassSection, SectionHeading, glassCard, glassCardHover } from '@/components/ui/glass';
import { useGetCampaignsQuery } from '@/store/api/campaignsApi';
import { Language } from '@/types';
import { SkeletonCard } from '@/components/ui/skeleton';

export default function CampaignsPage() {
  const [lang, setLang] = useState<Language>('bn');
  const [activeTab, setActiveTab] = useState<'all' | 'winter' | 'medical' | 'education'>('all');
  const { data: campaigns = [], isLoading, isError } = useGetCampaignsQuery();

  const t = (bn: string, en: string) => (lang === 'bn' ? bn : en);

  const tabs = [
    { key: 'all' as const, labelBn: 'সকল ক্যাম্পেইন', labelEn: 'All Campaigns' },
    { key: 'winter' as const, labelBn: 'শীতবস্ত্র তহবিল', labelEn: 'Winter Relief' },
    { key: 'medical' as const, labelBn: 'চিকিৎসা তহবিল', labelEn: 'Medical Fund' },
    { key: 'education' as const, labelBn: 'শিক্ষাবৃত্তি', labelEn: 'Education' },
  ];

  const filteredCampaigns = campaigns.filter((camp) => {
    if (activeTab === 'all') return true;
    return camp.category === activeTab;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1E293B]">
      <Navbar 
        lang={lang} 
        onToggleLang={() => setLang(l => l === 'bn' ? 'en' : 'bn')} 
      />

      <main className="flex-1 pb-20 sm:pb-24">
        {/* Header Hero Banner */}
        <section className="relative overflow-hidden pt-8 pb-10 sm:pt-12 sm:pb-14 bg-gradient-to-b from-red-50/50 via-white to-white">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-red-400/20 blur-3xl" />
            <div className="absolute top-1/2 -right-20 h-80 w-80 rounded-full bg-red-300/20 blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-[#E53935] text-xs font-bold mb-3 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#E53935]" />
                <span>{t('জরুরি চলমান মানবিক তহবিলসমূহ', 'Active Emergency Relief Funds')}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-4">
                {t('রৌমারীর অসহায় মানুষের সুনির্দিষ্ট ক্যাম্পেইনে অংশ নিন', 'Directly Fund Verified Char Relief Campaigns')}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-stone-600 leading-relaxed font-normal">
                {t(
                  'শীতবস্ত্র, জটিল রোগের চিকিৎসা, জরুরি রক্তদান এবং চরাঞ্চলের দরিদ্র শিক্ষার্থীদের বৃত্তির জন্য চলমান সুনির্দিষ্ট প্রকল্প। সরাসরি অংশগ্রহণে তাৎক্ষণিক রসিদ লাভ করুন।',
                  'Support transparent, targeted humanitarian projects in remote Brahmaputra chars with live progress tracking and zero administrative overhead.'
                )}
              </p>
            </motion.div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 mt-8 pt-4 border-t border-stone-200/80">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeTab === tab.key
                      ? 'bg-[#E53935] text-white shadow-md'
                      : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  {t(tab.labelBn, tab.labelEn)}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Campaigns Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} variant="campaign" />
              ))
            ) : null}
            {isError ? <p role="alert" className="col-span-full py-12 text-center">{t('ক্যাম্পেইন লোড করা যায়নি। পরে আবার চেষ্টা করুন।', 'Campaigns could not be loaded. Please try again.')}</p> : null}
            {!isLoading && !isError && filteredCampaigns.length === 0 ? <p className="col-span-full py-12 text-center">{t('কোনো ক্যাম্পেইন পাওয়া যায়নি।', 'No campaigns are currently available.')}</p> : null}
            {!isLoading && filteredCampaigns.map((camp) => {
              const percentage = Math.min(
                100,
                Math.round((camp.raisedAmount / camp.targetAmount) * 100)
              );
              return (
                <motion.div
                  key={camp.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  className={`${glassCardHover} overflow-hidden flex flex-col justify-between`}
                >
                  <div>
                    {/* Campaign Image Banner */}
                    <div className="relative w-full h-52 sm:h-56 bg-stone-100 overflow-hidden">
                      <Image
                        src={camp.imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop'}
                        alt={t(camp.titleBn, camp.titleEn)}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                      
                      <div className="absolute top-3 left-3 z-10">
                        <span className="bg-[#D62828] text-white text-[11px] font-bold px-3 py-1 rounded-md shadow-md backdrop-blur-md">
                          {t('সক্রিয় ক্যাম্পেইন', 'Active Campaign')}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-white text-xs flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
                          <Clock className="w-3 h-3 text-amber-300 shrink-0" />
                          <span>{t(camp.deadlineBn, camp.deadlineEn)} {t('বাকি', 'left')}</span>
                        </span>
                        <span className="inline-flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
                          <Users className="w-3 h-3 text-red-300 shrink-0" />
                          <span>{t(`${camp.donorsCount} জন দাতা`, `${camp.donorsCount} Donors`)}</span>
                        </span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-5 sm:p-6 space-y-3">
                      <h2 className="text-lg font-bold text-stone-900 leading-snug">
                        {t(camp.titleBn, camp.titleEn)}
                      </h2>
                      <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
                        {t(camp.descriptionBn, camp.descriptionEn)}
                      </p>

                      {/* Progress bar */}
                      <div className="space-y-2 pt-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-[#D62828]">
                            ৳{camp.raisedAmount.toLocaleString()} {t('উত্তোলিত', 'raised')}
                          </span>
                          <span className="font-bold text-stone-500 font-mono">
                            {percentage}%
                          </span>
                        </div>
                        <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                          <motion.div
                            className="h-full bg-gradient-to-r from-[#D62828] to-red-500 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${percentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                          />
                        </div>
                        <div className="text-[11px] text-stone-500 text-right font-medium">
                          {t(`লক্ষ্য: ৳${camp.targetAmount.toLocaleString()} টাকা`, `Target: ৳${camp.targetAmount.toLocaleString()}`)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 pt-0 flex items-center gap-3">
                    <Link
                      href={`/donate?campaign=${camp.id}`}
                      className="flex-1 py-3 rounded-xl bg-[#D62828] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm transition cursor-pointer flex items-center justify-center gap-2 shadow-md active:scale-98"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                      <span>{t('অনুদান দিন', 'Donate Now')}</span>
                    </Link>
                    <Link
                      href="/volunteer"
                      className="px-4 py-3 rounded-xl border border-stone-200 hover:border-red-300 bg-stone-50 hover:bg-red-50 text-stone-700 hover:text-[#D62828] font-semibold text-xs sm:text-sm transition flex items-center justify-center gap-1.5"
                    >
                      <Users className="w-4 h-4" />
                      <span>{t('স্বেচ্ছাসেবক', 'Volunteer')}</span>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer lang={lang} />
      <MobileBottomBar lang={lang} />
      <BackToTop />
    </div>
  );
}
