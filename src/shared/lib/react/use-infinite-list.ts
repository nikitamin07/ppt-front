"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "usehooks-ts";

interface UseInfiniteListOptions<T> {
  /** Первая страница, отрендеренная на сервере. */
  initialItems: T[];
  /** Догрузка страницы (нумерация с 1). Порция короче perPage означает конец списка. */
  loadPage: (page: number) => Promise<T[]>;
  perPage: number;
  /** Список кончился сразу — например, бэкенд прислал total и он уже покрыт первой страницей. */
  initiallyComplete: boolean;
}

/**
 * Лента с догрузкой по скроллу: накапливает страницы 2, 3, 4… пока метка видна.
 *
 * Фильтры сюда не передаются намеренно — они живут в URL, а страница перемонтирует ленту
 * (key по фильтрам) с уже готовой первой страницей. Поэтому здесь нет ни сброса списка,
 * ни защиты от гонок: устаревшему ответу неоткуда взяться.
 */
export function useInfiniteList<T>({ initialItems, loadPage, perPage, initiallyComplete }: UseInfiniteListOptions<T>) {
  const [items, setItems] = useState(initialItems);
  const [page, setPage] = useState(1);
  const [reachedEnd, setReachedEnd] = useState(initiallyComplete);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  // Держим загрузчик в ref: вызывающий передаёт стрелку прямо в пропсах, и без этого
  // каждый рендер менял бы её ссылку, а с ней и зависимости эффекта ниже.
  // Обновляем в эффекте, а не в теле: писать в ref во время рендера нельзя.
  const loadPageRef = useRef(loadPage);
  useEffect(() => {
    loadPageRef.current = loadPage;
  });

  const loadNext = useCallback(async () => {
    setLoading(true);
    setFailed(false);
    try {
      const nextPage = page + 1;
      const batch = await loadPageRef.current(nextPage);
      setItems((prev) => [...prev, ...batch]);
      setPage(nextPage);
      setReachedEnd(batch.length < perPage);
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }, [page, perPage]);

  // Следим за меткой по состоянию, а не по onChange наблюдателя: если после подгрузки метка
  // осталась во вьюпорте, нового события пересечения не будет и лента молча встанет.
  const { ref: sentinelRef, isIntersecting } = useIntersectionObserver({ rootMargin: "400px" });
  const canLoadMore = isIntersecting && !loading && !reachedEnd && !failed;

  useEffect(() => {
    // Правило советует подписываться через onChange самого наблюдателя — см. причину выше.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (canLoadMore) void loadNext();
  }, [canLoadMore, loadNext]);

  return { items, loading, failed, reachedEnd, sentinelRef, retry: loadNext };
}
