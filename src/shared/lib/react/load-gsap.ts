/**
 * gsap + ScrollTrigger одним асинхронным чанком. Статический импорт клал их
 * в первичный бандл каждой страницы, где есть хоть один reveal, — а до гидратации
 * они не нужны. Оба вызова резолвятся в один и тот же модуль, так что чанк общий.
 *
 * null — чанк не доехал. Спрятанный из CSS контент тогда раскроет страховка
 * (@keyframes reveal-failsafe в globals.css), поэтому здесь достаточно выйти.
 */
export async function loadGsap() {
  try {
    const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]);

    gsap.registerPlugin(ScrollTrigger);

    return { gsap, ScrollTrigger };
  } catch {
    return null;
  }
}

/** Возврат gsap.context() — держим структурно, чтобы не тянуть типы gsap статически. */
export interface RevertibleContext {
  revert: () => void;
}
