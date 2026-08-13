export type CategoryId = 'ALL' | 'STARTERS' | 'MAIN_MEALS' | 'KIDS' | 'DESSERTS' | 'DRINKS';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number; // in KSh (Kenyan Shillings)
  category: CategoryId;
  image: string;
  tag?: 'BEST SELLER' | 'POPULAR' | 'NEW' | 'CHEF SPECIAL';
  isSpicy?: boolean;
  isVegetarian?: boolean;
  prepTime?: string;
  calories?: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  specialInstructions?: string;
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
