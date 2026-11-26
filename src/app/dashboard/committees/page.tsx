import { Metadata } from 'next';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { CommitteesTab } from '@/components/dashboard/tabs/CommitteesTab';

export const metadata: Metadata = {
  title: 'কমিটি ও সদস্য ব্যবস্থাপনা | ড্যাশবোর্ড',
  description: 'কার্যনির্বাহী ও উপদেষ্টা পরিষদ, পদবী এবং মেম্বার আইডি তৈরি ও পরিচালনা',
};

export default function CommitteesDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="কমিটি ও সদস্য ব্যবস্থাপনা"
        description="সকল কার্যনির্বাহী ও উপদেষ্টা কমিটি গঠন, পদবী নির্ধারণ এবং সদস্যদের অনন্য RJF মেম্বার আইডি বরাদ্দ করুন।"
      />
      <CommitteesTab />
    </div>
  );
}
