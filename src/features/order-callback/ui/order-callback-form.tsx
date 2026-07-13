"use client";

import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import { submitOrderCallback } from "../api";
import { formatBelarusDigits, sanitizeBelarusDigits } from "../lib/phone-mask";

interface OrderCallbackFormProps {
  /** surface — на светлой подложке (попап), inverse — на графитовом фоне (футер) */
  tone?: "surface" | "inverse";
  className?: string;
}

export function OrderCallbackForm({ tone = "surface", className }: OrderCallbackFormProps) {
  const [name, setName] = useState("");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const isInverse = tone === "inverse";
  const showPrefix = phoneFocused || phoneDigits.length > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      await submitOrderCallback({ name, phone: `+375${phoneDigits}`, source_url: window.location.href });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p
        className={cn(
          "animate-in fade-in zoom-in-95 text-sm duration-300",
          isInverse ? "text-paper/80" : "text-muted-foreground",
          className,
        )}
      >
        Заявка отправлена, мы свяжемся с вами в ближайшее рабочее время.
      </p>
    );
  }

  const inputClass = cn(
    "w-full border px-3.5 py-2.5 text-sm outline-none transition-colors",
    isInverse
      ? "border-white/15 bg-white/5 text-paper placeholder:text-paper/40 focus:border-safety"
      : "border-line bg-paper text-ink placeholder:text-muted-foreground focus:border-safety",
  );
  const phoneWrapClass = cn(
    "flex items-center gap-1.5 border px-3.5 py-2.5 text-sm transition-colors",
    isInverse ? "border-white/15 bg-white/5 text-paper focus-within:border-safety" : "border-line bg-paper text-ink focus-within:border-safety",
  );

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-3", className)}>
      <input
        required
        name="name"
        placeholder="Ваше имя"
        value={name}
        onChange={(e) => setName(e.target.value.replace(/[^a-zA-Zа-яёА-ЯЁ\s'-]/g, ""))}
        className={inputClass}
      />
      <div className={phoneWrapClass}>
        {showPrefix ? <span className="shrink-0 tabular-nums">+375</span> : null}
        <input
          required
          type="tel"
          inputMode="numeric"
          name="phone"
          pattern="\(\d{2}\) \d{3}-\d{2}-\d{2}"
          title="Введите номер полностью"
          placeholder={showPrefix ? "(XX) XXX-XX-XX" : "+375 (XX) XXX-XX-XX"}
          value={formatBelarusDigits(phoneDigits)}
          onFocus={() => setPhoneFocused(true)}
          onChange={(e) => setPhoneDigits(sanitizeBelarusDigits(e.target.value))}
          className={cn(
            "w-full bg-transparent outline-none",
            isInverse ? "placeholder:text-paper/40" : "placeholder:text-muted-foreground",
          )}
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center bg-safety px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-10px_rgba(255,90,31,0.6)] active:translate-y-0 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50"
      >
        {status === "loading" ? "Отправка..." : "Заказать звонок"}
      </button>
      {status === "error" ? (
        <p className="text-sm text-destructive">Не удалось отправить, попробуйте еще раз.</p>
      ) : null}
      <p className={cn("text-xs", isInverse ? "text-paper/40" : "text-muted-foreground/70")}>
        Отправляя форму, вы соглашаетесь на обработку персональных данных.
      </p>
    </form>
  );
}
