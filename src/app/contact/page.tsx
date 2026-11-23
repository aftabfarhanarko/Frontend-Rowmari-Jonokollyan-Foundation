'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FOUNDATION_INFO } from '@/data/mockData';
import { Language } from '@/types';

export default function ContactPage() {
  const [lang, setLang] = useState<Language>('bn');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBF9] text-[#1E293B]">
      <Navbar lang={lang} onToggleLang={() => setLang(l => l === 'bn' ? 'en' : 'bn')} />

      <main className="flex-1">
        {/* Banner */}
        <section className="bg-gradient-to-b from-emerald-900 to-[#0A4F2E] text-white py-16 md:py-20 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold mb-3 border border-emerald-700">
              {lang === 'bn' ? 'আমাদের সাথে যুক্ত থাকুন' : 'Reach Out to Us'}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              {lang === 'bn' ? 'যোগাযোগ ও প্রধান কার্যালয়' : 'Contact Us'}
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              {lang === 'bn'
                ? 'যেকোনো অনুসন্ধান, সহায়তা বা পরামর্শের জন্য আমাদের সাথে সরাসরি যোগাযোগ করুন।'
                : 'Connect with our administration, emergency blood coordinators, or visit our office.'}
            </p>
          </div>
        </section>

        {/* Contact Body */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Column: Office info & Hotlines */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-5">
                  <h2 className="text-xl font-bold text-stone-900">
                    {lang === 'bn' ? 'অফিস ঠিকানা ও হটলাইন' : 'Headquarters & Hotlines'}
                  </h2>

                  <div className="space-y-4 text-xs sm:text-sm text-stone-600">
                    <div className="flex items-start gap-3">
                      <span className="text-xl">📍</span>
                      <div>
                        <strong className="text-stone-900 block">{lang === 'bn' ? 'কেন্দ্রীয় কার্যালয়:' : 'Head Office:'}</strong>
                        <span>{lang === 'bn' ? FOUNDATION_INFO.addressBn : FOUNDATION_INFO.addressEn}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="text-xl">📞</span>
                      <div>
                        <strong className="text-stone-900 block">{lang === 'bn' ? 'সাধারণ হটলাইন:' : 'General Helpline:'}</strong>
                        <span className="font-mono text-emerald-800 font-bold">{FOUNDATION_INFO.hotline}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="text-xl">🩸</span>
                      <div>
                        <strong className="text-stone-900 block">{lang === 'bn' ? '২৪/৭ রক্তদান জরুরি হটলাইন:' : '24/7 Emergency Blood Helpline:'}</strong>
                        <span className="font-mono text-red-600 font-bold">{FOUNDATION_INFO.emergencyBloodHotline}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="text-xl">✉️</span>
                      <div>
                        <strong className="text-stone-900 block">{lang === 'bn' ? 'অফিসিয়াল ইমেইল:' : 'Official Email:'}</strong>
                        <span className="font-mono text-stone-700">{FOUNDATION_INFO.email}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="text-xl">🕒</span>
                      <div>
                        <strong className="text-stone-900 block">{lang === 'bn' ? 'অফিস সময়:' : 'Office Hours:'}</strong>
                        <span>সকাল ৯:০০ টা — বিকাল ৫:০০ টা (শুক্রবার বন্ধ)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Map Placeholder */}
                <div className="bg-emerald-950/10 p-6 rounded-2xl border border-emerald-200 text-center space-y-2">
                  <span className="text-4xl block">🗺️</span>
                  <h4 className="font-bold text-emerald-900 text-sm">
                    {lang === 'bn' ? 'রৌমারী ডাকবাংলো মোড়, কুড়িগ্রাম' : 'Rowmari Dakbangla Mor, Kurigram'}
                  </h4>
                  <p className="text-xs text-stone-500">
                    রৌমারী থানা ও মডেল স্কুলের নিকটে অবস্থিত।
                  </p>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="lg:col-span-7">
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-md">
                  {submitted ? (
                    <div className="text-center py-10">
                      <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center text-3xl font-bold">
                        ✓
                      </div>
                      <h3 className="text-2xl font-bold text-stone-900 mb-2">
                        {lang === 'bn' ? 'আপনার বার্তা গৃহীত হয়েছে!' : 'Message Sent Successfully!'}
                      </h3>
                      <p className="text-stone-600 text-sm max-w-md mx-auto mb-6">
                        {lang === 'bn'
                          ? 'রৌমারী জনকল্যাণ ফাউন্ডেশনের সংশ্লিষ্ট কর্মকর্তা দ্রুত আপনার দেওয়া নম্বরে বা ইমেইলে যোগাযোগ করবেন।'
                          : 'Our administration team will review your message and reach out shortly.'}
                      </p>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setName('');
                          setEmail('');
                          setPhone('');
                          setMessage('');
                        }}
                        className="px-6 py-2.5 bg-emerald-800 text-white rounded-xl text-sm font-semibold hover:bg-emerald-900 transition"
                      >
                        {lang === 'bn' ? 'আরেকটি বার্তা পাঠান' : 'Send Another Message'}
                      </button>
                    </div>
                  ) : (
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mb-2">
                        {lang === 'bn' ? 'অনলাইন বার্তা পাঠান' : 'Send Us a Message'}
                      </h2>
                      <p className="text-xs sm:text-sm text-stone-500 mb-6">
                        {lang === 'bn'
                          ? 'যেকোনো মতামত, সহযোগিতার প্রস্তাব বা অনুসন্ধানের জন্য ফর্মটি পূরণ করুন।'
                          : 'Fill out the form below and our team will get back to you promptly.'}
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              {lang === 'bn' ? 'আপনার নাম *' : 'Your Full Name *'}
                            </label>
                            <input
                              type="text"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="মো: রহমত আলী"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              {lang === 'bn' ? 'মোবাইল নম্বর *' : 'Phone Number *'}
                            </label>
                            <input
                              type="tel"
                              required
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="01XXXXXXXXX"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              {lang === 'bn' ? 'ইমেইল (ঐচ্ছিক)' : 'Email (Optional)'}
                            </label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="example@mail.com"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              {lang === 'bn' ? 'বিষয়ের শিরোনাম *' : 'Subject *'}
                            </label>
                            <input
                              type="text"
                              required
                              value={subject}
                              onChange={(e) => setSubject(e.target.value)}
                              placeholder="ক্যাম্পেইন বা সহায়তা সম্পর্কে"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            {lang === 'bn' ? 'বার্তা / মন্তব্যের বিবরণ *' : 'Your Message *'}
                          </label>
                          <textarea
                            rows={4}
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="আপনার বার্তা এখানে লিখুন..."
                            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                          />
                        </div>

                        <div className="pt-2 flex justify-end">
                          <button
                            type="submit"
                            className="px-7 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm rounded-xl transition shadow-md cursor-pointer"
                          >
                            {lang === 'bn' ? 'বার্তা প্রেরণ করুন' : 'Send Message'}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
