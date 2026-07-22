import { AboutPage } from "@/pages/about";
import { pageMetadata } from "@/shared/lib/seo";

export const metadata = pageMetadata({
  title: "О компании — ППТ.бел",
  description: "ЧТУП «РешениеСтройДизайн» — поставщик теплоизоляции и стройматериалов по всей Беларуси с 2020 года.",
  path: "/about",
});

export default function Page() {
  return <AboutPage />;
}
