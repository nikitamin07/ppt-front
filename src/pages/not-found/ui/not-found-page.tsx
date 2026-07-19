import Link from "next/link";
import { HammerIcon } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { CornerFrame } from "@/shared/ui/corner-frame";

/** Искры в точке удара: три штриха врозь. */
const SPARK_ANGLES = [-45, 0, 45];

export function NotFoundPage() {
  return (
    <section className="container flex flex-col items-center pt-12 text-center">
      <p className="eyebrow text-xs">Страница не найдена</p>

      <CornerFrame className="mt-8">
        <div className="px-10 pt-16 pb-8 sm:px-16 sm:pt-26">
          <div className="relative inline-block">
            <span className="block font-heading text-7xl leading-none font-semibold tracking-tight text-ink tabular-nums select-none sm:text-9xl motion-safe:animate-[knock-jolt_1.1s_ease-in-out_infinite]">
              404
            </span>

            <HammerIcon
              aria-hidden
              strokeWidth={1.25}
              className="absolute -top-[109px] left-[calc(50%+36px)] size-20 origin-[8%_88%] text-ink sm:-top-[150px] sm:left-[calc(50%+50px)] sm:size-28 motion-safe:animate-[hammer-swing_1.1s_ease-in-out_infinite]"
            />

            <span aria-hidden className="pointer-events-none absolute top-4.75 left-1/2 sm:top-8.75">
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
