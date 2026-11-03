import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { MobileTabBar } from '../components/layout/MobileTabBar';
import { CartDrawer } from '../components/cart/CartDrawer';
import { ItemModal } from '../components/menu/ItemModal';
import { AuthModal } from '../components/auth/AuthModal';
import { Toasts } from '../components/Toasts';
import { TableReservationModal } from '../components/TableReservationModal';
import { useReservation } from '../contexts/ReservationContext';

export default function Layout() {
  const { isReservationOpen, closeReservation } = useReservation();
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="min-h-screen bg-cream text-ink antialiased selection:bg-kijani selection:text-white">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <MobileTabBar />
      <CartDrawer />
      <ItemModal />
      <AuthModal />
      <Toasts />
      <TableReservationModal isOpen={isReservationOpen} onClose={closeReservation} />
    </div>
  );
}
