import React, { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Check, MessageCircle, RotateCcw, Clock, MapPin, PartyPopper } from 'lucide-react';
import { useOrders, orderStages, stageIndex } from '../contexts/OrdersContext';
import { useCart } from '../contexts/CartContext';
import { useUI } from '../contexts/UIContext';
import { findItem } from '../data/menuData';
import { ORDERING, SITE } from '../data/site';
import { Order } from '../types';
import { ksh, formatTime, formatDate } from '../lib/format';
import { cn } from '../lib/utils';

const MODE_LABEL = { PICKUP: 'Pickup', DINE_IN: 'Dine-in', DELIVERY: 'Delivery' } as const;
const PAY_LABEL = { MPESA: 'M-Pesa', CARD: 'Card', CASH: 'Pay on collection' } as const;

export function whatsappOrderUrl(o: Order) {
  const items = o.lines.map((l) => `• ${l.quantity}× ${l.name}${l.summary ? ` (${l.summary})` : ''}${l.note ? ` — "${l.note}"` : ''} = ${ksh(l.unitPrice * l.quantity)}`).join('\n');
  const where = o.mode === 'DINE_IN' ? `Dine-in, table ${o.table}` : o.mode === 'DELIVERY' ? `Delivery to ${o.address}` : 'Pickup';
  const text = `Hello Kijani Kafe! New online order *${o.id}*\n\n*${where}*\n*When:* ${o.scheduledFor ? `Today ${o.scheduledFor}` : 'ASAP'}\n*Name:* ${o.customer.name}\n*Phone:* +${o.customer.phone}\n\n${items}\n\n*Total:* ${ksh(o.total)}\n*Payment:* ${PAY_LABEL[o.payment]}`;
  return `https://wa.me/${SITE.phoneIntl}?text=${encodeURIComponent(text)}`;
}

export default function OrderPage() {
  const { id = '' } = useParams();
  const [params] = useSearchParams();
  const { getOrder } = useOrders();
  const { addLine, setMode } = useCart();
  const { setCartOpen } = useUI();
  const navigate = useNavigate();
  const order = getOrder(id);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 15000);
    return () => window.clearInterval(t);
  }, []);

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-28 text-center">
        <h1 className="font-bebas text-6xl text-forest tracking-wide">Order not found</h1>
        <p className="text-ink/60 mt-2">Orders are saved on the device you placed them from.</p>
        <Link to="/menu" className="inline-block mt-6 bg-ember text-white px-7 py-3.5 rounded-full font-extrabold">Start a new order</Link>
      </div>
    );
  }

  const stages = orderStages(order);
  const current = stageIndex(order, now);
  const eta = order.placedAt + order.etaMinutes * 60000;
  const fresh = params.get('new') === '1';

  const reorder = () => {
    order.lines.forEach((l) => {
      const item = findItem(l.itemId);
      if (item) addLine(item, l.selections ?? {}, l.quantity, l.note);
    });
    setMode(order.mode);
    setCartOpen(true);
    navigate('/menu');
  };

  return (
    <div className="pb-28">
      <section className="bg-forest text-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 text-center">
          {fresh && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} className="w-20 h-20 rounded-full bg-leaf text-forest grid place-items-center mx-auto mb-5">
              <PartyPopper className="w-10 h-10" />
            </motion.div>
          )}
          <p className="text-xs font-extrabold tracking-[0.25em] text-leaf">ORDER {order.id}</p>
          <h1 className="font-bebas text-6xl sm:text-7xl tracking-wide leading-[0.9] mt-2">
            {fresh ? `Asante, ${order.customer.name.split(' ')[0]}!` : stages[current].label}
          </h1>
          <p className="text-cream/70 mt-3 flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm">
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {order.scheduledFor ? `Scheduled for ${order.scheduledFor}` : current < 3 ? `Ready around ${formatTime(eta)}` : formatDate(order.placedAt)}</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {MODE_LABEL[order.mode]}{order.table ? ` · Table ${order.table}` : ''}{order.address ? ` · ${order.address}` : ''}</span>
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 -mt-6 space-y-5">
        {ORDERING.demoPayments && (
          <div className="bg-paper rounded-[2rem] border-2 border-leaf p-6 flex flex-col sm:flex-row gap-4 items-center shadow-xl">
            <div className="flex-1 text-center sm:text-left">
              <p className="font-extrabold text-forest">Send your order to the kitchen</p>
              <p className="text-sm text-ink/60">Tap to send the full ticket to Kijani on WhatsApp so they can start cooking.</p>
            </div>
            <a href={whatsappOrderUrl(order)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3.5 rounded-full font-extrabold text-sm shrink-0">
              <MessageCircle className="w-5 h-5" /> Send on WhatsApp
            </a>
          </div>
        )}

        <div className="bg-paper rounded-[2rem] border border-forest/10 p-6 sm:p-8">
          <ol className="relative">
            {stages.map((s, i) => {
              const done = i < current || (i === current && i === stages.length - 1);
              const active = i === current && !done;
              return (
                <li key={s.id} className="flex gap-4 pb-7 last:pb-0 relative">
                  {i < stages.length - 1 && <span className={cn('absolute left-[19px] top-10 bottom-0 w-0.5', i < current ? 'bg-kijani' : 'bg-forest/10')} />}
                  <span className={cn('relative w-10 h-10 rounded-full grid place-items-center shrink-0 font-extrabold', done ? 'bg-kijani text-white' : active ? 'bg-ember text-white' : 'bg-forest/5 text-ink/30')}>
                    {active && <span className="absolute inset-0 rounded-full bg-ember/40 animate-ping" />}
                    {done ? <Check className="w-5 h-5" strokeWidth={3} /> : <span className="relative">{i + 1}</span>}
                  </span>
                  <div className="pt-1.5">
                    <p className={cn('font-extrabold', i <= current ? 'text-forest' : 'text-ink/40')}>{s.label}</p>
                    <p className="text-sm text-ink/55">{s.detail}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="bg-paper rounded-[2rem] border border-forest/10 p-6 sm:p-8">
          <h2 className="font-bebas text-3xl text-forest tracking-wide mb-4">Receipt</h2>
          <div className="space-y-3">
            {order.lines.map((l, i) => (
              <div key={i} className="flex gap-3 items-center">
                <img src={l.image} alt="" className="w-14 h-14 rounded-xl object-cover" />
                <div className="flex-1 text-sm">
                  <p className="font-bold">{l.quantity}× {l.name}</p>
                  {l.summary && <p className="text-xs text-ink/50">{l.summary}</p>}
                </div>
                <span className="font-bold text-sm">{ksh(l.unitPrice * l.quantity)}</span>
              </div>
            ))}
          </div>
          <dl className="mt-5 pt-4 border-t border-forest/10 space-y-1 text-sm">
            <div className="flex justify-between"><dt className="text-ink/60">Subtotal</dt><dd>{ksh(order.subtotal)}</dd></div>
            {order.discount > 0 && <div className="flex justify-between text-kijani font-bold"><dt>Discounts</dt><dd>−{ksh(order.discount)}</dd></div>}
            {order.deliveryFee > 0 && <div className="flex justify-between"><dt className="text-ink/60">Delivery</dt><dd>{ksh(order.deliveryFee)}</dd></div>}
            {order.tip > 0 && <div className="flex justify-between"><dt className="text-ink/60">Tip</dt><dd>{ksh(order.tip)}</dd></div>}
            <div className="flex justify-between font-bebas text-3xl tracking-wide text-forest pt-2"><dt>Total</dt><dd>{ksh(order.total)}</dd></div>
            <p className="text-xs text-ink/50 text-right">{PAY_LABEL[order.payment]} · {order.paid ? 'Paid' : 'Due on collection'}</p>
            {order.pointsEarned > 0 && <p className="text-xs text-kijani font-bold text-right">+{order.pointsEarned} Kijani points earned</p>}
          </dl>
          <div className="flex flex-wrap gap-3 mt-6">
            <button onClick={reorder} className="inline-flex items-center gap-2 bg-forest text-leaf px-6 py-3 rounded-full font-extrabold text-sm">
              <RotateCcw className="w-4 h-4" /> Order this again
            </button>
            <a href={`tel:+${SITE.phoneIntl}`} className="inline-flex items-center gap-2 border border-forest/20 px-6 py-3 rounded-full font-bold text-sm">Call the restaurant</a>
          </div>
        </div>
      </div>
    </div>
  );
}
