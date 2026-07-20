import { cn } from "@/shared/lib/utils";

interface LogoProps {
  className?: string;
  iconClassName?: string;
  iconOnly?: boolean;
}

export function Logo({ className, iconClassName, iconOnly }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-current", className)}>
      <svg
        viewBox="0 0 40 34"
        fill="none"
        className={cn("h-8 w-auto shrink-0", iconClassName)}
        aria-hidden={!iconOnly}
        role={iconOnly ? "img" : undefined}
      >
        {iconOnly ? <title>ППТ.бел</title> : null}
        <path
          d="M2 15.5 L20 2 L38 15.5"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <path
          d="M9 15.5 L20 7.2 L31 15.5"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <line x1="5" y1="16.6" x2="35" y2="16.6" stroke="currentColor" strokeWidth="2.2" />
        <line x1="7.5" y1="21.4" x2="15.5" y2="21.4" stroke="currentColor" strokeWidth="2.2" />
        <line x1="24.5" y1="21.4" x2="32.5" y2="21.4" stroke="currentColor" strokeWidth="2.2" />
        <line x1="7.5" y1="26.6" x2="15.5" y2="26.6" stroke="currentColor" strokeWidth="2.2" />
        <line x1="24.5" y1="26.6" x2="32.5" y2="26.6" stroke="currentColor" strokeWidth="2.2" />
        <rect x="16.5" y="18.5" width="7" height="12.5" stroke="currentColor" strokeWidth="2.2" />
        <rect x="18.7" y="23.6" width="1.6" height="1.6" fill="currentColor" />
        <line x1="3" y1="31" x2="37" y2="31" stroke="currentColor" strokeWidth="2.6" strokeLinecap="square" />
      </svg>
      {iconOnly ? null : (
        <span className="font-heading text-lg font-bold uppercase leading-none tracking-tight">
          ППТ<span className="text-safety">.</span>бел
        </span>
      )}
    </span>
  );
}
