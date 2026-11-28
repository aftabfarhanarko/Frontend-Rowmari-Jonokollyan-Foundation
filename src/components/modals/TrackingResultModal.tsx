'use client';

import React, { useEffect } from 'react';
import {
  X,
  Search,
  Check,
  ClipboardList,
  AlertCircle,
  Lightbulb,
  CalendarDays,
  Tag,
  UserCheck,
  Copy,
  Clock,
  XCircle,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';
import { Language, ApplicationTrackingStatus } from '@/types';
import { useAppStore } from '@/store/useAppStore';

interface TrackingResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  application: ApplicationTrackingStatus | null;
  searchedId: string;
}

export default function TrackingResultModal({
  isOpen,
  onClose,
  lang,
  application,
  searchedId,
}: TrackingResultModalProps) {
  const addSavedApplicationId = useAppStore((state) => state.addSavedApplicationId);

  useEffect(() => {
    if (application?.id) {
      addSavedApplicationId(application.id);
    }
  }, [application?.id, addSavedApplicationId]);

  if (!isOpen) return null;

  const t = (bn: string, en: string) => (lang === 'bn' ? bn : en);

  const steps = [
    { key: 'pending', labelBn: 'আবেদন জমা', labelEn: 'Submitted' },
    { key: 'under_review', labelBn: 'মাঠপর্যায়ে যাচাই', labelEn: 'Field Verification' },
    { key: 'approved', labelBn: 'কমিটি অনুমোদন', labelEn: 'Committee Approved' },
    { key: 'completed', labelBn: 'সহায়তা প্রদান সম্পন্ন', labelEn: 'Aid Delivered' },
  ];

  const getStepStatus = (stepKey: string, currentStatus: string) => {
    const order = ['pending', 'under_review', 'approved', 'completed'];
    const currentIndex = order.indexOf(currentStatus);
    const stepIndex = order.indexOf(stepKey);

    if (currentStatus === 'rejected') {
      if (stepKey === 'pending') return 'completed';
      if (stepKey === 'under_review') return 'failed';
      return 'upcoming';
    }

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          label: t('সম্পন্ন', 'Completed'),
          cls: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        };
      case 'approved':
        return {
          label: t('অনুমোদিত', 'Approved'),
          cls: 'bg-blue-50 text-blue-700 border-blue-200',
        };
      case 'under_review':
        return {
          label: t('যাচাই চলছে', 'Under Review'),
          cls: 'bg-amber-50 text-amber-800 border-amber-200',
        };
      case 'rejected':
        return {
          label: t('বাতিল', 'Rejected'),
          cls: 'bg-red-50 text-red-700 border-red-200',
        };
      default:
        return {
          label: t('অপেক্ষমান', 'Pending'),
          cls: 'bg-stone-100 text-stone-700 border-stone-200',
        };
    }
  };

  const copyReferenceId = () => {
    if (!searchedId || typeof navigator === 'undefined') return;
    navigator.clipboard?.writeText(searchedId);
    toast.success(t('রেফারেন্স কোড কপি করা হয়েছে', 'Reference ID copied'));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-stone-200/90 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Crimson Gradient Header */}
        <div className="bg-gradient-to-br from-[#991B1B] via-[#D62828] to-[#E53935] text-white p-5 sm:p-6 relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/10 blur-2xl"
          />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/25 text-white transition cursor-pointer backdrop-blur-xs"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-3.5 pr-10 relative">
            <div className="w-11 h-11 rounded-2xl bg-white/15 border border-white/25 text-white flex items-center justify-center shrink-0 backdrop-blur-xs shadow-sm">
              <Search className="w-5 h-5" />
            </div>
            <div className="space-y-1.5 min-w-0">
              <h2 className="text-lg sm:text-xl font-black tracking-tight leading-snug">
                {t('আবেদনের বর্তমান অবস্থা', 'Application Tracking Status')}
              </h2>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-red-100">{t('রেফারেন্স কোড:', 'Reference ID:')}</span>
                <button
                  type="button"
                  onClick={copyReferenceId}
                  title={t('কপি করুন', 'Copy ID')}
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white text-[#D62828] font-mono text-xs font-extrabold shadow-xs hover:bg-red-50 transition cursor-pointer"
                >
                  <span>{searchedId}</span>
                  <Copy className="w-3 h-3 opacity-70" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6">
          {application ? (
            <div className="space-y-5">
              {/* Applicant Summary Card */}
              <div className="rounded-2xl bg-[#FFF9F9] border border-red-100/90 p-4 space-y-3">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-red-100 text-[#D62828] font-black text-xs flex items-center justify-center shrink-0">
                      {(application.applicantName || 'আ').trim().slice(0, 1)}
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] text-stone-400 block leading-none mb-0.5">
                        {t('আবেদনকারী', 'Applicant')}
                      </span>
                      <strong className="text-stone-900 text-sm font-extrabold truncate block">
                        {application.applicantName || t('সম্মানিত আবেদনকারী', 'Applicant')}
                      </strong>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(application.status).cls}`}
                  >
                    {getStatusBadge(application.status).label}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-red-100/80 text-xs">
                  <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-stone-100">
                    <Tag className="w-3.5 h-3.5 text-[#D62828] shrink-0" />
                    <div className="min-w-0">
                      <span className="text-[10px] text-stone-400 block">{t('ক্যাটাগরি', 'Category')}</span>
                      <span className="font-bold text-stone-800 truncate block">
                        {lang === 'bn' ? application.categoryBn : application.categoryEn}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-stone-100">
                    <CalendarDays className="w-3.5 h-3.5 text-[#D62828] shrink-0" />
                    <div className="min-w-0">
                      <span className="text-[10px] text-stone-400 block">{t('জমা দেওয়ার তারিখ', 'Submitted')}</span>
                      <span className="font-bold text-stone-800 truncate block">
                        {lang === 'bn' ? application.submittedDateBn : application.submittedDateEn}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stepper Pipeline */}
              <div className="rounded-2xl border border-stone-200/80 bg-white p-4 sm:p-5">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-500 mb-4 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D62828]" />
                  <span>{t('কার্যক্রম ট্র্যাকিং ধাপসমূহ', 'Lifecycle Progress')}</span>
                </h4>

                <div className="relative pl-7 space-y-5 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                  {steps.map((st) => {
                    const state = getStepStatus(st.key, application.status);
                    return (
                      <div key={st.key} className="relative flex items-center justify-between gap-2">
                        <div
                          className={`absolute -left-7 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-white shadow-2xs ${
                            state === 'completed'
                              ? 'bg-[#D62828] text-white'
                              : state === 'current'
                              ? 'bg-amber-500 text-white'
                              : state === 'failed'
                              ? 'bg-red-600 text-white'
                              : 'bg-stone-200 text-stone-400'
                          }`}
                        >
                          {state === 'completed' ? (
                            <Check className="w-3.5 h-3.5" />
                          ) : state === 'current' ? (
                            <Clock className="w-3.5 h-3.5 animate-pulse" />
                          ) : state === 'failed' ? (
                            <XCircle className="w-3.5 h-3.5" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                          )}
                        </div>

                        <p
                          className={`text-sm font-bold ${
                            state === 'completed'
                              ? 'text-stone-900'
                              : state === 'current'
                              ? 'text-amber-800'
                              : state === 'failed'
                              ? 'text-red-700'
                              : 'text-stone-400'
                          }`}
                        >
                          {lang === 'bn' ? st.labelBn : st.labelEn}
                        </p>

                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            state === 'completed'
                              ? 'bg-red-50 text-[#D62828]'
                              : state === 'current'
                              ? 'bg-amber-50 text-amber-700'
                              : state === 'failed'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-stone-100 text-stone-400'
                          }`}
                        >
                          {state === 'completed'
                            ? t('সম্পন্ন', 'Done')
                            : state === 'current'
                            ? t('চলমান', 'Active')
                            : state === 'failed'
                            ? t('বাতিল', 'Stopped')
                            : t('অপেক্ষমান', 'Pending')}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Verification Note Box */}
              <div className="p-4 bg-[#FFF4F5] rounded-2xl border border-red-200/80 border-l-4 border-l-[#D62828] text-xs text-stone-700 space-y-2.5">
                <div className="font-extrabold text-[#991B1B] flex items-center gap-1.5">
                  <ClipboardList className="w-4 h-4 text-[#D62828] shrink-0" />
                  <span>{t('রিভিউ কমিটির মন্তব্য ও আপডেট:', 'Review Committee Note:')}</span>
                </div>
                <p className="text-stone-700 leading-relaxed text-xs sm:text-sm">
                  {lang === 'bn' ? application.statusNoteBn : application.statusNoteEn}
                </p>

                {(application.assignedOfficerBn || application.amountOrSupportBn) && (
                  <div className="pt-2.5 border-t border-red-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    {application.assignedOfficerBn && (
                      <div className="inline-flex items-center gap-1.5 text-stone-700 font-medium">
                        <UserCheck className="w-3.5 h-3.5 text-[#D62828] shrink-0" />
                        <span>{t('সমন্বয়ক:', 'Coordinator:')}</span>
                        <strong className="text-stone-900">{application.assignedOfficerBn}</strong>
                      </div>
                    )}
                    {application.amountOrSupportBn && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-red-200 text-[#D62828] font-extrabold">
                        <span>{t('অনুমোদিত:', 'Approved:')}</span>
                        <span>{application.amountOrSupportBn}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 bg-[#D62828] hover:bg-[#B91C1C] text-white rounded-xl font-bold text-sm transition cursor-pointer shadow-sm active:scale-[0.99]"
              >
                {t('বন্ধ করুন', 'Close')}
              </button>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-amber-700" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">
                {t('আবেদন পাওয়া যায়নি', 'No Record Found')}
              </h3>
              <p className="text-stone-600 text-xs md:text-sm mb-6 max-w-sm mx-auto">
                {lang === 'bn'
                  ? `"${searchedId}" আইডি বা মোবাইল নম্বরে কোনো আবেদন খুঁজে পাওয়া যায়নি। অনুগ্রহ করে সঠিক আইডি লিখুন (যেমন: RJF-2026-0842 বা RJF-2026-0915)।`
                  : `No matching application found for ID "${searchedId}". Please check your tracking reference.`}
              </p>
              <div className="p-3.5 bg-stone-50 rounded-2xl text-xs text-stone-600 mb-6 text-left border border-stone-200 flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>{t('টিপস:', 'Tip:')}</strong>{' '}
                  {t(
                    'আপনি যদি সম্প্রতি নতুন আবেদন করে থাকেন, তবে প্রাপ্ত কনফার্মেশন কোডটি ব্যবহার করুন। প্রয়োজনে হেল্পলাইনে যোগাযোগ করতে পারেন।',
                    'Use the tracking ID received after submitting your aid form.'
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 bg-[#D62828] hover:bg-[#B91C1C] text-white rounded-xl text-sm font-bold transition cursor-pointer shadow-sm"
              >
                {t('পুনরায় চেষ্টা করুন', 'Try Again')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
