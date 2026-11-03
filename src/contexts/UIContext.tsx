import React, { createContext, useCallback, useContext, useMemo, useRef, useState, ReactNode } from 'react';
import { MenuItem } from '../types';

type AuthView = 'signin' | 'signup';

interface Toast {
  id: number;
  message: string;
  image?: string;
}

interface UIContextValue {
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  authView: AuthView | null;
  openAuth: (view?: AuthView) => void;
  closeAuth: () => void;
  activeItem: MenuItem | null;
  openItem: (item: MenuItem) => void;
  closeItem: () => void;
  toasts: Toast[];
  toast: (message: string, image?: string) => void;
}

const UIContext = createContext<UIContextValue | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [authView, setAuthView] = useState<AuthView | null>(null);
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(1);

  const toast = useCallback((message: string, image?: string) => {
    const id = nextId.current++;
    setToasts((prev) => [...prev.slice(-2), { id, message, image }]);
    window.setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2800);
  }, []);

  const value = useMemo<UIContextValue>(
    () => ({
      cartOpen,
      setCartOpen,
      authView,
      openAuth: (view = 'signin') => setAuthView(view),
      closeAuth: () => setAuthView(null),
      activeItem,
      openItem: setActiveItem,
      closeItem: () => setActiveItem(null),
      toasts,
      toast,
    }),
    [cartOpen, authView, activeItem, toasts, toast],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used within UIProvider');
  return ctx;
}
