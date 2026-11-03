import { MenuItem, CategoryId, OptionGroup } from '../types';

export interface CategoryInfo {
  id: CategoryId;
  label: string;
  blurb: string;
  image: string;
  group: 'FOOD' | 'BAR';
}

const img = (slug: string) => `/images/food/${slug}.jpg`;

export const MENU_CATEGORIES: CategoryInfo[] = [
  { id: 'STARTERS', label: 'Lite Bites', blurb: 'Small plates, big on flavour', image: '/images/ambiance/ambiance-1.jpg', group: 'FOOD' },
  { id: 'MAIN_MEALS', label: 'Big Bites', blurb: 'The main event', image: '/burger-and-fries.jpeg', group: 'FOOD' },
  { id: 'KIDS', label: 'Kids Corner', blurb: 'Little portions for little people', image: img('kuku-chips'), group: 'FOOD' },
  { id: 'DESSERTS', label: 'Something Sweet', blurb: 'Shakes, ice cream & cakes', image: img('milkshake'), group: 'FOOD' },
  { id: 'DRINKS', label: 'Hot & Cold', blurb: 'Coffee, tea, juices & sodas', image: img('iced-coffee'), group: 'FOOD' },
  { id: 'COCKTAILS', label: 'Kocktails', blurb: 'Shaken in the garden', image: img('mojito'), group: 'BAR' },
  { id: 'BEER_CIDER', label: 'Beer & Cider', blurb: 'Ice cold, always', image: img('lager'), group: 'BAR' },
  { id: 'WINE', label: 'Wine & Port', blurb: 'By the glass or bottle', image: img('house-wine'), group: 'BAR' },
  { id: 'SPIRITS', label: 'Spirits', blurb: 'Whisky, cognac, gin & more', image: img('johnnie-walker'), group: 'BAR' },
];

// ---- Shared option groups (from the printed menu) ----

const EXTRAS: OptionGroup = {
  id: 'extras',
  title: 'Extras',
  type: 'multi',
  choices: [
    { id: 'cheese', label: 'Extra cheese', delta: 100 },
    { id: 'gravy', label: 'Extra gravy', delta: 100 },
    { id: 'mayo', label: 'Mayo', delta: 50 },
    { id: 'chilli', label: 'Sweet chilli', delta: 50 },
    { id: 'tartare', label: 'Tartare', delta: 50 },
    { id: 'tzatziki', label: 'Tzatziki', delta: 50 },
  ],
};

const starch = (withChips: boolean): OptionGroup => ({
  id: 'starch',
  title: 'Choose your side',
  type: 'single',
  required: true,
  choices: [
    ...(withChips ? [{ id: 'chips', label: 'Skin-on chunky chips' }] : []),
    { id: 'chapati', label: 'Chapati' },
    { id: 'ugali', label: 'Ugali' },
    { id: 'rice', label: 'Rice' },
    { id: 'mash', label: 'Lumpy mashed potatoes' },
  ],
});

const flavours = (id: string, title: string, labels: string[]): OptionGroup => ({
  id,
  title,
  type: 'single',
  required: true,
  choices: labels.map((label) => ({ id: label.toLowerCase().replace(/[^a-z0-9]+/g, '-'), label })),
});

const KIDS_SQUASH = flavours('squash', 'Glass of squash (included)', ['Orange', 'Mango', 'Pineapple', 'Tropical']);

const totOrBottle = (bottle: number, tot: number): OptionGroup => ({
  id: 'size',
  title: 'Size',
  type: 'single',
  required: true,
  choices: [
    { id: 'tot', label: 'Single tot' },
    { id: 'bottle', label: '1 litre bottle', delta: bottle - tot },
  ],
});

export const MENU_ITEMS: MenuItem[] = [
  // ---------------- LITE BITES ----------------
  { id: 's1', name: 'Beef Samosas', description: '3 parcels of perfection, served with a slice of lime and salsa.', price: 350, category: 'STARTERS', image: img('samosas'), tag: 'POPULAR', prepTime: '10 min' },
  { id: 's2', name: 'Nachos & Cheese', description: 'A heap of tortilla chips topped with melted cheese.', price: 400, category: 'STARTERS', image: img('nachos'), isVegetarian: true, prepTime: '10 min', options: [EXTRAS] },
  { id: 's3', name: 'Cheesy Chips', description: 'A mug of chunky skin-on chips wearing a tasty hat of melted cheese.', price: 350, category: 'STARTERS', image: img('cheesy-chips'), isVegetarian: true, prepTime: '10 min', options: [EXTRAS] },
  { id: 's4', name: 'Chunky Chips', description: 'A mug of skin-on chunkiness topped with a condiment of your choice.', price: 300, category: 'STARTERS', image: img('chunky-chips'), isVegetarian: true, prepTime: '10 min', options: [EXTRAS] },
  { id: 's5', name: 'Chips Masala', description: 'Spicy and juicy fries with that masala magic — a Kenya classic.', price: 400, category: 'STARTERS', image: '/images/ambiance/ambiance-1.jpg', tag: 'BEST SELLER', isSpicy: true, isVegetarian: true, prepTime: '10 min', options: [EXTRAS] },
  { id: 's6', name: 'Loaded Fries', description: 'Chunky chips topped with shredded chicken, slices of smokie sausage and grated cheese. A real hangover cure or pre-game filler.', price: 1000, category: 'STARTERS', image: img('loaded-fries'), tag: 'POPULAR', prepTime: '15 min', options: [EXTRAS] },
  { id: 's7', name: 'Spring Rolls à la Maison', description: 'A pair of supersize springiness — chicken or veggie.', price: 350, category: 'STARTERS', image: '/sweet-potato-fries-spring-rolls.jpeg', prepTime: '12 min', options: [flavours('filling', 'Filling', ['Chicken', 'Veggie'])] },
  { id: 's8', name: 'Hot Dog', description: 'Beef or pork sausage topped with fried onions in a hot dog roll, with a mayo, mustard and ketchup drizzle.', price: 300, category: 'STARTERS', image: img('hot-dog'), prepTime: '10 min', options: [flavours('sausage', 'Sausage', ['Beef', 'Pork']), { id: 'guac', title: 'Make it better', type: 'multi', choices: [{ id: 'guac', label: 'Add guacamole', delta: 50 }] }] },
  { id: 's9', name: 'Kijani Krunchy Chicken Strips', description: 'Our legendary krunchy chicken goujons and dip.', price: 500, category: 'STARTERS', image: img('chicken-strips'), tag: 'POPULAR', prepTime: '12 min', options: [EXTRAS] },
  { id: 's10', name: 'Sticky Fingers', description: 'Chicken goujons wearing a sticky and krunchy overcoat.', price: 600, category: 'STARTERS', image: img('sticky-fingers'), isSpicy: true, prepTime: '12 min' },
  { id: 's11', name: 'Spicy Wings', description: 'A tasty portion of hot and sticky chicken wings, served with a half portion of chunky chips and salsa.', price: 850, category: 'STARTERS', image: '/images/ambiance/ambiance-4.jpg', tag: 'BEST SELLER', isSpicy: true, prepTime: '15 min', options: [EXTRAS] },
  { id: 's12', name: 'Brunch Roll', description: 'A soft bread roll with sausage, bacon and a fried egg.', price: 500, category: 'STARTERS', image: img('brunch-roll'), prepTime: '10 min', options: [{ id: 'chips', title: 'Make it a meal', type: 'multi', choices: [{ id: 'chips', label: 'Add chunky chips', delta: 200 }] }] },
  { id: 's13', name: 'A Pair of Eggs', description: 'How do you want them?', price: 250, category: 'STARTERS', image: img('eggs'), isVegetarian: true, prepTime: '8 min', options: [{ id: 'style', title: 'Style', type: 'single', required: true, choices: [{ id: 'boiled', label: 'Boiled' }, { id: 'fried', label: 'Fried' }, { id: 'scrambled', label: 'Scrambled' }, { id: 'omelette', label: 'Omelette', delta: 50 }] }] },
  { id: 's14', name: 'A Pair of Beef Sausages', description: 'When all you need is a meaty snack.', price: 300, category: 'STARTERS', image: img('sausages'), prepTime: '10 min' },
  { id: 's15', name: 'Tortilla Wrap', description: 'A homemade tortilla filled with spicy chicken and stir-fried peppers. Served with a half portion of chunky chips and salsa.', price: 750, category: 'STARTERS', image: img('wrap'), tag: 'NEW', isSpicy: true, prepTime: '12 min', options: [{ id: 'cheese', title: 'Cheese', type: 'multi', choices: [{ id: 'melted', label: 'Add melted cheese', delta: 100 }] }] },

  // ---------------- BIG BITES ----------------
  { id: 'm1', name: 'Chunky Beef Stew', description: 'A rich beefy stew loaded with goodness to warm your heart. Served with seasonal vegetables.', price: 850, category: 'MAIN_MEALS', image: img('beef-stew'), tag: 'POPULAR', prepTime: '25 min', options: [starch(false), EXTRAS] },
  { id: 'm2', name: 'Spaghetti Bolognaise', description: 'The Italian classic with all the right flavours. Prime beef with basil, oregano and garlic in a rich tomato sauce, topped with cheese.', price: 850, category: 'MAIN_MEALS', image: img('spaghetti'), prepTime: '20 min', options: [EXTRAS] },
  { id: 'm3', name: 'English Fish n Chips', description: 'A tilapia fillet in a thick crispy battered coating. Served with chunky chips, mixed vegetables and home-made tartare sauce.', price: 900, category: 'MAIN_MEALS', image: '/fried-fish-dinner-plate.jpeg', tag: 'BEST SELLER', prepTime: '25 min', options: [EXTRAS] },
  { id: 'm4', name: 'The Kijani Burger', description: 'A prime beef patty on lettuce, tomato and onion, topped with rashers of streaky bacon, melted cheese and a dash of our relish. Served with a cup of skin-on chunky chips. Wow!!', price: 950, category: 'MAIN_MEALS', image: '/burger-and-fries.jpeg', tag: 'BEST SELLER', prepTime: '20 min', options: [EXTRAS] },
  { id: 'm5', name: 'Kuku Krunch Burger', description: 'A super tasty chicken breast coated in our own krunchy coating, with lettuce, tomato, onion and special sauce. Served with chunky chips.', price: 1100, category: 'MAIN_MEALS', image: img('kuku-burger'), tag: 'POPULAR', prepTime: '20 min', options: [EXTRAS] },
  { id: 'm6', name: 'Kijani Kuku', description: 'A wet or dry fried quarter of prime Nakuru kuku, served with seasonal vegetables. Delicious!!', price: 800, category: 'MAIN_MEALS', image: img('kijani-kuku'), tag: 'POPULAR', prepTime: '25 min', options: [{ id: 'fry', title: 'How do you like it?', type: 'single', required: true, choices: [{ id: 'dry', label: 'Dry fry' }, { id: 'wet', label: 'Wet fry', delta: 50 }] }, starch(true), EXTRAS] },
  { id: 'm7', name: 'Kijani Chop', description: 'A large pork or lamb chop, pan fried and juicy. Mustards and mint sauce available on request.', price: 950, category: 'MAIN_MEALS', image: img('chop'), prepTime: '25 min', options: [flavours('meat', 'Choose your chop', ['Pork', 'Lamb']), starch(false), EXTRAS] },
  { id: 'm8', name: 'Sirloin Steak', description: 'A prime piece of Kenyan beef cooked how you like it — a classic meal on any continent. Served with veg. Mustards available on request.', price: 1300, category: 'MAIN_MEALS', image: '/steak-mashed-potato-plate.jpeg', tag: 'CHEF SPECIAL', prepTime: '30 min', options: [flavours('doneness', 'How would you like it cooked?', ['Rare', 'Medium rare', 'Medium', 'Medium well', 'Well done']), starch(true), EXTRAS] },

  // ---------------- KIDS CORNER ----------------
  { id: 'k1', name: 'Meaty Bangers', description: 'A trio of beef or pork chipolatas served with our skin-on chunky chips. Includes a glass of squash.', price: 600, category: 'KIDS', image: img('sausages'), prepTime: '15 min', options: [flavours('sausage', 'Sausage', ['Beef', 'Pork']), KIDS_SQUASH] },
  { id: 'k2', name: 'Kuku Chips', description: 'A piece of tender broiler deep fried and served with chunky chips. Includes a glass of squash.', price: 600, category: 'KIDS', image: img('kuku-chips'), tag: 'POPULAR', prepTime: '15 min', options: [KIDS_SQUASH] },
  { id: 'k3', name: 'Little Bolognaise', description: 'Minced beef in a bolognaise sauce on a bed of pasta twists. Cheese and seasonal veggies on request. Includes a glass of squash.', price: 600, category: 'KIDS', image: img('little-bolognaise'), prepTime: '15 min', options: [KIDS_SQUASH] },

  // ---------------- SOMETHING SWEET ----------------
  { id: 'd1', name: 'Milkshakes', description: 'Thick, cold and properly indulgent.', price: 700, category: 'DESSERTS', image: img('milkshake'), tag: 'POPULAR', isVegetarian: true, prepTime: '5 min', options: [flavours('flavour', 'Flavour', ['Oreo', 'Kijani Rainbow', 'Rich Coffee'])] },
  { id: 'd2', name: 'Ice Cream', description: 'Scoops of happiness in eight flavours.', price: 250, category: 'DESSERTS', image: img('ice-cream'), tag: 'BEST SELLER', isVegetarian: true, prepTime: '2 min', options: [{ id: 'flavour', title: 'Flavour', type: 'single', required: true, choices: [{ id: 'vanilla', label: 'Vanilla' }, { id: 'straw-van', label: 'Strawberry & Vanilla' }, { id: 'salted-caramel', label: 'Salted Caramel', delta: 50 }, { id: 'pina-colada', label: 'Piña Colada', delta: 50 }, { id: 'blueberry', label: 'Blueberry Swirl', delta: 50 }, { id: 'biscotti', label: 'Biscotti', delta: 100 }, { id: 'peach-melba', label: 'Peach Melba', delta: 100 }] }] },
  { id: 'd3', name: 'Cakes', description: 'Baked in-house. Subject to availability.', price: 250, category: 'DESSERTS', image: img('cake'), isVegetarian: true, prepTime: '5 min', options: [{ id: 'cake', title: 'Cake', type: 'single', required: true, choices: [{ id: 'banana', label: 'Banana Bread' }, { id: 'carrot', label: 'Carrot Cake', delta: 50 }, { id: 'ginger', label: 'Ginger Cake', delta: 50 }] }, { id: 'scoop', title: 'Add on', type: 'multi', choices: [{ id: 'scoop', label: 'Scoop of ice cream', delta: 100 }] }] },

  // ---------------- HOT & COLD ----------------
  { id: 'dr1', name: 'Sodas & Safari Lemonade', description: 'Ice-cold classics.', price: 150, category: 'DRINKS', image: img('sodas'), prepTime: '2 min', options: [flavours('soda', 'Pick one', ['Coca-Cola', 'Sprite', 'Fanta', 'Safari Lemonade'])] },
  { id: 'dr2', name: 'Squash / Cordial', description: 'Orange, mango, pineapple or tropical flavour.', price: 100, category: 'DRINKS', image: img('squash'), prepTime: '2 min', options: [flavours('flavour', 'Flavour', ['Orange', 'Mango', 'Pineapple', 'Tropical'])] },
  { id: 'dr3', name: 'Red Bull', description: 'Energy drink. Not served to under-18s.', price: 300, category: 'DRINKS', image: img('energy'), prepTime: '2 min' },
  { id: 'dr4', name: 'Fruit Juices', description: '1 litre carton.', price: 500, category: 'DRINKS', image: img('juice'), prepTime: '2 min', options: [flavours('flavour', 'Flavour', ['Orange', 'Mango', 'Mixed Berry', 'Tropical'])] },
  { id: 'dr5', name: 'Mineral Water', description: '1 litre.', price: 300, category: 'DRINKS', image: img('water'), prepTime: '2 min', options: [flavours('type', 'Type', ['Still', 'Sparkling'])] },
  { id: 'dr6', name: 'Fresh Coffee', description: 'Dormans medium roast served in a French press (cafetière).', price: 200, category: 'DRINKS', image: img('coffee'), tag: 'POPULAR', prepTime: '5 min' },
  { id: 'dr7', name: 'Iced Coffee', description: 'Dormans medium roast shaken with ice and a honey sweetener.', price: 250, category: 'DRINKS', image: img('iced-coffee'), prepTime: '5 min' },
  { id: 'dr8', name: 'Hot Chocolate', description: 'A mug of hot milky sweetness with a grated chocolate topping.', price: 250, category: 'DRINKS', image: img('hot-chocolate'), prepTime: '5 min' },
  { id: 'dr9', name: 'Speciality Teas', description: 'Kenyan black, hangover tea, green tea & lemon, or ginger.', price: 150, category: 'DRINKS', image: img('speciality-tea'), prepTime: '5 min', options: [flavours('tea', 'Tea', ['Kenyan Black', 'Hangover Tea', 'Green Tea & Lemon', 'Ginger'])] },
  { id: 'dr10', name: 'Black Tea', description: 'Kenyan traditional tea served without milk.', price: 150, category: 'DRINKS', image: img('black-tea'), prepTime: '5 min' },
  { id: 'dr11', name: 'Mixed Tea', description: 'The mix of tea and milk, all ready for the sugar.', price: 250, category: 'DRINKS', image: img('mixed-tea'), prepTime: '5 min' },
  { id: 'dr12', name: 'Dawa', description: 'A hot pick-me-up made with lemon, garlic and honey. Can be served with a tot — ask your server.', price: 300, category: 'DRINKS', image: img('dawa'), prepTime: '5 min' },

  // ---------------- KOCKTAILS ----------------
  { id: 'c1', name: 'Last Sunset', description: 'Tequila-based.', price: 550, category: 'COCKTAILS', image: img('last-sunset'), isAlcohol: true, tag: 'POPULAR' },
  { id: 'c2', name: 'Frankenstein', description: 'Tequila-based.', price: 550, category: 'COCKTAILS', image: img('frankenstein'), isAlcohol: true },
  { id: 'c3', name: 'Tom Collins', description: 'Gin, lemon, sugar and soda.', price: 750, category: 'COCKTAILS', image: img('tom-collins'), isAlcohol: true },
  { id: 'c4', name: 'Mojito', description: 'Rum, fresh mint and lime.', price: 800, category: 'COCKTAILS', image: img('mojito'), isAlcohol: true, tag: 'BEST SELLER' },
  { id: 'c5', name: 'S.O.T.B.', description: 'Vodka-based.', price: 850, category: 'COCKTAILS', image: img('sotb'), isAlcohol: true },
  { id: 'c6', name: 'Cosmopolitan', description: 'Vodka, cranberry and citrus.', price: 850, category: 'COCKTAILS', image: img('cosmopolitan'), isAlcohol: true },
  { id: 'c7', name: 'Irish Buck', description: 'Whisky sour.', price: 850, category: 'COCKTAILS', image: img('irish-buck'), isAlcohol: true },
  { id: 'c8', name: 'Long Island Ice Tea', description: 'Five spirits, one glass. Pace yourself.', price: 1200, category: 'COCKTAILS', image: img('energy'), isAlcohol: true, tag: 'POPULAR' },
  { id: 'c9', name: 'Sangria', description: 'Wine and brandy with fruit. Made for sharing.', price: 500, category: 'COCKTAILS', image: img('sangria'), isAlcohol: true, options: [{ id: 'size', title: 'Size', type: 'single', required: true, choices: [{ id: 'glass', label: 'Glass' }, { id: 'jug', label: 'Jug', delta: 1500 }] }] },

  // ---------------- BEER & CIDER ----------------
  { id: 'b1', description: 'Lager, Malt, Lite or Ndimu.', name: 'Tusker', price: 350, category: 'BEER_CIDER', image: img('lager'), isAlcohol: true, tag: 'BEST SELLER', options: [flavours('variant', 'Variant', ['Tusker Lager', 'Tusker Malt', 'Tusker Lite', 'Tusker Ndimu'])] },
  { id: 'b2', name: 'White Cap Lager', description: 'Premium Kenyan lager.', price: 380, category: 'BEER_CIDER', image: img('white-cap'), isAlcohol: true },
  { id: 'b3', name: 'Guinness', description: 'Kubwa or Smooth.', price: 350, category: 'BEER_CIDER', image: img('guinness'), isAlcohol: true, options: [flavours('variant', 'Variant', ['Kubwa', 'Smooth'])] },
  { id: 'b4', name: 'Pilsner / Balozi', description: 'Easy-drinking Kenyan lagers.', price: 350, category: 'BEER_CIDER', image: img('lager'), isAlcohol: true, options: [flavours('variant', 'Beer', ['Pilsner', 'Balozi'])] },
  { id: 'b5', name: 'Heineken', description: 'Lager or Zero.', price: 360, category: 'BEER_CIDER', image: img('white-cap'), isAlcohol: true, options: [flavours('variant', 'Variant', ['Lager', '0.0 Zero'])] },
  { id: 'b6', name: 'Ciders', description: 'Tusker Sweet, Manyatta Pineapple, Savannah Dry or Hunters Dry.', price: 350, category: 'BEER_CIDER', image: img('cider'), isAlcohol: true, options: [{ id: 'variant', title: 'Cider', type: 'single', required: true, choices: [{ id: 'tusker', label: 'Tusker Sweet Cider' }, { id: 'manyatta', label: 'Manyatta Cider' }, { id: 'savannah', label: 'Savannah Dry', delta: 30 }, { id: 'hunters', label: 'Hunters Dry', delta: 30 }] }] },
  { id: 'b7', name: 'Smirnoff Alcopops', description: 'Pineapple, Ice or Guarana.', price: 350, category: 'BEER_CIDER', image: img('cider'), isAlcohol: true, options: [flavours('variant', 'Flavour', ['Pineapple', 'Ice', 'Guarana'])] },

  // ---------------- WINE & PORT ----------------
  { id: 'w1', name: 'Kijani House Wine', description: 'By the glass — dry white or dry red.', price: 300, category: 'WINE', image: img('house-wine'), isAlcohol: true, tag: 'POPULAR', options: [flavours('colour', 'Colour', ['Dry White', 'Dry Red'])] },
  { id: 'w2', name: '4th Street Sweet', description: 'Sweet red or white, by the glass.', price: 300, category: 'WINE', image: img('red-wine'), isAlcohol: true, options: [flavours('colour', 'Colour', ['Sweet Red', 'Sweet White'])] },
  { id: 'w3', name: 'Nederburg', description: 'South African classics, by the bottle.', price: 3000, category: 'WINE', image: img('red-wine'), isAlcohol: true, options: [{ id: 'wine', title: 'Wine', type: 'single', required: true, choices: [{ id: 'merlot', label: 'Merlot' }, { id: 'chardonnay', label: 'Chardonnay' }, { id: 'sauv', label: 'Sauvignon Blanc' }, { id: 'brut', label: 'Cuvée Brut (sparkling)', delta: 1500 }] }] },
  { id: 'w4', name: 'Spier Signature', description: 'Cabernet Sauvignon or Shiraz, by the bottle.', price: 3000, category: 'WINE', image: img('house-wine'), isAlcohol: true, options: [flavours('wine', 'Wine', ['Cabernet Sauvignon', 'Shiraz'])] },
  { id: 'w5', name: 'Cellar Cask', description: 'Sweet red or white, by the bottle.', price: 1900, category: 'WINE', image: img('red-wine'), isAlcohol: true, options: [flavours('colour', 'Colour', ['Sweet Red', 'Sweet White'])] },
  { id: 'w6', name: 'Port & Sherry', description: 'Sandeman Ruby, Sandeman Tawny or Croft Original — by the glass.', price: 250, category: 'WINE', image: img('cognac'), isAlcohol: true, options: [flavours('pour', 'Pour', ['Sandeman Ruby Port', 'Sandeman Tawny Port', 'Croft Original Sherry'])] },

  // ---------------- SPIRITS ----------------
  { id: 'sp1', name: 'Johnnie Walker Black', description: 'Blended Scotch whisky.', price: 300, category: 'SPIRITS', image: img('johnnie-walker'), isAlcohol: true, tag: 'POPULAR', options: [totOrBottle(6000, 300)] },
  { id: 'sp2', name: 'Jameson Irish Whiskey', description: 'Triple-distilled, smooth.', price: 250, category: 'SPIRITS', image: img('whisky'), isAlcohol: true, options: [totOrBottle(4500, 250)] },
  { id: 'sp3', name: 'Jack Daniel’s', description: 'No.7, Fire or Honey.', price: 350, category: 'SPIRITS', image: img('jack-daniels'), isAlcohol: true, options: [flavours('variant', 'Variant', ['Old No. 7', 'Fire', 'Honey']), totOrBottle(6000, 350)] },
  { id: 'sp4', name: 'Singleton 12yr Malt', description: 'Speyside single malt.', price: 400, category: 'SPIRITS', image: img('whisky'), isAlcohol: true, options: [totOrBottle(7500, 400)] },
  { id: 'sp5', name: 'Glenlivet 12yr Malt', description: 'Single malt Scotch.', price: 600, category: 'SPIRITS', image: img('whisky'), isAlcohol: true },
  { id: 'sp6', name: 'Hennessy VS', description: 'Cognac.', price: 550, category: 'SPIRITS', image: img('cognac'), isAlcohol: true, options: [totOrBottle(8500, 550)] },
  { id: 'sp7', name: 'Tanqueray London Gin', description: 'Classic London dry.', price: 300, category: 'SPIRITS', image: img('tom-collins'), isAlcohol: true, options: [totOrBottle(5000, 300)] },
  { id: 'sp8', name: 'Captain Morgan Spiced', description: 'Spiced rum.', price: 250, category: 'SPIRITS', image: img('cognac'), isAlcohol: true },
  { id: 'sp9', name: 'Baileys Irish Cream', description: 'Liqueur.', price: 300, category: 'SPIRITS', image: img('iced-coffee'), isAlcohol: true },
  { id: 'sp10', name: 'Jägermeister', description: 'Herbal liqueur.', price: 300, category: 'SPIRITS', image: img('cognac'), isAlcohol: true, options: [totOrBottle(5000, 300)] },
];

export const findItem = (id: string) => MENU_ITEMS.find((i) => i.id === id);

export const BEST_SELLER_IDS = ['m4', 's5', 'm3', 's11', 'm5', 'm6', 'd1', 'c4'];
