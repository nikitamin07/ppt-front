"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

interface SearchFormProps {
  /** страница результатов: "/catalog" или "/blog" */
  basePath: string;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

export function SearchForm({ basePath, placeholder = "Поиск", className, autoFocus }: SearchFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams?.get("query") ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`${basePath}?query=${encodeURIComponent(query)}`);
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex gap-2", className)}>
      <Input
        placeholder={placeholder}
        value={query}
        autoFocus={autoFocus}
        onChange={(e) => setQuery(e.target.value)}
        className="py-2"
      />
      <Button type="submit" variant="ink" className="py-2 font-medium">
        Найти
      </Button>
    </form>
  );
}
