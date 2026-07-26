"use client";

import type { ReactNode } from "react";
import { useScrollReveal, useStaggerReveal } from "@/shared/lib/react";

/**
 * Клиентские островки под reveal-анимацию: ref нельзя повесить из серверного компонента.
 * Разметка внутрь приходит уже отрисованной на сервере — в браузер едет только сама обёртка.
 */

interface RevealProps {
  className?: string;
  /** Задержка старта в секундах */
  delay?: number;
  children: ReactNode;
}

/** Блок целиком проявляется при входе во вьюпорт. */
export function Reveal({ className, delay, children }: RevealProps) {
  const ref = useScrollReveal<HTMLDivElement>({ delay });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

interface RevealStaggerProps {
  className?: string;
  as?: "div" | "ul";
  stagger?: number; 
  children: ReactNode;
}

/** Каскадное появление прямых детей контейнера. */
export function RevealStagger({ className, as, stagger, children }: RevealStaggerProps) {
  const divRef = useStaggerReveal<HTMLDivElement>({stagger: stagger});
  const listRef = useStaggerReveal<HTMLUListElement>({stagger: stagger});

  // Два хука вместо приведения типов: неиспользованный ref остаётся пустым,
  // его эффект выходит на первой же строке.
  return as === "ul" ? (
    <ul ref={listRef} className={className}>
      {children}
    </ul>
  ) : (
    <div ref={divRef} className={className}>
      {children}
    </div>
  );
}
