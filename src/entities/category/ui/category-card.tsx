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
      className="group flex flex-col overflow-hidden border border-line bg-card transition-all duration-300 hover:-translate-y-1 hover:border-safety hover:shadow-[0_16px_32px_-20px_rgba(27,27,24,0.25)]"
    >
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt={category.name} className="aspect-video w-full object-cover" />
      ) : null}
      <div className="p-4">
        <h3 className="font-heading font-semibold text-ink">{category.name}</h3>
        {category.description ? (
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{category.description}</p>
        ) : null}
      </div>
    </Link>
  );
}
