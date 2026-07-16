import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import type { Tag } from "../model/types";

interface TagBadgeProps {
  tag: Tag;
  /** Куда ведёт бейдж. По умолчанию — страница темы. */
  href?: string;
  active?: boolean;
  className?: string;
}

export function TagBadge({ tag, href = `/poleznaya-informatsiya/tema/${tag.slug}`, active, className }: TagBadgeProps) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex items-center border px-2.5 py-1 font-label text-xs font-medium transition-colors",
        active
          ? "border-safety bg-safety text-white"
          : "border-line bg-paper text-ink hover:border-safety hover:text-safety",
        className,
      )}
    >
      {tag.name}
    </Link>
  );
}
