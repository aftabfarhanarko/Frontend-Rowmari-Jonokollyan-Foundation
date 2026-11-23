'use client';

import React, { useState } from 'react';
import { Language, ActivityCategory, ActivityItem } from '@/types';
import { ACTIVITIES_DATA } from '@/data/mockData';

interface RecentActivitiesProps {
  lang: Language;
  onOpenAssistance: () => void;
}

export default function RecentActivities({
  lang,
  onOpenAssistance,
}: RecentActivitiesProps) {
  const [activeCategory, setActiveCategory] = useState<ActivityCategory>('all');
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);

  const categories = [
    { key: 'all' as ActivityCategory, labelBn: 'সকল কার্যক্রম', labelEn: 'All Activities' },
    { key: 'winter' as ActivityCategory, labelBn: 'শীতবস্ত্র বিতরণ', labelEn: 'Winter Relief' },
    { key: 'medical' as ActivityCategory, labelBn: 'মেডিকেল ক্যাম্প', labelEn: 'Medical Camp' },
    { key: 'education' as ActivityCategory, labelBn: 'শিক্ষা সহায়তা', labelEn: 'Education Aid' },
    { key: 'emergency' as ActivityCategory, labelBn: 'জরুরি রক্তদান', labelEn: 'Blood Donation' },
    { key: 'food' as ActivityCategory, labelBn: 'খাদ্য সহায়তা', labelEn: 'Food Aid' },
  ];

  const filteredActivities =
    activeCategory === 'all'
      ? ACTIVITIES_DATA
      : ACTIVITIES_DATA.filter((act) => act.category === activeCategory);

  return (
    <section id="activities" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching wireframe with "সব দেখুন" button on right */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0D5C35] tracking-tight">
              {lang === 'bn' ? 'সাম্প্রতিক কার্যক্রম' : 'Recent Activities'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {lang === 'bn'
                ? 'রৌমারী ও দুর্গম চরাঞ্চলের মানুষের জন্য আমাদের মাঠপর্যায়ের উদ্যোগ'
                : 'Our verified field projects serving vulnerable families in Kurigram'}
            </p>
          </div>

          <button
            onClick={() => setActiveCategory('all')}
            className="text-xs sm:text-sm font-semibold text-emerald-800 hover:text-emerald-950 underline underline-offset-4 self-start sm:self-auto cursor-pointer"
          >
            {lang === 'bn' ? 'সব দেখুন →' : 'View All →'}
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
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

        {/* 3-Column Activities Grid matching the wireframe */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredActivities.slice(0, 6).map((activity) => (
            <div
              key={activity.id}
              className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                {/* Image Placeholder with realistic charity aesthetic matching wireframe */}
                <div className="relative aspect-16/10 bg-stone-100 overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent z-10" />

                  {/* Iconography placeholder */}
                  <div className="w-full h-full bg-emerald-950/10 flex flex-col items-center justify-center p-4 text-center group-hover:scale-105 transition-transform duration-300">
                    <span className="text-4xl mb-1">
                      {activity.category === 'winter'
                        ? '🧣'
                        : activity.category === 'medical'
                        ? '🩺'
                        : activity.category === 'education'
                        ? '📚'
                        : activity.category === 'emergency'
                        ? '🩸'
                        : '🌾'}
                    </span>
                    <span className="text-[11px] font-mono text-stone-500 font-medium">
                      [রৌমারী জনকল্যাণ মাঠকর্ম চিত্র]
                    </span>
                  </div>

                  {/* Category Pill Tag matching wireframe: শীতবস্ত্র • [তারিখ] */}
                  <div className="absolute bottom-3 left-3 z-20">
                    <span className="inline-block bg-red-700 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-xs">
                      {lang === 'bn' ? activity.categoryBn : activity.categoryEn} • {lang === 'bn' ? activity.dateBn : activity.dateEn}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition line-clamp-2 leading-snug mb-2">
                    {lang === 'bn' ? activity.titleBn : activity.titleEn}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed mb-4">
                    {lang === 'bn' ? activity.descriptionBn : activity.descriptionEn}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 pb-5 pt-0 flex items-center justify-between text-xs text-stone-500 border-t border-stone-100 mt-2">
                <span className="flex items-center gap-1 text-emerald-800 font-medium">
                  <span>📍</span>
                  <span className="truncate max-w-[150px]">
                    {lang === 'bn' ? activity.locationBn : activity.locationEn}
                  </span>
                </span>

                <button
                  onClick={() => setSelectedActivity(activity)}
                  className="text-emerald-800 font-bold hover:text-emerald-950 hover:underline cursor-pointer"
                >
                  {lang === 'bn' ? 'বিস্তারিত →' : 'Details →'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for detailed activity view */}
        {selectedActivity && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
            onClick={() => setSelectedActivity(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 relative"
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
                <p>✓ <strong>যাচাইকরণ:</strong> রৌমারী জনকল্যাণ ফাউন্ডেশন এক্সিকিউটিভ টিম</p>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setSelectedActivity(null)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold"
                >
                  {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
                </button>
                <button
                  onClick={() => {
                    setSelectedActivity(null);
                    onOpenAssistance();
                  }}
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-semibold"
                >
                  {lang === 'bn' ? 'সহায়তা চান?' : 'Need Help?'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
