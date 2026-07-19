"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Каскадное появление прямых детей контейнера при входе во вьюпорт. */
export function useStaggerReveal<T extends HTMLElement>(options?: { y?: number; stagger?: number }) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
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
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
        },
      );
    }, el);

    // Web-шрифты сдвигают раскладку — пересчитываем триггеры разово;
    // invalidateOnRefresh сбросил бы сыгранную анимацию в 0.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
