'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  X, 
  CheckCircle2, 
  HeartHandshake, 
  AlertCircle, 
  Upload
} from 'lucide-react';
import { Language } from '@/types';
import { assistanceSchema, AssistanceFormData } from '@/lib/validations/assistanceSchema';
import { useSubmitAssistanceMutation } from '@/store/api/applicationsApi';
import { useAppStore } from '@/store/useAppStore';
import { toast } from 'sonner';

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
  const addSavedApplicationId = useAppStore((state) => state.addSavedApplicationId);
  const [submitAssistance, { isLoading: isSubmitting }] = useSubmitAssistanceMutation();
  const [generatedId, setGeneratedId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AssistanceFormData>({
    resolver: zodResolver(assistanceSchema),
    defaultValues: {
      category: 'medical',
      fullName: '',
      phone: '',
      nid: '',
      unionName: 'রৌমারী সদর',
      village: '',
      amountOrItems: '',
      description: '',
      agreeConsent: true,
    },
  });

  if (!isOpen) return null;

  const onSubmit = async (data: AssistanceFormData) => {
    try {
      const response = await submitAssistance(data).unwrap();
      const newId = response.referenceCode;
      setGeneratedId(newId);
      addSavedApplicationId(newId);
      if (onSubmittedSuccess) {
        onSubmittedSuccess(newId);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : (lang === 'bn' ? 'আবেদন পাঠানো যায়নি। আবার চেষ্টা করুন।' : 'Application could not be submitted. Please try again.'));
    }
  };

  const handleResetAndClose = () => {
    setGeneratedId(null);
    reset();
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
          className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-800 transition cursor-pointer"
        >
          <X className="w-4 h-4 text-stone-600" />
        </button>

        {generatedId ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 text-[#0D5C35] rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-[#0D5C35]" />
            </div>
            <h3 className="text-2xl font-bold text-stone-900 mb-2">
              {lang === 'bn' ? 'আবেদন সফলভাবে গৃহীত হয়েছে!' : 'Application Submitted Successfully!'}
            </h3>
            <p className="text-stone-600 mb-6 text-sm md:text-base">
              {lang === 'bn'
                ? 'আপনার আবেদনটি রৌমারী জনকল্যাণ ফাউন্ডেশনের রিভিউ কমিটিতে পাঠানো হয়েছে। আপনার অনন্য ট্র্যাকিং আইডি:'
                : 'Your assistance request has been queued for verification. Your unique tracking ID:'}
            </p>
            <div className="p-4 bg-emerald-50 border-2 border-dashed border-[#0D5C35] rounded-xl max-w-xs mx-auto mb-6">
              <span className="text-xs uppercase tracking-wider text-[#0D5C35] font-semibold block">
                {lang === 'bn' ? 'আবেদন রেফারেন্স আইডি' : 'Application Tracking ID'}
              </span>
              <span className="text-2xl font-mono font-bold text-[#0D5C35] tracking-wider">
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
              className="px-6 py-2.5 bg-[#0D5C35] hover:bg-[#094527] text-white rounded-xl font-medium transition shadow-md cursor-pointer"
            >
              {lang === 'bn' ? 'ঠিক আছে' : 'Done'}
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 text-[#0D5C35] flex items-center justify-center">
                <HeartHandshake className="w-6 h-6 text-[#0D5C35]" />
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
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                {lang === 'bn'
                  ? 'গোপনীয়তার নিশ্চয়তা: আবেদনকারীর ব্যক্তিগত ও পারিবারিক তথ্য সর্বোচ্চ সুরক্ষায় রাখা হয় এবং কেবল যাচাই কমিটির অনুমোদনপ্রাপ্ত সদস্যগণ দেখতে পারেন।'
                  : 'Privacy Guarantee: Personal applicant details are strictly kept confidential and only shared with the authorized verification team.'}
              </span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {lang === 'bn' ? 'সহায়তার খাত *' : 'Assistance Category *'}
                </label>
                <select
                  {...register('category')}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#0D5C35] text-sm bg-white"
                >
                  <option value="medical">জরুরি চিকিৎসা ও ওষুধ সহায়তা</option>
                  <option value="education">মেধাবী শিক্ষার্থীর বই বা ভর্তি ফি</option>
                  <option value="winter">শীতবস্ত্র ও কম্বল বিতরণ</option>
                  <option value="food">জরুরি খাদ্য ও পুষ্টি সহায়তা</option>
                  <option value="financial">স্বাবলম্বীকরণ ও পুনর্বাসন</option>
                  <option value="emergency">জরুরি প্রাকৃতিক দুর্যোগ ও বন্যা ত্রাণ</option>
                </select>
                {errors.category && (
                  <p className="text-red-600 text-xs mt-1">{errors.category.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'আবেদনকারীর পূর্ণ নাম *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    {...register('fullName')}
                    placeholder={lang === 'bn' ? 'যেমন: মোহাম্মদ রহিম উদ্দিন' : 'Full Name'}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#0D5C35] text-sm"
                  />
                  {errors.fullName && (
                    <p className="text-red-600 text-xs mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'মোবাইল নম্বর (যোগাযোগের জন্য) *' : 'Contact Mobile Number *'}
                  </label>
                  <input
                    type="tel"
                    {...register('phone')}
                    placeholder="01XXXXXXXXX"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#0D5C35] text-sm"
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'ইউনিয়ন *' : 'Union (Rowmari) *'}
                  </label>
                  <select
                    {...register('unionName')}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#0D5C35] text-sm bg-white"
                  >
                    <option value="রৌমারী সদর">রৌমারী সদর ইউনিয়ন</option>
                    <option value="যাদুরচর">যাদুরচর ইউনিয়ন</option>
                    <option value="শৌলমারী">শৌলমারী ইউনিয়ন</option>
                    <option value="দাঁতভাঙ্গা">দাঁতভাঙ্গা ইউনিয়ন</option>
                    <option value="বন্দবেড়">বন্দবেড় ইউনিয়ন</option>
                    <option value="চর শৌলমারী">চর শৌলমারী ইউনিয়ন</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'গ্রাম ও পাড়া *' : 'Village / Ward *'}
                  </label>
                  <input
                    type="text"
                    {...register('village')}
                    placeholder={lang === 'bn' ? 'যেমন: চুলিয়ার চর, ৩ নং ওয়ার্ড' : 'e.g., Chuliar Char'}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#0D5C35] text-sm"
                  />
                  {errors.village && (
                    <p className="text-red-600 text-xs mt-1">{errors.village.message}</p>
                  )}
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
                  {...register('amountOrItems')}
                  placeholder={
                    lang === 'bn'
                      ? 'যেমন: ওষুধ ক্রয়ের জন্য ৫,০০০ টাকা অথবা ২টি কম্বল'
                      : 'e.g. 5,000 BDT for medicine or 2 blankets'
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#0D5C35] text-sm"
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
                  {...register('description')}
                  placeholder={
                    lang === 'bn'
                      ? 'পরিবারের সদস্য সংখ্যা, আর্থিক সংকট এবং সহায়তার প্রয়োজনীয়তা সংক্ষেপে লিখুন...'
                      : 'Briefly explain your family condition, crisis and why this aid is urgent...'
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#0D5C35] text-sm"
                />
                {errors.description && (
                  <p className="text-red-600 text-xs mt-1">{errors.description.message}</p>
                )}
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="consent"
                  {...register('agreeConsent')}
                  className="mt-0.5 rounded text-[#0D5C35] focus:ring-[#0D5C35]"
                />
                <label htmlFor="consent" className="text-xs text-stone-600">
                  {lang === 'bn'
                    ? 'আমি সাক্ষ্য দিচ্ছি যে প্রদত্ত তথ্য সম্পূর্ণ সত্য এবং ফাউন্ডেশনের ভেরিফিকেশন টিম প্রয়োজনে সরেজমিনে যাচাই করতে পারবে।'
                    : 'I certify that the information provided is true and the foundation verification team may verify on ground if necessary.'}
                </label>
              </div>
              {errors.agreeConsent && (
                <p className="text-red-600 text-xs">{errors.agreeConsent.message}</p>
              )}

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2 text-stone-600 hover:text-stone-800 text-sm font-medium cursor-pointer"
                >
                  {lang === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-[#0D5C35] hover:bg-[#094527] disabled:opacity-50 text-white font-medium text-sm transition shadow-md flex items-center gap-2 cursor-pointer"
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
