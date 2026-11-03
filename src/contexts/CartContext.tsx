import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { CartLine, MenuItem, OrderMode, Selections } from '../types';
import { STORAGE_KEYS } from '../data/site';
import { findItem } from '../data/menuData';
import { load, save } from '../lib/storage';
import { lineKey, lineTotal } from '../lib/pricing';

interface StoredLine {
  itemId: string;
  quantity: number;
  selections: Selections;
  note?: string;
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  mode: OrderMode;
  setMode: (mode: OrderMode) => void;
  addLine: (item: MenuItem, selections: Selections, quantity: number, note?: string) => void;
  updateQuantity: (key: string, delta: number) => void;
  removeLine: (key: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

function hydrate(): CartLine[] {
  return load<StoredLine[]>(STORAGE_KEYS.cart, []).flatMap((s) => {
    // Rebuild from current menu data so stale prices never survive a menu update.
    const item = findItem(s.itemId);
    return item ? [{ key: lineKey(item.id, s.selections, s.note), item, quantity: s.quantity, selections: s.selections, note: s.note }] : [];
  });
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(hydrate);
  const [mode, setMode] = useState<OrderMode>(() => load<OrderMode>(STORAGE_KEYS.mode, 'PICKUP'));

  useEffect(() => {
    save(
      STORAGE_KEYS.cart,
      lines.map<StoredLine>((l) => ({ itemId: l.item.id, quantity: l.quantity, selections: l.selections, note: l.note })),
    );
  }, [lines]);

  useEffect(() => save(STORAGE_KEYS.mode, mode), [mode]);

  const value = useMemo<CartContextValue>(() => {
    const addLine: CartContextValue['addLine'] = (item, selections, quantity, note) => {
      const key = lineKey(item.id, selections, note);
      setLines((prev) => {
        const existing = prev.find((l) => l.key === key);
        if (existing) return prev.map((l) => (l.key === key ? { ...l, quantity: l.quantity + quantity } : l));
        return [...prev, { key, item, quantity, selections, note: note?.trim() || undefined }];
      });
    };
    return {
      lines,
      mode,
      setMode,
      count: lines.reduce((n, l) => n + l.quantity, 0),
      subtotal: lines.reduce((n, l) => n + lineTotal(l), 0),
      addLine,
      updateQuantity: (key, delta) =>
        setLines((prev) =>
          prev.flatMap((l) => (l.key !== key ? [l] : l.quantity + delta > 0 ? [{ ...l, quantity: l.quantity + delta }] : [])),
        ),
      removeLine: (key) => setLines((prev) => prev.filter((l) => l.key !== key)),
      clear: () => setLines([]),
    };
  }, [lines, mode]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
