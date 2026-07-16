import Link from "next/link";
import { HammerIcon } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { CornerFrame } from "@/shared/ui/corner-frame";

/** Искры в точке удара: три штриха врозь. */
const SPARK_ANGLES = [-45, 0, 45];

export function NotFoundPage() {
  return (
    <section className="container flex flex-col items-center py-16 text-center sm:py-24">
      <p className="eyebrow text-xs">Ошибка 404</p>

      <CornerFrame className="mt-8">
        <div className="px-10 pt-28 pb-8 sm:px-16 sm:pt-36">
          {/* Точка отсчёта сцены — верх глифов «404» по центру. Это не top-0 обёртки:
              при leading-none строчный бокс всё равно выше самих цифр примерно на 0.27em,
              поэтому и молоток, и искры опущены на эту величину (19px при 7xl, 35px при 9xl). */}
          <div className="relative inline-block">
            <span className="block font-heading text-7xl leading-none font-semibold tracking-tight text-ink tabular-nums select-none sm:text-9xl motion-safe:animate-[knock-jolt_1.1s_ease-in-out_infinite]">
              404
            </span>

            <HammerIcon
              aria-hidden
              strokeWidth={1.25}
              // Разворот на 180° живёт в кейфреймах: класс rotate-180 задал бы отдельное
              // свойство rotate, которое сложилось бы с transform из анимации.
              className="absolute -top-[95px] left-[calc(50%+50px)] size-20 origin-[8%_88%] text-ink sm:-top-[124px] sm:left-[calc(50%+70px)] sm:size-28 motion-safe:animate-[hammer-swing_1.1s_ease-in-out_infinite]"
            />

            <span aria-hidden className="pointer-events-none absolute top-[19px] left-1/2 sm:top-[35px]">
              {SPARK_ANGLES.map((angle) => (
                <span
                  key={angle}
                  style={{ rotate: `${angle}deg` }}
                  className="absolute bottom-0 h-2 w-0.5 origin-bottom bg-safety opacity-0 motion-safe:animate-[knock-spark_1.1s_ease-out_infinite]"
                />
              ))}
            </span>
          </div>
        </div>
      </CornerFrame>

      <h1 className="mt-12 max-w-2xl font-heading text-3xl font-semibold text-balance text-ink sm:text-4xl">
        Когда-нибудь вы сюда достучитесь
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
        А пока — закажите стройматериалы у нас по выгодной цене. Пенопласт, XPS, минеральная вата и сухие
        смеси со склада в Минске.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button variant="safety" className="px-5 py-3" render={<Link href="/catalog" />}>
          Смотреть каталог
        </Button>
        <Button variant="ink" className="px-5 py-3" render={<Link href="/" />}>
          На главную
        </Button>
      </div>
    </section>
  );
}
