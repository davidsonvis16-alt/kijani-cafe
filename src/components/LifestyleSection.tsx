import React from 'react';
import { Smile, Sparkles, Dices, Music, Compass, HeartHandshake } from 'lucide-react';
import { motion } from 'motion/react';

interface LifestyleSectionProps {
  onOpenReservation: () => void;
}

export const LifestyleSection: React.FC<LifestyleSectionProps> = ({ onOpenReservation }) => {
  const highlights = [
    {
      icon: Smile,
      title: "Kids' Dedicated Play Area",
      desc: "Grassy lawns, safe outdoor play zones, and child-friendly meal options.",
    },
    {
      icon: Dices,
      title: "Board & Lawn Games",
      desc: "Giant Jenga, Scrabble, chess, and lawn games to play at your table.",
    },
    {
      icon: Music,
      title: "Live Acoustic Sessions",
      desc: "Chill acoustic performances on weekend afternoons under the canopy.",
    },
    {
      icon: HeartHandshake,
      title: "Family Gatherings & Birthdays",
      desc: "Spacious communal tables built for big family lunches & celebrations.",
    },
  ];

  return (
    <section className="py-20 bg-[#F5F0E6] relative border-b border-[#173F2A]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Editorial Text */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[1px] bg-[#B84A32]" />
              <span className="text-[12px] font-bold tracking-[0.3em] uppercase text-[#B84A32]">
                Family & Lifestyle
              </span>
            </div>

            <h2 className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl text-[#173F2A] tracking-tight mb-6">
              THERE’S ROOM FOR <br />
              <span className="italic font-serif font-normal text-[#2F6B3F]">EVERYONE.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#173F2A]/80 font-light leading-relaxed mb-6">
              You don’t have to rush here. Kijani Kafe is built for slow afternoons, laughter with children, long conversations over chai, and relaxed games on the lawn.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {highlights.map((h) => {
                const Icon = h.icon;
                return (
                  <div key={h.title} className="p-4 bg-white border border-[#2F6B3F]/10 shadow-sm">
                    <div className="w-8 h-8 bg-[#2F6B3F]/10 text-[#2F6B3F] flex items-center justify-center mb-2.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-serif font-bold text-sm text-[#173F2A] mb-1">{h.title}</h4>
                    <p className="text-xs text-[#173F2A]/70 leading-relaxed font-light">{h.desc}</p>
                  </div>
                );
              })}
            </div>

            <div>
              <button
                onClick={onOpenReservation}
                className="bg-[#173F2A] hover:bg-[#2F6B3F] text-white px-9 py-4 text-[12px] font-bold tracking-widest uppercase inline-flex items-center gap-2 shadow-xl transition-all"
              >
                <Compass className="w-4 h-4 text-[#A9B99B]" />
                <span>PLAN YOUR FAMILY VISIT</span>
              </button>
            </div>
          </motion.div>

          {/* RIGHT: Warm Family & Outdoor Photo Montage */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl overflow-hidden shadow-lg border-2 border-white aspect-[3/4] bg-[#173F2A]">
                <img
                  src="/images/ambiance/ambiance-5.jpg"
                  alt="Board & Lawn Games at Kijani Kafe"
                  className="w-full h-full object-cover img-zoom-hover"
                />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-lg border-2 border-white aspect-[3/4] bg-[#173F2A] mt-8">
                <img
                  src="/images/ambiance/ambiance-6.jpg"
                  alt="Kids and Family Outdoors in Milimani, Nakuru"
                  className="w-full h-full object-cover img-zoom-hover"
                />
              </div>
            </div>

            {/* Quote Pill Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#173F2A] text-white px-6 py-3.5 rounded-full shadow-2xl border-2 border-[#A9B99B] text-center whitespace-nowrap">
              <span className="font-bebas text-lg text-[#F5F0E6] tracking-wider block leading-none">NO RUSH. NO HASSLE.</span>
              <span className="text-[10px] text-[#A9B99B] font-bold tracking-widest uppercase">JUST SLOW MOMENTS</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
