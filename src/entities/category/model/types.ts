/** Узел дерева: GET /categories и вложенные children — без description. */
export interface CategoryListItem {
  id: number;
  parent_id: number | null;
  slug: string; // alias в старой БД
  name: string;
  children?: CategoryListItem[];
}

/** Одна категория: GET /categories/{slug} — единственный источник description («» если не задано). */
export interface Category extends CategoryListItem {
  description: string;
}
