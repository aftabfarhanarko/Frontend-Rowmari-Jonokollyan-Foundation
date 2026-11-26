import { Metadata } from 'next';
import TeamClientPage from './TeamClientPage';

export const metadata: Metadata = {
  title: 'টিম ও কমিটি | রৌমারী জনকল্যাণ ফাউন্ডেশন',
  description: 'রৌমারী জনকল্যাণ ফাউন্ডেশনের গণতান্ত্রিক কার্যনির্বাহী কমিটি ও সম্মানিত সদস্যবৃন্দ।',
};

export default function TeamPage() {
  return <TeamClientPage />;
}
