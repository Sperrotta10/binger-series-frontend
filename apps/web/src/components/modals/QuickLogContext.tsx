import React, { createContext, useContext, useState, type ReactNode } from 'react';

export type QuickLogEntity = {
  type: 'series' | 'season' | 'episode';
  seriesId: string;
  seasonId?: string;
  seasonNumber?: number;
  episodeId?: string;
  episodeNumber?: number;
  title: string;
  subtitle?: string;
  posterUrl?: string;
  mode?: 'create' | 'edit';
  logId?: string;
  initialRating?: number;
  initialReview?: string;
  initialRewatch?: boolean;
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
