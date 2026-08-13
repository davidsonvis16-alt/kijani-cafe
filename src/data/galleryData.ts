import { GalleryImage, ExperienceItem } from '../types';

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'g1',
    title: 'Serene Garden Dining Area',
    category: 'GARDEN',
    src: '/images/ambiance/ambiance-1.jpg',
    caption: 'Sunlit outdoor dining surrounded by mature trees in Milimani, Nakuru.',
    aspectRatio: 'tall'
  },
  {
    id: 'g2',
    title: 'Flame-Grilled Signature Platter',
    category: 'FOOD',
    src: '/images/menu/menu-item-9.jpg',
    caption: 'Flame-grilled chicken, steak skewers, and golden fries ready for sharing.',
    aspectRatio: 'wide'
  },
  {
    id: 'g3',
    title: 'Tropical Garden Craft Mocktails',
    category: 'DRINKS',
    src: '/images/drinks/drink-1.jpg',
    caption: 'Handcrafted passionfruit & mint virgin mojitos under the canopy.',
    aspectRatio: 'square'
  },
  {
    id: 'g4',
    title: 'Weekend Live Music Sessions',
    category: 'EVENTS',
    src: '/images/ambiance/ambiance-2.jpg',
    caption: 'Acoustic evening performances under fairy lights in the garden.',
    aspectRatio: 'tall'
  },
  {
    id: 'g5',
    title: 'Shaded Veranda & Lounge',
    category: 'VIBES',
    src: '/images/ambiance/ambiance-3.jpg',
    caption: 'Cozy seating designed for slow afternoons, conversation, and coffee.',
    aspectRatio: 'wide'
  },
  {
    id: 'g6',
    title: 'Famous Masala Chips & Dips',
    category: 'FOOD',
    src: '/images/menu/menu-item-4.jpg',
    caption: 'Hot, spicy, coriander-kissed masala chips freshly cooked.',
    aspectRatio: 'square'
  },
  {
    id: 'g7',
    title: 'Family & Board Game Afternoons',
    category: 'VIBES',
    src: '/images/ambiance/ambiance-4.jpg',
    caption: 'Lawn games, Jenga, and family laughter under Nakuru skies.',
    aspectRatio: 'tall'
  },
  {
    id: 'g8',
    title: 'Barista Handcrafted Espresso',
    category: 'DRINKS',
    src: '/images/menu/menu-item-5.jpg',
    caption: 'Locally sourced Kenyan arabica micro-batches poured daily.',
    aspectRatio: 'square'
  }
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 'exp1',
    title: 'GARDEN DINING',
    subtitle: 'AL FRESCO FREEDOM',
    description: 'Dine under towering trees with soft garden breezes and natural sunlight.',
    image: '/images/ambiance/ambiance-5.jpg',
    tag: 'OUTDOOR'
  },
  {
    id: 'exp2',
    title: 'ARTISANAL CAFÉ',
    subtitle: 'SLOW COFFEE MOMENTS',
    description: 'Espressos, iced macchiatos, Swahili chai, and fresh morning pastries.',
    image: '/images/ambiance/ambiance-6.jpg',
    tag: 'CAFÉ'
  },
  {
    id: 'exp3',
    title: 'THE GARDEN BAR',
    subtitle: 'CRAFT DRINKS & COCKTAILS',
    description: 'Refreshing virgin mojitos, cold local beers, and signature sunset cocktails.',
    image: '/images/drinks/drink-2.jpg',
    tag: 'BAR'
  },
  {
    id: 'exp4',
    title: 'FAMILY & KIDS',
    subtitle: 'SAFE PLAY & SPACE',
    description: 'Dedicated grassy play zones, kids menu items, and family seating.',
    image: '/images/ambiance/ambiance-7.jpg',
    tag: 'FAMILY'
  },
  {
    id: 'exp5',
    title: 'LAWN & BOARD GAMES',
    subtitle: 'PLAY & UNWIND',
    description: 'Giant Jenga, Scrabble, chess, and relaxed lawn games with friends.',
    image: '/images/ambiance/ambiance-8.jpg',
    tag: 'GAMES'
  },
  {
    id: 'exp6',
    title: 'EVENTS & ACOUSTICS',
    subtitle: 'LIVE GARDEN SESSIONS',
    description: 'Acoustic music sessions, private celebrations, and Sunday gatherings.',
    image: '/images/menu/menu-item-10.jpg',
    tag: 'EVENTS'
  }
];
