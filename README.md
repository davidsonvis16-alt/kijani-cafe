# Kijani Kafe — Bar & Restaurant, Milimani, Nakuru

React 19 + Vite + Tailwind v4 site with online ordering.

## Run

```
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Features

- Full food + bar menu (`src/data/menuData.ts`) with real prices and options (sides, flavours, tot/bottle, extras)
- Item customisation, 18+ check for alcohol, persistent bag, upsells
- Checkout: pickup / dine-in / delivery, ASAP or scheduled, M-Pesa / card / pay-at-counter, promo codes, tips, points
- Accounts, Kijani Rewards points and tiers, favourites, saved addresses, order history, reorder
- Order tracking page and a WhatsApp ticket to the kitchen
- Live open/closed status and Happy Hour (East Africa Time), Restaurant schema for Google

## Before going live

Front-end only. Everything is stored in the visitor's browser.

- **Payments are simulated** (`ORDERING.demoPayments` in `src/data/site.ts`). Wire up Safaricom Daraja (STK push) and a card processor on a server.
- **Accounts** are local to the browser. Replace `AuthContext` with a real backend (Supabase, Firebase, etc.).
- **Order status** advances on a timer. Feed it from a kitchen system.
- Confirm everything marked `CONFIRM` in `src/data/site.ts`: hours, delivery fee and minimum, promo codes, rewards.
