'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  CalendarDays, 
  Sparkles, 
  Tag, 
  ArrowRight, 
  Bell, 
  Mail, 
  ShieldCheck
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import BackToTop from '@/components/BackToTop';
import AssistanceModal from '@/components/modals/AssistanceModal';
import DonationModal from '@/components/modals/DonationModal';
import { GlassSection, SectionHeading, glassCard, glassCardHover } from '@/components/ui/glass';
import { useGetNewsQuery } from '@/store/api/applicationsApi';
import { Language } from '@/types';

export default function NewsPage() {
  const [lang, setLang] = useState<Language>('bn');
  const [activeTab, setActiveTab] = useState<'all' | 'news' | 'event' | 'notice'>('all');
  const [assistanceModalOpen, setAssistanceModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { data: newsEvents = [], isLoading, isError } = useGetNewsQuery();

  const t = (bn: string, en: string) => (lang === 'bn' ? bn : en);

  const tabs = [
    { key: 'all' as const, labelBn: 'সকল সংবাদ', labelEn: 'All Updates' },
    { key: 'news' as const, labelBn: 'প্রেস বিজ্ঞপ্তি', labelEn: 'Press News' },
    { key: 'event' as const, labelBn: 'আসন্ন ইভেন্ট', labelEn: 'Upcoming Events' },
    { key: 'notice' as const, labelBn: 'জরুরি ঘোষণা', labelEn: 'Urgent Notices' },
  ];

  const filteredNews = newsEvents.filter((item) => {
    if (activeTab === 'all') return true;
    return item.type === activeTab;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1E293B]">
      <Navbar 
        lang={lang} 
        onToggleLang={() => setLang(l => l === 'bn' ? 'en' : 'bn')} 
        onOpenDonation={() => setDonationModalOpen(true)}
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
                <Bell className="w-3.5 h-3.5 text-[#E53935]" />
                <span>{t('অফিসিয়াল সংবাদ, কর্মসূচি ও প্রেস বিজ্ঞপ্তি', 'Official Press Releases & Event Announcements')}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-4">
                {t('সংবাদ, কার্যক্রম ও আগামী দিনের কর্মসূচি', 'News, Announcements & Events')}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-stone-600 leading-relaxed font-normal">
                {t(
                  'রৌমারী জনকল্যাণ ফাউন্ডেশনের চলমান মানবিক উদ্যোগ, ত্রাণ বিতরণ প্রতিবেদন এবং আসন্ন ফ্রি চিকিৎসা ক্যাম্পের সর্বশেষ আপডেট।',
                  'Stay informed with verified reports on relief drives, free doctor clinics, education aid, and upcoming char community assemblies.'
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

        {/* News Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? <p className="col-span-full py-12 text-center">{t('লোড হচ্ছে…', 'Loading news and events…')}</p> : null}
            {isError ? <p role="alert" className="col-span-full py-12 text-center">{t('খবর লোড করা যায়নি।', 'News and events could not be loaded.')}</p> : null}
            {!isLoading && !isError && filteredNews.length === 0 ? <p className="col-span-full py-12 text-center">{t('কোনো খবর পাওয়া যায়নি।', 'No news or events are currently available.')}</p> : null}
            {filteredNews.map((n, idx) => (
              <motion.article
                key={n.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className={`${glassCardHover} p-6 sm:p-7 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-[#E53935]/10 text-[#E53935] font-bold">
                      {n.type === 'news' ? t('প্রেস রিলিজ', 'Press Release') :
                       n.type === 'event' ? t('আসন্ন ইভেন্ট', 'Upcoming Event') : t('জরুরি ঘোষণা', 'Notice')}
                    </span>
                    <span className="flex items-center gap-1.5 text-stone-500 font-medium">
                      <CalendarDays className="w-3.5 h-3.5" />
                      <span>{t(n.dateBn, n.dateEn)}</span>
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-stone-900 leading-snug mb-3">
                    {t(n.titleBn, n.titleEn)}
                  </h2>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                    {t(n.summaryBn, n.summaryEn)}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-200/70 flex items-center justify-between text-xs font-bold text-[#D62828]">
                  <span>{t('বিস্তারিত পড়ুন', 'Read Full Release')}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.article>
            ))}
          </div>

          {/* Newsletter Box */}
          <div className="mt-12 sm:mt-16 rounded-3xl bg-gradient-to-br from-[#D62828] to-[#08351f] p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-red-200 text-xs font-bold">
                <Mail className="w-3.5 h-3.5" />
                <span>{t('সরাসরি ইমেইলে রিপোর্ট গ্রহণ করুন', 'Email Newsletter')}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black">
                {t('আমাদের মানবিক কার্যক্রমের মাসিক বুলেটিন পেতে যুক্ত থাকুন', 'Subscribe to Monthly Humanitarian Activity Bulletin')}
              </h2>
              <p className="text-xs sm:text-sm text-red-100/90 leading-relaxed">
                {t('প্রতি মাসের ত্রাণ বিতরণ, আর্থিক অডিট ও ভবিষ্যৎ কর্মসূচির বিবরণ সরাসরি আপনার ইনবক্সে পৌঁছাবে।', 'Receive verified relief reports, audited financial breakdowns, and upcoming volunteer dates directly.')}
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

      <Footer 
        lang={lang} 
        onOpenAssistance={() => setAssistanceModalOpen(true)}
        onOpenDonation={() => setDonationModalOpen(true)}
      />

      <MobileBottomBar
        lang={lang}
        onOpenAssistance={() => setAssistanceModalOpen(true)}
        onOpenDonation={() => setDonationModalOpen(true)}
      />

      <BackToTop />

      <AssistanceModal
        isOpen={assistanceModalOpen}
        onClose={() => setAssistanceModalOpen(false)}
        lang={lang}
      />

      <DonationModal
        isOpen={donationModalOpen}
        onClose={() => setDonationModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
