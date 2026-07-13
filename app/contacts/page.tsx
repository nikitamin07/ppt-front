import type { Metadata } from "next";
import { ContactsPage } from "@/pages/contacts";

export const metadata: Metadata = {
  title: "Контакты — ППТ.бел",
  description: "Адрес склада, телефоны, e-mail и реквизиты ППТ.бел в Минске.",
};

export default function Page() {
  return <ContactsPage />;
}
