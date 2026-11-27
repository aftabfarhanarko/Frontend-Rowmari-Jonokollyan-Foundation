import { baseApi } from './baseApi';
import { API_ENDPOINTS } from './endpoints';
import { NoticeModalItem, HeroSlideItem, FooterConfigItem, NewsEventItem, GalleryItem } from './contentApi';

export interface CMSPage {
  id: string;
  title: string;
  slug: string;
  subtitle?: string | null;
  description?: string | null;
  content: string;
  bannerImageUrl?: string | null;
  sections?: any[] | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  displayOrder: number;
  isSystemPage: boolean;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  createdAt: string;
  updatedAt: string;
}

export interface AdminDashboardOverview {
  users: {
    total: number;
    active: number;
    inactive: number;
    recent: Array<{ id: string; fullName: string; email: string; phone: string; status: string; createdAt: string }>;
  };
  cms: {
    totalPages: number;
    publishedPages: number;
    draftPages: number;
    totalNews: number;
    totalGallery: number;
  };
  operations: {
    totalCampaigns: number;
    totalApplications: number;
    totalBloodRequests?: number;
    totalContactMessages: number;
    totalDonations: number;
    totalDonationsAmount: number;
  };
  recentActivityLogs: Array<{
    id: string;
    action: string;
    actorName?: string;
    entityType: string;
    createdAt: string;
    route?: string;
  }>;
}

export interface AdminUserItem {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  district: string;
  upazila: string;
  address?: string | null;
  status: 'ACTIVE' | 'PENDING' | 'SUSPENDED';
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  createdAt: string;
  roles: Array<{ name: string } | string>;
}

export interface AdminUserDetailItem {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  district: string;
  upazila: string;
  address?: string | null;
  status: 'ACTIVE' | 'PENDING' | 'SUSPENDED';
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  avatarUrl?: string | null;
  registrationIp?: string | null;
  lastLoginIp?: string | null;
  lastLoginAt?: string | null;
  createdAt: string;
  updatedAt: string;
  roles: Array<{
    id?: string;
    name: string;
    description?: string;
    permissions?: Array<{ id: string; name: string; resource: string; action: string }>;
  } | string>;
  stats?: {
    applicationCount?: number;
  };
  recentApplications?: Array<{
    id: string;
    referenceCode: string;
    title: string;
    category: string;
    status: string;
    requestedAmount?: number;
    createdAt: string;
  }>;
  recentAuditLogs?: Array<{
    id: string;
    action: string;
    entityType: string;
    ipAddress?: string;
    createdAt: string;
  }>;
}

export interface CreateAdminUserPayload {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  roles?: string[];
  district?: string;
  upazila?: string;
  address?: string;
}

export interface ContactMessageItem {
  id: string;
  name: string;
  contactInfo: string;
  message: string;
  createdAt: string;
}

export interface MediaItem {
  id: string;
  originalName: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  url: string;
  category: string;
  createdAt: string;
}

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Dashboard Overview
    getAdminDashboard: builder.query<AdminDashboardOverview, void>({
      query: () => ({ url: API_ENDPOINTS.admin.dashboard }),
      providesTags: ['Reports'],
    }),

    // 2. CMS Pages
    getAdminPages: builder.query<{ items: CMSPage[]; total: number }, { page?: number; limit?: number } | void>({
      query: (params) => ({
        url: API_ENDPOINTS.admin.pages,
        params: params || { page: 1, limit: 100 },
      }),
      providesTags: ['Pages'],
    }),

    getAdminPageById: builder.query<CMSPage, string>({
      query: (id) => ({ url: API_ENDPOINTS.admin.pageById(id) }),
      providesTags: (_result, _error, id) => [{ type: 'Pages', id }],
    }),

    createPage: builder.mutation<CMSPage, Partial<CMSPage>>({
      query: (data) => ({
        url: API_ENDPOINTS.admin.pages,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Pages'],
    }),

    updatePage: builder.mutation<CMSPage, { id: string; data: Partial<CMSPage> }>({
      query: ({ id, data }) => ({
        url: API_ENDPOINTS.admin.pageById(id),
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['Pages'],
    }),

    deletePage: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: API_ENDPOINTS.admin.pageById(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Pages'],
    }),

    // 3. Public CMS Reads
    getPublicPage: builder.query<CMSPage, string>({
      query: (slug) => ({ url: API_ENDPOINTS.content.page(slug) }),
      providesTags: (_result, _error, slug) => [{ type: 'Pages', id: slug }],
    }),

    getPublicPages: builder.query<{ items: CMSPage[] }, void>({
      query: () => ({ url: API_ENDPOINTS.content.pages }),
      providesTags: ['Pages'],
    }),

    getPublicSettings: builder.query<Record<string, any>, void>({
      query: () => ({ url: API_ENDPOINTS.content.settings }),
      providesTags: ['Settings'],
    }),

    // 4. Admin Settings
    getAdminSettings: builder.query<Record<string, any>, void>({
      query: () => ({ url: API_ENDPOINTS.admin.settings }),
      providesTags: ['Settings'],
    }),

    updateAdminSettings: builder.mutation<Record<string, any>, { settings: Array<{ key: string; value: any; group?: string; description?: string }> }>({
      query: (data) => ({
        url: API_ENDPOINTS.admin.settings,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['Settings'],
    }),

    // 5. User Management
    getSuperAdminUsers: builder.query<{ items: AdminUserItem[]; total: number }, { page?: number; limit?: number; q?: string; status?: string } | void>({
      query: (params) => ({
        url: API_ENDPOINTS.admin.users,
        params: params || { page: 1, limit: 50 },
      }),
      providesTags: ['Users'],
    }),

    getAdminUserById: builder.query<AdminUserDetailItem, string>({
      query: (id) => ({ url: API_ENDPOINTS.admin.userById(id) }),
      providesTags: (_result, _error, id) => [{ type: 'Users', id }],
    }),

    updateAdminUserStatus: builder.mutation<AdminUserItem, { id: string; status: 'ACTIVE' | 'SUSPENDED' }>({
      query: ({ id, status }) => ({
        url: API_ENDPOINTS.admin.userStatus(id),
        method: 'PATCH',
        data: { status },
      }),
      invalidatesTags: ['Users', 'Reports'],
    }),

    createAdminUser: builder.mutation<AdminUserItem, CreateAdminUserPayload>({
      query: (data) => ({
        url: API_ENDPOINTS.admin.users,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Users', 'Reports'],
    }),

    updateAdminUserRoles: builder.mutation<AdminUserItem, { id: string; roles: string[] }>({
      query: ({ id, roles }) => ({
        url: API_ENDPOINTS.admin.userRoles(id),
        method: 'PUT',
        data: { roles },
      }),
      invalidatesTags: ['Users', 'Reports'],
    }),

    deleteAdminUser: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: API_ENDPOINTS.admin.userById(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Users', 'Reports'],
    }),

    // 6. Contact Messages
    getAdminContactMessages: builder.query<{ items: ContactMessageItem[]; total: number }, { page?: number; limit?: number } | void>({
      query: (params) => ({
        url: API_ENDPOINTS.admin.contactMessages,
        params: params || { page: 1, limit: 50 },
      }),
      providesTags: ['Notifications'],
    }),

    getAdminContactMessageById: builder.query<any, string>({
      query: (id) => ({ url: API_ENDPOINTS.admin.contactMessageById(id) }),
      providesTags: (_res, _err, id) => [{ type: 'Notifications', id }],
    }),

    deleteAdminContactMessage: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: API_ENDPOINTS.admin.contactMessageById(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Notifications', 'Reports'],
    }),

    // 7. Media Library
    getAdminMedia: builder.query<{ items: MediaItem[]; total: number }, { page?: number; limit?: number; category?: string } | void>({
      query: (params) => ({
        url: API_ENDPOINTS.admin.media,
        params: params || { page: 1, limit: 100 },
      }),
      providesTags: ['Media'],
    }),

    getAdminGalleryById: builder.query<GalleryItem, string>({
      query: (id) => ({ url: API_ENDPOINTS.admin.galleryById(id) }),
      providesTags: (_res, _err, id) => [{ type: 'Media', id }],
    }),

    getAdminNewsEventById: builder.query<NewsEventItem, string>({
      query: (id) => ({ url: API_ENDPOINTS.admin.newsEventById(id) }),
      providesTags: (_res, _err, id) => [{ type: 'News', id }],
    }),

    deleteAdminMedia: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: API_ENDPOINTS.admin.mediaById(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Media'],
    }),

    // 8. Activity Logs
    getAdminActivityLogs: builder.query<{ items: any[]; total: number }, { page?: number; limit?: number } | void>({
      query: (params) => ({
        url: API_ENDPOINTS.admin.activityLogs,
        params: params || { page: 1, limit: 50 },
      }),
      providesTags: ['AuditLogs'],
    }),

    // 9. Emergency Notice Modals (Full CRUD)
    getAdminNoticeModals: builder.query<NoticeModalItem[], void>({
      query: () => ({ url: API_ENDPOINTS.admin.modals }),
      providesTags: ['Modals'],
    }),

    getAdminNoticeModalById: builder.query<NoticeModalItem, string>({
      query: (id) => ({ url: API_ENDPOINTS.admin.modalById(id) }),
      providesTags: ['Modals'],
    }),

    createAdminNoticeModal: builder.mutation<NoticeModalItem, Partial<NoticeModalItem>>({
      query: (data) => ({
        url: API_ENDPOINTS.admin.modals,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Modals'],
    }),

    updateAdminNoticeModal: builder.mutation<NoticeModalItem, { id: string; data: Partial<NoticeModalItem> }>({
      query: ({ id, data }) => ({
        url: API_ENDPOINTS.admin.modalById(id),
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['Modals'],
    }),

    toggleAdminNoticeModalStatus: builder.mutation<NoticeModalItem, string>({
      query: (id) => ({
        url: API_ENDPOINTS.admin.modalToggle(id),
        method: 'PATCH',
      }),
      invalidatesTags: ['Modals'],
    }),

    deleteAdminNoticeModal: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: API_ENDPOINTS.admin.modalById(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Modals'],
    }),

    // 10. Hero Slides (Full CRUD)
    getAdminHeroSlides: builder.query<HeroSlideItem[], void>({
      query: () => ({ url: API_ENDPOINTS.admin.heroSlides }),
      providesTags: ['HeroSlides'],
    }),

    getAdminHeroSlideById: builder.query<HeroSlideItem, string>({
      query: (id) => ({ url: API_ENDPOINTS.admin.heroSlideById(id) }),
      providesTags: ['HeroSlides'],
    }),

    createAdminHeroSlide: builder.mutation<HeroSlideItem, Partial<HeroSlideItem>>({
      query: (data) => ({
        url: API_ENDPOINTS.admin.heroSlides,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['HeroSlides'],
    }),

    updateAdminHeroSlide: builder.mutation<HeroSlideItem, { id: string; data: Partial<HeroSlideItem> }>({
      query: ({ id, data }) => ({
        url: API_ENDPOINTS.admin.heroSlideById(id),
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['HeroSlides'],
    }),

    toggleAdminHeroSlideStatus: builder.mutation<HeroSlideItem, string>({
      query: (id) => ({
        url: API_ENDPOINTS.admin.heroSlideToggle(id),
        method: 'PATCH',
      }),
      invalidatesTags: ['HeroSlides'],
    }),

    deleteAdminHeroSlide: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: API_ENDPOINTS.admin.heroSlideById(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['HeroSlides'],
    }),

    // 11. Footer Configuration (Full CRUD)
    getAdminFooterConfig: builder.query<FooterConfigItem, void>({
      query: () => ({ url: API_ENDPOINTS.admin.footer }),
      providesTags: ['FooterConfig'],
    }),

    updateAdminFooterConfig: builder.mutation<FooterConfigItem, Partial<FooterConfigItem>>({
      query: (data) => ({
        url: API_ENDPOINTS.admin.footer,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['FooterConfig'],
    }),
  }),
});

export const {
  useGetAdminDashboardQuery,
  useGetAdminPagesQuery,
  useGetAdminPageByIdQuery,
  useCreatePageMutation,
  useUpdatePageMutation,
  useDeletePageMutation,
  useGetPublicPageQuery,
  useGetPublicPagesQuery,
  useGetPublicSettingsQuery,
  useGetAdminSettingsQuery,
  useUpdateAdminSettingsMutation,
  useGetSuperAdminUsersQuery,
  useGetAdminUserByIdQuery,
  useUpdateAdminUserStatusMutation,
  useCreateAdminUserMutation,
  useUpdateAdminUserRolesMutation,
  useDeleteAdminUserMutation,
  useGetAdminContactMessagesQuery,
  useGetAdminContactMessageByIdQuery,
  useDeleteAdminContactMessageMutation,
  useGetAdminMediaQuery,
  useGetAdminGalleryByIdQuery,
  useGetAdminNewsEventByIdQuery,
  useDeleteAdminMediaMutation,
  useGetAdminActivityLogsQuery,
  useGetAdminNoticeModalsQuery,
  useGetAdminNoticeModalByIdQuery,
  useCreateAdminNoticeModalMutation,
  useUpdateAdminNoticeModalMutation,
  useToggleAdminNoticeModalStatusMutation,
  useDeleteAdminNoticeModalMutation,
  useGetAdminHeroSlidesQuery,
  useGetAdminHeroSlideByIdQuery,
  useCreateAdminHeroSlideMutation,
  useUpdateAdminHeroSlideMutation,
  useToggleAdminHeroSlideStatusMutation,
  useDeleteAdminHeroSlideMutation,
  useGetAdminFooterConfigQuery,
  useUpdateAdminFooterConfigMutation,
} = adminApi;
