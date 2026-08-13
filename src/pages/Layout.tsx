import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { CartItem, MenuItem } from '../types';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { TableReservationModal } from '../components/TableReservationModal';
import { OrderCartDrawer } from '../components/OrderCartDrawer';
import { useReservation } from '../contexts/ReservationContext';

export default function Layout() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { isReservationOpen, closeReservation, openReservation } = useReservation();

  const handleAddToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((ci) => {
          if (ci.item.id === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, ci) => acc + ci.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F5F0E6] text-[#20221F] font-sans antialiased selection:bg-[#2F6B3F] selection:text-white">
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={openReservation}
      />

      <main>
        <Outlet context={{ cartItems, onAddToCart: handleAddToCart, onUpdateQuantity: handleUpdateQuantity }} />
      </main>

      <Footer />

      <TableReservationModal
        isOpen={isReservationOpen}
        onClose={closeReservation}
      />

      <OrderCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
