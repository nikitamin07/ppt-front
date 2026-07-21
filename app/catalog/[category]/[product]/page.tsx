import type { Metadata } from "next";
import { getProductMeta } from "@/entities/product";
import { ProductDetailPage } from "@/pages/product-detail";

// Товары правятся через админку, а на сборке образа бэкенд ещё недоступен —
// поэтому рендерим на запрос, а не пререндерим во время build.
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ category: string; product: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, product: productSlug } = await params;
  // Отдельный эндпоинт под метаданные: тут нужны только теги, а не весь товар.
  const meta = await getProductMeta(category, productSlug).catch(() => null);

  // Товара нет — страница всё равно отдаст 404, метаданные ей не понадобятся.
  if (!meta) return {};

  return {
    title: `${meta.name} — купить в Минске | ППТ.бел`,
    // Описание пишут в админке уже под сниппет; пустое — только если его стёрли.
    description: meta.meta_description || `${meta.name} со склада в Минске: наличие, цена, доставка по Беларуси.`,
  };
}

export default async function Page({ params }: PageProps) {
  const { category, product } = await params;

  return <ProductDetailPage categorySlug={category} productSlug={product} />;
}
