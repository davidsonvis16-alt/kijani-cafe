import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { FeaturedFood } from '../components/FeaturedFood';
import { FinalCTA } from '../components/FinalCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedFood />
      <FinalCTA />
    </>
  );
}
