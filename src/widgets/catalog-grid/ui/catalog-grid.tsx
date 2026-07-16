"use client";

import { ArrowRightIcon } from "lucide-react";
import { ProductCard, type Product } from "@/entities/product";
import { AnimatedLink } from "@/shared/ui/animated-link";
import { useStaggerReveal } from "@/shared/lib/react";

interface CatalogGridProps {
  products: Product[];
  /** id категории → слаг: в теле товара приходит только category_id, а карточке нужен адрес. */
  categorySlugById: Record<number, string>;
  title?: string;
  viewAllHref?: string;
}

export function CatalogGrid({
  products,
  categorySlugById,
  title = "Популярные товары",
  viewAllHref = "/catalog",
}: CatalogGridProps) {
  const gridRef = useStaggerReveal<HTMLDivElement>();

  // Блок наполняет админ галочкой «Показывать в популярных». Не отметили ни одного —
  // показывать пустую секцию не за чем.
  if (products.length === 0) return null;

  return (
    <section className="container">
      <div className="flex items-end justify-between gap-4 border-b border-line pb-5">
        <h2 className="font-heading text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>
        <AnimatedLink href={viewAllHref} className="hidden sm:inline-flex">
          Смотреть все
          <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover/link:translate-x-1" />
        </AnimatedLink>
      </div>

      <div ref={gridRef} className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            categorySlug={product.category_id != null ? (categorySlugById[product.category_id] ?? null) : null}
          />
        ))}
      </div>

      <AnimatedLink href={viewAllHref} className="mt-6 sm:hidden">
        Смотреть все
        <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover/link:translate-x-1" />
      </AnimatedLink>
    </section>
  );
}
