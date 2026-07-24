import type { MetadataRoute } from "next";
import { getCategoryTree } from "@/entities/category";
import { getProducts, getProductsCount } from "@/entities/product";
import { getPosts } from "@/entities/post";
import { getTags } from "@/entities/tag";
import { SITE_URL } from "@/shared/lib/seo";

export const dynamic = "force-dynamic";

const PER_PAGE = 8;

const STATIC_PATHS = [
  "/",
  "/catalog",
  "/poleznaya-informatsiya",
  "/about",
  "/delivery",
  "/contacts",
  "/privacy",
];

async function allProducts() {
  const count = await getProductsCount();
  const pages = Math.ceil(count / PER_PAGE);
  const batches = await Promise.all(
    Array.from({ length: pages }, (_, i) => getProducts({ page: i + 1 })),
  );
  return batches.flat();
}

async function allPosts() {
  const posts = [];
  for (let page = 1; page <= 20; page++) {
    const batch = await getPosts({ page });
    posts.push(...batch);
    if (batch.length < PER_PAGE) break;
  }
  return posts;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, products, posts, tags] = await Promise.all([
    getCategoryTree().catch(() => []),
    allProducts().catch(() => []),
    allPosts().catch(() => []),
    getTags().catch(() => []),
  ]);

  const url = (path: string) => `${SITE_URL}${path}`;

  return [
    ...STATIC_PATHS.map((path) => ({ url: url(path) })),
    
    ...categories.flatMap((root) => [
      { url: url(`/catalog/${root.slug}`) },
      ...(root.children ?? []).map((child) => ({
        url: url(`/catalog/${root.slug}/${child.slug}`),
      })),
    ]),
    
    ...products
      .filter((product) => product.category_path)
      .map((product) => ({ url: url(`/catalog/${product.category_path}/${product.slug}`) })),

    ...posts.map((post) => ({
      url: url(`/poleznaya-informatsiya/${post.slug}`),
      lastModified: post.published_at,
    })),

    ...tags.map((tag) => ({ url: url(`/poleznaya-informatsiya/tema/${tag.slug}`) })),
  ];
}
