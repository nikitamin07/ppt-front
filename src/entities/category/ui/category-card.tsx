import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRightIcon, BrickWall, ChevronRightIcon, Layers, PaintBucket, Rows3, Waves } from "lucide-react";
import type { CategoryListItem } from "../model/types";

const iconProps = { className: "size-6", strokeWidth: 1.5 };

const ICONS: Record<string, ReactNode> = {
  "penoplast": <Layers {...iconProps} />, // плиты стопкой
  "xps": <Rows3 {...iconProps} />, // экструдированные листы
  "minvat-uteplitel": <Waves {...iconProps} />, // волокно
  "polisterolbeton-blocks": <BrickWall {...iconProps} />, // блоки кладкой
  "dry-building-mixes": <PaintBucket {...iconProps} />, // смеси и грунтовки
};

interface CategoryCardProps {
  category: CategoryListItem;
}

/**
 * Карточка корневой категории со списком её подкатегорий.
 * Две независимые зоны наведения: шапка ведёт в категорию целиком, строки — в подкатегории.
 * Ховера на всю карточку нет намеренно — иначе не видно, что именно откроется по клику.
 */
export function CategoryCard({ category }: CategoryCardProps) {
  const children = category.children ?? [];

  return (
    <div className="border border-line bg-card">
      <Link
        href={`/catalog/${category.slug}`}
        className="group/head flex items-center gap-4 border-b border-line px-6 py-5 transition-colors hover:bg-ink focus-visible:bg-ink focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-safety"
      >
        {/* Рамка остаётся цвета линии: на залитой шапке читается как светлый чертёжный контур. */}
        <span className="flex size-12 shrink-0 items-center justify-center border border-line text-safety">
          {ICONS[category.slug] ?? <Layers {...iconProps} />}
        </span>

        <h2 className="font-heading text-lg font-semibold leading-tight text-balance text-ink transition-colors group-hover/head:text-paper group-focus-visible/head:text-paper">
          {category.name}
        </h2>

        <ArrowRightIcon className="ml-auto size-5 shrink-0 text-muted-foreground transition-all group-hover/head:translate-x-1 group-hover/head:text-safety group-focus-visible/head:translate-x-1 group-focus-visible/head:text-safety" />
      </Link>

      {children.length > 0 && (
        <ul className="flex flex-col py-2">
          {children.map((child) => (
            <li key={child.id}>
              <Link
                href={`/catalog/${child.slug}`}
                className="group/link flex items-start gap-2 px-6 py-2 text-sm text-muted-foreground transition-colors hover:bg-ink/4 hover:text-safety focus-visible:bg-ink/4 focus-visible:text-safety focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-safety"
              >
                <ChevronRightIcon className="mt-0.5 size-3.5 shrink-0 text-muted-foreground transition-colors group-hover/link:text-safety group-focus-visible/link:text-safety" />
                {child.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
