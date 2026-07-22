import { PrivacyPage } from "@/pages/privacy";
import { pageMetadata } from "@/shared/lib/seo";

export const metadata = pageMetadata({
  title: "Политика конфиденциальности — ППТ.бел",
  description: "Как ппт.бел собирает, использует и хранит персональные данные, оставленные через сайт.",
  path: "/privacy",
});

export default function Page() {
  return <PrivacyPage />;
}
