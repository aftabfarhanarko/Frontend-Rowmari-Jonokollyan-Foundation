import { baseApi } from './baseApi';
import { API_ENDPOINTS } from './endpoints';
import type { ApplicationTrackingStatus, NewsItem } from '@/types';

export interface AssistancePayload {
  category: string; fullName: string; phone: string; nid?: string; unionName: string; village: string;
  amountOrItems?: string; description: string; agreeConsent: boolean;
}
export interface VolunteerPayload {
  name: string; phone: string; email?: string; age: number; profession?: string; preferredWing: string; availability: string; motivation?: string;
}
export interface ContactMessagePayload { name: string; contactInfo: string; message: string }

type TrackedApplication = { referenceCode: string; status: string; category: string; createdAt: string; statusHistory?: Array<{ remarks?: string }> };
type BackendNews = { id: string; type: 'NEWS' | 'EVENT'; title: string; summary?: string; location?: string; startDate?: string; createdAt: string; imageUrl?: string };
const enumValue = (value: string) => value.trim().replace(/[ -]+/g, '_').toUpperCase();
const phoneValue = (value: string) => value.replace(/[ ()-]/g, '');

export const applicationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNews: builder.query<NewsItem[], void>({
      query: () => ({ url: API_ENDPOINTS.content.newsEvents, params: { page: 1, limit: 100 } }),
      transformResponse: (response: BackendNews[] | { items: BackendNews[] }): NewsItem[] =>
        (Array.isArray(response) ? response : response.items).map((item) => ({
          id: item.id, type: item.type.toLowerCase() as NewsItem['type'], titleBn: item.title, titleEn: item.title,
          dateBn: item.startDate || item.createdAt, dateEn: item.startDate || item.createdAt,
          locationBn: item.location || '', locationEn: item.location || '', summaryBn: item.summary || '', summaryEn: item.summary || '', imageUrl: item.imageUrl,
        })),
    }),
    trackApplication: builder.query<ApplicationTrackingStatus, { referenceCode: string; phone: string }>({
      query: ({ referenceCode, phone }) => ({ url: API_ENDPOINTS.applications.track, method: 'POST', data: { referenceCode, phone: phoneValue(phone) } }),
      transformResponse: (record: TrackedApplication): ApplicationTrackingStatus => ({
        id: record.referenceCode,
        applicantName: '',
        categoryBn: record.category,
        categoryEn: record.category,
        submittedDateBn: record.createdAt,
        submittedDateEn: record.createdAt,
        status: (record.status.toLowerCase() === 'verified' ? 'under_review' : record.status.toLowerCase()) as ApplicationTrackingStatus['status'],
        statusNoteBn: record.statusHistory?.at(-1)?.remarks || '',
        statusNoteEn: record.statusHistory?.at(-1)?.remarks || '',
      }),
    }),
    submitAssistance: builder.mutation<{ referenceCode: string; id: string; status: string; createdAt: string }, AssistancePayload>({
      query: (form) => {
        const amount = Number(form.amountOrItems?.replace(/[^\d.]/g, ''));
        const category = enumValue(form.category);
        return {
          url: API_ENDPOINTS.applications.create,
          method: 'POST',
          data: {
            applicant: { fullName: form.fullName, phone: phoneValue(form.phone), upazila: form.unionName, address: form.village },
            category: ['MEDICAL', 'EDUCATION', 'DISASTER_RELIEF', 'WIDOW_ORPHAN', 'HOUSING', 'FOOD_AID', 'OTHER'].includes(category) ? category : 'OTHER',
            ...(Number.isFinite(amount) && amount > 0 ? { requestedAmount: amount } : {}),
            description: form.description,
            consent: { privacyAccepted: form.agreeConsent, contactAllowed: form.agreeConsent },
          },
        };
      },
    }),
    applyVolunteer: builder.mutation<unknown, VolunteerPayload>({
      query: (form) => ({ url: API_ENDPOINTS.volunteers.register, method: 'POST', data: {
        fullName: form.name, phone: phoneValue(form.phone), email: form.email, upazila: form.preferredWing,
        skills: [form.profession, form.motivation].filter(Boolean).join(' — '), availabilityHoursPerWeek: Number(form.availability) || 1,
      } }),
    }),
    sendContactMessage: builder.mutation<{ id: string; createdAt: string }, ContactMessagePayload>({
      query: ({ name, contactInfo, message }) => ({ url: API_ENDPOINTS.contact, method: 'POST', data: { name, contactInfo, message } }),
    }),
  }),
});

export const {
  useGetNewsQuery, useLazyTrackApplicationQuery, useSubmitAssistanceMutation,
  useApplyVolunteerMutation, useSendContactMessageMutation,
} = applicationsApi;
