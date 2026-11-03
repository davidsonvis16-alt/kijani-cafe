import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 group" aria-label="Kijani Kafe home">
      <span className="relative w-11 h-11 rounded-full bg-kijani text-white grid place-items-center shadow-[inset_0_-3px_0_rgba(0,0,0,0.25)] group-hover:rotate-[-8deg] transition-transform">
        <span className="font-bebas text-2xl leading-none translate-y-[1px]">K</span>
        <Leaf className="absolute -top-1 -right-1 w-4 h-4 text-leaf fill-leaf" />
      </span>
      <span className="leading-none">
        <span className={`font-bebas text-[1.7rem] tracking-wide block ${light ? 'text-cream' : 'text-forest'}`}>KIJANI KAFE</span>
        <span className={`text-[9px] tracking-[0.3em] font-bold uppercase block -mt-0.5 ${light ? 'text-sage' : 'text-earth'}`}>
          Bar & Restaurant
        </span>
      </span>
    </Link>
  );
}
