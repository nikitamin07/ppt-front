"use client";

import { getPosts, PostCard, type PostListItem } from "@/entities/post";
import { useInfiniteList } from "@/shared/lib/react";
import { FeedStatus } from "@/shared/ui/feed-status";

/** Бэкенд отдаёт по столько постов на страницу. */
const PER_PAGE = 8;

interface PostFeedProps {
  /** Первая страница, уже отфильтрованная на сервере. */
  initialPosts: PostListItem[];
  /** Фильтры из адреса — ими же дозапрашиваем страницы 2, 3, 4… */
  tag?: string;
  query?: string;
}

export function PostFeed({ initialPosts, tag, query }: PostFeedProps) {
  const { items, ...status } = useInfiniteList({
    initialItems: initialPosts,
    perPage: PER_PAGE,
    initiallyComplete: initialPosts.length < PER_PAGE,
    loadPage: (page) => getPosts({ page, tag, query }),
  });

  if (items.length === 0) {
    return (
      <p className="border border-line bg-card p-6 text-sm text-muted-foreground">
        По этому запросу статей нет. Попробуйте другую тему или слово.
      </p>
    );
  }

  return (
    <div aria-busy={status.loading}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {items.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <FeedStatus {...status} onRetry={status.retry} errorText="Не удалось загрузить статьи." />
    </div>
  );
}
