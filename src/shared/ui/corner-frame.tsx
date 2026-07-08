import { cn } from "@/shared/lib/utils";

interface CornerFrameProps {
  className?: string;
  /** Скругление меток под контент внутри (по умолчанию — острые, как на чертеже) */
  markClassName?: string;
  children?: React.ReactNode;
}

/**
 * Фирменный элемент: уголки-метки, как на рулетке или чертеже.
 * Оборачивает контент и рисует 4 засечки по углам через ::before/::after заменители (span).
 * Метки помечены [data-corner-mark] — за них можно зацепить анимацию входа (см. widgets/hero).
 */
export function CornerFrame({ className, markClassName, children }: CornerFrameProps) {
  const mark = "absolute size-3.5 border-safety transition-all duration-300 sm:size-4";
  return (
    <div className={cn("relative", className)}>
      <span data-corner-mark className={cn(mark, "top-0 left-0 border-t-2 border-l-2", markClassName)} />
      <span data-corner-mark className={cn(mark, "top-0 right-0 border-t-2 border-r-2", markClassName)} />
      <span data-corner-mark className={cn(mark, "bottom-0 left-0 border-b-2 border-l-2", markClassName)} />
      <span data-corner-mark className={cn(mark, "bottom-0 right-0 border-b-2 border-r-2", markClassName)} />
      {children}
    </div>
  );
}
