'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Eye, 
  Heart,
  ArrowRight
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { PageBanner } from '@/components/layout/PageBanner';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import BackToTop from '@/components/BackToTop';
import { GlassSection, SectionHeading, glassCard, glassCardHover } from '@/components/ui/glass';
import { GALLERY_ITEMS } from '@/data/mockData';
import { Language } from '@/types';
import { useGetGalleryQuery } from '@/store/api/contentApi';
import { SkeletonCard } from '@/components/ui/skeleton';

export default function GalleryPage() {
  const [lang, setLang] = useState<Language>('bn');
  const [selectedTag, setSelectedTag] = useState('all');
  const { data: galleryRes, isLoading } = useGetGalleryQuery();
  const backendItems = Array.isArray(galleryRes) ? galleryRes : (galleryRes as any)?.items || [];

  const liveItems = backendItems.length > 0
    ? backendItems.map((item: any) => ({
        id: item.id,
        category: (item.category || 'general').toLowerCase(),
        titleBn: item.title,
        titleEn: item.title,
        locationBn: item.caption || 'রৌমারী, কুড়িগ্রাম',
        locationEn: item.caption || 'Rowmari, Kurigram',
        dateBn: new Date(item.date || item.createdAt || Date.now()).toLocaleDateString('bn-BD'),
        dateEn: new Date(item.date || item.createdAt || Date.now()).toLocaleDateString('en-US'),
        imageUrl: item.imageUrl,
      }))
    : GALLERY_ITEMS;

  const [previewItem, setPreviewItem] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  const t = (bn: string, en: string) => (lang === 'bn' ? bn : en);

  const tags = [
    { key: 'all', labelBn: 'সকল স্থিরচিত্র', labelEn: 'All Photos' },
    { key: 'winter', labelBn: 'শীতবস্ত্র বিতরণ', labelEn: 'Winter Relief' },
    { key: 'medical', labelBn: 'ফ্রি মেডিকেল ক্যাম্প', labelEn: 'Medical Camps' },
    { key: 'welfare', labelBn: 'জরুরি পুনর্বাসন', labelEn: 'Emergency Relief' },
    { key: 'education', labelBn: 'শিক্ষা উপবৃত্তি', labelEn: 'Char Education' },
    { key: 'flood', labelBn: 'বন্যা ও ত্রাণ পুনর্বাসন', labelEn: 'Flood Relief' },
  ];

  const filteredItems = selectedTag === 'all'
    ? liveItems
    : liveItems.filter((item: any) => item.category === selectedTag);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1E293B]">
      <Navbar 
        lang={lang} 
        onToggleLang={() => setLang(l => l === 'bn' ? 'en' : 'bn')} 
      />

      <main className="flex-1 pb-20 sm:pb-24">
        <PageBanner
          badge={t('মাঠপর্যায়ের মানবিক কার্যক্রমের বাস্তব ফটো আর্কাইভ', 'Verified Real Fieldwork Photographic Archive')}
          title={t('রৌমারী ও চরাঞ্চলের বাস্তব চিত্র গ্যালারি', 'Humanitarian Action Across Rowmari')}
          subtitle={t(
            'কনকনে শীতে ব্রহ্মপুত্র চরে কম্বল বিতরণ থেকে শুরু করে মেডিকেল ক্যাম্প, বন্যা ত্রাণ ও শিক্ষার্থীদের বই বিতরণ—আমাদের মাঠপর্যায়ের কার্যক্রমের প্রামাণ্য চিত্র।',
            'High-resolution field photographs documenting winter warmth drives, free doctor clinics, river island flood rescue, and children education scholarships.'
          )}
        />

        {/* Filter Pills */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 flex flex-wrap items-center gap-2">
          {tags.map((tag) => (
            <button
              key={tag.key}
              onClick={() => setSelectedTag(tag.key)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedTag === tag.key
                  ? 'bg-[#D62828] text-white shadow-sm'
                  : 'bg-[#FFF4F5] text-stone-700 hover:bg-red-100/70'
              }`}
            >
              {t(tag.labelBn, tag.labelEn)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="flex items-center justify-between text-xs sm:text-sm text-stone-500 mb-6 font-medium">
            <span>{t(`${filteredItems.length} টি স্থিরচিত্র সংরক্ষিত`, `${filteredItems.length} photos in archive`)}</span>
            <div className="flex items-center gap-1.5 text-[#D62828] font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>{t('শতভাগ প্রকৃত মাঠপর্যায়ের ছবি', 'Authentic On-site Documentation')}</span>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} variant="gallery" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filteredItems.map((item: any, idx: number) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  onClick={() => setPreviewItem(item)}
                  className={`${glassCardHover} overflow-hidden cursor-pointer group flex flex-col justify-between`}
                >
                <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-stone-100">
                  <Image
                    src={item.imageUrl || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80'}
                    alt={t(item.titleBn, item.titleEn)}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />
                  
                  {/* Category chip */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold text-white bg-[#D62828] shadow-md backdrop-blur-md">
                      {item.category === 'winter' ? t('শীতবস্ত্র', 'Winter') :
                       item.category === 'medical' ? t('চিকিৎসা', 'Medical') :
                       item.category === 'education' ? t('শিক্ষা', 'Education') :
                       item.category === 'welfare' ? t('পুনর্বাসন', 'Relief') : t('ত্রাণ', 'Relief')}
                    </span>
                  </div>

                  {/* Hover view overlay icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <span className="p-3 rounded-full bg-white/25 backdrop-blur-md border border-white/40 text-white shadow-xl">
                      <Eye className="w-6 h-6" />
                    </span>
                  </div>

                  {/* Bottom title and location */}
                  <div className="absolute bottom-4 left-4 right-4 text-white z-10 space-y-1">
                    <div className="flex items-center justify-between text-xs text-stone-200">
                      <span className="inline-flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20">
                        <MapPin className="w-3 h-3 text-red-400 shrink-0" />
                        <span className="truncate max-w-[140px]">{t(item.locationBn || 'রৌমারী, কুড়িগ্রাম', item.locationEn || 'Rowmari, Kurigram')}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20">
                        <Calendar className="w-3 h-3 text-white/80 shrink-0" />
                        <span>{t(item.dateBn, item.dateEn)}</span>
                      </span>
                    </div>

                    <h2 className="text-base font-bold text-white leading-snug drop-shadow-md">
                      {t(item.titleBn, item.titleEn)}
                    </h2>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          )}
        </section>
      </main>

      {/* Lightbox Photo Preview Modal */}
      <AnimatePresence>
        {previewItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl bg-stone-950 text-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 max-h-[90vh] flex flex-col"
            >
              <button
                onClick={() => setPreviewItem(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md transition cursor-pointer border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full h-80 sm:h-96 md:h-[450px]">
                <Image
                  src={previewItem.imageUrl || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80'}
                  alt={t(previewItem.titleBn, previewItem.titleEn)}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="p-6 bg-stone-900 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-400">
                  <span className="px-2.5 py-1 rounded bg-[#D62828] text-white font-bold">
                    {t(previewItem.locationBn || 'রৌমারী, কুড়িগ্রাম', previewItem.locationEn || 'Rowmari, Kurigram')}
                  </span>
                  <span>{t(previewItem.dateBn, previewItem.dateEn)}</span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-white">
                  {t(previewItem.titleBn, previewItem.titleEn)}
                </h2>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    href="/donate"
                    className="flex-1 py-3 rounded-xl bg-[#D62828] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm transition cursor-pointer text-center shadow-md flex items-center justify-center gap-1.5"
                  >
                    <span>{t('অনুদান দিন', 'Donate to RJF')}</span>
                  </Link>
                  <Link
                    href="/volunteer"
                    className="px-5 py-3 rounded-xl border border-stone-200 bg-white hover:bg-stone-100 text-stone-800 font-bold text-xs sm:text-sm transition cursor-pointer text-center flex items-center justify-center gap-1.5"
                  >
                    <span>{t('স্বেচ্ছাসেবক হন', 'Volunteer')}</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer lang={lang} />
      <MobileBottomBar lang={lang} />
      <BackToTop />
    </div>
  );
}
