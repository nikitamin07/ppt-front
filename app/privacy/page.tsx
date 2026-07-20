import type { Metadata } from "next";
import { PrivacyPage } from "@/pages/privacy";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — ППТ.бел",
  description: "Как ппт.бел собирает, использует и хранит персональные данные, оставленные через сайт.",
};

export default function Page() {
  return <PrivacyPage />;
}
