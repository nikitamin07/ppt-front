"use client";

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { OrderCallbackForm } from "./order-callback-form";

interface OrderCallbackDialogProps {
  className?: string;
  triggerLabel?: string;
  onOpenChange?: (open: boolean) => void;
}

export function OrderCallbackDialog({ className, triggerLabel = "Заказать звонок", onOpenChange }: OrderCallbackDialogProps) {
  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger render={<Button className={className} />}>{triggerLabel}</DialogTrigger>
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
