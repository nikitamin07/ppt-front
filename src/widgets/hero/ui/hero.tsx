"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
import { InsulationDiagram } from "./insulation-diagram";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 50, suffix: "+", label: "позиций в каталоге" },
  { value: 10, suffix: "", label: "категорий материалов" },
  { value: 48, suffix: " часов", label: "средний срок доставки" },
] as const;

export function Hero() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const caseWrapRef = useRef<HTMLDivElement | null>(null);
  const clipRectRef = useRef<SVGRectElement | null>(null);
  const captionRef = useRef<HTMLParagraphElement | null>(null);
  const [statsActive, setStatsActive] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !rootRef.current) {
      setStatsActive(true);
      return;
    }

    const ctx = gsap.context(() => {
      // fromTo с явным конечным состоянием везде
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo("[data-hero-eyebrow]", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 })
        .fromTo("[data-hero-line]", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, "-=0.2")
        .fromTo("[data-hero-sub]", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
        .fromTo(
          "[data-hero-cta]",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          "-=0.25",
        )
        .fromTo(
          "[data-hero-stat]",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 },
          "-=0.2",
        )
        // Числа стартуют считать ровно в тот момент, когда блок статистики начинает проявляться
        .call(() => setStatsActive(true), [], "<")
        .fromTo(
          "[data-diagram-layer]",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.5, stagger: 0.12, ease: "power2.inOut" },
          "-=0.5",
        )
        .fromTo(
          "[data-diagram-label]",
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.06 },
          "-=0.15",
        )
        .fromTo("[data-diagram-dimension]", { opacity: 0 }, { opacity: 1, duration: 0.3 }, "-=0.1");
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Рулетка: когда низ экрана доходит до низа hero, весь блок пинится (виден целиком),
  // и пока стоит скролл, корпус рулетки пробегает по нижней кромке hero слева направо,
  // вслед за ним дорисовывается разметка. После — обычный скролл продолжается дальше.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      clipRectRef.current?.setAttribute("width", String(SCREEN_WIDTH));
      gsap.set(caseWrapRef.current, { left: CASE_OFF_RIGHT });
      gsap.set(captionRef.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
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
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section>
      <div ref={rootRef} className="relative flex flex-col bg-paper pt-12 pb-42 sm:pb-46 md:pb-55 xl:pb-60 min-h-[calc(100vh-105px)]">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:items-center lg:gap-8">
            <div>
              <p data-hero-eyebrow className="font-label text-xs lg:text-sm font-semibold uppercase tracking-[0.2em] text-safety">
                ППТ.бел — склад строительных материалов
              </p>
              <h1 className="mt-4 font-heading text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl lg:text-[3.4rem]">
                <span data-hero-line className="block">Материалы для стройки</span>
                <span data-hero-line className="block">и утепления — в наличии</span>
              </h1>
              <p data-hero-sub className="mt-6 max-w-full text-base leading-relaxed text-muted-foreground sm:text-lg">
                Доставка строительных материалов по всей территории республики Беларусь. {"\n"}
                Работаем напрямую от производителей, что позволяет поддерживать низкие цены и быструю доставку. Оставьте заявку, и наши сотрудники помогут подобрать оптимальный вариант
                с учётом особенностей объекта и бюджета.
              </p>
              <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row">
                <Link
                  data-hero-cta
                  href="/catalog"
                  className="group inline-flex items-center gap-2 bg-ink px-5 py-3 text-sm font-semibold text-paper transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-10px_rgba(27,27,24,0.5)] active:translate-y-0 active:scale-[0.97]"
                >
                  Смотреть каталог
                  <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <div data-hero-cta>
                  <OrderCallbackDialog className="px-5 py-3" />
                </div>
              </div>

              <div className="mt-14 grid max-w-[75%] grid-cols-3 divide-x divide-line border-t border-line pt-8">
                {STATS.map((stat) => (
                  <div data-hero-stat key={stat.label} className="px-2 sm:px-4">
                    <div className="font-heading text-2xl font-semibold text-ink sm:text-3xl lg:text-4xl">
                      <CountingAnimation value={stat.value} suffix={stat.suffix} active={statsActive} />
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground sm:text-md lg:text-md">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden h-full items-center justify-center border border-line bg-card p-6 lg:flex">
              <InsulationDiagram />
            </div>
          </div>
        </div>

        {/* Рулетка на нижней кромке hero — см. второй useEffect выше */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 pb-3 md:gap-6 md:pb-6 overflow-hidden">
          <TapeRuler caseWrapRef={caseWrapRef} clipRectRef={clipRectRef} />
          <p
            ref={captionRef}
            className="mx-auto text-center max-w-7xl px-6 font-label text-base font-semibold text-ink sm:text-xl lg:px-8"
          >
            Точность до миллиметра — в характеристиках каждого товара
          </p>
        </div>
      </div>
    </section>
  );
}
