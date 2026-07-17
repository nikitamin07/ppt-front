import type { Metadata } from "next";
import { getProductBySlug } from "@/entities/product";
import { ProductDetailPage } from "@/pages/product-detail";
import { truncateForMeta } from "@/shared/lib/utils";

// Товары правятся через админку, а на сборке образа бэкенд ещё недоступен —
// поэтому рендерим на запрос, а не пререндерим во время build.
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ category: string; product: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, product: productSlug } = await params;
  // Тот же запрос делает и сама страница — Next склеит их в один за рендер.
  const product = await getProductBySlug(category, productSlug).catch(() => null);

  // Товара нет — страница всё равно отдаст 404, метаданные ей не понадобятся.
  if (!product) return {};

  return {
    title: `${product.name} — купить в Минске | ППТ.бел`,
    description: product.description
      ? truncateForMeta(product.description)
      : `${product.name} со склада в Минске: наличие, цена, доставка по Беларуси.`,
  };
}

export default async function Page({ params }: PageProps) {
  const { category, product } = await params;

  return <ProductDetailPage categorySlug={category} productSlug={product} />;
}
