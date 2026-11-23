'use client';

import React from 'react';
import { 
  X, 
  Search, 
  Check, 
  ClipboardList, 
  AlertCircle, 
  Lightbulb 
} from 'lucide-react';
import { Language, ApplicationTrackingStatus } from '@/types';

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
  if (!isOpen) return null;

  const steps = [
    { key: 'pending', labelBn: 'আবেদন জমা', labelEn: 'Submitted' },
    { key: 'under_review', labelBn: 'মাঠপর্যায়ে যাচাই', labelEn: 'Under Review' },
    { key: 'approved', labelBn: 'কমিটি অনুমোদন', labelEn: 'Approved' },
    { key: 'completed', labelBn: 'সহায়তা প্রদান সম্পন্ন', labelEn: 'Completed' },
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 md:p-8 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-800 transition cursor-pointer"
        >
          <X className="w-4 h-4 text-stone-600" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Search className="w-6 h-6 text-emerald-800" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-stone-900">
              {lang === 'bn' ? 'আবেদনের বর্তমান অবস্থা' : 'Application Status'}
            </h2>
            <p className="text-xs md:text-sm font-mono text-stone-500">
              {lang === 'bn' ? 'রেফারেন্স কোড:' : 'Reference ID:'}{' '}
              <span className="font-bold text-emerald-800">{searchedId}</span>
            </p>
          </div>
        </div>

        {application ? (
          <div className="space-y-6">
            {/* Status Summary Banner */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs text-stone-500">
                  {lang === 'bn' ? 'আবেদনকারী:' : 'Applicant:'}{' '}
                  <strong className="text-stone-900 text-sm">{application.applicantName}</strong>
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                    application.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : application.status === 'approved'
                      ? 'bg-blue-100 text-blue-800 border border-blue-300'
                      : application.status === 'under_review'
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-stone-200 text-stone-700'
                  }`}
                >
                  {application.status === 'completed'
                    ? lang === 'bn' ? 'সম্পন্ন' : 'Completed'
                    : application.status === 'approved'
                    ? lang === 'bn' ? 'অনুমোদিত' : 'Approved'
                    : application.status === 'under_review'
                    ? lang === 'bn' ? 'যাচাই চলছে' : 'Under Review'
                    : lang === 'bn' ? 'অপেক্ষমান' : 'Pending'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 pt-2 border-t border-stone-200">
                <div>
                  <span className="text-stone-400 block">{lang === 'bn' ? 'ক্যাটাগরি:' : 'Category:'}</span>
                  <span className="font-semibold text-stone-800">
                    {lang === 'bn' ? application.categoryBn : application.categoryEn}
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block">{lang === 'bn' ? 'জমা দেওয়ার তারিখ:' : 'Submission Date:'}</span>
                  <span className="font-semibold text-stone-800">
                    {lang === 'bn' ? application.submittedDateBn : application.submittedDateEn}
                  </span>
                </div>
              </div>
            </div>

            {/* Stepper Pipeline */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-4">
                {lang === 'bn' ? 'কার্যক্রম ট্র্যাকিং ধাপসমূহ' : 'Lifecycle Progress'}
              </h4>
              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                {steps.map((st) => {
                  const state = getStepStatus(st.key, application.status);
                  return (
                    <div key={st.key} className="relative flex items-start gap-3">
                      <div
                        className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-white ${
                          state === 'completed'
                            ? 'bg-emerald-600 text-white'
                            : state === 'current'
                            ? 'bg-amber-500 text-white animate-pulse'
                            : 'bg-stone-200 text-stone-400'
                        }`}
                      >
                        {state === 'completed' ? <Check className="w-3 h-3 text-white" /> : state === 'current' ? '•' : ''}
                      </div>
                      <div>
                        <p
                          className={`text-sm font-semibold ${
                            state === 'completed'
                              ? 'text-emerald-900'
                              : state === 'current'
                              ? 'text-amber-900 font-bold'
                              : 'text-stone-400'
                          }`}
                        >
                          {lang === 'bn' ? st.labelBn : st.labelEn}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Verification Note Box */}
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-stone-700 space-y-2">
              <span className="font-bold text-emerald-900 block flex items-center gap-1.5">
                <ClipboardList className="w-4 h-4 text-emerald-900 shrink-0" />
                <span>{lang === 'bn' ? 'রিভিউ কমিটির মন্তব্য ও আপডেট:' : 'Review Committee Note:'}</span>
              </span>
              <p className="text-stone-700 leading-relaxed">
                {lang === 'bn' ? application.statusNoteBn : application.statusNoteEn}
              </p>
              {application.assignedOfficerBn && (
                <p className="text-emerald-800 font-medium pt-1 border-t border-emerald-200/60">
                  {lang === 'bn' ? 'দায়িত্বপ্রাপ্ত সমন্বয়ক:' : 'Assigned Coordinator:'}{' '}
                  <strong>{application.assignedOfficerBn}</strong>
                </p>
              )}
              {application.amountOrSupportBn && (
                <p className="text-stone-900 font-bold">
                  {lang === 'bn' ? 'অনুমোদিত সহায়তা:' : 'Approved Support:'}{' '}
                  <span className="text-emerald-700">{application.amountOrSupportBn}</span>
                </p>
              )}
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl font-medium text-sm transition cursor-pointer"
            >
              {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
            </button>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-amber-700" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-2">
              {lang === 'bn' ? 'আবেদন পাওয়া যায়নি' : 'No Record Found'}
            </h3>
            <p className="text-stone-600 text-xs md:text-sm mb-6 max-w-sm mx-auto">
              {lang === 'bn'
                ? `"${searchedId}" আইডি বা মোবাইল নম্বরে কোনো আবেদন খুঁজে পাওয়া যায়নি। অনুগ্রহ করে সঠিক আইডি লিখুন (যেমন: RJF-2026-0842 বা RJF-2026-0915)।`
                : `No matching application found for ID "${searchedId}". Please check your tracking reference.`}
            </p>
            <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-600 mb-6 text-left border border-stone-200 flex items-start gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div><strong>{lang === 'bn' ? 'টিপস:' : 'Tip:'}</strong> {lang === 'bn' ? 'আপনি যদি সম্প্রতি নতুন আবেদন করে থাকেন, তবে প্রাপ্ত কনফার্মেশন কোডটি ব্যবহার করুন। প্রয়োজনে হেল্পলাইনে যোগাযোগ করতে পারেন।' : 'Use the tracking ID received after submitting your aid form.'}</div>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-sm font-medium transition"
            >
              {lang === 'bn' ? 'পুনরায় চেষ্টা করুন' : 'Try Again'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
