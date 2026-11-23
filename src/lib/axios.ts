import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';

// 1. Configured Axios Instance for standalone & interceptor usage
export const apiClient = axios.create({
  baseURL: typeof window !== 'undefined' ? '/api' : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor (Logging, Auth / Session token injection)
apiClient.interceptors.request.use(
  (config) => {
    // Inject headers or client-side context if available
    if (typeof window !== 'undefined') {
      config.headers['X-Client-Timestamp'] = new Date().toISOString();
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (Error standardization & response parsing)
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const formattedError = {
      status: error.response?.status || 500,
      message: (error.response?.data as { message?: string })?.message || error.message || 'An unexpected error occurred',
      data: error.response?.data || null,
    };
    return Promise.reject(formattedError);
  }
);

// 2. Custom Axios BaseQuery for RTK Query
// Connects RTK Query's caching, polling, deduplication and invalidation directly to Axios!
export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method = 'GET', data, params, headers }) => {
    try {
      const result = await apiClient({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default apiClient;
