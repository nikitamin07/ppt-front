/**
 * Статья в списке (/posts, /posts/latest) без `content`
 */
export interface PostListItem {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  cover_image_url: string | null;
  published_at: string; // ISO date
  updated_at: string; // для lastmod в sitemap
  tag_ids: number[]; // связь с entities/tag собирается на уровне widgets/pages
}

/** Полная статья — только с эндпоинта /posts/{slug}. */
export interface Post extends PostListItem {
  content: string;
}
