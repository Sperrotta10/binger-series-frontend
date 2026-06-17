
interface AuthInputFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  error?: string;
  hint?: React.ReactNode;
  rightSlot?: React.ReactNode;
  registration: React.InputHTMLAttributes<HTMLInputElement>;
}

export const AuthInputField = ({
  id,
  label,
  type = 'text',
  placeholder,
  error,
  hint,
  rightSlot,
  registration,
}: AuthInputFieldProps) => (
  <div className="flex flex-col gap-1.5">
    <label
      htmlFor={id}
      style={{
        fontSize: '0.8rem',
        fontWeight: 600,
        color: '#bec7d6',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
      }}
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
          registration.onBlur?.(e as React.FocusEvent<HTMLInputElement>);
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
