'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Users, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import AssistanceModal from '@/components/modals/AssistanceModal';
import DonationModal from '@/components/modals/DonationModal';
import { TEAM_MEMBERS } from '@/data/mockData';
import { Language } from '@/types';

export default function TeamPage() {
  const [lang, setLang] = useState<Language>('bn');
  const [assistanceModalOpen, setAssistanceModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);

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
              {lang === 'bn' ? 'আমাদের কার্যনির্বাহী টিম' : 'Our Team'}
            </h1>
            <p className="text-sm sm:text-base text-stone-500 font-medium">
              {lang === 'bn'
                ? 'রৌমারী জনকল্যাণ ফাউন্ডেশনের পরিচালনা কমিটি ও বিভিন্ন উইংয়ের দায়িত্বপ্রাপ্ত সমন্বয়কবৃন্দ।'
                : 'Meet the executive committee and specialized wing coordinators driving our humanitarian mission.'}
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-14">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#0D5C35] flex items-center justify-center shrink-0">
                      <User className="w-7 h-7 text-[#0D5C35]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-stone-900 leading-snug">
                        {lang === 'bn' ? member.nameBn : member.nameEn}
                      </h3>
                      <span className="inline-block text-xs font-bold text-white bg-[#E53935] px-2.5 py-0.5 rounded mt-1 shadow-2xs">
                        {lang === 'bn' ? member.roleBn : member.roleEn}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                    {lang === 'bn' ? member.bioBn : member.bioEn}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span className="font-mono text-[#0D5C35] font-semibold">{member.phone}</span>
                  <span className="text-[#0D5C35] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0D5C35]" />
                    <span>{lang === 'bn' ? 'অনুমোদিত' : 'Verified'}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Volunteer Callout Box with Dark Green Background */}
          <div className="bg-[#0D5C35] text-white rounded-2xl p-8 sm:p-10 text-center max-w-3xl mx-auto shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">
              {lang === 'bn' ? 'আপনিও কি আমাদের টিমের সাথে কাজ করতে চান?' : 'Want to join our field volunteer team?'}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-lg mx-auto mb-6 leading-relaxed">
              {lang === 'bn'
                ? 'রৌমারীর চরাঞ্চলে শীতবস্ত্র বিতরণ, মেডিকেল ক্যাম্প পরিচালনা বা রক্তের প্রয়োজনে আমাদের ভলান্টিয়ার নেটওয়ার্কে যোগ দিন।'
                : 'Join our field volunteers in distribution, health camp logistics, or blood coordination.'}
            </p>
            <Link
              href="/volunteer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#0D5C35] font-bold text-sm shadow-md hover:bg-stone-100 transition cursor-pointer"
            >
              <Users className="w-4 h-4 text-[#0D5C35]" />
              <span>{lang === 'bn' ? 'স্বেচ্ছাসেবক আবেদন করুন' : 'Apply as Volunteer'}</span>
            </Link>
          </div>

        </div>
      </main>

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
