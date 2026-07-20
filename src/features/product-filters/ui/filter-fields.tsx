"use client";

import { useEffect, useRef, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import type { Category } from "@/entities/category";
import type { Manufacturer } from "@/entities/manufacturer";
import { Checkbox } from "@/shared/ui/checkbox";
import { Input } from "@/shared/ui/input";
import { useFilterParams } from "../model/use-filter-params";

interface FilterFieldsProps {
  /** Подкатегории текущей корневой категории. Пусто — блок категорий не показываем. */
  subcategories: Category[];
  manufacturers: Manufacturer[];
}

const FLAGS = [
  { param: "discounted", label: "Со скидкой" },
  { param: "featured", label: "Популярные" },
  { param: "volume", label: "Цена зависит от объёма" },
] as const;

export function FilterFields({ subcategories, manufacturers }: FilterFieldsProps) {
  const { get, set } = useFilterParams();

  // Цену не шлём на каждую нажатую цифру: «1» из «150» отфильтровало бы почти всё.
  const [priceMin, setPriceMin] = useState(get("price_min"));
  const [priceMax, setPriceMax] = useState(get("price_max"));
  const [debouncedMin] = useDebounceValue(priceMin, 500);
  const [debouncedMax] = useDebounceValue(priceMax, 500);
  const syncedPrice = useRef(`${get("price_min")}|${get("price_max")}`);

  useEffect(() => {
    const key = `${debouncedMin}|${debouncedMax}`;
    if (syncedPrice.current === key) return;
    syncedPrice.current = key;
    set({ price_min: debouncedMin || null, price_max: debouncedMax || null });
  }, [debouncedMin, debouncedMax, set]);

  const checkedSubs = get("sub").split(",").filter(Boolean);
  const checkedManufacturers = get("manufacturers").split(",").filter(Boolean);

  /** Общий переключатель для списков «через запятую» в адресе. */
  function toggleInList(param: string, current: string[], value: string, checked: boolean) {
    const next = checked ? [...current, value] : current.filter((item) => item !== value);
    set({ [param]: next.length > 0 ? next.join(",") : null });
  }

  return (
    <div className="flex flex-col gap-8">
      <fieldset>
        <legend className="eyebrow text-xs">Цена, ƃ</legend>
        <div className="mt-4 flex items-center gap-2">
          <Input
            type="number"
            inputMode="numeric"
            min={0}
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            placeholder="от"
            aria-label="Цена от, ƃ"
            className="tabular-nums"
          />
          <span className="text-muted-foreground">—</span>
          <Input
            type="number"
            inputMode="numeric"
            min={0}
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            placeholder="до"
            aria-label="Цена до, ƃ"
            className="tabular-nums"
          />
        </div>
      </fieldset>

      {subcategories.length > 0 && (
        <fieldset>
          <legend className="eyebrow text-xs">Подкатегории</legend>
          <div className="mt-4 flex flex-col gap-3">
            {subcategories.map((category) => (
              <label key={category.id} className="flex cursor-pointer items-start gap-2.5 text-sm text-ink">
                <Checkbox
                  checked={checkedSubs.includes(category.slug)}
                  onCheckedChange={(checked) => toggleInList("sub", checkedSubs, category.slug, checked === true)}
                  className="mt-0.5"
                />
                {category.name}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {manufacturers.length > 0 && (
        <fieldset>
          <legend className="eyebrow text-xs">Производитель</legend>
          {/* Производителей три десятка — список скроллится, чтобы не растягивать панель. */}
          <div className="mt-4 flex max-h-64 flex-col gap-3 overflow-y-auto pr-2">
            {manufacturers.map((manufacturer) => {
              const id = String(manufacturer.id);
              return (
                <label key={manufacturer.id} className="flex cursor-pointer items-start gap-2.5 text-sm text-ink">
                  <Checkbox
                    checked={checkedManufacturers.includes(id)}
                    onCheckedChange={(checked) =>
                      toggleInList("manufacturers", checkedManufacturers, id, checked === true)
                    }
                    className="mt-0.5"
                  />
                  {manufacturer.name}
                </label>
              );
            })}
          </div>
        </fieldset>
      )}

      <fieldset>
        <legend className="eyebrow text-xs">Ещё</legend>
        <div className="mt-4 flex flex-col gap-3">
          {FLAGS.map((flag) => (
            <label key={flag.param} className="flex cursor-pointer items-start gap-2.5 text-sm text-ink">
              <Checkbox
                checked={get(flag.param) === "1"}
                onCheckedChange={(checked) => set({ [flag.param]: checked === true ? "1" : null })}
                className="mt-0.5"
              />
              {flag.label}
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
