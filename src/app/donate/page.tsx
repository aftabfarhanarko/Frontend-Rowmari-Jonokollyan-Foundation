'use client';

import React, { useState } from 'react';
import { 
  Heart, 
  Clock
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import AssistanceModal from '@/components/modals/AssistanceModal';
import DonationModal from '@/components/modals/DonationModal';
import { Language } from '@/types';

export default function DonatePage() {
  const [lang, setLang] = useState<Language>('bn');
  const [selectedAmount, setSelectedAmount] = useState<number | 'other'>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once');
  const [campaign, setCampaign] = useState<string>('general');
  const [anonymous, setAnonymous] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'bank' | 'card'>('bkash');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [assistanceModalOpen, setAssistanceModalOpen] = useState<boolean>(false);

  const amounts: (number | 'other')[] = [500, 1000, 2000, 'other'];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1E293B]">
      <Navbar 
        lang={lang} 
        onToggleLang={() => setLang(l => l === 'bn' ? 'en' : 'bn')} 
        onOpenDonation={() => setModalOpen(true)}
      />

      <main className="flex-1 pb-24 sm:pb-16">
        <div className="max-w-xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          
          {/* Header Title Matching Wireframe */}
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#E53935] tracking-tight mb-2">
              {lang === 'bn' ? 'অনুদান দিন' : 'Make a Donation'}
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 font-medium">
              {lang === 'bn' ? 'স্বচ্ছ ও নিরাপদ মানবিক অনুদান — তাৎক্ষণিক ডিজিটাল রসিদ' : 'Transparent humanitarian donation with instant verifiable receipt'}
            </p>
          </div>

          {/* Amount Pills Matching Wireframe */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-4">
            {amounts.map((amt) => {
              const isSelected = selectedAmount === amt;
              return (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setSelectedAmount(amt)}
                  className={`py-3 px-2 rounded-xl text-xs sm:text-sm font-bold border transition cursor-pointer text-center ${
                    isSelected
                      ? 'bg-[#0D5C35] text-white border-[#0D5C35] shadow-xs'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300 shadow-2xs'
                  }`}
                >
                  {amt === 'other' ? (lang === 'bn' ? 'অন্য' : 'Other') : (lang === 'bn' ? `৳${amt.toLocaleString()}` : `৳${amt}`)}
                </button>
              );
            })}
          </div>

          {/* Custom Amount Input if 'other' is selected */}
          {selectedAmount === 'other' && (
            <div className="mb-4">
              <input
                type="number"
                placeholder={lang === 'bn' ? 'অনুদানের পরিমাণ লিখুন (টাকায়)' : 'Enter amount in BDT'}
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0D5C35]"
              />
            </div>
          )}

          {/* Frequency Pills Matching Wireframe */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setFrequency('once')}
              className={`py-3 rounded-xl text-xs sm:text-sm font-bold border transition cursor-pointer text-center ${
                frequency === 'once'
                  ? 'bg-[#0D5C35] text-white border-[#0D5C35] shadow-xs'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
              }`}
            >
              {lang === 'bn' ? 'একবার' : 'One Time'}
            </button>
            <button
              type="button"
              onClick={() => setFrequency('monthly')}
              className={`py-3 rounded-xl text-xs sm:text-sm font-bold border transition cursor-pointer text-center ${
                frequency === 'monthly'
                  ? 'bg-[#0D5C35] text-white border-[#0D5C35] shadow-xs'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
              }`}
            >
              {lang === 'bn' ? 'মাসিক' : 'Monthly'}
            </button>
          </div>

          {/* Campaign Selector Matching Wireframe */}
          <div className="mb-4">
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              {lang === 'bn' ? 'ক্যাম্পেইন' : 'Campaign'}
            </label>
            <select
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-sm text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-[#0D5C35]"
            >
              <option value="general">{lang === 'bn' ? 'সাধারণ মানবিক তহবিল' : 'General Relief Fund'}</option>
              <option value="winter">{lang === 'bn' ? 'শীতবস্ত্র বিতরণ তহবিল ২০২৬' : 'Winter Clothes Drive 2026'}</option>
              <option value="medical">{lang === 'bn' ? 'বিনামূল্যে ওষুধ ও ভ্রাম্যমাণ অ্যাম্বুলেন্স' : 'Free Medicine & Ambulance'}</option>
              <option value="education">{lang === 'bn' ? 'দরিদ্র মেধাবী শিক্ষাবৃত্তি' : 'Student Scholarship Fund'}</option>
            </select>
          </div>

          {/* Anonymous Checkbox Matching Wireframe */}
          <div className="flex items-center gap-2 mb-8">
            <input
              type="checkbox"
              id="anon"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
              className="w-4 h-4 rounded text-[#0D5C35] focus:ring-[#0D5C35] border-stone-300 cursor-pointer"
            />
            <label htmlFor="anon" className="text-xs sm:text-sm text-stone-600 font-medium cursor-pointer">
              {lang === 'bn' ? 'নাম প্রকাশ করতে চাই না (Anonymous Donation)' : 'I wish to donate anonymously'}
            </label>
          </div>

          {/* Subheading: পেমেন্ট পদ্ধতি in Red Matching Wireframe */}
          <div className="mb-4">
            <h2 className="text-xl font-bold text-[#E53935] tracking-tight">
              {lang === 'bn' ? 'পেমেন্ট পদ্ধতি' : 'Payment Method'}
            </h2>
          </div>

          {/* Payment Method Pills Matching Wireframe */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            {(['bkash', 'nagad', 'bank', 'card'] as const).map((method) => {
              const isSelected = paymentMethod === method;
              const labels = {
                bkash: 'bKash',
                nagad: 'Nagad',
                bank: lang === 'bn' ? 'ব্যাংক' : 'Bank',
                card: lang === 'bn' ? 'কার্ড' : 'Card',
              };
              return (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`py-3 rounded-xl text-xs sm:text-sm font-bold border transition cursor-pointer text-center ${
                    isSelected
                      ? 'bg-[#0D5C35] text-white border-[#0D5C35] shadow-xs'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
                  }`}
                >
                  {labels[method]}
                </button>
              );
            })}
          </div>

          {/* Action Button: অনুদান নিশ্চিত করুন in Red Matching Wireframe */}
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="w-full py-3.5 rounded-xl bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold text-sm sm:text-base transition duration-150 shadow-md cursor-pointer mb-8 active:scale-98 flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4 fill-white text-white" />
            <span>{lang === 'bn' ? 'অনুদান নিশ্চিত করুন' : 'Confirm Donation'}</span>
          </button>

          {/* Green Card: আপনার অনুদান কোথায় যায় Matching Wireframe */}
          <div className="bg-[#0D5C35] text-white rounded-2xl p-5 sm:p-6 mb-6 shadow-md border border-emerald-900">
            <h3 className="text-base sm:text-lg font-bold mb-1.5">
              {lang === 'bn' ? 'আপনার অনুদান কোথায় যায়' : 'Where Your Donation Goes'}
            </h3>
            <p className="text-xs text-emerald-100/90 leading-relaxed">
              {lang === 'bn' 
                ? 'সংগ্রহ [৳ ৩৫,৫০,০০০] • ব্যয় [৳ ৩১,২০,০০০] • অবশিষ্ট [৳ ৪,৩০,০০০]' 
                : 'Total Raised [৳ 35,50,000] • Spent [৳ 31,20,000] • Balance [৳ 4,30,000]'}
            </p>
          </div>

          {/* Verification Status Card Matching Wireframe */}
          <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 shadow-2xs">
            <h4 className="text-sm font-bold text-stone-900 mb-1 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#0D5C35]" />
              <span>{lang === 'bn' ? 'পেমেন্ট যাচাই প্রক্রিয়া...' : 'Payment Verification Process...'}</span>
            </h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              {lang === 'bn'
                ? 'সার্ভার নিশ্চিত করার পরই "পরিশোধিত" ও রসিদ দেখানো হবে।'
                : 'Instant digital donation receipt and audit confirmation is generated once transaction is verified.'}
            </p>
          </div>

        </div>
      </main>

      <Footer 
        lang={lang} 
        onOpenAssistance={() => setAssistanceModalOpen(true)}
        onOpenDonation={() => setModalOpen(true)}
      />

      <MobileBottomBar
        lang={lang}
        onOpenAssistance={() => setAssistanceModalOpen(true)}
        onOpenDonation={() => setModalOpen(true)}
      />

      <AssistanceModal
        isOpen={assistanceModalOpen}
        onClose={() => setAssistanceModalOpen(false)}
        lang={lang}
      />

      <DonationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        lang={lang}
        preselectedCampaign={campaign}
      />
    </div>
  );
}
