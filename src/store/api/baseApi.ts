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
    'Volunteers',
    'Donations',
    'Expenses',
    'MedicalCamps',
    'Reports',
    'Users',
    'Notifications',
    'MyRecords',
    'AccessControl',
    'AuditLogs',
    'Pages',
    'Settings',
    'Media',
    'Roumari',
  ],
  endpoints: () => ({}),
});
