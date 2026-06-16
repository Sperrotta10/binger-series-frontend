import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { AuthLayout } from '../../layouts/AuthLayout';
import { registerSchema, AuthService, setAuthToken } from '@binger/shared';
import { AuthInputField } from './components/AuthInputField';
import { AuthStrengthMeter } from './components/AuthStrengthMeter';
import { AuthFieldHint } from './components/AuthFieldHint';
import { AuthServerError } from './components/AuthServerError';
import { AuthSubmitButton } from './components/AuthSubmitButton';
import { useAuth } from '../../contexts/AuthContext';

// Extend base schema locally to add confirmPassword
const extendedRegisterSchema = registerSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof extendedRegisterSchema>;

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { setUser } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(extendedRegisterSchema),
    mode: 'onChange',
  });

  const watchedPw = useWatch({ control, name: 'password', defaultValue: '' });
  const watchedUsername = useWatch({ control, name: 'username', defaultValue: '' });

  const onSubmit = async (data: RegisterFormData) => {
    setServerError(null);
    try {
      const res = await AuthService.register({
        fullName: data.fullName,
        username: data.username,
        email: data.email,
        password: data.password,
      });
      setAuthToken(res.data.tokens.accessToken);
      setUser(res.data.user);
      navigate('/dashboard');
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string; code?: string } } };
      const code = axiosErr?.response?.data?.code;
      if (code === 'USERNAME_TAKEN') {
        setServerError('This username is already taken. Please choose another one.');
      } else if (code === 'ACCOUNT_EXISTS') {
        setServerError('An account with this email already exists. Try signing in instead.');
      } else {
        setServerError(axiosErr?.response?.data?.message ?? 'Registration failed. Please try again.');
      }
    }
  };

  return (
    <AuthLayout>
      {/* Header */}
      <div className="mb-7">
        <h2
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 700,
            fontSize: '1.65rem',
            letterSpacing: '-0.02em',
            color: '#ffffff',
            marginBottom: 5,
          }}
        >
          Join the collection
        </h2>
        <p style={{ fontSize: '0.88rem', color: '#bec7d6' }}>
          Your cinematic journey, logged and curated.
        </p>
      </div>

      <AuthServerError message={serverError} />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
        {/* Full Name */}
        <AuthInputField
          id="fullName"
          label="Full Name"
          placeholder="Jane Doe"
          error={errors.fullName?.message}
          registration={register('fullName')}
        />

        {/* Username */}
        <AuthInputField
          id="username"
          label="Username"
          placeholder="Choose a unique username"
          error={errors.username?.message}
          hint={
            watchedUsername.length >= 2 && (
              <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5">
                <AuthFieldHint ok={watchedUsername.length >= 3} text="3+ chars" />
                <AuthFieldHint ok={/^[a-z0-9_]+$/.test(watchedUsername)} text="a-z, 0-9, _" />
                <AuthFieldHint ok={watchedUsername.length <= 30} text="≤30 chars" />
              </div>
            )
          }
          registration={register('username')}
        />

        {/* Email */}
        <AuthInputField
          id="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          registration={register('email')}
        />

        {/* Password */}
        <AuthInputField
          id="password"
          label="Password"
          type={showPw ? 'text' : 'password'}
          placeholder="Min. 8 characters"
          error={errors.password?.message}
          hint={
            <div className="flex flex-col gap-1 mt-0.5">
              <AuthStrengthMeter password={watchedPw} />
              {watchedPw.length > 0 && (
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
                  <AuthFieldHint ok={watchedPw.length >= 8} text="8+ chars" />
                  <AuthFieldHint ok={/[A-Z]/.test(watchedPw)} text="1 uppercase" />
                  <AuthFieldHint ok={/[a-z]/.test(watchedPw)} text="1 lowercase" />
                  <AuthFieldHint ok={/[0-9]/.test(watchedPw)} text="1 number" />
                </div>
              )}
            </div>
          }
          registration={register('password')}
          rightSlot={
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              aria-label={showPw ? 'Hide password' : 'Show password'}
              style={{ color: '#bec7d6', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}
            >
              {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          }
        />

        {/* Confirm Password */}
        <AuthInputField
          id="confirmPassword"
          label="Confirm Password"
          type={showConfirm ? 'text' : 'password'}
          placeholder="Repeat your password"
          error={errors.confirmPassword?.message}
          registration={register('confirmPassword')}
          rightSlot={
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              aria-label={showConfirm ? 'Hide password' : 'Show password'}
              style={{ color: '#bec7d6', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}
            >
              {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          }
        />

        {/* Terms */}
        <p style={{ fontSize: '0.75rem', color: '#bec7d6', lineHeight: 1.5 }}>
          By continuing you agree to our{' '}
          <a href="#" style={{ color: '#00fbfb', textDecoration: 'none' }}>Terms of Service</a>
          {' '}and{' '}
          <a href="#" style={{ color: '#00fbfb', textDecoration: 'none' }}>Privacy Policy</a>.
        </p>

        {/* CTA */}
        <AuthSubmitButton
          id="register-submit-btn"
          isSubmitting={isSubmitting}
          text="Create Account"
          loadingText="Creating account…"
          icon={<UserPlus size={16} />}
          marginTop={2}
        />
      </form>

      {/* Login link */}
      <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#bec7d6', marginTop: 20 }}>
        Already have an account?{' '}
        <Link
          to="/auth/login"
          style={{ color: '#dcb8ff', fontWeight: 600, textDecoration: 'none' }}
          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default RegisterPage;
