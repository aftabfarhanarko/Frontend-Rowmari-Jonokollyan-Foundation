import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/lib/axios';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: '' }),
  tagTypes: [
    'Activities',
    'Campaigns',
    'News',
    'Applications',
    'BloodDonors',
    'BloodRequests',
    'Volunteers',
  ],
  endpoints: () => ({}),
});
