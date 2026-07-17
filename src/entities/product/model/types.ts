export interface Attribute {
  id: number;
  name: string;
}

// Значение характеристики, привязанное к конкретному товару
export interface ProductAttributeValue {
  attribute_id: number;
  name: string;         // Ключ характеристики (подтягивается из Attribute)
  value: string;        // Индивидуальное значение
}

// Если цена зависит от объема: цена + свободное текстовое пояснение («до 10 кубов», «до 5 паллет»...)
export interface ProductVolumePriceTier {
  price: number;
  label: string | null;
}

// Ступенчатая цена в зависимости от объема заказа: low и medium обязательны, high опционален
export interface ProductVolumePrice {
  low: ProductVolumePriceTier;
  medium: ProductVolumePriceTier;
  high: ProductVolumePriceTier | null;
}

// Производитель в теле товара — только id и название. Логотип и полный список: entities/manufacturer.
export interface ProductManufacturer {
  id: number;
  name: string;
}

/**
 * Товар в списке — то, что отдают /products, /products/featured и /products/filter.
 *
 * Ровно поля карточки: description и attributes весят в разы больше всего остального,
 * поэтому в списках их нет. Нужен полный товар — берите Product (эндпоинт одного товара).
 */
export interface ProductListItem {
  id: number;
  // Категория товара — корневая или подкатегория. Схема допускает null (категорию можно
  // отвязать в админке), но сейчас категория есть у всех товаров.
  category_id: number | null;
  // Слаг прямой категории — из него строится адрес /catalog/{category_slug}/{slug}.
  // null тогда же, когда null category_id.
  category_slug: string | null;
  slug: string;
  name: string;
  price: number;
  discount_price: number | null;
  price_unit: string;
  is_featured: boolean; // «Показывать в популярных» — блок на главной, максимум 8 товаров
  is_volume_price: boolean;
  volume_price: ProductVolumePrice | null;
  image_url: string | null;
  manufacturer: ProductManufacturer | null;
}

/** Полный товар — только с эндпоинта /products/{categorySlug}/{productSlug}. */
export interface Product extends ProductListItem {
  description: string;
  // Динамический массив характеристик «ключ-значение» для этого товара
  attributes: ProductAttributeValue[];
  related_product_ids: number[];
}
