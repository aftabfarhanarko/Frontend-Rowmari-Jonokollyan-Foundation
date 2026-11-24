import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/lib/axios';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: '' }),
  tagTypes: [
    'Activities',
    'Campaigns',
    'News',
    'Gallery',
    'Announcements',
    'Applications',
    'BloodDonors',
    'BloodRequests',
    'Volunteers',
    'Donations',
    'Expenses',
    'MedicalCamps',
    'Reports',
    'Users',
    'Notifications',
    'MyRecords',
  ],
  endpoints: () => ({}),
});
