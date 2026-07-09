"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuIcon, PhoneIcon, XIcon } from "lucide-react";
import { AnimatedLink } from "@/shared/ui/animated-link";
import { Logo } from "@/shared/ui/logo";
import { OrderCallbackDialog } from "@/features/order-callback";
import { NAV_LINKS } from "@/shared/config";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="hidden border-b border-line/70 bg-ink text-paper/80 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5 text-xs tabular-nums lg:px-8">
          <div className="flex max-w-sm items-center gap-8">
            <a href="tel:+375296918417" className="flex items-center gap-1.5 transition-colors hover:text-safety">
              <PhoneIcon className="size-3.5" />
              +375 (29) 691-84-17
            </a>
            <a href="tel:+375259264845" className="flex items-center gap-1.5 transition-colors hover:text-safety">
              <PhoneIcon className="size-3.5" />
              +375 (25) 926-48-45
            </a>
          </div>
          <span>г. Минск, ул. Кнорина 50А &nbsp;·&nbsp; Пн–Пт 9:00–19:00</span>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <Link href="/" className="shrink-0 text-ink" aria-label="ППТ.бел — на главную">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <AnimatedLink key={link.href} href={link.href}>
              {link.label}
            </AnimatedLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <OrderCallbackDialog className="hidden sm:inline-flex" />
          <button
            type="button"
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setMobileOpen((v) => !v)}
            className="text-ink lg:hidden"
          >
            {mobileOpen ? <XIcon className="size-6" /> : <MenuIcon className="size-6" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-t border-line bg-paper px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <AnimatedLink
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-base"
              >
                {link.label}
              </AnimatedLink>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-3 sm:hidden">
            <OrderCallbackDialog className="w-full" />
          </div>
        </div>
      ) : null}
    </header>
  );
}
