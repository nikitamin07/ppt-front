// Коды Беларуси: мобильные (29, 44, 33, 25) и городские (17 и др.), после +375 всегда 9 цифр.
const AREA_CODES = ["29", "44", "33", "25", "17", "225", "222", "177", "174", "152", "232", "236", "212", "162"];

function isValidPrefix(digits: string): boolean {
  return AREA_CODES.some((code) => (digits.length <= code.length ? code.startsWith(digits) : digits.startsWith(code)));
}

// ponytail: "17" совпадает и с кодом Минска, и с началом 174/177 — после "17" разрешаем любые цифры,
// упрощение вместо полной таблицы кодов с учетом длины
export function sanitizeBelarusDigits(raw: string): string {
  const typed = raw.replace(/\D/g, "");
  let digits = "";
  for (const d of typed) {
    const next = digits + d;
    if (next.length <= 9 && isValidPrefix(next)) digits = next;
  }
  return digits;
}

export function formatBelarusDigits(digits: string): string {
  const a = digits.slice(0, 2);
  const b = digits.slice(2, 5);
  const c = digits.slice(5, 7);
  const d = digits.slice(7, 9);
  let out = "";
  if (a) out += a.length === 2 ? `(${a})` : `(${a}`;
  if (b) out += ` ${b}`;
  if (c) out += `-${c}`;
  if (d) out += `-${d}`;
  return out;
}

if (process.env.NODE_ENV !== "production") {
  console.assert(sanitizeBelarusDigits("29X6918417abc") === "296918417", "strips non-digits, keeps valid code");
  console.assert(sanitizeBelarusDigits("399999999") === "3", "rejects area code not in list (39)");
  console.assert(sanitizeBelarusDigits("2969184171234") === "296918417", "caps at 9 digits");
  console.assert(formatBelarusDigits("296918417") === "(29) 691-84-17", "matches existing display format");
  console.assert(formatBelarusDigits("2") === "(2", "partial group while typing");
}
