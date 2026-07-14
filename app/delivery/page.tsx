import type { Metadata } from "next";
import { DeliveryPage } from "@/pages/delivery";

export const metadata: Metadata = {
  title: "Доставка — ППТ.бел",
  description: "Стоимость и сроки доставки стройматериалов по Минску и Беларуси, условия разгрузки и самовывоза со склада ППТ.бел.",
};

export default function Page() {
  return <DeliveryPage />;
}
