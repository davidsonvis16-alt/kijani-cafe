import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2, Cake } from 'lucide-react';
import { useUI } from '../../contexts/UIContext';
import { useCart } from '../../contexts/CartContext';
import { OrderModeSwitch } from '../layout/OrderModeSwitch';
import { MENU_ITEMS } from '../../data/menuData';
import { ORDERING } from '../../data/site';
import { describeSelections, lineTotal } from '../../lib/pricing';
import { ksh } from '../../lib/format';

export function CartDrawer() {
  const { cartOpen, setCartOpen, openItem } = useUI();
  const { lines, subtotal, count, updateQuantity, removeLine, mode } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setCartOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [cartOpen, setCartOpen]);

  const hasDessert = lines.some((l) => l.item.category === 'DESSERTS');
  const dessertUpsell = MENU_ITEMS.filter((i) => i.category === 'DESSERTS');
  const deliveryShort = mode === 'DELIVERY' && subtotal < ORDERING.delivery.minOrder;

  return (
    <AnimatePresence>
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Your bag">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            className="relative w-full max-w-md h-full bg-cream flex flex-col shadow-2xl"
          >
            <div className="bg-forest text-cream px-6 pt-6 pb-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bebas text-4xl tracking-wide leading-none">Your Bag</h2>
                  <p className="text-xs text-sage font-semibold mt-1">{count} {count === 1 ? 'item' : 'items'}</p>
                </div>
                <button onClick={() => setCartOpen(false)} aria-label="Close bag" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <OrderModeSwitch dark className="w-full justify-between" />
            </div>

            {lines.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
                <div className="w-20 h-20 rounded-full bg-forest/5 grid place-items-center mb-4">
                  <ShoppingBag className="w-9 h-9 text-forest/40" />
                </div>
                <h3 className="font-bebas text-3xl text-forest tracking-wide">Your bag is hungry</h3>
                <p className="text-sm text-ink/60 mt-1 mb-6">Add something delicious from the menu to get started.</p>
                <button
                  onClick={() => {
                    setCartOpen(false);
                    navigate('/menu');
                  }}
                  className="bg-ember text-white px-6 py-3 rounded-full font-extrabold text-sm"
                >
                  Browse the menu
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-5 space-y-3">
                  {lines.map((line) => (
                    <div key={line.key} className="flex gap-3 bg-paper rounded-2xl p-3 border border-forest/10">
                      <img src={line.item.image} alt="" className="w-20 h-20 rounded-xl object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2">
                          <h3 className="font-extrabold text-sm text-forest flex-1 leading-snug">{line.item.name}</h3>
                          <button onClick={() => removeLine(line.key)} aria-label={`Remove ${line.item.name}`} className="text-ink/35 hover:text-ember">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        {describeSelections(line.item, line.selections) && (
                          <p className="text-[11px] text-ink/55 mt-0.5 line-clamp-2">{describeSelections(line.item, line.selections)}</p>
                        )}
                        {line.note && <p className="text-[11px] italic text-earth mt-0.5 line-clamp-1">“{line.note}”</p>}
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-bebas text-xl text-forest tracking-wide">{ksh(lineTotal(line))}</span>
                          <div className="flex items-center gap-1 bg-forest/5 rounded-full p-0.5">
                            <button onClick={() => updateQuantity(line.key, -1)} aria-label="Decrease" className="w-7 h-7 rounded-full grid place-items-center hover:bg-white">
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-6 text-center text-sm font-extrabold">{line.quantity}</span>
                            <button onClick={() => updateQuantity(line.key, 1)} aria-label="Increase" className="w-7 h-7 rounded-full grid place-items-center hover:bg-white">
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {!hasDessert && (
                    <div className="rounded-2xl bg-sun/25 border border-sun p-4">
                      <p className="flex items-center gap-2 font-extrabold text-sm text-forest">
                        <Cake className="w-4 h-4" /> Remember to make room for dessert
                      </p>
                      <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar">
                        {dessertUpsell.map((d) => (
                          <button key={d.id} onClick={() => openItem(d)} className="shrink-0 flex items-center gap-2 bg-paper rounded-full pr-3">
                            <img src={d.image} alt="" className="w-9 h-9 rounded-full object-cover" />
                            <span className="text-xs font-bold">{d.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-paper border-t border-forest/10 p-5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-ink/60 font-semibold">Subtotal</span>
                    <span className="font-extrabold">{ksh(subtotal)}</span>
                  </div>
                  {deliveryShort && (
                    <p className="text-xs text-ember font-semibold">
                      Add {ksh(ORDERING.delivery.minOrder - subtotal)} more for delivery, or switch to pickup.
                    </p>
                  )}
                  <button
                    disabled={deliveryShort}
                    onClick={() => {
                      setCartOpen(false);
                      navigate('/checkout');
                    }}
                    className="w-full flex items-center justify-between bg-ember disabled:bg-ink/30 hover:bg-[#c94220] text-white rounded-full pl-6 pr-2 py-2 font-extrabold transition-colors"
                  >
                    <span>Checkout</span>
                    <span className="flex items-center gap-2 bg-white/15 rounded-full px-4 py-2.5">
                      {ksh(subtotal)} <ArrowRight className="w-4 h-4" />
                    </span>
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
