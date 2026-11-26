import { Metadata } from 'next';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { RoumariTab } from '@/components/dashboard/tabs/RoumariTab';

export const metadata: Metadata = {
  title: 'আমাদের রৌমারী পোর্টাল ব্যবস্থাপনা | ড্যাশবোর্ড',
  description: 'রৌমারী ডিরেক্টরি, জরুরি হটলাইন, স্থানীয় সংবাদ ও দর্শনীয় স্থান পরিচালনা',
};

export default function RoumariDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="আমাদের রৌমারী পোর্টাল ব্যবস্থাপনা"
        description="রৌমারী উপজেলার সেবা ডিরেক্টরি, জরুরি হটলাইন, দর্শনীয় স্থান ও স্থানীয় সংবাদসমূহ পরিচালনা ও হালনাগাদ করুন।"
      />
      <RoumariTab />
    </div>
  );
}
