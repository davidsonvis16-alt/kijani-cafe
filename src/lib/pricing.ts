import { MenuItem, Selections, CartLine } from '../types';

export function unitPrice(item: MenuItem, selections: Selections): number {
  let total = item.price;
  for (const group of item.options ?? []) {
    for (const choiceId of selections[group.id] ?? []) {
      total += group.choices.find((c) => c.id === choiceId)?.delta ?? 0;
    }
  }
  return total;
}

export function lineTotal(line: CartLine) {
  return unitPrice(line.item, line.selections) * line.quantity;
}

export function describeSelections(item: MenuItem, selections: Selections): string {
  const parts: string[] = [];
  for (const group of item.options ?? []) {
    for (const choiceId of selections[group.id] ?? []) {
      const label = group.choices.find((c) => c.id === choiceId)?.label;
      if (label) parts.push(label);
    }
  }
  return parts.join(' · ');
}

export function defaultSelections(item: MenuItem): Selections {
  const sel: Selections = {};
  for (const group of item.options ?? []) {
    sel[group.id] = group.type === 'single' && group.required ? [group.choices[0].id] : [];
  }
  return sel;
}

/** Stable key so the same item with the same choices stacks in the cart. */
export function lineKey(itemId: string, selections: Selections, note?: string) {
  const sel = Object.keys(selections)
    .sort()
    .map((k) => `${k}:${[...selections[k]].sort().join(',')}`)
    .join('|');
  return `${itemId}#${sel}#${(note ?? '').trim()}`;
}

/** True when a required choice changes the price, so the card should say "from". Optional add-ons don't count. */
export function hasPriceRange(item: MenuItem) {
  return (item.options ?? []).some((g) => g.type === 'single' && g.choices.some((c) => (c.delta ?? 0) > 0));
}
