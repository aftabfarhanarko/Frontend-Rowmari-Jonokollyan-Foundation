'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Stethoscope, 
  Shirt, 
  GraduationCap, 
  Wheat, 
  Banknote, 
  Ambulance 
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AssistanceModal from '@/components/modals/AssistanceModal';
import TrackingResultModal from '@/components/modals/TrackingResultModal';
import { MOCK_APPLICATIONS } from '@/data/mockData';
import { Language, ApplicationTrackingStatus } from '@/types';

export default function GetHelpPage() {
  const [lang, setLang] = useState<Language>('bn');
  const [assistanceModalOpen, setAssistanceModalOpen] = useState(false);
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [trackingInput, setTrackingInput] = useState('');
  const [trackingRecord, setTrackingRecord] = useState<ApplicationTrackingStatus | null>(null);
  const [applicationsMap, setApplicationsMap] = useState<Record<string, ApplicationTrackingStatus>>(MOCK_APPLICATIONS);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingInput.trim()) return;
    const key = trackingInput.trim().toUpperCase();
    setTrackingRecord(applicationsMap[key] || null);
    setTrackingModalOpen(true);
  };

  const handleSubmitted = (newId: string) => {
    const newRecord: ApplicationTrackingStatus = {
      id: newId,
      applicantName: 'সম্মানিত আবেদনকারী',
      categoryBn: 'মানবিক সহায়তা আবেদন',
      categoryEn: 'Assistance Application',
      submittedDateBn: 'আজই (নতুন)',
      submittedDateEn: 'Today (New)',
      status: 'pending',
      statusNoteBn: 'আপনার আবেদনটি সংরক্ষিত হয়েছে। ফিল্ড ভেরিফিকেশন কমিটি খুব শীঘ্রই তথ্য যাচাই করবে।',
      statusNoteEn: 'Application logged and waiting for verification review.',
      assignedOfficerBn: 'যাচাই কমিটি, রৌমারী শাখা',
    };
    setApplicationsMap(prev => ({ ...prev, [newId]: newRecord }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBF9] text-[#1E293B]">
      <Navbar lang={lang} onToggleLang={() => setLang(l => l === 'bn' ? 'en' : 'bn')} />

      <main className="flex-1">
        {/* Banner */}
        <section className="bg-gradient-to-b from-emerald-900 to-[#0A4F2E] text-white py-16 md:py-20 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold mb-3 border border-emerald-700">
              {lang === 'bn' ? 'সহায়তা ও আবেদন সেবা' : 'Humanitarian Aid Services'}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              {lang === 'bn' ? 'সহায়তার আবেদন ও ট্র্যাকিং' : 'Request Assistance & Track'}
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed mb-6">
              {lang === 'bn'
                ? 'চিকিৎসা, শিক্ষা, খাদ্য, শীতবস্ত্র বা জরুরি দুর্যোগে রৌমারী জনকল্যাণ ফাউন্ডেশনের সহায়তার আবেদন করুন।'
                : 'Apply for medical aid, winter relief, education stipends, or food assistance.'}
            </p>
            <button
              onClick={() => setAssistanceModalOpen(true)}
              className="px-7 py-3 rounded-xl bg-white text-emerald-950 font-bold text-sm shadow-md hover:bg-stone-100 transition cursor-pointer inline-flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-emerald-950" />
              <span>{lang === 'bn' ? 'নতুন সহায়তার আবেদন করুন' : 'Submit Assistance Application'}</span>
            </button>
          </div>
        </section>

        {/* Live Tracking Card Anchor */}
        <section id="track" className="py-12 bg-white border-b border-stone-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mb-2">
              {lang === 'bn' ? 'পূর্বে জমাকৃত আবেদনের অবস্থা দেখুন' : 'Track Your Application Status'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mb-6">
              {lang === 'bn' ? 'আবেদনের সময় প্রাপ্ত ট্র্যাকিং আইডি লিখুন (যেমন: RJF-2026-0842)' : 'Enter your reference code (e.g. RJF-2026-0842)'}
            </p>

            <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto">
              <input
                type="text"
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                placeholder="RJF-2026-XXXX"
                className="flex-1 px-4 py-3 rounded-xl border border-stone-300 text-sm font-mono focus:outline-hidden focus:ring-2 focus:ring-emerald-700 uppercase"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Search className="w-4 h-4" />
                <span>{lang === 'bn' ? 'খুঁজুন' : 'Track'}</span>
              </button>
            </form>

            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-stone-500">
              <span>ডেমো আইডি:</span>
              {['RJF-2026-0842', 'RJF-2026-0915', 'RJF-2026-0720'].map(code => (
                <button
                  key={code}
                  type="button"
                  onClick={() => {
                    setTrackingInput(code);
                    setTrackingRecord(applicationsMap[code]);
                    setTrackingModalOpen(true);
                  }}
                  className="font-mono text-emerald-800 underline font-semibold cursor-pointer"
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Categories of Assistance */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D5C35] mb-2">
                {lang === 'bn' ? 'সহায়তার খাত ও নিয়মাবলী' : 'Assistance Categories'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-500">
                {lang === 'bn' ? 'প্রতিটি ক্যাটাগরির জন্য নির্ধারিত রিভিউ কমিটি দ্রুত যাচাই করে অনুদান প্রদান করে' : 'Every category has dedicated review teams to verify needs.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Stethoscope, title: 'চিকিৎসা সহায়তা', desc: 'মুমূর্ষু ও অসচ্ছল রোগীর ওষুধ, অস্ত্রোপচার ও পরীক্ষা-নিরীক্ষার খরচ।' },
                { icon: Shirt, title: 'শীতবস্ত্র ও কম্বল', desc: 'চরাঞ্চলের ছিন্নমূল পরিবার ও শিশুদের জন্য শীতবস্ত্র ও কম্বল বিতরণ।' },
                { icon: GraduationCap, title: 'শিক্ষা সহায়তা', desc: 'দরিদ্র মেধাবী শিক্ষার্থীদের পরীক্ষার ফি, বই ও শিক্ষা উপকরণ অনুদান।' },
                { icon: Wheat, title: 'জরুরি খাদ্য সহায়তা', desc: 'বন্যা, নদীভাঙন ও কর্মহীন সময়ে জরুরি খাদ্যসামগ্রীর প্যাকেট পৌঁছে দেওয়া।' },
                { icon: Banknote, title: 'এককালীন আর্থিক অনুদান', desc: 'আকস্মিক দুর্যোগ বা মারাত্মক আর্থিক সংকটে থাকা পরিবারের পাশে এককালীন নগদ সহায়তা।' },
                { icon: Ambulance, title: 'জরুরি স্থানান্তর', desc: 'দুর্গম চরাঞ্চল থেকে সদর বা মেডিকেল কলেজে আশঙ্কাজনক রোগী স্থানান্তরে সহায়তা।' },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-6 bg-white rounded-2xl border border-stone-200 shadow-2xs hover:shadow-md transition">
                    <Icon className="w-8 h-8 text-emerald-800 mb-3" />
                    <h3 className="text-base font-bold text-stone-900 mb-2">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={() => setAssistanceModalOpen(true)}
                className="px-8 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md transition cursor-pointer inline-flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-white" />
                <span>{lang === 'bn' ? 'অনলাইনে সহায়তার আবেদন ফর্ম পূরণ করুন' : 'Fill Assistance Application Online'}</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />

      <AssistanceModal
        isOpen={assistanceModalOpen}
        onClose={() => setAssistanceModalOpen(false)}
        lang={lang}
        onSubmittedSuccess={handleSubmitted}
      />

      <TrackingResultModal
        isOpen={trackingModalOpen}
        onClose={() => setTrackingModalOpen(false)}
        lang={lang}
        application={trackingRecord}
        searchedId={trackingInput}
      />
    </div>
  );
}
