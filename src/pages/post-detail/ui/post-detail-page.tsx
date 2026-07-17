import { notFound } from "next/navigation";
import { getPostBySlug } from "@/entities/post";
import { getTags, TagBadge } from "@/entities/tag";
import { OrderCallbackDialog } from "@/features/order-callback";
import { ApiError, assetUrl } from "@/shared/api";
import { Breadcrumbs } from "@/widgets/breadcrumbs";

interface PostDetailPageProps {
  slug: string;
}

export async function PostDetailPage({ slug }: PostDetailPageProps) {
  const [post, tags] = await Promise.all([
    // getPostBySlug 404-ит и на черновики — по адресу их не отличить от «нет такой статьи».
    getPostBySlug(slug).catch((error: unknown) => {
      if (error instanceof ApiError && error.status === 404) return null;
      // Обрыв сети или 500 — это не «статьи нет»: молча подменять их на 404 нельзя.
      throw error;
    }),
    getTags(),
  ]);

  if (!post) notFound();

  const postTags = tags.filter((tag) => post.tag_ids.includes(tag.id));
  const cover = assetUrl(post.cover_image_url);

  return (
    <>
      <Breadcrumbs labels={{ [post.slug]: post.title }} />

      <section className="container">
        <time className="font-label text-xs tabular-nums text-muted-foreground">
          {new Date(post.published_at).toLocaleDateString("ru-RU")}
        </time>
        <h1 className="mt-2 max-w-3xl font-heading text-3xl font-semibold text-balance text-ink sm:text-4xl">
          {post.title}
        </h1>

        {postTags.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {postTags.map((tag) => (
              <TagBadge key={tag.id} tag={tag} />
            ))}
          </div>
        ) : null}
      </section>

      {cover ? (
        <section className="container">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cover} alt={post.title} className="aspect-[21/9] w-full border border-line object-cover" />
        </section>
      ) : null}

      <section className="container">
        {/* content — доверенный HTML из RichEditor админки, не пользовательский ввод. */}
        <div className="prose-post max-w-3xl" dangerouslySetInnerHTML={{ __html: post.content }} />
      </section>

      <section className="container">
        <div className="flex flex-col items-start gap-4 border border-line bg-card p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h2 className="font-heading text-lg font-semibold text-ink">Остались вопросы по материалу?</h2>
            <p className="mt-1 text-sm text-muted-foreground">Перезвоним и поможем подобрать вариант под ваш объект.</p>
          </div>
          <OrderCallbackDialog className="px-5 py-3" />
        </div>
      </section>
    </>
  );
}
