import { baseApi } from './baseApi';
import { API_ENDPOINTS } from './endpoints';
import type { CampaignItem } from '@/types';

export interface DonationPayload {
  amount: number;
  campaign: string;
  donorName?: string;
  donorPhone: string;
  paymentMethod: 'bkash' | 'nagad' | 'bank' | 'card';
  transactionId: string;
  isAnonymous: boolean;
}
export interface DonationResponse { receiptNo: string; amount: number; date: string; campaign: string; }

type BackendCampaign = {
  id: string; slug: string; title: string; description: string; category?: string; targetAmount: string | number;
  raisedAmount?: string | number; endDate?: string; status: string; bannerImageUrl?: string;
};
type CampaignResult = BackendCampaign[] | { items: BackendCampaign[] };
const mapCampaign = (campaign: BackendCampaign): CampaignItem => ({
  id: campaign.id,
  titleBn: campaign.title,
  titleEn: campaign.title,
  targetAmount: Number(campaign.targetAmount),
  raisedAmount: Number(campaign.raisedAmount || 0),
  deadlineBn: campaign.endDate || '',
  deadlineEn: campaign.endDate || '',
  donorsCount: 0,
  descriptionBn: campaign.description,
  descriptionEn: campaign.description,
  status: campaign.status.toLowerCase() === 'active' ? 'ongoing' : campaign.status.toLowerCase() === 'completed' ? 'completed' : 'upcoming',
  category: campaign.category || '',
  imageUrl: campaign.bannerImageUrl,
});

export const campaignsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCampaigns: builder.query<CampaignItem[], void>({
      query: () => ({ url: API_ENDPOINTS.campaigns.list, params: { page: 1, limit: 100 } }),
      transformResponse: (result: CampaignResult) => (Array.isArray(result) ? result : result.items).map(mapCampaign),
      providesTags: [{ type: 'Campaigns', id: 'LIST' }],
    }),
    getCampaignById: builder.query<any, string>({
      query: (id) => ({ url: API_ENDPOINTS.campaigns.detail(id) }),
      transformResponse: (res: any) => ({ ...mapCampaign(res), ...res }),
      providesTags: (_res, _err, id) => [{ type: 'Campaigns', id }],
    }),
    submitDonation: builder.mutation<DonationResponse, DonationPayload>({
      query: (form) => ({
        url: API_ENDPOINTS.campaigns.donate,
        method: 'POST',
        data: {
          amount: Number(form.amount), donorName: form.isAnonymous ? undefined : form.donorName,
          donorPhone: form.donorPhone.replace(/[ ()-]/g, ''), isAnonymous: form.isAnonymous,
          paymentMethod: ({ bkash: 'BKASH', nagad: 'NAGAD', bank: 'BANK_TRANSFER', card: 'OTHER' } as const)[form.paymentMethod],
          transactionReference: form.transactionId || undefined,
          // The API accepts campaignId (UUID); a UI slug/name cannot be safely converted.
        },
      }),
      transformResponse: (result: { id?: string; amount: number; createdAt?: string; receipt?: { receiptNumber?: string; receiptNo?: string } }) => ({
        receiptNo: result.receipt?.receiptNumber || result.receipt?.receiptNo || result.id || '',
        amount: Number(result.amount), date: result.createdAt || '', campaign: '',
      }),
      invalidatesTags: [{ type: 'Campaigns', id: 'LIST' }],
    }),
    createCampaign: builder.mutation<any, { title: string; description: string; targetAmount: number; startDate?: string; endDate?: string; category?: string; bannerImageUrl?: string; status?: string }>({
      query: (data) => ({
        url: API_ENDPOINTS.campaigns.list,
        method: 'POST',
        data: {
          ...data,
          startDate: data.startDate || new Date().toISOString(),
          status: data.status || 'ACTIVE',
        },
      }),
      invalidatesTags: [{ type: 'Campaigns', id: 'LIST' }],
    }),
  }),
});

export const { useGetCampaignsQuery, useGetCampaignByIdQuery, useSubmitDonationMutation, useCreateCampaignMutation } = campaignsApi;
