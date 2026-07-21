import type { Metadata } from "next";
import { getCategoryMeta } from "@/entities/category";
import { CatalogCategoryPage } from "@/pages/catalog-category";
import type { CatalogSearchParams } from "@/features/product-filters";

// Товары и категории правятся через админку, а на сборке образа бэкенд ещё недоступен.
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<CatalogSearchParams>;
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const [{ category: slug }, query] = await Promise.all([params, searchParams]);
  // Отдельный эндпоинт под метаданные: тут нужны только теги, а не вся категория.
  const meta = await getCategoryMeta(slug).catch(() => null);

  // Категории нет — страница всё равно отдаст 404, метаданные ей не понадобятся.
  if (!meta) return {};

  // Выдача с фильтрами — не посадочная страница: в индексе от неё только дубли.
  const filtered = Object.keys(query).length > 0;

  return {
    title: `${meta.name} — купить в Минске | ППТ.бел`,
    // Описание пишут в админке уже под сниппет; пустое — только если его стёрли.
    description: meta.meta_description || `${meta.name} со склада в Минске: наличие, цены и доставка по Беларуси.`,
    robots: filtered ? { index: false, follow: true } : undefined,
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const [{ category }, query] = await Promise.all([params, searchParams]);

  return <CatalogCategoryPage slug={category} searchParams={query} />;
}
