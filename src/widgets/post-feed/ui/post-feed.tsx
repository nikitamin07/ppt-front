"use client";

import { useCallback, useEffect, useState } from "react";
import { useIntersectionObserver } from "usehooks-ts";
import { getPosts, PostCard, type Post } from "@/entities/post";
import { Button } from "@/shared/ui/button";

/** Бэкенд отдаёт по столько постов на страницу; неполная порция — значит список кончился. */
const PER_PAGE = 8;

interface PostFeedProps {
  /** Первая страница, уже отфильтрованная на сервере. */
  initialPosts: Post[];
  /** Фильтры из адреса — нужны, чтобы дозапрашивать страницы 2, 3, 4… тем же набором. */
  tag?: string;
  query?: string;
}

/**
 * Лента с догрузкой по скроллу. Фильтры живут в URL, поэтому здесь их не переключают:
 * страница монтирует ленту заново (key по фильтрам) с готовой первой страницей.
 */
export function PostFeed({ initialPosts, tag, query }: PostFeedProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [page, setPage] = useState(1);
  const [reachedEnd, setReachedEnd] = useState(initialPosts.length < PER_PAGE);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  const loadNext = useCallback(async () => {
    setLoading(true);
    setFailed(false);
    try {
      const nextPage = page + 1;
      const batch = await getPosts({ page: nextPage, tag, query });
      setPosts((prev) => [...prev, ...batch]);
      setPage(nextPage);
      setReachedEnd(batch.length < PER_PAGE);
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }, [page, tag, query]);

  // Следим за меткой под лентой. Проверяем состояние, а не onChange наблюдателя: если после
  // подгрузки метка осталась во вьюпорте, нового события пересечения не будет и лента встанет.
  const { ref: sentinelRef, isIntersecting } = useIntersectionObserver({ rootMargin: "400px" });
  const canLoadMore = isIntersecting && !loading && !reachedEnd && !failed;

  useEffect(() => {
    // Правило советует подписываться через onChange самого наблюдателя — см. причину выше.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (canLoadMore) void loadNext();
  }, [canLoadMore, loadNext]);

  if (posts.length === 0) {
    return (
      <p className="border border-line bg-card p-6 text-sm text-muted-foreground">
        По этому запросу статей нет. Попробуйте другую тему или слово.
      </p>
    );
  }

  return (
    <div aria-busy={loading}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {failed && (
        <div className="mt-8 flex flex-col items-start gap-3">
          <p className="text-sm text-muted-foreground">Не удалось загрузить статьи.</p>
          <Button variant="ink" onClick={() => void loadNext()} className="py-2 font-medium">
            Повторить
          </Button>
        </div>
      )}

      {/* Метка догрузки: пока она во вьюпорте и посты не кончились — тянем следующую страницу. */}
      {!reachedEnd && !failed && (
        <div ref={sentinelRef} className="mt-8 h-10 text-center font-label text-xs text-muted-foreground">
          {loading ? "Загружаем…" : ""}
        </div>
      )}
    </div>
  );
}
