'use client';

import React from 'react';
import { Heart, Droplet, HandHeart, Users, ArrowRight } from 'lucide-react';
import { Language } from '@/types';

interface QuickActionsProps {
  lang: Language;
  onOpenAssistance: () => void;
  onOpenBlood: () => void;
  onOpenDonation: () => void;
  onOpenVolunteer: () => void;
}

export default function QuickActions({
  lang,
  onOpenAssistance,
  onOpenBlood,
  onOpenDonation,
  onOpenVolunteer,
}: QuickActionsProps) {
  const cards = [
    {
      id: 'aid',
      icon: Heart,
      titleBn: 'সহায়তা চাই',
      titleEn: 'Request Help',
      subtitleBn: 'চিকিৎসা, শিক্ষা, খাদ্য, শীতবস্ত্র',
      subtitleEn: 'Medical, Education, Food & Winter Aid',
      action: onOpenAssistance,
      theme: 'emerald',
    },
    {
      id: 'blood',
      icon: Droplet,
      titleBn: 'রক্তদান',
      titleEn: 'Blood Donation',
      subtitleBn: 'ডোনার হন বা রক্তের অনুরোধ',
      subtitleEn: 'Register as Donor or Request Blood',
      action: onOpenBlood,
      theme: 'red',
    },
    {
      id: 'donate',
      icon: HandHeart,
      titleBn: 'অনুদান দিন',
      titleEn: 'Donate Funds',
      subtitleBn: 'স্বচ্ছ হিসাবসহ, ডিজিটাল রসিদ',
      subtitleEn: 'Transparent Records & Instant Receipt',
      action: onOpenDonation,
      theme: 'emerald',
    },
    {
      id: 'volunteer',
      icon: Users,
      titleBn: 'স্বেচ্ছাসেবক হোন',
      titleEn: 'Join as Volunteer',
      subtitleBn: 'আমাদের সঙ্গে কাজ করুন',
      subtitleEn: 'Serve the Community with Us',
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
              className={`group text-left p-5 sm:p-6 rounded-2xl bg-white border border-stone-200 transition-all duration-200 shadow-md hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col justify-between ${
                isRed
                  ? 'border-t-4 border-t-[#E53935] hover:border-red-300'
                  : 'border-t-4 border-t-[#0D5C35] hover:border-emerald-300'
              }`}
            >
              <div className="flex items-center justify-between mb-4 w-full">
                <span
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition duration-200 ${
                    isRed
                      ? 'bg-red-50 text-[#E53935] group-hover:bg-red-100 group-hover:scale-110'
                      : 'bg-emerald-50 text-[#0D5C35] group-hover:bg-emerald-100 group-hover:scale-110'
                  }`}
                >
                  <IconComp className="w-6 h-6" />
                </span>
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition ${
                    isRed
                      ? 'text-[#E53935] bg-red-50 group-hover:bg-[#E53935] group-hover:text-white'
                      : 'text-[#0D5C35] bg-emerald-50 group-hover:bg-[#0D5C35] group-hover:text-white'
                  }`}
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

              <div>
                <h3
                  className={`text-lg font-bold transition mb-1 ${
                    isRed
                      ? 'text-stone-900 group-hover:text-[#E53935]'
                      : 'text-stone-900 group-hover:text-[#0D5C35]'
                  }`}
                >
                  {lang === 'bn' ? card.titleBn : card.titleEn}
                </h3>
                <p className="text-xs text-stone-500 font-medium">
                  {lang === 'bn' ? card.subtitleBn : card.subtitleEn}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
