import type { Metadata } from "next";
import { getTags } from "@/entities/tag";
import { BlogPage } from "@/pages/blog";

// Темы и статьи правятся через админку, а на сборке образа бэкенд ещё недоступен.
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ tag: string }>;
  searchParams: Promise<{ query?: string }>;
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const [{ tag: slug }, { query }] = await Promise.all([params, searchParams]);
  const tag = (await getTags()).find((item) => item.slug === slug);

  // Тега нет — страница всё равно отдаст 404, метаданные ей не понадобятся.
  if (!tag) return {};

  return {
    title: `Статьи по теме «${tag.name}» — ППТ.бел`,
    description: `Материалы об утеплении по теме «${tag.name}»: разбор характеристик, расчёты и технология монтажа.`,
    // Поиск внутри темы — не посадочная страница.
    robots: query ? { index: false, follow: true } : undefined,
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const [{ tag }, { query }] = await Promise.all([params, searchParams]);

  return <BlogPage tagSlug={tag} query={query} />;
}
