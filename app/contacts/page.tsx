import { ContactsPage } from "@/pages/contacts";
import { pageMetadata } from "@/shared/lib/seo";

export const metadata = pageMetadata({
  title: "Контакты — ППТ.бел",
  description: "Адрес склада, телефоны, e-mail и реквизиты ППТ.бел в Минске.",
  path: "/contacts",
});

export default function Page() {
  return <ContactsPage />;
}
