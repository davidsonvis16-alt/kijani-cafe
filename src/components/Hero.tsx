import React from 'react';
import { ArrowRight, MapPin, Sparkles, Clock, Utensils } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative bg-[#F5F0E6] overflow-hidden pt-6 pb-16 lg:py-20 border-b border-[#173F2A]/10">
      {/* Decorative Subtle Leaf Pattern Background Effect */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#173F2A_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Editorial Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center"
          >
            {/* Top Tag Label with Terracotta Line Accent */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-[#B84A32]" />
              <span className="text-[12px] font-bold tracking-[0.3em] uppercase text-[#B84A32]">
                Milimani · Nakuru
              </span>
            </div>

            {/* Main Headline in Editorial Serif */}
            <h1 className="font-serif font-black text-4xl sm:text-5xl md:text-6xl xl:text-[72px] text-[#173F2A] leading-[0.92] tracking-tight mb-6">
              YOUR LITTLE <span className="italic font-serif font-normal text-[#2F6B3F]">ESCAPE</span> <br />
              IN THE HEART <br />
              OF NAKURU.
            </h1>

            {/* Supporting Copy */}
            <p className="max-w-md text-lg text-[#173F2A]/80 leading-relaxed font-light mb-8">
              Good food. Fresh air. Slow moments. Step into Milimani’s greenest garden café, bar and restaurant where nature meets premium hospitality.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link
                to="/menu"
                className="bg-[#173F2A] hover:bg-[#2F6B3F] text-white px-9 py-4 text-[12px] font-bold tracking-widest uppercase shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2.5"
              >
                <span>EXPLORE MENU</span>
                <ArrowRight className="w-4 h-4 text-[#A9B99B]" />
              </Link>

              <Link
                to="/contact"
                className="border border-[#173F2A] text-[#173F2A] hover:bg-[#173F2A] hover:text-white px-9 py-4 text-[12px] font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                <span>FIND US</span>
              </Link>
            </div>

            {/* Location & Quick Highlights Bar */}
            <div className="pt-6 border-t border-[#173F2A]/15 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-full bg-[#2F6B3F]/10 text-[#2F6B3F]">
                  <Utensils className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-bold text-[#173F2A]">Flame-Grilled</span>
                  <span className="text-[#6B4A32]">Local Ingredients</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-full bg-[#2F6B3F]/10 text-[#2F6B3F]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-bold text-[#173F2A]">Open Daily</span>
                  <span className="text-[#6B4A32]">10/12 AM - 11 PM</span>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5">
                <div className="p-2 rounded-full bg-[#2F6B3F]/10 text-[#2F6B3F]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-bold text-[#173F2A]">Menengai Drive</span>
                  <span className="text-[#6B4A32]">Milimani, Nakuru</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Realistic Food & Garden Photography Composition */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-6 xl:col-span-6 relative"
          >
            {/* Main Stage Image Frame */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#173F2A]">
              <img
                src="https://images.unsplash.com/photo-1643856557143-09189e523fd6?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2FyZGVuJTIwcmVzdGF1cmFudHxlbnwwfHwwfHwwfA%3D%3D"
                alt="Kijani Flame-Grilled Feast Platter with Fries & Dips"
                className="w-full h-[380px] sm:h-[480px] lg:h-[540px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#173F2A]/70 via-transparent to-transparent pointer-events-none" />

              {/* Floating Badge: TASTES LIKE HOME */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute bottom-6 right-6 bg-[#173F2A] text-white p-5 rounded-full w-28 h-28 sm:w-32 sm:h-32 flex flex-col items-center justify-center text-center shadow-xl border-2 border-[#A9B99B]"
              >
                <Sparkles className="w-4 h-4 text-[#A9B99B] mb-1" />
                <span className="font-bebas text-lg sm:text-xl tracking-wider leading-none text-[#F5F0E6]">TASTES LIKE</span>
                <span className="font-display font-extrabold text-xs tracking-wider text-[#A9B99B]">HOME</span>
                <span className="text-[9px] text-white/70 uppercase tracking-tight mt-0.5">MILIMANI NAKURU</span>
              </motion.div>

              {/* Floating Bottom Left Label in Editorial Badge Style */}
              <div className="absolute bottom-6 left-6 bg-white p-4 shadow-xl border border-[#2F6B3F]/10">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#B84A32] block">Signature Dish</span>
                <h3 className="text-base font-bold text-[#173F2A] font-serif">Spicy Wings & Chips</h3>
              </div>
            </div>

            {/* Small Overlapping Secondary Accent Photo */}
            <div className="hidden sm:block absolute -bottom-6 -left-6 w-36 h-36 lg:w-44 lg:h-44 rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white">
              <img
                src="https://images.unsplash.com/photo-1777370537280-94e8796c243a?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGdhcmRlbiUyMGNhZmV8ZW58MHx8MHx8fDA%3D"
                alt="Passion Fruit Virgin Mojito at Kijani Kafe"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-black/60 p-1.5 text-center">
                <span className="text-[10px] text-white font-bold tracking-wider uppercase">Passion Mojito</span>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
