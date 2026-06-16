import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, LogIn, Loader2 } from 'lucide-react';
import { AuthLayout } from '../../layouts/AuthLayout';
import { loginSchema, AuthService, setAuthToken } from '@binger/shared';

type LoginFormData = z.infer<typeof loginSchema>;

// ─── Sub-components ───────────────────────────────────────────────────────────

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  error?: string;
  rightSlot?: React.ReactNode;
  registration: React.InputHTMLAttributes<HTMLInputElement>;
}

const InputField = ({ id, label, type = 'text', placeholder, error, rightSlot, registration }: InputFieldProps) => (
  <div className="flex flex-col gap-1.5">
    <label
      htmlFor={id}
      style={{ fontSize: '0.8rem', fontWeight: 600, color: '#bec7d6', letterSpacing: '0.04em', textTransform: 'uppercase' }}
    >
      {label}
    </label>
    <div className="relative">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={id}
        style={{
          width: '100%',
          background: '#0d0e12',
          border: `1px solid ${error ? '#ffb4ab' : 'rgba(255,255,255,0.08)'}`,
          borderRadius: 8,
          padding: rightSlot ? '12px 44px 12px 16px' : '12px 16px',
          fontSize: '0.95rem',
          color: '#ffffff',
          outline: 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s',
          fontFamily: "'Hanken Grotesk', sans-serif",
          boxSizing: 'border-box',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = '#dcb8ff';
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(220,184,255,0.15)';
        }}
        {...registration}
        onBlur={(e) => {
          registration.onBlur(e);
          e.currentTarget.style.borderColor = error ? '#ffb4ab' : 'rgba(255,255,255,0.08)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      />
      {rightSlot && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">{rightSlot}</div>
      )}
    </div>
    {error && (
      <p style={{ fontSize: '0.78rem', color: '#ffb4ab', marginTop: 2 }}>{error}</p>
    )}
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

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
      {serverError && (
        <div
          className="flex items-start gap-2 rounded-lg p-3 mb-6"
          style={{
            background: 'rgba(147,0,10,0.25)',
            border: '1px solid rgba(255,180,171,0.3)',
          }}
          role="alert"
        >
          <svg className="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#ffb4ab" strokeWidth="2" />
            <path d="M12 8v5M12 16h.01" stroke="#ffb4ab" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <p style={{ fontSize: '0.84rem', color: '#ffb4ab' }}>{serverError}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          registration={register('email')}
        />

        <InputField
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
        <button
          id="login-submit-btn"
          type="submit"
          disabled={isSubmitting}
          style={{
            marginTop: 4,
            width: '100%',
            padding: '13px 0',
            borderRadius: 8,
            border: 'none',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            background: isSubmitting
              ? 'rgba(138,43,226,0.4)'
              : 'linear-gradient(135deg, #8a2be2 0%, #dcb8ff 100%)',
            color: '#ffffff',
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            fontSize: '0.95rem',
            letterSpacing: '0.01em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            transition: 'opacity 0.2s, transform 0.1s',
            boxShadow: isSubmitting ? 'none' : '0 0 24px rgba(220,184,255,0.3)',
          }}
          onMouseEnter={(e) => { if (!isSubmitting) e.currentTarget.style.opacity = '0.88'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
          onMouseDown={(e) => { if (!isSubmitting) e.currentTarget.style.transform = 'scale(0.98)'; }}
          onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Authenticating…
            </>
          ) : (
            <>
              <LogIn size={16} />
              Sign In
            </>
          )}
        </button>
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
