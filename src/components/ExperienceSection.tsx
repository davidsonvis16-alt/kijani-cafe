import React from 'react';
import { EXPERIENCE_ITEMS } from '../data/galleryData';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ExperienceSectionProps {
  onOpenReservation: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onOpenReservation }) => {
  return (
    <section className="py-20 bg-[#173F2A] text-[#F5F0E6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 border-b border-[#2F6B3F]/40 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-[1px] bg-[#B84A32]" />
              <span className="text-[12px] font-bold tracking-[0.3em] uppercase text-[#B84A32]">
                Every Moment Matters
              </span>
            </div>
            <h2 className="font-serif font-black text-3xl sm:text-5xl text-[#F5F0E6] tracking-tight">
              EXPERIENCE <span className="italic font-serif font-normal text-[#A9B99B]">KIJANI KAFE</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#F5F0E6]/80 max-w-md font-light">
            Whether you are catching up over coffee, dining with family, or hosting a garden celebration.
          </p>
        </div>

        {/* 6 Experience Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXPERIENCE_ITEMS.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onClick={onOpenReservation}
              className="group relative rounded-3xl overflow-hidden border border-[#2F6B3F]/40 bg-[#2F6B3F] aspect-[4/3] cursor-pointer shadow-lg"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover img-zoom-hover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent group-hover:from-black/90 transition-colors duration-300" />

              {/* Top Tag */}
              <div className="absolute top-4 left-4">
                <span className="bg-[#173F2A]/90 text-[#A9B99B] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-[#2F6B3F]">
                  {item.tag}
                </span>
              </div>

              {/* Top Right Arrow Icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-[#2F6B3F] group-hover:scale-110 transition-all duration-300">
                <ArrowUpRight className="w-4 h-4" />
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-5 left-5 right-5 transform group-hover:-translate-y-1 transition-transform duration-300">
                <span className="text-[10px] font-bold tracking-widest text-[#A9B99B] uppercase block">
                  {item.subtitle}
                </span>
                <h3 className="font-serif font-bold text-xl text-white mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-white/80 line-clamp-2 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
