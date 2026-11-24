import { baseApi } from './baseApi';
import { API_ENDPOINTS } from './endpoints';
import { setAccessToken } from '@/lib/axios';

export interface AuthUser { id: string; fullName: string; email: string; phone: string; roles: Array<{ name: string } | string> }
export interface AuthSession { accessToken: string; tokenType: 'Bearer'; expiresIn: number; user: AuthUser }

export interface RegisterPayload {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  district?: string;
  upazila?: string;
  address?: string;
  bloodGroup?: string;
  consentToDonateBlood?: boolean;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthSession, { email: string; password: string }>({
      query: (credentials) => ({ url: API_ENDPOINTS.auth.login, method: 'POST', data: credentials }),
      async onQueryStarted(_credentials, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          setAccessToken(data.accessToken);
          if (typeof document !== 'undefined') {
            const roleName = data.user.roles?.[0]
              ? (typeof data.user.roles[0] === 'object' ? (data.user.roles[0] as any).name : data.user.roles[0])
              : 'COMMUNITY_MEMBER';
            document.cookie = `rjf_auth_role=${roleName}; path=/; max-age=604800; SameSite=Lax`;
            document.cookie = `rjf_session=1; path=/; max-age=604800; SameSite=Lax`;
          }
        } catch {
          setAccessToken(null);
        }
      },
    }),
    registerUser: builder.mutation<AuthSession, RegisterPayload>({
      query: (data) => ({ url: API_ENDPOINTS.auth.register, method: 'POST', data }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          setAccessToken(data.accessToken);
          if (typeof document !== 'undefined') {
            const roleName = data.user.roles?.[0]
              ? (typeof data.user.roles[0] === 'object' ? (data.user.roles[0] as any).name : data.user.roles[0])
              : 'COMMUNITY_MEMBER';
            document.cookie = `rjf_auth_role=${roleName}; path=/; max-age=604800; SameSite=Lax`;
            document.cookie = `rjf_session=1; path=/; max-age=604800; SameSite=Lax`;
          }
        } catch {
          setAccessToken(null);
        }
      },
    }),
    refreshSession: builder.mutation<AuthSession, void>({
      query: () => ({ url: API_ENDPOINTS.auth.refresh, method: 'POST' }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          setAccessToken(data.accessToken);
          if (typeof document !== 'undefined') {
            const roleName = data.user.roles?.[0]
              ? (typeof data.user.roles[0] === 'object' ? (data.user.roles[0] as any).name : data.user.roles[0])
              : 'COMMUNITY_MEMBER';
            document.cookie = `rjf_auth_role=${roleName}; path=/; max-age=604800; SameSite=Lax`;
            document.cookie = `rjf_session=1; path=/; max-age=604800; SameSite=Lax`;
          }
        } catch {
          setAccessToken(null);
        }
      },
    }),
    getCurrentUser: builder.query<AuthUser, void>({ query: () => ({ url: API_ENDPOINTS.auth.me }) }),
    logout: builder.mutation<unknown, void>({
      query: () => ({ url: API_ENDPOINTS.auth.logout, method: 'POST' }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          setAccessToken(null);
          if (typeof document !== 'undefined') {
            document.cookie = 'rjf_auth_role=; path=/; max-age=0; SameSite=Lax';
            document.cookie = 'rjf_session=; path=/; max-age=0; SameSite=Lax';
          }
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterUserMutation,
  useRefreshSessionMutation,
  useGetCurrentUserQuery,
  useLogoutMutation,
} = authApi;
