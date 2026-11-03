import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, CreditCard, Banknote, Loader2, Lock, Info, Tag, Gift, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useOrders } from '../contexts/OrdersContext';
import { useUI } from '../contexts/UIContext';
import { OrderModeSwitch } from '../components/layout/OrderModeSwitch';
import { ORDERING, REWARDS } from '../data/site';
import { Order, PaymentMethod } from '../types';
import { describeSelections, lineTotal, unitPrice } from '../lib/pricing';
import { ksh, uid, normaliseKePhone } from '../lib/format';
import { openStatus, todaySlots } from '../lib/hours';
import { cn } from '../lib/utils';

const input = 'w-full rounded-2xl border border-forest/15 bg-white px-4 py-3 text-sm focus:outline-none focus:border-forest';

function luhn(num: string) {
  const d = num.replace(/\D/g, '');
  if (d.length < 13) return false;
  let sum = 0;
  for (let i = 0; i < d.length; i++) {
    let n = +d[d.length - 1 - i];
    if (i % 2) n = n * 2 > 9 ? n * 2 - 9 : n * 2;
    sum += n;
  }
  return sum % 10 === 0;
}

export default function CheckoutPage() {
  const { lines, subtotal, mode, clear } = useCart();
  const { user, updateUser } = useAuth();
  const { addOrder } = useOrders();
  const { openAuth } = useUI();
  const navigate = useNavigate();
  const status = openStatus();
  const slots = useMemo(() => todaySlots(ORDERING.prepMinutes), []);

  const [name, setName] = useState(user?.name ?? '');
  const [phone, setPhone] = useState(user?.phone ? `0${user.phone.slice(3)}` : '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [table, setTable] = useState('');
  const [address, setAddress] = useState(user?.addresses[0] ?? '');
  const [when, setWhen] = useState<'ASAP' | string>(status.open ? 'ASAP' : slots[0] ?? 'ASAP');
  const [payment, setPayment] = useState<PaymentMethod>('MPESA');
  const [mpesaPhone, setMpesaPhone] = useState(phone);
  const [card, setCard] = useState({ number: '', exp: '', cvc: '' });
  const [promoInput, setPromoInput] = useState('');
  const [promo, setPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');
  const [tip, setTip] = useState(0);
  const [redeem, setRedeem] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState<null | 'mpesa' | 'card' | 'done'>(null);

  const deliveryFee = mode === 'DELIVERY' ? ORDERING.delivery.fee : 0;
  const promoPct = promo ? ORDERING.promoCodes[promo]?.percent ?? 0 : 0;
  const promoDiscount = Math.round((subtotal * promoPct) / 100);
  const maxRedeem = user && user.points >= REWARDS.minRedeem ? Math.min(user.points * REWARDS.pointValue, subtotal - promoDiscount) : 0;
  const pointsDiscount = redeem ? maxRedeem : 0;
  const discount = promoDiscount + pointsDiscount;
  const total = Math.max(0, subtotal - discount) + deliveryFee + tip;
  const pointsEarned = Math.floor((subtotal - discount) / REWARDS.kshPerPoint);

  if (lines.length === 0 && processing !== 'done') {
    return (
      <div className="max-w-xl mx-auto px-4 py-28 text-center">
        <h1 className="font-bebas text-6xl text-forest tracking-wide">Your bag is empty</h1>
        <p className="text-ink/60 mt-2">Add a few things from the menu and come back.</p>
        <Link to="/menu" className="inline-block mt-6 bg-ember text-white px-7 py-3.5 rounded-full font-extrabold">Browse the menu</Link>
      </div>
    );
  }

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (ORDERING.promoCodes[code]) {
      setPromo(code);
      setPromoError('');
    } else {
      setPromoError('That code isn’t valid.');
    }
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Enter your name';
    if (!normaliseKePhone(phone)) e.phone = 'Enter a valid Kenyan mobile number';
    if (mode === 'DINE_IN' && !table.trim()) e.table = 'Which table are you at?';
    if (mode === 'DELIVERY' && address.trim().length < 6) e.address = 'Enter a delivery address';
    if (mode === 'DELIVERY' && subtotal < ORDERING.delivery.minOrder) e.address = `Delivery minimum is ${ksh(ORDERING.delivery.minOrder)}`;
    if (payment === 'MPESA' && !normaliseKePhone(mpesaPhone)) e.mpesa = 'Enter the M-Pesa number to charge';
    if (payment === 'CARD') {
      if (!luhn(card.number)) e.card = 'Card number looks wrong';
      else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.exp)) e.card = 'Expiry should be MM/YY';
      else if (!/^\d{3,4}$/.test(card.cvc)) e.card = 'CVC should be 3–4 digits';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const place = async () => {
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (payment !== 'CASH') {
      setProcessing(payment === 'MPESA' ? 'mpesa' : 'card');
      // Simulated gateway round-trip. Replace with Daraja STK push / card processor.
      await new Promise((r) => setTimeout(r, payment === 'MPESA' ? 4000 : 2200));
    }
    const order: Order = {
      id: uid('KK-').slice(0, 9),
      placedAt: Date.now(),
      scheduledFor: when === 'ASAP' ? undefined : when,
      mode,
      table: mode === 'DINE_IN' ? table.trim() : undefined,
      address: mode === 'DELIVERY' ? address.trim() : undefined,
      customer: { name: name.trim(), phone: normaliseKePhone(phone)!, email: email.trim() || undefined },
      lines: lines.map((l) => ({
        itemId: l.item.id,
        name: l.item.name,
        image: l.item.image,
        quantity: l.quantity,
        unitPrice: unitPrice(l.item, l.selections),
        summary: describeSelections(l.item, l.selections),
        selections: l.selections,
        note: l.note,
      })),
      subtotal,
      deliveryFee,
      discount,
      tip,
      total,
      payment,
      paid: payment !== 'CASH',
      promoCode: promo ?? undefined,
      pointsEarned: user ? pointsEarned : 0,
      pointsRedeemed: user && redeem ? Math.round(pointsDiscount / REWARDS.pointValue) : 0,
      userId: user?.id,
      etaMinutes: ORDERING.prepMinutes + (mode === 'DELIVERY' ? ORDERING.delivery.extraMinutes : 0),
    };
    addOrder(order);
    if (user) {
      updateUser({
        points: user.points - order.pointsRedeemed + order.pointsEarned,
        addresses: mode === 'DELIVERY' && !user.addresses.includes(order.address!) ? [order.address!, ...user.addresses].slice(0, 5) : user.addresses,
      });
    }
    setProcessing('done');
    clear();
    navigate(`/order/${order.id}?new=1`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 pb-28">
      <Link to="/menu" className="inline-flex items-center gap-1.5 text-sm font-bold text-forest/70 hover:text-forest">
        <ArrowLeft className="w-4 h-4" /> Back to menu
      </Link>
      <h1 className="font-bebas text-6xl sm:text-7xl tracking-wide text-forest mt-3 leading-none">Checkout</h1>

      {ORDERING.demoPayments && (
        <div className="mt-5 flex gap-3 rounded-2xl bg-sun/25 border border-sun px-4 py-3 text-sm text-forest">
          <Info className="w-5 h-5 shrink-0 mt-0.5" />
          <p>
            <strong>Preview mode:</strong> online payments are simulated and no money is taken. After placing your order you’ll send it to the
            kitchen on WhatsApp.
          </p>
        </div>
      )}

      {!user && (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-forest text-cream px-5 py-4">
          <p className="flex items-center gap-2 text-sm"><Gift className="w-5 h-5 text-leaf" /> Sign in to earn <strong className="text-leaf">{pointsEarned} points</strong> on this order.</p>
          <button onClick={() => openAuth('signin')} className="bg-leaf text-forest px-5 py-2 rounded-full text-sm font-extrabold">Sign in</button>
        </div>
      )}

      <div className="grid lg:grid-cols-[1fr_400px] gap-8 mt-8 items-start">
        <div className="space-y-5">
          <Card step={1} title="How & when">
            <OrderModeSwitch className="mb-5" />
            {mode === 'DINE_IN' && (
              <Field label="Table number" error={errors.table}>
                <input className={input} value={table} onChange={(e) => setTable(e.target.value)} placeholder="e.g. Garden 4" />
              </Field>
            )}
            {mode === 'DELIVERY' && (
              <Field label={`Delivery address · ${ksh(ORDERING.delivery.fee)} fee`} error={errors.address}>
                <input className={input} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Estate, street, house / building" />
                {!!user?.addresses.length && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {user.addresses.map((a) => (
                      <button key={a} onClick={() => setAddress(a)} className="text-xs font-bold bg-forest/5 rounded-full px-3 py-1.5">{a}</button>
                    ))}
                  </div>
                )}
              </Field>
            )}
            {mode === 'PICKUP' && <p className="text-sm text-ink/60 mb-4">Collect from the counter at Kijani Kafe, Menengai Drive.</p>}

            <p className="font-extrabold text-sm text-forest mb-2 mt-2">When?</p>
            {!status.open && <p className="text-xs text-ember font-semibold mb-2">{status.label}. Schedule for later and we’ll have it ready.</p>}
            <div className="flex flex-wrap gap-2">
              <Chip on={when === 'ASAP'} onClick={() => setWhen('ASAP')} disabled={!status.open}>
                ASAP · ~{ORDERING.prepMinutes + (mode === 'DELIVERY' ? ORDERING.delivery.extraMinutes : 0)} min
              </Chip>
              <select
                value={when === 'ASAP' ? '' : when}
                onChange={(e) => e.target.value && setWhen(e.target.value)}
                className={cn('rounded-full border px-4 py-2 text-sm font-bold bg-white', when !== 'ASAP' ? 'border-forest' : 'border-forest/15')}
                aria-label="Schedule a time"
              >
                <option value="">{slots.length ? 'Schedule for later…' : 'No more slots today'}</option>
                {slots.map((s) => <option key={s} value={s}>Today, {s}</option>)}
              </select>
            </div>
          </Card>

          <Card step={2} title="Your details">
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Name" error={errors.name}>
                <input className={input} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
              </Field>
              <Field label="Phone" error={errors.phone}>
                <input className={input} value={phone} onChange={(e) => { setPhone(e.target.value); if (!mpesaPhone || mpesaPhone === phone) setMpesaPhone(e.target.value); }} type="tel" placeholder="07XX XXX XXX" autoComplete="tel" />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Email (for your receipt, optional)">
                  <input className={input} value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" />
                </Field>
              </div>
            </div>
          </Card>

          <Card step={3} title="Payment">
            <div className="grid sm:grid-cols-3 gap-2 mb-5">
              {([
                { id: 'MPESA', label: 'M-Pesa', sub: 'STK push to your phone', icon: Smartphone },
                { id: 'CARD', label: 'Card', sub: 'Visa · Mastercard', icon: CreditCard },
                { id: 'CASH', label: mode === 'DELIVERY' ? 'Pay on delivery' : 'Pay at counter', sub: 'Cash or M-Pesa', icon: Banknote },
              ] as const).map(({ id, label, sub, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setPayment(id)}
                  aria-pressed={payment === id}
                  className={cn('text-left rounded-2xl border-2 p-4 transition-colors', payment === id ? 'border-forest bg-forest/[0.04]' : 'border-forest/10 hover:border-forest/30')}
                >
                  <Icon className={cn('w-6 h-6', id === 'MPESA' ? 'text-kijani' : 'text-forest')} />
                  <span className="block font-extrabold text-sm mt-2">{label}</span>
                  <span className="block text-[11px] text-ink/50">{sub}</span>
                </button>
              ))}
            </div>
            {payment === 'MPESA' && (
              <Field label="M-Pesa number" error={errors.mpesa}>
                <input className={input} value={mpesaPhone} onChange={(e) => setMpesaPhone(e.target.value)} type="tel" placeholder="07XX XXX XXX" />
                <p className="text-xs text-ink/50 mt-1.5">You’ll get a prompt on this phone to enter your M-Pesa PIN.</p>
              </Field>
            )}
            {payment === 'CARD' && (
              <Field label="Card details" error={errors.card}>
                <input
                  className={input}
                  inputMode="numeric"
                  autoComplete="cc-number"
                  placeholder="1234 5678 9012 3456"
                  value={card.number}
                  onChange={(e) => setCard({ ...card, number: e.target.value.replace(/\D/g, '').slice(0, 19).replace(/(.{4})/g, '$1 ').trim() })}
                />
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <input
                    className={input}
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    placeholder="MM/YY"
                    value={card.exp}
                    onChange={(e) => {
                      const d = e.target.value.replace(/\D/g, '').slice(0, 4);
                      setCard({ ...card, exp: d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d });
                    }}
                  />
                  <input className={input} inputMode="numeric" autoComplete="cc-csc" placeholder="CVC" value={card.cvc} onChange={(e) => setCard({ ...card, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) })} />
                </div>
              </Field>
            )}
            {payment === 'CASH' && <p className="text-sm text-ink/60">Pay with cash or M-Pesa when you {mode === 'DELIVERY' ? 'receive your order' : 'collect or are served'}.</p>}
            <p className="flex items-center gap-1.5 text-[11px] text-ink/50 mt-4"><Lock className="w-3.5 h-3.5" /> Secured checkout</p>
          </Card>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-24 bg-paper rounded-[2rem] border border-forest/10 overflow-hidden">
          <div className="p-6 space-y-3 max-h-[40vh] overflow-y-auto">
            <h2 className="font-bebas text-3xl text-forest tracking-wide">Order summary</h2>
            {lines.map((l) => (
              <div key={l.key} className="flex gap-3 text-sm">
                <span className="font-extrabold text-kijani w-6">{l.quantity}×</span>
                <span className="flex-1">
                  <span className="font-bold block">{l.item.name}</span>
                  {describeSelections(l.item, l.selections) && <span className="text-xs text-ink/50">{describeSelections(l.item, l.selections)}</span>}
                </span>
                <span className="font-bold">{ksh(lineTotal(l))}</span>
              </div>
            ))}
          </div>

          <div className="px-6 py-5 border-t border-forest/10 space-y-4">
            {Object.keys(ORDERING.promoCodes).length > 0 && (
              promo ? (
                <p className="flex items-center justify-between text-sm font-bold text-kijani">
                  <span className="flex items-center gap-1.5"><Tag className="w-4 h-4" /> {promo} · {ORDERING.promoCodes[promo].label}</span>
                  <button onClick={() => setPromo(null)} className="text-xs text-ink/50 underline">Remove</button>
                </p>
              ) : (
                <div>
                  <div className="flex gap-2">
                    <input className={input + ' py-2.5 uppercase'} placeholder="Promo code" value={promoInput} onChange={(e) => setPromoInput(e.target.value)} />
                    <button onClick={applyPromo} className="px-5 rounded-2xl bg-forest text-leaf font-extrabold text-sm">Apply</button>
                  </div>
                  {promoError && <p className="text-xs text-ember font-semibold mt-1.5">{promoError}</p>}
                </div>
              )
            )}

            {user && maxRedeem > 0 && (
              <label className="flex items-center gap-3 rounded-2xl bg-sun/25 px-4 py-3 text-sm cursor-pointer">
                <input type="checkbox" checked={redeem} onChange={(e) => setRedeem(e.target.checked)} className="w-4 h-4 accent-forest" />
                <span className="flex-1">Use {Math.round(maxRedeem / REWARDS.pointValue)} points</span>
                <span className="font-extrabold">−{ksh(maxRedeem)}</span>
              </label>
            )}

            <div>
              <p className="text-xs font-extrabold text-forest mb-2">Add a tip for the team</p>
              <div className="flex gap-2">
                {ORDERING.tipOptions.map((t) => (
                  <Chip key={t} on={tip === t} onClick={() => setTip(t)}>{t === 0 ? 'None' : ksh(t)}</Chip>
                ))}
              </div>
            </div>

            <dl className="space-y-1.5 text-sm">
              <Row label="Subtotal" value={ksh(subtotal)} />
              {promoDiscount > 0 && <Row label="Promo" value={`−${ksh(promoDiscount)}`} accent />}
              {pointsDiscount > 0 && <Row label="Points" value={`−${ksh(pointsDiscount)}`} accent />}
              {deliveryFee > 0 && <Row label="Delivery" value={ksh(deliveryFee)} />}
              {tip > 0 && <Row label="Tip" value={ksh(tip)} />}
              <div className="flex justify-between pt-2 border-t border-forest/10">
                <dt className="font-bebas text-2xl tracking-wide text-forest">Total</dt>
                <dd className="font-bebas text-3xl tracking-wide text-forest">{ksh(total)}</dd>
              </div>
              {user && <p className="text-xs text-kijani font-bold text-right">+{pointsEarned} points with this order</p>}
            </dl>

            <button onClick={place} disabled={!!processing} className="w-full bg-ember hover:bg-[#c94220] disabled:opacity-70 text-white rounded-full py-4 font-extrabold flex items-center justify-center gap-2">
              {processing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Lock className="w-4 h-4" />}
              {payment === 'CASH' ? 'Place order' : `Pay ${ksh(total)}`}
            </button>
          </div>
        </aside>
      </div>

      <AnimatePresence>
        {(processing === 'mpesa' || processing === 'card') && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] bg-ink/80 backdrop-blur grid place-items-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-paper rounded-[2rem] p-10 max-w-sm w-full text-center">
              {processing === 'mpesa' ? (
                <>
                  <div className="relative w-20 h-20 mx-auto">
                    <span className="absolute inset-0 rounded-full bg-kijani/20 animate-ping" />
                    <span className="relative w-20 h-20 rounded-full bg-kijani text-white grid place-items-center"><Smartphone className="w-9 h-9" /></span>
                  </div>
                  <h3 className="font-bebas text-4xl text-forest tracking-wide mt-6">Check your phone</h3>
                  <p className="text-sm text-ink/60 mt-2">Enter your M-Pesa PIN on {mpesaPhone} to pay <strong>{ksh(total)}</strong> to Kijani Kafe.</p>
                </>
              ) : (
                <>
                  <Loader2 className="w-14 h-14 mx-auto text-forest animate-spin" />
                  <h3 className="font-bebas text-4xl text-forest tracking-wide mt-6">Authorising card</h3>
                  <p className="text-sm text-ink/60 mt-2">Hang tight, this only takes a moment.</p>
                </>
              )}
              <p className="flex items-center justify-center gap-1.5 text-xs text-ink/40 mt-6"><CheckCircle2 className="w-3.5 h-3.5" /> Don’t close this page</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Card({ step, title, children }: { step: number; title: string; children: React.ReactNode }) {
  return (
    <section className="bg-paper rounded-[2rem] border border-forest/10 p-6 sm:p-7">
      <h2 className="flex items-center gap-3 font-bebas text-3xl tracking-wide text-forest mb-5">
        <span className="w-9 h-9 rounded-full bg-forest text-leaf grid place-items-center text-xl">{step}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <span className="block text-xs font-extrabold text-forest mb-1.5">{label}</span>
      {children}
      {error && <p className="text-xs text-ember font-semibold mt-1.5" role="alert">{error}</p>}
    </div>
  );
}

function Chip({ on, onClick, disabled, children }: { on: boolean; onClick: () => void; disabled?: boolean; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={on}
      className={cn('rounded-full border px-4 py-2 text-sm font-bold transition-colors disabled:opacity-40', on ? 'bg-forest text-leaf border-forest' : 'bg-white border-forest/15 hover:border-forest/40')}
    >
      {children}
    </button>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={cn('flex justify-between', accent && 'text-kijani font-bold')}>
      <dt className={accent ? '' : 'text-ink/60'}>{label}</dt>
      <dd className="font-bold">{value}</dd>
    </div>
  );
}
