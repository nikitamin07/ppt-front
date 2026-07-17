"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, LinkIcon, Share2Icon, XIcon } from "lucide-react";
import { TelegramIcon, ViberIcon, WhatsappIcon } from "@/shared/ui/messenger-icons";
import { cn } from "@/shared/lib/utils";
import { buildShareLinks } from "../lib/share-links";

interface ShareButtonProps {
  title: string;
  className?: string;
}

/**
 * Геометрия трапеции — не подогнана на глаз, а выведена из самой центральной кнопки.
 * Кнопка — квадрат 40px, повёрнутый на 45°, так что её вершины смотрят строго вверх/вправо/
 * вниз/влево на расстоянии r = 20√2 ≈ 28 от центра (половина диагонали квадрата), а рёбра —
 * ровно по диагоналям (NE/SE/SW/NW). Каждая трапеция сидит на одном из этих рёбер:
 *  - верхняя грань (P1–P2) параллельна этому ребру и отстоит от него на зазор g = 6 —
 *    обе её точки лежат на тех же лучах «центр→вершина», просто чуть дальше (r+g), поэтому
 *    параллельность получается сама, без подгонки;
 *  - боковые грани (P1–P3 и P2–P4) идут вдоль тех же лучей «центр→вершина» дальше наружу —
 *    в буквальном смысле линии, исходящие из вершин центрального ромба;
 *  - нижняя грань (P3–P4) на радиусе R = 90 — тем самым это ровно ребро большого внешнего
 *    ромба (те же лучи, максимальное удаление), а не просто «какая-то дальняя грань».
 * Четыре трапеции повёрнуты друг относительно друга на 90° (dir), поэтому у соседних общий
 * луч-вершина — и боковые грани соседей автоматически совпадают в одну линию: внешний контур
 * получается ровным ромбом без ручной подгонки стыков. Точки исходно выведены в координатах
 * с центром в (0,0) и сдвинуты на (+90,+90), чтобы уместиться в SVG-бокс 0..180 (см. box).
 * R = 105 (а не 60, как в первой версии) — так на трапеции видно иконки: сама кнопка (r=28)
 * не менялась, увеличилась только «рама» вокруг неё.
 */
const box = 210; // сторона SVG-бокса трапеции
const anchor = 105; // центр бокса — тот же мировой центр, где сидит кнопка
const TRAPEZOID_VERTICES = [
  [105, 71],
  [105, 0],
  [210, 105],
  [139, 105],
] as const; // P1 P3 P4 P2, см. комментарий выше
// SVG <polygon points> не принимает единицы (числа = user units), а CSS clip-path: polygon()
// без единиц невалиден и молча игнорируется целиком — отсюда два разных формата одних точек.
const TRAPEZOID_POINTS = TRAPEZOID_VERTICES.map(([x, y]) => `${x},${y}`).join(" ");
const TRAPEZOID_CLIP = TRAPEZOID_VERTICES.map(([x, y]) => `${x}px ${y}px`).join(", ");
// Не радиальная середина (та ближе к острию — трапеция шире у внешнего края), а настоящий
// центроид четырёхугольника (формула площади многоугольника по вершинам выше) — там иконка
// визуально по центру видимой фигуры, а не у самого края.
const ICON_POS = { left: 143, top: 67 };

/**
 * Плитки заведены брендовыми цветами намеренно — единственное отступление от правила
 * «safety — единственный акцент» в этом проекте: сеть узнают по фирменному цвету, то же
 * соображение, что и с логотипами производителей. dir поворачивает трапецию целиком (90° друг
 * от друга — она сидит на диагональных рёбрах NE/SE/SW/NW ромба-кнопки), иконка внутри
 * повёрнута на -dir, чтобы остаться прямой.
 */
const NETWORKS = [
  { key: "telegram", label: "Telegram", Icon: TelegramIcon, color: "#26A5E4", dir: 0 },
  { key: "whatsapp", label: "WhatsApp", Icon: WhatsappIcon, color: "#25D366", dir: 90 },
  { key: "viber", label: "Viber", Icon: ViberIcon, color: "#7360F2", dir: 180 },
] as const;

const COPY_LINK = { dir: 270 } as const;

/**
 * ОДНА transition на всё (полёт из центра + подсветка при наведении), а не отдельные
 * transition-transform/transition-colors. Обе — это Tailwind-классы, которые целиком задают
 * transition-property (+ duration/timing) одним блоком, а не складываются: у них общая
 * CSS-специфичность, и когда оба класса висят на одном элементе, в итоговом CSS побеждает
 * только ОДИН из них (later-in-stylesheet), второй теряет transition-property целиком.
 * Explicit transition-[...] с одним списком свойств — единственная transition-property на
 * элементе, конфликтовать не с чем.
 */
const TILE_TRANSITION = "transition-[transform,opacity,background-color,color] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]";
// Заливка/рамка в покое — точно как у центральной кнопки (белая заливка, line-рамка):
// дочерние элементы не должны отличаться от неё, пока на них не навели курсор.
const TILE_BASE = "group absolute top-1/2 left-1/2 bg-white text-ink outline-none";

/** Кнопка «Поделиться»: раскрывает веер трапеций-ромбов вокруг себя с пружинной анимацией по клику. */
export function ShareButton({ title, className }: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // window недоступен на сервере, поэтому ссылку берём после монтирования — та же причина,
  // что у order-callback-form.tsx (window.location.href в обработчике формы). Здесь это разовое
  // чтение из окружения на маунте, а не побочный эффект от рендера, поэтому эффект уместен.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUrl(window.location.href);
  }, []);

  // Клик вовне и Escape закрывают панель — обычное поведение всплывающего раскрытия.
  useEffect(() => {
    if (!open) return;

    function handlePointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  async function handleCopyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  const links = buildShareLinks({ url, title });

  return (
    <div ref={rootRef} className={cn("relative inline-block size-10", className)}>
      {/* Сама кнопка — квадрат, повёрнутый на 45°: тот же ромб, из вершин и рёбер которого
          выведена геометрия трапеций вокруг. Белая заливка, при наведении — темнее (paper). */}
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Скрыть варианты «Поделиться»" : "Поделиться статьёй"}
        onClick={() => setOpen((v) => !v)}
        style={{ transform: "rotate(45deg)" }}
        className="relative z-10 flex size-10 items-center justify-center border border-line bg-white text-ink outline-none transition-colors duration-150 ease-out hover:bg-paper focus-visible:border-safety"
      >
        <span style={{ transform: "rotate(-45deg)" }} className="flex items-center justify-center">
          {open ? <XIcon className="size-5" /> : <Share2Icon className="size-5" />}
        </span>
      </button>

      {/* Якорь для веера: точно совпадает с рамкой кнопки, поэтому translate(-anchor,-anchor) у
          каждой трапеции центрируется на ней (transformOrigin — центр её собственного бокса
          box×box, который после translate как раз садится в этот якорь). */}
      <div className="pointer-events-none absolute inset-0">
        {NETWORKS.map(({ key, label, Icon, color, dir }) => (
          <a
            key={key}
            href={links[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Поделиться в ${label}`}
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
            style={
              {
                "--brand": color,
                width: box,
                height: box,
                transformOrigin: `${anchor}px ${anchor}px`,
                transform: `translate(-${anchor}px, -${anchor}px) rotate(${dir}deg) scale(${open ? 1 : 0})`,
                clipPath: `polygon(${TRAPEZOID_CLIP})`,
              } as React.CSSProperties
            }
            className={cn(
              TILE_BASE,
              TILE_TRANSITION,
              "hover:bg-(--brand) hover:text-white",
              open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <svg viewBox={`0 0 ${box} ${box}`} width={box} height={box} className="pointer-events-none absolute inset-0">
              <polygon points={TRAPEZOID_POINTS} fill="none" strokeWidth={1.5} className="stroke-line transition-colors duration-300 group-hover:stroke-white" />
            </svg>
            <span
              className="absolute flex items-center justify-center"
              style={{ left: ICON_POS.left, top: ICON_POS.top, transform: `translate(-50%, -50%) rotate(${-dir}deg)` }}
            >
              <Icon className="size-4" />
            </span>
          </a>
        ))}

        <button
          type="button"
          aria-label={copied ? "Ссылка скопирована" : "Скопировать ссылку"}
          title={copied ? "Ссылка скопирована" : "Скопировать ссылку"}
          tabIndex={open ? 0 : -1}
          onClick={handleCopyLink}
          style={
            {
              width: box,
              height: box,
              transformOrigin: `${anchor}px ${anchor}px`,
              transform: `translate(-${anchor}px, -${anchor}px) rotate(${COPY_LINK.dir}deg) scale(${open ? 1 : 0})`,
              clipPath: `polygon(${TRAPEZOID_CLIP})`,
            } as React.CSSProperties
          }
          className={cn(
            TILE_BASE,
            TILE_TRANSITION,
            copied ? "bg-safety text-white" : "hover:bg-safety hover:text-white",
            open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <svg viewBox={`0 0 ${box} ${box}`} width={box} height={box} className="pointer-events-none absolute inset-0">
            <polygon
              points={TRAPEZOID_POINTS}
              fill="none"
              strokeWidth={1.5}
              className={cn("transition-colors duration-300", copied ? "stroke-white" : "stroke-line group-hover:stroke-white")}
            />
          </svg>
          <span
            className="absolute flex items-center justify-center"
            style={{ left: ICON_POS.left, top: ICON_POS.top, transform: `translate(-50%, -50%) rotate(${-COPY_LINK.dir}deg)` }}
          >
            {copied ? <CheckIcon className="size-4" /> : <LinkIcon className="size-4" />}
          </span>
        </button>
      </div>
    </div>
  );
}
