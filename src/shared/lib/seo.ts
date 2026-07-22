import type { Metadata } from "next";

/**
 * Абсолютный адрес сайта — основа canonical и og:url. Читается на сервере в рантайме
 * (метаданные считает только сервер), поэтому не NEXT_PUBLIC_ и не вшивается в бандл.
 */
export const SITE_URL = process.env.SITE_URL || "http://localhost:3000";

export const SITE_NAME = "ППТ.бел";

/**
 * Общая карточка ссылки — маршрут, который рисует app/opengraph-image.tsx.
 * Проставляем её явно: файловое соглашение подхватывается только на той же
 * ветке, а страница со своим openGraph затирает унаследованную картинку.
 */
const DEFAULT_OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630 };

interface PageMetadataOptions {
  title: string;
  description: string;
  /** Путь без query — он же canonical, он же og:url. */
  path: string;
  /** Своя картинка страницы; без неё идёт общая карточка сайта. */
  image?: string | null;
  /** article — только для статей блога. */
  type?: "website" | "article";
  /** ISO-дата публикации статьи. */
  publishedTime?: string;
  robots?: Metadata["robots"];
}

/**
 * Единая обвязка страницы: title/description + canonical + OpenGraph.
 * Twitter-теги не пишем: Telegram, Viber и WhatsApp (все каналы шаринга на сайте)
 * читают OpenGraph, а X подставляет большую карточку из og:image сам.
 */
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
