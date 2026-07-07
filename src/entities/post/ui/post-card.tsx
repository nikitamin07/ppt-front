import Link from "next/link";
import type { Post } from "../model/types";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-zinc-100 bg-zinc-50/50 transition-colors hover:border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700"
    >
      {post.cover_image_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.cover_image_url} alt={post.title} className="aspect-video w-full object-cover" />
      ) : null}
      <div className="p-4">
        <time className="text-xs text-zinc-500 dark:text-zinc-400">
          {new Date(post.published_at).toLocaleDateString("ru-RU")}
        </time>
        <h3 className="mt-1 font-semibold text-zinc-900 dark:text-zinc-50">{post.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">{post.excerpt}</p>
      </div>
    </Link>
  );
}
