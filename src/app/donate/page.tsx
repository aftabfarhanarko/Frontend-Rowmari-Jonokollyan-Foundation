import type { Metadata } from 'next';
import DonateClientPage from './DonateClientPage';

export const metadata: Metadata = {
  title: 'অনুদান দিন | মানবতার পাশে দাঁড়ান — রৌমারী জনকল্যাণ ফাউন্ডেশন',
  description:
    'বিকাশ, নগদ ও রকেটের মাধ্যমে সরাসরি অনুদান দিয়ে কুড়িগ্রামের রৌমারী ও চরাঞ্চলের অসহায় মানুষের পাশে দাঁড়ান। আপনার সহায়তা পৌঁছে যাবে সরাসরি মাঠপর্যায়ে।',
  openGraph: {
    title: 'অনুদান দিন | রৌমারী জনকল্যাণ ফাউন্ডেশন',
    description:
      'বিকাশ, নগদ ও রকেটের মাধ্যমে অনুদান দিয়ে অসহায় মানুষের পাশে দাঁড়ান। আপনার ছোট সহযোগিতাও কারও জীবনে বড় পরিবর্তন আনতে পারে।',
    url: 'https://rjf-iota.vercel.app/donate',
    type: 'website',
  },
};

export default function DonatePage() {
  return <DonateClientPage />;
}
