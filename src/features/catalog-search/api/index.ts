import { getProducts, type Product } from "@/entities/product";

export function searchProducts(query: string): Promise<Product[]> {
  return getProducts({ query });
}
