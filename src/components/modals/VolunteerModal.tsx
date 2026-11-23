'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, Users } from 'lucide-react';
import { Language } from '@/types';

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export default function VolunteerModal({
  isOpen,
  onClose,
  lang,
}: VolunteerModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [occupation, setOccupation] = useState('');
  const [interestArea, setInterestArea] = useState('relief');
  const [upazila, setUpazila] = useState('রৌমারী');
  const [motivation, setMotivation] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setIsSuccess(true);
      setSubmitting(false);
    }, 500);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 md:p-8 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-800 transition cursor-pointer"
        >
          <X className="w-4 h-4 text-stone-600" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-700" />
            </div>
            <h3 className="text-2xl font-bold text-stone-900 mb-2">
              {lang === 'bn' ? 'স্বেচ্ছাসেবক আবেদন সফল!' : 'Volunteer Application Received!'}
            </h3>
            <p className="text-stone-600 mb-6 text-sm">
              {lang === 'bn'
                ? 'রৌমারী জনকল্যাণ ফাউন্ডেশনের মানবকল্যাণ কাফেলায় আপনাকে স্বাগত। আমাদের ভলান্টিয়ার কো-অর্ডিনেটর শীঘ্রই আপনার সাথে যোগাযোগ করবেন।'
                : 'Welcome to our volunteer family! Our coordinator will contact you shortly.'}
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-medium transition shadow-md cursor-pointer"
            >
              {lang === 'bn' ? 'ঠিক আছে' : 'Done'}
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Users className="w-6 h-6 text-emerald-800" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-stone-900">
                  {lang === 'bn' ? 'স্বেচ্ছাসেবক হিসেবে যুক্ত হোন' : 'Join as a Volunteer'}
                </h2>
                <p className="text-xs md:text-sm text-stone-500">
                  {lang === 'bn'
                    ? 'আপনার মেধা ও শ্রম দিয়ে রৌমারীর মানুষের পাশে দাঁড়ান'
                    : 'Serve the people of Rowmari with your skills and time'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {lang === 'bn' ? 'আপনার নাম *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={lang === 'bn' ? 'পুরো নাম' : 'Name'}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'পেশা / শিক্ষাপ্রতিষ্ঠান *' : 'Occupation / College *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    placeholder={lang === 'bn' ? 'যেমন: শিক্ষার্থী / শিক্ষক' : 'e.g. Student'}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {lang === 'bn' ? 'কাজের আগ্রহের ক্ষেত্র *' : 'Area of Interest *'}
                </label>
                <select
                  value={interestArea}
                  onChange={(e) => setInterestArea(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white"
                >
                  <option value="relief">মাঠপর্যায়ে ত্রাণ ও শীতবস্ত্র বিতরণ (Relief Distribution)</option>
                  <option value="medical">মেডিকেল ও হেলথ ক্যাম্প পরিচালনা (Medical Camps)</option>
                  <option value="blood">জরুরি রক্তদাতা নেটওয়ার্ক সমন্বয় (Blood Coordination)</option>
                  <option value="media">মিডিয়া, ফটোগ্রাফি ও তথ্যপ্রযুক্তি (Media & IT)</option>
                  <option value="education">শিক্ষা ও ছাত্রকল্যাণ কর্মসূচি (Education Program)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {lang === 'bn' ? 'এলাকা / ইউনিয়ন *' : 'Location / Union *'}
                </label>
                <select
                  value={upazila}
                  onChange={(e) => setUpazila(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white"
                >
                  <option value="রৌমারী সদর">রৌমারী সদর</option>
                  <option value="দাঁতভাঙ্গা">দাঁতভাঙ্গা</option>
                  <option value="বন্দবেড়">বন্দবেড়</option>
                  <option value="চর শৌলমারী">চর শৌলমারী</option>
                  <option value="যাদুর চর">যাদুর চর</option>
                  <option value="শৌলমারী">শৌলমারী</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {lang === 'bn' ? 'কেন যুক্ত হতে চান?' : 'Why do you want to join?'}
                </label>
                <textarea
                  rows={2}
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  placeholder={lang === 'bn' ? 'সংক্ষেপে লিখুন...' : 'Brief note...'}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-stone-600 hover:text-stone-800 text-sm font-medium"
                >
                  {lang === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white font-semibold text-sm transition shadow-md"
                >
                  {submitting
                    ? lang === 'bn' ? 'জমা হচ্ছে...' : 'Submitting...'
                    : lang === 'bn' ? 'নিবন্ধন সম্পন্ন করুন' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
