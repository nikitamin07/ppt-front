import type { Metadata } from "next";
import { CatalogPage } from "@/pages/catalog";

export const metadata: Metadata = {
  title: "Каталог — ППТ.бел",
  description: "Пенопласт, XPS, минеральная вата, полистиролбетон, сухие смеси и грунтовки со склада в Минске.",
};

// Категории правятся через админку, а на сборке образа бэкенд ещё недоступен —
// поэтому рендерим на запрос, а не пререндерим во время build.
export const dynamic = "force-dynamic";

export default function Page() {
  return <CatalogPage />;
}
