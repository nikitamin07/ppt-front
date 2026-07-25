"use client";

import { useState } from "react";
import { ProductSpecs, type ProductAttributeValue, type ProductComment } from "@/entities/product";
import { ProductReviews } from "@/features/product-review";
import { cn } from "@/shared/lib/utils";

interface ProductTabsProps {
  productId: number;
  attributes: ProductAttributeValue[];
  description: string | null;
  comments: ProductComment[];
}

type TabId = "specs" | "description" | "reviews";

/** Характеристики, описание и отзывы под одним переключателем; первая непустая открыта по умолчанию. */
export function ProductTabs({ productId, attributes, description, comments }: ProductTabsProps) {
  const tabs: { id: TabId; label: string }[] = [];
  if (attributes.length > 0) tabs.push({ id: "specs", label: "Характеристики" });
  if (description) tabs.push({ id: "description", label: "Описание" });
  // Вкладка отзывов есть всегда — с неё оставляют отзыв, даже когда одобренных ещё нет.
  tabs.push({ id: "reviews", label: "Отзывы" });

  const [active, setActive] = useState<TabId>(tabs[0]?.id ?? "reviews");

  return (
    <section className="container">
      <div role="tablist" className="flex border-b border-line">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={active === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => setActive(tab.id)}
            className={cn(
              "-mb-px border-b-2 px-5 py-3 font-label text-sm font-semibold uppercase tracking-[0.15em] transition-colors",
              "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-safety",
              active === tab.id
                ? "border-safety text-ink"
                : "border-transparent text-muted-foreground hover:text-ink",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div id={`panel-${active}`} role="tabpanel" aria-labelledby={`tab-${active}`} className="mt-8 max-w-3xl">
        {active === "specs" ? (
          <ProductSpecs attributes={attributes} />
        ) : active === "description" ? (
          <p className="text-base leading-relaxed text-ink">{description}</p>
        ) : (
          <ProductReviews productId={productId} comments={comments} />
        )}
      </div>
    </section>
  );
}
