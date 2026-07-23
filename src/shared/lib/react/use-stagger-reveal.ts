"use client";

import { useEffect, useRef } from "react";
import { loadGsap, type RevertibleContext } from "./load-gsap";

/** Каскадное появление прямых детей контейнера: по скроллу или сразу при монтировании. */
export function useStaggerReveal<T extends HTMLElement>(options?: {
  y?: number;
  stagger?: number;
  onMount?: boolean;
}) {
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
          el.children,
          { opacity: 0, y: options?.y ?? 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: options?.stagger ?? 0.08,
            ease: "power2.out",
            // onMount — играем сразу, иначе ждём входа во вьюпорт.
            scrollTrigger: options?.onMount ? undefined : { trigger: el, start: "top 90%", once: true },
          },
        );
      }, el);

      // Web-шрифты сдвигают раскладку — пересчитываем триггеры разово;
      if (!options?.onMount) document.fonts?.ready.then(() => ScrollTrigger.refresh());
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
