/**
 * Снять стартовые состояния анимаций, заданные в CSS под .js-anim.
 * Вызывается, когда анимация не поднялась: контент обязан остаться видимым.
 */
export function dropAnimStartState() {
  document.documentElement.classList.remove("js-anim");
}

/**
 * gsap + ScrollTrigger одним асинхронным чанком. Статический импорт клал их
 * в первичный бандл каждой страницы, где есть хоть один reveal, — а до гидратации
 * они не нужны. Оба вызова резолвятся в один и тот же модуль, так что чанк общий.
 *
 * null — чанк не доехал. Тогда стартовые состояния снимаются, иначе спрятанный
 * из CSS контент остался бы невидимым навсегда.
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
    dropAnimStartState();
    return null;
  }
}

/** Возврат gsap.context() — держим структурно, чтобы не тянуть типы gsap статически. */
export interface RevertibleContext {
  revert: () => void;
}
