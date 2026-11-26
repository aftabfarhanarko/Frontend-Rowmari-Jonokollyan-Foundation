'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileBottomBar from '@/components/layout/MobileBottomBar';
import PaymentInstructions from '@/components/donation/PaymentInstructions';
import DonationForm from '@/components/donation/DonationForm';
import { useGetPublicDonationStatsQuery, useSubmitPublicDonationMutation } from '@/store/api/donationsApi';
import { useGetCampaignsQuery } from '@/store/api/campaignsApi';
import { useGetAdminSettingsQuery } from '@/store/api/adminApi';
import { toast } from 'sonner';

export default function DonateClientPage() {
  const { data: stats } = useGetPublicDonationStatsQuery();
  const { data: campaigns = [] } = useGetCampaignsQuery();
  const { data: settings } = useGetAdminSettingsQuery();
  const [submitDonation, { isLoading: isSubmitting }] = useSubmitPublicDonationMutation();

  const [paymentMethod, setPaymentMethod] = useState<'BKASH' | 'NAGAD' | 'ROCKET'>('BKASH');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [submittedTrxId, setSubmittedTrxId] = useState('');

  const bkashNumber = settings?.bkash_number || '+880 1712-345678';
  const nagadNumber = settings?.nagad_number || '+880 1812-987654';
  const rocketNumber = settings?.rocket_number || '+880 1912-345678-9';

  const currentPaymentNumber =
    paymentMethod === 'BKASH' ? bkashNumber : paymentMethod === 'NAGAD' ? nagadNumber : rocketNumber;

  const handleFormSubmit = async (payload: any) => {
    try {
      await submitDonation(payload).unwrap();
      setSubmittedTrxId(payload.transactionReference);
      setSubmittedSuccess(true);
      toast.success('আপনার অনুদান সফলভাবে সংরক্ষিত হয়েছে! ধন্যবাদ।');
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || 'অনুদান সাবমিট করতে সমস্যা হয়েছে');
    }
  };

  const toBn = (num: number | string) =>
    num.toString().replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[parseInt(d, 10)]);

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans text-stone-900 antialiased selection:bg-red-200/60 selection:text-red-950">
      <Navbar lang="bn" />

      <main className="flex-1 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight">
              অনুদান দিন • মানুষের মুখে হাসি ফোটান
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-2.5 leading-relaxed">
              বিকাশ, নগদ ও রকেটের মাধ্যমে সরাসরি অনুদান দিয়ে কুড়িগ্রামের রৌমারী উপজেলার প্রত্যন্ত চরাঞ্চলের অসহায় পরিবারের খাদ্য, চিকিৎসা ও শীতবস্ত্র সহায়তা কার্যক্রমে অংশ নিন।
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
            <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-2xs text-center">
              <div className="text-xl sm:text-2xl font-black text-[#D62828]">
                ৳ {toBn((stats?.totalApprovedAmount || 3500).toLocaleString('en-US'))}
              </div>
              <div className="text-[11px] font-bold text-stone-500 mt-0.5">অনুমোদিত তহবিল</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-2xs text-center">
              <div className="text-xl sm:text-2xl font-black text-stone-900">
                {toBn(stats?.verifiedDonors || 2)} জন
              </div>
              <div className="text-[11px] font-bold text-stone-500 mt-0.5">যাচাইকৃত অনুদানদাতা</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-2xs text-center">
              <div className="text-xl sm:text-2xl font-black text-stone-900">
                {toBn(campaigns.length || 1)} টি
              </div>
              <div className="text-[11px] font-bold text-stone-500 mt-0.5">সক্রিয় কর্মসূচি</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-2xs text-center">
              <div className="text-xl sm:text-2xl font-black text-[#D62828]">১০০%</div>
              <div className="text-[11px] font-bold text-stone-500 mt-0.5">সরাসরি ফিল্ড ডেলিভারি</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <PaymentInstructions
                paymentMethod={paymentMethod}
                onSelectMethod={setPaymentMethod}
                currentPaymentNumber={currentPaymentNumber}
              />
            </div>

            <div className="lg:col-span-7">
              {submittedSuccess ? (
                <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-2xs text-center space-y-4">
                  <div className="size-16 mx-auto rounded-full bg-red-50 text-[#D62828] flex items-center justify-center border border-red-200">
                    <CheckCircle2 className="size-9" />
                  </div>
                  <h3 className="text-xl font-black text-stone-900">আপনার অনুদান সফলভাবে জমা নেওয়া হয়েছে!</h3>
                  <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                    আমাদের অ্যাডমিন টিম আপনার ট্রানজেকশন আইডি ({submittedTrxId}) যাচাই করে দ্রুত অনুদানটি অনুমোদন করবেন।
                  </p>
                  <div className="pt-4 flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSubmittedSuccess(false)}
                      className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-700 text-xs font-bold hover:bg-stone-50 cursor-pointer"
                    >
                      আরেকটি অনুদান দিন
                    </button>
                    <Link
                      href="/"
                      className="px-5 py-2.5 rounded-xl bg-[#D62828] hover:bg-[#B91C1C] text-white text-xs font-bold shadow-xs cursor-pointer"
                    >
                      হোমপেজে ফিরে যান
                    </Link>
                  </div>
                </div>
              ) : (
                <DonationForm
                  campaigns={campaigns}
                  paymentMethod={paymentMethod}
                  isSubmitting={isSubmitting}
                  onSubmit={handleFormSubmit}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer lang="bn" />
      <MobileBottomBar lang="bn" />
    </div>
  );
}
