import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/entities/category";
import { getManufacturers } from "@/entities/manufacturer";
import { filterProducts } from "@/entities/product";
import { ApiError } from "@/shared/api";
import { SearchForm } from "@/features/site-search";
import {
  hasActiveFilters,
  ProductFilters,
  SortSelect,
  toFilterParams,
  type CatalogSearchParams,
} from "@/features/product-filters";
import { plural } from "@/shared/lib/utils";
import { Breadcrumbs } from "@/widgets/breadcrumbs";
import { ProductFeed } from "@/widgets/product-feed";

interface CatalogCategoryPageProps {
  slug: string;
  searchParams: CatalogSearchParams;
}

export async function CatalogCategoryPage({ slug, searchParams }: CatalogCategoryPageProps) {
  // Эндпоинт одной категории отдаёт и parent_id, и children — тянуть ради этого всё
  // дерево незачем. Несуществующий слаг он же и отсекает своей 404.
  const category = await getCategoryBySlug(slug).catch((error: unknown) => {
    if (error instanceof ApiError && error.status === 404) return null;
    // Обрыв сети или 500 — это не «категории нет»: молча подменять их на 404 нельзя.
    throw error;
  });

  if (!category) notFound();

  const filters = toFilterParams(searchParams, slug);
  const [{ items, total }, manufacturers] = await Promise.all([
    filterProducts({ ...filters, page: 1 }),
    getManufacturers(),
  ]);

  // Уточнять выборку есть чем только внутри корневой категории: у подкатегории детей нет,
  // а подменять ими саму страницу — значит врать адресом.
  const subcategories = category.parent_id === null ? (category.children ?? []) : [];
  const active = hasActiveFilters(searchParams);

  return (
    <>
      <Breadcrumbs labels={{ [category.slug]: category.name }} />

      <section className="container">
        <h1 className="font-heading text-3xl font-semibold text-balance text-ink sm:text-4xl">{category.name}</h1>
        <p className="mt-3 font-label text-sm text-muted-foreground tabular-nums">
          {total} {plural(total, { one: "позиция", few: "позиции", many: "позиций" })}
        </p>
      </section>

      <section className="container">
        <div className="grid gap-8 lg:grid-cols-[15rem_1fr] lg:gap-12">
          <ProductFilters subcategories={subcategories} manufacturers={manufacturers} active={active} />

          <div>
            <div className="flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-center sm:justify-between">
              <SearchForm label="Поиск по товарам" placeholder="Поиск по товарам" className="sm:max-w-xs sm:flex-1" />
              <SortSelect />
            </div>

            <div className="mt-8">
              {/* key: смена фильтров монтирует ленту заново с готовой первой страницей,
                  поэтому клиенту не нужно ни сбрасывать список, ни разруливать гонки ответов. */}
              <ProductFeed
                key={JSON.stringify(filters)}
                initialProducts={items}
                total={total}
                filters={filters}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
