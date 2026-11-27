'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MapPin, 
  Calendar, 
  ArrowRight, 
  X,
  Users,
  CheckCircle2,
  Heart
} from 'lucide-react';
import { Language, ActivityCategory, ActivityItem } from '@/types';
import { useGetActivitiesQuery } from '@/store/api/activitiesApi';

interface RecentActivitiesProps {
  lang: Language;
  onOpenAssistance?: () => void;
}

export default function RecentActivities({
  lang,
  onOpenAssistance,
}: RecentActivitiesProps) {
  const [activeCategory, setActiveCategory] = useState<ActivityCategory>('all');
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);
  const { data: activities = [], isLoading, isError } = useGetActivitiesQuery();

  const categories = [
    { key: 'all' as ActivityCategory, labelBn: 'সকল কার্যক্রম', labelEn: 'All Activities' },
    { key: 'winter' as ActivityCategory, labelBn: 'শীতবস্ত্র বিতরণ', labelEn: 'Winter Relief' },
    { key: 'medical' as ActivityCategory, labelBn: 'মেডিকেল ক্যাম্প', labelEn: 'Medical Camp' },
    { key: 'education' as ActivityCategory, labelBn: 'শিক্ষা সহায়তা', labelEn: 'Education Aid' },
    { key: 'emergency' as ActivityCategory, labelBn: 'জরুরি পুনর্বাসন', labelEn: 'Emergency Relief' },
    { key: 'food' as ActivityCategory, labelBn: 'খাদ্য সহায়তা', labelEn: 'Food Aid' },
  ];

  const filteredActivities =
    activeCategory === 'all'
      ? activities
      : activities.filter((act) => act.category === activeCategory);

  return (
    <section id="activities" className="py-10 md:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#E53935] tracking-tight">
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
            className="text-xs sm:text-sm font-semibold text-[#D62828] hover:text-[#B91C1C] underline underline-offset-4 self-start sm:self-auto cursor-pointer flex items-center gap-1"
          >
            <span>{lang === 'bn' ? 'সব দেখুন' : 'View All'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
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
                  ? 'bg-[#D62828] text-white shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {lang === 'bn' ? cat.labelBn : cat.labelEn}
            </button>
          ))}
        </div>

        {/* 3-Column Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {isLoading ? <p className="col-span-full text-center">Loading activities…</p> : null}
          {isError ? <p role="alert" className="col-span-full text-center">Activities could not be loaded.</p> : null}
          {filteredActivities.slice(0, 6).map((activity) => (
            <div
              key={activity.id}
              className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                {/* Visual Header */}
                <div className="relative aspect-16/10 bg-stone-100 overflow-hidden flex items-center justify-center">
                  <Image
                    src={activity.imageUrl || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop'}
                    alt={lang === 'bn' ? activity.titleBn : activity.titleEn}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent z-10" />

                  {/* Category Pill Tag */}
                  <div className="absolute bottom-3 left-3 z-20">
                    <span className="inline-flex items-center gap-1.5 bg-[#E53935] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-xs">
                      <span>{lang === 'bn' ? activity.categoryBn : activity.categoryEn}</span>
                      <span>•</span>
                      <Calendar className="w-3 h-3 text-red-100" />
                      <span>{lang === 'bn' ? activity.dateBn : activity.dateEn}</span>
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-stone-900 group-hover:text-[#E53935] transition line-clamp-2 leading-snug mb-2">
                    {lang === 'bn' ? activity.titleBn : activity.titleEn}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed mb-4">
                    {lang === 'bn' ? activity.descriptionBn : activity.descriptionEn}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 pb-5 pt-0 flex items-center justify-between text-xs text-stone-500 border-t border-stone-100 mt-2">
                <span className="flex items-center gap-1.5 text-[#D62828] font-medium truncate max-w-[170px]">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">
                    {lang === 'bn' ? activity.locationBn : activity.locationEn}
                  </span>
                </span>

                <button
                  onClick={() => setSelectedActivity(activity)}
                  className="text-[#D62828] font-bold hover:text-[#B91C1C] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>{lang === 'bn' ? 'বিস্তারিত' : 'Details'}</span>
                  <ArrowRight className="w-3 h-3" />
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
                aria-label="Close"
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 text-lg w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
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
              <div className="p-3 bg-stone-50 rounded-xl text-xs space-y-1.5 mb-6 border border-stone-200">
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-stone-500" />
                  <span><strong>স্থান:</strong> {selectedActivity.locationBn}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-stone-500" />
                  <span><strong>সুবিধাভোগী সংখ্যা:</strong> {selectedActivity.beneficiariesCount} জন মানুষ</span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-600" />
                  <span><strong>যাচাইকরণ:</strong> রৌমারী জনকল্যাণ ফাউন্ডেশন এক্সিকিউটিভ টিম</span>
                </p>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setSelectedActivity(null)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
                </button>
                <Link
                  href="/donate"
                  onClick={() => setSelectedActivity(null)}
                  className="px-4 py-2 bg-[#D62828] hover:bg-[#B91C1C] text-white rounded-xl text-xs font-semibold cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>{lang === 'bn' ? 'অনুদান দিন' : 'Donate'}</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
