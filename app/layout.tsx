import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "@/app/styles/globals.css";
import { cn } from "@/shared/lib/utils";
import { SITE_NAME, SITE_URL } from "@/shared/lib/seo";
import { TrackVisit } from "@/shared/lib/react";
import { CustomCursor } from "@/shared/ui/custom-cursor";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";

const inter = Inter({
  subsets: ["latin-ext", "cyrillic-ext"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin-ext", "cyrillic-ext"],
  weight: ["500", "600"],
  variable: "--font-oswald",
  display: "swap",
});

const title = "ППТ.бел — материалы для строительства и утепления";
const description =
  "Пенопласт, минеральная вата, сухие строительные смеси. В наличии, с доставкой по Беларуси.";

// canonical и og:url тут не задаём: они бы унаследовались страницами, которые их не
// переопределили, и объявили бы каждую такую страницу копией главной.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  openGraph: { type: "website", title, description, siteName: SITE_NAME, locale: "ru_RU" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={cn("h-full", "antialiased", inter.variable, oswald.variable)}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <TrackVisit />
        <CustomCursor />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
