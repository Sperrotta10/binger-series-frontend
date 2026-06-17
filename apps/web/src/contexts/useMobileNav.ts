import { useContext } from 'react';
import { MobileNavContext } from './MobileNavCtx';

export function useMobileNav() {
  const ctx = useContext(MobileNavContext);
  if (!ctx) throw new Error('useMobileNav must be used within MobileNavProvider');
  return ctx;
}
