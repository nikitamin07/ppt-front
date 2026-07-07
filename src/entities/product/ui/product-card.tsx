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
      className="group flex flex-col overflow-hidden rounded-xl border border-zinc-100 bg-zinc-50/50 transition-colors hover:border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700"
    >
      {product.image_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={product.image_url} alt={product.name} className="aspect-square w-full object-cover" />
      ) : null}
      <div className="p-4">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">{product.name}</h3>
        <div className="mt-2 flex items-baseline gap-2">
          {hasDiscount ? (
            <>
              <span className="text-sm text-zinc-400 line-through">
                {product.price} {product.price_unit}
              </span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                {product.discount_price} {product.price_unit}
              </span>
            </>
          ) : (
            <span className="font-semibold text-zinc-900 dark:text-zinc-50">
              {product.price} {product.price_unit}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
