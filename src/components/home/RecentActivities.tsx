'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  MapPin,
  ArrowRight,
  X,
  Users,
  CheckCircle2,
  Heart
} from 'lucide-react';
import { Language, ActivityCategory, ActivityItem } from '@/types';
import { useGetActivitiesQuery } from '@/store/api/activitiesApi';
import { SkeletonCard } from '@/components/ui/skeleton';

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

  const featuredActivity = filteredActivities[0] || activities[0];

  return (
    <section id="activities" className="py-5 md:py-7 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header + Inline Category Filter Pills */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-1.5 h-5 sm:h-6 rounded-full bg-[#D62828] shrink-0" />
            <h2 className="text-lg sm:text-xl md:text-2xl font-black text-stone-900 tracking-tight">
              {lang === 'bn' ? 'সাম্প্রতিক কার্যক্রম' : 'Recent Activities'}
            </h2>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  activeCategory === cat.key
                    ? 'bg-[#D62828] text-white shadow-xs'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                {lang === 'bn' ? cat.labelBn : cat.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Compact Full-Width Activity Banner */}
        {isLoading ? (
          <SkeletonCard variant="activity" />
        ) : isError ? (
          <p role="alert" className="text-center py-8 text-[#737B76]">কার্যক্রমের তথ্য লোড করা যায়নি।</p>
        ) : featuredActivity ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="relative h-[200px] sm:h-[225px] w-full rounded-2xl overflow-hidden shadow-md bg-[#450A0A]"
          >
            <Image
              src={
                featuredActivity.imageUrl ||
                'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1400&auto=format&fit=crop'
              }
              alt={lang === 'bn' ? featuredActivity.titleBn : featuredActivity.titleEn}
              fill
              sizes="100vw"
              className="object-cover object-center sm:object-right"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-[#4A0808]/95 via-[#7F1D1D]/75 to-transparent"
            />

            <div className="relative z-10 h-full flex flex-col justify-center p-5 sm:p-8 max-w-md sm:max-w-lg space-y-2.5">
              <h3 className="text-lg sm:text-2xl font-black text-white leading-snug line-clamp-2 drop-shadow-xs">
                {lang === 'bn' ? featuredActivity.titleBn : featuredActivity.titleEn}
              </h3>
              <p className="text-xs sm:text-sm text-red-50/90 line-clamp-2 leading-relaxed">
                {lang === 'bn' ? featuredActivity.descriptionBn : featuredActivity.descriptionEn}
              </p>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setSelectedActivity(featuredActivity)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white hover:bg-red-50 px-4 py-1.5 sm:px-5 sm:py-2 text-xs font-bold text-[#D62828] shadow-sm transition active:scale-[0.98] cursor-pointer"
                >
                  <span>{lang === 'bn' ? 'বিস্তারিত জানুন' : 'Learn More'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6 text-center text-xs text-stone-500">
            {lang === 'bn' ? 'এই ক্যাটাগরিতে কোনো কার্যক্রম পাওয়া যায়নি।' : 'No activities found in this category.'}
          </div>
        )}

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
