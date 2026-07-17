import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    // Пассивный лоадер — см. shared/lib/image-loader.ts, почему remotePatterns тут не подходит.
    loader: "custom",
    loaderFile: "./src/shared/lib/image-loader.ts",
  },
};

export default nextConfig;
