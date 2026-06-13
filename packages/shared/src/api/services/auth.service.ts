import { z } from 'zod';
import { apiClient } from '../client';
import {
  registerSchema,
  loginSchema,
  oauthGoogleSchema,
  refreshSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updateProfileSchema,
} from '../schemas/auth.schema';
import {
  AuthResponse,
  RefreshResponse,
  GenericMessageResponse,
  ProfileResponse,
} from '../types/auth.types';

export const AuthService = {
  register: async (payload: z.infer<typeof registerSchema>): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>('/api/v1/auth/register', payload);
    return data;
  },

  login: async (payload: z.infer<typeof loginSchema>): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>('/api/v1/auth/login', payload);
    return data;
  },

  oauthGoogle: async (payload: z.infer<typeof oauthGoogleSchema>): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>('/api/v1/auth/oauth/google', payload);
    return data;
  },

  refresh: async (payload: z.infer<typeof refreshSchema>): Promise<RefreshResponse> => {
    const { data } = await apiClient.post<RefreshResponse>('/api/v1/auth/refresh', payload);
    return data;
  },

  forgotPassword: async (payload: z.infer<typeof forgotPasswordSchema>): Promise<GenericMessageResponse> => {
    const { data } = await apiClient.post<GenericMessageResponse>('/api/v1/auth/forgot-password', payload);
    return data;
  },

  resetPassword: async (payload: z.infer<typeof resetPasswordSchema>): Promise<GenericMessageResponse> => {
    const { data } = await apiClient.post<GenericMessageResponse>('/api/v1/auth/reset-password', payload);
    return data;
  },

  logout: async (): Promise<GenericMessageResponse> => {
    const { data } = await apiClient.post<GenericMessageResponse>('/api/v1/auth/logout');
    return data;
  },

  getProfile: async (): Promise<ProfileResponse> => {
    const { data } = await apiClient.get<ProfileResponse>('/api/v1/auth/profile/me');
    return data;
  },

  updateProfile: async (payload: z.infer<typeof updateProfileSchema>): Promise<ProfileResponse> => {
    const { data } = await apiClient.patch<ProfileResponse>('/api/v1/auth/profile/update', payload);
    return data;
  },
};
