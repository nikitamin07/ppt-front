"use client";

import { useState } from "react";
import { calculateCost, calculateVolume } from "../lib/calculate";

interface CalcValueFormProps {
  pricePerM3: number;
  priceUnit: string;
}

export function CalcValueForm({ pricePerM3, priceUnit }: CalcValueFormProps) {
  const [area, setArea] = useState(0);
  const [thickness, setThickness] = useState(0);

  const volume = calculateVolume(area, thickness);
  const cost = calculateCost(volume, pricePerM3);

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-zinc-100 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
      <label className="flex flex-col gap-1 text-sm">
        Площадь, м²
        <input
          type="number"
          min={0}
          value={area || ""}
          onChange={(e) => setArea(Number(e.target.value))}
          className="rounded-lg border border-zinc-200 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Толщина, мм
        <input
          type="number"
          min={0}
          value={thickness || ""}
          onChange={(e) => setThickness(Number(e.target.value))}
          className="rounded-lg border border-zinc-200 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900"
        />
      </label>
      <p className="text-sm text-zinc-600 dark:text-zinc-300">
        Потребуется: <b>{volume} м³</b> — {cost} {priceUnit.replace(/\/.*/, "")}
      </p>
    </div>
  );
}
