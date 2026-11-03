import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, UtensilsCrossed, Tag, Receipt, User } from 'lucide-react';
import { cn } from '../../lib/utils';

const TABS = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/menu', label: 'Menu', icon: UtensilsCrossed },
  { to: '/deals', label: 'Deals', icon: Tag },
  { to: '/account?tab=orders', label: 'Orders', icon: Receipt, match: '/order' },
  { to: '/account', label: 'Account', icon: User, end: true },
];

export function MobileTabBar() {
  return (
    <nav
      aria-label="Quick navigation"
      className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-paper/95 backdrop-blur border-t border-forest/10 pb-[env(safe-area-inset-bottom)]"
    >
      <div className="grid grid-cols-5">
        {TABS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={label}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-bold',
                isActive && label !== 'Orders' ? 'text-kijani' : 'text-ink/55',
              )
            }
          >
            <Icon className="w-5 h-5" />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
