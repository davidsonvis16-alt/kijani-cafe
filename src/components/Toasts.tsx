import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { useUI } from '../contexts/UIContext';

export function Toasts() {
  const { toasts, setCartOpen } = useUI();
  return (
    <div className="fixed z-[80] bottom-20 lg:bottom-6 left-1/2 -translate-x-1/2 flex flex-col gap-2 w-[min(92vw,380px)]" aria-live="polite">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.button
            key={t.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            onClick={() => t.image && setCartOpen(true)}
            className="flex items-center gap-3 bg-forest text-cream rounded-2xl p-2.5 pr-4 shadow-2xl text-left"
          >
            {t.image ? (
              <img src={t.image} alt="" className="w-11 h-11 rounded-xl object-cover" />
            ) : (
              <CheckCircle2 className="w-6 h-6 text-leaf ml-1.5" />
            )}
            <span className="text-sm font-semibold flex-1">{t.message}</span>
            {t.image && <span className="text-xs font-extrabold text-leaf">VIEW BAG</span>}
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}
