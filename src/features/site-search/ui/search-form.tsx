"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "lucide-react";
import { useDebounceValue } from "usehooks-ts";
import { cn } from "@/shared/lib/utils";
import { Input } from "@/shared/ui/input";

interface SearchFormProps {
  placeholder?: string;
  /** Доступное имя поля: «Поиск по статьям», «Поиск по товарам». */
  label: string;
  className?: string;
}

/**
 * Живой поиск: пишет запрос в ?query= текущего роута, страница перерисовывается на сервере.
 * Роут сохраняется, поэтому поиск работает и внутри /tema/<tag>, и в категории каталога.
 */
export function SearchForm({ placeholder = "Поиск", label, className }: SearchFormProps) {
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const searchParams = useSearchParams();

  const urlQuery = searchParams?.get("query") ?? "";
  const [value, setValue] = useState(urlQuery);
  const [debounced] = useDebounceValue(value, 350);

  // Запрос, который уже отражён в адресе. Стартуем с того, что пришло из URL,
  // иначе первый же прогон эффекта переписал бы адрес на самого себя.
  const synced = useRef(urlQuery);

  useEffect(() => {
    if (synced.current === debounced) return;
    synced.current = debounced;

    const params = new URLSearchParams(searchParams ?? undefined);
    if (debounced) params.set("query", debounced);
    else params.delete("query");

    const search = params.toString();
    // replace, а не push: выдача поиска не должна засорять историю на каждое слово.
    // scroll: false — страница не должна прыгать наверх, пока человек печатает.
    router.replace(search ? `${pathname}?${search}` : pathname, { scroll: false });
  }, [debounced, pathname, router, searchParams]);

  return (
    <div className={cn("relative", className)}>
      <SearchIcon className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label={label}
        className="pl-10"
      />
    </div>
  );
}
