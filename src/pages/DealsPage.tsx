import React from 'react';
import { Link } from 'react-router-dom';
import { Martini, Baby, Gift, Tag, ArrowRight } from 'lucide-react';
import { MenuCard } from '../components/menu/MenuCard';
import { MENU_ITEMS } from '../data/menuData';
import { ORDERING, SITE } from '../data/site';
import { isHappyHour } from '../lib/hours';
import { useUI } from '../contexts/UIContext';
import { useAuth } from '../contexts/AuthContext';

export default function DealsPage() {
  const { openAuth } = useUI();
  const { user } = useAuth();
  const happy = isHappyHour();
  const codes = Object.entries(ORDERING.promoCodes);

  return (
    <div className="pb-28">
      <section className="relative bg-forest text-cream overflow-hidden">
        <img src="/images/food/cosmopolitan.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/80 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 py-20 max-w-2xl">
          <span className="inline-flex items-center gap-2 bg-sun text-forest rounded-full px-3 py-1 text-xs font-extrabold">
            <Martini className="w-3.5 h-3.5" /> {happy ? 'ON RIGHT NOW' : SITE.happyHour.label.toUpperCase()}
          </span>
          <h1 className="font-bebas text-7xl sm:text-9xl tracking-wide leading-[0.85] mt-5">Happy<br /><span className="text-leaf">Hour</span></h1>
          <p className="text-cream/75 mt-4 text-lg max-w-md">Weekdays, 5 to 7 PM, in the garden. Ask your server for today’s Happy Hour prices.</p>
          <Link to="/menu#COCKTAILS" className="mt-8 inline-flex items-center gap-2 bg-leaf text-forest px-7 py-3.5 rounded-full font-extrabold">
            See the bar <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
        <h2 className="font-bebas text-5xl tracking-wide text-forest mb-6">Kocktails</h2>
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-5">
          {MENU_ITEMS.filter((i) => i.category === 'COCKTAILS').slice(0, 8).map((i) => <MenuCard key={i.id} item={i} />)}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-8 grid md:grid-cols-3 gap-5">
        <div className="rounded-[2rem] bg-sun p-8 text-forest">
          <Baby className="w-9 h-9" />
          <h3 className="font-bebas text-4xl tracking-wide mt-4 leading-none">Kids meals include squash</h3>
          <p className="text-sm mt-2 text-forest/80">Every Kids Corner meal comes with a glass of squash.</p>
          <Link to="/menu#KIDS" className="inline-block mt-5 font-extrabold text-sm">Kids Corner →</Link>
        </div>
        <div className="rounded-[2rem] bg-forest text-cream p-8">
          <Gift className="w-9 h-9 text-leaf" />
          <h3 className="font-bebas text-4xl tracking-wide mt-4 leading-none">Kijani Rewards</h3>
          <p className="text-sm mt-2 text-cream/70">Points on every online order. Redeem them for money off.</p>
          {user ? (
            <Link to="/account?tab=rewards" className="inline-block mt-5 font-extrabold text-sm text-leaf">You have {user.points} pts →</Link>
          ) : (
            <button onClick={() => openAuth('signup')} className="mt-5 font-extrabold text-sm text-leaf">Join free →</button>
          )}
        </div>
        {codes.map(([code, { label }]) => (
          <div key={code} className="rounded-[2rem] bg-paper border-2 border-dashed border-ember p-8">
            <Tag className="w-9 h-9 text-ember" />
            <h3 className="font-bebas text-4xl tracking-wide mt-4 leading-none text-forest">{label}</h3>
            <p className="text-sm mt-2 text-ink/60">Use code at checkout:</p>
            <p className="inline-block mt-2 font-mono font-extrabold text-lg bg-ember/10 text-ember px-3 py-1 rounded-lg">{code}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
