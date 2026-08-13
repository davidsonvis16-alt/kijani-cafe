import React from 'react';
import { MapPin, Phone, Clock, Calendar, Navigation, Sparkles, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface LocationSectionProps {
  onOpenReservation: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ onOpenReservation }) => {
  const openingHours = [
    { day: 'Sunday', hours: '10:00 AM – 11:00 PM', status: 'OPEN' },
    { day: 'Monday', hours: '12:00 PM – 11:00 PM', status: 'OPEN' },
    { day: 'Tuesday', hours: '12:00 PM – 11:00 PM', status: 'OPEN' },
    { day: 'Wednesday', hours: 'CLOSED', status: 'REST DAY' },
    { day: 'Thursday', hours: '12:00 PM – 11:00 PM', status: 'OPEN' },
    { day: 'Friday', hours: '12:00 PM – 11:00 PM', status: 'OPEN' },
    { day: 'Saturday', hours: '10:00 AM – 11:00 PM', status: 'OPEN' },
  ];

  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Menengai+Drive+Milimani+Nakuru+Kenya";

  return (
    <section id="location" className="py-20 bg-[#F5F0E6] relative scroll-mt-10 border-b border-[#173F2A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-[1px] bg-[#B84A32]" />
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#B84A32]">
              Visit Us In Nakuru
            </span>
          </div>
          <h2 className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl text-[#173F2A] tracking-tight mb-4">
            FIND YOUR WAY TO <span className="italic font-serif font-normal text-[#2F6B3F]">KIJANI.</span>
          </h2>
          <p className="text-base text-[#173F2A]/80 font-light">
            Located in peaceful, leafy Milimani along Menengai Drive, Nakuru.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: Address, Phone & Hours Info Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 bg-[#173F2A] text-white p-8 sm:p-10 rounded-3xl shadow-xl border border-[#2F6B3F]"
          >
            <h3 className="font-display font-extrabold text-2xl text-[#F5F0E6] mb-6 border-b border-[#2F6B3F] pb-4">
              KIJANI KAFE
            </h3>

            {/* Address */}
            <div className="flex items-start gap-3.5 mb-6">
              <div className="p-2.5 rounded-full bg-[#2F6B3F] text-white shrink-0 mt-0.5">
                <MapPin className="w-5 h-5 text-[#A9B99B]" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A9B99B] block">ADDRESS</span>
                <p className="text-sm font-semibold text-white mt-0.5">Menengai Drive, Milimani</p>
                <p className="text-xs text-white/80">Nakuru, Kenya</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3.5 mb-8">
              <div className="p-2.5 rounded-full bg-[#2F6B3F] text-white shrink-0 mt-0.5">
                <Phone className="w-5 h-5 text-[#A9B99B]" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#A9B99B] block">PHONE & RESERVATIONS</span>
                <a
                  href="tel:+254700279982"
                  className="text-base font-extrabold text-[#F5F0E6] hover:text-[#A9B99B] transition-colors mt-0.5 block"
                >
                  +254 700 279 982
                </a>
              </div>
            </div>

            {/* Opening Hours Table */}
            <div className="mb-8 pt-6 border-t border-[#2F6B3F]">
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#A9B99B] uppercase mb-4">
                <Clock className="w-4 h-4 text-[#A9B99B]" />
                <span>OPENING HOURS</span>
              </div>

              <div className="space-y-2.5 text-xs">
                {openingHours.map((item) => (
                  <div key={item.day} className="flex items-center justify-between py-1 border-b border-[#2F6B3F]/30">
                    <span className="font-semibold text-white/90">{item.day}</span>
                    <span className={`font-mono font-bold ${item.status === 'CLOSED' ? 'text-[#B84A32]' : 'text-[#A9B99B]'}`}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#2F6B3F] hover:bg-[#A9B99B] hover:text-[#173F2A] text-white py-3.5 px-4 rounded-full text-xs font-extrabold tracking-wider text-center flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Navigation className="w-4 h-4" />
                <span>GET DIRECTIONS</span>
              </a>

              <a
                href="tel:+254700279982"
                className="border border-[#A9B99B] hover:bg-white hover:text-[#173F2A] text-[#F5F0E6] py-3.5 px-4 rounded-full text-xs font-extrabold tracking-wider text-center flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>CALL KIJANI</span>
              </a>
            </div>

          </motion.div>

          {/* RIGHT: Visual Map & Reservation Banner */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {/* Interactive Styled Map Embed Frame */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#173F2A] h-[360px]">
              <iframe
                title="Kijani Kafe Location Map"
                src="https://maps.google.com/maps?q=Menengai%20Drive%20Milimani%20Nakuru%20Kenya&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-4 left-4 bg-[#173F2A] text-white p-3 rounded-2xl shadow-lg border border-[#2F6B3F] text-xs font-bold flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#A9B99B]" />
                <span>KIJANI KAFE · MILIMANI, NAKURU</span>
              </div>
            </div>

            {/* Book Table Banner Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#173F2A]/10 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-[10px] font-extrabold tracking-widest text-[#2F6B3F] uppercase block mb-1">
                  PLANNING A VISIT OR GROUP DINNER?
                </span>
                <h4 className="font-display font-extrabold text-2xl text-[#173F2A]">
                  Reserve Your Garden Table
                </h4>
                <p className="text-xs text-[#20221F]/70 mt-1 max-w-md">
                  Book outdoor seating, family tables, or inquire about private celebrations in advance.
                </p>
              </div>

              <button
                onClick={onOpenReservation}
                className="bg-[#173F2A] hover:bg-[#2F6B3F] text-white px-7 py-3.5 rounded-full text-xs font-extrabold tracking-wider uppercase flex-shrink-0 shadow-md transition-all whitespace-nowrap"
              >
                RESERVE NOW
              </button>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
