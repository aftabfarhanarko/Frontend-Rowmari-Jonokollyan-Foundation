import { baseApi } from './baseApi';
import { ActivityItem } from '@/types';
import { API_ENDPOINTS } from './endpoints';

type BackendActivity = {
  id: string;
  title: string;
  summary?: string;
  content?: string;
  description?: string;
  category?: string;
  location?: string;
  beneficiariesCount?: number;
  coverImageUrl?: string | null;
  imageUrl?: string | null;
  activityDate?: string;
  isPublished?: boolean;
  createdAt: string;
};

type ActivityResult = BackendActivity[] | { items?: BackendActivity[]; data?: BackendActivity[] };

function inferCategory(item: BackendActivity): ActivityItem['category'] {
  if (item.category) {
    const c = item.category.toLowerCase();
    if (c === 'winter' || c === 'medical' || c === 'education' || c === 'emergency' || c === 'food') {
      return c;
    }
  }
  const text = `${item.title || ''} ${item.summary || ''} ${item.content || ''}`.toLowerCase();
  if (/শীত|কম্বল|winter|blanket/.test(text)) return 'winter';
  if (/মেডিকেল|স্বাস্থ্য|চিকিৎসা|medical|health|camp|eye/.test(text)) return 'medical';
  if (/শিক্ষা|বৃত্তি|স্কুল|education|school|scholarship/.test(text)) return 'education';
  if (/খাদ্য|চাল|ডাল|খাবার|food|ration/.test(text)) return 'food';
  return 'emergency';
}

export const activitiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getActivities: builder.query<ActivityItem[], { category?: string } | void>({
      query: (params) => ({
        url: API_ENDPOINTS.activities.list,
        method: 'GET',
        params: params || undefined,
      }),
      transformResponse: (response: ActivityResult): ActivityItem[] => {
        const list = Array.isArray(response)
          ? response
          : Array.isArray(response?.items)
          ? response.items
          : Array.isArray(response?.data)
          ? response.data
          : [];

        return list.map((item) => {
          const cat = inferCategory(item);
          const desc = item.summary || item.description || item.content || '';
          const date = item.activityDate || item.createdAt;
          const img = item.coverImageUrl || item.imageUrl || undefined;
          return {
            id: item.id,
            category: cat,
            titleBn: item.title,
            titleEn: item.title,
            categoryBn: cat,
            categoryEn: cat,
            dateBn: date,
            dateEn: date,
            descriptionBn: desc,
            descriptionEn: desc,
            locationBn: item.location || '',
            locationEn: item.location || '',
            beneficiariesCount: item.beneficiariesCount || 0,
            imageUrl: img,
          };
        });
      },
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
    createActivity: builder.mutation<
      any,
      {
        title: string;
        summary: string;
        content: string;
        location: string;
        activityDate: string;
        coverImageUrl?: string;
        beneficiariesCount?: number;
        isPublished?: boolean;
      }
    >({
      query: (data) => ({
        url: API_ENDPOINTS.activities.list,
        method: 'POST',
        data: {
          ...data,
          isPublished: data.isPublished !== undefined ? data.isPublished : true,
        },
      }),
      invalidatesTags: [{ type: 'Activities', id: 'LIST' }, 'Activities', 'Reports'],
    }),
  }),
});

export const { useGetActivitiesQuery, useGetActivityByIdQuery, useCreateActivityMutation } = activitiesApi;
