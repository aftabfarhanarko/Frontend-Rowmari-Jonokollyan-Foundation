'use client';

import React, { useState } from 'react';
import { 
  Heart, 
  Droplet, 
  ShieldCheck
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import BloodRequestModal from '@/components/modals/BloodRequestModal';
import BloodDonorModal from '@/components/modals/BloodDonorModal';
import AssistanceModal from '@/components/modals/AssistanceModal';
import DonationModal from '@/components/modals/DonationModal';
import { FOUNDATION_INFO } from '@/data/mockData';
import { Language } from '@/types';

export default function BloodDonationPage() {
  const [lang, setLang] = useState<Language>('bn');
  const [bloodRequestOpen, setBloodRequestOpen] = useState(false);
  const [bloodDonorOpen, setBloodDonorOpen] = useState(false);
  const [assistanceModalOpen, setAssistanceModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

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
              {lang === 'bn' ? 'রক্তদান ও ডোনার পোর্টাল' : 'Blood Donation Portal'}
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 font-medium">
              {lang === 'bn'
                ? 'রৌমারী উপজেলা স্বাস্থ্য কমপ্লেক্স ও কুড়িগ্রামের রোগীদের জন্য ২৪/৭ রক্তদাতা সমন্বয়।'
                : 'Connecting verified voluntary blood donors with critical hospital patients in Rowmari.'}
            </p>
          </div>

          {/* Urgent Notice in Soft Red Container Matching Wireframe */}
          <div className="bg-[#FEECEB] border border-red-200 rounded-2xl p-6 sm:p-8 mb-8 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-100 text-[#E53935] text-xs font-bold mb-2">
                  <Droplet className="w-3.5 h-3.5 text-[#E53935]" />
                  <span>{lang === 'bn' ? '২৪/৭ জরুরি ব্লাড হটলাইন' : '24/7 Blood Hotline'}</span>
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#E53935] tracking-tight">
                  {lang === 'bn' ? 'জরুরি রক্তের প্রয়োজনে যোগাযোগ করুন' : 'Need Emergency Blood in Rowmari?'}
                </h2>
                <p className="text-xs sm:text-sm text-stone-700 font-mono mt-1 font-bold">
                  {FOUNDATION_INFO.emergencyBloodHotline}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  onClick={() => setBloodDonorOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold text-xs sm:text-sm transition shadow-sm cursor-pointer flex items-center gap-1.5"
                >
                  <Heart className="w-4 h-4 fill-white text-white" />
                  <span>{lang === 'bn' ? 'ডোনার হন' : 'Become a Donor'}</span>
                </button>

                <button
                  onClick={() => setBloodRequestOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-white border-2 border-[#E53935] text-[#E53935] hover:bg-red-50 font-bold text-xs sm:text-sm transition cursor-pointer flex items-center gap-1.5"
                >
                  <Droplet className="w-4 h-4 text-[#E53935]" />
                  <span>{lang === 'bn' ? 'রক্ত চাই' : 'Request Blood'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Blood Groups Grid */}
          <div className="mb-10">
            <h3 className="text-lg font-bold text-stone-900 mb-3">
              {lang === 'bn' ? 'রক্তের গ্রুপ তালিকা' : 'Blood Group Categories'}
            </h3>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
              {bloodGroups.map((bg) => (
                <div
                  key={bg}
                  className="p-3 sm:p-4 bg-white border border-stone-200 rounded-xl text-center shadow-2xs hover:border-red-300 transition"
                >
                  <span className="text-lg sm:text-xl font-extrabold text-[#E53935] block">{bg}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Guarantee Box with Green Accent */}
          <div className="bg-[#F0FDF4] border border-emerald-200/80 rounded-2xl p-6 sm:p-7 mb-10 shadow-2xs">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-6 h-6 text-[#0D5C35]" />
              <h3 className="text-base sm:text-lg font-bold text-stone-900">
                {lang === 'bn' ? 'কঠোর তথ্যের গোপনীয়তা নীতি' : 'Confidentiality Assurance'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {lang === 'bn'
                ? 'রক্তদাতার ফোন নম্বর বা ব্যক্তিগত তথ্য কোনো পাবলিক ওয়েবসাইট বা সোশ্যাল মিডিয়ায় উন্মুক্ত করা হয় না। ব্লাড কো-অর্ডিনেটর কেবল জরুরি প্রয়োজনে রক্তদাতার সম্মতি নিয়ে যোগাযোগ করেন।'
                : 'Donor contact numbers are never published online. Only verified coordinators contact donors upon consent during emergencies.'}
            </p>
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

      <BloodRequestModal
        isOpen={bloodRequestOpen}
        onClose={() => setBloodRequestOpen(false)}
        lang={lang}
      />

      <BloodDonorModal
        isOpen={bloodDonorOpen}
        onClose={() => setBloodDonorOpen(false)}
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
