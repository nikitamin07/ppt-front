"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/shared/lib/utils";

interface CountingAnimationProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  /**
   * Явное управление стартом (например, из внешнего GSAP-таймлайна) — считает,
   * когда active станет true. Если проп не передан, считает сам по себе через
   * IntersectionObserver при появлении во вьюпорте.
   */
  active?: boolean;
}

/** Число считает от 0 до value. Разово, с cleanup, уважает prefers-reduced-motion. */
export function CountingAnimation({ value, prefix, suffix, duration = 1400, className, active }: CountingAnimationProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(0);

  const runCount = (onDone?: () => void) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frameId = requestAnimationFrame(() => {
        setDisplay(value);
        onDone?.();
      });
      return () => cancelAnimationFrame(frameId);
    }

    let frameId: number;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setDisplay(Math.round(progress * value));
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        onDone?.();
      }
    };
    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  };

  // Режим внешнего управления (active передан явно) — считаем при active === true.
  useEffect(() => {
    if (active === undefined) return;
    if (!active) return;
    return runCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, value, duration]);

  // Автономный режим — считаем сами при появлении во вьюпорте.
  useEffect(() => {
    if (active !== undefined) return;
    const el = ref.current;
    if (!el) return;

    let cancelRun: (() => void) | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          cancelRun = runCount();
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelRun?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, value, duration]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {display.toLocaleString("ru-RU")}
      {suffix}
    </span>
  );
}
