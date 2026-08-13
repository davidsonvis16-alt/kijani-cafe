import React, { useEffect } from 'react';
import { GalleryImage } from '../types';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LightboxProps {
  image: GalleryImage | null;
  images: GalleryImage[];
  onClose: () => void;
  onSelectImage: (image: GalleryImage) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  image,
  images,
  onClose,
  onSelectImage,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!image) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [image]);

  if (!image) return null;

  const currentIndex = images.findIndex((img) => img.id === image.id);

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % images.length;
    onSelectImage(images[nextIdx]);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + images.length) % images.length;
    onSelectImage(images[prevIdx]);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-4 sm:left-8 z-50 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white transition-colors"
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-4 sm:right-8 z-50 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white transition-colors"
          aria-label="Next Image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Main Image Container */}
        <div className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center relative">
          <motion.img
            key={image.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            src={image.src}
            alt={image.title}
            className="max-h-[72vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
          />

          {/* Image Details Caption Bar */}
          <div className="mt-4 text-center text-white max-w-2xl px-4">
            <span className="text-[10px] font-extrabold tracking-widest text-[#A9B99B] uppercase bg-white/10 px-3 py-1 rounded-full inline-block mb-2">
              {image.category} · {currentIndex + 1} OF {images.length}
            </span>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F5F0E6] mb-1">
              {image.title}
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
              {image.caption}
            </p>
          </div>
        </div>

      </div>
    </AnimatePresence>
  );
};
