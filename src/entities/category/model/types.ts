export interface Category {
  id: number;
  parent_id: number | null;
  slug: string; // alias в старой БД
  name: string;
  description: string;
  children?: Category[];
}
