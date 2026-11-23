'use client';

import React, { useState } from 'react';
import { 
  Snowflake, 
  Stethoscope, 
  Droplet, 
  GraduationCap, 
  Wheat, 
  Users, 
  Calendar, 
  Camera, 
  X 
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { GALLERY_ITEMS } from '@/data/mockData';
import { Language } from '@/types';

export default function GalleryPage() {
  const [lang, setLang] = useState<Language>('bn');
  const [selectedTag, setSelectedTag] = useState('all');
  const [previewItem, setPreviewItem] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  const tags = [
    { key: 'all', labelBn: 'সকল ছবি', labelEn: 'All Photos' },
    { key: 'winter', labelBn: 'শীতবস্ত্র বিতরণ', labelEn: 'Winter Relief' },
    { key: 'medical', labelBn: 'মেডিকেল ক্যাম্প', labelEn: 'Health Camps' },
    { key: 'blood', labelBn: 'রক্তদান কর্মসূচি', labelEn: 'Blood Drives' },
    { key: 'education', labelBn: 'শিক্ষা সহায়তা', labelEn: 'Education' },
    { key: 'flood', labelBn: 'বন্যা ও ত্রাণ', labelEn: 'Flood Relief' },
  ];

  const filteredItems = selectedTag === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === selectedTag);

  const getGalleryIcon = (cat: string) => {
    switch (cat) {
      case 'winter':
        return <Snowflake className="w-12 h-12 text-cyan-700 mb-2" />;
      case 'medical':
        return <Stethoscope className="w-12 h-12 text-emerald-700 mb-2" />;
      case 'blood':
        return <Droplet className="w-12 h-12 text-red-600 mb-2" />;
      case 'education':
        return <GraduationCap className="w-12 h-12 text-blue-700 mb-2" />;
      case 'flood':
        return <Wheat className="w-12 h-12 text-amber-700 mb-2" />;
      default:
        return <Users className="w-12 h-12 text-emerald-700 mb-2" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBF9] text-[#1E293B]">
      <Navbar lang={lang} onToggleLang={() => setLang(l => l === 'bn' ? 'en' : 'bn')} />

      <main className="flex-1">
        {/* Banner */}
        <section className="bg-gradient-to-b from-emerald-900 to-[#0A4F2E] text-white py-16 md:py-20 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold mb-3 border border-emerald-700">
              {lang === 'bn' ? 'কার্যক্রমভিত্তিক স্থিরচিত্র' : 'Photo Gallery'}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              {lang === 'bn' ? 'আমাদের ফটো গ্যালারি' : 'Humanitarian Photo Gallery'}
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              {lang === 'bn'
                ? 'রৌমারীর চরবাসীর মুখে হাসি ফোটানোর বাস্তব চিত্র ও মাঠপর্যায়ের কার্যক্রম।'
                : 'Real moments captured from our field relief drives and medical camps.'}
            </p>
          </div>
        </section>

        {/* Gallery Content */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filter Pills */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
              {tags.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setSelectedTag(t.key)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                    selectedTag === t.key
                      ? 'bg-emerald-800 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {lang === 'bn' ? t.labelBn : t.labelEn}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setPreviewItem(item)}
                  className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div className="aspect-4/3 bg-stone-100 flex flex-col items-center justify-center p-6 relative group-hover:scale-105 transition-transform duration-300">
                    {getGalleryIcon(item.category)}
                    <span className="text-xs font-mono text-stone-500 font-semibold">[রৌমারী জনকল্যাণ ফটো]</span>
                    <div className="absolute top-3 left-3 bg-red-700 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {lang === 'bn' ? item.tagBn : item.tagEn}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-sm sm:text-base font-bold text-stone-900 group-hover:text-emerald-800 transition line-clamp-2 leading-snug mb-1">
                      {lang === 'bn' ? item.titleBn : item.titleEn}
                    </h3>
                    <p className="text-xs text-stone-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      <span>{lang === 'bn' ? item.dateBn : item.dateEn}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox Modal */}
        {previewItem && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
            onClick={() => setPreviewItem(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 text-center relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setPreviewItem(null)}
                aria-label="Close"
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 text-lg w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4 text-stone-600" />
              </button>
              <div className="aspect-16/10 bg-emerald-950/10 rounded-xl flex flex-col items-center justify-center mb-4 text-center">
                <Camera className="w-16 h-16 text-emerald-800 mb-2" />
                <span className="text-xs text-stone-500 font-mono">[উচ্চ রেজোলিউশন ফটো ভিউ]</span>
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-1">
                {lang === 'bn' ? previewItem.titleBn : previewItem.titleEn}
              </h3>
              <p className="text-xs text-emerald-800 font-semibold mb-4">
                {lang === 'bn' ? previewItem.tagBn : previewItem.tagEn} • {lang === 'bn' ? previewItem.dateBn : previewItem.dateEn}
              </p>
              <p className="text-xs text-stone-500">
                {lang === 'bn'
                  ? 'উপকারভোগীদের সম্মান ও সম্মতি নিশ্চিত করে এই স্থিরচিত্রটি সংরক্ষিত হয়েছে।'
                  : 'Image archived in accordance with foundation ethical documentation standards.'}
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer lang={lang} />
    </div>
  );
}
