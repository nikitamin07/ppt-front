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
 * Трапеции выведены из ромба-кнопки: лучи «центр→вершина», зазор 6, внешний радиус 105.
 * Соседние повёрнуты на 90°, поэтому их грани стыкуются сами.
 */
const box = 210; // сторона SVG-бокса трапеции
const anchor = 105; // центр бокса — тот же мировой центр, где сидит кнопка
const TRAPEZOID_VERTICES = [
  [105, 71],
  [105, 0],
  [210, 105],
  [139, 105],
] as const; // P1 P3 P4 P2, см. комментарий выше
// SVG points — без единиц, clip-path требует px:
// два формата одних и тех же точек.
const TRAPEZOID_POINTS = TRAPEZOID_VERTICES.map(([x, y]) => `${x},${y}`).join(" ");
const TRAPEZOID_CLIP = TRAPEZOID_VERTICES.map(([x, y]) => `${x}px ${y}px`).join(", ");
// Центроид трапеции, лежит на её диагонали: один параметр —
// смещение от центра по каждой оси, перекос невозможен.
const ICON_OFFSET = 35;
const ICON_POS = { left: anchor + ICON_OFFSET, top: anchor - ICON_OFFSET };

/**
 * Брендовые цвета — намеренное отступление от «safety — единственный акцент»:
 * сеть узнают по цвету. Иконка повёрнута на -dir, остаётся прямой.
 */
const NETWORKS = [
  // Самолётик плотнее круглых глифов и его масса смещена вправо —
  // бокс поменьше и сдвиг влево для оптического центра.
  { key: "telegram", label: "Telegram", Icon: TelegramIcon, color: "#26A5E4", dir: 0, iconClass: "size-5.5 -ml-0.5" },
  { key: "whatsapp", label: "WhatsApp", Icon: WhatsappIcon, color: "#25D366", dir: 90, iconClass: "size-6" },
  { key: "viber", label: "Viber", Icon: ViberIcon, color: "#7360F2", dir: 180, iconClass: "size-6" },
] as const;

// Одна transition на всё: классы transition-transform и transition-colors
// не складываются, в CSS выживает только один.
const TILE_TRANSITION = "transition-[transform,opacity,background-color,color] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]";
// В покое плитка выглядит как центральная кнопка
// (белая заливка, line-рамка) до наведения.
const TILE_BASE = "group absolute top-1/2 left-1/2 bg-white text-ink outline-none";

/** Кнопка «Поделиться»: раскрывает веер трапеций-ромбов вокруг себя с пружинной анимацией по клику. */
export function ShareButton({ title, className }: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // window нет на сервере — ссылку берём после монтирования,
  // как в order-callback-form.tsx.
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
      {/* Кнопка — квадрат под 45°: ромб, из которого
          выведена геометрия трапеций вокруг. */}
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

      {/* Якорь веера совпадает с кнопкой: translate(-anchor,-anchor)
          центрирует каждую трапецию на ней. */}
      <div className="pointer-events-none absolute inset-0">
        {NETWORKS.map(({ key, label, Icon, color, dir, iconClass }) => (
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
              <Icon className={iconClass} />
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
              transform: `translate(-${anchor}px, -${anchor}px) rotate(270deg) scale(${open ? 1 : 0})`,
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
            style={{ left: ICON_POS.left, top: ICON_POS.top, transform: `translate(-50%, -50%) rotate(-45deg)` }}
          >
            {copied ? <CheckIcon className="size-6" /> : <LinkIcon className="size-6" />}
          </span>
        </button>
      </div>
    </div>
  );
}
