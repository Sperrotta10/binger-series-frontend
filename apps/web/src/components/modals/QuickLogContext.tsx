import React, { createContext, useContext, useState, ReactNode } from 'react';

export type QuickLogEntity = {
  type: 'series' | 'season' | 'episode';
  seriesId: string;
  seasonId?: string;
  episodeId?: string;
  title: string;
  subtitle?: string;
  posterUrl?: string;
};

interface QuickLogContextType {
  isOpen: boolean;
  entity: QuickLogEntity | null;
  openModal: (entity: QuickLogEntity) => void;
  closeModal: () => void;
}

const QuickLogContext = createContext<QuickLogContextType | undefined>(undefined);

export const QuickLogProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [entity, setEntity] = useState<QuickLogEntity | null>(null);

  const openModal = (newEntity: QuickLogEntity) => {
    setEntity(newEntity);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setEntity(null), 300); // Wait for transition before clearing
  };

  return (
    <QuickLogContext.Provider value={{ isOpen, entity, openModal, closeModal }}>
      {children}
    </QuickLogContext.Provider>
  );
};

export const useQuickLog = () => {
  const context = useContext(QuickLogContext);
  if (context === undefined) {
    throw new Error('useQuickLog must be used within a QuickLogProvider');
  }
  return context;
};
