import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, MessageCircle, Navigation } from 'lucide-react';
import { Logo } from './Logo';
import { NAV_LINKS } from './Header';
import { SITE } from '../../data/site';
import { hoursTable } from '../../lib/hours';
import { cn } from '../../lib/utils';

export function Footer() {
  return (
    <footer className="bg-forest text-cream grain pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-16 pb-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4 space-y-5">
            <Logo light />
            <p className="text-sm text-cream/70 max-w-xs leading-relaxed">
              Your little escape in the heart of Nakuru. Good food, fresh air and slow moments under the Milimani trees.
            </p>
            <div className="flex gap-2">
              <a
                href={`https://wa.me/${SITE.phoneIntl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-leaf text-forest px-4 py-2.5 rounded-full text-xs font-extrabold"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp us
              </a>
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-cream/25 px-4 py-2.5 rounded-full text-xs font-bold hover:bg-white/5"
              >
                <Navigation className="w-4 h-4" /> Directions
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bebas text-xl tracking-wide text-leaf mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-cream/75 hover:text-white">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bebas text-xl tracking-wide text-leaf mb-4">Your Kijani</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/menu" className="text-cream/75 hover:text-white">Order online</Link></li>
              <li><Link to="/account" className="text-cream/75 hover:text-white">Account & rewards</Link></li>
              <li><Link to="/account?tab=orders" className="text-cream/75 hover:text-white">Track an order</Link></li>
              <li><Link to="/deals" className="text-cream/75 hover:text-white">Happy Hour</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="font-bebas text-xl tracking-wide text-leaf mb-4">Visit</h4>
            <p className="flex gap-2.5 text-sm text-cream/80 mb-2">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-leaf" /> {SITE.address}
            </p>
            <a href={`tel:+${SITE.phoneIntl}`} className="flex gap-2.5 text-sm font-bold mb-4 hover:text-leaf">
              <Phone className="w-4 h-4 mt-0.5 shrink-0 text-leaf" /> {SITE.phoneDisplay}
            </a>
            <div className="flex gap-2.5 text-sm">
              <Clock className="w-4 h-4 mt-0.5 shrink-0 text-leaf" />
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-cream/75">
                {hoursTable().map((d) => (
                  <React.Fragment key={d.name}>
                    <dt className={cn(d.today && 'text-white font-bold')}>{d.name}</dt>
                    <dd className={cn(d.today && 'text-white font-bold', d.hours === 'Closed' && 'text-ember')}>{d.hours}</dd>
                  </React.Fragment>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/50">
          <p>© {new Date().getFullYear()} Kijani Kafe. Alcohol is not sold to persons under 18.</p>
          <p>
            Website by{' '}
            <a href="https://portfolio-e-mu.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Eden
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
