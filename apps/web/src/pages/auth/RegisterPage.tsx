import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, UserPlus, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { AuthLayout } from '../../layouts/AuthLayout';
import { registerSchema, AuthService, setAuthToken } from '@binger/shared';

// Extend base schema locally to add confirmPassword + username
const extendedRegisterSchema = registerSchema
  .extend({
    username: z
      .string()
      .min(3, 'At least 3 characters')
      .max(15, 'Max 15 characters')
      .regex(/^[a-z0-9_]+$/, 'Lowercase, numbers and _ only'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof extendedRegisterSchema>;

// ─── Password Strength Meter ───────────────────────────────────────────────────
const getStrength = (pw: string): { level: number; label: string; color: string } => {
  if (!pw) return { level: 0, label: '', color: 'transparent' };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const map = [
    { level: 0, label: '', color: 'transparent' },
    { level: 1, label: 'Weak', color: '#ffb4ab' },
    { level: 2, label: 'Fair', color: '#f5c842' },
    { level: 3, label: 'Good', color: '#00fbfb' },
    { level: 4, label: 'Strong', color: '#dcb8ff' },
  ];
  return map[score];
};

const StrengthMeter = ({ password }: { password: string }) => {
  const { level, label, color } = getStrength(password);
  if (!password) return null;
  return (
    <div className="flex flex-col gap-1 mt-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 3,
              borderRadius: 2,
              background: i <= level ? color : 'rgba(255,255,255,0.08)',
              transition: 'background 0.3s',
            }}
          />
        ))}
      </div>
      {label && (
        <p style={{ fontSize: '0.72rem', color, fontWeight: 500 }}>
          Strength: {label}
        </p>
      )}
    </div>
  );
};

// ─── Validation hint ──────────────────────────────────────────────────────────
const FieldHint = ({ ok, text }: { ok: boolean; text: string }) => (
  <span
    className="flex items-center gap-1.5"
    style={{ fontSize: '0.72rem', color: ok ? '#00fbfb' : '#bec7d6' }}
  >
    {ok ? <CheckCircle2 size={11} /> : <XCircle size={11} />}
    {text}
  </span>
);

// ─── Input Field ──────────────────────────────────────────────────────────────
interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  error?: string;
  hint?: React.ReactNode;
  rightSlot?: React.ReactNode;
  registration: React.InputHTMLAttributes<HTMLInputElement>;
}

const InputField = ({ id, label, type = 'text', placeholder, error, hint, rightSlot, registration }: InputFieldProps) => (
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
    {error && <p style={{ fontSize: '0.78rem', color: '#ffb4ab', marginTop: 2 }}>{error}</p>}
    {hint && !error && hint}
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
export const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(extendedRegisterSchema),
    mode: 'onChange',
  });

  const watchedPw = watch('password', '');
  const watchedUsername = watch('username', '');

  const onSubmit = async (data: RegisterFormData) => {
    setServerError(null);
    try {
      // Send only the fields the API expects
      const res = await AuthService.register({
        email: data.email,
        password: data.password,
        name: data.name,
      });
      setAuthToken(res.data.tokens.accessToken);
      navigate('/dashboard');
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setServerError(axiosErr?.response?.data?.message ?? 'Registration failed. Please try again.');
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

      {serverError && (
        <div
          className="flex items-start gap-2 rounded-lg p-3 mb-5"
          style={{ background: 'rgba(147,0,10,0.25)', border: '1px solid rgba(255,180,171,0.3)' }}
          role="alert"
        >
          <svg className="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#ffb4ab" strokeWidth="2" />
            <path d="M12 8v5M12 16h.01" stroke="#ffb4ab" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <p style={{ fontSize: '0.84rem', color: '#ffb4ab' }}>{serverError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
        {/* Full name */}
        <InputField
          id="name"
          label="Full Name"
          placeholder="Jane Doe"
          error={errors.name?.message}
          registration={register('name')}
        />

        {/* Username */}
        <InputField
          id="username"
          label="Username"
          placeholder="jane_cinephile"
          error={errors.username?.message}
          hint={
            watchedUsername.length >= 2 && (
              <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5">
                <FieldHint ok={watchedUsername.length >= 3} text="3+ chars" />
                <FieldHint ok={/^[a-z0-9_]+$/.test(watchedUsername)} text="a-z, 0-9, _" />
                <FieldHint ok={watchedUsername.length <= 15} text="≤15 chars" />
              </div>
            )
          }
          registration={register('username')}
        />

        {/* Email */}
        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          registration={register('email')}
        />

        {/* Password */}
        <InputField
          id="password"
          label="Password"
          type={showPw ? 'text' : 'password'}
          placeholder="Min. 8 characters"
          error={errors.password?.message}
          hint={<StrengthMeter password={watchedPw} />}
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
        <InputField
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
        <button
          id="register-submit-btn"
          type="submit"
          disabled={isSubmitting}
          style={{
            marginTop: 2,
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
            transition: 'opacity 0.2s',
            boxShadow: isSubmitting ? 'none' : '0 0 24px rgba(220,184,255,0.3)',
          }}
          onMouseEnter={(e) => { if (!isSubmitting) e.currentTarget.style.opacity = '0.88'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
        >
          {isSubmitting ? (
            <><Loader2 size={16} className="animate-spin" /> Creating account…</>
          ) : (
            <><UserPlus size={16} /> Create Account</>
          )}
        </button>
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
