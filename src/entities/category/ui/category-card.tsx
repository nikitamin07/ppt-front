import Link from "next/link";
import type { Category } from "../model/types";

interface CategoryCardProps {
  category: Category;
  imageUrl?: string;
}

export function CategoryCard({ category, imageUrl }: CategoryCardProps) {
  return (
    <Link
      href={`/catalog/${category.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-zinc-100 bg-zinc-50/50 transition-colors hover:border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700"
    >
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt={category.name} className="aspect-video w-full object-cover" />
      ) : null}
      <div className="p-4">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">{category.name}</h3>
        {category.description ? (
          <p className="mt-1 line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">{category.description}</p>
        ) : null}
      </div>
    </Link>
  );
}
