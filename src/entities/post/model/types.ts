export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  published_at: string; // ISO date
  tag_ids: number[]; // связь с entities/tag собирается на уровне widgets/pages
}
