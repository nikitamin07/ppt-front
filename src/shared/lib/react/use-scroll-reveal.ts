"use client";

import { useEffect, useRef } from "react";
import { loadGsap, type RevertibleContext } from "./load-gsap";

/** Каскадное появление контейнера при входе во вьюпорт. */
export function useScrollReveal<T extends HTMLElement>(options?: { y?: number; delay?: number, callBack?: () => void }) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let cancelled = false;
    let ctx: RevertibleContext | undefined;

    void (async () => {
      const lib = await loadGsap();
      // cancelled — компонент размонтировали, пока грузился чанк.
      // null — чанк не доехал, loadGsap уже вернул контент в видимое состояние.
      if (cancelled || !lib) return;
      const { gsap, ScrollTrigger } = lib;

      ctx = gsap.context(() => {
        // fromTo с явным конечным значением
        gsap.fromTo(
          el,
          { opacity: 0, y: options?.y ?? 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: options?.delay ?? 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
            // Функция, выполняемая после появления блока
            onComplete: () => options?.callBack?.()
          },
        )
      });

      // Web-шрифты сдвигают раскладку — пересчитываем триггеры разово;
      // invalidateOnRefresh сбросил бы сыгранную анимацию в 0.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
