import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-all duration-200 ease-out outline-none select-none hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        safety: "bg-safety text-white hover:shadow-[0_10px_24px_-10px_rgba(255,90,31,0.6)]",
        ink: "bg-ink text-paper hover:shadow-[0_10px_24px_-10px_rgba(27,27,24,0.5)]",
      },
    },
    defaultVariants: {
      variant: "safety",
    },
  }
)

function Button({
  className,
  variant = "safety",
  nativeButton,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      // render={<Link/>} и т.п. рендерит не <button> — Base UI требует nativeButton=false;
      // при рендере нативного <button> в render оставьте nativeButton явно
      nativeButton={nativeButton ?? !props.render}
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
