import type { ProductFilterParams } from "@/entities/product";

/** Значения ?sort=. Совпадают с тем, что принимает бэкенд. */
export const SORT_OPTIONS = [
  { value: "default", label: "По умолчанию" },
  { value: "price_asc", label: "Сначала дешёвые" },
  { value: "price_desc", label: "Сначала дорогие" },
  { value: "name", label: "По названию" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

/** Фильтры как они лежат в адресе страницы. */
export interface CatalogSearchParams {
  query?: string;
  price_min?: string;
  price_max?: string;
  discounted?: string;
  featured?: string;
  volume?: string;
  /** Подкатегории через запятую — уточнение внутри корневой категории. */
  sub?: string;
  /** id производителей через запятую. */
  manufacturers?: string;
  sort?: string;
}

const isSort = (value?: string): value is SortValue =>
  SORT_OPTIONS.some((option) => option.value === value);

/** «1» в адресе — включённая галочка. Любое другое значение считаем выключенным. */
const isOn = (value?: string) => value === "1";

/** Число из адреса; мусор («abc», отрицательное) молча игнорируем — бэкенд на нём даёт 422. */
function toNumber(value?: string): number | undefined {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

/**
 * Адрес страницы → тело запроса к API.
 *
 * `categorySlug` — категория из пути. Отмеченные подкатегории сужают выборку внутри неё;
 * без них берём саму категорию (корневой слаг бэкенд разворачивает в её подкатегории сам).
 */
export function toFilterParams(
  searchParams: CatalogSearchParams,
  categorySlug: string,
  page?: number,
): ProductFilterParams {
  const sub = searchParams.sub?.split(",").filter(Boolean) ?? [];
  // Бэкенд ждёт id числами; мусор в адресе отбрасываем, иначе получим 422.
  const manufacturers = (searchParams.manufacturers?.split(",") ?? [])
    .map(Number)
    .filter((id) => Number.isInteger(id) && id > 0);

  return {
    categories: sub.length > 0 ? sub : [categorySlug],
    query: searchParams.query || undefined,
    price_min: toNumber(searchParams.price_min),
    price_max: toNumber(searchParams.price_max),
    manufacturers: manufacturers.length > 0 ? manufacturers : undefined,
    discounted: isOn(searchParams.discounted) || undefined,
    featured: isOn(searchParams.featured) || undefined,
    is_volume_price: isOn(searchParams.volume) || undefined,
    sort: isSort(searchParams.sort) ? searchParams.sort : undefined,
    page,
  };
}

/** Есть ли что сбрасывать: категория из пути фильтром не считается. */
export function hasActiveFilters(searchParams: CatalogSearchParams): boolean {
  const { query, price_min, price_max, discounted, featured, volume, sub, manufacturers } = searchParams;
  return Boolean(query || price_min || price_max || discounted || featured || volume || sub || manufacturers);
}
