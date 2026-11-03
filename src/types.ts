export type CategoryId =
  | 'STARTERS'
  | 'MAIN_MEALS'
  | 'KIDS'
  | 'DESSERTS'
  | 'DRINKS'
  | 'COCKTAILS'
  | 'BEER_CIDER'
  | 'WINE'
  | 'SPIRITS';

export interface OptionChoice {
  id: string;
  label: string;
  /** Amount added to the item's base price, in KSh. */
  delta?: number;
}

export interface OptionGroup {
  id: string;
  title: string;
  type: 'single' | 'multi';
  required?: boolean;
  choices: OptionChoice[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number; // base price in KSh (Kenyan Shillings)
  category: CategoryId;
  image: string;
  tag?: 'BEST SELLER' | 'POPULAR' | 'NEW' | 'CHEF SPECIAL';
  isSpicy?: boolean;
  isVegetarian?: boolean;
  isAlcohol?: boolean;
  prepTime?: string;
  options?: OptionGroup[];
}

/** groupId -> selected choice ids */
export type Selections = Record<string, string[]>;

export interface CartLine {
  key: string;
  item: MenuItem;
  quantity: number;
  selections: Selections;
  note?: string;
}

export type OrderMode = 'PICKUP' | 'DINE_IN' | 'DELIVERY';
export type PaymentMethod = 'MPESA' | 'CARD' | 'CASH';

export interface OrderLine {
  itemId: string;
  name: string;
  image: string;
  quantity: number;
  unitPrice: number;
  summary: string;
  selections: Selections;
  note?: string;
}

export interface Order {
  id: string;
  placedAt: number;
  scheduledFor?: string;
  mode: OrderMode;
  table?: string;
  address?: string;
  customer: { name: string; phone: string; email?: string };
  lines: OrderLine[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  tip: number;
  total: number;
  payment: PaymentMethod;
  paid: boolean;
  promoCode?: string;
  pointsEarned: number;
  pointsRedeemed: number;
  userId?: string;
  etaMinutes: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  points: number;
  favourites: string[];
  addresses: string[];
  createdAt: number;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: 'FOOD' | 'DRINKS' | 'GARDEN' | 'EVENTS' | 'VIBES';
  src: string;
  caption: string;
  aspectRatio?: 'square' | 'tall' | 'wide';
}

export interface ExperienceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tag: string;
}

export interface ReservationDetails {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: 'Garden Tables' | 'Veranda' | 'Indoor Lounge' | 'No Preference';
  specialOccasion?: string;
}
