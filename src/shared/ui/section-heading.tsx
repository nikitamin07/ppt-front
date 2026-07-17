import { ArrowRightIcon } from "lucide-react";
import { AnimatedLink } from "./animated-link";

interface SectionHeadingProps {
  title: string;
  href: string;
  /** Подпись ссылки: «Смотреть все», «Все статьи». */
  linkLabel: string;
}

/**
 * Шапка блока на главной: заголовок и ссылка на полный список.
 * Ссылка дублируется под блоком — на узком экране в шапке для неё нет места.
 */
export function SectionHeading({ title, href, linkLabel }: SectionHeadingProps) {
  return (
    <div className="flex items-end justify-between gap-4 border-b border-line pb-5">
      <h2 className="font-heading text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>
      <AnimatedLink href={href} className="hidden sm:inline-flex">
        {linkLabel}
        <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover/link:translate-x-1" />
      </AnimatedLink>
    </div>
  );
}

/** Та же ссылка под блоком — видна только там, где шапка её прячет. */
export function SectionHeadingLinkMobile({ href, linkLabel }: Omit<SectionHeadingProps, "title">) {
  return (
    <AnimatedLink href={href} className="mt-6 sm:hidden">
      {linkLabel}
      <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover/link:translate-x-1" />
    </AnimatedLink>
  );
}
