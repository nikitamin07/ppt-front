"use client";

import { useState } from "react";
import { Input } from "@/shared/ui/input";
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
        <Input
          type="number"
          min={0}
          value={area || ""}
          onChange={(e) => setArea(Number(e.target.value))}
          className="bg-card px-3 py-2"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm text-ink">
        Толщина, мм
        <Input
          type="number"
          min={0}
          value={thickness || ""}
          onChange={(e) => setThickness(Number(e.target.value))}
          className="bg-card px-3 py-2"
        />
      </label>
      <p className="text-sm tabular-nums text-muted-foreground">
        Потребуется: <b className="text-ink">{volume} м³</b> — {cost} {priceUnit.replace(/\/.*/, "")}
      </p>
    </div>
  );
}
