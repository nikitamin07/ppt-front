import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "@/app/styles/globals.css";
import { cn } from "@/shared/lib/utils";
import CustomCursor from "@/shared/ui/CustomCursor";
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

export const metadata: Metadata = {
  title: "ППТ.бел — материалы для строительства и утепления",
  description:
    "Пенопласт, минеральная вата, сухие строительные смеси. В наличии, с доставкой по Беларуси.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={cn("h-full", "antialiased", inter.variable, oswald.variable)}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <CustomCursor />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
