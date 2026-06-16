import React from 'react';
import { Loader2 } from 'lucide-react';

interface AuthSubmitButtonProps {
  id: string;
  isSubmitting: boolean;
  text: string;
  loadingText: string;
  icon: React.ReactNode;
  marginTop?: number | string;
}

export const AuthSubmitButton = ({
  id,
  isSubmitting,
  text,
  loadingText,
  icon,
  marginTop,
}: AuthSubmitButtonProps) => {
  return (
    <button
      id={id}
      type="submit"
      disabled={isSubmitting}
      style={{
        marginTop: marginTop !== undefined ? marginTop : 0,
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
      onMouseEnter={(e) => {
        if (!isSubmitting) e.currentTarget.style.opacity = '0.88';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '1';
      }}
      onMouseDown={(e) => {
        if (!isSubmitting) e.currentTarget.style.transform = 'scale(0.98)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {isSubmitting ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          {loadingText}
        </>
      ) : (
        <>
          {icon}
          {text}
        </>
      )}
    </button>
  );
};
