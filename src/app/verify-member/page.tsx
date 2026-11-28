import { Suspense } from 'react';
import { Metadata } from 'next';
import MemberVerifyClient from './MemberVerifyClient';

export const metadata: Metadata = {
  title: 'সদস্যপদ যাচাইকরণ (Member Verification) | রৌমারী জনকল্যাণ ফাউন্ডেশন',
  description:
    'রৌমারী জনকল্যাণ ফাউন্ডেশনের যেকোনো সদস্যের অনন্য মেম্বার আইডি (RJF ID) দিয়ে সত্যতা ও কমিটি পদবী যাচাই করুন।',
};

export default function MemberVerifyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <MemberVerifyClient />
    </Suspense>
  );
}
