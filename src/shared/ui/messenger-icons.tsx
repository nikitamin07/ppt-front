import { cn } from "@/shared/lib/utils";
import { CONTACTS } from "@/shared/config";

interface MessengerIconProps {
  className?: string;
}

export function TelegramIcon({ className }: MessengerIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M21 4 3 11.4l6 2.1M21 4l-3.2 16-6.8-5.2M21 4 10.8 13.5v4.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ViberIcon({ className }: MessengerIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 3.5c5 0 8.5 3.2 8.5 8 0 4.4-3.5 8-8.5 8-1 0-2-.15-2.9-.45L5 20l1.1-3.6C4.8 15 4 12.9 4 11.5c0-4.8 3.5-8 8-8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M9 9.3c.3 3 2.5 5.1 5.4 5.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14.4 14.7c.5-.5.9-1 1.2-1.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 9.3c-.05-.6.35-1.2 1-1.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function WhatsappIcon({ className }: MessengerIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 3.5c4.7 0 8.5 3.6 8.5 8 0 4.4-3.8 8-8.5 8-1.4 0-2.7-.3-3.9-.9L4 20l1.4-3.8C4.5 14.9 3.5 13 3.5 11.5c0-4.4 3.8-8 8.5-8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9 9.8c0-.9.7-1.6 1.6-1.6.3 0 .5.2.6.5l.5 1.4c.1.3 0 .6-.2.8l-.6.6c.4 1 1.2 1.8 2.2 2.2l.6-.6c.2-.2.5-.3.8-.2l1.4.5c.3.1.5.3.5.6 0 .9-.7 1.6-1.6 1.6-3 0-5.8-2.8-5.8-5.8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface MessengerLinksProps {
  className?: string;
  /** тон рамки/иконки под подложку: границы и цвет текста (например, border-line text-ink) */
  linkClassName?: string;
}

export function MessengerLinks({ className, linkClassName }: MessengerLinksProps) {
  const linkClass = cn(
    "flex size-10 items-center justify-center border transition-colors hover:border-safety hover:text-safety duration-300",
    linkClassName,
  );

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <a
        href={CONTACTS.telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Написать в Telegram"
        className={linkClass}
      >
        <TelegramIcon className="size-5 duration-300" />
      </a>
      <a href={CONTACTS.viberUrl} target="_blank" aria-label="Написать в Viber" className={linkClass}>
        <ViberIcon className="size-5 duration-300" />
      </a>
    </div>
  );
}
