import React, { useState } from 'react';
import { ReservationDetails } from '../types';
import { X, Calendar, Clock, Users, MapPin, CheckCircle2, Phone, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TableReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TableReservationModal: React.FC<TableReservationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<ReservationDetails>({
    name: '',
    phone: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    time: '13:00',
    guests: 2,
    seatingArea: 'Garden Tables',
    specialOccasion: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleSendWhatsApp = () => {
    const text = `Hello Kijani Kafe! I would like to reserve a table:\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Date:* ${formData.date}\n*Time:* ${formData.time}\n*Guests:* ${formData.guests} person(s)\n*Seating Area:* ${formData.seatingArea}\n${formData.specialOccasion ? `*Occasion:* ${formData.specialOccasion}` : ''}`;
    const url = `https://wa.me/254700279982?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative border border-[#173F2A]/10 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="bg-[#173F2A] text-white p-6 relative flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="text-[10px] font-extrabold tracking-widest text-[#A9B99B] uppercase block mb-1">
            MILIMANI, NAKURU
          </span>
          <h3 className="font-display font-extrabold text-2xl text-[#F5F0E6]">
            BOOK A TABLE AT KIJANI
          </h3>
          <p className="text-xs text-white/80 mt-1">
            Reserve garden seating for family lunches, dinners & gatherings.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-grow">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[#2F6B3F]/10 text-[#2F6B3F] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-display font-extrabold text-2xl text-[#173F2A] mb-2">
                Reservation Details Prepared!
              </h4>
              <p className="text-sm text-[#20221F]/80 max-w-sm mx-auto mb-6">
                Send your booking details directly to our reservations desk at +254 700 279 982.
              </p>

              <div className="bg-[#F5F0E6] p-4 rounded-2xl text-left text-xs space-y-2 mb-6 border border-[#173F2A]/10 font-mono">
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Date & Time:</strong> {formData.date} at {formData.time}</p>
                <p><strong>Guests:</strong> {formData.guests} People</p>
                <p><strong>Seating:</strong> {formData.seatingArea}</p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleSendWhatsApp}
                  className="w-full bg-[#2F6B3F] hover:bg-[#173F2A] text-white py-3.5 rounded-full font-bold text-xs tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>CONFIRM VIA WHATSAPP (+254 700 279 982)</span>
                </button>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="w-full border border-[#173F2A] text-[#173F2A] py-3 rounded-full font-bold text-xs tracking-wider hover:bg-[#173F2A]/5 transition-colors"
                >
                  CLOSE
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#173F2A] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wanjiru Kimani"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#F5F0E6]/50 border border-[#173F2A]/20 rounded-xl p-3 text-sm focus:outline-none focus:border-[#2F6B3F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#173F2A] mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+254 7..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#F5F0E6]/50 border border-[#173F2A]/20 rounded-xl p-3 text-sm focus:outline-none focus:border-[#2F6B3F]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#173F2A] mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#F5F0E6]/50 border border-[#173F2A]/20 rounded-xl p-3 text-sm focus:outline-none focus:border-[#2F6B3F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-[#173F2A] mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#F5F0E6]/50 border border-[#173F2A]/20 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#2F6B3F]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#173F2A] mb-1">Time</label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-[#F5F0E6]/50 border border-[#173F2A]/20 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#2F6B3F]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#173F2A] mb-1">Guests</label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                    className="w-full bg-[#F5F0E6]/50 border border-[#173F2A]/20 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#2F6B3F]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#173F2A] mb-1">Preferred Seating Area</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Garden Tables', 'Veranda', 'Indoor Lounge', 'No Preference'].map((area) => (
                    <button
                      type="button"
                      key={area}
                      onClick={() => setFormData({ ...formData, seatingArea: area as any })}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                        formData.seatingArea === area
                          ? 'bg-[#173F2A] text-white border-[#173F2A]'
                          : 'bg-[#F5F0E6]/30 text-[#20221F] border-[#173F2A]/15 hover:border-[#2F6B3F]'
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#173F2A] mb-1">Special Notes / Occasion (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Birthday dinner, high chair needed..."
                  value={formData.specialOccasion}
                  onChange={(e) => setFormData({ ...formData, specialOccasion: e.target.value })}
                  className="w-full bg-[#F5F0E6]/50 border border-[#173F2A]/20 rounded-xl p-3 text-sm focus:outline-none focus:border-[#2F6B3F]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#173F2A] hover:bg-[#2F6B3F] text-white py-3.5 rounded-full font-bold text-xs tracking-wider uppercase shadow-lg transition-colors"
                >
                  PROCEED TO CONFIRM RESERVATION
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
