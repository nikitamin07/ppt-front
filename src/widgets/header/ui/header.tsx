"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRightIcon, MenuIcon, PhoneIcon, XIcon } from "lucide-react";
import { AnimatedLink } from "@/shared/ui/animated-link";
import { Logo } from "@/shared/ui/logo";
import { cn } from "@/shared/lib/utils";
import { Dialog, DialogTrigger, DialogClose, DialogPanel } from "@/shared/ui/dialog";
import { OrderCallbackDialog } from "@/features/order-callback";
import { NAV_LINKS } from "@/shared/config";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);

  // Каллбэк-попап вложен в react-дерево nav-панели (общий Dialog из shared/ui), поэтому
  // закрывать панель через setMobileOpen(false) в момент открытия попапа нельзя — размонтирование
  // родителя утащит за собой ещё не отрисовавшийся дочерний диалог. Вместо этого прячем панель
  // визуально, пока попап открыт, и закрываем её по-настоящему только когда попап уже закрылся.
  function handleCallbackOpenChange(open: boolean) {
    setCallbackOpen(open);
    if (!open) setMobileOpen(false);
  }

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
          <Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
            <DialogTrigger
              aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
              className="text-ink lg:hidden"
            >
              {mobileOpen ? <XIcon className="size-6" /> : <MenuIcon className="size-6" />}
            </DialogTrigger>

            <DialogPanel className={cn("lg:hidden transition-opacity", callbackOpen && "opacity-0 pointer-events-none")}>
              <div className="flex items-center justify-between px-6 py-4">
                <Logo className="text-paper" />
                <DialogClose aria-label="Закрыть меню" className="text-paper">
                  <XIcon className="size-6" />
                </DialogClose>
              </div>

              <nav className="flex flex-col px-6">
                <p className="font-label text-xs font-semibold uppercase tracking-[0.2em] text-safety">Разделы</p>
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-center justify-between gap-4 border-b border-white/10 py-5 first:mt-3"
                  >
                    <span className="flex items-center gap-3 font-heading text-3xl font-semibold uppercase tracking-tight">
                      <span className="h-px w-6 shrink-0 bg-safety" />
                      {link.label}
                    </span>
                    <ArrowRightIcon className="size-5 shrink-0 text-paper/40 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-safety" />
                  </Link>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-4 px-6 pb-8 pt-6">
                <OrderCallbackDialog className="w-full" onOpenChange={handleCallbackOpenChange} />
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm tabular-nums text-paper/70">
                  <a href="tel:+375296918417" className="flex items-center gap-1.5 transition-colors hover:text-safety">
                    <PhoneIcon className="size-3.5" />
                    +375 (29) 691-84-17
                  </a>
                  <a href="tel:+375259264845" className="flex items-center gap-1.5 transition-colors hover:text-safety">
                    <PhoneIcon className="size-3.5" />
                    +375 (25) 926-48-45
                  </a>
                </div>
              </div>
            </DialogPanel>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
