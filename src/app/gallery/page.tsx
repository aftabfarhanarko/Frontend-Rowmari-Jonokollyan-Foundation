'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Calendar, 
  X
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import AssistanceModal from '@/components/modals/AssistanceModal';
import DonationModal from '@/components/modals/DonationModal';
import { GALLERY_ITEMS } from '@/data/mockData';
import { Language } from '@/types';

export default function GalleryPage() {
  const [lang, setLang] = useState<Language>('bn');
  const [selectedTag, setSelectedTag] = useState('all');
  const [previewItem, setPreviewItem] = useState<typeof GALLERY_ITEMS[0] | null>(null);
  const [assistanceModalOpen, setAssistanceModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);

  const tags = [
    { key: 'all', labelBn: 'সব', labelEn: 'All' },
    { key: 'winter', labelBn: 'শীতবস্ত্র', labelEn: 'Winter' },
    { key: 'medical', labelBn: 'ক্যাম্প', labelEn: 'Camp' },
    { key: 'blood', labelBn: 'রক্তদান', labelEn: 'Blood' },
    { key: 'education', labelBn: 'শিক্ষা', labelEn: 'Education' },
    { key: 'flood', labelBn: 'ত্রাণ', labelEn: 'Relief' },
  ];

  const filteredItems = selectedTag === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === selectedTag);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1E293B]">
      <Navbar 
        lang={lang} 
        onToggleLang={() => setLang(l => l === 'bn' ? 'en' : 'bn')} 
        onOpenDonation={() => setDonationModalOpen(true)}
      />

      <main className="flex-1 pb-24 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          
          {/* Header Title Matching Wireframe */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#E53935] tracking-tight mb-2">
              {lang === 'bn' ? 'গ্যালারি' : 'Gallery'}
            </h1>
            <p className="text-sm sm:text-base text-stone-500 font-medium">
              {lang === 'bn'
                ? 'রৌমারী জনকল্যাণ ফাউন্ডেশনের মাঠপর্যায়ের বাস্তব স্থিরচিত্র ও কার্যক্রম'
                : 'Real photographic archives of humanitarian relief operations in Rowmari'}
            </p>
          </div>

          {/* Filter Pills Matching Wireframe */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {tags.map((t) => (
              <button
                key={t.key}
                onClick={() => setSelectedTag(t.key)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedTag === t.key
                    ? 'bg-[#0D5C35] text-white shadow-sm'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {lang === 'bn' ? t.labelBn : t.labelEn}
              </button>
            ))}
          </div>

          {/* Gallery Grid Matching Wireframe (2-Col / 3-Col Photographic layout) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setPreviewItem(item)}
                className="group relative aspect-4/5 sm:aspect-square bg-stone-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer border border-stone-200/80"
              >
                <Image
                  src={item.imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop'}
                  alt={lang === 'bn' ? item.titleBn : item.titleEn}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                
                {/* Gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                {/* Tag Badge */}
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className="bg-[#E53935] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                    {lang === 'bn' ? item.tagBn : item.tagEn}
                  </span>
                </div>

                {/* Bottom title info */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white z-10">
                  <h3 className="text-xs sm:text-sm font-bold line-clamp-2 leading-tight drop-shadow-xs">
                    {lang === 'bn' ? item.titleBn : item.titleEn}
                  </h3>
                  <p className="text-[10px] text-stone-300 mt-1 flex items-center gap-1">
                    <Calendar className="w-2.5 h-2.5 text-red-200" />
                    <span>{lang === 'bn' ? item.dateBn : item.dateEn}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Privacy Footnote Matching Wireframe Screenshot */}
          <div className="mt-10 text-center">
            <p className="text-xs text-stone-500 font-medium">
              {lang === 'bn' 
                ? 'রোগীর পরিচয় বা স্বাস্থ্যতথ্য প্রকাশ করা হয় না।' 
                : 'Beneficiary identity and confidential health details are strictly protected.'}
            </p>
          </div>

        </div>
      </main>

      {/* Lightbox Modal */}
      {previewItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
          onClick={() => setPreviewItem(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 text-center relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewItem(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 transition cursor-pointer z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-16/10 rounded-xl overflow-hidden mb-4 bg-stone-100">
              <Image
                src={previewItem.imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop'}
                alt={lang === 'bn' ? previewItem.titleBn : previewItem.titleEn}
                fill
                className="object-cover"
              />
            </div>

            <div className="inline-block bg-[#E53935] text-white text-xs font-bold px-2.5 py-0.5 rounded mb-2">
              {lang === 'bn' ? previewItem.tagBn : previewItem.tagEn}
            </div>

            <h3 className="text-lg font-bold text-stone-900 mb-2">
              {lang === 'bn' ? previewItem.titleBn : previewItem.titleEn}
            </h3>

            <p className="text-xs text-stone-400 mb-4 flex items-center justify-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              <span>{lang === 'bn' ? previewItem.dateBn : previewItem.dateEn}</span>
            </p>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => {
                  setPreviewItem(null);
                  setDonationModalOpen(true);
                }}
                className="w-full py-2.5 rounded-xl bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold text-xs transition cursor-pointer"
              >
                {lang === 'bn' ? 'অনুদান দিন' : 'Donate'}
              </button>
            </div>
          </div>
        </div>
      )}

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
