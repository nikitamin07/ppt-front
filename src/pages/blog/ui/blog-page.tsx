import { notFound } from "next/navigation";
import { getPosts } from "@/entities/post";
import { getTags } from "@/entities/tag";
import { SearchForm } from "@/features/site-search";
import { Breadcrumbs } from "@/widgets/breadcrumbs";
import { PostFeed } from "@/widgets/post-feed";
import { TagFilter } from "./tag-filter";

interface BlogPageProps {
  /** Слаг темы из роута /poleznaya-informatsiya/tema/<tag>. */
  tagSlug?: string;
  query?: string;
}

export async function BlogPage({ tagSlug, query }: BlogPageProps) {
  const [tags, posts] = await Promise.all([getTags(), getPosts({ page: 1, tag: tagSlug, query })]);

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

      <section className="container">
        <SearchForm label="Поиск по статьям" placeholder="Поиск по статьям" className="max-w-xl" />

        <div className="mt-10 grid gap-10 lg:grid-cols-[12rem_1fr] lg:gap-12">
          <TagFilter tags={tags} activeSlug={tagSlug} />
          {/* key: смена фильтров монтирует ленту заново с уже готовой первой страницей,
              поэтому клиенту не нужно ни сбрасывать список, ни разруливать гонки ответов. */}
          <PostFeed key={`${tagSlug ?? ""}|${query ?? ""}`} initialPosts={posts} tag={tagSlug} query={query} />
        </div>
      </section>
    </>
  );
}
