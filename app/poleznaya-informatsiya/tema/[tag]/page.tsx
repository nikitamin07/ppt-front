import type { Metadata } from "next";
import { getTags } from "@/entities/tag";
import { BlogPage } from "@/pages/blog";

// Темы и статьи правятся через админку, а на сборке образа бэкенд ещё недоступен.
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag: slug } = await params;
  const tag = (await getTags()).find((item) => item.slug === slug);

  // Тега нет — страница всё равно отдаст 404, метаданные ей не понадобятся.
  if (!tag) return {};

  return {
    title: `Статьи по теме «${tag.name}» — ППТ.бел`,
    description: `Материалы об утеплении по теме «${tag.name}»: разбор характеристик, расчёты и технология монтажа.`,
  };
}

export default async function Page({ params }: PageProps) {
  const { tag } = await params;

  return <BlogPage tagSlug={tag} />;
}
