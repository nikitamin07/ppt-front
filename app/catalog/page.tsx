import type { Metadata } from "next";
import { CatalogPage } from "@/pages/catalog";

export const metadata: Metadata = {
  title: "Каталог — ППТ.бел",
  description:
    "Утеплители со склада в Минске: пенопласт ППТ-15/20/25, XPS, минвата, полистиролбетонные блоки, сухие смеси и грунтовки. Самовывоз и доставка по Беларуси.",
};

// Категории правятся через админку, а на сборке образа бэкенд ещё недоступен —
// поэтому рендерим на запрос, а не пререндерим во время build.
export const dynamic = "force-dynamic";

export default function Page() {
  return <CatalogPage />;
}
