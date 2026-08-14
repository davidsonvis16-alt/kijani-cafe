import React from 'react';
import { ArrowRight, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export const FinalCTA: React.FC = () => {
  return (
    <section className="relative py-24 bg-[#173F2A] text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1769184617504-be7e08f3a8b3?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2FyZGVuJTIwcmVzdGF1cmFudHxlbnwwfHwwfHwwfA%3D%3D"
            alt="Kijani Kafe Garden atmosphere in Milimani, Nakuru"
            className="w-full h-full object-cover opacity-25"
          />
        <div className="absolute inset-0 bg-gradient-to-t from-[#173F2A] via-[#173F2A]/80 to-[#173F2A]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-[1px] bg-[#B84A32]" />
            <span className="text-[12px] font-bold tracking-[0.3em] uppercase text-[#B84A32]">
              Milimani, Nakuru · Kenya
            </span>
          </div>

          <h2 className="font-serif font-black text-5xl sm:text-6xl md:text-7xl text-[#F5F0E6] tracking-tight mb-6">
            SEE YOU AT <span className="italic font-serif font-normal text-[#A9B99B]">KIJANI.</span>
          </h2>

          <p className="text-lg sm:text-xl text-[#F5F0E6]/90 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Good food tastes better when there’s somewhere beautiful to enjoy it.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/menu"
              className="bg-[#B84A32] hover:bg-white hover:text-[#173F2A] text-white px-9 py-4 text-[12px] font-bold tracking-widest uppercase flex items-center gap-2.5 shadow-xl transition-all duration-300"
            >
              <span>VIEW FULL MENU</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Menengai+Drive+Milimani+Nakuru+Kenya"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#A9B99B]/60 text-[#F5F0E6] hover:bg-white hover:text-[#173F2A] px-9 py-4 text-[12px] font-bold tracking-widest uppercase flex items-center gap-2 transition-all duration-300"
            >
              <MapPin className="w-4 h-4" />
              <span>GET DIRECTIONS</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
