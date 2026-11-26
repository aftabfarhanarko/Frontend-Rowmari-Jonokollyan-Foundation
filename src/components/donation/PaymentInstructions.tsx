'use client';

import React from 'react';
import { Heart, ShieldCheck, CheckCircle2, Copy, Check, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface PaymentInstructionsProps {
  paymentMethod: 'BKASH' | 'NAGAD' | 'ROCKET';
  onSelectMethod: (method: 'BKASH' | 'NAGAD' | 'ROCKET') => void;
  currentPaymentNumber: string;
}

export default function PaymentInstructions({
  paymentMethod,
  onSelectMethod,
  currentPaymentNumber,
}: PaymentInstructionsProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentPaymentNumber.replace(/\s+/g, ''));
    setCopied(true);
    toast.success('পেমেন্ট নম্বর কপি করা হয়েছে!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200 shadow-2xs">
        <h2 className="text-base font-extrabold text-stone-900 mb-3 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#D62828]" />
          <span>পেমেন্ট মাধ্যম ও নির্দেশিকা</span>
        </h2>

        <div className="grid grid-cols-3 gap-2 mb-5">
          {(['BKASH', 'NAGAD', 'ROCKET'] as const).map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => onSelectMethod(method)}
              className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                paymentMethod === method
                  ? 'border-[#D62828] bg-red-50 text-[#D62828] font-bold ring-2 ring-red-200'
                  : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
              }`}
            >
              <div className="text-sm font-black">
                {method === 'BKASH' ? 'বিকাশ' : method === 'NAGAD' ? 'নগদ' : 'রকেট'}
              </div>
              <div className="text-[10px] opacity-80 mt-0.5">{method}</div>
            </button>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 mb-5">
          <div className="text-xs text-stone-500 mb-1 font-semibold">
            ফাউন্ডেশনের অফিসিয়াল মার্চেন্ট/পার্সোনাল নম্বর:
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-base sm:text-lg font-black text-[#D62828] tracking-wider">
              {currentPaymentNumber}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="px-2.5 py-1.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-100 text-xs font-bold text-stone-700 flex items-center gap-1 cursor-pointer transition shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-red-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'কপি হয়েছে' : 'কপি'}</span>
            </button>
          </div>
          <p className="text-[11px] text-stone-500 mt-2">
            টাইপ: <strong>Send Money / পার্সোনাল</strong> (রেফারেন্স: RJF)
          </p>
        </div>

        <div className="space-y-2 text-xs text-stone-600">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#D62828] shrink-0 mt-0.5" />
            <span>প্রথমে আপনার মোবাইল অ্যাপ থেকে উপরের নম্বরে অনুদানের অর্থ পাঠান।</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#D62828] shrink-0 mt-0.5" />
            <span>লেনদেন শেষে প্রাপ্ত <strong>Transaction ID (TrxID)</strong> টি সংরক্ষণ করুন।</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#D62828] shrink-0 mt-0.5" />
            <span>ডানপাশের ফর্মে সঠিক TrxID ও প্রেরক নম্বর লিখে সাবমিট করুন।</span>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-red-50/60 border border-red-200/80 text-xs text-stone-700 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-[#D62828] shrink-0 mt-0.5" />
        <p>
          <strong>নিরাপত্তা সতর্কতা:</strong> রৌমারী জনকল্যাণ ফাউন্ডেশন কখনো কারো ওটিপি (OTP), পিন (PIN) বা পাসওয়ার্ড জানতে চায় না।
        </p>
      </div>
    </div>
  );
}
