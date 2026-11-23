'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Users, 
  ShieldCheck
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import VolunteerModal from '@/components/modals/VolunteerModal';
import AssistanceModal from '@/components/modals/AssistanceModal';
import DonationModal from '@/components/modals/DonationModal';
import { Language } from '@/types';

export default function VolunteerPage() {
  const [lang, setLang] = useState<Language>('bn');
  const [modalOpen, setModalOpen] = useState(false);
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          
          {/* Header Title Matching Wireframe */}
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#E53935] tracking-tight mb-2">
              {lang === 'bn' ? 'স্বেচ্ছাসেবক হোন' : 'Join as a Volunteer'}
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 font-medium">
              {lang === 'bn'
                ? 'আপনার মেধা, সময় ও মানবিক শ্রম দিয়ে রৌমারীর দুর্গম চরাঞ্চলের মানুষের পাশে দাঁড়ান।'
                : 'Offer your time, empathy, and skills to create lasting social impact across Rowmari.'}
            </p>
          </div>

          {/* Featured Field Image */}
          <div className="relative w-full aspect-16/9 sm:aspect-21/9 rounded-2xl overflow-hidden shadow-md border border-stone-200 mb-10">
            <Image
              src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1400&auto=format&fit=crop"
              alt="Volunteer Humanitarian Team"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-xs font-bold bg-[#E53935] px-2.5 py-0.5 rounded-md inline-block mb-1 shadow-sm">
                {lang === 'bn' ? 'মাঠপর্যায়ের স্বেচ্ছাসেবক' : 'Field Volunteers'}
              </span>
              <p className="text-xs text-white/90">
                {lang === 'bn' 
                  ? 'শীতবস্ত্র বিতরণ ও ফ্রি মেডিকেল ক্যাম্পে নিবেদিত তরুণ স্বেচ্ছাসেবক দল' 
                  : 'Dedicated youth team serving vulnerable communities in Kurigram.'}
              </p>
            </div>
          </div>

          {/* Section: দায়িত্ব ও যোগ্যতা Cards with Top Borders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {/* Card 1: যোগ্যতা (Green top border) */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 border-t-4 border-t-[#0D5C35] shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-[#0D5C35]" />
                <h3 className="text-base font-bold text-stone-900">
                  {lang === 'bn' ? 'যোগ্যতা ও অঙ্গীকার' : 'Eligibility & Commitment'}
                </h3>
              </div>
              <ul className="text-xs sm:text-sm text-stone-600 space-y-1.5 list-disc list-inside">
                <li>ন্যূনতম বয়স ১৮ বছর বা তদূর্ধ্ব</li>
                <li>অরাজনৈতিক ও মানবিক সেবার মানসিকতা</li>
                <li>মাসে অন্তত ১-২ দিন সময় দেওয়ার সামর্থ্য</li>
                <li>সততা, ধৈর্য ও সহযোগিতাপূর্ণ মনোভাব</li>
              </ul>
            </div>

            {/* Card 2: দায়িত্ব (Red top border) */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 border-t-4 border-t-[#E53935] shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-[#E53935]" />
                <h3 className="text-base font-bold text-stone-900">
                  {lang === 'bn' ? 'দায়িত্ব ও কাজের ক্ষেত্র' : 'Key Responsibilities'}
                </h3>
              </div>
              <ul className="text-xs sm:text-sm text-stone-600 space-y-1.5 list-disc list-inside">
                <li>শীতবস্ত্র ও ত্রাণসামগ্রী বিতরণ সমন্বয়</li>
                <li>মেডিকেল ক্যাম্প পরিচালনা ও রোগীর শৃঙ্খলা রক্ষা</li>
                <li>জরুরি রক্তদাতা নেটওয়ার্কে যোগাযোগ রক্ষা</li>
                <li>ডিজিটাল ডকুমেন্টেশন ও জনসংযোগ</li>
              </ul>
            </div>
          </div>

          {/* Registration CTA Box */}
          <div className="bg-[#0D5C35] text-white rounded-2xl p-6 sm:p-8 text-center space-y-3 mb-10">
            <h2 className="text-xl sm:text-2xl font-bold">
              {lang === 'bn' ? 'আমাদের মানবিক পরিবারে যোগ দিন' : 'Join Our Humanitarian Family'}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-lg mx-auto leading-relaxed">
              {lang === 'bn' 
                ? 'অনলাইন ফর্মটি পূরণ করুন। আমাদের ভলান্টিয়ার কো-অর্ডিনেটর দ্রুত আপনার সাথে যোগাযোগ করবেন।' 
                : 'Fill out the simple online form and our coordinator will reach out shortly.'}
            </p>
            <div className="pt-2">
              <button
                onClick={() => setModalOpen(true)}
                className="px-8 py-3 rounded-xl bg-white text-[#0D5C35] hover:bg-stone-100 font-bold text-sm transition shadow-md cursor-pointer inline-flex items-center gap-2"
              >
                <Users className="w-4 h-4 text-[#0D5C35]" />
                <span>{lang === 'bn' ? 'স্বেচ্ছাসেবক আবেদন ফর্ম পূরণ করুন' : 'Open Volunteer Form'}</span>
              </button>
            </div>
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

      <VolunteerModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        lang={lang}
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
