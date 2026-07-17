import { getCategoriesCount } from "@/entities/category";
import { getFeaturedProducts, getProductsCount } from "@/entities/product";
import { getLatestPosts } from "@/entities/post";
import { CatalogGrid } from "@/widgets/catalog-grid";
import { BlogList } from "@/widgets/blog-list";
import { Hero } from "./hero";
import { AboutTeaser } from "./about-teaser";
import { DeliveryTeaser } from "./delivery-teaser";

export async function HomePage() {
  const [featured, posts, productsCount, categoriesCount] = await Promise.all([
    getFeaturedProducts(),
    getLatestPosts(),
    getProductsCount(),
    getCategoriesCount(),
  ]);

  return (
    <>
      <Hero productsCount={productsCount} categoriesCount={categoriesCount} />
      <CatalogGrid products={featured} />
      <AboutTeaser />
      <DeliveryTeaser />
      <BlogList posts={posts} />
    </>
  );
}
