import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Gift, Heart, Receipt, User as UserIcon, LogOut, ChevronRight, Trash2, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useOrders, orderStages, stageIndex } from '../contexts/OrdersContext';
import { useUI } from '../contexts/UIContext';
import { MenuCard } from '../components/menu/MenuCard';
import { MENU_ITEMS } from '../data/menuData';
import { REWARDS } from '../data/site';
import { ksh, formatDate, normaliseKePhone } from '../lib/format';
import { cn } from '../lib/utils';

const TABS = [
  { id: 'orders', label: 'Orders', icon: Receipt },
  { id: 'rewards', label: 'Rewards', icon: Gift },
  { id: 'favourites', label: 'Favourites', icon: Heart },
  { id: 'profile', label: 'Profile', icon: UserIcon },
] as const;

export default function AccountPage() {
  const { user, signOut } = useAuth();
  const { orders } = useOrders();
  const { openAuth } = useUI();
  const [params, setParams] = useSearchParams();
  const tab = (params.get('tab') as (typeof TABS)[number]['id']) || 'orders';
  const myOrders = orders.filter((o) => (user ? o.userId === user.id : !o.userId));

  if (!user) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-14 pb-28">
        <div className="rounded-[2rem] bg-forest text-cream p-10 sm:p-14 grain">
          <p className="text-xs font-extrabold tracking-[0.25em] text-leaf">KIJANI REWARDS</p>
          <h1 className="font-bebas text-6xl sm:text-7xl tracking-wide leading-[0.9] mt-2">Your Kijani,<br />your way.</h1>
          <p className="text-cream/70 mt-4 max-w-md">Earn 1 point for every {ksh(REWARDS.kshPerPoint)}, save favourites, track orders and reorder in one tap.</p>
          <div className="flex flex-wrap gap-3 mt-8">
            <button onClick={() => openAuth('signup')} className="bg-leaf text-forest px-7 py-3.5 rounded-full font-extrabold">Create account</button>
            <button onClick={() => openAuth('signin')} className="border border-cream/30 px-7 py-3.5 rounded-full font-bold">Sign in</button>
          </div>
        </div>
        {myOrders.length > 0 && (
          <div className="mt-10">
            <h2 className="font-bebas text-4xl text-forest tracking-wide mb-4">Orders on this device</h2>
            <OrderList orders={myOrders} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 pb-28">
      <div className="flex flex-wrap items-center gap-5">
        <span className="w-20 h-20 rounded-full bg-sun text-forest grid place-items-center font-bebas text-5xl">{user.name.charAt(0)}</span>
        <div className="flex-1">
          <h1 className="font-bebas text-5xl sm:text-6xl tracking-wide text-forest leading-none">Jambo, {user.name.split(' ')[0]}</h1>
          <p className="text-sm text-ink/60 mt-1">{user.points} points · Member since {formatDate(user.createdAt)}</p>
        </div>
        <button onClick={signOut} className="inline-flex items-center gap-2 text-sm font-bold text-ink/60 hover:text-ember"><LogOut className="w-4 h-4" /> Sign out</button>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar mt-8 border-b border-forest/10">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setParams({ tab: id })}
            className={cn('flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-[3px] -mb-px shrink-0', tab === id ? 'border-ember text-forest' : 'border-transparent text-ink/50')}
          >
            <Icon className="w-4 h-4" /> {label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {tab === 'orders' && (myOrders.length ? <OrderList orders={myOrders} /> : <Empty text="No orders yet." />)}
        {tab === 'rewards' && <Rewards points={user.points} />}
        {tab === 'favourites' &&
          (user.favourites.length ? (
            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-5">
              {MENU_ITEMS.filter((i) => user.favourites.includes(i.id)).map((i) => <MenuCard key={i.id} item={i} />)}
            </div>
          ) : (
            <Empty text="Tap the ♥ on any dish to save it here." />
          ))}
        {tab === 'profile' && <Profile />}
      </div>
    </div>
  );
}

function OrderList({ orders }: { orders: ReturnType<typeof useOrders>['orders'] }) {
  return (
    <div className="space-y-3">
      {orders.map((o) => {
        const stage = orderStages(o)[stageIndex(o)];
        return (
          <Link key={o.id} to={`/order/${o.id}`} className="flex items-center gap-4 bg-paper rounded-2xl border border-forest/10 p-4 hover:border-forest/30">
            <div className="flex -space-x-3">
              {o.lines.slice(0, 3).map((l, i) => <img key={i} src={l.image} alt="" className="w-12 h-12 rounded-full object-cover ring-2 ring-paper" />)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-extrabold text-forest">{o.id} · {ksh(o.total)}</p>
              <p className="text-xs text-ink/55 truncate">{formatDate(o.placedAt)} · {o.lines.map((l) => l.name).join(', ')}</p>
            </div>
            <span className="hidden sm:inline text-xs font-extrabold px-3 py-1 rounded-full bg-leaf/30 text-forest">{stage.label}</span>
            <ChevronRight className="w-5 h-5 text-ink/30" />
          </Link>
        );
      })}
    </div>
  );
}

function Rewards({ points }: { points: number }) {
  const tiers = REWARDS.tiers;
  const tierIdx = tiers.reduce((acc, t, i) => (points >= t.min ? i : acc), 0);
  const next = tiers[tierIdx + 1];
  const pct = next ? ((points - tiers[tierIdx].min) / (next.min - tiers[tierIdx].min)) * 100 : 100;
  return (
    <div className="grid lg:grid-cols-[1.2fr_1fr] gap-5">
      <div className="rounded-[2rem] bg-forest text-cream p-8 sm:p-10 grain relative overflow-hidden">
        <Gift className="absolute -right-8 -bottom-8 w-52 h-52 text-white/5" />
        <p className="text-xs font-extrabold tracking-[0.25em] text-leaf">{tiers[tierIdx].name.toUpperCase()} MEMBER</p>
        <p className="font-bebas text-8xl leading-none mt-3">{points}</p>
        <p className="text-cream/70">points · worth {ksh(points * REWARDS.pointValue)}</p>
        <div className="mt-8">
          <div className="h-3 rounded-full bg-white/10 overflow-hidden"><div className="h-full bg-leaf rounded-full" style={{ width: `${Math.min(100, pct)}%` }} /></div>
          <p className="text-xs text-cream/60 mt-2">{next ? `${next.min - points} points to ${next.name}` : 'Top tier reached. Legend.'}</p>
        </div>
      </div>
      <div className="rounded-[2rem] bg-paper border border-forest/10 p-8">
        <h3 className="font-bebas text-3xl text-forest tracking-wide">How it works</h3>
        <ol className="mt-4 space-y-4 text-sm">
          <li><strong className="text-forest">Earn</strong> 1 point for every {ksh(REWARDS.kshPerPoint)} you spend online.</li>
          <li><strong className="text-forest">Redeem</strong> from {REWARDS.minRedeem} points at checkout. Each point = {ksh(REWARDS.pointValue)} off.</li>
          <li><strong className="text-forest">Level up</strong> through {tiers.map((t) => t.name).join(' → ')}.</li>
        </ol>
        <Link to="/menu" className="inline-block mt-6 bg-ember text-white px-6 py-3 rounded-full font-extrabold text-sm">Earn points now</Link>
      </div>
    </div>
  );
}

function Profile() {
  const { user, updateUser, toast } = { ...useAuth(), ...useUI() };
  const [name, setName] = useState(user!.name);
  const [phone, setPhone] = useState(`0${user!.phone.slice(3)}`);
  const [addr, setAddr] = useState('');
  const [err, setErr] = useState('');
  const input = 'w-full rounded-2xl border border-forest/15 bg-white px-4 py-3 text-sm focus:outline-none focus:border-forest';

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const p = normaliseKePhone(phone);
    if (!name.trim() || !p) return setErr('Check your name and phone number.');
    setErr('');
    updateUser({ name: name.trim(), phone: p });
    toast('Profile updated');
  };

  return (
    <div className="grid lg:grid-cols-2 gap-5">
      <form onSubmit={saveProfile} className="rounded-[2rem] bg-paper border border-forest/10 p-8 space-y-3">
        <h3 className="font-bebas text-3xl text-forest tracking-wide">Your details</h3>
        <input className={input} value={name} onChange={(e) => setName(e.target.value)} aria-label="Name" />
        <input className={input} value={phone} onChange={(e) => setPhone(e.target.value)} aria-label="Phone" type="tel" />
        <input className={input + ' bg-forest/5'} value={user!.email} disabled aria-label="Email" />
        {err && <p className="text-sm text-ember font-semibold">{err}</p>}
        <button className="bg-forest text-leaf px-6 py-3 rounded-full font-extrabold text-sm">Save changes</button>
      </form>
      <div className="rounded-[2rem] bg-paper border border-forest/10 p-8">
        <h3 className="font-bebas text-3xl text-forest tracking-wide">Delivery addresses</h3>
        <ul className="mt-4 space-y-2">
          {user!.addresses.map((a) => (
            <li key={a} className="flex items-center gap-3 rounded-2xl bg-forest/5 px-4 py-3 text-sm">
              <span className="flex-1">{a}</span>
              <button onClick={() => updateUser({ addresses: user!.addresses.filter((x) => x !== a) })} aria-label={`Remove ${a}`} className="text-ink/40 hover:text-ember"><Trash2 className="w-4 h-4" /></button>
            </li>
          ))}
        </ul>
        <form
          className="flex gap-2 mt-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (addr.trim().length < 4) return;
            updateUser({ addresses: [addr.trim(), ...user!.addresses].slice(0, 5) });
            setAddr('');
          }}
        >
          <input className={input} value={addr} onChange={(e) => setAddr(e.target.value)} placeholder="Add an address" />
          <button className="px-4 rounded-2xl bg-forest text-leaf" aria-label="Add address"><Plus className="w-5 h-5" /></button>
        </form>
      </div>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div className="text-center py-16">
      <p className="text-ink/60">{text}</p>
      <Link to="/menu" className="inline-block mt-5 bg-ember text-white px-6 py-3 rounded-full font-extrabold text-sm">Browse the menu</Link>
    </div>
  );
}
