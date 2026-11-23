'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Calendar, 
  MapPin, 
  X, 
  ArrowRight
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import AssistanceModal from '@/components/modals/AssistanceModal';
import DonationModal from '@/components/modals/DonationModal';
import { ACTIVITIES_DATA } from '@/data/mockData';
import { Language, ActivityCategory, ActivityItem } from '@/types';

export default function ActivitiesPage() {
  const [lang, setLang] = useState<Language>('bn');
  const [activeCategory, setActiveCategory] = useState<ActivityCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);
  const [assistanceModalOpen, setAssistanceModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);

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
              {lang === 'bn' ? 'আমাদের কার্যক্রম' : 'Our Activities'}
            </h1>
            <p className="text-sm sm:text-base text-stone-500 font-medium">
              {lang === 'bn' 
                ? 'রৌমারীর চরাঞ্চল ও নদীভাঙনে ক্ষতিগ্রস্ত মানুষের পাশে শীতবস্ত্র, খাদ্য, চিকিৎসা ও শিক্ষা সহায়তা।' 
                : 'Comprehensive overview of field relief drives and health programs conducted in Rowmari.'}
            </p>
          </div>

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
                      ? 'bg-[#0D5C35] text-white shadow-sm'
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
                className="w-full px-4 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0D5C35] bg-stone-50 focus:bg-white transition"
              />
            </div>
          </div>

          {/* Activities Grid */}
          {filteredActivities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredActivities.map((act) => (
                <div
                  key={act.id}
                  className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
                >
                  <div>
                    {/* Visual Header with Real Photo */}
                    <div className="relative aspect-16/10 bg-stone-100 overflow-hidden">
                      <Image
                        src={act.imageUrl || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop'}
                        alt={lang === 'bn' ? act.titleBn : act.titleEn}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent z-10" />

                      {/* Category Pill Tag */}
                      <div className="absolute top-3 left-3 z-20">
                        <span className="inline-flex items-center gap-1.5 bg-[#E53935] text-white text-[11px] font-bold px-2.5 py-0.5 rounded shadow-sm">
                          {lang === 'bn' ? act.categoryBn : act.categoryEn}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 z-20 text-white text-xs flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-red-200" />
                        <span className="font-semibold">{lang === 'bn' ? act.dateBn : act.dateEn}</span>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6">
                      <h3 className="text-lg font-bold text-stone-900 group-hover:text-[#E53935] transition leading-snug mb-2">
                        {lang === 'bn' ? act.titleBn : act.titleEn}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed mb-4">
                        {lang === 'bn' ? act.descriptionBn : act.descriptionEn}
                      </p>

                      <div className="space-y-1.5 text-xs text-stone-500 pt-3 border-t border-stone-100">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1 text-[#0D5C35] font-medium">
                            <MapPin className="w-3.5 h-3.5 shrink-0" />
                            <span>{lang === 'bn' ? act.locationBn : act.locationEn}</span>
                          </span>
                          <span className="font-bold text-[#0D5C35]">
                            {act.beneficiariesCount} জন
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 pt-0">
                    <button
                      onClick={() => setSelectedActivity(act)}
                      className="w-full py-2.5 rounded-xl border border-stone-200 text-stone-700 hover:text-white hover:bg-[#0D5C35] hover:border-[#0D5C35] text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <span>{lang === 'bn' ? 'বিস্তারিত তথ্য' : 'View Full Details'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-stone-50 rounded-2xl border border-stone-200">
              <p className="text-stone-500 text-sm">
                {lang === 'bn' ? 'এই ক্যাটাগরিতে কোনো কার্যক্রম খুঁজে পাওয়া যায়নি।' : 'No activities found matching your criteria.'}
              </p>
            </div>
          )}

        </div>
      </main>

      {/* Detail Modal */}
      {selectedActivity && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setSelectedActivity(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedActivity(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-16/9 rounded-xl overflow-hidden mb-4">
              <Image
                src={selectedActivity.imageUrl || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop'}
                alt={lang === 'bn' ? selectedActivity.titleBn : selectedActivity.titleEn}
                fill
                className="object-cover"
              />
            </div>

            <div className="inline-block bg-[#E53935] text-white text-xs font-bold px-2.5 py-0.5 rounded mb-2">
              {lang === 'bn' ? selectedActivity.categoryBn : selectedActivity.categoryEn}
            </div>

            <h3 className="text-xl font-bold text-stone-900 mb-2">
              {lang === 'bn' ? selectedActivity.titleBn : selectedActivity.titleEn}
            </h3>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
              {lang === 'bn' ? selectedActivity.descriptionBn : selectedActivity.descriptionEn}
            </p>

            <div className="grid grid-cols-2 gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs mb-6">
              <div>
                <span className="text-stone-400 block">{lang === 'bn' ? 'তারিখ:' : 'Date:'}</span>
                <span className="font-bold text-stone-800">{lang === 'bn' ? selectedActivity.dateBn : selectedActivity.dateEn}</span>
              </div>
              <div>
                <span className="text-stone-400 block">{lang === 'bn' ? 'স্থান:' : 'Location:'}</span>
                <span className="font-bold text-stone-800">{lang === 'bn' ? selectedActivity.locationBn : selectedActivity.locationEn}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setSelectedActivity(null);
                  setAssistanceModalOpen(true);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#0D5C35] hover:bg-[#094527] text-white font-bold text-xs transition"
              >
                {lang === 'bn' ? 'এই খাতে সহায়তা চান?' : 'Need Help in this Area?'}
              </button>
              <button
                onClick={() => {
                  setSelectedActivity(null);
                  setDonationModalOpen(true);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold text-xs transition"
              >
                {lang === 'bn' ? 'অনুদান দিন' : 'Donate to this Cause'}
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
