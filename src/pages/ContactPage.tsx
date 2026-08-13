import React from 'react';
import { LocationSection } from '../components/LocationSection';

interface ContactPageProps {
  onOpenReservation: () => void;
}

export default function ContactPage({ onOpenReservation }: ContactPageProps) {
  return (
    <div className="pt-8">
      <LocationSection onOpenReservation={onOpenReservation} />
    </div>
  );
}
