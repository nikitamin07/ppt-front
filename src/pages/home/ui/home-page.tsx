import { Hero } from "@/widgets/hero";
import { CatalogGrid } from "@/widgets/catalog-grid";
import { BlogList } from "@/widgets/blog-list";
import { AboutTeaser } from "./about-teaser";
import { DeliveryTeaser } from "./delivery-teaser";

export function HomePage() {
  return (
    <>
      <Hero />
      <CatalogGrid />
      <AboutTeaser />
      <DeliveryTeaser />
      <BlogList />
    </>
  );
}
