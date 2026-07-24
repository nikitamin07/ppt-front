import type { Metadata } from "next";
import { CONTACTS } from "@/shared/config";

export const SITE_URL = process.env.SITE_URL || "http://localhost:3000";

export const SITE_NAME = "ППТ.бел";

const DEFAULT_OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630 };

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  type?: "website" | "article";
  publishedTime?: string;
  robots?: Metadata["robots"];
}

export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  robots,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    robots,
    openGraph: {
      ...(type === "article" ? { type, publishedTime } : { type }),
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "ru_RU",
      images: [image || DEFAULT_OG_IMAGE],
    },
  };
}

/** Абсолютные URL для микроразметки */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "HardwareStore",
    name: SITE_NAME,
    legalName: "ЧП «РешениеСтройДизайн»",
    url: SITE_URL,
    image: absoluteUrl("/opengraph-image"),
    email: CONTACTS.email,
    telephone: CONTACTS.phones.map((phone) => phone.tel),
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Кнорина, 50А",
      addressLocality: "Минск",
      addressCountry: "BY",
    },
    openingHours: "Mo-Fr 09:00-19:00",
    areaServed: "BY",
  };
}
