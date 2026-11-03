import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { Order } from '../types';
import { STORAGE_KEYS } from '../data/site';
import { load, save } from '../lib/storage';

interface OrdersContextValue {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrder: (id: string) => Order | undefined;
}

const OrdersContext = createContext<OrdersContextValue | undefined>(undefined);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(() => load(STORAGE_KEYS.orders, []));

  useEffect(() => save(STORAGE_KEYS.orders, orders.slice(0, 50)), [orders]);

  const value = useMemo<OrdersContextValue>(
    () => ({
      orders,
      addOrder: (order) => setOrders((prev) => [order, ...prev]),
      getOrder: (id) => orders.find((o) => o.id === id),
    }),
    [orders],
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error('useOrders must be used within OrdersProvider');
  return ctx;
}

export type OrderStage = { id: string; label: string; detail: string };

export function orderStages(order: Order): OrderStage[] {
  const last =
    order.mode === 'DELIVERY'
      ? [{ id: 'out', label: 'On the way', detail: 'Your rider is heading to you' }, { id: 'done', label: 'Delivered', detail: 'Enjoy! Karibu tena.' }]
      : order.mode === 'DINE_IN'
        ? [{ id: 'out', label: 'Coming to your table', detail: `Table ${order.table || '—'}` }, { id: 'done', label: 'Served', detail: 'Enjoy! Karibu tena.' }]
        : [{ id: 'out', label: 'Ready for pickup', detail: 'Head to the counter' }, { id: 'done', label: 'Picked up', detail: 'Enjoy! Karibu tena.' }];
  return [
    { id: 'placed', label: 'Order received', detail: 'The kitchen has your ticket' },
    { id: 'prep', label: 'Cooking', detail: 'Fresh, made to order' },
    ...last,
  ];
}

/** Demo progression based on elapsed time until a real kitchen system pushes status updates. */
export function stageIndex(order: Order, now = Date.now()) {
  if (order.scheduledFor) return 0;
  const mins = (now - order.placedAt) / 60000;
  if (mins < 1) return 0;
  if (mins < order.etaMinutes - 5) return 1;
  if (mins < order.etaMinutes + 10) return 2;
  return 3;
}
