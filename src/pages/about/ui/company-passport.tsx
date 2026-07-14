import { StampIcon } from "lucide-react";
import { CornerFrame } from "@/shared/ui/corner-frame";
import { CountingAnimation } from "@/shared/ui/counting-animation";

const FACTS = [
  { label: "Организация", value: "ЧП «РешениеСтройДизайн»" },
  { label: "УНП", value: "791217541" },
  { label: "География поставок", value: "вся Беларусь" },
  { label: "Специализация", value: "теплоизоляция и стройматериалы" },
] as const;

const FOUNDED_YEAR = 2020;

function pluralizeYears(n: number) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "год";
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return "года";
  return "лет";
}

export function CompanyPassport() {
  const yearsOnMarket = new Date().getFullYear() - FOUNDED_YEAR;

  return (
    <div className="relative">
      <CornerFrame className="border border-line bg-card p-6 sm:p-8">
        <div className="flex items-center gap-2 text-safety">
          <StampIcon className="size-4" />
          <span className="font-label text-xs font-semibold tracking-[0.2em] uppercase">Паспорт компании</span>
        </div>

        <dl className="mt-6 flex flex-col gap-4">
          {FACTS.map((fact) => (
            <div key={fact.label} className="border-l-2 border-line pl-4">
              <dt className="text-xs tracking-wide text-muted-foreground uppercase">{fact.label}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-ink tabular-nums">{fact.value}</dd>
            </div>
          ))}
          <div className="border-l-2 border-safety pl-4">
            <dt className="text-xs tracking-wide text-muted-foreground uppercase">На рынке</dt>
            <dd className="mt-1 font-heading text-2xl font-semibold text-ink">
              <CountingAnimation value={yearsOnMarket} suffix={` ${pluralizeYears(yearsOnMarket)}`} />
            </dd>
          </div>
        </dl>
      </CornerFrame>

      <div
        aria-hidden
        className="absolute -top-4 -right-4 flex size-20 rotate-[-9deg] items-center justify-center border border-dashed border-safety bg-paper text-safety sm:size-24"
      >
        <div className="text-center">
          <StampIcon className="mx-auto size-5" />
          <span className="mt-1 block font-label text-[10px] leading-tight font-semibold tracking-wider uppercase">
            Действует
            <br />
            с {FOUNDED_YEAR}
          </span>
        </div>
      </div>
    </div>
  );
}
