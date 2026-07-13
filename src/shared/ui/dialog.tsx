"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal {...props} />;
}

function DialogBackdrop({ className, ...props }: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      className={cn(
        "fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm transition-opacity duration-200",
        "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
        className,
      )}
      {...props}
    />
  );
}

function DialogContent({ className, children, showClose = true, ...props }: DialogPrimitive.Popup.Props & { showClose?: boolean }) {
  return (
    <DialogPortal>
      <DialogBackdrop />
      <DialogPrimitive.Popup
        className={cn(
          "fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2",
          "border border-line bg-card p-6 sm:p-8 shadow-[0_24px_60px_-20px_rgba(27,27,24,0.35)]",
          "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          "data-[starting-style]:opacity-0 data-[starting-style]:scale-90",
          "data-[ending-style]:opacity-0 data-[ending-style]:scale-90 data-[ending-style]:duration-150 data-[ending-style]:ease-out",
          className,
        )}
        {...props}
      >
        {showClose ? (
          <DialogClose
            aria-label="Закрыть"
            className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-ink"
          >
            <XIcon className="size-5" />
          </DialogClose>
        ) : null}
        {children}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
}

function DialogPanel({ className, children, ...props }: DialogPrimitive.Popup.Props) {
  return (
    <DialogPortal>
      <DialogBackdrop />
      <DialogPrimitive.Popup
        className={cn(
          "fixed inset-0 z-50 flex flex-col overflow-y-auto bg-ink text-paper",
          "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          "data-[starting-style]:opacity-0 data-[starting-style]:-translate-y-6",
          "data-[ending-style]:opacity-0 data-[ending-style]:-translate-y-6 data-[ending-style]:duration-150 data-[ending-style]:ease-out",
          className,
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      className={cn("font-heading text-xl font-semibold text-ink", className)}
      {...props}
    />
  );
}

function DialogDescription({ className, ...props }: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      className={cn("mt-1.5 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogPortal,
  DialogBackdrop,
  DialogContent,
  DialogPanel,
  DialogTitle,
  DialogDescription,
};
