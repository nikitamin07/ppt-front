import type { Metadata } from "next";
import { NotFoundPage } from "@/pages/not-found";

export const metadata: Metadata = {
  title: "Страница не найдена — ППТ.бел",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundPage />;
}
