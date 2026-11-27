import { baseApi } from './baseApi';
import { ActivityItem } from '@/types';
import { API_ENDPOINTS } from './endpoints';

type BackendActivity = { id: string; title: string; description: string; category: string; location?: string; beneficiariesCount?: number; imageUrl?: string; createdAt: string };
type ActivityResult = BackendActivity[] | { items: BackendActivity[] };

export const activitiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getActivities: builder.query<ActivityItem[], { category?: string } | void>({
      query: (params) => ({
        url: API_ENDPOINTS.activities.list,
        method: 'GET',
        params: params || undefined,
      }),
      transformResponse: (response: ActivityResult): ActivityItem[] => (Array.isArray(response) ? response : response.items).map((item) => ({
        id: item.id, category: item.category.toLowerCase() as ActivityItem['category'], titleBn: item.title, titleEn: item.title,
        categoryBn: item.category, categoryEn: item.category, dateBn: item.createdAt, dateEn: item.createdAt,
        descriptionBn: item.description, descriptionEn: item.description, locationBn: item.location || '', locationEn: item.location || '',
        beneficiariesCount: item.beneficiariesCount || 0, imageUrl: item.imageUrl,
      })),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Activities' as const, id })),
              { type: 'Activities', id: 'LIST' },
            ]
          : [{ type: 'Activities', id: 'LIST' }],
    }),
    getActivityById: builder.query<any, string>({
      query: (id) => ({
        url: `${API_ENDPOINTS.activities.list}/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'Activities', id }],
    }),
    createActivity: builder.mutation<any, { title: string; summary: string; content: string; location: string; activityDate: string; coverImageUrl?: string; beneficiariesCount?: number; isPublished?: boolean }>({
      query: (data) => ({
        url: API_ENDPOINTS.activities.list,
        method: 'POST',
        data: {
          ...data,
          isPublished: data.isPublished !== undefined ? data.isPublished : true,
        },
      }),
      invalidatesTags: [{ type: 'Activities', id: 'LIST' }],
    }),
  }),
});

export const { useGetActivitiesQuery, useGetActivityByIdQuery, useCreateActivityMutation } = activitiesApi;
