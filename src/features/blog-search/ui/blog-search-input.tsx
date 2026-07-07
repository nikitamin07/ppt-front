"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function BlogSearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") ?? "");

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
        className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900"
      />
      <button
        type="submit"
        className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-50 dark:text-zinc-900"
      >
        Найти
      </button>
    </form>
  );
}
