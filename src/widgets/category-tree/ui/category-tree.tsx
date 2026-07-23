"use client";

import { CategoryCard, type CategoryListItem } from "@/entities/category";
import { useStaggerReveal } from "@/shared/lib/react";

interface CategoryTreeProps {
  categories: CategoryListItem[];
}

// Высота карточки ≈ шапка (~130px) + строка на подкатегорию (~32px), то есть шапка ≈ 4 строки.
const HEADER_ROWS = 4;

/**
 * Порядок корневых категорий задаётся в админке, приходит готовым и пересортировке
 * не подлежит. Поэтому колонки читаются газетно: левая — начало списка, правая — хвост.
 * Режем в той точке, где колонки выходят ровнее по высоте.
 */
function splitInOrder(categories: CategoryListItem[]): [CategoryListItem[], CategoryListItem[]] {
  const weights = categories.map((category) => HEADER_ROWS + (category.children?.length ?? 0));
  const total = weights.reduce((sum, weight) => sum + weight, 0);

  let left = 0;
  let bestIndex = categories.length;
  let bestDiff = Infinity;

  // Правую колонку не опустошаем, поэтому последний элемент не рассматриваем как точку реза.
  for (let i = 0; i < weights.length - 1; i++) {
    left += weights[i];
    const diff = Math.abs(total - left - left);
    if (diff < bestDiff) {
      bestDiff = diff;
      bestIndex = i + 1;
    }
  }

  return [categories.slice(0, bestIndex), categories.slice(bestIndex)];
}

export function CategoryTree({ categories }: CategoryTreeProps) {
  const leftRef = useStaggerReveal<HTMLDivElement>({ onMount: true });
  const rightRef = useStaggerReveal<HTMLDivElement>({ onMount: true });
  const [left, right] = splitInOrder(categories);

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
      {/* data-reveal-stagger: каскад играет сразу при монтировании, а блок стоит
          в первом экране — стартовую прозрачность обязан отрисовать сервер. */}
      <div ref={leftRef} data-reveal-stagger className="flex flex-1 flex-col gap-6">
        {left.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      {right.length > 0 && (
        <div ref={rightRef} data-reveal-stagger className="flex flex-1 flex-col gap-6">
          {right.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
}
