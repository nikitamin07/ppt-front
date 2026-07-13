// X-координата штрихов условно равна ширине экрана: 0 = левый край, 1000 = правый.
export const SCREEN_WIDTH = 1000;

// Позиция корпуса — в процентах от ширины экрана
export const CASE_OFF_LEFT = "-22%";
export const CASE_ON_LEFT = "0%";
export const CASE_ON_RIGHT = "100%";
export const CASE_OFF_RIGHT = "122%";

const TICK_COUNT = 60;
const TICK_STEP = SCREEN_WIDTH / TICK_COUNT;

const TICKS = Array.from({ length: TICK_COUNT + 1 }, (_, i) => ({
  x: i * TICK_STEP,
  isMajor: i % 5 === 0,
}));

interface TapeRulerProps {
  caseWrapRef: React.RefObject<HTMLDivElement | null>;
  clipRectRef: React.RefObject<SVGRectElement | null>;
}

export function TapeRuler({ caseWrapRef, clipRectRef }: TapeRulerProps) {
  return (
    <div className="relative w-full">
      <svg viewBox="0 0 1000 140" preserveAspectRatio="none" className="block w-full h-22 sm:h-26 md:h-30 xl:h-35" aria-hidden>
        <defs>
          <clipPath id="ruler-clip">
            <rect ref={clipRectRef} x="0" y="20" width="0" height="120" />
          </clipPath>
        </defs>

        {/* Постоянная серая линия — продолжение нижней границы hero */}
        <line x1="0" y1="139" x2={SCREEN_WIDTH} y2="139" stroke="var(--color-line)" strokeWidth="1" />

        {/* Штрихи линейки — раскрываются через clip-path вслед за корпусом */}
        <g clipPath="url(#ruler-clip)">
          {TICKS.map((tick) => (
            <line
              key={tick.x}
              x1={tick.x}
              y1={tick.isMajor ? 112 : 121}
              x2={tick.x}
              y2="140"
              stroke="var(--color-safety)"
              strokeWidth={tick.isMajor ? 2.5 : 1.5}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>
      </svg>

      {/* Рулетка — отдельный SVG со своим viewBox, чтобы контур оставался неискажённым. */}
      <div
        ref={caseWrapRef}
        className="absolute bottom-0 w-24 sm:w-30 md:w-34 xl:w-40"
        style={{ left: CASE_OFF_LEFT, aspectRatio: "510 / 505" }}
      >
        <svg viewBox="220 0 420 400" className="h-full w-full overflow-visible" aria-hidden>
          <g fill="none" stroke="var(--color-safety)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
            {/* Корпус */}
            <path
              d="M289 202
                 A 155 155 0 1 1 583 300
                 C 596 328, 592 362, 588 378
                 Q 588 401 563 401
                 L 244 401
                 L 244 372
                 Z"
              strokeWidth="8"
            />
            {/* Уголок-кнопка слева — срезанная вершина */}
            <path d="M289 202 L 275 255 L 266 230 Z" />
            {/* Клипса-крепление в центре */}
            <rect x="402" y="168" width="78" height="120" rx="12" />
            <rect x="433" y="195" width="14" height="46" rx="7" />
            {/* Петля-капля справа */}
            <path
              d="M585 391
                 C 607 396, 621 412, 620 432
                 C 619 452, 599 459, 588 448
                 C 597 431, 599 411, 585 391 Z"
            />
            {/* Сглаженная ручка сверху */}
            <line x1="495" y1="240" x2="565" y2="240" strokeWidth="8" />
            <line x1="305" y1="240" x2="385" y2="240" strokeWidth="8" />
            <path d="M305 240 A 130 130 0 0 1 565 240" strokeWidth="8" />
            {/* Болтик */}
            <circle cx="560" cy="375" r="15" />
            <line x1="551" y1="366" x2="569" y2="384" />
            <line x1="569" y1="366" x2="551" y2="384" />
            {/* Вертикальные рёбра-насечки */}
            <line x1="385" y1="310" x2="385" y2="385" strokeWidth="6" />
            <line x1="405" y1="310" x2="405" y2="385" strokeWidth="6" />
            <line x1="425" y1="310" x2="425" y2="385" strokeWidth="6" />
            <line x1="445" y1="310" x2="445" y2="385" strokeWidth="6" />
            <line x1="465" y1="310" x2="465" y2="385" strokeWidth="6" />
            <line x1="485" y1="310" x2="485" y2="385" strokeWidth="6" />
            <line x1="505" y1="290" x2="505" y2="385" strokeWidth="6" />
            <line x1="525" y1="270" x2="525" y2="385" strokeWidth="6" />
            <line x1="545" y1="270" x2="545" y2="350" strokeWidth="6" />
            <line x1="565" y1="270" x2="565" y2="350" strokeWidth="6" />
          </g>
        </svg>
      </div>
    </div>
  );
}
