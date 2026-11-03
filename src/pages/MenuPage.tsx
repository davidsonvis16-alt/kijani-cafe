import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Flame, Leaf, Heart, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menuData';
import { MenuCard } from '../components/menu/MenuCard';
import { OrderModeSwitch } from '../components/layout/OrderModeSwitch';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useUI } from '../contexts/UIContext';
import { CategoryId } from '../types';
import { ksh } from '../lib/format';
import { cn } from '../lib/utils';

type Filter = 'veg' | 'spicy' | 'fav';

export default function MenuPage() {
  const { user } = useAuth();
  const { count, subtotal } = useCart();
  const { setCartOpen, openAuth } = useUI();
  const { hash } = useLocation();
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<Filter[]>([]);
  const [active, setActive] = useState<CategoryId>(MENU_CATEGORIES[0].id);
  const tabsRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (f: Filter) => {
    if (f === 'fav' && !user) return openAuth('signin');
    setFilters((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));
  };

  const sections = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MENU_CATEGORIES.map((cat) => ({
      cat,
      items: MENU_ITEMS.filter(
        (i) =>
          i.category === cat.id &&
          (!q || i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)) &&
          (!filters.includes('veg') || i.isVegetarian) &&
          (!filters.includes('spicy') || i.isSpicy) &&
          (!filters.includes('fav') || user?.favourites.includes(i.id)),
      ),
    })).filter((s) => s.items.length > 0);
  }, [query, filters, user]);

  // Scroll-spy: highlight the category currently in view.
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.cat.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id as CategoryId);
      },
      { rootMargin: '-160px 0px -60% 0px' },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [sections]);

  // Keep the active tab visible in the horizontal tab strip.
  useEffect(() => {
    const tab = tabsRef.current?.querySelector<HTMLElement>(`[data-cat="${active}"]`);
    tab?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [active]);

  const jump = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 140, behavior: 'smooth' });
  };

  useEffect(() => {
    if (hash) window.setTimeout(() => jump(hash.slice(1)), 50);
  }, [hash]);

  return (
    <div className="pb-24">
      <section className="relative bg-forest text-cream overflow-hidden">
        <img src="/images/food/spread.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/85 to-forest/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
          <p className="text-xs font-extrabold tracking-[0.25em] text-leaf uppercase">Order online</p>
          <h1 className="font-bebas text-7xl sm:text-8xl tracking-wide leading-[0.85] mt-2">The Menu</h1>
          <p className="text-cream/70 mt-3 max-w-md">Everything cooked fresh to order. Tap any dish to customise it.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center">
            <OrderModeSwitch dark />
          </div>
        </div>
      </section>

      {/* Sticky toolbar */}
      <div className="sticky top-[72px] z-30 bg-cream/95 backdrop-blur border-b border-forest/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-3 pb-2 flex flex-col md:flex-row gap-3 md:items-center">
          <label className="relative flex-1 md:max-w-xs">
            <span className="sr-only">Search the menu</span>
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search burgers, chips, mojito…"
              className="w-full bg-paper rounded-full pl-11 pr-10 py-2.5 text-sm border border-forest/10 focus:outline-none focus:border-forest"
            />
            {query && (
              <button onClick={() => setQuery('')} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-ink/40">
                <X className="w-4 h-4" />
              </button>
            )}
          </label>
          <div className="flex gap-2">
            {([
              { id: 'veg', label: 'Vegetarian', icon: Leaf },
              { id: 'spicy', label: 'Spicy', icon: Flame },
              { id: 'fav', label: 'Favourites', icon: Heart },
            ] as const).map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => toggleFilter(id)}
                aria-pressed={filters.includes(id)}
                className={cn(
                  'flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold border transition-colors',
                  filters.includes(id) ? 'bg-forest text-leaf border-forest' : 'bg-paper border-forest/10 text-ink/70 hover:border-forest/30',
                )}
              >
                <Icon className="w-3.5 h-3.5" /> {label}
              </button>
            ))}
          </div>
        </div>
        <div ref={tabsRef} className="max-w-7xl mx-auto px-4 sm:px-8 flex gap-1 overflow-x-auto no-scrollbar pb-2">
          {sections.map(({ cat }) => (
            <button
              key={cat.id}
              data-cat={cat.id}
              onClick={() => jump(cat.id)}
              className={cn(
                'shrink-0 px-4 py-2 rounded-full font-bebas text-lg tracking-wide transition-colors',
                active === cat.id ? 'bg-ember text-white' : 'text-forest/70 hover:text-forest',
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {sections.length === 0 && (
          <div className="py-24 text-center">
            <p className="font-bebas text-4xl text-forest tracking-wide">Nothing matches that</p>
            <p className="text-ink/60 mt-2">Try another search or clear your filters.</p>
            <button onClick={() => { setQuery(''); setFilters([]); }} className="mt-6 bg-forest text-leaf px-6 py-3 rounded-full font-extrabold text-sm">
              Reset
            </button>
          </div>
        )}

        {sections.map(({ cat, items }, idx) => (
          <section key={cat.id} id={cat.id} className="pt-12 scroll-mt-40">
            {cat.group === 'BAR' && (idx === 0 || sections[idx - 1].cat.group !== 'BAR') && (
              <div className="mb-10 rounded-3xl bg-forest text-cream px-6 py-5 flex flex-wrap items-center justify-between gap-3">
                <p className="font-bebas text-3xl tracking-wide">The Bar <span className="text-leaf">· 18+ only</span></p>
                <p className="text-sm text-cream/70">Happy Hour Mon–Fri, 5–7 PM. ID may be requested.</p>
              </div>
            )}
            <div className="flex items-end gap-4 mb-6">
              <h2 className="font-bebas text-5xl tracking-wide text-forest leading-none">{cat.label}</h2>
              <p className="text-sm text-ink/50 pb-1">{cat.blurb}</p>
            </div>
            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {items.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}

        <p className="text-xs text-ink/50 mt-16 text-center">
          Extras: cheese {ksh(100)} · gravy {ksh(100)} · sauces {ksh(50)} (mayo, sweet chilli, tartare, tzatziki). Prices in Kenyan Shillings. Cakes subject to availability.
        </p>
      </div>

      {count > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          className="lg:hidden fixed bottom-[76px] inset-x-4 z-30 flex items-center justify-between bg-ember text-white rounded-full pl-5 pr-2 py-2 font-extrabold shadow-2xl"
        >
          <span className="flex items-center gap-2"><ShoppingBag className="w-5 h-5" /> View bag · {count}</span>
          <span className="flex items-center gap-1 bg-white/15 rounded-full px-4 py-2">{ksh(subtotal)} <ArrowRight className="w-4 h-4" /></span>
        </button>
      )}
    </div>
  );
}
