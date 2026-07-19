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
 * Лента с догрузкой по скроллу. Фильтры не передаются: смена фильтра
 * перемонтирует ленту (key), поэтому нет сброса и защиты от гонок.
 */
export function useInfiniteList<T>({ initialItems, loadPage, perPage, initiallyComplete }: UseInfiniteListOptions<T>) {
  const [items, setItems] = useState(initialItems);
  const [page, setPage] = useState(1);
  const [reachedEnd, setReachedEnd] = useState(initiallyComplete);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  // Загрузчик в ref: иначе стрелка из пропсов дёргала бы
  // зависимости эффекта ниже на каждом рендере.
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
