import { defineConfig } from "steiger";
import fsd from "@feature-sliced/steiger-plugin";

export default defineConfig([
  ...fsd.configs.recommended,
  {
    // Отключаем строгую проверку Public API для слоя Shared
    files: ["./src/shared/**"],
    rules: {
      "fsd/public-api": "off",
    },
  },
  {
    ignores: [
      "**/.next/**",
      "**/node_modules/**",
      "**/public/**"
    ],
  },
]);