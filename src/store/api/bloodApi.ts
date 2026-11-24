import { baseApi } from './baseApi';
import { API_ENDPOINTS } from './endpoints';

export interface BloodDonor {
  id: string;
  fullName: string;
  phone: string;
  bloodGroup: string;
  district?: string;
  upazila?: string;
  address?: string;
  lastDonationDate?: string;
  isAvailable: boolean;
  totalDonationsCount: number;
  isVerified?: boolean;
}

export interface BloodRequestItem {
  id: string;
  patientName: string;
  bloodGroup: string;
  unitsNeeded: number;
  unitsFulfilled: number;
  urgency: string;
  requiredDate: string;
  hospitalName: string;
  hospitalAddress?: string;
  district: string;
  upazila: string;
  contactPerson: string;
  contactPhone: string;
  medicalReason?: string;
  status: string;
  createdAt: string;
  matches?: Array<{
    id: string;
    donorProfileId: string;
    status: string;
    donorProfile?: {
      fullName: string;
      phone: string;
      bloodGroup: string;
      upazila: string;
    };
  }>;
}

export const bloodApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBloodRequests: builder.query<
      BloodRequestItem[] | { items: BloodRequestItem[] },
      { status?: string; bloodGroup?: string; district?: string; page?: number; limit?: number } | void
    >({
      query: (params) => ({
        url: API_ENDPOINTS.bloodRequests.list,
        params: params || { page: 1, limit: 50 },
      }),
      providesTags: ['BloodRequests'],
    }),

    getBloodRequestById: builder.query<BloodRequestItem, string>({
      query: (id) => ({
        url: API_ENDPOINTS.bloodRequests.detail(id),
      }),
      providesTags: (_res, _err, id) => [{ type: 'BloodRequests', id }],
    }),

    searchBloodDonors: builder.query<
      BloodDonor[] | { items: BloodDonor[] },
      { bloodGroup?: string; district?: string; upazila?: string; page?: number; limit?: number } | void
    >({
      query: (params) => ({
        url: API_ENDPOINTS.donors.search,
        params: params || { page: 1, limit: 50 },
      }),
      providesTags: ['BloodDonors'],
    }),

    getAdminBloodDonors: builder.query<
      BloodDonor[] | { items: BloodDonor[] },
      { isAvailable?: boolean; bloodGroup?: string; page?: number; limit?: number } | void
    >({
      query: (params) => ({
        url: API_ENDPOINTS.donors.admin,
        params: params || { page: 1, limit: 50 },
      }),
      providesTags: ['BloodDonors'],
    }),

    matchBloodDonor: builder.mutation<unknown, { requestId: string; donorProfileId: string; notes?: string }>({
      query: ({ requestId, ...data }) => ({
        url: API_ENDPOINTS.bloodRequests.match(requestId),
        method: 'POST',
        data,
      }),
      invalidatesTags: ['BloodRequests', 'BloodDonors'],
    }),

    updateMatchStatus: builder.mutation<unknown, { matchId: string; status: string; notes?: string }>({
      query: ({ matchId, ...data }) => ({
        url: API_ENDPOINTS.bloodRequests.updateMatch(matchId),
        method: 'PATCH',
        data,
      }),
      invalidatesTags: ['BloodRequests'],
    }),
  }),
});

export const {
  useGetBloodRequestsQuery,
  useGetBloodRequestByIdQuery,
  useSearchBloodDonorsQuery,
  useGetAdminBloodDonorsQuery,
  useMatchBloodDonorMutation,
  useUpdateMatchStatusMutation,
} = bloodApi;
