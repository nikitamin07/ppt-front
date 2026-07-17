import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const ruPlural = new Intl.PluralRules("ru-RU");

/**
 * Русское склонение по числу: plural(5, { one: "позиция", few: "позиции", many: "позиций" }).
 * Правила берёт Intl, поэтому арифметику с остатками от деления писать не нужно.
 */
export function plural(count: number, forms: { one: string; few: string; many: string }): string {
  const rule = ruPlural.select(count);
  return rule === "one" || rule === "few" ? forms[rule] : forms.many;
}

/** Обрезает текст для <meta name="description">: схлопывает переносы строк, не рвёт слово. */
export function truncateForMeta(text: string, maxLength = 160): string {
  const flat = text.replace(/\s+/g, " ").trim();
  if (flat.length <= maxLength) return flat;
  return flat.slice(0, flat.lastIndexOf(" ", maxLength)) + "…";
}
