import { apiGet, apiPost } from "@/shared/api";
import type { Product } from "../model/types";

interface GetProductsParams {
  category?: string;
  page?: number; // постранично по 8; без page — весь список
  query?: string; // поиск по названию, аналог старого search.php
  [key: string]: string | number | undefined;
}

export function getProducts(params?: GetProductsParams): Promise<Product[]> {
  return apiGet<Product[]>("/products", params);
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
export function getFeaturedProducts(): Promise<Product[]> {
  return apiGet<Product[]>("/products/featured");
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
  page?: number; // по 8; без page — все подходящие
}

export interface ProductFilterResult {
  items: Product[];
  total: number; // всего товаров под фильтр (для пагинации)
}

export function filterProducts(params: ProductFilterParams): Promise<ProductFilterResult> {
  return apiPost<ProductFilterResult>("/products/filter", params);
}
