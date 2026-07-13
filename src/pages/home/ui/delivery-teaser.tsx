"use client";

import { ArrowRightIcon, ClockIcon, MapIcon, PackageCheckIcon, TruckIcon } from "lucide-react";
import { AnimatedLink } from "@/shared/ui/animated-link";
import { CountingAnimation } from "@/shared/ui/counting-animation";
import { useScrollReveal } from "@/shared/lib/react";
import { useState } from "react";

const POINTS = [
  { icon: TruckIcon, text: "Доставка по всей Беларуси" },
  { icon: ClockIcon, text: "От 1 до 3 рабочих дней" },
  { icon: PackageCheckIcon, text: "Погрузка товаров включена" },
] as const;

export function DeliveryTeaser() {
  const [deliveryActive, setDeliveryActive] = useState(false);
  const ref = useScrollReveal<HTMLDivElement>({callBack: () => setDeliveryActive(true)});

  return (
    <section className="container">
      <div ref={ref} className="border border-line bg-ink p-8 text-paper sm:p-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <div className="flex size-12 items-center justify-center border border-white/15 bg-white/5 text-safety">
              <MapIcon className="size-6" />
            </div>
            <h2 className="mt-4 font-label text-md font-semibold uppercase tracking-[0.2em] text-safety">Доставка</h2>
            <div className="mt-6 font-heading text-4xl font-semibold text-paper sm:text-5xl">
              <CountingAnimation value={48} prefix="~" suffix=" часов" active={deliveryActive} />
            </div>
            <p className="mt-4 text-sm text-paper/60">и необходимый материал у вас на объекте</p>
          </div>
          <div>
            <h3 className="font-heading text-2xl font-semibold sm:text-3xl">
              Привезем материал на объект
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-paper/70">
              Развозим по Минску и области собственным транспортом. Сроки доставки оговариваются с покупателем при оформлении заказа в удобное для него время.
            </p>
            <ul className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {POINTS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center sm:items-start sm:flex-col gap-3 border border-white/10 bg-white/5 p-4">
                  <Icon className="size-8 text-safety" />
                  <span className="text-sm text-paper/90">{text}</span>
                </li>
              ))}
            </ul>
            <AnimatedLink href="/delivery" className="mt-7 text-paper">
              Условия доставки
              <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover/link:translate-x-1" />
            </AnimatedLink>
          </div>
        </div>
      </div>
    </section>
  );
}
