import Link from "next/link";
import type { Tag } from "../model/types";

interface TagBadgeProps {
  tag: Tag;
}

export function TagBadge({ tag }: TagBadgeProps) {
  return (
    <Link
      href={`/blog?tag=${tag.slug}`}
      className="inline-flex items-center border border-line bg-paper px-2.5 py-1 font-label text-xs font-medium text-ink transition-colors hover:border-safety hover:text-safety"
    >
      {tag.name}
    </Link>
  );
}
