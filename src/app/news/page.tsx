'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarDays,
  ArrowRight,
  Mail,
  ShieldCheck,
  Search,
  MapPin,
  X,
  Newspaper,
  HeartHandshake,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { PageBanner } from '@/components/layout/PageBanner';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import BackToTop from '@/components/BackToTop';
import DonationModal from '@/components/modals/DonationModal';
import { useGetNewsQuery } from '@/store/api/applicationsApi';
import { SkeletonCard } from '@/components/ui/skeleton';
import { Language, NewsItem } from '@/types';

const FALLBACK_IMAGE = '/images/activities/winter-relief.jpg';

const formatDate = (iso: string | undefined, lang: Language) => {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export default function NewsPage() {
  const [lang, setLang] = useState<Language>('bn');
  const [activeTab, setActiveTab] = useState<'all' | 'news' | 'event' | 'notice'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const { data: newsEvents = [], isLoading, isError } = useGetNewsQuery();

  const t = (bn: string, en: string) => (lang === 'bn' ? bn : en);

  const tabs = [
    { key: 'all' as const, labelBn: 'সকল সংবাদ', labelEn: 'All Updates', count: newsEvents.length },
    { key: 'news' as const, labelBn: 'প্রেস বিজ্ঞপ্তি', labelEn: 'Press News', count: newsEvents.filter((n) => n.type === 'news').length },
    { key: 'event' as const, labelBn: 'আসন্ন ইভেন্ট', labelEn: 'Upcoming Events', count: newsEvents.filter((n) => n.type === 'event').length },
    { key: 'notice' as const, labelBn: 'জরুরি ঘোষণা', labelEn: 'Urgent Notices', count: newsEvents.filter((n) => n.type === 'notice').length },
  ];

  const filteredNews = newsEvents.filter((item) => {
    const matchesTab = activeTab === 'all' || item.type === activeTab;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      item.titleBn.toLowerCase().includes(q) ||
      item.summaryBn.toLowerCase().includes(q) ||
      (item.contentBn || '').toLowerCase().includes(q);
    return matchesTab && matchesQuery;
  });

  const showFeatured = activeTab === 'all' && !searchQuery.trim() && filteredNews.length > 0;
  const featuredItem = showFeatured ? filteredNews[0] : null;
  const gridItems = showFeatured ? filteredNews.slice(1) : filteredNews;

  const getTypeBadge = (type: NewsItem['type']) => {
    if (type === 'event') return { label: t('আসন্ন ইভেন্ট', 'Upcoming Event'), cls: 'bg-amber-50 text-amber-700 border-amber-200' };
    if (type === 'notice') return { label: t('জরুরি ঘোষণা', 'Urgent Notice'), cls: 'bg-red-50 text-[#D62828] border-red-200' };
    return { label: t('প্রেস রিলিজ', 'Press Release'), cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1E293B]" lang={lang === 'bn' ? 'bn' : 'en'}>
      <Navbar
        lang={lang}
        onToggleLang={() => setLang((l) => (l === 'bn' ? 'en' : 'bn'))}
        onOpenDonation={() => setDonationModalOpen(true)}
      />

      <main className="flex-1 pb-20 sm:pb-24">
        <PageBanner
          badge={t('অফিসিয়াল সংবাদ, কর্মসূচি ও প্রেস বিজ্ঞপ্তি', 'Official Press Releases & Event Announcements')}
          title={t('সংবাদ, কার্যক্রম ও আগামী দিনের কর্মসূচি', 'News, Announcements & Events')}
          subtitle={t(
            'রৌমারী জনকল্যাণ ফাউন্ডেশনের চলমান মানবিক উদ্যোগ, ত্রাণ বিতরণ প্রতিবেদন এবং আসন্ন ফ্রি চিকিৎসা ক্যাম্পের সর্বশেষ আপডেট।',
            'Stay informed with verified reports on relief drives, free doctor clinics, education aid, and upcoming char community assemblies.'
          )}
        />

        {/* Filter Tabs + Search Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === tab.key
                    ? 'bg-[#D62828] text-white shadow-sm'
                    : 'bg-[#FFF4F5] text-stone-700 hover:bg-red-100/70'
                }`}
              >
                <span>{t(tab.labelBn, tab.labelEn)}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    activeTab === tab.key ? 'bg-white/20 text-white' : 'bg-white text-stone-600'
                  }`}
                >
                  {lang === 'bn' ? tab.count.toLocaleString('bn-BD') : tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('সংবাদ বা কর্মসূচি খুঁজুন...', 'Search news or events...')}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-stone-200 bg-stone-50/70 text-xs sm:text-sm text-stone-800 placeholder:text-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D62828]/25 focus:border-[#D62828]"
            />
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} variant="news" />
              ))}
            </div>
          ) : isError ? (
            <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center text-sm font-semibold text-[#D62828]">
              {t('খবর লোড করা যায়নি। অনুগ্রহ করে পরে আবার চেষ্টা করুন।', 'News and events could not be loaded.')}
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-12 text-center space-y-2">
              <Newspaper className="w-10 h-10 text-stone-300 mx-auto" />
              <p className="text-sm font-bold text-stone-600">
                {t('কোনো সংবাদ বা কর্মসূচি পাওয়া যায়নি।', 'No news or events match your filter.')}
              </p>
            </div>
          ) : (
            <>
              {/* Featured Top Story */}
              {featuredItem && (
                <motion.article
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setSelectedNews(featuredItem)}
                  className="group rounded-3xl border border-stone-200/90 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:border-red-300 transition-all cursor-pointer grid grid-cols-1 lg:grid-cols-12"
                >
                  <div className="lg:col-span-6 relative h-56 sm:h-72 lg:h-auto min-h-[260px] bg-stone-100 overflow-hidden">
                    <img
                      src={featuredItem.imageUrl || FALLBACK_IMAGE}
                      alt={t(featuredItem.titleBn, featuredItem.titleEn)}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#D62828] text-white text-[11px] font-bold shadow-md">
                      {t('শীর্ষ সংবাদ', 'Featured Update')}
                    </span>
                  </div>

                  <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span className={`px-2.5 py-1 rounded-full font-bold border ${getTypeBadge(featuredItem.type).cls}`}>
                          {getTypeBadge(featuredItem.type).label}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-stone-500 font-medium">
                          <CalendarDays className="w-3.5 h-3.5 text-[#D62828]" />
                          <span>{formatDate(featuredItem.dateBn, lang)}</span>
                        </span>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-black text-stone-900 leading-snug group-hover:text-[#D62828] transition-colors">
                        {t(featuredItem.titleBn, featuredItem.titleEn)}
                      </h2>

                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
                        {t(featuredItem.summaryBn, featuredItem.summaryEn) ||
                          t(featuredItem.contentBn || '', featuredItem.contentEn || '')}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs sm:text-sm font-bold text-[#D62828]">
                      <span>{t('সম্পূর্ণ প্রতিবেদন পড়ুন', 'Read Full Release')}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.article>
              )}

              {/* News & Events Cards Grid */}
              {gridItems.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {gridItems.map((n, idx) => {
                    const badge = getTypeBadge(n.type);
                    return (
                      <motion.article
                        key={n.id}
                        layout
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: idx * 0.04 }}
                        onClick={() => setSelectedNews(n)}
                        className="group rounded-2xl border border-stone-200/90 bg-white overflow-hidden shadow-2xs hover:shadow-lg hover:border-red-300 transition-all cursor-pointer flex flex-col justify-between"
                      >
                        <div>
                          <div className="relative h-48 w-full bg-stone-100 overflow-hidden">
                            <img
                              src={n.imageUrl || FALLBACK_IMAGE}
                              alt={t(n.titleBn, n.titleEn)}
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                              }}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold border shadow-xs ${badge.cls}`}>
                              {badge.label}
                            </span>
                          </div>

                          <div className="p-5 sm:p-6 space-y-2.5">
                            <div className="flex flex-wrap items-center gap-3 text-[11px] text-stone-500 font-medium">
                              <span className="inline-flex items-center gap-1">
                                <CalendarDays className="w-3.5 h-3.5 text-[#D62828]" />
                                <span>{formatDate(n.dateBn, lang)}</span>
                              </span>
                              {n.locationBn && (
                                <span className="inline-flex items-center gap-1 truncate">
                                  <MapPin className="w-3.5 h-3.5 text-[#D62828]" />
                                  <span className="truncate">{t(n.locationBn, n.locationEn)}</span>
                                </span>
                              )}
                            </div>

                            <h3 className="text-base sm:text-lg font-extrabold text-stone-900 leading-snug line-clamp-2 group-hover:text-[#D62828] transition-colors">
                              {t(n.titleBn, n.titleEn)}
                            </h3>

                            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
                              {t(n.summaryBn, n.summaryEn) || t(n.contentBn || '', n.contentEn || '')}
                            </p>
                          </div>
                        </div>

                        <div className="px-5 sm:px-6 py-3.5 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#D62828] bg-stone-50/50 group-hover:bg-red-50/50 transition-colors">
                          <span>{t('বিস্তারিত পড়ুন', 'Read Full Release')}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {/* Newsletter Box */}
          <div className="mt-10 sm:mt-14 rounded-3xl bg-gradient-to-br from-[#D62828] to-[#7f1d1d] p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-red-200 text-xs font-bold">
                <Mail className="w-3.5 h-3.5" />
                <span>{t('সরাসরি ইমেইলে রিপোর্ট গ্রহণ করুন', 'Email Newsletter')}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black">
                {t('আমাদের মানবিক কার্যক্রমের মাসিক বুলেটিন পেতে যুক্ত থাকুন', 'Subscribe to Monthly Humanitarian Activity Bulletin')}
              </h2>
              <p className="text-xs sm:text-sm text-red-100/90 leading-relaxed">
                {t(
                  'প্রতি মাসের ত্রাণ বিতরণ, আর্থিক অডিট ও ভবিষ্যৎ কর্মসূচির বিবরণ সরাসরি আপনার ইনবক্সে পৌঁছাবে।',
                  'Receive verified relief reports, audited financial breakdowns, and upcoming volunteer dates directly.'
                )}
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="w-full md:w-auto shrink-0">
              {subscribed ? (
                <div className="px-6 py-3 rounded-xl bg-white/20 text-white text-xs sm:text-sm font-bold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-red-300" />
                  <span>{t('ধন্যবাদ! আপনার ইমেইল যুক্ত হয়েছে।', 'Subscribed successfully!')}</span>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('আপনার ইমেইল এড্রেস...', 'Enter your email...')}
                    className="px-4 py-3 rounded-xl bg-white text-stone-900 placeholder:text-stone-400 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-red-300 w-full sm:w-64"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold text-xs sm:text-sm transition cursor-pointer shadow-md"
                  >
                    {t('সাবস্ক্রাইব', 'Subscribe')}
                  </button>
                </div>
              )}
            </form>
          </div>
        </section>
      </main>

      {/* Full News / Event Detail Modal */}
      {selectedNews && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setSelectedNews(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedNews(null)}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-stone-700 flex items-center justify-center shadow-md cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative h-56 sm:h-72 w-full bg-stone-100">
              <img
                src={selectedNews.imageUrl || FALLBACK_IMAGE}
                alt={t(selectedNews.titleBn, selectedNews.titleEn)}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                }}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className={`px-3 py-1 rounded-full font-bold border ${getTypeBadge(selectedNews.type).cls}`}>
                  {getTypeBadge(selectedNews.type).label}
                </span>
                <span className="inline-flex items-center gap-1.5 text-stone-500 font-medium">
                  <CalendarDays className="w-3.5 h-3.5 text-[#D62828]" />
                  <span>{formatDate(selectedNews.dateBn, lang)}</span>
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-stone-900 leading-snug">
                {t(selectedNews.titleBn, selectedNews.titleEn)}
              </h2>

              {selectedNews.summaryBn && (
                <p className="text-sm font-semibold text-stone-700 bg-[#FFF4F5] border-l-4 border-[#D62828] p-3.5 rounded-r-xl">
                  {t(selectedNews.summaryBn, selectedNews.summaryEn)}
                </p>
              )}

              <div className="text-sm sm:text-base text-stone-600 leading-relaxed whitespace-pre-line">
                {t(selectedNews.contentBn || selectedNews.summaryBn, selectedNews.contentEn || selectedNews.summaryEn)}
              </div>

              <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedNews(null);
                    setDonationModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D62828] hover:bg-[#B91C1C] text-white text-xs sm:text-sm font-bold shadow-sm cursor-pointer transition"
                >
                  <HeartHandshake className="w-4 h-4" />
                  <span>{t('এই উদ্যোগে অনুদান দিন', 'Support This Initiative')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedNews(null)}
                  className="px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold cursor-pointer transition"
                >
                  {t('বন্ধ করুন', 'Close')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer lang={lang} onOpenDonation={() => setDonationModalOpen(true)} />
      <MobileBottomBar lang={lang} onOpenDonation={() => setDonationModalOpen(true)} />
      <BackToTop />

      <DonationModal
        isOpen={donationModalOpen}
        onClose={() => setDonationModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
