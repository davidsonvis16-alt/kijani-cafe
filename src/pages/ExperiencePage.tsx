import React from 'react';
import { ExperienceSection } from '../components/ExperienceSection';

interface ExperiencePageProps {
  onOpenReservation: () => void;
}

export default function ExperiencePage({ onOpenReservation }: ExperiencePageProps) {
  return (
    <div className="pt-8">
      <ExperienceSection onOpenReservation={onOpenReservation} />
    </div>
  );
}
