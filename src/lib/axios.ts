import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';

const configuredOrigin = process.env.NEXT_PUBLIC_API_URL?.trim().replace(/\/$/, '');
export const API_BASE_URL = `${configuredOrigin || 'https://api-rowmari-jonokollyan-foundation.onrender.com'}/api/v1`;

let accessToken: string | null = null;
export const setAccessToken = (token: string | null) => {
  accessToken = token;
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
  (error: AxiosError<{ message?: string }>) => {
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
    { url: string; method?: AxiosRequestConfig['method']; data?: AxiosRequestConfig['data']; params?: AxiosRequestConfig['params']; headers?: AxiosRequestConfig['headers']; signal?: AbortSignal },
    unknown,
    ApiError
  > =>
  async ({ url, method = 'GET', data, params, headers, signal }) => {
    try {
      const response = await apiClient({ url: `${baseUrl}${url}`, method, data, params, headers, signal });
      return { data: unwrapApiResponse(response.data) };
    } catch (error) {
      if (error && typeof error === 'object' && 'status' in error && 'message' in error) {
        return { error: error as ApiError };
      }
      return { error: { status: 'UNKNOWN_ERROR', message: 'The request failed. Please try again.', data: error } };
    }
  };

export default apiClient;
