import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Send } from 'lucide-react';
import { AuthLayout } from '../../layouts/AuthLayout';
import { forgotPasswordSchema, AuthService } from '@binger/shared';
import { AuthInputField } from './components/AuthInputField';
import { AuthServerError } from './components/AuthServerError';
import { AuthSubmitButton } from './components/AuthSubmitButton';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordPage = () => {
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
      MySwal.fire({
        icon: 'success',
        title: 'Check your email',
        text: "We've sent password reset instructions to the email address associated with your account.",
        background: '#0d0e12',
        color: '#ffffff',
        confirmButtonColor: '#8a2be2',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'rounded-2xl border border-[rgba(255,255,255,0.08)]',
        }
      });
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
      <AuthServerError message={serverError} />

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
        <AuthInputField
          id="email"
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          registration={register('email')}
        />

        {/* CTA */}
        <AuthSubmitButton
          id="forgot-password-submit-btn"
          isSubmitting={isSubmitting}
          text="Send Reset Link"
          loadingText="Sending Link…"
          icon={<Send size={16} />}
        />
      </form>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
