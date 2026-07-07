import { apiGet } from "@/shared/api";
import type { Post } from "../model/types";

interface GetPostsParams {
  page?: number;
  tag?: string;
  query?: string;
  [key: string]: string | number | undefined;
}

export function getPosts(params?: GetPostsParams): Promise<Post[]> {
  return apiGet<Post[]>("/posts", params);
}

export function getPostBySlug(slug: string): Promise<Post> {
  return apiGet<Post>(`/posts/${slug}`);
}
