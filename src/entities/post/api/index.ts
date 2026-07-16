import { apiGet } from "@/shared/api";
import type { Post } from "../model/types";

interface GetPostsParams {
  page?: number; // постранично по 8; без page — весь список
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

// Блок статей на главной: до 6 последних опубликованных (меньше — сколько есть)
export function getLatestPosts(): Promise<Post[]> {
  return apiGet<Post[]>("/posts/latest");
}
