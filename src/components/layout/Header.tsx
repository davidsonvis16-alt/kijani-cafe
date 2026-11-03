import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Phone, ShoppingBag, User as UserIcon, Menu as MenuIcon, X, CalendarDays, Martini } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';
import { OrderModeSwitch } from './OrderModeSwitch';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useUI } from '../../contexts/UIContext';
import { useReservation } from '../../contexts/ReservationContext';
import { SITE } from '../../data/site';
import { openStatus, isHappyHour } from '../../lib/hours';
import { ksh } from '../../lib/format';
import { cn } from '../../lib/utils';

export const NAV_LINKS = [
  { name: 'Menu', to: '/menu' },
  { name: 'Deals', to: '/deals' },
  { name: 'Experience', to: '/experience' },
  { name: 'Gallery', to: '/gallery' },
  { name: 'Our Story', to: '/story' },
  { name: 'Visit', to: '/contact' },
];

export function Header() {
  const { count, subtotal } = useCart();
  const { user } = useAuth();
  const { setCartOpen, openAuth } = useUI();
  const { openReservation } = useReservation();
  const [drawer, setDrawer] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [status, setStatus] = useState(openStatus);
  const location = useLocation();

  useEffect(() => setDrawer(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const tick = window.setInterval(() => setStatus(openStatus()), 60000);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearInterval(tick);
    };
  }, []);

  const happy = isHappyHour();

  return (
    <>
      {/* Utility band */}
      <div className="bg-forest text-cream text-[11px] font-semibold">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-9 flex items-center justify-between gap-4">
          <span className="flex items-center gap-2">
            <span className={cn('w-2 h-2 rounded-full', status.open ? 'bg-leaf animate-pulse' : 'bg-ember')} />
            <span className="uppercase tracking-wider">{status.label}</span>
          </span>
          <Link to="/deals" className="hidden md:flex items-center gap-1.5 uppercase tracking-wider text-sun hover:text-white transition-colors">
            <Martini className="w-3.5 h-3.5" />
            {happy ? 'Happy Hour is ON right now' : SITE.happyHour.label}
          </Link>
          <a href={`tel:+${SITE.phoneIntl}`} className="flex items-center gap-1.5 hover:text-leaf transition-colors">
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{SITE.phoneDisplay}</span>
            <span className="sm:hidden">Call us</span>
          </a>
        </div>
      </div>

      <header
        className={cn(
          'sticky top-0 z-40 bg-paper/95 backdrop-blur-md transition-shadow',
          scrolled ? 'shadow-[0_8px_30px_-12px_rgba(14,42,28,0.35)]' : 'border-b border-forest/10',
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-[72px] flex items-center justify-between gap-4">
          <Logo />

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'px-3 py-2 rounded-full text-[13px] font-bold whitespace-nowrap transition-colors',
                    isActive ? 'bg-forest text-white' : 'text-ink/80 hover:text-forest hover:bg-forest/5',
                  )
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <OrderModeSwitch className="hidden 2xl:inline-flex" />

            <button
              onClick={openReservation}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full text-[13px] font-bold whitespace-nowrap text-forest hover:bg-forest/5"
            >
              <CalendarDays className="w-4 h-4" /> Book
            </button>

            {user ? (
              <Link
                to="/account"
                className="hidden sm:flex items-center gap-2 pl-1 pr-3 py-1 rounded-full hover:bg-forest/5"
                aria-label="Your account"
              >
                <span className="w-8 h-8 rounded-full bg-sun text-forest grid place-items-center font-extrabold text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <span className="text-[13px] font-bold text-forest leading-tight">
                  {user.name.split(' ')[0]}
                  <span className="block text-[10px] text-kijani font-extrabold">{user.points} pts</span>
                </span>
              </Link>
            ) : (
              <button
                onClick={() => openAuth('signin')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full text-[13px] font-bold whitespace-nowrap text-forest hover:bg-forest/5"
              >
                <UserIcon className="w-4 h-4" /> Sign in
              </button>
            )}

            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 bg-ember hover:bg-[#c94220] text-white pl-3.5 pr-4 py-2.5 rounded-full font-extrabold text-[13px] shadow-[0_6px_16px_-6px_rgba(226,81,43,0.8)] transition-colors"
              aria-label={`Open bag, ${count} items`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">{count > 0 ? ksh(subtotal) : 'Bag'}</span>
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.4 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 bg-forest text-leaf text-[10px] font-extrabold min-w-5 h-5 px-1 rounded-full grid place-items-center ring-2 ring-paper"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              onClick={() => setDrawer((d) => !d)}
              className="lg:hidden p-2 rounded-full text-forest hover:bg-forest/5"
              aria-label="Toggle navigation"
              aria-expanded={drawer}
            >
              {drawer ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {drawer && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden bg-forest text-cream"
            >
              <div className="px-5 py-6 space-y-5">
                <OrderModeSwitch dark className="w-full justify-between" />
                <nav className="grid grid-cols-2 gap-2" aria-label="Mobile">
                  {NAV_LINKS.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className={({ isActive }) =>
                        cn('font-bebas text-2xl tracking-wide px-4 py-3 rounded-2xl', isActive ? 'bg-leaf text-forest' : 'bg-white/5')
                      }
                    >
                      {link.name}
                    </NavLink>
                  ))}
                </nav>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={openReservation} className="py-3 rounded-full border border-cream/30 font-bold text-sm">
                    Book a table
                  </button>
                  {user ? (
                    <Link to="/account" className="py-3 rounded-full bg-sun text-forest font-extrabold text-sm text-center">
                      My account
                    </Link>
                  ) : (
                    <button onClick={() => openAuth('signin')} className="py-3 rounded-full bg-sun text-forest font-extrabold text-sm">
                      Sign in
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
