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

  // Блок наполняет админ галочкой «Показывать в популярных». Не отметили ни одного —
  // показывать пустую секцию не за чем.
  if (products.length === 0) return null;

  return (
    <section className="container">
      <SectionHeading title={title} href={viewAllHref} linkLabel="Смотреть все" />

      <div ref={gridRef} className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} categorySlug={product.category_slug} />
        ))}
      </div>

      <SectionHeadingLinkMobile href={viewAllHref} linkLabel="Смотреть все" />
    </section>
  );
}
