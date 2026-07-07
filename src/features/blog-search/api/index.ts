import { getPosts, type Post } from "@/entities/post";

export function searchPosts(query: string): Promise<Post[]> {
  return getPosts({ query });
}
