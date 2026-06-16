import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Loader2, Send, CheckCircle2 } from 'lucide-react';
import { AuthLayout } from '../../layouts/AuthLayout';
import { forgotPasswordSchema, AuthService } from '@binger/shared';

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordPage = () => {
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setServerError(null);
    try {
      await AuthService.forgotPassword(data);
      setSuccess(true);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setServerError(
        axiosErr?.response?.data?.message ?? 'Failed to send reset link. Please try again.'
      );
    }
  };

  return (
    <AuthLayout>
      {/* Back Link */}
      <Link
        to="/auth/login"
        className="flex items-center gap-1.5 w-fit mb-8"
        style={{ fontSize: '0.8rem', color: '#bec7d6', textDecoration: 'none', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', transition: 'color 0.2s, transform 0.2s' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#ffffff';
          e.currentTarget.style.transform = 'translateX(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#bec7d6';
          e.currentTarget.style.transform = 'translateX(0)';
        }}
      >
        <ArrowLeft size={14} /> Back to Login
      </Link>

      {!success ? (
        <>
          {/* Header */}
          <div className="mb-8">
            <h2
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 700,
                fontSize: '1.65rem',
                letterSpacing: '-0.02em',
                color: '#ffffff',
                marginBottom: 6,
              }}
            >
              Reset Password
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#bec7d6' }}>
              Enter your email address and we’ll send you a link to reset your password.
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
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                style={{ fontSize: '0.8rem', fontWeight: 600, color: '#bec7d6', letterSpacing: '0.04em', textTransform: 'uppercase' }}
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                style={{
                  width: '100%',
                  background: '#0d0e12',
                  border: `1px solid ${errors.email ? '#ffb4ab' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: 8,
                  padding: '12px 16px',
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
                {...register('email')}
                onBlur={(e) => {
                  register('email').onBlur(e);
                  e.currentTarget.style.borderColor = errors.email ? '#ffb4ab' : 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              {errors.email && (
                <p style={{ fontSize: '0.78rem', color: '#ffb4ab', marginTop: 2 }}>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* CTA */}
            <button
              id="forgot-password-submit-btn"
              type="submit"
              disabled={isSubmitting}
              style={{
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
                  Sending Link…
                </>
              ) : (
                <>
                  <Send size={16} />
                  Send Reset Link
                </>
              )}
            </button>
          </form>
        </>
      ) : (
        /* Success State */
        <div className="flex flex-col items-center justify-center text-center py-6 animate-in fade-in zoom-in duration-500">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
            style={{
              background: 'rgba(0,251,251,0.1)',
              border: '1px solid rgba(0,251,251,0.3)',
              boxShadow: '0 0 30px rgba(0,251,251,0.2)',
            }}
          >
            <CheckCircle2 size={32} color="#00fbfb" />
          </div>
          <h2
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 700,
              fontSize: '1.65rem',
              color: '#ffffff',
              marginBottom: 12,
            }}
          >
            Check your email
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#bec7d6', lineHeight: 1.5, marginBottom: 24, maxWidth: '85%' }}>
            We've sent password reset instructions to the email address associated with your account.
          </p>
          <button
            onClick={() => setSuccess(false)}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#ffffff',
              padding: '10px 24px',
              borderRadius: 6,
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            Try another email
          </button>
        </div>
      )}
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
