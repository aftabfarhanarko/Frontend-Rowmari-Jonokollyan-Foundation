import { z } from 'zod';

export const assistanceSchema = z.object({
  category: z.enum(['medical', 'education', 'financial', 'food', 'winter', 'emergency'], {
    message: 'সহায়তার খাত নির্বাচন করুন',
  }),
  fullName: z
    .string()
    .min(2, { message: 'পূর্ণ নাম কমপক্ষে ২ অক্ষরের হতে হবে' })
    .max(100, { message: 'নাম সর্বোচ্চ ১০০ অক্ষরের হতে পারে' }),
  phone: z
    .string()
    .regex(/^(?:\+88|88)?01[3-9]\d{8}$/, { message: 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)' }),
  nid: z.string().optional(),
  unionName: z.string().min(1, { message: 'ইউনিয়ন নির্বাচন করুন' }),
  village: z.string().min(2, { message: 'গ্রাম বা পাড়ার নাম লিখুন' }),
  amountOrItems: z.string().optional(),
  description: z
    .string()
    .min(10, { message: 'প্রয়োজনের বিস্তারিত বিবরণ কমপক্ষে ১০ অক্ষরের হতে হবে' })
    .max(1000, { message: 'বিবরণ সর্বোচ্চ ১০০০ অক্ষরের মধ্যে লিখুন' }),
  agreeConsent: z.boolean().refine((val) => val === true, {
    message: 'তথ্য যাচাইয়ের শর্তাবলীতে সম্মতি প্রদান আবশ্যক',
  }),
});

export type AssistanceFormData = z.infer<typeof assistanceSchema>;
