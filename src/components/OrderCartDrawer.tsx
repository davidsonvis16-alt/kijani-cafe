import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, ShoppingBag, Plus, Minus, Trash2, Send, Utensils, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OrderCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onClearCart: () => void;
}

export const OrderCartDrawer: React.FC<OrderCartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onClearCart,
}) => {
  const [orderType, setOrderType] = useState<'TABLE' | 'PICKUP'>('TABLE');
  const [tableNumber, setTableNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialNote, setSpecialNote] = useState('');
  const [orderSent, setOrderSent] = useState(false);

  if (!isOpen) return null;

  const totalKSh = cartItems.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);

  const handleSendOrderToWhatsApp = () => {
    if (cartItems.length === 0) return;

    let itemsText = cartItems
      .map(
        (ci) =>
          `• ${ci.quantity}x ${ci.item.name} @ KSh ${ci.item.price.toLocaleString()} = KSh ${(
            ci.item.price * ci.quantity
          ).toLocaleString()}`
      )
      .join('\n');

    const message = `Hello Kijani Kafe Kitchen! I would like to place an order:\n\n*Order Type:* ${
      orderType === 'TABLE' ? `Garden Table ${tableNumber || '(Unspecified)'}` : 'Pickup / Takeaway'
    }\n*Name:* ${customerName || 'Guest'}\n*Phone:* ${phone || 'N/A'}\n\n*Items Ordered:*\n${itemsText}\n\n*TOTAL:* KSh ${totalKSh.toLocaleString()}\n${
      specialNote ? `\n*Special Request:* ${specialNote}` : ''
    }`;

    const url = `https://wa.me/254700279982?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setOrderSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col relative z-50"
      >
        {/* Drawer Header */}
        <div className="p-6 bg-[#173F2A] text-white flex items-center justify-between border-b border-[#2F6B3F]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-full bg-[#2F6B3F] text-white">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-xl text-[#F5F0E6]">YOUR KIJANI ORDER</h3>
              <p className="text-[10px] text-[#A9B99B] font-bold tracking-widest uppercase">
                {cartItems.reduce((acc, c) => acc + c.quantity, 0)} ITEMS SELECTED
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-6 overflow-y-auto flex-grow space-y-6">
          {orderSent ? (
            <div className="py-12 text-center">
              <div className="w-16 h-16 bg-[#2F6B3F]/10 text-[#2F6B3F] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-display font-extrabold text-2xl text-[#173F2A] mb-2">
                Order Sent to Kitchen!
              </h4>
              <p className="text-xs text-[#20221F]/80 max-w-xs mx-auto mb-6">
                Your order message was generated and sent to Kijani Kafe WhatsApp desk (+254 700 279 982).
              </p>
              <button
                onClick={() => {
                  onClearCart();
                  setOrderSent(false);
                  onClose();
                }}
                className="bg-[#173F2A] text-white px-6 py-3 rounded-full text-xs font-bold tracking-wider hover:bg-[#2F6B3F] transition-colors"
              >
                START NEW ORDER
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="py-16 text-center">
              <Utensils className="w-12 h-12 text-[#2F6B3F] opacity-30 mx-auto mb-3" />
              <h4 className="font-display font-bold text-lg text-[#173F2A]">Your cart is empty</h4>
              <p className="text-xs text-[#6B4A32] mt-1 max-w-xs mx-auto">
                Explore our menu items and click ADD on any dish to start building your order.
              </p>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="space-y-4">
                {cartItems.map(({ item, quantity }) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 rounded-2xl border border-[#173F2A]/10 bg-[#F5F0E6]/30"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-grow min-w-0">
                      <h4 className="font-display font-bold text-sm text-[#173F2A] truncate">
                        {item.name}
                      </h4>
                      <span className="font-bebas text-lg text-[#2F6B3F]">
                        KSh {(item.price * quantity).toLocaleString()}
                      </span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1.5 bg-white border border-[#173F2A]/15 rounded-full p-1">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded-full bg-[#173F2A]/10 hover:bg-[#173F2A] hover:text-white flex items-center justify-center text-xs font-bold transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-extrabold w-5 text-center">{quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded-full bg-[#173F2A]/10 hover:bg-[#173F2A] hover:text-white flex items-center justify-center text-xs font-bold transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Details Form */}
              <div className="pt-4 border-t border-[#173F2A]/10 space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-[#173F2A] mb-1">Dining Preference</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setOrderType('TABLE')}
                      className={`py-2 rounded-xl border text-xs font-bold ${
                        orderType === 'TABLE'
                          ? 'bg-[#173F2A] text-white border-[#173F2A]'
                          : 'bg-white text-[#20221F] border-[#173F2A]/15'
                      }`}
                    >
                      Garden Table Order
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('PICKUP')}
                      className={`py-2 rounded-xl border text-xs font-bold ${
                        orderType === 'PICKUP'
                          ? 'bg-[#173F2A] text-white border-[#173F2A]'
                          : 'bg-white text-[#20221F] border-[#173F2A]/15'
                      }`}
                    >
                      Takeaway / Pickup
                    </button>
                  </div>
                </div>

                {orderType === 'TABLE' && (
                  <div>
                    <label className="block font-bold text-[#173F2A] mb-1">Table Number (If Seated)</label>
                    <input
                      type="text"
                      placeholder="e.g. Table 8"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="w-full bg-[#F5F0E6]/50 border border-[#173F2A]/20 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#2F6B3F]"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-[#173F2A] mb-1">Your Name</label>
                    <input
                      type="text"
                      placeholder="Guest Name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#F5F0E6]/50 border border-[#173F2A]/20 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#2F6B3F]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#173F2A] mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+254 7..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#F5F0E6]/50 border border-[#173F2A]/20 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#2F6B3F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#173F2A] mb-1">Special Preparation Instructions</label>
                  <input
                    type="text"
                    placeholder="e.g. Extra masala dip, mild spicy, no ice..."
                    value={specialNote}
                    onChange={(e) => setSpecialNote(e.target.value)}
                    className="w-full bg-[#F5F0E6]/50 border border-[#173F2A]/20 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#2F6B3F]"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer Total & Send Button */}
        {cartItems.length > 0 && !orderSent && (
          <div className="p-6 bg-[#F5F0E6] border-t border-[#173F2A]/10 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-extrabold text-[#6B4A32]">Subtotal</span>
              <span className="font-bebas text-3xl text-[#173F2A]">
                KSh {totalKSh.toLocaleString()}
              </span>
            </div>

            <button
              onClick={handleSendOrderToWhatsApp}
              className="w-full bg-[#2F6B3F] hover:bg-[#173F2A] text-white py-3.5 rounded-full font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <Send className="w-4 h-4" />
              <span>SEND ORDER VIA WHATSAPP (+254 700 279 982)</span>
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
