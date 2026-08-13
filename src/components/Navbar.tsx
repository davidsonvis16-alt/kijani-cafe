import React, { useState } from 'react';
import { Phone, MapPin, Menu as MenuIcon, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC<{
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
}> = ({
  cartCount,
  onOpenCart,
  onOpenReservation,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'HOME', to: '/' },
    { name: 'OUR STORY', to: '/story' },
    { name: 'MENU', to: '/menu' },
    { name: 'EXPERIENCE', to: '/experience' },
    { name: 'GALLERY', to: '/gallery' },
    { name: 'CONTACT', to: '/contact' },
  ];

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-[#173F2A] text-[#F5F0E6] text-xs font-medium py-2 px-4 sm:px-8 border-b border-[#2F6B3F]/40 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#A9B99B]" />
            <span className="tracking-wider uppercase font-semibold">
              KIJANI KAFE · MILIMANI, NAKURU
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="tel:+254700279982"
              className="flex items-center gap-1.5 hover:text-[#A9B99B] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#A9B99B]" />
              <span className="font-semibold">+254 700 279 982</span>
            </a>
            <span className="hidden md:inline-block text-[#2F6B3F]">•</span>
            <span className="hidden md:inline-block text-xs text-[#A9B99B]">
              SUN–MON & THU–SAT: 12 PM–11 PM (WED CLOSED)
            </span>
          </div>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 bg-[#F5F0E6]/95 backdrop-blur-md shadow-md py-3.5 border-b border-[#6B4A32]/10`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-full bg-[#173F2A] text-[#F5F0E6] flex items-center justify-center font-display font-extrabold text-xl shadow-inner group-hover:scale-105 transition-transform duration-300">
              K
            </div>
            <div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-[#173F2A] block leading-none">
                KIJANI KAFE
              </span>
              <span className="text-[10px] tracking-widest text-[#6B4A32] font-semibold uppercase block mt-0.5">
                BAR & RESTAURANT
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="text-xs font-bold tracking-widest text-[#20221F] hover:text-[#2F6B3F] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#2F6B3F] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-[#2F6B3F]/10 text-[#173F2A] hover:bg-[#2F6B3F] hover:text-white transition-all duration-300 flex items-center justify-center"
              title="View Order Cart"
              aria-label="View Order Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B84A32] text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Book Table Button */}
            <button
              onClick={onOpenReservation}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#173F2A] text-[#173F2A] text-xs font-bold tracking-wider hover:bg-[#173F2A] hover:text-white transition-all duration-300"
            >
              BOOK TABLE
            </button>

            {/* Primary CTA: VIEW MENU */}
            <Link
              to="/menu"
              className="hidden md:inline-flex items-center gap-2 bg-[#173F2A] hover:bg-[#2F6B3F] text-white px-5 py-2.5 rounded-full text-xs font-extrabold tracking-wider shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>VIEW MENU</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#173F2A] hover:bg-[#2F6B3F]/10 rounded-lg transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#173F2A] text-[#F5F0E6] border-b border-[#2F6B3F] shadow-2xl overflow-hidden z-30 relative"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display font-bold text-lg tracking-wider hover:text-[#A9B99B] transition-colors py-1 border-b border-[#2F6B3F]/30"
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-2 flex flex-col gap-3">
                <Link
                  to="/menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full bg-[#2F6B3F] text-white py-3 rounded-full text-center font-bold text-sm tracking-wider flex items-center justify-center gap-2 shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>VIEW FULL MENU</span>
                </Link>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenReservation();
                  }}
                  className="w-full border border-[#A9B99B] text-[#F5F0E6] py-3 rounded-full text-center font-bold text-sm tracking-wider hover:bg-white/10 transition-colors"
                >
                  RESERVE A TABLE
                </button>
              </div>

              <div className="pt-4 border-t border-[#2F6B3F]/40 flex flex-col gap-2 text-xs text-[#A9B99B]">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#A9B99B]" />
                  Menengai Drive, Milimani, Nakuru, Kenya
                </p>
                <p className="flex items-center gap-2 font-semibold">
                  <Phone className="w-4 h-4 text-[#A9B99B]" />
                  +254 700 279 982
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
