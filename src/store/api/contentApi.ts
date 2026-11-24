import { baseApi } from './baseApi';
import { API_ENDPOINTS } from './endpoints';

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  caption?: string;
  date?: string;
  createdAt: string;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  message: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  actionUrl?: string;
  actionText?: string;
  expiresAt?: string;
  createdAt: string;
}

export interface NewsEventItem {
  id: string;
  slug: string;
  title: string;
  type: 'NEWS' | 'EVENT';
  summary?: string;
  content: string;
  imageUrl?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  createdAt: string;
}

export const contentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGallery: builder.query<GalleryItem[] | { items: GalleryItem[] }, { category?: string } | void>({
      query: (params) => ({
        url: API_ENDPOINTS.content.gallery,
        params: params || { page: 1, limit: 100 },
      }),
      providesTags: ['Gallery'],
    }),

    getAnnouncements: builder.query<AnnouncementItem[], void>({
      query: () => ({ url: API_ENDPOINTS.content.announcements }),
      providesTags: ['Announcements'],
    }),

    getNewsEvents: builder.query<NewsEventItem[] | { items: NewsEventItem[] }, { type?: string } | void>({
      query: (params) => ({
        url: API_ENDPOINTS.content.newsEvents,
        params: params || { page: 1, limit: 50 },
      }),
      providesTags: ['News'],
    }),

    createNewsEvent: builder.mutation<NewsEventItem, Partial<NewsEventItem>>({
      query: (data) => ({
        url: API_ENDPOINTS.content.adminNewsEvents,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['News'],
    }),

    createGalleryItem: builder.mutation<GalleryItem, Partial<GalleryItem>>({
      query: (data) => ({
        url: API_ENDPOINTS.content.adminGallery,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Gallery'],
    }),

    createAnnouncement: builder.mutation<AnnouncementItem, Partial<AnnouncementItem>>({
      query: (data) => ({
        url: API_ENDPOINTS.content.adminAnnouncements,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Announcements'],
    }),
  }),
});

export const {
  useGetGalleryQuery,
  useGetAnnouncementsQuery,
  useGetNewsEventsQuery,
  useCreateNewsEventMutation,
  useCreateGalleryItemMutation,
  useCreateAnnouncementMutation,
} = contentApi;
