import Link from "next/link";
import type { Product } from "../model/types";

interface ProductCardProps {
  product: Product;
  categorySlug: string;
}

export function ProductCard({ product, categorySlug }: ProductCardProps) {
  const hasDiscount = product.discount_price != null && product.discount_price < product.price;

  return (
    <Link
      href={`/catalog/${categorySlug}/${product.slug}`}
      className="card-lift group relative flex flex-col overflow-hidden"
    >
      {hasDiscount ? (
        <span className="absolute left-3 top-3 z-10 bg-safety px-2 py-0.5 font-label text-xs font-semibold text-white">
          Скидка
        </span>
      ) : null}
      {product.image_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={product.image_url} alt={product.name} className="aspect-square w-full object-cover" />
      ) : null}
      <div className="p-4">
        <h3 className="font-heading font-semibold text-ink">{product.name}</h3>
        <div className="mt-2 flex items-baseline gap-2 tabular-nums">
          {hasDiscount ? (
            <>
              <span className="text-sm text-muted-foreground line-through">
                {product.price} {product.price_unit}
              </span>
              <span className="font-semibold text-safety">
                {product.discount_price} {product.price_unit}
              </span>
            </>
          ) : (
            <span className="font-semibold text-ink">
              {product.price} {product.price_unit}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
