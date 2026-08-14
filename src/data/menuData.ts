import { MenuItem, CategoryId } from '../types';

export interface CategoryInfo {
  id: CategoryId;
  label: string;
  iconName: string;
  description: string;
}

export const MENU_CATEGORIES: CategoryInfo[] = [
  { id: 'ALL', label: 'ALL ITEMS', iconName: 'Utensils', description: 'Browse our full menu' },
  { id: 'STARTERS', label: 'STARTERS', iconName: 'CookingPot', description: 'Small bites, chips & sharer plates' },
  { id: 'MAIN_MEALS', label: 'BIG BITES', iconName: 'Flame', description: 'The main event — hearty plates' },
  { id: 'KIDS', label: 'KIDS CORNER', iconName: 'Smile', description: 'Little plates for little people' },
  { id: 'DESSERTS', label: 'SOMETHING SWEET', iconName: 'IceCream', description: 'Milkshakes, ice cream & cakes' },
  { id: 'DRINKS', label: 'SOFT DRINKS', iconName: 'GlassWater', description: 'Hot & cold refreshments' },
];

export const MENU_ITEMS: MenuItem[] = [
  // STARTERS
  {
    id: 's1',
    name: 'Beef Samosas',
    description: '3 parcels with lime & salsa.',
    price: 350,
    category: 'STARTERS',
    image: 'data:image/jpeg;base64,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',
    tag: 'POPULAR',
    prepTime: '10 min'
  },
  {
    id: 's2',
    name: 'Nachos & Cheese',
    description: 'Tortilla chips, melted cheese.',
    price: 400,
    category: 'STARTERS',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu0ob0qVrM5jqe4GBuFTHhRueEmBBk6jFaJufuy3JOvw&s=10',
    prepTime: '10 min'
  },
  {
    id: 's3',
    name: 'Cheesy Chips',
    description: 'Skin-on chips, melted cheese.',
    price: 350,
    category: 'STARTERS',
    image: '/images/menu/menu-item-3.jpg',
    prepTime: '10 min'
  },
  {
    id: 's4',
    name: 'Chunky Chips',
    description: 'Skin-on chips, choice of condiment.',
    price: 300,
    category: 'STARTERS',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuaIrnTx9bpktobfi4xKAmpSZlp9M2Lelx7pA7BIw6ig&s=10',
    prepTime: '10 min'
  },
  {
    id: 's5',
    name: 'Chips Masala',
    description: 'Spicy masala fries.',
    price: 400,
    category: 'STARTERS',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNZKjdMiWUnckiWSYnvyULF0Z5YR5q6H0fuBnLgELE8A&s=10',
    tag: 'BEST SELLER',
    isSpicy: true,
    prepTime: '10 min'
  },
  {
    id: 's6',
    name: 'Loaded Fries',
    description: 'Chips, shredded chicken, smokie sausage, grated cheese.',
    price: 1000,
    category: 'STARTERS',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT163Rryvvt4sOj9hG262qYFtfIbgcYyGFdmwPAuqD91Q&s=10',
    tag: 'POPULAR',
    prepTime: '15 min'
  },
  {
    id: 's7',
    name: 'Spring Rolls à la Maison',
    description: 'Supersize, chicken or veggie (pair).',
    price: 350,
    category: 'STARTERS',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9IAnF1TFXXGtQQEeyZCsQap9wz7DMQRJGBgcFx6ecyA&s=10',
    prepTime: '12 min'
  },
  {
    id: 's8',
    name: 'Hot Dog',
    description: 'Beef/pork sausage, fried onions, mayo/mustard/ketchup. Guac +50/-.',
    price: 300,
    category: 'STARTERS',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK8O0SsElMFJBmB7pCLSwY2ii_ylCCWlQdg4oeX-jNrQ&s=10',
    prepTime: '10 min'
  },
  {
    id: 's9',
    name: 'Kijani Krunchy Chicken Strips',
    description: 'With dip.',
    price: 500,
    category: 'STARTERS',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVj98zTufHT15BOdLuChprJCY4BoCCs8K4EEKToEi17g&s=10',
    prepTime: '12 min'
  },
  {
    id: 's10',
    name: 'Sticky Fingers',
    description: 'Chicken goujons, sticky-crunchy coat.',
    price: 600,
    category: 'STARTERS',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJwx5WB9HmAatcVSIt8mS4_tUdRthxoFgRBxY6CHLU-Q&s=10',
    isSpicy: true,
    prepTime: '12 min'
  },
  {
    id: 's11',
    name: 'Spicy Wings',
    description: 'Hot & sticky, with half chunky chips + salsa.',
    price: 850,
    category: 'STARTERS',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCwRidWj8IuUo8Rs_WmxCQmXPEuk-RVBjAI5i3D7hpfA&s=10',
    tag: 'BEST SELLER',
    isSpicy: true,
    prepTime: '15 min'
  },
  {
    id: 's12',
    name: 'Brunch Roll',
    description: 'Bread roll, sausage, bacon, fried egg. Add chips.',
    price: 500,
    category: 'STARTERS',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQiMgCRgKa_utgg9suoCom5AAqENPWbCTL2J0ZLts8vA&s=10',
    prepTime: '10 min'
  },
  {
    id: 's13',
    name: 'A Pair of Eggs',
    description: 'Boiled / fried / scrambled / omelette.',
    price: 250,
    category: 'STARTERS',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpkOsEfEjFV9dug53JIore2tzEkRATTSgyoAyI9JTJZA&s=10',
    isVegetarian: true,
    prepTime: '8 min'
  },
  {
    id: 's14',
    name: 'A Pair of Beef Sausages',
    description: 'Flame-grilled beef sausages.',
    price: 300,
    category: 'STARTERS',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfX_Q6LX_d-OBuVA6bRDNFv24b6CJZ79kflpld8NCo_Q&s=10',
    prepTime: '10 min'
  },
  {
    id: 's15',
    name: 'Tortilla Wrap',
    description: 'Spicy chicken, stir-fried peppers, optional melted cheese (+100/-), half chunky chips + salsa.',
    price: 750,
    category: 'STARTERS',
    image: 'https://images.unsplash.com/photo-1760888548893-bc2f7e09e972?auto=format&fit=crop&q=80&w=800',
    tag: 'NEW',
    prepTime: '12 min'
  },

  // BIG BITES
  {
    id: 'm1',
    name: 'Chunky Beef Stew',
    description: 'With chapati / ugali / rice / mash.',
    price: 850,
    category: 'MAIN_MEALS',
    image: 'https://images.unsplash.com/photo-1689860892307-7db54ab276ba?auto=format&fit=crop&q=80&w=800',
    tag: 'POPULAR',
    prepTime: '25 min'
  },
  {
    id: 'm2',
    name: 'Spaghetti Bolognaise',
    description: 'Prime beef, basil, oregano, garlic, cheese.',
    price: 850,
    category: 'MAIN_MEALS',
    image: 'https://images.unsplash.com/photo-1516100882582-96c3a05fe590?auto=format&fit=crop&q=80&w=800',
    prepTime: '20 min'
  },
  {
    id: 'm3',
    name: 'English Fish n Chips',
    description: 'Battered tilapia, chunky chips, veg, tartare.',
    price: 900,
    category: 'MAIN_MEALS',
    image: 'https://images.unsplash.com/photo-1579208030886-b937da0925dc?auto=format&fit=crop&q=80&w=800',
    tag: 'BEST SELLER',
    prepTime: '25 min'
  },
  {
    id: 'm4',
    name: 'The Kijani Burger',
    description: 'Beef patty, bacon, melted cheese, relish, chips.',
    price: 950,
    category: 'MAIN_MEALS',
    image: 'https://images.unsplash.com/photo-1756751736809-7a8b80f9b125?auto=format&fit=crop&q=80&w=800',
    tag: 'BEST SELLER',
    prepTime: '20 min'
  },
  {
    id: 'm5',
    name: 'Kuku Krunch Burger',
    description: 'Crispy chicken breast, special sauce, chips.',
    price: 1100,
    category: 'MAIN_MEALS',
    image: 'https://images.unsplash.com/photo-1481070555726-e2fe8357725c?auto=format&fit=crop&q=80&w=800',
    tag: 'POPULAR',
    prepTime: '20 min'
  },
  {
    id: 'm6',
    name: 'Kijani Kuku',
    description: 'Wet or dry fried quarter chicken, veg, choice of starch. Dry 800/- / Wet 850/-',
    price: 850,
    category: 'MAIN_MEALS',
    image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?auto=format&fit=crop&q=80&w=800',
    tag: 'POPULAR',
    prepTime: '25 min'
  },
  {
    id: 'm7',
    name: 'Kijani Chop',
    description: 'Pork or lamb chop, chapati / rice / mash.',
    price: 950,
    category: 'MAIN_MEALS',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS401JmhxF9nFYg6ViWodLH7LVZegW_EPTkvfvjEM3wBA&s=10',
    prepTime: '25 min'
  },
  {
    id: 'm8',
    name: 'Sirloin Steak',
    description: 'Cooked to order, veg, choice of starch.',
    price: 1300,
    category: 'MAIN_MEALS',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Gom1WIX3xeGPdO5MlRKA64Tq9jkMRnt7BbYedgh9lQ&s=10',
    tag: 'CHEF SPECIAL',
    prepTime: '30 min'
  },

  // KIDS CORNER
  {
    id: 'k1',
    name: 'Meaty Bangers',
    description: 'Beef/pork chipolatas, chunky chips. Kids corner — 600/- each.',
    price: 600,
    category: 'KIDS',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJdsXEduWBsxJU7Tz4rKIzbhOxYZ9IIVuLj7cEqvvUqw&s=10',
    prepTime: '15 min'
  },
  {
    id: 'k2',
    name: 'Kuku Chips',
    description: 'Fried chicken piece, chunky chips. Kids corner — 600/- each.',
    price: 600,
    category: 'KIDS',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2XpkGEk6tY408123K49srpvPrbbV3bPj7ScEONFQqlw&s=10',
    prepTime: '15 min'
  },
  {
    id: 'k3',
    name: 'Little Bolognaise',
    description: 'Minced beef bolognaise, pasta twists. Cheese/veg on request. Kids corner — 600/- each.',
    price: 600,
    category: 'KIDS',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvJrE4jjJUlepypNcWAKopSASSOynH70-Cny5tynlDag&s=10',
    isVegetarian: true,
    prepTime: '15 min'
  },

  // DESSERTS
  {
    id: 'd1',
    name: 'Milkshakes',
    description: 'Oreo, Kijani Rainbow, Rich Coffee — 700/- each.',
    price: 700,
    category: 'DESSERTS',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyywpkMTkyGbk67ke2t2EW7qek8yDFx7fds5XWoj4g2g&s=10',
    tag: 'POPULAR',
    prepTime: '5 min'
  },
  {
    id: 'd2',
    name: 'Ice Cream',
    description: 'Vanilla 250/-, Strawberry & Vanilla 250/-, Salted Caramel 300/-, Piña Colada 300/-, Blueberry Swirl 300/-, Biscotti 350/-, Peach Melba 350/-.',
    price: 250,
    category: 'DESSERTS',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=800',
    tag: 'BEST SELLER',
    prepTime: '2 min'
  },
  {
    id: 'd3',
    name: 'Cakes',
    description: 'Carrot 300/-, Ginger 300/-, Banana Bread 250/- (add ice cream scoop +100/-). Subject to availability.',
    price: 250,
    category: 'DESSERTS',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800',
    prepTime: '5 min'
  },

  // DRINKS
  {
    id: 'dr1',
    name: 'Sodas & Safari Lemonade',
    description: 'Coca-Cola, Sprite, Fanta, Safari Lemonade.',
    price: 150,
    category: 'DRINKS',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800',
    prepTime: '2 min'
  },
  {
    id: 'dr2',
    name: 'Squash / Cordial',
    description: 'Orange, mango, pineapple, tropical.',
    price: 100,
    category: 'DRINKS',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&q=80&w=800',
    prepTime: '2 min'
  },
  {
    id: 'dr3',
    name: 'Red Bull',
    description: 'Energy drink. Not served to under-18s.',
    price: 300,
    category: 'DRINKS',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-Ju_fX4n98Ur2zqjouev5rVSuBVPx2rMMJpm91imDhA&s=10',
    prepTime: '2 min'
  },
  {
    id: 'dr4',
    name: 'Fruit Juices',
    description: '1L carton — orange, mango, mixed berry, tropical.',
    price: 500,
    category: 'DRINKS',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe5NEGS_SWs8S-AiMwxN30f3cKC7DO0TLEcFa7PGA5qA&s',
    prepTime: '2 min'
  },
  {
    id: 'dr5',
    name: 'Mineral Water',
    description: '1L — still or sparkling.',
    price: 300,
    category: 'DRINKS',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiIUMFpThbbum2nM9hCcrRCJ0u1rhx4ZUnHVrFCjpNEg&s=10',
    prepTime: '2 min'
  },
  {
    id: 'dr6',
    name: 'Fresh Coffee',
    description: 'Dormans medium roast, French press.',
    price: 200,
    category: 'DRINKS',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-rKPderV9I8eRRMR_lIOKnZaovT_c9-tB1A9aevuxZw&s',
    tag: 'POPULAR',
    prepTime: '5 min'
  },
  {
    id: 'dr7',
    name: 'Iced Coffee',
    description: 'Dormans, shaken with ice & honey.',
    price: 250,
    category: 'DRINKS',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ80JhOdO01qCDp6Q6QuZhqyZ20KQJDndl-FWz6khjEyA&s=10',
    prepTime: '5 min'
  },
  {
    id: 'dr8',
    name: 'Hot Chocolate',
    description: 'Grated chocolate topping.',
    price: 250,
    category: 'DRINKS',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIAzew2iqeE-0MyOjNKT2JZkS95RAsYGD2WxC467M51g&s=10',
    prepTime: '5 min'
  },
  {
    id: 'dr9',
    name: 'Speciality Teas',
    description: 'Black, hangover, green & lemon, ginger.',
    price: 150,
    category: 'DRINKS',
    image: 'https://images.unsplash.com/photo-1559249672-e74704da756f?auto=format&fit=crop&q=80&w=800',
    prepTime: '5 min'
  },
  {
    id: 'dr10',
    name: 'Black Tea',
    description: 'Classic Kenyan black tea.',
    price: 150,
    category: 'DRINKS',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQys12sRJcAuQ9KhnWtvUJ-XMUwU7Tt25xSZLxj2pDk1A&s=10',
    prepTime: '5 min'
  },
  {
    id: 'dr11',
    name: 'Mixed Tea',
    description: 'Blended black tea with aromatic spices.',
    price: 250,
    category: 'DRINKS',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWBvF7nuoCjnUj51dTCNq7E4d_uFQ6H-1wNvPC5X7FhQ&s=10',
    prepTime: '5 min'
  },
  {
    id: 'dr12',
    name: 'Dawa',
    description: 'Lemon, garlic, honey. Can add a tot.',
    price: 300,
    category: 'DRINKS',
    image: 'https://images.unsplash.com/photo-1536735926702-9e14ec0448fe?auto=format&fit=crop&q=80&w=800',
    tag: 'NEW',
    prepTime: '5 min'
  }
];
