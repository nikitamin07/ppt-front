"use client";

import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/shared/config";

export interface BreadcrumbCrumb {
  label: string;
  href: string;
}

export function useBreadcrumbTrail(labels?: Record<string, string>): BreadcrumbCrumb[] {
  const pathname = usePathname() ?? "";
  const segments = pathname.split("/").filter(Boolean);

  return [
    { label: "Главная", href: "/" },
    ...segments.map((segment, i) => {
      const href = "/" + segments.slice(0, i + 1).join("/");
      const label = labels?.[segment] ?? NAV_LINKS.find((link) => link.href === href)?.label ?? segment;
      return { label, href };
    }),
  ];
}
