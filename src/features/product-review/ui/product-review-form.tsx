"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { StarIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { Input } from "@/shared/ui/input";
import { submitProductReview } from "../api";

interface ProductReviewFormProps {
  productId: number;
  /** Успешная отправка — родитель прячет форму и показывает благодарность. */
  onSuccess: () => void;
}

export function ProductReviewForm({ productId, onSuccess }: ProductReviewFormProps) {
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [honeypot, setHoneypot] = useState("");
  const [consent, setConsent] = useState(false);
  // время монтирования формы — отзывы быстрее ~1.5с считаем ботом
  const mountedAtRef = useRef<number | null>(null);
  useEffect(() => {
    mountedAtRef.current = Date.now();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent || rating < 1) return;
    if (honeypot || !mountedAtRef.current || Date.now() - mountedAtRef.current < 1500) {
      onSuccess();
      return;
    }
    setStatus("loading");
    try {
      await submitProductReview({ product_id: productId, author, rating, body });
      onSuccess();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 border border-line p-5">
      <input
        type="text"
        name="patronymic"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="absolute left-[-9999px] h-0 w-0 overflow-hidden opacity-0"
      />
      <Input
        required
        name="author"
        minLength={2}
        maxLength={80}
        placeholder="Ваше имя"
        value={author}
        onChange={(e) => setAuthor(e.target.value.replace(/[^a-zA-Zа-яёА-ЯЁ\s'-]/g, ""))}
      />
      <div className="flex items-center gap-1" role="radiogroup" aria-label="Оценка">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={rating === value}
            aria-label={`${value} из 5`}
            onClick={() => setRating(value)}
            onMouseEnter={() => setHovered(value)}
            onMouseLeave={() => setHovered(0)}
            className="p-0.5 outline-none focus-visible:outline-2 focus-visible:outline-safety"
          >
            <StarIcon
              className={cn(
                "size-6 transition-colors",
                value <= (hovered || rating) ? "fill-safety text-safety" : "text-line",
              )}
            />
          </button>
        ))}
      </div>
      <textarea
        required
        name="body"
        minLength={10}
        maxLength={2000}
        rows={4}
        placeholder="Ваш отзыв о товаре"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="w-full min-w-0 resize-y border border-line bg-paper px-3.5 py-2.5 text-sm text-ink transition-colors outline-none placeholder:text-muted-foreground focus:border-safety"
      />
      <label className="flex cursor-pointer items-start gap-2.5 text-xs text-muted-foreground/70">
        <Checkbox checked={consent} onCheckedChange={(checked) => setConsent(checked === true)} className="mt-0.5" />
        <span>
          Отправляя форму, вы соглашаетесь на{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-ink">
            обработку персональных данных
          </Link>
          .
        </span>
      </label>
      <Button type="submit" disabled={status === "loading" || !consent || rating < 1} className="self-start">
        {status === "loading" ? "Отправка..." : "Отправить отзыв"}
      </Button>
      {status === "error" ? (
        <p className="text-sm text-destructive">Не удалось отправить, попробуйте еще раз.</p>
      ) : null}
    </form>
  );
}
