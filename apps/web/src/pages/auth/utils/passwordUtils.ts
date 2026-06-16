export const getStrength = (pw: string): { level: number; label: string; color: string } => {
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
