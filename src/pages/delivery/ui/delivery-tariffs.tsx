import { RulerIcon } from "lucide-react";
import { CornerFrame } from "@/shared/ui/corner-frame";

const ZONES = [
  { label: "Минск и в пределах МКАД", price: "от 50 ƃ." },
  { label: "За МКАД, радиус 10 км", price: "от 60 ƃ." },
  { label: "За МКАД, радиус 30 км", price: "от 80 ƃ." },
  { label: "Остальная территория Беларуси", price: "по звонку" },
] as const;

export function DeliveryTariffs() {
  return (
    <CornerFrame className="border border-line bg-card p-6 sm:p-8">
      <div className="flex items-center gap-2 text-safety">
        <RulerIcon className="size-4" />
        <span className="font-label text-xs font-semibold tracking-[0.2em] uppercase">Тарифы на доставку</span>
      </div>

      <ul className="mt-6 flex flex-col">
        {ZONES.map((zone) => (
          <li key={zone.label} className="flex items-center justify-between gap-4 border-t border-line py-4 first:border-t-0">
            <div className="flex items-center gap-3">
              <span aria-hidden className="size-1.5 shrink-0 bg-safety" />
              <span className="text-sm text-ink">{zone.label}</span>
            </div>
            <span className="shrink-0 font-heading font-semibold text-ink tabular-nums">{zone.price}</span>
          </li>
        ))}
      </ul>
    </CornerFrame>
  );
}
