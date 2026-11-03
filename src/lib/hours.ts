import { HOURS, SITE } from '../data/site';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const fmtHour = (h: number) => {
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr} ${suffix}`;
};

/** Restaurant time is East Africa Time (UTC+3), regardless of the visitor's timezone. */
export function nairobiNow(date = new Date()) {
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  return new Date(utc + 3 * 3600000);
}

export function openStatus(date = new Date()) {
  const now = nairobiNow(date);
  const day = now.getDay();
  const hour = now.getHours() + now.getMinutes() / 60;
  const today = HOURS[day];

  if (today && hour >= today.open && hour < today.close) {
    const closingSoon = today.close - hour <= 1;
    return { open: true, label: closingSoon ? `Closing soon · ${fmtHour(today.close)}` : `Open now · until ${fmtHour(today.close)}` };
  }

  if (today && hour < today.open) {
    return { open: false, label: `Closed · opens ${fmtHour(today.open)} today` };
  }

  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    const h = HOURS[d];
    if (h) return { open: false, label: `Closed · opens ${i === 1 ? 'tomorrow' : DAYS[d]} ${fmtHour(h.open)}` };
  }
  return { open: false, label: 'Closed' };
}

export function isHappyHour(date = new Date()) {
  const now = nairobiNow(date);
  const h = now.getHours();
  return SITE.happyHour.days.includes(now.getDay()) && h >= SITE.happyHour.from && h < SITE.happyHour.to;
}

export function hoursTable() {
  return DAYS.map((name, i) => ({
    name,
    hours: HOURS[i] ? `${fmtHour(HOURS[i]!.open)} – ${fmtHour(HOURS[i]!.close)}` : 'Closed',
    today: nairobiNow().getDay() === i,
  }));
}

/** 15-minute pickup slots for the rest of today's trading hours. */
export function todaySlots(leadMinutes: number): string[] {
  const now = nairobiNow();
  const today = HOURS[now.getDay()];
  if (!today) return [];
  const slots: string[] = [];
  const start = new Date(now.getTime() + leadMinutes * 60000);
  start.setMinutes(Math.ceil(start.getMinutes() / 15) * 15, 0, 0);
  const t = new Date(start);
  if (t.getHours() < today.open) t.setHours(today.open, 0, 0, 0);
  while (t.getHours() < today.close && t.getDate() === now.getDate()) {
    slots.push(t.toLocaleTimeString('en-KE', { hour: 'numeric', minute: '2-digit' }));
    t.setMinutes(t.getMinutes() + 15);
  }
  return slots;
}
