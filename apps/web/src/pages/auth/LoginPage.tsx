import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { AuthLayout } from '../../layouts/AuthLayout';
import { loginSchema, AuthService, setAuthToken } from '@binger/shared';
import { AuthInputField } from './components/AuthInputField';
import { AuthServerError } from './components/AuthServerError';
import { AuthSubmitButton } from './components/AuthSubmitButton';
import { useAuth } from '../../contexts/AuthContext';

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);
    try {
      const res = await AuthService.login(data);
      setAuthToken(res.data.tokens.accessToken);
      setUser(res.data.user);
      navigate('/dashboard');
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setServerError(
        axiosErr?.response?.data?.message ?? 'Invalid credentials. Please try again.'
      );
    }
  };

  return (
    <AuthLayout>
      {/* Header */}
      <div className="mb-8">
        <h2
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 700,
            fontSize: '1.75rem',
            letterSpacing: '-0.02em',
            color: '#ffffff',
            marginBottom: 6,
          }}
        >
          Sign In
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#bec7d6' }}>
          Your cinematic universe awaits.
        </p>
      </div>

      {/* Server error banner */}
      <AuthServerError message={serverError} />

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
        <AuthInputField
          id="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          registration={register('email')}
        />

        <AuthInputField
          id="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          error={errors.password?.message}
          registration={register('password')}
          rightSlot={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              style={{ color: '#bec7d6', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          }
        />

        {/* Forgot password */}
        <div className="flex justify-end -mt-2">
          <Link
            to="/auth/forgot-password"
            style={{ fontSize: '0.8rem', color: '#00fbfb', textDecoration: 'none', fontWeight: 500 }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
          >
            Forgot password?
          </Link>
        </div>

        {/* CTA */}
        <AuthSubmitButton
          id="login-submit-btn"
          isSubmitting={isSubmitting}
          text="Sign In"
          loadingText="Authenticating…"
          icon={<LogIn size={16} />}
          marginTop={4}
        />
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-6">
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
        <span style={{ fontSize: '0.75rem', color: '#343439' }}>or</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
      </div>

      {/* Register link */}
      <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#bec7d6' }}>
        Don&apos;t have an account?{' '}
        <Link
          to="/auth/register"
          style={{ color: '#dcb8ff', fontWeight: 600, textDecoration: 'none' }}
          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
        >
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
