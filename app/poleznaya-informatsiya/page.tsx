import { BlogPage } from "@/pages/blog";
import { pageMetadata } from "@/shared/lib/seo";

// Статьи правятся через админку, а на сборке образа бэкенд ещё недоступен —
// поэтому рендерим на запрос, а не пререндерим во время build.
export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "Полезная информация — ППТ.бел",
  description: "Статьи об утеплении: выбор пенопласта и XPS, расчёт толщины, монтаж фасада.",
  path: "/poleznaya-informatsiya",
});

export default function Page() {
  return <BlogPage />;
}
