"use client";

import { useState } from "react";
import { StarIcon } from "lucide-react";
import type { ProductComment } from "@/entities/product";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { ProductReviewForm } from "./product-review-form";

interface ProductReviewsProps {
  productId: number;
  comments: ProductComment[];
}

const dateFormat = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" });

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Оценка ${rating} из 5`}>
      {[1, 2, 3, 4, 5].map((value) => (
        <StarIcon key={value} className={cn("size-4", value <= rating ? "fill-safety text-safety" : "text-line")} />
      ))}
    </div>
  );
}

export function ProductReviews({ productId, comments }: ProductReviewsProps) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  return (
    <div>
      {sent ? (
        <p className="border border-line bg-safety/5 px-4 py-3 text-sm text-ink">
          Ваш отзыв отправлен на модерацию, спасибо!
        </p>
      ) : open ? (
        <ProductReviewForm
          productId={productId}
          onSuccess={() => {
            setOpen(false);
            setSent(true);
          }}
        />
      ) : (
        <Button type="button" onClick={() => setOpen(true)}>
          Оставить отзыв
        </Button>
      )}

      {comments.length > 0 ? (
        <ul className="mt-8 flex flex-col gap-6">
          {comments.map((comment) => (
            <li key={comment.id} className="border-b border-line pb-6 last:border-b-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-heading font-semibold text-ink">{comment.author}</span>
                <Stars rating={comment.rating} />
                <span className="ml-auto text-xs tabular-nums text-muted-foreground">
                  {dateFormat.format(new Date(comment.created_at))}
                </span>
              </div>
              <p className="mt-2 leading-relaxed text-ink whitespace-pre-line">{comment.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 text-sm text-muted-foreground">Отзывов пока нет — оставьте первый.</p>
      )}
    </div>
  );
}
