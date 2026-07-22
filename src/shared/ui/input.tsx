import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/shared/lib/utils"

function Input({ className, type, onWheel, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      // Колесо над сфокусированным number-полем незаметно меняет значение — снимаем фокус.
      onWheel={(event) => {
        if (type === "number") event.currentTarget.blur();
        onWheel?.(event);
      }}
      data-slot="input"
      className={cn(
        "w-full min-w-0 border border-line bg-paper px-3.5 py-2.5 text-sm text-ink transition-colors outline-none placeholder:text-muted-foreground focus:border-safety disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Input }
