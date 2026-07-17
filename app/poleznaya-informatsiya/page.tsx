import type { Metadata } from "next";
import { BlogPage } from "@/pages/blog";

// Статьи правятся через админку, а на сборке образа бэкенд ещё недоступен —
// поэтому рендерим на запрос, а не пререндерим во время build.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Полезная информация — ППТ.бел",
  description: "Статьи об утеплении: выбор пенопласта и XPS, расчёт толщины, монтаж фасада.",
};

export default function Page() {
  return <BlogPage />;
}
