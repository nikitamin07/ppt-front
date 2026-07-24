import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ППТ.бел — материалы для строительства и утепления",
    short_name: "ППТ.бел",
    description:
      "Пенопласт, минеральная вата, сухие строительные смеси. В наличии, с доставкой по Беларуси.",
    lang: "ru",
    start_url: "/",
    display: "standalone",
    background_color: "#f2f0ea",
    theme_color: "#ff5a1f",
    icons: [{ src: "/apple-icon", sizes: "180x180", type: "image/png" }],
  };
}
