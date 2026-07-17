"use client";

import { Button } from "./button";

interface FeedStatusProps {
  loading: boolean;
  failed: boolean;
  reachedEnd: boolean;
  /** Метка догрузки из useInfiniteList: пока видна и список не кончился — тянется следующая страница. */
  sentinelRef: (node?: Element | null) => void;
  onRetry: () => void;
  /** «Не удалось загрузить статьи.» / «…товары.» */
  errorText: string;
}

/** Хвост бесконечной ленты: ошибка с повтором и метка догрузки. */
export function FeedStatus({ loading, failed, reachedEnd, sentinelRef, onRetry, errorText }: FeedStatusProps) {
  if (failed) {
    return (
      <div className="mt-8 flex flex-col items-start gap-3">
        <p className="text-sm text-muted-foreground">{errorText}</p>
        <Button variant="ink" onClick={onRetry} className="py-2 font-medium">
          Повторить
        </Button>
      </div>
    );
  }

  if (reachedEnd) return null;

  return (
    <div ref={sentinelRef} className="mt-8 h-10 text-center font-label text-xs text-muted-foreground">
      {loading ? "Загружаем…" : ""}
    </div>
  );
}
