import { DeliveryPage } from "@/pages/delivery";
import { pageMetadata } from "@/shared/lib/seo";

export const metadata = pageMetadata({
  title: "Доставка — ППТ.бел",
  description:
    "Стоимость и сроки доставки стройматериалов по Минску и Беларуси, условия разгрузки и самовывоза со склада ППТ.бел.",
  path: "/delivery",
});

export default function Page() {
  return <DeliveryPage />;
}
