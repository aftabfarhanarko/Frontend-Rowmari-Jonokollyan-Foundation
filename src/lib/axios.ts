import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';

const configuredOrigin = process.env.NEXT_PUBLIC_API_URL?.trim().replace(/\/$/, '');
export const API_BASE_URL = `${configuredOrigin || 'https://api-rowmari-jonokollyan-foundation.onrender.com'}/api/v1`;

let accessToken: string | null = null;
export const setAccessToken = (token: string | null) => {
  accessToken = token;
  if (typeof document !== 'undefined' && token) {
    document.cookie = `rjf_session=1; path=/; max-age=604800; SameSite=Lax`;
  }
};

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  meta?: Record<string, unknown>;
}

export interface ApiError {
  status: number | string;
  message: string;
  data?: unknown;
}

export function unwrapApiResponse<T>(response: T | ApiEnvelope<T>): T {
  if (response && typeof response === 'object' && 'success' in response && 'data' in response) {
    return (response as ApiEnvelope<T>).data;
  }
  return response as T;
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  withCredentials: true,
  headers: { Accept: 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  // Let the browser set the multipart boundary for FormData requests.
  if (typeof FormData !== 'undefined' && config.data instanceof FormData) {
    config.headers.delete('Content-Type');
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ message?: string }>) => {
    const originalRequest = error.config as (AxiosRequestConfig & { _retry?: boolean }) | undefined;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/login') &&
      !originalRequest.url?.includes('/auth/register') &&
      !originalRequest.url?.includes('/auth/refresh')
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshRes = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        const data = refreshRes.data?.data || refreshRes.data;
        const newAccessToken = data?.accessToken;

        if (newAccessToken) {
          setAccessToken(newAccessToken);
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }
          processQueue(null, newAccessToken);
          return apiClient(originalRequest);
        }
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        setAccessToken(null);
        if (typeof document !== 'undefined') {
          document.cookie = 'rjf_session=; path=/; max-age=0';
          document.cookie = 'rjf_auth_role=; path=/; max-age=0';
        }
        return Promise.reject({
          status: 401,
          message: 'সেশনের মেয়াদ শেষ হয়েছে। পুনরায় লগইন করুন।',
          data: null,
        });
      } finally {
        isRefreshing = false;
      }
    }

    const normalized: ApiError = {
      status: error.response?.status ?? 'NETWORK_ERROR',
      message: error.response?.data?.message || error.message || 'The request failed. Please try again.',
      data: error.response?.data,
    };
    return Promise.reject(normalized);
  },
);

export const axiosBaseQuery =
  ({ baseUrl = '' }: { baseUrl?: string } = {}): BaseQueryFn<
    { url: string; method?: AxiosRequestConfig['method']; data?: AxiosRequestConfig['data']; params?: AxiosRequestConfig['params']; headers?: AxiosRequestConfig['headers']; signal?: AbortSignal; timeout?: number },
    unknown,
    ApiError
  > =>
  async ({ url, method = 'GET', data, params, headers, signal, timeout }) => {
    try {
      const response = await apiClient({ url: `${baseUrl}${url}`, method, data, params, headers, signal, timeout });
      return { data: unwrapApiResponse(response.data) };
    } catch (error) {
      if (error && typeof error === 'object' && 'status' in error && 'message' in error) {
        return { error: error as ApiError };
      }
      return { error: { status: 'UNKNOWN_ERROR', message: 'The request failed. Please try again.', data: error } };
    }
  };

export default apiClient;
