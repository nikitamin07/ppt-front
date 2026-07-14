"use client";

import {
  AlertTriangleIcon,
  CalendarClockIcon,
  ClockIcon,
  MapPinIcon,
  PhoneCallIcon,
} from "lucide-react";
import { Breadcrumbs } from "@/widgets/breadcrumbs";
import { CornerFrame } from "@/shared/ui/corner-frame";
import { PhoneLink } from "@/shared/ui/phone-link";
import { OrderCallbackDialog } from "@/features/order-callback";
import { useScrollReveal, useStaggerReveal } from "@/shared/lib/react";
import { CONTACTS } from "@/shared/config";
import { DeliveryTariffs } from "./delivery-tariffs";

const TIMING = [
  { icon: CalendarClockIcon, text: "Возможна доставка в день обращения" },
  { icon: ClockIcon, text: "Развозим по графику: пн-пт, 9:00 - 18:00" },
  { icon: PhoneCallIcon, text: "Точное время согласуем по телефону" },
] as const;

const WAREHOUSE_HOURS = [
  { days: "Пн–Пт", hours: "9:00–19:00" },
  { days: "Сб–Вс", hours: "9:00–16:00" },
] as const;

export function DeliveryPage() {
  const timingRef = useStaggerReveal<HTMLDivElement>();
  const pickupRef = useScrollReveal<HTMLDivElement>();
  const mapRef = useScrollReveal<HTMLDivElement>({ delay: 0.1 });

  return (
    <>
      <Breadcrumbs />

      <section className="container">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:items-start lg:gap-16">
          <div>
            <p className="eyebrow text-xs lg:text-sm">Доставка</p>
            <h1 className="mt-4 font-heading text-3xl font-semibold leading-[1.1] text-ink sm:text-5xl">
              Привозим материал на объект в день обращения
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Развозим стройматериалы по Минску, Минской области и всей Беларуси. По городу и в
              пределах МКАД стоимость зависит от объема и веса товара, а также направления и расстояния. Материал
              привозим прямо на объект — до подъезда дома или стройплощадки.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Точное время доставки согласовывается с менеджером при оформлении заказа. Если ждать не хочется, 
              материал можно забрать самостоятельно со склада в г. Минске.
            </p>
          </div>

          <DeliveryTariffs />
        </div>
      </section>

      <section className="container">
        <div className="border-b border-line pb-5">
          <p className="eyebrow text-xs">Сроки</p>
          <h2 className="mt-2 font-heading text-2xl font-semibold text-ink sm:text-3xl">Когда привезём</h2>
        </div>

        <div ref={timingRef} className="sm:mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {TIMING.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center sm:items-start gap-3 border border-line bg-card p-4 sm:flex-col">
              <Icon className="size-7 shrink-0 text-safety sm:size-8" />
              <span className="text-sm text-ink">{text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="container">
        <div className="flex flex-col gap-4 border-l-2 border-safety bg-card p-6 sm:flex-row sm:items-start sm:gap-5 sm:p-8">
          <AlertTriangleIcon className="size-6 shrink-0 text-safety" />
          <div>
            <h2 className="font-heading text-lg font-semibold text-ink sm:text-xl">Разгрузка — на вашей стороне</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Разгрузка и подъём материала выполняются силами покупателя. На разгрузку материала отводится около 1 часа
              с момента прибытия на объект — сам водитель материал не разгружает.
            </p>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="border-b border-line pb-5">
          <p className="eyebrow text-xs">Самовывоз</p>
          <h2 className="mt-2 font-heading text-2xl font-semibold text-ink sm:text-3xl">Как забрать самостоятельно</h2>
        </div>

        <div ref={pickupRef} className="mt-8 grid gap-10 border border-line bg-card p-6 sm:p-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Заберите нужный материал прямо со склада — без ожидания доставки.
            </p>
            <ul className="mt-6 flex flex-col gap-4 text-sm text-ink">
              <li className="flex items-start gap-3">
                <MapPinIcon className="mt-0.5 size-4 shrink-0 text-safety" />
                {CONTACTS.address}
              </li>
              {WAREHOUSE_HOURS.map((row) => (
                <li key={row.days} className="flex items-center gap-3">
                  <ClockIcon className="size-4 shrink-0 text-safety" />
                  {row.days}: {row.hours}
                </li>
              ))}
            </ul>
          </div>

          <div ref={mapRef}>
            <CornerFrame>
              <iframe
                title="Склад ППТ.бел на карте Yandex"
                src="https://yandex.by/map-widget/v1/-/CCU74CcJ1C"
                allowFullScreen
                className="block h-64 w-full border border-line sm:h-full sm:min-h-72"
              />
            </CornerFrame>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="border border-line bg-ink p-8 text-paper sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <div className="flex size-12 items-center justify-center border border-white/15 bg-white/5 text-safety">
                <PhoneCallIcon className="size-6" />
              </div>
              <p className="mt-4 eyebrow">Мы на связи</p>
              <p className="mt-2 text-sm text-paper/60">{CONTACTS.workHours}</p>
            </div>
            <div>
              <h3 className="font-heading text-xl font-semibold sm:text-2xl lg:text-3xl">
                Рассчитаем стоимость доставки по вашему адресу
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-paper/70 sm:text-base">
                Позвоните или оставьте заявку — уточним объём, тариф и удобное для вас время.
              </p>
              <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <OrderCallbackDialog className="px-5 py-3" />
                <PhoneLink phone={CONTACTS.phones[0]} className="text-paper" iconClassName="size-4 text-safety" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
