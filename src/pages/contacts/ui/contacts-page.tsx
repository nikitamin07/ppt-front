import { ClockIcon, MailIcon, MapPinIcon } from "lucide-react";
import { CornerFrame } from "@/shared/ui/corner-frame";
import { Breadcrumbs } from "@/widgets/breadcrumbs";
import { MessengerLinks } from "@/shared/ui/messenger-icons";
import { PhoneLink } from "@/shared/ui/phone-link";
import { Reveal } from "@/shared/ui/reveal";
import { CONTACTS } from "@/shared/config";

const REQUISITES = [
  { label: "Организация", value: "ЧТУП «РешениеСтройДизайн»" },
  { label: "УНП", value: "791217541" },
  { label: "Расчётный счёт", value: "BY71 ALFA 3012 2638 2100 1027 0000" },
  { label: "Банк", value: "ЗАО «Альфа-Банк», 220013 г. Минск, ул. Сурганова 43-47, код ALFABY2X" },
] as const;

export function ContactsPage() {
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
        <div className="grid gap-10 border border-line bg-card p-6 sm:p-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="eyebrow">Контакты</h2>
            <ul className="mt-6 flex flex-col gap-4 text-sm text-ink">
              <li className="flex items-start gap-3">
                <MapPinIcon className="mt-0.5 size-4 shrink-0 text-safety" />
                {CONTACTS.address}
              </li>
              {CONTACTS.phones.map((phone) => (
                <li key={phone.tel}>
                  <PhoneLink phone={phone} className="gap-3" iconClassName="size-4 text-safety" />
                </li>
              ))}
              <li className="flex items-center gap-3">
                <ClockIcon className="size-4 shrink-0 text-safety" />
                {CONTACTS.workHours}
              </li>
              <li className="flex items-center gap-3">
                <MailIcon className="size-4 shrink-0 text-safety" />
                <a href={`mailto:${CONTACTS.email}`} className="transition-colors hover:text-safety">
                  {CONTACTS.email}
                </a>
              </li>
            </ul>

            <MessengerLinks className="mt-6" linkClassName="border-line text-ink" />
          </div>

          <div>
            <h2 className="eyebrow">Реквизиты</h2>
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
        <h2 className="mb-6 eyebrow">Как нас найти</h2>
        <Reveal delay={0.1}>
          <CornerFrame>
            <iframe
              title="ППТ.бел на карте Yandex"
              src="https://yandex.by/map-widget/v1/-/CCU74CcJ1C"
              allowFullScreen
              className="block h-64 w-full border border-line sm:h-80 lg:h-96"
            />
          </CornerFrame>
        </Reveal>
      </section>
    </>
  );
}
