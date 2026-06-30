export interface Attribute {
  id: number;
  name: string; // Например, "Плотность, не менее" или "Группа горючести"
}

// 2. Значение характеристики, привязанное к конкретному товару
export interface ProductAttributeValue {
  attribute_id: number;
  name: string;         // Ключ характеристики (подтягивается из Attribute)
  value: string;        // Индивидуальное значение
}

// 3. Главная модель Товара
export interface Product {
  id: number;
  category_id: number;  // Ссылка на подкатегорию, к которой принадлежит товар
  slug: string;         // Например, "penoplast-ppt-20"
  name: string;         // Например, "Пенопласт ППТ-20"
  price: number;        // Цена за куб или лист
  image_url: string | null;
  // Динамический массив характеристик «ключ-значение» для этого товара
  attributes: ProductAttributeValue[]; 
}