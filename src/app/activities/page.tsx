'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  X, 
  ArrowRight, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  Droplet, 
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import BackToTop from '@/components/BackToTop';
import AssistanceModal from '@/components/modals/AssistanceModal';
import { GlassSection, SectionHeading, glassCard, glassCardHover } from '@/components/ui/glass';
import { useGetActivitiesQuery } from '@/store/api/activitiesApi';
import { Language, ActivityCategory, ActivityItem } from '@/types';

export default function ActivitiesPage() {
  const [lang, setLang] = useState<Language>('bn');
  const [activeCategory, setActiveCategory] = useState<ActivityCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);
  const [assistanceModalOpen, setAssistanceModalOpen] = useState(false);
  const { data: activities = [], isLoading, isError } = useGetActivitiesQuery();

  const t = (bn: string, en: string) => (lang === 'bn' ? bn : en);

  const categories = [
    { key: 'all' as ActivityCategory, labelBn: 'সকল কার্যক্রম', labelEn: 'All Activities' },
    { key: 'winter' as ActivityCategory, labelBn: 'শীতবস্ত্র ত্রাণ', labelEn: 'Winter Relief' },
    { key: 'medical' as ActivityCategory, labelBn: 'মেডিকেল ক্যাম্প', labelEn: 'Medical Camps' },
    { key: 'education' as ActivityCategory, labelBn: 'শিক্ষা উপবৃত্তি', labelEn: 'Education Aid' },
    { key: 'emergency' as ActivityCategory, labelBn: 'জরুরি রক্তদান', labelEn: 'Blood Support' },
    { key: 'food' as ActivityCategory, labelBn: 'খাদ্য সহায়তা', labelEn: 'Food Aid' },
  ];

  const filteredActivities = activities.filter((act) => {
    const matchesCategory = activeCategory === 'all' || act.category === activeCategory;
    const matchesQuery =
      act.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.locationBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.locationEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1E293B]">
      <Navbar 
        lang={lang} 
        onToggleLang={() => setLang(l => l === 'bn' ? 'en' : 'bn')} 
      />

      <main className="flex-1 pb-20 sm:pb-24">
        {/* Header Hero Banner */}
        <section className="relative overflow-hidden pt-8 pb-10 sm:pt-12 sm:pb-14 bg-gradient-to-b from-emerald-50/50 via-white to-white">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-300/30 blur-3xl" />
            <div className="absolute top-1/2 -right-20 h-80 w-80 rounded-full bg-red-300/20 blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#0D5C35] text-xs font-bold mb-3 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#0D5C35]" />
                <span>{t('মাঠপর্যায়ের মানবিক কার্যক্রম ও ফটো আর্কাইভ', 'Live Fieldwork Archive & Impact')}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-4">
                {t('রৌমারী ও দুর্গম চরাঞ্চলে আমাদের মানবিক কার্যক্রম', 'Frontline Relief Across River Island Chars')}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-stone-600 leading-relaxed">
                {t(
                  'শীতবস্ত্র বিতরণ, বিনামূল্যে চিকিৎসা ক্যাম্প, মুমূর্ষু রোগীর জন্য রক্তদান এবং দরিদ্র শিক্ষার্থীদের শিক্ষাবৃত্তি—আমাদের প্রতিটি উদ্যোগের স্বচ্ছ চিত্র।',
                  'Verified field relief initiatives in remote chars of Rowmari and Kurigram: winter blankets, physician clinics, donor network, and student scholarships.'
                )}
              </p>
            </motion.div>

            {/* Filter and Search Bar */}
            <div className="mt-8 pt-6 border-t border-stone-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((c) => (
                  <button
                    key={c.key}
                    onClick={() => setActiveCategory(c.key)}
                    className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      activeCategory === c.key
                        ? 'bg-[#0D5C35] text-white shadow-md'
                        : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                    }`}
                  >
                    {t(c.labelBn, c.labelEn)}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('কার্যক্রম বা চরের নাম খুঁজুন...', 'Search activity or location...')}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#0D5C35]/30 shadow-2xs"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Activities Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
          <div className="flex items-center justify-between text-xs sm:text-sm text-stone-500 mb-6 font-medium">
            <span>{isLoading ? t('লোড হচ্ছে…', 'Loading…') : t(`${filteredActivities.length} টি কার্যক্রম প্রদর্শিত হচ্ছে`, `Showing ${filteredActivities.length} activities`)}</span>
            {isError ? <span role="alert" className="text-red-700">{t('কার্যক্রম লোড করা যায়নি।', 'Activities could not be loaded.')}</span> : null}
            <div className="flex items-center gap-1.5 text-[#0D5C35] font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>{t('১০০% যাচাইকৃত মাঠপর্যায়ের কাজ', '100% On-ground Verified')}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map((act) => (
              <motion.div
                key={act.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedActivity(act)}
                className={`${glassCardHover} overflow-hidden cursor-pointer flex flex-col justify-between group`}
              >
                <div>
                  <div className="relative w-full h-52 sm:h-56 overflow-hidden">
                    <Image
                      src={act.imageUrl || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80'}
                      alt={t(act.titleBn, act.titleEn)}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                    
                    {/* Category Tag */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold text-white bg-[#0D5C35] shadow-md backdrop-blur-md">
                        {act.category === 'winter' ? t('শীতবস্ত্র', 'Winter') :
                         act.category === 'medical' ? t('চিকিৎসা', 'Medical') :
                         act.category === 'education' ? t('শিক্ষা', 'Education') :
                         act.category === 'emergency' ? t('রক্তদান', 'Blood') : t('ত্রাণ', 'Relief')}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white text-xs flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
                        <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="truncate max-w-[150px]">{t(act.locationBn, act.locationEn)}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
                        <Calendar className="w-3 h-3 text-white/80 shrink-0" />
                        <span>{t(act.dateBn, act.dateEn)}</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <h2 className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-[#0D5C35] transition-colors line-clamp-2 leading-snug mb-2">
                      {t(act.titleBn, act.titleEn)}
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed mb-4">
                      {t(act.descriptionBn, act.descriptionEn)}
                    </p>
                  </div>
                </div>

                <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-stone-200/70 flex items-center justify-between text-xs font-bold text-[#0D5C35]">
                  <span>{t('বিস্তারিত ছবি ও তথ্য দেখুন', 'View Details & Gallery')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

          {filteredActivities.length === 0 && (
            <div className={`${glassCard} p-12 text-center max-w-md mx-auto my-12`}>
              <div className="text-stone-400 mb-2 font-bold">{t('কোনো কার্যক্রম পাওয়া যায়নি', 'No activities found')}</div>
              <p className="text-xs text-stone-500 mb-4">{t('অন্য ক্যাটাগরি নির্বাচন করুন অথবা নতুন শব্দ দিয়ে খুঁজুন।', 'Try selecting another category or clear the search input.')}</p>
              <button
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                className="px-4 py-2 rounded-full bg-[#0D5C35] text-white text-xs font-bold cursor-pointer"
              >
                {t('সকল কার্যক্রম দেখুন', 'Reset Filter')}
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Activity Details Modal */}
      <AnimatePresence>
        {selectedActivity && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200 max-h-[90vh] flex flex-col"
            >
              <button
                onClick={() => setSelectedActivity(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full h-64 sm:h-72 shrink-0">
                <Image
                  src={selectedActivity.imageUrl || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80'}
                  alt={t(selectedActivity.titleBn, selectedActivity.titleEn)}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs font-bold bg-[#0D5C35] px-2.5 py-1 rounded-md inline-block mb-1.5">
                    {t(selectedActivity.locationBn, selectedActivity.locationEn)}
                  </span>
                  <h2 className="text-lg sm:text-2xl font-black leading-tight drop-shadow-md">
                    {t(selectedActivity.titleBn, selectedActivity.titleEn)}
                  </h2>
                </div>
              </div>

              <div className="p-6 overflow-y-auto space-y-4">
                <div className="flex items-center gap-4 text-xs text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-emerald-700" />
                    <span>{t(selectedActivity.dateBn, selectedActivity.dateEn)}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-red-600" />
                    <span>{t(selectedActivity.locationBn, selectedActivity.locationEn)}</span>
                  </span>
                </div>

                <p className="text-sm text-stone-700 leading-relaxed font-normal">
                  {t(selectedActivity.descriptionBn, selectedActivity.descriptionEn)}
                </p>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/70 text-xs text-[#0D5C35] font-medium leading-relaxed">
                  {t(
                    'এই কার্যক্রমটি রৌমারী জনকল্যাণ ফাউন্ডেশনের স্বেচ্ছাসেবকদের সরাসরি অংশগ্রহণে শতভাগ স্বচ্ছতার সাথে সম্পন্ন হয়েছে।',
                    'This field initiative was directly executed with zero overhead by registered RJF humanitarian volunteers.'
                  )}
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => {
                      setSelectedActivity(null);
                      setAssistanceModalOpen(true);
                    }}
                    className="w-full py-3 rounded-xl bg-[#0D5C35] hover:bg-[#094527] text-white font-bold text-xs sm:text-sm transition cursor-pointer text-center shadow-md"
                  >
                    {t('সহায়তার আবেদন করুন', 'Request Help in Area')}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer 
        lang={lang} 
        onOpenAssistance={() => setAssistanceModalOpen(true)}
      />

      <MobileBottomBar
        lang={lang}
        onOpenAssistance={() => setAssistanceModalOpen(true)}
      />

      <BackToTop />

      <AssistanceModal
        isOpen={assistanceModalOpen}
        onClose={() => setAssistanceModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
