import { createContext } from 'react';

export interface MobileNavContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const MobileNavContext = createContext<MobileNavContextType | undefined>(undefined);
