"use client";

import { PostCard, type PostListItem } from "@/entities/post";
import { useStaggerReveal } from "@/shared/lib/react";
import { SectionHeading, SectionHeadingLinkMobile } from "@/shared/ui/section-heading";

interface BlogListProps {
  posts: PostListItem[];
  title?: string;
  viewAllHref?: string;
}

export function BlogList({ posts, title = "Полезная информация", viewAllHref = "/poleznaya-informatsiya" }: BlogListProps) {
  const gridRef = useStaggerReveal<HTMLDivElement>();

  if (posts.length === 0) return null;

  return (
    <section className="container">
      <SectionHeading title={title} href={viewAllHref} linkLabel="Все статьи" />

      <div ref={gridRef} className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <SectionHeadingLinkMobile href={viewAllHref} linkLabel="Все статьи" />
    </section>
  );
}
