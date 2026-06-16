import { z } from 'zod';

export const registerSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').max(50),
  username: z
    .string()
    .min(3, 'At least 3 characters')
    .max(30, 'Max 30 characters')
    .regex(/^[a-z0-9_]+$/, 'Lowercase, numbers and _ only'),
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
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
  username: z.string().min(3).max(30).regex(/^[a-z0-9_]+$/).optional(),
  fullName: z.string().min(1).max(50).optional(),
  biography: z.string().max(160).optional(),
  avatar_url: z.string().url().optional(),
});
