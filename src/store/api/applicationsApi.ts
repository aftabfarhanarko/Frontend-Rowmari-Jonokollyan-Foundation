import { baseApi } from './baseApi';
import { ApplicationTrackingStatus, NewsItem } from '@/types';

export interface AssistancePayload {
  category: string;
  fullName: string;
  phone: string;
  nid?: string;
  unionName: string;
  village: string;
  amountOrItems?: string;
  description: string;
  agreeConsent: boolean;
}

export interface BloodDonorPayload {
  name: string;
  phone: string;
  bloodGroup: string;
  upazila: string;
  village?: string;
  lastDonation?: string;
  availability: string;
}

export interface BloodRequestPayload {
  patientName: string;
  bloodGroup: string;
  unitsNeeded: number;
  hospital: string;
  location: string;
  dateNeeded: string;
  urgency: string;
  contactPhone: string;
  contactName?: string;
  notes?: string;
}

export interface VolunteerPayload {
  name: string;
  phone: string;
  email?: string;
  age: number;
  profession?: string;
  preferredWing: string;
  availability: string;
  motivation?: string;
}

export interface ContactMessagePayload {
  name: string;
  contactInfo: string;
  message: string;
}

export const applicationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNews: builder.query<NewsItem[], void>({
      query: () => ({
        url: '/news',
        method: 'GET',
      }),
      providesTags: [{ type: 'News', id: 'LIST' }],
    }),
    trackApplication: builder.query<ApplicationTrackingStatus, string>({
      query: (id) => ({
        url: `/track/${id}`,
        method: 'GET',
      }),
      providesTags: (_res, _err, id) => [{ type: 'Applications', id }],
    }),
    submitAssistance: builder.mutation<{ success: boolean; applicationId: string; message: string }, AssistancePayload>({
      query: (data) => ({
        url: '/assistance',
        method: 'POST',
        data,
      }),
      invalidatesTags: [{ type: 'Applications', id: 'LIST' }],
    }),
    registerBloodDonor: builder.mutation<{ success: boolean; message: string }, BloodDonorPayload>({
      query: (data) => ({
        url: '/blood/donor',
        method: 'POST',
        data,
      }),
      invalidatesTags: [{ type: 'BloodDonors', id: 'LIST' }],
    }),
    requestBlood: builder.mutation<{ success: boolean; requestId: string; message: string }, BloodRequestPayload>({
      query: (data) => ({
        url: '/blood/request',
        method: 'POST',
        data,
      }),
      invalidatesTags: [{ type: 'BloodRequests', id: 'LIST' }],
    }),
    applyVolunteer: builder.mutation<{ success: boolean; message: string }, VolunteerPayload>({
      query: (data) => ({
        url: '/volunteer',
        method: 'POST',
        data,
      }),
      invalidatesTags: [{ type: 'Volunteers', id: 'LIST' }],
    }),
    sendContactMessage: builder.mutation<{ success: boolean; message: string }, ContactMessagePayload>({
      query: (data) => ({
        url: '/contact',
        method: 'POST',
        data,
      }),
    }),
  }),
});

export const {
  useGetNewsQuery,
  useLazyTrackApplicationQuery,
  useSubmitAssistanceMutation,
  useRegisterBloodDonorMutation,
  useRequestBloodMutation,
  useApplyVolunteerMutation,
  useSendContactMessageMutation,
} = applicationsApi;
