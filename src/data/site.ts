// Single source of truth for business details and ordering rules.
// Anything marked CONFIRM is a placeholder that Kijani Kafe must sign off on before launch.

export const SITE = {
  name: 'Kijani Kafe',
  tagline: 'Bar & Restaurant',
  phoneDisplay: '+254 700 279 982',
  phoneIntl: '254700279982',
  address: 'Menengai Drive, Milimani, Nakuru, Kenya',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Menengai+Drive+Milimani+Nakuru+Kenya',
  happyHour: { label: 'Happy Hour · Mon–Fri · 5–7 PM', days: [1, 2, 3, 4, 5], from: 17, to: 19 },
};

/**
 * Opening hours by weekday (0 = Sunday). null = closed.
 * CONFIRM: the old site listed "Sun–Mon & Thu–Sat, Wed closed" and both 10 AM and 12 PM openings;
 * Tuesday is assumed open here.
 */
export const HOURS: ({ open: number; close: number } | null)[] = [
  { open: 12, close: 23 }, // Sun
  { open: 12, close: 23 }, // Mon
  { open: 12, close: 23 }, // Tue
  null, //                    Wed
  { open: 12, close: 23 }, // Thu
  { open: 12, close: 23 }, // Fri
  { open: 12, close: 23 }, // Sat
];

export const ORDERING = {
  /** No payment gateway is wired up yet: M-Pesa and card are simulated and orders are relayed via WhatsApp. */
  demoPayments: true,
  prepMinutes: 25,
  delivery: {
    enabled: true, // CONFIRM: does Kijani deliver?
    fee: 200, // CONFIRM
    minOrder: 1000, // CONFIRM
    extraMinutes: 20,
  },
  /** CONFIRM: example promo codes only. Remove or replace with real offers. */
  promoCodes: {
    KARIBU10: { percent: 10, label: '10% off your first online order' },
  } as Record<string, { percent: number; label: string }>,
  tipOptions: [0, 50, 100, 200],
};

/** CONFIRM: loyalty scheme parameters. */
export const REWARDS = {
  kshPerPoint: 100, // earn 1 point per KSh 100 spent
  pointValue: 1, // each point is worth KSh 1 when redeemed
  minRedeem: 100,
  tiers: [
    { name: 'Seedling', min: 0 },
    { name: 'Sapling', min: 250 },
    { name: 'Acacia', min: 1000 },
  ],
};

export const STORAGE_KEYS = {
  cart: 'kk.cart.v1',
  mode: 'kk.mode.v1',
  accounts: 'kk.accounts.v1',
  session: 'kk.session.v1',
  orders: 'kk.orders.v1',
  ageOk: 'kk.age.v1',
};
