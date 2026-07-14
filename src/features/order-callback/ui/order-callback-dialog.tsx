"use client";

import { useRef } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { OrderCallbackForm } from "./order-callback-form";

interface OrderCallbackDialogProps {
  className?: string;
  triggerLabel?: string;
  onOpenChange?: (open: boolean) => void;
}

export function OrderCallbackDialog({ className, triggerLabel = "Заказать звонок", onOpenChange }: OrderCallbackDialogProps) {
  // Без initialFocus Base UI фокусирует первый tabbable-элемент — кнопку «Закрыть»,
  // и Enter сразу после открытия закрывал попап вместо отправки формы
  const nameInputRef = useRef<HTMLInputElement>(null);

  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger render={<Button className={className} />}>{triggerLabel}</DialogTrigger>
      <DialogContent initialFocus={nameInputRef}>
        <DialogTitle>Заказать звонок</DialogTitle>
        <DialogDescription>
          Оставьте телефон — перезвоним и поможем подобрать материал под ваш объект.
        </DialogDescription>
        <OrderCallbackForm className="mt-6" nameInputRef={nameInputRef} />
      </DialogContent>
    </Dialog>
  );
}
