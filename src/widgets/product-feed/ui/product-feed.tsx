"use client";

import { filterProducts, ProductCard, type ProductFilterParams, type ProductListItem } from "@/entities/product";
import { useInfiniteList } from "@/shared/lib/react";
import { FeedStatus } from "@/shared/ui/feed-status";

/** Бэкенд отдаёт по столько товаров на страницу. */
const PER_PAGE = 8;

interface ProductFeedProps {
  /** Первая страница, уже отфильтрованная на сервере. */
  initialProducts: ProductListItem[];
  /** Всего товаров под текущий фильтр — из ответа бэкенда. */
  total: number;
  /** Фильтры из адреса — ими же дозапрашиваем страницы 2, 3, 4… */
  filters: ProductFilterParams;
}

export function ProductFeed({ initialProducts, total, filters }: ProductFeedProps) {
  const { items, ...status } = useInfiniteList({
    initialItems: initialProducts,
    perPage: PER_PAGE,
    // В отличие от статей, у товаров бэкенд присылает total — по нему конец списка виден сразу.
    initiallyComplete: initialProducts.length >= total,
    loadPage: async (page) => (await filterProducts({ ...filters, page })).items,
  });

  if (items.length === 0) {
    return (
      <p className="border border-line bg-card p-6 text-sm text-muted-foreground">
        Под эти условия ничего не подошло. Попробуйте сбросить часть фильтров.
      </p>
    );
  }

  return (
    <div aria-busy={status.loading}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} categorySlug={product.category_slug} />
        ))}
      </div>

      <FeedStatus {...status} onRetry={status.retry} errorText="Не удалось загрузить товары." />
    </div>
  );
}
