import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ReservationContextValue {
  isReservationOpen: boolean;
  openReservation: () => void;
  closeReservation: () => void;
}

const ReservationContext = createContext<ReservationContextValue | undefined>(undefined);

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  const openReservation = () => setIsReservationOpen(true);
  const closeReservation = () => setIsReservationOpen(false);

  return (
    <ReservationContext.Provider value={{ isReservationOpen, openReservation, closeReservation }}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error('useReservation must be used within ReservationProvider');
  }
  return context;
}
