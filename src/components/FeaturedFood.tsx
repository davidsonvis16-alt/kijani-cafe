import React from 'react';
import { Sparkles, Utensils, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export const FeaturedFood: React.FC = () => {
  return (
    <section className="py-20 bg-[#173F2A] text-[#F5F0E6] relative overflow-hidden">
      {/* Background Decorative Gradient Light Accent */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#2F6B3F]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#6B4A32]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-[#2F6B3F]/40 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-[1px] bg-[#B84A32]" />
              <span className="text-[12px] font-bold tracking-[0.3em] uppercase text-[#B84A32]">
                Signature Kitchen Creations
              </span>
            </div>
            <h2 className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl text-[#F5F0E6] tracking-tight">
              MADE FOR <br className="hidden sm:block" />
              <span className="italic font-serif font-normal text-[#A9B99B]">HUNGRY PEOPLE.</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm sm:text-base text-[#F5F0E6]/80 leading-relaxed mb-4 font-light">
              Bold marinades, open charcoal flames, fresh local Nakuru produce, and recipes built to satisfy.
            </p>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#A9B99B] hover:text-white uppercase tracking-widest group transition-colors"
            >
              <span>BROWSE ALL SIGNATURE DISHES</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Asymmetrical Assembled Food Advertising Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Hero Featured Dish (Left side - Large) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 relative group"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#2F6B3F]/40 bg-[#2F6B3F]">
              <img
                src="/images/menu/menu-item-9.jpg"
                alt="Flame-Grilled Peri Chicken & Masala Chips"
                className="w-full h-[400px] sm:h-[500px] object-cover img-zoom-hover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Text Badge Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-2">
                <span className="bg-[#B84A32] text-white text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full uppercase inline-block mb-2">
                  HOUSE SPECIALTY
                </span>
                <h3 className="font-serif font-extrabold text-2xl sm:text-3xl text-white mb-2">
                  Flame-Grilled Peri Chicken Platter
                </h3>
                <p className="text-xs text-white/80 max-w-lg mb-4 font-light">
                  Marinated overnight in secret African bird's eye chili & garlic herb marinade, charred over sweetwood coals.
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-2xl text-[#B84A32]">KES 1,250</span>
                  <Link
                    to="/menu"
                    className="bg-[#173F2A] hover:bg-[#2F6B3F] text-white px-5 py-2.5 text-xs font-bold tracking-widest uppercase transition-colors"
                  >
                    ORDER NOW
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Supporting Asymmetrical Grid (Right side - 4 dish cards) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            
            {/* Dish 1: Masala Chips */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-[#2F6B3F]/30 p-3 border border-[#2F6B3F]/40 hover:border-[#A9B99B] transition-all group cursor-pointer"
              >
              <div className="overflow-hidden aspect-square mb-2.5 bg-black/20 relative">
                  <img
                     src="/images/menu/menu-item-4.jpg"
                    alt="Famous Kijani Masala Chips"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
              </div>
              <h4 className="font-serif font-bold text-sm text-[#F5F0E6] line-clamp-1">Famous Masala Chips</h4>
              <p className="text-[11px] text-[#B84A32] font-black mt-0.5">KES 400</p>
            </motion.div>

            {/* Dish 2: Kijani Burger */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-[#2F6B3F]/30 p-3 border border-[#2F6B3F]/40 hover:border-[#A9B99B] transition-all group cursor-pointer"
              >
              <div className="overflow-hidden aspect-square mb-2.5 bg-black/20 relative">
                  <img
                     src="/images/menu/menu-item-1.jpg"
                    alt="Kijani Gourmet Burger"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
              </div>
              <h4 className="font-serif font-bold text-sm text-[#F5F0E6] line-clamp-1">Gourmet Beef Burger</h4>
              <p className="text-[11px] text-[#B84A32] font-black mt-0.5">KES 850</p>
            </motion.div>

            {/* Dish 3: Lake Tilapia */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-[#2F6B3F]/30 p-3 border border-[#2F6B3F]/40 hover:border-[#A9B99B] transition-all group cursor-pointer"
              >
              <div className="overflow-hidden aspect-square mb-2.5 bg-black/20 relative">
                  <img
                     src="/images/menu/menu-item-11.jpg"
                    alt="Whole Lake Victoria Tilapia"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
              </div>
              <h4 className="font-serif font-bold text-sm text-[#F5F0E6] line-clamp-1">Lake Victoria Tilapia</h4>
              <p className="text-[11px] text-[#B84A32] font-black mt-0.5">KES 1,100</p>
            </motion.div>

            {/* Dish 4: Tropical Smoothie */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-[#2F6B3F]/30 p-3 border border-[#2F6B3F]/40 hover:border-[#A9B99B] transition-all group cursor-pointer"
              >
              <div className="overflow-hidden aspect-square mb-2.5 bg-black/20 relative">
                  <img
                     src="/images/drinks/drink-2.jpg"
                    alt="Mango & Pineapple Smoothie"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
              </div>
              <h4 className="font-serif font-bold text-sm text-[#F5F0E6] line-clamp-1">Tropical Mango Smoothie</h4>
              <p className="text-[11px] text-[#B84A32] font-black mt-0.5">KES 400</p>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};
