interface AuthServerErrorProps {
  message: string | null;
}

export const AuthServerError = ({ message }: AuthServerErrorProps) => {
  if (!message) return null;

  return (
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
      <p style={{ fontSize: '0.84rem', color: '#ffb4ab' }}>{message}</p>
    </div>
  );
};
