import { apiGet, apiPost } from "@/shared/api";
import type { Product, ProductListItem } from "../model/types";

interface GetProductsParams {
  category?: string;
  page?: number; // по 8; без page — первая страница (всего товаров: getProductsCount)
  query?: string; // поиск по названию, аналог старого search.php
  [key: string]: string | number | undefined;
}

export function getProducts(params?: GetProductsParams): Promise<ProductListItem[]> {
  return apiGet<ProductListItem[]>("/products", params);
}

export function getProductBySlug(categorySlug: string, productSlug: string): Promise<Product> {
  return apiGet<Product>(`/products/${categorySlug}/${productSlug}`);
}

interface ProductsCountParams {
  category?: string;
  query?: string;
  [key: string]: string | undefined;
}

export async function getProductsCount(params?: ProductsCountParams): Promise<number> {
  const { count } = await apiGet<{ count: number }>("/products/count", params);
  return count;
}

// Блок «Популярные»: максимум 8 товаров, пагинации нет
export function getFeaturedProducts(): Promise<ProductListItem[]> {
  return apiGet<ProductListItem[]>("/products/featured");
}

// Страница каталога с фильтрами: все поля опциональны, цены в рублях
export interface ProductFilterParams {
  query?: string;
  price_min?: number;
  price_max?: number;
  discounted?: boolean; // со скидкой ИЛИ с объёмными тарифами
  categories?: string[]; // слаги; корневая категория включает свои подкатегории
  manufacturers?: number[]; // id производителей
  featured?: boolean;
  is_volume_price?: boolean;
  sort?: "default" | "price_asc" | "price_desc" | "name";
  // По 8; без page — первая страница. Общее число совпадений — total в ответе.
  page?: number;
}

export interface ProductFilterResult {
  items: ProductListItem[];
  total: number; // всего товаров под фильтр (для пагинации)
}

export function filterProducts(params: ProductFilterParams): Promise<ProductFilterResult> {
  return apiPost<ProductFilterResult>("/products/filter", params);
}
