import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  categoryPath,
  getCategoryMeta,
  getCategoryTrail,
  type CategoryListItem,
} from "@/entities/category";
import { getProductMeta } from "@/entities/product";
import { CatalogCategoryPage } from "@/pages/catalog-category";
import { ProductDetailPage } from "@/pages/product-detail";
import type { CatalogSearchParams } from "@/features/product-filters";

// Товары и категории правятся через админку, а на сборке образа бэкенд ещё недоступен.
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<CatalogSearchParams>;
}

type Resolved =
  | { kind: "category"; trail: CategoryListItem[] }
  | { kind: "product"; trail: CategoryListItem[]; productSlug: string };

/**
 * Категория и товар живут на одной глубине пути, поэтому сегменты разбирает дерево:
 * последний сегмент — либо сама категория, либо товар в категории из предыдущего.
 */
async function resolve(segments: string[]): Promise<Resolved | null> {
  // Глубже трёх сегментов в каталоге нет: корень / подкатегория / товар.
  if (segments.length === 0 || segments.length > 3) return null;

  const last = segments[segments.length - 1];
  const categoryTrail = await getCategoryTrail(last);

  // Категория обязана стоять по своему полному пути: «/catalog/ppt» без родителя — не адрес.
  if (categoryTrail.length > 0) {
    return segments.join("/") === categoryPath(categoryTrail) ? { kind: "category", trail: categoryTrail } : null;
  }

  if (segments.length < 2) return null;

  const trail = await getCategoryTrail(segments[segments.length - 2]);
  if (trail.length === 0 || segments.slice(0, -1).join("/") !== categoryPath(trail)) return null;

  return { kind: "product", trail, productSlug: last };
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const resolved = await resolve(slug);

  // Страница всё равно отдаст 404 — метаданные ей не понадобятся.
  if (!resolved) return {};

  // Эндпоинты товара и категории ждут слаг прямой категории — это хвост цепочки.
  const directSlug = resolved.trail[resolved.trail.length - 1].slug;

  if (resolved.kind === "product") {
    // Отдельный эндпоинт под метаданные: тут нужны только теги, а не весь товар.
    const meta = await getProductMeta(directSlug, resolved.productSlug).catch(() => null);
    if (!meta) return {};

    return {
      title: `${meta.name} — купить в Минске | ППТ.бел`,
      // Описание пишут в админке уже под сниппет; пустое — только если его стёрли.
      description: meta.meta_description || `${meta.name} со склада в Минске: наличие, цена, доставка по Беларуси.`,
    };
  }

  const meta = await getCategoryMeta(directSlug).catch(() => null);
  if (!meta) return {};

  return {
    title: `${meta.name} — купить в Минске | ППТ.бел`,
    description: meta.meta_description || `${meta.name} со склада в Минске: наличие, цены и доставка по Беларуси.`,
    // Выдача с фильтрами — не посадочная страница: в индексе от неё только дубли.
    robots: Object.keys(query).length > 0 ? { index: false, follow: true } : undefined,
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const resolved = await resolve(slug);

  if (!resolved) notFound();

  return resolved.kind === "category" ? (
    <CatalogCategoryPage trail={resolved.trail} searchParams={query} />
  ) : (
    <ProductDetailPage trail={resolved.trail} productSlug={resolved.productSlug} />
  );
}
