'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, CheckCircle2, Users } from 'lucide-react';
import { Language } from '@/types';
import { volunteerSchema, VolunteerFormData } from '@/lib/validations/volunteerSchema';
import { useApplyVolunteerMutation } from '@/store/api/applicationsApi';
import { toast } from 'sonner';

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
  const [applyVolunteer, { isLoading: submitting }] = useApplyVolunteerMutation();
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VolunteerFormData>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      age: 20,
      profession: '',
      preferredWing: 'relief',
      availability: 'anytime',
      motivation: '',
    },
  });

  if (!isOpen) return null;

  const onSubmit = async (data: VolunteerFormData) => {
    try {
      await applyVolunteer(data).unwrap();
      setIsSuccess(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : (lang === 'bn' ? 'আবেদন পাঠানো যায়নি। আবার চেষ্টা করুন।' : 'Application could not be submitted. Please try again.'));
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
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
            <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 text-[#0D5C35] rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-[#0D5C35]" />
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
              className="px-6 py-2.5 bg-[#0D5C35] hover:bg-[#094527] text-white rounded-xl font-bold transition shadow-md cursor-pointer"
            >
              {lang === 'bn' ? 'ঠিক আছে' : 'Done'}
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 text-[#0D5C35] flex items-center justify-center">
                <Users className="w-6 h-6 text-[#0D5C35]" />
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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {lang === 'bn' ? 'আপনার নাম *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  {...register('name')}
                  placeholder={lang === 'bn' ? 'পুরো নাম' : 'Name'}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0D5C35]"
                />
                {errors.name && (
                  <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'মোবাইল নম্বর *' : 'Phone Number *'}
                  </label>
                  <input
                    type="tel"
                    {...register('phone')}
                    placeholder="01XXXXXXXXX"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0D5C35]"
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'বয়স *' : 'Age *'}
                  </label>
                  <input
                    type="number"
                    min="16"
                    max="70"
                    {...register('age', { valueAsNumber: true })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0D5C35]"
                  />
                  {errors.age && (
                    <p className="text-red-600 text-xs mt-1">{errors.age.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'পেশা / শিক্ষাপ্রতিষ্ঠান' : 'Occupation / College'}
                  </label>
                  <input
                    type="text"
                    {...register('profession')}
                    placeholder={lang === 'bn' ? 'যেমন: শিক্ষার্থী / শিক্ষক' : 'e.g. Student'}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0D5C35]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'আগ্রহের ক্ষেত্র *' : 'Preferred Wing *'}
                  </label>
                  <select
                    {...register('preferredWing')}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0D5C35] bg-white"
                  >
                    <option value="relief">ত্রাণ ও শীতবস্ত্র বিতরণ</option>
                    <option value="medical">মেডিকেল ক্যাম্প সহায়তা</option>
                    <option value="blood">রক্তদাতা নেটওয়ার্ক সমন্বয়</option>
                    <option value="media">ফটোগ্রাফি ও মিডিয়া প্রচার</option>
                    <option value="it">আইটি ও ডেটা ম্যানেজমেন্ট</option>
                    <option value="education">শিশুকল্যাণ ও শিক্ষাবৃত্তি</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {lang === 'bn' ? 'সময় প্রাপ্যতা *' : 'Availability *'}
                </label>
                <select
                  {...register('availability')}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0D5C35] bg-white"
                >
                  <option value="weekends">শুধু ছুটির দিনে (শুক্রবার/শনিবার)</option>
                  <option value="weekdays">সপ্তাহের কাজের দিনে</option>
                  <option value="anytime">যেকোনো সময় (জরুরি প্রয়োজনে)</option>
                  <option value="emergency">কেবলমাত্র দুর্যোগকালে</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {lang === 'bn' ? 'কেন যুক্ত হতে চান?' : 'Why do you want to join?'}
                </label>
                <textarea
                  rows={2}
                  {...register('motivation')}
                  placeholder={lang === 'bn' ? 'সংক্ষেপে লিখুন...' : 'Brief note...'}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0D5C35]"
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
                  className="px-6 py-2.5 rounded-xl bg-[#0D5C35] hover:bg-[#094527] disabled:opacity-50 text-white font-semibold text-sm transition shadow-md cursor-pointer"
                >
                  {submitting
                    ? (lang === 'bn' ? 'জমা হচ্ছে...' : 'Submitting...')
                    : (lang === 'bn' ? 'নিবন্ধন সম্পন্ন করুন' : 'Submit Application')}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
