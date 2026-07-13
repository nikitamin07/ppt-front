"use client";

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { cn } from "@/shared/lib/utils";
import { OrderCallbackForm } from "./order-callback-form";

interface OrderCallbackDialogProps {
  className?: string;
  triggerLabel?: string;
  onOpenChange?: (open: boolean) => void;
}

export function OrderCallbackDialog({ className, triggerLabel = "Заказать звонок", onOpenChange }: OrderCallbackDialogProps) {
  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger
        className={cn(
          "inline-flex shrink-0 items-center justify-center bg-safety px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-10px_rgba(255,90,31,0.6)] active:translate-y-0 active:scale-[0.97]",
          className,
        )}
      >
        {triggerLabel}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Заказать звонок</DialogTitle>
        <DialogDescription>
          Оставьте телефон — перезвоним и поможем подобрать материал под ваш объект.
        </DialogDescription>
        <OrderCallbackForm className="mt-6" />
      </DialogContent>
    </Dialog>
  );
}
