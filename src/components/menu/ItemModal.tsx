import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, Clock, Flame, Leaf, Check, ShieldAlert } from 'lucide-react';
import { useUI } from '../../contexts/UIContext';
import { useCart } from '../../contexts/CartContext';
import { MENU_ITEMS } from '../../data/menuData';
import { STORAGE_KEYS } from '../../data/site';
import { Selections, MenuItem } from '../../types';
import { defaultSelections, unitPrice } from '../../lib/pricing';
import { load, save } from '../../lib/storage';
import { ksh } from '../../lib/format';
import { cn } from '../../lib/utils';

export function ItemModal() {
  const { activeItem, closeItem } = useUI();
  return <AnimatePresence>{activeItem && <ItemSheet key={activeItem.id} item={activeItem} onClose={closeItem} />}</AnimatePresence>;
}

function ItemSheet({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const { addLine } = useCart();
  const { toast, openItem } = useUI();
  const [selections, setSelections] = useState<Selections>(() => defaultSelections(item));
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState('');
  const [ageOk, setAgeOk] = useState<boolean>(() => !item.isAlcohol || load(STORAGE_KEYS.ageOk, false));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const price = unitPrice(item, selections);
  const pairings = useMemo(() => {
    const ids = item.category === 'MAIN_MEALS' || item.category === 'STARTERS' ? ['s5', 'd1', 'dr7', 'c4'] : ['m4', 's5', 'd2'];
    return MENU_ITEMS.filter((i) => ids.includes(i.id) && i.id !== item.id).slice(0, 3);
  }, [item]);

  const toggle = (groupId: string, choiceId: string, single: boolean) =>
    setSelections((prev) => {
      const cur = prev[groupId] ?? [];
      if (single) return { ...prev, [groupId]: [choiceId] };
      return { ...prev, [groupId]: cur.includes(choiceId) ? cur.filter((c) => c !== choiceId) : [...cur, choiceId] };
    });

  const add = () => {
    addLine(item, selections, qty, note);
    toast(`${qty} × ${item.name} added to your bag`, item.image);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center" role="dialog" aria-modal="true" aria-label={item.name}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-ink/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="relative w-full sm:max-w-3xl max-h-[92vh] bg-paper rounded-t-[2rem] sm:rounded-[2rem] overflow-hidden flex flex-col sm:flex-row shadow-2xl"
      >
        <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-paper/90 grid place-items-center shadow">
          <X className="w-5 h-5" />
        </button>

        <div className="relative sm:w-[45%] h-56 sm:h-auto shrink-0 bg-forest">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent sm:hidden" />
        </div>

        <div className="flex-1 flex flex-col min-h-0">
          {!ageOk ? (
            <div className="p-8 flex flex-col items-center justify-center text-center flex-1">
              <ShieldAlert className="w-12 h-12 text-ember mb-4" />
              <h2 className="font-bebas text-4xl text-forest tracking-wide">Are you 18 or older?</h2>
              <p className="text-sm text-ink/60 mt-2 max-w-xs">
                Kenyan law prohibits the sale of alcohol to anyone under 18. ID may be checked on collection or at your table.
              </p>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    save(STORAGE_KEYS.ageOk, true);
                    setAgeOk(true);
                  }}
                  className="px-6 py-3 rounded-full bg-forest text-leaf font-extrabold text-sm"
                >
                  Yes, I’m 18+
                </button>
                <button onClick={onClose} className="px-6 py-3 rounded-full border border-forest/20 font-bold text-sm">
                  No
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="overflow-y-auto flex-1 p-6 sm:p-7 space-y-6">
                <div>
                  <div className="flex gap-2 mb-2 text-[11px] font-bold text-ink/50">
                    {item.prepTime && (
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {item.prepTime}</span>
                    )}
                    {item.isSpicy && <span className="flex items-center gap-1 text-ember"><Flame className="w-3.5 h-3.5" /> Spicy</span>}
                    {item.isVegetarian && <span className="flex items-center gap-1 text-kijani"><Leaf className="w-3.5 h-3.5" /> Vegetarian</span>}
                  </div>
                  <h2 className="font-bebas text-4xl sm:text-5xl tracking-wide text-forest leading-[0.95] pr-10">{item.name}</h2>
                  <p className="text-sm text-ink/70 mt-3 leading-relaxed">{item.description}</p>
                </div>

                {(item.options ?? []).map((group) => (
                  <fieldset key={group.id}>
                    <legend className="flex items-center justify-between w-full mb-2.5">
                      <span className="font-extrabold text-sm text-forest">{group.title}</span>
                      <span className={cn('text-[10px] font-extrabold tracking-wider px-2 py-0.5 rounded-full', group.required ? 'bg-forest text-leaf' : 'bg-forest/5 text-ink/50')}>
                        {group.required ? 'REQUIRED' : 'OPTIONAL'}
                      </span>
                    </legend>
                    <div className="space-y-1.5">
                      {group.choices.map((c) => {
                        const on = (selections[group.id] ?? []).includes(c.id);
                        const single = group.type === 'single';
                        return (
                          <button
                            key={c.id}
                            type="button"
                            role={single ? 'radio' : 'checkbox'}
                            aria-checked={on}
                            onClick={() => toggle(group.id, c.id, single)}
                            className={cn(
                              'w-full flex items-center gap-3 px-4 py-3 rounded-2xl border text-left text-sm transition-colors',
                              on ? 'border-forest bg-forest/[0.04]' : 'border-forest/10 hover:border-forest/30',
                            )}
                          >
                            <span
                              className={cn(
                                'w-5 h-5 grid place-items-center border-2 shrink-0',
                                single ? 'rounded-full' : 'rounded-md',
                                on ? 'bg-forest border-forest text-leaf' : 'border-forest/25',
                              )}
                            >
                              {on && <Check className="w-3 h-3" strokeWidth={4} />}
                            </span>
                            <span className="flex-1 font-semibold">{c.label}</span>
                            {!!c.delta && <span className="text-xs font-bold text-ink/60">+{ksh(c.delta)}</span>}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                ))}

                <div>
                  <label htmlFor="item-note" className="font-extrabold text-sm text-forest block mb-2">
                    Special instructions
                  </label>
                  <textarea
                    id="item-note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={2}
                    maxLength={140}
                    placeholder="Allergies, no onions, extra crispy…"
                    className="w-full rounded-2xl border border-forest/15 bg-white px-4 py-3 text-sm focus:outline-none focus:border-forest"
                  />
                </div>

                {pairings.length > 0 && (
                  <div>
                    <p className="font-extrabold text-sm text-forest mb-2.5">Goes great with</p>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar">
                      {pairings.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => openItem(p)}
                          className="flex items-center gap-2.5 shrink-0 pr-4 rounded-full bg-forest/5 hover:bg-forest/10"
                        >
                          <img src={p.image} alt="" className="w-11 h-11 rounded-full object-cover" />
                          <span className="text-left">
                            <span className="block text-xs font-bold text-forest">{p.name}</span>
                            <span className="block text-[11px] text-ink/60">{ksh(p.price)}</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 sm:p-5 border-t border-forest/10 bg-paper flex items-center gap-3">
                <div className="flex items-center gap-1 bg-forest/5 rounded-full p-1">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="w-9 h-9 rounded-full grid place-items-center hover:bg-white">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-7 text-center font-extrabold" aria-live="polite">{qty}</span>
                  <button onClick={() => setQty((q) => Math.min(20, q + 1))} aria-label="Increase quantity" className="w-9 h-9 rounded-full grid place-items-center hover:bg-white">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={add}
                  className="flex-1 flex items-center justify-between bg-ember hover:bg-[#c94220] text-white rounded-full pl-6 pr-2 py-2 font-extrabold text-sm transition-colors"
                >
                  <span>Add to bag</span>
                  <span className="bg-white/15 rounded-full px-4 py-2">{ksh(price * qty)}</span>
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
