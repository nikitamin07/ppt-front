"use client";

import { ArrowRightIcon } from "lucide-react";
import { PostCard, type Post } from "@/entities/post";
import { AnimatedLink } from "@/shared/ui/animated-link";
import { useStaggerReveal } from "@/shared/lib/react";

interface BlogListProps {
  posts: Post[];
  title?: string;
  viewAllHref?: string;
}

export function BlogList({ posts, title = "Полезная информация", viewAllHref = "/poleznaya-informatsiya" }: BlogListProps) {
  const gridRef = useStaggerReveal<HTMLDivElement>();

  if (posts.length === 0) return null;

  return (
    <section className="container">
      <div className="flex items-end justify-between gap-4 border-b border-line pb-5">
        <h2 className="font-heading text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>
        <AnimatedLink href={viewAllHref} className="hidden sm:inline-flex">
          Все статьи
          <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover/link:translate-x-1" />
        </AnimatedLink>
      </div>

      <div ref={gridRef} className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <AnimatedLink href={viewAllHref} className="mt-6 sm:hidden">
        Все статьи
        <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover/link:translate-x-1" />
      </AnimatedLink>
    </section>
  );
}
