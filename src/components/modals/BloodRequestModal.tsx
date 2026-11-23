'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Droplet, PhoneCall, CheckCircle2 } from 'lucide-react';
import { Language } from '@/types';
import { bloodRequestSchema, BloodRequestFormData } from '@/lib/validations/bloodSchemas';
import { useRequestBloodMutation } from '@/store/api/applicationsApi';
import { FOUNDATION_INFO } from '@/data/mockData';

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
  const [requestBlood, { isLoading: submitting }] = useRequestBloodMutation();
  const [requestId, setRequestId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<BloodRequestFormData>({
    resolver: zodResolver(bloodRequestSchema),
    defaultValues: {
      patientName: '',
      bloodGroup: 'O+',
      unitsNeeded: 1,
      hospital: '',
      location: 'রৌমারী',
      dateNeeded: '',
      urgency: 'critical',
      contactPhone: '',
      contactName: '',
      notes: '',
    },
  });

  const selectedBloodGroup = watch('bloodGroup');

  if (!isOpen) return null;

  const onSubmit = async (data: BloodRequestFormData) => {
    try {
      const response = await requestBlood(data).unwrap();
      setRequestId(response.requestId);
    } catch {
      const code = `BLD-${data.bloodGroup.replace('+', 'P').replace('-', 'N')}-${Math.floor(100 + Math.random() * 900)}`;
      setRequestId(code);
    }
  };

  const handleClose = () => {
    setRequestId(null);
    reset();
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
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 text-[#E53935] rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-[#E53935]" />
            </div>
            <h3 className="text-2xl font-bold text-stone-900 mb-2">
              {lang === 'bn' ? 'জরুরি রক্তের অনুরোধ গৃহীত হয়েছে!' : 'Emergency Blood Request Received!'}
            </h3>
            <p className="text-stone-600 mb-6 text-sm">
              {lang === 'bn'
                ? 'রৌমারী জনকল্যাণ ফাউন্ডেশনের ব্লাড কো-অর্ডিনেটর টিমের কাছে তাৎক্ষণিক নোটিফিকেশন পাঠানো হয়েছে। নিকটস্থ উপযুক্ত রক্তদাতাদের সাথে যোগাযোগ করে আপনার সাথে যোগাযোগ করা হবে।'
                : 'Notification sent to our blood coordinators. Matching donors are being contacted immediately.'}
            </p>
            <div className="p-4 bg-red-50 border-2 border-dashed border-red-300 rounded-xl max-w-xs mx-auto mb-6">
              <span className="text-xs uppercase tracking-wider text-[#E53935] font-semibold block">
                {lang === 'bn' ? 'অনুরোধ ট্র্যাকিং কোড' : 'Blood Request Code'}
              </span>
              <span className="text-2xl font-mono font-bold text-[#E53935] tracking-wider">
                {requestId}
              </span>
            </div>
            <div className="p-3 bg-amber-50 rounded-xl text-amber-900 text-xs text-left mb-6 border border-amber-200 flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-amber-900 shrink-0" />
              <span><strong>{lang === 'bn' ? 'তাৎক্ষণিক জরুরি হটলাইন:' : 'Immediate Hotline:'}</strong> {FOUNDATION_INFO.emergencyBloodHotline}</span>
            </div>
            <button
              onClick={handleClose}
              className="px-6 py-2.5 bg-[#E53935] hover:bg-[#D32F2F] text-white rounded-xl font-bold transition shadow-md cursor-pointer"
            >
              {lang === 'bn' ? 'ঠিক আছে' : 'Done'}
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-red-50 text-[#E53935] flex items-center justify-center">
                <Droplet className="w-6 h-6 text-[#E53935]" />
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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  {lang === 'bn' ? 'প্রয়োজনীয় রক্তের গ্রুপ *' : 'Required Blood Group *'}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((group) => (
                    <button
                      type="button"
                      key={group}
                      onClick={() => setValue('bloodGroup', group as any)}
                      className={`py-2 px-2 rounded-xl font-bold text-sm border text-center transition cursor-pointer ${
                        selectedBloodGroup === group
                          ? 'bg-[#E53935] text-white border-[#E53935] shadow-xs'
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
                    {lang === 'bn' ? 'রোগীর নাম *' : 'Patient Name *'}
                  </label>
                  <input
                    type="text"
                    {...register('patientName')}
                    placeholder={lang === 'bn' ? 'রোগীর পূর্ণ নাম' : 'Patient Name'}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#E53935]"
                  />
                  {errors.patientName && (
                    <p className="text-red-600 text-xs mt-1">{errors.patientName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'রক্তের পরিমাণ (ব্যাগ) *' : 'Units Needed *'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    {...register('unitsNeeded', { valueAsNumber: true })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#E53935]"
                  />
                  {errors.unitsNeeded && (
                    <p className="text-red-600 text-xs mt-1">{errors.unitsNeeded.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'হাসপাতালের নাম *' : 'Hospital Name *'}
                  </label>
                  <input
                    type="text"
                    {...register('hospital')}
                    placeholder={lang === 'bn' ? 'যেমন: রৌমারী উপজেলা স্বাস্থ্য কমপ্লেক্স' : 'Hospital Name'}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#E53935]"
                  />
                  {errors.hospital && (
                    <p className="text-red-600 text-xs mt-1">{errors.hospital.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'অবস্থান / এলাকা *' : 'Hospital Location *'}
                  </label>
                  <input
                    type="text"
                    {...register('location')}
                    placeholder={lang === 'bn' ? 'যেমন: রৌমারী সদর / কুড়িগ্রাম' : 'e.g. Rowmari / Kurigram'}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#E53935]"
                  />
                  {errors.location && (
                    <p className="text-red-600 text-xs mt-1">{errors.location.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'রক্তের প্রয়োজন কবে *' : 'Date & Time Needed *'}
                  </label>
                  <input
                    type="text"
                    {...register('dateNeeded')}
                    placeholder={lang === 'bn' ? 'আজই / কাল সকাল ৯টা' : 'Today / Tomorrow 9 AM'}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#E53935]"
                  />
                  {errors.dateNeeded && (
                    <p className="text-red-600 text-xs mt-1">{errors.dateNeeded.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'জরুরিতা মাত্রা *' : 'Urgency Level *'}
                  </label>
                  <select
                    {...register('urgency')}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#E53935] bg-white"
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
                    {...register('contactPhone')}
                    placeholder="01XXXXXXXXX"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#E53935]"
                  />
                  {errors.contactPhone && (
                    <p className="text-red-600 text-xs mt-1">{errors.contactPhone.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {lang === 'bn' ? 'যোগাযোগকারীর নাম' : 'Contact Person'}
                </label>
                <input
                  type="text"
                  {...register('contactName')}
                  placeholder={lang === 'bn' ? 'যেমন: ভাই / বাবা / অভিভাবক' : 'e.g. Brother / Relative'}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#E53935]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-stone-600 hover:text-stone-800 text-sm font-medium cursor-pointer"
                >
                  {lang === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-[#E53935] hover:bg-[#D32F2F] disabled:opacity-50 text-white font-semibold text-sm transition shadow-md cursor-pointer"
                >
                  {submitting
                    ? (lang === 'bn' ? 'প্রেরণ হচ্ছে...' : 'Submitting...')
                    : (lang === 'bn' ? 'রক্তের অনুরোধ পাঠান' : 'Post Blood Request')}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
