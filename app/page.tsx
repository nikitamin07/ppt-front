import { HomePage } from "@/pages/home";
import { pageMetadata } from "@/shared/lib/seo";

// Популярные товары, статьи и счётчики каталога правятся через админку, а образ фронта
// собирается без доступа к бэкенду — с ISR (revalidate) Next пытается пререндерить
// страницу на билде и падает на fetch. Поэтому рендерим на запрос.
export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "ППТ.бел — материалы для строительства и утепления",
  description:
    "Пенопласт, минеральная вата, сухие строительные смеси. В наличии, с доставкой по Беларуси.",
  path: "/",
});

export default function Page() {
  return <HomePage />;
}
