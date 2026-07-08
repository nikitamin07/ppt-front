import Link, { type LinkProps } from "next/link";
import { cn } from "@/shared/lib/utils";

interface AnimatedLinkProps extends LinkProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

/**
 * Ссылка с единой фирменной hover-анимацией: линия снизу дорисовывается слева направо.
 * Цвет текста задаётся через className (по умолчанию — text-ink), сама анимация везде одинаковая.
 */
export function AnimatedLink({ className, children, ...props }: AnimatedLinkProps) {
  return (
    <Link
      {...props}
      className={cn(
        "group/link relative inline-flex w-fit cursor-pointer items-center gap-1.5 py-1 text-sm font-medium text-ink transition-colors duration-200 hover:text-safety",
        className,
      )}
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-safety transition-all duration-300 ease-out group-hover/link:w-full" />
    </Link>
  );
}
