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
    <div className="flex flex-col gap-3 border border-line bg-paper p-4">
      <label className="flex flex-col gap-1 text-sm text-ink">
        Площадь, м²
        <input
          type="number"
          min={0}
          value={area || ""}
          onChange={(e) => setArea(Number(e.target.value))}
          className="border border-line bg-card px-3 py-2 outline-none focus:border-safety"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm text-ink">
        Толщина, мм
        <input
          type="number"
          min={0}
          value={thickness || ""}
          onChange={(e) => setThickness(Number(e.target.value))}
          className="border border-line bg-card px-3 py-2 outline-none focus:border-safety"
        />
      </label>
      <p className="text-sm tabular-nums text-muted-foreground">
        Потребуется: <b className="text-ink">{volume} м³</b> — {cost} {priceUnit.replace(/\/.*/, "")}
      </p>
    </div>
  );
}
