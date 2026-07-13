"use client";

import { ArrowRightIcon, Building2Icon, CheckIcon, FlaskConicalIcon, HandshakeIcon, TruckIcon } from "lucide-react";
import { AnimatedLink } from "@/shared/ui/animated-link";
import { useScrollReveal } from "@/shared/lib/react";

const POINTS = [
  "Собственный склад — материалы в наличии",
  "Честные цены и гибкая система скидок",
  "Компетентный персонал",
  "Принимаем заявки 24/7",
  "Прямые поставки от производителей",
  "Контроль качества каждой партии",
] as const;

const BADGES = [
  { icon: FlaskConicalIcon, label: "Контроль качества каждого товара" },
  { icon: TruckIcon, label: "Быстрая доставка на объект" },
  { icon: HandshakeIcon, label: "Индивидуальный подход" },
] as const;

export function AboutTeaser() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="container">
      <div ref={ref} className="grid gap-10 border border-line bg-card p-8 sm:p-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <div className="flex size-12 items-center justify-center border border-line bg-paper text-safety">
            <Building2Icon className="size-6" />
          </div>
          <h2 className="mt-4 font-label text-md font-semibold uppercase tracking-[0.2em] text-safety">О компании</h2>
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
          <h3 className="font-heading text-2xl font-semibold text-ink sm:text-3xl">
            ЧП «РешениеСтройДизайн» – надежный поставщик строительных материалов
          </h3>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Реализуем все виды утеплителей, строительных и отделочных материалов партнерского
            производства. Держим широкий ассортимент в наличии на складе. Отгружаем в минимальные сроки и только проверенный материал.
          </p>
          <ul className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {BADGES.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center sm:items-start sm:flex-col gap-3 border border-line bg-paper p-4">
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
