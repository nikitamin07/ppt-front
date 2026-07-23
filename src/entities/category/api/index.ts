import { apiGet, REFERENCE_TTL } from "@/shared/api";
import type { Category, CategoryListItem, CategoryMeta } from "../model/types";

// Кэшируем: дерево нужно каждой странице каталога для разбора адреса, а меняется
// оно только когда админ правит структуру. Сброс — перезапуск контейнера или TTL.
export function getCategoryTree(): Promise<CategoryListItem[]> {
  return apiGet<CategoryListItem[]>("/categories", undefined, REFERENCE_TTL);
}

export function getCategoryBySlug(slug: string): Promise<Category> {
  return apiGet<Category>(`/categories/${slug}`);
}

/**
 * Цепочка от корня до категории: [корень] или [корень, подкатегория]; пусто — слага в дереве нет.
 * Дерево строго одноуровневое и целиком приходит одним небольшим ответом.
 */
export async function getCategoryTrail(slug: string): Promise<CategoryListItem[]> {
  const roots = await getCategoryTree();

  for (const root of roots) {
    if (root.slug === slug) return [root];

    const child = root.children?.find((item) => item.slug === slug);
    if (child) return [root, child];
  }

  return [];
}

/** Сегменты адреса категории: «penoplast» или «penoplast/ppt». */
export function categoryPath(trail: CategoryListItem[]): string {
  return trail.map((item) => item.slug).join("/");
}

// Только для generateMetadata: ~310 байт против 1.7 КБ у полной категории.
export function getCategoryMeta(slug: string): Promise<CategoryMeta> {
  return apiGet<CategoryMeta>(`/categories/${slug}/meta`);
}

export async function getCategoriesCount(): Promise<number> {
  const { count } = await apiGet<{ count: number }>("/categories/count");
  return count;
}
