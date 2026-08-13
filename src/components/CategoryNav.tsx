import React from 'react';
import { CategoryId } from '../types';
import { MENU_CATEGORIES } from '../data/menuData';
import { 
  Utensils, 
  Egg, 
  Coffee, 
  Flame, 
  Sandwich, 
  CookingPot, 
  GlassWater, 
  IceCream,
  Smile
} from 'lucide-react';

interface CategoryNavProps {
  activeCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  const getCategoryIcon = (iconName: string) => {
      switch (iconName) {
        case 'Egg':
          return <Egg className="w-4 h-4" />;
        case 'Coffee':
          return <Coffee className="w-4 h-4" />;
        case 'Flame':
          return <Flame className="w-4 h-4" />;
        case 'Sandwich':
          return <Sandwich className="w-4 h-4" />;
        case 'CookingPot':
          return <CookingPot className="w-4 h-4" />;
        case 'GlassWater':
          return <GlassWater className="w-4 h-4" />;
        case 'IceCream':
          return <IceCream className="w-4 h-4" />;
        case 'Smile':
          return <Smile className="w-4 h-4" />;
        default:
          return <Utensils className="w-4 h-4" />;
      }
  };

  return (
    <div className="w-full">
      {/* Search Input Bar */}
      <div className="mb-8 max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search menu items (e.g. Masala Chips, Chicken, Mojito)..."
            className="w-full bg-white border border-[#173F2A]/20 rounded-full py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-[#2F6B3F] focus:ring-2 focus:ring-[#2F6B3F]/20 shadow-sm transition-all"
          />
          <Utensils className="w-4 h-4 text-[#2F6B3F] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#6B4A32] hover:text-[#173F2A]"
            >
              CLEAR
            </button>
          )}
        </div>
      </div>

      {/* Horizontal Category Navigation with Editorial Terracotta Accent */}
      <div className="relative border-b border-[#2F6B3F]/15 pb-2">
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-2 px-1">
          {MENU_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase whitespace-nowrap transition-all duration-300 flex-shrink-0 pb-1.5 ${
                  isActive
                    ? 'text-[#173F2A] border-b-2 border-[#B84A32]'
                    : 'text-[#173F2A]/50 hover:text-[#173F2A] hover:opacity-100'
                }`}
              >
                <span className={isActive ? 'text-[#B84A32]' : 'text-[#173F2A]/40'}>
                  {getCategoryIcon(cat.iconName)}
                </span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
