import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRightIcon } from "lucide-react";
import { getCategoryBySlug, type CategoryListItem } from "@/entities/category";
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
  /** Цепочка от корня до открытой категории — она же адрес и она же хлебные крошки. */
  trail: CategoryListItem[];
  searchParams: CatalogSearchParams;
}

export async function CatalogCategoryPage({ trail, searchParams }: CatalogCategoryPageProps) {
  const slug = trail[trail.length - 1].slug;

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

  // Дети есть только у корневой категории; у подкатегории список пуст, и блок не рендерится.
  const subcategories = category.parent_id === null ? (category.children ?? []) : [];
  const active = hasActiveFilters(searchParams);

  return (
    <>
      <Breadcrumbs labels={Object.fromEntries(trail.map((item) => [item.slug, item.name]))} />

      <section className="container">
        <h1 className="font-heading text-3xl font-semibold text-balance text-ink sm:text-4xl">{category.name}</h1>
        {/* Текст из админки: простой абзац без разметки, поэтому рендерим как текст. */}
        {category.description && (
          <p className="mt-4 max-w-5xl text-base leading-relaxed text-muted-foreground">
            {category.description}
          </p>
        )}
        {/* Ссылки, а не фильтр: у каждой подкатегории есть своя страница. */}
        {subcategories.length > 0 && (
          <nav aria-label="Подкатегории" className="mt-8 border-t border-line pt-6">
            <h2 className="eyebrow text-xs">Подкатегории</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {subcategories.map((subcategory) => (
                <li key={subcategory.id}>
                  <Link
                    href={`/catalog/${category.slug}/${subcategory.slug}`}
                    className="group flex items-center gap-2.5 border border-line px-4 py-2.5 text-sm text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-safety"
                  >
                    {subcategory.name}
                    <ArrowRightIcon className="size-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-safety" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <p className="mt-8 font-label text-sm text-muted-foreground tabular-nums">
          {total} {plural(total, { one: "позиция", few: "позиции", many: "позиций" })}
        </p>
      </section>

      <section className="container mt-8 sm:mt-12">
        <div className="grid gap-8 lg:grid-cols-[15rem_1fr] lg:gap-12">
          <ProductFilters manufacturers={manufacturers} active={active} />

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
