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
 * Товар в списке (/products, /featured, /filter) — без description
 * и attributes: полный товар только в Product.
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

/**
 * Крошечный ответ /products/{categorySlug}/{productSlug}/meta — только для generateMetadata.
 * meta_description пишется в админке отдельно и уже влезает в сниппет; «» если его стёрли.
 */
export interface ProductMeta {
  slug: string;
  name: string;
  meta_description: string;
  image_url: string | null;
  category_slug: string;
}

/** Полный товар — только с эндпоинта /products/{categorySlug}/{productSlug}. */
export interface Product extends ProductListItem {
  description: string;
  // Динамический массив характеристик «ключ-значение» для этого товара
  attributes: ProductAttributeValue[];
  related_product_ids: number[];
  // Все фото товара в порядке из админки; [] когда их нет. image_url — это image_urls[0].
  image_urls: string[];
  // Показывать ли калькулятор объёма: считает бэкенд по настройке категории
  // и вычислимости объёма. Готовый ответ — своих условий не добавляем.
  // camelCase здесь намеренный: единственное исключение в snake_case API.
  isCalculative: boolean;
  // Кубов в одной упаковке. null — товар продаётся кубами, объём считается напрямую.
  cubes_per_pack: number | null;
}
