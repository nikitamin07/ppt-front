import { apiGet } from "@/shared/api";
import type { Category } from "../model/types";

export function getCategoryTree(): Promise<Category[]> {
  return apiGet<Category[]>("/categories");
}

export function getCategoryBySlug(slug: string): Promise<Category> {
  return apiGet<Category>(`/categories/${slug}`);
}

export async function getCategoriesCount(): Promise<number> {
  const { count } = await apiGet<{ count: number }>("/categories/count");
  return count;
}
