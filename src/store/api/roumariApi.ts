import { baseApi } from './baseApi';
import { API_ENDPOINTS } from './endpoints';

export interface RoumariDirectoryItem {
  id: string;
  name: string;
  category: string;
  phoneNumber: string;
  altPhoneNumber: string | null;
  address: string;
  mapUrl: string | null;
  description: string | null;
  imageUrl: string | null;
  openingHours: string | null;
  isEmergency: boolean;
  status: string;
  displayOrder: number;
  createdAt: string;
}

export interface RoumariTouristPlaceItem {
  id: string;
  name: string;
  slug: string;
  featuredImage: string;
  galleryImages: string[];
  description: string;
  address: string;
  mapUrl: string | null;
  travelGuide: string | null;
  bestTimeToVisit: string | null;
  status: string;
  createdAt: string;
}

export interface RoumariNewsItem {
  id: string;
  headline: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  contentImages: string[];
  author: string;
  status: string;
  isBreaking: boolean;
  isFeatured: boolean;
  viewCount: number;
  publishedAt: string;
  createdAt: string;
}

export interface RoumariOverviewData {
  emergencyContacts: RoumariDirectoryItem[];
  latestNews: RoumariNewsItem[];
  touristPlaces: RoumariTouristPlaceItem[];
  directoryStats: Array<{ category: string; count: string }>;
}

export const roumariApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoumariOverview: builder.query<RoumariOverviewData, void>({
      query: () => ({ url: API_ENDPOINTS.roumari.overview }),
      providesTags: ['Roumari'],
    }),

    getEmergencyContacts: builder.query<RoumariDirectoryItem[], void>({
      query: () => ({ url: API_ENDPOINTS.roumari.emergencyContacts }),
      providesTags: ['Roumari'],
    }),

    getRoumariDirectories: builder.query<RoumariDirectoryItem[], { category?: string; search?: string } | void>({
      query: (params) => ({
        url: API_ENDPOINTS.roumari.directory,
        params: params || {},
      }),
      providesTags: ['Roumari'],
    }),

    getRoumariTouristPlaces: builder.query<RoumariTouristPlaceItem[], void>({
      query: () => ({ url: API_ENDPOINTS.roumari.touristPlaces }),
      providesTags: ['Roumari'],
    }),

    getRoumariTouristPlaceBySlug: builder.query<RoumariTouristPlaceItem, string>({
      query: (slug) => ({ url: API_ENDPOINTS.roumari.touristPlaceBySlug(slug) }),
      providesTags: ['Roumari'],
    }),

    getRoumariNews: builder.query<{ items: RoumariNewsItem[]; total: number; page: number; limit: number }, { category?: string; search?: string; page?: number; limit?: number } | void>({
      query: (params) => ({
        url: API_ENDPOINTS.roumari.news,
        params: params || {},
      }),
      providesTags: ['Roumari'],
    }),

    getRoumariNewsBySlug: builder.query<RoumariNewsItem, string>({
      query: (slug) => ({ url: API_ENDPOINTS.roumari.newsBySlug(slug) }),
      providesTags: ['Roumari'],
    }),

    // Admin CRUD
    createRoumariDirectory: builder.mutation<RoumariDirectoryItem, Partial<RoumariDirectoryItem>>({
      query: (data) => ({ url: API_ENDPOINTS.roumari.adminDirectory, method: 'POST', data }),
      invalidatesTags: ['Roumari'],
    }),
    updateRoumariDirectory: builder.mutation<RoumariDirectoryItem, { id: string; data: Partial<RoumariDirectoryItem> }>({
      query: ({ id, data }) => ({ url: API_ENDPOINTS.roumari.adminDirectoryById(id), method: 'PUT', data }),
      invalidatesTags: ['Roumari'],
    }),
    deleteRoumariDirectory: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({ url: API_ENDPOINTS.roumari.adminDirectoryById(id), method: 'DELETE' }),
      invalidatesTags: ['Roumari'],
    }),

    createRoumariTouristPlace: builder.mutation<RoumariTouristPlaceItem, Partial<RoumariTouristPlaceItem>>({
      query: (data) => ({ url: API_ENDPOINTS.roumari.adminTouristPlaces, method: 'POST', data }),
      invalidatesTags: ['Roumari'],
    }),
    updateRoumariTouristPlace: builder.mutation<RoumariTouristPlaceItem, { id: string; data: Partial<RoumariTouristPlaceItem> }>({
      query: ({ id, data }) => ({ url: API_ENDPOINTS.roumari.adminTouristPlaceById(id), method: 'PUT', data }),
      invalidatesTags: ['Roumari'],
    }),
    deleteRoumariTouristPlace: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({ url: API_ENDPOINTS.roumari.adminTouristPlaceById(id), method: 'DELETE' }),
      invalidatesTags: ['Roumari'],
    }),

    createRoumariNews: builder.mutation<RoumariNewsItem, Partial<RoumariNewsItem>>({
      query: (data) => ({ url: API_ENDPOINTS.roumari.adminNews, method: 'POST', data }),
      invalidatesTags: ['Roumari'],
    }),
    updateRoumariNews: builder.mutation<RoumariNewsItem, { id: string; data: Partial<RoumariNewsItem> }>({
      query: ({ id, data }) => ({ url: API_ENDPOINTS.roumari.adminNewsById(id), method: 'PUT', data }),
      invalidatesTags: ['Roumari'],
    }),
    deleteRoumariNews: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({ url: API_ENDPOINTS.roumari.adminNewsById(id), method: 'DELETE' }),
      invalidatesTags: ['Roumari'],
    }),
  }),
});

export const {
  useGetRoumariOverviewQuery,
  useGetEmergencyContactsQuery,
  useGetRoumariDirectoriesQuery,
  useGetRoumariTouristPlacesQuery,
  useGetRoumariTouristPlaceBySlugQuery,
  useGetRoumariNewsQuery,
  useGetRoumariNewsBySlugQuery,
  useCreateRoumariDirectoryMutation,
  useUpdateRoumariDirectoryMutation,
  useDeleteRoumariDirectoryMutation,
  useCreateRoumariTouristPlaceMutation,
  useUpdateRoumariTouristPlaceMutation,
  useDeleteRoumariTouristPlaceMutation,
  useCreateRoumariNewsMutation,
  useUpdateRoumariNewsMutation,
  useDeleteRoumariNewsMutation,
} = roumariApi;
