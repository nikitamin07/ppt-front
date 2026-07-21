"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { calculateArea, calculateCost, calculatePacks, calculateVolume } from "../lib/calculate";

interface CalcValueFormProps {
  /** Цена за единицу продажи — за куб или за упаковку. Уже с учётом скидки. */
  price: number;
  /** Единица продажи из товара: «куб», «уп.» или «шт.». */
  unit: string;
  /** Кубов в упаковке. null — товар продаётся кубами, считаем прямо по объёму. */
  cubesPerPack: number | null;
}

const FIELDS = [
  { key: "height", label: "Высота стены, м", placeholder: "2,7" },
  { key: "width", label: "Ширина стены, м", placeholder: "6" },
  { key: "thickness", label: "Толщина материала, мм", placeholder: "50" },
] as const;

type FieldKey = (typeof FIELDS)[number]["key"];

const EMPTY: Record<FieldKey, string> = { height: "", width: "", thickness: "" };

export function CalcValueForm({ price, unit, cubesPerPack }: CalcValueFormProps) {
  const [values, setValues] = useState(EMPTY);
  const [result, setResult] = useState<{
    area: number;
    volume: number;
    packs: number | null;
    cost: number;
  } | null>(null);

  // Запятая — привычный десятичный разделитель, но Number её не понимает.
  const toNumber = (value: string) => Number(value.replace(",", "."));
  const format = (value: number) => value.toLocaleString("ru-RU", { maximumFractionDigits: 2 });
  const ready = FIELDS.every((field) => toNumber(values[field.key]) > 0);

  function submit(event: FormEvent) {
    event.preventDefault();
    const area = calculateArea(toNumber(values.height), toNumber(values.width));
    const volume = calculateVolume(area, toNumber(values.thickness));
    // Кубами торгуют по объёму, упаковками — по числу упаковок, оно и идёт в цену.
    const packs = cubesPerPack ? calculatePacks(volume, cubesPerPack) : null;
    setResult({ area, volume, packs, cost: calculateCost(packs ?? volume, price) });
  }

  return (
    <form onSubmit={submit} className="border border-line bg-paper p-5">
      <p className="eyebrow text-xs">Расчёт по размерам</p>

      <div className="mt-4 flex flex-col gap-3">
        {FIELDS.map((field) => (
          <label key={field.key} className="flex flex-col gap-1 text-sm text-ink">
            {field.label}
            <Input
              type="text"
              inputMode="decimal"
              placeholder={field.placeholder}
              value={values[field.key]}
              onChange={(event) =>
                setValues((previous) => ({ ...previous, [field.key]: event.target.value }))
              }
              className="bg-card tabular-nums"
            />
          </label>
        ))}
      </div>

      <Button type="submit" variant="ink" disabled={!ready} className="mt-4 w-full">
        Рассчитать
      </Button>

      {result && (
        <dl className="mt-5 flex flex-col gap-2 border-t border-line pt-4 text-sm tabular-nums">
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-muted-foreground">Площадь</dt>
            <dd className="font-semibold text-ink">{format(result.area)} м²</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-muted-foreground">Объём материала</dt>
            <dd className="font-semibold text-ink">{format(result.volume)} м³</dd>
          </div>
          {result.packs !== null && (
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-muted-foreground">Кол-во упаковок</dt>
              <dd className="font-semibold text-ink">
                {format(result.packs)} {unit}
              </dd>
            </div>
          )}
          <div className="flex items-baseline justify-between gap-4 border-t border-line pt-2">
            <dt className="text-muted-foreground">Стоимость</dt>
            <dd className="font-heading text-xl font-semibold text-safety">{format(result.cost)} ƃ</dd>
          </div>
        </dl>
      )}
    </form>
  );
}
