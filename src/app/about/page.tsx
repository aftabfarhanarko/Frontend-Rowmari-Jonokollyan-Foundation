'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Target, 
  Eye
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import AssistanceModal from '@/components/modals/AssistanceModal';
import DonationModal from '@/components/modals/DonationModal';
import { Language } from '@/types';

export default function AboutPage() {
  const [lang, setLang] = useState<Language>('bn');
  const [assistanceModalOpen, setAssistanceModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);

  const milestones = [
    {
      yearBn: '২০১৮',
      yearEn: '2018',
      titleBn: 'ফাউন্ডেশন প্রতিষ্ঠা',
      titleEn: 'Foundation Established',
      descBn: 'রৌমারীর একদল তরুণ ও সমাজসেবীদের উদ্যোগে দুর্গম চরাঞ্চলের শীতার্ত ও বন্যাপীড়িত মানুষের সেবায় আত্মপ্রকাশ।',
      descEn: 'Initiated by committed local youths to serve flood-hit and winter-affected river island char families in Rowmari.',
      theme: 'green',
    },
    {
      yearBn: '২০২০',
      yearEn: '2020',
      titleBn: 'জরুরি রক্তদাতা নেটওয়ার্ক ও করোনা সহায়তা',
      titleEn: 'Emergency Blood Network & Pandemic Relief',
      descBn: 'রৌমারী উপজেলা স্বাস্থ্য কমপ্লেক্সের রোগীদের জন্য সার্বক্ষণিক ব্লাড ডোনার গ্রুপ ও মহামারীকালীন জরুরি খাদ্য কর্মসূচি চালু।',
      descEn: 'Established 24/7 volunteer blood donor network and dispatched emergency pandemic rations.',
      theme: 'red',
    },
    {
      yearBn: '২০২৩',
      yearEn: '2023',
      titleBn: 'বিনামূল্যে স্বাস্থ্য ও চক্ষু ক্যাম্প বিস্তার',
      titleEn: 'Free Eye & Healthcare Camp Expansion',
      descBn: 'বিশেষজ্ঞ চিকিৎসকদের নিয়ে বিনামূল্যে ভ্রাম্যমাণ স্বাস্থ্য ক্যাম্প ও নিয়মিত শিক্ষাবৃত্তি কার্যক্রম প্রাতিষ্ঠানিক রূপ লাভ করে।',
      descEn: 'Institutionalized mobile healthcare camps, doctor consultations, and annual student scholarships.',
      theme: 'green',
    },
    {
      yearBn: 'আজ (২০২৬)',
      yearEn: 'Today (2026)',
      titleBn: 'বর্তমান কার্যক্রম ও আধুনিক ডিজিটাল ব্যবস্থাপনা',
      titleEn: 'Current Operations & Digital Management',
      descBn: 'স্বচ্ছতা, স্বয়ংক্রিয় ট্র্যাকিং, নিরাপদ অনুদান এবং আধুনিক ডিজিটাল ব্যবস্থার মাধ্যমে সেবার মান ও বিস্তার বৃদ্ধি।',
      descEn: 'Advancing with transparent digital tracking, verified donation receipts, and scalable service delivery.',
      theme: 'red',
    },
  ];

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
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#E53935] tracking-tight mb-2">
              {lang === 'bn' ? 'আমাদের কথা' : 'About Us'}
            </h1>
            <p className="text-sm sm:text-base text-stone-500 font-medium">
              {lang === 'bn' 
                ? '২০১৮ সালে রৌমারী, কুড়িগ্রামে প্রতিষ্ঠিত। [অনুমোদিত ইতিহাস]' 
                : 'Established in 2018 at Rowmari, Kurigram. [Verified History]'}
            </p>
          </div>

          {/* Featured Field Image Matching Wireframe [প্রচ্ছদ ছবি] */}
          <div className="relative w-full aspect-16/9 sm:aspect-21/9 rounded-2xl overflow-hidden shadow-md border border-stone-200 mb-12">
            <Image
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1400&auto=format&fit=crop"
              alt={lang === 'bn' ? 'রৌমারী জনকল্যাণ ফাউন্ডেশন মাঠপর্যায়ের কার্যক্রম' : 'RJF Field Humanitarian Work'}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-xs sm:text-sm font-semibold bg-[#0D5C35] px-3 py-1 rounded-md inline-block mb-1 shadow-sm">
                {lang === 'bn' ? 'রৌমারীর চরাঞ্চলে মানুষের পাশে' : 'Serving Remote River Island Communities'}
              </span>
              <p className="text-xs text-white/90 hidden sm:block">
                {lang === 'bn' 
                  ? 'শীতবস্ত্র, জরুরি চিকিৎসা, খাদ্য এবং দুর্যোগকালীন মানবিক সহায়তায় নিবেদিতপ্রাণ স্বেচ্ছাসেবক দল।' 
                  : 'Dedicated volunteers delivering winter aid, medical care, and disaster relief.'}
              </p>
            </div>
          </div>

          {/* Section: লক্ষ্য ও ভিশন */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-[#E53935] tracking-tight mb-5">
              {lang === 'bn' ? 'লক্ষ্য ও ভিশন' : 'Mission & Vision'}
            </h2>
            <div className="space-y-4">
              {/* Mission Card: Green top border */}
              <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 border-t-4 border-t-[#0D5C35] shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-[#0D5C35]" />
                  <h3 className="text-lg font-bold text-stone-900">
                    {lang === 'bn' ? 'লক্ষ্য' : 'Mission'}
                  </h3>
                </div>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {lang === 'bn'
                    ? 'কুড়িগ্রামের রৌমারী ও দুর্গম চরাঞ্চলের অসহায়, শীতার্ত ও প্রান্তিক জনগোষ্ঠীর মাঝে জরুরি মানবিক সহায়তা, বিনামূল্যে স্বাস্থ্যসেবা ও শিক্ষাবৃত্তি পৌঁছে দিয়ে তাদের জীবনমানের টেকসই উন্নয়ন নিশ্চিত করা।'
                    : 'Providing emergency humanitarian relief, free medical care, and educational scholarships to uplift marginalized families in flood-prone river island chars of Rowmari.'}
                </p>
              </div>

              {/* Vision Card: Red top border */}
              <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 border-t-4 border-t-[#E53935] shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-5 h-5 text-[#E53935]" />
                  <h3 className="text-lg font-bold text-stone-900">
                    {lang === 'bn' ? 'ভিশন' : 'Vision'}
                  </h3>
                </div>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {lang === 'bn'
                    ? 'এমন একটি সমতাভিত্তিক সমাজ বিনির্মাণ, যেখানে দারিদ্র্যের কারণে কোনো মানুষ বিনা চিকিৎসায় মারা যাবে না, শীতে কষ্ট পাবে না এবং শিক্ষার আলো থেকে কোনো শিশু বঞ্চিত থাকবে না।'
                    : 'A compassionate and resilient society where no human suffers untreated illness, freezing cold, or hunger, and no child is denied the light of education.'}
                </p>
              </div>
            </div>
          </section>

          {/* Section: পথচলা (Milestones) */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-[#E53935] tracking-tight mb-5">
              {lang === 'bn' ? 'পথচলা' : 'Our Journey'}
            </h2>
            <div className="space-y-4">
              {milestones.map((m, idx) => {
                const isGreen = m.theme === 'green';
                return (
                  <div
                    key={idx}
                    className={`bg-white p-6 rounded-2xl border border-stone-200 shadow-xs transition hover:shadow-md ${
                      isGreen ? 'border-t-4 border-t-[#0D5C35]' : 'border-t-4 border-t-[#E53935]'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`px-2.5 py-0.5 rounded text-xs font-bold font-mono ${
                        isGreen ? 'bg-emerald-50 text-[#0D5C35]' : 'bg-red-50 text-[#E53935]'
                      }`}>
                        {lang === 'bn' ? m.yearBn : m.yearEn}
                      </span>
                      <h3 className="text-base font-bold text-stone-900">
                        {lang === 'bn' ? m.titleBn : m.titleEn}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-1">
                      {lang === 'bn' ? m.descBn : m.descEn}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Call to action boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="p-6 rounded-2xl bg-[#0D5C35] text-white flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold mb-2">
                  {lang === 'bn' ? 'সহায়তা প্রয়োজন?' : 'Need Assistance?'}
                </h3>
                <p className="text-xs text-emerald-100/90 leading-relaxed mb-4">
                  {lang === 'bn' 
                    ? 'চিকিৎসা, শীতবস্ত্র, খাদ্য বা জরুরি রক্তের জন্য অনলাইনে সরাসরি আবেদন করুন।'
                    : 'Submit an online assistance application for medical, winter, or food aid.'}
                </p>
              </div>
              <button
                onClick={() => setAssistanceModalOpen(true)}
                className="w-full py-2.5 rounded-xl bg-white text-[#0D5C35] font-bold text-xs sm:text-sm hover:bg-stone-100 transition cursor-pointer"
              >
                {lang === 'bn' ? 'সহায়তার আবেদন' : 'Request Help'}
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-white border-2 border-[#E53935] flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#E53935] mb-2">
                  {lang === 'bn' ? 'পাশে দাঁড়াতে চান?' : 'Want to Support?'}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  {lang === 'bn'
                    ? 'আপনার যেকোনো পরিমাণ অনুদান চরাঞ্চলের অসহায় মানুষের মুখে হাসি ফোটাতে পারে।'
                    : 'Your contributions directly fund relief efforts for impoverished families.'}
                </p>
              </div>
              <button
                onClick={() => setDonationModalOpen(true)}
                className="w-full py-2.5 rounded-xl bg-[#E53935] text-white font-bold text-xs sm:text-sm hover:bg-[#D32F2F] transition cursor-pointer shadow-sm"
              >
                {lang === 'bn' ? 'অনুদান দিন' : 'Donate Now'}
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
