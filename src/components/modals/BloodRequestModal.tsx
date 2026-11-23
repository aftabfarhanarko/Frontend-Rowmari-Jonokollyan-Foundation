'use client';

import React, { useState } from 'react';
import { X, Droplet, PhoneCall } from 'lucide-react';
import { Language } from '@/types';

interface BloodRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export default function BloodRequestModal({
  isOpen,
  onClose,
  lang,
}: BloodRequestModalProps) {
  const [patientName, setPatientName] = useState('');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [unitsNeeded, setUnitsNeeded] = useState('1');
  const [hospital, setHospital] = useState('');
  const [location, setLocation] = useState('রৌমারী');
  const [dateNeeded, setDateNeeded] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [urgency, setUrgency] = useState('critical');
  const [notes, setNotes] = useState('');
  const [requestId, setRequestId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      const code = `BLD-${bloodGroup.replace('+', 'P').replace('-', 'N')}-${Math.floor(100 + Math.random() * 900)}`;
      setRequestId(code);
      setSubmitting(false);
    }, 500);
  };

  const handleClose = () => {
    setRequestId(null);
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
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-red-100 p-6 md:p-8 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-800 transition cursor-pointer"
        >
          <X className="w-4 h-4 text-stone-600" />
        </button>

        {requestId ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
              <Droplet className="w-8 h-8 text-red-600 fill-red-100" />
            </div>
            <h3 className="text-2xl font-bold text-red-900 mb-2">
              {lang === 'bn' ? 'জরুরি রক্তের অনুরোধ গৃহীত হয়েছে!' : 'Emergency Blood Request Received!'}
            </h3>
            <p className="text-stone-600 mb-6 text-sm">
              {lang === 'bn'
                ? 'রৌমারী জনকল্যাণ ফাউন্ডেশনের ব্লাড কো-অর্ডিনেটর টিমের কাছে তাৎক্ষণিক নোটিফিকেশন পাঠানো হয়েছে। নিকটস্থ উপযুক্ত রক্তদাতাদের সাথে যোগাযোগ করে আপনার সাথে যোগাযোগ করা হবে।'
                : 'Notification sent to our blood coordinators. Matching donors are being contacted immediately.'}
            </p>
            <div className="p-4 bg-red-50 border-2 border-dashed border-red-300 rounded-xl max-w-xs mx-auto mb-6">
              <span className="text-xs uppercase tracking-wider text-red-700 font-semibold block">
                {lang === 'bn' ? 'অনুরোধ ট্র্যাকিং কোড' : 'Blood Request Code'}
              </span>
              <span className="text-2xl font-mono font-bold text-red-950 tracking-wider">
                {requestId}
              </span>
            </div>
            <div className="p-3 bg-amber-50 rounded-xl text-amber-900 text-xs text-left mb-6 border border-amber-200 flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-amber-900 shrink-0" />
              <span><strong>{lang === 'bn' ? 'তাৎক্ষণিক জরুরি হটলাইন:' : 'Immediate Emergency Hotline:'}</strong> +880 1812-987654 (ব্লাড উইং কো-অর্ডিনেটর)</span>
            </div>
            <button
              onClick={handleClose}
              className="px-6 py-2.5 bg-red-700 hover:bg-red-800 text-white rounded-xl font-medium transition shadow-md cursor-pointer"
            >
              {lang === 'bn' ? 'ঠিক আছে' : 'Done'}
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-red-100 text-red-700 flex items-center justify-center">
                <Droplet className="w-6 h-6 text-red-700 fill-red-100" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-stone-900">
                  {lang === 'bn' ? 'জরুরি রক্তের জন্য অনুরোধ' : 'Emergency Blood Request'}
                </h2>
                <p className="text-xs md:text-sm text-stone-500">
                  {lang === 'bn'
                    ? 'মুমূর্ষু রোগীর জন্য রক্তদাতা খোঁজার দায়িত্বশীল ও দ্রুত সহায়তা'
                    : 'Responsible and rapid coordination with verified blood donors'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  {lang === 'bn' ? 'প্রয়োজনীয় রক্তের গ্রুপ *' : 'Required Blood Group *'}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((group) => (
                    <button
                      type="button"
                      key={group}
                      onClick={() => setBloodGroup(group)}
                      className={`py-2 px-2 rounded-xl font-bold text-sm border text-center transition ${
                        bloodGroup === group
                          ? 'bg-red-600 text-white border-red-600 shadow-xs'
                          : 'bg-white border-stone-200 text-stone-700 hover:bg-red-50'
                      }`}
                    >
                      {group}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'রোগীর পুরো নাম *' : 'Patient Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder={lang === 'bn' ? 'রোগীর নাম' : 'Patient name'}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-red-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'রক্তের পরিমাণ (ব্যাগ) *' : 'Blood Units (Bags) *'}
                  </label>
                  <select
                    value={unitsNeeded}
                    onChange={(e) => setUnitsNeeded(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-red-600 bg-white"
                  >
                    <option value="1">১ ব্যাগ (1 Bag)</option>
                    <option value="2">২ ব্যাগ (2 Bags)</option>
                    <option value="3">৩ ব্যাগ (3 Bags)</option>
                    <option value="4+">৪+ ব্যাগ (4+ Bags - Emergency)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'হাসপাতাল / ক্লিনিকের নাম *' : 'Hospital / Clinic Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={hospital}
                    onChange={(e) => setHospital(e.target.value)}
                    placeholder={lang === 'bn' ? 'যেমন: রৌমারী উপজেলা স্বাস্থ্য কমপ্লেক্স' : 'Hospital Name'}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-red-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'অবস্থান / এলাকা *' : 'Hospital Location *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={lang === 'bn' ? 'যেমন: রৌমারী সদর / কুড়িগ্রাম' : 'e.g. Rowmari / Kurigram'}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-red-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'রক্তের প্রয়োজন কবে *' : 'Required Date & Time *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={dateNeeded}
                    onChange={(e) => setDateNeeded(e.target.value)}
                    placeholder={lang === 'bn' ? 'আজই / কাল সকাল ৯টা' : 'Today / Tomorrow 9 AM'}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-red-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'জরুরিতা মাত্রা *' : 'Urgency Level *'}
                  </label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-red-600 bg-white"
                  >
                    <option value="critical">অত্যন্ত জরুরি (Within 2-4 hrs)</option>
                    <option value="urgent">জরুরি (Within 12-24 hrs)</option>
                    <option value="scheduled">নির্ধারিত অপারেশন (Upcoming)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'যোগাযোগ নম্বর *' : 'Requester Phone *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-red-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {lang === 'bn' ? 'যোগাযোগকারীর নাম ও রোগীর সাথে সম্পর্ক' : 'Contact Person & Relationship'}
                </label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder={lang === 'bn' ? 'যেমন: ভাই / বাবা / অভিভাবক' : 'e.g. Brother / Relative'}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-red-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {lang === 'bn' ? 'রোগের বিবরণ ও জরুরি নির্দেশনা' : 'Patient Condition & Special Notes'}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={lang === 'bn' ? 'অপারেশন, ডেলিভারি, রক্তস্বল্পতা বা অন্য কোনো বিশেষ তথ্য...' : 'Details...'}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-red-600"
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
                  className="px-6 py-2.5 rounded-xl bg-[#E53935] hover:bg-[#D32F2F] disabled:opacity-50 text-white font-semibold text-sm transition shadow-md cursor-pointer"
                >
                  {submitting
                    ? lang === 'bn' ? 'প্রেরণ হচ্ছে...' : 'Submitting...'
                    : lang === 'bn' ? 'রক্তের অনুরোধ পাঠান' : 'Post Blood Request'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
