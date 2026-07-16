import type { Category } from "./types";

/**
 * id → slug по всему дереву (корни + подкатегории).
 *
 * Нужна, потому что в теле товара приходит только `category_id`, а адрес товара —
 * /catalog/<слаг категории>/<слаг товара>. Как только бэкенд начнёт отдавать
 * `category_slug` прямо в товаре, эта карта и лишний запрос дерева станут не нужны.
 */
export function buildCategorySlugMap(tree: Category[]): Map<number, string> {
  const map = new Map<number, string>();

  for (const root of tree) {
    map.set(root.id, root.slug);
    for (const child of root.children ?? []) map.set(child.id, child.slug);
  }

  return map;
}
