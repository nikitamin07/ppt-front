import Image from "next/image";
import Link from "next/link";
import { assetUrl, NO_IMAGE_SRC } from "@/shared/api";
import type { PostListItem } from "../model/types";

interface PostCardProps {
  /** Списочная статья: карточке нужны заголовок, дата и excerpt, но не content. */
  post: PostListItem;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/poleznaya-informatsiya/${post.slug}`}
      className="card-lift group flex flex-col overflow-hidden"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={assetUrl(post.cover_image_url) ?? NO_IMAGE_SRC}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
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
