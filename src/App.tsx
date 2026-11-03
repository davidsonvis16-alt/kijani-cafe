import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderPage from './pages/OrderPage';
import AccountPage from './pages/AccountPage';
import DealsPage from './pages/DealsPage';
import StoryPage from './pages/StoryPage';
import ExperiencePage from './pages/ExperiencePage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import { ReservationProvider, useReservation } from './contexts/ReservationContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { OrdersProvider } from './contexts/OrdersContext';
import { UIProvider } from './contexts/UIContext';

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
    <AuthProvider>
      <OrdersProvider>
        <CartProvider>
          <UIProvider>
            <ReservationProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="menu" element={<MenuPage />} />
                    <Route path="checkout" element={<CheckoutPage />} />
                    <Route path="order/:id" element={<OrderPage />} />
                    <Route path="account" element={<AccountPage />} />
                    <Route path="deals" element={<DealsPage />} />
                    <Route path="story" element={<StoryPageWrapper />} />
                    <Route path="experience" element={<ExperiencePageWrapper />} />
                    <Route path="gallery" element={<GalleryPage />} />
                    <Route path="contact" element={<ContactPageWrapper />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </ReservationProvider>
          </UIProvider>
        </CartProvider>
      </OrdersProvider>
    </AuthProvider>
  );
}
