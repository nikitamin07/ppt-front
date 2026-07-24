"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRightIcon } from "lucide-react";
import { CountingAnimation } from "@/shared/ui/counting-animation";
import {
  TapeRuler,
  SCREEN_WIDTH,
  CASE_OFF_LEFT,
  CASE_ON_LEFT,
  CASE_ON_RIGHT,
  CASE_OFF_RIGHT,
} from "@/shared/ui/tape-ruler";
import { OrderCallbackDialog } from "@/features/order-callback";
import { Button } from "@/shared/ui/button";
import { InsulationDiagram } from "./insulation-diagram";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  productsCount: number;
  categoriesCount: number;
}

export function Hero({ productsCount, categoriesCount }: HeroProps) {
  const stats = [
    { value: productsCount, suffix: "", label: "позиций в каталоге" },
    { value: categoriesCount, suffix: "", label: "категорий материалов" },
    { value: 48, suffix: " часов", label: "средний срок доставки" },
  ];

  const rootRef = useRef<HTMLDivElement | null>(null);
  const caseWrapRef = useRef<HTMLDivElement | null>(null);
  const clipRectRef = useRef<SVGRectElement | null>(null);
  const captionRef = useRef<HTMLParagraphElement | null>(null);
  const [statsActive, setStatsActive] = useState(false);

  // useGSAP избегает двойной вызов эффектов в Strict Mode
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setStatsActive(true);
        return;
      }

      try {
        // fromTo с явным конечным состоянием везде
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo("[data-hero-eyebrow]", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55 })
          .fromTo("[data-hero-line]", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.85, stagger: 0.08 }, "-=0.25")
          .fromTo("[data-hero-sub]", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1 }, 0.35)
          .fromTo(
            "[data-hero-cta]",
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.65, stagger: 0.08 },
            "-=0.45",
          )
          .fromTo(
            "[data-hero-stat]",
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 },
            "-=0.35",
          )
          // Числа стартуют считать ровно в тот момент, когда блок статистики начинает проявляться
          .call(() => setStatsActive(true), [], "<")
          .fromTo(
            "[data-diagram-layer]",
            { opacity: 0, scaleX: 0 },
            { opacity: 1, scaleX: 1, duration: 0.65, stagger: 0.12, ease: "power2.inOut" },
            "-=0.7",
          )
          .fromTo(
            "[data-diagram-label]",
            { opacity: 0, y: 6 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.06 },
            "-=0.25",
          )
          .fromTo("[data-diagram-dimension]", { opacity: 0 }, { opacity: 1, duration: 0.45 }, "-=0.2");
      } catch {
        setStatsActive(true);
      }
    },
    { scope: rootRef },
  );

  // Рулетка: hero пинится, корпус пробегает по нижней кромке,
  // за ним дорисовывается разметка, затем скролл продолжается.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        clipRectRef.current?.setAttribute("width", String(SCREEN_WIDTH));
        gsap.set(caseWrapRef.current, { left: CASE_OFF_RIGHT });
        gsap.set(captionRef.current, { opacity: 1, y: 0 });
        return;
      }

      let tl: gsap.core.Timeline | undefined;

      const build = () => {
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "bottom bottom",
            end: () => "+=" + window.innerHeight * 1.1,
            scrub: 0.6,
            pin: true,
          },
        });

        tl.fromTo(
          caseWrapRef.current,
          { left: CASE_OFF_LEFT },
          { left: CASE_ON_LEFT, duration: 0.15, ease: "power1.out" },
        )
          .addLabel("cross")
          .fromTo(caseWrapRef.current, { left: CASE_ON_LEFT }, { left: CASE_ON_RIGHT, duration: 0.7, ease: "none" }, "cross")
          .fromTo(
            clipRectRef.current,
            { attr: { width: 0 } },
            { attr: { width: SCREEN_WIDTH }, duration: 0.7, ease: "none" },
            "cross",
          )
          .fromTo(captionRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.15 }, "cross+=0.55")
          .fromTo(
            caseWrapRef.current,
            { left: CASE_ON_RIGHT },
            { left: CASE_OFF_RIGHT, duration: 0.15, ease: "power1.in" },
          );
      };

      // Пин вставляет распорку и меняет высоту документа. Пока браузер восстанавливает
      // позицию скролла, эти двое дерутся, и страницу уводит вниз. Ждём load: к этому
      // моменту позиция уже восстановлена и высота стабильна.
      if (document.readyState === "complete") {
        build();
      } else {
        window.addEventListener("load", build, { once: true });
      }

      // Таймлайн рождается вне колбэка, поэтому контекст useGSAP его не подхватит —
      // убираем вручную вместе с его триггером.
      return () => {
        window.removeEventListener("load", build);
        tl?.scrollTrigger?.kill();
        tl?.kill();
      };
    },
    { scope: rootRef },
  );

  return (
    <section>
      <div ref={rootRef} className="relative flex flex-col bg-paper pt-12 pb-42 sm:pb-46 md:pb-52 xl:pb-60 min-h-[calc(100vh-105px)]">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:items-center lg:gap-8">
            <div>
              <p data-hero-eyebrow className="eyebrow text-[3vw] sm:text-xs lg:text-sm">
                ППТ.бел — склад строительных материалов
              </p>
              <h1 className="mt-2 sm:mt-4 font-heading text-[6.5vw] font-semibold leading-[1.08] text-ink sm:text-5xl lg:text-[2.8rem] xl:text-[3.4rem]">
                <span data-hero-line className="block">Материалы для стройки</span>
                <span data-hero-line className="block">и утепления — в наличии</span>
              </h1>
              <p data-hero-sub className="mt-6 sm:mt-8 max-w-full text-base leading-relaxed text-muted-foreground sm:text-lg">
                Доставка строительных материалов по всей территории республики Беларусь. {"\n"}
                Работаем напрямую от производителей, что позволяет поддерживать низкие цены и быструю доставку. Оставьте заявку, и наши сотрудники помогут подобрать оптимальный вариант
                с учётом особенностей объекта и бюджета.
              </p>
              <div className="mt-6 sm:mt-9 flex flex-col items-start gap-3 sm:flex-row">
                <Button data-hero-cta variant="ink" className="px-5 py-3" render={<Link href="/catalog" />}>
                  Смотреть каталог
                  <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover/button:translate-x-1" />
                </Button>
                <div data-hero-cta>
                  <OrderCallbackDialog className="px-5 py-3" />
                </div>
              </div>

              <div className="mt-8 sm:mt-10 grid max-w-full md:max-w-3/4 lg:max-w-[82%] xl:max-w-3/4 grid-cols-3 divide-x divide-line border-t border-line pt-4 xl:pt-8">
                {stats.map((stat) => (
                  <div data-hero-stat key={stat.label} className="px-2 sm:px-4">
                    <div className="font-heading text-lg font-semibold text-ink sm:text-2xl lg:text-3xl">
                      <CountingAnimation value={stat.value} suffix={stat.suffix} active={statsActive} />
                    </div>
                    <div className="sm:mt-1 text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden h-full items-center justify-center border border-line bg-card py-4 lg:flex">
              <InsulationDiagram />
            </div>
          </div>
        </div>

        {/* Рулетка на нижней кромке hero */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 pb-3 md:gap-6 md:pb-6 overflow-hidden">
          <TapeRuler caseWrapRef={caseWrapRef} clipRectRef={clipRectRef} />
          <p
            ref={captionRef}
            data-hero-caption
            className="mx-auto text-center max-w-7xl px-6 font-label text-base font-semibold text-ink sm:text-xl lg:px-8"
          >
            Точность до миллиметра — в характеристиках каждого товара
          </p>
        </div>
      </div>
    </section>
  );
}
