import { baseApi } from './baseApi';
import { CampaignItem } from '@/types';

export interface DonationPayload {
  amount: number;
  campaign: string;
  donorName?: string;
  donorPhone: string;
  paymentMethod: 'bkash' | 'nagad' | 'bank' | 'card';
  transactionId: string;
  isAnonymous: boolean;
}

export interface DonationResponse {
  success: boolean;
  receiptNo: string;
  amount: number;
  date: string;
  campaign: string;
  message: string;
}

export const campaignsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCampaigns: builder.query<CampaignItem[], void>({
      query: () => ({
        url: '/campaigns',
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Campaigns' as const, id })),
              { type: 'Campaigns', id: 'LIST' },
            ]
          : [{ type: 'Campaigns', id: 'LIST' }],
    }),
    submitDonation: builder.mutation<DonationResponse, DonationPayload>({
      query: (body) => ({
        url: '/donate',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: [{ type: 'Campaigns', id: 'LIST' }],
    }),
  }),
});

export const { useGetCampaignsQuery, useSubmitDonationMutation } = campaignsApi;
