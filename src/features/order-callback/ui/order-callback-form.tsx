"use client";

import { useState } from "react";
import { submitOrderCallback } from "../api";

export function OrderCallbackForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

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
    return <p className="text-sm text-zinc-600 dark:text-zinc-300">Заявка отправлена, мы свяжемся с вами.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        required
        placeholder="Ваше имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="rounded-lg border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900"
      />
      <input
        required
        type="tel"
        placeholder="Телефон"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="rounded-lg border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900"
      >
        {status === "loading" ? "Отправка..." : "Заказать консультацию"}
      </button>
      {status === "error" ? <p className="text-sm text-red-500">Не удалось отправить, попробуйте еще раз.</p> : null}
    </form>
  );
}
