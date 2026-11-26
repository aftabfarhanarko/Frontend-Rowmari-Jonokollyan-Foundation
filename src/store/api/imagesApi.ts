import { baseApi } from './baseApi';
import { API_ENDPOINTS } from './endpoints';

export interface UploadImageResponse {
  url: string;
  displayUrl?: string;
  deleteUrl?: string;
  filename: string;
  mimeType: string;
  size: number;
}

export interface UploadAvatarResponse {
  message: string;
  avatarUrl: string;
  user: any;
}

export const imagesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Upload any general image to ImgBB via the backend API.
     * Returns permanent ImgBB URL to save in database.
     */
    uploadImage: builder.mutation<UploadImageResponse, FormData>({
      query: (formData) => ({
        url: API_ENDPOINTS.images.upload,
        method: 'POST',
        data: formData,
        timeout: 30000,
      }),
      invalidatesTags: ['Images'],
    }),

    /**
     * Upload user's profile picture to ImgBB and update the user's avatar_url in the database.
     */
    uploadAvatar: builder.mutation<UploadAvatarResponse, FormData>({
      query: (formData) => ({
        url: API_ENDPOINTS.users.avatar,
        method: 'POST',
        data: formData,
        timeout: 30000,
      }),
      invalidatesTags: ['Users', 'MyRecords'],
    }),
  }),
});

export const {
  useUploadImageMutation,
  useUploadAvatarMutation,
} = imagesApi;
