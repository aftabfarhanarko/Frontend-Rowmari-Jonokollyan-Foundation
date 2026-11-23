'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ACTIVITIES_DATA } from '@/data/mockData';
import { Language, ActivityCategory, ActivityItem } from '@/types';

export default function ActivitiesPage() {
  const [lang, setLang] = useState<Language>('bn');
  const [activeCategory, setActiveCategory] = useState<ActivityCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);

  const categories = [
    { key: 'all' as ActivityCategory, labelBn: 'সকল কার্যক্রম', labelEn: 'All Activities' },
    { key: 'winter' as ActivityCategory, labelBn: 'শীতবস্ত্র বিতরণ', labelEn: 'Winter Relief' },
    { key: 'medical' as ActivityCategory, labelBn: 'মেডিকেল ক্যাম্প', labelEn: 'Medical Camps' },
    { key: 'education' as ActivityCategory, labelBn: 'শিক্ষা সহায়তা', labelEn: 'Education Aid' },
    { key: 'emergency' as ActivityCategory, labelBn: 'জরুরি রক্তদান', labelEn: 'Blood Support' },
    { key: 'food' as ActivityCategory, labelBn: 'খাদ্য সহায়তা', labelEn: 'Food Aid' },
  ];

  const filteredActivities = ACTIVITIES_DATA.filter((act) => {
    const matchesCategory = activeCategory === 'all' || act.category === activeCategory;
    const matchesQuery =
      act.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.locationBn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBF9] text-[#1E293B]">
      <Navbar lang={lang} onToggleLang={() => setLang(l => l === 'bn' ? 'en' : 'bn')} />

      <main className="flex-1">
        {/* Banner */}
        <section className="bg-gradient-to-b from-emerald-900 to-[#0A4F2E] text-white py-16 md:py-20 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold mb-3 border border-emerald-700">
              {lang === 'bn' ? 'মাঠপর্যায়ের মানবিক উদ্যোগ' : 'Field Initiatives'}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              {lang === 'bn' ? 'আমাদের সকল কার্যক্রম' : 'Our Activities & Projects'}
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              {lang === 'bn'
                ? 'রৌমারীর চরাঞ্চল ও নদীভাঙনে ক্ষতিগ্রস্ত মানুষের পাশে শীতবস্ত্র, খাদ্য, চিকিৎসা ও শিক্ষা সহায়তা।'
                : 'Comprehensive overview of verified relief drives and health programs conducted in Rowmari.'}
            </p>
          </div>
        </section>

        {/* Filter and Content Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Search and Filters Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                      activeCategory === cat.key
                        ? 'bg-emerald-800 text-white shadow-sm'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {lang === 'bn' ? cat.labelBn : cat.labelEn}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="w-full md:w-72">
                <input
                  type="text"
                  placeholder={lang === 'bn' ? 'কার্যক্রম বা স্থান দিয়ে খুঁজুন...' : 'Search by title or place...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-700 bg-white"
                />
              </div>
            </div>

            {/* Activities Grid */}
            {filteredActivities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredActivities.map((act) => (
                  <div
                    key={act.id}
                    className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
                  >
                    <div>
                      {/* Placeholder Card Art */}
                      <div className="aspect-16/10 bg-emerald-950/10 flex flex-col items-center justify-center p-6 text-center relative">
                        <span className="text-5xl mb-2">
                          {act.category === 'winter' ? '🧣' : act.category === 'medical' ? '🩺' : act.category === 'education' ? '📚' : act.category === 'emergency' ? '🩸' : '🌾'}
                        </span>
                        <span className="text-xs font-mono text-stone-600 font-semibold">[রৌমারী জনকল্যাণ মাঠকর্ম]</span>
                        <div className="absolute top-3 right-3 bg-red-700 text-white text-[11px] font-bold px-2.5 py-0.5 rounded shadow-xs">
                          {lang === 'bn' ? act.categoryBn : act.categoryEn}
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="text-xs text-stone-500 mb-2">📅 {lang === 'bn' ? act.dateBn : act.dateEn}</div>
                        <h3 className="text-lg font-bold text-stone-900 leading-snug mb-3">
                          {lang === 'bn' ? act.titleBn : act.titleEn}
                        </h3>
                        <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed mb-4">
                          {lang === 'bn' ? act.descriptionBn : act.descriptionEn}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-0 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 mt-2">
                      <span className="font-medium text-emerald-800 truncate max-w-[170px]">📍 {lang === 'bn' ? act.locationBn : act.locationEn}</span>
                      <button
                        onClick={() => setSelectedActivity(act)}
                        className="text-emerald-800 font-bold hover:underline cursor-pointer"
                      >
                        {lang === 'bn' ? 'বিস্তারিত →' : 'Details →'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
                <span className="text-4xl block mb-2">🔍</span>
                <p className="text-stone-500 text-sm font-medium">
                  {lang === 'bn' ? 'কোনো কার্যক্রম খুঁজে পাওয়া যায়নি।' : 'No activities matched your search.'}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Modal View for Activity */}
        {selectedActivity && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
            onClick={() => setSelectedActivity(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedActivity(null)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 text-lg w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center"
              >
                ✕
              </button>
              <span className="inline-block bg-red-700 text-white text-xs font-bold px-2.5 py-1 rounded-md mb-2">
                {lang === 'bn' ? selectedActivity.categoryBn : selectedActivity.categoryEn} • {lang === 'bn' ? selectedActivity.dateBn : selectedActivity.dateEn}
              </span>
              <h3 className="text-xl font-bold text-stone-900 mb-3">
                {lang === 'bn' ? selectedActivity.titleBn : selectedActivity.titleEn}
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed mb-4">
                {lang === 'bn' ? selectedActivity.descriptionBn : selectedActivity.descriptionEn}
              </p>
              <div className="p-3 bg-stone-50 rounded-xl text-xs space-y-1 mb-6 border border-stone-200">
                <p>📍 <strong>স্থান:</strong> {selectedActivity.locationBn}</p>
                <p>👥 <strong>সুবিধাভোগী সংখ্যা:</strong> {selectedActivity.beneficiariesCount} জন মানুষ</p>
                <p>✓ <strong>তত্ত্বাবধানে:</strong> রৌমারী জনকল্যাণ ফাউন্ডেশন কার্যনির্বাহী কমিটি</p>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setSelectedActivity(null)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold"
                >
                  {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
                </button>
                <Link
                  href="/get-help"
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-semibold"
                >
                  {lang === 'bn' ? 'সহায়তার আবেদন করুন' : 'Request Assistance'}
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer lang={lang} />
    </div>
  );
}
