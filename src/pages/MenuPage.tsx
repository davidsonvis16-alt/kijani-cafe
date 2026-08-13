import React from 'react';
import { MenuSection } from '../components/MenuSection';
import { CartItem } from '../types';

interface MenuPageProps {
  cartItems: { item: import('../types').MenuItem; quantity: number }[];
  onAddToCart: (item: import('../types').MenuItem) => void;
  onUpdateQuantity: (itemId: string, delta: number) => void;
}

export default function MenuPage({ cartItems, onAddToCart, onUpdateQuantity }: MenuPageProps) {
  return (
    <div className="pt-8">
      <MenuSection
        cartItems={cartItems}
        onAddToCart={onAddToCart}
        onUpdateQuantity={onUpdateQuantity}
      />
    </div>
  );
}
