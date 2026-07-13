"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRightIcon, MenuIcon, XIcon } from "lucide-react";
import { AnimatedLink } from "@/shared/ui/animated-link";
import { Logo } from "@/shared/ui/logo";
import { PhoneLink } from "@/shared/ui/phone-link";
import { cn } from "@/shared/lib/utils";
import { Dialog, DialogTrigger, DialogClose, DialogPanel } from "@/shared/ui/dialog";
import { OrderCallbackDialog } from "@/features/order-callback";
import { CONTACTS, NAV_LINKS } from "@/shared/config";
import { MessengerLinks } from "@/shared/ui/messenger-icons";

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
            {CONTACTS.phones.map((phone) => (
              <PhoneLink key={phone.tel} phone={phone} />
            ))}
          </div>
          <span>{CONTACTS.address} &nbsp;·&nbsp; {CONTACTS.workHours}</span>
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
            
            <DialogPanel className={cn("lg:hidden", callbackOpen && "opacity-0 pointer-events-none")}>
              <div className="flex items-center justify-between px-6 py-4">
                <Link href="/" aria-label="ППТ.бел — на главную" onClick={() => setMobileOpen(false)}>
                  <Logo className="text-paper" />
                </Link>
                <DialogClose aria-label="Закрыть меню" className="text-paper">
                  <XIcon className="size-6" />
                </DialogClose>
              </div>
              
              <p className="eyebrow text-base mb-3 px-6">Разделы</p>
              <nav className="flex flex-col px-6">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-center justify-between gap-4 border-b border-white/10 py-3"
                  >
                    <span className="flex items-center gap-3 font-heading text-xl font-semibold tracking-tight">
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
                  {CONTACTS.phones.map((phone) => (
                    <PhoneLink key={phone.tel} phone={phone} />
                  ))}
                </div>
                <MessengerLinks linkClassName="border-white/15 text-paper" />
              </div>
            </DialogPanel>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
