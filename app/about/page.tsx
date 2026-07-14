import type { Metadata } from "next";
import { AboutPage } from "@/pages/about";

export const metadata: Metadata = {
  title: "О компании — ППТ.бел",
  description: "ЧТУП «РешениеСтройДизайн» — поставщик теплоизоляции и стройматериалов по всей Беларуси с 2020 года.",
};

export default function Page() {
  return <AboutPage />;
}
