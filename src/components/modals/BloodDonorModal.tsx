'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, CheckCircle2, Droplet, ShieldCheck } from 'lucide-react';
import { Language } from '@/types';
import { bloodDonorSchema, BloodDonorFormData } from '@/lib/validations/bloodSchemas';
import { useRegisterBloodDonorMutation } from '@/store/api/applicationsApi';
import { toast } from 'sonner';

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
  const [registerBloodDonor, { isLoading: submitting }] = useRegisterBloodDonorMutation();
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BloodDonorFormData>({
    resolver: zodResolver(bloodDonorSchema),
    defaultValues: {
      name: '',
      phone: '',
      bloodGroup: 'A+',
      upazila: 'রৌমারী',
      village: '',
      lastDonation: '',
      availability: 'available',
      agreeConsent: true,
    },
  });

  if (!isOpen) return null;

  const onSubmit = async (data: BloodDonorFormData) => {
    try {
      await registerBloodDonor(data).unwrap();
      setSubmittedName(data.name);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : (lang === 'bn' ? 'নিবন্ধন করা যায়নি। আবার চেষ্টা করুন।' : 'Registration failed. Please try again.'));
    }
  };

  const handleClose = () => {
    setSubmittedName(null);
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
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 md:p-8 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-800 transition cursor-pointer"
        >
          <X className="w-4 h-4 text-stone-600" />
        </button>

        {submittedName ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 text-[#E53935] rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-[#E53935]" />
            </div>
            <h3 className="text-2xl font-bold text-stone-900 mb-2">
              {lang === 'bn' ? 'রক্তদাতা নিবন্ধন সফল হয়েছে!' : 'Donor Registration Successful!'}
            </h3>
            <p className="text-stone-600 mb-4 text-sm md:text-base">
              {lang === 'bn'
                ? `ধন্যবাদ ${submittedName}! রৌমারী ব্লাড ব্যাংক নেটওয়ার্কে আপনার তথ্য অন্তর্ভুক্ত করা হয়েছে।`
                : `Thank you, ${submittedName}! Your details are saved in the Rowmari Blood Network.`}
            </p>
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-[#0D5C35] max-w-md mx-auto mb-6 text-left flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0D5C35] shrink-0 mt-0.5" />
              <span>
                {lang === 'bn'
                  ? 'গোপনীয়তার নিশ্চয়তা: আপনার ফোন নম্বর কোনো উন্মুক্ত তালিকায় থাকবে না। জরুরি রোগীর প্রয়োজনে কেবল সমন্বয়ক যোগাযোগ করবেন।'
                  : 'Your phone number is strictly confidential and never displayed publicly.'}
              </span>
            </div>
            <button
              onClick={handleClose}
              className="px-6 py-2.5 bg-[#E53935] hover:bg-[#D32F2F] text-white rounded-xl font-bold transition shadow-md cursor-pointer"
            >
              {lang === 'bn' ? 'সম্পন্ন করুন' : 'Done'}
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
                  {lang === 'bn' ? 'স্বেচ্ছায় রক্তদাতা নিবন্ধন' : 'Register as Blood Donor'}
                </h2>
                <p className="text-xs md:text-sm text-stone-500">
                  {lang === 'bn'
                    ? 'আপনার এক ব্যাগ রক্ত বাঁচাতে পারে রৌমারীর একটি নিষ্পাপ প্রাণ'
                    : 'Be an on-call voluntary blood hero for critical patients in Rowmari'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'আপনার নাম *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    {...register('name')}
                    placeholder={lang === 'bn' ? 'আপনার পূর্ণ নাম' : 'Full Name'}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#E53935]"
                  />
                  {errors.name && (
                    <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'মোবাইল নম্বর *' : 'Phone Number *'}
                  </label>
                  <input
                    type="tel"
                    {...register('phone')}
                    placeholder="01XXXXXXXXX"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#E53935]"
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'রক্তের গ্রুপ *' : 'Blood Group *'}
                  </label>
                  <select
                    {...register('bloodGroup')}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#E53935] bg-white font-bold text-[#E53935]"
                  >
                    <option value="A+">A+ (পজিটিভ)</option>
                    <option value="A-">A- (নেগেটিভ)</option>
                    <option value="B+">B+ (পজিটিভ)</option>
                    <option value="B-">B- (নেগেটিভ)</option>
                    <option value="O+">O+ (পজিটিভ)</option>
                    <option value="O-">O- (নেগেটিভ)</option>
                    <option value="AB+">AB+ (পজিটিভ)</option>
                    <option value="AB-">AB- (নেগেটিভ)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'উপজেলা / এলাকা *' : 'Upazila / Area *'}
                  </label>
                  <select
                    {...register('upazila')}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#E53935] bg-white"
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
                    {...register('village')}
                    placeholder={lang === 'bn' ? 'যেমন: দাঁতভাঙ্গা বাজার' : 'Area name'}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#E53935]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'সর্বশেষ রক্তদানের তারিখ' : 'Last Donation Date'}
                  </label>
                  <input
                    type="text"
                    {...register('lastDonation')}
                    placeholder={lang === 'bn' ? 'যেমন: ৩ মাস আগে / জানা নেই' : 'e.g. 3 months ago / Never'}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#E53935]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {lang === 'bn' ? 'আপনার উপস্থিতি স্ট্যাটাস' : 'Availability Status'}
                </label>
                <select
                  {...register('availability')}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#E53935] bg-white"
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
                  {...register('agreeConsent')}
                  className="mt-0.5 rounded text-[#E53935] focus:ring-[#E53935]"
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
                    ? (lang === 'bn' ? 'নিবন্ধন হচ্ছে...' : 'Registering...')
                    : (lang === 'bn' ? 'রক্তদাতা হিসেবে নিবন্ধন করুন' : 'Complete Registration')}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
