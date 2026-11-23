import { z } from 'zod';

export const volunteerSchema = z.object({
  name: z.string().min(2, { message: 'পূর্ণ নাম লিখুন' }),
  phone: z
    .string()
    .regex(/^(?:\+88|88)?01[3-9]\d{8}$/, { message: 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন' }),
  email: z.string().email({ message: 'সঠিক ইমেইল এড্রেস লিখুন' }).optional().or(z.literal('')),
  age: z
    .number({ message: 'বয়স লিখুন' })
    .min(16, { message: 'ন্যূনতম বয়স ১৬ বছর হতে হবে' })
    .max(70),
  profession: z.string().optional(),
  preferredWing: z.string().min(1, { message: 'পছন্দের কাজের ক্ষেত্র নির্বাচন করুন' }),
  availability: z.enum(['weekends', 'weekdays', 'anytime', 'emergency']),
  motivation: z.string().optional(),
});

export type VolunteerFormData = z.infer<typeof volunteerSchema>;
