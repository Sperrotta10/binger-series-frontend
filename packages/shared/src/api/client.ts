import axios from 'axios';
import { env } from '../config/env';

const AUTH_TOKEN_KEY = 'binger_access_token';

let currentAuthToken: string | null = null;
let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: string) => void; reject: (err: unknown) => void }> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token as string);
    }
  });
  failedQueue = [];
};

const isAuthBypassEndpoint = (url?: string) => {
  if (!url) return false;
  return (
    url.includes('/auth/refresh') ||
    url.includes('/auth/login') ||
    url.includes('/auth/register') ||
    url.includes('/auth/oauth/')
  );
};

export const setAuthToken = (token: string | null) => {
  currentAuthToken = token;
  if (typeof window !== 'undefined') {
    if (token) {
      sessionStorage.setItem(AUTH_TOKEN_KEY, token);
    } else {
      sessionStorage.removeItem(AUTH_TOKEN_KEY);
    }
  }
};

export const restoreAuthToken = (): string | null => {
  if (currentAuthToken) return currentAuthToken;

  if (typeof window !== 'undefined') {
    const stored = sessionStorage.getItem(AUTH_TOKEN_KEY);
    if (stored) {
      currentAuthToken = stored;
      return stored;
    }
  }

  return null;
};

export const hasAuthToken = () => !!currentAuthToken;
export const getAuthToken = () => currentAuthToken;

export const apiClient = axios.create({
  baseURL: env.API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    if (currentAuthToken) {
      config.headers.Authorization = `Bearer ${currentAuthToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isAuthBypassEndpoint(originalRequest.url)
    ) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await apiClient.post('/api/v1/auth/refresh', {});
        const newToken = data.data.tokens.accessToken as string;
        setAuthToken(newToken);
        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        setAuthToken(null);
        window.dispatchEvent(new Event('auth:unauthorized'));
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
