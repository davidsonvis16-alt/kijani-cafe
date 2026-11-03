import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight, ChevronLeft, ChevronRight, CalendarDays, Martini, Gift, Baby, Smartphone,
  ShoppingBag, Utensils, Navigation, Clock, Star, Trees,
} from 'lucide-react';
import { OrderModeSwitch } from '../components/layout/OrderModeSwitch';
import { MenuCard } from '../components/menu/MenuCard';
import { MENU_CATEGORIES, MENU_ITEMS, BEST_SELLER_IDS, findItem } from '../data/menuData';
import { SITE } from '../data/site';
import { useUI } from '../contexts/UIContext';
import { useAuth } from '../contexts/AuthContext';
import { useReservation } from '../contexts/ReservationContext';
import { hoursTable, openStatus } from '../lib/hours';
import { ksh } from '../lib/format';
import { cn } from '../lib/utils';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryRail />
      <BestSellers />
      <PromoBento />
      <GardenStrip />
      <HowItWorks />
      <VisitUs />
    </>
  );
}

function Hero() {
  const { openReservation } = useReservation();
  const { openItem } = useUI();
  const burger = findItem('m4')!;
  const status = openStatus();

  return (
    <section className="relative bg-forest text-cream overflow-hidden">
      <div className="absolute inset-0 grain opacity-60" />
      <div className="absolute -right-40 -top-40 w-[600px] h-[600px] rounded-full bg-kijani/40 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 pt-10 pb-16 lg:py-20 grid lg:grid-cols-[1.05fr_1fr] gap-12 items-center">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 rounded-full pl-2 pr-4 py-1.5 text-xs font-bold"
          >
            <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-extrabold', status.open ? 'bg-leaf text-forest' : 'bg-ember text-white')}>
              {status.open ? 'OPEN' : 'CLOSED'}
            </span>
            Milimani · Nakuru
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="font-bebas text-[clamp(3.6rem,10vw,8.5rem)] leading-[0.85] tracking-wide mt-6"
          >
            Garden fresh.
            <br />
            <span className="text-leaf">Seriously</span> good.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-base sm:text-lg text-cream/75 mt-6 max-w-lg leading-relaxed"
          >
            Krunchy kuku, legendary masala chips, cold Tusker and slow afternoons under the trees. Order ahead for pickup, at your table, or delivered.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 space-y-5"
          >
            <OrderModeSwitch dark />
            <div className="flex flex-wrap gap-3">
              <Link
                to="/menu"
                className="group inline-flex items-center gap-3 bg-ember hover:bg-[#c94220] text-white pl-7 pr-2 py-2 rounded-full font-extrabold text-base shadow-[0_12px_30px_-10px_rgba(226,81,43,0.9)] transition-colors"
              >
                Start your order
                <span className="w-10 h-10 rounded-full bg-white/20 grid place-items-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Link>
              <button
                onClick={openReservation}
                className="inline-flex items-center gap-2 border-2 border-cream/25 hover:border-cream/60 px-6 py-3 rounded-full font-bold text-base"
              >
                <CalendarDays className="w-5 h-5" /> Book a table
              </button>
            </div>
          </motion.div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-cream/70">
            <span className="flex items-center gap-2"><Utensils className="w-4 h-4 text-leaf" /> {MENU_ITEMS.length} dishes & drinks</span>
            <span className="flex items-center gap-2"><Trees className="w-4 h-4 text-leaf" /> Garden seating</span>
            <span className="flex items-center gap-2"><Martini className="w-4 h-4 text-leaf" /> Happy Hour 5–7 PM</span>
          </div>
        </div>

        {/* Photo collage of real Kijani plates */}
        <div className="relative h-[420px] sm:h-[520px] lg:h-[600px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-0 w-[78%] h-[78%] rounded-[2.5rem] overflow-hidden shadow-2xl ring-8 ring-white/5"
          >
            <img src="/burger-and-fries.jpeg" alt="The Kijani Burger with skin-on chunky chips" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 bottom-0 w-[52%] h-[48%] rounded-[2rem] overflow-hidden shadow-2xl ring-8 ring-forest"
          >
            <img src="/images/ambiance/ambiance-4.jpg" alt="Spicy wings with chunky chips" className="w-full h-full object-cover" />
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={() => openItem(burger)}
            className="absolute right-4 sm:right-8 bottom-[14%] bg-paper text-ink rounded-2xl p-3 pr-4 flex items-center gap-3 shadow-2xl hover:-translate-y-1 transition-transform"
          >
            <span className="w-12 h-12 rounded-xl bg-ember text-white grid place-items-center">
              <Star className="w-6 h-6 fill-current" />
            </span>
            <span className="text-left">
              <span className="block text-[10px] font-extrabold tracking-wider text-ember">BEST SELLER</span>
              <span className="block font-extrabold text-sm text-forest">The Kijani Burger</span>
              <span className="block font-bebas text-xl tracking-wide text-forest leading-none mt-0.5">{ksh(burger.price)}</span>
            </span>
            <span className="ml-2 w-9 h-9 rounded-full bg-forest text-leaf grid place-items-center">
              <ShoppingBag className="w-4 h-4" />
            </span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, rotate: -20, scale: 0.6 }}
            animate={{ opacity: 1, rotate: -12, scale: 1 }}
            transition={{ delay: 0.45, type: 'spring' }}
            className="absolute left-[6%] top-[8%] w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-sun text-forest grid place-items-center text-center shadow-xl"
          >
            <span className="font-bebas leading-[0.85]">
              <span className="block text-sm tracking-widest">A Kenya classic</span>
              <span className="block text-3xl sm:text-4xl">Masala</span>
              <span className="block text-lg">chips magic</span>
            </span>
          </motion.div>
        </div>
      </div>

      {/* Ticker */}
      <div className="relative bg-leaf text-forest py-3 overflow-hidden border-y-2 border-forest">
        <div className="flex w-max animate-marquee font-bebas text-2xl tracking-wider whitespace-nowrap">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0" aria-hidden={k === 1}>
              {['Krunchy Chicken Strips', 'Chips Masala', 'Kijani Burger', 'Sirloin Steak', 'Mojito', 'Fish n Chips', 'Kuku Krunch', 'Oreo Shake', 'Cold Tusker', 'Spicy Wings'].map((t) => (
                <span key={t} className="px-6 flex items-center gap-6">
                  {t} <span className="text-kijani">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, action }: { eyebrow: string; title: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-8">
      <div>
        <p className="text-xs font-extrabold tracking-[0.25em] text-kijani uppercase">{eyebrow}</p>
        <h2 className="font-bebas text-5xl sm:text-6xl tracking-wide text-forest leading-[0.9] mt-2">{title}</h2>
      </div>
      {action}
    </div>
  );
}

function CategoryRail() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-16 pb-6">
      <SectionHeading eyebrow="What are you craving?" title="Explore the menu" />
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 snap-x">
        {MENU_CATEGORIES.map((cat, i) => (
          <motion.div key={cat.id} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.04 }} className="snap-start shrink-0">
            <Link to={`/menu#${cat.id}`} className="group block w-32 sm:w-36 text-center">
              <span className="block aspect-square rounded-full overflow-hidden ring-4 ring-transparent group-hover:ring-leaf transition-all shadow-lg">
                <img src={cat.image} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </span>
              <span className="block font-bebas text-xl tracking-wide text-forest mt-3 leading-none">{cat.label}</span>
              <span className="block text-[11px] text-ink/50 mt-1">{cat.blurb}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function BestSellers() {
  const rail = useRef<HTMLDivElement>(null);
  const items = BEST_SELLER_IDS.map(findItem).filter(Boolean) as typeof MENU_ITEMS;
  const scroll = (dir: number) => rail.current?.scrollBy({ left: dir * 300, behavior: 'smooth' });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
      <SectionHeading
        eyebrow="Nakuru’s favourites"
        title={<>Best sellers <span className="text-ember">🔥</span></>}
        action={
          <div className="hidden sm:flex gap-2">
            <button onClick={() => scroll(-1)} aria-label="Scroll left" className="w-11 h-11 rounded-full border border-forest/20 grid place-items-center hover:bg-forest hover:text-leaf">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => scroll(1)} aria-label="Scroll right" className="w-11 h-11 rounded-full border border-forest/20 grid place-items-center hover:bg-forest hover:text-leaf">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        }
      />
      <div ref={rail} className="flex gap-5 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 snap-x">
        {items.map((item) => (
          <MenuCard key={item.id} item={item} variant="rail" />
        ))}
        <Link
          to="/menu"
          className="w-[260px] shrink-0 snap-start rounded-3xl bg-forest text-cream flex flex-col items-center justify-center gap-3 p-8 text-center hover:bg-forest-2"
        >
          <span className="w-16 h-16 rounded-full bg-leaf text-forest grid place-items-center">
            <ArrowRight className="w-7 h-7" />
          </span>
          <span className="font-bebas text-3xl tracking-wide">See the full menu</span>
        </Link>
      </div>
    </section>
  );
}

function PromoBento() {
  const { user } = useAuth();
  const { openAuth } = useUI();
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-16">
      <div className="grid gap-5 lg:grid-cols-3 lg:grid-rows-2 lg:h-[560px]">
        <motion.div {...fadeUp} className="relative lg:col-span-2 lg:row-span-2 rounded-[2rem] overflow-hidden bg-forest text-cream min-h-[380px]">
          <img src="/images/food/mojito.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/80 to-transparent" />
          <div className="relative h-full p-8 sm:p-12 flex flex-col justify-end max-w-md">
            <span className="inline-flex items-center gap-2 self-start bg-sun text-forest rounded-full px-3 py-1 text-xs font-extrabold">
              <Martini className="w-3.5 h-3.5" /> MON – FRI · 5 – 7 PM
            </span>
            <h3 className="font-bebas text-6xl sm:text-7xl leading-[0.85] tracking-wide mt-4">
              Happy Hour<br /><span className="text-leaf">in the garden</span>
            </h3>
            <p className="text-cream/75 mt-4">Kocktails, cold beers and sundowners under the Milimani trees. The best two hours of your weekday.</p>
            <Link to="/deals" className="mt-6 self-start inline-flex items-center gap-2 bg-leaf text-forest px-6 py-3 rounded-full font-extrabold text-sm">
              See the bar menu <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        <motion.div {...fadeUp} className="relative rounded-[2rem] overflow-hidden bg-sun text-forest p-8 flex flex-col justify-between min-h-[260px]">
          <Gift className="absolute -right-6 -bottom-6 w-44 h-44 text-forest/10" />
          <div>
            <p className="text-xs font-extrabold tracking-[0.2em]">KIJANI REWARDS</p>
            <h3 className="font-bebas text-5xl leading-[0.9] tracking-wide mt-2">Eat. Earn.<br />Repeat.</h3>
            <p className="text-sm mt-3 max-w-[16rem] text-forest/80">Collect points on every online order and spend them on your next one.</p>
          </div>
          {user ? (
            <Link to="/account?tab=rewards" className="relative self-start bg-forest text-sun px-5 py-2.5 rounded-full font-extrabold text-sm">
              You have {user.points} pts →
            </Link>
          ) : (
            <button onClick={() => openAuth('signup')} className="relative self-start bg-forest text-sun px-5 py-2.5 rounded-full font-extrabold text-sm">
              Join free →
            </button>
          )}
        </motion.div>

        <motion.div {...fadeUp} className="relative rounded-[2rem] overflow-hidden min-h-[260px]">
          <img src="/images/food/kuku-chips.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
          <div className="relative h-full p-8 flex flex-col justify-end text-cream">
            <span className="w-10 h-10 rounded-full bg-leaf text-forest grid place-items-center mb-3"><Baby className="w-5 h-5" /></span>
            <h3 className="font-bebas text-4xl tracking-wide leading-none">Kids Corner · {ksh(600)}</h3>
            <p className="text-sm text-cream/80 mt-2">Every children’s meal includes a glass of squash.</p>
            <Link to="/menu#KIDS" className="mt-4 text-sm font-extrabold text-leaf">Order for the little ones →</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function GardenStrip() {
  const photos = [
    '/exterior-lawn-outdoor-seating.jpeg',
    '/covered-patio-wooden-tables.jpeg',
    '/images/ambiance/ambiance-2.jpg',
    '/interior-night-ambient-lighting.jpeg',
    '/garden-flowers-lawn.jpeg',
  ];
  return (
    <section className="relative bg-forest text-cream overflow-hidden py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid lg:grid-cols-[1fr_1.4fr] gap-12 items-center">
        <motion.div {...fadeUp}>
          <p className="text-xs font-extrabold tracking-[0.25em] text-leaf uppercase">The Kijani experience</p>
          <h2 className="font-serif italic text-5xl sm:text-6xl leading-[1.05] mt-4">
            Your little escape in the heart of Nakuru.
          </h2>
          <p className="text-cream/70 mt-6 max-w-md leading-relaxed">
            Sprawling lawns, a covered veranda and a cosy lounge. Come for lunch, stay for sundowners. Kids run free, the coffee is French-pressed and nobody rushes you.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link to="/experience" className="bg-leaf text-forest px-6 py-3 rounded-full font-extrabold text-sm">Explore the space</Link>
            <Link to="/gallery" className="border border-cream/25 px-6 py-3 rounded-full font-bold text-sm hover:bg-white/5">View gallery</Link>
          </div>
        </motion.div>
        <div className="grid grid-cols-6 grid-rows-2 gap-3 h-[420px] sm:h-[500px]">
          {photos.map((src, i) => (
            <motion.div
              key={src}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              className={cn(
                'rounded-3xl overflow-hidden',
                i === 0 && 'col-span-4 row-span-1',
                i === 1 && 'col-span-2 row-span-1',
                i === 2 && 'col-span-2 row-span-1',
                i === 3 && 'col-span-2 row-span-1',
                i === 4 && 'col-span-2 row-span-1',
              )}
            >
              <img src={src} alt="" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: Utensils, title: 'Pick your favourites', text: 'Customise every dish: sides, extras, how you like your steak.' },
    { icon: Smartphone, title: 'Pay your way', text: 'M-Pesa, card, or pay at the counter. Your call.' },
    { icon: ShoppingBag, title: 'Grab it & go', text: 'Collect from the counter, eat at your table, or have it delivered.' },
  ];
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-20">
      <SectionHeading eyebrow="Order ahead, skip the wait" title="Easy as 1, 2, 3" />
      <div className="grid md:grid-cols-3 gap-5">
        {steps.map(({ icon: Icon, title, text }, i) => (
          <motion.div key={title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }} className="relative bg-paper rounded-[2rem] p-8 border border-forest/10 overflow-hidden">
            <span className="absolute -right-2 -top-6 font-bebas text-[9rem] text-forest/[0.05] leading-none">{i + 1}</span>
            <span className="w-14 h-14 rounded-2xl bg-forest text-leaf grid place-items-center"><Icon className="w-7 h-7" /></span>
            <h3 className="font-bebas text-3xl tracking-wide text-forest mt-6">{title}</h3>
            <p className="text-sm text-ink/60 mt-2">{text}</p>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-10">
        <Link to="/menu" className="inline-flex items-center gap-2 bg-ember hover:bg-[#c94220] text-white px-8 py-4 rounded-full font-extrabold">
          Order now <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}

function VisitUs() {
  const { openReservation } = useReservation();
  const status = openStatus();
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-20">
      <div className="grid lg:grid-cols-2 rounded-[2rem] overflow-hidden bg-paper border border-forest/10">
        <div className="p-8 sm:p-12">
          <p className="text-xs font-extrabold tracking-[0.25em] text-kijani uppercase">Come say jambo</p>
          <h2 className="font-bebas text-5xl sm:text-6xl tracking-wide text-forest mt-2 leading-[0.9]">Find us in Milimani</h2>
          <p className="text-ink/70 mt-4">{SITE.address}</p>
          <p className={cn('inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-full text-xs font-extrabold', status.open ? 'bg-leaf/30 text-forest' : 'bg-ember/10 text-ember')}>
            <Clock className="w-3.5 h-3.5" /> {status.label}
          </p>
          <dl className="grid grid-cols-2 gap-y-1.5 text-sm mt-6 max-w-xs">
            {hoursTable().map((d) => (
              <React.Fragment key={d.name}>
                <dt className={cn('text-ink/60', d.today && 'font-extrabold text-forest')}>{d.name}</dt>
                <dd className={cn('text-right', d.today && 'font-extrabold text-forest', d.hours === 'Closed' && 'text-ember')}>{d.hours}</dd>
              </React.Fragment>
            ))}
          </dl>
          <div className="flex flex-wrap gap-3 mt-8">
            <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-forest text-leaf px-6 py-3 rounded-full font-extrabold text-sm">
              <Navigation className="w-4 h-4" /> Get directions
            </a>
            <button onClick={openReservation} className="inline-flex items-center gap-2 border border-forest/20 px-6 py-3 rounded-full font-bold text-sm">
              <CalendarDays className="w-4 h-4" /> Book a table
            </button>
          </div>
        </div>
        <iframe
          title="Map to Kijani Kafe"
          src="https://maps.google.com/maps?q=Menengai%20Drive%20Milimani%20Nakuru%20Kenya&t=&z=15&ie=UTF8&iwloc=&output=embed"
          className="w-full h-80 lg:h-full min-h-[320px] border-0 grayscale-[30%]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
