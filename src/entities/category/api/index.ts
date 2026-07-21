import { apiGet } from "@/shared/api";
import type { Category, CategoryListItem, CategoryMeta } from "../model/types";

export function getCategoryTree(): Promise<CategoryListItem[]> {
  return apiGet<CategoryListItem[]>("/categories");
}

export function getCategoryBySlug(slug: string): Promise<Category> {
  return apiGet<Category>(`/categories/${slug}`);
}

// Только для generateMetadata: ~310 байт против 1.7 КБ у полной категории.
export function getCategoryMeta(slug: string): Promise<CategoryMeta> {
  return apiGet<CategoryMeta>(`/categories/${slug}/meta`);
}

export async function getCategoriesCount(): Promise<number> {
  const { count } = await apiGet<{ count: number }>("/categories/count");
  return count;
}
