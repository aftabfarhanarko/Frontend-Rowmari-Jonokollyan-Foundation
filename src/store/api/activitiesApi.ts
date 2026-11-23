import { baseApi } from './baseApi';
import { ActivityItem } from '@/types';

export const activitiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getActivities: builder.query<ActivityItem[], { category?: string } | void>({
      query: (params) => ({
        url: '/activities',
        method: 'GET',
        params: params || undefined,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Activities' as const, id })),
              { type: 'Activities', id: 'LIST' },
            ]
          : [{ type: 'Activities', id: 'LIST' }],
    }),
    getActivityById: builder.query<ActivityItem, string>({
      query: (id) => ({
        url: `/activities/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'Activities', id }],
    }),
  }),
});

export const { useGetActivitiesQuery, useGetActivityByIdQuery } = activitiesApi;
