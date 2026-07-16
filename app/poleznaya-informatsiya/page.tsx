import type { Metadata } from "next";
import { BlogPage } from "@/pages/blog";

// Статьи правятся через админку, а на сборке образа бэкенд ещё недоступен —
// поэтому рендерим на запрос, а не пререндерим во время build.
export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ query?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { query } = await searchParams;

  return {
    title: "Полезная информация — ППТ.бел",
    description: "Статьи об утеплении: выбор пенопласта и XPS, расчёт толщины, монтаж фасада.",
    // Выдача поиска — не посадочная страница: в индексе от неё только дубли.
    robots: query ? { index: false, follow: true } : undefined,
  };
}

export default async function Page({ searchParams }: PageProps) {
  const { query } = await searchParams;

  return <BlogPage query={query} />;
}
