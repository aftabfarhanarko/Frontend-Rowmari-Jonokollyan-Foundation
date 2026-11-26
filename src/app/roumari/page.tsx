import { Metadata } from 'next';
import RoumariPortalClient from './RoumariPortalClient';

export const metadata: Metadata = {
  title: 'আমাদের রৌমারী | তথ্য ডিরেক্টরি, জরুরি সেবা ও স্থানীয় সংবাদ',
  description: 'রৌমারী উপজেলার জরুরি যোগাযোগ, বাস কাউন্টার, হাসপাতাল, পুলিশ, ফায়ার সার্ভিস, দর্শনীয় স্থান ও সর্বশেষ স্থানীয় সংবাদ পোর্টাল।',
};

export default function RoumariPage() {
  return <RoumariPortalClient />;
}
