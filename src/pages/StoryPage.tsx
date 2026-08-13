import React from 'react';
import { StorySection } from '../components/StorySection';
import { GardenExperience } from '../components/GardenExperience';
import { LifestyleSection } from '../components/LifestyleSection';

interface StoryPageProps {
  onOpenReservation: () => void;
}

export default function StoryPage({ onOpenReservation }: StoryPageProps) {
  return (
    <div className="pt-8">
      <StorySection onOpenReservation={onOpenReservation} />
      <GardenExperience />
      <LifestyleSection onOpenReservation={onOpenReservation} />
    </div>
  );
}
