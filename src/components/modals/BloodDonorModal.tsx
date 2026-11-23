'use client';

import React, { useState } from 'react';
import { Language } from '@/types';

interface BloodDonorModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export default function BloodDonorModal({
  isOpen,
  onClose,
  lang,
}: BloodDonorModalProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [upazila, setUpazila] = useState('রৌমারী');
  const [village, setVillage] = useState('');
  const [lastDonation, setLastDonation] = useState('');
  const [availability, setAvailability] = useState('available');
  const [agreeConsent, setAgreeConsent] = useState(true);
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
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-rose-100 p-6 md:p-8 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-800 transition"
        >
          ✕
        </button>

        {isSuccess ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-3xl font-bold">
              ✓
            </div>
            <h3 className="text-2xl font-bold text-stone-900 mb-2">
              {lang === 'bn' ? 'স্বেচ্ছায় রক্তদাতা হিসেবে নিবন্ধন সম্পন্ন!' : 'Donor Registration Complete!'}
            </h3>
            <p className="text-stone-600 mb-6 text-sm">
              {lang === 'bn'
                ? 'মানবিক এই মহৎ উদ্যোগে যুক্ত হওয়ার জন্য রৌমারী জনকল্যাণ ফাউন্ডেশনের পক্ষ থেকে আপনাকে আন্তরিক শুভেচ্ছা ও কৃতজ্ঞতা।'
                : 'Thank you for joining our network of volunteer blood donors in Rowmari.'}
            </p>
            <div className="p-4 bg-stone-50 rounded-xl text-left text-xs text-stone-600 space-y-2 mb-6 border border-stone-200">
              <div className="flex justify-between">
                <span>রক্তের গ্রুপ:</span> <strong className="text-red-700">{bloodGroup}</strong>
              </div>
              <div className="flex justify-between">
                <span>এলাকা:</span> <strong>{upazila}, কুড়িগ্রাম</strong>
              </div>
              <div className="flex justify-between">
                <span>প্রাইভেসি স্ট্যাটাস:</span> <span className="text-emerald-700 font-semibold">সুরক্ষিত (পাবলিক ডিরেক্টরিতে অদৃশ্য)</span>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-medium transition shadow-md"
            >
              {lang === 'bn' ? 'ঠিক আছে' : 'Done'}
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-red-100 text-red-700 flex items-center justify-center text-xl font-bold">
                ❤️
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-stone-900">
                  {lang === 'bn' ? 'স্বেচ্ছায় রক্তদাতা নিবন্ধন' : 'Register as Blood Donor'}
                </h2>
                <p className="text-xs md:text-sm text-stone-500">
                  {lang === 'bn'
                    ? 'আপনার ১ ব্যাগ রক্ত বাঁচাতে পারে একটি অসহায় মানুষের জীবন'
                    : 'Your blood donation can save an innocent life'}
                </p>
              </div>
            </div>

            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 text-xs">
              🛡️ <strong>{lang === 'bn' ? 'কঠোর গোপনীয়তা সুরক্ষা:' : 'Strict Privacy Policy:'}</strong>{' '}
              {lang === 'bn'
                ? 'আপনার ফোন নম্বর কোনো পাবলিক লিস্টে প্রকাশ করা হবে না। রক্তের জরুরি প্রয়োজনে কেবল অনুমোদিত ব্লাড সমন্বয়ক আপনার সম্মতি নিয়ে যোগাযোগ করবেন।'
                : 'Your contact number is NEVER published publicly. Only authorized coordinators contact you when needed.'}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  {lang === 'bn' ? 'আপনার রক্তের গ্রুপ *' : 'Your Blood Group *'}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((group) => (
                    <button
                      type="button"
                      key={group}
                      onClick={() => setBloodGroup(group)}
                      className={`py-2 px-2 rounded-xl font-bold text-sm border text-center transition ${
                        bloodGroup === group
                          ? 'bg-red-700 text-white border-red-700 shadow-xs'
                          : 'bg-white border-stone-200 text-stone-700 hover:bg-rose-50'
                      }`}
                    >
                      {group}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {lang === 'bn' ? 'আপনার পূর্ণ নাম *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={lang === 'bn' ? 'আপনার নাম' : 'Full Name'}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-red-600"
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
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-red-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'উপজেলা *' : 'Upazila *'}
                  </label>
                  <select
                    value={upazila}
                    onChange={(e) => setUpazila(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-red-600 bg-white"
                  >
                    <option value="রৌমারী">রৌমারী, কুড়িগ্রাম</option>
                    <option value="রাজীবপুর">রাজীবপুর, কুড়িগ্রাম</option>
                    <option value="কুড়িগ্রাম সদর">কুড়িগ্রাম সদর</option>
                    <option value="অন্যান্য">অন্যান্য নিকটবর্তী এলাকা</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'গ্রাম / এলাকা' : 'Village / Area'}
                  </label>
                  <input
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    placeholder={lang === 'bn' ? 'যেমন: দাঁতভাঙ্গা বাজার' : 'Area name'}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-red-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'সর্বশেষ রক্তদানের তারিখ' : 'Last Donation Date'}
                  </label>
                  <input
                    type="text"
                    value={lastDonation}
                    onChange={(e) => setLastDonation(e.target.value)}
                    placeholder={lang === 'bn' ? 'যেমন: ৩ মাস আগে / জানা নেই' : 'e.g. 3 months ago / Never'}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-red-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {lang === 'bn' ? 'আপনার উপস্থিতি স্ট্যাটাস' : 'Availability Status'}
                </label>
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-red-600 bg-white"
                >
                  <option value="available">রক্তদানের জন্য প্রস্তুত (Ready to donate)</option>
                  <option value="emergency_only">কেবলমাত্র অতি-জরুরি মুহূর্তে (Emergency only)</option>
                  <option value="cooldown">বর্তমানে সাময়িক বিরতিতে (On cooldown / Recently donated)</option>
                </select>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="donorConsent"
                  checked={agreeConsent}
                  onChange={(e) => setAgreeConsent(e.target.checked)}
                  className="mt-0.5 rounded text-red-700 focus:ring-red-600"
                />
                <label htmlFor="donorConsent" className="text-xs text-stone-600">
                  {lang === 'bn'
                    ? 'আমি স্বেচ্ছায় রক্তদাতা হতে সম্মত এবং ফাউন্ডেশনের দায়িত্বশীল সমন্বয়ের মাধ্যমে জরুরি রোগীর প্রয়োজনে রক্তদানে আগ্রহী।'
                    : 'I voluntarily register as a donor and agree to be contacted for emergency patients through foundation coordination.'}
                </label>
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
                  disabled={submitting || !agreeConsent}
                  className="px-6 py-2.5 rounded-xl bg-red-700 hover:bg-red-800 disabled:opacity-50 text-white font-semibold text-sm transition shadow-md"
                >
                  {submitting
                    ? lang === 'bn' ? 'নিবন্ধন হচ্ছে...' : 'Registering...'
                    : lang === 'bn' ? 'রক্তদাতা হিসেবে নিবন্ধন করুন' : 'Complete Registration'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
