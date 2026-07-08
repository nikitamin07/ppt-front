"use client";

import { ArrowRightIcon, Building2Icon, CheckIcon, FlaskConicalIcon, HandshakeIcon, TruckIcon } from "lucide-react";
import { AnimatedLink } from "@/shared/ui/animated-link";
import { useScrollReveal } from "@/shared/lib/react";

const POINTS = [
  "Собственный склад — материалы в наличии",
  "Прямые поставки от производителей",
  "Контроль качества каждой партии",
] as const;

const BADGES = [
  { icon: FlaskConicalIcon, label: "Контроль состава" },
  { icon: TruckIcon, label: "Своя логистика" },
  { icon: HandshakeIcon, label: "Индивидуальный подход" },
] as const;

export function AboutTeaser() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8">
      <div ref={ref} className="grid gap-10 border border-line bg-card p-8 sm:p-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <div className="flex size-12 items-center justify-center border border-line bg-paper text-safety">
            <Building2Icon className="size-6" />
          </div>
          <p className="mt-4 font-label text-xs font-semibold uppercase tracking-[0.2em] text-safety">О компании</p>
          <ul className="mt-6 flex flex-col gap-3">
            {POINTS.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-ink">
                <CheckIcon className="mt-0.5 size-4 shrink-0 text-safety" />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-heading text-2xl font-semibold text-ink sm:text-3xl">
            Работаем на рынке стройматериалов Беларуси
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Продаем пенопласт, минеральную вату и сухие смеси собственного и партнерского
            производства. Держим склад в наличии, поэтому отгружаем без задержек и
            подтверждаем точный состав каждой партии.
          </p>
          <ul className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {BADGES.map(({ icon: Icon, label }) => (
              <li key={label} className="flex flex-col gap-3 border border-line bg-paper p-4">
                <Icon className="size-8 text-safety" />
                <span className="text-sm text-ink">{label}</span>
              </li>
            ))}
          </ul>
          <AnimatedLink href="/about" className="mt-7">
            Подробнее о нас
            <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover/link:translate-x-1" />
          </AnimatedLink>
        </div>
      </div>
    </section>
  );
}
