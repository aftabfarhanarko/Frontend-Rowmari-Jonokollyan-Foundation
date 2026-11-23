'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  CheckCircle2, 
  Send
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import AssistanceModal from '@/components/modals/AssistanceModal';
import DonationModal from '@/components/modals/DonationModal';
import { FOUNDATION_INFO } from '@/data/mockData';
import { Language } from '@/types';

export default function ContactPage() {
  const [lang, setLang] = useState<Language>('bn');
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [assistanceModalOpen, setAssistanceModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contactInfo.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1E293B]">
      <Navbar 
        lang={lang} 
        onToggleLang={() => setLang(l => l === 'bn' ? 'en' : 'bn')} 
        onOpenDonation={() => setDonationModalOpen(true)}
      />

      <main className="flex-1 pb-24 sm:pb-16">
        <div className="max-w-xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          
          {/* Header Title Matching Wireframe */}
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#E53935] tracking-tight mb-2">
              {lang === 'bn' ? 'যোগাযোগ' : 'Contact Us'}
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 font-medium">
              {lang === 'bn'
                ? 'যেকোনো অনুসন্ধান, মানবিক সহায়তা বা পরামর্শের জন্য আমাদের সাথে সরাসরি যোগাযোগ করুন।'
                : 'Reach out to our team for queries, aid assistance, or volunteer collaboration.'}
            </p>
          </div>

          {/* Map Placeholder Card Matching Wireframe [মানচিত্র] */}
          <div className="relative aspect-16/9 bg-stone-100 rounded-2xl border border-stone-200 overflow-hidden mb-6 flex flex-col items-center justify-center text-center p-6 shadow-2xs">
            <MapPin className="w-8 h-8 text-[#E53935] mb-2" />
            <span className="text-sm font-bold text-stone-700">[মানচিত্র: রৌমারী, কুড়িগ্রাম]</span>
            <span className="text-xs text-stone-400 mt-1">ডাকবাংলো মোড়, থানা রোড, রৌমারী</span>
          </div>

          {/* Office Address Card Matching Wireframe */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 mb-8 shadow-xs">
            <h2 className="text-base sm:text-lg font-bold text-stone-900 mb-1">
              {lang === 'bn' ? FOUNDATION_INFO.nameBn : FOUNDATION_INFO.nameEn}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mb-2">
              {lang === 'bn' ? 'রৌমারী, কুড়িগ্রাম' : 'Rowmari, Kurigram'}
            </p>
            <p className="text-xs text-stone-500 flex flex-wrap gap-2">
              <span>{FOUNDATION_INFO.hotline}</span>
              <span>•</span>
              <span>{FOUNDATION_INFO.email}</span>
              <span>•</span>
              <span className="text-[#0D5C35] font-semibold">facebook.com/rowmarijanakalyan</span>
            </p>
          </div>

          {/* Section: বার্তা পাঠান Matching Wireframe */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-xs">
            <h2 className="text-xl font-bold text-[#E53935] tracking-tight mb-4">
              {lang === 'bn' ? 'বার্তা পাঠান' : 'Send a Message'}
            </h2>

            {submitted ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-[#0D5C35] mx-auto mb-2" />
                <h3 className="text-lg font-bold text-stone-900 mb-1">
                  {lang === 'bn' ? 'আপনার বার্তা সফলভাবে গৃহীত হয়েছে!' : 'Message Received Successfully!'}
                </h3>
                <p className="text-xs text-stone-500 mb-4">
                  {lang === 'bn' ? 'আমাদের প্রতিনিধি দ্রুত আপনার সাথে যোগাযোগ করবেন।' : 'Our team will respond to your inquiry shortly.'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setContactInfo('');
                    setMessage('');
                  }}
                  className="px-5 py-2 rounded-xl bg-stone-100 text-stone-700 text-xs font-bold hover:bg-stone-200 transition cursor-pointer"
                >
                  {lang === 'bn' ? 'নতুন বার্তা পাঠান' : 'Send Another Message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {lang === 'bn' ? 'নাম' : 'Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={lang === 'bn' ? 'আপনার পূর্ণ নাম লিখুন' : 'Enter your full name'}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0D5C35] bg-stone-50 focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {lang === 'bn' ? 'ইমেইল / মোবাইল' : 'Email / Mobile'}
                  </label>
                  <input
                    type="text"
                    required
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder={lang === 'bn' ? '০১৭XXXXXXXX বা ইমেইল' : '017XXXXXXXX or email'}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0D5C35] bg-stone-50 focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {lang === 'bn' ? 'বার্তা' : 'Message'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={lang === 'bn' ? 'আপনার বক্তব্য বিস্তারিত লিখুন...' : 'Write your inquiry here...'}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0D5C35] bg-stone-50 focus:bg-white transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#0D5C35] hover:bg-[#094527] text-white font-bold text-sm sm:text-base transition duration-150 shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'পাঠান' : 'Send'}</span>
                </button>
              </form>
            )}
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
