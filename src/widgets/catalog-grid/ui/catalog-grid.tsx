"use client";

import { ArrowRightIcon } from "lucide-react";
import { ProductCard } from "@/entities/product";
import { AnimatedLink } from "@/shared/ui/animated-link";
import { useStaggerReveal } from "@/shared/lib/react";
import { PLACEHOLDER_PRODUCTS } from "../model/placeholder-products";

interface CatalogGridProps {
  title?: string;
  limit?: number;
  viewAllHref?: string;
}

export function CatalogGrid({ title = "Популярные товары", limit = 4, viewAllHref = "/catalog" }: CatalogGridProps) {
  const products = PLACEHOLDER_PRODUCTS.slice(0, limit);
  const gridRef = useStaggerReveal<HTMLDivElement>();

  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="flex items-end justify-between gap-4 border-b border-line pb-5">
        <h2 className="font-heading text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>
        <AnimatedLink href={viewAllHref} className="hidden sm:inline-flex">
          Смотреть все
          <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover/link:translate-x-1" />
        </AnimatedLink>
      </div>

      <div ref={gridRef} className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} categorySlug={product.category_slug} />
        ))}
      </div>

      <AnimatedLink href={viewAllHref} className="mt-6 sm:hidden">
        Смотреть все
        <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover/link:translate-x-1" />
      </AnimatedLink>
    </section>
  );
}
