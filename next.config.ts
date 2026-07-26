import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    // Бэкенд отдаёт по одному оптимизированному WebP на изображение (без вариантов размеров).
    // Ресайзить нечего — unoptimized убирает srcSet и лоадер, <img> идёт за картинкой напрямую.
    unoptimized: true,
  },
};

export default nextConfig;
