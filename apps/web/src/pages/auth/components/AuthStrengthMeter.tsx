import { getStrength } from '../utils/passwordUtils';

interface StrengthMeterProps {
  password?: string;
}

export const AuthStrengthMeter = ({ password }: StrengthMeterProps) => {
  const { level, label, color } = getStrength(password || '');
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
