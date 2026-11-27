import { baseApi } from './baseApi';
import { API_ENDPOINTS } from './endpoints';

export interface DonationSubmissionPayload {
  donorName?: string;
  donorPhone: string;
  donorEmail?: string;
  isAnonymous?: boolean;
  amount: number;
  campaignId?: string;
  paymentMethod: 'BKASH' | 'NAGAD' | 'ROCKET';
  senderPhone?: string;
  transactionReference: string;
  paymentProofUrl?: string;
  notes?: string;
}

export interface AdminCreateDonationPayload {
  donorName?: string;
  donorPhone?: string;
  donorEmail?: string;
  isAnonymous?: boolean;
  amount: number;
  campaignId?: string;
  paymentMethod?: 'CASH' | 'BANK_TRANSFER' | 'BKASH' | 'NAGAD' | 'ROCKET' | 'OTHER';
  senderPhone?: string;
  transactionReference?: string;
  paymentProofUrl?: string;
  notes?: string;
  adminNote?: string;
  status?: 'PENDING' | 'APPROVED';
}

export interface PublicDonationStats {
  totalApprovedAmount: number;
  totalApprovedDonations: number;
  verifiedDonors: number;
  byMethod: Array<{ method: string; count: number; amount: number }>;
}

export interface ApprovedDonorItem {
  id: string;
  donorName: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  campaignTitle: string;
  createdAt: string;
}

export interface AdminDonationItem {
  id: string;
  donorName: string | null;
  donorPhone: string | null;
  donorEmail: string | null;
  senderPhone: string | null;
  isAnonymous: boolean;
  amount: number;
  currency: string;
  paymentMethod: string;
  transactionReference: string | null;
  paymentProofUrl: string | null;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  notes: string | null;
  adminNote: string | null;
  verifiedBy: string | null;
  verifiedAt: string | null;
  createdAt: string;
  campaign?: { id: string; title: string } | null;
}

export const donationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitPublicDonation: builder.mutation<any, DonationSubmissionPayload>({
      query: (data) => ({
        url: API_ENDPOINTS.donations.record,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Donations'],
    }),

    getPublicDonationStats: builder.query<PublicDonationStats, void>({
      query: () => ({ url: API_ENDPOINTS.donations.publicStats }),
      providesTags: ['Donations'],
    }),

    getPublicApprovedDonors: builder.query<ApprovedDonorItem[], { limit?: number } | void>({
      query: (params) => ({
        url: API_ENDPOINTS.donations.publicShowcase,
        params: params || { limit: 12 },
      }),
      providesTags: ['Donations'],
    }),

    getAdminDonationsList: builder.query<{ items: AdminDonationItem[]; total: number }, { status?: string; campaignId?: string; page?: number; limit?: number } | void>({
      query: (params) => ({
        url: API_ENDPOINTS.donations.adminAll,
        params: params || { page: 1, limit: 50 },
      }),
      providesTags: ['Donations'],
    }),

    getDonationById: builder.query<any, string>({
      query: (id) => ({ url: API_ENDPOINTS.donations.detail(id) }),
      providesTags: (_res, _err, id) => [{ type: 'Donations', id }],
    }),

    reviewDonationStatus: builder.mutation<AdminDonationItem, { id: string; status: 'APPROVED' | 'REJECTED'; adminNote?: string }>({
      query: ({ id, ...data }) => ({
        url: API_ENDPOINTS.donations.adminReview(id),
        method: 'PATCH',
        data,
      }),
      invalidatesTags: ['Donations', 'Campaigns', 'Reports'],
    }),

    adminCreateDonation: builder.mutation<AdminDonationItem, AdminCreateDonationPayload>({
      query: (data) => ({
        url: API_ENDPOINTS.donations.adminCreate,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Donations', 'Campaigns', 'Reports'],
    }),
  }),
});

export const {
  useSubmitPublicDonationMutation,
  useGetPublicDonationStatsQuery,
  useGetPublicApprovedDonorsQuery,
  useGetAdminDonationsListQuery,
  useGetDonationByIdQuery,
  useReviewDonationStatusMutation,
  useAdminCreateDonationMutation,
} = donationsApi;
