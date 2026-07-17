import { HomePage } from "@/pages/home";

// Популярные товары, статьи и счётчики каталога правятся через админку, а образ фронта
// собирается без доступа к бэкенду — с ISR (revalidate) Next пытается пререндерить
// страницу на билде и падает на fetch. Поэтому рендерим на запрос.
export const dynamic = "force-dynamic";

export default function Page() {
  return <HomePage />;
}
