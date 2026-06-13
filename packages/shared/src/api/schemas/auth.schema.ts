import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const oauthGoogleSchema = z.object({
  idToken: z.string(),
});

export const refreshSchema = z.object({
  refreshToken: z.string(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  token: z.string(),
  newPassword: z.string().min(8),
});

export const updateProfileSchema = z.object({
  username: z.string().regex(/^[a-z0-9_]+$/).max(15).optional(),
  name: z.string().min(1).optional(),
  biography: z.string().max(160).optional(),
  avatar_url: z.string().url().optional(),
});
