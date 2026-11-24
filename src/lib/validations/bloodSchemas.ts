import { z } from 'zod';

export const bloodDonorSchema = z.object({
  name: z.string().min(2, { message: 'আপনার পূর্ণ নাম লিখুন' }),
  phone: z
    .string()
    .regex(/^(?:\+88|88)?01[3-9]\d{8}$/, { message: 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন' }),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'], {
    message: 'রক্তের গ্রুপ নির্বাচন করুন',
  }),
  upazila: z.string().min(1, { message: 'উপজেলা বা এলাকা নির্বাচন করুন' }),
  village: z.string().optional(),
  lastDonation: z.string().optional(),
  availability: z.enum(['available', 'emergency_only', 'cooldown']),
  agreeConsent: z.boolean().refine((val) => val === true, {
    message: 'স্বেচ্ছায় রক্তদানের শর্তে সম্মতি আবশ্যক',
  }),
});

export type BloodDonorFormData = z.infer<typeof bloodDonorSchema>;

export const bloodRequestSchema = z.object({
  patientName: z.string().min(2, { message: 'রোগীর নাম লিখুন' }),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'], {
    message: 'রক্তের গ্রুপ নির্বাচন করুন',
  }),
  unitsNeeded: z
    .number({ message: 'রক্তের ব্যাগ সংখ্যা লিখুন' })
    .min(1, { message: 'রক্তের ব্যাগ সংখ্যা কমপক্ষে ১ হতে হবে' })
    .max(10),
  hospital: z.string().min(2, { message: 'হাসপাতালের নাম লিখুন' }),
  location: z.string().min(2, { message: 'হাসপাতালের অবস্থান লিখুন' }),
  dateNeeded: z.string().refine((value) => !Number.isNaN(Date.parse(value)), { message: 'সঠিক প্রয়োজনীয় তারিখ নির্বাচন করুন' }),
  urgency: z.enum(['critical', 'urgent', 'scheduled']),
  contactPhone: z
    .string()
    .regex(/^(?:\+88|88)?01[3-9]\d{8}$/, { message: 'সঠিক মোবাইল নম্বর দিন' }),
  contactName: z.string().optional(),
  notes: z.string().optional(),
});

export type BloodRequestFormData = z.infer<typeof bloodRequestSchema>;
