import Image from "next/image";
import Link from "next/link";
import { assetUrl, NO_IMAGE_SRC } from "@/shared/api";
import { cn } from "@/shared/lib/utils";
import type { ProductListItem } from "../model/types";

interface ProductCardProps {
  /** Списочный товар: карточке хватает его полей, description и attributes ей не нужны. */
  product: ProductListItem;
}

export function ProductCard({ product }: ProductCardProps) {
  // Товар без категории — адреса у него нет, карточка не кликабельна.
  const categoryPath = product.category_path;
  const hasDiscount = product.discount_price != null && product.discount_price < product.price;
  // При объёмной цене top-level price уже синхронизирован с самым дешёвым тарифом.
  const pricePrefix = product.is_volume_price ? "от " : "";

  const className = cn(
    "card-lift group flex flex-col overflow-hidden",
    !categoryPath && "hover:translate-y-0 hover:border-line hover:shadow-none",
  );

  const body = (
    <>
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={assetUrl(product.image_url) ?? NO_IMAGE_SRC}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover"
        />
        {hasDiscount ? (
          <span className="bg-safety px-2 py-0.5 absolute right-4 top-4 font-label text-xs font-semibold text-white">
            Скидка
          </span>
        ) : null}
      </div>
      <div className="p-4">
        {product.manufacturer ? (
          <p className="font-label text-xs text-muted-foreground">{product.manufacturer.name}</p>
        ) : null}
        <h3 className="font-heading font-semibold text-ink">{product.name}</h3>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-2 tabular-nums">
          {hasDiscount ? (
            <>
              <span className="text-sm text-muted-foreground line-through">
                {product.price} ƃ/{product.price_unit}
              </span>
              <span className="font-semibold text-safety">
                {product.discount_price} ƃ/{product.price_unit}
              </span>
            </>
          ) : (
            <span className="font-semibold text-ink">
              {pricePrefix}
              {product.price} ƃ/{product.price_unit}
            </span>
          )}
        </div>
      </div>
    </>
  );

  return categoryPath ? (
    <Link href={`/catalog/${categoryPath}/${product.slug}`} className={className}>
      {body}
    </Link>
  ) : (
    <div className={className}>{body}</div>
  );
}
