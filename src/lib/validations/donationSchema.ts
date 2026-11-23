import { z } from 'zod';

export const donationSchema = z
  .object({
    amount: z.string().min(1, { message: 'অনুদানের পরিমাণ নির্বাচন করুন' }),
    customAmount: z.string().optional(),
    campaign: z.string().min(1, { message: 'ক্যাম্পেইন নির্বাচন করুন' }),
    donorName: z.string().optional(),
    donorPhone: z
      .string()
      .regex(/^(?:\+88|88)?01[3-9]\d{8}$/, { message: 'সঠিক মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)' }),
    paymentMethod: z.enum(['bkash', 'nagad', 'bank', 'card'], {
      message: 'পেমেন্ট মাধ্যম নির্বাচন করুন',
    }),
    transactionId: z
      .string()
      .min(4, { message: 'সঠিক ট্রানজেকশন আইডি (TrxID) লিখুন' })
      .max(40, { message: 'TrxID সর্বোচ্চ ৪০ অক্ষরের হতে পারে' }),
    isAnonymous: z.boolean(),
  })
  .refine(
    (data) => {
      if (data.amount === 'other') {
        const custom = Number(data.customAmount);
        return !isNaN(custom) && custom >= 10;
      }
      return true;
    },
    {
      message: 'ন্যূনতম ১০ টাকা অনুদান নির্ধারণ করুন',
      path: ['customAmount'],
    }
  );

export type DonationFormData = z.infer<typeof donationSchema>;
