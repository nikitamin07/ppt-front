"use client";

import Link from "next/link";
import {
  BadgePercentIcon,
  BoxIcon,
  BrickWallIcon,
  CalculatorIcon,
  FileCheckIcon,
  HeadsetIcon,
  LayersIcon,
  LayoutGridIcon,
  LifeBuoyIcon,
  PercentIcon,
  PhoneCallIcon,
  ShieldCheckIcon,
  TruckIcon,
  WindIcon,
  ZapIcon,
} from "lucide-react";
import { Breadcrumbs } from "@/widgets/breadcrumbs";
import { AnimatedLink } from "@/shared/ui/animated-link";
import { OrderCallbackDialog } from "@/features/order-callback";
import { useStaggerReveal } from "@/shared/lib/react";
import { CONTACTS } from "@/shared/config";
import { CompanyPassport } from "./company-passport";

const OFFERS = [
  { icon: BadgePercentIcon, label: "Честные цены" },
  { icon: PercentIcon, label: "Гибкая система скидок" },
  { icon: ShieldCheckIcon, label: "Качество, проверенное временем" },
  { icon: LayoutGridIcon, label: "Актуальный ассортимент" },
  { icon: ZapIcon, label: "Быстрая доставка на объект" },
  { icon: FileCheckIcon, label: "Выгодные условия сотрудничества" },
  { icon: HeadsetIcon, label: "Учитываем все пожелания" },
] as const;

const PROCESS = [
  {
    icon: CalculatorIcon,
    title: "Подбор и расчёт",
    text: "Помогаем точно рассчитать объём и марку материала под конкретную задачу — от утепления фасада до заливки пола.",
  },
  {
    icon: TruckIcon,
    title: "Поставка",
    text: "Отгружаем материал как от производителя напрямую, так и с нашего склада, что позволяет не привязывать сроки к производству.",
  },
  {
    icon: LifeBuoyIcon,
    title: "Сопровождение",
    text: "Остаёмся на связи как до, так и после прибытия товара заказчику и помогаем решать вопросы по материалу.",
  },
] as const;

const MATERIALS = [
  {
    icon: BoxIcon,
    title: "Пенопласт",
    text: "ППТ, графитовый, формованный и клиновидный",
    href: "/catalog/penoplast",
  },
  {
    icon: LayersIcon,
    title: "XPS",
    text: "Истплекс, Батэплекс, Пеноплекс",
    href: "/catalog/xps",
  },
  {
    icon: WindIcon,
    title: "Минеральная вата",
    text: "Минеральная и каменная вата",
    href: "/catalog/minvat-uteplitel",
  },
  {
    icon: BrickWallIcon,
    title: "Полистиролбетон",
    text: "Блоки, плиты, жидкий полистиролбетон",
    href: "/catalog/polisterolbeton-blocks",
  },
] as const;

const VALUES = ["Дорожим клиентами", "Дорожим репутацией", "Работаем для вас"] as const;

export function AboutPage() {
  const offersRef = useStaggerReveal<HTMLUListElement>();
  const processRef = useStaggerReveal<HTMLDivElement>();
  const materialsRef = useStaggerReveal<HTMLDivElement>();

  return (
    <>
      <Breadcrumbs />

      <section className="container">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:items-start lg:gap-16">
          <div>
            <p className="eyebrow text-xs lg:text-sm">О компании</p>
            <h1 className="mt-4 font-heading text-3xl font-semibold leading-[1.1] text-ink sm:text-5xl">
              Один из ведущих поставщиков стройматериалов в Беларуси
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              ЧП «РешениеСтройДизайн» поставляет стройматериалы во все регионы Беларуси —
              строительным организациям, трестам, домостроительным комбинатам, бригадам и частным застройщикам.
              Организовываем поставки с завода напрямую заказчику.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Ассортимент растёт вместе с компанией: за годы работы мы выстроили партнёрские отношения с ведущими
              производителями пенопласта, экструдированного пенополистирола, минеральной ваты и других строительных и отделочных материалов.
              Это позволяет предлагать проверенную продукцию по конкурентным ценам и отгружать её в короткие сроки.
            </p>
          </div>

          <CompanyPassport />
        </div>
      </section>

      <section className="container">
        <div className="border-b border-line pb-5">
          <p className="eyebrow text-xs">Преимущества</p>
          <h2 className="mt-2 font-heading text-2xl font-semibold text-ink sm:text-3xl">Что мы предлагаем</h2>
        </div>

        <ul ref={offersRef} className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
          {OFFERS.map(({ icon: Icon, label }) => (
            <li key={label} className="flex flex-col items-start gap-3 border border-line bg-card p-4">
              <Icon className="size-7 text-safety sm:size-8" />
              <span className="text-sm text-ink">{label}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="container">
        <div className="border-b border-line pb-5">
          <p className="eyebrow text-xs">Процесс</p>
          <h2 className="mt-2 font-heading text-2xl font-semibold text-ink sm:text-3xl">Как мы работаем</h2>
        </div>

        <div
          ref={processRef}
          className="mt-8 grid grid-cols-1 divide-y divide-line border-t border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:border-t-0"
        >
          {PROCESS.map(({ icon: Icon, title, text }, i) => (
            <div key={title} className="flex flex-col gap-3 py-6 first:pt-0 sm:px-6 sm:py-0 sm:first:pl-0 sm:last:pr-0">
              <div className="flex items-center gap-3">
                <span className="font-label text-sm font-semibold text-safety tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Icon className="size-5 text-ink" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-ink">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container">
        <div className="border-b border-line pb-5">
          <p className="eyebrow text-xs">Ассортимент</p>
          <h2 className="mt-2 font-heading text-2xl font-semibold text-ink sm:text-3xl">Что мы поставляем</h2>
        </div>

        <div ref={materialsRef} className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {MATERIALS.map(({ icon: Icon, title, text, href }) => (
            <Link key={title} href={href} className="card-lift group flex flex-col gap-3 p-4 sm:p-5">
              <Icon className="size-7 text-safety transition-transform duration-300 group-hover:-translate-y-0.5 sm:size-8" />
              <h3 className="font-heading font-semibold text-ink">{title}</h3>
              <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{text}</p>
            </Link>
          ))}
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
              <ul className="flex flex-col gap-1.5 font-heading text-xl font-semibold sm:text-2xl lg:text-3xl">
                {VALUES.map((line) => (
                  <li key={line}>{line}.</li>
                ))}
              </ul>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-paper/70 sm:text-base">
                Если у вас есть пожелания, замечания или вопросы по работе сайта — напишите нам, и мы обязательно
                ответим.
              </p>
              <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <OrderCallbackDialog className="px-5 py-3" />
                <AnimatedLink href={`mailto:${CONTACTS.email}`} className="text-paper">
                  {CONTACTS.email}
                </AnimatedLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
