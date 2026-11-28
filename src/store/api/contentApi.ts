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

export interface NoticeModalItem {
  id: string;
  headerTitle: string;
  badge: string;
  title: string;
  description: string;
  hotline: string;
  address: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
  imageUrl?: string | null;
  isActive: boolean;
  startDate?: string | null;
  endDate?: string | null;
  displayFrequency: string;
  createdAt: string;
  updatedAt: string;
}

export interface HeroSlideItem {
  id: string;
  titleBn: string;
  titleEn?: string | null;
  subtitleBn: string;
  subtitleEn?: string | null;
  badgeBn?: string | null;
  badgeEn?: string | null;
  categoryBn?: string | null;
  categoryEn?: string | null;
  imageUrl: string;
  btnPrimaryBn: string;
  btnPrimaryEn: string;
  btnPrimaryLink: string;
  btnSecondaryBn: string;
  btnSecondaryEn: string;
  btnSecondaryLink: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FooterConfigItem {
  id: string;
  aboutSummaryBn: string;
  aboutSummaryEn?: string | null;
  addressBn: string;
  addressEn?: string | null;
  hotline: string;
  phonePrimary: string;
  phoneSecondary?: string | null;
  emergencyHotline?: string | null;
  emailPrimary: string;
  emailSupport?: string | null;
  registrationNoBn?: string | null;
  registrationNoEn?: string | null;
  facebookPageUrl?: string | null;
  facebookGroupUrl?: string | null;
  youtubeUrl?: string | null;
  linkedinUrl?: string | null;
  copyrightTextBn: string;
  copyrightTextEn?: string | null;
  quickLinks?: Array<{ href: string; bn: string; en: string }> | null;
  createdAt: string;
  updatedAt: string;
}

export const contentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getActiveModal: builder.query<NoticeModalItem | null, void>({
      query: () => ({ url: API_ENDPOINTS.content.activeModal }),
      providesTags: ['Modals'],
    }),

    getHeroSlides: builder.query<HeroSlideItem[], void>({
      query: () => ({ url: API_ENDPOINTS.content.heroSlides }),
      providesTags: ['HeroSlides'],
    }),

    getFooterConfig: builder.query<FooterConfigItem, void>({
      query: () => ({ url: API_ENDPOINTS.content.footer }),
      providesTags: ['FooterConfig'],
    }),

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
      invalidatesTags: ['News', 'Reports'],
    }),

    updateNewsEvent: builder.mutation<NewsEventItem, { id: string; data: Partial<NewsEventItem> }>({
      query: ({ id, data }) => ({
        url: API_ENDPOINTS.admin.newsEventById(id),
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['News', 'Reports'],
    }),

    deleteNewsEvent: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: API_ENDPOINTS.admin.newsEventById(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['News', 'Reports'],
    }),

    createGalleryItem: builder.mutation<GalleryItem, Partial<GalleryItem>>({
      query: (data) => ({
        url: API_ENDPOINTS.content.adminGallery,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Gallery', 'Reports'],
    }),

    updateGalleryItem: builder.mutation<GalleryItem, { id: string; data: Partial<GalleryItem> }>({
      query: ({ id, data }) => ({
        url: API_ENDPOINTS.admin.galleryById(id),
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['Gallery', 'Reports'],
    }),

    deleteGalleryItem: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: API_ENDPOINTS.admin.galleryById(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Gallery', 'Reports'],
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
  useGetActiveModalQuery,
  useGetHeroSlidesQuery,
  useGetFooterConfigQuery,
  useGetGalleryQuery,
  useGetAnnouncementsQuery,
  useGetNewsEventsQuery,
  useCreateNewsEventMutation,
  useUpdateNewsEventMutation,
  useDeleteNewsEventMutation,
  useCreateGalleryItemMutation,
  useUpdateGalleryItemMutation,
  useDeleteGalleryItemMutation,
  useCreateAnnouncementMutation,
} = contentApi;
