"use client";

import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { CornerFrame } from "@/shared/ui/corner-frame";
import { Breadcrumbs } from "@/widgets/breadcrumbs";
import { TelegramIcon, ViberIcon } from "@/shared/ui/messenger-icons";
import { useScrollReveal } from "@/shared/lib/react";

const REQUISITES = [
  { label: "Организация", value: "ЧТУП «РешениеСтройДизайн»" },
  { label: "УНП", value: "791217541" },
  { label: "Расчётный счёт", value: "BY71 ALFA 3012 2638 2100 1027 0000" },
  { label: "Банк", value: "ЗАО «Альфа-Банк», 220013 г. Минск, ул. Сурганова 43-47, код ALFABY2X" },
] as const;

export function ContactsPage() {
  const gridRef = useScrollReveal<HTMLDivElement>();
  const mapRef = useScrollReveal<HTMLDivElement>({ delay: 0.1 });

  return (
    <>
      <Breadcrumbs/>
      <section className="container">
        <h1 className="font-heading text-4xl font-semibold text-ink sm:text-5xl">Контакты</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          На звонок по телефону отвечаем быстрее всего. Почта — для документов и счетов. На склад можно заехать
          по будням с 9:00 до 19:00, созвонившись с нами заранее для уточнения необходимого объема материала в наличии и доступности проезда к складу.
        </p>
      </section>

      <section className="container mt-12">
        <div ref={gridRef} className="grid gap-10 border border-line bg-card p-6 sm:p-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-label text-md font-semibold uppercase tracking-[0.2em] text-safety">Контакты</h2>
            <ul className="mt-6 flex flex-col gap-4 text-sm text-ink">
              <li className="flex items-start gap-3">
                <MapPinIcon className="mt-0.5 size-4 shrink-0 text-safety" />
                Минск, ул. Кнорина, 50А
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon className="size-4 shrink-0 text-safety" />
                <a href="tel:+375296918417" className="tabular-nums transition-colors hover:text-safety">
                  +375 (29) 691-84-17
                </a>
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon className="size-4 shrink-0 text-safety" />
                <a href="tel:+375259264845" className="tabular-nums transition-colors hover:text-safety">
                  +375 (25) 926-48-45
                </a>
              </li>
              <li className="flex items-center gap-3">
                <ClockIcon className="size-4 shrink-0 text-safety" />
                Пн–Пт, 9:00–18:00
              </li>
              <li className="flex items-center gap-3">
                <MailIcon className="size-4 shrink-0 text-safety" />
                <a href="mailto:7206856@mail.ru" className="transition-colors hover:text-safety">
                  7206856@mail.ru
                </a>
              </li>
            </ul>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://t.me/+375296918417"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Написать в Telegram"
                className="flex size-10 items-center justify-center border border-line text-ink transition-colors hover:border-safety hover:text-safety duration-300"
              >
                <TelegramIcon className="size-5 duration-300" />
              </a>
              <a
                href="viber://chat?number=%2B375296918417"
                target="_blank"
                aria-label="Написать в Viber"
                className="flex size-10 items-center justify-center border border-line text-ink transition-colors hover:border-safety hover:text-safety duration-300"
              >
                <ViberIcon className="size-5 duration-300" />
              </a>
            </div>
          </div>

          <div>
            <h2 className="font-label text-md font-semibold uppercase tracking-[0.2em] text-safety">Реквизиты</h2>
            <dl className="mt-6 flex flex-col gap-4">
              {REQUISITES.map((item) => (
                <div key={item.label} className="border-l-2 border-line pl-4">
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">{item.label}</dt>
                  <dd className="mt-1 text-sm tabular-nums leading-relaxed text-ink">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="container mt-12">
        <h2 className="mb-6 font-label text-md font-semibold uppercase tracking-[0.2em] text-safety">Как нас найти</h2>
        <div ref={mapRef}>
          <CornerFrame>
            <iframe
              title="ППТ.бел на карте Yandex"
              src="https://yandex.by/map-widget/v1/-/CCU74CcJ1C"
              allowFullScreen
              className="block h-64 w-full border border-line sm:h-80 lg:h-96"
            />
          </CornerFrame>
        </div>
      </section>
    </>
  );
}
