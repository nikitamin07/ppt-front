import { MapPinIcon, MailIcon } from "lucide-react";
import { Logo } from "@/shared/ui/logo";
import { AnimatedLink } from "@/shared/ui/animated-link";
import { MessengerLinks } from "@/shared/ui/messenger-icons";
import { PhoneLink } from "@/shared/ui/phone-link";
import { OrderCallbackForm } from "@/features/order-callback";
import { CONTACTS, NAV_LINKS } from "@/shared/config";

export function Footer() {
  return (
    <footer className="bg-ink text-paper mt-16 sm:mt-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:py-20 lg:grid-cols-[1.2fr_1fr_1.2fr] lg:gap-8 lg:px-8">
        <div>
          <Logo className="text-paper" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/60">
            Материалы для строительства и утепления: пенопласт, минеральная вата, сухие смеси.
            В наличии, с доставкой по Беларуси.
          </p>
          <h3 className="mt-6 font-heading text-sm font-semibold uppercase tracking-wide text-paper/50">Контакты</h3>
          <ul className="mt-2 flex flex-col gap-2.5 text-sm text-paper/80">
            {CONTACTS.phones.map((phone) => (
              <li key={phone.tel}>
                <PhoneLink phone={phone} className="gap-2" iconClassName="size-4 text-safety" />
              </li>
            ))}
            <li className="flex items-center gap-2">
              <MailIcon className="size-4 text-safety" />
              <a href={`mailto:${CONTACTS.email}`} className="transition-colors hover:text-safety">
                {CONTACTS.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPinIcon className="size-4 shrink-0 text-safety" />
              <span>{CONTACTS.address}, {CONTACTS.workHours}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-paper/50">Разделы</h3>
          <nav className="mt-4 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <AnimatedLink key={link.href} href={link.href} className="text-paper/80">
                {link.label}
              </AnimatedLink>
            ))}
          </nav>
          <h3 className="mt-6 font-heading text-sm font-semibold uppercase tracking-wide text-paper/50">Связаться с нами</h3>
          <MessengerLinks className="mt-3" linkClassName="border-white/15 text-paper" />
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-paper/50">Заказать звонок</h3>
          <p className="mt-4 text-sm text-paper/60">Оставьте телефон — перезвоним и поможем подобрать материал.</p>
          <OrderCallbackForm tone="inverse" className="mt-5" />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-xs tabular-nums text-paper/40 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <span>УНП 791217541</span>
          <span>© {new Date().getFullYear()} ППТ.бел. Все права защищены.</span>
          <span>Разработано <AnimatedLink href="https://t.me/nikbtw07" className="text-paper/40">Nikita Minchukou</AnimatedLink></span>
        </div>
      </div>
    </footer>
  );
}
