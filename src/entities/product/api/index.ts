import { apiGet } from "@/shared/api";
import type { Product } from "../model/types";

interface GetProductsParams {
  category?: string;
  page?: number;
  query?: string; // поиск по названию, аналог старого search.php
  [key: string]: string | number | undefined;
}

export function getProducts(params?: GetProductsParams): Promise<Product[]> {
  return apiGet<Product[]>("/products", params);
}

export function getProductBySlug(categorySlug: string, productSlug: string): Promise<Product> {
  return apiGet<Product>(`/products/${categorySlug}/${productSlug}`);
}
