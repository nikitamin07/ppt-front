/**
 * Статья в списке — то, что отдают /posts и /posts/latest.
 *
 * Без `content`: полный HTML статьи весит в разы больше остальной карточки, а ленте он
 * не нужен. Нужен текст — берите Post (эндпоинт одной статьи).
 */
export interface PostListItem {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  cover_image_url: string | null;
  published_at: string; // ISO date
  tag_ids: number[]; // связь с entities/tag собирается на уровне widgets/pages
}

/** Полная статья — только с эндпоинта /posts/{slug}. */
export interface Post extends PostListItem {
  /** Сырой HTML из админки (авторам доверяем) — рендерить через dangerouslySetInnerHTML. */
  content: string;
}
