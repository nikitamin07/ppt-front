import type { ProductListItem, ProductVolumePrice } from "../model/types";

interface ProductPriceBlockProps {
  product: Pick<ProductListItem, "price" | "discount_price" | "price_unit" | "is_volume_price" | "volume_price">;
}

const TIER_FALLBACK_LABEL = { low: "малый объём", medium: "средний объём", high: "крупный объём" } as const;

function VolumeTiers({ volumePrice, unit }: { volumePrice: ProductVolumePrice; unit: string }) {
  const tiers: { key: keyof typeof TIER_FALLBACK_LABEL; price: number; label: string | null }[] = [
    { key: "low", ...volumePrice.low },
    { key: "medium", ...volumePrice.medium },
    ...(volumePrice.high ? [{ key: "high" as const, ...volumePrice.high }] : []),
  ];

  return (
    <ul className="mt-3 flex flex-col gap-1.5 border-t border-line pt-3">
      {tiers.map((tier) => (
        <li key={tier.key} className="flex items-baseline justify-between gap-4 text-sm">
          <span className="text-muted-foreground">{tier.label ?? TIER_FALLBACK_LABEL[tier.key]}</span>
          <span className="font-semibold text-ink tabular-nums">
            {tier.price} {unit}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Цена товара крупным планом: скидка с суммой экономии, шаг цены по объёму или обычная цена. */
export function ProductPriceBlock({ product }: ProductPriceBlockProps) {
  const { price, discount_price: discountPrice, price_unit: unit, is_volume_price: isVolumePrice, volume_price: volumePrice } = product;

  if (isVolumePrice && volumePrice) {
    return (
      <div>
        {/* price уже синхронизирован бэкендом с самым дешёвым заполненным тарифом. */}
        <p className="font-heading text-3xl font-semibold text-ink tabular-nums sm:text-4xl">
          от {price} {unit}
        </p>
        <VolumeTiers volumePrice={volumePrice} unit={unit} />
      </div>
    );
  }

  if (discountPrice != null && discountPrice < price) {
    const saved = price - discountPrice;
    return (
      <div>
        <div className="flex items-baseline gap-3 tabular-nums">
          <span className="text-lg text-muted-foreground line-through">
            {price} {unit}
          </span>
          <span className="font-heading text-3xl font-semibold text-safety sm:text-4xl">
            {discountPrice} {unit}
          </span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground tabular-nums">
          Экономия {saved} {unit}
        </p>
      </div>
    );
  }

  return (
    <p className="font-heading text-3xl font-semibold text-ink tabular-nums sm:text-4xl">
      {price} {unit}
    </p>
  );
}
