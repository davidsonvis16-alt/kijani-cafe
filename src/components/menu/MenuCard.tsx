import React from 'react';
import { Plus, Flame, Leaf, Heart } from 'lucide-react';
import { MenuItem } from '../../types';
import { useUI } from '../../contexts/UIContext';
import { useAuth } from '../../contexts/AuthContext';
import { ksh } from '../../lib/format';
import { hasPriceRange } from '../../lib/pricing';
import { cn } from '../../lib/utils';

const TAG_STYLES: Record<string, string> = {
  'BEST SELLER': 'bg-ember text-white',
  POPULAR: 'bg-sun text-forest',
  NEW: 'bg-leaf text-forest',
  'CHEF SPECIAL': 'bg-forest text-leaf',
};

export function MenuCard({ item, variant = 'grid' }: { item: MenuItem; variant?: 'grid' | 'rail' }) {
  const { openItem, openAuth, toast } = useUI();
  const { user, toggleFavourite } = useAuth();
  const fav = !!user?.favourites.includes(item.id);

  const onFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      openAuth('signin');
      return;
    }
    toast(toggleFavourite(item.id) ? `Saved ${item.name} to favourites` : `Removed ${item.name} from favourites`);
  };

  return (
    <article
      onClick={() => openItem(item)}
      className={cn(
        'group relative bg-paper rounded-3xl overflow-hidden border border-forest/10 hover:border-forest/25 hover:shadow-[0_18px_40px_-20px_rgba(14,42,28,0.45)] transition-all cursor-pointer flex flex-col',
        variant === 'rail' && 'w-[260px] sm:w-[280px] shrink-0 snap-start',
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-forest/5">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {item.tag && (
          <span className={cn('absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wider', TAG_STYLES[item.tag])}>
            {item.tag}
          </span>
        )}
        <button
          onClick={onFav}
          aria-label={fav ? `Remove ${item.name} from favourites` : `Save ${item.name} to favourites`}
          aria-pressed={fav}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-paper/90 backdrop-blur grid place-items-center text-forest hover:scale-110 transition-transform"
        >
          <Heart className={cn('w-4 h-4', fav && 'fill-ember text-ember')} />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start gap-2">
          <h3 className="font-extrabold text-[15px] leading-snug text-forest flex-1">{item.name}</h3>
          <span className="flex gap-1 pt-0.5">
            {item.isSpicy && <Flame className="w-4 h-4 text-ember" aria-label="Spicy" />}
            {item.isVegetarian && <Leaf className="w-4 h-4 text-kijani" aria-label="Vegetarian" />}
          </span>
        </div>
        <p className="text-[13px] text-ink/60 mt-1 line-clamp-2 flex-1">{item.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="font-bebas text-2xl tracking-wide text-forest">
            {hasPriceRange(item) && <span className="text-xs font-sans font-bold text-ink/50 mr-1 align-middle">FROM</span>}
            {ksh(item.price)}
          </span>
          <span
            className="w-10 h-10 rounded-full bg-forest text-leaf grid place-items-center group-hover:bg-ember group-hover:text-white group-hover:rotate-90 transition-all"
            aria-hidden
          >
            <Plus className="w-5 h-5" strokeWidth={3} />
          </span>
        </div>
      </div>
    </article>
  );
}
