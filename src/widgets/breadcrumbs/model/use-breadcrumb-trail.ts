"use client";

import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/shared/config";

export interface BreadcrumbCrumb {
  label: string;
  href: string;
}

/** Ключ со значением null прячет сегмент: так из пути выпадают служебные куски вроде /tema/. */
export function useBreadcrumbTrail(labels?: Record<string, string | null>): BreadcrumbCrumb[] {
  const pathname = usePathname() ?? "";
  const segments = pathname.split("/").filter(Boolean);

  return [
    { label: "Главная", href: "/" },
    ...segments.flatMap((segment, i) => {
      if (labels?.[segment] === null) return [];
      const href = "/" + segments.slice(0, i + 1).join("/");
      const label = labels?.[segment] ?? NAV_LINKS.find((link) => link.href === href)?.label ?? segment;
      return [{ label, href }];
    }),
  ];
}
