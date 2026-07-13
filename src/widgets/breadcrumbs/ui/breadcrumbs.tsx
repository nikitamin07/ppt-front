"use client";

import { Fragment } from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb";
import { useBreadcrumbTrail } from "../model/use-breadcrumb-trail";

interface BreadcrumbsProps {
  className?: string;
  labels?: Record<string, string>;
}

export function Breadcrumbs({ className, labels }: BreadcrumbsProps) {
  const trail = useBreadcrumbTrail(labels);

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList className="text-xs">
        {trail.map((item, i) => {
          const isLast = i === trail.length - 1;
          return (
            <Fragment key={item.href}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="font-semibold text-ink">{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    render={<Link href={item.href} />}
                    className="text-muted-foreground/80 hover:text-safety"
                  >
                    {item.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
