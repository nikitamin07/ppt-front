export interface Attribute {
  id: number;
  name: string;
}

// Значение характеристики, привязанное к конкретному товару
export interface ProductAttributeValue {
  attribute_id: number;
  name: string;
  value: string;
}

// цена зависит от объема
export interface ProductVolumePriceTier {
  price: number;
  label: string | null;
}

// Ступенчатая цена в зависимости от объема заказа
export interface ProductVolumePrice {
  low: ProductVolumePriceTier;
  medium: ProductVolumePriceTier;
  high: ProductVolumePriceTier | null;
}

// Производитель в теле товара (только id и название)
export interface ProductManufacturer {
  id: number;
  name: string;
}

// Отзыв о товаре
export interface ProductComment {
  id: number;
  author: string;
  rating: number; // 1–5
  body: string;
  created_at: string;
}

/**
 * Товар в списке (/products, /featured, /filter) без description
 * и attributes: полный товар только в Product.
 */
export interface ProductListItem {
  id: number;
  category_id: number | null;
  category_slug: string | null;
  category_path: string | null;
  slug: string;
  name: string;
  price: number;
  discount_price: number | null;
  price_unit: string;
  is_featured: boolean; // «Показывать в популярных»
  is_volume_price: boolean;
  volume_price: ProductVolumePrice | null;
  image_url: string | null;
  manufacturer: ProductManufacturer | null;
  updated_at: string; // для lastmod в sitemap
}

/**
 * Крошечный ответ /products/{categorySlug}/{productSlug}/meta (для generateMetadata)
 */
export interface ProductMeta {
  slug: string;
  name: string;
  meta_description: string;
  image_url: string | null;
  category_slug: string;
}

/** полный товар с эндпоинта /products/{categorySlug}/{productSlug}. */
export interface Product extends ProductListItem {
  description: string;
  attributes: ProductAttributeValue[];
  related_product_ids: number[];
  image_urls: string[];
  isCalculative: boolean;
  cubes_per_pack: number | null;
  thickness: number | null;
  comments: ProductComment[];
}
