import Link from "next/link";
import type { Post } from "../model/types";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="card-lift group flex flex-col overflow-hidden"
    >
      {post.cover_image_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.cover_image_url} alt={post.title} className="aspect-video w-full object-cover" />
      ) : null}
      <div className="p-4">
        <time className="font-label text-xs tabular-nums text-muted-foreground">
          {new Date(post.published_at).toLocaleDateString("ru-RU")}
        </time>
        <h3 className="mt-1 font-heading font-semibold text-ink">{post.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
      </div>
    </Link>
  );
}
