'use client';

import React, { useState } from 'react';
import { Language } from '@/types';

interface AssistanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onSubmittedSuccess?: (appId: string) => void;
}

export default function AssistanceModal({
  isOpen,
  onClose,
  lang,
  onSubmittedSuccess,
}: AssistanceModalProps) {
  const [category, setCategory] = useState('medical');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [nid, setNid] = useState('');
  const [unionName, setUnionName] = useState('রৌমারী সদর');
  const [village, setVillage] = useState('');
  const [amountOrItems, setAmountOrItems] = useState('');
  const [description, setDescription] = useState('');
  const [agreeConsent, setAgreeConsent] = useState(true);
  const [generatedId, setGeneratedId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const newId = `RJF-2026-${randomNum}`;
      setGeneratedId(newId);
      setIsSubmitting(false);
      if (onSubmittedSuccess) {
        onSubmittedSuccess(newId);
      }
    }, 600);
  };

  const handleResetAndClose = () => {
    setGeneratedId(null);
    setFullName('');
    setPhone('');
    setDescription('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleResetAndClose();
      }}
    >
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-emerald-100 p-6 md:p-8 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={handleResetAndClose}
          aria-label="Close"
          className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-800 transition"
        >
          ✕
        </button>

        {generatedId ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-3xl font-bold">
              ✓
            </div>
            <h3 className="text-2xl font-bold text-emerald-900 mb-2">
              {lang === 'bn' ? 'আবেদন সফলভাবে গৃহীত হয়েছে!' : 'Application Submitted Successfully!'}
            </h3>
            <p className="text-stone-600 mb-6 text-sm md:text-base">
              {lang === 'bn'
                ? 'আপনার আবেদনটি রৌমারী জনকল্যাণ ফাউন্ডেশনের রিভিউ কমিটিতে পাঠানো হয়েছে। আপনার অনন্য ট্র্যাকিং আইডি:'
                : 'Your assistance request has been queued for verification. Your unique tracking ID:'}
            </p>
            <div className="p-4 bg-emerald-50 border-2 border-dashed border-emerald-400 rounded-xl max-w-xs mx-auto mb-6">
              <span className="text-xs uppercase tracking-wider text-emerald-700 font-semibold block">
                {lang === 'bn' ? 'আবেদন রেফারেন্স আইডি' : 'Application Tracking ID'}
              </span>
              <span className="text-2xl font-mono font-bold text-emerald-950 tracking-wider">
                {generatedId}
              </span>
            </div>
            <p className="text-xs text-stone-500 max-w-md mx-auto mb-6">
              {lang === 'bn'
                ? 'দয়া করে এই আইডি সংরক্ষণ করুন। হোমপেজের "আবেদনের অবস্থা দেখুন" বক্সে এই আইডি লিখে আপনি বর্তমান অগ্রগতি দেখতে পারবেন।'
                : 'Please preserve this ID. You can track status anytime using this ID in the "Track Application" section.'}
            </p>
            <button
              onClick={handleResetAndClose}
              className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-medium transition shadow-md"
            >
              {lang === 'bn' ? 'ঠিক আছে' : 'Done'}
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xl font-bold">
                🤝
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-stone-900">
                  {lang === 'bn' ? 'সহায়তার আবেদন ফর্ম' : 'Application for Assistance'}
                </h2>
                <p className="text-xs md:text-sm text-stone-500">
                  {lang === 'bn'
                    ? 'চিকিৎসা, শিক্ষা, খাদ্য, শীতবস্ত্র বা জরুরি সহযোগিতার আবেদন'
                    : 'Request aid for healthcare, education, food, or emergency relief'}
                </p>
              </div>
            </div>

            <div className="mb-5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
              <span className="text-amber-700 font-bold">ℹ</span>
              <span>
                {lang === 'bn'
                  ? 'গোপনীয়তার নিশ্চয়তা: আবেদনকারীর ব্যক্তিগত ও পারিবারিক তথ্য সর্বোচ্চ সুরক্ষায় রাখা হয় এবং কেবল যাচাই কমিটির অনুমোদনপ্রাপ্ত সদস্যগণ দেখতে পারেন।'
                  : 'Privacy Guarantee: Personal applicant details are strictly kept confidential and only shared with the authorized verification team.'}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {lang === 'bn' ? 'সহায়তার ধরন / ক্যাটাগরি *' : 'Assistance Category *'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'medical', labelBn: 'চিকিৎসা সহায়তা', labelEn: 'Medical Aid' },
                    { id: 'winter', labelBn: 'শীতবস্ত্র / কম্বল', labelEn: 'Winter Clothes' },
                    { id: 'education', labelBn: 'শিক্ষা সহায়তা', labelEn: 'Education Aid' },
                    { id: 'food', labelBn: 'খাদ্য সহায়তা', labelEn: 'Food Aid' },
                    { id: 'financial', labelBn: 'আর্থিক অনুদান', labelEn: 'Financial Aid' },
                    { id: 'emergency', labelBn: 'জরুরি দুর্যোগ ত্রাণ', labelEn: 'Emergency Disaster' },
                  ].map((cat) => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      className={`text-xs py-2 px-3 rounded-lg border font-medium text-left transition flex items-center justify-between ${
                        category === cat.id
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                          : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <span>{lang === 'bn' ? cat.labelBn : cat.labelEn}</span>
                      {category === cat.id && <span className="text-emerald-700">✓</span>}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'আবেদনকারী / রোগীর পুরো নাম *' : 'Full Name of Applicant/Patient *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={lang === 'bn' ? 'যেমন: মো: করিম হোসেন' : 'e.g., Md. Karim Hossain'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'যোগাযোগের মোবাইল নম্বর *' : 'Active Mobile Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'এনআইডি / জন্ম নিবন্ধন নম্বর' : 'NID / Birth Certificate'}
                  </label>
                  <input
                    type="text"
                    value={nid}
                    onChange={(e) => setNid(e.target.value)}
                    placeholder={lang === 'bn' ? 'ঐচ্ছিক তবে যাচাইয়ে সুবিধাজনক' : 'Optional for quick verification'}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'ইউনিয়ন *' : 'Union (Rowmari) *'}
                  </label>
                  <select
                    value={unionName}
                    onChange={(e) => setUnionName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 text-xs bg-white"
                  >
                    <option value="রৌমারী সদর">রৌমারী সদর</option>
                    <option value="দাঁতভাঙ্গা">দাঁতভাঙ্গা</option>
                    <option value="বন্দবেড়">বন্দবেড়</option>
                    <option value="চর শৌলমারী">চর শৌলমারী</option>
                    <option value="যাদুর চর">যাদুর চর</option>
                    <option value="শৌলমারী">শৌলমারী</option>
                    <option value="অন্যান্য / পার্শ্ববর্তী">অন্যান্য / পার্শ্ববর্তী এলাকা</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'গ্রাম ও পাড়া *' : 'Village / Ward *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    placeholder={lang === 'bn' ? 'যেমন: চুলিয়ার চর, ৩ নং ওয়ার্ড' : 'e.g., Chuliar Char'}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {lang === 'bn'
                    ? 'কাঙ্ক্ষিত সহায়তার পরিমাণ বা সামগ্রী'
                    : 'Requested Support / Amount / Items'}
                </label>
                <input
                  type="text"
                  value={amountOrItems}
                  onChange={(e) => setAmountOrItems(e.target.value)}
                  placeholder={
                    lang === 'bn'
                      ? 'যেমন: ওষুধ ক্রয়ের জন্য ৫,০০০ টাকা অথবা ২টি কম্বল'
                      : 'e.g. 5,000 BDT for medicine or 2 blankets'
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {lang === 'bn'
                    ? 'প্রয়োজন ও বর্তমান অবস্থার বিস্তারিত বিবরণ *'
                    : 'Details of Need & Current Condition *'}
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={
                    lang === 'bn'
                      ? 'পরিবারের সদস্য সংখ্যা, আর্থিক সংকট এবং সহায়তার প্রয়োজনীয়তা সংক্ষেপে লিখুন...'
                      : 'Briefly explain your family condition, crisis and why this aid is urgent...'
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 text-sm"
                />
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {lang === 'bn'
                    ? 'সংযুক্ত প্রমাণাদি / ডকুমেন্টস (চিকিৎসাপত্র, ছবি বা প্রত্যয়ন)'
                    : 'Supporting Documents (Prescription, Photo or Letter)'}
                </label>
                <div className="border border-dashed border-stone-300 rounded-lg p-3 text-center bg-white text-xs text-stone-500 hover:border-emerald-500 transition cursor-pointer">
                  📁 {lang === 'bn' ? 'ফাইল সিলেক্ট করতে ক্লিক করুন (PDF, JPG, PNG - সর্বোচ্চ ৫ এমবি)' : 'Click to attach file (Max 5MB)'}
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="consent"
                  checked={agreeConsent}
                  onChange={(e) => setAgreeConsent(e.target.checked)}
                  className="mt-0.5 rounded text-emerald-700 focus:ring-emerald-600"
                />
                <label htmlFor="consent" className="text-xs text-stone-600">
                  {lang === 'bn'
                    ? 'আমি সাক্ষ্য দিচ্ছি যে প্রদত্ত তথ্য সম্পূর্ণ সত্য এবং ফাউন্ডেশনের ভেরিফিকেশন টিম প্রয়োজনে সরেজমিনে যাচাই করতে পারবে।'
                    : 'I certify that the information provided is true and the foundation verification team may verify on ground if necessary.'}
                </label>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2 text-stone-600 hover:text-stone-800 text-sm font-medium"
                >
                  {lang === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !agreeConsent}
                  className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white font-medium text-sm transition shadow-md flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <span>{lang === 'bn' ? 'প্রক্রিয়াধীন...' : 'Submitting...'}</span>
                  ) : (
                    <span>{lang === 'bn' ? 'আবেদন জমা দিন' : 'Submit Application'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
