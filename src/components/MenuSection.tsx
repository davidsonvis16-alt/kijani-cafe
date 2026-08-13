import React, { useState, useMemo } from 'react';
import { CategoryId, MenuItem } from '../types';
import { MENU_ITEMS, MENU_CATEGORIES } from '../data/menuData';
import { CategoryNav } from './CategoryNav';
import { ProductCard } from './ProductCard';
import { Sparkles, Utensils, X, Plus, Clock, Flame, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MenuSectionProps {
  cartItems: { item: MenuItem; quantity: number }[];
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (itemId: string, delta: number) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  cartItems,
  onAddToCart,
  onUpdateQuantity,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModalItem, setSelectedModalItem] = useState<MenuItem | null>(null);

  // Filter items by category & search query
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'ALL' || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Map item IDs to cart quantity
  const cartQuantityMap = useMemo(() => {
    const map: Record<string, number> = {};
    cartItems.forEach((ci) => {
      map[ci.item.id] = ci.quantity;
    });
    return map;
  }, [cartItems]);

  const currentCategoryInfo = MENU_CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <section id="menu" className="py-20 bg-[#F5F0E6] relative scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-[1px] bg-[#B84A32]" />
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#B84A32]">
              Authentic Kitchen & Bar
            </span>
          </div>
          <h2 className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl text-[#173F2A] tracking-tight mb-4">
            COME <span className="italic font-serif font-normal text-[#2F6B3F]">HUNGRY.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#173F2A]/80 font-light max-w-xl mx-auto">
            From café favourites to flame-grilled meals and ice-cold refreshing drinks.
          </p>
        </div>

        {/* Category Filter Navigation */}
        <CategoryNav
          activeCategory={activeCategory}
          onSelectCategory={(id) => {
            setActiveCategory(id);
          }}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Category Description Banner */}
        {currentCategoryInfo && activeCategory !== 'ALL' && (
          <div className="my-6 px-6 py-4 rounded-2xl bg-[#173F2A] text-white flex items-center justify-between shadow-sm">
            <div>
              <span className="text-[10px] tracking-widest uppercase text-[#A9B99B] font-bold block">CATEGORY</span>
              <h3 className="font-display font-bold text-xl text-[#F5F0E6]">{currentCategoryInfo.label}</h3>
              <p className="text-xs text-white/80">{currentCategoryInfo.description}</p>
            </div>
            <span className="text-xs font-extrabold bg-[#2F6B3F] text-white px-3 py-1.5 rounded-full">
              {filteredItems.length} ITEMS
            </span>
          </div>
        )}

        {/* Product Cards Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
            {filteredItems.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                cartQuantity={cartQuantityMap[item.id] || 0}
                onAddToCart={onAddToCart}
                onUpdateQuantity={onUpdateQuantity}
                onViewDetails={(i) => setSelectedModalItem(i)}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-white/60 rounded-3xl border border-dashed border-[#173F2A]/20 my-8">
            <Utensils className="w-12 h-12 text-[#2F6B3F] mx-auto mb-3 opacity-40" />
            <h3 className="font-display font-bold text-xl text-[#173F2A]">No menu items found</h3>
            <p className="text-sm text-[#6B4A32] mt-1 max-w-sm mx-auto">
              Try searching for something else or switch categories above.
            </p>
            <button
              onClick={() => {
                setActiveCategory('ALL');
                setSearchQuery('');
              }}
              className="mt-4 bg-[#173F2A] text-white px-6 py-2.5 rounded-full text-xs font-bold tracking-wider hover:bg-[#2F6B3F] transition-colors"
            >
              SHOW ALL MENU ITEMS
            </button>
          </div>
        )}
      </div>

      {/* Item Detail Quick View Modal */}
      <AnimatePresence>
        {selectedModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative border border-[#173F2A]/10"
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setSelectedModalItem(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image */}
              <div className="relative h-64 bg-[#173F2A]">
                <img
                  src={selectedModalItem.image}
                  alt={selectedModalItem.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                {selectedModalItem.tag && (
                  <span className="absolute top-4 left-4 bg-[#B84A32] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase shadow-md">
                    {selectedModalItem.tag}
                  </span>
                )}

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-display font-extrabold text-2xl leading-tight">
                    {selectedModalItem.name}
                  </h3>
                  <p className="text-xs text-white/80 font-medium">Kijani Kafe Kitchen & Bar</p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <p className="text-sm text-[#20221F]/80 leading-relaxed mb-6">
                  {selectedModalItem.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-[#6B4A32] mb-6 border-y border-[#173F2A]/10 py-3">
                  {selectedModalItem.prepTime && (
                    <span className="flex items-center gap-1 font-semibold">
                      <Clock className="w-4 h-4 text-[#2F6B3F]" /> Est. {selectedModalItem.prepTime}
                    </span>
                  )}
                  {selectedModalItem.isSpicy && (
                    <span className="flex items-center gap-1 font-semibold text-red-600">
                      <Flame className="w-4 h-4" /> Mildly Spicy
                    </span>
                  )}
                  {selectedModalItem.isVegetarian && (
                    <span className="flex items-center gap-1 font-semibold text-green-700">
                      <Check className="w-4 h-4" /> Vegetarian Option
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#6B4A32] block">Total Price</span>
                    <span className="font-bebas text-3xl text-[#173F2A]">
                      KSh {selectedModalItem.price.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      onAddToCart(selectedModalItem);
                      setSelectedModalItem(null);
                    }}
                    className="bg-[#173F2A] hover:bg-[#2F6B3F] text-white px-6 py-3 rounded-full font-bold text-xs tracking-wider flex items-center gap-2 shadow-lg transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>ADD TO ORDER</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
