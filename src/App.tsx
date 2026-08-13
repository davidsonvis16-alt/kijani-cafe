import React from 'react';
import { BrowserRouter, Routes, Route, useOutletContext } from 'react-router-dom';
import { MenuItem, CartItem } from './types';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import StoryPage from './pages/StoryPage';
import ExperiencePage from './pages/ExperiencePage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import { ReservationProvider, useReservation } from './contexts/ReservationContext';

type OutletContext = {
  cartItems: { item: MenuItem; quantity: number }[];
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (itemId: string, delta: number) => void;
};

function MenuPageWrapper() {
  const { cartItems, onAddToCart, onUpdateQuantity } = useOutletContext<OutletContext>();
  return (
    <MenuPage
      cartItems={cartItems}
      onAddToCart={onAddToCart}
      onUpdateQuantity={onUpdateQuantity}
    />
  );
}

function StoryPageWrapper() {
  const { openReservation } = useReservation();
  return <StoryPage onOpenReservation={openReservation} />;
}

function ExperiencePageWrapper() {
  const { openReservation } = useReservation();
  return <ExperiencePage onOpenReservation={openReservation} />;
}

function ContactPageWrapper() {
  const { openReservation } = useReservation();
  return <ContactPage onOpenReservation={openReservation} />;
}

export default function App() {
  return (
    <ReservationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="menu" element={<MenuPageWrapper />} />
            <Route path="story" element={<StoryPageWrapper />} />
            <Route path="experience" element={<ExperiencePageWrapper />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="contact" element={<ContactPageWrapper />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ReservationProvider>
  );
}
