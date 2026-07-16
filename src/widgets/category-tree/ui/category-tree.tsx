"use client";

import { CategoryCard, type Category } from "@/entities/category";
import { useStaggerReveal } from "@/shared/lib/react";

interface CategoryTreeProps {
  categories: Category[];
}

export function CategoryTree({ categories }: CategoryTreeProps) {
  const gridRef = useStaggerReveal<HTMLDivElement>();

  return (
    // items-start: у категорий разное число подкатегорий — карточка тянется по содержимому,
    // а не по самой высокой в строке.
    <div ref={gridRef} className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
