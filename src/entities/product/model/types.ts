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

// Ступенчатая цена в зависимости от объема заказа (наследие product_list)
export interface ProductVolumePrice {
  before_10: number;
  from_10_to_20: number;
  after_20: number;
}

// Главная модель Товара
export interface Product {
  id: number;
  category_id: number;  // Ссылка на подкатегорию, к которой принадлежит товар
  slug: string;
  name: string;
  description: string;
  price: number;
  discount_price: number | null;
  price_unit: string;
  is_volume_price: boolean;
  volume_price: ProductVolumePrice | null;
  image_url: string | null;
  template: string | null; // кастомный шаблон карточки товара (наследие CMS)
  // Динамический массив характеристик «ключ-значение» для этого товара
  attributes: ProductAttributeValue[];
  related_product_ids: number[];
}
