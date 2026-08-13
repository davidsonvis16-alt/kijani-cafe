import React, { useState, useMemo } from 'react';
import { GALLERY_IMAGES } from '../data/galleryData';
import { GalleryImage } from '../types';
import { Lightbox } from './Lightbox';
import { Sparkles, Maximize2, Camera } from 'lucide-react';
import { motion } from 'motion/react';

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedLightboxImage, setSelectedLightboxImage] = useState<GalleryImage | null>(null);

  const categories = ['ALL', 'FOOD', 'DRINKS', 'GARDEN', 'EVENTS', 'VIBES'];

  const filteredImages = useMemo(() => {
    if (activeCategory === 'ALL') return GALLERY_IMAGES;
    return GALLERY_IMAGES.filter((img) => img.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="gallery" className="py-20 bg-[#F5F0E6] relative scroll-mt-10 border-b border-[#173F2A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-[1px] bg-[#B84A32]" />
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#B84A32]">
              The Kijani Journal
            </span>
          </div>
          <h2 className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl text-[#173F2A] tracking-tight mb-4">
            GALLERY OF <span className="italic font-serif font-normal text-[#2F6B3F]">MOMENTS.</span>
          </h2>
          <p className="text-base text-[#173F2A]/80 font-light">
            Food, drink, green leaves, and laughter captured in Milimani, Nakuru.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap mb-10 border-b border-[#2F6B3F]/15 pb-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[11px] font-bold tracking-widest uppercase transition-all duration-300 pb-1 ${
                activeCategory === cat
                  ? 'text-[#173F2A] border-b-2 border-[#B84A32]'
                  : 'text-[#173F2A]/50 hover:text-[#173F2A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((img) => {
            return (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedLightboxImage(img)}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer bg-[#173F2A] shadow-md border border-[#173F2A]/10 ${
                  img.aspectRatio === 'tall'
                    ? 'row-span-2 aspect-[3/4]'
                    : img.aspectRatio === 'wide'
                    ? 'col-span-1 md:col-span-2 aspect-[16/9]'
                    : 'aspect-square'
                }`}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover img-zoom-hover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-white">
                  <div className="flex justify-end">
                    <span className="p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-[#173F2A] transition-colors">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#A9B99B] block mb-1">
                      {img.category}
                    </span>
                    <h3 className="font-serif font-bold text-lg text-white mb-0.5">
                      {img.title}
                    </h3>
                    <p className="text-xs text-white/80 line-clamp-1">{img.caption}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Component */}
      <Lightbox
        image={selectedLightboxImage}
        images={filteredImages}
        onClose={() => setSelectedLightboxImage(null)}
        onSelectImage={(img) => setSelectedLightboxImage(img)}
      />
    </section>
  );
};
