import type { Metadata } from "next";
import { getPostBySlug } from "@/entities/post";
import { PostDetailPage } from "@/pages/post-detail";
import { assetUrl } from "@/shared/api";
import { pageMetadata } from "@/shared/lib/seo";
import { truncateForMeta } from "@/shared/lib/utils";

// Статьи правятся через админку, а на сборке образа бэкенд ещё недоступен —
// поэтому рендерим на запрос, а не пререндерим во время build.
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ post: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { post: slug } = await params;
  // Тот же запрос делает и сама страница — Next склеит их в один за рендер.
  const post = await getPostBySlug(slug).catch(() => null);

  // Статьи нет — страница всё равно отдаст 404, метаданные ей не понадобятся.
  if (!post) return {};

  return pageMetadata({
    title: `${post.title} — ППТ.бел`,
    description: post.excerpt ? truncateForMeta(post.excerpt) : `Статья на ППТ.бел: ${post.title}`,
    path: `/poleznaya-informatsiya/${post.slug}`,
    // Обложки статей рисуются 1200×630 — ровно формат карточки ссылки.
    image: assetUrl(post.cover_image_url),
    type: "article",
    publishedTime: post.published_at,
  });
}

export default async function Page({ params }: PageProps) {
  const { post } = await params;

  return <PostDetailPage slug={post} />;
}
