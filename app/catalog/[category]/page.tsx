import type { Metadata } from "next";
import { getCategoryBySlug } from "@/entities/category";
import { CatalogCategoryPage } from "@/pages/catalog-category";
import type { CatalogSearchParams } from "@/features/product-filters";
import { truncateForMeta } from "@/shared/lib/utils";

// Товары и категории правятся через админку, а на сборке образа бэкенд ещё недоступен.
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<CatalogSearchParams>;
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const [{ category: slug }, query] = await Promise.all([params, searchParams]);
  // Тот же запрос делает и сама страница — Next склеит их в один за рендер.
  const category = await getCategoryBySlug(slug).catch(() => null);

  // Категории нет — страница всё равно отдаст 404, метаданные ей не понадобятся.
  if (!category) return {};

  // Выдача с фильтрами — не посадочная страница: в индексе от неё только дубли.
  const filtered = Object.keys(query).length > 0;

  return {
    title: `${category.name} — купить в Минске | ППТ.бел`,
    // Описание из админки — сплошной абзац на ~450 знаков, в сниппет идёт только начало.
    description: category.description
      ? truncateForMeta(category.description)
      : `${category.name} со склада в Минске: наличие, цены и доставка по Беларуси.`,
    robots: filtered ? { index: false, follow: true } : undefined,
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const [{ category }, query] = await Promise.all([params, searchParams]);

  return <CatalogCategoryPage slug={category} searchParams={query} />;
}
