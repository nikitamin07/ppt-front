import type { MetadataRoute } from "next";
import { SITE_URL } from "@/shared/lib/seo";

export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api", "/livewire"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
