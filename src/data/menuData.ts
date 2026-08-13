import { MenuItem, CategoryId } from '../types';

export interface CategoryInfo {
  id: CategoryId;
  label: string;
  iconName: string;
  description: string;
}

export const MENU_CATEGORIES: CategoryInfo[] = [
  { id: 'ALL', label: 'ALL ITEMS', iconName: 'Utensils', description: 'Browse our full kitchen & bar menu' },
  { id: 'BREAKFAST', label: 'BREAKFAST', iconName: 'Egg', description: 'Fresh morning bites & artisanal toasts' },
  { id: 'CAFE', label: 'CAFÉ', iconName: 'Coffee', description: 'Handcrafted espresso, chai & cold brews' },
  { id: 'MAIN_MEALS', label: 'MAIN MEALS', iconName: 'Flame', description: 'Flame-grilled meats, fresh fish & platters' },
  { id: 'BURGERS_WRAPS', label: 'BURGERS & WRAPS', iconName: 'Sandwich', description: 'Gourmet brioche burgers & toasted wraps' },
  { id: 'CHIPS_SIDES', label: 'CHIPS & SIDES', iconName: 'FryingPan', description: 'Famous masala chips, wedges & fresh salads' },
  { id: 'DRINKS', label: 'DRINKS', iconName: 'GlassWater', description: 'Fresh smoothies, virgin mojitos & craft cocktails' },
  { id: 'DESSERTS', label: 'DESSERTS', iconName: 'IceCream', description: 'Decadent cakes, warm brownies & ice cream' },
];

export const MENU_ITEMS: MenuItem[] = [
  // BREAKFAST
  {
    id: 'b1',
    name: 'Avocado & Poached Egg Toast',
    description: 'Smashed Milimani avocado, poached farm eggs, chili flakes & microgreens on toasted sourdough.',
    price: 550,
    category: 'BREAKFAST',
    image: '/images/menu/menu-item-1.jpg',
    tag: 'BEST SELLER',
    isVegetarian: true,
    prepTime: '12 min'
  },
  {
    id: 'b2',
    name: 'Kijani Full House Breakfast',
    description: 'Two eggs to order, flame-grilled beef sausage, crispy bacon, garlic mushrooms, baked beans & buttered toast.',
    price: 950,
    category: 'BREAKFAST',
    image: '/images/menu/menu-item-2.jpg',
    tag: 'POPULAR',
    prepTime: '15 min'
  },
  {
    id: 'b3',
    name: 'Fluffy Brioche French Toast',
    description: 'Thick brioche dipped in vanilla custard, served with fresh Nakuru strawberries & pure maple syrup.',
    price: 600,
    category: 'BREAKFAST',
    image: '/images/menu/menu-item-3.jpg',
    isVegetarian: true,
    prepTime: '10 min'
  },
  {
    id: 'b4',
    name: 'Swahili Mahamri & Cardamom Tea Combo',
    description: 'Freshly baked coconut mahamri paired with spiced Swahili tea infused with cardamom & ginger.',
    price: 400,
    category: 'BREAKFAST',
    image: '/images/menu/menu-item-4.jpg',
    tag: 'NEW',
    isVegetarian: true,
    prepTime: '8 min'
  },

  // CAFÉ
  {
    id: 'c1',
    name: 'Milimani Single Origin Espresso',
    description: 'Rich double shot of locally roasted Kenyan arabica beans with caramel undertones.',
    price: 250,
    category: 'CAFE',
    image: '/images/menu/menu-item-5.jpg',
    prepTime: '5 min'
  },
  {
    id: 'c2',
    name: 'Kijani House Cappuccino',
    description: 'Espresso topped with silky steamed milk foam & cocoa dusting.',
    price: 350,
    category: 'CAFE',
    image: '/images/menu/menu-item-6.jpg',
    tag: 'POPULAR',
    prepTime: '5 min'
  },
  {
    id: 'c3',
    name: 'Iced Caramel Macchiato',
    description: 'Chilled espresso layered with creamy cold milk, ice cubes & homemade caramel drizzle.',
    price: 450,
    category: 'CAFE',
    image: '/images/menu/menu-item-7.jpg',
    tag: 'BEST SELLER',
    prepTime: '5 min'
  },
  {
    id: 'c4',
    name: 'Spiced Kenyan Chai Latte',
    description: 'Slow-simmered Kenyan black tea brewed with fresh ginger, cinnamon, cloves & steamed whole milk.',
    price: 350,
    category: 'CAFE',
    image: '/images/menu/menu-item-8.jpg',
    prepTime: '6 min'
  },

  // MAIN MEALS
  {
    id: 'm1',
    name: 'Flame-Grilled 1/4 Chicken',
    description: 'Succulent marinated chicken flame-grilled over open coals. Choose Peri-Peri or Lemon & Herb sauce.',
    price: 750,
    category: 'MAIN_MEALS',
    image: '/images/menu/menu-item-9.jpg',
    tag: 'BEST SELLER',
    isSpicy: true,
    prepTime: '20 min'
  },
  {
    id: 'm2',
    name: 'Half Flame-Grilled Garlic Chicken',
    description: 'Marinated half chicken grilled to tender perfection with smoky garlic butter glaze & fresh herbs.',
    price: 1250,
    category: 'MAIN_MEALS',
    image: '/images/menu/menu-item-10.jpg',
    tag: 'POPULAR',
    prepTime: '25 min'
  },
  {
    id: 'm3',
    name: 'Whole Crisp Lake Victoria Tilapia',
    description: 'Pan-fried or deep-fried fresh Tilapia served with traditional Kienyeji greens, traditional Ugali & Kachumbari.',
    price: 1100,
    category: 'MAIN_MEALS',
    image: '/images/menu/menu-item-11.jpg',
    tag: 'CHEF SPECIAL',
    prepTime: '25 min'
  },
  {
    id: 'm4',
    name: 'Slow-Roasted BBQ Beef Ribs',
    description: 'Tender beef short ribs glazed in house signature smoky BBQ glaze, grilled over sweetwood coals.',
    price: 1400,
    category: 'MAIN_MEALS',
    image: '/images/menu/menu-item-12.jpg',
    tag: 'POPULAR',
    prepTime: '22 min'
  },
  {
    id: 'm5',
    name: 'Garlic Butter Prawns & Rice',
    description: 'Jumbo tiger prawns sautéed in garlic chili butter with lime juice, served with fragrant jasmine rice.',
    price: 1600,
    category: 'MAIN_MEALS',
    image: '/images/menu/menu-item-13.jpg',
    tag: 'NEW',
    isSpicy: true,
    prepTime: '18 min'
  },

  // BURGERS & WRAPS
  {
    id: 'bg1',
    name: 'Kijani Gourmet Beef Burger',
    description: '200g prime beef patty, melted cheddar, caramelized onions, crisp lettuce & signature Kijani aioli in a toasted brioche bun.',
    price: 850,
    category: 'BURGERS_WRAPS',
    image: '/images/menu/menu-item-14.jpg',
    tag: 'BEST SELLER',
    prepTime: '15 min'
  },
  {
    id: 'bg2',
    name: 'Crispy Peri Chicken Burger',
    description: 'Crispy fried chicken breast drenched in spicy peri-peri glaze with crunchy slaw & dill pickles.',
    price: 750,
    category: 'BURGERS_WRAPS',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=80&w=800',
    tag: 'POPULAR',
    isSpicy: true,
    prepTime: '15 min'
  },
  {
    id: 'bg3',
    name: 'Grilled Halloumi & Avocado Wrap',
    description: 'Seared halloumi cheese, ripe avocado, roasted bell peppers & herb pest in a toasted tortilla wrap.',
    price: 700,
    category: 'BURGERS_WRAPS',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=80&w=800',
    isVegetarian: true,
    prepTime: '12 min'
  },

  // CHIPS & SIDES
  {
    id: 's1',
    name: 'Famous Kijani Masala Chips',
    description: 'Golden hand-cut potato fries tossed in fiery tomato-chili garlic masala sauce with fresh coriander.',
    price: 400,
    category: 'CHIPS_SIDES',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=800',
    tag: 'BEST SELLER',
    isSpicy: true,
    isVegetarian: true,
    prepTime: '10 min'
  },
  {
    id: 's2',
    name: 'Garlic & Rosemary Potato Wedges',
    description: 'Crispy thick-cut potato wedges seasoned with sea salt, crushed garlic & fresh garden rosemary.',
    price: 350,
    category: 'CHIPS_SIDES',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&q=80&w=800',
    isVegetarian: true,
    prepTime: '10 min'
  },
  {
    id: 's3',
    name: 'Loaded Peri Cheese Fries',
    description: 'Crispy fries smothered in house peri-peri sauce, melted mozzarella & crisp scallions.',
    price: 500,
    category: 'CHIPS_SIDES',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&q=80&w=800',
    tag: 'POPULAR',
    isSpicy: true,
    prepTime: '12 min'
  },
  {
    id: 's4',
    name: 'Kachumbari & Garden Green Salad',
    description: 'Fresh Nakuru vine tomatoes, red onions, chili & cilantro tossed with lemon dressing.',
    price: 300,
    category: 'CHIPS_SIDES',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    isVegetarian: true,
    prepTime: '8 min'
  },

  // DRINKS
  {
    id: 'd1',
    name: 'Passion Fruit & Mint Virgin Mojito',
    description: 'Freshly muddled mint leaves, lime, passionfruit puree & sparkling soda water over crushed ice.',
    price: 450,
    category: 'DRINKS',
    image: '/images/drinks/drink-1.jpg',
    tag: 'BEST SELLER',
    prepTime: '5 min'
  },
  {
    id: 'd2',
    name: 'Tropical Mango & Pineapple Smoothie',
    description: 'Blended sweet Kenyan mangoes, fresh pineapple chunks, coconut milk & honey.',
    price: 400,
    category: 'DRINKS',
    image: '/images/drinks/drink-2.jpg',
    tag: 'POPULAR',
    prepTime: '5 min'
  },
  {
    id: 'd3',
    name: 'Hibiscus & Ginger Cold Brew Infusion',
    description: 'Chilled organic hibiscus flower tea steeped with spicy Nakuru ginger & squeezed lemon.',
    price: 350,
    category: 'DRINKS',
    image: '/images/drinks/drink-3.jpg',
    prepTime: '4 min'
  },
  {
    id: 'd4',
    name: 'Kijani Garden Sunset Cocktail',
    description: 'Craft gin infused with rosemary, elderflower liqueur, freshly squeezed grapefruit & tonic.',
    price: 650,
    category: 'DRINKS',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800',
    tag: 'NEW',
    prepTime: '6 min'
  },

  // DESSERTS
  {
    id: 'ds1',
    name: 'Warm Fudge Brownie & Ice Cream',
    description: 'Rich dark chocolate brownie served warm with a scoop of Madagascar vanilla bean ice cream & chocolate sauce.',
    price: 550,
    category: 'DESSERTS',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800',
    tag: 'BEST SELLER',
    isVegetarian: true,
    prepTime: '8 min'
  },
  {
    id: 'ds2',
    name: 'Salted Caramel New York Cheesecake',
    description: 'Creamy baked cheesecake on a buttery graham cracker crust topped with gooey salted caramel.',
    price: 600,
    category: 'DESSERTS',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=800',
    tag: 'POPULAR',
    isVegetarian: true,
    prepTime: '5 min'
  }
];
