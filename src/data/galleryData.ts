import { GalleryImage, ExperienceItem } from '../types';

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'g1',
    title: 'Serene Garden Dining Area',
    category: 'GARDEN',
    src: '/interior-night-ambient-lighting.jpeg',
    caption: 'Sunlit outdoor dining surrounded by mature trees in Milimani, Nakuru.',
    aspectRatio: 'tall'
  },
  {
    id: 'g2',
    title: 'Sirloin Steak & Mash',
    category: 'FOOD',
    src: '/steak-mashed-potato-plate.jpeg',
    caption: 'Prime Kenyan sirloin, cooked how you like it, with lumpy mash.',
    aspectRatio: 'wide'
  },
  {
    id: 'g3',
    title: 'Tropical Garden Craft Mocktails',
    category: 'DRINKS',
    src: '/images/food/mojito.jpg',
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
    title: 'Covered Patio & Lounge',
    category: 'VIBES',
    src: '/covered-patio-wooden-tables.jpeg',
    caption: 'Relaxed covered seating with wooden tables, perfect for intimate moments and cool escapes.',
    aspectRatio: 'wide'
  },
  {
    id: 'g6',
    title: 'Famous Masala Chips & Dips',
    category: 'FOOD',
    src: '/potato-wedges-table-setting.jpeg',
    caption: 'Hot, spicy, coriander-kissed masala chips freshly cooked.',
    aspectRatio: 'square'
  },
  {
    id: 'g7',
    title: 'Family & Board Game Afternoons',
    category: 'VIBES',
    src: '/images/ambiance/ambiance-3.jpg',
    caption: 'Lawn games, Jenga, and family laughter under Nakuru skies.',
    aspectRatio: 'tall'
  },
  {
    id: 'g8',
    title: 'Barista Handcrafted Espresso',
    category: 'DRINKS',
    src: '/images/food/coffee.jpg',
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
    image: '/exterior-lawn-outdoor-seating.jpeg',
    tag: 'OUTDOOR'
  },
  {
    id: 'exp2',
    title: 'ARTISANAL CAFÉ',
    subtitle: 'SLOW COFFEE MOMENTS',
    description: 'Espressos, iced macchiatos, Swahili chai, and fresh morning pastries.',
    image: '/images/food/coffee.jpg',
    tag: 'CAFÉ'
  },
  {
    id: 'exp3',
    title: 'THE GARDEN BAR',
    subtitle: 'CRAFT DRINKS & COCKTAILS',
    description: 'Refreshing virgin mojitos, cold local beers, and signature sunset cocktails.',
    image: '/images/food/sangria.jpg',
    tag: 'BAR'
  },
  {
    id: 'exp4',
    title: 'FAMILY & KIDS',
    subtitle: 'SAFE PLAY & SPACE',
    description: 'Dedicated grassy play zones, kids menu items, and family seating.',
    image: '/images/ambiance/ambiance-3.jpg',
    tag: 'FAMILY'
  },
  {
    id: 'exp5',
    title: 'LAWN & BOARD GAMES',
    subtitle: 'PLAY & UNWIND',
    description: 'Giant Jenga, Scrabble, chess, and relaxed lawn games with friends.',
    image: '/garden-flowers-lawn.jpeg',
    tag: 'GAMES'
  },
  {
    id: 'exp6',
    title: 'EVENTS & ACOUSTICS',
    subtitle: 'LIVE GARDEN SESSIONS',
    description: 'Acoustic music sessions, private celebrations, and Sunday gatherings.',
    image: '/images/ambiance/ambiance-6.jpg',
    tag: 'EVENTS'
  }
];
