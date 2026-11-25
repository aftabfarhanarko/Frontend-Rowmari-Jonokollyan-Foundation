'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  Droplet
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomBar from '@/components/MobileBottomBar';
import BackToTop from '@/components/BackToTop';
import AssistanceModal from '@/components/modals/AssistanceModal';
import DonationModal from '@/components/modals/DonationModal';
import { GlassSection, SectionHeading, glassCard, glassCardHover } from '@/components/ui/glass';
import { FOUNDATION_INFO } from '@/data/mockData';
import { Language } from '@/types';
import { contactSchema, ContactFormData } from '@/lib/validations/contactSchema';
import { useSendContactMessageMutation } from '@/store/api/applicationsApi';
import { useGetPublicSettingsQuery } from '@/store/api/adminApi';
import { toast } from 'sonner';

export default function ContactPage() {
  const [lang, setLang] = useState<Language>('bn');
  const [sendContactMessage, { isLoading: isSubmitting }] = useSendContactMessageMutation();
  const { data: publicSettings } = useGetPublicSettingsQuery();
  const [submitted, setSubmitted] = useState(false);
  const [assistanceModalOpen, setAssistanceModalOpen] = useState(false);
  const [donationModalOpen, setDonationModalOpen] = useState(false);

  const t = (bn: string, en: string) => (lang === 'bn' ? bn : en);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      contactInfo: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await sendContactMessage(data).unwrap();
      setSubmitted(true);
      reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : (lang === 'bn' ? 'বার্তা পাঠানো যাচ্ছে না।' : 'Contact messages are currently unavailable.'));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBF9] text-[#1E293B]">
      <Navbar 
        lang={lang} 
        onToggleLang={() => setLang(l => l === 'bn' ? 'en' : 'bn')} 
        onOpenDonation={() => setDonationModalOpen(true)}
      />

      <main className="flex-1 pb-20 sm:pb-24">
        {/* Header Hero Banner */}
        <section className="relative overflow-hidden pt-8 pb-10 sm:pt-12 sm:pb-14 bg-gradient-to-b from-emerald-50/50 via-white to-[#FAFBF9]">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
            <div className="absolute top-1/2 -right-20 h-80 w-80 rounded-full bg-red-300/20 blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#0D5C35] text-xs font-bold mb-3 shadow-2xs">
                <MapPin className="w-3.5 h-3.5 text-[#0D5C35]" />
                <span>{t('রৌমারী প্রধান কার্যালয় ও সার্বক্ষণিক হেল্পডেস্ক', 'Rowmari Main Headquarters & 24/7 Desk')}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-4">
                {t('যোগাযোগ ও যেকোনো সহায়তার ঠিকানা', 'Contact & Emergency Helpline')}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-stone-600 leading-relaxed font-normal">
                {t(
                  'রৌমারী জনকল্যাণ ফাউন্ডেশনের কার্যালয়ে সরাসরি উপস্থিত হয়ে, জরুরি রক্তদান ডেস্কে কল করে অথবা অনলাইন বার্তার মাধ্যমে যেকোনো প্রয়োজনে যোগাযোগ করুন।',
                  'Visit our central office in Rowmari, Kurigram, dial our 24/7 emergency blood line, or send an inquiry directly to our administrative committee.'
                )}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Content Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            {/* Contact Details Cards */}
            <div className="lg:col-span-5 space-y-4">
              <div className={`${glassCard} p-6 sm:p-7 space-y-5 shadow-lg`}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#0D5C35] flex items-center justify-center shrink-0 shadow-xs">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-stone-900 mb-1">{t('প্রধান কার্যালয়', 'Headquarters Address')}</h2>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {FOUNDATION_INFO.addressBn}
                    </p>
                    <span className="text-[11px] text-[#0D5C35] font-semibold block mt-1">
                      {t('কুড়িগ্রাম জেলা, রংপুর বিভাগ', 'Kurigram District, Bangladesh')}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200/70 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-100 text-[#E53935] flex items-center justify-center shrink-0 shadow-xs">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-stone-900 mb-1">{t('জরুরি হটলাইন', 'Emergency Hotlines')}</h2>
                    <div className="space-y-0.5 text-xs sm:text-sm font-mono font-bold text-stone-800">
                      <div>{FOUNDATION_INFO.phonePrimary} ({t('সাধারণ তথ্য', 'General')})</div>
                      <div className="text-[#E53935]">{FOUNDATION_INFO.emergencyBloodHotline} ({t('জরুরি রক্তদান', 'Blood Desk')})</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200/70 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 shadow-xs">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-stone-900 mb-1">{t('অফিসিয়াল ইমেইল', 'Official Email')}</h2>
                    <p className="text-xs sm:text-sm font-mono text-stone-700">{FOUNDATION_INFO.email}</p>
                    <span className="text-[11px] text-stone-500 block mt-0.5">
                      {t('যেকোনো দাপ্তরিক প্রস্তাব বা অনুদান বিষয়ক তথ্য', 'Official correspondence & partnership inquiries')}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200/70 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 shadow-xs">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-stone-900 mb-1">{t('অফিস সময়সূচী', 'Office Hours')}</h2>
                    <p className="text-xs sm:text-sm text-stone-600">
                      {t('শনিবার - বৃহস্পতিবার: সকাল ৯টা - বিকাল ৫টা', 'Sat - Thu: 9:00 AM - 5:00 PM')}
                    </p>
                    <span className="text-[11px] text-red-600 font-bold block mt-0.5">
                      {t('জরুরি রক্তদান ও ত্রাণ হটলাইন ২৪/৭ খোলা', 'Emergency blood & relief desk is open 24/7')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Form Card */}
            <div className={`${glassCard} lg:col-span-7 p-6 sm:p-8 shadow-xl flex flex-col justify-between`}>
              <div>
                <div className="mb-6">
                  <span className="text-xs font-bold text-[#0D5C35] uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded inline-block mb-1.5">
                    {t('অনলাইন বার্তা প্রেরণ', 'Send Direct Message')}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-stone-900 leading-tight">
                    {t('আমাদের কোনো পরামর্শ, জিজ্ঞাসা বা মতামত জানাতে লিখুন', 'Have a Suggestion or Question? Write to Us')}
                  </h2>
                </div>

                {submitted ? (
                  <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 my-6">
                    <div className="w-14 h-14 rounded-full bg-[#0D5C35] text-white flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h2 className="text-lg font-bold text-stone-900">{t('বার্তা সফলভাবে পাঠানো হয়েছে!', 'Message Sent Successfully!')}</h2>
                    <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                      {t('আপনার বার্তা আমাদের কার্যনির্বাহী কমিটির নিকট সংরক্ষিত হয়েছে। প্রয়োজনীয় বিষয়ে দ্রুত আপনার সাথে যোগাযোগ করা হবে।', 'Thank you for reaching out. Our committee coordinator will review your message and get in touch if required.')}
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-2 rounded-xl bg-[#0D5C35] text-white font-bold text-xs cursor-pointer"
                    >
                      {t('আরেকটি বার্তা পাঠান', 'Send Another Message')}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        {t('আপনার পূর্ণ নাম *', 'Full Name *')}
                      </label>
                      <input
                        type="text"
                        {...register('name')}
                        placeholder={t('উদাঃ মোঃ আব্দুল্লাহ', 'e.g. Md. Abdullah')}
                        className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0D5C35]"
                      />
                      {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        {t('মোবাইল নম্বর অথবা ইমেইল *', 'Mobile Number or Email *')}
                      </label>
                      <input
                        type="text"
                        {...register('contactInfo')}
                        placeholder={t('উদাঃ 01712-345678 / user@email.com', 'e.g. 01712-345678 or user@email.com')}
                        className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0D5C35]"
                      />
                      {errors.contactInfo && <p className="text-red-600 text-xs mt-1">{errors.contactInfo.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        {t('আপনার বার্তা বা পরামর্শ *', 'Your Message or Suggestion *')}
                      </label>
                      <textarea
                        rows={4}
                        {...register('message')}
                        placeholder={t('আপনার কথা বিস্তারিত লিখুন...', 'Write your message details...')}
                        className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0D5C35]"
                      />
                      {errors.message && <p className="text-red-600 text-xs mt-1">{errors.message.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-[#0D5C35] hover:bg-[#094527] text-white font-bold text-xs sm:text-sm transition cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? t('বার্তা পাঠানো হচ্ছে...', 'Sending Message...') : t('বার্তা পাঠান', 'Submit Message')}</span>
                    </button>
                  </form>
                )}
              </div>
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

      <BackToTop />

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
