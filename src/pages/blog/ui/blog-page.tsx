import { notFound } from "next/navigation";
import { getPosts } from "@/entities/post";
import { getTags } from "@/entities/tag";
import { Breadcrumbs } from "@/widgets/breadcrumbs";
import { PostFeed } from "@/widgets/post-feed";
import { TagFilter } from "./tag-filter";

interface BlogPageProps {
  /** Слаг темы из роута /poleznaya-informatsiya/tema/<tag>. */
  tagSlug?: string;
}

export async function BlogPage({ tagSlug }: BlogPageProps) {
  const [tags, posts] = await Promise.all([getTags(), getPosts({ page: 1, tag: tagSlug })]);

  // Несуществующая тема — это битый адрес, а не пустая выдача.
  const activeTag = tagSlug ? tags.find((tag) => tag.slug === tagSlug) : undefined;
  if (tagSlug && !activeTag) notFound();

  return (
    <>
      <Breadcrumbs labels={activeTag ? { tema: null, [activeTag.slug]: activeTag.name } : undefined} />

      <section className="container">
        <h1 className="font-heading text-4xl font-semibold text-ink sm:text-5xl">
          {activeTag ? `Статьи по теме: ${activeTag.name}` : "Полезная информация"}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Разбираем, чем утеплители отличаются друг от друга, как считать толщину и где какая марка уместна.
          Пишем по опыту склада — без рекламы материалов, которые не работают.
        </p>
      </section>

      <section className="container mt-8 sm:mt-12">
        <div className="grid gap-10 lg:grid-cols-[12rem_1fr] lg:gap-12">
          <TagFilter tags={tags} activeSlug={tagSlug} />
          <PostFeed key={tagSlug ?? ""} initialPosts={posts} tag={tagSlug} />
        </div>
      </section>
    </>
  );
}
