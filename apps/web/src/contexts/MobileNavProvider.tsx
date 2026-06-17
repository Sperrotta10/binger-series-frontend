import { useState } from 'react';
import type { ReactNode } from 'react';
import { MobileNavContext } from './MobileNavCtx';

export function MobileNavProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MobileNavContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        toggle: () => setIsOpen((v) => !v),
      }}
    >
      {children}
    </MobileNavContext.Provider>
  );
}
