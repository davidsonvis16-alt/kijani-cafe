import React from 'react';
import { MenuItem } from '../types';
import { Plus, Minus, Flame, Clock, Eye } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  item: MenuItem;
  cartQuantity: number;
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onViewDetails: (item: MenuItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  item,
  cartQuantity,
  onAddToCart,
  onUpdateQuantity,
  onViewDetails,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl overflow-hidden border border-[#173F2A]/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group h-full relative"
    >
      {/* Top Image Container */}
      <div className="relative w-full aspect-[4/3] bg-[#173F2A]/5 overflow-hidden cursor-pointer" onClick={() => onViewDetails(item)}>
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover img-zoom-hover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white text-xs font-bold flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <Eye className="w-3.5 h-3.5 text-[#A9B99B]" /> Quick View
          </span>
        </div>

        {/* Optional Tag Badges */}
        {item.tag && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`text-[10px] font-extrabold tracking-wider px-3 py-1 rounded-full uppercase shadow-md ${
                item.tag === 'BEST SELLER'
                  ? 'bg-[#B84A32] text-white'
                  : item.tag === 'POPULAR'
                  ? 'bg-[#173F2A] text-white'
                  : item.tag === 'CHEF SPECIAL'
                  ? 'bg-[#2F6B3F] text-white'
                  : 'bg-[#6B4A32] text-white'
              }`}
            >
              {item.tag}
            </span>
          </div>
        )}

        {/* Spicy / Prep Time Badges */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          {item.isSpicy && (
            <span className="bg-red-600/90 text-white p-1.5 rounded-full shadow-sm" title="Spicy Dish">
              <Flame className="w-3.5 h-3.5" />
            </span>
          )}
          {item.prepTime && (
            <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#A9B99B]" /> {item.prepTime}
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-grow justify-between bg-white border-t border-[#2F6B3F]/10">
        <div>
          {/* Product Name in Editorial Serif */}
          <h3 
            onClick={() => onViewDetails(item)}
            className="font-serif font-bold text-lg text-[#173F2A] hover:text-[#2F6B3F] transition-colors leading-snug cursor-pointer line-clamp-1 mb-1.5"
          >
            {item.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-[#20221F]/70 line-clamp-2 leading-relaxed mb-4 min-h-[32px]">
            {item.description}
          </p>
        </div>

        {/* Bottom Price & ADD Controls */}
        <div className="pt-3 border-t border-[#2F6B3F]/10 flex items-center justify-between gap-2 mt-auto">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#173F2A]/60 block leading-none tracking-widest">Price</span>
            <span className="font-bold text-lg text-[#B84A32] tracking-tight">
              KES {item.price.toLocaleString()}
            </span>
          </div>

          {/* ADD Button or Quantity Counter */}
          {cartQuantity === 0 ? (
            <button
              onClick={() => onAddToCart(item)}
              className="bg-[#173F2A] hover:bg-[#2F6B3F] text-white px-4 py-2.5 text-[11px] font-bold tracking-widest uppercase flex items-center gap-1.5 shadow-sm transition-all duration-300"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>ADD</span>
            </button>
          ) : (
            <div className="flex items-center bg-[#173F2A] text-white p-1 shadow-md">
              <button
                onClick={() => onUpdateQuantity(item.id, -1)}
                className="w-6 h-6 bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors text-white"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="px-2.5 text-xs font-black text-[#F5F0E6] min-w-[20px] text-center">
                {cartQuantity}
              </span>
              <button
                onClick={() => onUpdateQuantity(item.id, 1)}
                className="w-6 h-6 bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors text-white"
                aria-label="Increase quantity"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
