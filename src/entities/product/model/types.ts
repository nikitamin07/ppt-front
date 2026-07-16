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

// Главная модель Товара
export interface Product {
  id: number;
  // Ссылка на категорию товара — корневую или подкатегорию. null бывает: товар 42 висит
  // без категории, из-за чего у него нет и адреса вида /catalog/<категория>/<товар>.
  category_id: number | null;
  slug: string;
  name: string;
  description: string;
  price: number;
  discount_price: number | null;
  price_unit: string;
  is_featured: boolean; // «Показывать в популярных» — блок на главной, максимум 8 товаров
  is_volume_price: boolean;
  volume_price: ProductVolumePrice | null;
  image_url: string | null;
  // Динамический массив характеристик «ключ-значение» для этого товара
  attributes: ProductAttributeValue[];
  related_product_ids: number[];
}
