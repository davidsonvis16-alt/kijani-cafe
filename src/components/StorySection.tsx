import React from 'react';
import { Sparkles, Compass, Heart, TreePine } from 'lucide-react';
import { motion } from 'motion/react';

interface StorySectionProps {
  onOpenReservation: () => void;
}

export const StorySection: React.FC<StorySectionProps> = ({ onOpenReservation }) => {
  return (
    <section id="story" className="py-20 bg-[#F5F0E6] relative scroll-mt-10 overflow-hidden border-b border-[#173F2A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Large Garden & Atmosphere Photograph */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#173F2A]">
              <img
                 src="/interior-night-ambient-lighting.jpeg"
                alt="Kijani Kafe Lush Garden Sanctuary in Milimani, Nakuru"
                className="w-full h-[400px] sm:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#173F2A]/60 via-transparent to-transparent pointer-events-none" />

              {/* Overlapping Badge */}
              <div className="absolute top-6 right-6 bg-[#2F6B3F] text-white px-4 py-2 rounded-2xl text-xs font-bold tracking-widest uppercase shadow-md flex items-center gap-1.5">
                <TreePine className="w-4 h-4 text-[#A9B99B]" /> MILIMANI SANCTUARY
              </div>
            </div>

            {/* Overlapping Accent Card */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 bg-[#173F2A] text-white p-6 rounded-3xl shadow-2xl max-w-xs border border-[#2F6B3F]">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#A9B99B] block mb-1">
                OUR PHILOSOPHY
              </span>
              <p className="font-display font-bold text-sm text-[#F5F0E6] leading-snug">
                "We built Kijani so you could pause the clock, breathe fresh Nakuru air, and share great food."
              </p>
            </div>
          </motion.div>

          {/* RIGHT: Story Editorial Text */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[1px] bg-[#B84A32]" />
              <span className="text-[12px] font-bold tracking-[0.3em] uppercase text-[#B84A32]">
                The Kijani Story
              </span>
            </div>

            <h2 className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl text-[#173F2A] tracking-tight mb-6 leading-tight">
              SMALL PLACE. <br />
              <span className="italic font-serif font-normal text-[#2F6B3F]">BIG ESCAPE.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#173F2A]/80 leading-relaxed font-light mb-6">
              Tucked into the lush, tree-lined avenue of Menengai Drive in Milimani, Nakuru — <strong>Kijani Kafe</strong> was created as a sanctuary from the urban rush.
            </p>

            <p className="text-sm sm:text-base text-[#173F2A]/70 leading-relaxed mb-8 font-light">
              Whether you come for an early morning espresso under the trees, a long leisurely lunch with family, or evening flame-grilled meats with cold craft drinks — Kijani is designed for slow moments, deep conversations, and genuine hospitality.
            </p>

            {/* Key Pillars Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-white border border-[#2F6B3F]/10 shadow-sm">
                <div className="w-8 h-8 bg-[#2F6B3F]/10 text-[#2F6B3F] flex items-center justify-center mb-2">
                  <TreePine className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-sm text-[#173F2A]">Lush Garden Canopy</h4>
                <p className="text-xs text-[#173F2A]/70 mt-1">Shaded seating under mature trees & flowerbeds.</p>
              </div>

              <div className="p-4 bg-white border border-[#2F6B3F]/10 shadow-sm">
                <div className="w-8 h-8 bg-[#2F6B3F]/10 text-[#2F6B3F] flex items-center justify-center mb-2">
                  <Heart className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-sm text-[#173F2A]">Warm Hospitality</h4>
                <p className="text-xs text-[#173F2A]/70 mt-1">Attentive service where every guest feels at home.</p>
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <button
                onClick={onOpenReservation}
                className="bg-[#173F2A] hover:bg-[#2F6B3F] text-white px-9 py-4 text-[12px] font-bold tracking-widest uppercase inline-flex items-center gap-3 shadow-xl transition-all"
              >
                <Compass className="w-4 h-4 text-[#A9B99B]" />
                <span>DISCOVER KIJANI KAFE</span>
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
