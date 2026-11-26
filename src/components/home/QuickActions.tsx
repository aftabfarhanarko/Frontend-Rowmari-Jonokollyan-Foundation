'use client';

import React from 'react';
import { Heart, Search, Users, ArrowRight, Activity, Sparkles } from 'lucide-react';
import { Language } from '@/types';

interface QuickActionsProps {
  lang: Language;
  onOpenAssistance: () => void;
  onOpenDonation?: () => void;
  onOpenVolunteer: () => void;
}

export default function QuickActions({
  lang,
  onOpenAssistance,
  onOpenVolunteer,
}: QuickActionsProps) {
  const cards = [
    {
      id: 'aid',
      icon: Heart,
      tagBn: 'জরুরি সেবা',
      tagEn: 'Emergency Aid',
      titleBn: 'সহায়তার আবেদন',
      titleEn: 'Request Help',
      subtitleBn: 'চিকিৎসা, শিক্ষা, খাদ্য ও শীতবস্ত্র সহায়তা',
      subtitleEn: 'Medical, Education, Food & Winter Relief',
      action: onOpenAssistance,
      theme: 'red',
    },
    {
      id: 'track',
      icon: Search,
      tagBn: 'স্বচ্ছ পর্যবেক্ষণ',
      tagEn: 'Live Status',
      titleBn: 'আবেদন ট্র্যাকিং',
      titleEn: 'Track Application',
      subtitleBn: 'জমা দেওয়া সহায়তার বর্তমান অবস্থা যাচাই করুন',
      subtitleEn: 'Check real-time application processing status',
      action: () => {
        const el = document.getElementById('track');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else window.location.href = '/#track';
      },
      theme: 'red',
    },
    {
      id: 'activities',
      icon: Activity,
      tagBn: 'মাঠপর্যায়ে',
      tagEn: 'On Ground',
      titleBn: 'আমাদের কার্যক্রম',
      titleEn: 'Our Activities',
      subtitleBn: 'রৌমারী ও দুর্গম চরাঞ্চলের সেবামূলক চিত্র',
      subtitleEn: 'Grassroots Humanitarian Work & Reports',
      action: () => {
        const el = document.getElementById('activities');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else window.location.href = '/activities';
      },
      theme: 'red',
    },
    {
      id: 'volunteer',
      icon: Users,
      tagBn: 'যুক্ত হোন',
      tagEn: 'Join Us',
      titleBn: 'স্বেচ্ছাসেবক হোন',
      titleEn: 'Join as Volunteer',
      subtitleBn: 'মানবতার সেবায় তরুণ ও যুবসমাজ একত্রিত',
      subtitleEn: 'Serve the Community With Dedication',
      action: onOpenVolunteer,
      theme: 'red',
    },
  ];

  return (
    <section className="relative z-20 -mt-6 sm:-mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {cards.map((card) => {
          const isRed = card.theme === 'red';
          const IconComp = card.icon;
          return (
            <button
              key={card.id}
              onClick={card.action}
              className={`group text-left p-5 sm:p-6 rounded-2xl bg-white border border-stone-200/90 transition-all duration-300 shadow-md hover:shadow-2xl hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                isRed
                  ? 'hover:border-red-300'
                  : 'hover:border-red-300'
              }`}
            >
              {/* Top Accent Strip */}
              <div
                className={`absolute top-0 left-0 right-0 h-1.5 transition-all duration-300 ${
                  isRed
                    ? 'bg-[#E53935] group-hover:h-2'
                    : 'bg-[#D62828] group-hover:h-2'
                }`}
              />

              {/* Top Row: Icon & Tag */}
              <div className="flex items-center justify-between mb-4 w-full">
                <span
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shadow-xs ${
                    isRed
                      ? 'bg-rose-50 text-[#E53935] group-hover:bg-[#E53935] group-hover:text-white group-hover:scale-105'
                      : 'bg-red-50 text-[#D62828] group-hover:bg-[#D62828] group-hover:text-white group-hover:scale-105'
                  }`}
                >
                  <IconComp className="w-6 h-6 transition-transform duration-300" />
                </span>

                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border transition-colors ${
                    isRed
                      ? 'bg-red-50 text-[#E53935] border-red-200 group-hover:bg-red-100'
                      : 'bg-red-50 text-[#D62828] border-red-200 group-hover:bg-red-100'
                  }`}
                >
                  {lang === 'bn' ? card.tagBn : card.tagEn}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-[#D62828] transition-colors leading-snug mb-1.5">
                  {lang === 'bn' ? card.titleBn : card.titleEn}
                </h3>
                <p className="text-xs sm:text-[13px] text-stone-500 group-hover:text-stone-700 leading-relaxed font-normal">
                  {lang === 'bn' ? card.subtitleBn : card.subtitleEn}
                </p>
              </div>

              {/* Bottom Arrow Indicator */}
              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold">
                <span
                  className={`transition-colors ${
                    isRed
                      ? 'text-[#E53935] group-hover:text-red-700'
                      : 'text-[#D62828] group-hover:text-red-800'
                  }`}
                >
                  {lang === 'bn' ? 'ক্লিক করুন' : 'Proceed'}
                </span>
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isRed
                      ? 'text-[#E53935] bg-red-50 group-hover:bg-[#E53935] group-hover:text-white group-hover:translate-x-1'
                      : 'text-[#D62828] bg-red-50 group-hover:bg-[#D62828] group-hover:text-white group-hover:translate-x-1'
                  }`}
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
