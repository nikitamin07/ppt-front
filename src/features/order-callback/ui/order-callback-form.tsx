"use client";

import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import { submitOrderCallback } from "../api";

interface OrderCallbackFormProps {
  /** surface — на светлой подложке (попап), inverse — на графитовом фоне (футер) */
  tone?: "surface" | "inverse";
  className?: string;
}

export function OrderCallbackForm({ tone = "surface", className }: OrderCallbackFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const isInverse = tone === "inverse";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      await submitOrderCallback({ name, phone, source_url: window.location.href });
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

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-3", className)}>
      <input
        required
        name="name"
        placeholder="Ваше имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={inputClass}
      />
      <input
        required
        type="tel"
        name="phone"
        placeholder="+375 (XX) XXX-XX-XX"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className={inputClass}
      />
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
