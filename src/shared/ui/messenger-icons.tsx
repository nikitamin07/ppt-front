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
