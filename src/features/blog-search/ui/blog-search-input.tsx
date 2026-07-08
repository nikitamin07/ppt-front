"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function BlogSearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams?.get("query") ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/blog?query=${encodeURIComponent(query)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        placeholder="Поиск по блогу"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border border-line bg-paper px-3.5 py-2 text-sm text-ink outline-none placeholder:text-muted-foreground focus:border-safety"
      />
      <button
        type="submit"
        className="shrink-0 bg-ink px-4 py-2 text-sm font-medium text-paper transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-10px_rgba(27,27,24,0.5)] active:translate-y-0 active:scale-[0.97]"
      >
        Найти
      </button>
    </form>
  );
}
