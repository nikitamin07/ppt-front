import { apiGet } from "@/shared/api";
import type { Category } from "../model/types";

export function getCategoryTree(): Promise<Category[]> {
  return apiGet<Category[]>("/categories");
}

export function getCategoryBySlug(slug: string): Promise<Category> {
  return apiGet<Category>(`/categories/${slug}`);
}
