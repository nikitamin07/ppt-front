import Image from "next/image";
import Link from "next/link";
import { assetUrl, NO_IMAGE_SRC } from "@/shared/api";
import { cn } from "@/shared/lib/utils";
import type { ProductListItem } from "../model/types";

interface ProductCardProps {
  /** Списочный товар: карточке хватает его полей, description и attributes ей не нужны. */
  product: ProductListItem;
  /** Слаг категории товара. null — товар без категории: адреса у него нет, карточка не кликабельна. */
  categorySlug: string | null;
}

export function ProductCard({ product, categorySlug }: ProductCardProps) {
  const hasDiscount = product.discount_price != null && product.discount_price < product.price;
  // При объёмной цене top-level price уже синхронизирован с самым дешёвым тарифом.
  const pricePrefix = product.is_volume_price ? "от " : "";

  const className = cn(
    "card-lift group flex flex-col overflow-hidden",
    !categorySlug && "hover:translate-y-0 hover:border-line hover:shadow-none",
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
      </div>
      <div className="p-4">
        {/* Бейдж в потоке, а не абсолютом поверх карточки: картинки у товаров может не быть,
            и тогда абсолютный бейдж ложился бы прямо на название. */}
        {hasDiscount ? (
          <span className="mb-2 inline-block bg-safety px-2 py-0.5 font-label text-xs font-semibold text-white">
            Скидка
          </span>
        ) : null}
        {product.manufacturer ? (
          <p className="font-label text-xs text-muted-foreground">{product.manufacturer.name}</p>
        ) : null}
        <h3 className="font-heading font-semibold text-ink">{product.name}</h3>
        {/* wrap: в двух колонках на мобиле старая и новая цена в строку не помещаются. */}
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

  return categorySlug ? (
    <Link href={`/catalog/${categorySlug}/${product.slug}`} className={className}>
      {body}
    </Link>
  ) : (
    <div className={className}>{body}</div>
  );
}
