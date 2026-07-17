"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { SORT_OPTIONS } from "../model/params";
import { useFilterParams } from "../model/use-filter-params";

export function SortSelect() {
  const { get, set } = useFilterParams();
  const value = get("sort") || "default";

  return (
    <label className="flex items-center gap-2.5">
      <span className="font-label text-xs whitespace-nowrap text-muted-foreground">Сортировка</span>
      <Select
        value={value}
        // items нужен, чтобы в свёрнутом виде показывалась подпись, а не сырое «default».
        items={[...SORT_OPTIONS]}
        // «По умолчанию» — это отсутствие сортировки, в адресе его держать незачем.
        onValueChange={(next) => set({ sort: !next || next === "default" ? null : next })}
      >
        <SelectTrigger className="h-9 border-line bg-paper text-ink">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}
