import Image from "next/image";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/entities/post";
import { getTags, TagBadge } from "@/entities/tag";
import { OrderCallbackDialog } from "@/features/order-callback";
import { ShareButton } from "@/features/share-post";
import { ApiError, assetUrl, NO_IMAGE_SRC } from "@/shared/api";
import { Breadcrumbs } from "@/widgets/breadcrumbs";

interface PostDetailPageProps {
  slug: string;
}

export async function PostDetailPage({ slug }: PostDetailPageProps) {
  const [post, tags] = await Promise.all([
    // getPostBySlug отдает 404 на черновики
    getPostBySlug(slug).catch((error: unknown) => {
      if (error instanceof ApiError && error.status === 404) return null;
      // Обрыв сети или 500
      throw error;
    }),
    getTags(),
  ]);

  if (!post) notFound();

  const postTags = tags.filter((tag) => post.tag_ids.includes(tag.id));
  const cover = assetUrl(post.cover_image_url) ?? NO_IMAGE_SRC;

  return (
    <>
      <Breadcrumbs labels={{ [post.slug]: post.title }} />
      <div className="post-page-wrapper">
        <section className="container">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-12 sm:justify-between">
            <h1 className="max-w-4xl font-heading text-3xl font-semibold text-balance text-ink sm:text-4xl">
              {post.title}
            </h1>
            <time className="font-label text-xs tabular-nums text-muted-foreground">
                {new Date(post.published_at).toLocaleDateString("ru-RU")}
            </time>
          </div>
          {postTags.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {postTags.map((tag) => (
                <TagBadge key={tag.id} tag={tag} />
              ))}
            </div>
          ) : null}
        </section>

        <section className="container mt-5">
          <div className="relative aspect-20/9 w-full overflow-hidden border border-line">
            <Image src={cover} alt={post.title} fill sizes="(min-width: 1024px) 768px, 100vw" className="object-cover" priority />
          </div>
        </section>

        <section className="container">
          {/* content — доверенный HTML из RichEditor админки, можем использовать dangerouslySetInnerHTML*/}
          <div className="prose-post max-w-3xl" dangerouslySetInnerHTML={{ __html: post.content }} />
        </section>

        <section className="container">
          <div className="flex flex-col gap-24 pt-10 pb-16 sm:pb-10 md:flex-row items-center sm:justify-between">
            <p className="font-heading text-lg font-semibold text-ink">Поделитесь публикацией с коллегами и друзьями в Telegram, Viber, WhatsApp или скопировав ссылку.</p>
            <ShareButton title={post.title} className="md:mr-20"/>
          </div>
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
      </div>
    </>
  );
}
