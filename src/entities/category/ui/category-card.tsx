import type { ReactNode } from "react";
import Link from "next/link";
import { BrickWall, ChevronRightIcon, Layers, PaintBucket, Rows3, Waves } from "lucide-react";
import type { Category } from "../model/types";

const iconProps = { className: "size-6", strokeWidth: 1.5 };

/**
 * Иконка корневой категории по слагу из БД;
 * незнакомому слагу достанется Layers.
 */
const ICONS: Record<string, ReactNode> = {
  penoplast: <Layers {...iconProps} />, // плиты стопкой
  xps: <Rows3 {...iconProps} />, // экструдированные листы
  "minvat-uteplitel": <Waves {...iconProps} />, // волокно
  "polisterolbeton-blocks": <BrickWall {...iconProps} />, // блоки кладкой
  "dry-building-mixes": <PaintBucket {...iconProps} />, // смеси и грунтовки
};

interface CategoryCardProps {
  category: Category;
}

/** Карточка корневой категории со списком её подкатегорий. */
export function CategoryCard({ category }: CategoryCardProps) {
  const children = category.children ?? [];

  return (
    // Ссылки на подкатегории лежат внутри карточки, поэтому обернуть её целиком в <a> нельзя:
    // кликабельность всей карточки даёт растянутый ::after у заголовка.
    <div className="card-lift group relative flex flex-col p-6">
      <div className="flex items-start gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center border border-line text-safety transition-colors group-hover:border-safety">
          {ICONS[category.slug] ?? <Layers {...iconProps} />}
        </span>
        <h2 className="mt-1 font-heading text-lg font-semibold leading-tight text-balance text-ink transition-colors group-hover:text-safety">
          <Link href={`/catalog/${category.slug}`} className="after:absolute after:inset-0">
            {category.name}
          </Link>
        </h2>
      </div>

      {children.length > 0 && (
        <ul className="mt-5 flex flex-col border-t border-line pt-3">
          {children.map((child) => (
            <li key={child.id}>
              <Link
                href={`/catalog/${child.slug}`}
                className="group/link relative z-10 flex items-start gap-2 py-1.5 text-sm text-muted-foreground transition-colors hover:text-safety"
              >
                <ChevronRightIcon className="mt-0.5 size-3.5 shrink-0 text-line transition-colors group-hover/link:text-safety" />
                {child.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
