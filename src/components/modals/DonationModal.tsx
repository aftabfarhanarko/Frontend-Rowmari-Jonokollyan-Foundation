'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, HeartHandshake } from 'lucide-react';
import { Language } from '@/types';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  preselectedCampaign?: string;
}

export default function DonationModal({
  isOpen,
  onClose,
  lang,
  preselectedCampaign,
}: DonationModalProps) {
  const [amount, setAmount] = useState('1000');
  const [customAmount, setCustomAmount] = useState('');
  const [campaign, setCampaign] = useState(preselectedCampaign || 'general');
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'bank'>('bkash');
  const [submittedReceipt, setSubmittedReceipt] = useState<{
    receiptNo: string;
    amount: string;
    date: string;
  } | null>(null);

  if (!isOpen) return null;

  const currentAmount = customAmount ? customAmount : amount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const receiptCode = `RJF-REC-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date().toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setSubmittedReceipt({
      receiptNo: receiptCode,
      amount: currentAmount,
      date: now,
    });
  };

  const handleClose = () => {
    setSubmittedReceipt(null);
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

        {submittedReceipt ? (
          <div className="py-2">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-3 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-700" />
              </div>
              <h3 className="text-2xl font-bold text-stone-900">
                {lang === 'bn' ? 'অসংখ্য ধন্যবাদ ও কৃতজ্ঞতা!' : 'Thank You For Your Support!'}
              </h3>
              <p className="text-xs md:text-sm text-stone-600 mt-1">
                {lang === 'bn'
                  ? 'আপনার অনুদানের তথ্য সফলভাবে সংরক্ষিত হয়েছে। নিচে আপনার ডিজিটাল রসিদ:'
                  : 'Your donation information is registered. Here is your digital receipt:'}
              </p>
            </div>

            {/* Digital Receipt Card */}
            <div className="bg-emerald-950 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden mb-6 border border-emerald-800">
              <div className="flex items-center justify-between border-b border-emerald-800 pb-4 mb-4">
                <div>
                  <h4 className="font-bold text-emerald-200 text-sm">
                    {lang === 'bn' ? 'রৌমারী জনকল্যাণ ফাউন্ডেশন' : 'Rowmari Janakalyan Foundation'}
                  </h4>
                  <p className="text-xs text-emerald-300">অফিসিয়াল ডিজিটাল অনুদান রসিদ</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono bg-emerald-900/80 px-2 py-1 rounded text-emerald-300">
                    {submittedReceipt.receiptNo}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs mb-4">
                <div>
                  <span className="text-emerald-400 block">দাতা / প্রেরক:</span>
                  <span className="font-semibold text-sm">
                    {isAnonymous ? (lang === 'bn' ? 'গোপনীয় শুভাকাঙ্ক্ষী' : 'Anonymous Donor') : donorName || 'সম্মানিত দাতা'}
                  </span>
                </div>
                <div>
                  <span className="text-emerald-400 block">তারিখ:</span>
                  <span className="font-semibold">{submittedReceipt.date}</span>
                </div>
                <div>
                  <span className="text-emerald-400 block">ক্যাম্পেইন / খাত:</span>
                  <span className="font-semibold capitalize">
                    {campaign === 'winter' ? 'শীতবস্ত্র তহবিল' : campaign === 'medical' ? 'মেডিকেল ফান্ড' : 'সাধারণ মানবিক তহবিল'}
                  </span>
                </div>
                <div>
                  <span className="text-emerald-400 block">লেনদেন মাধ্যম:</span>
                  <span className="font-semibold uppercase">{paymentMethod}</span>
                </div>
              </div>

              <div className="border-t border-emerald-800 pt-3 flex items-center justify-between">
                <span className="text-sm font-medium text-emerald-200">মোট অনুদান:</span>
                <span className="text-2xl font-bold text-amber-300">
                  ৳ {submittedReceipt.amount}
                </span>
              </div>
            </div>

            <p className="text-xs text-center text-stone-500 mb-6">
              {lang === 'bn'
                ? 'স্বচ্ছতা নীতি: লেনদেন রেফারেন্স যাচাই সাপেক্ষে অডিট ও আর্থিক প্রতিবেদনে অন্তর্ভুক্ত করা হবে।'
                : 'Transparency note: Transactions will be reconciled and included in our verified financial audit.'}
            </p>

            <button
              onClick={handleClose}
              className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-medium transition shadow-md"
            >
              {lang === 'bn' ? 'সম্পন্ন করুন' : 'Finish'}
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6 text-emerald-800" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-stone-900">
                  {lang === 'bn' ? 'মানবতার কল্যাণে অনুদান দিন' : 'Donate for Humanity'}
                </h2>
                <p className="text-xs md:text-sm text-stone-500">
                  {lang === 'bn'
                    ? 'আপনার ক্ষুদ্র সহায়তায় আলোকিত হবে রৌমারীর কোনো অসহায় মুখ'
                    : 'Your small contribution makes a huge impact in rural Rowmari'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  {lang === 'bn' ? 'অনুদানের খাত নির্বাচন করুন' : 'Select Purpose / Campaign'}
                </label>
                <select
                  value={campaign}
                  onChange={(e) => setCampaign(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white"
                >
                  <option value="winter">শীতবস্ত্র তহবিল ২০২৬ (Winter Relief)</option>
                  <option value="medical">জরুরি স্বাস্থ্যসেবা ও অ্যাম্বুলেন্স সাপোর্ট (Medical Support)</option>
                  <option value="education">মেধাবী শিক্ষার্থীদের শিক্ষাবৃত্তি (Education Aid)</option>
                  <option value="general">সাধারণ মানবকল্যাণ তহবিল (General Humanitarian Fund)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  {lang === 'bn' ? 'অনুদানের পরিমাণ (টাকা)' : 'Donation Amount (BDT)'}
                </label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {['500', '1000', '2500', '5000'].map((amt) => (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => {
                        setAmount(amt);
                        setCustomAmount('');
                      }}
                      className={`py-2 px-2 rounded-xl font-bold text-sm border text-center transition ${
                        amount === amt && !customAmount
                          ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                          : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      ৳ {amt}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder={lang === 'bn' ? 'অথবা আপনার পছন্দের পরিমাণ লিখুন (যেমন: ২০০০)' : 'Or custom amount...'}
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  {lang === 'bn' ? 'পেমেন্ট মেথড নির্বাচন করুন' : 'Payment Channel'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bkash')}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      paymentMethod === 'bkash'
                        ? 'border-pink-600 bg-pink-50 text-pink-700 ring-2 ring-pink-500'
                        : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span>bKash (বিকাশ)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('nagad')}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      paymentMethod === 'nagad'
                        ? 'border-orange-600 bg-orange-50 text-orange-700 ring-2 ring-orange-500'
                        : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span>Nagad (নগদ)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      paymentMethod === 'bank'
                        ? 'border-emerald-700 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-600'
                        : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span>Bank (ব্যাংক)</span>
                  </button>
                </div>
              </div>

              {/* Payment Info Box */}
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1.5">
                {paymentMethod === 'bkash' && (
                  <div>
                    <span className="font-semibold text-pink-700 block">
                      বিকাশ পেমেন্ট / সেন্ড মানি নম্বর:
                    </span>
                    <div className="flex items-center justify-between font-mono font-bold text-sm text-stone-900 bg-white p-2 rounded border border-stone-200 mt-1">
                      <span>01712-345678 (মার্চেন্ট / একাউন্ট)</span>
                      <span className="text-[10px] text-pink-700 bg-pink-100 px-2 py-0.5 rounded">Make Payment</span>
                    </div>
                  </div>
                )}
                {paymentMethod === 'nagad' && (
                  <div>
                    <span className="font-semibold text-orange-700 block">
                      নগদ একাউন্ট নম্বর:
                    </span>
                    <div className="flex items-center justify-between font-mono font-bold text-sm text-stone-900 bg-white p-2 rounded border border-stone-200 mt-1">
                      <span>01812-987654 (নগদ পেমেন্ট / পার্সোনাল)</span>
                      <span className="text-[10px] text-orange-700 bg-orange-100 px-2 py-0.5 rounded">Send Money</span>
                    </div>
                  </div>
                )}
                {paymentMethod === 'bank' && (
                  <div className="space-y-1 text-stone-700">
                    <p className="font-semibold text-emerald-800">ইসলামী ব্যাংক বাংলাদেশ লিমিটেড</p>
                    <p>হিসাবের নাম: <strong>Rowmari Janakalyan Foundation</strong></p>
                    <p>হিসাব নম্বর: <span className="font-mono font-bold text-stone-900">2050398010009876</span></p>
                    <p>শাখা: রৌমারী শাখা, কুড়িগ্রাম | রাউটিং: 125492482</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'আপনার নাম' : 'Donor Name'}
                  </label>
                  <input
                    type="text"
                    disabled={isAnonymous}
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder={isAnonymous ? (lang === 'bn' ? 'গোপনীয় থাকবে' : 'Anonymous') : (lang === 'bn' ? 'আপনার নাম' : 'Name')}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600 disabled:bg-stone-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'মোবাইল নম্বর' : 'Mobile Number'}
                  </label>
                  <input
                    type="tel"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {lang === 'bn' ? 'লেনদেন রেফারেন্স / TrxID (যদি পেমেন্ট সম্পন্ন করে থাকেন)' : 'Transaction ID / TrxID'}
                </label>
                <input
                  type="text"
                  required
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="যেমন: BKX82930219"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm font-mono focus:outline-hidden focus:ring-2 focus:ring-emerald-600 uppercase"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="anon"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded text-emerald-800 focus:ring-emerald-700"
                />
                <label htmlFor="anon" className="text-xs text-stone-600 cursor-pointer">
                  {lang === 'bn' ? 'আমার পরিচয় গোপন রাখুন (Anonymous Donation)' : 'Keep my donation anonymous'}
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
                  className="px-6 py-2.5 rounded-xl bg-[#E53935] hover:bg-[#D32F2F] text-white font-semibold text-sm transition shadow-md cursor-pointer"
                >
                  {lang === 'bn' ? 'অনুদান নিশ্চিত করুন ও রসিদ পান' : 'Confirm Donation & Get Receipt'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
