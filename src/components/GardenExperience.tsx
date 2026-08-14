import React from 'react';
import { 
  Trees, 
  Users, 
  Gamepad2, 
  CalendarDays, 
  Music, 
  Wind, 
  Sparkles 
} from 'lucide-react';
import { motion } from 'motion/react';

export const GardenExperience: React.FC = () => {
  const gardenBadges = [
    { label: 'OUTDOOR DINING', icon: Trees },
    { label: 'FAMILY FRIENDLY', icon: Users },
    { label: 'LRAWN & BOARD GAMES', icon: Gamepad2 },
    { label: 'EVENTS & PARTIES', icon: CalendarDays },
    { label: 'LIVE ACOUSTIC MUSIC', icon: Music },
    { label: 'PURE FRESH AIR', icon: Wind },
  ];

  return (
    <section id="experience" className="py-20 bg-[#F5F0E6] relative scroll-mt-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-[1px] bg-[#B84A32]" />
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#B84A32]">
              Milimani Garden Haven
            </span>
          </div>
          <h2 className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl text-[#173F2A] tracking-tight mb-4">
            COME FOR THE FOOD. <br />
            <span className="italic font-serif font-normal text-[#2F6B3F]">STAY FOR THE GARDEN.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#173F2A]/80 font-light max-w-xl mx-auto">
            Spacious lawns, towering indigenous shade trees, open breezes, and handcrafted garden seating.
          </p>
        </div>

        {/* Huge Immersive Garden Stage Frame */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#173F2A] mb-12"
        >
          <img
            src="https://images.unsplash.com/photo-1777370537280-94e8796c243a?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGdhcmRlbiUyMGNhZmV8ZW58MHx8MHx8fDA%3D"
            alt="Kijani Kafe Outdoor Garden Tables & Shaded Lawn Dining"
            className="w-full h-[450px] sm:h-[550px] lg:h-[620px] object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Bottom Banner inside Image */}
          <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 flex flex-col md:flex-row md:items-end justify-between gap-6 text-white">
            <div className="max-w-xl">
              <span className="text-xs uppercase tracking-widest text-[#A9B99B] font-extrabold block mb-1">
                MILIMANI, NAKURU
              </span>
              <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white leading-tight">
                A place where hours melt away seamlessly.
              </h3>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-xs text-white max-w-xs">
              <span className="font-bold block text-[#A9B99B] mb-0.5">LOCATION HIGHLIGHT</span>
              <span>Tucked inside leafy Milimani on Menengai Drive — calm, secure, and serene.</span>
            </div>
          </div>
        </motion.div>

        {/* Experience Label Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {gardenBadges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.label}
                className="bg-white border border-[#173F2A]/10 p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md hover:border-[#2F6B3F] transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-[#2F6B3F]/10 text-[#2F6B3F] flex items-center justify-center mb-2 group-hover:bg-[#2F6B3F] group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-display font-extrabold text-xs text-[#173F2A] tracking-wider uppercase">
                  {badge.label}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
