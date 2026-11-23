import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, { message: 'আপনার পূর্ণ নাম লিখুন' }),
  contactInfo: z.string().min(5, { message: 'সঠিক মোবাইল নম্বর বা ইমেইল লিখুন' }),
  message: z.string().min(5, { message: 'বার্তা কমপক্ষে ৫ অক্ষরের হতে হবে' }).max(1000),
});

export type ContactFormData = z.infer<typeof contactSchema>;
