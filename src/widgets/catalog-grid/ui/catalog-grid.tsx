"use client";

import { ProductCard, type ProductListItem } from "@/entities/product";
import { useStaggerReveal } from "@/shared/lib/react";
import { SectionHeading, SectionHeadingLinkMobile } from "@/shared/ui/section-heading";

interface CatalogGridProps {
  products: ProductListItem[];
  title?: string;
  viewAllHref?: string;
}

export function CatalogGrid({ products, title = "Популярные товары", viewAllHref = "/catalog" }: CatalogGridProps) {
  const gridRef = useStaggerReveal<HTMLDivElement>();

  if (products.length === 0) return null;

  return (
    <section className="container">
      <SectionHeading title={title} href={viewAllHref} linkLabel="Смотреть все" />
      {/* На мобильной колонке 8 карточек — это слишком много по высоте, поэтому режем блок до 4. */}
      <div
        ref={gridRef}
        className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 [&>*:nth-child(n+5)]:hidden sm:[&>*:nth-child(n+5)]:block"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <SectionHeadingLinkMobile href={viewAllHref} linkLabel="Смотреть все" />
    </section>
  );
}
