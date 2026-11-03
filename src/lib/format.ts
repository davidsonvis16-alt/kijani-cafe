export const ksh = (n: number) => `KSh ${Math.round(n).toLocaleString('en-KE')}`;

export const formatTime = (ts: number) =>
  new Date(ts).toLocaleTimeString('en-KE', { hour: 'numeric', minute: '2-digit' });

export const formatDate = (ts: number) =>
  new Date(ts).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' });

export const uid = (prefix = '') =>
  prefix + Math.random().toString(36).slice(2, 8).toUpperCase() + Date.now().toString(36).slice(-3).toUpperCase();

/** Normalise a Kenyan mobile number to 2547XXXXXXXX / 2541XXXXXXXX, or null if invalid. */
export function normaliseKePhone(input: string): string | null {
  const digits = input.replace(/\D/g, '');
  let local = digits;
  if (local.startsWith('254')) local = local.slice(3);
  else if (local.startsWith('0')) local = local.slice(1);
  return /^[17]\d{8}$/.test(local) ? `254${local}` : null;
}
