'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, Upload, Loader2 } from 'lucide-react';
import { uploadToImgbb, validateImageFile } from '@/lib/utils/imgbb';
import { toast } from 'sonner';

interface Props {
  campaigns: Array<{ id: string; titleBn: string }>;
  paymentMethod: 'BKASH' | 'NAGAD' | 'ROCKET';
  isSubmitting: boolean;
  onSubmit: (payload: any) => Promise<void>;
}

export default function DonationForm({ campaigns, paymentMethod, isSubmitting, onSubmit }: Props) {
  const [selectedCampaignId, setSelectedCampaignId] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [transactionReference, setTransactionReference] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofPreview, setProofPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleProof = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const v = validateImageFile(f, 5);
    if (!v.valid) return toast.error(v.error || 'অকার্যকর ফাইল');
    setProofFile(f);
    setProofPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorPhone.trim() || !amount || !transactionReference.trim()) {
      return toast.error('মোবাইল নম্বর, টাকার পরিমাণ ও TrxID আবশ্যক');
    }
    let proofUrl: string | undefined;
    if (proofFile) {
      setIsUploading(true);
      try {
        const res = await uploadToImgbb(proofFile);
        if (res?.url) proofUrl = res.url;
      } catch {
        toast.error('স্ক্রিনশট আপলোড ব্যর্থ, সরাসরি জমা দেওয়া হচ্ছে');
      } finally {
        setIsUploading(false);
      }
    }
    await onSubmit({
      donorName: isAnonymous ? undefined : donorName.trim(),
      donorPhone: donorPhone.trim(),
      senderPhone: senderPhone.trim() || donorPhone.trim(),
      amount: Number(amount),
      campaignId: selectedCampaignId || undefined,
      paymentMethod,
      transactionReference: transactionReference.trim(),
      paymentProofUrl: proofUrl,
      isAnonymous,
    });
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-2xs">
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <h2 className="text-lg font-black text-stone-900 border-b border-stone-100 pb-3 mb-2">অনুদানের বিবরণী জমা দিন</h2>
        <div>
          <label className="block font-bold text-stone-700 mb-1">ক্যাম্পেইন নির্বাচন করুন (ঐচ্ছিক)</label>
          <select
            value={selectedCampaignId}
            onChange={(e) => setSelectedCampaignId(e.target.value)}
            className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#D62828]/30 font-semibold"
          >
            <option value="">সাধারণ মানবকল্যাণ তহবিল (যেখানে প্রয়োজন)</option>
            {campaigns.map((c) => (<option key={c.id} value={c.id}>{c.titleBn}</option>))}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-stone-700 mb-1">অনুদানের পরিমাণ (টাকা) *</label>
            <input
              type="number" required min="10" value={amount} onChange={(e) => setAmount(e.target.value)}
              placeholder="যেমন: ১০০০" className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#D62828]/30"
            />
          </div>
          <div>
            <label className="block font-bold text-stone-700 mb-1">প্রেরক মোবাইল নম্বর *</label>
            <input
              type="text" required value={senderPhone} onChange={(e) => setSenderPhone(e.target.value)}
              placeholder="017XXXXXXXX" className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#D62828]/30"
            />
          </div>
        </div>
        <div>
          <label className="block font-bold text-stone-700 mb-1">ট্রানজেকশন আইডি (TrxID) *</label>
          <input
            type="text" required value={transactionReference} onChange={(e) => setTransactionReference(e.target.value)}
            placeholder="যেমন: 9J87K6L5M4" className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs uppercase font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#D62828]/30"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-stone-700 mb-1">আপনার নাম {isAnonymous ? '(গোপন)' : '*'}</label>
            <input
              type="text" disabled={isAnonymous} value={donorName} onChange={(e) => setDonorName(e.target.value)}
              placeholder={isAnonymous ? 'গোপন দানকারী' : 'যেমন: মোঃ আব্দুল্লাহ'} className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#D62828]/30"
            />
          </div>
          <div>
            <label className="block font-bold text-stone-700 mb-1">যোগাযোগ নম্বর *</label>
            <input
              type="text" required value={donorPhone} onChange={(e) => setDonorPhone(e.target.value)}
              placeholder="01XXXXXXXXX" className="w-full rounded-xl border border-stone-200 px-3.5 py-2.5 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#D62828]/30"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox" id="anonCheck" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)}
            className="size-4 rounded text-[#D62828] focus:ring-red-400 cursor-pointer"
          />
          <label htmlFor="anonCheck" className="text-xs text-stone-700 font-medium cursor-pointer select-none">
            আমার নাম ওয়েবসাইটে প্রকাশ না করে গোপন রাখুন (Anonymous)
          </label>
        </div>
        <div>
          <label className="block font-bold text-stone-700 mb-1">পেমেন্ট স্ক্রিনশট / প্রমাণপত্র (ঐচ্ছিক)</label>
          <div className="flex items-center gap-3">
            <label className="px-4 py-2.5 rounded-xl border border-dashed border-stone-300 hover:border-red-400 bg-stone-50 text-stone-700 font-semibold cursor-pointer flex items-center gap-2 transition">
              <Upload className="w-4 h-4 text-[#D62828]" />
              <span>ছবি নির্বাচন করুন</span>
              <input type="file" accept="image/*" onChange={handleProof} className="hidden" />
            </label>
            {proofPreview && (
              <div className="relative size-12 rounded-xl overflow-hidden border border-stone-200 shrink-0">
                <Image src={proofPreview} alt="Proof" fill className="object-cover" />
              </div>
            )}
          </div>
        </div>
        <button
          type="submit" disabled={isSubmitting || isUploading}
          className="w-full py-3 rounded-2xl bg-[#D62828] hover:bg-[#B91C1C] text-white font-extrabold text-sm transition shadow-sm active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer mt-4"
        >
          {isSubmitting || isUploading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /><span>যাচাই করে জমা দেওয়া হচ্ছে...</span></>
          ) : (
            <><Heart className="w-4 h-4 fill-current" /><span>অনুদানের বিবরণ নিশ্চিত করুন</span></>
          )}
        </button>
      </form>
    </div>
  );
}
