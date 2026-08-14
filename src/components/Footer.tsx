import React from 'react';
import { MapPin, Phone, Clock, Heart, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#173F2A] text-[#F5F0E6] pt-16 pb-12 border-t border-[#2F6B3F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12 border-b border-[#2F6B3F]/50 pb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-[#2F6B3F] text-white flex items-center justify-center font-serif font-black text-lg">
                K
              </div>
              <span className="font-serif font-black text-2xl tracking-tight text-[#F5F0E6]">
                KIJANI KAFE
              </span>
            </div>
            <p className="text-[11px] text-[#A9B99B] uppercase font-bold tracking-[0.2em] mb-4">
              Bar & Restaurant · Milimani, Nakuru
            </p>
            <p className="text-xs text-[#F5F0E6]/80 leading-relaxed max-w-sm mb-6 font-light">
              Your little escape in the heart of Nakuru. Good food, fresh air, and slow moments under the trees.
            </p>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#A9B99B] hover:text-white transition-colors tracking-widest uppercase"
            >
              <ArrowUp className="w-4 h-4" /> BACK TO TOP
            </button>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="font-serif font-bold text-sm text-[#A9B99B] tracking-widest uppercase mb-4">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-xs font-bold">
              {[
                { label: 'HOME', to: '/' },
                { label: 'OUR STORY', to: '/story' },
                { label: 'MENU', to: '/menu' },
                { label: 'EXPERIENCE', to: '/experience' },
                { label: 'GALLERY', to: '/gallery' },
                { label: 'CONTACT', to: '/contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="hover:text-[#A9B99B] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Hours */}
          <div className="lg:col-span-5">
            <h4 className="font-display font-bold text-sm text-[#A9B99B] tracking-widest uppercase mb-4">
              LOCATION & HOURS
            </h4>
            <div className="space-y-3 text-xs text-[#F5F0E6]/90">
              <p className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#A9B99B] shrink-0" />
                Menengai Drive, Milimani, Nakuru, Kenya
              </p>
              <p className="flex items-center gap-2.5 font-bold">
                <Phone className="w-4 h-4 text-[#A9B99B] shrink-0" />
                +254 700 279 982
              </p>
              <p className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-[#A9B99B] shrink-0 mt-0.5" />
                <span>
                  Sun–Mon & Thu–Sat: 10/12 AM – 11:00 PM <br />
                  <span className="text-[#B84A32] font-semibold">Wednesdays: Closed</span>
                </span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A9B99B]">
          <p>© {new Date().getFullYear()} KIJANI KAFE. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-[#B84A32] fill-current" /> for Milimani, Nakuru.
          </p>
          <p>
            Website by{' '}
            <a
              href="https://portfolio-e-mu.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Eden
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
