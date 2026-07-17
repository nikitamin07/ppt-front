"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * Чтение и запись фильтров в адрес страницы.
 *
 * Всё состояние живёт в URL: страница — серверная, поэтому смена фильтра ре-рендерит
 * её на сервере с уже отфильтрованным списком. Ссылку на выборку можно отправить.
 */
export function useFilterParams() {
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const searchParams = useSearchParams();

  const get = useCallback((key: string) => searchParams?.get(key) ?? "", [searchParams]);

  /** null убирает параметр из адреса. Пустой адрес пишем без «?». */
  const set = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams ?? undefined);

      for (const [key, value] of Object.entries(updates)) {
        if (value) params.set(key, value);
        else params.delete(key);
      }

      const search = params.toString();
      // replace + scroll: false — правка фильтров не должна ни засорять историю,
      // ни отбрасывать человека в начало страницы.
      router.replace(search ? `${pathname}?${search}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  const reset = useCallback(() => router.replace(pathname, { scroll: false }), [router, pathname]);

  return useMemo(() => ({ get, set, reset }), [get, set, reset]);
}
