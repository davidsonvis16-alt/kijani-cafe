import React from 'react';
import { ShoppingBag, Bike, UtensilsCrossed } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { ORDERING } from '../../data/site';
import { OrderMode } from '../../types';
import { cn } from '../../lib/utils';

export const MODES: { id: OrderMode; label: string; icon: React.ElementType }[] = [
  { id: 'PICKUP', label: 'Pickup', icon: ShoppingBag },
  { id: 'DINE_IN', label: 'Dine-in', icon: UtensilsCrossed },
  ...(ORDERING.delivery.enabled ? [{ id: 'DELIVERY' as OrderMode, label: 'Delivery', icon: Bike }] : []),
];

export function OrderModeSwitch({ dark = false, className }: { dark?: boolean; className?: string }) {
  const { mode, setMode } = useCart();
  return (
    <div
      role="radiogroup"
      aria-label="How would you like your order?"
      className={cn('inline-flex p-1 rounded-full', dark ? 'bg-white/10' : 'bg-forest/[0.06]', className)}
    >
      {MODES.map(({ id, label, icon: Icon }) => {
        const active = mode === id;
        return (
          <button
            key={id}
            role="radio"
            aria-checked={active}
            onClick={() => setMode(id)}
            className={cn(
              'flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-extrabold tracking-wide whitespace-nowrap transition-all',
              active
                ? dark
                  ? 'bg-leaf text-forest shadow'
                  : 'bg-forest text-white shadow'
                : dark
                  ? 'text-cream/80 hover:text-white'
                  : 'text-forest/70 hover:text-forest',
            )}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
