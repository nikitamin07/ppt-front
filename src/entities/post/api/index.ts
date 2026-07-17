import { apiGet } from "@/shared/api";
import type { Post, PostListItem } from "../model/types";

interface GetPostsParams {
  page?: number; // по 8; без page — первая страница
  tag?: string;
  query?: string;
  [key: string]: string | number | undefined;
}

export function getPosts(params?: GetPostsParams): Promise<PostListItem[]> {
  return apiGet<PostListItem[]>("/posts", params);
}

export function getPostBySlug(slug: string): Promise<Post> {
  return apiGet<Post>(`/posts/${slug}`);
}

// Блок статей на главной: до 6 последних опубликованных (меньше — сколько есть)
export function getLatestPosts(): Promise<PostListItem[]> {
  return apiGet<PostListItem[]>("/posts/latest");
}
