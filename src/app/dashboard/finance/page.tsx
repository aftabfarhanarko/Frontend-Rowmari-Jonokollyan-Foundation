import { Metadata } from 'next';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { DonationsTab } from '@/components/dashboard/tabs/DonationsTab';

export const metadata: Metadata = {
  title: 'তহবিল ও অনুদান ব্যবস্থাপনা | ড্যাশবোর্ড',
  description: 'সকল অনলাইন অনুদান যাচাই ও পর্যালোচনা',
};

export default function FinanceDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="তহবিল ও অনুদান ব্যবস্থাপনা"
        description="সকল অনলাইন অনুদানের ট্রানজ্যাকশন ও তথ্য যাচাই করে অনুমোদন বা বাতিল করুন।"
      />
      <DonationsTab />
    </div>
  );
}
